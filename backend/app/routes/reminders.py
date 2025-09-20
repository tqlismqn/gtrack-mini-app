"""Reminder endpoints skeleton."""
from fastapi import APIRouter, HTTPException, status

from ..schemas.common import ProblemDetail
from ..schemas.reminders import ReminderPreviewRequest, ReminderPreviewResponse
from ..services.audit import audit_log_action

router = APIRouter()


@router.post("/preview", response_model=ReminderPreviewResponse)
async def preview_reminders(payload: ReminderPreviewRequest) -> ReminderPreviewResponse:
    """Preview reminder recipients and payloads."""
    audit_log_action("reminder.preview", payload.model_dump())
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=ProblemDetail.create("Reminder preview is not yet implemented."),
    )


@router.post("/send", status_code=status.HTTP_202_ACCEPTED)
async def send_reminders(payload: ReminderPreviewRequest) -> None:
    """Trigger reminder dispatch."""
    audit_log_action("reminder.send", payload.model_dump())
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=ProblemDetail.create("Reminder send is not yet implemented."),
    )
