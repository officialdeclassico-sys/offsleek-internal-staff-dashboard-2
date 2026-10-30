import React, { useState, useRef } from 'react';
import { X, Upload, Check, AlertCircle, Camera, RefreshCw } from 'lucide-react';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhotoUrl?: string;
  avatarInitials: string;
  onSavePhoto: (newPhotoUrl?: string) => void;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  currentPhotoUrl,
  avatarInitials,
  onSavePhoto,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(currentPhotoUrl);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, or WebP).');
      return;
    }

    // Validate size (max 4MB)
    if (file.size > 4 * 1024 * 1024) {
      setError('Image file size must be less than 4MB.');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setIsProcessing(false);
    };
    reader.onerror = () => {
      setError('Failed to read image file. Please try another image.');
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSavePhoto(selectedImage);
    onClose();
  };

  const handleResetToInitials = () => {
    setSelectedImage(undefined);
    setError(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-upload-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#fbfbfb]">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-gray-700" />
            <h3 id="photo-upload-title" className="text-lg font-bold text-gray-900">
              Update Profile Photo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-center">
          {/* Avatar Preview */}
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28 rounded-full border-2 border-gray-200 shadow-inner flex items-center justify-center overflow-hidden bg-gray-100">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-gray-700 font-sans tracking-wider">
                  {avatarInitials}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              {selectedImage ? 'Preview of selected photo' : 'Default initials avatar'}
            </p>
          </div>

          {/* Error notice */}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-700 flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-2.5">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="w-full py-2.5 px-4 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              {isProcessing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>Upload New Photo</span>
            </button>

            {selectedImage && (
              <button
                type="button"
                onClick={handleResetToInitials}
                className="w-full py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Reset to Initials
              </button>
            )}
          </div>

          <p className="text-xs text-gray-500">
            Supports PNG, JPEG or WebP up to 4MB. Profile pictures must adhere to OFFSLEEK workplace guidelines.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-[#fbfbfb] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2.5 text-sm font-semibold text-white bg-black hover:bg-gray-800 rounded-lg transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Save Profile Photo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
