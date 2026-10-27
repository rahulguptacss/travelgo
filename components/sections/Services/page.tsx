'use client';

import Image from 'next/image';
import type { ServicesProps } from '../../types';

function renderServiceIcon(icon: string) {
  switch (icon) {
    case 'car':
      return (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
          <circle cx="8.8" cy="9.2" r="1.1" />
          <circle cx="15.2" cy="9.2" r="1.1" />
        </svg>
      );
    case 'building':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 21h18v-2H3v2zm3-4h3V5H6v12zm5 0h4V3h-4v14zm5 0h4v-8h-4v8zM7 7h1v2H7V7zm0 4h1v2H7v-2zm5-6h2v2h-2V5zm0 4h2v2h-2V9zm0 4h2v2h-2v-2zm5 0h2v2h-2v-2z" />
        </svg>
      );
    case 'ship':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 16H20.05l-1.3-4.57c-.18-.62-.75-1.05-1.4-1.05h-3.35V7.5c0-.83-.67-1.5-1.5-1.5h-1c-.83 0-1.5.67-1.5 1.5V10.38H7.65c-.65 0-1.22.43-1.4 1.05L4.95 16z" />
        </svg>
      );
    case 'ticket':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-9 7.5h-2v-2h2v2zm0-4.5h-2v-2h2v2zm0-4.5h-2v-2h2v2z" />
        </svg>
      );
    case 'hotel':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 7h-8v6h8V7zm-2 4h-4V9h4v2zM7 13h2V9H7v4zm12-9H5c-1.1 0-2 .9-2 2v14h2v-2h14v2h2V6c0-1.1-.9-2-2-2zm0 12H5V6h14v10z" />
        </svg>
      );
    case 'van':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
          <circle cx="7" cy="8.8" r="1" />
          <circle cx="12" cy="8.8" r="1" />
          <circle cx="17" cy="8.8" r="1" />
        </svg>
      );
    case 'camel':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.5 5.5c-.3-.3-.8-.4-1.2-.2l-2.3 1.1-1.3-2.6c-.3-.6-.9-1-1.6-1-.8 0-1.5.5-1.8 1.2L12 8.5l-1.3-1.8C10.3 6.1 9.6 5.8 9 5.8c-.8 0-1.5.5-1.8 1.2L5.8 10H4c-.6 0-1 .4-1 1s.4 1 1 1h1.5l.7 2.1c.1.3.1.6.1.9v5c0 .6.4 1 1 1s1-.4 1-1v-4.5l1.5-3 1.5 7.5c.1.6.6 1 1.2 1s1.1-.4 1.2-1l1.5-7.5 1.5 3V20c0 .6.4 1 1 1s1-.4 1-1v-5.2c0-.3 0-.6.1-.9l.7-2.1H21c.6 0 1-.4 1-1 0-.3-.1-.6-.3-.8l-.2-.5z" />
        </svg>
      );
    case 'map':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <path d="M8.5 18h5a4 4 0 0 0 4-4v-1.5a4 4 0 0 0-4-4h-3" />
          <path d="M12.5 11l-2-2.5 2-2.5" />
        </svg>
      );
    case 'landmark':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C10.5 3.5 9 6.5 9 8h6c0-1.5-1.5-4.5-3-6zm-7 8v11h2V10H5zm12 0v11h2V10h-2zm-7 11h4v-7h-4v7zm-2 0h1v-9H8v9zm8 0h1v-9h-1v9zM2 21h20v2H2z" />
        </svg>
      );
    default:
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

export default function Services({ data }: ServicesProps) {
  if (!data || !data.items) return null;

  return (
    <section id="services" className="relative w-full bg-[#faf6f0]/50 pt-5 sm:pt-6 lg:pt-8 pb-10 sm:pb-12 lg:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Title */}
        <div className="text-center mb-4 sm:mb-5 lg:mb-6">
          {/* Script Eyebrow with horizontal lines */}
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="h-[1px] w-10 sm:w-14 bg-[#ea661c]" />
            <span className="font-script text-xl sm:text-[26px] text-[#ea661c] font-bold select-none leading-none">
              {data.script_eyebrow || 'What We Offer'}
            </span>
            <span className="h-[1px] w-10 sm:w-14 bg-[#ea661c]" />
          </div>

          {/* Serif Heading matching screenshot */}
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight text-[#1f2937] tracking-tight mt-0.5 mb-1.5">
            <span>{data.title_regular || 'Our Travel'} </span>
            <span className="text-[#ea661c]">{data.title_highlight || 'Services'}</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#685c52] max-w-2xl mx-auto mt-1 px-2">
            {data.description ||
              'From desert safaris to city tours, we offer a wide range of travel experiences across UAE to make your trip truly unforgettable.'}
          </p>
        </div>

        {/* 9 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[22px] border border-[#f0eae2] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(234,102,28,0.09)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col group"
            >
              {/* Top Image */}
              <div className="relative w-full h-[215px] sm:h-[235px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.image_alt || item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Centered Circle Badge - sitting unclipped across image/card seam */}
              <div className="relative flex justify-center -mt-9 sm:-mt-10 z-10">
                <div className="w-[72px] h-[72px] sm:w-[78px] sm:h-[78px] rounded-full bg-gradient-to-b from-[#fedec5] via-[#fed4b5] to-[#fcc096] border-[4.5px] border-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#24130a] group-hover:scale-105 transition-transform duration-300">
                  {renderServiceIcon(item.icon)}
                </div>
              </div>

              {/* Card Content without Read More button */}
              <div className="pt-3.5 pb-8 sm:pb-9 px-6 sm:px-7 flex flex-col items-center text-center flex-1">
                <h3 className="font-heading font-bold text-lg sm:text-[20px] text-[#1a1a1a] leading-tight mb-2.5 group-hover:text-[#ea661c] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[13.5px] sm:text-[14px] text-[#555555] leading-relaxed max-w-[280px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
