from datetime import datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field
from app.schemas.base import ORMBase

class MaintenanceType(str, Enum):
    PREVENTIVE = "PREVENTIVE"
    CORRECTIVE = "CORRECTIVE"

class RequestStage(str, Enum):
    NEW = "NEW"
    IN_PROGRESS = "IN_PROGRESS"
    REPAIRED = "REPAIRED"
    SCRAP = "SCRAP"

class MaintenanceRequestCreate(BaseModel):
    createdById: int
    equipmentId: int
    companyId: int

    maintenanceType: MaintenanceType
    scheduledDt: Optional[datetime] = None
    priority: int = Field(default=3, ge=1, le=5)

class MaintenanceRequestRead(ORMBase):
    id: int
    createdById: int
    equipmentId: int
    companyId: int

    maintenanceType: MaintenanceType
    stage: RequestStage

    # auto-filled from equipment
    categoryId: Optional[int] = None
    teamId: Optional[int] = None

    technicianId: Optional[int] = None
    technicianAssigned: bool

    requestDt: datetime
    scheduledDt: Optional[datetime] = None
    durationMin: Optional[int] = None
    priority: int

    createdAt: datetime
    updatedAt: datetime

class StageUpdate(BaseModel):
    stage: RequestStage
    durationMin: Optional[int] = None  # required when moving to REPAIRED (enforced below)
