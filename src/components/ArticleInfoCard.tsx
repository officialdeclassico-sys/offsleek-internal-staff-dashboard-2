import React from 'react';
import { FileText } from 'lucide-react';
import { KBArticle } from '../types/support';

interface ArticleInfoCardProps {
  article: KBArticle;
}

export const ArticleInfoCard: React.FC<ArticleInfoCardProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
        <FileText className="w-4.5 h-4.5 text-gray-800" />
        <h3 className="font-bold text-base text-gray-950 tracking-tight">
          Article Information
        </h3>
      </div>

      {/* Key-Value Details */}
      <div className="space-y-3.5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Category</span>
          <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-100">
            {article.category}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Article Type</span>
          <span className="font-semibold text-gray-900 text-sm">{article.articleType}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Published On</span>
          <span className="text-gray-700 font-medium text-sm">{article.publishedOn}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Last Updated</span>
          <span className="text-gray-700 font-medium text-sm">{article.updatedAt}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Views</span>
          <span className="font-bold text-gray-950 text-sm">{article.views}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Author</span>
          <span className="font-semibold text-gray-900 text-sm">{article.author}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Status</span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-xs border border-emerald-200">
            {article.status}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Version</span>
          <span className="font-mono font-semibold text-gray-800 text-sm">{article.version}</span>
        </div>
      </div>
    </div>
  );
};
