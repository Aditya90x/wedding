"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Sparkles from "../Sparkles";

export default function Scene07Mehendi() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lanternRef = useRef<HTMLDivElement>(null);
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
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(
        photoFrame1Ref.current,
        { x: -50, opacity: 0, rotate: -20 },
        { x: 0, opacity: 1, rotate: -8, duration: 1, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        photoFrame2Ref.current,
        { x: 50, opacity: 0, rotate: 20 },
        { x: 0, opacity: 1, rotate: 6, duration: 1, ease: "power3.out" },
        "-=0.7"
      )
      .fromTo(
        cardRef.current,
        { scale: 0.9, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: "back.out(1.2)" },
        "-=0.6"
      );

      // Swing the lantern gently
      gsap.to(lanternRef.current, {
        rotation: 15,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut",
        transformOrigin: "top center",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef} data-scene="6"
      className="relative w-full h-screen overflow-hidden bg-emerald-green flex flex-col items-center justify-center p-6 border-b border-royal-gold-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/scene07_mehendi.png"
          alt="Mehendi Ceremony"
          fill
          style={{ objectFit: "cover", objectPosition: "top", opacity: 0.7 }}
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Floating Sparkles */}
      <Sparkles count={12} />
      {/* Decorative Hanging Marigolds (SVG) */}
      <div className="absolute top-0 inset-x-0 h-40 flex justify-around pointer-events-none opacity-40 z-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <svg key={i} width="20" height="150" viewBox="0 0 20 150" fill="var(--royal-gold)">
            <circle cx="10" cy="20" r="8" />
            <circle cx="10" cy="40" r="8" />
            <circle cx="10" cy="60" r="8" />
            <circle cx="10" cy="80" r="8" />
            <circle cx="10" cy="100" r="8" />
            <circle cx="10" cy="120" r="8" />
            <circle cx="10" cy="140" r="8" />
            <circle cx="10" cy="160" r="6" fill="#D97706" />
          </svg>
        ))}
      </div>

      {/* Hanging Swinging Lantern */}
      <div
        ref={lanternRef}
        className="absolute top-0 right-12 md-right-24 w-12 h-64 pointer-events-none z-10"
        style={{ transformOrigin: "top center" }}
      >
        <svg width="48" height="150" viewBox="0 0 48 150" fill="none" stroke="var(--royal-gold)">
          <line x1="24" y1="0" x2="24" y2="80" strokeWidth="2" />
          {/* Lantern body */}
          <path d="M12 80 L36 80 L42 120 L6 120 Z" fill="rgba(212,175,55,0.1)" strokeWidth="2" />
          <line x1="6" y1="120" x2="42" y2="120" strokeWidth="3" />
          <path d="M18 120 L24 140 L30 120 Z" fill="var(--royal-gold)" />
          {/* Light glow */}
          <circle cx="24" cy="100" r="10" fill="#F59E0B" className="animate-ping" style={{ opacity: 0.3 }} />
        </svg>
      </div>

      {/* Content */}
      <div ref={titleRef} className="relative z-20 text-center mb-8">
        <span className="text-10px tracking-30pct text-champagne-gold uppercase font-semibold block mb-2">
          First Festive Ceremony
        </span>
        <h2 className="text-4xl md-text-5xl text-ivory-white font-serif font-light">
          Mehendi Ceremony
        </h2>
        <div className="w-16 h-1px bg-royal-gold mx-auto mt-4" />
      </div>

      {/* Invitation Card Details & Photo Container */}
      <div className="relative z-20 flex flex-col md-flex-row gap-6 md-gap-12 justify-center items-center w-full max-w-4xl px-4">
        {/* Event Photo Container (Dual Overlapping Frames) */}
        <div className="relative w-280 md-w-320 h-380 flex items-center justify-center pointer-events-none" style={{ width: "280px", height: "380px" }}>
          {/* Back Frame ( Henna Detail ) */}
          <div
            ref={photoFrame1Ref}
            className="absolute w-200 h-280 bg-frame-dark border-6px border-royal-gold rounded shadow-xl p-2 flex flex-col justify-between gold-glow-card pointer-events-auto"
            style={{
              transform: "rotate(-8deg) translate(-15px, -15px)",
              width: "200px",
              height: "280px",
              zIndex: 10,
            }}
          >
            <div className="relative w-full h-85pct bg-zinc-900 border border-black overflow-hidden">
              <Image
                src="/images/scene07_mehendi.png"
                alt="Mehendi Detail"
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                sizes="200px"
                loading="lazy"
              />
            </div>
            <span className="text-9px tracking-widest text-royal-gold text-center block mt-1 uppercase font-bold">
              Intricate Henna
            </span>
          </div>

          {/* Front Frame ( Bride Portrait ) */}
          <div
            ref={photoFrame2Ref}
            className="absolute w-200 h-280 bg-frame-dark border-6px border-royal-gold rounded shadow-2xl p-2 flex flex-col justify-between gold-glow-card pointer-events-auto"
            style={{
              transform: "rotate(6deg) translate(15px, 15px)",
              width: "200px",
              height: "280px",
              zIndex: 20,
            }}
          >
            <div className="relative w-full h-85pct bg-zinc-900 border border-black overflow-hidden">
              <Image
                src="/images/scene07_mehendi_photo.png"
                alt="Henna Stains of Love"
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                sizes="200px"
                loading="lazy"
              />
            </div>
            <span className="text-9px tracking-widest text-royal-gold text-center block mt-1 uppercase font-bold">
              Bride's Henna
            </span>
          </div>
        </div>

        {/* Invitation Card Details */}
        <div
          ref={cardRef}
          className="w-full max-w-420 bg-black/70 border border-royal-gold-40 rounded-xl p-8 shadow-2xl text-center flex flex-col gap-6 gold-glow-card"
        >
          <p className="script-text text-3xl text-royal-gold">
            Henna &amp; Festivities
          </p>

          <p className="text-xs text-champagne-gold opacity-80 leading-relaxed max-w-xs mx-auto">
            Kickstart the celebrations with music, laughter, and henna stains that symbolize the love that binds us.
          </p>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="text-champagne-gold opacity-60">Date:</span>
              <span className="font-semibold text-ivory-white">Dec 16, 2026</span>
            </div>
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="text-champagne-gold opacity-60">Time:</span>
              <span className="font-semibold text-ivory-white">11:00 AM Onwards</span>
            </div>
            <div className="flex justify-between border-b border-royal-gold-10 pb-2">
              <span className="text-champagne-gold opacity-60">Dress Code:</span>
              <span className="font-semibold text-yellow-400">Festive Green / Yellow</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-champagne-gold opacity-60 text-xs">Venue:</span>
              <span className="font-semibold text-ivory-white text-left text-xs leading-relaxed">
                Courtyard Palace, Jag Mandir, Udaipur
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




