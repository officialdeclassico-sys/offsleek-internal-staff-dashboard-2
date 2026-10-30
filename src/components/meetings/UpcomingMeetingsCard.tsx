import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Video,
  MoreVertical,
  Copy,
  Info,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { useMeetings } from '../../context/MeetingContext';
import { Meeting } from '../../types/meeting';

export const UpcomingMeetingsCard: React.FC = () => {
  const {
    upcomingMeetings,
    joinMeeting,
    copyMeetingLink,
    cancelMeeting,
    setSelectedMeeting,
    setIsDetailsModalOpen,
    setIsCalendarModalOpen,
  } = useMeetings();

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-800">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-950">Upcoming Meetings</h2>
            <p className="text-sm text-gray-500 mt-0.5">Your scheduled meetings and team calls.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsCalendarModalOpen(true)}
          className="text-sm font-semibold text-gray-700 hover:text-black hover:bg-gray-100 px-3.5 py-2 rounded-xl border border-gray-200 transition-colors cursor-pointer"
        >
          View Calendar
        </button>
      </div>

      {/* Meetings List */}
      {upcomingMeetings.length === 0 ? (
        <div className="py-12 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
          <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-gray-700">No upcoming meetings scheduled</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Use the Schedule Meeting or Start Meeting cards above to plan a sync.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {upcomingMeetings.map((meeting) => {
            const isMenuOpen = activeMenuId === meeting.id;

            return (
              <div
                key={meeting.id}
                className="p-4 rounded-xl border border-gray-200/90 bg-white hover:border-gray-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative"
              >
                {/* Left: Date Tile & Info */}
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  {/* Date Tile */}
                  <div className="w-16 h-18 rounded-xl bg-gray-50 border border-gray-200 flex flex-col items-center justify-center shrink-0 text-center select-none shadow-2xs">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {meeting.monthShort}
                    </span>
                    <span className="text-xl font-black text-gray-950 leading-none my-0.5">
                      {meeting.dayNumber}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      {meeting.weekdayShort}
                    </span>
                  </div>

                  {/* Title & Timing */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h4 className="text-base font-bold text-gray-950 truncate max-w-sm">
                        {meeting.title}
                      </h4>
                      {meeting.status === 'live' && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200 animate-pulse flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          LIVE
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1.5 font-medium text-gray-700">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {meeting.startTime} – {meeting.endTime} ({meeting.durationMinutes} min)
                      </span>
                    </div>

                    {/* Participants avatar row */}
                    <div className="flex items-center gap-2 mt-2.5">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {meeting.participants.slice(0, 4).map((p) => (
                          <div
                            key={p.id}
                            className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold ${
                              p.avatarBg || 'bg-gray-800 text-white'
                            }`}
                            title={`${p.name} (${p.role})`}
                          >
                            {p.avatarText}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {meeting.participants.length}{' '}
                        {meeting.participants.length === 1 ? 'participant' : 'participants'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => joinMeeting(meeting)}
                    className="px-4 py-2.5 bg-black hover:bg-gray-800 text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Meeting</span>
                  </button>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setActiveMenuId(isMenuOpen ? null : meeting.id)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                      title="Meeting options"
                    >
                      <MoreVertical className="w-4.5 h-4.5" />
                    </button>

                    {isMenuOpen && (
                      <div className="absolute right-0 top-10 z-30 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 animate-in fade-in zoom-in-95 duration-100 text-sm">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            setSelectedMeeting(meeting);
                            setIsDetailsModalOpen(true);
                          }}
                          className="w-full px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 cursor-pointer"
                        >
                          <Info className="w-4 h-4 text-gray-400" />
                          <span>View Details</span>
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            setActiveMenuId(null);
                            await copyMeetingLink(meeting.joinUrl);
                          }}
                          className="w-full px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 cursor-pointer"
                        >
                          <Copy className="w-4 h-4 text-gray-400" />
                          <span>Copy Join Link</span>
                        </button>
                        <div className="my-1 border-t border-gray-100" />
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            if (window.confirm(`Are you sure you want to cancel "${meeting.title}"?`)) {
                              cancelMeeting(meeting.id);
                            }
                          }}
                          className="w-full px-3.5 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 text-rose-500" />
                          <span>Cancel Meeting</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
