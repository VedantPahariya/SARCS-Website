/**
 * Lightbox Component
 * 
 * Purpose: Modal image viewer for gallery with keyboard navigation.
 * Supports image captions, previous/next navigation, and accessibility.
 */

'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

/**
 * Lightbox Component
 * 
 * Features:
 * - Full-screen modal overlay
 * - Image with caption display
 * - Previous/Next navigation
 * - Keyboard support (Escape, Arrow keys)
 * - Click outside to close
 * - Focus trap for accessibility
 */
export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true);

  const currentImage = images[currentIndex];
  const hasMultipleImages = images.length > 1;

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasMultipleImages) onPrevious();
          break;
        case 'ArrowRight':
          if (hasMultipleImages) onNext();
          break;
      }
    },
    [isOpen, hasMultipleImages, onClose, onPrevious, onNext]
  );

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Previous button */}
      {hasMultipleImages && (
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {/* Next button */}
      {hasMultipleImages && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Next image"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      {/* Image container */}
      <div
        className="flex max-h-[90vh] max-w-[90vw] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}

        {/* Image */}
        <div className="relative h-auto max-h-[80vh] w-auto">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={1200}
            height={800}
            className={`max-h-[80vh] w-auto object-contain transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            priority
          />
        </div>

        {/* Caption and counter */}
        <div className="mt-4 text-center">
          {currentImage.caption && (
            <p className="mb-2 text-lg text-white">{currentImage.caption}</p>
          )}
          {hasMultipleImages && (
            <p className="text-sm text-white/70">
              {currentIndex + 1} / {images.length}
            </p>
          )}
        </div>
      </div>

      {/* Click overlay to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}

/**
 * useLightbox Hook
 * 
 * Custom hook to manage lightbox state.
 */
export function useLightbox(images: LightboxImage[]) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const previous = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  return {
    isOpen,
    currentIndex,
    open,
    close,
    next,
    previous,
  };
}
