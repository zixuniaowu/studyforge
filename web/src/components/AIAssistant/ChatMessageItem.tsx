import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessage } from '../../types';

interface ChatMessageItemProps {
  message: ChatMessage;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const isUser = message.role === 'user';

  // Simple markdown-like formatting
  const formatContent = (text: string) => {
    return text
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-slate-800 text-slate-100 p-3 rounded-lg text-sm overflow-x-auto my-2"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-1.5 py-0.5 rounded text-sm text-slate-700">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-cyan-600' : 'bg-slate-700'
        }`}
      >
        {isUser ? (
          <User size={16} className="text-white" />
        ) : (
          <Bot size={16} className="text-white" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-cyan-600 text-white rounded-tr-sm'
            : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
        }`}
      >
        <div
          className="text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
        />
        <div
          className={`text-xs mt-2 ${
            isUser ? 'text-cyan-200' : 'text-slate-400'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageItem;
