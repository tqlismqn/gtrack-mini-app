"""Document management endpoints skeleton."""
from fastapi import APIRouter, HTTPException, UploadFile, status

from ..schemas.common import ProblemDetail
from ..schemas.documents import (
    DocumentCreate,
    DocumentFileCreate,
    DocumentFileResponse,
    DocumentResponse,
)
from ..services.audit import audit_log_action

router = APIRouter(prefix="/{driver_id}/documents")


@router.get("", response_model=list[DocumentResponse])
async def list_documents(driver_id: int) -> list[DocumentResponse]:
    """List documents for a driver."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=ProblemDetail.create("List documents is not yet implemented."),
    )


@router.post("", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
async def create_document(driver_id: int, payload: DocumentCreate) -> DocumentResponse:
    """Create a driver document entry."""
    audit_log_action("document.create", {"driver_id": driver_id, **payload.model_dump()})
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=ProblemDetail.create("Create document is not yet implemented."),
    )


@router.get("/{document_id}/files", response_model=list[DocumentFileResponse])
async def list_document_files(driver_id: int, document_id: int) -> list[DocumentFileResponse]:
    """List document files history."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=ProblemDetail.create("List document files is not yet implemented."),
    )


@router.post("/{document_id}/files", response_model=DocumentFileResponse, status_code=status.HTTP_201_CREATED)
async def upload_document_file(
    driver_id: int,
    document_id: int,
    metadata: DocumentFileCreate,
    file: UploadFile,
) -> DocumentFileResponse:
    """Upload a new document file version."""
    audit_log_action(
        "document.file.upload",
        {"driver_id": driver_id, "document_id": document_id, **metadata.model_dump()},
    )
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=ProblemDetail.create("Upload document file is not yet implemented."),
    )
