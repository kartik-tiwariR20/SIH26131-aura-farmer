from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
import uuid

from app.database import get_db
from app.models import CropObservation, Diagnosis, Field, Advisory, RiskForecast, DiagnosisStatus, User
from app.schemas import DiagnosisOut, DiagnosisDetailOut
from app.api.auth import get_current_user
from app.services.ml_service import predict_crop_disease
from app.services.weather_service import WeatherService
from app.services.risk_engine import RiskEngine
from app.services.advisory_service import AdvisoryService
from app.services.storage_service import StorageService
from app.utils.response import success_response, error_response

router = APIRouter()

@router.post("", response_model=dict)
@router.post("/", response_model=dict)
async def create_diagnosis(
    field_id: str = Form(...),
    crop: str = Form(...),
    variety: Optional[str] = Form(None),
    growth_stage: Optional[str] = Form(None),
    soil_condition: Optional[str] = Form(None),
    symptoms: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Upload image
    image_url = "/static/samples/tomato_blight.jpg"
    file_bytes = None
    if file:
        file_bytes = await file.read()
        image_url = await StorageService.upload_image(file_bytes, file.filename)
        
    # 1. Run AI ML inference
    prediction = await predict_crop_disease(image_bytes=file_bytes, crop_hint=crop)
    predicted_disease = prediction["predicted_disease"]
    confidence = prediction["confidence"]
    
    # 2. Get Weather context
    weather_info = await WeatherService.get_current_weather()
    
    # 3. Context-Aware Risk Calculation
    risk_info = RiskEngine.calculate_disease_risk(
        disease_name=predicted_disease,
        confidence=confidence,
        weather=weather_info,
        growth_stage=growth_stage or "Flowering",
        soil_type=soil_condition or "Black Clay",
        pest_count=2,
        nearby_cases_count=4
    )
    
    # 4. Generate Advisory
    advisory_info = AdvisoryService.generate_advisory(
        disease=predicted_disease,
        crop=crop,
        severity=risk_info["risk_level"].value,
        language=current_user.language or "en"
    )
    
    # Store Observation
    obs = CropObservation(
        field_id=field_id,
        image_url=image_url,
        crop=crop,
        symptoms=symptoms or "Visible leaf spots and stem discoloration",
        weather_context=weather_info["explanation"]
    )
    db.add(obs)
    await db.flush()
    
    # Store Diagnosis
    diag = Diagnosis(
        observation_id=obs.id,
        predicted_disease=predicted_disease,
        confidence=confidence,
        severity=risk_info["risk_level"],
        model_version=prediction["model_version"],
        status=DiagnosisStatus.AI_PREDICTED
    )
    db.add(diag)
    await db.flush()
    
    # Store Advisory
    adv = Advisory(
        field_id=field_id,
        diagnosis_id=diag.id,
        disease=predicted_disease,
        language=current_user.language or "en",
        severity=risk_info["risk_level"],
        actions=advisory_info["actions"],
        safe_input_guidance=advisory_info["safe_input_guidance"],
        preventive_actions=advisory_info["preventive_actions"],
        monitoring_guidance=advisory_info["monitoring_guidance"],
        when_to_contact_expert=advisory_info["when_to_contact_expert"]
    )
    db.add(adv)
    
    # Store Risk Forecast
    rf = RiskForecast(
        field_id=field_id,
        disease=predicted_disease,
        risk_level=risk_info["risk_level"],
        risk_score=risk_info["risk_score"],
        forecast_date=obs.created_at,
        explanation=risk_info["explanation"]
    )
    db.add(rf)
    
    await db.commit()
    await db.refresh(diag)
    
    res_data = {
        "diagnosis_id": str(diag.id),
        "predicted_disease": predicted_disease,
        "confidence": confidence,
        "severity": risk_info["risk_level"].value,
        "risk_score": risk_info["risk_score"],
        "status": diag.status.value,
        "image_url": image_url,
        "weather_context": weather_info,
        "risk_factors": risk_info["risk_factors"],
        "reasons": risk_info["reasons"],
        "advisory": advisory_info,
        "disclaimer": "AI-assisted preliminary assessment. Expert verification recommended for low confidence cases."
    }
    
    return success_response(data=res_data, message="Crop analysis completed successfully", status_code=201)

@router.get("", response_model=dict)
@router.get("/", response_model=dict)
async def list_diagnoses(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Diagnosis).order_by(Diagnosis.created_at.desc()))
    diagnoses = result.scalars().all()
    
    out = []
    for d in diagnoses:
        out.append({
            "id": str(d.id),
            "predicted_disease": d.predicted_disease,
            "confidence": d.confidence,
            "severity": d.severity.value if hasattr(d.severity, "value") else str(d.severity),
            "status": d.status.value if hasattr(d.status, "value") else str(d.status),
            "created_at": d.created_at.isoformat()
        })
    return success_response(data=out)

@router.get("/{diagnosis_id}", response_model=dict)
async def get_diagnosis(
    diagnosis_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Diagnosis).where(Diagnosis.id == diagnosis_id))
    diag = result.scalar_one_or_none()
    if not diag:
        return error_response("NOT_FOUND", "Diagnosis not found", 404)
        
    advisory = AdvisoryService.generate_advisory(diag.predicted_disease)
    weather = await WeatherService.get_current_weather()
    risk = RiskEngine.calculate_disease_risk(diag.predicted_disease, diag.confidence, weather)
    
    return success_response(data={
        "id": str(diag.id),
        "predicted_disease": diag.predicted_disease,
        "confidence": diag.confidence,
        "severity": diag.severity.value,
        "status": diag.status.value,
        "expert_diagnosis": diag.expert_diagnosis,
        "risk_score": risk["risk_score"],
        "risk_factors": risk["risk_factors"],
        "reasons": risk["reasons"],
        "advisory": advisory,
        "weather_context": weather,
        "created_at": diag.created_at.isoformat()
    })
