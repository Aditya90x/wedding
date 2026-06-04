"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Sparkles from "../Sparkles";

export default function Scene14Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const frame1 = useRef<HTMLDivElement>(null);
  const frame2 = useRef<HTMLDivElement>(null);
  const frame3 = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const ctx = gsap.context(() => {
      // Pin gallery section and create parallax on elements
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
        titleRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6 }
      )
      .fromTo(
        frame1.current,
        { y: 150, opacity: 0, rotate: -3 },
        { y: -30, opacity: 1, rotate: 0, duration: 1.2, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        frame2.current,
        { y: 250, opacity: 0, scale: 0.95 },
        { y: -50, opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        "<"
      )
      .fromTo(
        frame3.current,
        { y: 180, opacity: 0, rotate: 3 },
        { y: -20, opacity: 1, rotate: 0, duration: 1.2, ease: "power2.out" },
        "<"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef} data-scene="13"
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center p-6 border-b border-royal-gold-20"
    >
      {/* Background Image & Dim */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/images/scene01_palace.png"
          alt="Palace Backdrop"
          fill
          style={{ objectFit: "cover", objectPosition: "top", opacity: 0.2 }}
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-radial-gold-glow" />
      </div>

      {/* Floating Sparkles */}
      <Sparkles count={15} />

      {/* Header */}
      <div ref={titleRef} className="relative z-10 text-center mb-12">
        <span className="text-10px tracking-30pct text-royal-gold uppercase font-semibold block mb-2">
          Captured Moments
        </span>
        <h2 className="text-3xl md-text-5xl text-ivory-white font-serif font-light">
          Wedding Gallery
        </h2>
        <div className="w-16 h-1px bg-royal-gold mx-auto mt-4" />
      </div>

      {/* Gallery Wall */}
      <div className="relative z-10 flex flex-row gap-6 md-gap-12 justify-center items-center w-full max-w-5xl h-50vh px-4">
        {/* Frame 1: Bride */}
        <div
          ref={frame1}
          className="w-180 md-w-240 aspect-3-4 bg-frame-dark border-6px border-royal-gold rounded shadow-2xl p-2 flex flex-col justify-between gold-glow-card"
          style={{ width: "180px", maxWidth: "240px" }}
        >
          <div className="relative w-full h-85pct bg-zinc-900 border border-black overflow-hidden" style={{ position: "relative" }}>
            <Image
              src="/images/bride_portrait.png"
              alt="Ananya Portrait"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              sizes="(max-width: 768px) 160px, 220px"
              loading="lazy"
            />
          </div>
          <span className="text-9px tracking-wider text-champagne-gold text-center block mt-1 uppercase font-semibold">
            Ananya
          </span>
        </div>

        {/* Frame 2: Couple Center */}
        <div
          ref={frame2}
          className="w-200 md-w-280 aspect-4-5 bg-frame-dark border-8px rounded-lg shadow-2xl p-3 flex flex-col justify-between gold-glow-card"
          style={{ width: "200px", maxWidth: "280px", borderColor: "var(--champagne-gold)" }}
        >
          <div className="relative w-full h-88pct bg-zinc-900 border border-black overflow-hidden" style={{ position: "relative" }}>
            <Image
              src="/images/scene04_courtyard.png"
              alt="Udaipur Courtyard"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              sizes="(max-width: 768px) 180px, 260px"
              loading="lazy"
            />
          </div>
          <span className="text-10px tracking-widest text-royal-gold text-center block mt-1 uppercase font-bold">
            Love in Udaipur
          </span>
        </div>

        {/* Frame 3: Groom */}
        <div
          ref={frame3}
          className="w-180 md-w-240 aspect-3-4 bg-frame-dark border-6px border-royal-gold rounded shadow-2xl p-2 flex flex-col justify-between gold-glow-card"
          style={{ width: "180px", maxWidth: "240px" }}
        >
          <div className="relative w-full h-85pct bg-zinc-900 border border-black overflow-hidden" style={{ position: "relative" }}>
            <Image
              src="/images/groom_portrait.png"
              alt="Rohan Portrait"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              sizes="(max-width: 768px) 160px, 220px"
              loading="lazy"
            />
          </div>
          <span className="text-9px tracking-wider text-champagne-gold text-center block mt-1 uppercase font-semibold">
            Rohan
          </span>
        </div>
      </div>
    </section>
  );
}




