import { BreakRecord, BreakTypeConfig, ActiveBreak } from '../types/break';

export const BREAK_CONFIGS: BreakTypeConfig[] = [
  {
    type: 'Tea Break',
    allowedMinutes: 15,
    label: 'Tea Break',
    allowedText: '15 minutes',
  },
  {
    type: 'Lunch Break',
    allowedMinutes: 30,
    label: 'Lunch Break',
    allowedText: '30 minutes',
  },
  {
    type: 'Snack Break',
    allowedMinutes: 15,
    label: 'Snack Break',
    allowedText: '15 minutes',
  },
  {
    type: 'Smoke Break',
    allowedMinutes: 15,
    label: 'Smoke Break',
    allowedText: '15 minutes',
  },
  {
    type: 'Meeting',
    allowedMinutes: 30,
    label: 'Meeting',
    allowedText: 'Up to 30 minutes',
  },
];

// Generate initial 80 records for October 2026 matching the screenshot stats:
// 68 On-Time, 10 Exceeded, 2 Missed = 80 Total
export const generateInitialBreakRecords = (): BreakRecord[] => {
  const records: BreakRecord[] = [];

  // Top 5 records directly from screenshot:
  records.push({
    id: 'brk-1',
    recordNumber: 1,
    employeeId: 'emp-101',
    date: '19 Oct 2026',
    monthKey: '2026-10',
    breakType: 'Lunch Break',
    startTimestamp: new Date('2026-10-19T14:00:00').getTime(),
    startTime: '02:00 PM',
    endTimestamp: new Date('2026-10-19T14:35:00').getTime(),
    endTime: '02:35 PM',
    durationMinutes: 35,
    allowedMinutes: 30,
    status: 'Exceeded',
    exceededByMinutes: 5,
    remarks: '—',
    createdAt: Date.now() - 3600000 * 2,
  });

  records.push({
    id: 'brk-2',
    recordNumber: 2,
    employeeId: 'emp-101',
    date: '19 Oct 2026',
    monthKey: '2026-10',
    breakType: 'Tea Break',
    startTimestamp: new Date('2026-10-19T10:15:00').getTime(),
    startTime: '10:15 AM',
    endTimestamp: new Date('2026-10-19T10:30:00').getTime(),
    endTime: '10:30 AM',
    durationMinutes: 15,
    allowedMinutes: 15,
    status: 'On Time',
    exceededByMinutes: 0,
    remarks: '—',
    createdAt: Date.now() - 3600000 * 5,
  });

  records.push({
    id: 'brk-3',
    recordNumber: 3,
    employeeId: 'emp-101',
    date: '19 Oct 2026',
    monthKey: '2026-10',
    breakType: 'Snack Break',
    startTimestamp: new Date('2026-10-19T12:45:00').getTime(),
    startTime: '12:45 PM',
    endTimestamp: new Date('2026-10-19T13:00:00').getTime(),
    endTime: '01:00 PM',
    durationMinutes: 15,
    allowedMinutes: 15,
    status: 'On Time',
    exceededByMinutes: 0,
    remarks: '—',
    createdAt: Date.now() - 3600000 * 3,
  });

  records.push({
    id: 'brk-4',
    recordNumber: 4,
    employeeId: 'emp-101',
    date: '18 Oct 2026',
    monthKey: '2026-10',
    breakType: 'Smoke Break',
    startTimestamp: new Date('2026-10-18T16:20:00').getTime(),
    startTime: '04:20 PM',
    endTimestamp: new Date('2026-10-18T16:38:00').getTime(),
    endTime: '04:38 PM',
    durationMinutes: 18,
    allowedMinutes: 15,
    status: 'Exceeded',
    exceededByMinutes: 3,
    remarks: 'Traffic delay',
    createdAt: Date.now() - 86400000 * 1,
  });

  records.push({
    id: 'brk-5',
    recordNumber: 5,
    employeeId: 'emp-101',
    date: '18 Oct 2026',
    monthKey: '2026-10',
    breakType: 'Meeting',
    startTimestamp: new Date('2026-10-18T11:00:00').getTime(),
    startTime: '11:00 AM',
    endTimestamp: new Date('2026-10-18T11:25:00').getTime(),
    endTime: '11:25 AM',
    durationMinutes: 25,
    allowedMinutes: 30,
    status: 'On Time',
    exceededByMinutes: 0,
    remarks: 'Team discussion',
    createdAt: Date.now() - 86400000 * 1,
  });

  // Now we need 66 more On-Time records, 8 more Exceeded records (to total 68 on-time, 10 exceeded = 78 completed breaks + 2 missed breaks accounted for)
  // Let's create realistic entries across earlier days in Oct 2026
  const breakTypes: Array<'Tea Break' | 'Lunch Break' | 'Snack Break' | 'Smoke Break' | 'Meeting'> = [
    'Tea Break',
    'Lunch Break',
    'Snack Break',
    'Smoke Break',
    'Meeting',
  ];

  let onTimeNeeded = 66;
  let exceededNeeded = 8;
  let recordCounter = 6;

  for (let day = 18; day >= 1 && (onTimeNeeded > 0 || exceededNeeded > 0); day--) {
    const dayStr = `${day < 10 ? '0' + day : day} Oct 2026`;
    const breaksPerDay = Math.min(4, onTimeNeeded + exceededNeeded);

    for (let b = 0; b < breaksPerDay; b++) {
      const type = breakTypes[(day + b) % breakTypes.length];
      const isExceeded = exceededNeeded > 0 && (b === 1 || day % 3 === 0);

      const allowedMinutes = type === 'Lunch Break' || type === 'Meeting' ? 30 : 15;
      let durationMinutes = allowedMinutes;
      let exceededBy = 0;
      let status: 'On Time' | 'Exceeded' = 'On Time';
      let remarks = '—';

      if (isExceeded) {
        exceededNeeded--;
        status = 'Exceeded';
        exceededBy = Math.floor(Math.random() * 6) + 2; // 2 to 7 mins
        durationMinutes = allowedMinutes + exceededBy;
        remarks = exceededBy > 4 ? 'Client call ran over' : 'Cafeteria queue';
      } else if (onTimeNeeded > 0) {
        onTimeNeeded--;
        durationMinutes = Math.max(10, allowedMinutes - Math.floor(Math.random() * 3));
      } else {
        continue;
      }

      const hour = 9 + b * 2;
      const startH = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const startMin = 10 + (b * 5);
      const endTotalMin = startMin + durationMinutes;
      const endHRaw = hour + Math.floor(endTotalMin / 60);
      const endH = endHRaw > 12 ? endHRaw - 12 : endHRaw;
      const endAmpm = endHRaw >= 12 ? 'PM' : 'AM';
      const endMin = endTotalMin % 60;

      const startTime = `${startH < 10 ? '0' + startH : startH}:${startMin < 10 ? '0' + startMin : startMin} ${ampm}`;
      const endTime = `${endH < 10 ? '0' + endH : endH}:${endMin < 10 ? '0' + endMin : endMin} ${endAmpm}`;

      records.push({
        id: `brk-${recordCounter}`,
        recordNumber: recordCounter,
        employeeId: 'emp-101',
        date: dayStr,
        monthKey: '2026-10',
        breakType: type,
        startTimestamp: new Date(`2026-10-${day < 10 ? '0' + day : day}T${hour < 10 ? '0' + hour : hour}:${startMin}:00`).getTime(),
        startTime,
        endTimestamp: new Date(`2026-10-${day < 10 ? '0' + day : day}T${endHRaw < 10 ? '0' + endHRaw : endHRaw}:${endMin}:00`).getTime(),
        endTime,
        durationMinutes,
        allowedMinutes,
        status,
        exceededByMinutes: exceededBy,
        remarks,
        createdAt: Date.now() - (19 - day) * 86400000,
      });
      recordCounter++;
    }
  }

  // Ensure record numbers are sequential
  return records.map((r, idx) => ({ ...r, recordNumber: idx + 1 }));
};

// Initial Active Break matching screenshot: Tea Break started at 10:15 AM with 08:32 elapsed
export const getInitialActiveBreak = (): ActiveBreak => {
  const elapsedSeconds = 8 * 60 + 32; // 8 minutes 32 seconds
  return {
    id: 'active-tea-break',
    employeeId: 'emp-101',
    breakType: 'Tea Break',
    startTimestamp: Date.now() - elapsedSeconds * 1000,
    startTimeFormatted: '10:15 AM',
    allowedMinutes: 15,
  };
};
