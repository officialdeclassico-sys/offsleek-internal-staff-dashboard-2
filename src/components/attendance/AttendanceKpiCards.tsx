import React from 'react';
import { CalendarCheck, Clock, LogOut, BarChart2 } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';

export const AttendanceKpiCards: React.FC = () => {
  const {
    isCheckedIn,
    todayStatus,
    workingIndicator,
    checkInTime,
    checkOutTime,
    totalWorkingHours,
    currentDateFormatted,
  } = useAttendance();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 items-stretch">
      {/* 1. Today's Status */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs flex items-center gap-4 transition-all hover:border-gray-300">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
          <CalendarCheck className="w-7 h-7 text-emerald-600" />
        </div>
        <div className="min-w-0">
          <span className="text-sm font-medium text-gray-500 block">Today's Status</span>
          <div className="text-2xl sm:text-[26px] font-extrabold text-emerald-700 tracking-tight leading-tight mt-0.5">
            {todayStatus}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`w-2 h-2 rounded-full ${
                isCheckedIn ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
              }`}
            ></span>
            <span className="text-sm font-semibold text-gray-700">{workingIndicator}</span>
          </div>
        </div>
      </div>

      {/* 2. Check In Time */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs flex items-center gap-4 transition-all hover:border-gray-300">
        <div className="w-14 h-14 rounded-2xl bg-blue-50/70 border border-blue-100/60 flex items-center justify-center shrink-0">
          <Clock className="w-7 h-7 text-blue-600" />
        </div>
        <div className="min-w-0">
          <span className="text-sm font-medium text-gray-500 block">Check In Time</span>
          <div className="text-2xl sm:text-[26px] font-extrabold text-gray-950 tracking-tight leading-tight mt-0.5">
            {checkInTime}
          </div>
          <div className="text-sm font-medium text-gray-500 mt-1 truncate">
            {currentDateFormatted}
          </div>
        </div>
      </div>

      {/* 3. Check Out Time */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs flex items-center gap-4 transition-all hover:border-gray-300">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
          <LogOut className="w-7 h-7 text-gray-800" />
        </div>
        <div className="min-w-0">
          <span className="text-sm font-medium text-gray-500 block">Check Out Time</span>
          <div className="text-2xl sm:text-[26px] font-extrabold text-gray-950 tracking-tight leading-tight mt-0.5">
            {checkOutTime}
          </div>
          <div className="text-sm font-medium text-gray-500 mt-1 truncate">
            {isCheckedIn ? 'Not checked out yet' : 'Checked out successfully'}
          </div>
        </div>
      </div>

      {/* 4. Total Working Hours */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs flex items-center gap-4 transition-all hover:border-gray-300">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
          <BarChart2 className="w-7 h-7 text-gray-800" />
        </div>
        <div className="min-w-0">
          <span className="text-sm font-medium text-gray-500 block">Total Working Hours</span>
          <div className="text-2xl sm:text-[26px] font-extrabold text-gray-950 tracking-tight leading-tight mt-0.5">
            {totalWorkingHours}
          </div>
          <div className="text-sm font-medium text-gray-400 mt-1 truncate">
            {isCheckedIn ? 'Will be updated after check out' : 'Total recorded for today'}
          </div>
        </div>
      </div>
    </div>
  );
};
