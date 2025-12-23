"""
Exams router - Exam and question management
"""
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from typing import List, Optional
import os
import json

from models.schemas import Exam, QuestionBase

router = APIRouter()

# Path to exam data files
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static", "sample-data")


def load_exam_data(filename: str) -> dict:
    """Load exam data from JSON file"""
    filepath = os.path.join(DATA_DIR, filename)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail=f"Exam file not found: {filename}")

    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


@router.get("/", response_model=List[dict])
async def list_exams(language: Optional[str] = None):
    """
    List all available exams.
    Optionally filter by language (zh-CN, ja).
    """
    exams = []

    if not os.path.exists(DATA_DIR):
        return exams

    for filename in os.listdir(DATA_DIR):
        if filename.endswith(".json"):
            try:
                data = load_exam_data(filename)
                exam = data.get("exam", {})
                if language and exam.get("language") != language:
                    continue
                exams.append(exam)
            except Exception as e:
                print(f"Error loading {filename}: {e}")
                continue

    return exams


@router.get("/{exam_id}")
async def get_exam(exam_id: str):
    """Get exam details by ID"""
    # Try to find the exam in any JSON file
    if not os.path.exists(DATA_DIR):
        raise HTTPException(status_code=404, detail="Data directory not found")

    for filename in os.listdir(DATA_DIR):
        if filename.endswith(".json"):
            try:
                data = load_exam_data(filename)
                exam = data.get("exam", {})
                if exam.get("id") == exam_id:
                    return data
            except:
                continue

    raise HTTPException(status_code=404, detail=f"Exam not found: {exam_id}")


@router.get("/{exam_id}/questions", response_model=List[QuestionBase])
async def get_exam_questions(exam_id: str):
    """Get all questions for an exam"""
    data = await get_exam(exam_id)
    return data.get("questions", [])


@router.get("/{exam_id}/questions/{question_id}")
async def get_question(exam_id: str, question_id: str):
    """Get a specific question"""
    data = await get_exam(exam_id)
    questions = data.get("questions", [])

    for q in questions:
        if q.get("id") == question_id:
            return q

    raise HTTPException(status_code=404, detail=f"Question not found: {question_id}")


@router.get("/file/{filename}")
async def get_exam_file(filename: str):
    """Download exam JSON file"""
    filepath = os.path.join(DATA_DIR, filename)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(filepath, media_type="application/json", filename=filename)
