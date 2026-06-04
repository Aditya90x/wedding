"use client";

import { useEffect, useState } from "react";

interface SparkleProps {
  count?: number;
}

const SPARKLES_STABLE = [
  { left: "8%",   bottom: "12%", size: 3, dur: 4.5, delay: 0.0 },
  { left: "22%",  bottom: "25%", size: 4, dur: 3.8, delay: 0.7 },
  { left: "35%",  bottom: "18%", size: 2, dur: 5.2, delay: 1.5 },
  { left: "48%",  bottom: "30%", size: 5, dur: 4.1, delay: 0.2 },
  { left: "62%",  bottom: "15%", size: 3, dur: 4.9, delay: 1.1 },
  { left: "75%",  bottom: "28%", size: 4, dur: 3.6, delay: 2.0 },
  { left: "88%",  bottom: "22%", size: 2, dur: 5.0, delay: 0.5 },
  { left: "15%",  bottom: "35%", size: 4, dur: 4.3, delay: 1.8 },
  { left: "28%",  bottom: "10%", size: 3, dur: 4.7, delay: 0.9 },
  { left: "42%",  bottom: "20%", size: 2, dur: 3.9, delay: 2.3 },
  { left: "55%",  bottom: "38%", size: 5, dur: 5.5, delay: 0.4 },
  { left: "70%",  bottom: "12%", size: 3, dur: 4.2, delay: 1.3 },
  { left: "82%",  bottom: "32%", size: 4, dur: 4.8, delay: 2.7 },
  { left: "95%",  bottom: "15%", size: 2, dur: 3.5, delay: 0.8 },
  { left: "5%",   bottom: "28%", size: 3, dur: 5.1, delay: 1.6 }
];

export default function Sparkles({ count = 12 }: SparkleProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10">
      {SPARKLES_STABLE.slice(0, Math.min(count, SPARKLES_STABLE.length)).map((p, i) => (
        <span
          key={i}
          className="sparkle-particle"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.size + "px",
            height: p.size + "px",
            animationDuration: p.dur + "s",
            animationDelay: p.delay + "s",
          }}
        />
      ))}
    </div>
  );
}
