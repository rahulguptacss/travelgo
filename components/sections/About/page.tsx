'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { AboutProps } from '../../types';
import ScriptEyebrow from '../../ui/ScriptEyebrow';

export default function About({ data, showButton = false }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const leftImgInnerRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const rightImgInnerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Entrance timeline when About section scrolls into viewport
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      entranceTl
        // Eyebrow enters smoothly
        .fromTo(
          eyebrowRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 }
        )
        // Title smoothly glides up
        .fromTo(
          titleRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        // Mountain divider reveals outward
        .fromTo(
          dividerRef.current,
          { scaleX: 0.7, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.7 },
          '-=0.5'
        )
        // Description paragraph fades up softly
        .fromTo(
          textRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.5'
        )
        // Photo cards float up smoothly
        .fromTo(
          [leftCardRef.current, rightCardRef.current],
          { y: 40, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.15 },
          '-=0.4'
        );

      // 2. Desktop Specific Parallax (>= 1024px)
      mm.add('(min-width: 1024px)', () => {
        // Left image inner subtle vertical parallax
        gsap.fromTo(
          leftImgInnerRef.current,
          { yPercent: -5, scale: 1.06 },
          {
            yPercent: 5,
            scale: 1.01,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.4,
            },
          }
        );

        // Right image inner subtle vertical parallax
        gsap.fromTo(
          rightImgInnerRef.current,
          { yPercent: 5, scale: 1.06 },
          {
            yPercent: -5,
            scale: 1.01,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.4,
            },
          }
        );

        // Counter-parallax between cards for dynamic depth
        gsap.to(leftCardRef.current, {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        gsap.to(rightCardRef.current, {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });

      // 3. Mobile/Tablet Parallax (< 1024px) - Subtle scale scrub without vertical misalignment
      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          [leftImgInnerRef.current, rightImgInnerRef.current],
          { scale: 1.04 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-white py-6 sm:py-8 lg:py-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-6 lg:gap-8 xl:gap-12 items-start">
          {/* Center Column: Text Content (ORDER 1 on mobile, CENTER on desktop) */}
          <div className="col-span-2 lg:col-span-4 order-1 lg:order-2 flex flex-col items-center text-center px-1 sm:px-4 lg:pt-6 xl:pt-8 mb-5 sm:mb-7 lg:mb-0">
            {/* Script Eyebrow with airplane, loop-de-loop trail and map pin */}
            <div ref={eyebrowRef} className="will-change-transform">
              <ScriptEyebrow text={data.script_eyebrow} variant="flight" align="center" />
            </div>

            {/* Main Heading with responsive wrapping */}
            <h2
              ref={titleRef}
              className="font-serif text-2xl sm:text-[28px] lg:text-[34px] font-bold leading-[1.2] mt-0.5 sm:mt-1 mb-2 sm:mb-2.5 will-change-transform"
            >
              <span className="text-[#30170a] inline sm:block">{data.title_regular} </span>
              <span className="text-[#c7792e] inline sm:block mt-0 sm:mt-0.5">{data.title_highlight}</span>
            </h2>

            {/* Mountain Divider with horizontal lines and snow-capped peaks */}
            <div
              ref={dividerRef}
              className="flex items-center justify-center gap-2.5 sm:gap-3 w-full my-2 sm:my-3.5 origin-center will-change-transform"
            >
              <span className="h-[1.5px] w-10 sm:w-14 sm:w-16 bg-[#8a684b]/70" />
              <svg
                width="34"
                height="16"
                viewBox="0 0 34 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="select-none"
              >
                <path d="M 0 16 L 8 5 L 12 10 L 18 0 L 24 8 L 27 5 L 34 16 Z" fill="#361a0c" />
                <path d="M 18 0 L 20 4 L 18.5 3.5 L 17 4.5 L 16 3.5 Z" fill="#ffffff" />
                <path d="M 8 5 L 9.5 8 L 8.5 7.5 L 7 8 L 6.5 7 Z" fill="#ffffff" />
                <path d="M 27 5 L 28.5 8 L 27.5 7.5 L 26.5 8 Z" fill="#ffffff" />
              </svg>
              <span className="h-[1.5px] w-10 sm:w-14 sm:w-16 bg-[#8a684b]/70" />
            </div>

            {/* Paragraph Text */}
            <div
              ref={textRef}
              className="text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-relaxed text-[#5c534c] font-normal max-w-[420px] text-center will-change-transform"
            >
              {data.description_paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {showButton && data.button_text && data.button_link && (
              <div className="mt-5 sm:mt-7">
                <a
                  href={data.button_link}
                  className="btn-orange px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm tracking-wide"
                >
                  {data.button_text}
                </a>
              </div>
            )}
          </div>

          {/* Left Column: Group of Friends in Desert (ORDER 2 on mobile: Left side-by-side card; LEFT on desktop) */}
          <div
            ref={leftCardRef}
            className="col-span-1 lg:col-span-4 order-2 lg:order-1 flex justify-center lg:justify-end pt-3 sm:pt-6 lg:pt-10 xl:pt-12 will-change-transform"
          >
            <div className="relative w-full max-w-[280px] lg:max-w-[325px] aspect-[301/466] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-md group">
              <div
                ref={leftImgInnerRef}
                className="relative w-full h-full will-change-transform transform-gpu"
              >
                <Image
                  src={data.image_main}
                  alt={data.image_main_alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 50vw, 340px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Woman Sitting with Camel (ORDER 3 on mobile: Right side-by-side card; RIGHT on desktop) */}
          <div
            ref={rightCardRef}
            className="col-span-1 lg:col-span-4 order-3 lg:order-3 flex justify-center lg:justify-start pt-0 will-change-transform"
          >
            <div className="relative w-full max-w-[280px] lg:max-w-[325px] aspect-[301/466] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-md group">
              <div
                ref={rightImgInnerRef}
                className="relative w-full h-full will-change-transform transform-gpu"
              >
                <Image
                  src={data.image_secondary}
                  alt={data.image_secondary_alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 50vw, 340px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
