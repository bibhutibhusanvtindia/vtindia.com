"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { clients } from "@/data/portfolio";
import { useLanguage } from "@/lib/translations";

const withLogos = clients.filter((c) => c.image);
const rowA = withLogos.filter((_, i) => i % 2 === 0).slice(0, 20);
const rowB = withLogos.filter((_, i) => i % 2 === 1).slice(0, 20);

export function ClientMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const { lang, t } = useLanguage();

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface-muted/60 py-24">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-primary/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-accent-strong/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {t("marquee_eyebrow")}
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
                {withLogos.length}{" "}
                {lang === "hi"
                  ? "प्रमाणित परिनियोजन "
                  : lang === "or"
                  ? "ପ୍ରମାଣିତ ପ୍ରକଳ୍ପ "
                  : "Verified Deployments Across "}
                <span className="gradient-text">
                  {lang === "hi"
                    ? "पूर्वी भारत और यूएई"
                    : lang === "or"
                    ? "ପୂର୍ବ ଭାରତ ଓ ୟୁଏଇ"
                    : "Eastern India & UAE"}
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {t("marquee_desc")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/clients"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-surface px-6 py-3.5 text-sm font-semibold shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
            >
              {t("marquee_btn")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </Container>

      <div className="relative mt-14 space-y-4">
        <MarqueeRow items={rowA} duration={58} reverse={false} paused={!!shouldReduceMotion} />
        <MarqueeRow items={rowB} duration={72} reverse paused={!!shouldReduceMotion} />

        {/* Edge gradient dissolves */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-background via-background/80 to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-background via-background/80 to-transparent z-10"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse,
  paused,
}: {
  items: typeof clients;
  duration: number;
  reverse: boolean;
  paused: boolean;
}) {
  return (
    <div className="group flex overflow-hidden" aria-hidden="true">
      {[0, 1].map((copy) => (
        <motion.div
          key={copy}
          className="flex shrink-0 gap-4 pr-4 [animation-play-state:running] group-hover:[animation-play-state:paused]"
          animate={paused ? undefined : { x: reverse ? ["-100%", "0%"] : ["0%", "-100%"] }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          {items.map((client, idx) => (
            <div
              key={`${client.name}-${copy}-${idx}`}
              className="flex h-20 w-44 items-center justify-center rounded-2xl border border-border/70 bg-surface/80 px-5 shadow-xs backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:bg-surface hover:shadow-md sm:h-22 sm:w-52"
            >
              {client.image && (
                <div className="relative h-12 w-full">
                  <Image
                    src={client.image}
                    alt={client.name}
                    fill
                    sizes="200px"
                    className="object-contain grayscale opacity-65 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                  />
                </div>
              )}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
