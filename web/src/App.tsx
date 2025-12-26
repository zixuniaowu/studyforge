import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import AILearningPage from './pages/AILearningPage';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz/:examId" element={<QuizPage />} />
          <Route path="/ai-intro" element={<AILearningPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
