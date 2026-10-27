'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { PackagesProps, PackageItem } from '../../types';

export default function Packages({ data, showAll = true }: PackagesProps) {
  return (
    <section
      id="packages"
      className="relative w-full bg-gradient-to-b from-[#faf2e6] via-[#f6ebdc] to-[#f0dfcc] py-10 sm:py-16 lg:py-24 border-y border-[#e8d5bf]/60"
    >
      {/* Decorative Desert Sand Contour Lines */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-35">
        <svg
          className="absolute -left-10 bottom-0 w-[350px] sm:w-[550px] h-[160px] sm:h-[240px] text-[#cca885]"
          viewBox="0 0 550 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 200 C 140 160, 260 220, 390 170 C 460 140, 510 160, 550 130"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path
            d="M 0 230 C 160 190, 300 235, 430 190 C 490 170, 520 180, 550 160"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading and Description (Sticky while right cards scroll) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start flex flex-col items-center text-center max-w-md mx-auto lg:max-w-none">
            {/* Script Eyebrow with horizontal lines */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-2 sm:mb-2.5">
              <span className="h-[1px] w-8 sm:w-14 bg-[#ea661c]" />
              <span className="font-script text-xl sm:text-[28px] text-[#ea661c] font-bold select-none leading-none">
                {data.script_eyebrow}
              </span>
              <span className="h-[1px] w-8 sm:w-14 bg-[#ea661c]" />
            </div>

            {/* Serif Heading matching screenshot */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[42px] font-bold leading-[1.2] lg:leading-[1.16] mt-1 mb-2.5 sm:mb-3 text-center">
              <span className="text-[#2b1408]">{data.title_regular_prefix} </span>
              <span className="text-[#ea661c]">{data.title_highlight}</span>
              <span className="text-[#2b1408] block mt-0.5">{data.title_regular_suffix}</span>
            </h2>

            {/* Desert Palm, Dunes & Sun Motif Divider */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 w-full my-2.5 sm:my-3.5">
              <span className="h-[1px] w-8 sm:w-12 lg:w-16 bg-[#8a684b]/60" />
              <div className="text-[#2b1408] select-none scale-90 sm:scale-100">
                <svg
                  width="46"
                  height="26"
                  viewBox="0 0 46 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Palm Tree trunk and curved leaves */}
                  <path
                    d="M 13 24 C 13 18, 12 12, 9 8 M 9 8 C 5 6, 2 7, 0 10 M 9 8 C 6 5, 2 4, 0 4 M 9 8 C 7 3, 7 0, 7 0 M 9 8 C 10 3, 12 1, 15 0 M 9 8 C 12 4, 15 4, 18 7 M 9 8 C 13 8, 16 11, 18 14"
                    stroke="#2b1408"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  {/* Dunes */}
                  <path
                    d="M 0 24 C 6 22, 11 19, 17 19 C 23 19, 27 23, 33 20 C 38 18, 42 20, 46 24 L 46 26 L 0 26 Z"
                    fill="#2b1408"
                  />
                  {/* Sun / Moon */}
                  <circle cx="32" cy="8.5" r="3.2" fill="#2b1408" />
                </svg>
              </div>
              <span className="h-[1px] w-8 sm:w-12 lg:w-16 bg-[#8a684b]/60" />
            </div>

            {/* Description Paragraph */}
            <p className="text-[13px] sm:text-[14.5px] leading-relaxed text-[#5c534c] font-normal max-w-[420px] text-center px-1">
              {data.description}
            </p>
          </div>

          {/* Right Column: 2-Column Grid of Compact Package Cards (Scrolls past sticky sidebar) */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end w-full">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:gap-4.5 max-w-[590px] xl:max-w-[620px] w-full">
              {data.items.map((pkg: PackageItem) => (
                <div
                  key={pkg.id}
                  className="package-card group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#eae2da]/85 shadow-[0_2px_8px_rgba(0,0,0,0.04)] sm:shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between"
                >
                  {/* Card Image - Compact Aspect Ratio */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-stone-100">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      sizes="(max-width: 640px) 180px, 300px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Card Body - Tight and Compact */}
                  <div className="p-2 sm:p-3 sm:px-3.5 sm:pt-3 sm:pb-3.5 flex flex-col items-center text-center flex-1 justify-between gap-1.5 sm:gap-2">
                    <div className="w-full">
                      {/* Package Title */}
                      <h3 className="font-bold text-[11.5px] sm:text-[13.5px] lg:text-[14px] text-[#1a120c] leading-tight line-clamp-2 min-h-[28px] sm:min-h-[34px] flex items-center justify-center">
                        {pkg.title}
                      </h3>

                      {/* Package Price and Unit */}
                      <div className="my-1 sm:my-1.5 flex items-center justify-center gap-0.5 sm:gap-1 text-[11px] sm:text-[12.5px] lg:text-[13px] font-bold text-[#ff5a00] flex-wrap leading-tight">
                        <span>{pkg.price}</span>
                        {pkg.price_unit && (
                          <span className="font-normal text-[#ff7830] text-[9.5px] sm:text-[11px] lg:text-[11.5px]">
                            {pkg.price_unit}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Compact Booking Now Pill Button */}
                    <Link
                      href={pkg.button_link}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-2 sm:px-5 py-1.5 rounded-full bg-[#ff5a00] hover:bg-[#e04e00] hover:shadow-md active:scale-95 text-white text-[10.5px] sm:text-[12px] font-semibold tracking-tight sm:tracking-wide shadow-none transition-all duration-200"
                    >
                      {pkg.button_text}
                    </Link>
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
