/**
 * 中学国語完整课程体系
 */

import { BookOpen } from 'lucide-react';
import type { SubjectCurriculum } from './middleSchoolCurriculum';

export const japaneseCurriculum: SubjectCurriculum = {
  id: 'japanese',
  name: '国語',
  nameJa: '国語',
  icon: BookOpen,
  color: 'orange',
  gradient: 'from-orange-500 to-amber-600',
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
              id: 'reading-explanation-1',
              name: '説明的文章の読解',
              description: '論理的な文章を読む力',
              lessons: [
                { id: 're1-01', name: '段落の役割', description: '序論・本論・結論', duration: 40, questionCount: 10, difficulty: 'basic' },
                { id: 're1-02', name: '要点のつかみ方', description: '中心文を見つける', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 're1-03', name: '指示語の理解', description: 'これ・それ・あれ', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 're1-04', name: '接続語の理解', description: 'しかし・だから・また', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 're1-05', name: '要約の仕方', description: '文章をまとめる', duration: 50, questionCount: 10, difficulty: 'advanced' },
              ]
            },
            {
              id: 'reading-literature-1',
              name: '文学的文章の読解',
              description: '物語・小説を読む力',
              lessons: [
                { id: 'rl1-01', name: '場面の把握', description: '時・場所・人物', duration: 40, questionCount: 10, difficulty: 'basic' },
                { id: 'rl1-02', name: '人物の心情①', description: '直接的な心情表現', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'rl1-03', name: '人物の心情②', description: '行動から読み取る', duration: 50, questionCount: 12, difficulty: 'standard' },
                { id: 'rl1-04', name: '情景描写', description: '風景と心情の関係', duration: 45, questionCount: 12, difficulty: 'advanced' },
                { id: 'rl1-05', name: '主題の読み取り', description: '作者の伝えたいこと', duration: 50, questionCount: 10, difficulty: 'advanced' },
              ]
            },
            {
              id: 'grammar-1-1',
              name: '文法①（品詞）',
              description: '言葉の種類を学ぶ',
              lessons: [
                { id: 'g1-01', name: '品詞とは', description: '10種類の品詞', duration: 35, questionCount: 10, difficulty: 'basic' },
                { id: 'g1-02', name: '名詞', description: '物事の名前', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'g1-03', name: '動詞', description: '動作・状態を表す', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'g1-04', name: '形容詞・形容動詞', description: '性質・状態を表す', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'g1-05', name: '副詞・連体詞', description: '修飾語', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'g1-06', name: '接続詞・感動詞', description: 'つなぐ言葉・気持ちの言葉', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'g1-07', name: '助詞', description: '関係を示す言葉', duration: 45, questionCount: 15, difficulty: 'advanced' },
                { id: 'g1-08', name: '助動詞', description: '意味を添える言葉', duration: 45, questionCount: 15, difficulty: 'advanced' },
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
              id: 'summer-j1',
              name: '1学期総復習',
              description: '読解と文法の復習',
              lessons: [
                { id: 'sj1-01', name: '説明的文章 総復習', description: '総合演習', duration: 60, questionCount: 15, difficulty: 'standard' },
                { id: 'sj1-02', name: '文学的文章 総復習', description: '総合演習', duration: 60, questionCount: 15, difficulty: 'standard' },
                { id: 'sj1-03', name: '品詞 総復習', description: '総合演習', duration: 50, questionCount: 20, difficulty: 'standard' },
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
              id: 'kanji-vocab-1',
              name: '漢字・語彙',
              description: '漢字の読み書きと語彙力',
              lessons: [
                { id: 'kv1-01', name: '漢字の成り立ち', description: '象形・指事・会意・形声', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'kv1-02', name: '音読みと訓読み', description: '読み方の種類', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'kv1-03', name: '熟語の構成', description: '漢字の組み合わせ', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'kv1-04', name: '同音異義語', description: '同じ音で意味が違う', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'kv1-05', name: '類義語・対義語', description: '似た意味・反対の意味', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'kv1-06', name: '慣用句・ことわざ', description: '言い回しを学ぶ', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'poetry-1',
              name: '詩の鑑賞',
              description: '詩を読み味わう',
              lessons: [
                { id: 'pt1-01', name: '詩の種類', description: '文語詩・口語詩', duration: 35, questionCount: 10, difficulty: 'basic' },
                { id: 'pt1-02', name: '詩の形式', description: '定型詩・自由詩・散文詩', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'pt1-03', name: '表現技法', description: '比喩・擬人法・反復', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pt1-04', name: '詩の鑑賞', description: '作品を味わう', duration: 50, questionCount: 12, difficulty: 'advanced' },
              ]
            },
            {
              id: 'classical-intro',
              name: '古文入門',
              description: '古典への第一歩',
              lessons: [
                { id: 'ci-01', name: '古文とは', description: '古文の特徴', duration: 35, questionCount: 10, difficulty: 'basic' },
                { id: 'ci-02', name: '歴史的仮名遣い', description: '読み方のルール', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'ci-03', name: '古文の単語①', description: '基本的な古語', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ci-04', name: '古文の単語②', description: '現代語との違い', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ci-05', name: '古文を読む', description: '短い古文の読解', duration: 50, questionCount: 12, difficulty: 'advanced' },
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
              id: 'winter-j1',
              name: '2学期総復習',
              description: '漢字・詩・古文の復習',
              lessons: [
                { id: 'wj1-01', name: '漢字・語彙 総復習', description: '総合演習', duration: 50, questionCount: 25, difficulty: 'standard' },
                { id: 'wj1-02', name: '古文 総復習', description: '総合演習', duration: 50, questionCount: 15, difficulty: 'standard' },
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
              id: 'writing-1',
              name: '作文',
              description: '文章を書く力',
              lessons: [
                { id: 'wr1-01', name: '文章の構成', description: '序論・本論・結論', duration: 40, questionCount: 8, difficulty: 'basic' },
                { id: 'wr1-02', name: '意見文の書き方', description: '自分の考えを述べる', duration: 50, questionCount: 8, difficulty: 'standard' },
                { id: 'wr1-03', name: '体験文の書き方', description: '経験を伝える', duration: 50, questionCount: 8, difficulty: 'standard' },
                { id: 'wr1-04', name: '推敲の仕方', description: '文章を見直す', duration: 45, questionCount: 10, difficulty: 'advanced' },
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
              id: 'year-j1',
              name: '中1国語総復習',
              description: '1年間の総復習',
              lessons: [
                { id: 'yj1-01', name: '読解 総復習', description: '説明文・文学', duration: 60, questionCount: 15, difficulty: 'standard' },
                { id: 'yj1-02', name: '文法 総復習', description: '品詞', duration: 50, questionCount: 20, difficulty: 'standard' },
                { id: 'yj1-03', name: '漢字・古文 総復習', description: '総合演習', duration: 50, questionCount: 20, difficulty: 'standard' },
                { id: 'yj1-04', name: '中1 学年末テスト', description: '総合テスト', duration: 60, questionCount: 30, difficulty: 'advanced' },
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
              id: 'reading-essay',
              name: '論説文の読解',
              description: '論理的思考力を養う',
              lessons: [
                { id: 'res-01', name: '論説文の構成', description: '主張と根拠', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'res-02', name: '具体と抽象', description: '具体例と一般化', duration: 50, questionCount: 12, difficulty: 'standard' },
                { id: 'res-03', name: '対比の構造', description: '比較して読む', duration: 50, questionCount: 12, difficulty: 'advanced' },
                { id: 'res-04', name: '筆者の主張を読み取る', description: '論点を捉える', duration: 55, questionCount: 12, difficulty: 'advanced' },
              ]
            },
            {
              id: 'reading-novel',
              name: '小説の読解',
              description: '人物の心情を深く読む',
              lessons: [
                { id: 'rn-01', name: '登場人物の関係', description: '人物相関図', duration: 45, questionCount: 10, difficulty: 'standard' },
                { id: 'rn-02', name: '心情の変化', description: '場面ごとの心理', duration: 50, questionCount: 12, difficulty: 'standard' },
                { id: 'rn-03', name: '象徴と比喩', description: '表現の意味', duration: 50, questionCount: 12, difficulty: 'advanced' },
                { id: 'rn-04', name: '視点と語り手', description: '誰の視点か', duration: 55, questionCount: 10, difficulty: 'advanced' },
              ]
            },
            {
              id: 'grammar-2',
              name: '文法②（用言）',
              description: '動詞・形容詞・形容動詞の活用',
              lessons: [
                { id: 'g2-01', name: '動詞の活用', description: '五段・上一段・下一段など', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'g2-02', name: '活用形の種類', description: '未然・連用・終止・連体・仮定・命令', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'g2-03', name: '形容詞の活用', description: '形容詞の活用形', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'g2-04', name: '形容動詞の活用', description: '形容動詞の活用形', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'g2-05', name: '用言のまとめ', description: '総合演習', duration: 55, questionCount: 20, difficulty: 'advanced' },
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
              id: 'summer-j2',
              name: '1学期総復習',
              description: '読解と文法の復習',
              lessons: [
                { id: 'sj2-01', name: '論説文・小説 総復習', description: '総合演習', duration: 60, questionCount: 15, difficulty: 'standard' },
                { id: 'sj2-02', name: '用言の活用 総復習', description: '総合演習', duration: 50, questionCount: 20, difficulty: 'standard' },
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
              id: 'kanji-vocab-2',
              name: '漢字・語彙②',
              description: '語彙力の向上',
              lessons: [
                { id: 'kv2-01', name: '四字熟語', description: '四字熟語の意味と使い方', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'kv2-02', name: '故事成語', description: '中国の故事に由来する言葉', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'kv2-03', name: '敬語の基礎', description: '尊敬語・謙譲語・丁寧語', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'kv2-04', name: '敬語の使い方', description: '場面に応じた敬語', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'classical-2',
              name: '古文②',
              description: '古文の読解力を高める',
              lessons: [
                { id: 'cl2-01', name: '古文の文法①', description: '助動詞の基礎', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'cl2-02', name: '古文の文法②', description: '助詞の働き', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'cl2-03', name: '古文の読解①', description: '説話を読む', duration: 50, questionCount: 12, difficulty: 'standard' },
                { id: 'cl2-04', name: '古文の読解②', description: '随筆を読む', duration: 50, questionCount: 12, difficulty: 'advanced' },
                { id: 'cl2-05', name: '古文の読解③', description: '物語を読む', duration: 55, questionCount: 12, difficulty: 'advanced' },
              ]
            },
            {
              id: 'classical-chinese-intro',
              name: '漢文入門',
              description: '漢文の基礎',
              lessons: [
                { id: 'cc-01', name: '漢文とは', description: '漢文の特徴', duration: 35, questionCount: 10, difficulty: 'basic' },
                { id: 'cc-02', name: '訓読のしかた', description: '返り点・送り仮名', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'cc-03', name: '書き下し文', description: '漢文を日本語に', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'cc-04', name: '漢文を読む', description: '短い漢文の読解', duration: 50, questionCount: 12, difficulty: 'advanced' },
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
              id: 'winter-j2',
              name: '2学期総復習',
              description: '古文・漢文の復習',
              lessons: [
                { id: 'wj2-01', name: '古文 総復習', description: '総合演習', duration: 55, questionCount: 15, difficulty: 'standard' },
                { id: 'wj2-02', name: '漢文 総復習', description: '総合演習', duration: 50, questionCount: 15, difficulty: 'standard' },
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
              id: 'essay-composition',
              name: '作文・小論文',
              description: '論理的な文章を書く',
              lessons: [
                { id: 'ec-01', name: '意見文の構成', description: '主張・理由・具体例・まとめ', duration: 50, questionCount: 8, difficulty: 'standard' },
                { id: 'ec-02', name: '資料を読んで書く', description: '資料の読み取りと意見', duration: 55, questionCount: 8, difficulty: 'advanced' },
                { id: 'ec-03', name: '小論文の基礎', description: '論理的に書く', duration: 55, questionCount: 8, difficulty: 'advanced' },
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
              id: 'year-j2',
              name: '中2国語総復習',
              description: '2年間の総復習',
              lessons: [
                { id: 'yj2-01', name: '現代文読解 総復習', description: '論説・小説', duration: 60, questionCount: 15, difficulty: 'standard' },
                { id: 'yj2-02', name: '文法 総復習', description: '品詞・用言', duration: 50, questionCount: 20, difficulty: 'standard' },
                { id: 'yj2-03', name: '古典 総復習', description: '古文・漢文', duration: 55, questionCount: 15, difficulty: 'standard' },
                { id: 'yj2-04', name: '中2 学年末テスト', description: '総合テスト', duration: 60, questionCount: 30, difficulty: 'advanced' },
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
              id: 'reading-critical',
              name: '評論文の読解',
              description: '批判的に読む力',
              lessons: [
                { id: 'rcr-01', name: '論証の構造', description: '根拠と結論', duration: 50, questionCount: 12, difficulty: 'standard' },
                { id: 'rcr-02', name: '論点の整理', description: '何が問題か', duration: 50, questionCount: 12, difficulty: 'standard' },
                { id: 'rcr-03', name: '筆者の論理を追う', description: '展開を理解する', duration: 55, questionCount: 12, difficulty: 'advanced' },
                { id: 'rcr-04', name: '批判的読解', description: '検討しながら読む', duration: 55, questionCount: 10, difficulty: 'advanced' },
              ]
            },
            {
              id: 'reading-literary-3',
              name: '文学的文章③',
              description: '深い読みの技術',
              lessons: [
                { id: 'rl3-01', name: '文体と効果', description: '文体の特徴を読む', duration: 50, questionCount: 10, difficulty: 'standard' },
                { id: 'rl3-02', name: '構成の分析', description: '物語の構造', duration: 50, questionCount: 10, difficulty: 'standard' },
                { id: 'rl3-03', name: 'テーマの考察', description: '作品のメッセージ', duration: 55, questionCount: 10, difficulty: 'advanced' },
                { id: 'rl3-04', name: '表現の分析', description: '技法と効果', duration: 55, questionCount: 10, difficulty: 'advanced' },
              ]
            },
            {
              id: 'grammar-3',
              name: '文法総合',
              description: '文法の総まとめ',
              lessons: [
                { id: 'g3-01', name: '文の成分', description: '主語・述語・修飾語', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'g3-02', name: '文の種類', description: '単文・複文・重文', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'g3-03', name: '助詞・助動詞の総復習', description: '入試に向けた演習', duration: 55, questionCount: 20, difficulty: 'advanced' },
                { id: 'g3-04', name: '文法 総合問題', description: '入試レベル', duration: 55, questionCount: 20, difficulty: 'advanced' },
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
              id: 'summer-j3',
              name: '1学期総復習と受験対策',
              description: '入試に向けた基礎固め',
              lessons: [
                { id: 'sj3-01', name: '現代文読解 総復習', description: '総合演習', duration: 60, questionCount: 15, difficulty: 'standard' },
                { id: 'sj3-02', name: '文法 総復習', description: '総合演習', duration: 50, questionCount: 25, difficulty: 'standard' },
                { id: 'sj3-03', name: '古典 総復習', description: '古文・漢文', duration: 60, questionCount: 20, difficulty: 'standard' },
                { id: 'sj3-04', name: '入試基礎演習', description: '入試問題に挑戦', duration: 70, questionCount: 20, difficulty: 'advanced' },
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
              id: 'classical-3',
              name: '古文③',
              description: '入試レベルの古文',
              lessons: [
                { id: 'cl3-01', name: '古文単語の総復習', description: '重要古語', duration: 45, questionCount: 20, difficulty: 'standard' },
                { id: 'cl3-02', name: '古文文法の総復習', description: '助動詞・助詞', duration: 50, questionCount: 20, difficulty: 'standard' },
                { id: 'cl3-03', name: '古文読解演習①', description: '入試レベル', duration: 55, questionCount: 12, difficulty: 'advanced' },
                { id: 'cl3-04', name: '古文読解演習②', description: '入試レベル', duration: 55, questionCount: 12, difficulty: 'advanced' },
              ]
            },
            {
              id: 'classical-chinese-3',
              name: '漢文③',
              description: '入試レベルの漢文',
              lessons: [
                { id: 'cc3-01', name: '漢文句法', description: '重要句法のまとめ', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'cc3-02', name: '漢文読解演習①', description: '入試レベル', duration: 55, questionCount: 12, difficulty: 'advanced' },
                { id: 'cc3-03', name: '漢文読解演習②', description: '入試レベル', duration: 55, questionCount: 12, difficulty: 'advanced' },
              ]
            },
            {
              id: 'essay-3',
              name: '作文・小論文③',
              description: '入試に向けた作文',
              lessons: [
                { id: 'es3-01', name: '条件作文', description: '条件を満たして書く', duration: 55, questionCount: 6, difficulty: 'standard' },
                { id: 'es3-02', name: '課題作文', description: 'テーマに沿って書く', duration: 60, questionCount: 6, difficulty: 'advanced' },
                { id: 'es3-03', name: '小論文演習', description: '論理的な文章', duration: 60, questionCount: 5, difficulty: 'advanced' },
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
              id: 'winter-intensive-j',
              name: '受験直前対策',
              description: '入試頻出問題演習',
              lessons: [
                { id: 'wij-01', name: '現代文総合演習', description: '入試レベル', duration: 60, questionCount: 15, difficulty: 'advanced' },
                { id: 'wij-02', name: '古典総合演習', description: '入試レベル', duration: 60, questionCount: 15, difficulty: 'advanced' },
                { id: 'wij-03', name: '入試模擬テスト①', description: '実戦演習', duration: 60, questionCount: 25, difficulty: 'advanced' },
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
              id: 'entrance-exam-j',
              name: '入試対策演習',
              description: '高校入試に向けた総合演習',
              lessons: [
                { id: 'eej-01', name: '入試模擬テスト②', description: '実戦演習', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'eej-02', name: '入試模擬テスト③', description: '実戦演習', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'eej-03', name: '入試模擬テスト④', description: '実戦演習', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'eej-04', name: '入試模擬テスト⑤', description: '実戦演習', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'eej-05', name: '弱点分野補強', description: '個別弱点対策', duration: 55, questionCount: 15, difficulty: 'advanced' },
              ]
            }
          ]
        }
      ]
    }
  ]
};
