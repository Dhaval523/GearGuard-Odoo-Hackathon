import json
from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.db import db
from app.schemas.scrapped_equip import ScrappedEquipmentRead, ScrappedEquipmentCreate
from app.redis_config import get_redis

router = APIRouter(prefix="/scrapped", tags=["scrapped"])

async def offload_scrap_to_worker(equipment_id: int):
    """Pushes the scrap task to Redis Cloud for the worker to process."""
    redis_client = await get_redis()
    
    task_payload = {
        "type": "SCRAP_EQUIPMENT",
        "payload": {
            "equipmentId": equipment_id,
            "timestamp": str(datetime.now())
        }
    }
    
    # Offload to the queue your worker is listening to
    await redis_client.lpush("maintenance_queue", json.dumps(task_payload))

@router.post("/trigger", response_model=dict)
async def trigger_equipment_scrap(payload: ScrappedEquipmentCreate, background_tasks: BackgroundTasks):
    """
    Endpoint to manually trigger a scrap process for a specific piece of equipment.
    """
    # 1. Verify equipment exists and isn't already scrapped
    equipment = await db.equipment.find_unique(where={"id": payload.equipmentId})
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
    
    if equipment.isScrapped:
        return {"message": "Equipment is already scrapped"}

    # 2. Offload the database updates and logging to the Worker Thread
    background_tasks.add_task(offload_scrap_to_worker, payload.equipmentId)
    
    return {"status": "success", "message": f"Scrap task for Equipment {payload.equipmentId} offloaded to worker."}

@router.get("/history", response_model=list[ScrappedEquipmentRead])
async def get_scrap_history():
    """Returns the audit log of all scrapped equipment."""
    return await db.scrappped_eq.find_many(
        include={"equipment": True},
        order={"createdAt": "desc"}
    )