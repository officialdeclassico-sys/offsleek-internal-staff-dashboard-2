import React, { useState, useRef } from 'react';
import {
  Download,
  Paperclip,
  Smile,
  FileText,
  Send,
  Lock,
  Eye,
  X,
  FileCheck,
  AlertTriangle,
} from 'lucide-react';
import { useSupport } from '../context/SupportContext';
import { CANNED_REPLIES } from '../data/mockData';
import { Attachment } from '../types/support';

export const ConversationPanel: React.FC = () => {
  const {
    selectedTicket,
    activeConversationTab,
    setActiveConversationTab,
    replyDraft,
    setReplyDraft,
    replyAttachments,
    setReplyAttachments,
    internalNoteDraft,
    setInternalNoteDraft,
    setIsReviewModalOpen,
    addInternalNote,
    showToast,
  } = useSupport();

  // Pickers state
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showCannedReplies, setShowCannedReplies] = useState(false);
  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(null);
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [composerValidation, setComposerValidation] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const emojis = ['👍', '🙏', '😊', '💡', '✅', '⚠️', '📎', '🔍', '🙌', '💼'];

  // Handle Review & Send click
  const handleReviewAndSend = () => {
    if (!replyDraft.trim() && replyAttachments.length === 0) {
      setComposerValidation('Please enter a message or attach a file before reviewing.');
      textareaRef.current?.focus();
      return;
    }
    setComposerValidation(null);
    setIsReviewModalOpen(true);
  };

  // Handle adding canned reply
  const handleSelectCanned = (text: string) => {
    setReplyDraft(text);
    setShowCannedReplies(false);
    setComposerValidation(null);
  };

  // Handle adding emoji
  const handleSelectEmoji = (emoji: string) => {
    setReplyDraft(replyDraft + emoji);
    setShowEmojiPicker(false);
  };

  // Handle real file upload selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeKb = Math.round(file.size / 1024);
      const newAtt: Attachment = {
        id: `att-${Date.now()}`,
        name: file.name,
        size: `${sizeKb} KB`,
        type: file.type,
      };
      setReplyAttachments((prev) => [...prev, newAtt]);
      showToast(`Attached ${file.name}`, 'info');
      e.target.value = '';
    }
  };

  // Handle Internal Note save
  const handleSaveInternalNote = async () => {
    if (!internalNoteDraft.trim()) {
      showToast('Please type a note before saving.', 'error');
      return;
    }

    setIsSubmittingNote(true);
    const res = await addInternalNote(selectedTicket.id, internalNoteDraft);
    setIsSubmittingNote(false);
    if (!res.success) {
      showToast(res.error || 'Failed to save internal note', 'error');
    }
  };

  // Mock download action
  const handleDownloadAttachment = (att: Attachment) => {
    showToast(`Downloading ${att.name}...`, 'info');
    // Simulate blob download
    const element = document.createElement('a');
    const file = new Blob([`OFFSLEEK Support System: Attachment ${att.name} for ${selectedTicket.id}`], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = att.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden flex flex-col min-h-[640px]">
      {/* Tab Navigation Header */}
      <div className="flex items-center border-b border-gray-200 px-6 pt-3.5 bg-white select-none">
        <button
          onClick={() => setActiveConversationTab('conversation')}
          className={`pb-3 text-sm font-bold transition-colors relative mr-8 ${
            activeConversationTab === 'conversation'
              ? 'text-black'
              : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          <span>Conversation</span>
          {activeConversationTab === 'conversation' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveConversationTab('internal_notes')}
          className={`pb-3 text-sm font-bold transition-colors relative flex items-center gap-2 ${
            activeConversationTab === 'internal_notes'
              ? 'text-black'
              : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          <span>Internal Notes</span>
          {selectedTicket.internalNotes.length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-800 font-bold">
              {selectedTicket.internalNotes.length}
            </span>
          )}
          {activeConversationTab === 'internal_notes' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
          )}
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeConversationTab === 'conversation' ? (
          /* CONVERSATION VIEW */
          <div className="space-y-6">
            {selectedTicket.messages.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">
                No customer messages in this ticket yet.
              </div>
            ) : (
              selectedTicket.messages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-4 group">
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-bold text-sm tracking-wider shadow-2xs ${
                      msg.sender.avatarColor || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {msg.sender.avatarText}
                  </div>

                  {/* Message Content Container */}
                  <div className="flex-1 min-w-0">
                    {/* Header Row: Sender Name + Timestamp */}
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-gray-950">
                          {msg.sender.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Subtitle: School / Role */}
                    <div className="text-xs text-gray-500 mb-2 font-medium">
                      {msg.sender.schoolName || msg.sender.role}
                    </div>

                    {/* Message Body Card */}
                    <div className="bg-[#f8fafc] border border-gray-150 rounded-xl p-4 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-normal">
                      {msg.text}

                      {/* Attachments if present */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-3.5 space-y-2">
                          {msg.attachments.map((att) => (
                            <div
                              key={att.id}
                              className="max-w-sm bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between shadow-2xs hover:border-gray-300 transition-colors"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                                  <Paperclip className="w-4 h-4 text-gray-500" />
                                </div>
                                <div className="min-w-0">
                                  <div
                                    className="font-semibold text-sm text-gray-900 truncate hover:underline cursor-pointer"
                                    onClick={() => setPreviewAttachment(att)}
                                    title="Preview file"
                                  >
                                    {att.name}
                                  </div>
                                  <div className="text-xs text-gray-400 mt-0.5">
                                    {att.size}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0 ml-3">
                                <button
                                  type="button"
                                  onClick={() => setPreviewAttachment(att)}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
                                  title="Quick view"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDownloadAttachment(att)}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
                                  title="Download file"
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* INTERNAL NOTES VIEW */
          <div className="space-y-6">
            {/* Security Header Banner */}
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl flex items-start gap-3 text-sm text-amber-900">
              <Lock className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold">Confidential Internal Notes:</span> Visible exclusively to OFFSLEEK support agents, technical leads, and engineering. Never visible to school contacts or outside users.
              </div>
            </div>

            {/* Existing Internal Notes */}
            <div className="space-y-4">
              {selectedTicket.internalNotes.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No internal notes recorded for this ticket yet.
                </div>
              ) : (
                selectedTicket.internalNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4.5 bg-amber-50/30 border border-amber-100 rounded-xl"
                  >
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-950">
                          {note.author.name}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-semibold">
                          {note.author.role}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">
                        {note.timestamp}
                      </span>
                    </div>

                    <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap mt-2 font-mono bg-white/70 p-3 rounded-xl border border-amber-100/50">
                      {note.text}
                    </p>

                    {note.tags && note.tags.length > 0 && (
                      <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Compose Internal Note */}
            <div className="pt-3 border-t border-gray-100">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Add New Internal Note
              </label>
              <textarea
                value={internalNoteDraft}
                onChange={(e) => setInternalNoteDraft(e.target.value)}
                placeholder="Log internal diagnostics, engineering notes, or escalation details..."
                rows={3}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:bg-white focus:border-black focus:outline-none transition-all placeholder-gray-400 font-mono leading-relaxed"
              />
              <div className="mt-2.5 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveInternalNote}
                  disabled={isSubmittingNote || !internalNoteDraft.trim()}
                  className="px-4.5 py-2.5 bg-black hover:bg-neutral-800 disabled:opacity-40 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Save Internal Note</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reply Composer at bottom (displayed when on Conversation tab) */}
      {activeConversationTab === 'conversation' && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="border border-gray-200 rounded-xl p-3.5 focus-within:border-black transition-colors shadow-2xs relative">
            {/* Attached file chips */}
            {replyAttachments.length > 0 && (
              <div className="mb-2.5 flex flex-wrap gap-2">
                {replyAttachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center gap-2 bg-gray-100 px-2.5 py-1 rounded-lg text-xs text-gray-900 font-semibold border border-gray-200"
                  >
                    <Paperclip className="w-3.5 h-3.5 text-gray-500" />
                    <span className="truncate max-w-[180px]">{att.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setReplyAttachments((prev) => prev.filter((a) => a.id !== att.id))
                      }
                      className="text-gray-400 hover:text-black ml-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              rows={3}
              value={replyDraft}
              onChange={(e) => {
                setReplyDraft(e.target.value);
                if (composerValidation) setComposerValidation(null);
              }}
              placeholder="Type your reply here..."
              className="w-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none resize-none leading-relaxed"
            />

            {/* Validation warning */}
            {composerValidation && (
              <div className="text-xs text-red-600 flex items-center gap-1.5 mb-2 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{composerValidation}</span>
              </div>
            )}

            {/* Composer Footer Actions */}
            <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
              {/* Left icons: Attachment, Emoji, Templates */}
              <div className="flex items-center gap-1.5 text-gray-500 relative">
                {/* File picker */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-lg hover:bg-gray-100 hover:text-black transition-colors cursor-pointer"
                  title="Attach file"
                >
                  <Paperclip className="w-4.5 h-4.5" />
                </button>

                {/* Emoji Picker */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmojiPicker(!showEmojiPicker);
                      setShowCannedReplies(false);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 hover:text-black transition-colors cursor-pointer"
                    title="Insert emoji"
                  >
                    <Smile className="w-4.5 h-4.5" />
                  </button>

                  {showEmojiPicker && (
                    <div className="absolute left-0 bottom-10 bg-white border border-gray-200 rounded-xl shadow-lg p-2.5 z-40 flex items-center gap-1.5">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => handleSelectEmoji(emoji)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg text-base cursor-pointer"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Canned Templates / Macros */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCannedReplies(!showCannedReplies);
                      setShowEmojiPicker(false);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 hover:text-black transition-colors cursor-pointer"
                    title="Insert canned response template"
                  >
                    <FileText className="w-4.5 h-4.5" />
                  </button>

                  {showCannedReplies && (
                    <div className="absolute left-0 bottom-10 w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-2.5 z-40 text-sm">
                      <div className="px-2.5 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Quick Response Templates
                      </div>
                      <div className="space-y-1 mt-1 max-h-56 overflow-y-auto">
                        {CANNED_REPLIES.map((cr) => (
                          <button
                            key={cr.id}
                            type="button"
                            onClick={() => handleSelectCanned(cr.text)}
                            className="w-full text-left p-2.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            <div className="font-semibold text-gray-950 text-sm">{cr.label}</div>
                            <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                              {cr.text}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right primary button: Review & Send */}
              <button
                type="button"
                onClick={handleReviewAndSend}
                className="bg-black hover:bg-neutral-800 text-white rounded-xl px-5 py-2.5 text-sm font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Review &amp; Send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attachment Preview Modal */}
      {previewAttachment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-gray-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4.5 h-4.5 text-gray-700" />
                <span className="font-bold text-sm text-gray-950">
                  {previewAttachment.name}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  ({previewAttachment.size})
                </span>
              </div>
              <button
                onClick={() => setPreviewAttachment(null)}
                className="text-gray-400 hover:text-black p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Body */}
            <div className="my-4 bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center text-center min-h-[190px]">
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm mb-2 shadow-2xs">
                PNG
              </div>
              <div className="font-bold text-sm text-gray-950">
                {previewAttachment.name}
              </div>
              <div className="text-xs text-gray-500 mt-1 max-w-sm leading-relaxed">
                Simulated screenshot showing: "HTTP 403 Forbidden: Missing scope [grade7_faculty] in tenant Greenfield-Prod"
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setPreviewAttachment(null)}
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadAttachment(previewAttachment);
                  setPreviewAttachment(null);
                }}
                className="px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
              >
                <Download className="w-4 h-4" />
                <span>Download File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
