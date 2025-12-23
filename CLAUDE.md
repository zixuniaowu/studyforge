# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

StudyForge is an exam preparation platform with two independent modules:
1. **web/** - React quiz system deployed to Hugging Face Spaces (static)
2. **video-generator/** - Local Python tool for generating video explanations

## Commands

### Web Module (web/)

```bash
# Install dependencies
cd web && npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

### Video Generator (video-generator/)

```bash
# Setup
cd video-generator
pip install -r requirements.txt
playwright install chromium

# Generate videos for a question range
python src/batch_processor.py <exam-file.json> --start 1 --end 10

# Full options
python src/batch_processor.py <exam-file.json> --language zh-CN --style dark-tech
```

## Architecture

### Web Module

```
React 18 + Vite + TypeScript
├── State: Zustand (examStore, quizStore, userStore)
├── Storage: IndexedDB via Dexie.js
├── UI: Tailwind CSS + shadcn/ui
└── Auth: Google Identity Services
```

Key data flow:
- **Import**: JSON file → `examDB.importExam()` → IndexedDB (exams + questions tables)
- **Quiz**: `useQuizStore` manages current session state (mode, answers, timer)
- **Wrong answers**: Tracked in IndexedDB via `wrongDB`, keyed by examId + questionId

Quiz modes:
- **Practice**: Shows answer/explanation immediately after each question
- **Exam**: Timer-based, shows all results only after submission

### Video Generator

```
Python Pipeline
├── TTSEngine (edge-tts) → MP3 audio files
├── SlideRenderer (Playwright + Jinja2) → PNG images from HTML templates
└── VideoComposer (MoviePy) → Final MP4 videos
```

Video generation pipeline per question:
1. Render question slide + generate intro audio
2. Render options slide + generate options audio
3. Render answer slide (with correct answer highlighted) + generate answer audio
4. Render explanation slide + generate explanation audio
5. Compose all segments into final video

### Shared Data

Question bank JSON files in `data/exams/` are used by both modules. Schema:
```typescript
{
  id, examId, setNumber, domain,
  question, options: {A, B, C, D},
  answer: string | string[],
  answerType: "single" | "multiple",
  explanation
}
```

## Key Patterns

- **Exam providers**: AWS, Microsoft, Google, PMI, JLPT, Custom
- **Languages**: zh-CN, ja, en (affects TTS voice selection)
- **Video styles**: dark-tech, light-clean (theme configurations in config.py)
- **Question types**: Single choice (answer: "A") or multiple choice (answer: ["A", "C"])
