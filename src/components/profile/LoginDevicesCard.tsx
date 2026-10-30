import React, { useState } from 'react';
import {
  Monitor,
  Laptop,
  MoreVertical,
  LogOut,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  X,
} from 'lucide-react';
import { DeviceSession } from '../../types/profile';

interface LoginDevicesCardProps {
  sessions: DeviceSession[];
  onRevokeSession: (sessionId: string) => void;
}

export const LoginDevicesCard: React.FC<LoginDevicesCardProps> = ({
  sessions,
  onRevokeSession,
}) => {
  const [activeMenuSessionId, setActiveMenuSessionId] = useState<string | null>(null);
  const [confirmingSession, setConfirmingSession] = useState<DeviceSession | null>(null);

  const handleRevokeConfirm = () => {
    if (confirmingSession) {
      onRevokeSession(confirmingSession.id);
      setConfirmingSession(null);
      setActiveMenuSessionId(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs flex flex-col justify-between">
        <div>
          {/* Card Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                <Monitor className="w-4 h-4 text-gray-900" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-950">Login Devices</h2>
                <p className="text-sm text-gray-500 mt-0.5">Devices used to access your account.</p>
              </div>
            </div>
          </div>

          {/* Device Policy Note */}
          <div className="mb-4 px-3.5 py-2 bg-gray-50 border border-gray-200/70 rounded-lg flex items-center justify-between text-xs text-gray-600">
            <span className="flex items-center gap-1.5 font-semibold text-gray-700">
              <ShieldCheck className="w-4 h-4 text-gray-800" />
              Policy: Desktop &amp; Authorized Laptops Only
            </span>
            <span className="text-xs text-gray-500">Mobile Logins Restricted</span>
          </div>

          {/* Device Sessions List */}
          <div className="space-y-3">
            {sessions.map((device) => {
              const isMenuOpen = activeMenuSessionId === device.id;

              return (
                <div
                  key={device.id}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-gray-150 bg-white hover:border-gray-200 transition-colors relative"
                >
                  {/* Left: Device icon & details */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-gray-100/80 border border-gray-200 flex items-center justify-center shrink-0">
                      {device.deviceType === 'laptop' ? (
                        <Laptop className="w-5 h-5 text-gray-800" />
                      ) : (
                        <Monitor className="w-5 h-5 text-gray-800" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 truncate">
                        {device.os} • {device.browser}
                      </h4>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {device.location}
                      </p>
                    </div>
                  </div>

                  {/* Right: Status badge & last active info */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      {device.status === 'Active' ? (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          Inactive
                        </span>
                      )}
                      <p className="text-xs text-gray-400 font-normal mt-0.5">
                        {device.lastActive}
                      </p>
                    </div>

                    {/* Action dropdown for inactive or secondary sessions */}
                    {!device.isCurrentDevice && (
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveMenuSessionId(isMenuOpen ? null : device.id)
                          }
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                          title="Session options"
                          aria-label="Session options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {isMenuOpen && (
                          <div className="absolute right-0 top-8 z-30 w-36 bg-white rounded-xl shadow-lg border border-gray-200 py-1 animate-in fade-in zoom-in-95 duration-100">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuSessionId(null);
                                setConfirmingSession(device);
                              }}
                              className="w-full px-3 py-1.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer transition-colors"
                            >
                              <LogOut className="w-3.5 h-3.5" />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Revocation Confirmation Modal */}
      {confirmingSession && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setConfirmingSession(null)}
        >
          <div
            className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-sm overflow-hidden p-6 animate-in zoom-in-95 duration-150 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Revoke Device Session?</h3>
            <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
              Are you sure you want to sign out <strong className="text-gray-900">{confirmingSession.os} • {confirmingSession.browser}</strong> in {confirmingSession.location}? The user will be required to authenticate again.
            </p>

            <div className="mt-6 flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setConfirmingSession(null)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRevokeConfirm}
                className="px-4 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                Revoke Session
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
