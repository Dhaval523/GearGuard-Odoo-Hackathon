from fastapi import APIRouter
from prisma.models import Company, Team, User, WorkCenter, EquipmentCategory

router = APIRouter(prefix="/setup", tags=["setup"])

@router.post("/bootstrap")
async def bootstrap():
    # 1) Company
    company = await Company.prisma().create(
        data={"name": "DemoCo", "location": "Ahmedabad"}
    )

    # 2) Teams
    team_mech = await Team.prisma().create(
        data={"teamName": "Mechanics", "companyId": company.id}
    )
    team_it = await Team.prisma().create(
        data={"teamName": "IT Support", "companyId": company.id}
    )

    # 3) Users (one team per user in your schema)
    manager = await User.prisma().create(
        data={
            "ename": "Manager 1",
            "eemail": "manager@democo.com",
            "epass": "pass123",
            "category": "MANAGER",
            "teamId": team_it.id,
        }
    )
    tech1 = await User.prisma().create(
        data={
            "ename": "Tech 1",
            "eemail": "tech1@democo.com",
            "epass": "pass123",
            "category": "TECHNICAL",
            "teamId": team_mech.id,
        }
    )

    # 4) Work Center
    wc = await WorkCenter.prisma().create(data={"name": "Plant-1"})

    # 5) Equipment Categories
    cat_printer = await EquipmentCategory.prisma().create(
        data={
            "name": "Printers",
            "companyId": company.id,
            "responsibleTeamId": team_it.id,
        }
    )
    cat_machine = await EquipmentCategory.prisma().create(
        data={
            "name": "Machines",
            "companyId": company.id,
            "responsibleTeamId": team_mech.id,
        }
    )

    return {
        "company": company,
        "teams": [team_mech, team_it],
        "users": [manager, tech1],
        "workCenter": wc,
        "categories": [cat_printer, cat_machine],
    }
