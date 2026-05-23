from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_login():
    response = client.post("/auth/login", json={"email": "test@example.com", "password": "1234"})
    assert response.status_code == 200
    assert response.json()["access_token"] == "dummy-token"
    assert response.json()["token_type"] == "bearer"
