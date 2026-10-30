import React, { useState } from 'react';
import { Square, AlertTriangle, Coffee, Play } from 'lucide-react';
import { useBreak } from '../context/BreakContext';
import { BreakIcon } from './BreakIcons';

export const CurrentBreakPanel: React.FC = () => {
  const {
    activeBreak,
    stopBreak,
    elapsedSeconds,
    isExceeded,
    remainingSeconds,
    startBreak,
  } = useBreak();

  const [isStopping, setIsStopping] = useState(false);
  const [showRemarkPrompt, setShowRemarkPrompt] = useState(false);
  const [remarkInput, setRemarkInput] = useState('');

  // Format MM:SS
  const formatTimeDigits = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const allowedSeconds = (activeBreak?.allowedMinutes || 15) * 60;
  const progressPercent = Math.min(100, Math.round((elapsedSeconds / allowedSeconds) * 100));

  const handleStopClick = () => {
    if (isExceeded) {
      setShowRemarkPrompt(true);
    } else {
      executeStop();
    }
  };

  const executeStop = () => {
    if (isStopping) return;
    setIsStopping(true);
    stopBreak(remarkInput.trim() || undefined);
    setIsStopping(false);
    setShowRemarkPrompt(false);
    setRemarkInput('');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <Coffee className="w-5 h-5 text-gray-900" />
          <h3 className="font-bold text-xl text-gray-950 tracking-tight">
            Current Break
          </h3>
        </div>
        {activeBreak && (
          <span className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live Session</span>
          </span>
        )}
      </div>

      {activeBreak ? (
        <div className="py-4 my-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Break Icon & Start info */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-black shrink-0 shadow-2xs">
                <BreakIcon type={activeBreak.breakType} className="w-8 h-8 text-black stroke-[1.9]" />
              </div>

              <div className="min-w-0">
                <h4 className="text-lg font-bold text-gray-950 tracking-tight">
                  {activeBreak.breakType}
                </h4>
                <div className="text-sm text-gray-600 mt-0.5 font-medium">
                  Started at {activeBreak.startTimeFormatted}
                </div>

                {/* Progress bar */}
                <div className="mt-3.5 w-48 sm:w-64 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isExceeded ? 'bg-red-500 animate-pulse' : 'bg-black'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Center/Right: Digital Timer & Status */}
            <div className="flex items-center justify-between lg:justify-end gap-6 sm:gap-8">
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block">
                  Time Elapsed
                </span>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${
                      isExceeded ? 'text-red-600' : 'text-gray-950'
                    }`}
                  >
                    {formatTimeDigits(elapsedSeconds)}
                  </span>
                  <span className="text-sm text-gray-600 font-medium">
                    of {activeBreak.allowedMinutes} mins
                  </span>
                </div>

                <div className="mt-1">
                  {isExceeded ? (
                    <span className="text-sm font-bold text-red-600 flex items-center gap-1.5 sm:justify-end">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>
                        Exceeded by {Math.ceil((elapsedSeconds - allowedSeconds) / 60)} min
                        {Math.ceil((elapsedSeconds - allowedSeconds) / 60) > 1 ? 's' : ''}!
                      </span>
                    </span>
                  ) : (
                    <span className="text-sm text-gray-600 font-medium">
                      {Math.ceil(remainingSeconds / 60)} minutes remaining
                    </span>
                  )}
                </div>
              </div>

              {/* Stop Break Button */}
              <button
                type="button"
                onClick={handleStopClick}
                disabled={isStopping}
                className="px-6 py-3 bg-black hover:bg-neutral-800 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0 active:scale-[0.98]"
              >
                <Square className="w-4 h-4 fill-current shrink-0" />
                <span>Stop Break</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State - Compact, well-grouped, no wasted void */
        <div className="py-5 sm:py-6 flex flex-col items-center justify-center text-center my-auto">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 mb-3 shadow-2xs">
            <Coffee className="w-7 h-7 text-gray-800" />
          </div>
          <h4 className="text-base font-bold text-gray-900">No active break session</h4>
          <p className="text-sm text-gray-600 max-w-md mt-1 font-medium">
            Ready for a recharge? Select one of the break options above to start your timer.
          </p>
          <button
            type="button"
            onClick={() => startBreak('Tea Break')}
            className="mt-3.5 px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current shrink-0" />
            <span>Quick Start: Tea Break (15m)</span>
          </button>
        </div>
      )}

      {/* Exceeded Break Remark Prompt Modal */}
      {showRemarkPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-red-600 mb-2 font-bold text-base">
              <AlertTriangle className="w-5 h-5" />
              <span>Break Exceeded Limit</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              Your {activeBreak?.breakType} exceeded the allowed {activeBreak?.allowedMinutes} minutes by approximately{' '}
              <strong className="text-red-600 font-semibold">
                {Math.ceil((elapsedSeconds - allowedSeconds) / 60)} minutes
              </strong>
              . You may optionally enter a brief note for team reporting.
            </p>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Reason / Remark (Optional)
              </label>
              <input
                type="text"
                value={remarkInput}
                onChange={(e) => setRemarkInput(e.target.value)}
                placeholder="e.g., Traffic delay, Cafeteria queue, Client emergency..."
                className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:border-black focus:outline-none"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowRemarkPrompt(false);
                  executeStop();
                }}
                className="px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
              >
                Skip Remark
              </button>
              <button
                type="button"
                onClick={executeStop}
                className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white text-sm font-bold rounded-xl transition-colors"
              >
                Save & Stop Break
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
