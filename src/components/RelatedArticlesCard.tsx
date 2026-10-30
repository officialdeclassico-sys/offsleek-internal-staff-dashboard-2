import React from 'react';
import { Building2, FileText, Eye, ChevronRight } from 'lucide-react';
import { useSupport } from '../context/SupportContext';
import { KBArticle } from '../types/support';

interface RelatedArticlesCardProps {
  currentArticle: KBArticle;
}

export const RelatedArticlesCard: React.FC<RelatedArticlesCardProps> = ({ currentArticle }) => {
  const { articles, selectArticle } = useSupport();

  // Find related articles by relatedArticleIds or category or exclude current
  const relatedArticles = currentArticle.relatedArticleIds
    ? articles.filter((a) => currentArticle.relatedArticleIds?.includes(a.id))
    : articles.filter((a) => a.id !== currentArticle.id).slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs no-print">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-100">
        <Building2 className="w-4.5 h-4.5 text-gray-800" />
        <h3 className="font-bold text-base text-gray-950 tracking-tight">
          Related Articles
        </h3>
      </div>

      {/* List of Related Articles */}
      <div className="divide-y divide-gray-100">
        {relatedArticles.map((rel) => (
          <button
            key={rel.id}
            type="button"
            onClick={() => {
              selectArticle(rel.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full text-left py-3 px-1.5 hover:bg-gray-50 rounded-xl flex items-center justify-between transition-colors group cursor-pointer"
          >
            <div className="flex items-start gap-3 min-w-0 pr-2">
              <FileText className="w-4.5 h-4.5 text-gray-400 group-hover:text-black shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900 group-hover:text-black line-clamp-1">
                  {rel.title}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                  <Eye className="w-3.5 h-3.5 text-gray-400" />
                  <span>{rel.views} views</span>
                </div>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-black shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  );
};
