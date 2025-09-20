"""Lookup endpoints skeleton."""
from fastapi import APIRouter, HTTPException, status

from ..schemas.common import ProblemDetail
from ..schemas.lookups import LookupResponse

router = APIRouter()


@router.get("", response_model=LookupResponse)
async def get_lookups() -> LookupResponse:
    """Return lookup data for frontend filters."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=ProblemDetail.create("Lookup endpoint is not yet implemented."),
    )
