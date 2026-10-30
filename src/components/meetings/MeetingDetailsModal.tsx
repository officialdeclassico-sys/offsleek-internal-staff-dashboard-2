import React from 'react';
import {
  X,
  Calendar,
  Clock,
  Users,
  Video,
  Copy,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { useMeetings } from '../../context/MeetingContext';

export const MeetingDetailsModal: React.FC = () => {
  const {
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    selectedMeeting,
    joinMeeting,
    copyMeetingLink,
    cancelMeeting,
  } = useMeetings();

  if (!isDetailsModalOpen || !selectedMeeting) return null;

  const m = selectedMeeting;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={() => setIsDetailsModalOpen(false)}
    >
      <div
        className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#fbfbfb]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center font-bold text-sm">
              {m.monthShort}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-950 truncate max-w-sm">
                {m.title}
              </h3>
              <p className="text-xs text-gray-500 font-mono">Code: {m.code}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsDetailsModalOpen(false)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 text-sm">
          {/* Status & Timing grid */}
          <div className="grid grid-cols-2 gap-3.5 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <div>
              <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">
                Date &amp; Time
              </span>
              <p className="font-bold text-gray-900 text-sm mt-1">
                {m.dateFormatted}
              </p>
              <p className="text-gray-600 text-xs mt-0.5 font-medium">
                {m.startTime} – {m.endTime} ({m.durationMinutes} min)
              </p>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">
                Status
              </span>
              <div className="mt-1">
                {m.status === 'live' ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">
                    Live Now
                  </span>
                ) : m.status === 'completed' ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                    Completed
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Scheduled
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-xs mt-1">{m.timeZone}</p>
            </div>
          </div>

          {/* Description */}
          {m.description && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Agenda / Overview
              </h4>
              <p className="p-3.5 bg-white border border-gray-200 rounded-xl text-gray-800 leading-relaxed font-normal text-sm">
                {m.description}
              </p>
            </div>
          )}

          {/* Organizer & Participants */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              Participants ({m.participants.length})
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {m.participants.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50/70 border border-gray-150"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${p.avatarBg || 'bg-gray-800 text-white'}`}>
                      {p.avatarText}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.email}</p>
                    </div>
                  </div>
                  {p.id === m.organizer.id && (
                    <span className="text-xs px-2.5 py-0.5 bg-gray-200 text-gray-800 font-semibold rounded-md">
                      Organizer
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {m.notes && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Meeting Preparation Notes
              </h4>
              <p className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-amber-900 text-sm">
                {m.notes}
              </p>
            </div>
          )}

          {/* Join Link Bar */}
          <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-3">
            <span className="text-sm font-mono text-gray-700 truncate">
              {m.joinUrl}
            </span>
            <button
              type="button"
              onClick={() => copyMeetingLink(m.joinUrl)}
              className="px-3.5 py-1.5 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-semibold text-gray-800 flex items-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4.5 border-t border-gray-100 bg-[#fbfbfb] flex items-center justify-between gap-3">
          {m.status === 'scheduled' ? (
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`Are you sure you want to cancel "${m.title}"?`)) {
                  cancelMeeting(m.id);
                }
              }}
              className="px-4 py-2.5 text-sm font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Cancel Meeting</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsDetailsModalOpen(false)}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                setIsDetailsModalOpen(false);
                joinMeeting(m);
              }}
              className="px-5 py-2.5 text-sm font-bold text-white bg-black hover:bg-gray-800 rounded-xl transition-colors cursor-pointer shadow-2xs flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              <span>Join Call Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
