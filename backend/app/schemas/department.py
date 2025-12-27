from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.models.base import ORMBase

class DepartmentCreate(BaseModel):
    name: str
    companyId: int

class DepartmentUpdate(BaseModel):
    name: Optional[str] = None

class DepartmentRead(ORMBase):
    id: int
    name: str
    companyId: int
    createdAt: datetime
    updatedAt: datetime
