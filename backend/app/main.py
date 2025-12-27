from fastapi import FastAPI
from prisma import Prisma

app = FastAPI()
db = Prisma()

@app.on_event("startup")
async def startup():
    await db.connect()

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()

@app.get("/health/db")
async def db_health():
    record = await db.healthcheck.create(
        data={"message": "db is working"}
    )
    count = await db.healthcheck.count()
    return {
        "status": "ok",
        "inserted_id": record.id,
        "total_rows": count
    }
