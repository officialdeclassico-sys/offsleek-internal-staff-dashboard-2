import React from 'react';
import { Video, CalendarPlus, KeyRound, ArrowRight } from 'lucide-react';
import { useMeetings } from '../../context/MeetingContext';

export const MeetingActionCards: React.FC = () => {
  const {
    setIsInstantModalOpen,
    setIsScheduleModalOpen,
    setIsJoinCodeModalOpen,
  } = useMeetings();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {/* 1. Start Meeting (Blue Accent) */}
      <button
        type="button"
        onClick={() => setIsInstantModalOpen(true)}
        className="group relative bg-white rounded-2xl border border-gray-200 p-6 text-left shadow-2xs hover:shadow-md hover:border-blue-400 transition-all duration-200 cursor-pointer flex flex-col justify-between"
      >
        <div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Video className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-950 group-hover:text-blue-600 transition-colors">
            Start Meeting
          </h3>
          <p className="text-sm text-gray-500 mt-1.5 font-normal leading-relaxed">
            Start an instant meeting with your team.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600">
          <span>Start now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>

      {/* 2. Schedule Meeting (Green Accent) */}
      <button
        type="button"
        onClick={() => setIsScheduleModalOpen(true)}
        className="group relative bg-white rounded-2xl border border-gray-200 p-6 text-left shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all duration-200 cursor-pointer flex flex-col justify-between"
      >
        <div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <CalendarPlus className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-950 group-hover:text-emerald-600 transition-colors">
            Schedule Meeting
          </h3>
          <p className="text-sm text-gray-500 mt-1.5 font-normal leading-relaxed">
            Set a date and time, and invite team members.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-600">
          <span>Plan ahead</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>

      {/* 3. Join with Code (Purple Accent) */}
      <button
        type="button"
        onClick={() => setIsJoinCodeModalOpen(true)}
        className="group relative bg-white rounded-2xl border border-gray-200 p-6 text-left shadow-2xs hover:shadow-md hover:border-purple-400 transition-all duration-200 cursor-pointer flex flex-col justify-between"
      >
        <div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <KeyRound className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-950 group-hover:text-purple-600 transition-colors">
            Join with Code
          </h3>
          <p className="text-sm text-gray-500 mt-1.5 font-normal leading-relaxed">
            Enter a meeting code to join a meeting.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-purple-600">
          <span>Enter code</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>
    </div>
  );
};
