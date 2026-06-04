"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Sparkles from "../Sparkles";

export default function Scene11Baraat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: true,
          pin: true,
        },
      });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        "-=0.4"
      )
      // Moving procession animation (sliding elements across screen)
      .fromTo(
        bandRef.current,
        { x: "-100%" },
        { x: "100%", duration: 2, ease: "none" },
        "<"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef} data-scene="10"
      className="relative w-full h-screen overflow-hidden bg-navy-blue flex flex-col items-center justify-center p-6 border-b border-royal-gold-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/scene11_baraat.png"
          alt="Baraat Procession"
          fill
          style={{ objectFit: "cover", objectPosition: "top", opacity: 0.25 }}
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Floating Sparkles */}
      <Sparkles count={12} />
      {/* Moving Procession Silhouette Overlay */}
      <div
        ref={bandRef}
        className="absolute bottom-0 w-200pct h-32 opacity-20 pointer-events-none z-10 flex items-end justify-around"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-16 items-end">
            {/* SVG Horse/Procession outline */}
            <svg width="120" height="90" viewBox="0 0 120 90" fill="none" stroke="var(--royal-gold)">
              {/* Horse body outline */}
              <path d="M20 70 Q40 30 70 40 T110 30" strokeWidth="2" />
              <path d="M50 40 L50 85 M65 41 L65 85" strokeWidth="2" strokeLinecap="round" />
              {/* Carriage / Royal decor */}
              <rect x="70" y="20" width="30" height="20" strokeWidth="2" rx="4" />
            </svg>
            <svg width="40" height="80" viewBox="0 0 40 80" fill="none" stroke="var(--royal-gold)">
              {/* Trumpet blower outline */}
              <circle cx="20" cy="20" r="8" strokeWidth="2" />
              <line x1="20" y1="28" x2="20" y2="70" strokeWidth="2" />
              <path d="M20 35 L38 20" strokeWidth="2" />
            </svg>
          </div>
        ))}
      </div>

      {/* Flickering Torches (CSS glow) */}
      <div className="absolute top-12 left-12 w-6 h-6 rounded-full bg-orange-500 animate-ping opacity-20" />
      <div className="absolute top-24 right-16 w-8 h-8 rounded-full bg-orange-500 animate-ping opacity-15" />

      {/* Content */}
      <div ref={titleRef} className="relative z-20 text-center mb-8">
        <span className="text-10px tracking-30pct text-champagne-gold uppercase font-semibold block mb-2">
          The Grand Arrival
        </span>
        <h2 className="text-4xl md-text-5xl text-ivory-white font-serif font-light">
          Baraat Swagat
        </h2>
        <div className="w-16 h-1px bg-royal-gold mx-auto mt-4" />
      </div>

      {/* Invitation Card Details & Photo Container */}
      <div className="relative z-20 flex flex-col md-flex-row gap-6 md-gap-12 justify-center items-center w-full max-w-4xl px-4">
        {/* Event Photo Frame */}
        <div className="w-280 md-w-300 h-360 bg-frame-dark border-6px border-royal-gold rounded shadow-2xl p-2 flex flex-col justify-between gold-glow-card" style={{ transform: "rotate(-2deg)", width: "260px" }}>
          <div className="relative w-full h-85pct bg-zinc-900 border border-black overflow-hidden" style={{ position: "relative" }}>
            <Image
              src="/images/scene11_baraat.png"
              alt="Baraat Swagat"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              sizes="(max-width: 768px) 240px, 300px"
              loading="lazy"
            />
          </div>
          <span className="text-10px tracking-widest text-royal-gold text-center block mt-1 uppercase font-bold">
            The Grand Procession
          </span>
        </div>

        {/* Card Details */}
        <div
          ref={cardRef}
          className="w-full max-w-420 bg-black/75 border border-royal-gold-40 rounded-xl p-8 shadow-2xl text-center flex flex-col gap-6 gold-glow-card"
        >
          <p className="script-text text-3xl text-royal-gold">
            Dhol &amp; Celebrations
          </p>

          <p className="text-xs text-champagne-gold opacity-70 leading-relaxed max-w-xs mx-auto">
            Welcome the groom and his royal procession with beats of dhol, dancing, and grand Indian hospitality.
          </p>

          <div className="flex flex-col gap-3 text-sm text-champagne-gold">
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="opacity-60">Date:</span>
              <span className="font-semibold text-ivory-white">Dec 18, 2026</span>
            </div>
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="opacity-60">Time:</span>
              <span className="font-semibold text-ivory-white">04:00 PM Onwards</span>
            </div>
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="opacity-60">Dress Code:</span>
              <span className="font-semibold text-royal-gold">Traditional Sherwanis / Safas</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="opacity-60 text-xs">Venue:</span>
              <span className="font-semibold text-ivory-white text-left text-xs leading-relaxed">
                Palace Main Gate (Badi Pol), Udaipur
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




