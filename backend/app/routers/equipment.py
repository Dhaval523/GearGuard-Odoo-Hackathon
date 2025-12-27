from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from prisma.models import Equipment, EquipmentCategory, Company, Team, User, WorkCenter, Department
from app.schemas.equipment import EquipmentCreate, EquipmentUpdate, EquipmentRead

router = APIRouter(prefix="/equipment", tags=["equipment"])

@router.post("", response_model=EquipmentRead)
async def create_equipment(payload: EquipmentCreate):
    """
    Create equipment with all tracking fields.
    Ensures: dedicated maintenance team is assigned [file:1]
    """
    # Validate required FKs
    if not await Company.prisma().find_unique(where={"id": payload.companyId}):
        raise HTTPException(400, "Invalid companyId")
    
    if not await EquipmentCategory.prisma().find_unique(where={"id": payload.categoryId}):
        raise HTTPException(400, "Invalid categoryId")
    
    # Maintenance team is required [file:1]
    if not await Team.prisma().find_unique(where={"id": payload.maintenanceTeamId}):
        raise HTTPException(400, "Invalid maintenanceTeamId - equipment must have dedicated team")

    # Optional FK validations
    if payload.departmentId and not await Department.prisma().find_unique(where={"id": payload.departmentId}):
        raise HTTPException(400, "Invalid departmentId")
    
    if payload.usedById and not await User.prisma().find_unique(where={"id": payload.usedById}):
        raise HTTPException(400, "Invalid usedById")
    
    if payload.technicianId and not await User.prisma().find_unique(where={"id": payload.technicianId}):
        raise HTTPException(400, "Invalid technicianId")
    
    if payload.workCenterId and not await WorkCenter.prisma().find_unique(where={"id": payload.workCenterId}):
        raise HTTPException(400, "Invalid workCenterId")

    created = await Equipment.prisma().create(
        data=payload.model_dump(exclude_unset=True, exclude_none=True)
    )
    return created

@router.get("", response_model=list[EquipmentRead])
async def list_equipment(
    companyId: Optional[int] = None,
    # Tracking filters [file:1]
    departmentId: Optional[int] = Query(None, description="Track by Department"),
    usedById: Optional[int] = Query(None, description="Track by Employee"),
    maintenanceTeamId: Optional[int] = Query(None, description="Filter by maintenance team"),
    categoryId: Optional[int] = None,
):
    """
    List equipment with tracking filters:
    - By Department (e.g., Production dept's machines) [file:1]
    - By Employee (e.g., laptops assigned to specific person) [file:1]
    """
    where = {}
    if companyId:
        where["companyId"] = companyId
    if departmentId:
        where["departmentId"] = departmentId
    if usedById:
        where["usedById"] = usedById
    if maintenanceTeamId:
        where["maintenanceTeamId"] = maintenanceTeamId
    if categoryId:
        where["categoryId"] = categoryId

    return await Equipment.prisma().find_many(
        where=where,
        order={"createdAt": "desc"}
    )

@router.get("/{equipment_id}", response_model=EquipmentRead)
async def get_equipment(equipment_id: int):
    equipment = await Equipment.prisma().find_unique(where={"id": equipment_id})
    if not equipment:
        raise HTTPException(404, "Equipment not found")
    return equipment

@router.patch("/{equipment_id}", response_model=EquipmentRead)
async def update_equipment(equipment_id: int, payload: EquipmentUpdate):
    # Validate equipment exists
    if not await Equipment.prisma().find_unique(where={"id": equipment_id}):
        raise HTTPException(404, "Equipment not found")

    data = payload.model_dump(exclude_unset=True, exclude_none=True)
    
    # Validate FKs if being updated
    if "categoryId" in data:
        if not await EquipmentCategory.prisma().find_unique(where={"id": data["categoryId"]}):
            raise HTTPException(400, "Invalid categoryId")
    
    if "maintenanceTeamId" in data:
        if not await Team.prisma().find_unique(where={"id": data["maintenanceTeamId"]}):
            raise HTTPException(400, "Invalid maintenanceTeamId")
    
    if "departmentId" in data and data["departmentId"]:
        if not await Department.prisma().find_unique(where={"id": data["departmentId"]}):
            raise HTTPException(400, "Invalid departmentId")
    
    if "usedById" in data and data["usedById"]:
        if not await User.prisma().find_unique(where={"id": data["usedById"]}):
            raise HTTPException(400, "Invalid usedById")

    updated = await Equipment.prisma().update(
        where={"id": equipment_id},
        data=data
    )
    return updated

@router.delete("/{equipment_id}")
async def delete_equipment(equipment_id: int):
    try:
        await Equipment.prisma().delete(where={"id": equipment_id})
        return {"ok": True}
    except:
        raise HTTPException(404, "Equipment not found")

# Smart button endpoint: get count of open requests for this equipment [file:1]
@router.get("/{equipment_id}/requests/count")
async def get_equipment_requests_count(equipment_id: int):
    """
    Returns count of open maintenance requests for smart button badge [file:1]
    """
    from prisma.models import MaintenanceRequest
    
    count = await MaintenanceRequest.prisma().count(
        where={
            "equipmentId": equipment_id,
            "stage": {"in": ["NEW", "IN_PROGRESS"]}  # "open" = not repaired/scrapped
        }
    )
    return {"equipmentId": equipment_id, "openRequestsCount": count}