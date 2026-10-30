import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Share2,
  Users,
  MessageSquare,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Settings,
} from 'lucide-react';
import { useMeetings } from '../../context/MeetingContext';

export const VideoRoomModal: React.FC = () => {
  const { activeCallMeeting, leaveCall, copyMeetingLink } = useMeetings();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<'participants' | 'chat' | null>(null);
  const [copied, setCopied] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: 'Aman Verma',
      text: 'Good morning everyone! Let us review the open authentication tickets first.',
      time: '10:01 AM',
    },
    {
      sender: 'Priya Reddy',
      text: 'Logs have been shared in the internal notes on ISS #1023.',
      time: '10:03 AM',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Call timer
  useEffect(() => {
    if (!activeCallMeeting) return;
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [activeCallMeeting]);

  // Attempt real camera stream if available, otherwise graceful fallback
  useEffect(() => {
    if (!activeCallMeeting) return;

    let isMounted = true;
    if (isVideoOn) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          if (isMounted) {
            mediaStreamRef.current = stream;
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
          }
        })
        .catch(() => {
          // Camera permission denied or not available; fallback handled gracefully
        });
    } else {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
    }

    return () => {
      isMounted = false;
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isVideoOn, activeCallMeeting]);

  if (!activeCallMeeting) return null;

  const m = activeCallMeeting;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCopy = async () => {
    await copyMeetingLink(m.joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'Neha Sharma (You)',
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setNewMessage('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-[#121214] text-white rounded-2xl border border-gray-800 shadow-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden">
        {/* Top Meeting Bar */}
        <div className="px-6 py-3.5 border-b border-gray-800/80 bg-[#18181b] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              LIVE
            </span>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-white truncate max-w-md">
                {m.title}
              </h2>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                {m.code} • Duration: {formatTimer(callDuration)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              <span>{copied ? 'Copied' : 'Invite Link'}</span>
            </button>
          </div>
        </div>

        {/* Video Workspace & Sidebar */}
        <div className="flex-1 flex overflow-hidden p-4 gap-4 bg-[#09090b]">
          {/* Main Stage Video Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 h-full overflow-y-auto">
            {/* Tile 1: Local User (Neha Sharma) */}
            <div className="relative bg-[#1c1c20] rounded-2xl overflow-hidden border border-gray-800 flex items-center justify-center min-h-[220px]">
              {isVideoOn ? (
                <>
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover mirror"
                  />
                  {/* Fallback avatar if video track not streaming */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-b from-gray-900 to-black pointer-events-none opacity-20">
                    <div className="w-20 h-20 rounded-full bg-black text-white border border-gray-700 flex items-center justify-center text-xl font-bold">
                      NS
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-black text-white border-2 border-gray-700 flex items-center justify-center text-2xl font-bold mb-2 shadow-lg">
                    NS
                  </div>
                  <p className="text-xs text-gray-400">Camera is off</p>
                </div>
              )}

              {/* Tile Label */}
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-lg text-xs font-medium text-white flex items-center gap-2">
                <span>Neha Sharma (You)</span>
                {!isMicOn && <MicOff className="w-3 h-3 text-rose-400" />}
              </div>
            </div>

            {/* Tile 2: Colleague 1 (Aman Verma) */}
            <div className="relative bg-[#1c1c20] rounded-2xl overflow-hidden border border-gray-800 flex items-center justify-center min-h-[220px]">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-3 shadow-lg">
                    AV
                  </div>
                  {/* Speaking indicator wave */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#1c1c20] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-white">Aman Verma</h4>
                <p className="text-[11px] text-gray-400">Team Lead • Speaking</p>
              </div>

              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-lg text-xs font-medium text-white flex items-center gap-2">
                <span>Aman Verma</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
            </div>

            {/* Tile 3: Colleague 2 (Priya Reddy) */}
            <div className="relative bg-[#1c1c20] rounded-2xl overflow-hidden border border-gray-800 flex items-center justify-center min-h-[220px]">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold mb-3 shadow-lg">
                  PR
                </div>
                <h4 className="text-sm font-semibold text-white">Priya Reddy</h4>
                <p className="text-[11px] text-gray-400">Senior Support Specialist</p>
              </div>

              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-lg text-xs font-medium text-white flex items-center gap-2">
                <span>Priya Reddy</span>
              </div>
            </div>

            {/* Tile 4: Shared Screen / Agenda presentation */}
            <div className="relative bg-linear-to-br from-gray-900 to-[#18181b] rounded-2xl overflow-hidden border border-gray-800 p-5 flex flex-col justify-between min-h-[220px]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Shared Meeting Notes
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-gray-800 text-gray-300 rounded font-mono">
                  Zendesk Sync
                </span>
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-gray-800/80 space-y-1.5 text-xs text-gray-300">
                <p className="font-semibold text-white">Focus Agenda:</p>
                <p className="text-[11px] text-gray-400">• Review 403 Forbidden errors for faculty logins</p>
                <p className="text-[11px] text-gray-400">• Verification of token expiration on Greenfield domain</p>
                <p className="text-[11px] text-gray-400">• Update KB article with diagnostic checklist</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-500">
                <span>Auto-saved to ticket log</span>
                <span className="text-emerald-400 font-medium">Encrypted P2P Room</span>
              </div>
            </div>
          </div>

          {/* Collapsible Sidebar (Participants or Chat) */}
          {activeSidebarTab && (
            <div className="w-80 bg-[#18181b] rounded-2xl border border-gray-800 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  {activeSidebarTab === 'participants' ? 'In-Call Participants' : 'Meeting Chat'}
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveSidebarTab(null)}
                  className="text-gray-400 hover:text-white"
                >
                  &times;
                </button>
              </div>

              {activeSidebarTab === 'participants' ? (
                <div className="p-4 space-y-2 overflow-y-auto flex-1 text-xs">
                  {m.participants.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-gray-900 border border-gray-800"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${p.avatarBg || 'bg-gray-800 text-white'}`}>
                          {p.avatarText}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-xs">{p.name}</p>
                          <p className="text-[10px] text-gray-400">{p.role}</p>
                        </div>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                  <div className="p-4 space-y-3 overflow-y-auto flex-1 text-xs">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className="space-y-0.5">
                        <div className="flex items-center justify-between text-[10px] text-gray-400">
                          <span className="font-semibold text-gray-300">{msg.sender}</span>
                          <span>{msg.time}</span>
                        </div>
                        <p className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 text-xs">
                          {msg.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-800 flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-xs text-white placeholder:text-gray-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-white text-black font-semibold rounded-lg text-xs hover:bg-gray-200"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Call Controls Bar */}
        <div className="px-6 py-4 bg-[#18181b] border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-mono hidden sm:inline">
              Room: {m.code}
            </span>
          </div>

          {/* Central Controls */}
          <div className="flex items-center gap-3">
            {/* Mic Toggle */}
            <button
              type="button"
              onClick={() => setIsMicOn(!isMicOn)}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isMicOn
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-rose-600 text-white shadow-lg'
              }`}
              title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            {/* Video Toggle */}
            <button
              type="button"
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isVideoOn
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-rose-600 text-white shadow-lg'
              }`}
              title={isVideoOn ? 'Turn Off Camera' : 'Turn On Camera'}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            {/* Screen Share */}
            <button
              type="button"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isScreenSharing
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
              title={isScreenSharing ? 'Stop Presenting' : 'Share Screen'}
            >
              <Share2 className="w-5 h-5" />
            </button>

            {/* Participants Toggle */}
            <button
              type="button"
              onClick={() =>
                setActiveSidebarTab(activeSidebarTab === 'participants' ? null : 'participants')
              }
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeSidebarTab === 'participants'
                  ? 'bg-white text-black'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
              title="View Participants"
            >
              <Users className="w-5 h-5" />
            </button>

            {/* Chat Toggle */}
            <button
              type="button"
              onClick={() =>
                setActiveSidebarTab(activeSidebarTab === 'chat' ? null : 'chat')
              }
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                activeSidebarTab === 'chat'
                  ? 'bg-white text-black'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
              title="Open In-Call Chat"
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            {/* Leave Call (Red) */}
            <button
              type="button"
              onClick={leaveCall}
              className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-lg ml-2"
            >
              <PhoneOff className="w-4 h-4" />
              <span>Leave Call</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-gray-500 font-mono">
              OFFSLEEK WebRTC
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
