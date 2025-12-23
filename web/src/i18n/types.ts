export type Language = 'zh' | 'ja';

export interface Translations {
  // Common
  common: {
    loading: string;
    error: string;
    confirm: string;
    cancel: string;
    save: string;
    delete: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    finish: string;
    retry: string;
    or: string;
    dismiss: string;
  };

  // Header
  header: {
    title: string;
    login: string;
    logout: string;
    profile: string;
  };

  // Home page
  home: {
    title: string;
    subtitle: string;
    noExams: string;
    noExamsHint: string;
    importExam: string;
    loadingSample: string;
    deleteConfirm: string;
  };

  // Exam card
  exam: {
    questions: string;
    passingScore: string;
    minutes: string;
    practice: string;
    practiceDesc: string;
    examMode: string;
    examDesc: string;
    delete: string;
  };

  // Quiz page
  quiz: {
    question: string;
    of: string;
    practiceMode: string;
    examMode: string;
    submitConfirm: string;
    unansweredWarning: string;
    leaveConfirm: string;
    finishPractice: string;
    submitting: string;
    selectOne: string;
    selectMultiple: string;
    correctAnswer: string;
    yourAnswer: string;
    explanation: string;
  };

  // Result page
  result: {
    congratulations: string;
    keepPracticing: string;
    passed: string;
    needScore: string;
    score: string;
    correct: string;
    wrong: string;
    time: string;
    backToExams: string;
    tryAgain: string;
    reviewWrong: string;
  };

  // Login page
  login: {
    welcome: string;
    signInToTrack: string;
    continueAsDemo: string;
    demoNote: string;
    googleNotConfigured: string;
    syncInfo: string;
    features: {
      exams: string;
      progress: string;
      wrongBook: string;
    };
  };

  // Navigation
  nav: {
    questionList: string;
    marked: string;
    answered: string;
    unanswered: string;
  };

  // Import
  import: {
    title: string;
    dragDrop: string;
    orClick: string;
    importing: string;
    success: string;
    failed: string;
  };

  // Stats
  stats: {
    title: string;
    totalQuestions: string;
    accuracy: string;
    wrongToReview: string;
    studyDays: string;
    noData: string;
    questionsUnit: string;
    daysUnit: string;
  };

  // Quick actions
  quickActions: {
    title: string;
    reviewWrong: string;
    reviewWrongDesc: string;
    continueStudy: string;
    continueStudyDesc: string;
    noWrongAnswers: string;
  };

  // Video generation
  video: {
    title: string;
    description: string;
    includeExplanation: string;
    generate: string;
    preparing: string;
    processing: string;
    completed: string;
    failed: string;
    download: string;
  };
}
