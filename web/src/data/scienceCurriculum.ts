/**
 * 中学理科完整课程体系
 */

import { FlaskConical } from 'lucide-react';
import type { SubjectCurriculum } from './middleSchoolCurriculum';

export const scienceCurriculum: SubjectCurriculum = {
  id: 'science',
  name: '理科',
  nameJa: '理科',
  icon: FlaskConical,
  color: 'purple',
  gradient: 'from-purple-500 to-violet-600',
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
              id: 'plants-structure',
              name: '植物の体のつくり',
              description: '植物の観察と構造',
              lessons: [
                { id: 'ps-01', name: '身近な植物の観察', description: '野外観察の方法', duration: 40, questionCount: 10, difficulty: 'basic' },
                { id: 'ps-02', name: '花のつくり', description: 'がく・花弁・おしべ・めしべ', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ps-03', name: '果実と種子', description: '受粉と種子のできかた', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ps-04', name: '葉のつくり', description: '葉脈・気孔・葉緑体', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ps-05', name: '茎と根のつくり', description: '維管束・道管・師管', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ps-06', name: '光合成', description: '植物が養分を作るしくみ', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'ps-07', name: '呼吸と蒸散', description: '植物の呼吸と水の移動', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'plants-classification',
              name: '植物の分類',
              description: '植物の仲間分け',
              lessons: [
                { id: 'pc-01', name: '種子植物', description: '被子植物と裸子植物', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'pc-02', name: '被子植物の分類', description: '単子葉類と双子葉類', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pc-03', name: 'シダ植物・コケ植物', description: '種子を作らない植物', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'pc-04', name: '植物の分類まとめ', description: '分類のまとめ', duration: 50, questionCount: 15, difficulty: 'advanced' },
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
              id: 'summer-s1',
              name: '1学期総復習',
              description: '植物分野の復習',
              lessons: [
                { id: 'ss1-01', name: '植物の体のつくり 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'ss1-02', name: '植物の分類 総復習', description: '総合演習', duration: 50, questionCount: 20, difficulty: 'standard' },
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
              id: 'matter-property',
              name: '身のまわりの物質',
              description: '物質の性質',
              lessons: [
                { id: 'mp-01', name: '物質と物体', description: '物質の種類', duration: 35, questionCount: 10, difficulty: 'basic' },
                { id: 'mp-02', name: '金属と非金属', description: '金属の性質', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'mp-03', name: '有機物と無機物', description: '有機物の特徴', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'mp-04', name: '密度', description: '密度の計算', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'mp-05', name: 'プラスチック', description: 'プラスチックの性質', duration: 40, questionCount: 12, difficulty: 'standard' },
              ]
            },
            {
              id: 'gas',
              name: '気体の性質',
              description: 'いろいろな気体',
              lessons: [
                { id: 'gs-01', name: '酸素', description: '酸素の性質と発生', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'gs-02', name: '二酸化炭素', description: '二酸化炭素の性質と発生', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'gs-03', name: '水素', description: '水素の性質と発生', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'gs-04', name: 'アンモニア', description: 'アンモニアの性質と発生', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'gs-05', name: '気体の集め方', description: '水上置換・下方置換・上方置換', duration: 45, questionCount: 15, difficulty: 'standard' },
              ]
            },
            {
              id: 'solution',
              name: '水溶液',
              description: '溶解と濃度',
              lessons: [
                { id: 'sl-01', name: '溶解', description: '溶質・溶媒・溶液', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'sl-02', name: '溶解度', description: '溶ける量の限界', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'sl-03', name: '質量パーセント濃度', description: '濃度の計算', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'sl-04', name: '再結晶', description: '結晶を取り出す', duration: 45, questionCount: 12, difficulty: 'advanced' },
              ]
            },
            {
              id: 'state-change',
              name: '状態変化',
              description: '物質の三態',
              lessons: [
                { id: 'sc-01', name: '状態変化とは', description: '固体・液体・気体', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'sc-02', name: '融点と沸点', description: '状態変化の温度', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'sc-03', name: '蒸留', description: '混合物の分離', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'sc-04', name: '状態変化と体積・質量', description: '変化による違い', duration: 45, questionCount: 15, difficulty: 'advanced' },
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
              id: 'winter-s1',
              name: '2学期総復習',
              description: '物質分野の復習',
              lessons: [
                { id: 'ws1-01', name: '物質の性質 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'ws1-02', name: '気体・水溶液・状態変化 総復習', description: '総合演習', duration: 60, questionCount: 30, difficulty: 'standard' },
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
              id: 'light-sound',
              name: '光と音',
              description: '光と音の性質',
              lessons: [
                { id: 'ls-01', name: '光の直進', description: '光の進み方', duration: 35, questionCount: 10, difficulty: 'basic' },
                { id: 'ls-02', name: '光の反射', description: '反射の法則', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ls-03', name: '光の屈折', description: '屈折の法則', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ls-04', name: '凸レンズ', description: '像のでき方', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'ls-05', name: '音の性質', description: '振動と波', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'ls-06', name: '音の大小・高低', description: '振幅と振動数', duration: 45, questionCount: 15, difficulty: 'standard' },
              ]
            },
            {
              id: 'force-pressure',
              name: '力と圧力',
              description: '力のはたらき',
              lessons: [
                { id: 'fp-01', name: '力のはたらき', description: '力とは何か', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'fp-02', name: '力の表し方', description: '力の三要素・矢印', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'fp-03', name: '重さと質量', description: 'N と kg', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'fp-04', name: '圧力', description: '圧力の計算', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'fp-05', name: '水圧', description: '水中の圧力', duration: 45, questionCount: 15, difficulty: 'advanced' },
                { id: 'fp-06', name: '大気圧', description: '空気の重さ', duration: 45, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'volcano-earthquake',
              name: '火山・地震',
              description: '大地の変動',
              lessons: [
                { id: 've-01', name: '火山の噴火', description: '火山活動', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 've-02', name: 'マグマと火山の形', description: 'マグマの性質と噴火', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 've-03', name: '火成岩', description: '火山岩と深成岩', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 've-04', name: '地震のゆれ', description: 'P波とS波', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 've-05', name: '地震の規模', description: '震度とマグニチュード', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 've-06', name: 'プレートと地震', description: 'プレートテクトニクス', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'strata-rock',
              name: '地層と岩石',
              description: '大地の歴史',
              lessons: [
                { id: 'sr-01', name: '地層のでき方', description: '堆積と地層', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'sr-02', name: '堆積岩', description: '砂岩・泥岩・れき岩', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'sr-03', name: '化石', description: '示準化石と示相化石', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'sr-04', name: '地層の変形', description: '褶曲と断層', duration: 45, questionCount: 12, difficulty: 'advanced' },
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
              id: 'year-s1',
              name: '中1理科総復習',
              description: '1年間の総復習',
              lessons: [
                { id: 'ys1-01', name: '生物分野 総復習', description: '植物', duration: 50, questionCount: 20, difficulty: 'standard' },
                { id: 'ys1-02', name: '化学分野 総復習', description: '物質・気体・水溶液', duration: 60, questionCount: 25, difficulty: 'standard' },
                { id: 'ys1-03', name: '物理分野 総復習', description: '光・力', duration: 50, questionCount: 20, difficulty: 'standard' },
                { id: 'ys1-04', name: '地学分野 総復習', description: '火山・地震・地層', duration: 50, questionCount: 20, difficulty: 'standard' },
                { id: 'ys1-05', name: '中1 学年末テスト', description: '総合テスト', duration: 60, questionCount: 30, difficulty: 'advanced' },
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
              id: 'chemical-change',
              name: '化学変化と原子・分子',
              description: '物質の変化と粒子',
              lessons: [
                { id: 'cc-01', name: '物質の分解', description: '熱分解・電気分解', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'cc-02', name: '原子', description: '原子の性質', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'cc-03', name: '分子', description: '分子とは', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'cc-04', name: '単体と化合物', description: '物質の分類', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'cc-05', name: '元素記号', description: '元素記号の覚え方', duration: 45, questionCount: 20, difficulty: 'standard' },
                { id: 'cc-06', name: '化学式', description: '化学式の表し方', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'cc-07', name: '化学反応式①', description: '化学反応式の書き方', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'cc-08', name: '化学反応式②', description: '係数の合わせ方', duration: 55, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'chemical-change-mass',
              name: '化学変化と物質の質量',
              description: '質量保存の法則',
              lessons: [
                { id: 'cm-01', name: '化合', description: '物質が結びつく', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'cm-02', name: '酸化', description: '酸素と結びつく', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'cm-03', name: '燃焼', description: '激しい酸化', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'cm-04', name: '還元', description: '酸素をうばう', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'cm-05', name: '質量保存の法則', description: '化学変化と質量', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'cm-06', name: '一定の割合', description: '反応する質量の比', duration: 55, questionCount: 15, difficulty: 'advanced' },
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
              id: 'summer-s2',
              name: '1学期総復習',
              description: '化学変化の復習',
              lessons: [
                { id: 'ss2-01', name: '原子・分子 総復習', description: '総合演習', duration: 50, questionCount: 25, difficulty: 'standard' },
                { id: 'ss2-02', name: '化学変化・質量 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
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
              id: 'organism-structure',
              name: '生物の体のつくり',
              description: '細胞と組織',
              lessons: [
                { id: 'os-01', name: '細胞のつくり', description: '動物細胞と植物細胞', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'os-02', name: '単細胞生物と多細胞生物', description: '生物の体の構成', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'os-03', name: '組織と器官', description: '体の階層構造', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'os-04', name: '消化のしくみ', description: '消化器官と消化酵素', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'os-05', name: '吸収のしくみ', description: '養分の吸収', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'os-06', name: '呼吸のしくみ', description: '肺のはたらき', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'os-07', name: '血液の循環', description: '心臓と血管', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'os-08', name: '排出のしくみ', description: '腎臓のはたらき', duration: 45, questionCount: 12, difficulty: 'advanced' },
              ]
            },
            {
              id: 'animal-classification',
              name: '動物の分類',
              description: '動物の仲間分け',
              lessons: [
                { id: 'ac-01', name: 'セキツイ動物', description: '5つのグループ', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ac-02', name: '無セキツイ動物', description: '節足動物・軟体動物など', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ac-03', name: '動物の進化', description: '生物の歴史', duration: 45, questionCount: 12, difficulty: 'advanced' },
              ]
            },
            {
              id: 'electricity',
              name: '電流',
              description: '電気の基礎',
              lessons: [
                { id: 'el-01', name: '回路と電流', description: '電気の流れ', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'el-02', name: '直列回路と並列回路', description: '回路の種類', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'el-03', name: '電圧', description: '電圧の測定', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'el-04', name: 'オームの法則', description: '電流・電圧・抵抗', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'el-05', name: '直列回路の計算', description: '抵抗の合成', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'el-06', name: '並列回路の計算', description: '抵抗の合成', duration: 55, questionCount: 15, difficulty: 'advanced' },
                { id: 'el-07', name: '電力と熱量', description: 'W と J', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'el-08', name: '静電気', description: '電気の正体', duration: 40, questionCount: 12, difficulty: 'standard' },
              ]
            },
            {
              id: 'electricity-magnetism',
              name: '電流と磁界',
              description: '電気と磁石の関係',
              lessons: [
                { id: 'em-01', name: '磁石と磁界', description: '磁界の向き', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'em-02', name: '電流がつくる磁界', description: '右ねじの法則', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'em-03', name: 'コイルと磁界', description: 'コイルの磁界', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'em-04', name: '電磁誘導', description: '磁界の変化と電流', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'em-05', name: 'モーターと発電機', description: '電気エネルギーの利用', duration: 50, questionCount: 15, difficulty: 'advanced' },
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
              id: 'winter-s2',
              name: '2学期総復習',
              description: '生物・電気の復習',
              lessons: [
                { id: 'ws2-01', name: '生物の体 総復習', description: '総合演習', duration: 55, questionCount: 20, difficulty: 'standard' },
                { id: 'ws2-02', name: '電流・磁界 総復習', description: '総合演習', duration: 60, questionCount: 25, difficulty: 'standard' },
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
              id: 'weather',
              name: '天気の変化',
              description: '気象のしくみ',
              lessons: [
                { id: 'wt-01', name: '気象の観測', description: '気温・湿度・気圧', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'wt-02', name: '雲のでき方', description: '水蒸気と雲', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'wt-03', name: '前線', description: '寒冷前線・温暖前線', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'wt-04', name: '高気圧と低気圧', description: '気圧と天気', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'wt-05', name: '日本の天気', description: '季節と天気', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'wt-06', name: '天気の予報', description: '天気図の見方', duration: 50, questionCount: 15, difficulty: 'advanced' },
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
              id: 'year-s2',
              name: '中2理科総復習',
              description: '2年間の総復習',
              lessons: [
                { id: 'ys2-01', name: '化学分野 総復習', description: '化学変化', duration: 55, questionCount: 25, difficulty: 'standard' },
                { id: 'ys2-02', name: '生物分野 総復習', description: '動物の体', duration: 50, questionCount: 20, difficulty: 'standard' },
                { id: 'ys2-03', name: '物理分野 総復習', description: '電流・磁界', duration: 55, questionCount: 25, difficulty: 'standard' },
                { id: 'ys2-04', name: '地学分野 総復習', description: '天気', duration: 50, questionCount: 20, difficulty: 'standard' },
                { id: 'ys2-05', name: '中2 学年末テスト', description: '総合テスト', duration: 60, questionCount: 30, difficulty: 'advanced' },
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
              id: 'ion',
              name: '水溶液とイオン',
              description: 'イオンの性質',
              lessons: [
                { id: 'io-01', name: '電解質と非電解質', description: '電気を通す物質', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'io-02', name: '原子の構造', description: '陽子・中性子・電子', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'io-03', name: 'イオンとは', description: 'イオンのでき方', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'io-04', name: 'イオン式', description: 'イオン式の書き方', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'io-05', name: '電離', description: '電解質の電離', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'battery',
              name: '電池と電気分解',
              description: '化学変化と電気',
              lessons: [
                { id: 'bt-01', name: '電池のしくみ', description: '化学エネルギーから電気エネルギー', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'bt-02', name: 'いろいろな電池', description: '乾電池・蓄電池など', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'bt-03', name: '電気分解', description: '電気エネルギーで分解', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'acid-alkali',
              name: '酸・アルカリ・中和',
              description: '酸とアルカリの反応',
              lessons: [
                { id: 'aa-01', name: '酸性・アルカリ性', description: '水溶液の性質', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'aa-02', name: 'pHとは', description: '酸性・アルカリ性の強さ', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'aa-03', name: '酸とは', description: 'H⁺を出す物質', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'aa-04', name: 'アルカリとは', description: 'OH⁻を出す物質', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'aa-05', name: '中和', description: '酸とアルカリの反応', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'aa-06', name: '塩', description: '中和でできる物質', duration: 50, questionCount: 15, difficulty: 'advanced' },
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
              id: 'summer-s3',
              name: '1学期総復習と受験対策',
              description: 'イオン分野と総復習',
              lessons: [
                { id: 'ss3-01', name: 'イオン 総復習', description: '総合演習', duration: 55, questionCount: 25, difficulty: 'standard' },
                { id: 'ss3-02', name: '中1化学 総復習', description: '物質', duration: 50, questionCount: 20, difficulty: 'standard' },
                { id: 'ss3-03', name: '中2化学 総復習', description: '化学変化', duration: 50, questionCount: 20, difficulty: 'standard' },
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
              id: 'life-continuity',
              name: '生命の連続性',
              description: '細胞分裂と生殖',
              lessons: [
                { id: 'lc-01', name: '細胞分裂', description: '体細胞分裂', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'lc-02', name: '生物の成長', description: '分裂と成長', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'lc-03', name: '無性生殖', description: '分裂・出芽など', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'lc-04', name: '有性生殖', description: '受精と発生', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'lc-05', name: '減数分裂', description: '染色体の数の変化', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'heredity',
              name: '遺伝',
              description: '形質の伝わり方',
              lessons: [
                { id: 'hd-01', name: '遺伝とは', description: '形質と遺伝子', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'hd-02', name: 'メンデルの法則', description: '分離の法則', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'hd-03', name: '遺伝の規則性', description: '優性・劣性', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'hd-04', name: '遺伝子と染色体', description: 'DNAと遺伝子', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'hd-05', name: '遺伝の計算', description: '遺伝子型と表現型', duration: 55, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'motion-energy',
              name: '運動とエネルギー',
              description: '力と運動の関係',
              lessons: [
                { id: 'me-01', name: '速さ', description: '速さの計算', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'me-02', name: '等速直線運動', description: '速さが一定の運動', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'me-03', name: '力と運動①', description: '力がはたらく運動', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'me-04', name: '力と運動②', description: '力がはたらかない運動', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'me-05', name: '慣性の法則', description: '運動を続けようとする性質', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'me-06', name: '力のつり合い', description: '2力のつり合い', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'me-07', name: '作用と反作用', description: '力の及ぼし合い', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'work-energy',
              name: '仕事とエネルギー',
              description: 'エネルギーの変換',
              lessons: [
                { id: 'we-01', name: '仕事', description: '仕事の計算', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'we-02', name: '仕事の原理', description: '道具を使った仕事', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'we-03', name: '仕事率', description: '単位時間の仕事', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'we-04', name: '位置エネルギー', description: '高さとエネルギー', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'we-05', name: '運動エネルギー', description: '速さとエネルギー', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'we-06', name: '力学的エネルギー保存', description: 'エネルギーの移り変わり', duration: 55, questionCount: 15, difficulty: 'advanced' },
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
              id: 'winter-intensive-s',
              name: '受験直前対策',
              description: '入試頻出問題演習',
              lessons: [
                { id: 'wis-01', name: '化学分野 総合演習', description: '入試レベル', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'wis-02', name: '生物分野 総合演習', description: '入試レベル', duration: 55, questionCount: 20, difficulty: 'advanced' },
                { id: 'wis-03', name: '物理分野 総合演習', description: '入試レベル', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'wis-04', name: '入試模擬テスト①', description: '実戦演習', duration: 60, questionCount: 25, difficulty: 'advanced' },
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
              id: 'earth-universe',
              name: '地球と宇宙',
              description: '天体の動き',
              lessons: [
                { id: 'eu-01', name: '天体の1日の動き', description: '日周運動', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'eu-02', name: '天体の1年の動き', description: '年周運動', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'eu-03', name: '地球の自転と公転', description: '地球の運動', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'eu-04', name: '季節の変化', description: '地軸の傾きと季節', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'eu-05', name: '月の満ち欠け', description: '月の見え方', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'eu-06', name: '日食と月食', description: '太陽・月・地球の位置', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'eu-07', name: '太陽系', description: '惑星と太陽', duration: 45, questionCount: 12, difficulty: 'standard' },
              ]
            },
            {
              id: 'nature-human',
              name: '自然と人間',
              description: '環境と科学技術',
              lessons: [
                { id: 'nh-01', name: '生態系', description: '食物連鎖', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'nh-02', name: '自然界のつり合い', description: '生態系のバランス', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'nh-03', name: '自然環境と人間', description: '環境問題', duration: 45, questionCount: 12, difficulty: 'advanced' },
              ]
            },
            {
              id: 'entrance-exam-s',
              name: '入試対策演習',
              description: '高校入試に向けた総合演習',
              lessons: [
                { id: 'ees-01', name: '入試模擬テスト②', description: '実戦演習', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'ees-02', name: '入試模擬テスト③', description: '実戦演習', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'ees-03', name: '入試模擬テスト④', description: '実戦演習', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'ees-04', name: '入試模擬テスト⑤', description: '実戦演習', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'ees-05', name: '弱点分野補強', description: '個別弱点対策', duration: 55, questionCount: 20, difficulty: 'advanced' },
              ]
            }
          ]
        }
      ]
    }
  ]
};
