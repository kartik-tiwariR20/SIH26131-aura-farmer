from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
from enum import Enum


class UserRole(str, Enum):
    FARMER = "FARMER"
    EXTENSION_WORKER = "EXTENSION_WORKER"
    EXPERT = "EXPERT"
    AGRICULTURE_OFFICIAL = "AGRICULTURE_OFFICIAL"
    ADMIN = "ADMIN"


class RiskLevel(str, Enum):
    LOW = "LOW"
    MODERATE = "MODERATE"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class DiagnosisStatus(str, Enum):
    AI_PREDICTED = "AI_PREDICTED"
    UNDER_REVIEW = "UNDER_REVIEW"
    CONFIRMED = "CONFIRMED"
    REJECTED = "REJECTED"
    LAB_REQUIRED = "LAB_REQUIRED"
    RESOLVED = "RESOLVED"


class AlertType(str, Enum):
    DISEASE_RISK = "DISEASE_RISK"
    PEST_OUTBREAK = "PEST_OUTBREAK"
    WEATHER_RISK = "WEATHER_RISK"
    EXPERT_REVIEW = "EXPERT_REVIEW"
    LAB_RESULT = "LAB_RESULT"
    FOLLOW_UP = "FOLLOW_UP"


class AlertSeverity(str, Enum):
    INFO = "INFO"
    WARNING = "WARNING"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class LabStatus(str, Enum):
    REQUESTED = "REQUESTED"
    SAMPLE_COLLECTED = "SAMPLE_COLLECTED"
    IN_ANALYSIS = "IN_ANALYSIS"
    RESULT_AVAILABLE = "RESULT_AVAILABLE"
    CLOSED = "CLOSED"


# Base response wrapper
class ApiResponse(BaseModel):
    success: bool = True
    data: Optional[dict] = None
    message: Optional[str] = None


class ErrorResponse(BaseModel):
    success: bool = False
    error: dict


# Auth schemas
class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    phone: Optional[str] = None
    password: str = Field(..., min_length=6)
    role: UserRole = UserRole.FARMER
    language: str = "en"


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str]
    role: UserRole
    language: str
    created_at: datetime

    class Config:
        from_attributes = True


# Farm schemas
class FarmCreate(BaseModel):
    name: str
    location: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None
    area: Optional[float] = None


class FarmOut(BaseModel):
    id: str
    owner_id: str
    name: str
    location: Optional[str]
    district: Optional[str]
    state: Optional[str]
    area: Optional[float]
    created_at: datetime

    class Config:
        from_attributes = True


# Field schemas
class FieldCreate(BaseModel):
    farm_id: str
    crop: str
    variety: Optional[str] = None
    area: Optional[float] = None
    soil_type: Optional[str] = None
    sowing_date: Optional[datetime] = None
    growth_stage: Optional[str] = None
    geometry: Optional[dict] = None


class FieldOut(BaseModel):
    id: str
    farm_id: str
    crop: str
    variety: Optional[str]
    area: Optional[float]
    soil_type: Optional[str]
    sowing_date: Optional[datetime]
    growth_stage: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class FieldHealthOut(FieldOut):
    risk_score: Optional[float] = 0.0
    risk_level: Optional[RiskLevel] = RiskLevel.LOW
    recent_diagnosis_count: int = 0


# Observation & Diagnosis schemas
class ObservationCreate(BaseModel):
    field_id: str
    crop: str
    symptoms: Optional[str] = None
    weather_context: Optional[str] = None


class ObservationOut(BaseModel):
    id: str
    field_id: str
    image_url: Optional[str]
    crop: str
    symptoms: Optional[str]
    weather_context: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class DiagnosisOut(BaseModel):
    id: str
    observation_id: str
    predicted_disease: str
    confidence: float
    severity: RiskLevel
    model_version: Optional[str]
    status: DiagnosisStatus
    expert_diagnosis: Optional[str]
    expert_id: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class DiagnosisDetailOut(DiagnosisOut):
    observation: Optional[ObservationOut] = None
    risk_factors: Optional[dict] = None
    recommended_actions: Optional[List[str]] = None


# Expert review schemas
class ExpertReviewCreate(BaseModel):
    diagnosis_id: str
    decision: str
    notes: Optional[str] = None
    recommendation: Optional[str] = None


class ExpertReviewOut(BaseModel):
    id: str
    diagnosis_id: str
    expert_id: str
    expert_name: Optional[str] = None
    decision: str
    notes: Optional[str]
    recommendation: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# Pest report schemas
class PestReportCreate(BaseModel):
    field_id: str
    pest_type: str
    count: int = 0
    trap_type: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class PestReportOut(BaseModel):
    id: str
    field_id: str
    pest_type: str
    count: int
    trap_type: Optional[str]
    image_url: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    created_at: datetime

    class Config:
        from_attributes = True


# Weather schemas
class WeatherOut(BaseModel):
    id: str
    location: str
    latitude: Optional[float]
    longitude: Optional[float]
    temperature: Optional[float]
    humidity: Optional[float]
    rainfall: Optional[float]
    wind_speed: Optional[float]
    timestamp: datetime

    class Config:
        from_attributes = True


class WeatherRiskOut(BaseModel):
    temperature: Optional[float]
    humidity: Optional[float]
    rainfall: Optional[float]
    wind_speed: Optional[float]
    disease_conducive: bool
    risk_change_percent: Optional[float]
    explanation: Optional[str]


# Risk forecast schemas
class RiskForecastOut(BaseModel):
    id: str
    field_id: str
    disease: str
    risk_level: RiskLevel
    risk_score: float
    forecast_date: datetime
    explanation: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# Advisory schemas
class AdvisoryOut(BaseModel):
    id: str
    field_id: str
    diagnosis_id: Optional[str]
    disease: str
    language: str
    severity: RiskLevel
    actions: Optional[str]
    safe_input_guidance: Optional[str]
    preventive_actions: Optional[str]
    monitoring_guidance: Optional[str]
    when_to_contact_expert: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# Alert schemas
class AlertOut(BaseModel):
    id: str
    user_id: str
    type: AlertType
    title: str
    message: str
    severity: AlertSeverity
    read: bool = False
    created_at: datetime

    class Config:
        from_attributes = True


# Lab referral schemas
class LabReferralCreate(BaseModel):
    diagnosis_id: str
    lab_name: Optional[str] = None
    notes: Optional[str] = None


class LabReferralOut(BaseModel):
    id: str
    diagnosis_id: str
    lab_name: Optional[str]
    status: LabStatus
    notes: Optional[str]
    result: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# Analytics schemas
class OverviewStats(BaseModel):
    total_fields_monitored: int
    active_alerts: int
    high_risk_fields: int
    confirmed_cases: int
    pending_expert_reviews: int
    total_diagnoses: int


class DiseaseTrend(BaseModel):
    date: str
    count: int
    disease: Optional[str]


class CropDistribution(BaseModel):
    crop: str
    count: int
    percentage: float


class RiskDistribution(BaseModel):
    risk_level: RiskLevel
    count: int
    percentage: float


class HotspotOut(BaseModel):
    latitude: float
    longitude: float
    risk_level: RiskLevel
    disease: Optional[str]
    pest_type: Optional[str]
    case_count: int
    area_name: Optional[str]
    recent_trend: Optional[str]
