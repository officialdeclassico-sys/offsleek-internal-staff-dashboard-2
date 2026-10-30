import React from 'react';
import { AttendanceHeroBanner } from '../components/attendance/AttendanceHeroBanner';
import { AttendanceKpiCards } from '../components/attendance/AttendanceKpiCards';
import { MarkAttendanceCard } from '../components/attendance/MarkAttendanceCard';
import { AttendanceHistoryCard } from '../components/attendance/AttendanceHistoryCard';
import { TodayProgressCard } from '../components/attendance/TodayProgressCard';
import { MonthlySummaryCard } from '../components/attendance/MonthlySummaryCard';

export const AttendanceView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* 1. Hero Banner */}
      <AttendanceHeroBanner />

      {/* 2. Four KPI Summary Cards in one row on desktop */}
      <AttendanceKpiCards />

      {/* 3. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Mark Attendance & Attendance History */}
        <div className="lg:col-span-7 xl:col-span-8 min-w-0">
          <MarkAttendanceCard />
          <AttendanceHistoryCard />
        </div>

        {/* Right Column: Today's Progress & Monthly Summary */}
        <div className="lg:col-span-5 xl:col-span-4 min-w-0">
          <TodayProgressCard />
          <MonthlySummaryCard />
        </div>
      </div>
    </div>
  );
};
