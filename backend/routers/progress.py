"""
Progress router - User progress sync between frontend and backend
"""
from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from datetime import datetime

from models.schemas import (
    QuizSession, QuizSessionCreate,
    WrongAnswer, WrongAnswerCreate,
    SyncData, SyncResponse
)
from models.database import Database, get_db
from routers.auth import get_current_user, require_user

router = APIRouter()


@router.get("/sessions", response_model=List[QuizSession])
async def get_sessions(
    exam_id: Optional[str] = None,
    user: dict = Depends(require_user),
    db: Database = Depends(get_db)
):
    """Get user's quiz sessions"""
    sessions = await db.get_user_sessions(user["id"], exam_id)
    return sessions


@router.post("/sessions", response_model=QuizSession)
async def save_session(
    session: QuizSessionCreate,
    user: dict = Depends(require_user),
    db: Database = Depends(get_db)
):
    """Save a quiz session"""
    result = await db.save_session(user["id"], session.model_dump())
    return result


@router.get("/wrong-answers", response_model=List[WrongAnswer])
async def get_wrong_answers(
    exam_id: Optional[str] = None,
    mastered: Optional[bool] = None,
    user: dict = Depends(require_user),
    db: Database = Depends(get_db)
):
    """Get user's wrong answers"""
    wrong_answers = await db.get_user_wrong_answers(user["id"], exam_id)

    if mastered is not None:
        wrong_answers = [w for w in wrong_answers if w.get("mastered") == mastered]

    return wrong_answers


@router.post("/wrong-answers", response_model=WrongAnswer)
async def save_wrong_answer(
    wrong: WrongAnswerCreate,
    user: dict = Depends(require_user),
    db: Database = Depends(get_db)
):
    """Save a wrong answer"""
    result = await db.save_wrong_answer(user["id"], wrong.model_dump())
    return result


@router.put("/wrong-answers/{wrong_id}/master")
async def mark_mastered(
    wrong_id: str,
    user: dict = Depends(require_user),
    db: Database = Depends(get_db)
):
    """Mark a wrong answer as mastered"""
    success = await db.mark_wrong_mastered(user["id"], wrong_id)
    if not success:
        raise HTTPException(status_code=404, detail="Wrong answer not found")
    return {"message": "Marked as mastered"}


@router.post("/sync", response_model=SyncResponse)
async def sync_data(
    data: SyncData,
    user: dict = Depends(require_user),
    db: Database = Depends(get_db)
):
    """
    Sync data between frontend and backend.

    Frontend sends local data, backend merges and returns updated data.
    Uses last_sync_at to determine which data is newer.
    """
    synced_sessions = 0
    synced_wrong = 0

    # Sync quiz sessions
    if data.quiz_sessions:
        synced_sessions = await db.save_sessions_batch(
            user["id"],
            [s.model_dump() for s in data.quiz_sessions]
        )

    # Sync wrong answers
    if data.wrong_answers:
        synced_wrong = await db.save_wrong_answers_batch(
            user["id"],
            [w.model_dump() for w in data.wrong_answers]
        )

    return SyncResponse(
        success=True,
        message="Sync completed",
        synced_at=datetime.utcnow(),
        stats={
            "sessions": synced_sessions,
            "wrong_answers": synced_wrong
        }
    )


@router.get("/sync")
async def get_sync_data(
    since: Optional[datetime] = None,
    user: dict = Depends(require_user),
    db: Database = Depends(get_db)
):
    """
    Get all user data for sync.
    Optionally filter by last sync time.
    """
    sessions = await db.get_user_sessions(user["id"])
    wrong_answers = await db.get_user_wrong_answers(user["id"])

    # Filter by sync time if provided
    if since:
        sessions = [s for s in sessions if s.get("start_time", "") > since.isoformat()]
        wrong_answers = [w for w in wrong_answers if w.get("last_wrong_at", "") > since.isoformat()]

    return {
        "quiz_sessions": sessions,
        "wrong_answers": wrong_answers,
        "synced_at": datetime.utcnow().isoformat()
    }


@router.get("/stats")
async def get_stats(
    user: dict = Depends(require_user),
    db: Database = Depends(get_db)
):
    """Get user statistics"""
    return await db.get_user_stats(user["id"])
