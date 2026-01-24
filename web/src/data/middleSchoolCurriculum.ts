/**
 * 中学私塾完整课程体系
 *
 * 结构：学期 → 大单元 → 小单元 → 课时
 *
 * 学期划分：
 * - 1学期（4月-7月）：约15周
 * - 夏期講習（7月-8月）：约4周强化
 * - 2学期（9月-12月）：约15周
 * - 冬期講習（12月-1月）：约2周强化
 * - 3学期（1月-3月）：约10周
 * - 春期講習（3月-4月）：约2周（下一年预习）
 */

import { Calculator, LucideIcon } from 'lucide-react';

// 类型定义
export interface Lesson {
  id: string;
  name: string;
  description: string;
  duration: number; // 分钟
  questionCount: number;
  difficulty: 'basic' | 'standard' | 'advanced';
}

export interface Unit {
  id: string;
  name: string;
  description: string;
  lessons: Lesson[];
}

export interface Term {
  id: string;
  name: string;
  nameJa: string;
  period: string; // e.g., "4月-7月"
  units: Unit[];
}

export interface GradeCurriculum {
  gradeId: string;
  gradeName: string;
  gradeNameJa: string;
  terms: Term[];
}

export interface SubjectCurriculum {
  id: string;
  name: string;
  nameJa: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  grades: GradeCurriculum[];
}

// ========================================
// 数学课程体系
// ========================================
export const mathCurriculum: SubjectCurriculum = {
  id: 'math',
  name: '数学',
  nameJa: '数学',
  icon: Calculator,
  color: 'blue',
  gradient: 'from-blue-500 to-indigo-600',
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
              id: 'positive-negative',
              name: '正負の数',
              description: '正の数と負の数の概念と計算',
              lessons: [
                { id: 'pn-01', name: '正の数・負の数とは', description: '正負の数の意味と表し方', duration: 30, questionCount: 10, difficulty: 'basic' },
                { id: 'pn-02', name: '数直線', description: '数直線上での正負の数', duration: 30, questionCount: 10, difficulty: 'basic' },
                { id: 'pn-03', name: '絶対値', description: '絶対値の意味と求め方', duration: 30, questionCount: 10, difficulty: 'basic' },
                { id: 'pn-04', name: '正負の数の加法', description: '足し算の方法', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'pn-05', name: '正負の数の減法', description: '引き算の方法', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'pn-06', name: '加法と減法の混合', description: '足し算と引き算の混合計算', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pn-07', name: '正負の数の乗法', description: '掛け算の方法', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'pn-08', name: '正負の数の除法', description: '割り算の方法', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'pn-09', name: '四則混合計算', description: '四則演算の混合', duration: 50, questionCount: 20, difficulty: 'advanced' },
                { id: 'pn-10', name: '正負の数の利用', description: '実生活での応用', duration: 45, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'literal-expression',
              name: '文字と式',
              description: '文字を使った式の表し方と計算',
              lessons: [
                { id: 'le-01', name: '文字式の表し方', description: '文字を使った式の書き方', duration: 30, questionCount: 10, difficulty: 'basic' },
                { id: 'le-02', name: '積の表し方', description: '掛け算の省略記法', duration: 30, questionCount: 10, difficulty: 'basic' },
                { id: 'le-03', name: '商の表し方', description: '割り算の分数表記', duration: 30, questionCount: 10, difficulty: 'basic' },
                { id: 'le-04', name: '式の値（代入）', description: '文字に数値を代入', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'le-05', name: '一次式の加法', description: '一次式の足し算', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'le-06', name: '一次式の減法', description: '一次式の引き算', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'le-07', name: '一次式と数の乗除', description: '一次式と数の掛け算・割り算', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'le-08', name: '関係を表す式', description: '等式と不等式', duration: 45, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'equation',
              name: '方程式',
              description: '一次方程式の解き方と応用',
              lessons: [
                { id: 'eq-01', name: '方程式とは', description: '方程式の意味と解', duration: 30, questionCount: 10, difficulty: 'basic' },
                { id: 'eq-02', name: '等式の性質', description: '等式の4つの性質', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'eq-03', name: '一次方程式の解き方①', description: '移項による解法', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'eq-04', name: '一次方程式の解き方②', description: '係数に分数・小数がある場合', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'eq-05', name: 'かっこを含む方程式', description: 'かっこの展開', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'eq-06', name: '方程式の利用①', description: '数量の問題', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'eq-07', name: '方程式の利用②', description: '速さ・割合の問題', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'eq-08', name: '比例式', description: '比例式の解き方', duration: 40, questionCount: 12, difficulty: 'advanced' },
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
              id: 'summer-review',
              name: '1学期総復習',
              description: '正負の数・文字式・方程式の総復習',
              lessons: [
                { id: 'sr-01', name: '正負の数 総復習', description: '計算の総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'sr-02', name: '文字式 総復習', description: '式の計算総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'sr-03', name: '方程式 総復習', description: '方程式の総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'sr-04', name: '1学期 実力テスト', description: '総合テスト', duration: 90, questionCount: 30, difficulty: 'advanced' },
              ]
            },
            {
              id: 'summer-preview',
              name: '2学期予習',
              description: '比例・反比例の先取り学習',
              lessons: [
                { id: 'sp-01', name: '関数とは', description: '関数の意味', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'sp-02', name: '比例の式', description: 'y = ax の形', duration: 45, questionCount: 15, difficulty: 'standard' },
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
              id: 'proportion',
              name: '比例と反比例',
              description: '関数の基礎、比例と反比例',
              lessons: [
                { id: 'pr-01', name: '関数とは', description: '関数の意味と表し方', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'pr-02', name: '比例の式', description: 'y = ax の形', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'pr-03', name: '比例のグラフ①', description: 'グラフの描き方', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pr-04', name: '比例のグラフ②', description: 'グラフの読み取り', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pr-05', name: '反比例の式', description: 'y = a/x の形', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'pr-06', name: '反比例のグラフ①', description: 'グラフの描き方', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pr-07', name: '反比例のグラフ②', description: 'グラフの読み取り', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pr-08', name: '比例・反比例の利用', description: '実生活での応用', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'pr-09', name: '座標と点の移動', description: '座標平面の基礎', duration: 40, questionCount: 12, difficulty: 'advanced' },
              ]
            },
            {
              id: 'plane-geometry',
              name: '平面図形',
              description: '平面図形の性質と作図',
              lessons: [
                { id: 'pg-01', name: '直線と角', description: '直線・半直線・線分と角', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'pg-02', name: '垂直と平行', description: '垂直線と平行線', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'pg-03', name: '図形の移動①', description: '平行移動', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'pg-04', name: '図形の移動②', description: '回転移動・対称移動', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pg-05', name: '作図の基本', description: 'コンパスと定規の使い方', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'pg-06', name: '垂線・垂直二等分線の作図', description: '基本作図①', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'pg-07', name: '角の二等分線の作図', description: '基本作図②', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pg-08', name: '円とおうぎ形', description: '円周・弧・中心角', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pg-09', name: 'おうぎ形の弧と面積', description: '公式と計算', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'pg-10', name: '作図の応用', description: '様々な作図問題', duration: 50, questionCount: 15, difficulty: 'advanced' },
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
              id: 'winter-review',
              name: '2学期総復習',
              description: '比例反比例・平面図形の総復習',
              lessons: [
                { id: 'wr-01', name: '比例反比例 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'wr-02', name: '平面図形 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'wr-03', name: '2学期 実力テスト', description: '総合テスト', duration: 90, questionCount: 30, difficulty: 'advanced' },
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
              id: 'solid-geometry',
              name: '空間図形',
              description: '立体図形の性質と体積・表面積',
              lessons: [
                { id: 'sg-01', name: '立体の種類', description: '角柱・円柱・角錐・円錐・球', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'sg-02', name: '直線と平面の位置関係', description: '平行・垂直・ねじれの位置', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'sg-03', name: '展開図', description: '立体の展開図', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'sg-04', name: '角柱・円柱の表面積', description: '表面積の計算', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'sg-05', name: '角錐・円錐の表面積', description: '表面積の計算', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'sg-06', name: '角柱・円柱の体積', description: '体積の計算', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'sg-07', name: '角錐・円錐の体積', description: '体積の計算', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'sg-08', name: '球の表面積と体積', description: '球の公式', duration: 45, questionCount: 15, difficulty: 'advanced' },
                { id: 'sg-09', name: '立体の切断', description: '切断面の形状', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'sg-10', name: '回転体', description: '平面図形の回転', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'data-analysis',
              name: '資料の整理',
              description: 'データの分析と活用',
              lessons: [
                { id: 'da-01', name: '度数分布表', description: '資料の整理方法', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'da-02', name: 'ヒストグラム', description: '柱状グラフの作成', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'da-03', name: '代表値①', description: '平均値・中央値', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'da-04', name: '代表値②', description: '最頻値・範囲', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'da-05', name: '相対度数', description: '相対度数と累積度数', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'da-06', name: '資料の比較', description: '複数の資料の比較', duration: 50, questionCount: 15, difficulty: 'advanced' },
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
              id: 'year-review',
              name: '中1総復習',
              description: '1年間の総復習と中2準備',
              lessons: [
                { id: 'yr-01', name: '計算分野 総復習', description: '正負の数・文字式', duration: 60, questionCount: 30, difficulty: 'standard' },
                { id: 'yr-02', name: '方程式 総復習', description: '一次方程式', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'yr-03', name: '関数 総復習', description: '比例・反比例', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'yr-04', name: '図形 総復習', description: '平面・空間図形', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'yr-05', name: '中1 学年末テスト', description: '総合テスト', duration: 90, questionCount: 40, difficulty: 'advanced' },
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
              id: 'polynomial',
              name: '式の計算',
              description: '多項式の計算と式の利用',
              lessons: [
                { id: 'pl-01', name: '単項式と多項式', description: '用語の確認', duration: 30, questionCount: 10, difficulty: 'basic' },
                { id: 'pl-02', name: '同類項', description: '同類項のまとめ方', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'pl-03', name: '多項式の加法・減法', description: '多項式の足し算・引き算', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'pl-04', name: '単項式の乗法・除法', description: '単項式どうしの計算', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'pl-05', name: '多項式と数の乗除', description: '分配法則の利用', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pl-06', name: '式の値', description: '代入と計算', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'pl-07', name: '等式の変形', description: '文字について解く', duration: 45, questionCount: 15, difficulty: 'advanced' },
                { id: 'pl-08', name: '式による説明', description: '数の性質の証明', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'simultaneous',
              name: '連立方程式',
              description: '連立方程式の解き方と応用',
              lessons: [
                { id: 'sm-01', name: '連立方程式とは', description: '連立方程式の意味', duration: 35, questionCount: 10, difficulty: 'basic' },
                { id: 'sm-02', name: '加減法①', description: '基本的な加減法', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'sm-03', name: '加減法②', description: '係数を揃える加減法', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'sm-04', name: '代入法', description: '代入による解法', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'sm-05', name: 'かっこを含む連立方程式', description: '複雑な形の連立方程式', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'sm-06', name: '小数・分数を含む連立方程式', description: '係数の処理', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'sm-07', name: '連立方程式の利用①', description: '個数と代金の問題', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'sm-08', name: '連立方程式の利用②', description: '速さの問題', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'sm-09', name: '連立方程式の利用③', description: '割合の問題', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'sm-10', name: '連立方程式の利用④', description: '様々な文章題', duration: 55, questionCount: 15, difficulty: 'advanced' },
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
              id: 'summer-review-2',
              name: '1学期総復習',
              description: '式の計算・連立方程式の総復習',
              lessons: [
                { id: 'sr2-01', name: '式の計算 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'sr2-02', name: '連立方程式 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'sr2-03', name: '文章題特訓', description: '文章題の集中演習', duration: 90, questionCount: 20, difficulty: 'advanced' },
                { id: 'sr2-04', name: '1学期 実力テスト', description: '総合テスト', duration: 90, questionCount: 30, difficulty: 'advanced' },
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
              id: 'linear-function',
              name: '一次関数',
              description: '一次関数のグラフと利用',
              lessons: [
                { id: 'lf-01', name: '一次関数とは', description: 'y = ax + b の形', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'lf-02', name: '一次関数の値の変化', description: '変化の割合', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'lf-03', name: '一次関数のグラフ①', description: '傾きと切片', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'lf-04', name: '一次関数のグラフ②', description: 'グラフの描き方', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'lf-05', name: '一次関数の式を求める①', description: '傾きと1点から', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'lf-06', name: '一次関数の式を求める②', description: '2点から', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'lf-07', name: '方程式とグラフ', description: 'ax + by = c のグラフ', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'lf-08', name: '連立方程式とグラフ', description: '交点の座標', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'lf-09', name: '一次関数の利用①', description: '動点の問題', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'lf-10', name: '一次関数の利用②', description: '水槽の問題', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'lf-11', name: '一次関数の利用③', description: '図形と関数', duration: 55, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'parallel-congruent',
              name: '平行と合同',
              description: '図形の性質と証明',
              lessons: [
                { id: 'pc-01', name: '角と平行線', description: '同位角・錯角', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'pc-02', name: '多角形の角', description: '内角・外角の和', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pc-03', name: '合同な図形', description: '合同の意味と表し方', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'pc-04', name: '三角形の合同条件', description: '3つの合同条件', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pc-05', name: '証明の進め方', description: '証明の書き方', duration: 50, questionCount: 12, difficulty: 'standard' },
                { id: 'pc-06', name: '合同の証明①', description: '基本的な証明', duration: 55, questionCount: 15, difficulty: 'standard' },
                { id: 'pc-07', name: '合同の証明②', description: '応用的な証明', duration: 55, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'triangle-quadrilateral',
              name: '三角形と四角形',
              description: '特別な三角形・四角形の性質',
              lessons: [
                { id: 'tq-01', name: '二等辺三角形の性質', description: '定理と逆', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'tq-02', name: '正三角形', description: '正三角形の性質', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'tq-03', name: '直角三角形の合同', description: '直角三角形の合同条件', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'tq-04', name: '平行四辺形の性質', description: '辺・角・対角線', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'tq-05', name: '平行四辺形になる条件', description: '5つの条件', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'tq-06', name: '長方形・ひし形・正方形', description: '特別な平行四辺形', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'tq-07', name: '平行線と面積', description: '等積変形', duration: 55, questionCount: 15, difficulty: 'advanced' },
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
              id: 'winter-review-2',
              name: '2学期総復習',
              description: '一次関数・図形の総復習',
              lessons: [
                { id: 'wr2-01', name: '一次関数 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'wr2-02', name: '図形の証明 総復習', description: '総合演習', duration: 60, questionCount: 20, difficulty: 'standard' },
                { id: 'wr2-03', name: '2学期 実力テスト', description: '総合テスト', duration: 90, questionCount: 30, difficulty: 'advanced' },
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
              id: 'probability',
              name: '確率',
              description: '確率の基礎と計算',
              lessons: [
                { id: 'pb-01', name: '確率の意味', description: '確率とは何か', duration: 35, questionCount: 10, difficulty: 'basic' },
                { id: 'pb-02', name: '確率の求め方', description: '基本的な確率の計算', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'pb-03', name: '樹形図', description: '樹形図を使った確率', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pb-04', name: '表を使った確率', description: '2つのさいころなど', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pb-05', name: 'カードの問題', description: 'カードを引く確率', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'pb-06', name: '玉を取り出す問題', description: '組み合わせの確率', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'pb-07', name: '確率の利用', description: '応用問題', duration: 55, questionCount: 15, difficulty: 'advanced' },
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
              id: 'year-review-2',
              name: '中2総復習',
              description: '2年間の総復習と中3準備',
              lessons: [
                { id: 'yr2-01', name: '計算分野 総復習', description: '式の計算・連立方程式', duration: 60, questionCount: 30, difficulty: 'standard' },
                { id: 'yr2-02', name: '一次関数 総復習', description: '関数の総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'yr2-03', name: '図形 総復習', description: '証明と計算', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'yr2-04', name: '確率 総復習', description: '確率の総合演習', duration: 50, questionCount: 20, difficulty: 'standard' },
                { id: 'yr2-05', name: '中2 学年末テスト', description: '総合テスト', duration: 90, questionCount: 40, difficulty: 'advanced' },
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
              id: 'expansion-factoring',
              name: '式の展開と因数分解',
              description: '乗法公式と因数分解',
              lessons: [
                { id: 'ef-01', name: '単項式と多項式の乗法', description: '分配法則', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'ef-02', name: '多項式の乗法', description: '多項式どうしの乗法', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'ef-03', name: '乗法公式①', description: '(x+a)(x+b)', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ef-04', name: '乗法公式②', description: '(x+a)², (x-a)²', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ef-05', name: '乗法公式③', description: '(x+a)(x-a)', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ef-06', name: '乗法公式の利用', description: '工夫した計算', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'ef-07', name: '因数分解とは', description: '因数分解の意味', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'ef-08', name: '共通因数', description: '共通因数でくくる', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'ef-09', name: '因数分解①', description: 'x²+(a+b)x+ab', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'ef-10', name: '因数分解②', description: '完全平方式', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'ef-11', name: '因数分解③', description: '平方の差', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ef-12', name: '因数分解の利用', description: '式の計算・証明', duration: 55, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'square-root',
              name: '平方根',
              description: '平方根の計算',
              lessons: [
                { id: 'sr-01', name: '平方根とは', description: '平方根の意味', duration: 35, questionCount: 12, difficulty: 'basic' },
                { id: 'sr-02', name: '平方根の大小', description: '数直線と大小比較', duration: 40, questionCount: 15, difficulty: 'basic' },
                { id: 'sr-03', name: '有理数と無理数', description: '数の分類', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'sr-04', name: '根号を含む式の乗法', description: '√の掛け算', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'sr-05', name: '根号を含む式の除法', description: '√の割り算', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'sr-06', name: '根号を含む式の変形', description: '√の中を簡単にする', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'sr-07', name: '分母の有理化', description: '有理化の方法', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'sr-08', name: '根号を含む式の加減', description: '√の足し算・引き算', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'sr-09', name: '根号を含む式の計算', description: '四則混合計算', duration: 55, questionCount: 20, difficulty: 'advanced' },
                { id: 'sr-10', name: '平方根の利用', description: '応用問題', duration: 55, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'quadratic-equation',
              name: '二次方程式',
              description: '二次方程式の解き方',
              lessons: [
                { id: 'qe-01', name: '二次方程式とは', description: '二次方程式の意味', duration: 35, questionCount: 10, difficulty: 'basic' },
                { id: 'qe-02', name: '平方根による解法', description: 'x² = k の形', duration: 40, questionCount: 15, difficulty: 'standard' },
                { id: 'qe-03', name: '因数分解による解法', description: '因数分解を利用', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'qe-04', name: '平方完成', description: '(x+a)² = k の形に変形', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'qe-05', name: '解の公式', description: '解の公式の導出と利用', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'qe-06', name: '解の公式の利用', description: '様々な二次方程式', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'qe-07', name: '二次方程式の利用①', description: '数の問題', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'qe-08', name: '二次方程式の利用②', description: '図形の問題', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'qe-09', name: '二次方程式の利用③', description: '動点の問題', duration: 55, questionCount: 15, difficulty: 'advanced' },
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
              id: 'summer-review-3',
              name: '1学期総復習',
              description: '展開・因数分解・平方根・二次方程式',
              lessons: [
                { id: 'sr3-01', name: '展開・因数分解 総復習', description: '総合演習', duration: 60, questionCount: 30, difficulty: 'standard' },
                { id: 'sr3-02', name: '平方根 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'sr3-03', name: '二次方程式 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'sr3-04', name: '1学期 実力テスト', description: '総合テスト', duration: 90, questionCount: 30, difficulty: 'advanced' },
              ]
            },
            {
              id: 'summer-intensive',
              name: '受験対策基礎',
              description: '中1・中2の総復習',
              lessons: [
                { id: 'si-01', name: '計算の総復習', description: '中1〜中3の計算', duration: 90, questionCount: 40, difficulty: 'standard' },
                { id: 'si-02', name: '方程式の総復習', description: '全ての方程式', duration: 90, questionCount: 35, difficulty: 'standard' },
                { id: 'si-03', name: '関数の総復習', description: '比例〜一次関数', duration: 90, questionCount: 35, difficulty: 'standard' },
                { id: 'si-04', name: '図形の総復習', description: '平面・空間図形', duration: 90, questionCount: 35, difficulty: 'standard' },
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
              id: 'quadratic-function',
              name: '二次関数',
              description: 'y = ax² のグラフと利用',
              lessons: [
                { id: 'qf-01', name: '関数 y = ax²', description: '二次関数の意味', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'qf-02', name: 'y = ax² のグラフ', description: '放物線の描き方', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'qf-03', name: 'y = ax² の値の変化', description: '変化の割合', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'qf-04', name: 'y = ax² の変域', description: '変域の求め方', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'qf-05', name: '関数の式を求める', description: '条件から式を決定', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'qf-06', name: '放物線と直線①', description: '交点の座標', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'qf-07', name: '放物線と直線②', description: '面積の問題', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'qf-08', name: '二次関数の利用①', description: '物体の運動', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'qf-09', name: '二次関数の利用②', description: '図形との融合', duration: 60, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'similarity',
              name: '相似な図形',
              description: '相似の性質と利用',
              lessons: [
                { id: 'sm-01', name: '相似な図形', description: '相似の意味と表し方', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'sm-02', name: '三角形の相似条件', description: '3つの相似条件', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'sm-03', name: '相似の証明', description: '証明問題', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'sm-04', name: '平行線と線分の比①', description: '基本定理', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'sm-05', name: '平行線と線分の比②', description: '応用問題', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'sm-06', name: '中点連結定理', description: '定理と利用', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'sm-07', name: '相似な図形の面積比', description: '面積比の公式', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'sm-08', name: '相似な立体の体積比', description: '体積比の公式', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'sm-09', name: '相似の利用', description: '測量・縮図', duration: 55, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'circle',
              name: '円',
              description: '円周角の定理と利用',
              lessons: [
                { id: 'cr-01', name: '円周角と中心角', description: '円周角の定理', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'cr-02', name: '円周角の定理の逆', description: '4点が同一円周上', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'cr-03', name: '円周角と弧', description: '弧と円周角の関係', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'cr-04', name: '円と相似', description: '円と三角形の相似', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'cr-05', name: '円の接線', description: '接線の性質', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'cr-06', name: '接線と弦の作る角', description: '接弦定理', duration: 55, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'pythagorean',
              name: '三平方の定理',
              description: '三平方の定理と利用',
              lessons: [
                { id: 'pt-01', name: '三平方の定理', description: '定理の証明と基本', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pt-02', name: '三平方の定理の逆', description: '直角三角形の判定', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pt-03', name: '特別な直角三角形', description: '1:1:√2, 1:2:√3', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'pt-04', name: '平面図形への利用①', description: '座標と距離', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'pt-05', name: '平面図形への利用②', description: '図形の面積', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'pt-06', name: '空間図形への利用①', description: '直方体の対角線', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'pt-07', name: '空間図形への利用②', description: '立体の体積', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'pt-08', name: '円と三平方の定理', description: '円と直角三角形', duration: 55, questionCount: 15, difficulty: 'advanced' },
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
              id: 'winter-intensive',
              name: '受験直前対策',
              description: '入試頻出問題演習',
              lessons: [
                { id: 'wi-01', name: '計算問題特訓', description: '入試レベル計算', duration: 60, questionCount: 30, difficulty: 'standard' },
                { id: 'wi-02', name: '関数融合問題', description: '一次・二次関数', duration: 90, questionCount: 20, difficulty: 'advanced' },
                { id: 'wi-03', name: '図形証明問題', description: '合同・相似・円', duration: 90, questionCount: 15, difficulty: 'advanced' },
                { id: 'wi-04', name: '図形計量問題', description: '三平方の定理', duration: 90, questionCount: 20, difficulty: 'advanced' },
                { id: 'wi-05', name: '入試模擬テスト①', description: '実戦演習', duration: 90, questionCount: 25, difficulty: 'advanced' },
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
              id: 'sampling',
              name: '標本調査',
              description: '標本調査の基礎',
              lessons: [
                { id: 'sp-01', name: '全数調査と標本調査', description: '調査方法の違い', duration: 35, questionCount: 10, difficulty: 'basic' },
                { id: 'sp-02', name: '標本の選び方', description: '無作為抽出', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'sp-03', name: '標本調査の利用', description: '母集団の推定', duration: 45, questionCount: 15, difficulty: 'standard' },
              ]
            },
            {
              id: 'entrance-exam',
              name: '入試対策演習',
              description: '高校入試に向けた総合演習',
              lessons: [
                { id: 'ee-01', name: '入試模擬テスト②', description: '実戦演習', duration: 90, questionCount: 25, difficulty: 'advanced' },
                { id: 'ee-02', name: '入試模擬テスト③', description: '実戦演習', duration: 90, questionCount: 25, difficulty: 'advanced' },
                { id: 'ee-03', name: '入試模擬テスト④', description: '実戦演習', duration: 90, questionCount: 25, difficulty: 'advanced' },
                { id: 'ee-04', name: '入試模擬テスト⑤', description: '実戦演習', duration: 90, questionCount: 25, difficulty: 'advanced' },
                { id: 'ee-05', name: '弱点分野補強', description: '個別弱点対策', duration: 60, questionCount: 20, difficulty: 'advanced' },
              ]
            }
          ]
        }
      ]
    }
  ]
};

// 计算课程统计
export const getMathStats = () => {
  let totalLessons = 0;
  let totalQuestions = 0;
  let totalDuration = 0;

  mathCurriculum.grades.forEach(grade => {
    grade.terms.forEach(term => {
      term.units.forEach(unit => {
        totalLessons += unit.lessons.length;
        unit.lessons.forEach(lesson => {
          totalQuestions += lesson.questionCount;
          totalDuration += lesson.duration;
        });
      });
    });
  });

  return {
    grades: mathCurriculum.grades.length,
    totalLessons,
    totalQuestions,
    totalHours: Math.round(totalDuration / 60)
  };
};

// 导出所有课程
export const allCurriculums: SubjectCurriculum[] = [
  mathCurriculum,
  // englishCurriculum,  // TODO: 添加
  // japaneseCurriculum, // TODO: 添加
  // scienceCurriculum,  // TODO: 添加
  // socialCurriculum,   // TODO: 添加
];
