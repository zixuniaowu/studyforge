"""
StudyForge Backend - FastAPI Application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from contextlib import asynccontextmanager
import os

from routers import auth, exams, progress, video
from config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    print("Starting StudyForge Backend...")

    # Initialize Playwright browser lazily for video generation
    from services.slide_renderer import SlideRenderer
    app.state.renderer = SlideRenderer()
    # Browser will be initialized on first use

    yield

    # Shutdown
    print("Shutting down...")
    if app.state.renderer.browser:
        await app.state.renderer.close_browser()


app = FastAPI(
    title="StudyForge API",
    description="Exam preparation and video generation platform",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(exams.router, prefix="/api/exams", tags=["Exams"])
app.include_router(progress.router, prefix="/api/progress", tags=["Progress"])
app.include_router(video.router, prefix="/api/video", tags=["Video Generation"])


# Health check
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}


# Serve static frontend files (production)
static_path = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_path):
    app.mount("/assets", StaticFiles(directory=os.path.join(static_path, "assets")), name="assets")
    app.mount("/sample-data", StaticFiles(directory=os.path.join(static_path, "sample-data")), name="sample-data")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        """Serve React SPA for all non-API routes"""
        file_path = os.path.join(static_path, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(static_path, "index.html"))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=7860, reload=True)
