from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.database import get_db
from app.models import Farm, User
from app.schemas import FarmCreate, FarmOut
from app.api.auth import get_current_user
from app.utils.response import success_response, error_response

router = APIRouter()

@router.get("", response_model=dict)
@router.get("/", response_model=dict)
async def list_farms(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    query = select(Farm).where(Farm.owner_id == current_user.id)
    result = await db.execute(query)
    farms = result.scalars().all()
    
    farms_data = [FarmOut.model_validate(f).model_dump() for f in farms]
    return success_response(data=farms_data, message="Farms retrieved successfully")

@router.post("", response_model=dict)
@router.post("/", response_model=dict)
async def create_farm(
    payload: FarmCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    farm = Farm(
        owner_id=current_user.id,
        name=payload.name,
        location=payload.location or "Nashik District",
        district=payload.district or "Nashik",
        state=payload.state or "Maharashtra",
        area=payload.area or 2.5
    )
    db.add(farm)
    await db.commit()
    await db.refresh(farm)
    
    return success_response(
        data=FarmOut.model_validate(farm).model_dump(),
        message="Farm registered successfully",
        status_code=201
    )

@router.get("/{farm_id}", response_model=dict)
async def get_farm(
    farm_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Farm).where(Farm.id == farm_id))
    farm = result.scalar_one_or_none()
    if not farm:
        return error_response("NOT_FOUND", "Farm not found", 404)
        
    return success_response(data=FarmOut.model_validate(farm).model_dump())
