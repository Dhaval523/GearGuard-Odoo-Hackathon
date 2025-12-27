from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from prisma.models import Team, Company, User
from app.schemas.team import TeamCreate, TeamUpdate, TeamRead, TeamWithMembers, TeamMemberInfo

router = APIRouter(prefix="/teams", tags=["teams"])

@router.post("", response_model=TeamRead)
async def create_team(payload: TeamCreate):
    """
    Create specialized maintenance team (e.g., Mechanics, Electricians, IT Support) [file:1]
    """
    # Validate company exists
    if not await Company.prisma().find_unique(where={"id": payload.companyId}):
        raise HTTPException(400, "Invalid companyId")
    
    # Check for duplicate team name in company
    existing = await Team.prisma().find_first(
        where={
            "companyId": payload.companyId,
            "teamName": payload.teamName
        }
    )
    if existing:
        raise HTTPException(400, f"Team '{payload.teamName}' already exists in this company")

    team = await Team.prisma().create(data=payload.model_dump())
    return team

@router.get("", response_model=list[TeamRead])
async def list_teams(companyId: Optional[int] = None):
    """
    List all maintenance teams (Mechanics, Electricians, IT Support, etc.) [file:1]
    """
    where = {}
    if companyId:
        where["companyId"] = companyId
    
    return await Team.prisma().find_many(
        where=where,
        order={"teamName": "asc"}
    )

@router.get("/{team_id}", response_model=TeamWithMembers)
async def get_team_with_members(team_id: int):
    """
    Get team details with all team members [file:1]
    """
    team = await Team.prisma().find_unique(
        where={"id": team_id},
        include={"users": True}
    )
    
    if not team:
        raise HTTPException(404, "Team not found")
    
    # Format response with members
    members = [
        TeamMemberInfo(
            id=user.id,
            ename=user.ename,
            eemail=user.eemail,
            category=user.category
        )
        for user in (team.users or [])
    ]
    
    return TeamWithMembers(
        id=team.id,
        teamName=team.teamName,
        companyId=team.companyId,
        members=members,
        createdAt=team.createdAt,
        updatedAt=team.updatedAt
    )

@router.get("/{team_id}/members", response_model=list[TeamMemberInfo])
async def get_team_members(team_id: int):
    """
    Get all technicians/users in this team.
    Used for workflow logic: "only team members should pick it up" [file:1]
    """
    team = await Team.prisma().find_unique(
        where={"id": team_id},
        include={"users": True}
    )
    
    if not team:
        raise HTTPException(404, "Team not found")
    
    members = [
        TeamMemberInfo(
            id=user.id,
            ename=user.ename,
            eemail=user.eemail,
            category=user.category
        )
        for user in (team.users or [])
    ]
    
    return members

@router.patch("/{team_id}", response_model=TeamRead)
async def update_team(team_id: int, payload: TeamUpdate):
    """
    Update team details
    """
    if not await Team.prisma().find_unique(where={"id": team_id}):
        raise HTTPException(404, "Team not found")
    
    data = payload.model_dump(exclude_unset=True, exclude_none=True)
    
    updated = await Team.prisma().update(
        where={"id": team_id},
        data=data
    )
    return updated

@router.delete("/{team_id}")
async def delete_team(team_id: int):
    """
    Delete team (only if no equipment/requests depend on it)
    """
    try:
        await Team.prisma().delete(where={"id": team_id})
        return {"ok": True}
    except:
        raise HTTPException(400, "Cannot delete team - may have dependent equipment or requests")

# Workflow helper: check if user can pick request
@router.get("/{team_id}/can-assign/{user_id}")
async def check_can_assign(team_id: int, user_id: int):
    """
    Workflow Logic: Check if user is member of team (for request assignment validation) [file:1]
    Returns: {"canAssign": true/false, "reason": "..."}
    """
    user = await User.prisma().find_unique(where={"id": user_id})
    if not user:
        return {"canAssign": False, "reason": "User not found"}
    
    team = await Team.prisma().find_unique(where={"id": team_id})
    if not team:
        return {"canAssign": False, "reason": "Team not found"}
    
    # Workflow rule: only team members can pick it up [file:1]
    if user.teamId != team_id:
        return {
            "canAssign": False,
            "reason": f"User {user.ename} is not a member of team {team.teamName}"
        }
    
    return {
        "canAssign": True,
        "reason": f"User {user.ename} is a valid member of {team.teamName}"
    }
