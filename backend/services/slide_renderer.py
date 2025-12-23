"""
Slide Renderer using Playwright
Renders HTML templates to images for video slides
"""
from playwright.async_api import async_playwright, Browser, Page
from jinja2 import Environment, FileSystemLoader
import os
from typing import Optional, Dict, Any

from config import settings


class SlideRenderer:
    """Render HTML templates to images using Playwright"""

    def __init__(self):
        self.browser: Optional[Browser] = None
        self.page: Optional[Page] = None

        # Setup Jinja2 templates
        template_dir = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            "templates",
            "slides"
        )
        os.makedirs(template_dir, exist_ok=True)
        self.env = Environment(loader=FileSystemLoader(template_dir))

        # Create default templates if not exist
        self._create_default_templates(template_dir)

    def _create_default_templates(self, template_dir: str):
        """Create default HTML templates"""
        # Question template
        question_template = """<!DOCTYPE html>
<html lang="{{ language }}">
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Noto Sans CJK SC', 'Noto Sans CJK JP', 'Microsoft YaHei', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .card {
            background: white;
            border-radius: 24px;
            padding: 48px;
            max-width: 1200px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
        }
        .domain {
            background: #f0f4ff;
            color: #4f46e5;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 18px;
            font-weight: 600;
        }
        .question-num {
            color: #6b7280;
            font-size: 20px;
        }
        .question {
            font-size: 28px;
            line-height: 1.6;
            color: #1f2937;
            margin-bottom: 40px;
        }
        .options {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .option {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            padding: 20px 24px;
            background: #f9fafb;
            border: 2px solid #e5e7eb;
            border-radius: 16px;
            font-size: 22px;
            transition: all 0.2s;
        }
        .option.correct {
            background: #dcfce7;
            border-color: #22c55e;
        }
        .option.wrong {
            background: #fee2e2;
            border-color: #ef4444;
        }
        .option-key {
            width: 40px;
            height: 40px;
            background: #e5e7eb;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
        }
        .option.correct .option-key {
            background: #22c55e;
            color: white;
        }
        .option-text {
            flex: 1;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <span class="domain">Domain {{ domain }}</span>
            <span class="question-num">Question {{ number }}</span>
        </div>
        <div class="question">{{ question }}</div>
        <div class="options">
            {% for key, value in options.items() %}
            <div class="option {% if show_answer %}{% if key in correct_answer %}correct{% endif %}{% endif %}">
                <span class="option-key">{{ key }}</span>
                <span class="option-text">{{ value }}</span>
            </div>
            {% endfor %}
        </div>
    </div>
</body>
</html>"""

        # Explanation template
        explanation_template = """<!DOCTYPE html>
<html lang="{{ language }}">
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Noto Sans CJK SC', 'Noto Sans CJK JP', 'Microsoft YaHei', sans-serif;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            min-height: 100vh;
            padding: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .card {
            background: white;
            border-radius: 24px;
            padding: 48px;
            max-width: 1200px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 32px;
        }
        .icon {
            width: 56px;
            height: 56px;
            background: #dcfce7;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
        }
        .title {
            font-size: 32px;
            font-weight: bold;
            color: #059669;
        }
        .answer {
            background: #f0fdf4;
            border-left: 4px solid #22c55e;
            padding: 24px;
            border-radius: 12px;
            margin-bottom: 32px;
        }
        .answer-label {
            font-size: 18px;
            color: #6b7280;
            margin-bottom: 8px;
        }
        .answer-value {
            font-size: 28px;
            font-weight: bold;
            color: #166534;
        }
        .explanation {
            font-size: 24px;
            line-height: 1.8;
            color: #374151;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <div class="icon">✓</div>
            <div class="title">{{ title }}</div>
        </div>
        <div class="answer">
            <div class="answer-label">{{ answer_label }}</div>
            <div class="answer-value">{{ answer }}</div>
        </div>
        <div class="explanation">{{ explanation }}</div>
    </div>
</body>
</html>"""

        # Save templates
        for name, content in [
            ("question.html", question_template),
            ("explanation.html", explanation_template)
        ]:
            path = os.path.join(template_dir, name)
            if not os.path.exists(path):
                with open(path, "w", encoding="utf-8") as f:
                    f.write(content)

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

    async def render_question(
        self,
        question: Dict[str, Any],
        output_path: str,
        number: int = 1,
        show_answer: bool = False,
        language: str = "zh-CN",
        exam_name: str = ""
    ) -> str:
        """Render question slide to image"""
        if not self.page:
            await self.init_browser()

        # Prepare data
        answer = question.get("answer", "")
        if isinstance(answer, str):
            correct_answer = [answer]
        else:
            correct_answer = answer

        # Render template
        template = self.env.get_template("question.html")

        # Localized labels
        question_label = "問題" if language == "ja" else "第"
        footer_text = "試験対策" if language == "ja" else "考试备考"

        html = template.render(
            language=language,
            domain=question.get("domain", 1),
            number=number,
            question_label=question_label,
            question_text=question.get("question", ""),
            options=question.get("options", {}),
            show_answer=show_answer,
            correct_answer=correct_answer,
            user_answer=[],
            exam_name=exam_name,
            footer_text=footer_text
        )

        # Save HTML and screenshot
        await self.page.set_content(html)
        await self.page.wait_for_timeout(100)  # Wait for fonts

        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        await self.page.screenshot(path=output_path, full_page=True)

        return output_path

    async def render_explanation(
        self,
        question: Dict[str, Any],
        output_path: str,
        language: str = "zh-CN"
    ) -> str:
        """Render explanation slide to image"""
        if not self.page:
            await self.init_browser()

        # Prepare data
        answer = question.get("answer", "")
        if isinstance(answer, list):
            answer = ", ".join(answer)

        # Localized labels
        is_ja = language == "ja"
        explanation_label = "解説" if is_ja else "解析"
        correct_answer_label = "正解" if is_ja else "正确答案"
        question_label = "問題" if is_ja else "题目"
        footer_text = "試験対策" if is_ja else "考试备考"

        # Render template
        template = self.env.get_template("explanation.html")
        html = template.render(
            language=language,
            explanation_label=explanation_label,
            correct_answer_label=correct_answer_label,
            correct_answer=answer,
            question_label=question_label,
            question_text=question.get("question", ""),
            explanation_text=question.get("explanation", ""),
            footer_text=footer_text
        )

        # Save HTML and screenshot
        await self.page.set_content(html)
        await self.page.wait_for_timeout(100)

        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        await self.page.screenshot(path=output_path, full_page=True)

        return output_path
