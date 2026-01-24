import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Header } from './components/Layout/Header';
import { HomePage } from './pages/HomePage';
import { Loader2 } from 'lucide-react';

// Lazy load less frequently used pages to reduce initial bundle size
const QuizPage = lazy(() => import('./pages/QuizPage').then(m => ({ default: m.QuizPage })));
const WrongAnswersPage = lazy(() => import('./pages/WrongAnswersPage').then(m => ({ default: m.WrongAnswersPage })));
const AIBookPage = lazy(() => import('./pages/AIBookPage'));
const AIResourcesPage = lazy(() => import('./pages/AIResourcesPage'));
const CertificationPathPage = lazy(() => import('./pages/CertificationPathPage').then(m => ({ default: m.CertificationPathPage })));
const ExamTipsPage = lazy(() => import('./pages/ExamTipsPage'));
const AICodeExamplesPage = lazy(() => import('./pages/AICodeExamplesPage'));
const SAPLearningRoadmapPage = lazy(() => import('./pages/SAPLearningRoadmapPage'));
const SAPGlossaryPage = lazy(() => import('./pages/SAPGlossaryPage'));
const SAPLearningPage = lazy(() => import('./pages/SAPLearningPage'));
const InterviewQuestionsPage = lazy(() => import('./pages/InterviewQuestionsPage'));
const CheatSheetsPage = lazy(() => import('./pages/CheatSheetsPage'));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'));
const NotesPage = lazy(() => import('./pages/NotesPage'));
const FlashcardsPage = lazy(() => import('./pages/FlashcardsPage'));

// Heavy pages with large dependencies - lazy load
const KidsCoursePage = lazy(() => import('./pages/KidsCoursePage'));
const KidsLessonPage = lazy(() => import('./pages/KidsLessonPage'));
const KidsClassifyGamePage = lazy(() => import('./pages/KidsClassifyGamePage'));
const KidsAITrainerPage = lazy(() => import('./pages/KidsAITrainerPage'));
const KidsStoryPage = lazy(() => import('./pages/KidsStoryPage'));
const MiddleSchoolPage = lazy(() => import('./pages/MiddleSchoolPage'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-3" />
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const hideHeader = location.pathname === '/' ||
    location.pathname.startsWith('/ai-book') ||
    location.pathname.startsWith('/ai-resources') ||
    location.pathname.startsWith('/exam-tips') ||
    location.pathname.startsWith('/ai-code') ||
    location.pathname.startsWith('/sap-roadmap') ||
    location.pathname.startsWith('/sap-glossary') ||
    location.pathname.startsWith('/sap-learning') ||
    location.pathname.startsWith('/interview') ||
    location.pathname.startsWith('/cheat') ||
    location.pathname.startsWith('/glossary') ||
    location.pathname.startsWith('/notes') ||
    location.pathname.startsWith('/flashcards') ||
    location.pathname.startsWith('/kids-course') ||
    location.pathname.startsWith('/kids-classify') ||
    location.pathname.startsWith('/kids-ai-trainer') ||
    location.pathname.startsWith('/kids-story') ||
    location.pathname.startsWith('/middle-school') ||
    location.pathname.startsWith('/wrong-answers');

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideHeader && <Header />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz/:examId" element={<QuizPage />} />
          <Route path="/wrong-answers" element={<WrongAnswersPage />} />
          <Route path="/ai-book/:bookId" element={<AIBookPage />} />
          <Route path="/ai-resources" element={<AIResourcesPage />} />
          <Route path="/exam-tips" element={<ExamTipsPage />} />
          <Route path="/ai-code-examples" element={<AICodeExamplesPage />} />
          <Route path="/sap-roadmap" element={<SAPLearningRoadmapPage />} />
          <Route path="/sap-glossary" element={<SAPGlossaryPage />} />
          <Route path="/sap-learning" element={<SAPLearningPage />} />
          <Route path="/interview-questions" element={<InterviewQuestionsPage />} />
          <Route path="/cheat-sheets" element={<CheatSheetsPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/certification-path" element={<CertificationPathPage />} />
          {/* Kids AI Course */}
          <Route path="/kids-course" element={<KidsCoursePage />} />
          <Route path="/kids-course/:lessonId" element={<KidsLessonPage />} />
          <Route path="/kids-classify-game" element={<KidsClassifyGamePage />} />
          <Route path="/kids-classify-game/:levelId" element={<KidsClassifyGamePage />} />
          <Route path="/kids-ai-trainer" element={<KidsAITrainerPage />} />
          <Route path="/kids-story" element={<KidsStoryPage />} />
          {/* Middle School */}
          <Route path="/middle-school" element={<MiddleSchoolPage />} />
          <Route path="/middle-school/:subject/:gradeId" element={<MiddleSchoolPage />} />
        </Routes>
      </Suspense>
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
