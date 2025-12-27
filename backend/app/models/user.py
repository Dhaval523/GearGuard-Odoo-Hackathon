from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.models.base import ORMBase
from app.models.enums import UserCategory

class UserCreate(BaseModel):
    ename: str
    eemail: str
    epass: str
    category: UserCategory
    departmentId: Optional[int] = None
    teamId: Optional[int] = None   # nullable if user can exist without a team

class UserUpdate(BaseModel):
    ename: Optional[str] = None
    eemail: Optional[str] = None
    epass: Optional[str] = None
    category: Optional[UserCategory] = None
    departmentId: Optional[int] = None
    teamId: Optional[int] = None

class UserRead(ORMBase):
    id: int
    ename: str
    eemail: str
    category: UserCategory
    departmentId: Optional[int] = None
    teamId: Optional[int] = None
    createdAt: datetime
    updatedAt: datetime