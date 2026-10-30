import React from 'react';

export const PunchBreakHeader: React.FC = () => {
  return (
    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white rounded-2xl border border-gray-200 p-6 overflow-hidden shadow-2xs">
      {/* Left Heading & Subtitle */}
      <div className="z-10 max-w-xl">
        <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-black tracking-tight leading-tight">
          Punch Break
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mt-2 font-medium">
          Take a break, recharge and come back stronger!
        </p>
      </div>

      {/* Right Monochrome Illustration matching the reference screenshot */}
      <div className="relative shrink-0 flex items-center justify-end h-32 md:h-36 overflow-hidden select-none">
        {/* Motivational text balloon */}
        <div className="hidden sm:flex flex-col items-center mr-4 text-center">
          <div className="relative px-3 py-1.5 bg-white border-2 border-black rounded-xl text-xs font-bold text-black shadow-xs transform -rotate-3">
            <span>A small break</span>
            <br />
            <span>makes a big difference!</span>
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

        {/* Hand-drawn character enjoying coffee with laptop and plant */}
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

            {/* Laptop base */}
            <path
              d="M20 155 L100 155 L90 120 L35 120 Z"
              fill="#f8fafc"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line x1="15" y1="155" x2="105" y2="155" stroke="currentColor" strokeWidth="3" />

            {/* Coffee Mug with text */}
            <rect
              x="68"
              y="110"
              width="24"
              height="30"
              rx="3"
              fill="white"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M92 116 C98 116 98 126 92 128"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            {/* Mini text on cup */}
            <text x="71" y="121" fontSize="4.5" fontWeight="900" fill="currentColor">
              GOOD
            </text>
            <text x="71" y="127" fontSize="4.5" fontWeight="900" fill="currentColor">
              BREAK
            </text>
            <text x="71" y="133" fontSize="4" fontWeight="bold" fill="currentColor">
              BETTER WORK
            </text>

            {/* Girl character torso */}
            <path
              d="M95 160 C100 135 120 125 145 125 C170 125 185 135 190 160"
              fill="white"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            {/* Arms holding mug */}
            <path
              d="M115 135 C100 138 85 135 85 135"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Neck */}
            <path d="M138 125 L138 112 L148 112 L148 125" fill="white" stroke="currentColor" strokeWidth="2" />

            {/* Head / Face */}
            <ellipse
              cx="145"
              cy="95"
              rx="18"
              ry="20"
              fill="white"
              stroke="currentColor"
              strokeWidth="2.5"
            />

            {/* Peaceful closed eyes (smiling arcs) */}
            <path
              d="M136 94 Q139 98 142 94"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M148 94 Q151 98 154 94"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Gentle smile */}
            <path
              d="M141 104 Q145 107 149 104"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Cheeks blush circles */}
            <ellipse cx="134" cy="99" rx="2.5" ry="1.5" fill="#fecaca" />
            <ellipse cx="156" cy="99" rx="2.5" ry="1.5" fill="#fecaca" />

            {/* Anime/Manga Hair & Bun */}
            <path
              d="M125 90 C125 70 140 65 155 65 C170 65 170 85 165 95 C160 80 145 78 135 84 C130 87 125 90 125 90 Z"
              fill="currentColor"
            />
            {/* Top Bun */}
            <circle cx="156" cy="58" r="14" fill="currentColor" stroke="currentColor" strokeWidth="2" />
            <path d="M148 58 Q156 50 164 58" stroke="white" strokeWidth="1.5" fill="none" />
            {/* Hair bangs wisps */}
            <path
              d="M132 82 Q140 76 148 82"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
