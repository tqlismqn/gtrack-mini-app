"""Reminder service skeleton."""
from __future__ import annotations

from typing import Iterable

from ..schemas.documents import DocumentStatus
from ..schemas.reminders import ReminderPreviewRequest, ReminderPreviewResponse, ReminderRecipient


class ReminderService:
    """Prepare reminder previews and dispatch requests."""

    def preview(self, payload: ReminderPreviewRequest) -> ReminderPreviewResponse:
        recipients: list[ReminderRecipient] = []
        return ReminderPreviewResponse(recipients=recipients)

    def send(self, payload: ReminderPreviewRequest) -> None:
        _ = self.preview(payload)
        # Dispatch logic will be implemented in later steps


class ReminderRuleEngine:
    """Utility to match documents to reminder categories."""

    def match_statuses(self, statuses: Iterable[DocumentStatus]) -> set[DocumentStatus]:
        return set(statuses)
