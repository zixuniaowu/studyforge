/**
 * StudyForge API Client
 * Handles communication with the FastAPI backend
 */

import { User, QuizSession, WrongAnswer, Exam, Question } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

interface ApiError {
  detail: string;
}

class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('studyforge-token', token);
    } else {
      localStorage.removeItem('studyforge-token');
    }
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('studyforge-token');
    }
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Merge existing headers
    if (options.headers) {
      const existingHeaders = options.headers as Record<string, string>;
      Object.assign(headers, existingHeaders);
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        detail: 'An unknown error occurred',
      }));
      throw new Error(error.detail);
    }

    return response.json();
  }

  // Auth endpoints
  async googleAuth(idToken: string): Promise<{ access_token: string; user: User }> {
    const result = await this.request<{ access_token: string; user: User }>(
      '/auth/google',
      {
        method: 'POST',
        body: JSON.stringify({ id_token: idToken }),
      }
    );
    this.setToken(result.access_token);
    return result;
  }

  async demoLogin(): Promise<{ access_token: string; user: User }> {
    const result = await this.request<{ access_token: string; user: User }>(
      '/auth/demo'
    );
    this.setToken(result.access_token);
    return result;
  }

  async getMe(): Promise<User> {
    return this.request<User>('/auth/me');
  }

  logout() {
    this.setToken(null);
  }

  // Exam endpoints
  async getExams(): Promise<Exam[]> {
    return this.request<Exam[]>('/exams');
  }

  async getExam(id: string): Promise<Exam> {
    return this.request<Exam>(`/exams/${id}`);
  }

  async getExamQuestions(examId: string, setNumber?: number): Promise<Question[]> {
    const params = setNumber ? `?set_number=${setNumber}` : '';
    return this.request<Question[]>(`/exams/${examId}/questions${params}`);
  }

  // Progress sync endpoints
  async syncProgress(data: {
    sessions?: Partial<QuizSession>[];
    wrongAnswers?: Partial<WrongAnswer>[];
  }): Promise<{
    sessions: QuizSession[];
    wrongAnswers: WrongAnswer[];
    lastSync: string;
  }> {
    return this.request('/progress/sync', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSessions(examId?: string): Promise<QuizSession[]> {
    const params = examId ? `?exam_id=${examId}` : '';
    return this.request<QuizSession[]>(`/progress/sessions${params}`);
  }

  async getWrongAnswers(examId?: string, unmasteredOnly?: boolean): Promise<WrongAnswer[]> {
    const params = new URLSearchParams();
    if (examId) params.append('exam_id', examId);
    if (unmasteredOnly) params.append('unmastered_only', 'true');
    const queryString = params.toString();
    return this.request<WrongAnswer[]>(`/progress/wrong-answers${queryString ? '?' + queryString : ''}`);
  }

  async markMastered(wrongAnswerId: string): Promise<WrongAnswer> {
    return this.request<WrongAnswer>(`/progress/wrong-answers/${wrongAnswerId}/mastered`, {
      method: 'PUT',
    });
  }

  // Video generation endpoints
  async generateVideo(data: {
    questionId: string;
    examId: string;
    language?: string;
    includeExplanation?: boolean;
  }): Promise<{ jobId: string; status: string }> {
    return this.request('/video/generate', {
      method: 'POST',
      body: JSON.stringify({
        question_id: data.questionId,
        exam_id: data.examId,
        language: data.language || 'zh-CN',
        include_explanation: data.includeExplanation ?? true,
      }),
    });
  }

  async getVideoStatus(jobId: string): Promise<{
    jobId: string;
    status: string;
    progress?: number;
    videoUrl?: string;
    error?: string;
  }> {
    return this.request(`/video/status/${jobId}`);
  }

  // Health check
  async healthCheck(): Promise<{ status: string; version: string }> {
    return this.request('/health');
  }
}

export const api = new ApiClient();

// Hook for checking API availability
export async function checkApiAvailable(): Promise<boolean> {
  try {
    await api.healthCheck();
    return true;
  } catch {
    return false;
  }
}
