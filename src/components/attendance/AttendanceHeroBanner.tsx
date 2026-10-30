import React from 'react';

export const AttendanceHeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-2xs mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between min-h-[160px] p-6 lg:p-8 relative">
        {/* Left Text Content */}
        <div className="z-10 max-w-xl pr-4">
          <p className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase mb-2">
            ATTENDANCE
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-black tracking-tight leading-tight">
            Track Your Work Hours
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-2 font-medium leading-relaxed">
            Mark your attendance, view your working hours, and keep track of your attendance history.
          </p>
        </div>

        {/* Right Illustration Banner matching reference screenshot */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[52%] lg:w-[48%] pointer-events-none overflow-hidden select-none">
          <div className="w-full h-full relative flex items-center justify-end">
            {/* Cropped illustration from reference asset */}
            <img
              src="/assets/aistudio/Modern_Attendance_Dashboard_Interface_63f699bd.png"
              alt="Track Your Work Hours Illustration"
              className="absolute right-0 top-[-2%] h-[460%] max-w-none object-cover opacity-95 filter contrast-105"
              style={{
                objectPosition: '96% 7%',
                clipPath: 'inset(1% 0% 74% 45%)',
                transform: 'scale(1.02)',
              }}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            {/* Stylized fallback if image loading differs */}
            <div className="relative w-72 h-36 flex items-center justify-end opacity-20 pr-6">
              <svg viewBox="0 0 200 120" className="w-full h-full text-gray-900" fill="none" stroke="currentColor">
                <rect x="20" y="50" width="100" height="60" rx="4" strokeWidth="2" />
                <path d="M40 50 L60 20 L80 50 Z" strokeWidth="2" />
                <circle cx="150" cy="50" r="25" strokeWidth="2" />
                <path d="M130 110 C130 85 170 85 170 110" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
