"""Authentication middleware scaffolding."""
from __future__ import annotations

from fastapi import HTTPException, Request, status


class UserContext:
    """Represents authenticated user context."""

    def __init__(self, user_id: str, roles: list[str]) -> None:
        self.user_id = user_id
        self.roles = roles


async def get_current_user(request: Request) -> UserContext:
    """Placeholder for JWT based authentication."""
    # TODO: integrate with actual auth provider
    if "x-mock-user" in request.headers:
        return UserContext(user_id=request.headers["x-mock-user"], roles=["admin"])
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
