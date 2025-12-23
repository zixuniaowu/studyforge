import { Translations } from './types';

export const zh: Translations = {
  common: {
    loading: '加载中...',
    error: '错误',
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    back: '返回',
    next: '下一题',
    previous: '上一题',
    submit: '提交',
    finish: '完成',
    retry: '重试',
    or: '或',
    dismiss: '关闭',
  },

  header: {
    title: 'StudyForge',
    login: '登录',
    logout: '退出',
    profile: '个人中心',
  },

  home: {
    title: '我的考试',
    subtitle: '选择一个考试开始练习',
    noExams: '暂无考试',
    noExamsHint: '导入考试题库开始学习',
    importExam: '导入题库',
    loadingSample: '正在加载示例题库...',
    deleteConfirm: '确定要删除这个考试吗？相关的练习记录和错题本也会被删除。',
  },

  exam: {
    questions: '题',
    passingScore: '及格线',
    minutes: '分钟',
    practice: '练习',
    practiceDesc: '答题后立即查看解析',
    examMode: '模拟考试',
    examDesc: '计时测试，最后查看结果',
    delete: '删除',
  },

  quiz: {
    question: '第',
    of: '题，共',
    practiceMode: '练习模式',
    examMode: '考试模式',
    submitConfirm: '确定要提交吗？',
    unansweredWarning: '还有 {count} 道题未作答，确定要提交吗？',
    leaveConfirm: '确定要离开吗？当前进度将会丢失。',
    finishPractice: '完成练习',
    submitting: '提交中...',
    selectOne: '请选择一个答案',
    selectMultiple: '请选择所有正确答案（多选）',
    correctAnswer: '正确答案',
    yourAnswer: '你的答案',
    explanation: '解析',
  },

  result: {
    congratulations: '恭喜通过！',
    keepPracticing: '继续加油！',
    passed: '你通过了考试！',
    needScore: '需要 {score}% 才能通过',
    score: '得分',
    correct: '正确',
    wrong: '错误',
    time: '用时',
    backToExams: '返回考试列表',
    tryAgain: '再试一次',
    reviewWrong: '查看错题',
  },

  login: {
    welcome: '欢迎使用 StudyForge',
    signInToTrack: '登录以跟踪你的学习进度',
    continueAsDemo: '以演示用户继续',
    demoNote: '演示模式可以体验所有功能，进度保存在本地。',
    googleNotConfigured: 'Google 登录暂未配置',
    syncInfo: '登录后，你的学习进度将自动同步到云端',
    features: {
      exams: '多种考试',
      progress: '进度追踪',
      wrongBook: '错题本',
    },
  },

  nav: {
    questionList: '题目列表',
    marked: '已标记',
    answered: '已作答',
    unanswered: '未作答',
  },

  import: {
    title: '导入题库',
    dragDrop: '拖拽文件到此处',
    orClick: '或点击选择文件',
    importing: '导入中...',
    success: '导入成功',
    failed: '导入失败',
  },

  stats: {
    title: '学习统计',
    totalQuestions: '已答题数',
    accuracy: '正确率',
    wrongToReview: '待复习错题',
    studyDays: '学习天数',
    noData: '暂无数据',
    questionsUnit: '题',
    daysUnit: '天',
  },

  quickActions: {
    title: '快捷入口',
    reviewWrong: '复习错题',
    reviewWrongDesc: '巩固薄弱知识点',
    continueStudy: '继续学习',
    continueStudyDesc: '从上次中断处继续',
    noWrongAnswers: '暂无错题，继续加油！',
  },

  video: {
    title: '生成解析视频',
    description: '自动生成题目讲解视频',
    includeExplanation: '包含解析说明',
    generate: '开始生成',
    preparing: '准备中...',
    processing: '生成中...',
    completed: '视频生成完成',
    failed: '生成失败',
    download: '下载视频',
  },
};
