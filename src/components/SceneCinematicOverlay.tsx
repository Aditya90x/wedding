"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SceneCinematicOverlay() {
  const [isCinematic, setIsCinematic] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [subtitle, setSubtitle] = useState("Scroll to begin the royal journey...");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const droneNodesRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Subtitles based on current scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const height = window.innerHeight;
      const sceneIndex = Math.floor(scrollPos / height);

      const subtitles = [
        "Welcome to the Royal Palace of Udaipur... Scroll to enter.",
        "We begin with the divine blessings of Lord Ganesha...",
        "The Sharma & Goel families cordially invite you to celebrate...",
        "Presenting our beautiful couple, Rohan and Ananya...",
        "Mark the date: Friday, December 18, 2026...",
        "Every love story is beautiful, but ours is our favorite...",
        "Let the festivities begin! Henna and stains of love...",
        "Drenching the couple in the golden glow of turmeric...",
        "Put on your dancing shoes for a grand musical Sangeet night...",
        "Two rings, two hearts, and a promise of forever...",
        "The groom arrives in style! Welcome the Baraat procession...",
        "The sacred Pheras and eternal vows under the stars...",
        "Join us for toasts, cheers, and gourmet dining at the Reception...",
        "Moments captured in time... Our wedding gallery...",
        "Meet the pillars of our lives... Our beloved family...",
        "Experience the royalty... Join us at the Jag Mandir Palace, Udaipur...",
        "Kindly RSVP to grace us with your esteemed presence...",
        "Thank you for being a part of our eternal love story."
      ];

      if (sceneIndex >= 0 && sceneIndex < subtitles.length) {
        setSubtitle(subtitles[sceneIndex]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Web Audio API Tanpura/Meditation Drone Synthesizer
  const startDrone = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Main Gain Node
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.0, ctx.currentTime);
      // Fade in smoothly
      mainGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2);
      mainGain.connect(ctx.destination);
      gainNodeRef.current = mainGain;

      // Base Tanpura frequencies (C#3 fundamental ~138.6Hz)
      // Pa - Sa - Sa - Sa structure (G#3 - C#4 - C#4 - C#3)
      const baseFreq = 138.6; 
      const frequencies = [
        baseFreq * 1.5, // G#3 (Dominant fifth)
        baseFreq * 2.0, // C#4 (Tonic octave)
        baseFreq * 2.0, // C#4 (Tonic octave duplicate)
        baseFreq,       // C#3 (Fundamental tonic)
      ];

      frequencies.forEach((freq, idx) => {
        // Fundamental oscillator
        const osc = ctx.createOscillator();
        // Warm saw/triangle mix for string timbre simulation
        osc.type = idx % 2 === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Individual modulation to create string plucking/shimmer effect
        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.3, ctx.currentTime);
        
        // Pluck LFO modulation
        const lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.2 + idx * 0.15, ctx.currentTime); // slow modulation

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.15, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);
        osc.connect(oscGain);
        oscGain.connect(mainGain);

        osc.start();
        lfo.start();

        droneNodesRef.current.push(osc);
        droneNodesRef.current.push(lfo); // Keep reference to stop later
      });

    } catch (e) {
      console.error("Failed to start synthesizer drone:", e);
    }
  };

  const stopDrone = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      const ctx = audioContextRef.current;
      const gain = gainNodeRef.current;
      try {
        // Fade out smoothly
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 1);
        
        setTimeout(() => {
          droneNodesRef.current.forEach(node => {
            try { node.stop(); } catch (err) {}
          });
          droneNodesRef.current = [];
        }, 1100);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Audio Playback Handler
  useEffect(() => {
    if (isPlayingMusic && !isMuted) {
      // 1. Try to play background shehnai/sitar track
      if (audioRef.current) {
        audioRef.current.volume = 0.45;
        audioRef.current.play().catch((err) => {
          console.warn("Audio play blocked by browser, falling back to Web Audio Drone", err);
          // 2. Browser blocked it or network offline, trigger local synthesis
          startDrone();
        });
      } else {
        startDrone();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopDrone();
    }

    return () => {
      stopDrone();
    };
  }, [isPlayingMusic, isMuted]);
 
  // Listen for first user interaction (click/touchstart) on the window to start shehnai music automatically
  useEffect(() => {
    const handleUserGesture = () => {
      setIsPlayingMusic(true);
      // Remove listeners once music starts
      window.removeEventListener("click", handleUserGesture);
      window.removeEventListener("touchstart", handleUserGesture);
    };

    window.addEventListener("click", handleUserGesture, { passive: true });
    window.addEventListener("touchstart", handleUserGesture, { passive: true });

    return () => {
      window.removeEventListener("click", handleUserGesture);
      window.removeEventListener("touchstart", handleUserGesture);
    };
  }, []);

  // Auto-scrolling loop
  useEffect(() => {
    if (!isCinematic) return;

    let rafId: number;
    const scrollSpeed = 0.95; // pixels per frame for perfect slow reading speed
    let active = true;

    const scroll = () => {
      if (!active) return;
      window.scrollBy(0, scrollSpeed);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 3) {
        setIsCinematic(false);
        return;
      }

      rafId = requestAnimationFrame(scroll);
    };

    rafId = requestAnimationFrame(scroll);

    return () => {
      active = false;
      cancelAnimationFrame(rafId);
    };
  }, [isCinematic]);

  const toggleCinematic = () => {
    const nextState = !isCinematic;
    setIsCinematic(nextState);
    if (nextState) {
      setIsPlayingMusic(true);
    }
  };

  return (
    <>
      {/* Hidden Audio Element with multiple fallback direct links */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://www.orangefreesounds.com/wp-content/uploads/2020/09/Sitar-music.mp3"
      />

      {/* Floating Cinematic & Music Control Panel */}
      <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 bg-black/85 border border-royal-gold/40 p-2.5 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.25)] backdrop-blur-md">
        {/* Cinematic Auto-Play Button */}
        <button
          onClick={toggleCinematic}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 text-base cursor-pointer ${
            isCinematic
              ? "bg-royal-gold text-black shadow-[0_0_15px_var(--royal-gold)] scale-105"
              : "bg-[#1c1103] text-royal-gold border border-royal-gold/30 hover:bg-royal-gold hover:text-black"
          }`}
          title={isCinematic ? "Stop Cinematic / सिनेमाई यात्रा रोकें" : "Start Cinematic / सिनेमाई यात्रा शुरू करें"}
        >
          <span>🎥</span>
        </button>

        {/* Shehnai Music Play/Mute Button */}
        <button
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 text-base cursor-pointer ${
            isPlayingMusic
              ? "bg-royal-gold text-black shadow-[0_0_12px_rgba(212,175,55,0.3)]"
              : "bg-[#1c1103] text-royal-gold border border-royal-gold/30 hover:bg-royal-gold hover:text-black"
          }`}
          title={isPlayingMusic ? "Mute Music / शहनाई बंद करें" : "Play Music / शहनाई चालू करें"}
        >
          <span>{isPlayingMusic ? "🎵" : "🔇"}</span>
        </button>
      </div>

      {/* Cinematic Mode Overlay (Letterboxing and Subtitles) */}
      <AnimatePresence>
        {isCinematic && (
          <>
            {/* Top Letterbox Bar */}
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="cinematic-bar-top flex items-center justify-center px-6 z-[10000]"
            >
              <span className="text-[10px] tracking-[0.3em] text-royal-gold uppercase font-semibold">
                Ananya &amp; Rohan
              </span>
            </motion.div>

            {/* Bottom Letterbox Bar */}
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="cinematic-bar-bottom flex items-center justify-center px-4 z-[10000]"
            >
              {/* Subtitles */}
              <motion.p
                key={subtitle}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.5 }}
                className="text-xs md:text-sm tracking-wide text-champagne-gold font-serif italic text-center text-shadow-sm max-w-xl truncate"
              >
                {subtitle}
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
