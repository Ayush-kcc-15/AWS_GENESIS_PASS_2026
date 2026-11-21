import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { ZoomIn, ZoomOut, RotateCw, Check, X, Crop } from 'lucide-react';
import { Area, getCroppedImg } from '../utils/cropImage';

interface PhotoCropperModalProps {
  isOpen: boolean;
  imageSrc: string;
  onCropComplete: (croppedDataUrl: string) => void;
  onClose: () => void;
}

export const PhotoCropperModal: React.FC<PhotoCropperModalProps> = ({
  isOpen,
  imageSrc,
  onCropComplete,
  onClose,
}) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const onCropChange = (newCrop: { x: number; y: number }) => {
    setCrop(newCrop);
  };

  const onCropCompleteCallback = useCallback(
    (_croppedArea: Area, pixelCrop: Area) => {
      setCroppedAreaPixels(pixelCrop);
    },
    []
  );

  const handleApplyCrop = async () => {
    if (!croppedAreaPixels) return;
    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      onCropComplete(croppedImage);
      onClose();
    } catch (e) {
      console.error('Failed to crop image', e);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl glass-panel bg-genesis-dark/95 border-2 border-genesis-electric/50 shadow-glow-electric-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-genesis-electric/20 bg-genesis-midnight/70">
          <div className="flex items-center gap-2 text-white">
            <Crop className="w-5 h-5 text-genesis-electric" />
            <h3 className="font-bold text-base tracking-wide uppercase">
              Crop & Position Photo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-genesis-muted hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Crop Area Container */}
        <div className="relative w-full h-80 sm:h-96 bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            cropShape="rect"
            showGrid={true}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteCallback}
            onZoomChange={setZoom}
            style={{
              containerStyle: { backgroundColor: '#050a12' },
              cropAreaStyle: {
                border: '2px solid #4ABFFF',
                boxShadow: '0 0 20px rgba(74, 191, 255, 0.5)',
              },
            }}
          />
        </div>

        {/* Controls Toolbar */}
        <div className="p-5 space-y-4 bg-genesis-dark/90 border-t border-genesis-electric/20">
          
          {/* Zoom Slider */}
          <div className="flex items-center gap-4">
            <ZoomOut className="w-4 h-4 text-genesis-muted" />
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.05}
              aria-label="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-1.5 bg-genesis-midnight rounded-lg appearance-none cursor-pointer accent-genesis-electric"
            />
            <ZoomIn className="w-4 h-4 text-genesis-electric" />
            <span className="text-xs font-mono text-genesis-muted w-10 text-right">
              {zoom.toFixed(1)}x
            </span>
          </div>

          {/* Quick Rotate & Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
              className="px-3 py-2 rounded-xl glass-panel text-xs font-mono text-slate-300 hover:text-white hover:border-genesis-electric flex items-center gap-2 transition-all"
            >
              <RotateCw className="w-3.5 h-3.5 text-genesis-cyan" />
              <span>Rotate 90°</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-genesis-muted hover:text-white transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApplyCrop}
                disabled={isProcessing}
                className="glow-btn px-5 py-2 rounded-xl bg-gradient-to-r from-genesis-electric to-genesis-cyan text-genesis-midnight font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-glow-electric disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>{isProcessing ? 'Applying...' : 'Apply Crop'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
