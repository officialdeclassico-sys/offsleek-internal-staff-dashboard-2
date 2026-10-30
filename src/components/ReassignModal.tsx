import React, { useState } from 'react';
import { Users, X, Check, Loader2 } from 'lucide-react';
import { useSupport } from '../context/SupportContext';

export const ReassignModal: React.FC = () => {
  const {
    isReassignModalOpen,
    setIsReassignModalOpen,
    selectedTicket,
    teamMembers,
    reassignTicket,
  } = useSupport();

  const [selectedEmpId, setSelectedEmpId] = useState(selectedTicket.assignedTo.id);
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isReassignModalOpen) return null;

  const handleConfirm = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await reassignTicket(selectedTicket.id, selectedEmpId, reason.trim() || undefined);
    setIsSubmitting(false);
    setIsReassignModalOpen(false);
    setReason('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md p-6 relative animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-800" />
            <h2 className="text-lg font-bold text-gray-900">Reassign Ticket</h2>
          </div>
          <button
            onClick={() => setIsReassignModalOpen(false)}
            className="text-gray-400 hover:text-black p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Select an authorized support engineer to take ownership of{' '}
          <span className="font-semibold text-gray-800">{selectedTicket.id}</span>.
        </p>

        {/* Support Team Member List */}
        <div className="mt-4 space-y-2 max-h-56 overflow-y-auto">
          {teamMembers.map((member) => {
            const isSelected = selectedEmpId === member.id;
            return (
              <button
                key={member.id}
                type="button"
                onClick={() => setSelectedEmpId(member.id)}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'border-black bg-gray-50 shadow-2xs'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-sm">
                    {member.avatarText}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                      <span>{member.name}</span>
                      {member.id === selectedTicket.assignedTo.id && (
                        <span className="text-xs text-gray-500 font-normal">
                          (Current)
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{member.role}</div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Reason / Handover Note */}
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Handover Note / Reassignment Reason (Optional)
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., Escalating Tier-2 permissions issue..."
            className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:border-black focus:outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setIsReassignModalOpen(false)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="px-4 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-lg text-sm font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Reassigning...</span>
              </>
            ) : (
              <span>Confirm Reassignment</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
