"""Schemas for driver comments."""
from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel


class CommentCreate(BaseModel):
    message: str


class CommentResponse(CommentCreate):
    id: int
    created_at: datetime
    created_by: str | None = None
    attachment_filename: str | None = None

    class Config:
        from_attributes = True
