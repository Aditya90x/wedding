"use client";


import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Sparkles from "../Sparkles";

/* ─── Portal-based modal so it escapes the section's CSS contain ─── */
function RSVPModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: { name: string; guests: string; attending: string; preferences: string; message: string };
  setForm: (f: { name: string; guests: string; attending: string; preferences: string; message: string }) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted || !isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflowY: "auto",
            padding: "40px 16px 80px",
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Backdrop (clickable) */}
          <div
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: -1,
            }}
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "480px",
              background: "linear-gradient(135deg, #120a02 0%, #0a0501 60%, #000 100%)",
              border: "2px solid rgba(212,175,55,0.7)",
              borderRadius: "18px",
              padding: "28px 24px 32px",
              boxShadow: "0 0 60px rgba(212,175,55,0.2), 0 30px 80px rgba(0,0,0,0.8)",
            }}
          >
            {/* Sparkles inside modal */}
            <Sparkles count={6} />

            {/* Corner accents */}
            <div style={{ position:"absolute", top:10, left:10, width:20, height:20, borderTop:"1px solid rgba(212,175,55,0.5)", borderLeft:"1px solid rgba(212,175,55,0.5)" }} />
            <div style={{ position:"absolute", top:10, right:10, width:20, height:20, borderTop:"1px solid rgba(212,175,55,0.5)", borderRight:"1px solid rgba(212,175,55,0.5)" }} />
            <div style={{ position:"absolute", bottom:10, left:10, width:20, height:20, borderBottom:"1px solid rgba(212,175,55,0.5)", borderLeft:"1px solid rgba(212,175,55,0.5)" }} />
            <div style={{ position:"absolute", bottom:10, right:10, width:20, height:20, borderBottom:"1px solid rgba(212,175,55,0.5)", borderRight:"1px solid rgba(212,175,55,0.5)" }} />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position:"absolute", top:14, right:14,
                background:"transparent", border:"none", cursor:"pointer",
                color:"rgba(247,231,206,0.6)", zIndex:10, padding:4,
                lineHeight:1,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Header */}
            <div style={{ textAlign:"center", marginBottom:24, position:"relative", zIndex:2 }}>
              {/* Rotating mandala */}
              <div style={{
                width:56, height:56, margin:"0 auto 10px",
                display:"flex", alignItems:"center", justifyContent:"center",
                position:"relative"
              }}>
                <svg
                  width="56" height="56" viewBox="0 0 100 100"
                  style={{ position:"absolute", animation:"spin 30s linear infinite", opacity:0.35 }}
                >
                  <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="0.6" fill="none" strokeDasharray="4,4"/>
                  <circle cx="50" cy="50" r="36" stroke="#D4AF37" strokeWidth="0.4" fill="none" strokeDasharray="2,6"/>
                </svg>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                  <path d="M12 2C8 2 6 5 6 8s3 4 3 6-3 3-5 4M12 2c4 0 6 3 6 6s-3 4-3 6 3 3 5 4"/>
                  <circle cx="10" cy="6" r="1" fill="#D4AF37"/>
                  <circle cx="14" cy="6" r="1" fill="#D4AF37"/>
                </svg>
              </div>
              <span style={{ display:"block", fontSize:10, letterSpacing:"0.25em", color:"#D4AF37", textTransform:"uppercase", fontWeight:700, marginBottom:4 }}>
                RSVP Registration
              </span>
              <h3 style={{ fontFamily:"'Cinzel', serif", fontSize:20, color:"#FFFFF0", fontWeight:400, margin:0 }}>
                Please Share Details
              </h3>
              <div style={{ width:48, height:1, background:"rgba(212,175,55,0.4)", margin:"10px auto 0" }} />
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} style={{ display:"flex", flexDirection:"column", gap:18, position:"relative", zIndex:2 }}>
              
              {/* Name */}
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <label htmlFor="rsvp-name" style={{ fontSize:10, letterSpacing:"0.2em", color:"#D4AF37", textTransform:"uppercase", fontWeight:700 }}>
                  Guest Name *
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your full name"
                  style={{
                    width:"100%",
                    background:"rgba(24,17,7,0.95)",
                    border:"1px solid rgba(212,175,55,0.35)",
                    borderRadius:10,
                    padding:"13px 16px",
                    fontSize:14,
                    color:"#FFFFF0",
                    outline:"none",
                    fontFamily:"'Montserrat', sans-serif",
                    caretColor:"#D4AF37",
                    transition:"border-color 0.25s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(212,175,55,0.7)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(212,175,55,0.35)"}
                />
              </div>

              {/* Guests + Attending row */}
              <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                {/* Guests */}
                <div style={{ flex:1, minWidth:120, display:"flex", flexDirection:"column", gap:6 }}>
                  <label htmlFor="rsvp-guests" style={{ fontSize:10, letterSpacing:"0.2em", color:"#D4AF37", textTransform:"uppercase", fontWeight:700 }}>
                    No. of Guests
                  </label>
                  <select
                    id="rsvp-guests"
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    style={{
                      width:"100%",
                      background:"rgba(24,17,7,0.95)",
                      border:"1px solid rgba(212,175,55,0.35)",
                      borderRadius:10,
                      padding:"13px 14px",
                      fontSize:14,
                      color:"#FFFFF0",
                      outline:"none",
                      fontFamily:"'Montserrat', sans-serif",
                      appearance:"none",
                      cursor:"pointer",
                    }}
                  >
                    {[1,2,3,4,5,6].map(n => (
                      <option key={n} value={String(n)} style={{ background:"#120a02", color:"#FFFFF0" }}>
                        {n} {n === 1 ? "Person" : "People"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Attending */}
                <div style={{ flex:1, minWidth:120, display:"flex", flexDirection:"column", gap:6 }}>
                  <span style={{ fontSize:10, letterSpacing:"0.2em", color:"#D4AF37", textTransform:"uppercase", fontWeight:700, display:"block" }}>
                    Will You Attend?
                  </span>
                  <div style={{
                    display:"flex",
                    background:"rgba(24,17,7,0.95)",
                    border:"1px solid rgba(212,175,55,0.35)",
                    borderRadius:10,
                    padding:4,
                    gap:4,
                    height:48,
                    alignItems:"center",
                  }}>
                    {["yes","no"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setForm({ ...form, attending: val })}
                        style={{
                          flex:1,
                          fontSize:11,
                          fontWeight:700,
                          letterSpacing:"0.12em",
                          textTransform:"uppercase",
                          borderRadius:7,
                          border:"none",
                          cursor:"pointer",
                          transition:"all 0.25s",
                          padding:"8px 4px",
                          background: form.attending === val
                            ? (val === "yes" ? "#D4AF37" : "#800000")
                            : "transparent",
                          color: form.attending === val
                            ? (val === "yes" ? "#000" : "#FFFFF0")
                            : "rgba(247,231,206,0.5)",
                          fontFamily:"'Montserrat', sans-serif",
                        }}
                      >
                        {val === "yes" ? "✔ Yes" : "✖ No"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dietary preference - radio buttons */}
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <span style={{ fontSize:10, letterSpacing:"0.2em", color:"#D4AF37", textTransform:"uppercase", fontWeight:700 }}>
                  Dietary Preference
                </span>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  {[
                    { value:"vegetarian", label:"🌿 Vegetarian", color:"#4ade80" },
                    { value:"non-veg", label:"🍗 Non-Veg", color:"#f87171" },
                    { value:"vegan", label:"🥗 Vegan", color:"#86efac" },
                    { value:"jain", label:"🙏 Jain", color:"#D4AF37" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm({ ...form, preferences: opt.value })}
                      style={{
                        fontSize:11,
                        fontWeight:600,
                        letterSpacing:"0.08em",
                        borderRadius:8,
                        border: form.preferences === opt.value
                          ? `1.5px solid ${opt.color}`
                          : "1px solid rgba(212,175,55,0.2)",
                        cursor:"pointer",
                        padding:"8px 14px",
                        background: form.preferences === opt.value
                          ? `rgba(212,175,55,0.12)`
                          : "rgba(24,17,7,0.8)",
                        color: form.preferences === opt.value ? opt.color : "rgba(247,231,206,0.6)",
                        transition:"all 0.2s",
                        fontFamily:"'Montserrat', sans-serif",
                        whiteSpace:"nowrap",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message / wishes */}
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <label htmlFor="rsvp-message" style={{ fontSize:10, letterSpacing:"0.2em", color:"#D4AF37", textTransform:"uppercase", fontWeight:700 }}>
                  Warm Wishes (Optional)
                </label>
                <textarea
                  id="rsvp-message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  placeholder="Write your warm wishes for the couple..."
                  style={{
                    width:"100%",
                    background:"rgba(24,17,7,0.95)",
                    border:"1px solid rgba(212,175,55,0.35)",
                    borderRadius:10,
                    padding:"12px 16px",
                    fontSize:14,
                    color:"#FFFFF0",
                    outline:"none",
                    fontFamily:"'Montserrat', sans-serif",
                    resize:"none",
                    caretColor:"#D4AF37",
                    lineHeight:1.6,
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(212,175,55,0.7)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(212,175,55,0.35)"}
                />
              </div>

              {/* SUBMIT BUTTON - always visible */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(212,175,55,0.7)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width:"100%",
                  background:"linear-gradient(135deg, #D4AF37 0%, #F7E7CE 50%, #D4AF37 100%)",
                  backgroundSize:"200% 100%",
                  color:"#000",
                  fontWeight:800,
                  fontSize:12,
                  letterSpacing:"0.2em",
                  textTransform:"uppercase",
                  border:"none",
                  borderRadius:12,
                  padding:"16px 24px",
                  cursor:"pointer",
                  fontFamily:"'Montserrat', sans-serif",
                  marginTop:4,
                  boxShadow:"0 0 20px rgba(212,175,55,0.4), 0 4px 20px rgba(0,0,0,0.5)",
                  position:"relative",
                  overflow:"hidden",
                }}
              >
                <span style={{ position:"relative", zIndex:1 }}>
                  ✨ Confirm RSVP ✨
                </span>
              </motion.button>

              {/* Privacy note */}
              <p style={{ textAlign:"center", fontSize:9, color:"rgba(247,231,206,0.4)", letterSpacing:"0.1em", marginTop:-6 }}>
                YOUR DETAILS ARE KEPT PRIVATE AND SECURE
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ─── Main RSVP Scene ─── */
export default function Scene17RSVP() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [isInvitationAccepted, setIsInvitationAccepted] = useState(false);
  const [isRSVPSubmitted, setIsRSVPSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", guests: "1", attending: "yes", preferences: "vegetarian", message: "" });

  useEffect(() => {
    setMounted(true);

    gsap.registerPlugin(ScrollTrigger);
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
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8 }
      ).fromTo(
        cardRef.current,
        { opacity: 0, rotateY: -15 },
        { opacity: 1, rotateY: 0, duration: 1, ease: "power2.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (isModalOpen) {
      if (document.body) {
        document.body.style.overflow = "hidden";
      }
    } else {
      if (document.body) {
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (document.body) {
        document.body.style.overflow = "";
      }
    };
  }, [isModalOpen]);

  const handleAcceptClick = () => {
    setIsInvitationAccepted(true);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRSVPSubmitted(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <section
        ref={containerRef} data-scene="18"
        className="relative w-full h-screen overflow-hidden bg-[#0a0500] flex flex-col items-center justify-center p-6 border-b border-royal-gold-20"
        style={{ perspective: "1000px" }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/images/scene01_palace.png"
            alt="Palace RSVP Backdrop"
            fill
            style={{ objectFit: "cover", objectPosition: "top", opacity: 0.25 }}
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-radial-maroon-glow-4" />
        </div>

        {/* Floating Sparkles */}
        <Sparkles count={15} />

        {/* Header */}
        <div ref={titleRef} className="relative z-10 text-center mb-8">
          <span className="text-10px tracking-30pct text-royal-gold uppercase font-semibold block mb-2">
            R. S. V. P.
          </span>
          <h2 className="text-3xl md-text-5xl text-ivory-white font-serif font-light">
            Kindly Respond
          </h2>
          <div className="w-16 h-1px bg-royal-gold mx-auto mt-4" />
        </div>

        {/* RSVP Main Card */}
        <div
          ref={cardRef}
          className="relative z-10 w-full max-w-440 bg-gradient-to-br from-[#1c1103]/90 to-[#0c0500]/95 border-2 border-royal-gold/60 rounded-2xl p-8 shadow-card-heavy text-center flex flex-col items-center justify-center min-h-[340px] gold-glow-card"
        >
          {/* Ornate Arch Vector */}
          <div className="absolute inset-3 border border-royal-gold/20 rounded-xl pointer-events-none z-0 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" stroke="var(--royal-gold)" strokeWidth="0.25">
              <path d="M10,2 L90,2 Q90,10 96,20 L96,80 Q90,90 90,98 L10,98 Q10,90 4,80 L4,20 Q10,10 10,2 Z" />
              <path d="M50,6 Q36,18 25,28 Q14,38 14,50 L14,94 L86,94 L86,50 Q86,38 75,28 Q64,18 50,6 Z" strokeDasharray="1,2" />
            </svg>
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-royal-gold/80" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-royal-gold/80" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-royal-gold/80" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-royal-gold/80" />
          </div>

          {/* Card Content */}
          <div className="relative z-10 w-full flex flex-col items-center justify-center">
            {/* Royal Medallion */}
            <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
              <div className="absolute inset-0 opacity-40">
                <svg className="w-full h-full animate-spin" style={{ animationDuration: "35s" }} viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" stroke="var(--royal-gold)" strokeWidth="0.5" fill="none" strokeDasharray="3,3" />
                  <path d="M50,2 L52,12 L60,10 L54,18 L62,20 L52,24 L56,34 L48,28 L40,34 L44,24 L34,20 L42,18 L36,10 L44,12 Z" fill="var(--royal-gold)" />
                  <circle cx="50" cy="50" r="35" stroke="var(--royal-gold)" strokeWidth="0.25" strokeDasharray="1,5" />
                </svg>
              </div>
              <div className="w-12 h-12 rounded-full border border-royal-gold/40 bg-black/70 flex items-center justify-center z-10 shadow-gold-glow">
                <svg width="24" height="24" viewBox="0 0 100 100" fill="none" className="stroke-royal-gold" strokeWidth="2" strokeLinecap="round">
                  <path d="M50 20 C42 20, 38 28, 38 36 C38 44, 50 48, 50 52 C50 58, 42 62, 34 62" />
                  <path d="M50 20 C58 20, 62 28, 62 36 C62 44, 50 48, 50 52 C50 58, 58 62, 66 62" />
                  <circle cx="46" cy="28" r="1.5" fill="var(--royal-gold)" />
                  <circle cx="54" cy="28" r="1.5" fill="var(--royal-gold)" />
                </svg>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!isInvitationAccepted ? (
                <motion.div
                  key="initial"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-6 py-4 max-w-xs"
                >
                  <p className="text-xs md:text-sm text-champagne-gold opacity-90 leading-relaxed font-medium">
                    We look forward to celebrating with you. Please accept the invitation to confirm your presence.
                  </p>
                  <div className="w-12 h-1px bg-royal-gold/30 my-1" />
                  <motion.button
                    onClick={handleAcceptClick}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.7)" }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-royal-gold text-black font-bold py-4 px-8 rounded text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer border border-royal-gold btn-shimmer-effect"
                    style={{ boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)" }}
                  >
                    Accept Invitation
                  </motion.button>
                  <span className="text-[9px] text-champagne-gold/60 uppercase tracking-widest">
                    Please respond by October 30, 2026
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="accepted"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-4 gap-5 max-w-xs"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-double border-royal-gold flex items-center justify-center shadow-gold-glow bg-black/40 animate-pulse">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--royal-gold)" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <div className="flex flex-col gap-2 text-center">
                    <h3 className="text-xl text-ivory-white font-serif font-medium">
                      {isRSVPSubmitted ? "RSVP Confirmed! 🎉" : "Thank You for Accepting!"}
                    </h3>
                    <p className="text-xs text-champagne-gold/90 leading-relaxed">
                      {isRSVPSubmitted
                        ? `Your RSVP is confirmed! ${form.guests} guest(s) · ${form.preferences.toUpperCase()} · ${form.message ? `"${form.message}"` : ""} · See you in Udaipur!`
                        : "Please complete your RSVP details to help us prepare for your arrival."}
                    </p>
                  </div>

                  {!isRSVPSubmitted ? (
                    <motion.button
                      onClick={() => setIsModalOpen(true)}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212, 175, 55, 0.6)" }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-royal-gold text-black font-bold py-3.5 px-8 rounded text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer border border-royal-gold btn-shimmer-effect"
                      style={{ boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)" }}
                    >
                      Submit RSVP Details
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={() => setIsModalOpen(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-transparent text-royal-gold border border-royal-gold/60 font-bold py-3.5 px-8 rounded text-xs uppercase tracking-widest cursor-pointer btn-shimmer-effect"
                    >
                      Edit RSVP Details
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contact Info Footer */}
            <div className="w-full border-t border-royal-gold-10 mt-6 pt-6 flex justify-around text-10px text-champagne-gold/70 tracking-wider uppercase font-semibold">
              <div className="text-center">
                <span className="block text-royal-gold mb-1 font-bold">Bride Family</span>
                <a href="tel:+919876543210" className="hover:text-white pointer-events-auto transition-colors">+91 98765 43210</a>
              </div>
              <div className="w-1px bg-royal-gold-10" />
              <div className="text-center">
                <span className="block text-royal-gold mb-1 font-bold">Groom Family</span>
                <a href="tel:+918765432109" className="hover:text-white pointer-events-auto transition-colors">+91 87654 32109</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Modal - renders at body level, NOT inside section */}
      {mounted && (
        <RSVPModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          form={form}
          setForm={setForm}
        />
      )}
    </>
  );
}
