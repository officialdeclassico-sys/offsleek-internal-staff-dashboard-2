import React, { useState } from 'react';
import { X, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';
import { useMeetings } from '../../context/MeetingContext';

export const JoinWithCodeModal: React.FC = () => {
  const {
    isJoinCodeModalOpen,
    setIsJoinCodeModalOpen,
    joinWithCode,
  } = useMeetings();

  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isJoinCodeModalOpen) return null;

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!inputCode.trim()) {
      setError('Please enter a valid meeting code or link.');
      return;
    }

    const res = joinWithCode(inputCode.trim());
    if (!res.success) {
      setError(res.message);
      return;
    }

    setIsJoinCodeModalOpen(false);
    setInputCode('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={() => setIsJoinCodeModalOpen(false)}
    >
      <div
        className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#fbfbfb]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-950">Join with Code</h3>
              <p className="text-xs text-gray-500 font-medium">Enter a meeting code or paste a link</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsJoinCodeModalOpen(false)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleJoin} className="p-6 space-y-4.5 text-sm">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-700 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4.5 h-4.5 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Meeting Code or URL *
            </label>
            <input
              type="text"
              required
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="e.g. standup-sync-44 or https://meet.offsleek.internal/..."
              className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 placeholder:text-gray-400 font-mono"
            />
          </div>

          <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-xs space-y-1.5">
            <p className="font-bold text-gray-800">Quick Test Codes:</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['standup-sync-44', 'auth-triage-102', 'one-on-one-aman'].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setInputCode(code)}
                  className="px-2.5 py-1 bg-white border border-gray-200 rounded-md text-xs font-mono text-purple-700 hover:border-purple-300 font-semibold cursor-pointer shadow-2xs"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsJoinCodeModalOpen(false)}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors cursor-pointer shadow-2xs flex items-center gap-2"
            >
              <span>Join Meeting</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
