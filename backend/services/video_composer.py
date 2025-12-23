"""
Video Composer - Combines slides and audio into final video
"""
from moviepy.editor import (
    ImageClip, AudioFileClip, concatenate_videoclips,
    CompositeVideoClip, TextClip
)
import os
from typing import List, Dict, Any, Optional
import asyncio

from .tts_engine import TTSEngine
from .slide_renderer import SlideRenderer
from config import settings


class VideoComposer:
    """Compose video from questions, slides, and audio"""

    def __init__(
        self,
        renderer: SlideRenderer,
        language: str = "zh-CN",
        voice: Optional[str] = None
    ):
        self.renderer = renderer
        self.tts = TTSEngine(language, voice)
        self.language = language

        self.clips: List[Any] = []
        self.temp_files: List[str] = []

    async def add_question(
        self,
        question: Dict[str, Any],
        number: int = 1,
        include_explanation: bool = True,
        pause_before_answer: float = 2.0
    ):
        """
        Add a question to the video.

        Creates slides and audio for:
        1. Question (without answer)
        2. Question (with answer revealed)
        3. Explanation
        """
        question_id = question.get("id", str(number))

        # 1. Question slide (no answer)
        question_slide = os.path.join(
            settings.SLIDES_OUTPUT_DIR,
            f"{question_id}_question.png"
        )
        await self.renderer.render_question(
            question, question_slide, number,
            show_answer=False, language=self.language
        )
        self.temp_files.append(question_slide)

        # Question audio
        question_audio = os.path.join(
            settings.AUDIO_OUTPUT_DIR,
            f"{question_id}_question.mp3"
        )
        question_text = self.tts.format_question_text(question)
        await self.tts.synthesize(question_text, question_audio)
        self.temp_files.append(question_audio)

        # Create question clip
        audio_clip = AudioFileClip(question_audio)
        question_duration = audio_clip.duration + pause_before_answer

        question_clip = ImageClip(question_slide).set_duration(question_duration)
        question_clip = question_clip.set_audio(audio_clip)
        self.clips.append(question_clip)

        # 2. Answer reveal slide
        answer_slide = os.path.join(
            settings.SLIDES_OUTPUT_DIR,
            f"{question_id}_answer.png"
        )
        await self.renderer.render_question(
            question, answer_slide, number,
            show_answer=True, language=self.language
        )
        self.temp_files.append(answer_slide)

        # Answer audio
        answer_audio = os.path.join(
            settings.AUDIO_OUTPUT_DIR,
            f"{question_id}_answer.mp3"
        )
        answer_text = self.tts.format_answer_text(question)
        await self.tts.synthesize(answer_text, answer_audio)
        self.temp_files.append(answer_audio)

        # Create answer clip
        answer_audio_clip = AudioFileClip(answer_audio)

        if include_explanation:
            # 3. Explanation slide
            explanation_slide = os.path.join(
                settings.SLIDES_OUTPUT_DIR,
                f"{question_id}_explanation.png"
            )
            await self.renderer.render_explanation(
                question, explanation_slide, language=self.language
            )
            self.temp_files.append(explanation_slide)

            # Show answer briefly, then explanation
            answer_clip = ImageClip(answer_slide).set_duration(3)
            self.clips.append(answer_clip)

            explanation_clip = ImageClip(explanation_slide).set_duration(
                answer_audio_clip.duration + 1
            )
            explanation_clip = explanation_clip.set_audio(answer_audio_clip)
            self.clips.append(explanation_clip)
        else:
            # Just show answer with audio
            answer_clip = ImageClip(answer_slide).set_duration(
                answer_audio_clip.duration + 1
            )
            answer_clip = answer_clip.set_audio(answer_audio_clip)
            self.clips.append(answer_clip)

    async def compose(
        self,
        output_path: str,
        fps: int = 24,
        codec: str = "libx264",
        audio_codec: str = "aac"
    ) -> str:
        """
        Compose all clips into final video.
        """
        if not self.clips:
            raise ValueError("No clips to compose")

        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        # Concatenate all clips
        final = concatenate_videoclips(self.clips, method="compose")

        # Write video file
        final.write_videofile(
            output_path,
            fps=fps,
            codec=codec,
            audio_codec=audio_codec,
            threads=4,
            logger=None  # Suppress output
        )

        # Cleanup
        final.close()
        for clip in self.clips:
            clip.close()

        return output_path

    def cleanup(self):
        """Remove temporary files"""
        for filepath in self.temp_files:
            try:
                if os.path.exists(filepath):
                    os.remove(filepath)
            except:
                pass
        self.temp_files = []
        self.clips = []


async def generate_question_video(
    question: Dict[str, Any],
    output_path: str,
    language: str = "zh-CN",
    include_explanation: bool = True
) -> str:
    """
    Quick function to generate video for a single question.
    """
    renderer = SlideRenderer()
    await renderer.init_browser()

    try:
        composer = VideoComposer(renderer, language)
        await composer.add_question(question, include_explanation=include_explanation)
        await composer.compose(output_path)
        return output_path
    finally:
        await renderer.close_browser()
        composer.cleanup()


async def generate_exam_video(
    questions: List[Dict[str, Any]],
    output_path: str,
    language: str = "zh-CN",
    include_explanation: bool = True
) -> str:
    """
    Generate video for multiple questions.
    """
    renderer = SlideRenderer()
    await renderer.init_browser()

    try:
        composer = VideoComposer(renderer, language)

        for i, question in enumerate(questions, 1):
            await composer.add_question(
                question,
                number=i,
                include_explanation=include_explanation
            )

        await composer.compose(output_path)
        return output_path
    finally:
        await renderer.close_browser()
        composer.cleanup()
