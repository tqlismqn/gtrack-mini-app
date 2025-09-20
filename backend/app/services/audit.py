"""Audit logging utilities."""
from __future__ import annotations

import logging
from typing import Any

logger = logging.getLogger("drivers.audit")


def audit_log_action(action: str, payload: dict[str, Any] | None = None) -> None:
    """Record an action in audit log (placeholder)."""
    logger.info("AUDIT %s %s", action, payload or {})
