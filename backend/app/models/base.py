from enum import Enum
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field

class UserCategory(str, Enum):
    TECHNICAL = "TECHNICAL"
    MANAGER = "MANAGER"
    EMPLOYEE = "EMPLOYEE"

class MaintenanceType(str, Enum):
    PREVENTIVE = "PREVENTIVE"
    CORRECTIVE = "CORRECTIVE"

class RequestStage(str, Enum):
    NEW = "NEW"
    IN_PROGRESS = "IN_PROGRESS"
    REPAIRED = "REPAIRED"
    SCRAP = "SCRAP"

class ORMBase(BaseModel):
    # Pydantic v2 replacement for orm_mode
    model_config = ConfigDict(from_attributes=True)  # [web:18]
