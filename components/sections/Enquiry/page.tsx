'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  Tag,
  Clock,
  Car,
  PenLine,
  Send,
  ChevronDown,
  Check,
  CheckCircle2,
} from 'lucide-react';
import type { EnquiryProps, EnquirySelectOption } from '../../types';
import { sections } from '../../types';

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
  options: EnquirySelectOption[];
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
        className={`w-full h-[44px] pl-10 pr-9 rounded-[10px] border bg-white text-[13.5px] text-left flex items-center justify-between cursor-pointer transition-all focus:outline-none ${
          isOpen
            ? 'border-[#ea580c] ring-1 ring-[#ea580c]'
            : 'border-[#e5e7eb] hover:border-[#cbd5e1]'
        }`}
      >
        <span className="absolute left-3.5 text-[#9ca3af] pointer-events-none flex items-center">
          {icon}
        </span>
        <span
          className={`truncate select-none ${
            selected ? 'text-[#1f2937] font-medium' : 'text-[#9ca3af]'
          }`}
        >
          {selected ? selected.label : placeholder}
        </span>
        <span className="absolute right-3.5 text-[#374151] pointer-events-none flex items-center">
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 stroke-[2] ${
              isOpen ? 'rotate-180 text-[#ea580c]' : 'text-[#374151]'
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+5px)] z-50 bg-white rounded-[12px] border border-[#e5e7eb] shadow-[0_12px_28px_-4px_rgba(0,0,0,0.12),0_4px_10px_-2px_rgba(0,0,0,0.06)] py-1.5 max-h-60 overflow-y-auto animate-in fade-in duration-150">
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

export default function EnquirySection({ data, packageOptions }: EnquiryProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isDateFocused, setIsDateFocused] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    people: '',
    package: '',
    time: '',
    pickup: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Fallback to sections.packages if packageOptions not explicitly passed
  const availablePackages: EnquirySelectOption[] =
    packageOptions ||
    sections.packages?.items?.map((p) => ({
      value: p.id,
      label: p.title,
    })) ||
    [];

  if (!data) return null;

  return (
    <section className="relative w-full bg-white py-10 sm:py-14 lg:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Top Header matching exact screenshot */}
        <div className="text-center mb-8 sm:mb-9">
          {data.script_eyebrow && (
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-1">
              <span className="h-[1.5px] w-14 sm:w-18 bg-[#ea580c]/60" />
              <span className="font-script text-2xl sm:text-[28px] text-[#ea580c] font-bold select-none leading-none">
                {data.script_eyebrow}
              </span>
              <span className="h-[1.5px] w-14 sm:w-18 bg-[#ea580c]/60" />
            </div>
          )}

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight text-[#111827] my-1 tracking-tight">
            <span>{data.title_regular} </span>
            <span className="text-[#ea580c] font-serif font-bold italic">
              {data.title_highlight}
            </span>
          </h2>

          <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#4b5563] max-w-md mx-auto mt-2">
            {data.description}
          </p>
        </div>

        {/* Enquiry Form Card matching exact screenshot */}
        <div className="bg-white rounded-[20px] border border-[#fed7aa] p-6 sm:p-8 shadow-[0_4px_25px_rgba(234,88,12,0.04)]">
          {submitted ? (
            <div className="rounded-2xl bg-[#f0faf4] border border-[#bbf0cf] p-8 sm:p-10 text-center my-4">
              <CheckCircle2 className="h-14 w-14 text-[#16a34a] mx-auto mb-3" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14532d]">
                {data.success_title}
              </h3>
              <p className="text-xs sm:text-sm text-[#166534] mt-2 max-w-md mx-auto leading-relaxed">
                {data.success_message}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer"
              >
                {data.reset_button_text || 'Send Another Enquiry'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
              {/* Row 1: Full Name & Email Address (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#1f2937] mb-1.5">
                    {data.name_label || 'Full Name'}{' '}
                    <span className="text-[#ef4444] font-bold">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-[#9ca3af] pointer-events-none">
                      <User className="h-[18px] w-[18px] stroke-[1.75]" />
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={data.name_placeholder}
                      className="w-full h-[44px] pl-10 pr-3.5 rounded-[10px] border border-[#e5e7eb] bg-white text-[13.5px] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#1f2937] mb-1.5">
                    {data.email_label || 'Email Address'}{' '}
                    <span className="text-[#ef4444] font-bold">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-[#9ca3af] pointer-events-none">
                      <Mail className="h-[18px] w-[18px] stroke-[1.75]" />
                    </span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={data.email_placeholder}
                      className="w-full h-[44px] pl-10 pr-3.5 rounded-[10px] border border-[#e5e7eb] bg-white text-[13.5px] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Phone Number (with UAE flag & +971) & Travel Date (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#1f2937] mb-1.5">
                    {data.phone_label || 'Phone Number'}{' '}
                    <span className="text-[#ef4444] font-bold">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-[#9ca3af] pointer-events-none">
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
                        const onlyDigits = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, phone: onlyDigits });
                      }}
                      placeholder={data.phone_placeholder}
                      className="w-full h-[44px] pl-10 pr-3.5 rounded-[10px] border border-[#e5e7eb] bg-white text-[13.5px] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#1f2937] mb-1.5">
                    {data.date_label || 'Travel Date'}{' '}
                    <span className="text-[#ef4444] font-bold">*</span>
                  </label>
                  <div className="relative flex items-center h-[44px] rounded-[10px] border border-[#e5e7eb] bg-white focus-within:border-[#ea580c] focus-within:ring-1 focus-within:ring-[#ea580c] transition-all">
                    <span className="absolute left-3.5 text-[#9ca3af] pointer-events-none">
                      <Calendar className="h-[18px] w-[18px] stroke-[1.75]" />
                    </span>
                    <input
                      type={isDateFocused || formData.date ? 'date' : 'text'}
                      onFocus={() => setIsDateFocused(true)}
                      onBlur={() => setIsDateFocused(false)}
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder={data.date_placeholder}
                      className="w-full h-full pl-10 pr-3.5 rounded-[10px] text-[13.5px] text-[#1f2937] placeholder:text-[#9ca3af] bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Number of People (Full Width in screenshot) */}
              <div>
                <label className="block text-[13px] font-semibold text-[#1f2937] mb-1.5">
                  {data.people_label || 'Number of People'}{' '}
                  <span className="text-[#ef4444] font-bold">*</span>
                </label>
                <CustomSelect
                  icon={<Users className="h-[18px] w-[18px] stroke-[1.75]" />}
                  placeholder={data.people_placeholder}
                  value={formData.people}
                  onChange={(val) => setFormData({ ...formData, people: val })}
                  options={data.people_options}
                />
              </div>

              {/* Row 4: Package / Tour (Full Width in screenshot) */}
              <div>
                <label className="block text-[13px] font-semibold text-[#1f2937] mb-1.5">
                  {data.package_label || 'Package / Tour'}{' '}
                  <span className="text-[#ef4444] font-bold">*</span>
                </label>
                <CustomSelect
                  icon={<Tag className="h-[18px] w-[18px] stroke-[1.75]" />}
                  placeholder={data.package_placeholder}
                  value={formData.package}
                  onChange={(val) => setFormData({ ...formData, package: val })}
                  options={availablePackages}
                />
              </div>

              {/* Row 5: Preferred Time & Hotel Pick-up Required? (2 columns in screenshot) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#1f2937] mb-1.5">
                    {data.time_label || 'Preferred Time'}
                  </label>
                  <CustomSelect
                    icon={<Clock className="h-[18px] w-[18px] stroke-[1.75]" />}
                    placeholder={data.time_placeholder}
                    value={formData.time}
                    onChange={(val) => setFormData({ ...formData, time: val })}
                    options={data.time_options}
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#1f2937] mb-1.5">
                    {data.pickup_label || 'Hotel Pick-up Required?'}
                  </label>
                  <CustomSelect
                    icon={<Car className="h-[18px] w-[18px] stroke-[1.75]" />}
                    placeholder={data.pickup_placeholder}
                    value={formData.pickup}
                    onChange={(val) => setFormData({ ...formData, pickup: val })}
                    options={data.pickup_options}
                  />
                </div>
              </div>

              {/* Row 6: Message / Special Requirements (Full Width in screenshot) */}
              <div>
                <label className="block text-[13px] font-semibold text-[#1f2937] mb-1.5">
                  {data.message_label || 'Message / Special Requirements'}
                </label>
                <div className="relative rounded-[10px] border border-[#e5e7eb] bg-white focus-within:border-[#ea580c] focus-within:ring-1 focus-within:ring-[#ea580c] transition-all">
                  <span className="absolute left-3.5 top-3.5 text-[#9ca3af] pointer-events-none">
                    <PenLine className="h-[17px] w-[17px] stroke-[1.75]" />
                  </span>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={data.message_placeholder}
                    className="w-full min-h-[96px] pl-10 pr-3.5 pt-3 pb-3 rounded-[10px] bg-transparent text-[13.5px] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none resize-y"
                  />
                </div>
              </div>

              {/* Row 7: Submit Button (Full Width, vibrant orange, rounded-full) */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-[50px] sm:h-[52px] rounded-full bg-[#ff4600] hover:bg-[#ea4000] text-white font-bold text-[15px] sm:text-[16px] shadow-[0_4px_16px_rgba(255,70,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,70,0,0.4)] transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer tracking-wide"
                >
                  <span>{data.button_text || 'Submit Enquiry'}</span>
                  <Send className="h-4 w-4 fill-white rotate-45" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
