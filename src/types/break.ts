export type BreakType = 'Tea Break' | 'Lunch Break' | 'Snack Break' | 'Smoke Break' | 'Meeting';

export type BreakStatus = 'On Time' | 'Exceeded';

export interface BreakTypeConfig {
  type: BreakType;
  allowedMinutes: number;
  label: string;
  allowedText: string;
  description?: string;
}

export interface ActiveBreak {
  id: string;
  employeeId: string;
  breakType: BreakType;
  startTimestamp: number; // Unix timestamp ms
  startTimeFormatted: string; // "10:15 AM"
  allowedMinutes: number;
}

export interface BreakRecord {
  id: string;
  recordNumber: number;
  employeeId: string;
  date: string; // e.g. "19 Oct 2026"
  monthKey: string; // "2026-10"
  breakType: BreakType;
  startTimestamp: number;
  startTime: string; // "02:00 PM"
  endTimestamp: number;
  endTime: string; // "02:35 PM"
  durationMinutes: number; // 35
  allowedMinutes: number; // 30
  status: BreakStatus;
  exceededByMinutes: number; // 5 or 0
  remarks?: string;
  createdAt: number;
}

export interface BreakSummaryStats {
  onTimeCount: number;
  onTimePct: number;
  exceededCount: number;
  exceededPct: number;
  missedCount: number;
  missedPct: number;
  totalBreaks: number;
}
