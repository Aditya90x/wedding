"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Sparkles from "../Sparkles";

export default function Scene10Engagement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
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
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8 }
      )
      .fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef} data-scene="9"
      className="relative w-full h-screen overflow-hidden bg-zinc-950 flex flex-col items-center justify-center p-6 border-b border-royal-gold-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/scene10_engagement.png"
          alt="Ring Exchange Ceremony"
          fill
          style={{ objectFit: "cover", objectPosition: "top", opacity: 0.25 }}
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Floating Sparkles */}
      <Sparkles count={10} />
      {/* Animated Fireworks (Framer Motion) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {mounted && Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: 20 + i * 20 + "%",
              top: 15 + (i % 2) * 15 + "%",
            }}
          >
            {/* Spark burst */}
            {Array.from({ length: 12 }).map((_, j) => (
              <motion.div
                key={j}
                className="absolute w-2px h-8"
                style={{
                  transformOrigin: "bottom center",
                  rotate: j * 30 + "deg",
                  backgroundImage: "linear-gradient(to top, var(--royal-gold), #fde047)"
                }}
                animate={{
                  y: [-10, -80],
                  scaleY: [0.2, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.7 + j * 0.05,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Content */}
      <div ref={titleRef} className="relative z-20 text-center mb-8">
        <span className="text-10px tracking-30pct text-champagne-gold uppercase font-semibold block mb-2">
          The Ceremony of Promises
        </span>
        <h2 className="text-4xl md-text-5xl text-ivory-white font-serif font-light">
          Ring Exchange Ceremony
        </h2>
        <div className="w-16 h-1px bg-royal-gold mx-auto mt-4" />
      </div>

      {/* Invitation Card Details & Photo Container */}
      <div className="relative z-20 flex flex-col md-flex-row gap-6 md-gap-12 justify-center items-center w-full max-w-4xl px-4">
        {/* Event Photo Frame */}
        <div className="w-280 md-w-300 h-360 bg-frame-dark border-6px border-royal-gold rounded shadow-2xl p-2 flex flex-col justify-between gold-glow-card" style={{ transform: "rotate(1.5deg)", width: "260px" }}>
          <div className="relative w-full h-85pct bg-zinc-900 border border-black overflow-hidden" style={{ position: "relative" }}>
            <Image
              src="/images/scene10_engagement.png"
              alt="Engagement Ceremony"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              sizes="(max-width: 768px) 240px, 300px"
              loading="lazy"
            />
          </div>
          <span className="text-10px tracking-widest text-royal-gold text-center block mt-1 uppercase font-bold">
            The Promise of Forever
          </span>
        </div>

        {/* Card Details */}
        <div
          ref={cardRef}
          className="w-full max-w-420 bg-black/80 border border-royal-gold-40 rounded-xl p-8 shadow-2xl text-center flex flex-col gap-6 gold-glow-card"
        >
          <p className="script-text text-3xl text-royal-gold">
            Bound Forever
          </p>

          <p className="text-xs text-champagne-gold opacity-70 leading-relaxed max-w-xs mx-auto">
            Two rings, two hearts, and a promise of forever. Join us as we officially announce our love and pledge our futures.
          </p>

          <div className="flex flex-col gap-3 text-sm text-champagne-gold">
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="opacity-60">Date:</span>
              <span className="font-semibold text-ivory-white">Dec 15, 2026</span>
            </div>
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="opacity-60">Time:</span>
              <span className="font-semibold text-ivory-white">06:00 PM Onwards</span>
            </div>
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="opacity-60">Dress Code:</span>
              <span className="font-semibold text-royal-gold">Formal Royal / Tuxedos</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="opacity-60 text-xs">Venue:</span>
              <span className="font-semibold text-ivory-white text-left text-xs leading-relaxed">
                Palace Terrace overlooking Lake Pichola, Udaipur
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




