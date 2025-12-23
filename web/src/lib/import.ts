import { Exam, Question, ExamImportData } from '../types';
import { examDB } from './db';

export async function importExamFromJson(jsonData: ExamImportData): Promise<Exam> {
  const now = new Date().toISOString();

  const exam: Exam = {
    ...jsonData.exam,
    createdAt: now,
    updatedAt: now
  };

  // 确保每个问题有唯一的ID（包含examId前缀）
  const questions: Question[] = jsonData.questions.map((q, index) => ({
    ...q,
    id: `${exam.id}-${q.id || `q${index + 1}`}`,
    examId: exam.id
  }));

  await examDB.importExam(exam, questions);

  return exam;
}

export async function importExamFromFile(file: File): Promise<Exam> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as ExamImportData;
        const exam = await importExamFromJson(data);
        resolve(exam);
      } catch (error) {
        reject(new Error('Failed to parse exam file: ' + (error as Error).message));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export async function importExamFromUrl(url: string): Promise<Exam> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch exam data: ${response.statusText}`);
  }
  const data = await response.json() as ExamImportData;
  return importExamFromJson(data);
}
