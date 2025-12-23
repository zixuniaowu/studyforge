import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Menu } from 'lucide-react';
import { useT } from '../../stores/languageStore';
import { LanguageSwitcher } from './LanguageSwitcher';

interface Props {
  onMenuClick?: () => void;
}

export const Header: React.FC<Props> = ({ onMenuClick }) => {
  const t = useT();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              >
                <Menu size={26} />
              </button>
            )}
            <Link to="/" className="flex items-center gap-3">
              <BookOpen className="text-blue-600" size={32} />
              <span className="text-2xl font-bold text-gray-900">{t.header.title}</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};
