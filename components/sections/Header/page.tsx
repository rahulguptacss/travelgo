'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import type { HeaderProps, NavItem } from '../../types';

export default function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const [openSubDropdowns, setOpenSubDropdowns] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setIsScrolled((prev) => {
            // Hysteresis deadband: trigger sticky at > 50px, exit at < 15px
            if (!prev && y > 50) return true;
            if (prev && y < 15) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdowns({});
    setOpenSubDropdowns({});
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isItemOrChildActive = (item: NavItem): boolean => {
    if (isActive(item.href)) return true;
    if (item.children && item.children.length > 0) {
      return item.children.some((child) => isItemOrChildActive(child));
    }
    return false;
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleSubDropdown = (name: string) => {
    setOpenSubDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-[background-color,box-shadow,border-color,padding] duration-300 ease-out will-change-[transform] ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-1 sm:py-1.5'
          : 'bg-white py-1.5 sm:py-2 border-b border-[#f0eae4]'
      }`}
    >
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between">
          {/* 1. Large Logo Size in normal state; smoothly compacts on sticky scroll */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Link
              href="/"
              className={`relative block shrink-0 transition-[height,width] duration-300 ease-out ${
                isScrolled
                  ? 'h-10 sm:h-11 lg:h-[50px] w-38 sm:w-44 lg:w-50'
                  : 'h-12 sm:h-14 lg:h-[60px] w-44 sm:w-52 lg:w-60'
              }`}
            >
              <Image
                src={data.logo}
                alt={data.logo_text}
                fill
                priority
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                className="object-contain object-left"
              />
            </Link>
          </motion.div>

          {/* 2. Desktop Navigation with Multi-Level Dropdown Support */}
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05, delayChildren: 0.1 },
              },
            }}
            className="hidden lg:flex items-center space-x-6 xl:space-x-8"
          >
            {data.links.map((link) => {
              const hasChildren = !!(link.children && link.children.length > 0);
              const active = isItemOrChildActive(link);

              return (
                <motion.div
                  key={link.name}
                  variants={{
                    hidden: { opacity: 0, y: -8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className="flex items-center gap-0.5">
                    <Link
                      href={link.href}
                      className={`group/link relative text-[15px] font-medium transition-colors duration-200 py-1 px-0.5 inline-flex items-center gap-1 ${
                        active
                          ? 'text-[#c66e2c] font-semibold'
                          : 'text-[#473a32] hover:text-[#c66e2c]'
                      }`}
                    >
                      <span>{link.name}</span>
                      {/* Underline animation on hover and active */}
                      <span
                        className={`absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-[#e86016] to-[#c66e2c] rounded-full transition-all duration-300 ease-out ${
                          active ? 'w-full' : 'w-0 group-hover/link:w-full'
                        }`}
                      />
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        aria-label={`Open ${link.name} menu`}
                        className="p-0.5 text-[#473a32] group-hover:text-[#c66e2c] transition-colors"
                      >
                        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                      </button>
                    )}
                  </div>

                  {/* Level 1 Dropdown */}
                  {hasChildren && (
                    <div className="absolute top-full left-0 pt-2 z-50 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none group-hover:pointer-events-auto">
                      <div className="bg-white rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-[#ede5dd] py-2 min-w-[220px]">
                        {link.children!.map((child) => {
                          const hasSubChildren = !!(child.children && child.children.length > 0);
                          const childActive = isItemOrChildActive(child);

                          return (
                            <div key={child.name} className="relative group/sub">
                              <Link
                                href={child.href}
                                className={`flex items-center justify-between px-3.5 py-2 mx-1.5 rounded-lg text-sm transition-colors ${
                                  childActive
                                    ? 'bg-[#fef4ed] text-[#c66e2c] font-semibold'
                                    : 'text-[#473a32] hover:bg-[#faf6f3] hover:text-[#c66e2c] font-medium'
                                }`}
                              >
                                <span>{child.name}</span>
                                {hasSubChildren && (
                                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover/sub:text-[#c66e2c] group-hover/sub:translate-x-0.5 transition-all ml-2 shrink-0" />
                                )}
                              </Link>

                              {/* Level 2 Dropdown (Dropdown ke andar dropdown) */}
                              {hasSubChildren && (
                                <div className="absolute left-full top-0 pl-1 z-50 invisible opacity-0 translate-x-1 group-hover/sub:visible group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all duration-200 ease-out pointer-events-none group-hover/sub:pointer-events-auto">
                                  <div className="bg-white rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-[#ede5dd] py-2 min-w-[200px]">
                                    {child.children!.map((subChild) => {
                                      const subActive = isActive(subChild.href);
                                      return (
                                        <Link
                                          key={subChild.name}
                                          href={subChild.href}
                                          className={`flex items-center px-3.5 py-2 mx-1.5 rounded-lg text-sm transition-colors ${
                                            subActive
                                              ? 'bg-[#fef4ed] text-[#c66e2c] font-semibold'
                                              : 'text-[#473a32] hover:bg-[#faf6f3] hover:text-[#c66e2c] font-medium'
                                          }`}
                                        >
                                          <span>{subChild.name}</span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Right Action: Divider + Animated Enquiry Button */}
          <div className="hidden lg:flex items-center">
            <div
              className={`w-px bg-[#d8cec5] mx-4 xl:mx-5 transition-[height] duration-300 ${
                isScrolled ? 'h-4' : 'h-5'
              }`}
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link
                href={data.button_link}
                className={`btn-orange shadow-sm tracking-wide group transition-[padding,font-size] duration-300 ${
                  isScrolled
                    ? 'px-4 py-1.5 text-[13px]'
                    : 'px-5 py-2 text-[14px]'
                }`}
              >
                <Send className="w-3.5 h-3.5 rotate-45 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span>{data.button_text}</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button with Motion */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href={data.button_link}
              className="btn-orange px-3.5 py-1.5 text-xs"
            >
              <Send className="w-3 h-3 rotate-45" />
              <span>{data.button_text}</span>
            </Link>
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#473a32] hover:text-[#e86016] transition-colors rounded-lg"
              aria-label={data.menu_aria_label}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Animated Mobile Drawer with Nested Dropdown Accordions */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden lg:hidden border-t border-[#f0eae4] bg-white shadow-xl"
          >
            <div className="px-4 pt-3 pb-6 flex flex-col space-y-1.5">
              {data.links.map((link, idx) => {
                const hasChildren = !!(link.children && link.children.length > 0);
                const isExpanded = !!openDropdowns[link.name];
                const active = isItemOrChildActive(link);

                if (!hasChildren) {
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                          active
                            ? 'bg-[#fef4ed] text-[#c66e2c] font-semibold'
                            : 'text-[#473a32] hover:bg-stone-50 hover:text-[#c66e2c]'
                        }`}
                      >
                        <span>{link.name}</span>
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-all ${
                            active ? 'bg-[#c66e2c]' : 'bg-transparent group-hover:bg-[#c66e2c]'
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="rounded-lg overflow-hidden"
                  >
                    <div
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                        active
                          ? 'bg-[#fef4ed] text-[#c66e2c] font-semibold'
                          : 'text-[#473a32] hover:bg-stone-50 hover:text-[#c66e2c]'
                      }`}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex-1"
                      >
                        {link.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleDropdown(link.name)}
                        className="p-1 text-[#473a32] hover:text-[#e86016] transition-colors"
                        aria-label={`Toggle ${link.name} submenu`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-[#e86016]' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Mobile Level 1 Accordion */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-4 pr-1 py-1 space-y-1 border-l-2 border-[#f0eae4] ml-3 mt-1"
                        >
                          {link.children!.map((child) => {
                            const hasSub = !!(child.children && child.children.length > 0);
                            const isSubExpanded = !!openSubDropdowns[child.name];
                            const childActive = isItemOrChildActive(child);

                            if (!hasSub) {
                              return (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                                    childActive
                                      ? 'text-[#c66e2c] font-semibold bg-[#fff3ea]'
                                      : 'text-[#5a4e44] hover:text-[#c66e2c]'
                                  }`}
                                >
                                  {child.name}
                                </Link>
                              );
                            }

                            return (
                              <div key={child.name} className="space-y-1">
                                <div
                                  className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                                    childActive
                                      ? 'text-[#c66e2c] font-semibold bg-[#fff3ea]'
                                      : 'text-[#5a4e44] hover:text-[#c66e2c]'
                                  }`}
                                >
                                  <Link
                                    href={child.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex-1"
                                  >
                                    {child.name}
                                  </Link>
                                  <button
                                    type="button"
                                    onClick={() => toggleSubDropdown(child.name)}
                                    className="p-1 text-[#5a4e44] hover:text-[#e86016] transition-colors"
                                    aria-label={`Toggle ${child.name} submenu`}
                                  >
                                    <ChevronDown
                                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                        isSubExpanded ? 'rotate-180 text-[#e86016]' : ''
                                      }`}
                                    />
                                  </button>
                                </div>

                                {/* Mobile Level 2 Accordion */}
                                <AnimatePresence>
                                  {isSubExpanded && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden pl-4 pr-1 py-1 space-y-1 border-l-2 border-[#faece1] ml-3"
                                    >
                                      {child.children!.map((subChild) => {
                                        const subActive = isActive(subChild.href);
                                        return (
                                          <Link
                                            key={subChild.name}
                                            href={subChild.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`block px-3 py-1.5 rounded-md text-xs transition-colors ${
                                              subActive
                                                ? 'text-[#c66e2c] font-semibold bg-[#fff3ea]'
                                                : 'text-[#6b5f54] hover:text-[#c66e2c]'
                                            }`}
                                          >
                                            {subChild.name}
                                          </Link>
                                        );
                                      })}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
