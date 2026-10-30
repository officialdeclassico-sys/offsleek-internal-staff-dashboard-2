import React, { useState } from 'react';
import { Link2, Copy, Check, Video, ExternalLink } from 'lucide-react';
import { useMeetings } from '../../context/MeetingContext';

export const MyMeetingLinksCard: React.FC = () => {
  const { personalRoomUrl, copyMeetingLink, joinWithCode } = useMeetings();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyMeetingLink(personalRoomUrl);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
          <Link2 className="w-5 h-5 text-gray-900" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-950">My Meeting Links</h2>
          <p className="text-sm text-gray-500 mt-0.5">Use this link to quickly start a meeting.</p>
        </div>
      </div>

      {/* URL Box & Copy */}
      <div className="space-y-3.5">
        <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-3">
          <span className="text-sm font-mono text-gray-800 truncate select-all">
            {personalRoomUrl}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 shadow-2xs'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gray-500" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => joinWithCode(personalRoomUrl)}
          className="w-full py-3 px-4 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
        >
          <Video className="w-4 h-4" />
          <span>Launch Personal Room</span>
        </button>
      </div>
    </div>
  );
};
