#!/usr/bin/env python3
"""
YouTube Video Generator for StudyForge
Generates a complete exam explanation video for YouTube upload.

Usage:
    python generate_youtube_video.py <exam_json_path> <output_path> [--language zh|ja]

Example:
    python generate_youtube_video.py ../data/aws-aif-c01-set1-zh.json ./output/aws-set1.mp4 --language zh
"""

import asyncio
import argparse
import json
import os
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from services.tts_engine import TTSEngine
from services.slide_renderer import SlideRenderer
from moviepy.editor import (
    ImageClip, AudioFileClip, concatenate_videoclips
)
import subprocess


class YouTubeVideoGenerator:
    """Generate YouTube exam explanation videos"""

    def __init__(self, language: str = "zh"):
        self.language = language
        self.exam_name = ""
        self.tts = TTSEngine(
            language="zh-CN" if language == "zh" else "ja-JP"
        )
        self.renderer = SlideRenderer()
        self.temp_dir = Path("./temp_video")
        self.temp_dir.mkdir(exist_ok=True)

        # Localized strings
        self.strings = {
            "zh": {
                "intro": "欢迎观看本期视频。今天我们来详细讲解这套考试题目。",
                "question_prefix": "第{num}题。",
                "options_intro": "我们来看各个选项。",
                "option_prefix": "选项{key}：",
                "correct_answer": "正确答案是{answer}。",
                "why_correct": "为什么{key}是正确的呢？",
                "why_wrong": "而选项{key}为什么不对呢？",
                "explanation": "详细解析如下：",
                "next_question": "好，我们来看下一题。",
                "outro": "以上就是本套题目的全部讲解。希望对你的备考有所帮助。如果觉得有用，请点赞订阅，我们下期再见！",
                "thinking_time": "请先思考一下...",
            },
            "ja": {
                "intro": "この動画へようこそ。今日はこの試験問題を詳しく解説します。",
                "question_prefix": "問題{num}。",
                "options_intro": "各選択肢を見てみましょう。",
                "option_prefix": "選択肢{key}：",
                "correct_answer": "正解は{answer}です。",
                "why_correct": "なぜ{key}が正解なのでしょうか？",
                "why_wrong": "では、選択肢{key}がなぜ不正解なのでしょうか？",
                "explanation": "詳しい解説は以下の通りです：",
                "next_question": "では、次の問題に進みましょう。",
                "outro": "以上がこの問題セットの全ての解説です。試験勉強のお役に立てれば幸いです。役に立ったと思ったら、いいねとチャンネル登録をお願いします。また次回お会いしましょう！",
                "thinking_time": "まず考えてみてください...",
            }
        }[language]

    def generate_narration(self, question: dict, num: int) -> str:
        """Generate detailed narration script for a question"""
        s = self.strings
        lines = []

        # Question
        lines.append(s["question_prefix"].format(num=num))
        lines.append(question["question"])
        lines.append("")

        # Options
        lines.append(s["options_intro"])
        for key, value in question["options"].items():
            lines.append(f'{s["option_prefix"].format(key=key)} {value}')
        lines.append("")

        # Thinking pause
        lines.append(s["thinking_time"])
        lines.append("")

        # Correct answer
        answer = question["answer"]
        if isinstance(answer, list):
            answer_str = ", ".join(answer)
        else:
            answer_str = answer
        lines.append(s["correct_answer"].format(answer=answer_str))
        lines.append("")

        # Full explanation (covers why correct and why others are wrong)
        lines.append(s["explanation"])
        explanation = question.get("explanation", "")
        if explanation:
            lines.append(explanation)
        lines.append("")

        lines.append(s["next_question"])

        return "\n".join(lines)

    async def generate_question_clip(
        self,
        question: dict,
        num: int,
        total: int
    ) -> tuple:
        """Generate video clip for a single question"""
        print(f"  Generating question {num}/{total}...")

        question_id = question.get("id", f"q{num}")

        # Generate narration script
        narration = self.generate_narration(question, num)

        # Generate audio
        audio_path = self.temp_dir / f"{question_id}_audio.mp3"
        await self.tts.synthesize(narration, str(audio_path))

        # Render slides
        # 1. Question slide (without answer)
        question_slide = self.temp_dir / f"{question_id}_question.png"
        await self.renderer.render_question(
            question, str(question_slide), num,
            show_answer=False, language=self.language,
            exam_name=self.exam_name
        )

        # 2. Answer slide (with answer)
        answer_slide = self.temp_dir / f"{question_id}_answer.png"
        await self.renderer.render_question(
            question, str(answer_slide), num,
            show_answer=True, language=self.language,
            exam_name=self.exam_name
        )

        # 3. Explanation slide
        explanation_slide = self.temp_dir / f"{question_id}_explanation.png"
        await self.renderer.render_explanation(
            question, str(explanation_slide),
            language=self.language
        )

        # Load audio to get duration
        audio_clip = AudioFileClip(str(audio_path))
        total_duration = audio_clip.duration

        # Split duration based on narration structure:
        # - Question slide: question + options + thinking time (~55%)
        # - Answer slide: answer reveal (~5%)
        # - Explanation slide: explanation + transition (~40%)
        q_duration = total_duration * 0.55
        a_duration = total_duration * 0.05
        e_duration = total_duration * 0.40

        # Create clips
        q_clip = ImageClip(str(question_slide)).set_duration(q_duration)
        a_clip = ImageClip(str(answer_slide)).set_duration(a_duration)
        e_clip = ImageClip(str(explanation_slide)).set_duration(e_duration)

        # Concatenate
        video = concatenate_videoclips([q_clip, a_clip, e_clip], method="compose")
        video = video.set_audio(audio_clip)

        return video, [str(audio_path), str(question_slide), str(answer_slide), str(explanation_slide)]

    async def generate_intro_clip(self, exam_name: str) -> tuple:
        """Generate intro clip"""
        print("  Generating intro...")

        intro_text = self.strings["intro"]
        audio_path = self.temp_dir / "intro_audio.mp3"
        await self.tts.synthesize(intro_text, str(audio_path))

        audio_clip = AudioFileClip(str(audio_path))

        # Render intro slide using Playwright
        intro_slide = self.temp_dir / "intro_slide.png"
        await self.render_title_slide(exam_name, str(intro_slide), color="#667eea")

        intro_clip = ImageClip(str(intro_slide)).set_duration(audio_clip.duration)
        intro_clip = intro_clip.set_audio(audio_clip)

        return intro_clip, [str(audio_path), str(intro_slide)]

    async def render_title_slide(self, title: str, output_path: str, color: str = "#667eea"):
        """Render a title slide using Playwright"""
        html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            width: 1920px;
            height: 1080px;
            background: linear-gradient(135deg, {color} 0%, #764ba2 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'Noto Sans CJK SC', 'Noto Sans CJK JP', sans-serif;
        }}
        .title {{
            color: white;
            font-size: 72px;
            font-weight: bold;
            text-align: center;
            max-width: 1600px;
            line-height: 1.4;
            text-shadow: 2px 2px 10px rgba(0,0,0,0.3);
        }}
        .subtitle {{
            color: rgba(255,255,255,0.8);
            font-size: 36px;
            margin-top: 40px;
        }}
    </style>
</head>
<body>
    <div class="title">{title}</div>
    <div class="subtitle">StudyForge Exam Review</div>
</body>
</html>"""
        await self.renderer.page.set_content(html)
        await self.renderer.page.wait_for_timeout(100)
        await self.renderer.page.screenshot(path=output_path)

    async def generate_outro_clip(self) -> tuple:
        """Generate outro clip"""
        print("  Generating outro...")

        outro_text = self.strings["outro"]
        audio_path = self.temp_dir / "outro_audio.mp3"
        await self.tts.synthesize(outro_text, str(audio_path))

        audio_clip = AudioFileClip(str(audio_path))

        # Render outro slide using Playwright
        outro_slide = self.temp_dir / "outro_slide.png"
        thanks_text = "感谢观看！" if self.language == "zh" else "ご視聴ありがとうございました！"
        subscribe_text = "点赞订阅，下期再见！" if self.language == "zh" else "いいね＆チャンネル登録お願いします！"
        await self.render_outro_slide(thanks_text, subscribe_text, str(outro_slide))

        outro_clip = ImageClip(str(outro_slide)).set_duration(audio_clip.duration)
        outro_clip = outro_clip.set_audio(audio_clip)

        return outro_clip, [str(audio_path), str(outro_slide)]

    async def render_outro_slide(self, title: str, subtitle: str, output_path: str):
        """Render outro slide using Playwright"""
        html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            width: 1920px;
            height: 1080px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'Noto Sans CJK SC', 'Noto Sans CJK JP', sans-serif;
        }}
        .title {{
            color: white;
            font-size: 80px;
            font-weight: bold;
            text-align: center;
            text-shadow: 2px 2px 10px rgba(0,0,0,0.3);
        }}
        .subtitle {{
            color: rgba(255,255,255,0.9);
            font-size: 48px;
            margin-top: 40px;
        }}
        .logo {{
            margin-top: 60px;
            font-size: 36px;
            color: rgba(255,255,255,0.7);
        }}
    </style>
</head>
<body>
    <div class="title">{title}</div>
    <div class="subtitle">{subtitle}</div>
    <div class="logo">StudyForge</div>
</body>
</html>"""
        await self.renderer.page.set_content(html)
        await self.renderer.page.wait_for_timeout(100)
        await self.renderer.page.screenshot(path=output_path)

    def write_clip_to_file(self, clip, output_path: str):
        """Write a single clip to a video file"""
        clip.write_videofile(
            output_path,
            fps=24,
            codec='libx264',
            audio_codec='aac',
            threads=1,
            preset='ultrafast',
            verbose=False,
            logger=None
        )
        clip.close()

    async def generate_video(
        self,
        exam_json_path: str,
        output_path: str,
        max_questions: int = None
    ):
        """Generate complete YouTube video using FFmpeg concat"""
        print(f"Loading exam from {exam_json_path}...")

        with open(exam_json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        exam = data.get("exam", {})
        questions = data.get("questions", [])

        if max_questions:
            questions = questions[:max_questions]

        self.exam_name = exam.get("name", "Exam Review")
        total = len(questions)

        print(f"Generating video for {total} questions...")
        print(f"Exam: {self.exam_name}")

        # Initialize browser
        await self.renderer.init_browser()

        clip_files = []
        temp_files = []

        try:
            # Intro
            print("  Rendering intro...")
            intro_clip, intro_files = await self.generate_intro_clip(self.exam_name)
            intro_video = self.temp_dir / "clip_000_intro.mp4"
            self.write_clip_to_file(intro_clip, str(intro_video))
            clip_files.append(str(intro_video))
            temp_files.extend(intro_files)

            # Questions
            for i, question in enumerate(questions, 1):
                clip, files = await self.generate_question_clip(question, i, total)
                clip_video = self.temp_dir / f"clip_{i:03d}_q{i}.mp4"
                self.write_clip_to_file(clip, str(clip_video))
                clip_files.append(str(clip_video))
                temp_files.extend(files)

            # Outro
            print("  Rendering outro...")
            outro_clip, outro_files = await self.generate_outro_clip()
            outro_video = self.temp_dir / f"clip_{total+1:03d}_outro.mp4"
            self.write_clip_to_file(outro_clip, str(outro_video))
            clip_files.append(str(outro_video))
            temp_files.extend(outro_files)

            # Create concat file for FFmpeg (use absolute paths)
            print("Concatenating clips with FFmpeg...")
            concat_file = self.temp_dir / "concat_list.txt"
            with open(concat_file, 'w') as f:
                for clip_path in clip_files:
                    abs_path = os.path.abspath(clip_path)
                    f.write(f"file '{abs_path}'\n")

            # Use FFmpeg concat demuxer
            os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
            ffmpeg_cmd = [
                'ffmpeg', '-y', '-f', 'concat', '-safe', '0',
                '-i', str(concat_file),
                '-c', 'copy',
                output_path
            ]
            result = subprocess.run(ffmpeg_cmd, capture_output=True, text=True)
            if result.returncode != 0:
                print(f"FFmpeg error: {result.stderr}")
                raise RuntimeError("FFmpeg concat failed")

            # Get duration
            probe_cmd = ['ffprobe', '-v', 'error', '-show_entries',
                        'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1',
                        output_path]
            duration = float(subprocess.check_output(probe_cmd).decode().strip())

            print(f"Video saved to {output_path}")
            print(f"Duration: {duration:.1f} seconds")

            # Cleanup clip files
            for f in clip_files:
                try:
                    os.remove(f)
                except:
                    pass
            try:
                os.remove(concat_file)
            except:
                pass

            # Remove temp files
            for f in temp_files:
                try:
                    os.remove(f)
                except:
                    pass

        finally:
            await self.renderer.close_browser()

        return output_path


async def main():
    parser = argparse.ArgumentParser(
        description="Generate YouTube exam explanation video"
    )
    parser.add_argument("exam_json", help="Path to exam JSON file")
    parser.add_argument("output", help="Output video path")
    parser.add_argument(
        "--language", "-l",
        choices=["zh", "ja"],
        default="zh",
        help="Language (zh=Chinese, ja=Japanese)"
    )
    parser.add_argument(
        "--max-questions", "-m",
        type=int,
        help="Maximum number of questions (for testing)"
    )

    args = parser.parse_args()

    generator = YouTubeVideoGenerator(language=args.language)
    await generator.generate_video(
        args.exam_json,
        args.output,
        max_questions=args.max_questions
    )


if __name__ == "__main__":
    asyncio.run(main())
