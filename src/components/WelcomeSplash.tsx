"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function WelcomeSplash() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Block scroll when welcome page is visible
    document.documentElement.classList.add("lenis-stopped");
    if (document.body) {
      document.body.style.overflow = "hidden";
    }
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Cleanup scroll blocking on destroy
      document.documentElement.classList.remove("lenis-stopped");
      if (document.body) {
        document.body.style.overflow = "";
      }
      document.documentElement.style.overflow = "";
    };
  }, []);

  const handleEnter = () => {
    setIsFading(true);
    
    // Play music event
    window.dispatchEvent(new Event("start-wedding-music"));
    
    // Tell Scene01 that welcome is dismissed so it can start gate timer
    window.dispatchEvent(new Event("welcome-dismissed"));

    setTimeout(() => {
      setIsVisible(false);
      document.documentElement.classList.remove("lenis-stopped");
      if (document.body) {
        document.body.style.overflow = "";
      }
      document.documentElement.style.overflow = "";
      window.dispatchEvent(new Event("resize"));
    }, 1000); // matches transition exit duration
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isFading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 w-full h-full z-[99999] bg-black flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(circle at center, #3b000a 0%, #170004 50%, #000000 100%)"
          }}
        >
          {/* Rotating Sacred Mandala (Vector Rings of Pearls & Gold) */}
          <div className="absolute w-80vw h-80vw max-w-600 max-h-600 flex items-center justify-center pointer-events-none opacity-20 z-0">
            <svg className="w-full h-full animate-spin" style={{ animationDuration: '60s' }} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" stroke="var(--royal-gold)" strokeWidth="0.25" fill="none" strokeDasharray="2, 2" />
              <circle cx="50" cy="50" r="44" stroke="var(--royal-gold)" strokeWidth="0.75" fill="none" strokeDasharray="4, 4" />
              <circle cx="50" cy="50" r="40" stroke="var(--royal-gold)" strokeWidth="0.25" fill="none" />
              <circle cx="50" cy="50" r="36" stroke="var(--royal-gold)" strokeWidth="1.2" fill="none" strokeDasharray="1, 6" strokeLinecap="round" />
              <circle cx="50" cy="50" r="30" stroke="var(--royal-gold)" strokeWidth="0.5" fill="none" strokeDasharray="10, 2" />
            </svg>
          </div>

          {/* Left Welcoming Group Silhouette */}
          <div 
            className="absolute bottom-0 left-0 opacity-25 pointer-events-none z-10" 
            style={{ mixBlendMode: "screen", width: "35vw", maxWidth: "260px", height: "40vh", maxHeight: "300px" }}
          >
            <Image
              src="/images/welcome_group.png"
              alt="Royal Elephant Welcomer"
              fill
              style={{ objectFit: "contain", objectPosition: "bottom left" }}
              sizes="(max-width: 768px) 150px, 260px"
              loading="eager"
            />
          </div>

          {/* Right Welcoming Group Silhouette (Flipped) */}
          <div 
            className="absolute bottom-0 right-0 opacity-25 pointer-events-none z-10" 
            style={{ mixBlendMode: "screen", transform: "scaleX(-1)", width: "35vw", maxWidth: "260px", height: "40vh", maxHeight: "300px" }}
          >
            <Image
              src="/images/welcome_group.png"
              alt="Royal Elephant Welcomer"
              fill
              style={{ objectFit: "contain", objectPosition: "bottom left" }}
              sizes="(max-width: 768px) 150px, 260px"
              loading="eager"
            />
          </div>

          {/* Floating Gold Confetti / Petals */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {mounted && Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full opacity-60"
                style={{
                  width: Math.random() * 8 + 4 + "px",
                  height: Math.random() * 8 + 4 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                }}
                animate={{
                  y: ["0px", "-60px", "0px"],
                  x: ["0px", (Math.random() > 0.5 ? 20 : -20) + "px", "0px"],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: Math.random() * 6 + 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Welcome Card Content */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="relative z-30 flex flex-col items-center text-center p-8 max-w-440 bg-black/40 backdrop-blur-md mx-4"
          >
            {/* Sacred Ganesha Logo Outline */}
            <div className="mb-4 text-royal-gold">
              <svg width="64" height="64" viewBox="0 0 100 100" fill="none" className="stroke-royal-gold mx-auto" strokeWidth="1.5" strokeLinecap="round">
                <path d="M50 15 C38 15, 34 26, 34 36 C34 46, 50 51, 50 56 C50 62, 38 67, 30 67" />
                <path d="M50 15 C62 15, 66 26, 66 36 C66 46, 50 51, 50 56 C50 62, 62 67, 70 67" />
                <path d="M50 30 C50 30, 48 35, 44 35 C40 35, 38 39, 38 43 C38 47, 50 53, 50 53 C50 53, 62 47, 62 43 C62 39, 60 35, 56 35 C52 35, 50 30, 50 30 Z" />
                <path d="M50 56 L50 83 M38 83 L62 83" fill="none" />
                <circle cx="44" cy="27" r="1.5" fill="var(--royal-gold)" />
                <circle cx="56" cy="27" r="1.5" fill="var(--royal-gold)" />
                <path d="M47 19 Q50 16 53 19" />
              </svg>
            </div>

            <span className="text-10px tracking-30pct text-champagne-gold uppercase font-semibold mb-2 block">
              Shree Ganeshaya Namah
            </span>

            <div className="w-16 h-1px bg-royal-gold/40 mx-auto mb-6" />

            <span className="text-xs tracking-20pct text-champagne-gold/70 uppercase font-light">
              The Royal Wedding Invitation
            </span>

            <h1
              className="script-text text-5xl md:text-6.5xl leading-none my-4"
              style={{
                color: "#FFFFF0",
                textShadow: "0 0 12px rgba(212,175,55,0.95), 0 0 25px rgba(212,175,55,0.6), 0 0 4px #fff",
                fontWeight: "600"
              }}
            >
              Ananya <span style={{ color: "#FFE082", fontFamily: "serif", fontSize: "0.6em", textShadow: "none" }}>&amp;</span> Rohan
            </h1>

            <p className="text-xs text-champagne-gold/80 leading-relaxed max-w-xs mx-auto mb-6">
              With hearts full of love, the Sharma &amp; Goel families cordially invite you to celebrate the union of their children.
            </p>

            <div className="text-[10px] tracking-15pct text-royal-gold uppercase font-bold mb-8">
              December 18, 2026 &bull; Udaipur
            </div>

            {/* Glowing Action Button */}
            <button
              onClick={handleEnter}
              className="relative px-8 py-3.5 bg-royal-gold text-black text-xs font-bold uppercase tracking-widest rounded shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] border border-royal-gold cursor-pointer"
            >
              Enter Invitation / निमंत्रण स्वीकारें
            </button>

            <span className="text-[9px] tracking-widest text-champagne-gold/50 uppercase mt-4 block">
              🎵 Turn on sound for immersive shehnai experience
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
