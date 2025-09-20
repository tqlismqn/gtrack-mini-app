"""Application configuration settings."""
from __future__ import annotations

from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Environment configuration."""

    environment: str = Field(default="development")
    database_url: str = Field(default="postgresql+psycopg://user:pass@localhost:5432/gtrack")
    jwt_secret: str = Field(default="change-me")
    jwt_algorithm: str = Field(default="HS256")
    files_driver: str = Field(default="local")
    files_local_path: str = Field(default="./storage")
    s3_endpoint: str | None = None
    s3_bucket: str | None = None
    s3_key: str | None = None
    s3_secret: str | None = None
    s3_region: str | None = None
    allowed_origins: list[str] = Field(default_factory=lambda: ["*"])

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


@lru_cache
def get_settings() -> Settings:
    """Return cached settings instance."""
    return Settings()
