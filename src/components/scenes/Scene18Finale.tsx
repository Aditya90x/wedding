"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import Sparkles from "../Sparkles";

export default function Scene18Finale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);

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

      tl.fromTo(
        contentRef.current,
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.9, duration: 1, ease: "power2.inOut" }
      )
      .fromTo(
        monogramRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.5)" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef} data-scene="19"
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center p-6"
    >
      {/* Sparkles particle system */}
      <Sparkles count={15} />

      {/* Floating Lanterns (drifting upwards) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {mounted && Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center"
            style={{
              left: Math.random() * 100 + "%",
              bottom: "-10%",
            }}
            animate={{
              y: ["0vh", "-120vh"],
              x: ["0vw", (Math.random() > 0.5 ? 10 : -10) + "vw"],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 4,
            }}
          >
            {/* Lantern SVG */}
            <svg width="24" height="32" viewBox="0 0 24 32">
              <path
                d="M4 4 C6 2, 18 2, 20 4 L22 24 C22 28, 2 28, 2 24 Z"
                fill="rgba(245, 158, 11, 0.7)"
                stroke="#D4AF37"
                strokeWidth="1"
              />
              <circle cx="12" cy="20" r="4" fill="#F59E0B" className="animate-pulse" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Heavy Continuous Fireworks */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {mounted && Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: 10 + i * 20 + Math.random() * 10 + "%",
              top: 10 + Math.random() * 20 + "%",
            }}
          >
            {Array.from({ length: 16 }).map((_, j) => (
              <motion.div
                key={j}
                className="absolute rounded"
                style={{
                  transformOrigin: "bottom center",
                  rotate: j * 22.5 + "deg",
                  width: "2px",
                  height: "6px",
                  background: "linear-gradient(to top, var(--royal-gold), #fde047)"
                }}
                animate={{
                  y: [-10, -100],
                  scaleY: [0.3, 1.8, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.9 + j * 0.04,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Star Field Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {mounted && Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 2 + "px",
              height: Math.random() * 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDuration: Math.random() * 3 + 1 + "s",
            }}
          />
        ))}
      </div>

      {/* Main Closing Text */}
      <div ref={contentRef} className="relative z-20 flex flex-col items-center gap-6 text-center max-w-xl">
        <h3 className="text-xl md-text-2xl tracking-25 text-royal-gold uppercase font-semibold">
          Awaiting Your Presence
        </h3>
        
        <h2 className="script-text text-5xl md-text-7xl text-ivory-white leading-tight my-2 animate-pulse">
          Thank You
        </h2>

        <p className="text-xs md-text-lg tracking-widest text-champagne-gold uppercase opacity-80 leading-relaxed">
          Your presence and blessings are the greatest gifts we could ask for.
        </p>

        <div className="w-16 h-1px my-2" style={{ backgroundColor: "rgba(212, 175, 55, 0.4)" }} />

        <p className="script-text text-3xl text-royal-gold">
          Ananya <span className="text-ivory-white">&amp;</span> Rohan
        </p>
      </div>

      {/* Final Resolving Monogram */}
      <div
        ref={monogramRef}
        className="absolute z-25 flex flex-col items-center justify-center text-center opacity-0 pointer-events-none"
      >
        <div className="w-48 h-48 border-4 border-double border-royal-gold rounded-full flex flex-col items-center justify-center shadow-gold-glow bg-black/80 p-4 gold-glow-card">
          <span className="tracking-30 text-royal-gold uppercase font-bold mb-1" style={{ fontSize: "10px" }}>
            M &bull; MXXVI
          </span>
          <h2 className="script-text text-5xl text-ivory-white leading-none my-1 font-bold">
            AR
          </h2>
          <div className="w-12 h-1px my-2" style={{ backgroundColor: "rgba(212, 175, 55, 0.5)" }} />
          <span className="tracking-widest text-champagne-gold uppercase" style={{ fontSize: "8px" }}>
            December 18
          </span>
        </div>
      </div>
    </section>
  );
}




