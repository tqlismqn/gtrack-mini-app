"""Drivers API endpoints skeleton."""
from fastapi import APIRouter, HTTPException, status

from ..schemas.common import ProblemDetail
from ..schemas.drivers import DriverCreate, DriverResponse, DriverUpdate
from ..services.audit import audit_log_action

router = APIRouter()


@router.get("", response_model=list[DriverResponse])
async def list_drivers() -> list[DriverResponse]:
    """List drivers with filters (placeholder implementation)."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=ProblemDetail.create("List drivers is not yet implemented."),
    )


@router.post("", response_model=DriverResponse, status_code=status.HTTP_201_CREATED)
async def create_driver(payload: DriverCreate) -> DriverResponse:
    """Create a new driver (placeholder implementation)."""
    audit_log_action("driver.create", payload.model_dump())
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=ProblemDetail.create("Create driver is not yet implemented."),
    )


@router.get("/{driver_id}", response_model=DriverResponse)
async def get_driver(driver_id: int) -> DriverResponse:
    """Retrieve driver details."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=ProblemDetail.create("Get driver is not yet implemented."),
    )


@router.patch("/{driver_id}", response_model=DriverResponse)
async def update_driver(driver_id: int, payload: DriverUpdate) -> DriverResponse:
    """Update an existing driver."""
    audit_log_action(
        "driver.update",
        {"id": driver_id, **payload.model_dump(exclude_unset=True)},
    )
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=ProblemDetail.create("Update driver is not yet implemented."),
    )


@router.delete("/{driver_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_driver(driver_id: int) -> None:
    """Delete driver by id."""
    audit_log_action("driver.delete", {"id": driver_id})
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=ProblemDetail.create("Delete driver is not yet implemented."),
    )
