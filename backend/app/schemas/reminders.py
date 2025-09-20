"""Schemas for reminder workflows."""
from __future__ import annotations

from enum import Enum

from pydantic import BaseModel

from .documents import DocumentStatus


class ReminderChannel(str, Enum):
    EMAIL = "email"
    TELEGRAM = "telegram"
    IN_APP = "in_app"


class ReminderPreviewRequest(BaseModel):
    statuses: list[DocumentStatus]
    channels: list[ReminderChannel]


class ReminderRecipient(BaseModel):
    driver_id: int
    email: str | None = None
    phone: str | None = None
    channel_payload: dict[str, str] | None = None


class ReminderPreviewResponse(BaseModel):
    recipients: list[ReminderRecipient]
