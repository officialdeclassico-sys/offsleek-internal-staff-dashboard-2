import React from 'react';
import { Target, Clock, LogOut, Hourglass, Briefcase } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';

export const TodayProgressCard: React.FC = () => {
  const {
    isCheckedIn,
    checkInTime,
    checkOutTime,
    totalWorkingHours,
    formattedElapsed,
  } = useAttendance();

  // Circular progress calculations for working 8 hours goal (28800s)
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  // If checked out, show full completed ring; if checked in, show dynamic or elegant 65% arc
  const progressPercent = isCheckedIn ? 0.65 : 1.0;
  const strokeDashoffset = circumference - progressPercent * circumference;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-5">
        <Target className="w-6 h-6 text-gray-900 shrink-0" />
        <div>
          <h2 className="text-xl font-bold text-gray-950 tracking-tight">
            Today's Progress
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-0.5">
            Your working hours for today.
          </p>
        </div>
      </div>

      {/* Content: Circular Chart on Left, Info on Right */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
        {/* Circular Donut Ring */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130">
            {/* Background Track */}
            <circle
              cx="65"
              cy="65"
              r={radius}
              fill="transparent"
              stroke="#e2e8f0"
              strokeWidth="11"
            />
            {/* Active Progress Arc */}
            <circle
              cx="65"
              cy="65"
              r={radius}
              fill="transparent"
              stroke={isCheckedIn ? '#64748b' : '#10b981'}
              strokeWidth="11"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Center Text inside Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
            <span className="text-xs text-gray-500 font-medium leading-none">
              {isCheckedIn ? 'Working' : 'Finished'}
            </span>
            <span className="text-xl font-bold font-mono text-gray-950 tracking-tight my-1">
              {isCheckedIn ? formattedElapsed : totalWorkingHours}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isCheckedIn ? 'bg-blue-600 animate-pulse' : 'bg-emerald-500'
                }`}
              ></span>
              <span className="text-xs font-semibold text-gray-600">
                {isCheckedIn ? 'In Progress' : 'Completed'}
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown List */}
        <div className="flex-1 w-full space-y-3.5 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-gray-700 font-medium">
              <Clock className="w-4 h-4 text-gray-500 shrink-0" />
              <span>Check In</span>
            </div>
            <span className="font-semibold text-gray-950 font-mono text-sm">
              {checkInTime}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-gray-700 font-medium">
              <LogOut className="w-4 h-4 text-gray-500 shrink-0" />
              <span>Check Out</span>
            </div>
            <span className="font-semibold text-gray-950 font-mono text-sm">
              {checkOutTime}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-gray-700 font-medium">
              <Hourglass className="w-4 h-4 text-gray-500 shrink-0" />
              <span>Total Hours</span>
            </div>
            <span className="font-semibold text-gray-950 font-mono text-sm">
              {totalWorkingHours}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-gray-700 font-medium">
              <Briefcase className="w-4 h-4 text-gray-500 shrink-0" />
              <span>Status</span>
            </div>
            <span
              className={`px-3 py-0.5 rounded text-xs font-bold ${
                isCheckedIn
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {isCheckedIn ? 'Working' : 'Present'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
