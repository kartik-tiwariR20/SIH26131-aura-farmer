import asyncio
from datetime import datetime, timedelta
import uuid
from sqlalchemy import select
from app.database import engine, async_session, Base
from app.models import (
    User, UserRole, Farm, Field, CropObservation, Diagnosis, 
    DiagnosisStatus, RiskLevel, WeatherObservation, RiskForecast, 
    Advisory, PestReport, Alert, AlertType, AlertSeverity
)
from app.utils.auth import get_password_hash

async def seed_data():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as db:
        # Check existing
        result = await db.execute(select(User).where(User.email == "farmer@example.com"))
        if result.scalar_one_or_none():
            print("Database already seeded.")
            return

        print("Seeding CropGuard database...")

        # 1. Users
        pwd_hash = get_password_hash("Farmer@123")
        expert_pwd = get_password_hash("Expert@123")
        official_pwd = get_password_hash("Official@123")

        farmer = User(
            name="Rajesh Kumar",
            email="farmer@example.com",
            phone="+91 9876543210",
            password_hash=pwd_hash,
            role=UserRole.FARMER,
            language="en"
        )
        expert = User(
            name="Dr. V. Sharma (Phytopathologist)",
            email="expert@example.com",
            phone="+91 9812345678",
            password_hash=expert_pwd,
            role=UserRole.EXPERT,
            language="en"
        )
        official = User(
            name="Sanjay Patil (Agriculture Officer)",
            email="official@example.com",
            phone="+91 9898989898",
            password_hash=official_pwd,
            role=UserRole.AGRICULTURE_OFFICIAL,
            language="en"
        )

        db.add_all([farmer, expert, official])
        await db.flush()

        # 2. Farm
        farm = Farm(
            owner_id=farmer.id,
            name="Green Valley Farm",
            location="Niphad, Nashik",
            district="Nashik",
            state="Maharashtra",
            area=5.5
        )
        db.add(farm)
        await db.flush()

        # 3. Fields
        field_tomato = Field(
            farm_id=farm.id,
            crop="Tomato",
            variety="Abhinav Hybrid",
            area=2.0,
            soil_type="Black Clay Loam",
            growth_stage="Flowering & Early Fruiting"
        )
        field_cotton = Field(
            farm_id=farm.id,
            crop="Cotton",
            variety="Bt Cotton RCH-2",
            area=3.5,
            soil_type="Deep Black Soil",
            growth_stage="Vegetative"
        )
        db.add_all([field_tomato, field_cotton])
        await db.flush()

        # 4. Crop Observation & Diagnosis
        obs = CropObservation(
            field_id=field_tomato.id,
            image_url="/static/samples/tomato_blight.jpg",
            crop="Tomato",
            symptoms="Dark brown leaf spots with yellow halo, slight stem lesion",
            weather_context="84% Relative Humidity, 27°C Temperature. Fungal incubation conditions."
        )
        db.add(obs)
        await db.flush()

        diag = Diagnosis(
            observation_id=obs.id,
            predicted_disease="Tomato Early Blight",
            confidence=0.94,
            severity=RiskLevel.HIGH,
            model_version="MobileNetV2-v1.0",
            status=DiagnosisStatus.CONFIRMED,
            expert_diagnosis="Tomato Early Blight",
            expert_id=expert.id
        )
        db.add(diag)
        await db.flush()

        # 5. Advisory
        adv = Advisory(
            field_id=field_tomato.id,
            diagnosis_id=diag.id,
            disease="Tomato Early Blight",
            language="en",
            severity=RiskLevel.HIGH,
            actions="1. Remove heavily infected leaves.\n2. Improve field airflow.\n3. Avoid overhead irrigation.\n4. Monitor affected plants every 24-48 hours.",
            safe_input_guidance="Use only locally approved product and follow registered label, dose, and safety instructions.",
            preventive_actions="• Practice crop rotation with non-solanaceous crops.\n• Apply Trichoderma bio-fungicide.",
            monitoring_guidance="Inspect lower canopy leaves every 48 hours.",
            when_to_contact_expert="Contact extension worker if symptoms spread to >15% plants."
        )
        db.add(adv)

        # 6. Pest Report
        pest = PestReport(
            field_id=field_cotton.id,
            pest_type="Aphids",
            count=18,
            trap_type="Yellow Sticky Trap"
        )
        db.add(pest)

        # 7. Weather
        weather = WeatherObservation(
            location="Niphad, Nashik",
            latitude=20.0059,
            longitude=73.7898,
            temperature=27.2,
            humidity=84.0,
            rainfall=18.5,
            wind_speed=11.2
        )
        db.add(weather)

        # 8. Alerts
        alert1 = Alert(
            user_id=farmer.id,
            type=AlertType.DISEASE_RISK,
            title="High Early Blight Risk",
            message="Humidity (84%) in Nashik Block creates favorable conditions for fungal growth.",
            severity=AlertSeverity.HIGH
        )
        alert2 = Alert(
            user_id=farmer.id,
            type=AlertType.EXPERT_REVIEW,
            title="Expert Review Confirmed",
            message="Dr. V. Sharma verified your Tomato Early Blight diagnosis with high confidence.",
            severity=AlertSeverity.INFO
        )
        db.add_all([alert1, alert2])

        await db.commit()
        print("Database seeded successfully with demo accounts!")

if __name__ == "__main__":
    asyncio.run(seed_data())
