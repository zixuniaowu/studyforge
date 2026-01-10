import React, { useState, useEffect, useRef } from 'react';
import { Save, Tag, X, Eye, Edit3 } from 'lucide-react';
import { Note } from '../../types';
import { useLanguageStore } from '../../stores/languageStore';

interface NoteEditorProps {
  note: Note | null;
  onSave: (updates: Partial<Note>) => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave }) => {
  const language = useLanguageStore(state => state.language);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
      setHasChanges(false);
    } else {
      setTitle('');
      setContent('');
      setTags([]);
      setHasChanges(false);
    }
  }, [note?.id]);

  // Auto-save after 1 second of inactivity
  useEffect(() => {
    if (hasChanges && note) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        onSave({ title, content, tags });
        setHasChanges(false);
      }, 1000);
    }
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [title, content, tags, hasChanges, note, onSave]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasChanges(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setHasChanges(true);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
      setHasChanges(true);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
    setHasChanges(true);
  };

  const handleManualSave = () => {
    if (note && hasChanges) {
      onSave({ title, content, tags });
      setHasChanges(false);
    }
  };

  // Simple markdown to HTML conversion for preview
  const renderMarkdown = (text: string) => {
    return text
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-3">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-slate-100 px-1 rounded text-sm">$1</code>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/\n/g, '<br/>');
  };

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Edit3 size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">
            {language === 'ja' ? 'ノートを選択または作成してください' : '选择或创建一篇笔记'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPreview(false)}
            className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              !isPreview
                ? 'bg-cyan-100 text-cyan-700'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Edit3 size={14} className="inline mr-1" />
            {language === 'ja' ? '編集' : '编辑'}
          </button>
          <button
            onClick={() => setIsPreview(true)}
            className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              isPreview
                ? 'bg-cyan-100 text-cyan-700'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Eye size={14} className="inline mr-1" />
            {language === 'ja' ? 'プレビュー' : '预览'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {hasChanges && (
            <span className="text-xs text-amber-600">
              {language === 'ja' ? '未保存の変更あり' : '有未保存的更改'}
            </span>
          )}
          <button
            onClick={handleManualSave}
            disabled={!hasChanges}
            className="flex items-center gap-1 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 text-white text-sm font-medium rounded transition-colors"
          >
            <Save size={14} />
            {language === 'ja' ? '保存' : '保存'}
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="px-6 pt-6">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder={language === 'ja' ? 'タイトルを入力...' : '输入标题...'}
          className="w-full text-2xl font-bold text-slate-800 placeholder-slate-300 border-none outline-none"
        />
      </div>

      {/* Tags */}
      <div className="px-6 py-3 flex items-center gap-2 flex-wrap">
        <Tag size={14} className="text-slate-400" />
        {tags.map((tag, i) => (
          <span
            key={i}
            className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 text-sm rounded group"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="text-slate-400 hover:text-red-500"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
          placeholder={language === 'ja' ? 'タグを追加...' : '添加标签...'}
          className="px-2 py-0.5 text-sm border border-dashed border-slate-300 rounded outline-none focus:border-cyan-500"
        />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 overflow-hidden">
        {isPreview ? (
          <div
            className="h-full overflow-y-auto prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        ) : (
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder={language === 'ja' ? 'Markdown でノートを書く...' : '用 Markdown 写笔记...'}
            className="w-full h-full resize-none text-slate-700 placeholder-slate-300 border-none outline-none font-mono text-sm leading-relaxed"
          />
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
