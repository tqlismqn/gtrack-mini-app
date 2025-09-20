"""Basic smoke tests for the FastAPI app."""
from __future__ import annotations

from fastapi.testclient import TestClient

from app.main import app


def test_app_starts():
    client = TestClient(app)
    assert client is not None
