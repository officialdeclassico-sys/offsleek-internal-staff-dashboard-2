import React, { useState } from 'react';
import { Search, Eye, ChevronRight } from 'lucide-react';
import { useSupport } from '../context/SupportContext';

export const KnowledgeBaseView: React.FC = () => {
  const { articles, selectArticle } = useSupport();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Login & Access',
    'Security',
    'User Management',
    'Troubleshooting',
    'Billing & Fees',
    'Admissions',
  ];

  const filteredArticles = articles.filter((article) => {
    if (selectedCategory !== 'All' && article.category !== selectedCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        article.title.toLowerCase().includes(q) ||
        article.description?.toLowerCase().includes(q) ||
        article.summary?.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
          Support Knowledge Base
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Technical runbooks, role resolution guides, and institutional troubleshooting docs.
        </p>
      </div>

      {/* Search and Categories */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4.5 shadow-2xs space-y-3.5">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guides, error codes (e.g. 403), or policies..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-normal text-gray-900 focus:bg-white focus:border-black focus:outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-black text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => {
              selectArticle(article.id);
            }}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs hover:border-black transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2.5">
                <span className="font-semibold text-gray-700 px-2.5 py-0.5 rounded-md bg-gray-100 border border-gray-200">
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-gray-400" />
                  <span>{article.views} reads</span>
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-950 group-hover:text-black leading-snug">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">
                {article.description || article.summary || article.overview}
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                {article.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-black flex items-center gap-1">
                <span>Read article</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
