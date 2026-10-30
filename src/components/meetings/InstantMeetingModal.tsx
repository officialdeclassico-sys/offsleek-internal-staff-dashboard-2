import React, { useState } from 'react';
import { X, Video, Users, Copy, Check, ArrowRight } from 'lucide-react';
import { useMeetings } from '../../context/MeetingContext';

export const InstantMeetingModal: React.FC = () => {
  const {
    isInstantModalOpen,
    setIsInstantModalOpen,
    availableParticipants,
    startInstantMeeting,
    copyMeetingLink,
  } = useMeetings();

  const [title, setTitle] = useState("Neha's Instant Sync");
  const [selectedIds, setSelectedIds] = useState<string[]>(['EMP-1006']);
  const [generatedMeeting, setGeneratedMeeting] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isInstantModalOpen) return null;

  const handleToggle = (id: string) => {
    if (id === 'EMP-1006') return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCreateAndJoin = () => {
    const meeting = startInstantMeeting(title, selectedIds);
    setGeneratedMeeting(meeting);
    setIsInstantModalOpen(false);
  };

  const handleCopy = async (url: string) => {
    await copyMeetingLink(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={() => setIsInstantModalOpen(false)}
    >
      <div
        className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#fbfbfb]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-950">Start Instant Meeting</h3>
              <p className="text-xs text-gray-500 font-medium">Quick room creation with internal link</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsInstantModalOpen(false)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4.5 text-sm">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Meeting Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Instant sync title"
              className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Invite Team Members (Optional)
            </label>
            <div className="space-y-1.5 max-h-40 overflow-y-auto p-2 border border-gray-200 rounded-xl bg-gray-50/50">
              {availableParticipants.slice(1).map((p) => {
                const isSelected = selectedIds.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleToggle(p.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-white border-black shadow-2xs'
                        : 'bg-white/70 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${p.avatarBg}`}>
                        {p.avatarText}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{p.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-black" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl text-blue-900 text-xs leading-relaxed">
            Starting an instant call will allocate a live, encrypted internal room. You will enter the room immediately with camera and microphone controls.
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsInstantModalOpen(false)}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreateAndJoin}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-2xs flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              <span>Start &amp; Enter Room</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
