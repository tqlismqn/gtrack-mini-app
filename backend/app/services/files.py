"""File storage service skeleton."""
from __future__ import annotations

from pathlib import Path
from typing import BinaryIO


class FileStorageService:
    """Abstracted storage service."""

    def __init__(self, base_path: Path | None = None) -> None:
        self.base_path = base_path or Path("./storage")
        self.base_path.mkdir(parents=True, exist_ok=True)

    def save(self, *, fileobj: BinaryIO, filename: str) -> str:
        """Persist file and return its local path."""
        target = self.base_path / filename
        with target.open("wb") as handle:
            handle.write(fileobj.read())
        return str(target)

    def delete(self, filename: str) -> None:
        """Remove file from storage if it exists."""
        target = self.base_path / filename
        if target.exists():
            target.unlink()
