import React, { useState } from 'react';
import { X, Calendar, Clock, Users, AlertCircle, Check } from 'lucide-react';
import { useMeetings } from '../../context/MeetingContext';

export const ScheduleMeetingModal: React.FC = () => {
  const {
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    availableParticipants,
    scheduleMeeting,
  } = useMeetings();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('2026-10-25');
  const [startTime, setStartTime] = useState('11:00 AM');
  const [endTime, setEndTime] = useState('11:45 AM');
  const [timeZone, setTimeZone] = useState('India Standard Time (IST)');
  const [selectedParticipantIds, setSelectedParticipantIds] = useState<string[]>([
    'EMP-1006',
    'EMP-1007',
  ]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isScheduleModalOpen) return null;

  const handleToggleParticipant = (id: string) => {
    if (id === 'EMP-1006') return; // Cannot unselect self
    setSelectedParticipantIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Please provide a meeting title.');
      return;
    }

    if (!date) {
      setError('Please select a valid date.');
      return;
    }

    // Time validation check
    const parseTime = (tStr: string) => {
      const [time, modifier] = tStr.trim().split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    if (parseTime(endTime) <= parseTime(startTime)) {
      setError('Meeting end time must be after the start time.');
      return;
    }

    const res = scheduleMeeting({
      title,
      description,
      date,
      startTime,
      endTime,
      timeZone,
      participantIds: selectedParticipantIds,
      notes,
    });

    if (!res.success) {
      setError(res.message);
      return;
    }

    setIsScheduleModalOpen(false);
    setTitle('');
    setDescription('');
    setNotes('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={() => setIsScheduleModalOpen(false)}
    >
      <div
        className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#fbfbfb]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-950">Schedule a Meeting</h3>
              <p className="text-xs text-gray-500 font-medium">Invite teammates and coordinate discussion agenda</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsScheduleModalOpen(false)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4.5 overflow-y-auto flex-1 text-sm">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-700 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4.5 h-4.5 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Meeting Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Meeting Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Q4 Ticket Backlog Review"
              className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder:text-gray-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Description / Objective
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of topics to cover..."
              className="w-full px-3.5 py-2.5 text-sm font-normal text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder:text-gray-400"
            />
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Start Time *
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              >
                {['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                End Time *
              </label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              >
                {['09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '11:45 AM', '12:00 PM', '01:45 PM', '02:45 PM', '03:45 PM', '04:45 PM', '05:30 PM'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Time zone */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Time Zone
            </label>
            <input
              type="text"
              readOnly
              value={timeZone}
              className="w-full px-3.5 py-2.5 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-xl cursor-not-allowed"
            />
          </div>

          {/* Internal Participants Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Internal Team Participants (OFFSLEEK Employees)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto p-2 border border-gray-200 rounded-xl bg-gray-50/50">
              {availableParticipants.map((p) => {
                const isSelected = selectedParticipantIds.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleToggleParticipant(p.id)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-white border-black shadow-2xs'
                        : 'bg-white/80 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${p.avatarBg || 'bg-gray-800 text-white'}`}>
                        {p.avatarText}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{p.name}</p>
                        <p className="text-xs text-gray-500 truncate">{p.role}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-black shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes / Pre-read */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Pre-Read Notes or Preparation Instructions (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Please review Zendesk ticket logs prior to call"
              className="w-full px-3.5 py-2.5 text-sm font-normal text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder:text-gray-400"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsScheduleModalOpen(false)}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-bold text-white bg-black hover:bg-gray-800 rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              Save &amp; Schedule Meeting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
