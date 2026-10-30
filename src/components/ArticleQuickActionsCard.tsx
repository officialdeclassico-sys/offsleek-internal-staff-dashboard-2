import React from 'react';
import { PlusCircle, FileText, Edit3, Printer, Link2 } from 'lucide-react';
import { useSupport } from '../context/SupportContext';
import { KBArticle } from '../types/support';

interface ArticleQuickActionsCardProps {
  article: KBArticle;
  onCopyClick: () => void;
  onSuggestClick: () => void;
}

export const ArticleQuickActionsCard: React.FC<ArticleQuickActionsCardProps> = ({
  article,
  onCopyClick,
  onSuggestClick,
}) => {
  const { showToast } = useSupport();

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    try {
      const url = `${window.location.origin}/#kb/${article.id}`;
      await navigator.clipboard.writeText(url);
      showToast('Article link copied to clipboard', 'success');
    } catch {
      showToast('Could not copy link to clipboard', 'error');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs no-print">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
        <PlusCircle className="w-4.5 h-4.5 text-gray-800" />
        <h3 className="font-bold text-base text-gray-950 tracking-tight">
          Quick Actions
        </h3>
      </div>

      {/* 4 Stacked Action Buttons */}
      <div className="space-y-2.5">
        {/* Action 1: Copy to Reply */}
        <button
          type="button"
          onClick={onCopyClick}
          className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-left text-sm font-semibold text-gray-800 cursor-pointer shadow-2xs group"
        >
          <FileText className="w-4.5 h-4.5 text-gray-600 group-hover:text-black shrink-0" />
          <span>Copy to Reply</span>
        </button>

        {/* Action 2: Suggest an Update */}
        <button
          type="button"
          onClick={onSuggestClick}
          className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-left text-sm font-semibold text-gray-800 cursor-pointer shadow-2xs group"
        >
          <Edit3 className="w-4.5 h-4.5 text-gray-600 group-hover:text-black shrink-0" />
          <span>Suggest an Update</span>
        </button>

        {/* Action 3: Print Article */}
        <button
          type="button"
          onClick={handlePrint}
          className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-left text-sm font-semibold text-gray-800 cursor-pointer shadow-2xs group"
        >
          <Printer className="w-4.5 h-4.5 text-gray-600 group-hover:text-black shrink-0" />
          <span>Print Article</span>
        </button>

        {/* Action 4: Share Link */}
        <button
          type="button"
          onClick={handleShare}
          className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-left text-sm font-semibold text-gray-800 cursor-pointer shadow-2xs group"
        >
          <Link2 className="w-4.5 h-4.5 text-gray-600 group-hover:text-black shrink-0" />
          <span>Share Link</span>
        </button>
      </div>
    </div>
  );
};
