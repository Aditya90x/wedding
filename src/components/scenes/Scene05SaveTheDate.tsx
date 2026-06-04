"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Sparkles from "../Sparkles";

export default function Scene05SaveTheDate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const dateGlowRef = useRef<HTMLHeadingElement>(null);
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

      // Flip card and then glow the date
      tl.fromTo(
        cardRef.current,
        { rotateY: 180, scale: 0.8, opacity: 0 },
        { rotateY: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
      .to(
        dateGlowRef.current,
        {
          textShadow: "0 0 20px #D4AF37, 0 0 40px #F7E7CE",
          color: "#FFFFF0",
          duration: 0.8,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef} data-scene="4"
      className="relative w-full h-screen overflow-hidden bg-zinc-950 flex flex-col items-center justify-center p-4 border-b border-royal-gold-20"
      style={{ perspective: "1000px" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/scene01_palace.png"
          alt="Palace Backdrop"
          fill
          style={{ objectFit: "cover", objectPosition: "top", opacity: 0.2 }}
          sizes="100vw"
          loading="lazy"
        />
        {/* Dimmed Background Texture */}
        <div 
          className="absolute inset-0 opacity-50" 
          style={{ backgroundImage: "radial-gradient(ellipse at center, var(--deep-maroon) 0%, #000 80%)" }}
        />
      </div>

      {/* Floating Sparkles */}
      <Sparkles count={15} />

      {/* The Invitation Card (3D Flipped on scroll) */}
      <div
        ref={cardRef}
        className="relative w-full max-w-400 h-550 bg-gradient-to-br from-card-start to-card-end-24 border-2 border-royal-gold rounded-xl shadow-card-heavy p-8 text-center flex flex-col justify-between items-center z-20 gold-glow-card"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Header Decoration */}
        <div className="w-full flex justify-between items-center">
          <div className="w-6 h-6 border-t border-l border-royal-gold" />
          <span className="text-10px tracking-30pct text-champagne-gold uppercase font-semibold">
            Save The Date
          </span>
          <div className="w-6 h-6 border-t border-r border-royal-gold" />
        </div>

        {/* Card Body */}
        <div className="flex flex-col items-center gap-6 my-auto">
          {/* Wax Seal SVG */}
          <div className="w-20 h-20 relative flex items-center justify-center animate-pulse">
            <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-lg">
              <path
                d="M 50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 72.1 90 90 72.1 90 50 C 90 27.9 72.1 10 50 10 Z"
                fill="var(--deep-maroon)"
                stroke="var(--royal-gold)"
                strokeWidth="2"
              />
              <path
                d="M 50 18 C 32.3 18 18 32.3 18 50 C 18 67.7 32.3 82 50 82 C 67.7 82 82 67.7 82 50 C 82 32.3 67.7 18 50 18 Z"
                fill="#600000"
              />
              {/* Royal Monogram AR */}
              <text
                x="50"
                y="58"
                fontFamily="var(--font-serif)"
                fontSize="24"
                fill="var(--royal-gold)"
                textAnchor="middle"
                className="font-bold tracking-widest"
              >
                A &bull; R
              </text>
            </svg>
          </div>

          <p className="text-xs tracking-widest text-champagne-gold uppercase mt-2">
            December 2026
          </p>

          <h2
            ref={dateGlowRef}
            className="text-5xl md-text-6xl text-royal-gold tracking-wider font-serif font-extrabold transition-all duration-700"
            style={{ textShadow: "none" }}
          >
            18
          </h2>

          <p className="text-sm tracking-20pct text-ivory-white uppercase font-semibold">
            Friday Evening
          </p>

          <div className="w-16 h-1px bg-gradient-to-r from-transparent via-gold to-transparent" />

          <p className="text-xs text-champagne-gold/80 max-w-250px leading-relaxed">
            Please grace us with your presence as we celebrate our holy matrimony at Udaipur, Rajasthan.
          </p>
        </div>

        {/* Card Footer Decoration */}
        <div className="w-full flex justify-between items-center">
          <div className="w-6 h-6 border-b border-l border-royal-gold" />
          <span className="text-9px tracking-wider text-royal-gold/60 font-light">
            Formal Invitation to Follow
          </span>
          <div className="w-6 h-6 border-b border-r border-royal-gold" />
        </div>
      </div>
    </section>
  );
}




