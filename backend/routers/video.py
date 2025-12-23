"""
Video generation router - Generate explanation videos for questions
"""
from fastapi import APIRouter, HTTPException, BackgroundTasks, Request
from fastapi.responses import FileResponse
from typing import Optional
import os
import uuid
from datetime import datetime

from models.schemas import VideoRequest, VideoJob, VideoStatus
from config import settings

router = APIRouter()

# In-memory job storage (use Redis in production)
video_jobs: dict[str, VideoJob] = {}


async def generate_video_task(job_id: str, request: VideoRequest, app_state):
    """Background task to generate video"""
    job = video_jobs[job_id]

    try:
        from services.video_composer import VideoComposer

        job.status = VideoStatus.processing
        job.message = "Initializing..."

        # Get question data
        from routers.exams import get_exam
        exam_data = await get_exam(request.exam_id)
        questions = exam_data.get("questions", [])

        # Filter requested questions
        selected_questions = [
            q for q in questions
            if q["id"] in request.question_ids
        ]

        if not selected_questions:
            raise Exception("No questions found")

        # Initialize video composer
        composer = VideoComposer(
            renderer=app_state.renderer,
            language=request.language
        )

        total = len(selected_questions)
        for i, question in enumerate(selected_questions):
            job.progress = (i / total) * 100
            job.message = f"Processing question {i + 1}/{total}"

            await composer.add_question(
                question,
                include_explanation=request.include_explanation
            )

        job.message = "Composing final video..."
        output_path = os.path.join(
            settings.VIDEO_OUTPUT_DIR,
            f"{job_id}.mp4"
        )
        await composer.compose(output_path)

        job.status = VideoStatus.completed
        job.progress = 100
        job.video_url = f"/api/video/download/{job_id}"
        job.message = "Video ready!"

    except Exception as e:
        job.status = VideoStatus.failed
        job.message = str(e)


@router.post("/generate", response_model=VideoJob)
async def generate_video(
    request: VideoRequest,
    background_tasks: BackgroundTasks,
    req: Request
):
    """
    Start video generation job.
    Returns job ID to check progress.
    """
    job_id = str(uuid.uuid4())

    job = VideoJob(
        job_id=job_id,
        status=VideoStatus.pending,
        progress=0,
        message="Job queued",
        created_at=datetime.utcnow()
    )
    video_jobs[job_id] = job

    # Start background task
    background_tasks.add_task(
        generate_video_task,
        job_id,
        request,
        req.app.state
    )

    return job


@router.get("/status/{job_id}", response_model=VideoJob)
async def get_job_status(job_id: str):
    """Get video generation job status"""
    if job_id not in video_jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    return video_jobs[job_id]


@router.get("/download/{job_id}")
async def download_video(job_id: str):
    """Download generated video"""
    if job_id not in video_jobs:
        raise HTTPException(status_code=404, detail="Job not found")

    job = video_jobs[job_id]
    if job.status != VideoStatus.completed:
        raise HTTPException(status_code=400, detail="Video not ready")

    filepath = os.path.join(settings.VIDEO_OUTPUT_DIR, f"{job_id}.mp4")
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="Video file not found")

    return FileResponse(
        filepath,
        media_type="video/mp4",
        filename=f"studyforge-{job_id[:8]}.mp4"
    )


@router.delete("/job/{job_id}")
async def delete_job(job_id: str):
    """Delete a job and its video file"""
    if job_id in video_jobs:
        del video_jobs[job_id]

    filepath = os.path.join(settings.VIDEO_OUTPUT_DIR, f"{job_id}.mp4")
    if os.path.exists(filepath):
        os.remove(filepath)

    return {"message": "Job deleted"}


@router.get("/jobs")
async def list_jobs():
    """List all video jobs"""
    return list(video_jobs.values())
