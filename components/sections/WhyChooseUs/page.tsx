'use client';

import Image from 'next/image';
import type { WhyChooseUsProps } from '../../types';

function renderFeatureIcon(iconName: string) {
  switch (iconName) {
    case 'shield':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2b1408" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'award':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2b1408" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="9" r="6" />
          <path d="M10.5 8.5l1 1 2-2" />
          <path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.11" />
        </svg>
      );
    case 'users':
      return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" className="text-[#2b1408]">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          <path d="M19 11c1.66 0 3-1.34 3-3s-1.34-3-3-3c-.33 0-.64.06-.93.16C18.66 5.86 19 6.88 19 8c0 1.12-.34 2.14-.93 2.84.29.1.6.16.93.16zm1.5 3c-.83 0-1.5.67-1.5 1.5V18h4v-1.5c0-1.33-1.67-2.5-2.5-2.5z" opacity="0.8" />
          <path d="M5 11c-1.66 0-3-1.34-3-3s1.34-3 3-3c.33 0 .64.06.93.16C5.34 5.86 5 6.88 5 8c0 1.12.34 2.14.93 2.84-.29.1-.6.16-.93.16zM3.5 14c.83 0 1.5.67 1.5 1.5V18H1v-1.5C1 15.17 2.67 14 3.5 14z" opacity="0.8" />
        </svg>
      );
    case 'map-pin':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#2b1408]">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      );
    case 'headphones':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2b1408" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
          <path d="M18 19v2a2 2 0 0 1-2 2h-3" />
        </svg>
      );
    case 'palm-tree':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#2b1408]">
          <path d="M13 19.5c0-4.5-1.5-8-3-10 2.5 0 5-1.5 6-3.5-2.5.5-5-.5-6.5-2.5-.5 2.5-2.5 4.5-5 4.5 2 .5 3.5 2.5 3.5 4.5-1.5-.5-3.5 0-4.5 1.5 2 0 4 .5 5 2 .5 1.5.5 3.5.5 3.5h3.5z" />
          <path d="M3 21c3-1 6-1 9-1s6 0 9 1H3z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function WhyChooseUs({ data }: WhyChooseUsProps) {
  return (
    <section id="why-choose-us" className="relative w-full bg-white py-5 sm:py-6 lg:py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 xl:gap-10 items-center">
          {/* Photo Collage: Appears below content on mobile (order-2), on left on desktop (lg:order-1) */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col gap-2 sm:gap-2.5">
            {/* Top Large Photo: Off-road Buggy */}
            <div className="relative w-full aspect-[16/7.5] max-h-[160px] sm:max-h-[185px] lg:max-h-[205px] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_4px_14px_rgba(43,20,8,0.08)] bg-stone-100 group">
              <Image
                src={data.image_top}
                alt={data.image_top_alt}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Bottom 2 Photos Side-by-Side: Camp & Camels */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              <div className="relative w-full aspect-[16/9.5] max-h-[110px] sm:max-h-[125px] lg:max-h-[135px] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_4px_14px_rgba(43,20,8,0.08)] bg-stone-100 group">
                <Image
                  src={data.image_bottom_left}
                  alt={data.image_bottom_left_alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 300px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              <div className="relative w-full aspect-[16/9.5] max-h-[110px] sm:max-h-[125px] lg:max-h-[135px] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_4px_14px_rgba(43,20,8,0.08)] bg-stone-100 group">
                <Image
                  src={data.image_bottom_right}
                  alt={data.image_bottom_right_alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 300px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </div>

          {/* Header & Features: Appears first on mobile (order-1), on right on desktop (lg:order-2) */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col items-center text-center">
            {/* Script Eyebrow with horizontal accent lines */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-1">
              <span className="h-[1.5px] w-8 sm:w-12 bg-[#ea661c]/80" />
              <span className="font-script text-xl sm:text-[25px] text-[#ea661c] font-bold select-none leading-none">
                {data.script_eyebrow}
              </span>
              <span className="h-[1.5px] w-8 sm:w-12 bg-[#ea661c]/80" />
            </div>

            {/* Serif Heading matching screenshot */}
            <h2 className="font-serif text-2xl sm:text-[28px] lg:text-[32px] font-bold leading-[1.16] text-[#2b1408] mt-0 mb-1.5">
              <span>{data.title_line1} </span>
              <span className="block mt-0.5">
                {data.title_line2_prefix}
                <span className="text-[#ea661c]">{data.title_line2_highlight}</span>
              </span>
            </h2>

            {/* Subtitle Description */}
            <p className="text-[12px] sm:text-[12.5px] text-[#5c534c] leading-relaxed max-w-lg mx-auto font-normal mb-3.5 sm:mb-4">
              {data.description}
            </p>

            {/* 6 Features in 2 Columns with compact row gap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-2.5 sm:gap-y-3 w-full text-left">
              {data.items.map((item) => (
                <div key={item.id} className="flex items-center gap-2.5 group">
                  {/* Circular Warm Peach Badge with Dark Brown Icon */}
                  <div className="shrink-0 w-9 h-9 rounded-full bg-[#fce5cf] flex items-center justify-center shadow-2xs group-hover:scale-105 group-hover:bg-[#fbd3b0] transition-all duration-300">
                    {renderFeatureIcon(item.icon)}
                  </div>

                  {/* Feature Text */}
                  <div className="flex-1">
                    <h3 className="font-bold text-[12.5px] sm:text-[13px] text-[#2b1408] leading-tight mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[10.5px] sm:text-[11px] text-[#6b5d52] leading-tight font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
