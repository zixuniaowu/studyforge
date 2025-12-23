import { Translations } from './types';

export const ja: Translations = {
  common: {
    loading: '読み込み中...',
    error: 'エラー',
    confirm: '確認',
    cancel: 'キャンセル',
    save: '保存',
    delete: '削除',
    back: '戻る',
    next: '次へ',
    previous: '前へ',
    submit: '提出',
    finish: '完了',
    retry: '再試行',
    or: 'または',
    dismiss: '閉じる',
  },

  header: {
    title: 'StudyForge',
    login: 'ログイン',
    logout: 'ログアウト',
    profile: 'プロフィール',
  },

  home: {
    title: '試験一覧',
    subtitle: '試験を選択して練習を始めましょう',
    noExams: '試験がありません',
    noExamsHint: '問題集をインポートして学習を始めましょう',
    importExam: 'インポート',
    loadingSample: 'サンプル問題を読み込み中...',
    deleteConfirm: 'この試験を削除しますか？関連する練習記録と間違いノートも削除されます。',
  },

  exam: {
    questions: '問',
    passingScore: '合格点',
    minutes: '分',
    practice: '練習',
    practiceDesc: '回答後すぐに解説を表示',
    examMode: '模擬試験',
    examDesc: '時間制限付き、最後に結果表示',
    delete: '削除',
  },

  quiz: {
    question: '問題',
    of: '/',
    practiceMode: '練習モード',
    examMode: '試験モード',
    submitConfirm: '提出してもよろしいですか？',
    unansweredWarning: '未回答の問題が {count} 問あります。提出してもよろしいですか？',
    leaveConfirm: '離れてもよろしいですか？現在の進捗は失われます。',
    finishPractice: '練習を終了',
    submitting: '提出中...',
    selectOne: '答えを1つ選んでください',
    selectMultiple: '正しい答えをすべて選んでください（複数選択）',
    correctAnswer: '正解',
    yourAnswer: 'あなたの回答',
    explanation: '解説',
  },

  result: {
    congratulations: 'おめでとうございます！',
    keepPracticing: '引き続き頑張りましょう！',
    passed: '試験に合格しました！',
    needScore: '合格には {score}% が必要です',
    score: 'スコア',
    correct: '正解',
    wrong: '不正解',
    time: '時間',
    backToExams: '試験一覧に戻る',
    tryAgain: 'もう一度',
    reviewWrong: '間違いを確認',
  },

  login: {
    welcome: 'StudyForge へようこそ',
    signInToTrack: 'ログインして学習進捗を記録しましょう',
    continueAsDemo: 'デモユーザーとして続ける',
    demoNote: 'デモモードですべての機能を体験できます。進捗はローカルに保存されます。',
    googleNotConfigured: 'Googleログインは未設定です',
    syncInfo: 'ログインすると、学習進捗がクラウドに自動同期されます',
    features: {
      exams: '複数の試験',
      progress: '進捗追跡',
      wrongBook: '間違いノート',
    },
  },

  nav: {
    questionList: '問題リスト',
    marked: 'マーク済み',
    answered: '回答済み',
    unanswered: '未回答',
  },

  import: {
    title: '問題集をインポート',
    dragDrop: 'ファイルをドラッグ＆ドロップ',
    orClick: 'またはクリックして選択',
    importing: 'インポート中...',
    success: 'インポート成功',
    failed: 'インポート失敗',
  },

  stats: {
    title: '学習統計',
    totalQuestions: '解答数',
    accuracy: '正答率',
    wrongToReview: '復習待ち',
    studyDays: '学習日数',
    noData: 'データなし',
    questionsUnit: '問',
    daysUnit: '日',
  },

  quickActions: {
    title: 'クイックアクション',
    reviewWrong: '間違い復習',
    reviewWrongDesc: '弱点を克服しましょう',
    continueStudy: '学習を続ける',
    continueStudyDesc: '前回の続きから',
    noWrongAnswers: '間違いなし、この調子で！',
  },

  video: {
    title: '解説動画を生成',
    description: '問題の解説動画を自動生成',
    includeExplanation: '解説を含める',
    generate: '生成開始',
    preparing: '準備中...',
    processing: '生成中...',
    completed: '動画生成完了',
    failed: '生成失敗',
    download: '動画をダウンロード',
  },
};
