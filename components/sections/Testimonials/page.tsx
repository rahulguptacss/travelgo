'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TestimonialsProps } from '../../types';
import ScriptEyebrow from '../../ui/ScriptEyebrow';

export default function Testimonials({ data }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const reviews = data.reviews || [];
  const reviewsCount = reviews.length;
  const currentReview = reviews[activeIndex] || reviews[0];

  const autoplayInterval = data.autoplay_interval ?? 5000;
  const prevLabel = data.prev_button_label || 'Previous testimonial';
  const nextLabel = data.next_button_label || 'Next testimonial';

  const handlePrev = useCallback(() => {
    if (reviewsCount === 0) return;
    setActiveIndex((prev) => (prev === 0 ? reviewsCount - 1 : prev - 1));
  }, [reviewsCount]);

  const handleNext = useCallback(() => {
    if (reviewsCount === 0) return;
    setActiveIndex((prev) => (prev === reviewsCount - 1 ? 0 : prev + 1));
  }, [reviewsCount]);

  // Auto-slide effect with pause on hover/touch
  useEffect(() => {
    if (reviewsCount <= 1 || isPaused || autoplayInterval <= 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [reviewsCount, isPaused, autoplayInterval, handleNext, activeIndex]);

  if (!currentReview) return null;

  return (
    <section className="relative w-full bg-gradient-to-b from-[#f9f2e7] via-[#f5ebdc] to-[#efe0cc] py-7 sm:py-9 lg:py-10 overflow-hidden border-b border-[#ddcaa8]/60">
      {/* Ambient Warm Sunset Glow Highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(234,102,28,0.08)_0%,_rgba(217,125,38,0.03)_50%,_transparent_80%)] pointer-events-none" />

      {/* 1. Left Mountain & Pine Trees Background Watermark */}
      <svg
        className="absolute -left-6 sm:left-2 top-10 sm:top-1/2 sm:-translate-y-1/2 w-[200px] sm:w-[260px] h-[180px] text-[#b87532]/25 pointer-events-none select-none"
        viewBox="0 0 340 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 10 240 L 90 90 L 130 150 L 180 60 L 250 170 L 320 240"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 180 60 L 195 95 L 180 85 L 165 95 Z"
          fill="currentColor"
          opacity="0.45"
        />
        <path
          d="M 90 90 L 100 115 L 90 108 L 80 115 Z"
          fill="currentColor"
          opacity="0.45"
        />
        <path
          d="M 25 240 L 25 180 M 15 220 L 25 200 L 35 220 M 17 205 L 25 188 L 33 205 M 20 192 L 25 180 L 30 192"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 45 240 L 45 190 M 36 226 L 45 208 L 54 226 M 38 212 L 45 198 L 52 212"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* 2. Bottom-Left Pine Trees Watermark (as visible in mobile screenshot) */}
      <svg
        className="absolute -left-4 bottom-0 w-[140px] sm:w-[180px] h-[140px] text-[#b87532]/25 pointer-events-none select-none"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 30 200 L 30 140 M 20 180 L 30 160 L 40 180 M 22 165 L 30 150 L 38 165 M 25 152 L 30 140 L 35 152"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 55 200 L 55 125 M 42 175 L 55 150 L 68 175 M 45 155 L 55 138 L 65 155 M 48 140 L 55 125 L 62 140"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 80 200 L 80 150 M 72 185 L 80 170 L 88 185 M 74 172 L 80 160 L 86 172"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>

      {/* 3. Right Flight Trail & Map Pin Background Watermark */}
      <svg
        className="absolute -right-6 sm:right-6 top-3 sm:top-5 w-[190px] sm:w-[220px] h-[120px] text-[#b87532]/32 pointer-events-none select-none overflow-visible"
        viewBox="0 0 280 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 10 140 C 60 120, 100 40, 200 45 C 235 47, 255 70, 265 30"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <g transform="translate(60, 65) rotate(-28) scale(0.9)">
          <path
            d="M 12 11 L 2 14.5 L 2 13 L 12 7 L 12 1 C 12 0.45 12.45 0 13 0 C 13.55 0 14 0.45 14 1 L 14 7 L 24 13 L 24 14.5 L 14 11 L 14 17 L 17 19 L 17 20.5 L 13 19.5 L 9 20.5 L 9 19 L 12 17 Z"
            fill="currentColor"
            opacity="0.8"
          />
        </g>
        <g transform="translate(258, 18) scale(0.75)">
          <path
            d="M12 0C6.48 0 2 4.48 2 10C2 17.5 12 25 12 25C12 25 22 17.5 22 10C22 4.48 17.52 0 12 0ZM12 13.5C10.07 13.5 8.5 11.93 8.5 10C8.5 8.07 10.07 6.5 12 6.5C13.93 6.5 15.5 8.07 15.5 10C15.5 11.93 13.93 13.5 12 13.5Z"
            fill="currentColor"
            opacity="0.8"
          />
        </g>
      </svg>

      {/* 4. Bottom-Right Desert Ridge Watermark (as visible in mobile screenshot) */}
      <svg
        className="absolute -right-8 bottom-0 w-[180px] sm:w-[240px] h-[150px] text-[#b87532]/20 pointer-events-none select-none"
        viewBox="0 0 240 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 150 C 60 120, 140 140, 240 80"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 30 150 C 90 100, 170 125, 240 60"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching screenshot - Client Feedback + What Our Travelers Say */}
        <div className="text-center mb-4 sm:mb-5">
          {/* Eyebrow: Client Feedback with airplane, flight loop and map pin */}
          <ScriptEyebrow
            text={data.script_eyebrow}
            variant="flight"
            align="center"
            className="!mb-1 sm:!mb-1.5"
          />

          {/* Heading with 2-line break on mobile ("What Our" / "Travelers Say") */}
          <h2 className="font-serif text-3xl sm:text-[32px] lg:text-[34px] font-bold leading-[1.16] mt-0 mb-1">
            <span className="text-[#30170a] block sm:inline">{data.title_regular} </span>
            <span className="text-[#d97d26]">{data.title_highlight}</span>
          </h2>

          {/* Mountain Divider with Snow Peaks */}
          <div className="flex items-center justify-center gap-2.5 w-full my-2">
            <span className="h-[1.5px] w-12 sm:w-16 bg-[#8a684b]/70" />
            <svg
              width="32"
              height="15"
              viewBox="0 0 34 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="select-none"
            >
              <path d="M 0 16 L 8 5 L 12 10 L 18 0 L 24 8 L 27 5 L 34 16 Z" fill="#361a0c" />
              <path d="M 18 0 L 20 4 L 18.5 3.5 L 17 4.5 L 16 3.5 Z" fill="#ffffff" />
              <path d="M 8 5 L 9.5 8 L 8.5 7.5 L 7 8 L 6.5 7 Z" fill="#ffffff" />
              <path d="M 27 5 L 28.5 8 L 27.5 7.5 L 26.5 8 Z" fill="#ffffff" />
            </svg>
            <span className="h-[1.5px] w-12 sm:w-16 bg-[#8a684b]/70" />
          </div>

          {/* Subtitle */}
          <p className="text-[13px] sm:text-[13.5px] text-[#5c534c] max-w-xs sm:max-w-md mx-auto leading-normal">
            {data.subtitle}
          </p>
        </div>

        {/* Testimonial Interactive Container with Pause Handlers */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="relative max-w-5xl mx-auto"
        >
          {/* ============================================================== */}
          {/* MOBILE VIEW (< lg): Matches screenshot media_1793090558666.png */}
          {/* ============================================================== */}
          <div className="lg:hidden flex flex-col items-center">
            {/* 1. Large Avatar flanked by Left and Right Arrow Buttons */}
            <div className="relative w-full max-w-sm flex items-center justify-between px-2 sm:px-4 my-2">
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label={prevLabel}
                className="h-11 w-11 rounded-full bg-white shadow-md border border-neutral-100 text-neutral-800 flex items-center justify-center hover:text-[#d97d26] active:scale-95 transition-all duration-200 z-10 shrink-0"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Center: Large Avatar with Artistic Painted Golden Ring & Quote Badge */}
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center shrink-0">
                {/* Artistic Golden Brush Stroke Ring SVG */}
                <svg
                  viewBox="0 0 240 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -inset-3.5 w-[calc(100%+28px)] h-[calc(100%+28px)] pointer-events-none select-none text-[#d97d26]"
                >
                  <path
                    d="M 120 12 C 180 12, 228 60, 228 120 C 228 180, 180 228, 120 228 C 60 228, 12 180, 12 120 C 12 60, 60 12, 118 12"
                    stroke="currentColor"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    strokeDasharray="280 20 160 15"
                  />
                  <path
                    d="M 124 16 C 182 16, 224 62, 224 120 C 224 178, 182 224, 124 224 C 66 224, 16 178, 16 120 C 16 64, 64 16, 120 16"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="180 35 120 25"
                    opacity="0.75"
                    transform="rotate(25 120 120)"
                  />
                  <path
                    d="M 116 8 C 176 8, 232 58, 232 120 C 232 182, 176 232, 116 232 C 56 232, 8 182, 8 120 C 8 62, 58 8, 114 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="90 30 140 20 70 25"
                    opacity="0.5"
                    transform="rotate(-50 120 120)"
                  />
                </svg>

                {/* Avatar Photo with smooth fade transition */}
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-inner">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentReview.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={currentReview.avatar}
                        alt={currentReview.name}
                        fill
                        sizes="200px"
                        className="object-cover object-center"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Orange Circular Quote Badge on bottom-right */}
                <div className="absolute bottom-2 right-2 w-11 h-11 rounded-full bg-[#ea661c] text-white flex items-center justify-center shadow-md border-2 border-white z-10">
                  <span className="font-serif text-2xl font-bold leading-none select-none translate-y-0.5">
                    “
                  </span>
                </div>
              </div>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label={nextLabel}
                className="h-11 w-11 rounded-full bg-white shadow-md border border-neutral-100 text-neutral-800 flex items-center justify-center hover:text-[#d97d26] active:scale-95 transition-all duration-200 z-10 shrink-0"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* 2. Review Quote & Author Details */}
            <div className="w-full max-w-sm sm:max-w-md px-3 flex flex-col items-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Large Stylized Golden Quote Mark (left-aligned) */}
                  <div className="w-full text-left pl-2">
                    <span className="font-serif text-4xl text-[#ea661c] leading-none select-none font-bold inline-block">
                      “
                    </span>
                  </div>

                  {/* Review Quote Text */}
                  <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#3d342d] font-normal mb-3 text-center px-1">
                    {currentReview.quote}
                  </p>

                  {/* Author Name */}
                  <h4 className="font-bold text-[14px] sm:text-[15px] tracking-wide text-[#2b1408] uppercase text-center">
                    {currentReview.name}
                  </h4>

                  {/* Author Role */}
                  <p className="text-xs text-[#7d736a] mt-0.5 mb-2 font-normal text-center">
                    {currentReview.role}
                  </p>

                  {/* Solid Golden Stars based on rating */}
                  <div className="flex items-center justify-center gap-1.5 text-[#ea661c] mb-4">
                    {[...Array(Math.max(1, Math.min(5, Math.round(currentReview.rating || 5))))].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 3. Bottom Avatar Selector Horizontal Capsule Pill */}
            {reviews.length > 1 && (
              <div className="w-full flex justify-center mt-1">
                <div className="inline-flex items-center justify-center py-2 px-3 sm:px-4 bg-white/95 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#eadbce] gap-2.5 sm:gap-3">
                  {reviews.map((rev, index) => {
                    const isSelected = index === activeIndex;
                    return (
                      <button
                        key={rev.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Select review by ${rev.name}`}
                        className={`relative h-10 w-10 sm:h-11 sm:w-11 rounded-full transition-all duration-300 p-0.5 flex items-center justify-center ${
                          isSelected
                            ? 'ring-2 ring-[#ea661c] ring-offset-1 scale-105'
                            : 'opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        <div className="relative h-full w-full rounded-full overflow-hidden">
                          <Image
                            src={rev.avatar}
                            alt={rev.name}
                            fill
                            sizes="44px"
                            className="object-cover object-center"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ================================================================ */}
          {/* DESKTOP VIEW (>= lg): Matches screenshot media_1793085183398.png */}
          {/* ================================================================ */}
          <div className="hidden lg:flex items-center justify-between gap-5 lg:gap-7">
            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label={prevLabel}
              className="shrink-0 h-10 w-10 rounded-full bg-white shadow-md border border-neutral-100 text-neutral-800 flex items-center justify-center hover:text-[#d97d26] hover:scale-105 active:scale-95 transition-all duration-200 z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Center Showcase Card */}
            <div className="flex-1 flex items-center gap-7 lg:gap-9 py-1">
              {/* Left: Featured Large Avatar with Artistic Painted Golden Ring & Quote Bubble */}
              <div className="shrink-0 flex justify-center">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  {/* Artistic Golden Brush Stroke Ring SVG */}
                  <svg
                    viewBox="0 0 240 240"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] pointer-events-none select-none text-[#d97d26]"
                  >
                    <path
                      d="M 120 12 C 180 12, 228 60, 228 120 C 228 180, 180 228, 120 228 C 60 228, 12 180, 12 120 C 12 60, 60 12, 118 12"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="280 20 160 15"
                    />
                    <path
                      d="M 124 16 C 182 16, 224 62, 224 120 C 224 178, 182 224, 124 224 C 66 224, 16 178, 16 120 C 16 64, 64 16, 120 16"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="180 35 120 25"
                      opacity="0.75"
                      transform="rotate(25 120 120)"
                    />
                    <path
                      d="M 116 8 C 176 8, 232 58, 232 120 C 232 182, 176 232, 116 232 C 56 232, 8 182, 8 120 C 8 62, 58 8, 114 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="90 30 140 20 70 25"
                      opacity="0.5"
                      transform="rotate(-50 120 120)"
                    />
                  </svg>

                  {/* Avatar Photo with smooth fade transition */}
                  <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-inner">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentReview.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={currentReview.avatar}
                          alt={currentReview.name}
                          fill
                          sizes="160px"
                          className="object-cover object-center"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Orange Circular Quote Badge on bottom-right */}
                  <div className="absolute bottom-1.5 right-1.5 w-10 h-10 rounded-full bg-[#d97d26] text-white flex items-center justify-center shadow-md border-2 border-white z-10">
                    <span className="font-serif text-xl font-bold leading-none select-none translate-y-0.5">
                      “
                    </span>
                  </div>
                </div>
              </div>

              {/* Subtle Vertical Divider Line */}
              <div className="w-px self-stretch bg-[#e2d8cf] my-1" />

              {/* Middle: Review Quote, Author Info & Star Rating */}
              <div className="flex-1 flex flex-col justify-center text-left pl-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentReview.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Large Stylized Golden Quote Mark */}
                    <span className="block font-serif text-4xl text-[#d97d26] leading-none select-none font-bold mb-1">
                      “
                    </span>

                    {/* Review Quote Text */}
                    <p className="text-[14px] leading-relaxed text-[#3d342d] font-normal mb-2.5 max-w-xl">
                      {currentReview.quote}
                    </p>

                    {/* Author Name, Role and Star Rating */}
                    <div>
                      <h4 className="font-bold text-[13.5px] tracking-wide text-[#2b1408] uppercase">
                        {currentReview.name}
                      </h4>
                      <p className="text-xs text-[#7d736a] mt-0.5 mb-1.5 font-normal">
                        {currentReview.role}
                      </p>

                      {/* Solid Golden Stars */}
                      <div className="flex items-center gap-1 text-[#d97d26]">
                        {[...Array(Math.max(1, Math.min(5, Math.round(currentReview.rating || 5))))].map((_, i) => (
                          <svg
                            key={i}
                            className="w-3.5 h-3.5 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right: Vertical Avatar Selector Pill */}
              {reviews.length > 1 && (
                <div className="flex flex-col items-center justify-center py-2.5 px-1.5 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-neutral-100/90 gap-2 shrink-0">
                  {reviews.map((rev, index) => {
                    const isSelected = index === activeIndex;
                    return (
                      <button
                        key={rev.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Select review by ${rev.name}`}
                        className={`relative h-9 w-9 rounded-full transition-all duration-300 p-0.5 flex items-center justify-center ${
                          isSelected
                            ? 'ring-2 ring-[#d97d26] scale-105'
                            : 'opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        <div className="relative h-full w-full rounded-full overflow-hidden">
                          <Image
                            src={rev.avatar}
                            alt={rev.name}
                            fill
                            sizes="36px"
                            className="object-cover object-center"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Arrow Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label={nextLabel}
              className="shrink-0 h-10 w-10 rounded-full bg-white shadow-md border border-neutral-100 text-neutral-800 flex items-center justify-center hover:text-[#d97d26] hover:scale-105 active:scale-95 transition-all duration-200 z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
