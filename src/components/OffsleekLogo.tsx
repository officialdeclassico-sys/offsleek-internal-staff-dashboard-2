import React from 'react';

interface OffsleekLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const OffsleekLogo: React.FC<OffsleekLogoProps> = ({ className = '', size = 'md' }) => {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Abstract connected dots icon matching reference screenshot */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-black"
        >
          {/* Connecting branches */}
          <path
            d="M 10 22 L 18 12 M 18 12 L 23 8 M 18 12 L 24 16"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Main top dot */}
          <circle cx="23" cy="8" r="3.5" fill="currentColor" />
          {/* Center branch dot */}
          <circle cx="18" cy="12" r="3.2" fill="currentColor" />
          {/* Lower left dot */}
          <circle cx="10" cy="22" r="4" fill="currentColor" />
          {/* Right small node */}
          <circle cx="24" cy="16" r="2.8" fill="currentColor" />
        </svg>
      </div>
      {/* Brand title */}
      <span className="font-extrabold tracking-wider text-black text-sm uppercase mt-0.5 leading-none">
        OFFSLEEK
      </span>
      {/* Subtitle */}
      <span className="text-[10px] tracking-widest text-gray-400 font-semibold uppercase mt-0.5">
        SUPPORT TEAM
      </span>
    </div>
  );
};
