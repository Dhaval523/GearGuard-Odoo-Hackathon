from fastapi import APIRouter, HTTPException
from app.db import db
from pydantic import BaseModel

router = APIRouter(prefix="/work-centers", tags=["work-centers"])

class WorkCenterCreate(BaseModel):
    name: str

@router.post("")
async def create_work_center(payload: WorkCenterCreate):
    existing = await db.work_center.find_unique(where={"name": payload.name})
    if existing:
        raise HTTPException(status_code=400, detail="Work Center already exists")
    return await db.work_center.create(data={"name": payload.name})

@router.get("")
async def list_work_centers():
    return await db.work_center.find_many()