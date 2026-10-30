import React from 'react';
import { Clock, Play, CheckCircle2 } from 'lucide-react';
import { useBreak } from '../context/BreakContext';
import { BREAK_CONFIGS } from '../data/breakData';
import { BreakIcon } from './BreakIcons';
import { BreakType } from '../types/break';

export const BreakTypeCards: React.FC = () => {
  const { activeBreak, startBreak } = useBreak();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 items-stretch">
      {BREAK_CONFIGS.map((config) => {
        const isCurrentActive = activeBreak?.breakType === config.type;
        const isOtherActive = activeBreak !== null && !isCurrentActive;

        return (
          <div
            key={config.type}
            className={`bg-white rounded-2xl border p-5 flex flex-col items-center text-center justify-between transition-all duration-200 ${
              isCurrentActive
                ? 'border-black ring-2 ring-black shadow-md'
                : 'border-gray-200 hover:border-gray-300 shadow-2xs'
            }`}
          >
            {/* Break Icon & Title */}
            <div className="flex flex-col items-center w-full">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-black mb-3.5 shadow-2xs">
                <BreakIcon type={config.type} className="w-7 h-7 text-black stroke-[1.9]" />
              </div>

              <h3 className="font-bold text-lg text-gray-950 tracking-tight leading-snug">
                {config.label}
              </h3>

              <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1.5 font-medium">
                <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{config.allowedText}</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="w-full mt-5">
              {isCurrentActive ? (
                <div className="w-full py-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-sm font-bold flex items-center justify-center gap-2 animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Break in Progress</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => startBreak(config.type)}
                  disabled={isOtherActive}
                  className={`w-full py-2.5 px-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    isOtherActive
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                      : 'bg-black text-white hover:bg-neutral-800 shadow-sm cursor-pointer active:scale-[0.98]'
                  }`}
                  title={
                    isOtherActive
                      ? `Stop ${activeBreak?.breakType} first to start ${config.label}`
                      : `Start ${config.label}`
                  }
                >
                  <Play className="w-4 h-4 fill-current shrink-0" />
                  <span>Start Break</span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
