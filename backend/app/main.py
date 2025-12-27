from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.db import db

from app.routers.equipment import router as equipment_router
from app.routers.requests import router as request_router
from app.routers.setup import router as setup_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect()
    yield
    await db.disconnect()

app = FastAPI(lifespan=lifespan)

app.include_router(equipment_router)
app.include_router(request_router)
app.include_router(setup_router)