import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  isLoading,
  disabled
}) => {
  const language = useLanguageStore(state => state.language);
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 bg-white">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={language === 'ja' ? '質問を入力...' : '输入问题...'}
            disabled={isLoading || disabled}
            className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-400"
            rows={1}
            style={{ minHeight: '48px', maxHeight: '150px' }}
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() || isLoading || disabled}
          className="flex-shrink-0 w-12 h-12 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 text-white rounded-xl flex items-center justify-center transition-colors"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>
      <p className="text-xs text-slate-400 mt-2 text-center">
        {language === 'ja' ? 'Shift + Enter で改行' : 'Shift + Enter 换行'}
      </p>
    </form>
  );
};

export default ChatInput;
