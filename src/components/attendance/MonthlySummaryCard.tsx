import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';

export const MonthlySummaryCard: React.FC = () => {
  const { monthlyStats } = useAttendance();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-5">
        <BarChart3 className="w-6 h-6 text-gray-900 shrink-0" />
        <div>
          <h2 className="text-xl font-bold text-gray-950 tracking-tight">
            Monthly Summary
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-0.5">
            Your attendance overview for October 2026.
          </p>
        </div>
      </div>

      {/* 4 Stat Boxes in a row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {/* Present */}
        <div className="bg-[#f0fdf4] border border-emerald-100 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-sm font-semibold text-emerald-700 block">Present</span>
          <span className="text-3xl font-extrabold text-gray-950 tracking-tight mt-1">
            {monthlyStats.presentCount}
          </span>
        </div>

        {/* Absent */}
        <div className="bg-red-50/60 border border-red-100 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-sm font-semibold text-red-600 block">Absent</span>
          <span className="text-3xl font-extrabold text-gray-950 tracking-tight mt-1">
            {monthlyStats.absentCount}
          </span>
        </div>

        {/* On Leave */}
        <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-sm font-semibold text-amber-700 block">On Leave</span>
          <span className="text-3xl font-extrabold text-gray-950 tracking-tight mt-1">
            {monthlyStats.onLeaveCount}
          </span>
        </div>

        {/* Total Days */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-between">
          <span className="text-sm font-semibold text-gray-700 block">Total Days</span>
          <span className="text-3xl font-extrabold text-gray-950 tracking-tight mt-1">
            {monthlyStats.totalDays}
          </span>
        </div>
      </div>

      {/* Progress Bar & Percentage */}
      <div className="flex items-center gap-4 pt-1">
        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${monthlyStats.attendancePercentage}%` }}
          ></div>
        </div>
        <span className="text-sm font-semibold text-gray-700 shrink-0">
          {monthlyStats.attendancePercentage}% Attendance
        </span>
      </div>
    </div>
  );
};
