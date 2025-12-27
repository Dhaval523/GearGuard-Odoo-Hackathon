from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel
from app.schemas.base import ORMBase

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

# For responses with team members included
class TeamMemberInfo(BaseModel):
    id: int
    ename: str
    eemail: str
    category: str

class TeamWithMembers(ORMBase):
    id: int
    teamName: str
    companyId: int
    members: List[TeamMemberInfo] = []
    createdAt: datetime
    updatedAt: datetime
