"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import { triggerWelcomeGreeting } from "@/lib/sound";

export function IntroLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Instantly trigger welcome greeting simultaneously as logo pieces assemble
    const greetTimer = setTimeout(() => {
      triggerWelcomeGreeting(true);
    }, 200);

    // Browser gesture unlock listener: fires greeting immediately on user interaction if autoplay was paused
    const handleGestureUnlock = () => {
      triggerWelcomeGreeting(true);
    };

    window.addEventListener("pointerdown", handleGestureUnlock, { once: true });
    window.addEventListener("touchstart", handleGestureUnlock, { once: true });
    window.addEventListener("click", handleGestureUnlock, { once: true });
    window.addEventListener("keydown", handleGestureUnlock, { once: true });

    // Smooth progress counter from 0 to 100% over ~2.8 seconds matching speech duration
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 350);
          return 100;
        }
        return prev + Math.floor(Math.random() * 4 + 2);
      });
    }, 70);

    return () => {
      clearTimeout(greetTimer);
      clearInterval(interval);
      window.removeEventListener("pointerdown", handleGestureUnlock);
      window.removeEventListener("touchstart", handleGestureUnlock);
      window.removeEventListener("click", handleGestureUnlock);
      window.removeEventListener("keydown", handleGestureUnlock);
    };
  }, []);

  const handleEnterWithAudio = () => {
    triggerWelcomeGreeting(true);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          onClick={handleEnterWithAudio}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#fbf7f9] text-[#1a0a12] select-none cursor-pointer"
        >
          {/* Subtle Grid & Soft Ambient Magenta Glow */}
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="pointer-events-none absolute h-[32rem] w-[32rem] rounded-full bg-primary/[0.12] blur-[140px]" />

          {/* Central Animated Assembly Stage */}
          <div className="relative flex flex-col items-center">
            {/* Assembly Components Connecting Together */}
            <div className="relative flex h-32 w-80 items-center justify-center sm:h-36 sm:w-96">
              {/* Converging Laser / Guide Lines */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary to-transparent"
              />
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.4 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="absolute inset-y-0 w-[1.5px] bg-gradient-to-b from-transparent via-primary to-transparent"
              />

              {/* Left Logo Wing Assembly */}
              <motion.div
                initial={{ x: -100, opacity: 0, rotate: -35 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="absolute -left-2 top-1/2 -translate-y-1/2 flex items-center"
              >
                <div className="h-10 w-3 rounded-l-md border-l-2 border-y-2 border-primary bg-primary/20 shadow-[0_0_15px_rgba(240,24,108,0.8)]" />
                <div className="h-1 w-6 bg-primary" />
              </motion.div>

              {/* Right Logo Wing Assembly */}
              <motion.div
                initial={{ x: 100, opacity: 0, rotate: 35 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="absolute -right-2 top-1/2 -translate-y-1/2 flex items-center"
              >
                <div className="h-1 w-6 bg-accent-strong" />
                <div className="h-10 w-3 rounded-r-md border-r-2 border-y-2 border-accent-strong bg-accent-strong/20 shadow-[0_0_15px_rgba(255,77,148,0.8)]" />
              </motion.div>

              {/* Center Assembled Brand Mark */}
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 1.08, 1], opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="relative z-10 flex items-center justify-center p-4"
              >
                <div className="relative h-16 w-60 sm:h-20 sm:w-72">
                  <Image
                    src="/images/brand/logo-alt.png"
                    alt="Virtoy Technologies"
                    fill
                    priority
                    className="object-contain drop-shadow-[0_0_25px_rgba(240,24,108,0.65)]"
                  />
                </div>
              </motion.div>

              {/* Energy Shockwave Pulse on Assembly */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [0.8, 2.2], opacity: [0.8, 0] }}
                transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
                className="absolute h-24 w-24 rounded-full border-2 border-primary shadow-[0_0_30px_rgba(240,24,108,1)]"
              />
            </div>

            {/* Kinetic Slogan */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-6 flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-muted uppercase"
            >
              <span className="h-1 w-1 rounded-full bg-primary" />
              <span>Engineering the Future of IT &amp; AR/VR</span>
              <span className="h-1 w-1 rounded-full bg-primary" />
            </motion.div>

            {/* High-Tech Progress Counter */}
            <div className="mt-8 w-56">
              <div className="flex items-center justify-between font-mono text-[11px] text-muted">
                <span className="text-foreground/80 font-semibold">INITIALIZING SYSTEMS</span>
                <span className="font-bold text-primary">{Math.min(progress, 100)}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent-strong shadow-[0_0_10px_rgba(240,24,108,0.5)]"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>

            {/* Tap to Enter with Audio Badge */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              onClick={handleEnterWithAudio}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-white px-5 py-2 text-xs font-bold text-primary shadow-md shadow-primary/20 hover:scale-105 hover:bg-primary hover:text-white transition"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>🎧 Enter with Voice Audio &amp; 3D WebXR</span>
            </motion.button>
          </div>

          {/* Quick Skip Prompt */}
          <p className="absolute bottom-6 text-[11px] font-semibold text-muted/70 tracking-wider uppercase">
            Click anywhere to enter →
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
