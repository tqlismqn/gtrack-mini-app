"""Database session management."""
from __future__ import annotations

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from ..core.config import get_settings

settings = get_settings()

engine = create_engine(settings.database_url, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)


def get_session():
    """Yield database sessions for FastAPI dependencies."""
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
