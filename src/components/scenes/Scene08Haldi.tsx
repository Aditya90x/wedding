"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Sparkles from "../Sparkles";

export default function Scene08Haldi() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const photoFrame1Ref = useRef<HTMLDivElement>(null);
  const photoFrame2Ref = useRef<HTMLDivElement>(null);
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
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8 }
      )
      .fromTo(
        photoFrame1Ref.current,
        { x: -50, opacity: 0, rotate: -20 },
        { x: 0, opacity: 1, rotate: -6, duration: 1, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        photoFrame2Ref.current,
        { x: 50, opacity: 0, rotate: 20 },
        { x: 0, opacity: 1, rotate: 8, duration: 1, ease: "power3.out" },
        "-=0.7"
      )
      .fromTo(
        cardRef.current,
        { opacity: 0, rotateX: 45 },
        { opacity: 1, rotateX: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef} data-scene="7"
      className="relative w-full h-screen overflow-hidden bg-[#0f0a02] flex flex-col items-center justify-center p-6 border-b border-royal-gold-20"
      style={{ perspective: "1000px" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/scene08_haldi.png"
          alt="Haldi Ceremony"
          fill
          style={{ objectFit: "cover", objectPosition: "top", opacity: 0.55 }}
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/80" />
      </div>

      {/* Floating Sparkles */}
      <Sparkles count={12} />
      {/* Falling Yellow Petals (Framer Motion) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {mounted && Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full opacity-80"
            style={{
              width: Math.random() * 10 + 5 + "px",
              height: Math.random() * 10 + 5 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * -10 + "%",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: ["0vw", (Math.random() > 0.5 ? 15 : -15) + "vw"],
              rotate: [0, 360],
              opacity: [0, 0.9, 0],
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

      {/* Decorative Traditional Border Rings */}
      <div
        className="absolute w-90vw h-90vw border border-white/10 rounded-full pointer-events-none animate-spin"
        style={{ animationDuration: '30s', maxWidth: "600px", maxHeight: "600px" }}
      />
      <div
        className="absolute w-80vw h-80vw border border-white/5 rounded-full pointer-events-none animate-spin"
        style={{ animationDuration: '20s', animationDirection: 'reverse', maxWidth: "500px", maxHeight: "500px" }}
      />

      {/* Content */}
      <div ref={titleRef} className="relative z-20 text-center mb-8">
        <span className="text-10px tracking-30pct text-champagne-gold uppercase font-semibold block mb-2">
          Second Festive Ceremony
        </span>
        <h2 className="text-4xl md-text-5xl text-ivory-white font-serif font-light">
          Haldi Ceremony
        </h2>
        <div className="w-16 h-1px bg-royal-gold mx-auto mt-4" style={{ opacity: 0.4 }} />
      </div>

      {/* Invitation Card Details & Photo Container */}
      <div className="relative z-20 flex flex-col md-flex-row gap-6 md-gap-12 justify-center items-center w-full max-w-4xl px-4">
        {/* Event Photo Container (Dual Overlapping Frames) */}
        <div className="relative w-280 md-w-320 h-380 flex items-center justify-center pointer-events-none" style={{ width: "280px", height: "380px" }}>
          {/* Back Frame ( Haldi Texture Detail ) */}
          <div
            ref={photoFrame1Ref}
            className="absolute w-200 h-280 bg-frame-dark border-6px border-royal-gold rounded shadow-xl p-2 flex flex-col justify-between gold-glow-card pointer-events-auto"
            style={{
              transform: "rotate(-6deg) translate(-15px, -15px)",
              width: "200px",
              height: "280px",
              zIndex: 10,
            }}
          >
            <div className="relative w-full h-85pct bg-zinc-900 border border-black overflow-hidden">
              <Image
                src="/images/scene08_haldi.png"
                alt="Haldi Ceremony Background Texture"
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                sizes="200px"
                loading="lazy"
              />
            </div>
            <span className="text-9px tracking-widest text-royal-gold text-center block mt-1 uppercase font-bold">
              Golden Turmeric
            </span>
          </div>

          {/* Front Frame ( Couple Haldi Portrait ) */}
          <div
            ref={photoFrame2Ref}
            className="absolute w-200 h-280 bg-frame-dark border-6px border-royal-gold rounded shadow-2xl p-2 flex flex-col justify-between gold-glow-card pointer-events-auto"
            style={{
              transform: "rotate(8deg) translate(15px, 15px)",
              width: "200px",
              height: "280px",
              zIndex: 20,
            }}
          >
            <div className="relative w-full h-85pct bg-zinc-900 border border-black overflow-hidden">
              <Image
                src="/images/scene08_haldi_photo.png"
                alt="Turmeric Glow & Blessings"
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                sizes="200px"
                loading="lazy"
              />
            </div>
            <span className="text-9px tracking-widest text-royal-gold text-center block mt-1 uppercase font-bold">
              Haldi Blessings
            </span>
          </div>
        </div>

        {/* Card Details */}
        <div
          ref={cardRef}
          className="w-full max-w-420 bg-black/75 border border-white/10 rounded-xl p-8 shadow-2xl text-center flex flex-col gap-6 gold-glow-card"
        >
          <p className="script-text text-3xl text-amber-400">
            Shades of Sunshine &amp; Blessings
          </p>

          <p className="text-xs text-amber-100-70 leading-relaxed max-w-xs mx-auto">
            Drench us in love, laughter, and a touch of golden turmeric as we prepare for the sacred vows.
          </p>

          <div className="flex flex-col gap-3 text-sm text-white">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-amber-300-60">Date:</span>
              <span className="font-semibold">Dec 17, 2026</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-amber-300-60">Time:</span>
              <span className="font-semibold">09:00 AM Onwards</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-amber-300-60">Dress Code:</span>
              <span className="font-semibold text-yellow-400">Traditional Yellow / Mustard</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-amber-300-60 text-xs">Venue:</span>
              <span className="font-semibold text-left text-xs leading-relaxed">
                Palace Courtyard Pool, Jag Mandir, Udaipur
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




