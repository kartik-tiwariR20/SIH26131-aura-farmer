import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from geoalchemy2 import Geometry
from sqlalchemy.orm import relationship
from app.database import Base
import uuid


class UserRole(str, enum.Enum):
    FARMER = "FARMER"
    EXTENSION_WORKER = "EXTENSION_WORKER"
    EXPERT = "EXPERT"
    AGRICULTURE_OFFICIAL = "AGRICULTURE_OFFICIAL"
    ADMIN = "ADMIN"


class DiagnosisStatus(str, enum.Enum):
    AI_PREDICTED = "AI_PREDICTED"
    UNDER_REVIEW = "UNDER_REVIEW"
    CONFIRMED = "CONFIRMED"
    REJECTED = "REJECTED"
    LAB_REQUIRED = "LAB_REQUIRED"
    RESOLVED = "RESOLVED"


class RiskLevel(str, enum.Enum):
    LOW = "LOW"
    MODERATE = "MODERATE"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class AlertType(str, enum.Enum):
    DISEASE_RISK = "DISEASE_RISK"
    PEST_OUTBREAK = "PEST_OUTBREAK"
    WEATHER_RISK = "WEATHER_RISK"
    EXPERT_REVIEW = "EXPERT_REVIEW"
    LAB_RESULT = "LAB_RESULT"
    FOLLOW_UP = "FOLLOW_UP"


class AlertSeverity(str, enum.Enum):
    INFO = "INFO"
    WARNING = "WARNING"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class LabStatus(str, enum.Enum):
    REQUESTED = "REQUESTED"
    SAMPLE_COLLECTED = "SAMPLE_COLLECTED"
    IN_ANALYSIS = "IN_ANALYSIS"
    RESULT_AVAILABLE = "RESULT_AVAILABLE"
    CLOSED = "CLOSED"


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone = Column(String(50), nullable=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(SQLEnum(UserRole), default=UserRole.FARMER, nullable=False)
    language = Column(String(10), default="en")
    created_at = Column(DateTime, default=datetime.utcnow)

    farms = relationship("Farm", back_populates="owner")
    expert_reviews = relationship("ExpertReview", back_populates="expert")
    alerts = relationship("Alert", back_populates="user")


class Farm(Base):
    __tablename__ = "farms"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=True)
    district = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    area = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="farms")
    fields = relationship("Field", back_populates="farm")


class Field(Base):
    __tablename__ = "fields"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    farm_id = Column(UUID(as_uuid=True), ForeignKey("farms.id"), nullable=False)
    crop = Column(String(100), nullable=False)
    variety = Column(String(100), nullable=True)
    area = Column(Float, nullable=True)
    soil_type = Column(String(100), nullable=True)
    sowing_date = Column(DateTime, nullable=True)
    growth_stage = Column(String(100), nullable=True)
    geometry = Column(Geometry("POLYGON", srid=4326), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    farm = relationship("Farm", back_populates="fields")
    observations = relationship("CropObservation", back_populates="field")
    risk_forecasts = relationship("RiskForecast", back_populates="field")
    advisories = relationship("Advisory", back_populates="field")


class CropObservation(Base):
    __tablename__ = "crop_observations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    field_id = Column(UUID(as_uuid=True), ForeignKey("fields.id"), nullable=False)
    image_url = Column(String(500), nullable=True)
    crop = Column(String(100), nullable=False)
    symptoms = Column(Text, nullable=True)
    weather_context = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    field = relationship("Field", back_populates="observations")
    diagnosis = relationship("Diagnosis", back_populates="observation", uselist=False)


class Diagnosis(Base):
    __tablename__ = "diagnoses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    observation_id = Column(UUID(as_uuid=True), ForeignKey("crop_observations.id"), unique=True, nullable=False)
    predicted_disease = Column(String(255), nullable=False)
    confidence = Column(Float, nullable=False)
    severity = Column(SQLEnum(RiskLevel), default=RiskLevel.LOW)
    model_version = Column(String(50), nullable=True)
    status = Column(SQLEnum(DiagnosisStatus), default=DiagnosisStatus.AI_PREDICTED)
    expert_diagnosis = Column(String(255), nullable=True)
    expert_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    observation = relationship("CropObservation", back_populates="diagnosis")
    expert_reviews = relationship("ExpertReview", back_populates="diagnosis")
    lab_referral = relationship("LabReferral", back_populates="diagnosis", uselist=False)


class PestReport(Base):
    __tablename__ = "pest_reports"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    field_id = Column(UUID(as_uuid=True), ForeignKey("fields.id"), nullable=False)
    pest_type = Column(String(100), nullable=False)
    count = Column(Integer, default=0)
    trap_type = Column(String(100), nullable=True)
    image_url = Column(String(500), nullable=True)
    location = Column(Geometry("POINT", srid=4326), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class WeatherObservation(Base):
    __tablename__ = "weather_observations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    location = Column(String(255), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    temperature = Column(Float, nullable=True)
    humidity = Column(Float, nullable=True)
    rainfall = Column(Float, nullable=True)
    wind_speed = Column(Float, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)


class RiskForecast(Base):
    __tablename__ = "risk_forecasts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    field_id = Column(UUID(as_uuid=True), ForeignKey("fields.id"), nullable=False)
    disease = Column(String(255), nullable=False)
    risk_level = Column(SQLEnum(RiskLevel), default=RiskLevel.LOW)
    risk_score = Column(Float, default=0.0)
    forecast_date = Column(DateTime, nullable=False)
    explanation = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    field = relationship("Field", back_populates="risk_forecasts")


class Advisory(Base):
    __tablename__ = "advisories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    field_id = Column(UUID(as_uuid=True), ForeignKey("fields.id"), nullable=False)
    diagnosis_id = Column(UUID(as_uuid=True), ForeignKey("diagnoses.id"), nullable=True)
    disease = Column(String(255), nullable=False)
    language = Column(String(10), default="en")
    severity = Column(SQLEnum(RiskLevel), default=RiskLevel.LOW)
    actions = Column(Text, nullable=True)
    safe_input_guidance = Column(Text, nullable=True)
    preventive_actions = Column(Text, nullable=True)
    monitoring_guidance = Column(Text, nullable=True)
    when_to_contact_expert = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    field = relationship("Field", back_populates="advisories")


class ExpertReview(Base):
    __tablename__ = "expert_reviews"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    diagnosis_id = Column(UUID(as_uuid=True), ForeignKey("diagnoses.id"), nullable=False)
    expert_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    decision = Column(String(50), nullable=False)
    notes = Column(Text, nullable=True)
    recommendation = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    diagnosis = relationship("Diagnosis", back_populates="expert_reviews")
    expert = relationship("User", back_populates="expert_reviews")


class LabReferral(Base):
    __tablename__ = "lab_referrals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    diagnosis_id = Column(UUID(as_uuid=True), ForeignKey("diagnoses.id"), nullable=False)
    lab_name = Column(String(255), nullable=True)
    status = Column(SQLEnum(LabStatus), default=LabStatus.REQUESTED)
    notes = Column(Text, nullable=True)
    additional_images = Column(Text, nullable=True)
    result = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    diagnosis = relationship("Diagnosis", back_populates="lab_referral")


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    type = Column(SQLEnum(AlertType), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    severity = Column(SQLEnum(AlertSeverity), default=AlertSeverity.INFO)
    read = Column(String(10), default="false")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="alerts")
