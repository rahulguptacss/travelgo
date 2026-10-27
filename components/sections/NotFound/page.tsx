'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Compass, ArrowRight } from 'lucide-react';
import type { NotFoundProps } from '../../types';

export default function NotFound({ data }: NotFoundProps) {
  const quickLinks = data.quick_links || [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Tour Packages', href: '/packages' },
    { name: 'Services', href: '/services' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center py-16 sm:py-24 overflow-hidden bg-[#fbf8f5]">
      {/* Background Soft Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#f38f1d]/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-xl mx-auto px-4 text-center">
        {/* Large 404 Display */}
        <p className="font-heading text-8xl sm:text-[140px] font-black text-[#e86016] leading-none tracking-tight select-none drop-shadow-sm">
          {data.code}
        </p>

        {/* Badge */}
        <span className="mt-4 inline-block rounded-full bg-[#fdeee4] border border-[#fbd4bd] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#e86016]">
          {data.badge}
        </span>

        {/* Title & Description */}
        <h1 className="mt-5 font-heading text-2xl sm:text-4xl font-bold text-[#26160d]">
          {data.title}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#685f57] max-w-md mx-auto leading-relaxed">
          {data.description}
        </p>

        {/* Action Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href={data.back_home.href}
            className="btn-orange px-7 py-3 text-sm shadow-md"
          >
            <Home className="h-4 w-4" />
            <span>{data.back_home.text}</span>
          </Link>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 bg-white text-sm font-semibold text-[#3b3028] hover:border-[#e86016] hover:text-[#e86016] transition-all shadow-xs"
          >
            <Compass className="h-4 w-4 text-[#e86016]" />
            <span>Explore Tours</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-12 pt-6 border-t border-stone-200/80">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#8c8279] mb-3">
            Popular Pages
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-medium text-[#4a3f36] hover:border-[#e86016] hover:text-[#e86016] transition-colors shadow-2xs"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
