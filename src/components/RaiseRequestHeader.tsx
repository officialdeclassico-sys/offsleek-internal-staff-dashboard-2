import React from 'react';

export const RaiseRequestHeader: React.FC = () => {
  return (
    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white rounded-2xl border border-gray-200 p-6 overflow-hidden shadow-2xs">
      {/* Left Heading & Supporting Text */}
      <div className="z-10 max-w-xl">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1.5">
          MY REQUESTS
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight leading-tight">
          Raise a Request
        </h1>
        <h2 className="text-gray-800 text-base md:text-lg font-semibold mt-1.5">
          Need a leave, document or any support from HR?
        </h2>
        <p className="text-gray-500 text-sm md:text-base mt-1 font-normal">
          Submit a request, track the status and stay updated.
        </p>
      </div>

      {/* Right Monochrome Illustration matching the reference screenshot */}
      <div className="relative shrink-0 flex items-center justify-end h-32 md:h-36 overflow-hidden select-none">
        {/* Motivational text balloon */}
        <div className="hidden sm:flex flex-col items-center mr-4 text-center">
          <div className="relative px-3.5 py-2 bg-white border-2 border-black rounded-xl text-xs sm:text-sm font-bold text-black shadow-xs transform -rotate-3 leading-tight">
            <span>Submit.</span>
            <br />
            <span>Track.</span>
            <br />
            <span>Get it done.</span>
            {/* Pointer notch */}
            <div className="absolute -bottom-2 right-4 w-3 h-3 bg-white border-r-2 border-b-2 border-black transform rotate-45"></div>
          </div>
          {/* Accent radiate dash marks */}
          <div className="flex gap-1.5 mt-2 opacity-60">
            <span className="w-1.5 h-0.5 bg-black rotate-45 transform"></span>
            <span className="w-2 h-0.5 bg-black"></span>
            <span className="w-1.5 h-0.5 bg-black -rotate-45 transform"></span>
          </div>
        </div>

        {/* Hand-drawn character with laptop (OFFSLEEK) and plant */}
        <div className="relative w-48 h-32 md:w-56 md:h-36 shrink-0 flex items-end">
          <svg
            viewBox="0 0 240 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-black"
          >
            {/* Background houseplant */}
            <path
              d="M210 160 L210 110 C210 80 235 60 235 60 C235 60 240 90 225 115"
              fill="#f3f4f6"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M205 160 C205 130 185 100 180 85 C180 85 200 95 210 120"
              fill="#e5e7eb"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M215 160 C215 120 225 80 220 70 C220 70 230 100 225 130"
              fill="#f9fafb"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            {/* Plant Pot */}
            <path
              d="M195 160 L200 130 L225 130 L230 160 Z"
              fill="white"
              stroke="currentColor"
              strokeWidth="2.5"
            />

            {/* Laptop Screen with OFFSLEEK logo */}
            <path
              d="M25 155 L105 155 L95 118 L40 118 Z"
              fill="#f8fafc"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line x1="20" y1="155" x2="110" y2="155" stroke="currentColor" strokeWidth="3" />
            <text x="52" y="140" fontSize="5" fontWeight="900" fill="currentColor" letterSpacing="0.5">
              OFFSLEEK
            </text>

            {/* Coffee Mug with text */}
            <rect
              x="76"
              y="114"
              width="22"
              height="28"
              rx="3"
              fill="white"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M98 120 C103 120 103 128 98 130"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            {/* Mini text on cup */}
            <text x="79" y="123" fontSize="3.8" fontWeight="bold" fill="currentColor">
              Good
            </text>
            <text x="79" y="128" fontSize="3.8" fontWeight="bold" fill="currentColor">
              People
            </text>
            <text x="79" y="133" fontSize="3.4" fontWeight="bold" fill="currentColor">
              Build
            </text>
            <text x="79" y="138" fontSize="3.4" fontWeight="bold" fill="currentColor">
              Great Work
            </text>

            {/* Character torso */}
            <path
              d="M105 160 C110 135 130 125 155 125 C180 125 195 135 200 160"
              fill="white"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            {/* Arm resting on chin */}
            <path
              d="M130 135 C118 138 105 135 105 135"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Head / Face */}
            <ellipse
              cx="155"
              cy="95"
              rx="18"
              ry="20"
              fill="white"
              stroke="currentColor"
              strokeWidth="2.5"
            />

            {/* Peaceful closed eyes (smiling arcs) */}
            <path
              d="M146 94 Q149 98 152 94"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M158 94 Q161 98 164 94"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Gentle smile */}
            <path
              d="M151 104 Q155 107 159 104"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Blush cheeks */}
            <ellipse cx="144" cy="99" rx="2.5" ry="1.5" fill="#fecaca" />
            <ellipse cx="166" cy="99" rx="2.5" ry="1.5" fill="#fecaca" />

            {/* Hair with top bun */}
            <path
              d="M135 90 C135 70 150 65 165 65 C180 65 180 85 175 95 C170 80 155 78 145 84 C140 87 135 90 135 90 Z"
              fill="currentColor"
            />
            <circle cx="166" cy="58" r="14" fill="currentColor" stroke="currentColor" strokeWidth="2" />
            <path d="M158 58 Q166 50 174 58" stroke="white" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );
};
