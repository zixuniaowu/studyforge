---
title: StudyForge
emoji: 📚
colorFrom: blue
colorTo: purple
sdk: docker
app_port: 7860
pinned: false
license: mit
---

# StudyForge 📚

**Efficient Exam Preparation Platform**

## 🚀 Live Demo

**Hugging Face Spaces:** [https://jackywangsh-studyforge.hf.space](https://jackywangsh-studyforge.hf.space)

> 📦 Auto-deployment: Automatically syncs to Hugging Face Spaces on GitHub push
>
> ⚡ Static hosting: Pure frontend application, no backend server required, fast loading

## Features

### 🎯 Exam Practice
- Multiple choice questions with instant feedback
- Practice mode (see answers immediately)
- Exam mode (timed, see results at end)
- Support for Chinese and Japanese languages

### 📊 Progress Tracking
- Track your study progress
- Wrong answer book for review
- Statistics dashboard with accuracy rates

### 🎬 Video Generation
- Auto-generate explanation videos
- Text-to-Speech narration (edge-tts)
- Beautiful slide animations

### 🌐 Multi-language
- Chinese (中文)
- Japanese (日本語)

### ☁️ Cloud Sync
- Google OAuth login
- Automatic progress synchronization
- Cross-device support

## Currently Available Exams

### ☁️ Cloud Certifications

| Provider | Certifications | Question Sets |
|----------|---------------|---------------|
| **AWS** | AI Practitioner, Solutions Architect, ML Specialty, etc. (12 certs) | 72 sets |
| **Azure** | AI-900, AI-102, AZ-900, AZ-104, AZ-204, etc. (12 certs) | 72 sets |
| **GCP** | Cloud Digital Leader, ACE, PCA, PDE, ML Engineer, etc. (10 certs) | 60 sets |
| **SAP** | S/4HANA, BTP, AI/ML, HR, CX, SCM, GRC, etc. (38 certs) | 228 sets |

### 🔧 Low-Code/No-Code Platforms

| Platform | Certifications | Question Sets |
|----------|---------------|---------------|
| **n8n** | Fundamentals, Advanced, Integration | 18 sets |
| **Dify** | Fundamentals, App Builder, LLMOps | 18 sets |

### 📊 Total

- **75+ certification exams**
- **450+ question sets**
- **22,500+ practice questions**
- **Chinese + Japanese bilingual support**

## Tech Stack

### Frontend (Main Application)
- **Framework**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Local Storage**: IndexedDB (Dexie.js)
- **Deployment**: Hugging Face Spaces (Docker/Nginx)

### Video Generator (Local Tool)
- **Backend**: Python + edge-tts
- **Rendering**: Playwright + Jinja2
- **Compositing**: MoviePy

## Project Structure

```
studyforge/
├── web/                    # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── stores/         # Zustand stores
│   │   ├── lib/            # Utilities (db, api, sync)
│   │   ├── i18n/           # Translations (zh, ja)
│   │   ├── hooks/          # Custom hooks
│   │   └── types/          # TypeScript types
│   └── public/             # Static assets & sample data
├── video-generator/        # Video generation tool (Python)
│   ├── src/
│   │   ├── tts_engine.py   # Text-to-Speech
│   │   ├── slide_renderer.py # HTML to image
│   │   └── video_composer.py # Video generation
│   └── templates/          # HTML templates for slides
├── Dockerfile              # Production Docker image
└── README.md
```

## Local Development

### Prerequisites
- Node.js 18+
- Python 3.11+ (for video generation only)
- Docker (optional)

### Frontend

```bash
cd web
npm install
npm run dev
```

### Video Generator

```bash
cd video-generator
pip install -r requirements.txt
playwright install chromium
python src/batch_processor.py <exam-file.json> --start 1 --end 10
```

### Docker (Full Stack)

```bash
# Build frontend first
cd web && npm run build && cd ..

# Run with Docker
docker build -t studyforge .
docker run -p 7860:7860 studyforge
```

## Deployment to Hugging Face Spaces

### Auto Deployment (Current Setup)

This project is configured with GitHub → Hugging Face auto-sync:

1. **Push to GitHub** → Automatically triggers sync
2. **Hugging Face Build** → Docker image build (~2-3 minutes)
3. **Deployment Complete** → Visit [jackywangsh-studyforge.hf.space](https://jackywangsh-studyforge.hf.space)

### Manual Deployment

1. Create a new Space with Docker SDK
2. Push this repository to the Space
3. Set environment variables in Space settings
4. The app will be available at `https://huggingface.co/spaces/<username>/<space-name>`

### Deployment Architecture

```
GitHub Repository
       │
       ▼ (Auto Sync)
Hugging Face Spaces
       │
       ▼ (Docker Build)
Static Frontend (Nginx)
       │
       ▼
User Access: jackywangsh-studyforge.hf.space
```

## Adding New Exams

1. Create a JSON file following the format in `web/public/sample-data/`
2. Include both Chinese and Japanese versions if needed
3. Import via the web interface or add to `sample-data/`

### Exam JSON Format

```json
{
  "exam": {
    "id": "exam-id",
    "name": "Exam Name",
    "code": "EXAM-001",
    "provider": "Provider Name",
    "language": "zh",
    "totalQuestions": 50,
    "passingScore": 70,
    "examTime": 90,
    "domains": [
      {"name": "Domain 1", "percentage": 30}
    ],
    "tags": ["tag1", "tag2"]
  },
  "questions": [
    {
      "id": 1,
      "question": "Question text?",
      "options": {"A": "Option A", "B": "Option B", "C": "Option C", "D": "Option D"},
      "answer": "A",
      "answerType": "single",
      "explanation": "Explanation text",
      "difficulty": "medium"
    }
  ]
}
```

## License

MIT License

This means you are free to:
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Use privately
- ✅ Sublicense

Only requirement: Keep the copyright notice and license in all copies.

---

Made with ❤️ for exam takers everywhere
