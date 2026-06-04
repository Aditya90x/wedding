"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";
import Sparkles from "../Sparkles";

export default function Scene12GrandWedding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
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
          end: "+=120%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(bgRef.current, {
        scale: 1.15,
        ease: "none",
      })
      .fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "<"
      )
      .fromTo(
        photoRef.current,
        { x: -50, opacity: 0, rotate: -4 },
        { x: 0, opacity: 1, rotate: -1.5, duration: 1, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.95, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef} data-scene="11"
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center p-6 border-b border-royal-gold-20"
    >
      {/* Background Mandap Image with zoom */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ position: "absolute" }}>
        <Image
          src="/images/scene12_mandap.png"
          alt="Grand Wedding Mandap"
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70 z-10" />
      </div>

      {/* Floating Sparkles */}
      <Sparkles count={15} />

      {/* Falling Marigold Petals & Gold Dust (Framer Motion) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {mounted && Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 8 + 4 + "px",
              height: Math.random() * 8 + 4 + "px",
              background: i % 2 === 0 ? "linear-gradient(to right, #F59E0B, #D97706)" : "var(--royal-gold)",
              left: Math.random() * 100 + "%",
              top: Math.random() * -10 + "%",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: ["0vw", (Math.random() > 0.5 ? 15 : -15) + "vw"],
              rotate: [0, 360],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content Header */}
      <div ref={titleRef} className="relative z-30 text-center mb-8">
        <span className="text-10px tracking-30pct text-royal-gold uppercase font-semibold block mb-2">
          The Holy Matrimony
        </span>
        <h2 className="text-4xl md:text-5xl text-ivory-white font-serif">
          Grand Wedding
        </h2>
        <div className="w-20 h-1px bg-royal-gold mx-auto mt-4" />
      </div>

      {/* Invitation Card Details & Photo Container */}
      <div className="relative z-30 flex flex-col md-flex-row gap-6 md-gap-12 justify-center items-center w-full max-w-4xl px-4">
        {/* Event Photo Frame */}
        <div 
          ref={photoRef}
          className="w-280 md-w-300 h-360 bg-frame-dark border-6px border-royal-gold rounded shadow-2xl p-2 flex flex-col justify-between gold-glow-card" 
          style={{ transform: "rotate(-1.5deg)", width: "260px" }}
        >
          <div className="relative w-full h-85pct bg-zinc-900 border border-black overflow-hidden">
            <Image
              src="/images/scene12_mandap.png"
              alt="Mandap Wedding Ceremony"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              sizes="(max-width: 768px) 240px, 300px"
              loading="lazy"
            />
          </div>
          <span className="text-10px tracking-widest text-royal-gold text-center block mt-1 uppercase font-bold">
            The Holy Pheras
          </span>
        </div>

        {/* Wedding Card Details */}
        <div 
          ref={cardRef}
          className="w-full max-w-420 bg-black/75 border border-royal-gold-40 rounded-xl p-8 shadow-card-heavy flex flex-col gap-6 gold-glow-card"
        >
          <p className="script-text text-3-5xl text-royal-gold leading-tight text-center">
            Pheras &amp; Vows
          </p>

          <p className="text-xs text-champagne-gold opacity-80 leading-relaxed text-center">
            Witness the sacred vows, the walk around the holy fire, and the eternal union of Ananya and Rohan.
          </p>

          <div className="flex flex-col gap-3 text-sm text-champagne-gold">
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="opacity-60">Date:</span>
              <span className="font-semibold text-ivory-white">Dec 18, 2026</span>
            </div>
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="opacity-60">Time:</span>
              <span className="font-semibold text-ivory-white">07:00 PM Onwards</span>
            </div>
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="opacity-60">Dress Code:</span>
              <span className="font-semibold text-royal-gold">Royal Traditional Gold / Maroon</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="opacity-60 text-xs">Venue:</span>
              <span className="font-semibold text-ivory-white text-left text-xs leading-relaxed">
                The Mandap Terrace, Jag Mandir Palace, Udaipur
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




