'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbProps } from '../../types';

export default function Breadcrumb({
  data,
  currentPage,
  watermark,
  variant = 'standard',
  splitImage,
}: BreadcrumbProps) {
  if (variant === 'split') {
    return (
      <section className="relative w-full overflow-hidden bg-[#faf5ee] border-b border-[#ebdcca]/70">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[180px] sm:min-h-[210px] lg:min-h-[230px] items-stretch">
          {/* Left Column: Tilted Contact Us Title & Pill */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col items-center justify-center py-6 px-4 sm:py-8 sm:px-8 text-center select-none bg-[#faf5ee]">
            <div className="transform -rotate-[12deg] flex flex-col items-center">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-black text-[#26150b] tracking-tight leading-none mb-2.5 sm:mb-3 whitespace-nowrap">
                {currentPage}
              </h1>
              <div className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#24130a] text-white text-xs sm:text-[12.5px] font-medium shadow-md">
                <Link href="/" className="text-white/80 hover:text-[#ea661c] transition-colors">
                  Home
                </Link>
                <span className="text-[#ea661c] font-bold">›</span>
                <span className="text-white font-semibold">{currentPage}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Friends in Desert Image */}
          <div className="md:col-span-7 lg:col-span-7 relative w-full h-[180px] sm:h-[210px] md:h-auto min-h-[180px] sm:min-h-[210px] lg:min-h-[230px] overflow-hidden">
            <Image
              src={splitImage || data.split_image || '/about/about-hero.webp'}
              alt={data.background_alt || 'Dubai Desert Safari Adventure'}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-center"
            />
            {/* Subtle warm gradient blend on left edge */}
            <div className="hidden md:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#faf5ee] to-transparent pointer-events-none" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[180px] sm:h-[220px] lg:h-[240px] flex items-center justify-center overflow-hidden bg-[#20130a]">
      {/* Background Image with warm desert overlay */}
      <div className="absolute inset-0">
        <Image
          src={data.background_image}
          alt={data.background_alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#20130a] via-black/40 to-black/60" />
      </div>

      {/* Watermark */}
      {watermark && (
        <span className="absolute inset-0 flex items-center justify-center font-heading font-black text-6xl sm:text-7xl md:text-8xl text-white/5 pointer-events-none select-none uppercase tracking-widest">
          {watermark}
        </span>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="font-heading text-2xl sm:text-4xl lg:text-[42px] font-bold text-white mb-2">
          {currentPage}
        </h1>
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#ddd0c5]">
          <Link href="/" className="hover:text-[#f58220] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#f58220]" />
          <span className="text-[#f58220] font-medium">{currentPage}</span>
        </div>
      </div>
    </section>
  );
}
