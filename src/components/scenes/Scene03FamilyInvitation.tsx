"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Sparkles from "../Sparkles";

export default function Scene03FamilyInvitation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
        },
      });

      // Animate scroll scaling/opening and photo slide in
      tl.fromTo(
        scrollRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        photoRef.current,
        { x: -80, opacity: 0, rotate: -5 },
        { x: 0, opacity: 1, rotate: -2, duration: 1, ease: "power3.out" },
        "<"
      )
      .fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef} data-scene="2"
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center p-4 border-b border-royal-gold-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/scene04_courtyard.png"
          alt="Palace Courtyard"
          fill
          style={{ objectFit: "cover", objectPosition: "top", opacity: 0.25 }}
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Floating Sparkles */}
      <Sparkles count={10} />

      {/* Main Container - Stacked on mobile, side-by-side on desktop */}
      <div className="relative z-10 flex flex-col md-flex-row items-center justify-center gap-6 md-gap-12 w-full max-w-4xl px-4">
        
        {/* Photo Card Frame of Palace Courtyard */}
        <div 
          ref={photoRef}
          className="w-280 md-w-300 h-360 bg-frame-dark border-6px border-royal-gold rounded shadow-2xl p-2 flex flex-col justify-between gold-glow-card"
          style={{ width: "260px" }}
        >
          <div className="relative w-full h-85pct bg-zinc-900 border border-black overflow-hidden">
            <Image
              src="/images/scene04_courtyard.png"
              alt="Udaipur Courtyard"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              sizes="(max-width: 768px) 240px, 300px"
              loading="lazy"
            />
          </div>
          <span className="text-10px tracking-widest text-royal-gold text-center block mt-1 uppercase font-bold">
            The Palace Courtyard
          </span>
        </div>

        {/* Royal Scroll */}
        <div
          ref={scrollRef}
          className="relative w-full max-w-500 h-60vh max-h-500 bg-cream border-y-12px border-royal-gold shadow-scroll-heavy flex flex-col items-center justify-center p-6 text-center rounded-[4px] gold-glow-card"
          style={{ transformOrigin: "center top" }}
        >
          {/* Scroll Handles */}
          <div className="absolute top-[-16px] left-1/2 transform -translate-x-1/2 w-105pct h-2 bg-amber-800 rounded-full border border-amber-600 shadow-md" />
          <div className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 w-105pct h-2 bg-amber-800 rounded-full border border-amber-600 shadow-md" />

          {/* Elegant Gold Shimmer Sweep Border */}
          <div className="absolute inset-4 border-2 border-royal-gold rounded opacity-80 pointer-events-none flex items-center justify-center">
            <div className="absolute inset-1 border border-royal-gold-40" />
          </div>

          {/* Scroll Content */}
          <div ref={contentRef} className="relative z-10 flex flex-col items-center gap-3 text-amber-950" style={{ maxWidth: "85%" }}>
            <p className="text-xs tracking-[0.2em] text-amber-800 uppercase font-semibold">
              The Honor of Your Presence
            </p>

            <div className="my-1">
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="stroke-amber-700">
                <path d="M0 10C10 10 10 2 20 2S30 10 40 10" strokeWidth="1.5" />
                <path d="M0 12C10 12 10 18 20 18S30 12 40 12" strokeWidth="1.5" />
              </svg>
            </div>

            <h3 className="text-xl md:text-2xl text-amber-900 leading-snug font-medium">
              We Cordially Invite You to Celebrate the Union of
            </h3>

            <p className="script-text text-3-5xl md:text-4xl text-deep-maroon leading-tight my-2">
              Ananya &amp; Rohan
            </p>

            <p className="text-xs md:text-sm leading-relaxed text-amber-950/90 font-medium max-w-sm">
              Join us in witnessing their journey of love and commitment, as they step into a beautiful new beginning of togetherness.
            </p>

            <div className="w-12 h-1px bg-amber-800/40 my-2" />

            <p className="text-[10px] tracking-[0.15em] text-amber-700 uppercase font-semibold">
              Together With The Families of
            </p>
            <p className="text-xs md:text-sm font-bold text-amber-900">
              Sharma &amp; Goel
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}




