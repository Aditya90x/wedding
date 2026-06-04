"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Sparkles from "../Sparkles";

export default function Scene09Sangeet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const stageLight1 = useRef<HTMLDivElement>(null);
  const stageLight2 = useRef<HTMLDivElement>(null);
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
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(
        cardRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.4"
      );

      // Swing the stage spotlights
      gsap.fromTo(
        stageLight1.current,
        { rotate: -35 },
        { rotate: 15, repeat: -1, yoyo: true, duration: 3.5, ease: "sine.inOut" }
      );
      gsap.fromTo(
        stageLight2.current,
        { rotate: 35 },
        { rotate: -15, repeat: -1, yoyo: true, duration: 4, ease: "sine.inOut" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef} data-scene="8"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center p-6 border-b border-royal-gold-20"
      style={{ backgroundImage: "linear-gradient(to bottom, #02021e, #05053a, #000)" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/scene09_sangeet.png"
          alt="Sangeet Celebration"
          fill
          style={{ objectFit: "cover", objectPosition: "top", opacity: 0.2 }}
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
      </div>

      {/* Floating Sparkles */}
      <Sparkles count={12} />
      
      {/* Spotlight Cones */}
      <div
        ref={stageLight1}
        className="absolute top-0 w-100 h-150vh pointer-events-none blur-15px"
        style={{
          transformOrigin: "top center",
          left: "20%",
          backgroundImage: "linear-gradient(to bottom, rgba(253, 224, 71, 0.3), transparent)"
        }}
      />
      <div
        ref={stageLight2}
        className="absolute top-0 w-100 h-150vh pointer-events-none blur-15px"
        style={{
          transformOrigin: "top center",
          right: "20%",
          backgroundImage: "linear-gradient(to bottom, rgba(253, 224, 71, 0.3), transparent)"
        }}
      />

      {/* Confetti Particles (Framer Motion) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {mounted && Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded"
            style={{
              width: Math.random() * 8 + 4 + "px",
              height: Math.random() * 8 + 4 + "px",
              backgroundColor: ["#D4AF37", "#F7E7CE", "#800000", "#50C878", "#3B82F6"][
                Math.floor(Math.random() * 5)
              ],
              left: Math.random() * 100 + "%",
              top: Math.random() * -10 + "%",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: ["0vw", (Math.random() > 0.5 ? 20 : -20) + "vw"],
              rotate: [0, 720],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div ref={titleRef} className="relative z-20 text-center mb-8">
        <span className="text-10px tracking-30pct text-champagne-gold uppercase font-semibold block mb-2">
          Third Festive Ceremony
        </span>
        <h2 className="text-4xl md-text-5xl text-ivory-white font-serif font-light">
          Sangeet Celebration
        </h2>
        <div className="w-16 h-1px bg-royal-gold mx-auto mt-4" />
      </div>

      {/* Invitation Card Details & Photo Container */}
      <div className="relative z-20 flex flex-col md-flex-row gap-6 md-gap-12 justify-center items-center w-full max-w-4xl px-4">
        {/* Event Photo Frame */}
        <div className="w-280 md-w-300 h-360 bg-frame-dark border-6px border-royal-gold rounded shadow-2xl p-2 flex flex-col justify-between gold-glow-card" style={{ transform: "rotate(-1.5deg)", width: "260px" }}>
          <div className="relative w-full h-85pct bg-zinc-900 border border-black overflow-hidden" style={{ position: "relative" }}>
            <Image
              src="/images/scene09_sangeet.png"
              alt="Sangeet Night"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              sizes="(max-width: 768px) 240px, 300px"
              loading="lazy"
            />
          </div>
          <span className="text-10px tracking-widest text-royal-gold text-center block mt-1 uppercase font-bold">
            Melody, Dance & Rhythm
          </span>
        </div>

        {/* Card Details */}
        <div
          ref={cardRef}
          className="w-full max-w-420 bg-black/75 border border-royal-gold-40 rounded-xl p-8 shadow-2xl text-center flex flex-col gap-6 gold-glow-card"
        >
          <p className="script-text text-3xl text-royal-gold">
            A Night of Dance &amp; Melodies
          </p>

          <p className="text-xs text-champagne-gold opacity-70 leading-relaxed max-w-xs mx-auto">
            Put on your dancing shoes and join us for a grand musical night filled with stellar performances, rhythm, and joy.
          </p>

          <div className="flex flex-col gap-3 text-sm text-champagne-gold">
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="opacity-60">Date:</span>
              <span className="font-semibold text-ivory-white">Dec 17, 2026</span>
            </div>
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="opacity-60">Time:</span>
              <span className="font-semibold text-ivory-white">07:00 PM Onwards</span>
            </div>
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="opacity-60">Dress Code:</span>
              <span className="font-semibold text-royal-gold">Indo-Western / Glamorous</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="opacity-60 text-xs">Venue:</span>
              <span className="font-semibold text-ivory-white text-left text-xs leading-relaxed">
                Grand Ballroom, Jag Mandir Palace, Udaipur
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




