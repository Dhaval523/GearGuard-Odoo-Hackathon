from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.models.base import ORMBase

class TeamCreate(BaseModel):
    teamName: str
    companyId: int

class TeamUpdate(BaseModel):
    teamName: Optional[str] = None

class TeamRead(ORMBase):
    id: int
    teamName: str
    companyId: int
    createdAt: datetime
    updatedAt: datetime