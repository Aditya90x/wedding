"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

// Floating particles for extra glowing effect
const PARTICLES = Array.from({ length: 10 }).map((_, i) => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 1,
  dur: Math.random() * 3 + 4,
  delay: Math.random() * 2,
  color: Math.random() > 0.5 ? "#D4AF37" : "#FF4500", // Gold and deep red
}));

export default function Scene01DivineOpening() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Smooth fade out and blur on scroll
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
        },
        y: -100,
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.9,
        ease: "power2.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleOpenInvitation = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

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
      ref={containerRef} data-scene="0"
      className="relative w-full h-screen overflow-hidden bg-[#2A0808] flex items-center justify-center border-b border-[#D4AF37]/30"
    >
      {/* 1) Superb Background with Cinematic Scaling */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.15, 1] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full relative"
        >
          <Image
            src="/images/scene12_mandap.png"
            alt="Royal Mandap Backdrop"
            fill
            className="object-cover opacity-50 mix-blend-luminosity"
            priority
          />
        </motion.div>
        {/* Deep Royal Maroon & Gold Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A0808]/80 via-[#2A0808]/40 to-[#000000]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2)_0%,transparent_70%)] animate-[pulse_4s_infinite]" />
      </div>

      {/* 1.5) Continuous Glowing Mandala (Background Graphic) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute w-[90vw] h-[90vw] max-w-[600px] max-h-[600px] mix-blend-screen pointer-events-none z-0 flex items-center justify-center opacity-30"
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/scene02_ganesh.png"
            alt="Sacred Mandala Background"
            fill
            className="object-cover drop-shadow-[0_0_30px_rgba(212,175,55,0.8)]"
            style={{ objectPosition: "top" }}
          />
        </motion.div>
      </motion.div>

      {/* 2) Floating Glowing Particles */}
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
              background: p.color,
              boxShadow: `0 0 ${p.size * 5}px ${p.color}`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
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

      {/* 3) Main Content Area with Staggered Reveals */}
      <motion.div 
        ref={contentRef} 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.3, delayChildren: 0.5 } }
        }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full h-full"
      >
        {/* Spinning Golden Aura & Ganesha */}
        <motion.div variants={textVariants} className="relative mb-6 flex items-center justify-center w-32 h-32 md:w-40 md:h-40">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-[#D4AF37]/50 border-dashed"
            style={{ boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#D4AF37] border-b-[#FF4500]"
          />
          <Image
            src="/images/scene02_ganesh.png"
            alt="Lord Ganesha"
            width={80}
            height={80}
            className="relative z-10 drop-shadow-[0_0_15px_rgba(212,175,55,1)]"
          />
        </motion.div>

        {/* Sanskrit Shloka */}
        <motion.p variants={textVariants} className="text-[#D4AF37] text-sm md:text-base tracking-[0.15em] mb-8 font-medium leading-relaxed max-w-md" style={{ textShadow: "0 0 10px rgba(212,175,55,0.8)" }}>
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br/>
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
        </motion.p>

        <motion.p variants={textVariants} className="text-[#FFFFF0] text-xl md:text-2xl font-serif italic font-light mb-4">
          Dear Guest,
        </motion.p>

        <motion.p variants={textVariants} className="text-[#D4AF37] text-xs md:text-sm tracking-[0.3em] uppercase font-bold mb-6 drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">
          YOU ARE CORDIALLY INVITED TO THE WEDDING OF
        </motion.p>

        {/* Superb Glowing Names */}
        <motion.h1 
          variants={textVariants} 
          className="font-script text-6xl md:text-8xl lg:text-9xl tracking-wider mb-6 text-[#FFFFF0]"
          style={{ textShadow: "0 5px 25px rgba(0,0,0,0.8), 0 0 30px rgba(255,69,0,0.6), 0 0 10px rgba(212,175,55,0.8)" }}
        >
          Ananya <span className="text-[#D4AF37] text-5xl md:text-7xl">&amp;</span> Rohan
        </motion.h1>

        {/* Expanding Separator */}
        <motion.div variants={textVariants} className="flex items-center justify-center gap-4 mb-6">
          <motion.div animate={{ width: ["0px", "100px", "0px"] }} transition={{ duration: 4, repeat: Infinity }} className="h-[2px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
          <motion.div animate={{ width: ["0px", "100px", "0px"] }} transition={{ duration: 4, repeat: Infinity, delay: 2 }} className="h-[2px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </motion.div>

        {/* Date & Location */}
        <motion.div variants={textVariants} className="mb-12 flex flex-col items-center gap-2">
          <p className="text-[#FFFFF0] text-sm md:text-base tracking-[0.25em] font-medium uppercase drop-shadow-md">
            December 18, 2026
          </p>
          <p className="text-[#D4AF37] text-sm md:text-base tracking-[0.25em] font-medium uppercase drop-shadow-md">
            Udaipur, Rajasthan
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div variants={textVariants} className="flex flex-col items-center mt-4">
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-medium mb-4">Scroll to Explore</p>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex justify-center p-1"
          >
            <motion.div 
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} 
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" 
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
