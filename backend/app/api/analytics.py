from fastapi import APIRouter
from app.utils.response import success_response

router = APIRouter()

@router.get("/overview", response_model=dict)
@router.get("", response_model=dict)
async def get_analytics_overview():
    kpi_stats = {
        "total_fields_monitored": 1420,
        "active_alerts": 38,
        "high_risk_fields": 112,
        "confirmed_cases": 284,
        "pending_expert_reviews": 17,
        "total_diagnoses": 640
    }
    
    disease_trend = [
        {"date": "Mon", "Early Blight": 12, "Bacterial Blight": 8, "Stripe Rust": 4},
        {"date": "Tue", "Early Blight": 18, "Bacterial Blight": 10, "Stripe Rust": 6},
        {"date": "Wed", "Early Blight": 24, "Bacterial Blight": 14, "Stripe Rust": 9},
        {"date": "Thu", "Early Blight": 31, "Bacterial Blight": 19, "Stripe Rust": 11},
        {"date": "Fri", "Early Blight": 28, "Bacterial Blight": 16, "Stripe Rust": 8},
        {"date": "Sat", "Early Blight": 36, "Bacterial Blight": 22, "Stripe Rust": 14},
        {"date": "Sun", "Early Blight": 42, "Bacterial Blight": 25, "Stripe Rust": 17},
    ]

    crop_distribution = [
        {"crop": "Tomato", "count": 480, "percentage": 33.8},
        {"crop": "Cotton", "count": 360, "percentage": 25.3},
        {"crop": "Rice", "count": 290, "percentage": 20.4},
        {"crop": "Sugarcane", "count": 170, "percentage": 12.0},
        {"crop": "Wheat", "count": 120, "percentage": 8.5},
    ]

    risk_distribution = [
        {"risk_level": "LOW", "name": "Low Risk", "count": 820, "percentage": 57.7, "color": "#22C55E"},
        {"risk_level": "MODERATE", "name": "Moderate", "count": 488, "percentage": 34.4, "color": "#EAB308"},
        {"risk_level": "HIGH", "name": "High Risk", "count": 88, "percentage": 6.2, "color": "#F97316"},
        {"risk_level": "CRITICAL", "name": "Critical", "count": 24, "percentage": 1.7, "color": "#EF4444"},
    ]

    weekly_cases = [
        {"week": "Week 1", "cases": 84, "confirmed": 68},
        {"week": "Week 2", "cases": 112, "confirmed": 95},
        {"week": "Week 3", "cases": 156, "confirmed": 130},
        {"week": "Week 4", "cases": 198, "confirmed": 172},
    ]

    top_diseases = [
        {"disease": "Tomato Early Blight", "count": 142},
        {"disease": "Cotton Bacterial Blight", "count": 98},
        {"disease": "Rice Bacterial Leaf Blight", "count": 76},
        {"disease": "Sugarcane Red Rot", "count": 54},
        {"disease": "Wheat Stripe Rust", "count": 38},
    ]

    return success_response(data={
        "stats": kpi_stats,
        "disease_trend": disease_trend,
        "crop_distribution": crop_distribution,
        "risk_distribution": risk_distribution,
        "weekly_cases": weekly_cases,
        "top_diseases": top_diseases
    })
