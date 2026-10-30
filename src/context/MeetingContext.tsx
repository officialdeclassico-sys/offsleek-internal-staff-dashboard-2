import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Meeting, NewMeetingPayload, MeetingParticipant } from '../types/meeting';
import {
  CURRENT_MEETING_USER,
  AVAILABLE_PARTICIPANTS,
  INITIAL_UPCOMING_MEETINGS,
  INITIAL_RECENT_MEETINGS,
} from '../data/meetingData';
import { useSupport } from './SupportContext';

interface MeetingContextType {
  upcomingMeetings: Meeting[];
  recentMeetings: Meeting[];
  personalRoomUrl: string;
  availableParticipants: MeetingParticipant[];
  currentMeetingUser: MeetingParticipant;

  // Calendar sync status
  isCalendarConnected: boolean;
  connectedCalendarEmail: string | null;
  connectCalendar: (email?: string) => void;
  disconnectCalendar: () => void;

  // Modals state
  isScheduleModalOpen: boolean;
  setIsScheduleModalOpen: (open: boolean) => void;
  isInstantModalOpen: boolean;
  setIsInstantModalOpen: (open: boolean) => void;
  isJoinCodeModalOpen: boolean;
  setIsJoinCodeModalOpen: (open: boolean) => void;
  isCalendarModalOpen: boolean;
  setIsCalendarModalOpen: (open: boolean) => void;
  isDetailsModalOpen: boolean;
  setIsDetailsModalOpen: (open: boolean) => void;
  selectedMeeting: Meeting | null;
  setSelectedMeeting: (m: Meeting | null) => void;

  // Live video room
  activeCallMeeting: Meeting | null;
  joinMeeting: (meeting: Meeting) => void;
  leaveCall: () => void;

  // Core meeting actions
  scheduleMeeting: (payload: NewMeetingPayload) => { success: boolean; message: string; meeting?: Meeting };
  startInstantMeeting: (title: string, participantIds: string[]) => Meeting;
  joinWithCode: (codeOrUrl: string) => { success: boolean; message: string; meeting?: Meeting };
  cancelMeeting: (meetingId: string) => void;
  copyMeetingLink: (url: string) => Promise<boolean>;
}

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

const STORAGE_UPCOMING = 'offsleek_upcoming_meetings_v1';
const STORAGE_RECENT = 'offsleek_recent_meetings_v1';
const STORAGE_CALENDAR = 'offsleek_calendar_integration_v1';

export const MeetingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useSupport();

  const personalRoomUrl = 'https://meet.offsleek.internal/room/neha-sharma-personal';

  // Upcoming meetings
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_UPCOMING);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_UPCOMING_MEETINGS;
  });

  // Recent meetings
  const [recentMeetings, setRecentMeetings] = useState<Meeting[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_RECENT);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_RECENT_MEETINGS;
  });

  // Calendar sync
  const [calendarSync, setCalendarSync] = useState<{ connected: boolean; email: string | null }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CALENDAR);
      if (saved) return JSON.parse(saved);
    } catch {}
    return { connected: false, email: null };
  });

  // Modals
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isInstantModalOpen, setIsInstantModalOpen] = useState(false);
  const [isJoinCodeModalOpen, setIsJoinCodeModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [activeCallMeeting, setActiveCallMeeting] = useState<Meeting | null>(null);

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_UPCOMING, JSON.stringify(upcomingMeetings));
    } catch {}
  }, [upcomingMeetings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_RECENT, JSON.stringify(recentMeetings));
    } catch {}
  }, [recentMeetings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CALENDAR, JSON.stringify(calendarSync));
    } catch {}
  }, [calendarSync]);

  // Helpers
  const copyMeetingLink = async (url: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(url);
      showToast('Meeting link copied to clipboard', 'success');
      return true;
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Meeting link copied to clipboard', 'success');
      return true;
    }
  };

  const scheduleMeeting = (payload: NewMeetingPayload) => {
    // Conflict detection for organizer on the same date/time
    const conflict = upcomingMeetings.find((m) => {
      return (
        m.date === payload.date &&
        m.status === 'scheduled' &&
        m.startTime.toLowerCase().replace(/\s/g, '') === payload.startTime.toLowerCase().replace(/\s/g, '')
      );
    });

    if (conflict) {
      return {
        success: false,
        message: `Conflict detected: You already have "${conflict.title}" scheduled at ${conflict.startTime} on ${payload.date}.`,
      };
    }

    // Format date components
    const dateObj = new Date(payload.date + 'T12:00:00');
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const dayNumber = String(dateObj.getDate()).padStart(2, '0');
    const monthShort = months[dateObj.getMonth()];
    const weekdayShort = weekdays[dateObj.getDay()];
    const dateFormatted = `${dateObj.getDate()} ${months[dateObj.getMonth()].toLowerCase()} ${dateObj.getFullYear()}`;

    // Calculate duration in minutes if possible
    let durationMinutes = 30;
    try {
      const parseTime = (tStr: string) => {
        const [time, modifier] = tStr.trim().split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };
      const diff = parseTime(payload.endTime) - parseTime(payload.startTime);
      if (diff > 0) durationMinutes = diff;
    } catch {
      durationMinutes = 45;
    }

    const cleanCode = payload.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 18) + '-' + Math.floor(100 + Math.random() * 900);

    const participants = AVAILABLE_PARTICIPANTS.filter((p) =>
      payload.participantIds.includes(p.id) || p.id === CURRENT_MEETING_USER.id
    );

    const newMeeting: Meeting = {
      id: `MEET-2026-${Math.floor(200 + Math.random() * 800)}`,
      code: cleanCode,
      title: payload.title.trim(),
      description: payload.description?.trim(),
      date: payload.date,
      dateFormatted,
      dayNumber,
      monthShort,
      weekdayShort,
      startTime: payload.startTime,
      endTime: payload.endTime,
      durationMinutes,
      timeZone: payload.timeZone || 'India Standard Time (IST)',
      organizer: CURRENT_MEETING_USER,
      participants,
      joinUrl: `https://meet.offsleek.internal/room/${cleanCode}`,
      status: 'scheduled',
      notes: payload.notes?.trim(),
      createdAt: new Date().toISOString(),
    };

    setUpcomingMeetings((prev) => [newMeeting, ...prev]);
    showToast(`Meeting "${newMeeting.title}" scheduled successfully`, 'success');
    return { success: true, message: 'Meeting scheduled successfully', meeting: newMeeting };
  };

  const startInstantMeeting = (title: string, participantIds: string[]): Meeting => {
    const now = new Date();
    const cleanCode = 'instant-' + Math.random().toString(36).substring(2, 8);
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const participants = AVAILABLE_PARTICIPANTS.filter(
      (p) => participantIds.includes(p.id) || p.id === CURRENT_MEETING_USER.id
    );

    const meeting: Meeting = {
      id: `MEET-INSTANT-${Date.now().toString().slice(-4)}`,
      code: cleanCode,
      title: title.trim() || `${CURRENT_MEETING_USER.name}'s Instant Sync`,
      date: now.toISOString().split('T')[0],
      dateFormatted: `${now.getDate()} Oct ${now.getFullYear()}`,
      dayNumber: String(now.getDate()),
      monthShort: 'OCT',
      weekdayShort: 'Today',
      startTime: timeStr,
      endTime: 'In Progress',
      durationMinutes: 30,
      timeZone: 'India Standard Time (IST)',
      organizer: CURRENT_MEETING_USER,
      participants,
      joinUrl: `https://meet.offsleek.internal/room/${cleanCode}`,
      status: 'live',
      isInstant: true,
      createdAt: now.toISOString(),
    };

    setActiveCallMeeting(meeting);
    showToast(`Instant meeting started (${meeting.code})`, 'success');
    return meeting;
  };

  const joinWithCode = (codeOrUrl: string) => {
    const trimmed = codeOrUrl.trim();
    if (!trimmed) {
      return { success: false, message: 'Please enter a valid meeting code or join link.' };
    }

    // Extract code from link if needed
    const code = trimmed.includes('/') ? trimmed.split('/').pop() || trimmed : trimmed;

    // Check existing
    const existing = upcomingMeetings.find(
      (m) => m.code.toLowerCase() === code.toLowerCase() || m.id.toLowerCase() === code.toLowerCase()
    );

    if (existing) {
      setActiveCallMeeting(existing);
      showToast(`Joined meeting "${existing.title}"`, 'success');
      return { success: true, message: 'Connected to meeting', meeting: existing };
    }

    // Direct room join
    const customMeeting: Meeting = {
      id: `MEET-${code}`,
      code: code,
      title: `Meeting Room (${code})`,
      date: new Date().toISOString().split('T')[0],
      dateFormatted: 'Today',
      dayNumber: String(new Date().getDate()),
      monthShort: 'OCT',
      weekdayShort: 'Today',
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endTime: 'In Progress',
      durationMinutes: 30,
      timeZone: 'India Standard Time (IST)',
      organizer: CURRENT_MEETING_USER,
      participants: [CURRENT_MEETING_USER],
      joinUrl: `https://meet.offsleek.internal/room/${code}`,
      status: 'live',
      createdAt: new Date().toISOString(),
    };

    setActiveCallMeeting(customMeeting);
    showToast(`Connected to meeting room ${code}`, 'success');
    return { success: true, message: 'Connected to room', meeting: customMeeting };
  };

  const joinMeeting = (meeting: Meeting) => {
    setActiveCallMeeting(meeting);
    showToast(`Joining "${meeting.title}"...`, 'info');
  };

  const leaveCall = () => {
    if (activeCallMeeting) {
      showToast(`Left meeting room`, 'info');
      setActiveCallMeeting(null);
    }
  };

  const cancelMeeting = (meetingId: string) => {
    setUpcomingMeetings((prev) => prev.filter((m) => m.id !== meetingId));
    showToast('Meeting cancelled and removed from calendar', 'info');
    setIsDetailsModalOpen(false);
    setSelectedMeeting(null);
  };

  const connectCalendar = (email?: string) => {
    const calendarEmail = email || 'neha.sharma@offsleek.com';
    setCalendarSync({
      connected: true,
      email: calendarEmail,
    });
    showToast(`Google Calendar connected for ${calendarEmail}`, 'success');
  };

  const disconnectCalendar = () => {
    setCalendarSync({
      connected: false,
      email: null,
    });
    showToast('Google Calendar disconnected', 'info');
  };

  return (
    <MeetingContext.Provider
      value={{
        upcomingMeetings,
        recentMeetings,
        personalRoomUrl,
        availableParticipants: AVAILABLE_PARTICIPANTS,
        currentMeetingUser: CURRENT_MEETING_USER,
        isCalendarConnected: calendarSync.connected,
        connectedCalendarEmail: calendarSync.email,
        connectCalendar,
        disconnectCalendar,
        isScheduleModalOpen,
        setIsScheduleModalOpen,
        isInstantModalOpen,
        setIsInstantModalOpen,
        isJoinCodeModalOpen,
        setIsJoinCodeModalOpen,
        isCalendarModalOpen,
        setIsCalendarModalOpen,
        isDetailsModalOpen,
        setIsDetailsModalOpen,
        selectedMeeting,
        setSelectedMeeting,
        activeCallMeeting,
        joinMeeting,
        leaveCall,
        scheduleMeeting,
        startInstantMeeting,
        joinWithCode,
        cancelMeeting,
        copyMeetingLink,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeetings = () => {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error('useMeetings must be used within a MeetingProvider');
  }
  return context;
};
