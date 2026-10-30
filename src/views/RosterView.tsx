import React, { useState } from 'react';
import {
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  Clock,
  Filter,
} from 'lucide-react';

interface RosterDayShift {
  type: 'day' | 'night' | 'off' | 'leave' | 'holiday';
  text: string;
  subtext?: string;
}

interface RosterEmployee {
  id: string;
  empId: string;
  name: string;
  initials: string;
  avatarBg: string;
  department: string;
  shifts: Record<string, RosterDayShift>;
}

export const RosterView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedShift, setSelectedShift] = useState('All Shift Types');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  const employees: RosterEmployee[] = [
    {
      id: 'emp-1',
      empId: 'EMP-1006',
      name: 'Neha Sharma',
      initials: 'NS',
      avatarBg: 'bg-black text-white',
      department: 'Support Team',
      shifts: {
        '13': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '14': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '15': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '16': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '17': { type: 'off', text: 'Off' },
        '18': { type: 'off', text: 'Off' },
        '19': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
      },
    },
    {
      id: 'emp-2',
      empId: 'EMP-1007',
      name: 'Aman Verma',
      initials: 'AV',
      avatarBg: 'bg-blue-600 text-white',
      department: 'Support Team',
      shifts: {
        '13': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '14': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '15': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '16': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '17': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '18': { type: 'off', text: 'Off' },
        '19': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
      },
    },
    {
      id: 'emp-3',
      empId: 'EMP-1008',
      name: 'Priya Reddy',
      initials: 'PR',
      avatarBg: 'bg-purple-600 text-white',
      department: 'Support Team',
      shifts: {
        '13': { type: 'night', text: 'Night', subtext: '6 PM - 3 AM' },
        '14': { type: 'night', text: 'Night', subtext: '6 PM - 3 AM' },
        '15': { type: 'night', text: 'Night', subtext: '6 PM - 3 AM' },
        '16': { type: 'night', text: 'Night', subtext: '6 PM - 3 AM' },
        '17': { type: 'off', text: 'Off' },
        '18': { type: 'off', text: 'Off' },
        '19': { type: 'night', text: 'Night', subtext: '6 PM - 3 AM' },
      },
    },
    {
      id: 'emp-4',
      empId: 'EMP-1009',
      name: 'Rahul Kumar',
      initials: 'RK',
      avatarBg: 'bg-emerald-600 text-white',
      department: 'Support Team',
      shifts: {
        '13': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '14': { type: 'leave', text: 'On Leave' },
        '15': { type: 'leave', text: 'On Leave' },
        '16': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '17': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '18': { type: 'off', text: 'Off' },
        '19': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
      },
    },
    {
      id: 'emp-5',
      empId: 'EMP-1010',
      name: 'Sneha Tiwari',
      initials: 'ST',
      avatarBg: 'bg-amber-600 text-white',
      department: 'Support Team',
      shifts: {
        '13': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '14': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '15': { type: 'off', text: 'Off' },
        '16': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '17': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '18': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '19': { type: 'off', text: 'Off' },
      },
    },
    {
      id: 'emp-6',
      empId: 'EMP-1011',
      name: 'Vikram Singh',
      initials: 'VK',
      avatarBg: 'bg-teal-600 text-white',
      department: 'Support Team',
      shifts: {
        '13': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '14': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '15': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '16': { type: 'holiday', text: 'Holiday' },
        '17': { type: 'holiday', text: 'Holiday' },
        '18': { type: 'off', text: 'Off' },
        '19': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
      },
    },
    {
      id: 'emp-7',
      empId: 'EMP-1012',
      name: 'Meera Thomas',
      initials: 'MT',
      avatarBg: 'bg-indigo-600 text-white',
      department: 'Support Team',
      shifts: {
        '13': { type: 'night', text: 'Night', subtext: '6 PM - 3 AM' },
        '14': { type: 'night', text: 'Night', subtext: '6 PM - 3 AM' },
        '15': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '16': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '17': { type: 'off', text: 'Off' },
        '18': { type: 'off', text: 'Off' },
        '19': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
      },
    },
    {
      id: 'emp-8',
      empId: 'EMP-1013',
      name: 'Arjun Ramesh',
      initials: 'AR',
      avatarBg: 'bg-rose-600 text-white',
      department: 'Support Team',
      shifts: {
        '13': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '14': { type: 'off', text: 'Off' },
        '15': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '16': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '17': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
        '18': { type: 'off', text: 'Off' },
        '19': { type: 'day', text: 'Day', subtext: '9 AM - 6 PM' },
      },
    },
  ];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const renderBadge = (shift: RosterDayShift) => {
    switch (shift.type) {
      case 'day':
        return (
          <div className="px-2 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-center font-medium">
            <div className="font-bold text-xs leading-tight">Day</div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 mt-0.5">{shift.subtext}</div>
          </div>
        );
      case 'night':
        return (
          <div className="px-2 py-1.5 rounded-lg bg-purple-50 border border-purple-200/80 text-purple-950 text-center font-medium">
            <div className="font-bold text-xs leading-tight">Night</div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-purple-700 mt-0.5">{shift.subtext}</div>
          </div>
        );
      case 'off':
        return (
          <div className="px-2 py-2 rounded-lg bg-blue-50/70 border border-blue-200/60 text-blue-700 text-center font-bold text-xs">
            Off
          </div>
        );
      case 'leave':
        return (
          <div className="px-2 py-2 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-800 text-center font-bold text-xs whitespace-nowrap">
            On Leave
          </div>
        );
      case 'holiday':
        return (
          <div className="px-2 py-2 rounded-lg bg-rose-50 border border-rose-200/80 text-rose-700 text-center font-bold text-xs">
            Holiday
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between min-h-[160px] p-6 lg:p-8 relative">
          <div className="z-10 max-w-xl pr-4">
            <p className="text-xs font-bold tracking-[0.25em] text-gray-400 uppercase mb-2">
              ROSTER
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 tracking-tight leading-tight">
              View Your Team Roster
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2 font-normal leading-relaxed">
              Check your working schedule, shifts, and team availability for the selected period.
            </p>
          </div>

          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[48%] lg:w-[45%] pointer-events-none overflow-hidden">
            <img
              src="/assets/aistudio/Support_Team_Roster_Dashboard_4d8a1dbe.png"
              alt="Roster banner"
              className="absolute right-0 top-[-6%] h-[400%] max-w-none object-cover opacity-95 filter contrast-105"
              style={{
                objectPosition: '88% 10%',
                clipPath: 'inset(1.5% 0% 70% 50%)',
                transform: 'scale(1.08)',
              }}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Date range picker */}
        <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-2xs text-sm font-semibold text-gray-800">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>13 Oct 2026 – 19 Oct 2026</span>
          <div className="flex items-center gap-0.5 ml-1">
            <button type="button" className="p-0.5 rounded hover:bg-gray-100 text-gray-400 hover:text-black">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" className="p-0.5 rounded hover:bg-gray-100 text-gray-400 hover:text-black">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, employee ID, or department..."
            className="w-full pl-10 pr-4 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder:text-gray-400 shadow-2xs"
          />
        </div>

        {/* Dropdowns */}
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="px-3.5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl shadow-2xs focus:outline-none cursor-pointer"
        >
          <option>All Departments</option>
          <option>Support Team</option>
        </select>

        <select
          value={selectedShift}
          onChange={(e) => setSelectedShift(e.target.value)}
          className="px-3.5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl shadow-2xs focus:outline-none cursor-pointer"
        >
          <option>All Shift Types</option>
          <option>Day Shift</option>
          <option>Night Shift</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3.5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl shadow-2xs focus:outline-none cursor-pointer"
        >
          <option>All Status</option>
          <option>Working</option>
          <option>Day Off</option>
          <option>On Leave</option>
        </select>

        <button
          type="button"
          className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-2xs transition-colors cursor-pointer"
        >
          Search
        </button>
      </div>

      {/* 3. Main Roster Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Team Roster Table */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs overflow-hidden">
          {/* Header & Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-950">Team Roster</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                View the working schedule of all team members for the selected period.
              </p>
            </div>

            <div className="flex items-center gap-3.5 text-sm font-semibold text-gray-700 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Working</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span>Day Off</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>On Leave</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>Holiday</span>
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-700 font-bold text-xs uppercase tracking-wider">
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-3">Employee</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 px-2 text-center">
                    <div>13 Oct</div>
                    <div className="text-xs text-gray-400 font-medium normal-case">Tue</div>
                  </th>
                  <th className="py-3 px-2 text-center">
                    <div>14 Oct</div>
                    <div className="text-xs text-gray-400 font-medium normal-case">Wed</div>
                  </th>
                  <th className="py-3 px-2 text-center">
                    <div>15 Oct</div>
                    <div className="text-xs text-gray-400 font-medium normal-case">Thu</div>
                  </th>
                  <th className="py-3 px-2 text-center">
                    <div>16 Oct</div>
                    <div className="text-xs text-gray-400 font-medium normal-case">Fri</div>
                  </th>
                  <th className="py-3 px-2 text-center">
                    <div>17 Oct</div>
                    <div className="text-xs text-gray-400 font-medium normal-case">Sat</div>
                  </th>
                  <th className="py-3 px-2 text-center">
                    <div>18 Oct</div>
                    <div className="text-xs text-gray-400 font-medium normal-case">Sun</div>
                  </th>
                  <th className="py-3 px-2 text-center">
                    <div>19 Oct</div>
                    <div className="text-xs text-gray-400 font-medium normal-case">Mon</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEmployees.map((emp, idx) => (
                  <tr key={emp.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-2 text-gray-400 font-semibold">{idx + 1}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${emp.avatarBg}`}>
                          {emp.initials}
                        </div>
                        <div>
                          <p className="font-bold text-gray-950 whitespace-nowrap text-sm">{emp.name}</p>
                          <p className="text-xs text-gray-500 font-mono font-medium">{emp.empId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-700 whitespace-nowrap font-medium text-sm">
                      {emp.department}
                    </td>
                    {['13', '14', '15', '16', '17', '18', '19'].map((day) => (
                      <td key={day} className="py-2.5 px-1.5 align-middle">
                        {renderBadge(emp.shifts[day])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer pagination */}
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100 text-sm text-gray-600">
            <span>Showing 1 to {filteredEmployees.length} of {employees.length} employees</span>
            <div className="flex items-center gap-1.5">
              <button type="button" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button type="button" className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                1
              </button>
              <button type="button" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: My Schedule & Shift Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* My Schedule Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs">
            <div className="flex items-start gap-2.5 mb-4">
              <User className="w-4.5 h-4.5 text-gray-900 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-gray-950">My Schedule</h3>
                <p className="text-xs text-gray-500">Your schedule for the selected period.</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              {[
                { date: '13 Oct', day: 'Tue', shift: 'Day Shift', time: '9:00 AM – 6:00 PM', isDay: true },
                { date: '14 Oct', day: 'Wed', shift: 'Day Shift', time: '9:00 AM – 6:00 PM', isDay: true },
                { date: '15 Oct', day: 'Thu', shift: 'Day Shift', time: '9:00 AM – 6:00 PM', isDay: true },
                { date: '16 Oct', day: 'Fri', shift: 'Day Shift', time: '9:00 AM – 6:00 PM', isDay: true },
                { date: '17 Oct', day: 'Sat', shift: 'Day Off', isOff: true },
                { date: '18 Oct', day: 'Sun', shift: 'Day Off', isOff: true },
                { date: '19 Oct', day: 'Mon', shift: 'Day Shift', time: '9:00 AM – 6:00 PM', isDay: true },
              ].map((s, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/70 border border-gray-100">
                  <div className="text-xs">
                    <span className="font-bold text-gray-950">{s.date}</span>
                    <span className="text-gray-400 ml-1.5 font-medium">{s.day}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        s.isDay ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}
                    />
                    <div className="text-right">
                      <p className="font-bold text-gray-950 leading-tight">{s.shift}</p>
                      {s.time && <p className="text-xs text-gray-500 font-mono">{s.time}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shift Details Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs">
            <div className="flex items-start gap-2.5 mb-3.5">
              <Clock className="w-4.5 h-4.5 text-gray-900 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-gray-950">Shift Details</h3>
                <p className="text-xs text-gray-500">Working hours for different shift types.</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs pt-1">
              <div className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-gray-950">Day Shift</h4>
                  <p className="text-xs text-gray-600 font-medium">9:00 AM – 6:00 PM (9 hrs)</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-gray-950">Night Shift</h4>
                  <p className="text-xs text-gray-600 font-medium">6:00 PM – 3:00 AM (9 hrs)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
