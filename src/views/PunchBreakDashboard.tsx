import React from 'react';
import { PunchBreakHeader } from '../components/PunchBreakHeader';
import { BreakTypeCards } from '../components/BreakTypeCards';
import { CurrentBreakPanel } from '../components/CurrentBreakPanel';
import { TodaySummaryPanel } from '../components/TodaySummaryPanel';
import { MonthlyBreakReport } from '../components/MonthlyBreakReport';

export const PunchBreakDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 1. Header with Title, Subtitle, and Illustration */}
      <PunchBreakHeader />

      {/* 2. Break Type Cards (5 horizontal cards) */}
      <BreakTypeCards />

      {/* 3. Middle Row: Current Break & Today's Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8">
          <CurrentBreakPanel />
        </div>
        <div className="lg:col-span-4">
          <TodaySummaryPanel />
        </div>
      </div>

      {/* 4. Monthly Break Report with summary cards, table, and pagination */}
      <MonthlyBreakReport />
    </div>
  );
};
