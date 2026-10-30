import React from 'react';
import { Briefcase } from 'lucide-react';
import { EmployeeProfile } from '../../types/profile';

interface WorkInfoCardProps {
  profile: EmployeeProfile;
}

export const WorkInfoCard: React.FC<WorkInfoCardProps> = ({ profile }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
      {/* Card Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
          <Briefcase className="w-4 h-4 text-gray-900" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-950">Work Information</h2>
          <p className="text-sm text-gray-500 mt-0.5">Your role and department details.</p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Department */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Department
          </label>
          <input
            type="text"
            readOnly
            value={profile.department}
            className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-800 bg-[#f8f9fa] border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none select-all"
            title="Organization managed field"
          />
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Designation
          </label>
          <input
            type="text"
            readOnly
            value={profile.designation}
            className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-800 bg-[#f8f9fa] border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none select-all"
            title="Organization managed field"
          />
        </div>

        {/* Reporting Manager */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Reporting Manager
          </label>
          <input
            type="text"
            readOnly
            value={profile.reportingManager}
            className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-800 bg-[#f8f9fa] border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none select-all"
            title="Organization managed field"
          />
        </div>

        {/* Work Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Work Type
          </label>
          <input
            type="text"
            readOnly
            value={profile.workType}
            className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-800 bg-[#f8f9fa] border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none select-all"
            title="Organization managed field"
          />
        </div>

        {/* Date of Joining */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Date of Joining
          </label>
          <input
            type="text"
            readOnly
            value={profile.dateOfJoining}
            className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-800 bg-[#f8f9fa] border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none select-all"
            title="Organization managed field"
          />
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Employment Type
          </label>
          <input
            type="text"
            readOnly
            value={profile.employmentType}
            className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-800 bg-[#f8f9fa] border border-gray-200 rounded-lg cursor-not-allowed focus:outline-none select-all"
            title="Organization managed field"
          />
        </div>
      </div>
    </div>
  );
};
