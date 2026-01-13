import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import AIBookPage from './pages/AIBookPage';
import AIResourcesPage from './pages/AIResourcesPage';
import { CertificationPathPage } from './pages/CertificationPathPage';
import ExamTipsPage from './pages/ExamTipsPage';
import AICodeExamplesPage from './pages/AICodeExamplesPage';
import AILearningRoadmapPage from './pages/AILearningRoadmapPage';
import InterviewQuestionsPage from './pages/InterviewQuestionsPage';
import CheatSheetsPage from './pages/CheatSheetsPage';
import GlossaryPage from './pages/GlossaryPage';
import NotesPage from './pages/NotesPage';
import FlashcardsPage from './pages/FlashcardsPage';
import KidsCoursePage from './pages/KidsCoursePage';
import KidsLessonPage from './pages/KidsLessonPage';

function AppContent() {
  const location = useLocation();
  const hideHeader = location.pathname === '/' ||
    location.pathname.startsWith('/ai-book') ||
    location.pathname.startsWith('/ai-resources') ||
    location.pathname.startsWith('/exam-tips') ||
    location.pathname.startsWith('/ai-code') ||
    location.pathname.startsWith('/ai-roadmap') ||
    location.pathname.startsWith('/interview') ||
    location.pathname.startsWith('/cheat') ||
    location.pathname.startsWith('/glossary') ||
    location.pathname.startsWith('/notes') ||
    location.pathname.startsWith('/flashcards') ||
    location.pathname.startsWith('/kids-course');

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:examId" element={<QuizPage />} />
        <Route path="/ai-book/:bookId" element={<AIBookPage />} />
        <Route path="/ai-resources" element={<AIResourcesPage />} />
        <Route path="/exam-tips" element={<ExamTipsPage />} />
        <Route path="/ai-code-examples" element={<AICodeExamplesPage />} />
        <Route path="/ai-roadmap" element={<AILearningRoadmapPage />} />
        <Route path="/interview-questions" element={<InterviewQuestionsPage />} />
        <Route path="/cheat-sheets" element={<CheatSheetsPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/certification-path" element={<CertificationPathPage />} />
        {/* Kids AI Course */}
        <Route path="/kids-course" element={<KidsCoursePage />} />
        <Route path="/kids-course/:lessonId" element={<KidsLessonPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
