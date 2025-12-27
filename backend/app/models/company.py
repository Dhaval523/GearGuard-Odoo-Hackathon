from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.models.base import ORMBase

class CompanyCreate(BaseModel):
    name: str
    location: Optional[str] = None

class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None

class CompanyRead(ORMBase):
    id: int
    name: str
    location: Optional[str] = None
    createdAt: datetime
    updatedAt: datetime
