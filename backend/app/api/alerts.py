from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import Alert, User, AlertType, AlertSeverity
from app.api.auth import get_current_user
from app.utils.response import success_response

router = APIRouter()

@router.get("", response_model=dict)
@router.get("/", response_model=dict)
async def list_alerts(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Alert).where(Alert.user_id == current_user.id).order_by(Alert.created_at.desc()))
    alerts = result.scalars().all()
    
    if not alerts:
        # Generate default system alerts for demo
        demo_alerts = [
            {
                "id": "alert-1",
                "type": AlertType.DISEASE_RISK.value,
                "title": "High Early Blight Risk",
                "message": "High humidity (84%) in Nashik Block A creates favorable conditions for Early Blight.",
                "severity": AlertSeverity.HIGH.value,
                "read": False,
                "created_at": "2026-09-04T18:30:00"
            },
            {
                "id": "alert-2",
                "type": AlertType.PEST_OUTBREAK.value,
                "title": "Aphid Trap Count Threshold Exceeded",
                "message": "Yellow sticky trap #4 detected >25 aphids/day. Immediate biological control advised.",
                "severity": AlertSeverity.WARNING.value,
                "read": False,
                "created_at": "2026-09-04T12:15:00"
            },
            {
                "id": "alert-3",
                "type": AlertType.EXPERT_REVIEW.value,
                "title": "Expert Review Completed",
                "message": "Dr. V. Sharma confirmed Tomato Early Blight diagnosis for North Field.",
                "severity": AlertSeverity.INFO.value,
                "read": True,
                "created_at": "2026-09-03T09:00:00"
            }
        ]
        return success_response(data=demo_alerts)

    out = []
    for a in alerts:
        out.append({
            "id": str(a.id),
            "type": a.type.value if hasattr(a.type, "value") else str(a.type),
            "title": a.title,
            "message": a.message,
            "severity": a.severity.value if hasattr(a.severity, "value") else str(a.severity),
            "read": a.read == "true" or a.read is True,
            "created_at": a.created_at.isoformat()
        })
    return success_response(data=out)

@router.put("/{alert_id}/read", response_model=dict)
async def mark_alert_read(
    alert_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Alert).where(Alert.id == alert_id, Alert.user_id == current_user.id))
    alert = result.scalar_one_or_none()
    if alert:
        alert.read = "true"
        await db.commit()
    return success_response(message="Alert marked as read")
