import React from 'react';
import { FileText, X, ArrowRight } from 'lucide-react';
import { useSupport } from '../context/SupportContext';
import { KBArticle } from '../types/support';

interface CopyChoiceModalProps {
  article: KBArticle;
}

export const CopyChoiceModal: React.FC<CopyChoiceModalProps> = ({ article }) => {
  const {
    isCopyChoiceModalOpen,
    setIsCopyChoiceModalOpen,
    copyArticleSolutionToReply,
    selectedTicket,
    setActiveNav,
  } = useSupport();

  if (!isCopyChoiceModalOpen) return null;

  const handleAppend = () => {
    copyArticleSolutionToReply(article, 'append');
    setIsCopyChoiceModalOpen(false);
  };

  const handleReplace = () => {
    copyArticleSolutionToReply(article, 'replace');
    setIsCopyChoiceModalOpen(false);
  };

  const handleCopyAndGoToTicket = () => {
    copyArticleSolutionToReply(article, 'append');
    setIsCopyChoiceModalOpen(false);
    setActiveNav('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 relative animate-in zoom-in-95"
        role="dialog"
        aria-modal="true"
        aria-labelledby="copy-choice-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-800" />
            <h2 id="copy-choice-title" className="text-lg font-bold text-gray-900">
              Copy Solution to Ticket Reply
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCopyChoiceModalOpen(false)}
            className="text-gray-400 hover:text-black p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-3.5 leading-relaxed">
          You already have an existing draft in your reply composer for ticket{' '}
          <strong className="text-black font-semibold">{selectedTicket.id}</strong> (
          {selectedTicket.title}). How would you like to apply the troubleshooting guide?
        </p>

        {/* Choice Options */}
        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={handleAppend}
            className="w-full p-3.5 border border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 text-left transition-all text-sm font-semibold text-gray-900 cursor-pointer shadow-2xs"
          >
            <div className="font-bold text-gray-950">Append to Existing Draft</div>
            <div className="text-xs text-gray-500 font-normal mt-1">
              Preserves what you typed and attaches the solution steps below it.
            </div>
          </button>

          <button
            type="button"
            onClick={handleReplace}
            className="w-full p-3.5 border border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 text-left transition-all text-sm font-semibold text-gray-900 cursor-pointer shadow-2xs"
          >
            <div className="font-bold text-gray-950">Replace Draft Completely</div>
            <div className="text-xs text-gray-500 font-normal mt-1">
              Overwrites the current draft with the standard troubleshooting template.
            </div>
          </button>

          <button
            type="button"
            onClick={handleCopyAndGoToTicket}
            className="w-full p-3.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-left transition-all text-sm font-semibold flex items-center justify-between cursor-pointer shadow-2xs"
          >
            <div>
              <div className="font-bold text-white">Copy & Open Ticket {selectedTicket.id}</div>
              <div className="text-xs text-gray-300 font-normal mt-1">
                Appends solution and switches directly to ticket reply workspace.
              </div>
            </div>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* Cancel */}
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => setIsCopyChoiceModalOpen(false)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
