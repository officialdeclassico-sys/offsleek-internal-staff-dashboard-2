import React, { useState, useEffect } from 'react';
import { useSupport } from '../context/SupportContext';
import { ProfileBanner } from '../components/profile/ProfileBanner';
import { ProfileInfoCard } from '../components/profile/ProfileInfoCard';
import { WorkContactCard } from '../components/profile/WorkContactCard';
import { WorkInfoCard } from '../components/profile/WorkInfoCard';
import { LoginDevicesCard } from '../components/profile/LoginDevicesCard';
import { ChangePasswordCard } from '../components/profile/ChangePasswordCard';
import { LanguageRegionCard } from '../components/profile/LanguageRegionCard';
import { EmployeeProfile, DeviceSession, UserPreferences } from '../types/profile';
import {
  DEFAULT_EMPLOYEE_PROFILE,
  DEFAULT_DEVICE_SESSIONS,
  DEFAULT_USER_PREFERENCES,
} from '../data/profileData';

const STORAGE_PROFILE_KEY = 'offsleek_employee_profile_v1';
const STORAGE_SESSIONS_KEY = 'offsleek_device_sessions_v1';
const STORAGE_PREFS_KEY = 'offsleek_user_preferences_v1';

export const ProfileSettingsView: React.FC = () => {
  const { showToast } = useSupport();

  // 1. Employee Profile State (read-only organization fields with custom photo support)
  const [profile, setProfile] = useState<EmployeeProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_EMPLOYEE_PROFILE;
  });

  // 2. Authenticated Device Sessions State
  const [sessions, setSessions] = useState<DeviceSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SESSIONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_DEVICE_SESSIONS;
  });

  // 3. Language & Timezone Preferences
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PREFS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_USER_PREFERENCES;
  });

  // Persist Profile changes (photo upload)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(profile));
    } catch {}
  }, [profile]);

  // Persist Session changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(sessions));
    } catch {}
  }, [sessions]);

  // Persist Preference changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PREFS_KEY, JSON.stringify(preferences));
    } catch {}
  }, [preferences]);

  // Handlers
  const handleUpdatePhoto = (newPhotoUrl?: string) => {
    setProfile((prev) => ({
      ...prev,
      avatarPhotoUrl: newPhotoUrl,
    }));
    showToast(
      newPhotoUrl ? 'Profile photo updated successfully' : 'Reset to default initials avatar',
      'success'
    );
  };

  const handleRevokeSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    showToast('Device session signed out and revoked', 'info');
  };

  const handleUpdatePreferences = (newPrefs: Partial<UserPreferences>) => {
    setPreferences((prev) => ({
      ...prev,
      ...newPrefs,
    }));
    showToast('Preferences updated successfully', 'success');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Page Heading & Illustration Banner */}
      <ProfileBanner />

      {/* Row 1: Profile Information & Work Contact & Availability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <ProfileInfoCard profile={profile} onUpdatePhoto={handleUpdatePhoto} />
        <WorkContactCard profile={profile} />
      </div>

      {/* Row 2: Work Information & Login Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <WorkInfoCard profile={profile} />
        <LoginDevicesCard sessions={sessions} onRevokeSession={handleRevokeSession} />
      </div>

      {/* Row 3: Change Password & Language & Region */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <ChangePasswordCard />
        <LanguageRegionCard
          preferences={preferences}
          onUpdatePreferences={handleUpdatePreferences}
        />
      </div>
    </div>
  );
};
