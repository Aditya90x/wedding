"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

// Particles for extra glowing effect
const PARTICLES = Array.from({ length: 10 }).map((_, i) => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  dur: Math.random() * 3 + 4,
  delay: Math.random() * 2,
}));

export default function Scene02GaneshBlessings() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin the section and apply a gentle parallax fade out
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
        },
        y: 100,
        opacity: 0,
        filter: "blur(5px)",
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 1.5, ease: "easeOut" } 
    }
  };

  return (
    <section
      ref={containerRef} data-scene="1"
      className="relative w-full h-screen overflow-hidden bg-[#2A0808] flex flex-col items-center justify-center text-center p-6 border-b border-[#D4AF37]/20"
    >
      {/* 1) Superb Background Photo with Scaling Animation */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full relative"
        >
          <Image
            src="/images/scene01_palace.png"
            alt="Palace Backdrop"
            fill
            className="object-cover opacity-30 mix-blend-screen"
          />
        </motion.div>
        {/* Glowing Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A0808]/80 via-transparent to-[#2A0808]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_60%)]" />
      </div>

      {/* 2) Continuous Glowing Mandala (Background Graphic) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute w-[90vw] h-[90vw] max-w-[600px] max-h-[600px] mix-blend-screen pointer-events-none z-0 flex items-center justify-center"
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/scene02_ganesh.png"
            alt="Lord Ganesha & Sacred Mandala"
            fill
            className="object-cover drop-shadow-[0_0_30px_rgba(212,175,55,0.8)]"
          />
        </motion.div>
      </motion.div>

      {/* 3) Floating Glowing Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {mounted && PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: "#D4AF37",
              boxShadow: `0 0 ${p.size * 5}px #D4AF37, 0 0 ${p.size * 10}px #FFA500`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 4) Animated Glowing Corner Borders */}
      <motion.div 
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-6 md:inset-12 border border-[#D4AF37]/30 pointer-events-none z-10 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
      >
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37] -translate-x-[1px] -translate-y-[1px]" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37] translate-x-[1px] -translate-y-[1px]" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37] -translate-x-[1px] translate-y-[1px]" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37] translate-x-[1px] translate-y-[1px]" />
      </motion.div>

      {/* 5) Flickering Diyas */}
      <motion.div 
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }}
        className="absolute bottom-16 left-12 md:left-32 flex flex-col items-center z-20"
      >
        <div className="w-10 h-10 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-8 bg-[#FFA500] rounded-full blur-[2px] animate-[pulse_0.5s_infinite] shadow-[0_0_20px_#FFA500,0_0_40px_#FF4500]" />
          <div className="absolute bottom-0 w-10 h-5 bg-[#8B4513] rounded-b-full border-t border-[#D4AF37] shadow-[0_5px_15px_rgba(0,0,0,0.8)]" />
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-16 right-12 md:right-32 flex flex-col items-center z-20"
      >
        <div className="w-10 h-10 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-8 bg-[#FFA500] rounded-full blur-[2px] animate-[pulse_0.7s_infinite] shadow-[0_0_20px_#FFA500,0_0_40px_#FF4500]" />
          <div className="absolute bottom-0 w-10 h-5 bg-[#8B4513] rounded-b-full border-t border-[#D4AF37] shadow-[0_5px_15px_rgba(0,0,0,0.8)]" />
        </div>
      </motion.div>

      {/* 6) Content Area */}
      <motion.div 
        ref={contentRef} 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          visible: { transition: { staggerChildren: 0.4 } }
        }}
        className="relative z-30 flex flex-col items-center max-w-3xl gap-8 px-4"
      >
        {/* Title */}
        <motion.div variants={textVariants} className="flex flex-col items-center">
          <h3 className="text-3xl md:text-5xl tracking-[0.2em] text-[#FFF4E0] uppercase font-serif drop-shadow-[0_0_20px_rgba(212,175,55,0.8)] mb-4">
            Divine Blessings
          </h3>
          <motion.div 
            animate={{ width: ["0px", "100px", "0px"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" 
          />
        </motion.div>

        {/* Shloka text with glowing shadow */}
        <motion.p 
          variants={textVariants}
          className="text-xl md:text-3xl italic text-[#FFFFF0] leading-relaxed font-serif px-4"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 0 20px rgba(212,175,55,0.6)" }}
        >
          &ldquo;Vakratunda Mahakaya Suryakoti Samaprabha<br />
          Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada&rdquo;
        </motion.p>

        {/* English Translation */}
        <motion.p 
          variants={textVariants}
          className="text-xs md:text-sm tracking-widest text-[#D4AF37] opacity-90 max-w-xl mt-2 leading-relaxed uppercase font-light drop-shadow-md"
        >
          O Lord Ganesha, of curved trunk and great body, whose splendor is equal to a million suns, please make all my undertakings free from obstacles, always.
        </motion.p>
      </motion.div>
    </section>
  );
}
