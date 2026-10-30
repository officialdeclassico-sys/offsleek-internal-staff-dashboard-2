import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSupport } from '../../context/SupportContext';

export const ChangePasswordCard: React.FC = () => {
  const { showToast } = useSupport();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!currentPassword.trim()) {
      setError('Please enter your current password.');
      return;
    }

    if (!newPassword) {
      setError('Please enter a new password.');
      return;
    }

    // Policy check: min 8 characters, at least 1 digit or symbol
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    if (!/[0-9]/.test(newPassword) && !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      setError('Password must contain at least one number or special character.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    if (newPassword === currentPassword) {
      setError('New password cannot be identical to your current password.');
      return;
    }

    setIsSubmitting(true);

    // Simulate backend verification and safe persistence
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess('Your password has been securely updated.');
      showToast('Password successfully updated', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Auto-clear success message after 4s
      setTimeout(() => {
        setSuccess(null);
      }, 4000);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
      {/* Card Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
          <Lock className="w-4 h-4 text-gray-900" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-950">Change Password</h2>
          <p className="text-sm text-gray-500 mt-0.5">Keep your account secure with a strong password.</p>
        </div>
      </div>

      {/* Feedback Messages */}
      {error && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      {/* Horizontal Desktop Layout Form */}
      <form onSubmit={handleUpdatePassword} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          {/* Current Password */}
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full pl-3.5 pr-8 py-2.5 text-sm font-normal text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label={showCurrent ? 'Hide password' : 'Show password'}
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full pl-3.5 pr-8 py-2.5 text-sm font-normal text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label={showNew ? 'Hide password' : 'Show password'}
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full pl-3.5 pr-8 py-2.5 text-sm font-normal text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-black hover:bg-gray-800 text-white rounded-lg text-sm font-semibold transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 whitespace-nowrap h-[42px]"
            >
              <span>Update Password</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
