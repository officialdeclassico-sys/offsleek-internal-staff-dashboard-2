import React from 'react';
import { Clock, LogIn, LogOut, CheckCircle2 } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';

export const MarkAttendanceCard: React.FC = () => {
  const { isCheckedIn, checkInTime, checkOutTime, handleCheckOut, handleCheckIn } = useAttendance();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs mb-6">
      {/* Card Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-5">
        <Clock className="w-6 h-6 text-gray-900 shrink-0" />
        <div>
          <h2 className="text-xl font-bold text-gray-950 tracking-tight">
            Mark Attendance
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-0.5">
            Record your work start and end time.
          </p>
        </div>
      </div>

      {/* Two Sub-cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sub-card 1: Check In */}
        <div
          className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
            isCheckedIn
              ? 'bg-[#f0fdf4] border-emerald-200/90 shadow-2xs'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-3.5 mb-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                isCheckedIn
                  ? 'bg-white border-emerald-200 text-emerald-600'
                  : 'bg-gray-50 border-gray-200 text-gray-700'
              }`}
            >
              <LogIn className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-950 tracking-tight">Check In</h3>
              <p className="text-sm text-gray-600 font-medium mt-0.5">
                {isCheckedIn
                  ? 'You have checked in for today.'
                  : 'Click to start your working hours.'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-extrabold text-gray-950 font-mono tracking-tight">
              {checkInTime}
            </span>
            {isCheckedIn ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/90 border border-emerald-200 text-emerald-800 rounded-full text-sm font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Checked In</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleCheckIn}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all shadow-xs cursor-pointer active:scale-[0.98]"
              >
                Check In Now
              </button>
            )}
          </div>
        </div>

        {/* Sub-card 2: Check Out */}
        <div
          className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
            !isCheckedIn && checkOutTime !== '--:--'
              ? 'bg-blue-50/40 border-blue-200 shadow-2xs'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-3.5 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 text-gray-800">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-950 tracking-tight">Check Out</h3>
              <p className="text-sm text-gray-600 font-medium mt-0.5">
                {isCheckedIn
                  ? 'Click to record your work end time.'
                  : 'You have recorded your work end time.'}
              </p>
            </div>
          </div>

          <div className="pt-2">
            {isCheckedIn ? (
              <button
                type="button"
                onClick={handleCheckOut}
                className="w-full py-2.5 px-4 bg-[#1a73e8] hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Check Out</span>
              </button>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-xl font-extrabold text-gray-950 font-mono tracking-tight">
                  {checkOutTime}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 text-gray-800 rounded-full text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4 text-gray-600 shrink-0" />
                  <span>Checked Out</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
