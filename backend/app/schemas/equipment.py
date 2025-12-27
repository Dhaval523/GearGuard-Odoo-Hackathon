from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.schemas.base import ORMBase

class EquipmentCreate(BaseModel):
    name: str
    categoryId: int
    companyId: int

    usedById: Optional[int] = None
    maintenanceTeamId: Optional[int] = None
    assignDt: Optional[datetime] = None
    technicianId: Optional[int] = None

    usedInLocation: Optional[str] = None
    workCenterId: Optional[int] = None
    description: Optional[str] = None

class EquipmentUpdate(BaseModel):
    name: Optional[str] = None
    categoryId: Optional[int] = None

    usedById: Optional[int] = None
    maintenanceTeamId: Optional[int] = None
    assignDt: Optional[datetime] = None
    technicianId: Optional[int] = None

    usedInLocation: Optional[str] = None
    workCenterId: Optional[int] = None
    description: Optional[str] = None

class EquipmentRead(ORMBase):
    id: int
    name: str
    categoryId: int
    companyId: int

    usedById: Optional[int] = None
    maintenanceTeamId: Optional[int] = None
    assignDt: Optional[datetime] = None
    technicianId: Optional[int] = None

    isScrapped: bool
    scrappedDt: Optional[datetime] = None

    usedInLocation: Optional[str] = None
    workCenterId: Optional[int] = None
    description: Optional[str] = None

    createdAt: datetime
    updatedAt: datetime