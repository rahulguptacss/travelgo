'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FaqProps } from '../../types';

export default function Faq({ data }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!data) return null;

  return (
    <section className="relative w-full bg-[#fdfaf7] pt-4 sm:pt-5 lg:pt-6 pb-14 sm:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Eyebrow, Heading & Subtitle matching Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4 sm:mb-5 lg:mb-6"
        >
          {/* Script Eyebrow with horizontal orange lines */}
          {data.script_eyebrow && (
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-1">
              <span className="h-[1px] w-10 sm:w-14 bg-[#ea661c]" />
              <span className="font-script text-xl sm:text-[28px] text-[#ea661c] font-bold select-none leading-none">
                {data.script_eyebrow}
              </span>
              <span className="h-[1px] w-10 sm:w-14 bg-[#ea661c]" />
            </div>
          )}

          {/* Serif Heading matching screenshot */}
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight text-[#1f2937] tracking-tight mt-0.5 mb-1.5">
            <span>{data.title_regular} </span>
            <span className="text-[#ea661c]">{data.title_highlight}</span>
          </h2>

          {/* Subtitle with soft line break */}
          <p className="text-xs sm:text-[14px] leading-relaxed text-[#685c52] max-w-2xl mx-auto px-2 mt-1 whitespace-pre-line">
            {data.description}
          </p>
        </motion.div>

        {/* Animated Accordion List */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
          className="space-y-3 sm:space-y-3.5"
        >
          {data.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#ea661c]/40 bg-white shadow-[0_6px_24px_rgba(234,102,28,0.08)] ring-1 ring-[#ea661c]/15'
                    : 'border-[#ede5dd] bg-white hover:border-[#ea661c]/30 shadow-xs hover:shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left group cursor-pointer select-none transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 pr-3">
                    <span
                      className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                        isOpen
                          ? 'bg-[#ea661c] text-white shadow-xs'
                          : 'bg-[#f7efe7] text-[#8c674b] group-hover:bg-[#ea661c] group-hover:text-white'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={`font-heading text-sm sm:text-[16px] font-bold transition-colors duration-200 ${
                        isOpen
                          ? 'text-[#ea661c]'
                          : 'text-[#26160d] group-hover:text-[#ea661c]'
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isOpen
                        ? 'bg-[#ea661c] text-white shadow-xs'
                        : 'bg-[#f7efe7] text-[#8c674b] group-hover:bg-[#ea661c] group-hover:text-white'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-[14px] text-[#5c544d] leading-relaxed border-t border-[#f4ede6]">
                        <p className="pl-10 sm:pl-11">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
