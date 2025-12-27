from fastapi import APIRouter, HTTPException
from typing import Optional
from prisma.models import User, Department, Team
from app.schemas.user import UserCreate, UserUpdate, UserRead

router = APIRouter(prefix="/users", tags=["users"])

@router.post("", response_model=UserRead)
async def create_user(payload: UserCreate):
    """
    Create user (technician/manager/employee) and link to team [file:1]
    """
    # Check email uniqueness
    existing = await User.prisma().find_unique(where={"eemail": payload.eemail})
    if existing:
        raise HTTPException(400, "Email already exists")
    
    # Validate FKs
    if payload.departmentId:
        if not await Department.prisma().find_unique(where={"id": payload.departmentId}):
            raise HTTPException(400, "Invalid departmentId")
    
    if payload.teamId:
        if not await Team.prisma().find_unique(where={"id": payload.teamId}):
            raise HTTPException(400, "Invalid teamId")
    
    user = await User.prisma().create(data=payload.model_dump(exclude_unset=True))
    return user

@router.get("", response_model=list[UserRead])
async def list_users(
    teamId: Optional[int] = None,
    category: Optional[str] = None,
    departmentId: Optional[int] = None
):
    """
    List users with filters (e.g., all technicians in Mechanics team) [file:1]
    """
    where = {}
    if teamId:
        where["teamId"] = teamId
    if category:
        where["category"] = category
    if departmentId:
        where["departmentId"] = departmentId
    
    return await User.prisma().find_many(where=where, order={"ename": "asc"})

@router.get("/{user_id}", response_model=UserRead)
async def get_user(user_id: int):
    user = await User.prisma().find_unique(where={"id": user_id})
    if not user:
        raise HTTPException(404, "User not found")
    return user

@router.patch("/{user_id}", response_model=UserRead)
async def update_user(user_id: int, payload: UserUpdate):
    """
    Update user (e.g., reassign to different team)
    """
    if not await User.prisma().find_unique(where={"id": user_id}):
        raise HTTPException(404, "User not found")
    
    data = payload.model_dump(exclude_unset=True, exclude_none=True)
    
    # Validate FKs if being updated
    if "teamId" in data and data["teamId"]:
        if not await Team.prisma().find_unique(where={"id": data["teamId"]}):
            raise HTTPException(400, "Invalid teamId")
    
    if "departmentId" in data and data["departmentId"]:
        if not await Department.prisma().find_unique(where={"id": data["departmentId"]}):
            raise HTTPException(400, "Invalid departmentId")
    
    updated = await User.prisma().update(where={"id": user_id}, data=data)
    return updated

@router.delete("/{user_id}")
async def delete_user(user_id: int):
    try:
        await User.prisma().delete(where={"id": user_id})
        return {"ok": True}
    except:
        raise HTTPException(400, "Cannot delete user - may have dependent records")