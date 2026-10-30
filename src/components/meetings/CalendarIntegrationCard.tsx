import React, { useState } from 'react';
import { Calendar, CheckCircle2, RefreshCw, Unlink, ExternalLink } from 'lucide-react';
import { useMeetings } from '../../context/MeetingContext';

export const CalendarIntegrationCard: React.FC = () => {
  const {
    isCalendarConnected,
    connectedCalendarEmail,
    connectCalendar,
    disconnectCalendar,
  } = useMeetings();

  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      connectCalendar('neha.sharma@offsleek.com');
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Info & Logo */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            {/* Google Calendar official 4-color look SVG */}
            <svg className="w-7 h-7" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="3" fill="#ffffff" stroke="#4285F4" strokeWidth="2" />
              <path d="M3 9h18" stroke="#4285F4" strokeWidth="2" />
              <rect x="7" y="2" width="2" height="4" rx="1" fill="#EA4335" />
              <rect x="15" y="2" width="2" height="4" rx="1" fill="#34A853" />
              <rect x="7" y="12" width="4" height="4" rx="1" fill="#FBBC05" />
              <rect x="13" y="12" width="4" height="4" rx="1" fill="#4285F4" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg font-bold text-gray-950">Calendar Integration</h3>
              {isCalendarConnected && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Synced
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              {isCalendarConnected
                ? `Syncing authorized meetings with ${connectedCalendarEmail}`
                : 'Sync your scheduled meetings directly to your Google Calendar.'}
            </p>
          </div>
        </div>

        {/* Right: Connect / Disconnect button */}
        <div className="shrink-0">
          {isCalendarConnected ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={disconnectCalendar}
                className="px-4 py-2.5 text-sm font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
              >
                <Unlink className="w-4 h-4" />
                <span>Disconnect</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={isConnecting}
              onClick={handleConnect}
              className="px-4.5 py-2.5 text-sm font-semibold text-white bg-black hover:bg-gray-800 rounded-xl transition-colors cursor-pointer shadow-2xs flex items-center gap-2"
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Connect Calendar</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
