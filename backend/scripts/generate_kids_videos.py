#!/usr/bin/env python3
"""
Generate educational videos for Kids AI Course

Usage:
    python generate_kids_videos.py                     # Generate all lessons
    python generate_kids_videos.py --lesson lesson-1   # Generate specific lesson
    python generate_kids_videos.py --language ja       # Generate Japanese version
    python generate_kids_videos.py --list              # List available lessons
"""
import os
import sys
import json
import argparse
import asyncio
import subprocess
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from services.kids_video_generator import generate_lesson_video, VIDEO_DIR

# Path to web data
WEB_DIR = Path(__file__).parent.parent.parent / "web"
KIDS_COURSE_TS = WEB_DIR / "src" / "data" / "kidsCourse.ts"
KIDS_COURSE_JSON = Path(__file__).parent / "kids_course_data.json"


def extract_lesson_data_from_ts() -> list:
    """
    Extract lesson data from TypeScript file.
    Uses Node.js to parse and export the data.
    """
    # Create a temporary Node.js script to extract the data
    extract_script = """
const fs = require('fs');

// Read the TypeScript file
const tsContent = fs.readFileSync(process.argv[2], 'utf-8');

// Simple extraction - find the kidsLessons array
const lessonsMatch = tsContent.match(/export const kidsLessons[\\s\\S]*?=\\s*(\\[[\\s\\S]*?\\]);/);

if (lessonsMatch) {
    // Convert TypeScript to JSON-like format
    let jsonStr = lessonsMatch[1]
        // Remove type annotations
        .replace(/as const/g, '')
        // Convert property names without quotes to quoted
        .replace(/([{,]\\s*)(\\w+):/g, '$1"$2":')
        // Handle template literals (basic)
        .replace(/`([^`]*)`/g, '"$1"')
        // Remove trailing commas before ] or }
        .replace(/,\\s*([\\]}])/g, '$1');

    try {
        const lessons = eval('(' + jsonStr + ')');
        console.log(JSON.stringify(lessons, null, 2));
    } catch (e) {
        console.error('Parse error:', e.message);
        process.exit(1);
    }
} else {
    console.error('Could not find kidsLessons export');
    process.exit(1);
}
"""

    extract_script_path = Path(__file__).parent / "_extract_lessons.js"

    try:
        # Write the extraction script
        with open(extract_script_path, 'w') as f:
            f.write(extract_script)

        # Run Node.js to extract data
        result = subprocess.run(
            ['node', str(extract_script_path), str(KIDS_COURSE_TS)],
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            print(f"Error extracting data: {result.stderr}")
            return []

        lessons = json.loads(result.stdout)
        return lessons

    except Exception as e:
        print(f"Error: {e}")
        return []

    finally:
        # Cleanup temp script
        if extract_script_path.exists():
            extract_script_path.unlink()


def load_lesson_data() -> list:
    """Load lesson data, extracting from TS if needed."""
    # First try to use cached JSON
    if KIDS_COURSE_JSON.exists():
        with open(KIDS_COURSE_JSON, 'r', encoding='utf-8') as f:
            return json.load(f)

    # Extract from TypeScript
    print("Extracting lesson data from TypeScript...")
    lessons = extract_lesson_data_from_ts()

    if lessons:
        # Cache the extracted data
        with open(KIDS_COURSE_JSON, 'w', encoding='utf-8') as f:
            json.dump(lessons, f, ensure_ascii=False, indent=2)
        print(f"Cached lesson data to {KIDS_COURSE_JSON}")

    return lessons


def create_sample_lesson_data() -> dict:
    """Create sample lesson data for testing."""
    return {
        "id": "lesson-1",
        "unitId": "unit-1",
        "order": 1,
        "title": {
            "zh": "什么是人工智能？",
            "ja": "人工知能とは何か？"
        },
        "duration": 30,
        "type": "ai-intro",
        "sections": [
            {
                "id": "intro",
                "type": "text",
                "content": {
                    "zh": "嗨，小朋友们！今天我们要认识一个超级厉害的新朋友——人工智能！你知道什么是人工智能吗？",
                    "ja": "こんにちは！今日は新しい友達、人工知能について学びましょう！人工知能って何か知っていますか？"
                }
            },
            {
                "id": "what-is-ai",
                "type": "text",
                "content": {
                    "zh": "人工智能就像是给电脑装上了一个聪明的大脑。它可以像人一样思考、学习和做决定。比如手机里的语音助手，就是一种人工智能哦！",
                    "ja": "人工知能はコンピューターに賢い脳を与えるようなものです。人間のように考え、学び、決定することができます。スマホの音声アシスタントも人工知能なんですよ！"
                }
            },
            {
                "id": "examples",
                "type": "interactive",
                "content": {
                    "zh": "让我们来看看生活中有哪些人工智能：语音助手（小爱、Siri）、自动驾驶汽车、人脸识别解锁手机、推荐你喜欢的视频。这些都用到了人工智能技术！",
                    "ja": "日常生活の中の人工知能を見てみましょう：音声アシスタント（Siri）、自動運転車、顔認識でスマホのロック解除、好きな動画のおすすめ。これらはすべて人工知能を使っています！"
                }
            }
        ],
        "quiz": {
            "id": "quiz-1",
            "questions": [
                {
                    "id": "q1",
                    "type": "multiple-choice",
                    "question": {
                        "zh": "下面哪个是人工智能的例子？",
                        "ja": "次のうち、人工知能の例はどれですか？"
                    },
                    "options": [
                        {"key": "A", "text": {"zh": "语音助手小爱同学", "ja": "音声アシスタントSiri"}},
                        {"key": "B", "text": {"zh": "普通的台灯", "ja": "普通の電気スタンド"}},
                        {"key": "C", "text": {"zh": "纸质书本", "ja": "紙の本"}},
                        {"key": "D", "text": {"zh": "铅笔", "ja": "鉛筆"}}
                    ],
                    "correctAnswer": "A",
                    "encouragement": {
                        "zh": "太棒了！语音助手确实是人工智能！",
                        "ja": "すごい！音声アシスタントは確かに人工知能です！"
                    }
                },
                {
                    "id": "q2",
                    "type": "multiple-choice",
                    "question": {
                        "zh": "人工智能可以做什么？",
                        "ja": "人工知能は何ができますか？"
                    },
                    "options": [
                        {"key": "A", "text": {"zh": "思考和学习", "ja": "考えることと学ぶこと"}},
                        {"key": "B", "text": {"zh": "只能做加减法", "ja": "足し算と引き算だけ"}},
                        {"key": "C", "text": {"zh": "什么都不能做", "ja": "何もできない"}},
                        {"key": "D", "text": {"zh": "只能播放音乐", "ja": "音楽を再生するだけ"}}
                    ],
                    "correctAnswer": "A",
                    "encouragement": {
                        "zh": "正确！AI可以思考和学习，就像人一样聪明！",
                        "ja": "正解！AIは人間のように考えて学ぶことができます！"
                    }
                }
            ],
            "passingScore": 1,
            "maxStars": 3
        },
        "starsReward": 15
    }


async def generate_single_lesson(lesson_data: dict, language: str, output_dir: str):
    """Generate video for a single lesson."""
    lesson_id = lesson_data.get("id", "unknown")
    title = lesson_data.get("title", {}).get("zh" if language == "zh-CN" else "ja", "Unknown")

    print(f"\n{'='*60}")
    print(f"Generating video for: {title}")
    print(f"Lesson ID: {lesson_id}")
    print(f"Language: {language}")
    print(f"{'='*60}")

    try:
        output_path = await generate_lesson_video(lesson_data, language, output_dir)
        print(f"✅ Successfully generated: {output_path}")
        return output_path
    except Exception as e:
        print(f"❌ Error generating video: {e}")
        import traceback
        traceback.print_exc()
        return None


async def main():
    parser = argparse.ArgumentParser(
        description="Generate educational videos for Kids AI Course"
    )
    parser.add_argument(
        "--lesson", "-L",
        help="Specific lesson ID to generate (e.g., lesson-1)"
    )
    parser.add_argument(
        "--language", "-l",
        default="zh-CN",
        choices=["zh-CN", "ja"],
        help="Language for the video"
    )
    parser.add_argument(
        "--output", "-o",
        default=VIDEO_DIR,
        help="Output directory for videos"
    )
    parser.add_argument(
        "--list",
        action="store_true",
        help="List available lessons"
    )
    parser.add_argument(
        "--sample",
        action="store_true",
        help="Generate sample lesson video (for testing)"
    )

    args = parser.parse_args()

    # Create output directories
    os.makedirs(args.output, exist_ok=True)

    # Sample mode for testing
    if args.sample:
        print("Generating sample lesson video...")
        sample_lesson = create_sample_lesson_data()
        await generate_single_lesson(sample_lesson, args.language, args.output)
        return

    # Load lessons
    lessons = load_lesson_data()

    if not lessons:
        print("No lesson data found. Using sample data for testing...")
        lessons = [create_sample_lesson_data()]

    # List mode
    if args.list:
        print("\nAvailable lessons:")
        print("-" * 60)
        for lesson in lessons:
            lesson_id = lesson.get("id", "unknown")
            title_zh = lesson.get("title", {}).get("zh", "Unknown")
            title_ja = lesson.get("title", {}).get("ja", "Unknown")
            duration = lesson.get("duration", 0)
            print(f"  {lesson_id}")
            print(f"    中文: {title_zh}")
            print(f"    日本語: {title_ja}")
            print(f"    Duration: {duration} min")
            print()
        return

    # Generate specific lesson
    if args.lesson:
        lesson = next((l for l in lessons if l.get("id") == args.lesson), None)
        if not lesson:
            print(f"Lesson '{args.lesson}' not found.")
            print("Use --list to see available lessons.")
            return
        await generate_single_lesson(lesson, args.language, args.output)
        return

    # Generate all lessons
    print(f"Generating videos for {len(lessons)} lessons...")
    for lesson in lessons:
        await generate_single_lesson(lesson, args.language, args.output)

    print("\n" + "=" * 60)
    print("Video generation complete!")
    print(f"Videos saved to: {args.output}")


if __name__ == "__main__":
    asyncio.run(main())
