import React, { useState } from 'react';
import { User, Camera } from 'lucide-react';
import { EmployeeProfile } from '../../types/profile';
import { PhotoUploadModal } from './PhotoUploadModal';

interface ProfileInfoCardProps {
  profile: EmployeeProfile;
  onUpdatePhoto: (newPhotoUrl?: string) => void;
}

export const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ profile, onUpdatePhoto }) => {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs flex flex-col justify-between">
        {/* Card Header */}
        <div className="flex items-start gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-gray-900" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-950">Profile Information</h2>
            <p className="text-sm text-gray-500 mt-0.5">Your personal details.</p>
          </div>
        </div>

        {/* Content: Avatar on left, Form Fields on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Avatar and Name */}
          <div className="md:col-span-4 flex flex-col items-center justify-center py-2">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-[#e5e7eb] text-gray-800 flex items-center justify-center text-2xl font-bold font-sans overflow-hidden border border-gray-200 shadow-2xs">
                {profile.avatarPhotoUrl ? (
                  <img
                    src={profile.avatarPhotoUrl}
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{profile.avatarInitials}</span>
                )}
              </div>

              {/* Functional Camera Button */}
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(true)}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-black hover:bg-gray-800 text-white flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer ring-2 ring-white"
                title="Change profile photo"
                aria-label="Change profile photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <h3 className="font-bold text-gray-950 text-base mt-3 text-center">
              {profile.fullName}
            </h3>
            <p className="text-sm text-[#2563eb] font-semibold text-center mt-0.5">
              {profile.roleTitle}
            </p>
          </div>

          {/* Read-Only Form Fields */}
          <div className="md:col-span-8 space-y-3.5">
            {/* Full Name */}
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:items-center gap-1.5 sm:gap-4">
              <label className="text-sm font-semibold text-gray-700 sm:text-right">
                Full Name
              </label>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  readOnly
                  value={profile.fullName}
                  className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-800 bg-[#f8f9fa] border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none select-all"
                  title="Organization managed field"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:items-center gap-1.5 sm:gap-4">
              <label className="text-sm font-semibold text-gray-700 sm:text-right">
                Email Address
              </label>
              <div className="sm:col-span-2">
                <input
                  type="email"
                  readOnly
                  value={profile.emailAddress}
                  className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-800 bg-[#f8f9fa] border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none select-all font-sans"
                  title="Organization managed field"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:items-center gap-1.5 sm:gap-4">
              <label className="text-sm font-semibold text-gray-700 sm:text-right">
                Phone Number
              </label>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  readOnly
                  value={profile.phoneNumber}
                  className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-800 bg-[#f8f9fa] border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none select-all"
                  title="Organization managed field"
                />
              </div>
            </div>

            {/* Employee ID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:items-center gap-1.5 sm:gap-4">
              <label className="text-sm font-semibold text-gray-700 sm:text-right">
                Employee ID
              </label>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  readOnly
                  value={profile.id}
                  className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-800 bg-[#f8f9fa] border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none select-all font-mono"
                  title="Organization managed field"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentPhotoUrl={profile.avatarPhotoUrl}
        avatarInitials={profile.avatarInitials}
        onSavePhoto={onUpdatePhoto}
      />
    </>
  );
};
