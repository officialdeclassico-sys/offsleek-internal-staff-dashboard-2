export type AttendanceStatus = 'Working' | 'Present' | 'Absent' | 'On Leave';

export interface AttendanceRecord {
  id: string;
  date: string; // e.g. "13 Oct 2026"
  day: string; // e.g. "Tue"
  checkIn: string; // e.g. "09:28 AM"
  checkOut: string; // e.g. "--:--" or "06:11 PM"
  totalHours: string; // e.g. "--h --m" or "8h 39m"
  status: AttendanceStatus;
  monthKey: string; // e.g. "2026-10"
}

export interface MonthlyAttendanceStats {
  presentCount: number;
  absentCount: number;
  onLeaveCount: number;
  totalDays: number;
  attendancePercentage: number;
}
