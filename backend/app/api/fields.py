from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.database import get_db
from app.models import Field, Farm, User, RiskLevel
from app.schemas import FieldCreate, FieldOut, FieldHealthOut
from app.api.auth import get_current_user
from app.utils.response import success_response, error_response

router = APIRouter()

@router.get("", response_model=dict)
@router.get("/", response_model=dict)
async def list_fields(
    farm_id: str = None,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    query = select(Field).join(Farm).where(Farm.owner_id == current_user.id)
    if farm_id:
        query = query.where(Field.farm_id == farm_id)
        
    result = await db.execute(query)
    fields = result.scalars().all()
    
    out_list = []
    for f in fields:
        f_dict = FieldHealthOut.model_validate(f).model_dump()
        # Mock/Calculate health metadata for field dashboard
        f_dict["risk_score"] = 68.5 if "Tomato" in f.crop else 22.0
        f_dict["risk_level"] = RiskLevel.HIGH if "Tomato" in f.crop else RiskLevel.LOW
        f_dict["recent_diagnosis_count"] = 2 if "Tomato" in f.crop else 0
        out_list.append(f_dict)
        
    return success_response(data=out_list)

@router.post("", response_model=dict)
@router.post("/", response_model=dict)
async def create_field(
    payload: FieldCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Verify farm ownership
    result = await db.execute(select(Farm).where(Farm.id == payload.farm_id, Farm.owner_id == current_user.id))
    farm = result.scalar_one_or_none()
    if not farm:
        return error_response("NOT_FOUND", "Farm not found or access denied", 404)
        
    field = Field(
        farm_id=payload.farm_id,
        crop=payload.crop,
        variety=payload.variety or "Local Standard",
        area=payload.area or 1.0,
        soil_type=payload.soil_type or "Black Clay",
        growth_stage=payload.growth_stage or "Flowering"
    )
    db.add(field)
    await db.commit()
    await db.refresh(field)
    
    return success_response(
        data=FieldOut.model_validate(field).model_dump(),
        message="Field registered successfully",
        status_code=201
    )

@router.get("/{field_id}", response_model=dict)
async def get_field(
    field_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Field).where(Field.id == field_id))
    field = result.scalar_one_or_none()
    if not field:
        return error_response("NOT_FOUND", "Field not found", 404)
        
    f_dict = FieldHealthOut.model_validate(field).model_dump()
    f_dict["risk_score"] = 68.5
    f_dict["risk_level"] = RiskLevel.HIGH
    return success_response(data=f_dict)
