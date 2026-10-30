import React, { useState } from 'react';
import { useSupport } from '../context/SupportContext';
import { ArticleHeader } from '../components/ArticleHeader';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleInfoCard } from '../components/ArticleInfoCard';
import { ArticleQuickActionsCard } from '../components/ArticleQuickActionsCard';
import { RelatedArticlesCard } from '../components/RelatedArticlesCard';
import { SuggestUpdateModal } from '../components/SuggestUpdateModal';
import { CopyChoiceModal } from '../components/CopyChoiceModal';
import { KnowledgeBaseView } from './KnowledgeBaseView';

export const KnowledgeBaseDetailView: React.FC = () => {
  const {
    selectedArticle,
    replyDraft,
    copyArticleSolutionToReply,
    setIsSuggestUpdateModalOpen,
    setIsCopyChoiceModalOpen,
  } = useSupport();

  // State to switch between Article Details and the full Knowledge Base catalog
  const [showCatalog, setShowCatalog] = useState(false);

  const handleCopyClick = () => {
    if (replyDraft.trim()) {
      setIsCopyChoiceModalOpen(true);
    } else {
      copyArticleSolutionToReply(selectedArticle, 'replace');
    }
  };

  const handleSuggestClick = () => {
    setIsSuggestUpdateModalOpen(true);
  };

  if (showCatalog) {
    return (
      <div>
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowCatalog(false)}
            className="text-xs text-gray-500 hover:text-black font-semibold flex items-center gap-1.5"
          >
            <span>&larr; Return to Article: {selectedArticle.title}</span>
          </button>
        </div>
        <KnowledgeBaseView />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 2-Column Responsive Layout matching reference screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Article Details & Step-by-Step Guide (~8 cols on desktop) */}
        <div className="lg:col-span-8 min-w-0 print-content-only">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-2xs">
            {/* Header */}
            <ArticleHeader
              article={selectedArticle}
              onBack={() => setShowCatalog(true)}
              onCopyClick={handleCopyClick}
              onSuggestClick={handleSuggestClick}
            />

            {/* Content Sections: Overview, Symptoms, Causes, Steps */}
            <ArticleBody article={selectedArticle} />
          </div>
        </div>

        {/* Right: Article Information, Quick Actions, Related Articles (~4 cols on desktop) */}
        <div className="lg:col-span-4 space-y-4 no-print">
          <ArticleInfoCard article={selectedArticle} />
          <ArticleQuickActionsCard
            article={selectedArticle}
            onCopyClick={handleCopyClick}
            onSuggestClick={handleSuggestClick}
          />
          <RelatedArticlesCard currentArticle={selectedArticle} />
        </div>
      </div>

      {/* Suggest Update Modal */}
      <SuggestUpdateModal article={selectedArticle} />

      {/* Copy to Reply Choice Modal */}
      <CopyChoiceModal article={selectedArticle} />
    </div>
  );
};
