import React from 'react';
import { History, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { useMeetings } from '../../context/MeetingContext';
import { Meeting } from '../../types/meeting';

export const RecentMeetingsCard: React.FC = () => {
  const {
    recentMeetings,
    setSelectedMeeting,
    setIsDetailsModalOpen,
  } = useMeetings();

  const handleOpenDetails = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs mt-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <History className="w-5 h-5 text-gray-900" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-950">Recent Meetings</h2>
            <p className="text-sm text-gray-500 mt-0.5">Recently completed team discussions.</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {recentMeetings.map((meeting) => (
          <button
            key={meeting.id}
            type="button"
            onClick={() => handleOpenDetails(meeting)}
            className="w-full text-left p-3.5 rounded-xl border border-gray-150 hover:border-gray-300 hover:bg-gray-50/70 transition-all flex items-center justify-between gap-3 cursor-pointer group"
          >
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-gray-950 group-hover:text-black truncate">
                {meeting.title}
              </h4>
              <div className="flex items-center gap-2.5 text-xs text-gray-500 mt-1">
                <span>{meeting.dateFormatted}</span>
                <span>•</span>
                <span>{meeting.startTime}</span>
                <span>•</span>
                <span>{meeting.durationMinutes} min</span>
              </div>
            </div>

            <ChevronRight className="w-4.5 h-4.5 text-gray-400 group-hover:text-gray-700 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          if (recentMeetings.length > 0) {
            handleOpenDetails(recentMeetings[0]);
          }
        }}
        className="w-full mt-4 pt-3.5 border-t border-gray-100 text-center text-sm font-semibold text-gray-700 hover:text-black transition-colors cursor-pointer"
      >
        View all meetings
      </button>
    </div>
  );
};
