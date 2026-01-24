/**
 * 中学社会完整课程体系
 * 包含：地理、历史、公民
 */

import { Landmark } from 'lucide-react';
import type { SubjectCurriculum } from './middleSchoolCurriculum';

export const socialCurriculum: SubjectCurriculum = {
  id: 'social',
  name: '社会',
  nameJa: '社会',
  icon: Landmark,
  color: 'amber',
  gradient: 'from-amber-500 to-yellow-600',
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
              id: 'world-geography',
              name: '世界の姿',
              description: '世界地理の基礎',
              lessons: [
                { id: 'wg-01', name: '地球の姿', description: '緯度・経度', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'wg-02', name: '世界の大陸と海洋', description: '6大陸と3大洋', duration: 35, questionCount: 10, difficulty: 'basic' },
                { id: 'wg-03', name: '世界の国々', description: '国の数と分布', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'wg-04', name: '世界の地域区分', description: '地域の分け方', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'wg-05', name: '地図の活用', description: '地図の種類と読み方', duration: 45, questionCount: 15, difficulty: 'standard' },
              ]
            },
            {
              id: 'asia',
              name: '世界の諸地域（アジア）',
              description: 'アジア州の学習',
              lessons: [
                { id: 'as-01', name: 'アジアの自然', description: '地形と気候', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'as-02', name: '東アジア', description: '中国・韓国', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'as-03', name: '東南アジア', description: 'ASEAN諸国', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'as-04', name: '南アジア', description: 'インドなど', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'as-05', name: '西アジア・中央アジア', description: '石油と宗教', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'europe',
              name: '世界の諸地域（ヨーロッパ）',
              description: 'ヨーロッパ州の学習',
              lessons: [
                { id: 'eu-01', name: 'ヨーロッパの自然', description: '地形と気候', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'eu-02', name: 'EU（ヨーロッパ連合）', description: '統合の歩み', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'eu-03', name: '西ヨーロッパ', description: '主要国の特色', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'eu-04', name: '東ヨーロッパ・ロシア', description: '旧社会主義国', duration: 50, questionCount: 15, difficulty: 'advanced' },
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
              id: 'summer-so1',
              name: '1学期総復習',
              description: 'アジア・ヨーロッパの復習',
              lessons: [
                { id: 'sso1-01', name: '世界地理の基礎 総復習', description: '総合演習', duration: 50, questionCount: 20, difficulty: 'standard' },
                { id: 'sso1-02', name: 'アジア・ヨーロッパ 総復習', description: '総合演習', duration: 55, questionCount: 25, difficulty: 'standard' },
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
              id: 'africa',
              name: '世界の諸地域（アフリカ）',
              description: 'アフリカ州の学習',
              lessons: [
                { id: 'af-01', name: 'アフリカの自然', description: '地形と気候', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'af-02', name: 'アフリカの歴史と文化', description: '植民地支配と独立', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'af-03', name: 'アフリカの産業と課題', description: '資源と開発', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'north-america',
              name: '世界の諸地域（北アメリカ）',
              description: '北アメリカ州の学習',
              lessons: [
                { id: 'na-01', name: '北アメリカの自然', description: '地形と気候', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'na-02', name: 'アメリカ合衆国①', description: '多民族国家', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'na-03', name: 'アメリカ合衆国②', description: '農業と工業', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'na-04', name: 'カナダ', description: '資源と産業', duration: 45, questionCount: 12, difficulty: 'standard' },
              ]
            },
            {
              id: 'south-america',
              name: '世界の諸地域（南アメリカ）',
              description: '南アメリカ州の学習',
              lessons: [
                { id: 'sa-01', name: '南アメリカの自然', description: 'アマゾンとアンデス', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'sa-02', name: 'ブラジル', description: '発展と課題', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'sa-03', name: '南アメリカの国々', description: '各国の特色', duration: 45, questionCount: 12, difficulty: 'advanced' },
              ]
            },
            {
              id: 'oceania',
              name: '世界の諸地域（オセアニア）',
              description: 'オセアニア州の学習',
              lessons: [
                { id: 'oc-01', name: 'オセアニアの自然', description: '地形と気候', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'oc-02', name: 'オーストラリア', description: '資源と産業', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'oc-03', name: 'ニュージーランドと島国', description: '観光と環境', duration: 45, questionCount: 12, difficulty: 'standard' },
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
              id: 'winter-so1',
              name: '2学期総復習',
              description: '世界地理の復習',
              lessons: [
                { id: 'wso1-01', name: '世界の諸地域 総復習', description: '総合演習', duration: 60, questionCount: 30, difficulty: 'standard' },
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
              id: 'japan-geography',
              name: '日本の姿',
              description: '日本地理の基礎',
              lessons: [
                { id: 'jg-01', name: '日本の位置と領域', description: '位置・領土・領海', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'jg-02', name: '日本の地形', description: '山地・平野・海岸', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'jg-03', name: '日本の気候', description: '6つの気候区分', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'jg-04', name: '日本の人口', description: '人口分布と問題', duration: 45, questionCount: 12, difficulty: 'standard' },
              ]
            },
            {
              id: 'ancient-civilization',
              name: '古代文明',
              description: '世界の古代文明',
              lessons: [
                { id: 'ac-01', name: '文明のおこり', description: '人類の誕生', duration: 40, questionCount: 12, difficulty: 'basic' },
                { id: 'ac-02', name: 'エジプト・メソポタミア文明', description: '大河流域の文明', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'ac-03', name: 'インダス・中国文明', description: 'アジアの古代文明', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'ac-04', name: 'ギリシャ・ローマ文明', description: '地中海の文明', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'ancient-japan',
              name: '日本の古代',
              description: '古墳時代～平安時代',
              lessons: [
                { id: 'aj-01', name: '縄文・弥生時代', description: '狩猟から農耕へ', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'aj-02', name: '古墳時代とヤマト王権', description: '古墳と大和政権', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'aj-03', name: '飛鳥時代', description: '聖徳太子と大化の改新', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'aj-04', name: '奈良時代', description: '律令国家の成立', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'aj-05', name: '平安時代①', description: '平安京と貴族文化', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'aj-06', name: '平安時代②', description: '藤原氏と院政', duration: 50, questionCount: 15, difficulty: 'advanced' },
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
              id: 'year-so1',
              name: '中1社会総復習',
              description: '1年間の総復習',
              lessons: [
                { id: 'yso1-01', name: '世界地理 総復習', description: '総合演習', duration: 55, questionCount: 25, difficulty: 'standard' },
                { id: 'yso1-02', name: '日本地理の基礎 総復習', description: '総合演習', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'yso1-03', name: '歴史（古代） 総復習', description: '総合演習', duration: 55, questionCount: 25, difficulty: 'standard' },
                { id: 'yso1-04', name: '中1 学年末テスト', description: '総合テスト', duration: 60, questionCount: 30, difficulty: 'advanced' },
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
              id: 'japan-regions-1',
              name: '日本の諸地域①',
              description: '九州・中国・四国',
              lessons: [
                { id: 'jr1-01', name: '九州地方の自然', description: '地形と気候', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'jr1-02', name: '九州地方の産業', description: '農業・工業・観光', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'jr1-03', name: '中国・四国地方の自然', description: '地形と気候', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'jr1-04', name: '中国・四国地方の産業', description: '農業・工業・過疎', duration: 50, questionCount: 15, difficulty: 'standard' },
              ]
            },
            {
              id: 'japan-regions-2',
              name: '日本の諸地域②',
              description: '近畿・中部',
              lessons: [
                { id: 'jr2-01', name: '近畿地方の自然', description: '地形と気候', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'jr2-02', name: '近畿地方の産業と歴史', description: '歴史的都市と産業', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'jr2-03', name: '中部地方の自然', description: '3つの地域', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'jr2-04', name: '中部地方の産業', description: '農業と工業', duration: 50, questionCount: 15, difficulty: 'standard' },
              ]
            },
            {
              id: 'japan-regions-3',
              name: '日本の諸地域③',
              description: '関東・東北・北海道',
              lessons: [
                { id: 'jr3-01', name: '関東地方の自然', description: '地形と気候', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'jr3-02', name: '関東地方の産業', description: '首都圏の機能', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'jr3-03', name: '東北地方の自然と産業', description: '農業と課題', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'jr3-04', name: '北海道地方の自然と産業', description: '開拓と農業', duration: 50, questionCount: 15, difficulty: 'standard' },
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
              id: 'summer-so2',
              name: '1学期総復習',
              description: '日本地理の復習',
              lessons: [
                { id: 'sso2-01', name: '日本の諸地域 総復習', description: '総合演習', duration: 60, questionCount: 30, difficulty: 'standard' },
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
              id: 'medieval-japan',
              name: '中世の日本',
              description: '鎌倉時代～室町時代',
              lessons: [
                { id: 'mj-01', name: '武士の台頭', description: '平氏と源氏', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'mj-02', name: '鎌倉幕府', description: '武家政治の始まり', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'mj-03', name: '鎌倉時代の社会と文化', description: '武士の生活', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'mj-04', name: '元寇と鎌倉幕府の滅亡', description: '蒙古襲来', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'mj-05', name: '室町幕府', description: '足利氏の政治', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'mj-06', name: '室町文化', description: '北山文化・東山文化', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'mj-07', name: '戦国時代', description: '下克上の時代', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'early-modern-japan',
              name: '近世の日本',
              description: '安土桃山時代～江戸時代',
              lessons: [
                { id: 'em-01', name: '織田信長の統一事業', description: '天下布武', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'em-02', name: '豊臣秀吉の統一事業', description: '太閤検地と刀狩', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'em-03', name: '桃山文化', description: '豪華な文化', duration: 40, questionCount: 12, difficulty: 'standard' },
                { id: 'em-04', name: '江戸幕府の成立', description: '徳川家康', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'em-05', name: '幕藩体制', description: '武家諸法度と参勤交代', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'em-06', name: '鎖国', description: '鎖国政策', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'em-07', name: '江戸時代の社会', description: '身分制度', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'em-08', name: '江戸時代の経済', description: '農業と商業', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'em-09', name: '元禄文化', description: '町人の文化', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'em-10', name: '化政文化', description: '江戸の文化', duration: 45, questionCount: 15, difficulty: 'standard' },
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
              id: 'winter-so2',
              name: '2学期総復習',
              description: '歴史（中世・近世）の復習',
              lessons: [
                { id: 'wso2-01', name: '中世の日本 総復習', description: '総合演習', duration: 55, questionCount: 25, difficulty: 'standard' },
                { id: 'wso2-02', name: '近世の日本 総復習', description: '総合演習', duration: 60, questionCount: 30, difficulty: 'standard' },
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
              id: 'modern-japan-intro',
              name: '近代日本の幕開け',
              description: '幕末～明治維新',
              lessons: [
                { id: 'mji-01', name: '幕末の動乱', description: '黒船来航と開国', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'mji-02', name: '倒幕運動', description: '薩長同盟と大政奉還', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'mji-03', name: '明治維新', description: '新政府の改革', duration: 55, questionCount: 15, difficulty: 'standard' },
                { id: 'mji-04', name: '文明開化', description: '近代化の始まり', duration: 45, questionCount: 12, difficulty: 'standard' },
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
              id: 'year-so2',
              name: '中2社会総復習',
              description: '2年間の総復習',
              lessons: [
                { id: 'yso2-01', name: '日本地理 総復習', description: '総合演習', duration: 55, questionCount: 25, difficulty: 'standard' },
                { id: 'yso2-02', name: '歴史（中世・近世） 総復習', description: '総合演習', duration: 60, questionCount: 30, difficulty: 'standard' },
                { id: 'yso2-03', name: '中2 学年末テスト', description: '総合テスト', duration: 60, questionCount: 30, difficulty: 'advanced' },
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
              id: 'modern-japan',
              name: '近代日本の歩み',
              description: '明治時代～大正時代',
              lessons: [
                { id: 'mdj-01', name: '自由民権運動', description: '国会開設運動', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'mdj-02', name: '大日本帝国憲法', description: '立憲政治の始まり', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'mdj-03', name: '日清戦争', description: '朝鮮問題と戦争', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'mdj-04', name: '日露戦争', description: '帝国主義の時代', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'mdj-05', name: '韓国併合', description: '植民地支配', duration: 45, questionCount: 12, difficulty: 'advanced' },
                { id: 'mdj-06', name: '第一次世界大戦', description: '世界大戦と日本', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'mdj-07', name: '大正デモクラシー', description: '民主主義の高まり', duration: 50, questionCount: 15, difficulty: 'standard' },
              ]
            },
            {
              id: 'contemporary-japan',
              name: '現代の日本と世界',
              description: '昭和時代～現代',
              lessons: [
                { id: 'ctj-01', name: '世界恐慌と日本', description: '経済危機', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'ctj-02', name: '日中戦争', description: '十五年戦争の始まり', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'ctj-03', name: '第二次世界大戦', description: '太平洋戦争', duration: 55, questionCount: 15, difficulty: 'standard' },
                { id: 'ctj-04', name: '戦後の民主化', description: 'GHQと改革', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'ctj-05', name: '日本国憲法', description: '新憲法の制定', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'ctj-06', name: '冷戦と日本', description: '東西対立', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'ctj-07', name: '高度経済成長', description: '奇跡の復興', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'ctj-08', name: '現代の日本', description: '平成・令和の時代', duration: 45, questionCount: 12, difficulty: 'advanced' },
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
              id: 'summer-so3',
              name: '1学期総復習と受験対策',
              description: '歴史の総復習',
              lessons: [
                { id: 'sso3-01', name: '近現代史 総復習', description: '総合演習', duration: 60, questionCount: 30, difficulty: 'standard' },
                { id: 'sso3-02', name: '歴史年表整理', description: '時代の流れ', duration: 55, questionCount: 25, difficulty: 'standard' },
                { id: 'sso3-03', name: '地理分野 総復習', description: '世界・日本地理', duration: 60, questionCount: 30, difficulty: 'standard' },
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
              id: 'modern-society',
              name: '私たちの生活と現代社会',
              description: '公民分野の導入',
              lessons: [
                { id: 'ms-01', name: '現代社会の特色', description: '情報化・グローバル化', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'ms-02', name: '文化と伝統', description: '日本の文化', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'ms-03', name: '現代社会の課題', description: '少子高齢化など', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'human-rights',
              name: '人権と日本国憲法',
              description: '基本的人権の保障',
              lessons: [
                { id: 'hr-01', name: '人権思想の歴史', description: '人権の発達', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'hr-02', name: '日本国憲法の基本原理', description: '三大原則', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'hr-03', name: '平等権', description: '法の下の平等', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'hr-04', name: '自由権', description: '精神・身体・経済の自由', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'hr-05', name: '社会権', description: '生存権・教育を受ける権利', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'hr-06', name: '参政権・請求権', description: '国民の権利', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'hr-07', name: '新しい人権', description: '環境権・プライバシーなど', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'hr-08', name: '国民の義務', description: '三大義務', duration: 40, questionCount: 10, difficulty: 'standard' },
              ]
            },
            {
              id: 'democracy',
              name: '民主政治',
              description: '政治のしくみ',
              lessons: [
                { id: 'dm-01', name: '民主主義とは', description: '民主政治の基本', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'dm-02', name: '選挙制度', description: '選挙のしくみ', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'dm-03', name: '政党と政治', description: '政党政治', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'dm-04', name: '国会のしくみ', description: '立法権', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'dm-05', name: '内閣のしくみ', description: '行政権', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'dm-06', name: '裁判所のしくみ', description: '司法権', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'dm-07', name: '三権分立', description: '権力の抑制と均衡', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'local-government',
              name: '地方自治',
              description: '地方の政治',
              lessons: [
                { id: 'lg-01', name: '地方自治のしくみ', description: '地方公共団体', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'lg-02', name: '地方の財政', description: '地方税と交付金', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'lg-03', name: '住民参加', description: '直接請求権', duration: 45, questionCount: 12, difficulty: 'advanced' },
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
              id: 'winter-intensive-so',
              name: '受験直前対策',
              description: '入試頻出問題演習',
              lessons: [
                { id: 'wiso-01', name: '地理分野 総合演習', description: '入試レベル', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'wiso-02', name: '歴史分野 総合演習', description: '入試レベル', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'wiso-03', name: '公民分野 総合演習', description: '入試レベル', duration: 55, questionCount: 20, difficulty: 'advanced' },
                { id: 'wiso-04', name: '入試模擬テスト①', description: '実戦演習', duration: 60, questionCount: 25, difficulty: 'advanced' },
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
              id: 'economy',
              name: '経済のしくみ',
              description: '経済と生活',
              lessons: [
                { id: 'ec-01', name: '消費と生産', description: '経済活動', duration: 45, questionCount: 15, difficulty: 'standard' },
                { id: 'ec-02', name: '市場のしくみ', description: '価格の決まり方', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'ec-03', name: '企業と労働', description: '会社と働く人', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'ec-04', name: '金融', description: '銀行と日本銀行', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'ec-05', name: '財政', description: '税金と国の予算', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'ec-06', name: '社会保障', description: '福祉のしくみ', duration: 50, questionCount: 15, difficulty: 'advanced' },
              ]
            },
            {
              id: 'international-society',
              name: '国際社会',
              description: '世界と日本',
              lessons: [
                { id: 'is-01', name: '国際社会のしくみ', description: '国家と主権', duration: 45, questionCount: 12, difficulty: 'standard' },
                { id: 'is-02', name: '国際連合', description: '国連のはたらき', duration: 50, questionCount: 15, difficulty: 'standard' },
                { id: 'is-03', name: '国際問題', description: '紛争と環境問題', duration: 50, questionCount: 15, difficulty: 'advanced' },
                { id: 'is-04', name: '日本の国際貢献', description: '平和への取り組み', duration: 45, questionCount: 12, difficulty: 'advanced' },
              ]
            },
            {
              id: 'entrance-exam-so',
              name: '入試対策演習',
              description: '高校入試に向けた総合演習',
              lessons: [
                { id: 'eeso-01', name: '入試模擬テスト②', description: '実戦演習', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'eeso-02', name: '入試模擬テスト③', description: '実戦演習', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'eeso-03', name: '入試模擬テスト④', description: '実戦演習', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'eeso-04', name: '入試模擬テスト⑤', description: '実戦演習', duration: 60, questionCount: 25, difficulty: 'advanced' },
                { id: 'eeso-05', name: '弱点分野補強', description: '個別弱点対策', duration: 55, questionCount: 20, difficulty: 'advanced' },
              ]
            }
          ]
        }
      ]
    }
  ]
};
