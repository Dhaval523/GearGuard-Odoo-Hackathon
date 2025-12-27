import json
from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.db import db
from app.models.maintenance_req import (
    MaintenanceRequestCreate, 
    MaintenanceRequestUpdate, 
    MaintenanceRequestRead
)

router = APIRouter(prefix="/requests", tags=["maintenance-requests"])

# # --- Helper for Redis Offloading ---
# async def notify_worker_of_new_request(request_data: MaintenanceRequestRead):
#     """Pushes a task to Redis Cloud for the worker to handle email."""
#     redis_client = await get_redis()
    
#     # We fetch the equipment and technician details to provide context for the email
#     equipment = await db.equipment.find_unique(where={"id": request_data.equipmentId})
#     technician = None
#     if request_data.technicianId:
#         technician = await db.user.find_unique(where={"id": request_data.technicianId})

#     task_payload = {
#         "type": "MAINTENANCE_CREATED",
#         "payload": {
#             "requestId": request_data.id,
#             "subject": request_data.subject if hasattr(request_data, 'subject') else f"Request #{request_data.id}",
#             "equipmentName": equipment.name if equipment else "Unknown Asset",
#             "email": technician.eemail if technician else "admin@company.com", # Fallback email
#             "maintenanceType": request_data.maintenanceType
#         }
#     }
    
#     await redis_client.lpush("maintenance_queue", json.dumps(task_payload))

# --- CRUD Endpoints ---

@router.post("", response_model=MaintenanceRequestRead)
async def create_maintenance_request(payload: MaintenanceRequestCreate, background_tasks: BackgroundTasks):
    # 1. Validation: Ensure Equipment exists
    equipment = await db.equipment.find_unique(where={"id": payload.equipmentId})
    if not equipment:
        raise HTTPException(status_code=400, detail="Equipment not found")

    # 2. Create the record (Auto-filling category/team from equipment as per your logic)
    data = payload.model_dump(exclude_unset=True)
    if not data.get("categoryId"):
        data["categoryId"] = equipment.categoryId
    if not data.get("teamId"):
        data["teamId"] = equipment.maintenanceTeamId

    new_request = await db.maintenancerequest.create(data=data)
    
    # 3. Offload Email Task to Worker via Redis
    # background_tasks.add_task(notify_worker_of_new_request, new_request)
    
    return new_request

@router.get("", response_model=list[MaintenanceRequestRead])
async def list_requests(companyId: Optional[int] = None):
    where = {"companyId": companyId} if companyId else {}
    return await db.maintenancerequest.find_many(where=where, order={"createdAt": "desc"})

@router.get("/{request_id}", response_model=MaintenanceRequestRead)
async def get_request(request_id: int):
    request = await db.maintenancerequest.find_unique(where={"id": request_id})
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    return request

@router.patch("/{request_id}", response_model=MaintenanceRequestRead)
async def update_request(request_id: int, payload: MaintenanceRequestUpdate):
    # Check existence
    existing = await db.maintenancerequest.find_unique(where={"id": request_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Request not found")

    updated = await db.maintenancerequest.update(
        where={"id": request_id},
        data=payload.model_dump(exclude_unset=True)
    )
    return updated

@router.delete("/{request_id}")
async def delete_request(request_id: int):
    try:
        await db.maintenancerequest.delete(where={"id": request_id})
        return {"message": f"Request {request_id} deleted successfully"}
    except:
        raise HTTPException(status_code=404, detail="Request not found")