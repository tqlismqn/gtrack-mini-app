"""Lookup response schemas."""
from __future__ import annotations

from pydantic import BaseModel

from .drivers import DriverStatus
from .documents import DocumentStatus, DocumentType


class LookupResponse(BaseModel):
    countries: list[dict[str, str]]
    document_types: list[DocumentType]
    driver_statuses: list[DriverStatus]
    locations: list[dict[str, str]]
    document_statuses: list[DocumentStatus]
