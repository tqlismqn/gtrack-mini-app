"""Schemas for document resources."""
from __future__ import annotations

from datetime import date, datetime
from enum import Enum

from pydantic import BaseModel


class DocumentType(str, Enum):
    """Enumeration of supported document types."""

    PASSPORT = "passport"
    DRIVERS_LICENSE = "drivers_license"
    CHIP_CARD = "chip_card"
    A1_SWITZERLAND = "a1_switzerland"
    VISA = "visa"
    RESIDENCE_PERMIT = "residence_permit"
    OTHER = "other"


class DocumentStatus(str, Enum):
    """Document validity states."""

    EXPIRED = "expired"
    SOON = "soon"
    WARNING = "warning"
    VALID = "valid"
    UNKNOWN = "unknown"


class DocumentCreate(BaseModel):
    type: DocumentType
    number: str | None = None
    issued_by: str | None = None
    valid_from: date | None = None
    valid_to: date | None = None
    notes: str | None = None


class DocumentResponse(DocumentCreate):
    id: int
    status: DocumentStatus = DocumentStatus.UNKNOWN

    class Config:
        from_attributes = True


class DocumentFileCreate(BaseModel):
    description: str | None = None


class DocumentFileResponse(BaseModel):
    id: int
    filename: str
    content_type: str
    uploaded_at: datetime
    uploaded_by: str | None = None
    is_current: bool = False

    class Config:
        from_attributes = True
