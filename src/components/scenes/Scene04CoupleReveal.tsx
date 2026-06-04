"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";
import Sparkles from "../Sparkles";

export default function Scene04CoupleReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const groomCardRef = useRef<HTMLDivElement>(null);
  const brideCardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
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

      // Animate Groom card from left, Bride card from right (overlapping/revealing)
      tl.fromTo(
        groomCardRef.current,
        { x: "-120%", opacity: 0, rotate: -5 },
        { x: "0%", opacity: 1, rotate: 0, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(
        brideCardRef.current,
        { x: "120%", opacity: 0, rotate: 5 },
        { x: "0%", opacity: 1, rotate: 0, duration: 1.2, ease: "power3.out" },
        "<" // start simultaneously
      )
      .fromTo(
        textRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef} data-scene="3"
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center p-4 border-b border-royal-gold-20"
    >
      {/* Background Palace Courtyard */}
      <div className="absolute inset-0 w-full h-full" style={{ position: "absolute" }}>
        <Image
          src="/images/scene04_courtyard.png"
          alt="Palace Courtyard"
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      {/* Floating Sparkles */}
      <Sparkles count={12} />

      {/* Floating Rose Petals (Framer Motion) */}
      {mounted && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-br from-red-600 to-rose-800 rounded-full opacity-70"
              style={{
                width: Math.random() * 12 + 6 + "px",
                height: Math.random() * 8 + 4 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * -10 + "%",
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: ["0vw", (Math.random() > 0.5 ? 20 : -20) + "vw"],
                rotate: [0, 360],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>
      )}

      {/* Middle Text: The Union */}
      <div ref={textRef} className="relative z-30 mb-8 text-center px-4">
        <span className="text-xs md-text-sm tracking-25pct text-royal-gold uppercase font-semibold block mb-2">
          Presenting The Beautiful Couple
        </span>
        <h3 className="text-3xl md-text-4xl text-ivory-white tracking-wide">
          Met by Chance, Bound by Love
        </h3>
        <div className="w-24 h-1px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
      </div>

      {/* Cards Container */}
      <div className="relative z-30 flex flex-col md-flex-row gap-8 justify-center items-center w-full max-w-4xl px-4">
        {/* Groom Card */}
        <div
          ref={groomCardRef}
          className="bg-zinc-900 border-2 border-royal-gold rounded shadow-2xl p-4 flex flex-col items-center justify-between gold-glow-card"
          style={{ width: "260px", height: "400px" }}
        >
          {/* Ornate Inner Border */}
          <div className="w-full h-full border border-royal-gold-30 p-2 flex flex-col justify-between items-center relative">
            <div className="relative w-full h-65pct rounded overflow-hidden border border-royal-gold-40 bg-zinc-900" style={{ position: "relative" }}>
              <Image
                src="/images/groom_portrait.png"
                alt="Groom Rohan"
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                sizes="240px"
              />
            </div>
            
            <div className="text-center w-full flex flex-col items-center mt-2">
              <span className="text-10px tracking-widest text-royal-gold uppercase">
                The Groom
              </span>
              <h4 className="script-text text-3xl text-champagne-gold mt-1">
                Rohan
              </h4>
              <p className="text-10px text-ivory-white/60 max-w-90pct mt-1 italic">
                A gentleman of grace, vision, and kindness.
              </p>
            </div>
          </div>
        </div>

        {/* Bride Card */}
        <div
          ref={brideCardRef}
          className="bg-zinc-900 border-2 border-royal-gold rounded shadow-2xl p-4 flex flex-col items-center justify-between gold-glow-card"
          style={{ width: "260px", height: "400px" }}
        >
          {/* Ornate Inner Border */}
          <div className="w-full h-full border border-royal-gold-30 p-2 flex flex-col justify-between items-center relative">
            <div className="relative w-full h-65pct rounded overflow-hidden border border-royal-gold-40 bg-zinc-900" style={{ position: "relative" }}>
              <Image
                src="/images/bride_portrait.png"
                alt="Bride Ananya"
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                sizes="240px"
              />
            </div>
            
            <div className="text-center w-full flex flex-col items-center mt-2">
              <span className="text-10px tracking-widest text-royal-gold uppercase">
                The Bride
              </span>
              <h4 className="script-text text-3xl text-champagne-gold mt-1">
                Ananya
              </h4>
              <p className="text-10px text-ivory-white/60 max-w-90pct mt-1 italic">
                A lady of elegance, warmth, and laughter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




