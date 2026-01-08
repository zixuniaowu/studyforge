import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import AIBookPage from './pages/AIBookPage';
import AIResourcesPage from './pages/AIResourcesPage';
import { CertificationPathPage } from './pages/CertificationPathPage';

function AppContent() {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith('/ai-book') || location.pathname.startsWith('/ai-resources');

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:examId" element={<QuizPage />} />
        <Route path="/ai-book/:bookId" element={<AIBookPage />} />
        <Route path="/ai-resources" element={<AIResourcesPage />} />
        <Route path="/certification-path" element={<CertificationPathPage />} />
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
