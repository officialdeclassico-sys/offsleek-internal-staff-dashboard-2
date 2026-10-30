import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, X, Loader2 } from 'lucide-react';
import { useSupport } from '../context/SupportContext';

export const ResolveModal: React.FC = () => {
  const {
    isResolveModalOpen,
    setIsResolveModalOpen,
    selectedTicket,
    resolveTicket,
  } = useSupport();

  const [resolutionSummary, setResolutionSummary] = useState(
    'Fixed faculty role configuration in identity provider and confirmed access.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isResolveModalOpen) return null;

  const handleConfirm = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await resolveTicket(selectedTicket.id, resolutionSummary.trim() || undefined);
    setIsSubmitting(false);
    setIsResolveModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 relative animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-gray-900">Resolve Ticket</h2>
          </div>
          <button
            onClick={() => setIsResolveModalOpen(false)}
            className="text-gray-400 hover:text-black p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning / Confirmation notice */}
        <div className="mt-3.5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-sm text-amber-900 leading-relaxed">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p>
            You are about to mark <span className="font-bold">{selectedTicket.id}</span> ({selectedTicket.title}) as <strong>Resolved</strong>. The school contact ({selectedTicket.school.contactPerson}) will receive a resolution confirmation notice.
          </p>
        </div>

        {/* Resolution Summary input */}
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">
            Resolution Summary / Root Cause (Appended to internal records)
          </label>
          <textarea
            rows={3}
            value={resolutionSummary}
            onChange={(e) => setResolutionSummary(e.target.value)}
            placeholder="Explain how the issue was fixed..."
            className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none placeholder:text-gray-400 leading-relaxed"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setIsResolveModalOpen(false)}
            disabled={isSubmitting}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-2xs cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Resolving...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Resolution</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
