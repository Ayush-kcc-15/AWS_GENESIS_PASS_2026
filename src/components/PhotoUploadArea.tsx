import React, { useState, useRef, DragEvent } from 'react';
import { UploadCloud, Crop, Trash2, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { usePass } from '../context/PassContext';
import { PhotoCropperModal } from './PhotoCropperModal';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const PhotoUploadArea: React.FC = () => {
  const { passData, updatePassData, errors, setErrors } = usePass();
  const [isDragging, setIsDragging] = useState(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = (file: File) => {
    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        photo: 'Unsupported file format. Please upload JPG, JPEG, PNG, or WEBP.',
      }));
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setErrors((prev) => ({
        ...prev,
        photo: `File size (${sizeMB} MB) exceeds the 5 MB limit. Please choose a smaller image.`,
      }));
      return;
    }

    // Clear previous error
    setErrors((prev) => {
      const rest = { ...prev };
      delete rest.photo;
      return rest;
    });

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      updatePassData({
        originalPhotoUrl: result,
        croppedPhotoUrl: result,
        photoFileName: file.name,
        photoFileSize: file.size,
      });
      // Automatically open cropper so visitor can fine-tune portrait positioning
      setIsCropperOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleRemovePhoto = () => {
    updatePassData({
      originalPhotoUrl: null,
      croppedPhotoUrl: null,
      photoFileName: '',
      photoFileSize: 0,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const hasPhoto = Boolean(passData.croppedPhotoUrl);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-bold tracking-wider text-[#C4CBD3] uppercase flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#40B4F5]" />
          <span>Profile Photograph <span className="text-[#40B4F5]">*</span></span>
        </label>
        <span className="text-[10px] font-mono text-[#8A95A3]">
          JPG, PNG, WEBP • Max 5MB
        </span>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleFileChange}
        className="hidden"
        id="profile-photo-input"
      />

      {!hasPhoto ? (
        /* Drag & Drop Upload Zone - Technical Outlined Aesthetic */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed transition-all p-6 flex flex-col items-center justify-center text-center cursor-pointer group bg-[#161C25] ${
            isDragging
              ? 'border-[#40B4F5] bg-[#40B4F5]/10'
              : errors.photo
              ? 'border-red-500/80 bg-red-500/5'
              : 'border-[#515963] hover:border-[#40B4F5]'
          }`}
        >
          <div className="w-12 h-12 bg-[#1B222C] border border-[#515963] flex items-center justify-center text-[#40B4F5] group-hover:border-[#40B4F5] transition-all mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">
              Drag &amp; drop your photograph here, or{' '}
              <span className="text-[#40B4F5] underline underline-offset-4 font-bold">
                browse files
              </span>
            </p>
            <p className="text-xs text-[#C4CBD3]">
              Clear frontal portrait photo for the official attendee pass
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-[#8A95A3] px-2.5 py-0.5 bg-[#1B222C] border border-[#515963]/50">
            <span>High-res square or portrait recommended</span>
          </div>
        </div>
      ) : (
        /* Uploaded Photo Preview & Controls Card - Technical Container */
        <div className="p-3.5 border border-[#515963] bg-[#161C25] flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Thumbnail */}
            <div className="relative w-16 h-16 border border-[#40B4F5] shrink-0 bg-black">
              <img
                src={passData.croppedPhotoUrl!}
                alt="Attendee Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 right-1 w-4 h-4 bg-[#40B4F5] flex items-center justify-center text-[#15212C]">
                <CheckCircle2 className="w-3 h-3 text-[#15212C]" />
              </div>
            </div>

            {/* File Info */}
            <div className="overflow-hidden space-y-0.5">
              <div className="text-xs font-mono font-bold text-white truncate max-w-[180px] sm:max-w-[220px]">
                {passData.photoFileName || 'profile-photo.jpg'}
              </div>
              <div className="text-[11px] font-mono text-[#8A95A3] flex items-center gap-2">
                <span>
                  {passData.photoFileSize > 0
                    ? `${(passData.photoFileSize / (1024 * 1024)).toFixed(2)} MB`
                    : 'Ready'}
                </span>
                <span className="text-[#40B4F5] text-[10px] font-semibold uppercase">
                  • Verified
                </span>
              </div>
              <div className="text-[10px] text-[#40B4F5] font-mono">
                Ready for Pass Generation
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-[#515963]/40 pt-2 sm:pt-0">
            <button
              type="button"
              onClick={() => setIsCropperOpen(true)}
              className="px-2.5 py-1.5 bg-[#1B222C] border border-[#515963] text-xs font-mono text-white hover:border-[#40B4F5] hover:text-[#40B4F5] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Crop or adjust zoom"
            >
              <Crop className="w-3 h-3 text-[#40B4F5]" />
              <span>Crop / Adjust</span>
            </button>

            <button
              type="button"
              onClick={handleRemovePhoto}
              className="px-2.5 py-1.5 bg-[#1B222C] border border-[#515963] text-xs font-mono text-red-400 hover:border-red-400 hover:bg-red-500/10 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Remove photo"
            >
              <Trash2 className="w-3 h-3" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      )}

      {errors.photo && (
        <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errors.photo}</span>
        </div>
      )}

      {/* Interactive Modal for Cropping / Repositioning */}
      {isCropperOpen && passData.originalPhotoUrl && (
        <PhotoCropperModal
          isOpen={isCropperOpen}
          imageSrc={passData.originalPhotoUrl}
          onClose={() => setIsCropperOpen(false)}
          onCropComplete={(croppedDataUrl) => {
            updatePassData({ croppedPhotoUrl: croppedDataUrl });
            setIsCropperOpen(false);
          }}
        />
      )}
    </div>
  );
};
