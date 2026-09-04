from app.models import RiskLevel
from typing import Dict, Any

class RiskEngine:
    @staticmethod
    def calculate_disease_risk(
        disease_name: str,
        confidence: float,
        weather: Dict[str, Any],
        growth_stage: str = "Flowering",
        soil_type: str = "Black Clay",
        pest_count: int = 0,
        nearby_cases_count: int = 3
    ) -> Dict[str, Any]:
        """
        Context-Aware Risk Engine calculating composite Risk Score (0-100), Risk Level, and Evidence breakdown.
        """
        base_score = confidence * 40  # ML image confidence contributes up to 40 points

        # Weather factor (up to 25 points)
        humidity = weather.get("humidity", 70)
        temp = weather.get("temperature", 25)
        rainfall = weather.get("rainfall", 0)

        weather_score = 0
        if humidity > 80:
            weather_score += 12
        elif humidity > 70:
            weather_score += 7

        if 22 <= temp <= 32:
            weather_score += 8

        if rainfall > 10:
            weather_score += 5

        # Stage & soil vulnerability factor (up to 15 points)
        stage_score = 0
        stage_lower = (growth_stage or "").lower()
        if "flowering" in stage_lower or "fruiting" in stage_lower:
            stage_score += 10
        elif "vegetative" in stage_lower:
            stage_score += 6

        # Regional outbreak density (up to 12 points)
        nearby_score = min(nearby_cases_count * 3, 12)

        # Pest trap vector (up to 8 points)
        pest_score = min(pest_count * 2, 8)

        total_risk_score = round(base_score + weather_score + stage_score + nearby_score + pest_score, 1)
        total_risk_score = min(max(total_risk_score, 0.0), 100.0)

        if total_risk_score >= 80:
            risk_level = RiskLevel.CRITICAL
        elif total_risk_score >= 60:
            risk_level = RiskLevel.HIGH
        elif total_risk_score >= 35:
            risk_level = RiskLevel.MODERATE
        else:
            risk_level = RiskLevel.LOW

        reasons = []
        if humidity > 75:
            reasons.append(f"Recent humidity is high ({humidity}%)")
        if 20 <= temp <= 30:
            reasons.append(f"Temperature range ({temp}°C) favors pathogen incubation")
        if nearby_cases_count > 0:
            reasons.append(f"{nearby_cases_count} similar cases reported within 15 km")
        if "flowering" in stage_lower or "fruiting" in stage_lower:
            reasons.append(f"Crop is in vulnerable stage ({growth_stage})")
        if pest_count > 0:
            reasons.append(f"Elevated pest activity ({pest_count} pests recorded in traps)")

        return {
            "risk_score": total_risk_score,
            "risk_level": risk_level,
            "explanation": " • ".join(reasons) if reasons else "Low overall disease risk factors observed.",
            "risk_factors": {
                "weather_risk_percent": min(int(weather_score * 4), 100),
                "crop_stage_vulnerability": min(int(stage_score * 6.6), 100),
                "nearby_outbreak_density": min(int(nearby_score * 8.3), 100),
                "pest_vector_activity": min(int(pest_score * 12.5), 100),
            },
            "reasons": reasons
        }
