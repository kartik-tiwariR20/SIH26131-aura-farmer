from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import PestReport, User
from app.schemas import PestReportCreate, PestReportOut
from app.api.auth import get_current_user
from app.utils.response import success_response, error_response

router = APIRouter()

@router.get("", response_model=dict)
@router.get("/", response_model=dict)
async def list_pest_reports(
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(PestReport).order_by(PestReport.created_at.desc()))
    reports = result.scalars().all()
    out = []
    for r in reports:
        out.append({
            "id": str(r.id),
            "field_id": str(r.field_id),
            "pest_type": r.pest_type,
            "count": r.count,
            "trap_type": r.trap_type,
            "created_at": r.created_at.isoformat()
        })
    return success_response(data=out)

@router.post("", response_model=dict)
@router.post("/", response_model=dict)
async def create_pest_report(
    payload: PestReportCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    pest = PestReport(
        field_id=payload.field_id,
        pest_type=payload.pest_type,
        count=payload.count,
        trap_type=payload.trap_type or "Yellow Sticky Trap"
    )
    db.add(pest)
    await db.commit()
    await db.refresh(pest)
    
    return success_response(
        data={
            "id": str(pest.id),
            "pest_type": pest.pest_type,
            "count": pest.count,
            "trap_type": pest.trap_type,
            "created_at": pest.created_at.isoformat()
        },
        message="Pest report recorded successfully",
        status_code=201
    )
