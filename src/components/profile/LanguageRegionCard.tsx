import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { UserPreferences } from '../../types/profile';
import { AVAILABLE_LANGUAGES, AVAILABLE_TIMEZONES } from '../../data/profileData';

interface LanguageRegionCardProps {
  preferences: UserPreferences;
  onUpdatePreferences: (newPrefs: Partial<UserPreferences>) => void;
}

export const LanguageRegionCard: React.FC<LanguageRegionCardProps> = ({
  preferences,
  onUpdatePreferences,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
      {/* Card Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
          <Globe className="w-4 h-4 text-gray-900" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-950">Language &amp; Region</h2>
          <p className="text-sm text-gray-500 mt-0.5">Your language and time zone settings.</p>
        </div>
      </div>

      {/* 2-Column Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Language Selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Language
          </label>
          <div className="relative">
            <select
              value={preferences.language}
              onChange={(e) => onUpdatePreferences({ language: e.target.value })}
              className="w-full appearance-none px-3.5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black pr-8 cursor-pointer"
            >
              {AVAILABLE_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Time Zone Selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Time Zone
          </label>
          <div className="relative">
            <select
              value={preferences.timeZone}
              onChange={(e) => onUpdatePreferences({ timeZone: e.target.value })}
              className="w-full appearance-none px-3.5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black pr-8 cursor-pointer"
            >
              {AVAILABLE_TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
