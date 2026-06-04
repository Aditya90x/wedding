"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const SECTION_NAMES = [
  "Opening / प्रारंभ",
  "Ganesh Blessing / गणेश वंदना",
  "Invitation / आमंत्रण",
  "Couple Reveal / वर-वधू",
  "Save The Date / तिथि",
  "Our Story / कहानी",
  "Mehendi / मेहंदी",
  "Haldi / हल्दी",
  "Sangeet / संगीत",
  "Engagement / सगाई",
  "Baraat / बारात",
  "Grand Wedding / शुभ विवाह",
  "Reception / प्रतिभोज",
  "Gallery / तस्वीरें",
  "Family / परिवार",
  "Venue / स्थान",
  "Countdown / समय गणना",
  "Blessings / शुभकामनाएं",
  "RSVP / स्वीकृति",
  "Final Monogram / धन्यवाद"
];

export default function NavigationControls() {
  const [activeSection, setActiveSection] = useState(0);
  const [totalSections, setTotalSections] = useState(SECTION_NAMES.length);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll("section"));
      if (sections.length === 0) return;

       // Detect if welcome splash is active (locks scroll)
      const welcomeSplashExists = 
        typeof document !== "undefined" &&
        document.body && 
        document.body.style.overflow === "hidden" && 
        window.scrollY < 50;

      if (welcomeSplashExists) {
        setShowControls(false);
        return;
      }

      setShowControls(true);
      setTotalSections(sections.length);

      // Find active section based on maximum visible height in viewport
      let activeIdx = 0;
      let maxVisibleHeight = -1;

      sections.forEach((section, idx) => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.max(
          0,
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
        );
        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          activeIdx = idx;
        }
      });

      setActiveSection(activeIdx);
    };

    window.addEventListener("scroll", handleScroll);
    // Listen for welcome splash dismiss events to show navigation
    window.addEventListener("welcome-dismissed", () => {
      setTimeout(() => setShowControls(true), 1200);
    });

    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (idx: number) => {
    const sections = Array.from(document.querySelectorAll("section"));
    if (idx < 0 || idx >= sections.length) return;

    const targetSection = sections[idx];
    
    // Find GSAP ScrollTrigger for this section if available
    const triggers = typeof ScrollTrigger !== "undefined" ? ScrollTrigger.getAll() : [];
    const trigger = triggers.find(t => t.trigger === targetSection);

    if (trigger) {
      window.scrollTo({
        top: trigger.start + 2, // offset slightly to trigger activation
        behavior: "smooth"
      });
    } else {
      const targetScroll = window.scrollY + targetSection.getBoundingClientRect().top;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth"
      });
    }
  };

  if (!showControls) return null;

  return (
    <>
      {/* Floating Back Button - Top Left */}
      <AnimatePresence>
        {activeSection > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 0.85, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            whileHover={{ scale: 1.08, opacity: 1, boxShadow: "0 0 15px rgba(212, 175, 55, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(activeSection - 1)}
            className="fixed top-6 left-6 z-[9999] px-4 py-2 rounded-full border border-royal-gold/40 bg-black/85 text-royal-gold text-[10px] uppercase font-bold tracking-widest cursor-pointer backdrop-blur-sm flex items-center gap-2 shadow-lg"
          >
            <span>⬅</span> Back / पीछे
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Next Button - Bottom Center */}
      <AnimatePresence>
        {activeSection < totalSections - 1 && (
          <motion.button
            initial={{ opacity: 0, y: 30, x: "-50%" }}
            exit={{ opacity: 0, y: 30, x: "-50%" }}
            animate={{
              opacity: 0.9,
              x: "-50%",
              y: [0, -8, 0],
            }}
            transition={{
              y: {
                duration: 2.0,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: { duration: 0.3 },
              x: { duration: 0.3 }
            }}
            whileHover={{ scale: 1.05, opacity: 1, boxShadow: "0 0 25px rgba(212, 175, 55, 0.7)" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollToSection(activeSection + 1)}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[9999] px-8 py-3 rounded-full bg-gradient-to-r from-royal-gold/90 via-champagne-gold/90 to-royal-gold/90 text-black text-xs uppercase font-extrabold tracking-widest cursor-pointer shadow-xl border border-royal-gold font-sans flex items-center gap-2"
          >
            Next Section / आगे बढ़ें 🔽
          </motion.button>
        )}
      </AnimatePresence>

      {/* Side Dot Indicators - Right Edge */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-[9999] flex flex-col gap-3.5 items-end pointer-events-none">
        {SECTION_NAMES.slice(0, totalSections).map((name, idx) => {
          const isActive = idx === activeSection;
          return (
            <div 
              key={idx} 
              className="flex items-center gap-3 group cursor-pointer pointer-events-auto"
              onClick={() => scrollToSection(idx)}
            >
              {/* Tooltip on hover */}
              <span className="text-[9px] tracking-wider text-royal-gold uppercase font-bold bg-black/90 border border-royal-gold-20 px-2.5 py-1 rounded shadow-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none">
                {name}
              </span>
              
              {/* Glowing Dot */}
              <div 
                className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                  isActive 
                    ? "border-royal-gold bg-royal-gold shadow-[0_0_12px_var(--royal-gold)]" 
                    : "border-royal-gold/40 bg-black/60 group-hover:border-royal-gold/80"
                }`}
              >
                {isActive && (
                  <div className="w-1.5 h-1.5 bg-black rounded-full animate-ping" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
