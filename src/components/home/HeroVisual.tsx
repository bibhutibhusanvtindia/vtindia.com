"use client";

import Image from "next/image";
import { AnimatePresence, motion, MotionValue, useTransform } from "framer-motion";
import { CheckCircle2, Layers, ShieldCheck, Star } from "lucide-react";
import { heroSlides } from "@/data/site";

export function HeroVisual({
  pointerX,
  pointerY,
  active = 0,
}: {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  active?: number;
}) {
  const slide = heroSlides[active] || heroSlides[0];

  // Multilayer parallax transformations
  const imgX = useTransform(pointerX, [-1, 1], [-8, 8]);
  const imgY = useTransform(pointerY, [-1, 1], [-8, 8]);

  const card1X = useTransform(pointerX, [-1, 1], [14, -14]);
  const card1Y = useTransform(pointerY, [-1, 1], [14, -14]);

  const card2X = useTransform(pointerX, [-1, 1], [-16, 16]);
  const card2Y = useTransform(pointerY, [-1, 1], [16, -16]);

  const card3X = useTransform(pointerX, [-1, 1], [12, -12]);
  const card3Y = useTransform(pointerY, [-1, 1], [-12, 12]);

  return (
    <div className="relative w-full max-w-lg lg:max-w-xl">
      {/* Ambient background glow behind the curved frame */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-primary/25 via-accent-strong/15 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Main Organic Curved Container */}
      <motion.div
        style={{ x: imgX, y: imgY }}
        className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-surface/90 p-2.5 shadow-2xl shadow-primary/15 backdrop-blur-xl"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-surface-muted sm:aspect-[16/11]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.image}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>

          {/* Elegant subtle gradient overlay for contrast */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10"
            aria-hidden="true"
          />

          {/* Bottom badge inside the image */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between rounded-xl border border-white/20 bg-black/45 px-4 py-2.5 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={slide.locationLabel}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs font-semibold text-white"
                >
                  {slide.locationLabel}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-amber-400" />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Card 1: Top-Left with gentle vertical float */}
      <motion.div
        style={{ x: card1X, y: card1Y }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 -top-6 z-20 hidden rounded-2xl border border-border/90 bg-surface/95 p-4 shadow-xl backdrop-blur-xl sm:flex sm:items-center sm:gap-3.5 sm:max-w-xs"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.badge1Title}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <p className="truncate text-xs font-bold tracking-tight text-foreground">{slide.badge1Title}</p>
              <p className="truncate text-[11px] font-medium text-muted">{slide.badge1Subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Floating Card 2: Top-Right with reverse float */}
      <motion.div
        style={{ x: card2X, y: card2Y }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute -right-4 -top-4 z-20 hidden rounded-2xl border border-border/90 bg-surface/95 p-3.5 shadow-xl backdrop-blur-xl sm:flex sm:items-center sm:gap-3"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/25">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.badge2Title}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-xs font-bold tracking-tight text-foreground">{slide.badge2Title}</p>
              <p className="text-[10px] font-semibold text-primary">{slide.badge2Subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Floating Card 3: Bottom-Right with float */}
      <motion.div
        style={{ x: card3X, y: card3Y }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute -bottom-6 -right-4 z-20 hidden rounded-2xl border border-border/90 bg-surface/95 p-4 shadow-xl backdrop-blur-xl sm:flex sm:items-center sm:gap-3.5"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Layers className="h-5 w-5" />
        </div>
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.badge3Title}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-xs font-bold tracking-tight text-foreground">{slide.badge3Title}</p>
              <p className="text-[11px] font-medium text-muted">{slide.badge3Subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

