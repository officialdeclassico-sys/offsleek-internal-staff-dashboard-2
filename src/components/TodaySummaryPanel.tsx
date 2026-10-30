import React from 'react';
import { BarChart2 } from 'lucide-react';
import { useBreak } from '../context/BreakContext';

export const TodaySummaryPanel: React.FC = () => {
  const { todayStats } = useBreak();

  const total = todayStats.total || 5;
  const onTime = todayStats.onTime;
  const exceeded = todayStats.exceeded;
  const notTaken = todayStats.notTaken;

  // Donut chart stroke calculations (circumference for r=38 is 2 * Math.PI * 38 ≈ 238.76)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  const onTimePercent = total > 0 ? onTime / total : 0;
  const exceededPercent = total > 0 ? exceeded / total : 0;
  const notTakenPercent = total > 0 ? notTaken / total : 0;

  const onTimeDash = onTimePercent * circumference;
  const exceededDash = exceededPercent * circumference;
  const notTakenDash = notTakenPercent * circumference;

  // Offsets
  const onTimeOffset = 0;
  const exceededOffset = -onTimeDash;
  const notTakenOffset = -(onTimeDash + exceededDash);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-3.5 border-b border-gray-100">
        <BarChart2 className="w-5 h-5 text-gray-900" />
        <h3 className="font-bold text-xl text-gray-950 tracking-tight">
          Today's Summary
        </h3>
      </div>

      {/* Donut Chart & Legend Row */}
      <div className="py-4 my-auto flex items-center justify-between gap-6">
        {/* Circular Donut Chart */}
        <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#f3f4f6"
              strokeWidth="12"
            />

            {/* On-Time Arc (Green) */}
            {onTime > 0 && (
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="#10b981" // emerald-500
                strokeWidth="12"
                strokeDasharray={`${onTimeDash} ${circumference}`}
                strokeDashoffset={onTimeOffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            )}

            {/* Exceeded Arc (Coral/Red) */}
            {exceeded > 0 && (
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="#f87171" // red-400
                strokeWidth="12"
                strokeDasharray={`${exceededDash} ${circumference}`}
                strokeDashoffset={exceededOffset}
                className="transition-all duration-500"
              />
            )}

            {/* Not Taken Arc (Grey) */}
            {notTaken > 0 && (
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="#d1d5db"
                strokeWidth="12"
                strokeDasharray={`${notTakenDash} ${circumference}`}
                strokeDashoffset={notTakenOffset}
                className="transition-all duration-500"
              />
            )}
          </svg>

          {/* Center Text inside Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
            <span className="text-xl font-extrabold text-gray-950 leading-none">
              {onTime} / {total}
            </span>
            <span className="text-xs text-gray-500 font-semibold mt-1 leading-tight">
              On Time
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="text-gray-700 font-medium">On Time</span>
            </div>
            <span className="font-extrabold text-base text-gray-950">{onTime}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-red-400 shrink-0"></span>
              <span className="text-gray-700 font-medium">Exceeded</span>
            </div>
            <span className="font-extrabold text-base text-gray-950">{exceeded}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-gray-300 shrink-0"></span>
              <span className="text-gray-700 font-medium">Not Taken</span>
            </div>
            <span className="font-extrabold text-base text-gray-950">{notTaken}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
