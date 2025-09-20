"""Common schemas and utilities for API responses."""
from __future__ import annotations

from typing import Any

from fastapi import status
from pydantic import BaseModel, Field


class ProblemDetail(BaseModel):
    """RFC 7807 compliant error representation helper."""

    type: str = Field(default="about:blank")
    title: str = Field(default="Not Implemented")
    detail: str
    status: int = Field(default=status.HTTP_501_NOT_IMPLEMENTED)
    instance: str | None = None
    extensions: dict[str, Any] = Field(default_factory=dict)

    @classmethod
    def create(
        cls,
        detail: str,
        *,
        title: str | None = None,
        status_code: int = status.HTTP_501_NOT_IMPLEMENTED,
        type: str = "about:blank",
        instance: str | None = None,
        extensions: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """Return a serialisable RFC 7807 payload."""
        payload = cls(
            detail=detail,
            title=title or cls.model_fields["title"].default,
            status=status_code,
            type=type,
            instance=instance,
            extensions=extensions or {},
        )
        data = payload.model_dump()
        data.update(payload.extensions)
        return data


class Pagination(BaseModel):
    """Standard pagination metadata."""

    total: int
    limit: int
    offset: int
