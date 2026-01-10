import { create } from 'zustand';
import { ChatSession, ChatMessage } from '../types';
import { chatDB } from '../lib/db';
import { sendMessage, isConfigured } from '../lib/aiService';

interface ChatStore {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  messages: ChatMessage[];
  isLoading: boolean;
  isOpen: boolean;
  error: string | null;

  // Actions
  loadSessions: () => Promise<void>;
  createSession: (title?: string, pageContext?: string) => Promise<string>;
  deleteSession: (id: string) => Promise<void>;
  selectSession: (session: ChatSession | null) => void;

  loadMessages: (sessionId: string) => Promise<void>;
  sendUserMessage: (content: string) => Promise<void>;

  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  clearError: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  sessions: [],
  currentSession: null,
  messages: [],
  isLoading: false,
  isOpen: false,
  error: null,

  loadSessions: async () => {
    try {
      const sessions = await chatDB.getAllSessions();
      set({ sessions });
    } catch (error) {
      console.error('Failed to load sessions:', error);
    }
  },

  createSession: async (title, pageContext) => {
    const now = new Date().toISOString();
    const session: ChatSession = {
      id: `session-${Date.now()}`,
      title: title || (pageContext ? `Chat: ${pageContext}` : 'New Chat'),
      pageContext,
      createdAt: now,
      updatedAt: now
    };

    await chatDB.createSession(session);
    const sessions = await chatDB.getAllSessions();
    set({ sessions, currentSession: session, messages: [] });
    return session.id;
  },

  deleteSession: async (id) => {
    await chatDB.deleteSession(id);
    const sessions = await chatDB.getAllSessions();
    const currentSession = get().currentSession;
    if (currentSession?.id === id) {
      set({ sessions, currentSession: null, messages: [] });
    } else {
      set({ sessions });
    }
  },

  selectSession: (session) => {
    set({ currentSession: session, messages: [] });
    if (session) {
      get().loadMessages(session.id);
    }
  },

  loadMessages: async (sessionId) => {
    try {
      const messages = await chatDB.getMessages(sessionId);
      set({ messages });
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  },

  sendUserMessage: async (content) => {
    const { currentSession, messages } = get();

    // Check if AI is configured
    if (!isConfigured()) {
      set({ error: 'Please configure your API key in settings' });
      return;
    }

    // Create session if not exists
    let session = currentSession;
    if (!session) {
      await get().createSession();
      session = get().currentSession;
      if (!session) return;
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sessionId: session.id,
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };

    await chatDB.addMessage(userMessage);
    const updatedMessages = [...messages, userMessage];
    set({ messages: updatedMessages, isLoading: true, error: null });

    try {
      // Send to AI
      const aiMessages = updatedMessages.map(m => ({
        role: m.role as 'user' | 'assistant' | 'system',
        content: m.content
      }));

      const response = await sendMessage(aiMessages);

      if (response.error) {
        set({ error: response.error, isLoading: false });
        return;
      }

      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        sessionId: session.id,
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString()
      };

      await chatDB.addMessage(assistantMessage);

      // Update session title if first message
      if (messages.length === 0) {
        const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        await chatDB.updateSession(session.id, { title });
        const sessions = await chatDB.getAllSessions();
        set({ sessions });
      }

      const finalMessages = await chatDB.getMessages(session.id);
      set({ messages: finalMessages, isLoading: false });

    } catch (error) {
      console.error('Failed to send message:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to send message',
        isLoading: false
      });
    }
  },

  toggleChat: () => {
    set(state => ({ isOpen: !state.isOpen }));
  },

  openChat: () => {
    set({ isOpen: true });
  },

  closeChat: () => {
    set({ isOpen: false });
  },

  clearError: () => {
    set({ error: null });
  }
}));
