from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.models.enums import MaintenanceType, RequestStage
from app.models.base import ORMBase

class MaintenanceRequestCreate(BaseModel):
    createdById: int
    equipmentId: int
    companyId: int

    maintenanceType: MaintenanceType
    stage: RequestStage = RequestStage.NEW

    # optional relations / fields
    teamId: Optional[int] = None
    technicianId: Optional[int] = None
    categoryId: Optional[int] = None  # only if you kept the FK relation

    scheduledDt: Optional[datetime] = None
    durationMin: Optional[int] = None

    priority: int = Field(default=3, ge=1, le=5)
    technicianAssigned: bool = False

class MaintenanceRequestUpdate(BaseModel):
    maintenanceType: Optional[MaintenanceType] = None
    stage: Optional[RequestStage] = None

    teamId: Optional[int] = None
    technicianId: Optional[int] = None
    categoryId: Optional[int] = None

    scheduledDt: Optional[datetime] = None
    durationMin: Optional[int] = None

    priority: Optional[int] = Field(default=None, ge=1, le=5)
    technicianAssigned: Optional[bool] = None

class MaintenanceRequestRead(ORMBase):
    id: int
    createdById: int
    equipmentId: int
    companyId: int

    maintenanceType: MaintenanceType
    stage: RequestStage

    teamId: Optional[int] = None
    technicianId: Optional[int] = None
    categoryId: Optional[int] = None

    requestDt: datetime
    scheduledDt: Optional[datetime] = None
    durationMin: Optional[int] = None

    priority: int
    technicianAssigned: bool

    createdAt: datetime
    updatedAt: datetime