import React from 'react';
import { Users, Mail, Phone, MapPin, Clock, Info } from 'lucide-react';
import { EmployeeProfile } from '../../types/profile';

interface WorkContactCardProps {
  profile: EmployeeProfile;
}

export const WorkContactCard: React.FC<WorkContactCardProps> = ({ profile }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-start gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-gray-900" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-950">Work Contact &amp; Availability</h2>
            <p className="text-sm text-gray-500 mt-0.5">Your contact details and availability.</p>
          </div>
        </div>

        {/* Fields list */}
        <div className="space-y-3.5">
          {/* Personal Email */}
          <div className="grid grid-cols-1 sm:grid-cols-12 sm:items-center gap-1.5 sm:gap-3">
            <div className="sm:col-span-4 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-700 shrink-0" />
              <span className="text-sm font-semibold text-gray-700">Personal Email</span>
            </div>
            <div className="sm:col-span-8">
              <input
                type="email"
                readOnly
                value={profile.personalEmail}
                className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-800 bg-[#f8f9fa] border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none select-all"
                title="Organization managed field"
              />
            </div>
          </div>

          {/* Contact Number */}
          <div className="grid grid-cols-1 sm:grid-cols-12 sm:items-center gap-1.5 sm:gap-3">
            <div className="sm:col-span-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-700 shrink-0" />
              <span className="text-sm font-semibold text-gray-700">Contact Number</span>
            </div>
            <div className="sm:col-span-8">
              <input
                type="text"
                readOnly
                value={profile.contactNumber}
                className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-800 bg-[#f8f9fa] border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none select-all"
                title="Organization managed field"
              />
            </div>
          </div>

          {/* Work Location */}
          <div className="grid grid-cols-1 sm:grid-cols-12 sm:items-center gap-1.5 sm:gap-3">
            <div className="sm:col-span-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-700 shrink-0" />
              <span className="text-sm font-semibold text-gray-700">Work Location</span>
            </div>
            <div className="sm:col-span-8">
              <input
                type="text"
                readOnly
                value={profile.workLocation}
                className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-800 bg-[#f8f9fa] border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none select-all"
                title="Organization managed field"
              />
            </div>
          </div>

          {/* Availability */}
          <div className="grid grid-cols-1 sm:grid-cols-12 sm:items-center gap-1.5 sm:gap-3">
            <div className="sm:col-span-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-700 shrink-0" />
              <span className="text-sm font-semibold text-gray-700">Availability</span>
            </div>
            <div className="sm:col-span-8">
              <input
                type="text"
                readOnly
                value={profile.availability}
                className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-800 bg-[#f8f9fa] border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none select-all"
                title="Organization managed field"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Note at bottom */}
      <div className="mt-4 pt-3 flex items-center gap-2 text-sm text-gray-600 font-normal">
        <Info className="w-4 h-4 text-gray-400 shrink-0" />
        <span>For changes to official details, contact your manager.</span>
      </div>
    </div>
  );
};
