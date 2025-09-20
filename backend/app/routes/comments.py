"""Comment endpoints skeleton."""
from fastapi import APIRouter, HTTPException, UploadFile, status

from ..schemas.comments import CommentCreate, CommentResponse
from ..schemas.common import ProblemDetail
from ..services.audit import audit_log_action

router = APIRouter(prefix="/{driver_id}/comments")


@router.get("", response_model=list[CommentResponse])
async def list_comments(driver_id: int) -> list[CommentResponse]:
    """List driver comments."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=ProblemDetail.create("List comments is not yet implemented."),
    )


@router.post("", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
async def create_comment(
    driver_id: int,
    payload: CommentCreate,
    attachment: UploadFile | None = None,
) -> CommentResponse:
    """Create comment with optional attachment."""
    audit_log_action(
        "comment.create",
        {
            "driver_id": driver_id,
            **payload.model_dump(),
            "has_attachment": attachment is not None,
        },
    )
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=ProblemDetail.create("Create comment is not yet implemented."),
    )
