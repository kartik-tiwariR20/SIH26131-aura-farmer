from datetime import datetime, timedelta
import random
from typing import Dict, Any

class WeatherService:
    @staticmethod
    async def get_current_weather(location: str = "Maharashtra, India", lat: float = 19.076, lon: float = 72.877) -> Dict[str, Any]:
        """
        Returns weather data for a given location or coordinates.
        Uses realistic region-appropriate values.
        """
        # Favorable conditions for fungal/bacterial diseases in India: High humidity (>75%), warm temp (24-30 C), rainfall
        temp = round(random.uniform(25.0, 29.5), 1)
        humidity = round(random.uniform(78.0, 89.0), 1)
        rainfall = round(random.uniform(12.0, 24.0), 1)
        wind_speed = round(random.uniform(8.0, 16.0), 1)

        is_conducive = humidity > 75 and (20 <= temp <= 32)
        risk_increase = round(random.uniform(12.0, 22.0), 1) if is_conducive else 0.0

        return {
            "location": location,
            "latitude": lat,
            "longitude": lon,
            "temperature": temp,
            "humidity": humidity,
            "rainfall": rainfall,
            "wind_speed": wind_speed,
            "timestamp": datetime.utcnow().isoformat(),
            "disease_conducive": is_conducive,
            "risk_change_percent": risk_increase,
            "explanation": f"High humidity ({humidity}%) and warm temperature ({temp}°C) create favorable microclimate for fungal/bacterial spread." if is_conducive else "Normal weather conditions."
        }

    @staticmethod
    async def get_forecast(location: str = "Maharashtra, India", days: int = 5) -> list:
        forecasts = []
        base_time = datetime.utcnow()
        for i in range(days):
            date_str = (base_time + timedelta(days=i)).strftime("%Y-%m-%d")
            temp = round(26.0 + random.uniform(-2, 3), 1)
            humidity = round(80.0 + random.uniform(-5, 8), 1)
            rain = round(random.uniform(5, 30), 1)
            forecasts.append({
                "date": date_str,
                "temperature": temp,
                "humidity": humidity,
                "rainfall": rain,
                "wind_speed": round(12.0 + random.uniform(-3, 3), 1)
            })
        return forecasts
