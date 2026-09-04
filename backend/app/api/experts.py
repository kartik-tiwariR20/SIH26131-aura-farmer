from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from app.database import get_db
from app.models import Diagnosis, ExpertReview, LabReferral, User, UserRole, DiagnosisStatus, LabStatus
from app.schemas import ExpertReviewCreate, LabReferralCreate
from app.api.auth import get_current_user, require_role
from app.utils.response import success_response, error_response

router = APIRouter()

@router.get("/reviews/pending", response_model=dict)
async def get_pending_reviews(
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Diagnosis).where(Diagnosis.status.in_([DiagnosisStatus.AI_PREDICTED, DiagnosisStatus.UNDER_REVIEW]))
    )
    diagnoses = result.scalars().all()
    
    pending_list = []
    for d in diagnoses:
        pending_list.append({
            "diagnosis_id": str(d.id),
            "crop": "Tomato",
            "predicted_disease": d.predicted_disease,
            "confidence": d.confidence,
            "severity": d.severity.value if hasattr(d.severity, "value") else str(d.severity),
            "status": d.status.value if hasattr(d.status, "value") else str(d.status),
            "farmer_name": "Rajesh Kumar",
            "location": "Block A, Nashik District",
            "image_url": "/static/samples/tomato_blight.jpg",
            "symptoms": "Dark brown leaf concentric rings with yellow chlorotic halos.",
            "weather_context": "84% Humidity, 27°C Temperature. Fungal conducive.",
            "created_at": d.created_at.isoformat()
        })
    return success_response(data=pending_list)

@router.post("/reviews", response_model=dict)
async def submit_expert_review(
    payload: ExpertReviewCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Diagnosis).where(Diagnosis.id == payload.diagnosis_id))
    diag = result.scalar_one_or_none()
    if not diag:
        return error_response("NOT_FOUND", "Diagnosis not found", 404)
        
    review = ExpertReview(
        diagnosis_id=diag.id,
        expert_id=current_user.id,
        decision=payload.decision,
        notes=payload.notes,
        recommendation=payload.recommendation
    )
    db.add(review)
    
    # Update diagnosis status based on expert decision
    if payload.decision.upper() == "CONFIRM":
        diag.status = DiagnosisStatus.CONFIRMED
        diag.expert_diagnosis = diag.predicted_disease
    elif payload.decision.upper() == "REJECT":
        diag.status = DiagnosisStatus.REJECTED
    elif payload.decision.upper() == "LAB_REQUIRED":
        diag.status = DiagnosisStatus.LAB_REQUIRED
    else:
        diag.status = DiagnosisStatus.CONFIRMED
        diag.expert_diagnosis = payload.decision
        
    diag.expert_id = current_user.id
    await db.commit()
    
    return success_response(message=f"Expert decision '{payload.decision}' submitted successfully")

@router.post("/lab/referrals", response_model=dict)
async def create_lab_referral(
    payload: LabReferralCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Diagnosis).where(Diagnosis.id == payload.diagnosis_id))
    diag = result.scalar_one_or_none()
    if not diag:
        return error_response("NOT_FOUND", "Diagnosis not found", 404)
        
    referral = LabReferral(
        diagnosis_id=diag.id,
        lab_name=payload.lab_name or "District Central Phytopathology Laboratory",
        notes=payload.notes or "Pathogen culture analysis requested due to ambiguous leaf symptoms.",
        status=LabStatus.REQUESTED
    )
    diag.status = DiagnosisStatus.LAB_REQUIRED
    db.add(referral)
    await db.commit()
    await db.refresh(referral)
    
    return success_response(
        data={
            "id": str(referral.id),
            "lab_name": referral.lab_name,
            "status": referral.status.value,
            "created_at": referral.created_at.isoformat()
        },
        message="Laboratory referral registered successfully",
        status_code=201
    )
