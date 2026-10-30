import React from 'react';

export const ProfileBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-2xs mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between min-h-[160px] p-6 lg:p-8 relative">
        {/* Left Text Content */}
        <div className="z-10 max-w-xl pr-4">
          <p className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase mb-2">
            PROFILE &amp; SETTINGS
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 tracking-tight leading-tight">
            Your Profile, Your Space
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2 font-normal leading-relaxed">
            View your account details and manage your preferences all in one place.
          </p>
        </div>

        {/* Right Monochrome Illustration Banner */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[48%] lg:w-[45%] pointer-events-none overflow-hidden">
          <div className="w-full h-full relative flex items-center justify-end">
            {/* Embedded illustration snippet from workspace asset */}
            <img
              src="/assets/aistudio/Profile___Settings_Dashboard_Overview_58077362.png"
              alt="Profile & Settings illustration banner"
              className="absolute right-0 top-[-6%] h-[400%] max-w-none object-cover opacity-95 filter contrast-105"
              style={{
                // Position so the manga-style support hero, posters, laptop and plant are shown
                objectPosition: '88% 10%',
                clipPath: 'inset(1.5% 0% 70% 50%)',
                transform: 'scale(1.08)',
              }}
              onError={(e) => {
                // If asset preview fails, hide the image and let SVG fallback render
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            {/* Stylized monochrome desk artwork fallback if clip/image doesn't display */}
            <svg
              className="w-full h-full max-h-[160px] text-gray-300 opacity-20 mr-4"
              viewBox="0 0 400 150"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="250" y="40" width="80" height="90" rx="4" />
              <line x1="260" y1="60" x2="310" y2="60" />
              <line x1="260" y1="80" x2="300" y2="80" />
              <line x1="260" y1="100" x2="290" y2="100" />
              <rect x="60" y="60" width="130" height="75" rx="3" />
              <path d="M40 135h170" />
              <circle cx="125" cy="95" r="16" />
              <circle cx="340" cy="50" r="18" />
              <path d="M330 90h20v45h-20z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
