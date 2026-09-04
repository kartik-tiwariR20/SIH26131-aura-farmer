from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.services.weather_service import WeatherService
from app.utils.response import success_response

router = APIRouter()

@router.get("/{field_id}", response_model=dict)
async def get_field_weather(field_id: str):
    weather_data = await WeatherService.get_current_weather()
    forecast = await WeatherService.get_forecast(days=5)
    return success_response(data={
        "current": weather_data,
        "forecast": forecast
    })
