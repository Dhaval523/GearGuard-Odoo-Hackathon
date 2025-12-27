import json
from datetime import datetime
from typing import List
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, ConfigDict
from app.db import db
from app.redis_config import get_redis

# --- Pydantic Models ---

class ScrappedEquipmentCreate(BaseModel):
    equipmentId: int

class ScrappedEquipmentRead(BaseModel):
    equipmentId: int
    createdAt: datetime
    
    # Pydantic v2 configuration for Prisma compatibility
    model_config = ConfigDict(from_attributes=True)

# --- Router Definition ---

router = APIRouter(prefix="/scrapped", tags=["scrapped"])

async def offload_scrap_to_worker(equipment_id: int):
    """
    Producer: Pushes the scrap task to Redis Cloud.
    The Worker Thread will pick this up to:
    1. Update the Equipment 'isScrapped' flag.
    2. Create the permanent log in 'scrappped_eq' table.
    """
    redis_client = await get_redis()
    
    task_payload = {
        "type": "SCRAP_EQUIPMENT",
        "payload": {
            "equipmentId": equipment_id,
            "timestamp": datetime.now().isoformat()
        }
    }
    
    # Push to the maintenance_queue
    await redis_client.lpush("maintenance_queue", json.dumps(task_payload))

@router.post("/trigger", response_model=dict)
async def trigger_equipment_scrap(
    payload: ScrappedEquipmentCreate, 
    background_tasks: BackgroundTasks
):
    """
    Main Backend Endpoint: Validates the request and offloads 
    the heavy write operations to the Worker Thread.
    """
    # 1. Verify equipment exists in the DB
    equipment = await db.equipment.find_unique(where={"id": payload.equipmentId})
    
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
    
    # 2. Check if already scrapped to prevent duplicate tasks
    if equipment.isScrapped:
        return {"status": "info", "message": "Equipment is already marked as scrapped"}

    # 3. Offload the task (Scalable Backend Principle)
    background_tasks.add_task(offload_scrap_to_worker, payload.equipmentId)
    
    return {
        "status": "success", 
        "message": f"Scrap task for Equipment {payload.equipmentId} successfully offloaded."
    }

@router.get("/history", response_model=List[ScrappedEquipmentRead])
async def get_scrap_history():
    """
    Reads the historical log of all decommissioned assets.
    """
    # Fetches from the 'scrappped_eq' table defined in your SQL
    return await db.scrappped_eq.find_many(
        order={"createdAt": "desc"}
    )