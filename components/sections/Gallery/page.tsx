'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryProps, GalleryItem } from '../../types';

export default function Gallery({ data }: GalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!data || !data.items) return null;

  const currentItem = selectedImageIndex !== null ? data.items[selectedImageIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + data.items.length) % data.items.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % data.items.length);
    }
  };

  return (
    <section className="relative w-full bg-[#fdfaf7] pt-4 sm:pt-5 lg:pt-6 pb-14 sm:pb-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow, Heading & Subtitle matching Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4 sm:mb-5 lg:mb-6"
        >
          {/* Script Eyebrow with horizontal orange lines */}
          {data.script_eyebrow && (
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-1">
              <span className="h-[1px] w-10 sm:w-14 bg-[#ea661c]" />
              <span className="font-script text-xl sm:text-[28px] text-[#ea661c] font-bold select-none leading-none">
                {data.script_eyebrow}
              </span>
              <span className="h-[1px] w-10 sm:w-14 bg-[#ea661c]" />
            </div>
          )}

          {/* Serif Heading matching screenshot */}
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight text-[#1f2937] tracking-tight mt-0.5 mb-1.5">
            <span>{data.title_regular} </span>
            <span className="text-[#ea661c]">{data.title_highlight}</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-[14px] leading-relaxed text-[#685c52] max-w-2xl mx-auto px-2 mt-1 whitespace-pre-line">
            {data.description}
          </p>
        </motion.div>

        {/* Gallery Grid: Row 1 has 2 items, Rows 2-7 have 3 items */}
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
          {data.items.map((item, idx) => {
            const isHero = idx < 2;
            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                onClick={() => setSelectedImageIndex(idx)}
                className={`group relative overflow-hidden rounded-[16px] sm:rounded-[20px] bg-stone-100 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  isHero
                    ? 'sm:col-span-3 h-[240px] sm:h-[300px] lg:h-[350px]'
                    : 'sm:col-span-2 h-[200px] sm:h-[240px] lg:h-[270px]'
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title || 'Dubai Desert Safari'}
                  fill
                  sizes={
                    isHero
                      ? '(max-width: 640px) 100vw, 50vw'
                      : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  }
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-5">
                  <span className="text-white text-xs sm:text-sm font-semibold tracking-wide drop-shadow-md">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Lightbox Modal */}
        <AnimatePresence>
          {currentItem && selectedImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImageIndex(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
                aria-label="Close image preview"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Preview Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl max-h-[85vh] w-full h-[65vh] sm:h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={currentItem.image}
                  alt={currentItem.title}
                  fill
                  priority
                  className="object-contain"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 text-center">
                  <p className="text-white text-sm sm:text-base font-semibold">
                    {currentItem.title}
                  </p>
                  <p className="text-white/60 text-xs mt-0.5">
                    {selectedImageIndex + 1} of {data.items.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
