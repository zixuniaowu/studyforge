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

**高效考试备考平台 | Efficient Exam Preparation Platform**

## 🚀 Live Demo

**Hugging Face Spaces:** [https://jackywangsh-studyforge.hf.space](https://jackywangsh-studyforge.hf.space)

> 📦 自动部署：GitHub 推送后自动同步到 Hugging Face Spaces
>
> ⚡ 静态托管：纯前端应用，无需后端服务器，加载速度快

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
| **AWS** | AI Practitioner, Solutions Architect, ML Specialty 等 12 个 | 72 套 |
| **Azure** | AI-900, AI-102, AZ-900, AZ-104, AZ-204 等 12 个 | 72 套 |
| **GCP** | Cloud Digital Leader, ACE, PCA, PDE, ML Engineer 等 10 个 | 60 套 |
| **SAP** | S/4HANA, BTP, AI/ML, HR, CX, SCM, GRC 等 38 个 | 228 套 |

### 🔧 Low-Code/No-Code Platforms

| Platform | Certifications | Question Sets |
|----------|---------------|---------------|
| **n8n** | Fundamentals, Advanced, Integration | 18 套 |
| **Dify** | Fundamentals, App Builder, LLMOps | 18 套 |

### 📊 Total

- **75+ 认证考试**
- **450+ 题库套卷**
- **22,500+ 道练习题**
- **中文 + 日文双语支持**

## Tech Stack

### Frontend (主应用)
- **Framework**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Local Storage**: IndexedDB (Dexie.js)
- **Deployment**: Hugging Face Spaces (Docker/Nginx)

### Video Generator (本地工具)
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
├── backend/                # Backend (FastAPI)
│   ├── routers/            # API routes
│   ├── models/             # Pydantic models
│   ├── services/           # Business logic
│   │   ├── tts_engine.py   # Text-to-Speech
│   │   ├── slide_renderer.py # HTML to image
│   │   └── video_composer.py # Video generation
│   └── templates/          # HTML templates for slides
├── Dockerfile              # Production Docker image
├── docker-compose.yml      # Local development
└── README.md
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/auth/google` | POST | Google OAuth login |
| `/api/auth/demo` | GET | Demo login |
| `/api/auth/me` | GET | Get current user |
| `/api/exams` | GET | List all exams |
| `/api/exams/{id}` | GET | Get exam details |
| `/api/exams/{id}/questions` | GET | Get exam questions |
| `/api/progress/sync` | POST | Sync user progress |
| `/api/progress/sessions` | GET | Get quiz sessions |
| `/api/progress/wrong-answers` | GET | Get wrong answers |
| `/api/video/generate` | POST | Generate explanation video |
| `/api/video/status/{job_id}` | GET | Check video job status |

## Environment Variables

### Backend

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | Optional |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Optional |
| `SUPABASE_URL` | Supabase project URL | Optional |
| `SUPABASE_KEY` | Supabase anon key | Optional |
| `SUPABASE_SERVICE_KEY` | Supabase service key | Optional |
| `JWT_SECRET` | JWT signing secret | Yes |
| `TTS_VOICE_ZH` | Chinese TTS voice | Optional |
| `TTS_VOICE_JA` | Japanese TTS voice | Optional |

### Frontend

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Optional |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | Optional |

## Local Development

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker (optional)

### Frontend

```bash
cd web
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env  # Edit with your config
uvicorn main:app --reload --port 8000
```

### Docker (Full Stack)

```bash
# Build frontend first
cd web && npm run build && cd ..

# Run with Docker Compose
docker-compose up
```

## Deployment to Hugging Face Spaces

### 🔄 自动部署 (当前配置)

本项目已配置 GitHub → Hugging Face 自动同步：

1. **推送到 GitHub** → 自动触发同步
2. **Hugging Face 构建** → Docker 镜像构建 (约 2-3 分钟)
3. **部署完成** → 访问 [jackywangsh-studyforge.hf.space](https://jackywangsh-studyforge.hf.space)

### 📦 手动部署

1. Create a new Space with Docker SDK
2. Push this repository to the Space
3. Set environment variables in Space settings
4. The app will be available at `https://huggingface.co/spaces/<username>/<space-name>`

### 🌐 部署架构

```
GitHub Repository
       │
       ▼ (自动同步)
Hugging Face Spaces
       │
       ▼ (Docker Build)
Static Frontend (Nginx)
       │
       ▼
用户访问 jackywangsh-studyforge.hf.space
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
      {"id": 1, "name": "Domain 1", "weight": 30}
    ],
    "tags": ["tag1", "tag2"]
  },
  "questions": [
    {
      "id": "q1",
      "setNumber": 1,
      "domain": 1,
      "question": "Question text?",
      "options": {"A": "Option A", "B": "Option B"},
      "answer": "A",
      "answerType": "single",
      "explanation": "Explanation text"
    }
  ]
}
```

## License

MIT License

---

Made with love for exam takers everywhere
