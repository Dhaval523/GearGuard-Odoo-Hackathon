from fastapi import APIRouter, HTTPException
from app.db import db
from app.schemas.company import CompanyCreate, CompanyRead
from app.schemas.department import DepartmentCreate, DepartmentRead

router = APIRouter(tags=["organization"])

# --- Company Endpoints ---
@router.post("/companies", response_model=CompanyRead)
async def create_company(payload: CompanyCreate):
    return await db.company.create(data=payload.model_dump())

@router.get("/companies", response_model=list[CompanyRead])
async def list_companies():
    return await db.company.find_many()

# --- Department Endpoints ---
@router.post("/departments", response_model=DepartmentRead)
async def create_department(payload: DepartmentCreate):
    # Verify company exists
    company = await db.company.find_unique(where={"id": payload.companyId})
    if not company:
        raise HTTPException(status_code=400, detail="Company not found")
    return await db.department.create(data=payload.model_dump())

@router.get("/departments", response_model=list[DepartmentRead])
async def list_departments(companyId: int | None = None):
    where = {"companyId": companyId} if companyId else {}
    return await db.department.find_many(where=where)