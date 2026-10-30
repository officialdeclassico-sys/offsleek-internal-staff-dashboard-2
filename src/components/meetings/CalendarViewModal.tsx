import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Video } from 'lucide-react';
import { useMeetings } from '../../context/MeetingContext';

export const CalendarViewModal: React.FC = () => {
  const {
    isCalendarModalOpen,
    setIsCalendarModalOpen,
    upcomingMeetings,
    joinMeeting,
  } = useMeetings();

  const [selectedDay, setSelectedDay] = useState<number>(24);

  if (!isCalendarModalOpen) return null;

  // Calendar dates for October 2026
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const getMeetingsForDay = (day: number) => {
    return upcomingMeetings.filter((m) => parseInt(m.dayNumber, 10) === day);
  };

  const dayMeetings = getMeetingsForDay(selectedDay);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={() => setIsCalendarModalOpen(false)}
    >
      <div
        className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#fbfbfb]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-950">Team Meetings Calendar</h3>
              <p className="text-xs text-gray-500 font-medium">October 2026 Schedule &amp; Dial-in Agenda</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCalendarModalOpen(false)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 text-sm">
          {/* Month grid */}
          <div className="md:col-span-7">
            <div className="flex items-center justify-between mb-3.5">
              <h4 className="text-sm font-bold text-gray-900">October 2026</h4>
              <div className="flex items-center gap-1.5">
                <button type="button" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button type="button" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            <div className="grid grid-cols-7 gap-1 text-sm font-medium">
              {/* Empty leading days (Oct 1 2026 is Thursday -> 4 empty cells) */}
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2"></div>

              {daysInMonth.map((d) => {
                const meetings = getMeetingsForDay(d);
                const hasMeetings = meetings.length > 0;
                const isSelected = selectedDay === d;

                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDay(d)}
                    className={`h-10 rounded-xl flex flex-col items-center justify-center relative transition-colors cursor-pointer text-sm ${
                      isSelected
                        ? 'bg-black text-white font-bold shadow-2xs'
                        : hasMeetings
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-950 font-bold'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{d}</span>
                    {hasMeetings && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                          isSelected ? 'bg-white' : 'bg-blue-600'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day meetings list */}
          <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-gray-100 md:pl-6 pt-4 md:pt-0">
            <h4 className="text-sm font-bold text-gray-900 mb-3">
              {selectedDay} October 2026
            </h4>

            {dayMeetings.length === 0 ? (
              <p className="text-xs text-gray-400 py-6">No meetings scheduled on this day.</p>
            ) : (
              <div className="space-y-3">
                {dayMeetings.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2"
                  >
                    <div>
                      <h5 className="font-bold text-gray-950 text-sm">{m.title}</h5>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {m.startTime} – {m.endTime}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsCalendarModalOpen(false);
                        joinMeeting(m);
                      }}
                      className="w-full py-2 bg-black hover:bg-gray-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Call</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-[#fbfbfb] text-right">
          <button
            type="button"
            onClick={() => setIsCalendarModalOpen(false)}
            className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
