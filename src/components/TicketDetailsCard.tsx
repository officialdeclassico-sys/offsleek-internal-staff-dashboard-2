import React, { useState, useRef, useEffect } from 'react';
import { FileText, ChevronDown, Check } from 'lucide-react';
import { useSupport } from '../context/SupportContext';
import { Priority, TicketStatus } from '../types/support';

export const TicketDetailsCard: React.FC = () => {
  const {
    selectedTicket,
    updateTicketStatus,
    updateTicketPriority,
    setIsReassignModalOpen,
  } = useSupport();

  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const priorityRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (priorityRef.current && !priorityRef.current.contains(e.target as Node)) {
        setIsPriorityOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) {
        setIsStatusOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const priorities: Priority[] = ['Low', 'Medium', 'High', 'Urgent'];
  const statuses: TicketStatus[] = [
    'Open',
    'In Progress',
    'Pending School',
    'Resolved',
    'Closed',
  ];

  const getPriorityBadgeClass = (priority: Priority) => {
    switch (priority) {
      case 'High':
      case 'Urgent':
        return 'bg-red-50 text-red-600 border border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Low':
        return 'bg-slate-50 text-slate-700 border border-slate-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadgeClass = (status: TicketStatus) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-600 font-semibold';
      case 'In Progress':
        return 'bg-amber-100 text-amber-800 font-semibold';
      case 'Pending School':
        return 'bg-blue-100 text-blue-800 font-semibold';
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800 font-semibold';
      case 'Closed':
        return 'bg-gray-100 text-gray-700 font-semibold';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs">
      {/* Card Header */}
      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
        <FileText className="w-4.5 h-4.5 text-gray-800" />
        <h3 className="font-bold text-base text-gray-950 tracking-tight">
          Ticket Details
        </h3>
      </div>

      {/* Key-Value Details */}
      <div className="space-y-3.5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Ticket ID</span>
          <span className="font-mono font-bold text-gray-950 text-sm">
            {selectedTicket.id}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Category</span>
          <span className="font-semibold text-gray-900 text-sm">
            {selectedTicket.category}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">School</span>
          <span className="font-semibold text-gray-900 truncate max-w-[200px] text-right text-sm">
            {selectedTicket.school.name}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Reported By</span>
          <span className="font-semibold text-gray-900 truncate max-w-[200px] text-right text-sm">
            {selectedTicket.reportedBy}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Created On</span>
          <span className="text-gray-700 text-sm font-medium">{selectedTicket.createdOn}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Last Updated</span>
          <span className="text-gray-700 text-sm font-medium">{selectedTicket.lastUpdated}</span>
        </div>

        {/* Priority with interactive selector */}
        <div className="flex items-center justify-between relative" ref={priorityRef}>
          <span className="text-gray-500 font-medium">Priority</span>
          <div className="relative">
            <button
              onClick={() => setIsPriorityOpen(!isPriorityOpen)}
              className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all hover:ring-1 hover:ring-gray-300 ${getPriorityBadgeClass(
                selectedTicket.priority
              )}`}
              title="Click to change priority"
            >
              <span>{selectedTicket.priority}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {isPriorityOpen && (
              <div className="absolute right-0 top-9 w-36 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-40 text-sm">
                {priorities.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      updateTicketPriority(selectedTicket.id, p);
                      setIsPriorityOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors text-sm ${
                      p === selectedTicket.priority
                        ? 'bg-gray-100 font-bold text-black'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{p}</span>
                    {p === selectedTicket.priority && (
                      <Check className="w-4 h-4 text-black" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status with interactive selector */}
        <div className="flex items-center justify-between relative" ref={statusRef}>
          <span className="text-gray-500 font-medium">Status</span>
          <div className="relative">
            <button
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className={`px-3.5 py-1 rounded-lg text-xs sm:text-sm flex items-center gap-1.5 transition-all hover:ring-1 hover:ring-gray-300 ${getStatusBadgeClass(
                selectedTicket.status
              )}`}
              title="Click to update status"
            >
              <span>{selectedTicket.status}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {isStatusOpen && (
              <div className="absolute right-0 top-9 w-40 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-40 text-sm">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      updateTicketStatus(selectedTicket.id, s);
                      setIsStatusOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors text-sm ${
                      s === selectedTicket.status
                        ? 'bg-gray-100 font-bold text-black'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{s}</span>
                    {s === selectedTicket.status && (
                      <Check className="w-4 h-4 text-black" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Assigned To */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Assigned To</span>
          <button
            onClick={() => setIsReassignModalOpen(true)}
            className="font-semibold text-gray-950 hover:underline text-right text-sm"
            title="Click to reassign ticket"
          >
            {selectedTicket.assignedTo.name}
          </button>
        </div>
      </div>
    </div>
  );
};
