from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://cropguard:cropguard123@localhost:5432/cropguard"
    REDIS_URL: str = "redis://localhost:6379/0"
    JWT_SECRET: str = "dev-jwt-secret"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    WEATHER_API_KEY: str = ""
    STORAGE_TYPE: str = "local"
    STORAGE_PATH: str = "./uploads"
    STORAGE_ENDPOINT: str = ""
    STORAGE_ACCESS_KEY: str = ""
    STORAGE_SECRET_KEY: str = ""
    STORAGE_BUCKET: str = ""
    DEMO_MODE: bool = True

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
