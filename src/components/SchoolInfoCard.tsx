import React from 'react';
import { Building2, Mail, Phone, MapPin, Copy } from 'lucide-react';
import { useSupport } from '../context/SupportContext';

export const SchoolInfoCard: React.FC = () => {
  const { selectedTicket, showToast } = useSupport();
  const school = selectedTicket.school;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard`, 'info');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100">
        <Building2 className="w-4.5 h-4.5 text-gray-800" />
        <h3 className="font-bold text-base text-gray-950 tracking-tight">
          School Information
        </h3>
      </div>

      {/* School Badge Box */}
      <div className="flex items-center gap-3 p-3 bg-gray-50/70 border border-gray-200 rounded-xl mb-4">
        <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-sm shrink-0 tracking-wider">
          {school.initials}
        </div>
        <span className="font-bold text-sm text-gray-950 truncate">
          {school.name}
        </span>
      </div>

      {/* Details List */}
      <div className="space-y-3.5 text-sm">
        <div className="flex items-start justify-between gap-2">
          <span className="text-gray-500 font-medium shrink-0">Contact Person</span>
          <span className="font-semibold text-gray-950 text-right truncate">
            {school.contactPerson}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-gray-500 font-medium shrink-0">Email</span>
          <div className="flex items-center gap-1.5 min-w-0">
            <a
              href={`mailto:${school.email}`}
              className="text-gray-950 hover:underline hover:text-black font-semibold truncate text-sm"
              title={`Send email to ${school.email}`}
            >
              {school.email}
            </a>
            <button
              type="button"
              onClick={() => copyToClipboard(school.email, 'email')}
              className="text-gray-400 hover:text-black p-1 rounded hover:bg-gray-100 transition-colors"
              title="Copy email"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-gray-500 font-medium shrink-0">Phone</span>
          <div className="flex items-center gap-1.5">
            <a
              href={`tel:${school.phone.replace(/\s+/g, '')}`}
              className="text-gray-950 hover:underline font-mono font-semibold text-sm"
            >
              {school.phone}
            </a>
            <button
              type="button"
              onClick={() => copyToClipboard(school.phone, 'phone number')}
              className="text-gray-400 hover:text-black p-1 rounded hover:bg-gray-100 transition-colors"
              title="Copy phone"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-start justify-between gap-2">
          <span className="text-gray-500 font-medium shrink-0">Location</span>
          <span className="text-gray-800 font-medium text-right text-sm">
            {school.location}
          </span>
        </div>
      </div>
    </div>
  );
};
