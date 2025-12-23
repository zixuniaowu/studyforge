"""
TTS Engine using edge-tts (Microsoft Edge's free TTS)
"""
import edge_tts
import os
import asyncio
from typing import Optional

from config import settings


class TTSEngine:
    """Text-to-Speech engine using edge-tts"""

    # Available voices
    VOICES = {
        "zh-CN": [
            "zh-CN-XiaoxiaoNeural",      # Female, default
            "zh-CN-YunxiNeural",         # Male
            "zh-CN-YunjianNeural",       # Male, news
            "zh-CN-XiaoyiNeural",        # Female, child
        ],
        "ja": [
            "ja-JP-NanamiNeural",        # Female, default
            "ja-JP-KeitaNeural",         # Male
        ],
        "en": [
            "en-US-JennyNeural",         # Female
            "en-US-GuyNeural",           # Male
        ]
    }

    def __init__(self, language: str = "zh-CN", voice: Optional[str] = None):
        self.language = language
        self.voice = voice or self._get_default_voice(language)
        self.rate = settings.TTS_RATE

    def _get_default_voice(self, language: str) -> str:
        """Get default voice for language"""
        if language.startswith("ja"):
            return settings.TTS_VOICE_JA
        elif language.startswith("zh"):
            return settings.TTS_VOICE_ZH
        else:
            return "en-US-JennyNeural"

    async def synthesize(
        self,
        text: str,
        output_path: str,
        rate: Optional[str] = None
    ) -> str:
        """
        Synthesize text to audio file.

        Args:
            text: Text to synthesize
            output_path: Path to save audio file
            rate: Speech rate (e.g., "+10%", "-20%")

        Returns:
            Path to the generated audio file
        """
        rate = rate or self.rate

        # Create output directory if needed
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        # Generate audio
        communicate = edge_tts.Communicate(
            text,
            self.voice,
            rate=rate
        )

        await communicate.save(output_path)
        return output_path

    async def synthesize_ssml(
        self,
        ssml: str,
        output_path: str
    ) -> str:
        """
        Synthesize SSML to audio file.
        SSML allows more control over pronunciation, pauses, etc.
        """
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        communicate = edge_tts.Communicate(ssml, self.voice)
        await communicate.save(output_path)
        return output_path

    async def get_duration(self, audio_path: str) -> float:
        """Get duration of audio file in seconds"""
        try:
            from moviepy.editor import AudioFileClip
            with AudioFileClip(audio_path) as audio:
                return audio.duration
        except Exception:
            return 5.0  # Default duration

    def format_question_text(self, question: dict) -> str:
        """Format question for TTS"""
        parts = []

        # Question text
        q_text = question.get("question", "")
        parts.append(q_text)

        # Options
        options = question.get("options", {})
        for key, value in sorted(options.items()):
            parts.append(f"選択肢{key}。{value}" if self.language == "ja" else f"选项{key}。{value}")

        return "。".join(parts)

    def format_answer_text(self, question: dict) -> str:
        """Format answer explanation for TTS"""
        parts = []

        # Correct answer
        answer = question.get("answer", "")
        if isinstance(answer, list):
            answer = "、".join(answer)

        if self.language == "ja":
            parts.append(f"正解は{answer}です。")
        else:
            parts.append(f"正确答案是{answer}。")

        # Explanation
        explanation = question.get("explanation", "")
        if explanation:
            parts.append(explanation)

        return " ".join(parts)


# Utility function for quick synthesis
async def synthesize_text(
    text: str,
    output_path: str,
    language: str = "zh-CN",
    voice: Optional[str] = None
) -> str:
    """Quick function to synthesize text"""
    engine = TTSEngine(language, voice)
    return await engine.synthesize(text, output_path)
