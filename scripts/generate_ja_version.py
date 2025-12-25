#!/usr/bin/env python3
"""Generate Japanese version of question banks by translating Chinese content"""

import json
import re

# Common translation mappings
TRANSLATIONS = {
    # Common phrases
    "一家公司": "ある企業",
    "公司": "企業",
    "想要": "したいと考えています",
    "需要": "必要があります",
    "应该使用": "を使用すべきです",
    "应该": "すべきです",
    "什么": "何",
    "哪个": "どの",
    "哪种": "どのような",
    "如何": "どのように",
    "为什么": "なぜ",
    "以下": "以下の",
    "最佳": "最適な",
    "最有效": "最も効果的",
    "正确": "正しい",
    "错误": "間違い",
    "使用": "使用する",
    "训练": "訓練",
    "部署": "デプロイ",
    "模型": "モデル",
    "数据": "データ",
    "预测": "予測",
    "分类": "分類",
    "检测": "検出",
    "识别": "認識",
    "分析": "分析",
    "处理": "処理",
    "服务": "サービス",
    "功能": "機能",
    "资源": "リソース",
    "端点": "エンドポイント",
    "容器": "コンテナ",
    "密钥": "キー",
    "安全": "セキュリティ",
    "监控": "監視",
    "日志": "ログ",
    "配置": "設定",
    "创建": "作成",
    "管理": "管理",
    "存储": "ストレージ",
    "文档": "ドキュメント",
    "图像": "画像",
    "视频": "ビデオ",
    "文本": "テキスト",
    "语音": "音声",
    "翻译": "翻訳",
    "搜索": "検索",
    "索引": "インデックス",
    "查询": "クエリ",
    "实体": "エンティティ",
    "意图": "インテント",
    "特征": "特徴",
    "向量": "ベクトル",
    "嵌入": "埋め込み",
    "微调": "ファインチューニング",
    "推理": "推論",
    "批量": "バッチ",
    "实时": "リアルタイム",
    "延迟": "レイテンシ",
    "成本": "コスト",
    "性能": "パフォーマンス",
    "准确率": "精度",
    "损失": "損失",
    "过拟合": "過学習",
    "欠拟合": "アンダーフィッティング",
    "正则化": "正則化",
    "超参数": "ハイパーパラメータ",
    "学习率": "学習率",
    "优化器": "オプティマイザ",
    "激活函数": "活性化関数",
    "神经网络": "ニューラルネットワーク",
    "深度学习": "ディープラーニング",
    "机器学习": "機械学習",
    "人工智能": "人工知能",
    "生成式AI": "生成AI",
    "大语言模型": "大規模言語モデル",
    "自然语言": "自然言語",
    "计算机视觉": "コンピュータビジョン",
    "语音识别": "音声認識",
    "情感分析": "感情分析",
    "命名实体识别": "固有表現認識",
    "问答": "質問応答",
    "摘要": "要約",
    "聊天机器人": "チャットボット",
    "对话": "対話",
    "知识库": "ナレッジベース",
    "检索": "検索",
    "增强": "拡張",
    "管道": "パイプライン",
    "工作流": "ワークフロー",
    "自动化": "自動化",
    "编排": "オーケストレーション",
    "验证": "検証",
    "评估": "評価",
    "测试": "テスト",
    "开发": "開発",
    "生产": "本番",
    "环境": "環境",
    "版本": "バージョン",
    "回滚": "ロールバック",
    "监控": "モニタリング",
    "漂移": "ドリフト",
    "警报": "アラート",
    "触发": "トリガー",
    "调度": "スケジューリング",
    "缩放": "スケーリング",
    "负载均衡": "ロードバランシング",
    "边缘": "エッジ",
    "离线": "オフライン",
    "在线": "オンライン",
    "云端": "クラウド",
    "本地": "オンプレミス",
    "混合": "ハイブリッド",
    "多云": "マルチクラウド",
    "隐私": "プライバシー",
    "合规": "コンプライアンス",
    "治理": "ガバナンス",
    "偏见": "バイアス",
    "公平性": "公平性",
    "透明度": "透明性",
    "可解释性": "説明可能性",
    "负责任": "責任ある",

    # Answer format
    "**答案**:": "**解答**:",
    "**解析**:": "**解説**:",

    # Domain names
    "Plan and manage": "計画と管理",
    "Implement": "実装",
    "decision support": "意思決定支援",
    "vision solutions": "ビジョンソリューション",
    "natural language processing": "自然言語処理",
    "knowledge mining": "ナレッジマイニング",
    "document intelligence": "ドキュメントインテリジェンス",
    "generative AI": "生成AI",

    # GCP specific
    "Architecting ML Solutions": "MLソリューションのアーキテクチャ",
    "Data Preparation and Processing": "データ準備と処理",
    "Developing ML Models": "MLモデルの開発",
    "Training and Evaluating": "訓練と評価",
    "Deploying and Scaling": "デプロイとスケーリング",
    "Pipeline Automation": "パイプライン自動化",
    "Orchestration": "オーケストレーション",
}


def translate_text(text: str) -> str:
    """Apply translation mappings to text"""
    result = text
    for zh, ja in sorted(TRANSLATIONS.items(), key=lambda x: -len(x[0])):
        result = result.replace(zh, ja)
    return result


def translate_exam(exam_data: dict, new_id: str, new_name: str) -> dict:
    """Translate exam metadata to Japanese"""
    return {
        'id': new_id,
        'name': new_name,
        'code': exam_data['code'],
        'provider': exam_data['provider'],
        'language': 'ja',
        'description': translate_text(exam_data.get('description', '')).replace('模拟题', '模擬問題'),
        'totalQuestions': exam_data['totalQuestions'],
        'passingScore': exam_data['passingScore'],
        'examTime': exam_data['examTime'],
        'domains': [
            {
                'id': d['id'],
                'name': translate_text(d['name']),
                'weight': d['weight']
            } for d in exam_data.get('domains', [])
        ],
        'tags': [exam_data['provider'], 'AI', 'ML', '認定試験']
    }


def translate_question(q: dict) -> dict:
    """Translate a question to Japanese"""
    return {
        'id': q['id'],
        'domain': q['domain'],
        'question': translate_text(q['question']),
        'options': {k: translate_text(v) for k, v in q['options'].items()},
        'answer': q['answer'],
        'answerType': q['answerType'],
        'explanation': translate_text(q['explanation']),
        'difficulty': q['difficulty']
    }


def create_japanese_version(input_path: str, output_path: str, new_id: str, new_name: str):
    """Create Japanese version of an exam JSON file"""
    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    translated = {
        'exam': translate_exam(data['exam'], new_id, new_name),
        'questions': [translate_question(q) for q in data['questions']]
    }

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(translated, f, ensure_ascii=False, indent=2)

    print(f"Created {output_path}")


def main():
    base_path = '/home/zixuniaowu/dev/studyforge/web/public/sample-data'

    # Azure AI-102 Japanese (3 sets)
    for i in range(1, 4):
        create_japanese_version(
            f'{base_path}/azure-ai-102-set{i}.json',
            f'{base_path}/azure-ai-102-set{i}-ja.json',
            f'azure-ai-102-set{i}-ja',
            f'Azure AI-102 模擬試験 #{i}'
        )

    # GCP ML Engineer Japanese (3 sets)
    for i in range(1, 4):
        create_japanese_version(
            f'{base_path}/gcp-ml-engineer-set{i}.json',
            f'{base_path}/gcp-ml-engineer-set{i}-ja.json',
            f'gcp-ml-engineer-set{i}-ja',
            f'GCP ML Engineer 模擬試験 #{i}'
        )


if __name__ == '__main__':
    main()
