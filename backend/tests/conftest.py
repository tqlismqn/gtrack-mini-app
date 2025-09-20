"""Test fixtures for backend."""
from __future__ import annotations

import pytest

from app.main import app


@pytest.fixture
def test_app():
    return app
