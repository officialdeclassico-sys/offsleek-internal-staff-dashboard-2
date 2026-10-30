import React, { useState } from 'react';
import { Edit3, X, Loader2, CheckCircle2 } from 'lucide-react';
import { useSupport } from '../context/SupportContext';
import { KBArticle } from '../types/support';

interface SuggestUpdateModalProps {
  article: KBArticle;
}

export const SuggestUpdateModal: React.FC<SuggestUpdateModalProps> = ({ article }) => {
  const {
    isSuggestUpdateModalOpen,
    setIsSuggestUpdateModalOpen,
    submitArticleUpdateSuggestion,
  } = useSupport();

  const [proposedCorrection, setProposedCorrection] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isSuggestUpdateModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposedCorrection.trim()) {
      setValidationError('Please describe the proposed correction or new steps.');
      return;
    }
    if (!reason.trim()) {
      setValidationError('Please provide the reason why this update is needed.');
      return;
    }

    setValidationError(null);
    setIsSubmitting(true);
    await submitArticleUpdateSuggestion(article.id, proposedCorrection.trim(), reason.trim());
    setIsSubmitting(false);
    setIsSuggestUpdateModalOpen(false);
    setProposedCorrection('');
    setReason('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg p-6 relative animate-in zoom-in-95"
        role="dialog"
        aria-modal="true"
        aria-labelledby="suggest-modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-gray-800" />
            <h2 id="suggest-modal-title" className="text-lg font-bold text-gray-900">
              Suggest an Article Update
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsSuggestUpdateModalOpen(false)}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-black p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Title Banner */}
        <div className="mt-3.5 p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
          <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">
            Target Article
          </span>
          <div className="text-sm font-bold text-gray-900 mt-1">{article.title}</div>
          <div className="text-xs text-gray-500 mt-0.5">
            Version {article.version} &bull; {article.category}
          </div>
        </div>

        {/* Suggestion Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Proposed Content or Correction
            </label>
            <textarea
              rows={3}
              value={proposedCorrection}
              onChange={(e) => setProposedCorrection(e.target.value)}
              placeholder="Detail the technical correction, missing step, or revised wording..."
              className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:border-black focus:outline-none leading-relaxed placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Reason / Source for Update
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Recent IdP release changed error code mapping; customer ticket ISS #1023 resolution."
              className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:border-black focus:outline-none leading-relaxed placeholder:text-gray-400"
            />
          </div>

          {validationError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {validationError}
            </div>
          )}

          <div className="text-xs text-gray-500 leading-relaxed">
            Note: Suggestions are queued for Lead Technical Review and do not directly modify published articles.
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setIsSuggestUpdateModalOpen(false)}
              disabled={isSubmitting}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-2xs cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Suggestion</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
