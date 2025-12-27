from fastapi import APIRouter, HTTPException
from app.db import db
from app.schemas.requests import (
    MaintenanceRequestCreate,
    MaintenanceRequestRead,
    StageUpdate,
    RequestStage,
)

router = APIRouter(prefix="/requests", tags=["requests"])

@router.post("", response_model=MaintenanceRequestRead)
async def create_request(payload: MaintenanceRequestCreate):
    # 1) Any user can create request (so no role check here) [file:1]
    user = await db.user.find_unique(where={"id": payload.createdById})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid createdById")

    equipment = await db.equipment.find_unique(where={"id": payload.equipmentId})
    if not equipment:
        raise HTTPException(status_code=400, detail="Invalid equipmentId")

    # 2) Auto-fill: category + maintenance team from equipment [file:1]
    data = payload.model_dump(exclude_unset=True)
    data["stage"] = "NEW"  # request starts New [file:1]
    data["categoryId"] = equipment.categoryId
    data["teamId"] = equipment.maintenanceTeamId  # can be null

    # technicianAssigned starts false
    data["technicianAssigned"] = False

    created = await db.maintenancerequest.create(data=data)
    return created

@router.get("", response_model=list[MaintenanceRequestRead])
async def list_requests(
    companyId: int | None = None,
    stage: RequestStage | None = None,
    teamId: int | None = None,
    equipmentId: int | None = None,
):
    where = {}
    if companyId is not None:
        where["companyId"] = companyId
    if stage is not None:
        where["stage"] = stage.value
    if teamId is not None:
        where["teamId"] = teamId
    if equipmentId is not None:
        where["equipmentId"] = equipmentId

    return await db.maintenancerequest.find_many(where=where, order={"createdAt": "desc"})

@router.patch("/{request_id}/stage", response_model=MaintenanceRequestRead)
async def update_stage(request_id: int, payload: StageUpdate):
    req = await db.maintenancerequest.find_unique(where={"id": request_id})
    if not req:
        raise HTTPException(status_code=404, detail="Request not found")

    new_stage = payload.stage.value

    # Enforce completion rule: when moving to REPAIRED require duration/hours. [file:1]
    if new_stage == "REPAIRED" and payload.durationMin is None:
        raise HTTPException(status_code=400, detail="durationMin required to mark REPAIRED")

    # If moving to SCRAP: also scrap equipment (minimal scrap logic). [file:1]
    if new_stage == "SCRAP":
        await db.equipment.update(
            where={"id": req.equipmentId},
            data={"isScrapped": True},
        )

    update_data = {"stage": new_stage}
    if payload.durationMin is not None:
        update_data["durationMin"] = payload.durationMin

    updated = await db.maintenancerequest.update(
        where={"id": request_id},
        data=update_data,
    )
    return updated
