import React from 'react';
import type { ScriptEyebrowProps } from '../types';

export default function ScriptEyebrow({
  text,
  variant = 'flight',
  align = 'center',
  className = '',
}: ScriptEyebrowProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`flex items-center gap-2 sm:gap-2.5 mb-2.5 ${
        isCenter ? 'justify-center text-center' : 'justify-start'
      } ${className}`}
    >
      {variant === 'lines' && (
        <span className="hidden sm:inline-block h-px w-10 sm:w-16 bg-[#c7792e]/60" />
      )}

      <span className="font-script text-3xl sm:text-4xl text-[#d97d26] font-bold tracking-wide select-none leading-none">
        {text}
      </span>

      {variant === 'flight' && (
        <div className="inline-flex items-center select-none ml-1">
          <svg
            width="95"
            height="32"
            viewBox="0 0 95 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* Airplane */}
            <path
              d="M 12 11 L 2 14.5 L 2 13 L 12 7 L 12 1 C 12 0.45 12.45 0 13 0 C 13.55 0 14 0.45 14 1 L 14 7 L 24 13 L 24 14.5 L 14 11 L 14 17 L 17 19 L 17 20.5 L 13 19.5 L 9 20.5 L 9 19 L 12 17 Z"
              fill="#d97d26"
              transform="translate(6, -1) rotate(22 13 10)"
            />
            {/* Looping dashed flight path */}
            <path
              d="M 28 13 C 36 10, 44 9, 50 13 C 57 17, 60 25, 53 27 C 46 29, 44 19, 55 14 C 64 10, 75 14, 84 18"
              stroke="#8c6b4b"
              strokeWidth="1.4"
              strokeDasharray="2.5 3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Dark brown map pin */}
            <g transform="translate(82, 3) scale(0.55)">
              <path
                d="M12 0C6.48 0 2 4.48 2 10C2 17.5 12 25 12 25C12 25 22 17.5 22 10C22 4.48 17.52 0 12 0ZM12 13.5C10.07 13.5 8.5 11.93 8.5 10C8.5 8.07 10.07 6.5 12 6.5C13.93 6.5 15.5 8.07 15.5 10C15.5 11.93 13.93 13.5 12 13.5Z"
                fill="#361a0c"
              />
            </g>
          </svg>
        </div>
      )}

      {variant === 'lines' && (
        <span className="hidden sm:inline-block h-px w-10 sm:w-16 bg-[#c7792e]/60" />
      )}
    </div>
  );
}
