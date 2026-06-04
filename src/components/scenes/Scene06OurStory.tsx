"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Sparkles from "../Sparkles";

const STORY_STEPS = [
  {
    year: "August 2021",
    title: "First Meeting",
    desc: "A chance encounter at a local bookstore in Mumbai sparked a conversation that never ended.",
    align: "left",
  },
  {
    year: "March 2023",
    title: "The Proposal",
    desc: "Under the starlit sky of Udaipur, Rohan asked the question, and Ananya said yes.",
    align: "right",
  },
  {
    year: "December 2026",
    title: "The Vows",
    desc: "Stepping into a lifetime of partnership, support, and endless love.",
    align: "left",
  },
];

export default function Scene06OurStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    stepRefs.current = stepRefs.current.slice(0, STORY_STEPS.length);

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

      // Animate line growth
      tl.fromTo(
        lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 1, ease: "none" }
      );

      // Animate steps coming in sequentially
      stepRefs.current.forEach((ref, index) => {
        const alignLeft = STORY_STEPS[index].align === "left";
        tl.fromTo(
          ref,
          { opacity: 0, x: alignLeft ? 100 : -100 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          `-=${index === 0 ? 0.8 : 0.6}`
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef} data-scene="5"
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center p-6 border-b border-royal-gold-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/scene04_courtyard.png"
          alt="Palace Courtyard Backdrop"
          fill
          style={{ objectFit: "cover", objectPosition: "top", opacity: 0.2 }}
          sizes="100vw"
          loading="lazy"
        />
        {/* Background Dim */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundImage: "radial-gradient(circle at center, rgba(80, 200, 120, 0.05) 0%, #000 70%)" }}
        />
      </div>

      {/* Floating Sparkles */}
      <Sparkles count={10} />

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <span className="text-10px tracking-30pct text-royal-gold uppercase font-semibold block mb-2">
          Our Love Story
        </span>
        <h2 className="text-3xl md:text-5xl text-ivory-white font-serif font-light">
          How It All Began
        </h2>
        <div className="w-16 h-1px bg-royal-gold mx-auto mt-4" />
      </div>

      {/* Timeline Wrapper */}
      <div className="relative w-full max-w-2xl h-60vh flex flex-col justify-between items-center z-10 py-4">
        {/* Timeline Center Line */}
        <div
          ref={lineRef}
          className="absolute top-0 bottom-0 w-2 bg-gradient-to-b from-royal-gold via-champagne-gold to-royal-gold"
          style={{ transformOrigin: "top center", width: "2px" }}
        />

        {/* Timeline Items */}
        {STORY_STEPS.map((step, idx) => (
          <div
            key={idx}
            ref={(el) => { if (el) stepRefs.current[idx] = el; }}
            className={`flex w-full justify-between items-center relative ${
              step.align === "left" ? "flex-row-reverse" : ""
            }`}
          >
            {/* Empty space counterpart to balance flex */}
            <div className="w-full md-block" style={{ width: "45%" }} />

            {/* Timeline node dot */}
            <div
              className="absolute left-50pct transform translate-x-neg-50pct w-4 h-4 rounded-full bg-royal-gold border-4 border-black z-25"
              style={{ boxShadow: "0 0 10px var(--royal-gold)" }}
            />

            {/* Timeline content block */}
            <div
              className="bg-card-dark border border-royal-gold-30 rounded-lg p-4 shadow-xl gold-glow-card"
              style={{ width: "45%", minWidth: "260px" }}
            >
              <span className="text-xs font-bold text-royal-gold tracking-widest block mb-1">
                {step.year}
              </span>
              <h4 className="text-base md-text-lg font-serif text-ivory-white mb-1">
                {step.title}
              </h4>
              <p className="text-xs text-champagne-gold opacity-70 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}




