"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Sparkles from "../Sparkles";

export default function Scene13Reception() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
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

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(
        photoRef.current,
        { x: -50, opacity: 0, rotate: -3 },
        { x: 0, opacity: 1, rotate: 1.5, duration: 1, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        cardRef.current,
        { scale: 0.95, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef} data-scene="12"
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-zinc-900 flex flex-col items-center justify-center p-6 border-b border-royal-gold-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/scene13_reception.png"
          alt="Wedding Reception"
          fill
          style={{ objectFit: "cover", objectPosition: "top", opacity: 0.25 }}
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Floating Sparkles */}
      <Sparkles count={12} />
      
      {/* Decorative Hanging Crystals/Chandeliers (SVG) */}
      <div className="absolute top-0 inset-x-0 h-48 flex justify-around pointer-events-none opacity-30 z-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <svg key={i} width="60" height="200" viewBox="0 0 60 200" stroke="var(--royal-gold)" fill="none">
            <line x1="30" y1="0" x2="30" y2="80" strokeWidth="1.5" />
            {/* Chandelier Tier 1 */}
            <path d="M10 80 Q30 110 50 80" strokeWidth="2" />
            <path d="M20 100 Q30 120 40 100" strokeWidth="1.5" />
            {/* Hanging crystal drops */}
            <circle cx="10" cy="85" r="2" fill="var(--royal-gold)" />
            <circle cx="20" cy="105" r="2" fill="var(--royal-gold)" />
            <circle cx="30" cy="125" r="3" fill="var(--royal-gold)" />
            <circle cx="40" cy="105" r="2" fill="var(--royal-gold)" />
            <circle cx="50" cy="85" r="2" fill="var(--royal-gold)" />
          </svg>
        ))}
      </div>

      {/* Floating Sparkles (Framer Motion) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {mounted && Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3px h-3px bg-yellow-100 rounded-full"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              scale: [0, 1.8, 0],
              opacity: [0, 0.9, 0],
              y: [0, -40],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content Header */}
      <div ref={titleRef} className="relative z-20 text-center mb-8">
        <span className="text-10px tracking-30pct text-champagne-gold uppercase font-semibold block mb-2">
          The Celebration Continues
        </span>
        <h2 className="text-4xl md:text-5xl text-ivory-white font-serif font-light">
          Wedding Reception
        </h2>
        <div className="w-16 h-1px bg-royal-gold mx-auto mt-4" />
      </div>

      {/* Invitation Card Details & Photo Container */}
      <div className="relative z-20 flex flex-col md-flex-row gap-6 md-gap-12 justify-center items-center w-full max-w-4xl px-4">
        {/* Event Photo Frame */}
        <div 
          ref={photoRef}
          className="w-280 md-w-300 h-360 bg-frame-dark border-6px border-royal-gold rounded shadow-2xl p-2 flex flex-col justify-between gold-glow-card" 
          style={{ transform: "rotate(1.5deg)", width: "260px" }}
        >
          <div className="relative w-full h-85pct bg-zinc-900 border border-black overflow-hidden">
            <Image
              src="/images/scene13_reception.png"
              alt="Reception Hall Dinner"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              sizes="(max-width: 768px) 240px, 300px"
              loading="lazy"
            />
          </div>
          <span className="text-10px tracking-widest text-royal-gold text-center block mt-1 uppercase font-bold">
            Cheers to the New Beginnings
          </span>
        </div>

        {/* Details Card */}
        <div
          ref={cardRef}
          className="w-full max-w-420 bg-black/75 border border-royal-gold-40 rounded-xl p-8 shadow-card-heavy text-center flex flex-col gap-6 gold-glow-card"
        >
          <p className="script-text text-3xl text-royal-gold">
            An Evening of Toast &amp; Cheer
          </p>

          <p className="text-xs text-champagne-gold opacity-70 leading-relaxed max-w-xs mx-auto">
            Raise a glass with us as we celebrate the newlyweds in a night filled with gourmet dining, toasts, and music.
          </p>

          <div className="flex flex-col gap-3 text-sm text-champagne-gold">
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="opacity-60">Date:</span>
              <span className="font-semibold text-ivory-white">Dec 19, 2026</span>
            </div>
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="opacity-60">Time:</span>
              <span className="font-semibold text-ivory-white">08:00 PM Onwards</span>
            </div>
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="opacity-60">Dress Code:</span>
              <span className="font-semibold text-royal-gold">Western Formals / Evening Gowns</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="opacity-60 text-xs">Venue:</span>
              <span className="font-semibold text-ivory-white text-left text-xs leading-relaxed">
                Grand Palace Gardens, Jag Mandir Palace, Udaipur
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




