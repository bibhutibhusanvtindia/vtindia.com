"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { heroSlides } from "@/data/site";
import { HeroVisual } from "@/components/home/HeroVisual";
import { toggleVoiceTour, isSpeaking, subscribeSpeech } from "@/lib/sound";
import { useLanguage } from "@/lib/translations";

export function Hero() {
  const [active, setActive] = useState(0);
  const [isTourPlaying, setIsTourPlaying] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { lang, t } = useLanguage();

  useEffect(() => {
    setIsTourPlaying(isSpeaking());
    const unsub = subscribeSpeech((state) => {
      setIsTourPlaying(state.isPlaying);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => setActive((i) => (i + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  // Pointer position normalised to -1..1, spring-smoothed so parallax glides.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const pointerY = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (shouldReduceMotion || event.pointerType !== "mouse") return;
      const target = event.currentTarget;
      const width = target.clientWidth || window.innerWidth;
      const height = target.clientHeight || window.innerHeight;
      const x = ((event.clientX - target.offsetLeft) / width) * 2 - 1;
      const y = ((event.clientY - target.offsetTop) / height) * 2 - 1;
      rawX.set(Math.max(-1, Math.min(1, x)));
      rawY.set(Math.max(-1, Math.min(1, y)));
    },
    [rawX, rawY, shouldReduceMotion],
  );

  const resetPointer = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  // Localized Slide Headings
  const currentEyebrow =
    active === 0
      ? t("hero_slide1_eyebrow")
      : active === 1
      ? t("hero_slide2_eyebrow")
      : t("hero_slide3_eyebrow");

  const currentTitle =
    active === 0
      ? t("hero_slide1_title")
      : active === 1
      ? t("hero_slide2_title")
      : t("hero_slide3_title");

  const currentSubtitle =
    active === 0
      ? t("hero_slide1_subtitle")
      : active === 1
      ? t("hero_slide2_subtitle")
      : t("hero_slide3_subtitle");

  const words = currentTitle.split(" ");
  const headWords = words.slice(0, -1).join(" ");
  const lastWord = words[words.length - 1];

  return (
    <section
      className="relative overflow-hidden bg-background"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      {/* Technical grid */}
      <div
        className="absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_72%_45%,#000_10%,transparent_70%)]"
        aria-hidden="true"
      />

      {/* Ambient brand glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute right-[4%] top-[6%] h-[30rem] w-[30rem] rounded-full bg-primary/[0.08] blur-[120px]"
          animate={shouldReduceMotion ? undefined : { x: [0, -22, 0], y: [0, 26, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute -left-52 top-1/3 h-[26rem] w-[26rem] rounded-full bg-accent-strong/[0.04] blur-[130px]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:grid-cols-[minmax(0,48fr)_minmax(0,52fr)] lg:gap-10 lg:py-20">
          {/* ---------------- LEFT: message ---------------- */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              {t("hero_badge")}
              <span className="hidden sm:inline">· {t("hero_badge_sub")}</span>
            </motion.div>

            <div className="relative mt-7">
              <div className="relative h-5">
                <AnimatePresence initial={false}>
                  <motion.p
                    key={`eyebrow-${active}-${lang}`}
                    className="absolute inset-x-0 top-0 text-xs font-semibold uppercase tracking-[0.2em] text-muted"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    {currentEyebrow}
                  </motion.p>
                </AnimatePresence>
              </div>

              <h1 className="relative mt-3 min-h-[7.8rem] text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-balance xs:min-h-[8.6rem] xs:text-[2.25rem] sm:mt-4 sm:min-h-[11.5rem] sm:text-5xl lg:min-h-[14.6rem] lg:text-[4.1rem] lg:leading-[1.05]">
                <AnimatePresence initial={false}>
                  <motion.span
                    key={`head-${active}-${lang}`}
                    className="absolute inset-x-0 top-0 block"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    {headWords}{" "}
                    <span className="relative inline-block">
                      <span className="gradient-text">{lastWord}</span>
                      <motion.span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r from-primary to-accent-strong"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                      />
                    </span>
                  </motion.span>
                </AnimatePresence>
              </h1>

              <div className="relative mt-4 min-h-[4.2rem] max-w-lg sm:mt-6 sm:min-h-[3.5rem]">
                <AnimatePresence initial={false}>
                  <motion.p
                    key={`sub-${active}-${lang}`}
                    className="absolute inset-x-0 top-0 text-sm leading-relaxed text-muted sm:text-lg"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.55, delay: 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    {currentSubtitle}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3 animate-rise-in [animation-delay:0.25s] sm:mt-8">
              <Link
                href="/services"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-strong hover:shadow-xl hover:shadow-primary/35"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative">{t("hero_cta_services")}</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  toggleVoiceTour(0);
                }}
                className={`group inline-flex items-center gap-2 rounded-full border px-6 py-4 text-sm font-semibold backdrop-blur transition-all duration-300 hover:-translate-y-0.5 ${
                  isTourPlaying
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-strong"
                    : "border-primary/40 bg-primary/5 text-primary hover:border-primary hover:bg-primary/10 hover:shadow-md hover:shadow-primary/15"
                }`}
              >
                {isTourPlaying ? (
                  <>
                    <span className="flex items-end gap-1 h-3.5 px-0.5">
                      <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_100ms] h-full" />
                      <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_200ms] h-3/4" />
                      <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_infinite_300ms] h-full" />
                    </span>
                    <span>⏸️ {lang === "hi" ? "रोकें" : lang === "or" ? "ରୋକନ୍ତୁ" : "Pause"}</span>
                  </>
                ) : (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <span>🎧 {t("hero_cta_voice_tour")}</span>
                  </>
                )}
              </button>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-6 py-4 text-sm font-semibold backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
              >
                {t("hero_cta_contact")}
              </Link>
            </div>

            {/* Trust Micro-Metrics Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                {t("hero_trust_clients")}
              </span>
              <span className="h-1 w-1 rounded-full bg-muted/40" />
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                {t("hero_trust_products")}
              </span>
              <span className="h-1 w-1 rounded-full bg-muted/40" />
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {t("hero_trust_support")}
              </span>
            </div>

            {/* Interactive Progress Tab Selectors */}
            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3" role="tablist" aria-label="Hero capability slides">
              {heroSlides.map((s, i) => {
                const isSelected = i === active;
                const labels =
                  lang === "hi"
                    ? ["एंटरप्राइज सॉफ्टवेयर", "एआर/वीआर स्पेशियल", "मोबाइल ऐप्स"]
                    : lang === "or"
                    ? ["ଏଣ୍ଟରପ୍ରାଇଜ୍ ସଫ୍ଟୱେର୍", "ଏଆର୍/ଭିଆର୍ ସ୍ପାସିଆଲ୍", "ମୋବାଇଲ୍ ଆପ୍"]
                    : ["Enterprise Software", "AR/VR Spatial 3D", "Mobile Applications"];
                return (
                  <button
                    key={s.title}
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={s.title}
                    onClick={() => setActive(i)}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border p-2.5 text-left transition-all duration-300 sm:p-3 ${
                      isSelected
                        ? "border-primary/50 bg-primary/[0.08] shadow-md shadow-primary/10"
                        : "border-border/70 bg-surface/50 hover:border-primary/30 hover:bg-surface/90"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-[10px] font-bold sm:text-xs ${isSelected ? "text-primary" : "text-muted"}`}>
                        0{i + 1}
                      </span>
                      <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-primary" : "bg-muted/40"}`} />
                    </div>
                    <span className={`mt-2 text-xs font-semibold leading-tight line-clamp-1 sm:text-sm ${isSelected ? "text-foreground" : "text-muted"}`}>
                      {labels[i]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---------------- RIGHT: Visual Stage ---------------- */}
          <HeroVisual active={active} pointerX={pointerX} pointerY={pointerY} />
        </div>
      </Container>
    </section>
  );
}
