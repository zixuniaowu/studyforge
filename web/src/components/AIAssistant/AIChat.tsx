import React, { useEffect, useRef, useState } from 'react';
import {
  MessageSquare,
  X,
  Settings,
  Plus,
  Trash2,
  AlertCircle,
  ChevronLeft
} from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import { useChatStore } from '../../stores/chatStore';
import { ChatMessageItem } from './ChatMessageItem';
import { ChatInput } from './ChatInput';
import {
  isConfigured,
  getStoredProvider,
  storeProvider,
  getStoredApiKey,
  storeApiKey,
  AIProvider
} from '../../lib/aiService';

export const AIChat: React.FC = () => {
  const language = useLanguageStore(state => state.language);
  const {
    sessions,
    currentSession,
    messages,
    isLoading,
    isOpen,
    error,
    loadSessions,
    createSession,
    deleteSession,
    selectSession,
    sendUserMessage,
    toggleChat,
    clearError
  } = useChatStore();

  const [showSettings, setShowSettings] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [provider, setProvider] = useState<AIProvider>(getStoredProvider());
  const [apiKey, setApiKey] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  useEffect(() => {
    // Scroll to bottom when new message arrives
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Load stored API key when provider changes
    setApiKey(getStoredApiKey(provider) || '');
  }, [provider]);

  const handleSaveSettings = () => {
    storeProvider(provider);
    if (apiKey.trim()) {
      storeApiKey(provider, apiKey.trim());
    }
    setShowSettings(false);
  };

  const handleNewChat = async () => {
    await createSession();
    setShowSessions(false);
  };

  const handleDeleteSession = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteSession(id);
  };

  const configured = isConfigured(provider);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all z-50 ${
          isOpen
            ? 'bg-slate-700 hover:bg-slate-800'
            : 'bg-cyan-600 hover:bg-cyan-700 hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageSquare size={24} className="text-white" />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-slate-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-slate-200">
          {/* Header */}
          <div className="bg-slate-800 text-white p-4 flex items-center justify-between">
            {showSessions ? (
              <>
                <button
                  onClick={() => setShowSessions(false)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className="font-semibold">
                  {language === 'ja' ? '会話履歴' : '对话历史'}
                </h3>
                <button
                  onClick={handleNewChat}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <Plus size={20} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowSessions(true)}
                  className="flex items-center gap-2"
                >
                  <MessageSquare size={18} />
                  <span className="font-semibold truncate max-w-[200px]">
                    {currentSession?.title ||
                      (language === 'ja' ? 'AI アシスタント' : 'AI 助手')}
                  </span>
                </button>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleNewChat}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title={language === 'ja' ? '新規チャット' : '新对话'}
                  >
                    <Plus size={18} />
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title={language === 'ja' ? '設定' : '设置'}
                  >
                    <Settings size={18} />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Content area */}
          {showSettings ? (
            // Settings panel
            <div className="flex-1 p-4 overflow-y-auto">
              <h4 className="font-semibold text-slate-800 mb-4">
                {language === 'ja' ? 'AI 設定' : 'AI 设置'}
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {language === 'ja' ? 'プロバイダー' : '服务提供商'}
                  </label>
                  <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value as AIProvider)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="openai">OpenAI (GPT)</option>
                    <option value="claude">Claude (Anthropic)</option>
                    <option value="ollama">Ollama (Local)</option>
                  </select>
                </div>

                {provider !== 'ollama' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      API Key
                    </label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder={language === 'ja' ? 'APIキーを入力' : '输入 API Key'}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      {language === 'ja'
                        ? 'キーはローカルに保存されます'
                        : '密钥将保存在本地'}
                    </p>
                  </div>
                )}

                {provider === 'ollama' && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-700">
                      {language === 'ja'
                        ? 'Ollama が localhost:11434 で実行されていることを確認してください'
                        : '请确保 Ollama 正在 localhost:11434 运行'}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {language === 'ja' ? 'キャンセル' : '取消'}
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                >
                  {language === 'ja' ? '保存' : '保存'}
                </button>
              </div>
            </div>
          ) : showSessions ? (
            // Sessions list
            <div className="flex-1 overflow-y-auto p-4">
              {sessions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-400 text-sm">
                    {language === 'ja' ? '会話がありません' : '暂无对话'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {sessions.map(session => (
                    <div
                      key={session.id}
                      onClick={() => {
                        selectSession(session);
                        setShowSessions(false);
                      }}
                      className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                        currentSession?.id === session.id
                          ? 'bg-cyan-100 border border-cyan-300'
                          : 'hover:bg-slate-100 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-slate-700 truncate">
                          {session.title}
                        </p>
                        <button
                          onClick={(e) => handleDeleteSession(session.id, e)}
                          className="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded transition-all"
                        >
                          <Trash2 size={14} className="text-red-500" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(session.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Chat messages
            <>
              {/* Error banner */}
              {error && (
                <div className="px-4 py-2 bg-red-50 border-b border-red-100 flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-500" />
                  <p className="text-sm text-red-600 flex-1">{error}</p>
                  <button
                    onClick={clearError}
                    className="text-red-400 hover:text-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Not configured banner */}
              {!configured && (
                <div className="px-4 py-3 bg-amber-50 border-b border-amber-100">
                  <p className="text-sm text-amber-700">
                    {language === 'ja'
                      ? 'APIキーを設定してください'
                      : '请先配置 API Key'}
                  </p>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="text-sm text-cyan-600 hover:text-cyan-700 font-medium mt-1"
                  >
                    {language === 'ja' ? '設定を開く' : '打开设置'}
                  </button>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare size={40} className="mx-auto text-slate-300 mb-3" />
                    <p className="text-slate-500 text-sm">
                      {language === 'ja'
                        ? '何か質問してください'
                        : '有什么问题？尽管问我'}
                    </p>
                  </div>
                ) : (
                  messages.map(message => (
                    <ChatMessageItem key={message.id} message={message} />
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <ChatInput
                onSend={sendUserMessage}
                isLoading={isLoading}
                disabled={!configured}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AIChat;
