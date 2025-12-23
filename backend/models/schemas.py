"""
Pydantic schemas for API request/response validation
"""
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum


# ============ User & Auth ============

class UserBase(BaseModel):
    email: EmailStr
    name: str
    avatar: Optional[str] = None


class UserCreate(UserBase):
    google_id: str


class User(UserBase):
    id: str
    google_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class GoogleAuthRequest(BaseModel):
    """Google ID token from frontend"""
    id_token: str


class AuthResponse(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str = "bearer"
    user: User


# ============ Exam ============

class Domain(BaseModel):
    id: int
    name: str
    name_localized: Optional[str] = None
    weight: float
    question_count: Optional[int] = None


class ExamBase(BaseModel):
    id: str
    name: str
    code: str
    provider: str
    language: str
    description: Optional[str] = None
    total_questions: int
    passing_score: int
    exam_time: int
    domains: List[Domain]
    tags: List[str] = []


class Exam(ExamBase):
    created_at: datetime
    updated_at: datetime


# ============ Question ============

class QuestionBase(BaseModel):
    id: str
    exam_id: str
    set_number: int
    domain: int
    question: str
    question_html: Optional[str] = None
    options: Dict[str, str]
    answer: str | List[str]
    answer_type: str  # 'single' or 'multiple'
    explanation: str
    explanation_html: Optional[str] = None
    difficulty: Optional[str] = None
    tags: List[str] = []


# ============ Progress & Quiz Session ============

class QuizMode(str, Enum):
    practice = "practice"
    exam = "exam"


class QuizSessionBase(BaseModel):
    id: str
    exam_id: str
    mode: QuizMode
    questions: List[str]
    answers: Dict[str, str | List[str]]
    start_time: datetime
    end_time: Optional[datetime] = None
    score: Optional[float] = None
    completed: bool = False


class QuizSessionCreate(QuizSessionBase):
    pass


class QuizSession(QuizSessionBase):
    user_id: Optional[str] = None


# ============ Wrong Answer ============

class WrongAnswerBase(BaseModel):
    id: str
    exam_id: str
    question_id: str
    user_answer: str | List[str]
    correct_answer: str | List[str]
    wrong_count: int = 1
    last_wrong_at: datetime
    mastered: bool = False


class WrongAnswerCreate(WrongAnswerBase):
    pass


class WrongAnswer(WrongAnswerBase):
    user_id: Optional[str] = None


# ============ Sync ============

class SyncData(BaseModel):
    """Data structure for syncing between frontend and backend"""
    quiz_sessions: List[QuizSessionCreate] = []
    wrong_answers: List[WrongAnswerCreate] = []
    last_sync_at: Optional[datetime] = None


class SyncResponse(BaseModel):
    success: bool
    message: str
    synced_at: datetime
    stats: Dict[str, int]


# ============ Video Generation ============

class VideoRequest(BaseModel):
    """Request to generate video for questions"""
    exam_id: str
    question_ids: List[str]
    language: str = "zh-CN"
    voice: Optional[str] = None
    include_explanation: bool = True


class VideoStatus(str, Enum):
    pending = "pending"
    processing = "processing"
    completed = "completed"
    failed = "failed"


class VideoJob(BaseModel):
    job_id: str
    status: VideoStatus
    progress: float = 0.0
    message: Optional[str] = None
    video_url: Optional[str] = None
    created_at: datetime
