from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.schemas.base import ORMBase

class UserCreate(BaseModel):
    ename: str
    eemail: str
    epass: str
    category: str  # TECHNICAL, MANAGER, EMPLOYEE
    departmentId: Optional[int] = None
    teamId: Optional[int] = None  # Link technician to team [file:1]

class UserUpdate(BaseModel):
    ename: Optional[str] = None
    eemail: Optional[str] = None
    epass: Optional[str] = None
    category: Optional[str] = None
    departmentId: Optional[int] = None
    teamId: Optional[int] = None

class UserRead(ORMBase):
    id: int
    ename: str
    eemail: str
    category: str
    departmentId: Optional[int] = None
    teamId: Optional[int] = None
    createdAt: datetime
    updatedAt: datetime