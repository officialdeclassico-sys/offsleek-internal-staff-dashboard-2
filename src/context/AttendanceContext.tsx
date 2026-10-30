import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { AttendanceRecord, AttendanceStatus, MonthlyAttendanceStats } from '../types/attendance';
import { INITIAL_ATTENDANCE_RECORDS } from '../data/attendanceData';

interface AttendanceContextType {
  isCheckedIn: boolean;
  checkInTime: string;
  checkOutTime: string;
  todayStatus: 'Checked In' | 'Checked Out';
  workingIndicator: string;
  totalWorkingHours: string;
  currentDateFormatted: string;
  
  // Progress & timer
  elapsedSeconds: number;
  formattedElapsed: string;
  
  // Records & Filtering
  records: AttendanceRecord[];
  selectedMonth: string;
  setSelectedMonth: (m: string) => void;
  selectedStatus: string;
  setSelectedStatus: (s: string) => void;
  filteredRecords: AttendanceRecord[];
  
  // Stats
  monthlyStats: MonthlyAttendanceStats;
  
  // Actions
  handleCheckOut: () => void;
  handleCheckIn: () => void;
  resetToDefault: () => void;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

const STORAGE_KEY_RECORDS = 'offsleek_attendance_records_v1';
const STORAGE_KEY_STATE = 'offsleek_attendance_state_v1';

export const AttendanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load saved records or initial
  const [records, setRecords] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RECORDS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ATTENDANCE_RECORDS;
  });

  // Today's attendance state
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.isCheckedIn ?? true;
      }
    } catch {
      // ignore
    }
    return true; // default checked in as in screenshot
  });

  const [checkInTime, setCheckInTime] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.checkInTime || '09:28 AM';
      }
    } catch {
      // ignore
    }
    return '09:28 AM';
  });

  const [checkOutTime, setCheckOutTime] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.checkOutTime || '--:--';
      }
    } catch {
      // ignore
    }
    return '--:--';
  });

  const [totalWorkingHours, setTotalWorkingHours] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.totalWorkingHours || '--h --m';
      }
    } catch {
      // ignore
    }
    return '--h --m';
  });

  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Filters
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-10');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const currentDateFormatted = '13 Oct 2026, Tue';

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY_STATE,
        JSON.stringify({
          isCheckedIn,
          checkInTime,
          checkOutTime,
          totalWorkingHours,
        })
      );
    } catch {
      // ignore
    }
  }, [isCheckedIn, checkInTime, checkOutTime, totalWorkingHours]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(records));
    } catch {
      // ignore
    }
  }, [records]);

  // Live timer when checked in
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isCheckedIn && checkOutTime === '--:--') {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCheckedIn, checkOutTime]);

  const formattedElapsed = useMemo(() => {
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    return `${hours < 10 ? '0' + hours : hours}h ${minutes < 10 ? '0' + minutes : minutes}m`;
  }, [elapsedSeconds]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      if (selectedMonth !== 'All' && rec.monthKey !== selectedMonth) {
        return false;
      }
      if (selectedStatus !== 'All' && rec.status !== selectedStatus) {
        return false;
      }
      return true;
    });
  }, [records, selectedMonth, selectedStatus]);

  // Calculate monthly stats
  const monthlyStats = useMemo<MonthlyAttendanceStats>(() => {
    const monthRecs = records.filter((r) => r.monthKey === '2026-10');
    const presentCount = monthRecs.filter((r) => r.status === 'Present' || r.status === 'Working').length;
    const absentCount = monthRecs.filter((r) => r.status === 'Absent').length;
    const onLeaveCount = monthRecs.filter((r) => r.status === 'On Leave').length;
    const totalDays = monthRecs.length;
    const attendancePercentage = totalDays > 0 ? Math.round((presentCount / totalDays) * 100) : 90;

    return {
      presentCount,
      absentCount,
      onLeaveCount,
      totalDays,
      attendancePercentage,
    };
  }, [records]);

  // Handle Check Out
  const handleCheckOut = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const currentCheckout = `${formattedHours}:${formattedMinutes} ${ampm}`;

    // Calculate approximate work hours (approx 8h 47m or difference)
    const workHours = '8h 47m';

    setIsCheckedIn(false);
    setCheckOutTime(currentCheckout);
    setTotalWorkingHours(workHours);

    // Update today's record in history
    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id === 'att-2026-10-13') {
          return {
            ...rec,
            checkOut: currentCheckout,
            totalHours: workHours,
            status: 'Present',
          };
        }
        return rec;
      })
    );
  };

  // Handle Check In
  const handleCheckIn = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const currentCheckIn = `${formattedHours}:${formattedMinutes} ${ampm}`;

    setIsCheckedIn(true);
    setCheckInTime(currentCheckIn);
    setCheckOutTime('--:--');
    setTotalWorkingHours('--h --m');
    setElapsedSeconds(0);

    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id === 'att-2026-10-13') {
          return {
            ...rec,
            checkIn: currentCheckIn,
            checkOut: '--:--',
            totalHours: '--h --m',
            status: 'Working',
          };
        }
        return rec;
      })
    );
  };

  const resetToDefault = () => {
    setIsCheckedIn(true);
    setCheckInTime('09:28 AM');
    setCheckOutTime('--:--');
    setTotalWorkingHours('--h --m');
    setElapsedSeconds(0);
    setRecords(INITIAL_ATTENDANCE_RECORDS);
  };

  const todayStatus: 'Checked In' | 'Checked Out' = isCheckedIn ? 'Checked In' : 'Checked Out';
  const workingIndicator = isCheckedIn ? 'Working' : 'Completed';

  return (
    <AttendanceContext.Provider
      value={{
        isCheckedIn,
        checkInTime,
        checkOutTime,
        todayStatus,
        workingIndicator,
        totalWorkingHours,
        currentDateFormatted,
        elapsedSeconds,
        formattedElapsed,
        records,
        selectedMonth,
        setSelectedMonth,
        selectedStatus,
        setSelectedStatus,
        filteredRecords,
        monthlyStats,
        handleCheckOut,
        handleCheckIn,
        resetToDefault,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = (): AttendanceContextType => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};
