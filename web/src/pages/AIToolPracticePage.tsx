import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Simple redirect component for AI tool practice
export const AIToolPracticePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Determine which tool based on pathname
    const pathname = location.pathname.toLowerCase();
    let provider = '';

    if (pathname.includes('n8n')) {
      provider = 'n8n';
    } else if (pathname.includes('dify')) {
      provider = 'Dify';
    }

    if (provider) {
      // Navigate to HomePage with the provider state
      navigate('/', { state: { provider }, replace: true });
    } else {
      // Unknown tool, go to home
      navigate('/', { replace: true });
    }
  }, [navigate, location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
};
