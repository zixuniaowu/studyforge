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

- **AWS AIF-C01** - AWS Certified AI Practitioner (3 sets × 50 questions each)

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **State Management**: Zustand
- **Local Storage**: IndexedDB (Dexie)
- **Backend**: FastAPI (Python)
- **Database**: Supabase (PostgreSQL)
- **Video**: edge-tts + MoviePy + Playwright
- **Deployment**: Hugging Face Spaces (Docker)

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

1. Create a new Space with Docker SDK
2. Push this repository to the Space
3. Set environment variables in Space settings
4. The app will be available at `https://huggingface.co/spaces/<username>/<space-name>`

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
