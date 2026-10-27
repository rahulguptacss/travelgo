'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  Tag,
  Users,
  Calendar,
  Check,
  ChevronDown,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PackageDetailData, PackageEnquiryForm } from '../../types';

interface PackageDetailsProps {
  packageData: PackageDetailData;
  enquiryForm?: PackageEnquiryForm;
}

const DEFAULT_ENQUIRY_FORM: PackageEnquiryForm = {
  title_prefix: 'Enquire',
  title_highlight: 'Now',
  subtitle: 'Fill out the form and our team will get back to you with the best package details.',
  name_placeholder: 'Full Name *',
  email_placeholder: 'Email Address *',
  phone_placeholder: 'Phone Number *',
  date_placeholder: 'Travel Date *',
  people_placeholder: 'Number of People *',
  people_options: [
    { value: '1', label: '1 Person' },
    { value: '2', label: '2 People' },
    { value: '3', label: '3 People' },
    { value: '4', label: '4 People' },
    { value: '5-8', label: '5 - 8 People' },
    { value: '9+', label: '9+ People (Group)' },
  ],
  message_placeholder: 'Message / Special Requirements',
  button_text: 'Send Enquiry',
  success_title: 'Enquiry Sent Successfully!',
  success_message: 'Thank you! Our travel expert will contact you shortly with the best offers.',
};

export default function PackageDetails({ packageData, enquiryForm }: PackageDetailsProps) {
  const formConfig = enquiryForm || packageData.enquiry_form || DEFAULT_ENQUIRY_FORM;
  const peopleOptions = formConfig.people_options;
  // Active hero image state
  const [selectedImage, setSelectedImage] = useState<string>(
    packageData.main_image || packageData.thumbnails?.[0] || '/packages/package-1.webp'
  );

  // FAQ Accordion open index state (first one open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form states
  const [phone, setPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    travelDate: '',
    people: '',
    message: '',
  });

  // Custom Dropdown state
  const [peopleOpen, setPeopleOpen] = useState(false);
  const peopleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (peopleRef.current && !peopleRef.current.contains(e.target as Node)) {
        setPeopleOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPeopleOpen(false);
    };
    if (peopleOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [peopleOpen]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericOnly = e.target.value.replace(/\D/g, '');
    setPhone(numericOnly);
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(
        e.key
      ) ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        travelDate: '',
        people: '',
        message: '',
      });
      setPhone('');
      setFormSubmitted(false);
    }, 6000);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Icon mapper helper for specifications
  const renderSpecIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'map-pin':
      case 'location':
        return <MapPin className="w-5 h-5 text-[#ea661c]" />;
      case 'clock':
      case 'duration':
        return <Clock className="w-5 h-5 text-[#ea661c]" />;
      case 'tag':
      case 'tour-type':
        return <Tag className="w-5 h-5 text-[#ea661c]" />;
      case 'users':
      case 'group-type':
        return <Users className="w-5 h-5 text-[#ea661c]" />;
      default:
        return <Tag className="w-5 h-5 text-[#ea661c]" />;
    }
  };

  // Split gallery images into row 1 (4 images) and row 2 (3 images)
  const gallery = packageData.gallery_images || [];
  const galleryRow1 = gallery.slice(0, 4);
  const galleryRow2 = gallery.slice(4, 7);

  return (
    <section className="relative w-full bg-[#fdfcf9] py-8 sm:py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ============================================================== */}
          {/* LEFT COLUMN: Main Package Information & Details               */}
          {/* ============================================================== */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            {/* 1. Header: Package Title & Meta (Location, Duration) */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a120c] leading-tight tracking-tight">
                <span>{packageData.title_prefix} </span>
                <span className="text-[#ea661c]">{packageData.title_highlight}</span>
              </h1>

              <div className="flex items-center gap-3 mt-2.5 text-xs sm:text-sm text-[#4a3f35] font-semibold">
                <div className="flex items-center gap-1.5 text-[#ea661c]">
                  <MapPin className="w-4 h-4 fill-current text-[#ea661c]" />
                  <span className="text-[#2a1d13] font-bold">{packageData.location}</span>
                </div>
                <span className="text-[#bfae9c]">|</span>
                <div className="flex items-center gap-1.5 text-[#ea661c]">
                  <Calendar className="w-4 h-4 text-[#ea661c]" />
                  <span className="text-[#2a1d13] font-bold">{packageData.duration}</span>
                </div>
              </div>
            </div>

            {/* 2. Main Hero Showcase Image */}
            <div className="space-y-3 sm:space-y-4">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden shadow-sm border border-[#ede3d7] bg-[#f4ebe1]">
                <Image
                  src={selectedImage}
                  alt={`${packageData.title_prefix} ${packageData.title_highlight}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover object-center transition-all duration-300"
                />
              </div>

              {/* 4 Clickable Thumbnails */}
              {packageData.thumbnails && packageData.thumbnails.length > 0 && (
                <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
                  {packageData.thumbnails.slice(0, 4).map((thumb, idx) => {
                    const isActive = selectedImage === thumb;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImage(thumb)}
                        className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                          isActive
                            ? 'border-[#ea661c] ring-2 ring-[#ea661c]/30 shadow-md scale-[1.02]'
                            : 'border-transparent opacity-85 hover:opacity-100 hover:border-[#ea661c]/50'
                        }`}
                      >
                        <Image
                          src={thumb}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          sizes="(max-width: 768px) 25vw, 180px"
                          className="object-cover object-center"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. About This Package */}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[#1f150e]">
                  <span className="text-[#ea661c]">{packageData.about_title?.charAt(0) || 'A'}</span>
                  {packageData.about_title?.slice(1) || 'bout This Package'}
                </h2>
                <span className="h-[2px] w-16 bg-[#ea661c] inline-block rounded-full" />
              </div>

              <p className="text-[#554b42] text-sm sm:text-[15px] leading-relaxed mt-3">
                {packageData.about_description}
              </p>

              {/* Specifications 4-column card */}
              {packageData.specifications && packageData.specifications.length > 0 && (
                <div className="mt-5 bg-[#faf6f0] border border-[#ebdccb] rounded-2xl p-4 sm:p-5 grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#ecdccb]">
                  {packageData.specifications.map((spec, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col items-center text-center ${
                        idx > 0 && idx % 2 === 0 ? 'pt-4 md:pt-0' : ''
                      } ${idx % 2 === 1 ? 'pt-4 md:pt-0' : ''} md:px-3`}
                    >
                      <div className="mb-1.5 flex items-center justify-center">
                        {renderSpecIcon(spec.icon)}
                      </div>
                      <span className="text-xs sm:text-[13px] font-bold text-[#22160d]">
                        {spec.label}
                      </span>
                      <span className="text-xs sm:text-[12.5px] font-medium text-[#6c6156] mt-0.5">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Tour Highlights */}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[#1f150e]">
                  <span className="text-[#ea661c]">{packageData.highlights_title?.split(' ')[0] || 'Tour'} </span>
                  {packageData.highlights_title?.split(' ').slice(1).join(' ') || 'Highlights'}
                </h2>
                <span className="h-[2px] w-16 bg-[#ea661c] inline-block rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 sm:gap-y-3.5 mt-4">
                {packageData.highlights?.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#ea661c] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-stone-700 text-xs sm:text-[13.5px] font-medium leading-snug">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Tour Itinerary */}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[#1f150e]">
                  <span className="text-[#ea661c]">{packageData.itinerary_title?.split(' ')[0] || 'Tour'} </span>
                  {packageData.itinerary_title?.split(' ').slice(1).join(' ') || 'Itinerary'}
                </h2>
                <span className="h-[2px] w-16 bg-[#ea661c] inline-block rounded-full" />
              </div>

              <div className="relative pl-6 sm:pl-7 border-l-2 border-[#ea661c]/50 space-y-4 sm:space-y-4.5 mt-5 ml-2.5">
                {packageData.itinerary?.map((item, idx) => (
                  <div key={idx} className="relative flex items-center gap-3 sm:gap-4">
                    {/* Orange Dot on line */}
                    <span className="absolute -left-[31px] sm:-left-[35px] w-3.5 h-3.5 rounded-full bg-[#ea661c] ring-4 ring-[#ffe8db]" />

                    {/* Time Badge */}
                    <span className="font-bold text-xs sm:text-[13px] text-[#ea661c] w-18 sm:w-20 flex-shrink-0 tracking-tight">
                      {item.time}
                    </span>

                    {/* Itinerary Step Description */}
                    <span className="text-stone-800 text-xs sm:text-[13.5px] font-medium leading-snug">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Tour Gallery */}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[#1f150e]">
                  {packageData.gallery_title?.split(' ')[0] || 'Tour'}{' '}
                  <span className="text-[#ea661c]">
                    {packageData.gallery_title?.split(' ').slice(1).join(' ') || 'Gallery'}
                  </span>
                </h2>
                <span className="h-[2px] w-16 bg-[#ea661c] inline-block rounded-full" />
              </div>

              {/* Row 1: 4 images */}
              {galleryRow1.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 mt-4">
                  {galleryRow1.map((img, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-[16/11] rounded-xl overflow-hidden bg-stone-100 border border-stone-200/60 shadow-sm cursor-pointer"
                      onClick={() => setSelectedImage(img)}
                    >
                      <Image
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 200px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Row 2: 3 images */}
              {galleryRow2.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 mt-2.5 sm:mt-3.5">
                  {galleryRow2.map((img, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-stone-100 border border-stone-200/60 shadow-sm cursor-pointer"
                      onClick={() => setSelectedImage(img)}
                    >
                      <Image
                        src={img}
                        alt={`Gallery ${idx + 5}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 260px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 7. Frequently Asked Questions */}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[#1f150e]">
                  <span>{packageData.faq_title_regular} </span>
                  <span className="text-[#ea661c]">{packageData.faq_title_highlight}</span>
                </h2>
                <span className="h-[2px] w-16 bg-[#ea661c] inline-block rounded-full" />
              </div>

              <div className="space-y-2 mt-4">
                {packageData.faqs?.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-[#e8ded3] rounded-xl overflow-hidden bg-white shadow-xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left hover:bg-[#faf7f2] transition-colors"
                      >
                        <span className="text-stone-800 text-xs sm:text-[13.5px] font-semibold pr-3 leading-snug">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-stone-500 flex-shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#ea661c]' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-3.5 sm:px-4 pb-3.5 pt-0 text-stone-600 text-xs sm:text-[13px] leading-relaxed border-t border-[#f0e7dd] mt-1">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: Sticky "Enquire Now" Card + Portrait Banner      */}
          {/* ============================================================== */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* "Enquire Now" Card matching Screenshot */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-[#ede3d7]">
              <div className="mb-4">
                <h2 className="font-serif text-2xl sm:text-[27px] font-bold text-[#1f150e]">
                  <span>{formConfig.title_prefix} </span>
                  <span className="text-[#ea661c]">{formConfig.title_highlight}</span>
                </h2>
                <p className="text-stone-500 text-xs sm:text-[13px] mt-1 leading-snug">
                  {formConfig.subtitle}
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-sm font-bold">{formConfig.success_title}</p>
                  <p className="text-xs text-emerald-700">
                    {formConfig.success_message}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Full Name */}
                  <div>
                    <input
                      type="text"
                      required
                      placeholder={formConfig.name_placeholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#dfd5c8] text-xs sm:text-sm focus:outline-none focus:border-[#ea661c] focus:ring-1 focus:ring-[#ea661c] bg-white text-stone-800 placeholder:text-stone-400 transition-colors"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <input
                      type="email"
                      required
                      placeholder={formConfig.email_placeholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#dfd5c8] text-xs sm:text-sm focus:outline-none focus:border-[#ea661c] focus:ring-1 focus:ring-[#ea661c] bg-white text-stone-800 placeholder:text-stone-400 transition-colors"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <input
                      type="tel"
                      required
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder={formConfig.phone_placeholder}
                      value={phone}
                      onChange={handlePhoneChange}
                      onKeyDown={handlePhoneKeyDown}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#dfd5c8] text-xs sm:text-sm focus:outline-none focus:border-[#ea661c] focus:ring-1 focus:ring-[#ea661c] bg-white text-stone-800 placeholder:text-stone-400 transition-colors"
                    />
                  </div>

                  {/* Travel Date */}
                  <div className="relative">
                    <input
                      type="date"
                      required
                      placeholder={formConfig.date_placeholder}
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#dfd5c8] text-xs sm:text-sm focus:outline-none focus:border-[#ea661c] focus:ring-1 focus:ring-[#ea661c] bg-white text-stone-800 placeholder:text-stone-400 transition-colors"
                    />
                  </div>

                  {/* Number of People Custom Dropdown */}
                  <div ref={peopleRef} className="relative">
                    {/* Hidden input to ensure HTML validation if submitted empty */}
                    <input
                      type="text"
                      required
                      value={formData.people}
                      onChange={() => {}}
                      className="sr-only"
                      tabIndex={-1}
                    />
                    <button
                      type="button"
                      onClick={() => setPeopleOpen((prev) => !prev)}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm bg-white flex items-center justify-between text-left transition-colors cursor-pointer focus:outline-none ${
                        peopleOpen
                          ? 'border-[#ea661c] ring-1 ring-[#ea661c]'
                          : 'border-[#dfd5c8] hover:border-[#bfae9c]'
                      }`}
                    >
                      <span
                        className={
                          formData.people
                            ? 'text-stone-800 font-medium'
                            : 'text-stone-400'
                        }
                      >
                        {peopleOptions.find((opt) => opt.value === formData.people)?.label ||
                          formConfig.people_placeholder}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 stroke-[2] ${
                          peopleOpen ? 'rotate-180 text-[#ea661c]' : 'text-stone-400'
                        }`}
                      />
                    </button>

                    {/* Custom Dropdown Menu */}
                    {peopleOpen && (
                      <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 bg-white rounded-lg border border-[#e8ded3] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.06)] py-1 overflow-hidden animate-in fade-in duration-150">
                        {peopleOptions.map((opt) => {
                          const isSelected = formData.people === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, people: opt.value }));
                                setPeopleOpen(false);
                              }}
                              className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-[13px] flex items-center justify-between cursor-pointer transition-colors ${
                                isSelected
                                  ? 'bg-[#fff5ee] text-[#ea661c] font-semibold'
                                  : 'text-stone-700 hover:bg-[#faf7f2] hover:text-stone-900 font-medium'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {isSelected && (
                                <Check className="w-3.5 h-3.5 text-[#ea661c] stroke-[2.5]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Message / Special Requirements */}
                  <div>
                    <textarea
                      rows={3}
                      placeholder={formConfig.message_placeholder}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#dfd5c8] text-xs sm:text-sm focus:outline-none focus:border-[#ea661c] focus:ring-1 focus:ring-[#ea661c] bg-white text-stone-800 placeholder:text-stone-400 resize-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-2.5 sm:py-3 rounded-full bg-[#ea661c] hover:bg-[#d55813] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>{formConfig.button_text}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Tall Vertical Banner matching Screenshot */}
            <div className="relative w-full h-[460px] sm:h-[520px] rounded-2xl overflow-hidden shadow-md border border-[#ede3d7]">
              <Image
                src={packageData.sidebar_banner || '/packages/package-details-banner.webp'}
                alt="Dubai Desert Safari Tour Banner"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
