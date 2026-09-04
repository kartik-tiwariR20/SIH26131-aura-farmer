from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from app.database import engine, Base
from app.api import auth, farms, fields, diagnoses, pests, weather, alerts, experts, maps, analytics

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()

app = FastAPI(
    title="CropGuard API",
    description="Crop Health Intelligence & Advisory Platform",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

uploads_dir = os.path.join(os.path.dirname(__file__), "..", "uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(farms.router, prefix="/api/farms", tags=["Farms"])
app.include_router(fields.router, prefix="/api/fields", tags=["Fields"])
app.include_router(diagnoses.router, prefix="/api/diagnoses", tags=["Diagnoses"])
app.include_router(pests.router, prefix="/api/pests", tags=["Pests"])
app.include_router(weather.router, prefix="/api/weather", tags=["Weather"])
app.include_router(alerts.router, prefix="/api/alerts", tags=["Alerts"])
app.include_router(experts.router, prefix="/api/expert", tags=["Experts"])
app.include_router(maps.router, prefix="/api/maps", tags=["Maps"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "cropguard-api"}
