import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  Ticket as TicketIcon,
  SlidersHorizontal,
  BookOpen,
  Settings,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  CheckCircle2,
  Lock,
  UserCheck,
  Coffee,
  FileText,
  Video,
  CalendarCheck,
  CalendarDays,
} from 'lucide-react';
import { OffsleekLogo } from './OffsleekLogo';
import { useSupport } from '../context/SupportContext';
import { UserRole } from '../types/support';

export const Sidebar: React.FC = () => {
  const {
    currentUser,
    switchUserRole,
    isAuthorizedForTeamQueue,
    activeNav,
    setActiveNav,
    tickets,
  } = useSupport();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const assignedCount = tickets.filter(
    (t) => t.assignedTo.id === currentUser.id && t.status !== 'Closed' && t.status !== 'Resolved'
  ).length;

  interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string | null;
    isRestricted?: boolean;
  }

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'My Dashboard',
      icon: LayoutDashboard,
      badge: null,
      isRestricted: false,
    },
    {
      id: 'my_tickets',
      label: 'My Assigned Tickets',
      icon: TicketIcon,
      badge: assignedCount > 0 ? assignedCount : null,
      isRestricted: false,
    },
    {
      id: 'knowledge_base',
      label: 'Knowledge Base',
      icon: BookOpen,
      badge: null,
      isRestricted: false,
    },
    {
      id: 'punch_break',
      label: 'Punch Break',
      icon: Coffee,
      badge: null,
      isRestricted: false,
    },
    {
      id: 'my_requests',
      label: 'My Requests',
      icon: FileText,
      badge: null,
      isRestricted: false,
    },
    {
      id: 'meetings',
      label: 'Meetings',
      icon: Video,
      badge: null,
      isRestricted: false,
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: CalendarCheck,
      badge: null,
      isRestricted: false,
    },
    {
      id: 'roster',
      label: 'Roster',
      icon: CalendarDays,
      badge: null,
      isRestricted: false,
    },
    {
      id: 'settings',
      label: 'Profile & Settings',
      icon: Settings,
      badge: null,
      isRestricted: false,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-20">
      {/* Top Logo & Navigation */}
      <div>
        <div className="py-6 px-5 flex justify-center border-b border-gray-100">
          <OffsleekLogo />
        </div>

        <nav className="p-3 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-black text-white shadow-sm font-semibold'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      isActive ? 'text-white' : 'text-gray-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.isRestricted ? (
                  <span
                    className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 font-semibold ${
                      isActive
                        ? 'bg-neutral-800 text-gray-300'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                    title="Restricted to Support Lead / Manager"
                  >
                    <Lock className="w-3 h-3" />
                    <span className="hidden xl:inline">Lead</span>
                  </span>
                ) : item.badge ? (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white text-black'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Role Notice if agent */}
      {!isAuthorizedForTeamQueue && (
        <div className="mx-3 mb-2 p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600">
          <div className="flex items-center gap-1.5 font-bold text-gray-900 text-xs">
            <UserCheck className="w-4 h-4 text-gray-700" />
            <span>Agent View Active</span>
          </div>
          <p className="mt-1 text-xs text-gray-500 leading-relaxed">
            Team Queue requires Lead / Manager role. Switch roles below to test.
          </p>
        </div>
      )}

      {/* Bottom Employee Account Card */}
      <div className="p-3 border-t border-gray-200 relative" ref={userMenuRef}>
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-100 transition-colors text-left group"
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar circle */}
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm shrink-0 tracking-wider">
              {currentUser.avatarText}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-gray-950 truncate">
                {currentUser.name}
              </div>
              <div className="text-xs text-gray-500 truncate flex items-center gap-1.5 mt-0.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shrink-0"></span>
                <span>{currentUser.role}</span>
              </div>
            </div>
          </div>
          {isUserMenuOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-700 shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-700 shrink-0" />
          )}
        </button>

        {/* Popover Menu */}
        {isUserMenuOpen && (
          <div className="absolute bottom-20 left-3 right-3 bg-white rounded-xl shadow-xl border border-gray-200 p-2.5 z-50 text-sm">
            <div className="px-2.5 py-1.5 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Switch Role for Testing
            </div>
            <div className="py-1.5 space-y-1">
              {[
                { key: 'support_agent', label: 'Support Agent (Default)' },
                { key: 'support_lead', label: 'Technical Support Lead' },
                { key: 'support_manager', label: 'Operations Manager' },
              ].map((roleOption) => (
                <button
                  key={roleOption.key}
                  onClick={() => {
                    switchUserRole(roleOption.key as UserRole);
                    setIsUserMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors text-sm ${
                    currentUser.roleKey === roleOption.key
                      ? 'bg-black text-white font-semibold'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>{roleOption.label}</span>
                  {currentUser.roleKey === roleOption.key && (
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-1.5 pt-1.5 border-t border-gray-100">
              <button
                onClick={() => {
                  setActiveNav('settings');
                  setIsUserMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-black flex items-center gap-2.5 text-sm font-medium"
              >
                <Settings className="w-4 h-4 text-gray-500" />
                <span>Account Preferences</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
