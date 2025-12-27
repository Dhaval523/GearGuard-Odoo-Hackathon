from fastapi import APIRouter
from prisma.models import Company, Team, User, WorkCenter, EquipmentCategory, Department
from datetime import datetime

router = APIRouter(prefix="/setup", tags=["setup"])

@router.post("/bootstrap")
async def bootstrap():
    # 1) Company
    company = await Company.prisma().create(
        data={"name": "DemoCo", "location": "Ahmedabad"}
    )

    # 2) Department (for tracking by department) [file:1]
    dept_prod = await Department.prisma().create(
        data={"name": "Production", "companyId": company.id}
    )
    dept_admin = await Department.prisma().create(
        data={"name": "Admin", "companyId": company.id}
    )

    # 3) Teams
    team_mech = await Team.prisma().create(
        data={"teamName": "Mechanics", "companyId": company.id}
    )
    team_it = await Team.prisma().create(
        data={"teamName": "IT Support", "companyId": company.id}
    )

    # 4) Users
    manager = await User.prisma().create(
        data={
            "ename": "Manager 1",
            "eemail": "manager@democo.com",
            "epass": "pass123",
            "category": "MANAGER",
            "teamId": team_it.id,
            "departmentId": dept_admin.id,
        }
    )
    tech1 = await User.prisma().create(
        data={
            "ename": "Tech Ravi",
            "eemail": "ravi@democo.com",
            "epass": "pass123",
            "category": "TECHNICAL",
            "teamId": team_mech.id,
            "departmentId": dept_prod.id,
        }
    )
    employee1 = await User.prisma().create(
        data={
            "ename": "Employee Priya",
            "eemail": "priya@democo.com",
            "epass": "pass123",
            "category": "EMPLOYEE",
            "departmentId": dept_admin.id,
        }
    )

    # 5) Work Center
    wc = await WorkCenter.prisma().create(data={"name": "Plant-1"})

    # 6) Equipment Categories
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
        "departments": [dept_prod, dept_admin],
        "teams": [team_mech, team_it],
        "users": [manager, tech1, employee1],
        "workCenter": wc,
        "categories": [cat_printer, cat_machine],
    }