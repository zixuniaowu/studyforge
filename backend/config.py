"""
Configuration settings for StudyForge Backend
"""
from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""

    # App
    APP_NAME: str = "StudyForge"
    DEBUG: bool = False

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:7860",
        "https://huggingface.co",
    ]

    # Google OAuth
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""

    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    SUPABASE_SERVICE_KEY: str = ""

    # JWT
    JWT_SECRET: str = "your-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_HOURS: int = 24 * 7  # 1 week

    # Video Generation
    VIDEO_OUTPUT_DIR: str = "./output/videos"
    AUDIO_OUTPUT_DIR: str = "./output/audio"
    SLIDES_OUTPUT_DIR: str = "./output/slides"

    # TTS
    TTS_VOICE_ZH: str = "zh-CN-XiaoxiaoNeural"
    TTS_VOICE_JA: str = "ja-JP-NanamiNeural"
    TTS_RATE: str = "+0%"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

# Create output directories
for dir_path in [settings.VIDEO_OUTPUT_DIR, settings.AUDIO_OUTPUT_DIR, settings.SLIDES_OUTPUT_DIR]:
    os.makedirs(dir_path, exist_ok=True)
