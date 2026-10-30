import React from 'react';
import { Briefcase, ChevronDown } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { AttendanceStatus } from '../../types/attendance';

export const AttendanceHistoryCard: React.FC = () => {
  const {
    filteredRecords,
    selectedMonth,
    setSelectedMonth,
    selectedStatus,
    setSelectedStatus,
  } = useAttendance();

  const months = [
    { key: '2026-10', label: 'October 2026' },
    { key: '2026-09', label: 'September 2026' },
    { key: 'All', label: 'All Months' },
  ];

  const statuses = ['All', 'Working', 'Present', 'Absent', 'On Leave'];

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case 'Working':
        return (
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Working
          </span>
        );
      case 'Present':
        return (
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Present
          </span>
        );
      case 'Absent':
        return (
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-red-50 text-red-600 border border-red-200">
            Absent
          </span>
        );
      case 'On Leave':
        return (
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            On Leave
          </span>
        );
      default:
        return (
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-gray-50 text-gray-700 border border-gray-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
      {/* Header with Title and Filters */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Briefcase className="w-6 h-6 text-gray-900 shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-gray-950 tracking-tight">
              Attendance History
            </h2>
            <p className="text-sm text-gray-500 font-medium mt-0.5">
              View your past attendance records.
            </p>
          </div>
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3">
          {/* Month selector */}
          <div className="relative">
            <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 shadow-2xs hover:border-gray-300 transition-colors">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer pr-5 appearance-none text-sm font-semibold text-gray-900"
              >
                {months.map((m) => (
                  <option key={m.key} value={m.key}>
                    {m.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 pointer-events-none" />
            </div>
          </div>

          {/* Status selector */}
          <div className="relative">
            <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 shadow-2xs hover:border-gray-300 transition-colors">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer pr-5 appearance-none text-sm font-semibold text-gray-900"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All Status' : s}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#fbfbfb] border-b border-gray-200 text-gray-600 font-semibold text-xs tracking-wider">
            <tr>
              <th className="py-3.5 px-5 font-semibold">Date</th>
              <th className="py-3.5 px-5 font-semibold">Check In</th>
              <th className="py-3.5 px-5 font-semibold">Check Out</th>
              <th className="py-3.5 px-5 font-semibold">Total Hours</th>
              <th className="py-3.5 px-5 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800 font-normal">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <div className="font-semibold text-gray-950 text-sm">{r.date}</div>
                    <div className="text-xs text-gray-500 font-medium mt-0.5">{r.day}</div>
                  </td>
                  <td className="py-3.5 px-5 text-gray-700 whitespace-nowrap font-medium text-sm">
                    {r.checkIn}
                  </td>
                  <td className="py-3.5 px-5 text-gray-700 whitespace-nowrap font-medium text-sm">
                    {r.checkOut}
                  </td>
                  <td className="py-3.5 px-5 text-gray-700 whitespace-nowrap font-medium text-sm">
                    {r.totalHours}
                  </td>
                  <td className="py-3.5 px-5 whitespace-nowrap">{getStatusBadge(r.status)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-500 text-sm">
                  No attendance records found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
