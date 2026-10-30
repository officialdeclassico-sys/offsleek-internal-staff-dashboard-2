import React, { useState } from 'react';
import { Send, Loader2, Paperclip, X } from 'lucide-react';
import { useSupport } from '../context/SupportContext';

export const ReviewReplyModal: React.FC = () => {
  const {
    isReviewModalOpen,
    setIsReviewModalOpen,
    replyDraft,
    replyAttachments,
    selectedTicket,
    sendReply,
  } = useSupport();

  const [confirmed, setConfirmed] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isReviewModalOpen) return null;

  const handleCancel = () => {
    setIsReviewModalOpen(false);
    setConfirmed(false);
    setErrorMessage(null);
    // Draft is preserved in SupportContext!
  };

  const handleSend = async () => {
    if (!confirmed || isSending) return;

    setIsSending(true);
    setErrorMessage(null);

    try {
      const res = await sendReply(selectedTicket.id, replyDraft, replyAttachments);
      if (res.success) {
        setIsReviewModalOpen(false);
        setConfirmed(false);
      } else {
        setErrorMessage(res.error || 'Failed to send reply. Please try again.');
      }
    } catch {
      setErrorMessage('A network error occurred while dispatching the message.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg p-6 relative animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-gray-900">
              Review Reply
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Please review your reply before sending it to the school.
            </p>
          </div>
          <button
            onClick={handleCancel}
            disabled={isSending}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message preview box */}
        <div className="mt-4 p-4 bg-gray-50/80 border border-gray-200 rounded-xl text-sm text-gray-800 leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap font-sans">
          {replyDraft}

          {/* Attachments preview if any */}
          {replyAttachments.length > 0 && (
            <div className="mt-3.5 pt-3.5 border-t border-gray-200 space-y-2">
              <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">
                Attached files:
              </span>
              {replyAttachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg text-sm"
                >
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold text-gray-900">{att.name}</span>
                  <span className="text-gray-500 text-xs">({att.size})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        {/* Required Confirmation Checkbox */}
        <div className="mt-4 flex items-start gap-3">
          <input
            id="review-confirm"
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            disabled={isSending}
            className="mt-0.5 w-4 h-4 rounded text-black border-gray-300 focus:ring-black cursor-pointer"
          />
          <label
            htmlFor="review-confirm"
            className="text-sm text-gray-700 select-none cursor-pointer leading-snug"
          >
            I have reviewed the message and confirm it is accurate and appropriate to send to the school.
          </label>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSending}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={!confirmed || isSending}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-white transition-all ${
              confirmed && !isSending
                ? 'bg-black hover:bg-neutral-800 shadow-2xs cursor-pointer'
                : 'bg-black/40 cursor-not-allowed'
            }`}
          >
            {isSending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Reply</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
