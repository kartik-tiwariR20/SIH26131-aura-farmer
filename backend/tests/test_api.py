import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_health_check():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

@pytest.mark.asyncio
async def test_auth_flow():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        reg_resp = await ac.post("/api/auth/register", json={
            "name": "Test Farmer",
            "email": "testfarmer@example.com",
            "password": "Password123",
            "role": "FARMER"
        })
        assert reg_resp.status_code == 201
        data = reg_resp.json()["data"]
        assert "tokens" in data
        
        login_resp = await ac.post("/api/auth/login", json={
            "email": "testfarmer@example.com",
            "password": "Password123"
        })
        assert login_resp.status_code == 200
        assert "tokens" in login_resp.json()["data"]
