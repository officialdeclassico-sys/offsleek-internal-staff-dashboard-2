import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  ArrowRight,
  SlidersHorizontal,
  Clock,
  User,
  AlertTriangle,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { useSupport } from '../context/SupportContext';
import { Priority, TicketStatus } from '../types/support';

export const TeamQueueView: React.FC = () => {
  const {
    currentUser,
    isAuthorizedForTeamQueue,
    switchUserRole,
    tickets,
    selectTicket,
  } = useSupport();

  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');

  // Strict RBAC gate: protect route AND data access
  if (!isAuthorizedForTeamQueue) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          Access Restricted: Role Authorization Required
        </h2>
        <p className="text-xs text-gray-500 max-w-md mx-auto mt-2 leading-relaxed">
          The <strong>Team Queue</strong> contains department-wide queue velocity metrics, SLA escalations, and unassigned ticket dispatching. It is protected by OFFSLEEK Security Policy and restricted to <strong>Technical Support Leads</strong> and <strong>Operations Managers</strong>.
        </p>

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-xl text-left max-w-md mx-auto text-xs">
          <div className="flex items-center justify-between text-gray-700">
            <span>Your current role:</span>
            <span className="font-semibold text-gray-900">{currentUser.role}</span>
          </div>
          <div className="flex items-center justify-between text-gray-700 mt-2">
            <span>Required permission:</span>
            <span className="font-semibold text-amber-700">queue:manage_all</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => switchUserRole('support_lead')}
            className="w-full sm:w-auto px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <span>Switch Role to Support Lead (Test Access)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Authorized view
  const filteredTickets = tickets.filter((t) => {
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    if (priorityFilter !== 'All' && t.priority !== priorityFilter) return false;
    return true;
  });

  const openCount = tickets.filter((t) => t.status === 'Open').length;
  const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
  const highPriorityCount = tickets.filter((t) => t.priority === 'High' || t.priority === 'Urgent').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
              Team Queue
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Lead Authorized
            </span>
          </div>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Department-wide ticket pipeline, SLA compliance, and dispatch monitoring.
          </p>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-sm text-gray-500 font-semibold">Open Tickets</span>
          <div className="text-3xl font-extrabold text-gray-950 mt-1">{openCount}</div>
          <span className="text-xs text-red-600 font-bold mt-1.5 inline-block">
            Requires initial review
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-sm text-gray-500 font-semibold">In Progress</span>
          <div className="text-3xl font-extrabold text-gray-950 mt-1">{inProgressCount}</div>
          <span className="text-xs text-amber-700 font-bold mt-1.5 inline-block">
            Actively being investigated
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-sm text-gray-500 font-semibold">High / Urgent Priority</span>
          <div className="text-3xl font-extrabold text-gray-950 mt-1">{highPriorityCount}</div>
          <span className="text-xs text-gray-500 font-semibold mt-1.5 inline-block">
            Target SLA: &lt; 2 hrs
          </span>
        </div>
      </div>

      {/* Queue Filters and Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3.5 bg-gray-50/50">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-gray-700">Status:</span>
            {(['All', 'Open', 'In Progress', 'Resolved'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  statusFilter === s
                    ? 'bg-black text-white shadow-2xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-700">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl text-sm font-medium px-3.5 py-1.5 text-gray-800 focus:outline-none cursor-pointer"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fbfbfb] border-b border-gray-200 text-gray-600 font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Ticket ID</th>
                <th className="py-3.5 px-4">Issue Title</th>
                <th className="py-3.5 px-4">School</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Assignee</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-800">
              {filteredTickets.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  onClick={() => selectTicket(t.id)}
                >
                  <td className="py-4 px-4 font-mono font-bold text-gray-950 text-sm">
                    {t.id}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-gray-950 group-hover:text-black">
                      {t.title}
                    </div>
                    <div className="text-xs text-gray-500 truncate max-w-sm mt-0.5">
                      {t.description}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700 font-medium">
                    {t.school.name}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                        t.priority === 'High' || t.priority === 'Urgent'
                          ? 'bg-red-50 text-red-600 border border-red-200'
                          : t.priority === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-50 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        t.status === 'Open'
                          ? 'bg-red-100 text-red-700'
                          : t.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-800 font-semibold">
                    {t.assignedTo.name}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectTicket(t.id);
                      }}
                      className="px-3.5 py-1.5 bg-white hover:bg-black hover:text-white border border-gray-200 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
