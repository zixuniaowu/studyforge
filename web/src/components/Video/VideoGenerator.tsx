import React, { useState, useEffect, useCallback } from 'react';
import { Video, Loader2, CheckCircle, XCircle, Download, Play } from 'lucide-react';
import { api } from '../../lib/api';
import { useLanguageStore, useT } from '../../stores/languageStore';

interface Props {
  questionId: string;
  examId: string;
  onClose?: () => void;
}

type JobStatus = 'idle' | 'pending' | 'processing' | 'completed' | 'failed';

export const VideoGenerator: React.FC<Props> = ({ questionId, examId, onClose }) => {
  const [status, setStatus] = useState<JobStatus>('idle');
  const [jobId, setJobId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [includeExplanation, setIncludeExplanation] = useState(true);

  const { language } = useLanguageStore();
  const t = useT();

  const languageCode = language === 'ja' ? 'ja-JP' : 'zh-CN';

  const startGeneration = async () => {
    setStatus('pending');
    setError(null);
    setProgress(0);
    setVideoUrl(null);

    try {
      const result = await api.generateVideo({
        questionId,
        examId,
        language: languageCode,
        includeExplanation,
      });
      setJobId(result.jobId);
      setStatus('processing');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start video generation');
      setStatus('failed');
    }
  };

  const checkStatus = useCallback(async () => {
    if (!jobId || status !== 'processing') return;

    try {
      const result = await api.getVideoStatus(jobId);
      setProgress(result.progress || 0);

      if (result.status === 'completed' && result.videoUrl) {
        setVideoUrl(result.videoUrl);
        setStatus('completed');
      } else if (result.status === 'failed') {
        setError(result.error || 'Video generation failed');
        setStatus('failed');
      }
    } catch (err) {
      console.error('Failed to check video status:', err);
    }
  }, [jobId, status]);

  // Poll for status updates
  useEffect(() => {
    if (status !== 'processing') return;

    const interval = setInterval(checkStatus, 2000);
    return () => clearInterval(interval);
  }, [status, checkStatus]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-xl">
          <Video className="text-purple-600" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t.video?.title || '生成解析视频'}
          </h3>
          <p className="text-sm text-gray-500">
            {t.video?.description || '自动生成题目讲解视频'}
          </p>
        </div>
      </div>

      {status === 'idle' && (
        <div className="space-y-4">
          {/* Options */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeExplanation}
              onChange={(e) => setIncludeExplanation(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">
              {t.video?.includeExplanation || '包含解析说明'}
            </span>
          </label>

          {/* Generate button */}
          <button
            onClick={startGeneration}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <Play size={20} />
            {t.video?.generate || '开始生成'}
          </button>
        </div>
      )}

      {(status === 'pending' || status === 'processing') && (
        <div className="space-y-4">
          {/* Progress */}
          <div className="flex items-center gap-3">
            <Loader2 className="animate-spin text-purple-600" size={24} />
            <span className="text-gray-700">
              {status === 'pending'
                ? (t.video?.preparing || '准备中...')
                : (t.video?.processing || '生成中...')}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 text-center">{progress}%</p>
        </div>
      )}

      {status === 'completed' && videoUrl && (
        <div className="space-y-4">
          {/* Success message */}
          <div className="flex items-center gap-3 text-green-600">
            <CheckCircle size={24} />
            <span className="font-medium">
              {t.video?.completed || '视频生成完成'}
            </span>
          </div>

          {/* Video preview */}
          <video
            src={videoUrl}
            controls
            className="w-full rounded-lg"
            poster=""
          />

          {/* Download button */}
          <a
            href={videoUrl}
            download={`question-${questionId}.mp4`}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Download size={20} />
            {t.video?.download || '下载视频'}
          </a>
        </div>
      )}

      {status === 'failed' && (
        <div className="space-y-4">
          {/* Error message */}
          <div className="flex items-center gap-3 text-red-600">
            <XCircle size={24} />
            <span className="font-medium">{error || (t.video?.failed || '生成失败')}</span>
          </div>

          {/* Retry button */}
          <button
            onClick={startGeneration}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            {t.common.retry}
          </button>
        </div>
      )}

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          {t.common.cancel}
        </button>
      )}
    </div>
  );
};
