import React, { useState } from 'react';
import { useSupport } from '../context/SupportContext';
import { ChevronDown, Check, ArrowLeftRight } from 'lucide-react';

export const TicketHeader: React.FC = () => {
  const { selectedTicket, tickets, selectTicket } = useSupport();
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">
            Ticket {selectedTicket.id}
          </span>
          <span className="text-gray-300 font-bold">&bull;</span>
          <span className="text-xs font-semibold text-gray-600">
            {selectedTicket.school.name}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight leading-tight">
          {selectedTicket.title}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-1 font-normal leading-relaxed">
          {selectedTicket.description}
        </p>
      </div>

      {/* Quick Ticket Switcher */}
      <div className="relative shrink-0">
        <button
          onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
          className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-gray-800 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-2xs transition-colors"
          title="Switch Ticket"
        >
          <ArrowLeftRight className="w-4 h-4 text-gray-600" />
          <span>Switch Ticket ({selectedTicket.id})</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

        {isSwitcherOpen && (
          <div className="absolute right-0 top-11 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-2.5 z-40 text-sm">
            <div className="px-2.5 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Available Tickets ({tickets.length})
            </div>
            <div className="space-y-1 mt-1 max-h-64 overflow-y-auto">
              {tickets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    selectTicket(t.id);
                    setIsSwitcherOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-colors ${
                    t.id === selectedTicket.id
                      ? 'bg-slate-100 font-bold text-black'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="truncate text-sm font-semibold">
                      <span className="font-bold font-mono">{t.id}:</span> {t.title}
                    </div>
                    <div className="text-xs text-gray-500 truncate mt-0.5">
                      {t.school.name}
                    </div>
                  </div>
                  {t.id === selectedTicket.id && (
                    <Check className="w-4 h-4 text-black shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
