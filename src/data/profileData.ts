import { EmployeeProfile, DeviceSession, UserPreferences } from '../types/profile';

export const DEFAULT_EMPLOYEE_PROFILE: EmployeeProfile = {
  id: 'EMP-1006',
  fullName: 'Neha Sharma',
  emailAddress: 'neha.sharma@offsleek.com',
  phoneNumber: '+91 98765 43210',
  roleTitle: 'Support Agent',
  avatarInitials: 'NS',
  
  // Work Contact & Availability
  personalEmail: 'neha.sharma@gmail.com',
  contactNumber: '+91 98765 43210',
  workLocation: 'Delhi, India',
  availability: 'Assigned shift',
  
  // Work Information
  department: 'Support Team',
  designation: 'Support Agent',
  reportingManager: 'Aman Verma',
  workType: 'Remote',
  dateOfJoining: '12 Jan 2024',
  employmentType: 'Full-time',
};

export const DEFAULT_DEVICE_SESSIONS: DeviceSession[] = [
  {
    id: 'dev-001',
    deviceType: 'desktop',
    os: 'Windows',
    browser: 'Chrome',
    location: 'Bengaluru, India',
    status: 'Active',
    isCurrentDevice: true,
    lastActive: 'This device',
  },
  {
    id: 'dev-002',
    deviceType: 'desktop',
    os: 'Windows',
    browser: 'Edge',
    location: 'New Delhi, India',
    status: 'Inactive',
    isCurrentDevice: false,
    lastActive: 'Last active: 12 Oct 2026',
  },
  {
    id: 'dev-003',
    deviceType: 'laptop',
    os: 'Mac',
    browser: 'Chrome',
    location: 'Mumbai, India',
    status: 'Inactive',
    isCurrentDevice: false,
    lastActive: 'Last active: 28 Sep 2026',
  },
];

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  language: 'English (India)',
  timeZone: '(UTC +05:30) India Standard Time',
};

export const AVAILABLE_LANGUAGES = [
  'English (India)',
  'English (US)',
  'English (UK)',
  'Hindi',
];

export const AVAILABLE_TIMEZONES = [
  '(UTC +05:30) India Standard Time',
  '(UTC +00:00) UTC / GMT',
  '(UTC -05:00) Eastern Time (US & Canada)',
  '(UTC -08:00) Pacific Time (US & Canada)',
  '(UTC +08:00) Singapore / Perth',
  '(UTC +01:00) Central European Time',
];
