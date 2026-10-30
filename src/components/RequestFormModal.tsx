import React, { useState } from 'react';
import { X, Loader2, CheckCircle2, Paperclip, AlertCircle } from 'lucide-react';
import { useRequest } from '../context/RequestContext';
import { RequestIcon } from './RequestIcons';
import { RequestCategory } from '../types/request';

export const RequestFormModal: React.FC = () => {
  const {
    isCreateModalOpen,
    setIsCreateModalOpen,
    createModalCategory,
    setCreateModalCategory,
    submitNewRequest,
  } = useRequest();

  // Form states
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [startDate, setStartDate] = useState('2026-10-25');
  const [endDate, setEndDate] = useState('2026-10-26');
  const [salaryMonth, setSalaryMonth] = useState('September 2026');
  const [documentType, setDocumentType] = useState('Experience Letter');
  const [toolRequested, setToolRequested] = useState('Support Team Root Inbox Access');
  const [accessLevel, setAccessLevel] = useState('Read Only');
  const [duration, setDuration] = useState('Permanent');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachmentName, setAttachmentName] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isCreateModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    let reqTitle = title.trim();
    let reqDesc = description.trim();
    let requiredForDate = '—';

    // Category specific preparation and validation
    if (createModalCategory === 'Leave') {
      reqTitle = leaveType;
      if (!reqDesc) reqDesc = `Leave requested from ${startDate} to ${endDate}`;
      if (new Date(endDate) < new Date(startDate)) {
        setErrorMessage('End date cannot be earlier than start date.');
        return;
      }
      requiredForDate = startDate;
    } else if (createModalCategory === 'Salary Slip') {
      reqTitle = `${salaryMonth} Salary Slip`;
      if (!reqDesc) reqDesc = 'Need official salary slip for personal records';
    } else if (createModalCategory === 'Document') {
      reqTitle = documentType;
      if (!reqDesc) {
        setErrorMessage('Please provide the purpose or reason for the document.');
        return;
      }
    } else if (createModalCategory === 'Access') {
      reqTitle = toolRequested.split(' ')[0] + ' Access';
      if (!reqDesc) {
        setErrorMessage('Please provide a business justification for requested access.');
        return;
      }
    } else if (createModalCategory === 'Other') {
      if (!reqTitle) {
        setErrorMessage('Please enter a request title.');
        return;
      }
      if (!reqDesc) {
        setErrorMessage('Please describe your request.');
        return;
      }
    }

    setIsSubmitting(true);
    const res = await submitNewRequest({
      category: createModalCategory,
      title: reqTitle,
      description: reqDesc,
      requiredFor: requiredForDate,
      details: {
        startDate: createModalCategory === 'Leave' ? startDate : undefined,
        endDate: createModalCategory === 'Leave' ? endDate : undefined,
        leaveType: createModalCategory === 'Leave' ? leaveType : undefined,
        salaryMonth: createModalCategory === 'Salary Slip' ? salaryMonth : undefined,
        documentType: createModalCategory === 'Document' ? documentType : undefined,
        toolRequested: createModalCategory === 'Access' ? toolRequested : undefined,
        accessLevel: createModalCategory === 'Access' ? accessLevel : undefined,
        duration: createModalCategory === 'Access' ? duration : undefined,
        attachmentName: attachmentName || undefined,
      },
    });

    setIsSubmitting(false);
    if (!res.success) {
      setErrorMessage(res.message);
    }
  };

  const categories: RequestCategory[] = [
    'Leave',
    'Salary Slip',
    'Document',
    'Access',
    'Other',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg p-6 relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-black">
              <RequestIcon category={createModalCategory} className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Raise {createModalCategory} Request
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                OFFSLEEK Employee Self-Service Support
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(false)}
            className="text-gray-400 hover:text-black p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Category Switcher Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCreateModalCategory(cat);
                setErrorMessage(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                createModalCategory === cat
                  ? 'bg-black text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-sm">
          {/* LEAVE FORM */}
          {createModalCategory === 'Leave' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Leave Type
                </label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm text-gray-800"
                >
                  <option value="Casual Leave">Casual Leave (Balance: 6 days)</option>
                  <option value="Sick Leave">Sick Leave (Balance: 8 days)</option>
                  <option value="Privilege Leave">Privilege / Earned Leave (Balance: 12 days)</option>
                  <option value="Compensatory Off">Compensatory Off</option>
                  <option value="Maternity / Paternity Leave">Maternity / Paternity Leave</option>
                  <option value="Bereavement Leave">Bereavement Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Reason / Handover Note
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., 2 days leave for personal family event. Tickets delegated to team lead."
                  className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                />
              </div>
            </>
          )}

          {/* SALARY SLIP FORM */}
          {createModalCategory === 'Salary Slip' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Requested Salary Month
                </label>
                <select
                  value={salaryMonth}
                  onChange={(e) => setSalaryMonth(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                >
                  <option value="September 2026">September 2026 (Latest Cycle)</option>
                  <option value="August 2026">August 2026</option>
                  <option value="July 2026">July 2026</option>
                  <option value="June 2026">June 2026</option>
                  <option value="May 2026">May 2026</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Purpose of Request (Optional)
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Need salary slip for home loan processing"
                  className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                />
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600">
                🔒 <strong>Privacy Assurance:</strong> Salary slips contain confidential compensation details and will only be accessible to your authenticated employee account.
              </div>
            </>
          )}

          {/* DOCUMENT REQUEST FORM */}
          {createModalCategory === 'Document' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Document Type
                </label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                >
                  <option value="Experience Letter">Experience Letter / Relieving Certificate</option>
                  <option value="Employment Verification Letter">Employment Verification Letter (Bonafide)</option>
                  <option value="Salary Certificate">Salary Certificate</option>
                  <option value="Offer Letter Copy">Duplicate Offer Letter Copy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Purpose / Intended Recipient *
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., For bank loan application / Embassy visa interview"
                  required
                  className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                />
              </div>
            </>
          )}

          {/* ACCESS REQUEST FORM */}
          {createModalCategory === 'Access' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Tool / System Requested
                </label>
                <select
                  value={toolRequested}
                  onChange={(e) => setToolRequested(e.target.value)}
                  className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                >
                  <option value="Support Team Root Inbox Access">Support Team Root Inbox Access</option>
                  <option value="Customer Database (Read-Only)">Customer Database (Read-Only)</option>
                  <option value="Zendesk & Freshdesk API Keys">Zendesk & Freshdesk API Keys</option>
                  <option value="AWS CloudWatch Logs (Prod)">AWS CloudWatch Logs (Prod)</option>
                  <option value="GitHub Support Org Repo">GitHub Support Org Repo</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Access Level
                  </label>
                  <select
                    value={accessLevel}
                    onChange={(e) => setAccessLevel(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                  >
                    <option value="Read Only">Read Only</option>
                    <option value="Read & Write">Read & Write</option>
                    <option value="Full Admin">Full Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                  >
                    <option value="Permanent">Permanent</option>
                    <option value="30 Days (Temporary)">30 Days (Temporary)</option>
                    <option value="90 Days">90 Days</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Business Justification *
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain why this access is necessary for your role..."
                  required
                  className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                />
              </div>

              <div className="text-xs text-gray-500 font-medium">
                Access requests are dispatched directly to the <strong>IT Security and Infrastructure Team</strong> for verification.
              </div>
            </>
          )}

          {/* OTHER REQUEST FORM */}
          {createModalCategory === 'Other' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Request Subject / Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Ergonomic Chair & Monitor Arm"
                  required
                  className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Detailed Description *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide full context, hardware specs, or HR inquiry details..."
                  required
                  className="w-full p-2.5 border border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                />
              </div>
            </>
          )}

          {/* Attachment upload simulator */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Supporting Attachment (Optional)
            </label>
            <div className="flex items-center gap-2.5">
              <label className="px-3.5 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center gap-2 shadow-2xs">
                <Paperclip className="w-4 h-4 text-gray-500" />
                <span>{attachmentName ? 'Change File' : 'Attach Document / Proof'}</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setAttachmentName(e.target.files[0].name);
                    }
                  }}
                />
              </label>
              {attachmentName && (
                <span className="text-sm text-gray-700 truncate max-w-[200px] font-medium">
                  {attachmentName}
                </span>
              )}
            </div>
          </div>

          {/* Validation Error Banner */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2 font-medium">
              <AlertCircle className="w-4.5 h-4.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              disabled={isSubmitting}
              className="px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-2xs cursor-pointer transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
