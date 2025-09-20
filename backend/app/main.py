"""Application entrypoint for the Drivers service."""
from fastapi import FastAPI

from .routes import drivers, documents, comments, reminders, lookups


def create_app() -> FastAPI:
    """Initialise FastAPI application with routers and middleware."""
    app = FastAPI(title="Drivers Service", version="0.1.0")

    app.include_router(drivers.router, prefix="/drivers", tags=["drivers"])
    app.include_router(documents.router, prefix="/drivers", tags=["documents"])
    app.include_router(comments.router, prefix="/drivers", tags=["comments"])
    app.include_router(reminders.router, prefix="/reminders", tags=["reminders"])
    app.include_router(lookups.router, prefix="/lookups", tags=["lookups"])

    return app


app = create_app()
