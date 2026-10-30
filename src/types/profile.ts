export interface EmployeeProfile {
  id: string; // e.g. "EMP-1006"
  fullName: string; // "Neha Sharma"
  emailAddress: string; // "neha.sharma@offsleek.com"
  phoneNumber: string; // "+91 98765 43210"
  roleTitle: string; // "Support Agent"
  avatarPhotoUrl?: string; // custom uploaded photo
  avatarInitials: string; // "NS"
  
  // Work Contact & Availability
  personalEmail: string; // "neha.sharma@gmail.com"
  contactNumber: string; // "+91 98765 43210"
  workLocation: string; // "Delhi, India"
  availability: string; // "Assigned shift"
  
  // Work Information
  department: string; // "Support Team"
  designation: string; // "Support Agent"
  reportingManager: string; // "Aman Verma"
  workType: string; // "Remote"
  dateOfJoining: string; // "12 Jan 2024"
  employmentType: string; // "Full-time"
}

export interface DeviceSession {
  id: string;
  deviceType: 'desktop' | 'laptop';
  os: string; // "Windows", "Mac"
  browser: string; // "Chrome", "Edge"
  location: string; // "Bengaluru, India"
  status: 'Active' | 'Inactive';
  isCurrentDevice: boolean;
  lastActive: string; // "Last active: 12 Oct 2026" or "This device"
}

export interface UserPreferences {
  language: string; // "English (India)"
  timeZone: string; // "(UTC +05:30) India Standard Time"
}
