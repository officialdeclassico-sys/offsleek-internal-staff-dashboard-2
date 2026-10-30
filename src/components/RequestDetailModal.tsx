import React from 'react';
import {
  X,
  Building2,
  Download,
  Trash2,
} from 'lucide-react';
import { useRequest } from '../context/RequestContext';
import { RequestIcon } from './RequestIcons';
import { EmployeeRequest } from '../types/request';

export const RequestDetailModal: React.FC = () => {
  const {
    viewedRequest,
    setViewedRequest,
    withdrawRequest,
  } = useRequest();

  if (!viewedRequest) return null;

  const req: EmployeeRequest = viewedRequest;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {status}
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Pending
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Under Review
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
            {status}
          </span>
        );
    }
  };

  const handleDownload = () => {
    const textContent = `OFFSLEEK SUPPORT TEAM - OFFICIAL DOCUMENT RECORD\n` +
      `==================================================\n` +
      `Request ID: ${req.id}\n` +
      `Category: ${req.category} (${req.requestType})\n` +
      `Title: ${req.title}\n` +
      `Employee: ${req.employeeName} (${req.employeeId})\n` +
      `Department: Support Operations\n` +
      `Submitted: ${req.submittedOn}\n` +
      `Required For: ${req.requiredFor}\n` +
      `Status: ${req.status}\n` +
      `Routing Desk: ${req.routedTo}\n` +
      `Description: ${req.description}\n` +
      `--------------------------------------------------\n` +
      `Parameters / Metadata:\n` +
      Object.entries(req.details)
        .map(([k, v]) => `  - ${k}: ${v}`)
        .join('\n') +
      `\n--------------------------------------------------\n` +
      `Remarks: ${req.remarks || 'None'}\n` +
      `Audit History:\n` +
      req.history
        .map((h) => `  - [${h.timestamp}] ${h.action} by ${h.actor} (${h.role}): ${h.comment || ''}`)
        .join('\n') +
      `\n==================================================\n` +
      `Generated Timestamp: ${new Date().toISOString()}\n`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${req.id}_OFFSLEEK_Official_Record.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const canWithdraw = req.status === 'Pending' || req.status === 'Under Review';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="request-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={() => setViewedRequest(null)}
    >
      <div
        className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#fbfbfb]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center">
              <RequestIcon category={req.category} className="w-5.5 h-5.5 text-gray-800" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 id="request-detail-title" className="text-lg font-bold text-gray-950 font-mono tracking-tight">
                  {req.id}
                </h3>
                {getStatusBadge(req.status)}
              </div>
              <p className="text-sm text-gray-500 font-medium mt-0.5">
                {req.category} • Submitted on {req.submittedOn}
              </p>
            </div>
          </div>
          <button
            onClick={() => setViewedRequest(null)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-sm">
          {/* Employee & Assignment Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 bg-gray-50/80 rounded-xl border border-gray-200/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                {req.employeeName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{req.employeeName}</p>
                <p className="text-xs text-gray-500 font-medium">Employee ID: {req.employeeId} • Support Team</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:justify-end text-sm text-gray-600">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span>
                Routing Desk:{' '}
                <strong className="text-gray-900 font-semibold">{req.routedTo}</strong>
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Subject & Description
            </h4>
            <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-1.5">
              <p className="font-bold text-gray-950 text-base">{req.title}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{req.description}</p>
            </div>
          </div>

          {/* Parameters & Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              Parameters & Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-gray-50 border border-gray-100 rounded-xl flex flex-col justify-center">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Required For / Date
                </span>
                <span className="text-sm font-bold text-gray-900 mt-1 break-words">
                  {req.requiredFor}
                </span>
              </div>
              {Object.entries(req.details).map(([key, value]) => {
                if (!value) return null;
                const formattedKey = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase());
                return (
                  <div
                    key={key}
                    className="p-3.5 bg-gray-50 border border-gray-100 rounded-xl flex flex-col justify-center"
                  >
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {formattedKey}
                    </span>
                    <span className="text-sm font-bold text-gray-900 mt-1 break-words">
                      {String(value)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Remarks */}
          {req.remarks && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Official Remarks
              </h4>
              <div
                className={`p-4 rounded-xl border text-sm leading-relaxed font-medium ${
                  req.status === 'Approved' || req.status === 'Completed'
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    : req.status === 'Rejected'
                    ? 'bg-rose-50/60 border-rose-200 text-rose-900'
                    : 'bg-blue-50/60 border-blue-200 text-blue-900'
                }`}
              >
                {req.remarks}
              </div>
            </div>
          )}

          {/* Lifecycle & Audit Timeline */}
          {req.history && req.history.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3.5">
                Lifecycle & Audit Timeline
              </h4>
              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-200">
                {req.history.map((entry, idx) => {
                  return (
                    <div key={idx} className="relative group">
                      <div
                        className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center ${
                          entry.action.includes('Approved') || entry.action.includes('Completed')
                            ? 'border-emerald-500 text-emerald-600'
                            : entry.action.includes('Rejected')
                            ? 'border-rose-500 text-rose-600'
                            : entry.action.includes('Review')
                            ? 'border-blue-500 text-blue-600'
                            : 'border-gray-400 text-gray-500'
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            entry.action.includes('Approved') || entry.action.includes('Completed')
                              ? 'bg-emerald-500'
                              : entry.action.includes('Rejected')
                              ? 'bg-rose-500'
                              : entry.action.includes('Review')
                              ? 'bg-blue-500'
                              : 'bg-gray-400'
                          }`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-gray-900">
                            {entry.action}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">
                            {entry.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">
                          By <span className="font-semibold text-gray-800">{entry.actor}</span> ({entry.role})
                        </p>
                        {entry.comment && (
                          <p className="text-sm text-gray-700 bg-gray-50 p-2.5 rounded-lg mt-1.5 border border-gray-100">
                            "{entry.comment}"
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4.5 border-t border-gray-100 bg-[#fbfbfb] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {canWithdraw && (
              <button
                type="button"
                onClick={async () => {
                  await withdrawRequest(req.id);
                  setViewedRequest(null);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Withdraw Request
              </button>
            )}
            {(req.status === 'Approved' || req.status === 'Completed') && (
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-800 hover:text-black bg-white hover:bg-gray-50 border border-gray-300 rounded-xl shadow-2xs transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-gray-600" />
                Download Official Slip / Document
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setViewedRequest(null)}
            className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors cursor-pointer ml-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
