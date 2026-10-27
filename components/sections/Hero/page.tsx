'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { HeroProps } from '../../types';

export default function Hero({ data }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<SVGTextElement>(null);
  const line2Ref = useRef<SVGTextElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin safely on client
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial Cinematic Entrance on Mount
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        line1Ref.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 }
      )
        .fromTo(
          line2Ref.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0 },
          '-=0.75'
        )
        .fromTo(
          imageWrapperRef.current,
          { y: 45, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
          '-=0.8'
        );

      // 2. Smooth ScrollTrigger Animation - Image glides and zooms forward into view with 3D depth
      gsap.fromTo(
        imageInnerRef.current,
        { scale: 1.0, yPercent: 0 },
        {
          scale: 1.12,
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.3, // Silky smooth scroll response
          },
        }
      );

      // 3. Floating Typography Parallax on scroll
      gsap.to(textRef.current, {
        y: -45,
        opacity: 0.35,
        scale: 0.98,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.0,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-white overflow-hidden">
      {/* Accessible SEO Heading */}
      <h1 className="sr-only">
        {data.title_line1} {data.title_line2}
      </h1>

      <div className="relative w-full">
        {/* Exact Typography Presentation matching screenshot with GSAP entrance & scroll parallax */}
        <div
          ref={textRef}
          className="relative z-10 w-full pt-4 sm:pt-6 md:pt-8 px-4 text-center will-change-transform"
        >
          <svg
            viewBox="0 0 1100 290"
            className="w-full max-w-4xl lg:max-w-5xl mx-auto h-auto select-none overflow-visible"
            aria-hidden="true"
          >
            <defs>
              {/* Exact Gradient for Explore: Gold to deep bronze */}
              <linearGradient id="exploreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dfa55b" />
                <stop offset="35%" stopColor="#b87a38" />
                <stop offset="70%" stopColor="#6b3d17" />
                <stop offset="100%" stopColor="#3e2008" />
              </linearGradient>

              {/* Exact Gradient for Safari Dreams: Amber top to pure white bottom */}
              <linearGradient id="safariGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e3a85f" />
                <stop offset="30%" stopColor="#ecc79a" />
                <stop offset="58%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>

              {/* Drop Shadow matching screenshot */}
              <filter id="heroTextShadow" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#351a08" floodOpacity="0.38" />
              </filter>
            </defs>

            {/* Line 1: Explore (from data.json) */}
            <text
              ref={line1Ref}
              x="550"
              y="115"
              textAnchor="middle"
              fill="url(#exploreGrad)"
              stroke="#381c08"
              strokeWidth="3.2"
              strokeLinejoin="round"
              paintOrder="stroke fill"
              filter="url(#heroTextShadow)"
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 800,
                fontSize: '128px',
                letterSpacing: '-0.01em',
              }}
            >
              {data.title_line1}
            </text>

            {/* Line 2: Safari Dreams (from data.json) */}
            <text
              ref={line2Ref}
              x="550"
              y="250"
              textAnchor="middle"
              fill="url(#safariGrad)"
              stroke="#381c08"
              strokeWidth="3.2"
              strokeLinejoin="round"
              paintOrder="stroke fill"
              filter="url(#heroTextShadow)"
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 800,
                fontSize: '122px',
                letterSpacing: '0.01em',
              }}
            >
              {data.title_line2}
            </text>
          </svg>
        </div>

        {/* Full-width Hero Visual with GSAP Smooth Scroll Parallax */}
        <div
          ref={imageWrapperRef}
          className="relative w-full h-[280px] sm:h-[360px] md:h-[460px] lg:h-[540px] xl:h-[600px] -mt-14 sm:-mt-20 md:-mt-28 lg:-mt-32 overflow-hidden will-change-transform"
        >
          <div
            ref={imageInnerRef}
            className="relative w-full h-full will-change-transform transform-gpu"
          >
            <Image
              src={data.image}
              alt={data.image_alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Top white fade allowing clean white backdrop for Explore while revealing clouds across Safari Dreams */}
          <div className="absolute inset-x-0 top-0 h-20 sm:h-28 md:h-36 bg-gradient-to-b from-white via-white/80 via-40% to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
