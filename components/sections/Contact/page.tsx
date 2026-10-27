'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  User,
  Calendar,
  Users,
  Tag,
  Send,
  CheckCircle2,
  Clock,
  Headphones,
  ShieldCheck,
  ChevronDown,
  Check,
  Navigation,
} from 'lucide-react';
import type { ContactProps } from '../../types';

interface SelectOption {
  value: string;
  label: string;
}

const PEOPLE_OPTIONS: SelectOption[] = [
  { value: '1', label: '1 Person' },
  { value: '2', label: '2 People' },
  { value: '3', label: '3 People' },
  { value: '4-6', label: '4 - 6 People' },
  { value: '7+', label: '7+ Group / Corporate' },
];

const PACKAGE_OPTIONS: SelectOption[] = [
  { value: 'pvt-land-cruiser', label: 'Desert Safari With PVT Land Cruiser' },
  { value: 'sky-44-yacht', label: 'Sky 44 ft Yacht Rental' },
  { value: 'bus-safari', label: 'Desert Safari By Bus Pickup & Drop' },
  { value: 'camel-ride', label: 'Camel Ride In Dubai' },
  { value: 'vip-safari', label: 'VIP Desert Safari Dubai' },
  { value: 'quad-bike', label: 'Quad Bike & Dune Buggy Safari' },
  { value: 'overnight-safari', label: 'Overnight Desert Safari Dubai' },
];

function CustomSelect({
  icon,
  placeholder,
  value,
  onChange,
  options,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  options: SelectOption[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={containerRef} className={`relative w-full ${isOpen ? 'z-40' : 'z-10'}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full h-[46px] pl-10 pr-9 rounded-[8px] border bg-white text-[13.5px] text-left flex items-center justify-between cursor-pointer transition-colors focus:outline-none ${
          isOpen
            ? 'border-[#ea580c] ring-1 ring-[#ea661c]'
            : 'border-[#d1d5db] hover:border-[#9ca3af]'
        }`}
      >
        <span className="absolute left-3.5 text-[#6b7280] pointer-events-none flex items-center">
          {icon}
        </span>
        <span
          className={`truncate select-none ${
            selected ? 'text-[#1f2937] font-medium' : 'text-[#9ca3af]'
          }`}
        >
          {selected ? selected.label : placeholder}
        </span>
        <span className="absolute right-3.5 text-[#6b7280] pointer-events-none flex items-center">
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 stroke-[2] ${
              isOpen ? 'rotate-180 text-[#ea580c]' : 'text-[#6b7280]'
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-white rounded-[10px] border border-[#e5e7eb] shadow-[0_12px_28px_-4px_rgba(0,0,0,0.12),0_4px_10px_-2px_rgba(0,0,0,0.06)] py-1.5 max-h-60 overflow-y-auto animate-in fade-in duration-150">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 text-[13.5px] transition-colors flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#fff7ed] text-[#ea580c] font-semibold'
                    : 'text-[#374151] hover:bg-[#fafaf9] hover:text-[#111827] font-medium'
                }`}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <Check className="h-4 w-4 text-[#ea580c] stroke-[2.2] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Contact({ data }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    people: '',
    package: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const suvImage = data.bg_suv_image || '/contact/contact-suv.webp';
  const camelsBannerImage = data.banner_camels_image || '/contact/contact-1.webp';

  return (
    <div className="w-full bg-[#faf6f0]/60">
      {/* ── Main Contact Section ── */}
      <section className="relative w-full pt-6 sm:pt-8 lg:pt-9 pb-10 sm:pb-12 lg:pb-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow & Heading */}
          <div className="text-center mb-5 sm:mb-6 lg:mb-7">
            {/* Script Eyebrow with horizontal lines */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-1 sm:mb-1.5">
              <span className="h-[1px] w-10 sm:w-14 bg-[#ea661c]" />
              <span className="font-script text-xl sm:text-[26px] text-[#ea661c] font-bold select-none leading-none">
                {data.script_eyebrow || 'Contact'}
              </span>
              <span className="h-[1px] w-10 sm:w-14 bg-[#ea661c]" />
            </div>

            {/* Serif Heading matching screenshot */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight text-[#261408] my-1">
              <span>{data.title_regular || 'Get In'} </span>
              <span className="text-[#ea661c]">{data.title_highlight || 'Touch'}</span>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#685c52] max-w-lg mx-auto mt-1 sm:mt-1.5 px-2">
              {data.description ||
                'Have a question or want to book your Dubai Desert Safari? Our team is here to help you with all the details. Feel free to reach out to us anytime.'}
            </p>
          </div>

          {/* 2-Column Grid: Contact Info Card (SUV) + Form Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Left Card: SUV in Desert with 3 Badges */}
            <div className="lg:col-span-5 relative rounded-[20px] sm:rounded-[22px] overflow-hidden border border-[#eae0d5] shadow-sm flex flex-col justify-between p-4 sm:p-6 lg:p-7 min-h-[260px] sm:min-h-[380px] lg:min-h-[520px]">
              {/* Background SUV Land Cruiser in Desert */}
              <div className="absolute inset-0">
                <Image
                  src={suvImage}
                  alt="Dubai Desert Safari 4x4 Land Cruiser SUV"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                {/* Gradient overlay for text legibility at top */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#fbf8f3]/95 via-[#fbf8f3]/85 to-transparent sm:via-[#fbf8f3]/80" />
              </div>

              {/* 3 Contact Badges */}
              <div className="relative z-10 space-y-3 sm:space-y-4.5 lg:space-y-6">
                {/* 1. Our Location */}
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <span className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#ea661c] text-white flex items-center justify-center shrink-0 shadow-md">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-sm sm:text-base lg:text-[17px] text-[#24130a] leading-snug">
                      Our Location
                    </h4>
                    <p className="text-[11.5px] sm:text-xs lg:text-[13px] font-semibold text-[#5a4e44] mt-0.5">
                      {data.address_line1 || '123 Education Lane'}
                    </p>
                    <p className="text-[11px] sm:text-xs lg:text-[12.5px] text-[#6b5f54] leading-tight mt-0.5 max-w-[240px]">
                      {data.address_line2 || data.address || '123 Education Lane, New York, NY 10001'}
                    </p>
                  </div>
                </div>

                {/* 2. Call Us */}
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <span className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#ea661c] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-sm sm:text-base lg:text-[17px] text-[#24130a] leading-snug">
                      Call Us
                    </h4>
                    <a
                      href={`tel:${data.phone || '+100000000000'}`}
                      className="text-[11.5px] sm:text-xs lg:text-[14px] font-bold text-[#24130a] hover:text-[#ea661c] transition-colors mt-0.5 block"
                    >
                      {data.phone || '+100000000000'}
                    </a>
                  </div>
                </div>

                {/* 3. Email Us */}
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <span className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-[#ea661c] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-sm sm:text-base lg:text-[17px] text-[#24130a] leading-snug">
                      Email Us
                    </h4>
                    <a
                      href={`mailto:${data.email || 'info@xyz.com'}`}
                      className="text-[11.5px] sm:text-xs lg:text-[13.5px] font-medium text-[#24130a] hover:text-[#ea661c] transition-colors mt-0.5 block"
                    >
                      {data.email || 'info@xyz.com'}
                    </a>
                    <p className="text-[10.5px] sm:text-xs text-[#6b5f54] mt-0.5">
                      {data.email_note || 'We reply within 24 hours'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom empty spacer to showcase the beautiful SUV & Dubai skyline */}
              <div className="relative z-10 pt-3 sm:pt-10 lg:pt-24" />
            </div>

            {/* Right Card: Send Us a Message Form matching screenshot */}
            <div className="lg:col-span-7 bg-white rounded-[20px] border border-[#e5e7eb] p-6 sm:p-8 lg:p-9 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                {/* Form Header */}
                <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
                  <h3 className="font-serif text-2xl sm:text-[30px] lg:text-[32px] font-bold text-[#111827] tracking-tight">
                    <span>Send Us a </span>
                    <span className="text-[#ea580c] italic font-serif font-bold">Message</span>
                  </h3>
                  <span className="h-[2px] w-12 sm:w-16 bg-[#ea580c] inline-block align-middle ml-1" />
                </div>
                <p className="text-[13px] sm:text-[14px] text-[#4b5563] mb-6 font-normal leading-relaxed">
                  {data.form_description ||
                    'Fill out the form below and our team will get back to you as soon as possible.'}
                </p>

                {submitted ? (
                  <div className="rounded-2xl bg-[#f0faf4] border border-[#bbf0cf] p-8 text-center my-6">
                    <CheckCircle2 className="h-12 w-12 text-[#16a34a] mx-auto mb-3" />
                    <h4 className="font-serif text-xl font-bold text-[#14532d]">
                      Thank You! Message Sent Successfully
                    </h4>
                    <p className="text-xs sm:text-sm text-[#166534] mt-1.5 max-w-md mx-auto">
                      Your safari booking enquiry has been received. Our team will contact you shortly with full details.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-5 inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-semibold shadow-sm transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
                    {/* Row 1: Full Name & Email Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-medium text-[#1f2937] mb-1.5">
                          Full Name <span className="text-[#ea580c] font-bold ml-0.5">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 text-[#6b7280] pointer-events-none">
                            <User className="h-[18px] w-[18px] stroke-[1.75]" />
                          </span>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your full name"
                            className="w-full h-[46px] pl-10 pr-3.5 rounded-[8px] border border-[#d1d5db] bg-white text-[13.5px] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[13px] font-medium text-[#1f2937] mb-1.5">
                          Email Address <span className="text-[#ea661c] font-bold ml-0.5">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 text-[#6b7280] pointer-events-none">
                            <Mail className="h-[18px] w-[18px] stroke-[1.75]" />
                          </span>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter your email"
                            className="w-full h-[46px] pl-10 pr-3.5 rounded-[8px] border border-[#d1d5db] bg-white text-[13.5px] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea661c] transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Phone Number & Travel Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-medium text-[#1f2937] mb-1.5">
                          Phone Number <span className="text-[#ea661c] font-bold ml-0.5">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 text-[#6b7280] pointer-events-none">
                            <Phone className="h-[18px] w-[18px] stroke-[1.75]" />
                          </span>
                          <input
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            required
                            value={formData.phone}
                            onKeyDown={(e) => {
                              if (
                                ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key) ||
                                e.ctrlKey ||
                                e.metaKey
                              ) {
                                return;
                              }
                              if (!/^[0-9]$/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              const numbersOnly = e.target.value.replace(/[^0-9]/g, '');
                              setFormData({ ...formData, phone: numbersOnly });
                            }}
                            placeholder="Enter phone number"
                            className="w-full h-[46px] pl-10 pr-3.5 rounded-[8px] border border-[#d1d5db] bg-white text-[13.5px] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea661c] transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[13px] font-medium text-[#1f2937] mb-1.5">
                          Travel Date
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 text-[#6b7280] pointer-events-none">
                            <Calendar className="h-[18px] w-[18px] stroke-[1.75]" />
                          </span>
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            placeholder="Select travel date"
                            className="w-full h-[46px] pl-10 pr-3.5 rounded-[8px] border border-[#d1d5db] bg-white text-[13.5px] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea661c] transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Number of People */}
                    <div>
                      <label className="block text-[13px] font-medium text-[#1f2937] mb-1.5">
                        Number of People
                      </label>
                      <CustomSelect
                        icon={<Users className="h-[18px] w-[18px] stroke-[1.75]" />}
                        placeholder="Select number of people"
                        value={formData.people}
                        onChange={(val) => setFormData({ ...formData, people: val })}
                        options={data.people_options || PEOPLE_OPTIONS}
                      />
                    </div>

                    {/* Row 4: Package / Tour */}
                    <div>
                      <label className="block text-[13px] font-medium text-[#1f2937] mb-1.5">
                        Package / Tour
                      </label>
                      <CustomSelect
                        icon={<Tag className="h-[18px] w-[18px] stroke-[1.75]" />}
                        placeholder="Select a package"
                        value={formData.package}
                        onChange={(val) => setFormData({ ...formData, package: val })}
                        options={data.package_options || PACKAGE_OPTIONS}
                      />
                    </div>

                    {/* Row 5: Message / Special Requirements */}
                    <div>
                      <label className="block text-[13px] font-medium text-[#1f2937] mb-1.5">
                        Message / Special Requirements
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us your requirements..."
                        className="w-full min-h-[130px] p-3.5 rounded-[8px] border border-[#d1d5db] bg-white text-[13.5px] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea661c] transition-colors resize-y"
                      />
                    </div>

                    {/* Action Button */}
                    <button
                      type="submit"
                      className="btn-orange w-full sm:w-auto px-8 py-3 text-[13.5px] font-semibold tracking-wide rounded-lg mt-3 flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4 rotate-45" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* ── Interactive Google Map ── */}
          <div className="mt-10 sm:mt-14 relative rounded-[20px] overflow-hidden border border-[#e8ded3] shadow-sm bg-white h-[260px] sm:h-[320px] lg:h-[360px]">
            {/* Top-left Google Map Card Overlay matching screenshot */}
            <div className="absolute top-3.5 left-3.5 z-10 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md border border-[#e8ded3]/80 min-w-[210px] max-w-[250px] select-none pointer-events-auto">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[13.5px] sm:text-[14.5px] text-[#221208] leading-tight truncate">
                    {data.map_title || data.address_line1 || '123 Education Lane'}
                  </h4>
                  <p className="text-[11px] text-[#6b5f54] mt-0.5 truncate">
                    {data.map_subtitle || data.address_line2 || 'New York, NY 10001'}
                  </p>
                  <a
                    href={
                      data.map_link ||
                      `https://maps.google.com/?q=${encodeURIComponent(
                        data.address || '123 Education Lane, New York, NY 10001'
                      )}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-blue-600 hover:text-blue-700 font-medium mt-1.5 inline-block hover:underline"
                  >
                    View larger map
                  </a>
                </div>
                <a
                  href={
                    data.map_link ||
                    `https://maps.google.com/?q=${encodeURIComponent(
                      data.address || '123 Education Lane, New York, NY 10001'
                    )}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm hover:bg-blue-700 transition-colors mt-0.5"
                  aria-label="Directions"
                >
                  <Navigation className="h-3.5 w-3.5 fill-current" />
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <iframe
              title={data.address || '123 Education Lane, New York, NY 10001'}
              src={
                data.map_embed_url ||
                `https://maps.google.com/maps?q=${encodeURIComponent(
                  data.address || '123 Education Lane, New York, NY 10001'
                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`
              }
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[15%] contrast-[105%]"
            />
          </div>
        </div>
      </section>

      {/* ── Desert Camel Sunset Feature Banner (3 Badges) ── */}
      <section className="relative w-full overflow-hidden bg-[#1c0f07]">
        {/* Top organic dune curve matching screenshot */}
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-6 sm:h-9 lg:h-11 z-20 pointer-events-none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L1440,0 L1440,4 C1160,14 880,26 600,32 C340,38 140,28 0,18 Z"
            fill="#faf6f0"
          />
        </svg>

        <div className="relative w-full min-h-[170px] sm:min-h-[260px] lg:min-h-[320px] flex items-center py-6 sm:py-10 lg:py-14">
          {/* Background Camels Caravan Image */}
          <div className="absolute inset-0">
            <Image
              src={camelsBannerImage}
              alt="Camels walking on golden desert dunes at sunset in Dubai"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[75%_center] md:object-center"
            />
            {/* Dark warm gradient on left for feature text readability, leaving camels and sunset vivid on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent sm:from-black/65 sm:via-black/35" />
          </div>

          {/* 3 Feature Columns in ONE ROW on all screen sizes */}
          <div className="relative z-10 max-w-6xl mx-auto px-2.5 sm:px-6 lg:px-8 w-full">
            <div className="w-full sm:max-w-[680px] lg:max-w-[740px]">
              <div className="grid grid-cols-3 gap-0">
                {/* Feature 1: Quick Response */}
                <div className="flex flex-col items-center text-center px-1 sm:px-4 lg:px-5">
                  <Clock className="h-6 w-6 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-white stroke-[2] mb-1.5 sm:mb-2.5 lg:mb-3 shrink-0" />
                  <h4 className="font-serif font-bold text-[11.5px] sm:text-[18px] lg:text-[21px] text-white leading-tight">
                    Quick Response
                  </h4>
                  <p className="text-[9px] sm:text-xs lg:text-[13px] text-white/90 leading-tight sm:leading-relaxed mt-1 sm:mt-1.5 max-w-[190px]">
                    We respond to all enquiries within 24 hours.
                  </p>
                </div>

                {/* Feature 2: Dedicated Support */}
                <div className="flex flex-col items-center text-center px-1 sm:px-4 lg:px-5 border-l border-r border-white/20 sm:border-white/25">
                  <Headphones className="h-6 w-6 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-white stroke-[2] mb-1.5 sm:mb-2.5 lg:mb-3 shrink-0" />
                  <h4 className="font-serif font-bold text-[11.5px] sm:text-[18px] lg:text-[21px] text-white leading-tight">
                    Dedicated Support
                  </h4>
                  <p className="text-[9px] sm:text-xs lg:text-[13px] text-white/90 leading-tight sm:leading-relaxed mt-1 sm:mt-1.5 max-w-[190px]">
                    Our team is here to help you plan the perfect safari.
                  </p>
                </div>

                {/* Feature 3: Trusted & Reliable */}
                <div className="flex flex-col items-center text-center px-1 sm:px-4 lg:px-5">
                  <ShieldCheck className="h-6 w-6 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-white stroke-[2] mb-1.5 sm:mb-2.5 lg:mb-3 shrink-0" />
                  <h4 className="font-serif font-bold text-[11.5px] sm:text-[18px] lg:text-[21px] text-white leading-tight">
                    Trusted & Reliable
                  </h4>
                  <p className="text-[9px] sm:text-xs lg:text-[13px] text-white/90 leading-tight sm:leading-relaxed mt-1 sm:mt-1.5 max-w-[190px]">
                    Safe, secure and memorable experiences in Dubai.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
