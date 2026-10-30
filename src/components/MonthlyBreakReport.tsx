import React from 'react';
import {
  Calendar,
  Filter,
  CheckCircle2,
  AlertCircle,
  MinusCircle,
  BarChart3,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { useBreak } from '../context/BreakContext';
import { BreakIcon } from './BreakIcons';

export const MonthlyBreakReport: React.FC = () => {
  const {
    records,
    selectedMonth,
    setSelectedMonth,
    selectedBreakType,
    setSelectedBreakType,
    selectedStatus,
    setSelectedStatus,
    filteredRecords,
    paginatedRecords,
    currentPage,
    setCurrentPage,
    totalPages,
    pageSize,
    monthlyStats,
    exportToCSV,
  } = useBreak();

  const months = [
    { key: '2026-10', label: 'October 2026' },
    { key: '2026-09', label: 'September 2026' },
    { key: '2026-08', label: 'August 2026' },
    { key: 'All', label: 'All Months' },
  ];

  const breakTypes = ['All', 'Tea Break', 'Lunch Break', 'Snack Break', 'Smoke Break', 'Meeting'];
  const statuses = ['All', 'On Time', 'Exceeded'];

  const startRecordNum = (currentPage - 1) * pageSize + 1;
  const endRecordNum = Math.min(currentPage * pageSize, filteredRecords.length);

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push(2);
      pages.push(3);
      pages.push(4);
      pages.push(5);
      pages.push('...');
      pages.push(totalPages);
    }

    return pages.map((p, idx) => {
      if (p === '...') {
        return (
          <span key={`dots-${idx}`} className="px-2 py-1 text-gray-400 text-sm">
            ...
          </span>
        );
      }
      const pageNum = p as number;
      const isActive = currentPage === pageNum;
      return (
        <button
          key={pageNum}
          type="button"
          onClick={() => setCurrentPage(pageNum)}
          className={`w-8 h-8 rounded-lg text-sm font-semibold flex items-center justify-center transition-colors ${
            isActive
              ? 'bg-black text-white shadow-2xs'
              : 'text-gray-700 hover:bg-gray-100 border border-gray-200 bg-white'
          }`}
        >
          {pageNum}
        </button>
      );
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
      {/* Header & Filter Controls */}
      <div className="p-6 md:p-7 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-6 h-6 text-gray-900" />
              <h2 className="text-xl font-bold text-gray-950 tracking-tight">
                Monthly Break Report
              </h2>
            </div>
            <p className="text-sm text-gray-600 mt-1 font-medium">
              View your break history and see on-time and exceeded breaks.
            </p>
          </div>

          {/* Filter Dropdowns & Export Button - Single clean row on desktop */}
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-3">
            {/* Month Filter */}
            <div className="relative">
              <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-2xs hover:border-gray-300 transition-colors">
                <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer pr-5 appearance-none font-semibold text-gray-900 text-sm"
                >
                  {months.map((m) => (
                    <option key={m.key} value={m.key}>
                      {m.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Break Type Filter */}
            <div className="relative">
              <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-2xs hover:border-gray-300 transition-colors">
                <Filter className="w-4 h-4 text-gray-500 shrink-0" />
                <select
                  value={selectedBreakType}
                  onChange={(e) => setSelectedBreakType(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer pr-5 appearance-none font-semibold text-gray-900 text-sm"
                >
                  <option value="All">All Break Types</option>
                  {breakTypes
                    .filter((t) => t !== 'All')
                    .map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-2xs hover:border-gray-300 transition-colors">
                <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer pr-5 appearance-none font-semibold text-gray-900 text-sm"
                >
                  <option value="All">All Status</option>
                  {statuses
                    .filter((s) => s !== 'All')
                    .map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Export CSV Button */}
            <button
              type="button"
              onClick={exportToCSV}
              className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer shrink-0 active:scale-[0.98]"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Cards Row with Prominent Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Card 1: On-Time Breaks */}
          <div className="p-4.5 bg-white border border-gray-200 rounded-2xl shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm text-gray-600 font-semibold block">On-Time Breaks</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-extrabold text-gray-950">
                  {monthlyStats.onTimeCount}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  &uarr; 12%
                </span>
              </div>
              <span className="text-xs text-gray-500 font-medium block mt-0.5">
                {monthlyStats.onTimePct}% of total breaks
              </span>
            </div>
          </div>

          {/* Card 2: Exceeded Breaks */}
          <div className="p-4.5 bg-white border border-gray-200 rounded-2xl shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm text-gray-600 font-semibold block">Exceeded Breaks</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-extrabold text-gray-950">
                  {monthlyStats.exceededCount}
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                  &uarr; 5%
                </span>
              </div>
              <span className="text-xs text-gray-500 font-medium block mt-0.5">
                {monthlyStats.exceededPct}% of total breaks
              </span>
            </div>
          </div>

          {/* Card 3: Missed Breaks */}
          <div className="p-4.5 bg-white border border-gray-200 rounded-2xl shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
              <MinusCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm text-gray-600 font-semibold block">Missed Breaks</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-extrabold text-gray-950">
                  {monthlyStats.missedCount}
                </span>
                <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                  &darr; 3%
                </span>
              </div>
              <span className="text-xs text-gray-500 font-medium block mt-0.5">
                {monthlyStats.missedPct}% of total breaks
              </span>
            </div>
          </div>

          {/* Card 4: Total Breaks */}
          <div className="p-4.5 bg-white border border-gray-200 rounded-2xl shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center shrink-0">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm text-gray-600 font-semibold block">Total Breaks</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-extrabold text-gray-950">
                  {monthlyStats.totalBreaks}
                </span>
              </div>
              <span className="text-xs text-gray-500 font-medium block mt-0.5">This month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Break Records Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#fbfbfb] border-b border-gray-200 text-gray-600 font-semibold text-xs tracking-wider uppercase">
            <tr>
              <th className="py-4 px-4 w-12 font-semibold">#</th>
              <th className="py-4 px-4 font-semibold">Date</th>
              <th className="py-4 px-4 font-semibold">Break Type</th>
              <th className="py-4 px-4 font-semibold">Start Time</th>
              <th className="py-4 px-4 font-semibold">End Time</th>
              <th className="py-4 px-4 font-semibold">Duration</th>
              <th className="py-4 px-4 font-semibold">Allowed Time</th>
              <th className="py-4 px-4 font-semibold">Status</th>
              <th className="py-4 px-4 font-semibold">Exceeded By</th>
              <th className="py-4 px-4 font-semibold">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800 font-normal">
            {paginatedRecords.length > 0 ? (
              paginatedRecords.map((r) => {
                const isExceeded = r.status === 'Exceeded';

                return (
                  <tr
                    key={r.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-4 px-4 text-gray-500 font-mono text-sm">
                      {r.recordNumber}
                    </td>
                    <td className="py-4 px-4 text-gray-700 whitespace-nowrap text-sm font-medium">
                      {r.date}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5 font-semibold text-gray-950 text-sm">
                        <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-800 shrink-0">
                          <BreakIcon type={r.breakType} className="w-4 h-4 text-gray-900 stroke-[1.9]" />
                        </div>
                        <span>{r.breakType}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700 whitespace-nowrap text-sm font-medium">
                      {r.startTime}
                    </td>
                    <td className="py-4 px-4 text-gray-700 whitespace-nowrap text-sm font-medium">
                      {r.endTime}
                    </td>
                    <td className="py-4 px-4 text-gray-950 whitespace-nowrap font-bold text-sm">
                      {r.durationMinutes} mins
                    </td>
                    <td className="py-4 px-4 text-gray-700 whitespace-nowrap text-sm font-medium">
                      {r.allowedMinutes} mins
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-md text-xs font-bold inline-block ${
                          isExceeded
                            ? 'bg-red-50 text-red-600 border border-red-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {isExceeded ? (
                        <span className="font-bold text-red-600 text-sm">
                          {r.exceededByMinutes} mins
                        </span>
                      ) : (
                        <span className="text-gray-400 font-normal">&mdash;</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-gray-600 max-w-xs truncate text-sm">
                      {r.remarks || '—'}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={10} className="py-12 text-center text-gray-500 text-sm">
                  No break records match the selected month, break type, or status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer matching screenshot */}
      <div className="p-4 sm:p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 font-medium">
        <div>
          Showing {filteredRecords.length > 0 ? `${startRecordNum}–${endRecordNum}` : 0} of{' '}
          {filteredRecords.length} records
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {renderPaginationButtons()}

          <button
            type="button"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
