import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Calendar,
  Clock,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  XCircle,
  Download,
} from 'lucide-react';
import { useRequest } from '../context/RequestContext';
import { RequestIcon } from './RequestIcons';
import { RequestCategory, RequestStatus, EmployeeRequest } from '../types/request';

export const MyRequestsTable: React.FC = () => {
  const {
    activeCategoryTab,
    setActiveCategoryTab,
    searchQuery,
    setSearchQuery,
    selectedMonth,
    setSelectedMonth,
    selectedStatus,
    setSelectedStatus,
    currentPage,
    setCurrentPage,
    pageSize,
    filteredRequests,
    paginatedRequests,
    totalPages,
    categoryCounts,
    setViewedRequest,
    withdrawRequest,
  } = useRequest();

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close 3-dot dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const months = [
    { key: '2026-10', label: 'October 2026' },
    { key: '2026-09', label: 'September 2026' },
    { key: '2026-08', label: 'August 2026' },
    { key: '2026-07', label: 'July 2026' },
    { key: 'All', label: 'All Months' },
  ];

  const statuses = ['All Status', 'Pending', 'Under Review', 'Approved', 'Rejected'];

  const categoryTabs: { key: 'All' | RequestCategory; label: string; count: number }[] = [
    { key: 'All', label: 'All', count: categoryCounts.All },
    { key: 'Leave', label: 'Leave', count: categoryCounts.Leave },
    { key: 'Salary Slip', label: 'Salary Slip', count: categoryCounts['Salary Slip'] },
    { key: 'Document', label: 'Document', count: categoryCounts.Document },
    { key: 'Access', label: 'Access', count: categoryCounts.Access },
    { key: 'Other', label: 'Other', count: categoryCounts.Other },
  ];

  const startRecordNum = (currentPage - 1) * pageSize + 1;
  const endRecordNum = Math.min(currentPage * pageSize, filteredRequests.length);

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border border-amber-100 font-semibold';
      case 'Under Review':
        return 'bg-blue-50 text-blue-700 border border-blue-100 font-semibold';
      case 'Rejected':
        return 'bg-red-50 text-red-600 border border-red-100 font-semibold';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleDownloadSlip = (r: EmployeeRequest) => {
    // Generate text/blob download for payslip or certificate
    const blob = new Blob([
      `OFFSLEEK HR SELF SERVICE\nDocument: ${r.title}\nRequest ID: ${r.id}\nEmployee: ${r.employeeName}\nDate: ${r.submittedOn}\nStatus: Verified & Approved\nOfficial digital signature: SHA256-AUTHENTICATED-OFFSLEEK-HR`
    ], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${r.title.replace(/\s+/g, '_')}_${r.id}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
      {/* Table Header & Controls */}
      <div className="p-6 border-b border-gray-100 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              My Requests
            </h2>
          </div>

          {/* Filters & Search Input */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Month Filter */}
            <div className="relative">
              <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-2xs">
                <Calendar className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer pr-4 appearance-none font-medium text-gray-900 text-sm"
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

            {/* Status Filter */}
            <div className="relative">
              <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-2xs">
                <Clock className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer pr-4 appearance-none font-medium text-gray-900 text-sm"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s === 'All Status' ? 'All' : s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search requests..."
                className="pl-9 pr-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-black focus:outline-none shadow-2xs w-48 sm:w-60 font-normal"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
          {categoryTabs.map((tab) => {
            const isActive = activeCategoryTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategoryTab(tab.key)}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-black text-white shadow-2xs font-semibold'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#fbfbfb] border-b border-gray-200 text-gray-500 font-semibold text-xs uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4 w-12 font-semibold">#</th>
              <th className="py-3.5 px-4 font-semibold">Request ID</th>
              <th className="py-3.5 px-4 font-semibold">Request Type</th>
              <th className="py-3.5 px-4 font-semibold">Title / Description</th>
              <th className="py-3.5 px-4 font-semibold">Submitted On</th>
              <th className="py-3.5 px-4 font-semibold">Required For</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-4 font-semibold">Remarks</th>
              <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((r, idx) => (
                <tr key={r.id} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="py-3.5 px-4 text-gray-400 font-mono text-sm">
                    {startRecordNum + idx}
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900 whitespace-nowrap text-sm">
                    {r.id}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5 font-medium text-gray-900">
                      <div className="w-6 h-6 flex items-center justify-center text-gray-700">
                        <RequestIcon category={r.category} className="w-4.5 h-4.5 text-gray-800" />
                      </div>
                      <span className="font-semibold text-sm">{r.requestType}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-bold text-gray-900 group-hover:text-black text-sm">
                      {r.title}
                    </div>
                    <div className="text-xs text-gray-500 truncate mt-0.5 font-normal">
                      {r.description}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-gray-700 whitespace-nowrap text-sm">
                    {r.submittedOn}
                  </td>

                  <td className="py-3.5 px-4 text-gray-700 whitespace-nowrap text-sm">
                    {r.requiredFor}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs ${getStatusBadge(
                        r.status
                      )}`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap text-sm">
                    {r.remarks || '—'}
                  </td>

                  {/* Actions Column: View button + 3-dot dropdown */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-2 relative">
                      <button
                        type="button"
                        onClick={() => setViewedRequest(r)}
                        className="px-3.5 py-1.5 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 transition-colors shadow-2xs cursor-pointer"
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveMenuId(activeMenuId === r.id ? null : r.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
                        title="More actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Contextual Action Popover */}
                      {activeMenuId === r.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-0 top-9 w-52 bg-white rounded-xl shadow-xl border border-gray-200 p-1.5 z-40 text-left text-sm"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setViewedRequest(r);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-2.5 py-2 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center gap-2.5 font-medium"
                          >
                            <Eye className="w-4 h-4 text-gray-500" />
                            <span>View Full Details</span>
                          </button>

                          {(r.category === 'Salary Slip' || r.category === 'Document') &&
                            r.status === 'Approved' && (
                              <button
                                type="button"
                                onClick={() => {
                                  handleDownloadSlip(r);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-2.5 py-2 rounded-lg hover:bg-gray-100 text-emerald-700 font-semibold flex items-center gap-2.5"
                              >
                                <Download className="w-4 h-4 text-emerald-600" />
                                <span>Download Document</span>
                              </button>
                            )}

                          {r.status === 'Pending' && (
                            <button
                              type="button"
                              onClick={() => {
                                withdrawRequest(r.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-2.5 py-2 rounded-lg hover:bg-red-50 text-red-600 flex items-center gap-2.5 font-semibold"
                            >
                              <XCircle className="w-4 h-4 text-red-500" />
                              <span>Withdraw Request</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-12 text-center text-gray-400 text-sm">
                  No requests found matching the current filters or search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 sm:p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600 font-medium">
        <div>
          Showing {filteredRequests.length > 0 ? `${startRecordNum}–${endRecordNum}` : 0} of{' '}
          {filteredRequests.length} requests
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setCurrentPage(p)}
              className={`w-8 h-8 rounded-lg text-sm font-semibold flex items-center justify-center transition-colors ${
                currentPage === p
                  ? 'bg-black text-white shadow-2xs'
                  : 'text-gray-700 hover:bg-gray-100 border border-gray-200 bg-white'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
