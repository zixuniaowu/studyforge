"""
Database connection and operations using Supabase
"""
from supabase import create_client, Client
from typing import Optional, List, Dict, Any
from datetime import datetime
import os

from config import settings


class Database:
    """Supabase database wrapper"""

    def __init__(self):
        self.client: Optional[Client] = None

    def connect(self):
        """Initialize Supabase client"""
        if settings.SUPABASE_URL and settings.SUPABASE_KEY:
            self.client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
            return True
        return False

    @property
    def is_connected(self) -> bool:
        return self.client is not None

    # ============ User Operations ============

    async def get_user_by_google_id(self, google_id: str) -> Optional[Dict]:
        """Get user by Google ID"""
        if not self.is_connected:
            return None
        result = self.client.table("users").select("*").eq("google_id", google_id).execute()
        return result.data[0] if result.data else None

    async def get_user_by_id(self, user_id: str) -> Optional[Dict]:
        """Get user by ID"""
        if not self.is_connected:
            return None
        result = self.client.table("users").select("*").eq("id", user_id).execute()
        return result.data[0] if result.data else None

    async def create_user(self, user_data: Dict) -> Dict:
        """Create a new user"""
        if not self.is_connected:
            raise Exception("Database not connected")
        user_data["created_at"] = datetime.utcnow().isoformat()
        user_data["updated_at"] = datetime.utcnow().isoformat()
        result = self.client.table("users").insert(user_data).execute()
        return result.data[0]

    async def update_user(self, user_id: str, user_data: Dict) -> Dict:
        """Update user data"""
        if not self.is_connected:
            raise Exception("Database not connected")
        user_data["updated_at"] = datetime.utcnow().isoformat()
        result = self.client.table("users").update(user_data).eq("id", user_id).execute()
        return result.data[0]

    # ============ Quiz Session Operations ============

    async def get_user_sessions(self, user_id: str, exam_id: Optional[str] = None) -> List[Dict]:
        """Get quiz sessions for a user"""
        if not self.is_connected:
            return []
        query = self.client.table("quiz_sessions").select("*").eq("user_id", user_id)
        if exam_id:
            query = query.eq("exam_id", exam_id)
        result = query.order("start_time", desc=True).execute()
        return result.data

    async def save_session(self, user_id: str, session_data: Dict) -> Dict:
        """Save or update a quiz session"""
        if not self.is_connected:
            raise Exception("Database not connected")
        session_data["user_id"] = user_id
        # Upsert based on session ID
        result = self.client.table("quiz_sessions").upsert(session_data).execute()
        return result.data[0]

    async def save_sessions_batch(self, user_id: str, sessions: List[Dict]) -> int:
        """Save multiple sessions"""
        if not self.is_connected:
            return 0
        for session in sessions:
            session["user_id"] = user_id
        result = self.client.table("quiz_sessions").upsert(sessions).execute()
        return len(result.data)

    # ============ Wrong Answer Operations ============

    async def get_user_wrong_answers(self, user_id: str, exam_id: Optional[str] = None) -> List[Dict]:
        """Get wrong answers for a user"""
        if not self.is_connected:
            return []
        query = self.client.table("wrong_answers").select("*").eq("user_id", user_id)
        if exam_id:
            query = query.eq("exam_id", exam_id)
        result = query.execute()
        return result.data

    async def save_wrong_answer(self, user_id: str, wrong_data: Dict) -> Dict:
        """Save or update a wrong answer"""
        if not self.is_connected:
            raise Exception("Database not connected")
        wrong_data["user_id"] = user_id
        result = self.client.table("wrong_answers").upsert(wrong_data).execute()
        return result.data[0]

    async def save_wrong_answers_batch(self, user_id: str, wrong_answers: List[Dict]) -> int:
        """Save multiple wrong answers"""
        if not self.is_connected:
            return 0
        for wa in wrong_answers:
            wa["user_id"] = user_id
        result = self.client.table("wrong_answers").upsert(wrong_answers).execute()
        return len(result.data)

    async def mark_wrong_mastered(self, user_id: str, wrong_id: str) -> bool:
        """Mark a wrong answer as mastered"""
        if not self.is_connected:
            return False
        self.client.table("wrong_answers").update({"mastered": True}).eq("id", wrong_id).eq("user_id", user_id).execute()
        return True

    # ============ Stats Operations ============

    async def get_user_stats(self, user_id: str) -> Dict:
        """Get user statistics"""
        if not self.is_connected:
            return {
                "total_sessions": 0,
                "total_questions": 0,
                "correct_rate": 0,
                "unmastered_wrong": 0
            }

        sessions = await self.get_user_sessions(user_id)
        wrong_answers = await self.get_user_wrong_answers(user_id)

        total_sessions = len(sessions)
        completed_sessions = [s for s in sessions if s.get("completed")]
        total_questions = sum(len(s.get("questions", [])) for s in completed_sessions)

        total_score = sum(s.get("score", 0) for s in completed_sessions)
        correct_rate = total_score / len(completed_sessions) if completed_sessions else 0

        unmastered_wrong = len([w for w in wrong_answers if not w.get("mastered")])

        return {
            "total_sessions": total_sessions,
            "total_questions": total_questions,
            "correct_rate": round(correct_rate, 1),
            "unmastered_wrong": unmastered_wrong
        }


# Global database instance
db = Database()


def get_db() -> Database:
    """Dependency to get database instance"""
    if not db.is_connected:
        db.connect()
    return db
