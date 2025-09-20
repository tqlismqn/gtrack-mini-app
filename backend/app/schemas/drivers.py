"""Schemas for driver resources."""
from __future__ import annotations

from datetime import date
from enum import Enum

from pydantic import BaseModel, EmailStr, Field


class DriverStatus(str, Enum):
    """Possible driver statuses."""

    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"
    ARCHIVED = "archived"


class CitizenshipBlock(BaseModel):
    """Information about driver's citizenship."""

    country_code: str = Field(..., description="ISO country code")
    is_eu: bool = Field(..., description="Whether the citizenship is part of EU")


class DriverBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr | None = None
    phone: str | None = None
    status: DriverStatus | None = None
    citizenship: CitizenshipBlock | None = None
    birth_date: date | None = None


class DriverCreate(DriverBase):
    internal_number: int | None = None
    rodne_cislo: str | None = None


class DriverUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    status: DriverStatus | None = None
    citizenship: CitizenshipBlock | None = None
    birth_date: date | None = None
    rodne_cislo: str | None = None


class DriverResponse(DriverBase):
    id: int
    internal_number: int | None = None
    rodne_cislo: str | None = None

    class Config:
        from_attributes = True
