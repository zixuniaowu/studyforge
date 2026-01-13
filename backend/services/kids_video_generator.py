"""
Kids Course Video Generator
Generates educational videos for children's AI course
"""
from moviepy.editor import (
    ImageClip, AudioFileClip, concatenate_videoclips,
    CompositeVideoClip
)
from playwright.async_api import async_playwright, Browser, Page
from jinja2 import Environment, FileSystemLoader
import edge_tts
import os
import json
import asyncio
from typing import List, Dict, Any, Optional

# Configuration
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "output")
SLIDES_DIR = os.path.join(OUTPUT_DIR, "kids_slides")
AUDIO_DIR = os.path.join(OUTPUT_DIR, "kids_audio")
VIDEO_DIR = os.path.join(OUTPUT_DIR, "kids_videos")

# Voice configuration - use child-friendly voices
VOICES = {
    "zh-CN": "zh-CN-XiaoyiNeural",  # Female child voice
    "ja": "ja-JP-NanamiNeural",      # Female voice
}

# Theme colors for different lesson types
THEME_COLORS = {
    "ai-intro": {
        "bg_from": "#667eea",
        "bg_to": "#764ba2",
        "title_color": "#4f46e5",
        "highlight_from": "#667eea",
        "highlight_to": "#764ba2",
        "example_bg": "#f0f4ff",
        "example_border": "#4f46e5"
    },
    "python": {
        "bg_from": "#10b981",
        "bg_to": "#059669",
        "title_color": "#059669",
        "highlight_from": "#10b981",
        "highlight_to": "#047857",
        "example_bg": "#ecfdf5",
        "example_border": "#10b981"
    },
    "image": {
        "bg_from": "#f59e0b",
        "bg_to": "#d97706",
        "title_color": "#d97706",
        "highlight_from": "#f59e0b",
        "highlight_to": "#b45309",
        "example_bg": "#fffbeb",
        "example_border": "#f59e0b"
    },
    "chat": {
        "bg_from": "#3b82f6",
        "bg_to": "#1d4ed8",
        "title_color": "#1d4ed8",
        "highlight_from": "#3b82f6",
        "highlight_to": "#1e40af",
        "example_bg": "#eff6ff",
        "example_border": "#3b82f6"
    }
}

MASCOTS = ["🤖", "🐱", "🐶", "🦊", "🐻", "🐼"]


class KidsSlideRenderer:
    """Render kids-friendly HTML slides to images"""

    def __init__(self):
        self.browser: Optional[Browser] = None
        self.page: Optional[Page] = None

        # Setup Jinja2 templates
        template_dir = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            "templates", "kids"
        )
        self.env = Environment(loader=FileSystemLoader(template_dir))

    async def init_browser(self):
        """Initialize Playwright browser"""
        if self.browser:
            return

        playwright = await async_playwright().start()
        self.browser = await playwright.chromium.launch(
            headless=True,
            args=['--no-sandbox', '--disable-dev-shm-usage']
        )
        self.page = await self.browser.new_page(
            viewport={"width": 1920, "height": 1080}
        )

    async def close_browser(self):
        """Close browser"""
        if self.page:
            await self.page.close()
        if self.browser:
            await self.browser.close()
        self.browser = None
        self.page = None

    async def render_intro(
        self,
        lesson_number: int,
        title: str,
        subtitle: str,
        duration: int,
        output_path: str,
        language: str = "zh-CN"
    ) -> str:
        """Render lesson intro slide"""
        if not self.page:
            await self.init_browser()

        template = self.env.get_template("intro.html")

        # Localized text
        if language == "ja":
            lesson_badge = f"第{lesson_number}課"
            duration_text = f"{duration}分"
        else:
            lesson_badge = f"第{lesson_number}课"
            duration_text = f"{duration}分钟"

        html = template.render(
            language=language,
            lesson_badge=lesson_badge,
            title=title,
            subtitle=subtitle,
            duration=duration_text
        )

        await self.page.set_content(html)
        await self.page.wait_for_timeout(200)

        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        await self.page.screenshot(path=output_path)
        return output_path

    async def render_content(
        self,
        section_title: str,
        content: str,
        lesson_type: str,
        output_path: str,
        mascot: str = "🤖",
        mascot_says: str = "",
        section_icon: str = "📚",
        example: str = "",
        language: str = "zh-CN"
    ) -> str:
        """Render content slide"""
        if not self.page:
            await self.init_browser()

        template = self.env.get_template("content.html")
        theme = THEME_COLORS.get(lesson_type, THEME_COLORS["ai-intro"])

        # Default mascot message
        if not mascot_says:
            mascot_says = "一起来学习吧！" if language != "ja" else "一緒に学ぼう！"

        # Example label
        example_label = "例子" if language != "ja" else "例"

        html = template.render(
            language=language,
            section_title=section_title,
            content=content,
            mascot=mascot,
            mascot_says=mascot_says,
            section_icon=section_icon,
            example=example,
            example_label=example_label,
            **theme
        )

        await self.page.set_content(html)
        await self.page.wait_for_timeout(200)

        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        await self.page.screenshot(path=output_path)
        return output_path

    async def render_quiz(
        self,
        question: str,
        options: List[Dict[str, str]],
        output_path: str,
        quiz_number: int = 1,
        show_answer: bool = False,
        correct_key: str = "",
        language: str = "zh-CN"
    ) -> str:
        """Render quiz slide"""
        if not self.page:
            await self.init_browser()

        template = self.env.get_template("quiz.html")

        # Process options with status
        processed_options = []
        for opt in options:
            status = ""
            if show_answer and correct_key:
                if opt["key"] == correct_key:
                    status = "correct"
            processed_options.append({
                "key": opt["key"],
                "text": opt["text"],
                "status": status
            })

        # Localized text
        quiz_label = "小测验" if language != "ja" else "クイズ"
        quiz_number_text = f"第{quiz_number}题" if language != "ja" else f"問題{quiz_number}"

        html = template.render(
            language=language,
            quiz_label=quiz_label,
            quiz_number=quiz_number_text,
            question=question,
            options=processed_options
        )

        await self.page.set_content(html)
        await self.page.wait_for_timeout(200)

        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        await self.page.screenshot(path=output_path)
        return output_path

    async def render_celebration(
        self,
        title: str,
        message: str,
        stars: int,
        output_path: str,
        next_lesson: str = "",
        language: str = "zh-CN"
    ) -> str:
        """Render celebration slide"""
        if not self.page:
            await self.init_browser()

        template = self.env.get_template("celebration.html")

        # Localized text
        if language == "ja":
            stars_label = "スター獲得"
            next_label = "次の授業："
        else:
            stars_label = "星星"
            next_label = "下一课："

        html = template.render(
            language=language,
            title=title,
            message=message,
            stars=stars,
            stars_label=stars_label,
            next_lesson=next_lesson,
            next_label=next_label
        )

        await self.page.set_content(html)
        await self.page.wait_for_timeout(200)

        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        await self.page.screenshot(path=output_path)
        return output_path


class KidsTTSEngine:
    """Text-to-Speech for kids course using edge-tts"""

    def __init__(self, language: str = "zh-CN"):
        self.language = language
        self.voice = VOICES.get(language, VOICES["zh-CN"])
        self.rate = "-10%"  # Slightly slower for kids

    async def synthesize(self, text: str, output_path: str) -> str:
        """Generate audio from text"""
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        communicate = edge_tts.Communicate(
            text,
            self.voice,
            rate=self.rate
        )

        await communicate.save(output_path)
        return output_path


class KidsVideoGenerator:
    """Generate educational videos for kids course"""

    def __init__(self, language: str = "zh-CN"):
        self.language = language
        self.renderer = KidsSlideRenderer()
        self.tts = KidsTTSEngine(language)
        self.clips: List[Any] = []
        self.temp_files: List[str] = []

    async def init(self):
        """Initialize resources"""
        await self.renderer.init_browser()

    async def close(self):
        """Cleanup resources"""
        await self.renderer.close_browser()
        self.cleanup()

    def cleanup(self):
        """Remove temporary files"""
        for filepath in self.temp_files:
            try:
                if os.path.exists(filepath):
                    os.remove(filepath)
            except Exception:
                pass
        self.temp_files = []
        self.clips = []

    async def add_intro(
        self,
        lesson_id: str,
        lesson_number: int,
        title: str,
        subtitle: str,
        duration: int,
        intro_text: str
    ):
        """Add intro slide with narration"""
        # Render slide
        slide_path = os.path.join(SLIDES_DIR, f"{lesson_id}_intro.png")
        await self.renderer.render_intro(
            lesson_number, title, subtitle, duration,
            slide_path, self.language
        )
        self.temp_files.append(slide_path)

        # Generate audio
        audio_path = os.path.join(AUDIO_DIR, f"{lesson_id}_intro.mp3")
        await self.tts.synthesize(intro_text, audio_path)
        self.temp_files.append(audio_path)

        # Create clip
        audio_clip = AudioFileClip(audio_path)
        clip_duration = audio_clip.duration + 2  # Add 2 sec pause

        clip = ImageClip(slide_path).set_duration(clip_duration)
        clip = clip.set_audio(audio_clip)
        self.clips.append(clip)

    async def add_content_section(
        self,
        lesson_id: str,
        section_id: str,
        lesson_type: str,
        section_title: str,
        content: str,
        narration: str,
        mascot: str = "🤖",
        mascot_says: str = "",
        section_icon: str = "📚",
        example: str = ""
    ):
        """Add a content section slide"""
        # Render slide
        slide_path = os.path.join(SLIDES_DIR, f"{lesson_id}_{section_id}.png")
        await self.renderer.render_content(
            section_title, content, lesson_type,
            slide_path, mascot, mascot_says, section_icon, example,
            self.language
        )
        self.temp_files.append(slide_path)

        # Generate audio
        audio_path = os.path.join(AUDIO_DIR, f"{lesson_id}_{section_id}.mp3")
        await self.tts.synthesize(narration, audio_path)
        self.temp_files.append(audio_path)

        # Create clip
        audio_clip = AudioFileClip(audio_path)
        clip_duration = audio_clip.duration + 1.5

        clip = ImageClip(slide_path).set_duration(clip_duration)
        clip = clip.set_audio(audio_clip)
        self.clips.append(clip)

    async def add_quiz(
        self,
        lesson_id: str,
        quiz_id: str,
        question: str,
        options: List[Dict[str, str]],
        correct_answer: str,
        explanation: str,
        quiz_number: int = 1
    ):
        """Add a quiz with question and answer reveal"""
        # 1. Question slide (no answer)
        q_slide = os.path.join(SLIDES_DIR, f"{lesson_id}_{quiz_id}_q.png")
        await self.renderer.render_quiz(
            question, options, q_slide,
            quiz_number, show_answer=False,
            language=self.language
        )
        self.temp_files.append(q_slide)

        # Question narration
        q_audio = os.path.join(AUDIO_DIR, f"{lesson_id}_{quiz_id}_q.mp3")
        q_text = f"第{quiz_number}题。{question}。" if self.language != "ja" else f"問題{quiz_number}。{question}。"
        for opt in options:
            q_text += f" {opt['key']}。{opt['text']}。"
        await self.tts.synthesize(q_text, q_audio)
        self.temp_files.append(q_audio)

        # Create question clip with thinking time
        q_audio_clip = AudioFileClip(q_audio)
        q_duration = q_audio_clip.duration + 3  # 3 sec thinking time

        q_clip = ImageClip(q_slide).set_duration(q_duration)
        q_clip = q_clip.set_audio(q_audio_clip)
        self.clips.append(q_clip)

        # 2. Answer reveal slide
        a_slide = os.path.join(SLIDES_DIR, f"{lesson_id}_{quiz_id}_a.png")
        await self.renderer.render_quiz(
            question, options, a_slide,
            quiz_number, show_answer=True,
            correct_key=correct_answer,
            language=self.language
        )
        self.temp_files.append(a_slide)

        # Answer narration
        a_audio = os.path.join(AUDIO_DIR, f"{lesson_id}_{quiz_id}_a.mp3")
        if self.language == "ja":
            a_text = f"正解は{correct_answer}です。{explanation}"
        else:
            a_text = f"正确答案是{correct_answer}。{explanation}"
        await self.tts.synthesize(a_text, a_audio)
        self.temp_files.append(a_audio)

        # Create answer clip
        a_audio_clip = AudioFileClip(a_audio)
        a_duration = a_audio_clip.duration + 1

        a_clip = ImageClip(a_slide).set_duration(a_duration)
        a_clip = a_clip.set_audio(a_audio_clip)
        self.clips.append(a_clip)

    async def add_celebration(
        self,
        lesson_id: str,
        title: str,
        message: str,
        stars: int,
        next_lesson: str = ""
    ):
        """Add celebration slide at the end"""
        # Render slide
        slide_path = os.path.join(SLIDES_DIR, f"{lesson_id}_celebration.png")
        await self.renderer.render_celebration(
            title, message, stars, slide_path,
            next_lesson, self.language
        )
        self.temp_files.append(slide_path)

        # Generate audio
        audio_path = os.path.join(AUDIO_DIR, f"{lesson_id}_celebration.mp3")
        if self.language == "ja":
            narration = f"{title}！{message}。{stars}スターを獲得しました！"
            if next_lesson:
                narration += f"次の授業は{next_lesson}です。"
        else:
            narration = f"{title}！{message}。获得了{stars}颗星星！"
            if next_lesson:
                narration += f"下一课是{next_lesson}。"

        await self.tts.synthesize(narration, audio_path)
        self.temp_files.append(audio_path)

        # Create clip
        audio_clip = AudioFileClip(audio_path)
        clip_duration = audio_clip.duration + 3

        clip = ImageClip(slide_path).set_duration(clip_duration)
        clip = clip.set_audio(audio_clip)
        self.clips.append(clip)

    async def compose(
        self,
        output_path: str,
        fps: int = 24,
        codec: str = "libx264",
        audio_codec: str = "aac"
    ) -> str:
        """Compose all clips into final video"""
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
            logger=None
        )

        # Cleanup
        final.close()
        for clip in self.clips:
            clip.close()

        return output_path


async def generate_lesson_video(
    lesson_data: Dict[str, Any],
    language: str = "zh-CN",
    output_dir: str = VIDEO_DIR
) -> str:
    """
    Generate a complete lesson video from lesson data.

    Args:
        lesson_data: Lesson data dictionary containing:
            - id: Lesson ID
            - title: Lesson title (dict with zh/ja)
            - sections: List of content sections
            - exercises/quiz: Quiz questions
            - starsReward: Stars earned
        language: "zh-CN" or "ja"
        output_dir: Output directory for video

    Returns:
        Path to generated video
    """
    generator = KidsVideoGenerator(language)

    try:
        await generator.init()

        lesson_id = lesson_data["id"]
        lesson_number = lesson_data.get("order", 1)

        # Get localized content
        lang_key = "zh" if language == "zh-CN" else "ja"
        title = lesson_data["title"].get(lang_key, lesson_data["title"].get("zh", ""))
        lesson_type = lesson_data.get("type", "ai-intro")
        duration = lesson_data.get("duration", 30)
        stars = lesson_data.get("starsReward", 10)

        # 1. Intro
        if language == "ja":
            subtitle = "AIの冒険を始めよう！"
            intro_narration = f"第{lesson_number}課へようこそ！今日は{title}について学びます。"
        else:
            subtitle = "开始AI探险之旅！"
            intro_narration = f"欢迎来到第{lesson_number}课！今天我们要学习{title}。"

        await generator.add_intro(
            lesson_id, lesson_number, title, subtitle,
            duration, intro_narration
        )

        # 2. Content sections
        sections = lesson_data.get("sections", [])
        mascot_index = 0
        for i, section in enumerate(sections):
            if section.get("type") in ["text", "interactive"]:
                content = section.get("content", {}).get(lang_key, "")
                if not content:
                    continue

                section_title = f"第{i+1}部分" if language == "zh-CN" else f"パート{i+1}"

                await generator.add_content_section(
                    lesson_id,
                    f"section_{i}",
                    lesson_type,
                    section_title,
                    f"<p>{content}</p>",
                    content,  # narration is same as content
                    mascot=MASCOTS[mascot_index % len(MASCOTS)],
                    section_icon="💡" if section.get("type") == "interactive" else "📖"
                )
                mascot_index += 1

        # 3. Quiz questions
        quiz = lesson_data.get("quiz", {})
        questions = quiz.get("questions", [])

        for i, q in enumerate(questions[:3]):  # Limit to 3 questions for video
            question_text = q.get("question", {}).get(lang_key, "")
            if not question_text:
                continue

            # Process options
            options = []
            options_data = q.get("options", [])
            for opt in options_data:
                options.append({
                    "key": opt.get("key", ""),
                    "text": opt.get("text", {}).get(lang_key, "")
                })

            correct = q.get("correctAnswer", "A")
            encouragement = q.get("encouragement", {}).get(lang_key, "太棒了！")

            await generator.add_quiz(
                lesson_id,
                f"quiz_{i}",
                question_text,
                options,
                correct,
                encouragement,
                quiz_number=i + 1
            )

        # 4. Celebration
        if language == "ja":
            celebration_title = "おめでとう！"
            celebration_msg = "今日の授業を完了しました"
            next_text = "次の授業で会いましょう！"
        else:
            celebration_title = "恭喜你！"
            celebration_msg = "完成了今天的学习"
            next_text = "下一课见！"

        await generator.add_celebration(
            lesson_id,
            celebration_title,
            celebration_msg,
            stars,
            next_text
        )

        # 5. Compose video
        output_path = os.path.join(output_dir, f"kids_{lesson_id}_{language}.mp4")
        await generator.compose(output_path)

        print(f"Generated video: {output_path}")
        return output_path

    finally:
        await generator.close()


# CLI interface
if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Generate kids course videos")
    parser.add_argument("lesson_file", help="Path to lesson JSON file")
    parser.add_argument("--language", "-l", default="zh-CN", choices=["zh-CN", "ja"])
    parser.add_argument("--output", "-o", default=VIDEO_DIR)

    args = parser.parse_args()

    # Load lesson data
    with open(args.lesson_file, "r", encoding="utf-8") as f:
        lesson_data = json.load(f)

    # Generate video
    asyncio.run(generate_lesson_video(
        lesson_data,
        language=args.language,
        output_dir=args.output
    ))
