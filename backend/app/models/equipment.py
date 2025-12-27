from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.models.base import ORMBase

class EquipmentCreate(BaseModel):
    name: str
    categoryId: int
    companyId: int

    usedById: Optional[int] = None
    maintenanceTeamId: Optional[int] = None
    assignDt: Optional[datetime] = None
    technicianId: Optional[int] = None

    employee: Optional[str] = None
    isScrapped: bool = False
    scrappedDt: Optional[datetime] = None

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
    employee: Optional[str] = None
    isScrapped: Optional[bool] = None
    scrappedDt: Optional[datetime] = None
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

    employee: Optional[str] = None
    isScrapped: bool
    scrappedDt: Optional[datetime] = None

    usedInLocation: Optional[str] = None
    workCenterId: Optional[int] = None
    description: Optional[str] = None

    createdAt: datetime
    updatedAt: datetime