"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const formatted = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Premium Number Card */}
      <div 
        className="relative flex items-center justify-center w-20 h-24 sm:w-24 sm:h-32 rounded-lg"
        style={{
          background: "linear-gradient(135deg, rgba(20,15,10,0.95) 0%, rgba(5,3,0,0.98) 100%)",
          border: "1px solid rgba(212,175,55,0.25)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(212,175,55,0.05)"
        }}
      >
        {/* Subtle inner highlight */}
        <div className="absolute top-0 left-0 w-full h-1/2 rounded-t-lg bg-gradient-to-b from-[rgba(255,255,255,0.03)] to-transparent pointer-events-none" />
        
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight"
            style={{
              color: "#FDFBF7",
              textShadow: "0 2px 10px rgba(212,175,55,0.3)"
            }}
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Elegant Label */}
      <span 
        className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-medium"
        style={{ color: "rgba(212,175,55,0.85)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Scene16aCountdown() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Target Date: January 7, 2027
  const targetDate = new Date("2027-01-07T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 219, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = targetDate - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);

    // GSAP scroll animation
    gsap.registerPlugin(ScrollTrigger);
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
      tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .fromTo(cardRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.4");
    }, containerRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  const units = [
    { value: timeLeft.days,    label: "Days" },
    { value: timeLeft.hours,   label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <section
      ref={containerRef} data-scene="17"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#0a0503]"
    >
      {/* Subtle Premium Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/scene12_mandap.png"
          alt="Premium Background"
          fill
          style={{ objectFit: "cover", objectPosition: "top", filter: "grayscale(30%) contrast(120%)" }}
          sizes="100vw"
          priority={false}
        />
        {/* Luxury dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(10,5,0,0.85) 0%, rgba(5,2,0,0.98) 100%)",
          }}
        />
      </div>

      {/* Minimal Gold Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30" />

      {/* Header Section */}
      <div ref={titleRef} className="relative z-10 text-center mb-16 px-4">
        <span 
          className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-light block mb-6"
          style={{ color: "rgba(212,175,55,0.9)" }}
        >
          Awaiting The Day
        </span>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-light italic"
          style={{
            color: "#FDFBF7",
          }}
        >
          Counting Down
        </h2>
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="w-12 h-px bg-[rgba(212,175,55,0.4)]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[rgba(212,175,55,0.6)]" />
          <div className="w-12 h-px bg-[rgba(212,175,55,0.4)]" />
        </div>
      </div>

      {/* Premium Countdown Units */}
      <div ref={cardRef} className="relative z-10 flex flex-wrap items-center justify-center gap-6 md:gap-10 px-4">
        {units.map((unit, idx) => (
          <div key={unit.label} className="flex items-center gap-6 md:gap-10">
            <CountdownUnit {...unit} />
            {idx < units.length - 1 && (
              <span className="text-2xl sm:text-3xl font-serif font-light opacity-40 -mt-8" style={{ color: "#D4AF37" }}>
                :
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-12 relative z-10 mt-20 text-center">
        <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(253,251,247,0.6)" }}>
          December 18, 2026 <span className="mx-3" style={{ color: "#D4AF37" }}>â—†</span> Udaipur
        </p>
      </div>
    </section>
  );
}


