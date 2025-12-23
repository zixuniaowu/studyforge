import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { api } from '../lib/api';
import { syncService } from '../lib/sync';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User) => void;
  loginWithGoogle: (idToken: string) => Promise<void>;
  loginDemo: () => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),

      loginWithGoogle: async (idToken: string) => {
        set({ isLoading: true, error: null });
        try {
          const result = await api.googleAuth(idToken);
          set({ user: result.user, isLoading: false });

          // Trigger sync after login
          syncService.fullSync();
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed'
          });
          throw error;
        }
      },

      loginDemo: async () => {
        set({ isLoading: true, error: null });
        try {
          // Try API first
          const result = await api.demoLogin();
          set({ user: result.user, isLoading: false });
          syncService.fullSync();
        } catch {
          // Fallback to local demo user if API unavailable
          const demoUser = {
            id: 'demo-user-' + Date.now(),
            email: 'demo@studyforge.app',
            name: 'Demo User',
            avatar: undefined,
            provider: 'google' as const,
            createdAt: new Date().toISOString()
          };
          set({ user: demoUser, isLoading: false });
        }
      },

      logout: () => {
        api.logout();
        syncService.clearSync();
        set({ user: null, error: null });
      },

      checkAuth: async () => {
        const token = api.getToken();
        if (!token) {
          set({ user: null });
          return;
        }

        set({ isLoading: true });
        try {
          const user = await api.getMe();
          set({ user, isLoading: false });
        } catch {
          // Token invalid, clear it
          api.logout();
          set({ user: null, isLoading: false });
        }
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'studyforge-user',
      partialize: (state) => ({ user: state.user })
    }
  )
);
