/**
 * Sync Service
 * Handles synchronization between local IndexedDB and backend
 */

import { api, checkApiAvailable } from './api';
import { db } from './db';
import { QuizSession, WrongAnswer } from '../types';

interface SyncState {
  lastSync: string | null;
  isSyncing: boolean;
  error: string | null;
}

const SYNC_KEY = 'studyforge-last-sync';

class SyncService {
  private state: SyncState = {
    lastSync: localStorage.getItem(SYNC_KEY),
    isSyncing: false,
    error: null,
  };

  private listeners: Set<(state: SyncState) => void> = new Set();

  subscribe(listener: (state: SyncState) => void) {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  private setState(updates: Partial<SyncState>) {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  getState(): SyncState {
    return this.state;
  }

  /**
   * Sync all local data to backend
   */
  async syncToBackend(): Promise<void> {
    if (this.state.isSyncing) return;

    const token = api.getToken();
    if (!token) {
      return;
    }

    const isAvailable = await checkApiAvailable();
    if (!isAvailable) {
      this.setState({ error: 'API not available' });
      return;
    }

    this.setState({ isSyncing: true, error: null });

    try {
      // Get local sessions and wrong answers
      const sessions = await db.quizSessions.toArray();
      const wrongAnswers = await db.wrongAnswers.toArray();

      // Filter to only completed sessions
      const completedSessions = sessions.filter(s => s.completed);

      // Sync to backend
      const result = await api.syncProgress({
        sessions: completedSessions,
        wrongAnswers,
      });

      // Update last sync time
      const lastSync = result.lastSync || new Date().toISOString();
      localStorage.setItem(SYNC_KEY, lastSync);
      this.setState({ lastSync, isSyncing: false });

    } catch (error) {
      this.setState({
        isSyncing: false,
        error: error instanceof Error ? error.message : 'Sync failed'
      });
    }
  }

  /**
   * Sync data from backend to local
   */
  async syncFromBackend(): Promise<void> {
    if (this.state.isSyncing) return;

    const token = api.getToken();
    if (!token) {
      return;
    }

    const isAvailable = await checkApiAvailable();
    if (!isAvailable) {
      this.setState({ error: 'API not available' });
      return;
    }

    this.setState({ isSyncing: true, error: null });

    try {
      // Get data from backend
      const [sessions, wrongAnswers] = await Promise.all([
        api.getSessions(),
        api.getWrongAnswers(),
      ]);

      // Merge with local data (backend wins for conflicts)
      await this.mergeSessions(sessions);
      await this.mergeWrongAnswers(wrongAnswers);

      const lastSync = new Date().toISOString();
      localStorage.setItem(SYNC_KEY, lastSync);
      this.setState({ lastSync, isSyncing: false });

    } catch (error) {
      this.setState({
        isSyncing: false,
        error: error instanceof Error ? error.message : 'Sync failed'
      });
    }
  }

  private async mergeSessions(remoteSessions: QuizSession[]): Promise<void> {
    for (const remote of remoteSessions) {
      const local = await db.quizSessions.get(remote.id);
      if (!local) {
        // New session from backend
        await db.quizSessions.add(remote);
      } else if (remote.completed && !local.completed) {
        // Backend has completed version - update specific fields
        await db.quizSessions.update(remote.id, {
          answers: remote.answers,
          endTime: remote.endTime,
          score: remote.score,
          completed: remote.completed,
        });
      }
    }
  }

  private async mergeWrongAnswers(remoteWrongs: WrongAnswer[]): Promise<void> {
    for (const remote of remoteWrongs) {
      const local = await db.wrongAnswers
        .where({ examId: remote.examId, questionId: remote.questionId })
        .first();

      if (!local) {
        // New wrong answer from backend
        await db.wrongAnswers.add(remote);
      } else {
        // Merge: keep higher wrong count, use latest mastered status from backend
        await db.wrongAnswers.update(local.id, {
          wrongCount: Math.max(local.wrongCount, remote.wrongCount),
          mastered: remote.mastered,
          lastWrongAt: remote.lastWrongAt > local.lastWrongAt
            ? remote.lastWrongAt
            : local.lastWrongAt,
        });
      }
    }
  }

  /**
   * Full bidirectional sync
   */
  async fullSync(): Promise<void> {
    await this.syncToBackend();
    await this.syncFromBackend();
  }

  /**
   * Clear sync state on logout
   */
  clearSync() {
    localStorage.removeItem(SYNC_KEY);
    this.setState({ lastSync: null, error: null });
  }
}

export const syncService = new SyncService();
