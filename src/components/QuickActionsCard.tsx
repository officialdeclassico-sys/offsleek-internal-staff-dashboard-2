import React from 'react';
import {
  Zap,
  FileEdit,
  Users,
  RotateCw,
  CheckCircle2,
} from 'lucide-react';
import { useSupport } from '../context/SupportContext';

export const QuickActionsCard: React.FC = () => {
  const {
    selectedTicket,
    setActiveConversationTab,
    setIsReassignModalOpen,
    setIsResolveModalOpen,
    updateTicketStatus,
  } = useSupport();

  const handleAddInternalNote = () => {
    setActiveConversationTab('internal_notes');
  };

  const handleMarkInProgress = async () => {
    await updateTicketStatus(selectedTicket.id, 'In Progress');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
        <Zap className="w-4.5 h-4.5 text-gray-800" />
        <h3 className="font-bold text-base text-gray-950 tracking-tight">
          Quick Actions
        </h3>
      </div>

      {/* 2x2 Grid of Actions */}
      <div className="grid grid-cols-2 gap-3">
        {/* Action 1: Add Internal Note */}
        <button
          type="button"
          onClick={handleAddInternalNote}
          className="flex items-center gap-2.5 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-left group cursor-pointer shadow-2xs"
        >
          <FileEdit className="w-4.5 h-4.5 text-gray-600 group-hover:text-black shrink-0" />
          <span className="text-sm font-semibold text-gray-800 group-hover:text-black leading-tight">
            Add Internal Note
          </span>
        </button>

        {/* Action 2: Reassign Ticket */}
        <button
          type="button"
          onClick={() => setIsReassignModalOpen(true)}
          className="flex items-center gap-2.5 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-left group cursor-pointer shadow-2xs"
        >
          <Users className="w-4.5 h-4.5 text-gray-600 group-hover:text-black shrink-0" />
          <span className="text-sm font-semibold text-gray-800 group-hover:text-black leading-tight">
            Reassign Ticket
          </span>
        </button>

        {/* Action 3: Mark as In Progress */}
        <button
          type="button"
          onClick={handleMarkInProgress}
          disabled={selectedTicket.status === 'In Progress'}
          className={`flex items-center gap-2.5 p-3 bg-white border border-gray-200 rounded-xl transition-all text-left group shadow-2xs ${
            selectedTicket.status === 'In Progress'
              ? 'opacity-50 cursor-not-allowed bg-gray-50'
              : 'hover:bg-gray-50 hover:border-gray-300 cursor-pointer'
          }`}
          title={
            selectedTicket.status === 'In Progress'
              ? 'Ticket is already In Progress'
              : 'Update status to In Progress'
          }
        >
          <RotateCw
            className={`w-4.5 h-4.5 text-gray-600 group-hover:text-black shrink-0 ${
              selectedTicket.status === 'In Progress' ? 'text-amber-600' : ''
            }`}
          />
          <span className="text-sm font-semibold text-gray-800 group-hover:text-black leading-tight">
            Mark as In Progress
          </span>
        </button>

        {/* Action 4: Resolve Ticket */}
        <button
          type="button"
          onClick={() => setIsResolveModalOpen(true)}
          disabled={selectedTicket.status === 'Resolved'}
          className={`flex items-center gap-2.5 p-3 bg-white border border-gray-200 rounded-xl transition-all text-left group shadow-2xs ${
            selectedTicket.status === 'Resolved'
              ? 'opacity-50 cursor-not-allowed bg-gray-50'
              : 'hover:bg-gray-50 hover:border-gray-300 cursor-pointer'
          }`}
          title={
            selectedTicket.status === 'Resolved'
              ? 'Ticket is already Resolved'
              : 'Open Resolution Dialog'
          }
        >
          <CheckCircle2
            className={`w-4.5 h-4.5 text-gray-600 group-hover:text-black shrink-0 ${
              selectedTicket.status === 'Resolved' ? 'text-emerald-600' : ''
            }`}
          />
          <span className="text-sm font-semibold text-gray-800 group-hover:text-black leading-tight">
            Resolve Ticket
          </span>
        </button>
      </div>
    </div>
  );
};

