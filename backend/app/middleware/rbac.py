"""Role-based access control helpers."""
from __future__ import annotations

from fastapi import Depends, HTTPException, status

from .auth import UserContext, get_current_user

# Placeholder permissions derived from roles_permissions.md will be implemented later
ROLE_PERMISSIONS: dict[str, set[str]] = {
    "admin": {"drivers:read", "drivers:write", "documents:write", "comments:write", "reminders:send"},
    "viewer": {"drivers:read"},
}


def require_permission(permission: str):
    async def dependency(user: UserContext = Depends(get_current_user)) -> UserContext:
        allowed = ROLE_PERMISSIONS.get("admin" if "admin" in user.roles else user.roles[0], set())
        if permission not in allowed:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
        return user

    return dependency
