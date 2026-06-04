"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Sparkles from "../Sparkles";

export default function Scene15Family() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
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
        cardsRef.current?.children || [],
        { scale: 0.9, opacity: 0, y: 60 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, stagger: 0.3, ease: "power3.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef} data-scene="14"
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center p-6 border-b border-royal-gold-20"
    >
      {/* Background Image & Dim */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/images/scene04_courtyard.png"
          alt="Palace Courtyard Background"
          fill
          style={{ objectFit: "cover", objectPosition: "top", opacity: 0.2 }}
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-radial-maroon-glow-5" />
      </div>

      {/* Floating Sparkles */}
      <Sparkles count={15} />

      {/* Header */}
      <div ref={titleRef} className="relative z-10 text-center mb-6">
        <span className="text-10px tracking-30pct text-royal-gold uppercase font-semibold block mb-2">
          Pillars of Love
        </span>
        <h2 className="text-3xl md:text-5xl text-ivory-white font-serif font-light">
          Our Beloved Family
        </h2>
        <div className="w-16 h-1px bg-royal-gold mx-auto mt-4" />
      </div>

      {/* Family Cards Layout - Side-by-side on desktop, vertical stack on mobile */}
      <div
        ref={cardsRef}
        className="relative z-10 flex flex-col md-flex-row gap-6 justify-center items-stretch w-full max-w-4xl px-4"
      >
        {/* Bride's Family Card */}
        <div
          className="flex-1 bg-gradient-to-b from-zinc-900 to-black border border-royal-gold-30 rounded-xl p-6 shadow-2xl flex flex-col items-center text-center gap-4 gold-glow-card"
        >
          <span className="text-10px tracking-20pct text-royal-gold uppercase font-semibold">
            Bride's Family
          </span>
          
          {/* Bride Family Photo Frame */}
          <div className="relative w-full h-40 rounded-lg overflow-hidden border border-royal-gold-30 bg-zinc-950">
            {mounted && (
              <Image
                src="/images/bride_family.png"
                alt="Bride Sharma Family"
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                sizes="(max-width: 768px) 280px, 400px"
                loading="lazy"
              />
            )}
          </div>
          
          <div className="w-12 h-1px bg-royal-gold opacity-30" />
          
          <div className="flex flex-col gap-2">
            <div>
              <h4 className="text-base md:text-lg font-serif text-ivory-white font-medium">Mrs. Kiran &amp; Mr. Ashok Sharma</h4>
              <p className="text-xs text-champagne-gold opacity-60 italic">Parents of the Bride</p>
            </div>
            <div className="mt-1">
              <h5 className="text-sm font-semibold text-champagne-gold">Vikas Sharma</h5>
              <p className="text-[10px] text-champagne-gold opacity-60">Brother</p>
            </div>
          </div>
        </div>

        {/* Groom's Family Card */}
        <div
          className="flex-1 bg-gradient-to-b from-zinc-900 to-black border border-royal-gold-30 rounded-xl p-6 shadow-2xl flex flex-col items-center text-center gap-4 gold-glow-card"
        >
          <span className="text-10px tracking-20pct text-royal-gold uppercase font-semibold">
            Groom's Family
          </span>

          {/* Groom Family Photo Frame */}
          <div className="relative w-full h-40 rounded-lg overflow-hidden border border-royal-gold-30 bg-zinc-950">
            {mounted && (
              <Image
                src="/images/groom_family.png"
                alt="Groom Goel Family"
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                sizes="(max-width: 768px) 280px, 400px"
                loading="lazy"
              />
            )}
          </div>
          
          <div className="w-12 h-1px bg-royal-gold opacity-30" />
          
          <div className="flex flex-col gap-2">
            <div>
              <h4 className="text-base md:text-lg font-serif text-ivory-white font-medium">Mrs. Sarita &amp; Mr. Rakesh Goel</h4>
              <p className="text-xs text-champagne-gold opacity-60 italic">Parents of the Groom</p>
            </div>
            <div className="mt-1">
              <h5 className="text-sm font-semibold text-champagne-gold">Neha Goel</h5>
              <p className="text-[10px] text-champagne-gold opacity-60">Sister</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center mt-8">
        <span className="text-9px tracking-wide text-royal-gold uppercase block mb-1">
          With Blessings from
        </span>
        <p className="text-xs text-champagne-gold opacity-75 font-serif italic max-w-sm px-4">
          Grandparents, Aunts, Uncles &amp; Family Members from both families.
        </p>
      </div>
    </section>
  );
}




