from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.models.base import ORMBase

class EquipmentCategoryCreate(BaseModel):
    name: str
    companyId: int
    responsibleTeamId: Optional[int] = None

class EquipmentCategoryUpdate(BaseModel):
    name: Optional[str] = None
    responsibleTeamId: Optional[int] = None

class EquipmentCategoryRead(ORMBase):
    id: int
    name: str
    companyId: int
    responsibleTeamId: Optional[int] = None
    createdAt: datetime
    updatedAt: datetime