import React, { useState } from 'react';
import { useSupport } from '../context/SupportContext';
import { Ticket as TicketIcon, Search, ArrowRight } from 'lucide-react';

export const AssignedTicketsView: React.FC = () => {
  const { currentUser, tickets, selectTicket } = useSupport();
  const [filter, setFilter] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('All');
  const [search, setSearch] = useState('');

  const myTickets = tickets.filter((t) => t.assignedTo.id === currentUser.id);

  const filteredTickets = myTickets.filter((t) => {
    if (filter !== 'All' && t.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        t.id.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.school.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
            My Assigned Tickets
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Active support requests directly assigned to {currentUser.name}.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4.5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3.5">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {(['All', 'Open', 'In Progress', 'Resolved'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                filter === status
                  ? 'bg-black text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter assigned tickets..."
            className="w-full pl-9 pr-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-normal text-gray-900 focus:bg-white focus:border-black focus:outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* List of Tickets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => selectTicket(ticket.id)}
            className="bg-white border border-gray-200 rounded-2xl p-5.5 shadow-2xs hover:border-black transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-mono text-sm font-bold text-gray-950">
                  {ticket.id}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-md font-semibold ${
                      ticket.priority === 'High' || ticket.priority === 'Urgent'
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : ticket.priority === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-50 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {ticket.priority}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      ticket.status === 'Open'
                        ? 'bg-red-100 text-red-700'
                        : ticket.status === 'In Progress'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-bold text-gray-950 group-hover:text-black leading-snug">
                {ticket.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">
                {ticket.description}
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
              <span className="truncate max-w-[200px] font-semibold text-gray-800">
                {ticket.school.name}
              </span>
              <span className="flex items-center gap-1 group-hover:text-black font-semibold text-sm">
                <span>Open ticket</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}

        {filteredTickets.length === 0 && (
          <div className="col-span-full py-12 text-center text-sm text-gray-500 bg-white rounded-2xl border border-gray-200">
            No tickets match your filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};
