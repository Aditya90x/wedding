"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCENE_LABELS = [
  { hi: "शुभारंभ", en: "Opening" },
  { hi: "गणेश आशीर्वाद", en: "Ganesh Blessings" },
  { hi: "परिवार", en: "Family Invitation" },
  { hi: "युगल", en: "Couple Reveal" },
  { hi: "तिथि", en: "Save the Date" },
  { hi: "हमारी कहानी", en: "Our Story" },
  { hi: "मेहंदी", en: "Mehendi" },
  { hi: "हल्दी", en: "Haldi" },
  { hi: "संगीत", en: "Sangeet" },
  { hi: "सगाई", en: "Engagement" },
  { hi: "बारात", en: "Baraat" },
  { hi: "विवाह", en: "Grand Wedding" },
  { hi: "रिसेप्शन", en: "Reception" },
  { hi: "गैलरी", en: "Gallery" },
  { hi: "परिवार", en: "Family" },
  { hi: "स्थान", en: "Venue" },
  { hi: "आशीर्वाद", en: "Blessings" },
  { hi: "काउंटडाउन", en: "Countdown" },
  { hi: "RSVP", en: "RSVP" },
  { hi: "समापन", en: "Finale" },
];

export default function NavigationButtons() {
  const [currentScene, setCurrentScene] = useState(0);
  const [totalScenes] = useState(SCENE_LABELS.length);
  const [showLabel, setShowLabel] = useState(false);
  const [labelTimeout, setLabelTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [scrolling, setScrolling] = useState(false);

  // Detect which scene is in view using IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[data-scene]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.scene ?? 0);
            setCurrentScene(idx);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const flashLabel = useCallback(() => {
    setShowLabel(true);
    if (labelTimeout) clearTimeout(labelTimeout);
    const t = setTimeout(() => setShowLabel(false), 2500);
    setLabelTimeout(t);
  }, [labelTimeout]);

  const scrollToScene = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalScenes || scrolling) return;
      const sections = document.querySelectorAll("section[data-scene]");
      const target = sections[index] as HTMLElement;
      if (!target) return;

      setScrolling(true);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setScrolling(false), 800);
      flashLabel();
    },
    [totalScenes, scrolling, flashLabel]
  );

  const goNext = () => scrollToScene(currentScene + 1);
  const goBack = () => scrollToScene(currentScene - 1);

  const isFirst = currentScene === 0;
  const isLast = currentScene === totalScenes - 1;

  const label = SCENE_LABELS[currentScene];

  return (
    <>
      {/* Scene label pill — appears on nav click */}
      <AnimatePresence>
        {showLabel && (
          <motion.div
            key="label"
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-28 left-1/2 z-[9999] pointer-events-none"
          >
            <div
              className="px-5 py-2 rounded-full text-center"
              style={{
                background: "rgba(10,5,0,0.92)",
                border: "1px solid rgba(212,175,55,0.5)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 20px rgba(212,175,55,0.2)",
              }}
            >
              <span className="text-[10px] tracking-[0.2em] text-royal-gold uppercase font-bold block">
                {currentScene + 1} / {totalScenes}
              </span>
              <span className="text-xs text-ivory-white font-serif">
                {label.hi} &nbsp;·&nbsp; {label.en}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div
        className="fixed bottom-6 left-1/2 z-[9999] flex items-center gap-3"
        style={{ transform: "translateX(-50%)" }}
      >
        {/* Back Button */}
        <motion.button
          onClick={goBack}
          disabled={isFirst}
          whileHover={!isFirst ? { scale: 1.08 } : {}}
          whileTap={!isFirst ? { scale: 0.94 } : {}}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
          style={{
            background: isFirst
              ? "rgba(30,18,5,0.4)"
              : "rgba(10,5,0,0.88)",
            border: `1px solid ${isFirst ? "rgba(212,175,55,0.1)" : "rgba(212,175,55,0.5)"}`,
            backdropFilter: "blur(12px)",
            color: isFirst ? "rgba(212,175,55,0.3)" : "#D4AF37",
            boxShadow: isFirst ? "none" : "0 0 16px rgba(212,175,55,0.15)",
            cursor: isFirst ? "not-allowed" : "pointer",
          }}
          aria-label="Previous section"
          id="nav-back-btn"
        >
          <span className="text-base leading-none">◀</span>
          <span>Back</span>
        </motion.button>

        {/* Scene dots indicator */}
        <div className="flex items-center gap-1 px-2">
          {SCENE_LABELS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToScene(i)}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === currentScene ? "18px" : "5px",
                height: "5px",
                background:
                  i === currentScene
                    ? "rgba(212,175,55,1)"
                    : i < currentScene
                    ? "rgba(212,175,55,0.4)"
                    : "rgba(255,255,255,0.15)",
                border: "none",
              }}
              aria-label={`Go to scene ${i + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={goNext}
          disabled={isLast}
          whileHover={!isLast ? { scale: 1.08 } : {}}
          whileTap={!isLast ? { scale: 0.94 } : {}}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
          style={{
            background: isLast
              ? "rgba(30,18,5,0.4)"
              : "linear-gradient(135deg, rgba(212,175,55,0.9) 0%, rgba(180,130,20,0.9) 100%)",
            border: `1px solid ${isLast ? "rgba(212,175,55,0.1)" : "rgba(212,175,55,0.7)"}`,
            backdropFilter: "blur(12px)",
            color: isLast ? "rgba(212,175,55,0.3)" : "#000",
            boxShadow: isLast ? "none" : "0 0 20px rgba(212,175,55,0.3)",
            cursor: isLast ? "not-allowed" : "pointer",
          }}
          aria-label="Next section"
          id="nav-next-btn"
        >
          <span>Next</span>
          <span className="text-base leading-none">▶</span>
        </motion.button>
      </div>
    </>
  );
}
