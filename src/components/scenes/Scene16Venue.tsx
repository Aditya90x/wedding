"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Sparkles from "../Sparkles";

export default function Scene16Venue() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
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
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(
        bgImageRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 0.25, duration: 1.2, ease: "power2.out" },
        "<"
      )
      .fromTo(
        cardRef.current,
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        imageRef.current,
        { scale: 1.25 },
        { scale: 1, duration: 1.5, ease: "power2.out" },
        "-=1.0"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef} data-scene="15"
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center p-6 border-b border-royal-gold-20"
    >
      {/* Sparkles particle system */}
      <Sparkles count={12} />

      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-radial-green-glow pointer-events-none z-0" />

      {/* Animated Background Venue Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div ref={bgImageRef} className="absolute inset-0 w-full h-full" style={{ willChange: "transform, opacity" }}>
          <Image
            src="/images/scene16_venue.png"
            alt="Udaipur Jag Mandir Palace Background"
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            sizes="100vw"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85" />
      </div>

      {/* Header */}
      <div ref={titleRef} className="relative z-10 text-center mb-8">
        <span className="text-10px tracking-30pct text-royal-gold uppercase font-semibold block mb-2">
          The Destination
        </span>
        <h2 className="text-3xl md-text-5xl text-ivory-white font-serif font-light">
          Wedding Venue
        </h2>
        <div className="w-16 h-1px bg-royal-gold mx-auto mt-4" />
      </div>

      {/* Venue Details Card */}
      <div
        ref={cardRef}
        className="relative z-20 w-full max-w-500 bg-gradient-to-br from-card-start to-card-end-1c border-2 border-royal-gold rounded-xl shadow-card-heavy overflow-hidden gold-glow-card"
      >
        {/* Palace Wedding Destination Photo */}
        <div className="relative w-full h-220 bg-zinc-950 border-b border-royal-gold-30 overflow-hidden" style={{ position: "relative" }}>
          <div ref={imageRef} className="absolute inset-0 w-full h-full" style={{ willChange: "transform" }}>
            <Image
              src="/images/scene16_venue.png"
              alt="Jag Mandir Island Palace Wedding Destination"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              sizes="(max-width: 768px) 320px, 500px"
              loading="lazy"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 text-center flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl md:text-2xl text-royal-gold font-serif">
              Jag Mandir Island Palace
            </h3>
            <p className="text-xs text-champagne-gold opacity-60 italic">
              Lake Pichola, Udaipur, Rajasthan 313001
            </p>
          </div>

          <p className="text-xs text-ivory-white opacity-70 leading-relaxed max-w-sm mx-auto">
            A 17th-century palace built on an island in Lake Pichola, Jag Mandir is a spectacular architectural marvel of marble, carving, and royal history.
          </p>

          <div className="w-12 h-1px bg-royal-gold opacity-20 mx-auto" />

          {/* Interactive Navigation Link */}
          <a
            href="https://maps.google.com/?q=Jag+Mandir+Udaipur"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-royal-gold text-xs uppercase tracking-widest text-royal-gold hover:bg-royal-gold hover:text-black transition-all duration-300 font-semibold rounded mx-auto pointer-events-auto"
            style={{ border: "1px solid var(--royal-gold)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            View on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}




