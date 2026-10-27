'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import type { FooterProps } from '../../types';
import SocialIcon from '../../ui/SocialIcon';

const contactIcons = {
  phone: Phone,
  mail: Mail,
  map: MapPin,
  clock: Clock,
} as const;

// Framer Motion animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
};

export default function Footer({ data }: FooterProps) {
  const bgImage = data.background_image || '/img/footer.webp';
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  return (
    <footer className="relative w-full bg-[#24150b] text-[#dfd4cc] overflow-hidden">
      {/* 1. Rock-solid static background layer: fixed dimensions so it NEVER zooms, shifts, or reflects when accordions open/close */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-[1400px] lg:h-full bg-cover bg-top lg:bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
        {/* 2. Ambient subtle gradient overlay for contrast while preserving palm trees */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#24150b]/45 via-transparent to-[#1a0e07]/60 pointer-events-none" />
      </div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-14 lg:pt-16 pb-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-8 pb-10"
        >
          {/* Column 1: Brand Info & Socials (Always visible) */}
          <motion.div
            variants={columnVariants}
            className="lg:col-span-4 md:col-span-2 flex flex-col pb-4 md:pb-0 border-b border-white/10 md:border-b-0"
          >
            {/* Logo - Increased size with reduced bottom spacing */}
            <Link
              href="/"
              className="relative block h-14 sm:h-16 md:h-[72px] lg:h-[76px] w-60 sm:w-72 md:w-80 shrink-0 mb-1.5 sm:mb-2 transition-transform duration-200 hover:scale-[1.02]"
            >
              <Image
                src={data.logo}
                alt={data.logo_text}
                fill
                sizes="360px"
                className="object-contain object-left"
                priority
              />
            </Link>

            {/* Description */}
            <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-[#e2d7ce] max-w-sm mb-3">
              <span className="text-[#f58220] font-semibold">{data.logo_text}</span>{' '}
              {data.description.replace(/^TravelGo\s+/i, '')}
            </p>

            {/* Social Icons matching screenshot */}
            <div className="flex items-center gap-2.5 pt-1">
              {data.socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.aria_label}
                  className="h-8 w-8 sm:h-8 sm:w-8 rounded-full border border-[#d97d26]/80 text-[#f5efe8] flex items-center justify-center hover:bg-[#f58220] hover:border-[#f58220] hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
                >
                  <SocialIcon icon={soc.icon} className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links (Accordion on mobile, open on md+) */}
          <motion.div
            variants={columnVariants}
            className="lg:col-span-2 md:col-span-1 pb-4 md:pb-0 border-b border-white/10 md:border-b-0"
          >
            <button
              type="button"
              onClick={() => toggleSection('quickLinks')}
              aria-expanded={openSection === 'quickLinks'}
              className="w-full flex items-center justify-between text-left md:pointer-events-none select-none"
            >
              <div>
                <h3 className="font-serif text-lg sm:text-[19px] font-bold text-white tracking-wide">
                  {data.pages_title}
                </h3>
                {/* Amber Underline Bar */}
                <div className="w-8 h-[2.5px] bg-[#d97d26] mt-1.5 mb-2 md:mb-3.5 rounded-full" />
              </div>
              <ChevronDown
                className={`h-5 w-5 text-[#d97d26] transition-transform duration-300 md:hidden ${
                  openSection === 'quickLinks' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Desktop list: always visible */}
            <div className="hidden md:block">
              <ul className="space-y-2 text-[13px] sm:text-[13.5px]">
                {data.pages_links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-[#e0d6ce] hover:text-[#f58220] transition-colors duration-200"
                    >
                      <ChevronRight
                        className="h-3 w-3 text-[#d97d26] shrink-0 group-hover:translate-x-0.5 transition-transform duration-200"
                        strokeWidth={2.5}
                      />
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile accordion content */}
            <div className="md:hidden">
              <AnimatePresence initial={false}>
                {openSection === 'quickLinks' && (
                  <motion.div
                    key="quickLinksContent"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden pt-1 pb-2"
                  >
                    <ul className="space-y-2.5 text-[13.5px]">
                      {data.pages_links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="group inline-flex items-center gap-2 text-[#e0d6ce] hover:text-[#f58220] transition-colors duration-200"
                          >
                            <ChevronRight
                              className="h-3 w-3 text-[#d97d26] shrink-0"
                              strokeWidth={2.5}
                            />
                            <span>{link.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Column 3: Our Services (Accordion on mobile, open on md+) */}
          <motion.div
            variants={columnVariants}
            className="lg:col-span-3 md:col-span-1 pb-4 md:pb-0 border-b border-white/10 md:border-b-0"
          >
            <button
              type="button"
              onClick={() => toggleSection('services')}
              aria-expanded={openSection === 'services'}
              className="w-full flex items-center justify-between text-left md:pointer-events-none select-none"
            >
              <div>
                <h3 className="font-serif text-lg sm:text-[19px] font-bold text-white tracking-wide">
                  {data.services_title}
                </h3>
                {/* Amber Underline Bar */}
                <div className="w-8 h-[2.5px] bg-[#d97d26] mt-1.5 mb-2 md:mb-3.5 rounded-full" />
              </div>
              <ChevronDown
                className={`h-5 w-5 text-[#d97d26] transition-transform duration-300 md:hidden ${
                  openSection === 'services' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Desktop list: always visible */}
            <div className="hidden md:block">
              <ul className="space-y-2 text-[13px] sm:text-[13.5px]">
                {data.services_links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-[#e0d6ce] hover:text-[#f58220] transition-colors duration-200"
                    >
                      <ChevronRight
                        className="h-3 w-3 text-[#d97d26] shrink-0 group-hover:translate-x-0.5 transition-transform duration-200"
                        strokeWidth={2.5}
                      />
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile accordion content */}
            <div className="md:hidden">
              <AnimatePresence initial={false}>
                {openSection === 'services' && (
                  <motion.div
                    key="servicesContent"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden pt-1 pb-2"
                  >
                    <ul className="space-y-2.5 text-[13.5px]">
                      {data.services_links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="group inline-flex items-center gap-2 text-[#e0d6ce] hover:text-[#f58220] transition-colors duration-200"
                          >
                            <ChevronRight
                              className="h-3 w-3 text-[#d97d26] shrink-0"
                              strokeWidth={2.5}
                            />
                            <span>{link.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Column 4: Contact Us (Accordion on mobile, open on md+) */}
          <motion.div
            variants={columnVariants}
            className="lg:col-span-3 md:col-span-2 lg:col-span-3 pb-2 md:pb-0"
          >
            <button
              type="button"
              onClick={() => toggleSection('contact')}
              aria-expanded={openSection === 'contact'}
              className="w-full flex items-center justify-between text-left md:pointer-events-none select-none"
            >
              <div>
                <h3 className="font-serif text-lg sm:text-[19px] font-bold text-white tracking-wide">
                  {data.contact_title}
                </h3>
                {/* Amber Underline Bar */}
                <div className="w-8 h-[2.5px] bg-[#d97d26] mt-1.5 mb-2 md:mb-3.5 rounded-full" />
              </div>
              <ChevronDown
                className={`h-5 w-5 text-[#d97d26] transition-transform duration-300 md:hidden ${
                  openSection === 'contact' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Desktop list: always visible */}
            <div className="hidden md:block">
              <ul className="space-y-3 text-[13px] sm:text-[13.5px]">
                {data.contact_items.map((item, idx) => {
                  const Icon =
                    contactIcons[item.icon as keyof typeof contactIcons] || MapPin;
                  return (
                    <li key={idx} className="flex items-start gap-3 group">
                      {/* Solid Amber Circular Icon Badge */}
                      <span className="h-8 w-8 sm:h-8 sm:w-8 rounded-full bg-[#f4a046] text-[#24150b] flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform duration-200">
                        <Icon className="h-4 w-4 stroke-[2.2]" />
                      </span>

                      <div className="min-w-0 flex-1">
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-[#f2ebe4] hover:text-[#f58220] transition-colors duration-200 block leading-snug"
                          >
                            {item.text}
                          </a>
                        ) : (
                          <p className="text-[#f2ebe4] whitespace-pre-line leading-snug">
                            {item.text}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Mobile accordion content */}
            <div className="md:hidden">
              <AnimatePresence initial={false}>
                {openSection === 'contact' && (
                  <motion.div
                    key="contactContent"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden pt-1 pb-2"
                  >
                    <ul className="space-y-3.5 text-[13.5px]">
                      {data.contact_items.map((item, idx) => {
                        const Icon =
                          contactIcons[item.icon as keyof typeof contactIcons] || MapPin;
                        return (
                          <li key={idx} className="flex items-start gap-3 group">
                            <span className="h-8 w-8 rounded-full bg-[#f4a046] text-[#24150b] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                              <Icon className="h-4 w-4 stroke-[2.2]" />
                            </span>

                            <div className="min-w-0 flex-1">
                              {item.href ? (
                                <a
                                  href={item.href}
                                  className="text-[#f2ebe4] hover:text-[#f58220] transition-colors duration-200 block leading-snug"
                                >
                                  {item.text}
                                </a>
                              ) : (
                                <p className="text-[#f2ebe4] whitespace-pre-line leading-snug">
                                  {item.text}
                                </p>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Centered copyright called from data.json */}
        <div className="border-t border-[#54351d]/70 pt-5 pb-2 text-center text-xs sm:text-[13px] text-[#baa89c]">
          <p>
            {data.copyright.includes('Lestow') ? (
              <>
                {data.copyright.split('Lestow')[0]}
                <span className="text-[#f58220] font-medium hover:underline cursor-pointer">Lestow</span>
                {data.copyright.split('Lestow')[1]}
              </>
            ) : data.copyright.includes('TravelGo') ? (
              <>
                {data.copyright.split('TravelGo')[0]}
                <span className="text-[#f58220] font-semibold">TravelGo</span>
                {data.copyright.split('TravelGo')[1]}
              </>
            ) : (
              data.copyright
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
