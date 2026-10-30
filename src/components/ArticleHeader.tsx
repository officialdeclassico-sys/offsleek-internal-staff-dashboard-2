import React from 'react';
import { ArrowLeft, FileText, Edit3, Eye, Clock } from 'lucide-react';
import { useSupport } from '../context/SupportContext';
import { KBArticle } from '../types/support';

interface ArticleHeaderProps {
  article: KBArticle;
  onBack: () => void;
  onCopyClick: () => void;
  onSuggestClick: () => void;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  article,
  onBack,
  onCopyClick,
  onSuggestClick,
}) => {
  return (
    <div className="mb-6">
      {/* Back to Knowledge Base Link */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black font-semibold mb-3.5 transition-colors group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-black transition-transform group-hover:-translate-x-0.5" />
        <span>Back to Knowledge Base</span>
      </button>

      {/* Main Title Row with Header Actions */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="flex-1 min-w-0 pr-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight leading-tight">
            {article.title}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2 leading-relaxed font-normal">
            {article.description}
          </p>

          {/* Metadata badges row */}
          <div className="flex flex-wrap items-center gap-2.5 mt-3.5 text-xs text-gray-500">
            {/* Category badge */}
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-100">
              {article.category}
            </span>
            <span className="text-gray-300 font-bold">&bull;</span>
            <span className="text-gray-600 text-xs font-medium">Updated {article.updatedAt}</span>
            <span className="text-gray-300 font-bold">&bull;</span>
            <span className="flex items-center gap-1.5 text-gray-600 text-xs font-medium">
              <Eye className="w-3.5 h-3.5 text-gray-400" />
              <span>{article.views} views</span>
            </span>
            <span className="text-gray-300 font-bold">&bull;</span>
            <span className="text-gray-600 text-xs font-medium">{article.readTime}</span>
          </div>
        </div>

        {/* Action Buttons: Copy to Reply & Suggest an Update */}
        <div className="flex items-center gap-3 shrink-0 self-start mt-1 no-print">
          <button
            type="button"
            onClick={onCopyClick}
            className="px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            title="Copy troubleshooting guide into current ticket reply"
          >
            <FileText className="w-4 h-4 text-gray-700" />
            <span>Copy to Reply</span>
          </button>

          <button
            type="button"
            onClick={onSuggestClick}
            className="px-4 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            title="Propose a correction or revision to this article"
          >
            <Edit3 className="w-4 h-4" />
            <span>Suggest an Update</span>
          </button>
        </div>
      </div>
    </div>
  );
};
