/**
 * 中学英语完整课程体系
 */

import { Globe2 } from 'lucide-react';
import type { SubjectCurriculum } from './middleSchoolCurriculum';

export const englishCurriculum: SubjectCurriculum = {
  id: 'english',
  name: '英語',
  nameJa: '英語',
  icon: Globe2,
  color: 'green',
  gradient: 'from-green-500 to-emerald-600',
  grades: [
    {
      gradeId: '1',
      gradeName: '中学1年',
      gradeNameJa: '中学1年',
      terms: [
        {
          id: 'term1',
          name: '1学期',
          nameJa: '1学期',
          period: '4月-7月',
          units: [
            {
              id: 'alphabet-phonics',
              name: 'アルファベットと発音',
              description: '英語学習の基礎',
              lessons: [
                { id: 'ap-01', name: 'アルファベット大文字', description: 'A-Zの書き方と発音', duration: 30, questionCount: 10, difficulty: 'basic' },
                { id: 'ap-02', name: 'アルファベット小文字', description: 'a-zの書き方と発音', duration: 30, questionCount: 10, difficulty: 'basic' },
                { id: 'ap-03', name: 'フォニックス基礎', description: '文字と音の関係', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'ap-04', name: '基本的な単語', description: '身近な英単語', duration: 40, questionCount: 15, difficulty: 'basic' },
              ]
            },
            {
              id: 'be-verb',
              name: 'be動詞',
              description: 'am, is, are の使い方',
              lessons: [
                { id: 'bv-01', name: 'I am ~', description: '自己紹介の文', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'bv-02', name: 'You are ~', description: '相手について話す', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'bv-03', name: 'He/She is ~', description: '第三者について話す', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'bv-04', name: 'This/That is ~', description: '物について話す', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'bv-05', name: 'be動詞の否定文', description: '~ではありません', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'bv-06', name: 'be動詞の疑問文', description: '~ですか？', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'bv-07', name: 'be動詞 まとめ問題', description: '総合演習', duration: 50, questionCount: 20, difficulty: 'standard' },
              ]
            },
            {
              id: 'general-verb',
              name: '一般動詞',
              description: '動作を表す動詞',
              lessons: [
                { id: 'gv-01', name: '一般動詞とは', description: 'play, like, have など', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'gv-02', name: 'I/You + 一般動詞', description: '主語が I, You の文', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'gv-03', name: '一般動詞の否定文', description: 'do not (don\'t)', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'gv-04', name: '一般動詞の疑問文', description: 'Do you ~?', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'gv-05', name: '三人称単数①', description: 'He/She + 動詞s', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'gv-06', name: '三人称単数②', description: '否定文と疑問文', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'gv-07', name: '三人称単数のまとめ', description: '総合演習', duration: 55, questionCount: 20, difficulty: 'advanced' },
              ]
            },
            {
              id: 'noun-article',
              name: '名詞と冠詞',
              description: '名詞の単数・複数と a, an, the',
              lessons: [
                { id: 'na-01', name: '名詞の種類', description: '数えられる・数えられない', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'na-02', name: '複数形の作り方', description: '-s, -es, 不規則変化', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'na-03', name: 'a と an', description: '不定冠詞の使い分け', duration: 35, questionCount: 12, difficulty: 'standard' },
                { id: 'na-04', name: 'the の使い方', description: '定冠詞', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'na-05', name: '冠詞のまとめ', description: '総合演習', duration: 45, questionCount: 15, difficulty: 'advanced' },
              ]
            }
          ]
        },
        {
          id: 'summer',
          name: '夏期講習',
          nameJa: '夏期講習',
          period: '7月-8月',
          units: [
            {
              id: 'summer-review-e1',
              name: '1学期総復習',
              description: 'be動詞・一般動詞の総復習',
              lessons: [
                { id: 'sre1-01', name: 'be動詞 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'sre1-02', name: '一般動詞 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'sre1-03', name: '1学期 実力テスト', description: '総合テスト', duration: 60, questionCount: 30, difficulty: 'advanced' },
              ]
            }
          ]
        },
        {
          id: 'term2',
          name: '2学期',
          nameJa: '2学期',
          period: '9月-12月',
          units: [
            {
              id: 'pronoun',
              name: '代名詞',
              description: 'I, you, he, she, it, we, they',
              lessons: [
                { id: 'pn-01', name: '人称代名詞（主格）', description: 'I, you, he, she など', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'pn-02', name: '人称代名詞（所有格）', description: 'my, your, his, her など', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'pn-03', name: '人称代名詞（目的格）', description: 'me, you, him, her など', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pn-04', name: '所有代名詞', description: 'mine, yours, his, hers', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pn-05', name: '指示代名詞', description: 'this, that, these, those', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'pn-06', name: '代名詞 まとめ', description: '総合演習', duration: 50, questionCount: 20, difficulty: 'advanced' },
              ]
            },
            {
              id: 'question-word',
              name: '疑問詞',
              description: 'What, Who, When, Where, Why, How',
              lessons: [
                { id: 'qw-01', name: 'What', description: '何？', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'qw-02', name: 'Who', description: '誰？', duration: 35, questionCount: 12, difficulty: 'standard' },
                { id: 'qw-03', name: 'When', description: 'いつ？', duration: 35, questionCount: 12, difficulty: 'standard' },
                { id: 'qw-04', name: 'Where', description: 'どこ？', duration: 35, questionCount: 12, difficulty: 'standard' },
                { id: 'qw-05', name: 'Why', description: 'なぜ？', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'qw-06', name: 'How①', description: 'どのように？', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'qw-07', name: 'How②', description: 'How many, How much', duration: 45, questionCount: 15, difficulty: 'advanced' },
                { id: 'qw-08', name: 'Which', description: 'どちら？', duration: 40, questionCount: 12, difficulty: 'advanced' },
                { id: 'qw-09', name: '疑問詞 まとめ', description: '総合演習', duration: 50, questionCount: 20, difficulty: 'advanced' },
              ]
            },
            {
              id: 'imperative-exclamatory',
              name: '命令文と感嘆文',
              description: '命令・依頼・感嘆の表現',
              lessons: [
                { id: 'ie-01', name: '命令文の基本', description: '～しなさい', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'ie-02', name: '否定命令文', description: '～するな', duration: 35, questionCount: 12, difficulty: 'standard' },
                { id: 'ie-03', name: 'Let\'s ~', description: '～しましょう', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'ie-04', name: '感嘆文', description: 'What, How で始まる文', duration: 45, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'present-progressive',
              name: '現在進行形',
              description: '今～しています',
              lessons: [
                { id: 'pp-01', name: '現在進行形とは', description: 'be動詞 + ~ing', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'pp-02', name: '-ing の作り方', description: '語尾の変化', duration: 35, questionCount: 12, difficulty: 'standard' },
                { id: 'pp-03', name: '現在進行形の否定文', description: 'is not ~ing', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'pp-04', name: '現在進行形の疑問文', description: 'Is ~ -ing?', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'pp-05', name: '現在形との違い', description: '使い分け', duration: 45, questionCount: 15, difficulty: 'advanced' },
                { id: 'pp-06', name: '現在進行形 まとめ', description: '総合演習', duration: 50, questionCount: 20, difficulty: 'advanced' },
              ]
            }
          ]
        },
        {
          id: 'winter',
          name: '冬期講習',
          nameJa: '冬期講習',
          period: '12月-1月',
          units: [
            {
              id: 'winter-review-e1',
              name: '2学期総復習',
              description: '代名詞・疑問詞・進行形の復習',
              lessons: [
                { id: 'wre1-01', name: '代名詞・疑問詞 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'wre1-02', name: '現在進行形 総復習', description: '総合演習', duration: 45, questionCount: 20, difficulty: 'standard' },
                { id: 'wre1-03', name: '2学期 実力テスト', description: '総合テスト', duration: 60, questionCount: 30, difficulty: 'advanced' },
              ]
            }
          ]
        },
        {
          id: 'term3',
          name: '3学期',
          nameJa: '3学期',
          period: '1月-3月',
          units: [
            {
              id: 'past-tense',
              name: '過去形',
              description: '過去の表現',
              lessons: [
                { id: 'pt-01', name: 'be動詞の過去形', description: 'was, were', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'pt-02', name: '一般動詞の過去形①', description: '規則動詞', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pt-03', name: '一般動詞の過去形②', description: '不規則動詞', duration: 50, questionCount: 20, difficulty: 'standard' },
                { id: 'pt-04', name: '過去形の否定文', description: 'did not (didn\'t)', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pt-05', name: '過去形の疑問文', description: 'Did you ~?', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pt-06', name: '過去を表す語句', description: 'yesterday, last ~ など', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'pt-07', name: '過去形 まとめ', description: '総合演習', duration: 55, questionCount: 25, difficulty: 'advanced' },
              ]
            },
            {
              id: 'can',
              name: '助動詞 can',
              description: '～できる',
              lessons: [
                { id: 'cn-01', name: 'can の肯定文', description: '～できます', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'cn-02', name: 'can の否定文', description: '～できません', duration: 35, questionCount: 12, difficulty: 'standard' },
                { id: 'cn-03', name: 'can の疑問文', description: '～できますか？', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'cn-04', name: 'Can I ~? / Can you ~?', description: '許可と依頼', duration: 45, questionCount: 15, difficulty: 'advanced' },
                { id: 'cn-05', name: 'can まとめ', description: '総合演習', duration: 45, questionCount: 20, difficulty: 'advanced' },
              ]
            }
          ]
        },
        {
          id: 'spring',
          name: '春期講習',
          nameJa: '春期講習',
          period: '3月-4月',
          units: [
            {
              id: 'year-review-e1',
              name: '中1英語総復習',
              description: '1年間の総復習',
              lessons: [
                { id: 'yre1-01', name: 'be動詞・一般動詞 総復習', description: '総合演習', duration: 60, questionCount: 30, difficulty: 'standard' },
                { id: 'yre1-02', name: '代名詞・疑問詞 総復習', description: '総合演習', duration: 50, questionCount: 25, difficulty: 'standard' },
                { id: 'yre1-03', name: '時制 総復習', description: '現在・過去・進行形', duration: 60, questionCount: 30, difficulty: 'standard' },
                { id: 'yre1-04', name: '中1 学年末テスト', description: '総合テスト', duration: 60, questionCount: 40, difficulty: 'advanced' },
              ]
            }
          ]
        }
      ]
    },
    {
      gradeId: '2',
      gradeName: '中学2年',
      gradeNameJa: '中学2年',
      terms: [
        {
          id: 'term1',
          name: '1学期',
          nameJa: '1学期',
          period: '4月-7月',
          units: [
            {
              id: 'past-progressive',
              name: '過去進行形',
              description: '～していました',
              lessons: [
                { id: 'ppg-01', name: '過去進行形とは', description: 'was/were + ~ing', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'ppg-02', name: '過去進行形の否定・疑問', description: '否定文と疑問文', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ppg-03', name: '過去形との違い', description: '使い分け', duration: 45, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'future',
              name: '未来形',
              description: '～するつもりです',
              lessons: [
                { id: 'ft-01', name: 'will の肯定文', description: 'will + 動詞の原形', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'ft-02', name: 'will の否定文・疑問文', description: 'won\'t, Will you ~?', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ft-03', name: 'be going to①', description: '予定を表す', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ft-04', name: 'be going to②', description: '否定・疑問', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ft-05', name: 'will と be going to', description: '使い分け', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'ft-06', name: '未来形 まとめ', description: '総合演習', duration: 50, questionCount: 20, difficulty: 'advanced' },
              ]
            },
            {
              id: 'modal-verb',
              name: '助動詞',
              description: 'must, may, should など',
              lessons: [
                { id: 'mv-01', name: 'must', description: '～しなければならない', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'mv-02', name: 'have to', description: 'must との違い', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'mv-03', name: 'may', description: '～してもよい、～かもしれない', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'mv-04', name: 'should', description: '～すべきだ', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'mv-05', name: 'Shall I ~? / Shall we ~?', description: '申し出・提案', duration: 45, questionCount: 15, difficulty: 'advanced' },
                { id: 'mv-06', name: 'Would you ~? / Could you ~?', description: '丁寧な依頼', duration: 45, questionCount: 15, difficulty: 'advanced' },
                { id: 'mv-07', name: '助動詞 まとめ', description: '総合演習', duration: 55, questionCount: 25, difficulty: 'advanced' },
              ]
            }
          ]
        },
        {
          id: 'summer',
          name: '夏期講習',
          nameJa: '夏期講習',
          period: '7月-8月',
          units: [
            {
              id: 'summer-review-e2',
              name: '1学期総復習',
              description: '未来形・助動詞の総復習',
              lessons: [
                { id: 'sre2-01', name: '未来形 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'sre2-02', name: '助動詞 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'sre2-03', name: '1学期 実力テスト', description: '総合テスト', duration: 60, questionCount: 30, difficulty: 'advanced' },
              ]
            }
          ]
        },
        {
          id: 'term2',
          name: '2学期',
          nameJa: '2学期',
          period: '9月-12月',
          units: [
            {
              id: 'infinitive',
              name: '不定詞',
              description: 'to + 動詞の原形',
              lessons: [
                { id: 'if-01', name: '不定詞とは', description: 'to + 動詞の原形', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'if-02', name: '名詞的用法', description: '～すること', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'if-03', name: '形容詞的用法', description: '～するための', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'if-04', name: '副詞的用法①', description: '目的「～するために」', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'if-05', name: '副詞的用法②', description: '原因「～して」', duration: 45, questionCount: 15, difficulty: 'advanced' },
                { id: 'if-06', name: 'It ~ to ...', description: '形式主語', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'if-07', name: 'want + 人 + to ~', description: '目的語を含む不定詞', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'if-08', name: '不定詞 まとめ', description: '総合演習', duration: 55, questionCount: 25, difficulty: 'advanced' },
              ]
            },
            {
              id: 'gerund',
              name: '動名詞',
              description: '動詞 + ing（名詞として）',
              lessons: [
                { id: 'gd-01', name: '動名詞とは', description: '動詞 + ing', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'gd-02', name: '動名詞を目的語にとる動詞', description: 'enjoy, finish など', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'gd-03', name: '不定詞と動名詞', description: '使い分けと違い', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'gd-04', name: '動名詞 まとめ', description: '総合演習', duration: 50, questionCount: 20, difficulty: 'advanced' },
              ]
            },
            {
              id: 'comparison',
              name: '比較',
              description: 'より～、最も～',
              lessons: [
                { id: 'cp-01', name: '比較級の作り方', description: '-er, more ~', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'cp-02', name: '比較級の文', description: '~ than ...', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'cp-03', name: '最上級の作り方', description: '-est, most ~', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'cp-04', name: '最上級の文', description: 'the ~ in/of ...', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'cp-05', name: '同等比較', description: 'as ~ as ...', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'cp-06', name: '不規則変化', description: 'good-better-best など', duration: 45, questionCount: 15, difficulty: 'advanced' },
                { id: 'cp-07', name: '比較の慣用表現', description: 'like ~ better など', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'cp-08', name: '比較 まとめ', description: '総合演習', duration: 55, questionCount: 25, difficulty: 'advanced' },
              ]
            }
          ]
        },
        {
          id: 'winter',
          name: '冬期講習',
          nameJa: '冬期講習',
          period: '12月-1月',
          units: [
            {
              id: 'winter-review-e2',
              name: '2学期総復習',
              description: '不定詞・動名詞・比較の復習',
              lessons: [
                { id: 'wre2-01', name: '不定詞・動名詞 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'wre2-02', name: '比較 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'wre2-03', name: '2学期 実力テスト', description: '総合テスト', duration: 60, questionCount: 30, difficulty: 'advanced' },
              ]
            }
          ]
        },
        {
          id: 'term3',
          name: '3学期',
          nameJa: '3学期',
          period: '1月-3月',
          units: [
            {
              id: 'passive',
              name: '受動態',
              description: '～される',
              lessons: [
                { id: 'pv-01', name: '受動態とは', description: 'be動詞 + 過去分詞', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'pv-02', name: '受動態の否定・疑問', description: '否定文と疑問文', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pv-03', name: 'by + 行為者', description: '～によって', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'pv-04', name: '能動態から受動態へ', description: '書き換え', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'pv-05', name: '助動詞を含む受動態', description: 'can be + 過去分詞', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'pv-06', name: '受動態 まとめ', description: '総合演習', duration: 55, questionCount: 25, difficulty: 'advanced' },
              ]
            },
            {
              id: 'conjunction',
              name: '接続詞',
              description: 'when, if, that, because など',
              lessons: [
                { id: 'cj-01', name: 'when', description: '～するとき', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'cj-02', name: 'if', description: 'もし～ならば', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'cj-03', name: 'because', description: '～なので', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'cj-04', name: 'that（名詞節）', description: 'I think that ~', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'cj-05', name: 'though, although', description: '～だけれども', duration: 45, questionCount: 15, difficulty: 'advanced' },
                { id: 'cj-06', name: '接続詞 まとめ', description: '総合演習', duration: 50, questionCount: 20, difficulty: 'advanced' },
              ]
            }
          ]
        },
        {
          id: 'spring',
          name: '春期講習',
          nameJa: '春期講習',
          period: '3月-4月',
          units: [
            {
              id: 'year-review-e2',
              name: '中2英語総復習',
              description: '2年間の総復習',
              lessons: [
                { id: 'yre2-01', name: '時制 総復習', description: '過去・未来・進行形', duration: 60, questionCount: 30, difficulty: 'standard' },
                { id: 'yre2-02', name: '助動詞 総復習', description: '総合演習', duration: 50, questionCount: 25, difficulty: 'standard' },
                { id: 'yre2-03', name: '不定詞・動名詞・比較 総復習', description: '総合演習', duration: 60, questionCount: 30, difficulty: 'standard' },
                { id: 'yre2-04', name: '受動態・接続詞 総復習', description: '総合演習', duration: 50, questionCount: 25, difficulty: 'standard' },
                { id: 'yre2-05', name: '中2 学年末テスト', description: '総合テスト', duration: 60, questionCount: 40, difficulty: 'advanced' },
              ]
            }
          ]
        }
      ]
    },
    {
      gradeId: '3',
      gradeName: '中学3年',
      gradeNameJa: '中学3年',
      terms: [
        {
          id: 'term1',
          name: '1学期',
          nameJa: '1学期',
          period: '4月-7月',
          units: [
            {
              id: 'present-perfect',
              name: '現在完了形',
              description: 'have + 過去分詞',
              lessons: [
                { id: 'pf-01', name: '現在完了形とは', description: 'have/has + 過去分詞', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'pf-02', name: '継続用法①', description: 'ずっと～している', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pf-03', name: '継続用法②', description: 'for, since', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pf-04', name: '経験用法①', description: '～したことがある', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pf-05', name: '経験用法②', description: 'ever, never, before', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pf-06', name: '完了用法①', description: 'ちょうど～したところ', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pf-07', name: '完了用法②', description: 'just, already, yet', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pf-08', name: '現在完了の否定・疑問', description: '否定文と疑問文', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'pf-09', name: '過去形との違い', description: '使い分け', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'pf-10', name: '現在完了形 まとめ', description: '総合演習', duration: 60, questionCount: 30, difficulty: 'advanced' },
              ]
            },
            {
              id: 'present-perfect-progressive',
              name: '現在完了進行形',
              description: 'have been + ~ing',
              lessons: [
                { id: 'pfp-01', name: '現在完了進行形とは', description: 'have been + ~ing', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pfp-02', name: '現在完了形との違い', description: '使い分け', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'pfp-03', name: '現在完了進行形 まとめ', description: '総合演習', duration: 50, questionCount: 20, difficulty: 'advanced' },
              ]
            }
          ]
        },
        {
          id: 'summer',
          name: '夏期講習',
          nameJa: '夏期講習',
          period: '7月-8月',
          units: [
            {
              id: 'summer-review-e3',
              name: '1学期総復習',
              description: '現在完了の総復習',
              lessons: [
                { id: 'sre3-01', name: '現在完了形 総復習', description: '総合演習', duration: 60, questionCount: 30, difficulty: 'standard' },
                { id: 'sre3-02', name: '1学期 実力テスト', description: '総合テスト', duration: 60, questionCount: 30, difficulty: 'advanced' },
              ]
            },
            {
              id: 'summer-intensive-e',
              name: '受験対策基礎',
              description: '中1・中2の総復習',
              lessons: [
                { id: 'sie-01', name: '文法の総復習①', description: '時制・助動詞', duration: 90, questionCount: 40, difficulty: 'standard' },
                { id: 'sie-02', name: '文法の総復習②', description: '不定詞・動名詞・比較', duration: 90, questionCount: 40, difficulty: 'standard' },
                { id: 'sie-03', name: '文法の総復習③', description: '受動態・接続詞', duration: 90, questionCount: 35, difficulty: 'standard' },
              ]
            }
          ]
        },
        {
          id: 'term2',
          name: '2学期',
          nameJa: '2学期',
          period: '9月-12月',
          units: [
            {
              id: 'relative-pronoun',
              name: '関係代名詞',
              description: 'who, which, that',
              lessons: [
                { id: 'rp-01', name: '関係代名詞とは', description: '修飾する働き', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'rp-02', name: 'who（主格）', description: '人を修飾', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'rp-03', name: 'which（主格）', description: '物を修飾', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'rp-04', name: 'that（主格）', description: '人・物両方', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'rp-05', name: 'who/whom（目的格）', description: '目的格の関係代名詞', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'rp-06', name: 'which/that（目的格）', description: '目的格の関係代名詞', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'rp-07', name: '関係代名詞の省略', description: '省略できる場合', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'rp-08', name: '関係代名詞 まとめ', description: '総合演習', duration: 60, questionCount: 30, difficulty: 'advanced' },
              ]
            },
            {
              id: 'participle',
              name: '分詞',
              description: '現在分詞・過去分詞の形容詞的用法',
              lessons: [
                { id: 'pc-01', name: '現在分詞の形容詞的用法', description: '～している', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pc-02', name: '過去分詞の形容詞的用法', description: '～された', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pc-03', name: '分詞の後置修飾', description: '名詞の後ろに置く', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'pc-04', name: '分詞 まとめ', description: '総合演習', duration: 50, questionCount: 20, difficulty: 'advanced' },
              ]
            },
            {
              id: 'indirect-question',
              name: '間接疑問文',
              description: '疑問文の埋め込み',
              lessons: [
                { id: 'iq-01', name: '間接疑問文とは', description: '疑問詞 + 主語 + 動詞', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'iq-02', name: 'what, who の間接疑問', description: '何を/誰を', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'iq-03', name: 'when, where, how の間接疑問', description: 'いつ/どこで/どうやって', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'iq-04', name: 'if/whether の間接疑問', description: '～かどうか', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'iq-05', name: '間接疑問文 まとめ', description: '総合演習', duration: 50, questionCount: 20, difficulty: 'advanced' },
              ]
            },
            {
              id: 'subjunctive',
              name: '仮定法',
              description: 'もし～ならば（仮定の話）',
              lessons: [
                { id: 'sb-01', name: '仮定法過去とは', description: 'If I were/had ~', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'sb-02', name: '仮定法過去の文', description: '～だったらなぁ', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'sb-03', name: 'I wish ~', description: '～ならいいのに', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'sb-04', name: '仮定法 まとめ', description: '総合演習', duration: 55, questionCount: 20, difficulty: 'advanced' },
              ]
            }
          ]
        },
        {
          id: 'winter',
          name: '冬期講習',
          nameJa: '冬期講習',
          period: '12月-1月',
          units: [
            {
              id: 'winter-intensive-e',
              name: '受験直前対策',
              description: '入試頻出問題演習',
              lessons: [
                { id: 'wie-01', name: '文法問題特訓', description: '入試レベル文法', duration: 60, questionCount: 30, difficulty: 'standard' },
                { id: 'wie-02', name: '長文読解特訓', description: '読解力強化', duration: 90, questionCount: 20, difficulty: 'advanced' },
                { id: 'wie-03', name: '英作文特訓', description: '作文力強化', duration: 60, questionCount: 15, difficulty: 'advanced' },
                { id: 'wie-04', name: 'リスニング特訓', description: '聴解力強化', duration: 60, questionCount: 20, difficulty: 'advanced' },
                { id: 'wie-05', name: '入試模擬テスト①', description: '実戦演習', duration: 60, questionCount: 30, difficulty: 'advanced' },
              ]
            }
          ]
        },
        {
          id: 'term3',
          name: '3学期',
          nameJa: '3学期',
          period: '1月-3月',
          units: [
            {
              id: 'reading-comprehension',
              name: '長文読解',
              description: '入試に向けた読解演習',
              lessons: [
                { id: 'rc-01', name: '説明文の読解', description: '論理的文章', duration: 60, questionCount: 15, difficulty: 'standard' },
                { id: 'rc-02', name: '物語文の読解', description: '文学的文章', duration: 60, questionCount: 15, difficulty: 'standard' },
                { id: 'rc-03', name: '会話文の読解', description: '対話文', duration: 50, questionCount: 12, difficulty: 'standard' },
                { id: 'rc-04', name: '資料読み取り', description: 'グラフ・表の読解', duration: 50, questionCount: 12, difficulty: 'advanced' },
              ]
            },
            {
              id: 'entrance-exam-e',
              name: '入試対策演習',
              description: '高校入試に向けた総合演習',
              lessons: [
                { id: 'eee-01', name: '入試模擬テスト②', description: '実戦演習', duration: 60, questionCount: 30, difficulty: 'advanced' },
                { id: 'eee-02', name: '入試模擬テスト③', description: '実戦演習', duration: 60, questionCount: 30, difficulty: 'advanced' },
                { id: 'eee-03', name: '入試模擬テスト④', description: '実戦演習', duration: 60, questionCount: 30, difficulty: 'advanced' },
                { id: 'eee-04', name: '入試模擬テスト⑤', description: '実戦演習', duration: 60, questionCount: 30, difficulty: 'advanced' },
                { id: 'eee-05', name: '弱点分野補強', description: '個別弱点対策', duration: 60, questionCount: 20, difficulty: 'advanced' },
              ]
            }
          ]
        }
      ]
    }
  ]
};
