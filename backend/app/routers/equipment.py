from fastapi import APIRouter, HTTPException
from app.db import db
from app.schemas.equipment import EquipmentCreate, EquipmentRead

router = APIRouter(prefix="/equipment", tags=["equipment"])

@router.post("", response_model=EquipmentRead)
async def create_equipment(payload: EquipmentCreate):
    # basic FK existence checks (optional but helpful)
    category = await db.equipmentcategory.find_unique(where={"id": payload.categoryId})
    if not category:
        raise HTTPException(status_code=400, detail="Invalid categoryId")

    created = await db.equipment.create(
        data=payload.model_dump(exclude_unset=True)
    )
    return created

@router.get("", response_model=list[EquipmentRead])
async def list_equipment(companyId: int | None = None):
    where = {}
    if companyId is not None:
        where["companyId"] = companyId
    return await db.equipment.find_many(where=where)
