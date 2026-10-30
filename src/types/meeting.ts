export type MeetingStatus = 'scheduled' | 'live' | 'completed' | 'cancelled';

export interface MeetingParticipant {
  id: string;
  name: string;
  role: string;
  email: string;
  avatarText: string;
  avatarBg?: string;
  isOrganizer?: boolean;
}

export interface Meeting {
  id: string; // e.g., "MEET-2026-101"
  code: string; // e.g., "ops-standup-98"
  title: string;
  description?: string;
  date: string; // "2026-10-24"
  dateFormatted: string; // "24 Oct 2026"
  dayNumber: string; // "24"
  monthShort: string; // "OCT"
  weekdayShort: string; // "Sat"
  startTime: string; // "10:00 AM"
  endTime: string; // "10:45 AM"
  durationMinutes: number; // 45
  timeZone: string; // "India Standard Time (IST)"
  organizer: MeetingParticipant;
  participants: MeetingParticipant[];
  joinUrl: string; // "https://meet.offsleek.internal/room/ops-standup-98"
  status: MeetingStatus;
  isInstant?: boolean;
  notes?: string;
  createdAt: string;
}

export interface NewMeetingPayload {
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  participantIds: string[];
  notes?: string;
}
