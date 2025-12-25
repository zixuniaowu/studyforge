#!/usr/bin/env python3
"""Convert markdown question bank to JSON format for StudyForge"""

import json
import re
import sys
from pathlib import Path


def parse_question_md(content: str) -> dict:
    """Parse markdown content and extract exam metadata and questions"""

    # Extract exam metadata from header
    exam_data = {}

    # Extract exam code
    code_match = re.search(r'\*\*考试代码\*\*:\s*(\S+)', content)
    if code_match:
        exam_data['code'] = code_match.group(1)

    # Extract total questions
    total_match = re.search(r'\*\*题目数量\*\*:\s*(\d+)', content)
    if total_match:
        exam_data['totalQuestions'] = int(total_match.group(1))

    # Extract passing score
    pass_match = re.search(r'\*\*及格分数\*\*:\s*(\d+)%', content)
    if pass_match:
        exam_data['passingScore'] = int(pass_match.group(1))

    # Extract exam time
    time_match = re.search(r'\*\*考试时间\*\*:\s*(\d+)', content)
    if time_match:
        exam_data['examTime'] = int(time_match.group(1))

    # Extract language
    lang_match = re.search(r'\*\*语言\*\*:\s*(\S+)', content)
    if lang_match:
        exam_data['language'] = lang_match.group(1)

    # Extract domains
    domains = []
    domain_pattern = r'\|\s*(\d+)\s*\|\s*([^|]+)\s*\|\s*(\d+)-(\d+)%\s*\|'
    for match in re.finditer(domain_pattern, content):
        domains.append({
            'id': int(match.group(1)),
            'name': match.group(2).strip(),
            'weight': int(match.group(3)) + int(match.group(4)) // 2  # Average weight
        })
    exam_data['domains'] = domains

    # Extract questions
    questions = []
    question_blocks = re.split(r'### Q(\d+)', content)[1:]  # Skip first empty part

    for i in range(0, len(question_blocks), 2):
        q_num = int(question_blocks[i])
        q_content = question_blocks[i + 1] if i + 1 < len(question_blocks) else ""

        # Parse question metadata (domain, difficulty, tags)
        meta_match = re.search(r'<!--\s*domain:\s*(\d+)\s*\|\s*difficulty:\s*(\w+)', q_content)
        domain = int(meta_match.group(1)) if meta_match else 1
        difficulty = meta_match.group(2) if meta_match else 'medium'

        # Extract question text
        lines = q_content.strip().split('\n')
        question_text = ""
        options = {}
        answer = ""
        explanation = ""

        current_section = "question"
        option_pattern = r'^-\s*([A-Z])\.\s*(.+)$'

        for line in lines:
            line = line.strip()
            if not line or line.startswith('<!--'):
                continue

            if line.startswith('**答案**:'):
                current_section = "answer"
                answer = line.replace('**答案**:', '').strip()
                continue

            if line.startswith('**解析**:'):
                current_section = "explanation"
                continue

            option_match = re.match(option_pattern, line)
            if option_match:
                current_section = "options"
                options[option_match.group(1)] = option_match.group(2).strip()
                continue

            if current_section == "question" and not line.startswith('---'):
                if question_text:
                    question_text += " " + line
                else:
                    question_text = line
            elif current_section == "explanation":
                if explanation:
                    explanation += "\n" + line
                else:
                    explanation = line

        # Handle multiple choice answers
        answer_type = "single"
        if ',' in answer or '、' in answer:
            answer_type = "multiple"
            answer = [a.strip() for a in re.split(r'[,、]', answer)]

        questions.append({
            'id': f'q{q_num}',
            'domain': domain,
            'question': question_text.strip(),
            'options': options,
            'answer': answer,
            'answerType': answer_type,
            'explanation': explanation.strip(),
            'difficulty': difficulty
        })

    return exam_data, questions


def create_exam_json(md_path: str, exam_id: str, exam_name: str, provider: str) -> dict:
    """Create complete exam JSON from markdown file"""

    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    exam_data, questions = parse_question_md(content)

    return {
        'exam': {
            'id': exam_id,
            'name': exam_name,
            'code': exam_data.get('code', ''),
            'provider': provider,
            'language': exam_data.get('language', 'zh-CN'),
            'description': f'{provider}认证考试模拟题',
            'totalQuestions': exam_data.get('totalQuestions', len(questions)),
            'passingScore': exam_data.get('passingScore', 70),
            'examTime': exam_data.get('examTime', 120),
            'domains': exam_data.get('domains', []),
            'tags': [provider, 'AI', 'ML', '认证考试']
        },
        'questions': questions
    }


def main():
    # Azure AI-102
    azure_json = create_exam_json(
        '/home/zixuniaowu/dev/studyforge/Azure/azure-ai-102-set1.md',
        'azure-ai-102-set1',
        'Azure AI-102 模拟考试 #1',
        'Azure'
    )

    with open('/home/zixuniaowu/dev/studyforge/web/public/sample-data/azure-ai-102-set1.json', 'w', encoding='utf-8') as f:
        json.dump(azure_json, f, ensure_ascii=False, indent=2)
    print(f"Created azure-ai-102-set1.json with {len(azure_json['questions'])} questions")

    # GCP ML Engineer
    gcp_json = create_exam_json(
        '/home/zixuniaowu/dev/studyforge/GCP/gcp-ml-engineer-set1.md',
        'gcp-ml-engineer-set1',
        'GCP ML Engineer 模拟考试 #1',
        'GCP'
    )

    with open('/home/zixuniaowu/dev/studyforge/web/public/sample-data/gcp-ml-engineer-set1.json', 'w', encoding='utf-8') as f:
        json.dump(gcp_json, f, ensure_ascii=False, indent=2)
    print(f"Created gcp-ml-engineer-set1.json with {len(gcp_json['questions'])} questions")


if __name__ == '__main__':
    main()
