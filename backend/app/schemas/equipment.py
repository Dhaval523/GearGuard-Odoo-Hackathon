from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.schemas.base import ORMBase

class EquipmentCreate(BaseModel):
    # Required core fields
    name: str
    serialNumber: str
    companyId: int
    categoryId: int

    # Purchase & Warranty info [file:1]
    purchaseDate: Optional[datetime] = None
    warrantyInfo: Optional[str] = None

    # Location [file:1]
    usedInLocation: Optional[str] = None
    workCenterId: Optional[int] = None

    # Ownership tracking [file:1]
    # By Department
    departmentId: Optional[int] = None
    # By Employee (usedBy)
    usedById: Optional[int] = None

    # Responsibility: dedicated team + default technician [file:1]
    maintenanceTeamId: int  # Required: each equipment must have a team
    technicianId: Optional[int] = None  # Default technician

    assignDt: Optional[datetime] = None
    description: Optional[str] = None

class EquipmentUpdate(BaseModel):
    name: Optional[str] = None
    serialNumber: Optional[str] = None
    categoryId: Optional[int] = None
    
    purchaseDate: Optional[datetime] = None
    warrantyInfo: Optional[str] = None
    
    usedInLocation: Optional[str] = None
    workCenterId: Optional[int] = None
    
    departmentId: Optional[int] = None
    usedById: Optional[int] = None
    
    maintenanceTeamId: Optional[int] = None
    technicianId: Optional[int] = None
    assignDt: Optional[datetime] = None
    description: Optional[str] = None

class EquipmentRead(ORMBase):
    id: int
    name: str
    serialNumber: Optional[str] = None
    companyId: int
    categoryId: int

    purchaseDate: Optional[datetime] = None
    warrantyInfo: Optional[str] = None

    usedInLocation: Optional[str] = None
    workCenterId: Optional[int] = None

    departmentId: Optional[int] = None
    usedById: Optional[int] = None

    maintenanceTeamId: Optional[int] = None
    technicianId: Optional[int] = None
    assignDt: Optional[datetime] = None

    isScrapped: bool
    scrappedDt: Optional[datetime] = None
    description: Optional[str] = None

    createdAt: datetime
    updatedAt: datetime