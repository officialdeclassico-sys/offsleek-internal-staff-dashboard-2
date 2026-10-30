import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  X,
  Ticket as TicketIcon,
  Building2,
  BookOpen,
  AlertCircle,
  CheckCheck,
} from 'lucide-react';
import { useSupport } from '../context/SupportContext';
import { KNOWLEDGE_BASE_ARTICLES } from '../data/mockData';

export const TopNav: React.FC = () => {
  const {
    currentUser,
    tickets,
    selectTicket,
    setActiveNav,
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead,
    switchUserRole,
    articles,
    selectArticle,
  } = useSupport();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Global shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search results
  const q = searchQuery.toLowerCase().trim();
  const matchedTickets = q
    ? tickets.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.school.name.toLowerCase().includes(q)
      )
    : [];

  const matchedSchools = q
    ? Array.from(new Set(tickets.map((t) => t.school))).filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.contactPerson.toLowerCase().includes(q)
      )
    : [];

  const matchedArticles = q
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    : [];

  const hasResults =
    q.length > 0 &&
    (matchedTickets.length > 0 || matchedSchools.length > 0 || matchedArticles.length > 0);

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Input Bar */}
      <div className="flex-1 max-w-xl relative" ref={searchContainerRef}>
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Search tickets, schools, issues, or knowledge base..."
            className="w-full bg-[#fbfbfb] hover:bg-white focus:bg-white text-gray-900 placeholder-gray-400 text-sm rounded-xl pl-10 pr-9 py-2.5 border border-gray-200 focus:border-black focus:outline-none transition-all shadow-2xs font-normal"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="absolute right-3 px-2 py-0.5 text-xs text-gray-400 bg-gray-100 border border-gray-200 rounded font-mono pointer-events-none">
              /
            </kbd>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isSearchFocused && q.length > 0 && (
          <div className="absolute left-0 right-0 top-12 bg-white rounded-xl shadow-xl border border-gray-200 p-2.5 z-50 max-h-96 overflow-y-auto">
            {hasResults ? (
              <div className="space-y-3.5">
                {/* Tickets Results */}
                {matchedTickets.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 py-1 flex items-center gap-2">
                      <TicketIcon className="w-3.5 h-3.5 text-gray-400" />
                      <span>Tickets ({matchedTickets.length})</span>
                    </div>
                    <div className="space-y-1">
                      {matchedTickets.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            selectTicket(t.id);
                            setIsSearchFocused(false);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-between text-sm"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="font-semibold text-gray-950 truncate">
                              <span className="font-bold text-black font-mono">{t.id}:</span>{' '}
                              {t.title}
                            </div>
                            <div className="text-xs text-gray-500 truncate mt-0.5">
                              {t.school.name} &bull; {t.reportedBy}
                            </div>
                          </div>
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full font-semibold shrink-0 ${
                              t.status === 'Open'
                                ? 'bg-red-50 text-red-600 border border-red-100'
                                : t.status === 'In Progress'
                                ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            }`}
                          >
                            {t.status}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Schools Results */}
                {matchedSchools.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 py-1 flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      <span>Schools ({matchedSchools.length})</span>
                    </div>
                    <div className="space-y-1">
                      {matchedSchools.map((s) => (
                        <div
                          key={s.id}
                          className="px-2.5 py-2 rounded-lg hover:bg-gray-50 text-sm flex items-center justify-between"
                        >
                          <div>
                            <span className="font-semibold text-gray-950">{s.name}</span>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {s.location} &bull; Contact: {s.contactPerson}
                            </div>
                          </div>
                          <span className="text-xs font-mono text-gray-400">
                            {s.phone}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Knowledge Base Results */}
                {matchedArticles.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 py-1 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                      <span>Knowledge Base Articles ({matchedArticles.length})</span>
                    </div>
                    <div className="space-y-1">
                      {matchedArticles.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => {
                            selectArticle(a.id);
                            setActiveNav('knowledge_base');
                            setIsSearchFocused(false);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                        >
                          <div className="font-semibold text-gray-950">{a.title}</div>
                          <div className="text-xs text-gray-500 truncate mt-0.5">
                            {a.description || a.summary}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center text-sm text-gray-500">
                <AlertCircle className="w-7 h-7 text-gray-300 mx-auto mb-2" />
                No matching tickets, schools, or articles for "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls: Notifications & User profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-100 transition-colors relative"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotifOpen && (
            <div className="absolute right-0 top-12 w-88 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 p-3.5 z-50 text-sm">
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                <span className="font-bold text-gray-950 text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-gray-500 hover:text-black flex items-center gap-1 font-semibold"
                  >
                    <CheckCheck className="w-4 h-4" />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              <div className="mt-2 divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationRead(n.id);
                      if (n.ticketId) {
                        selectTicket(n.ticketId);
                        setIsNotifOpen(false);
                      }
                    }}
                    className={`py-2.5 px-2 rounded-lg cursor-pointer transition-colors ${
                      !n.read ? 'bg-slate-50 font-medium' : 'hover:bg-gray-50 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-900">{n.title}</span>
                      <span className="text-xs text-gray-400 font-mono">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                      {n.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Employee Pill Avatar & Name */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 pl-2.5 pr-2 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {/* Gray avatar circle with NS initials */}
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-xs shrink-0">
              {currentUser.avatarText}
            </div>
            <span className="text-sm font-bold text-gray-900 hidden sm:inline">
              {currentUser.name}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-2.5 z-50 text-sm">
              <div className="px-2.5 py-2 border-b border-gray-100">
                <div className="font-bold text-gray-950 text-sm">{currentUser.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{currentUser.email}</div>
                <div className="mt-1.5 inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 font-semibold">
                  <span>Role: {currentUser.role}</span>
                </div>
              </div>

              <div className="py-1.5">
                <div className="px-2.5 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Switch Active Role
                </div>
                <button
                  onClick={() => {
                    switchUserRole('support_agent');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center justify-between text-sm"
                >
                  <span>Support Agent</span>
                  {currentUser.roleKey === 'support_agent' && (
                    <span className="w-2 h-2 rounded-full bg-black"></span>
                  )}
                </button>
                <button
                  onClick={() => {
                    switchUserRole('support_lead');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center justify-between text-sm"
                >
                  <span>Support Lead (Unlocks Queue)</span>
                  {currentUser.roleKey === 'support_lead' && (
                    <span className="w-2 h-2 rounded-full bg-black"></span>
                  )}
                </button>
              </div>

              <div className="pt-1.5 border-t border-gray-100">
                <button
                  onClick={() => {
                    setActiveNav('settings');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-black text-sm font-medium"
                >
                  Settings &amp; Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
