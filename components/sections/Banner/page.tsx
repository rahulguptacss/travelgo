'use client';

import Image from 'next/image';
import type { BannerProps } from '../../types';

export default function Banner({ data }: BannerProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#1c0f07]">
      <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] min-h-[200px] sm:min-h-[280px] max-h-[380px]">
        <Image
          src={data.image}
          alt={data.image_alt}
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        {/* Subtle cinematic gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </div>
    </section>
  );
}
