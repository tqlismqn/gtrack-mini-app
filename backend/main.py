"""Run the FastAPI application using uvicorn."""
from __future__ import annotations

import uvicorn

from app.main import app


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
