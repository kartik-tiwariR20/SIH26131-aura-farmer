from fastapi import APIRouter, Query
from typing import Optional
from app.utils.response import success_response

router = APIRouter()

@router.get("/hotspots", response_model=dict)
@router.get("", response_model=dict)
async def get_hotspots(
    district: Optional[str] = Query(None),
    block: Optional[str] = Query(None),
    crop: Optional[str] = Query(None),
    disease: Optional[str] = Query(None),
    pest: Optional[str] = Query(None),
    risk_level: Optional[str] = Query(None)
):
    # Realistic regional geospatial hotspots around Nashik / Pune / Satara agricultural belt
    hotspots = [
        {
            "id": "hs-101",
            "latitude": 20.0059,
            "longitude": 73.7898,
            "district": "Nashik",
            "block": "Block A (Niphad)",
            "area_name": "Niphad Grape & Tomato Belt",
            "crop": "Tomato",
            "disease": "Tomato Early Blight",
            "pest_type": "Aphids",
            "risk_level": "CRITICAL",
            "risk_score": 88.5,
            "case_count": 24,
            "confirmed_cases": 18,
            "recent_trend": "+22% over last 7 days",
            "weather_summary": "86% Humidity, 27.5°C Temp",
            "extension_worker": "Sanjay Patil (Extension Officer)"
        },
        {
            "id": "hs-102",
            "latitude": 19.9975,
            "longitude": 73.7810,
            "district": "Nashik",
            "block": "Block B (Sinnar)",
            "area_name": "Sinnar Cotton & Onion Valley",
            "crop": "Cotton",
            "disease": "Cotton Bacterial Blight",
            "pest_type": "Whitefly",
            "risk_level": "HIGH",
            "risk_score": 72.0,
            "case_count": 14,
            "confirmed_cases": 11,
            "recent_trend": "+12% over last 7 days",
            "weather_summary": "82% Humidity, 28°C Temp",
            "extension_worker": "Anil Deshmukh"
        },
        {
            "id": "hs-103",
            "latitude": 19.8762,
            "longitude": 73.8421,
            "district": "Nashik",
            "block": "Block C (Igatpuri)",
            "area_name": "Igatpuri Rice Terraces",
            "crop": "Rice",
            "disease": "Rice Bacterial Leaf Blight",
            "pest_type": "Stem Borer",
            "risk_level": "MODERATE",
            "risk_score": 52.4,
            "case_count": 8,
            "confirmed_cases": 6,
            "recent_trend": "Stable (-2%)",
            "weather_summary": "76% Humidity, 25°C Temp",
            "extension_worker": "Ramesh Pawar"
        },
        {
            "id": "hs-104",
            "latitude": 20.0891,
            "longitude": 73.8820,
            "district": "Nashik",
            "block": "Block D (Dindori)",
            "area_name": "Dindori Sugarcane Fields",
            "crop": "Sugarcane",
            "disease": "Sugarcane Red Rot",
            "pest_type": "Thrips",
            "risk_level": "LOW",
            "risk_score": 24.1,
            "case_count": 3,
            "confirmed_cases": 2,
            "recent_trend": "-15% over last 7 days",
            "weather_summary": "68% Humidity, 26°C Temp",
            "extension_worker": "Pooja Jadhav"
        }
    ]

    filtered = hotspots
    if district and district != "All":
        filtered = [h for h in filtered if h["district"].lower() == district.lower()]
    if crop and crop != "All":
        filtered = [h for h in filtered if crop.lower() in h["crop"].lower()]
    if risk_level and risk_level != "All":
        filtered = [h for h in filtered if h["risk_level"].lower() == risk_level.lower()]

    return success_response(data=filtered)
