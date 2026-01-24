/**
 * 中学私塾课程体系汇总
 */

import { mathCurriculum } from './middleSchoolCurriculum';
import { englishCurriculum } from './englishCurriculum';
import { japaneseCurriculum } from './japaneseCurriculum';
import { scienceCurriculum } from './scienceCurriculum';
import { socialCurriculum } from './socialCurriculum';
import type { SubjectCurriculum } from './middleSchoolCurriculum';

// 所有课程
export const allCurriculums: SubjectCurriculum[] = [
  mathCurriculum,
  englishCurriculum,
  japaneseCurriculum,
  scienceCurriculum,
  socialCurriculum,
];

// 统计函数
export interface CurriculumStats {
  totalSubjects: number;
  totalGrades: number;
  totalTerms: number;
  totalUnits: number;
  totalLessons: number;
  totalQuestions: number;
  totalHours: number;
  bySubject: {
    [key: string]: {
      name: string;
      lessons: number;
      questions: number;
      hours: number;
    };
  };
  byGrade: {
    [key: string]: {
      lessons: number;
      questions: number;
      hours: number;
    };
  };
}

export const calculateStats = (): CurriculumStats => {
  const stats: CurriculumStats = {
    totalSubjects: allCurriculums.length,
    totalGrades: 0,
    totalTerms: 0,
    totalUnits: 0,
    totalLessons: 0,
    totalQuestions: 0,
    totalHours: 0,
    bySubject: {},
    byGrade: {
      '1': { lessons: 0, questions: 0, hours: 0 },
      '2': { lessons: 0, questions: 0, hours: 0 },
      '3': { lessons: 0, questions: 0, hours: 0 },
    },
  };

  allCurriculums.forEach(subject => {
    let subjectLessons = 0;
    let subjectQuestions = 0;
    let subjectDuration = 0;

    subject.grades.forEach(grade => {
      stats.totalGrades++;
      grade.terms.forEach(term => {
        stats.totalTerms++;
        term.units.forEach(unit => {
          stats.totalUnits++;
          unit.lessons.forEach(lesson => {
            stats.totalLessons++;
            stats.totalQuestions += lesson.questionCount;
            stats.totalHours += lesson.duration;

            subjectLessons++;
            subjectQuestions += lesson.questionCount;
            subjectDuration += lesson.duration;

            stats.byGrade[grade.gradeId].lessons++;
            stats.byGrade[grade.gradeId].questions += lesson.questionCount;
            stats.byGrade[grade.gradeId].hours += lesson.duration;
          });
        });
      });
    });

    stats.bySubject[subject.id] = {
      name: subject.nameJa,
      lessons: subjectLessons,
      questions: subjectQuestions,
      hours: Math.round(subjectDuration / 60),
    };
  });

  // Convert minutes to hours
  stats.totalHours = Math.round(stats.totalHours / 60);
  stats.byGrade['1'].hours = Math.round(stats.byGrade['1'].hours / 60);
  stats.byGrade['2'].hours = Math.round(stats.byGrade['2'].hours / 60);
  stats.byGrade['3'].hours = Math.round(stats.byGrade['3'].hours / 60);

  return stats;
};

// 获取某个科目的课程
export const getSubjectCurriculum = (subjectId: string): SubjectCurriculum | undefined => {
  return allCurriculums.find(s => s.id === subjectId);
};

// 获取某个年级的某个科目的课程
export const getGradeCurriculum = (subjectId: string, gradeId: string) => {
  const subject = getSubjectCurriculum(subjectId);
  if (!subject) return undefined;
  return subject.grades.find(g => g.gradeId === gradeId);
};

// 获取某个学期的课程
export const getTermCurriculum = (subjectId: string, gradeId: string, termId: string) => {
  const grade = getGradeCurriculum(subjectId, gradeId);
  if (!grade) return undefined;
  return grade.terms.find(t => t.id === termId);
};

// 获取某个单元的课程
export const getUnitCurriculum = (subjectId: string, gradeId: string, termId: string, unitId: string) => {
  const term = getTermCurriculum(subjectId, gradeId, termId);
  if (!term) return undefined;
  return term.units.find(u => u.id === unitId);
};

// 导出类型
export type { SubjectCurriculum, GradeCurriculum, Term, Unit, Lesson } from './middleSchoolCurriculum';
