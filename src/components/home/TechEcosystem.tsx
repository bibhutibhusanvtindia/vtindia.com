"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, type MotionValue, useTransform } from "framer-motion";
import { ecosystemNodes } from "@/data/site";

/**
 * Hero technology-ecosystem visualisation.
 *
 * Pure SVG + Framer Motion — no canvas, no WebGL, no Three.js. The whole thing
 * is ~8KB of markup and animates on the compositor, so it costs far less than a
 * 3D library while reading as a deliberate "technology ecosystem" rather than a
 * generic abstract background.
 *
 * Every node label is a real VT India service or product (see data/site.ts).
 */

const VIEW = 520;
const CENTER = VIEW / 2;
const ORBIT = 176;

export function TechEcosystem({
  pointerX,
  pointerY,
}: {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const shouldReduceMotion = useReducedMotion();

  const nodes = useMemo(
    () =>
      ecosystemNodes.map((node, i) => {
        // start at -90deg so the first node sits at the top
        const angle = (i / ecosystemNodes.length) * Math.PI * 2 - Math.PI / 2;
        return {
          ...node,
          x: CENTER + Math.cos(angle) * ORBIT,
          y: CENTER + Math.sin(angle) * ORBIT,
          delay: i * 0.09,
          // alternate ring depth so parallax separates them
          depth: i % 2 === 0 ? 1 : 0.6,
        };
      }),
    [],
  );

  // Parallax: layers translate by different amounts. Restrained on purpose —
  // a few pixels reads as depth; more reads as motion sickness.
  const coreX = useTransform(pointerX, [-1, 1], [14, -14]);
  const coreY = useTransform(pointerY, [-1, 1], [10, -10]);
  const midX = useTransform(pointerX, [-1, 1], [24, -24]);
  const midY = useTransform(pointerY, [-1, 1], [18, -18]);
  const farX = useTransform(pointerX, [-1, 1], [36, -36]);
  const farY = useTransform(pointerY, [-1, 1], [26, -26]);

  const still = shouldReduceMotion;

  return (
    <div className="relative aspect-square w-full max-w-[560px]">
      {/* Layer 7 — ambient glow behind everything */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[90px]"
      />

      <motion.svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="relative h-full w-full overflow-visible"
        role="img"
        aria-label="Virtoy Technologies capability ecosystem: software, web, mobile, AR/VR, ERP, IoT, digital and automation connected to a central platform"
      >
        <defs>
          <radialGradient id="core-fill" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="var(--accent-strong)" />
            <stop offset="55%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--primary-strong)" />
          </radialGradient>
          <linearGradient id="spoke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.05" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.05" />
          </linearGradient>
          <filter id="soft-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layer 1 — orbit rings */}
        <motion.g style={still ? undefined : { x: farX, y: farY }} aria-hidden="true">
          {[ORBIT + 54, ORBIT, ORBIT - 62].map((r, i) => (
            <motion.circle
              key={r}
              cx={CENTER}
              cy={CENTER}
              r={r}
              fill="none"
              stroke="var(--primary)"
              strokeOpacity={0.14}
              strokeWidth={1}
              strokeDasharray={i === 1 ? "3 9" : undefined}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 * i, ease: "easeOut" }}
              style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            />
          ))}

          {/* slow counter-rotating dashed ring */}
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={ORBIT + 54}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity={0.22}
            strokeWidth={1.5}
            strokeDasharray="2 26"
            strokeLinecap="round"
            animate={still ? undefined : { rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          />
        </motion.g>

        {/* Layer 3/4 — spokes from core to each node, with a travelling data packet */}
        <motion.g style={still ? undefined : { x: midX, y: midY }} aria-hidden="true">
          {nodes.map((n, i) => (
            <g key={`spoke-${n.label}`}>
              <motion.line
                x1={CENTER}
                y1={CENTER}
                x2={n.x}
                y2={n.y}
                stroke="url(#spoke)"
                strokeWidth={1.25}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.3 + n.delay, ease: "easeOut" }}
              />
              {!still && (
                <motion.circle
                  // cx/cy must have real starting values: animating them from
                  // undefined makes the SVG parser reject every frame until the
                  // animation kicks in.
                  cx={CENTER}
                  cy={CENTER}
                  r={2.6}
                  fill="var(--accent-strong)"
                  initial={{ opacity: 0 }}
                  animate={{
                    cx: [CENTER, n.x],
                    cy: [CENTER, n.y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.6,
                    delay: 1.2 + i * 0.55,
                    repeat: Infinity,
                    repeatDelay: 3.4,
                    ease: "easeInOut",
                  }}
                />
              )}
            </g>
          ))}
        </motion.g>

        {/* Layer 2 — drifting data particles */}
        {!still && (
          <motion.g style={{ x: farX, y: farY }} aria-hidden="true">
            {Array.from({ length: 14 }, (_, i) => {
              const a = (i / 14) * Math.PI * 2;
              const r = 96 + ((i * 37) % 150);
              return (
                <motion.circle
                  key={`p-${i}`}
                  cx={CENTER + Math.cos(a) * r}
                  cy={CENTER + Math.sin(a) * r}
                  r={1.4 + (i % 3) * 0.5}
                  fill="var(--primary)"
                  animate={{ opacity: [0.15, 0.75, 0.15], y: [0, -9, 0] }}
                  transition={{
                    duration: 5 + (i % 5),
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </motion.g>
        )}

        {/* Layer 6 — central technology core */}
        <motion.g style={still ? undefined : { x: coreX, y: coreY }}>
          {!still && (
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={54}
              fill="var(--primary)"
              opacity={0.2}
              animate={{ scale: [1, 1.5], opacity: [0.28, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeOut" }}
              style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            />
          )}
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={50}
            fill="url(#core-fill)"
            filter="url(#soft-glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          />
          {/* hexagon mark inside the core — reads as "platform", not a logo */}
          <motion.path
            d={hexPath(CENTER, CENTER, 22)}
            fill="none"
            stroke="#fff"
            strokeOpacity={0.9}
            strokeWidth={1.75}
            strokeLinejoin="round"
            initial={{ opacity: 0, rotate: -25 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          />
          <motion.path
            d={hexPath(CENTER, CENTER, 12)}
            fill="none"
            stroke="#fff"
            strokeOpacity={0.55}
            strokeWidth={1.25}
            strokeLinejoin="round"
            animate={still ? undefined : { rotate: [0, 360] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          />
        </motion.g>

        {/* Layer 3 — capability nodes */}
        <motion.g style={still ? undefined : { x: midX, y: midY }}>
          {nodes.map((n) => (
            <motion.g
              key={n.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.55 + n.delay, ease: "easeOut" }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              <circle cx={n.x} cy={n.y} r={26} fill="var(--surface)" stroke="var(--border)" strokeWidth={1} />
              <circle cx={n.x} cy={n.y} r={26} fill="var(--primary)" fillOpacity={0.07} />
              {!still && (
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={26}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth={1.25}
                  animate={{ opacity: [0.15, 0.7, 0.15] }}
                  transition={{ duration: 3.6, delay: n.delay * 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <text
                x={n.x}
                y={n.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-foreground"
                style={{ fontSize: n.label.length > 6 ? 8.5 : 10, fontWeight: 600, letterSpacing: "0.02em" }}
              >
                {n.label}
              </text>
            </motion.g>
          ))}
        </motion.g>
      </motion.svg>

      {/* Layer 5 — floating capability panels, in DOM so they can use real type */}
      <FloatingPanel
        className="left-[-4%] top-[16%]"
        title="Enterprise ERP"
        meta="16 products live"
        delay={1.0}
        still={still}
        x={farX}
        y={farY}
      />
      <FloatingPanel
        className="right-[-3%] top-[30%]"
        title="AR / VR"
        meta="Immersive builds"
        delay={1.18}
        still={still}
        x={midX}
        y={midY}
      />
      <FloatingPanel
        className="bottom-[13%] left-[4%]"
        title="Mobile Apps"
        meta="Android & iOS"
        delay={1.36}
        still={still}
        x={midX}
        y={midY}
      />
    </div>
  );
}

function FloatingPanel({
  className,
  title,
  meta,
  delay,
  still,
  x,
  y,
}: {
  className: string;
  title: string;
  meta: string;
  delay: number;
  still: boolean | null;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute hidden rounded-xl border border-border bg-surface/85 px-3.5 py-2.5 shadow-lg shadow-primary/10 backdrop-blur-sm sm:block ${className}`}
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      style={still ? undefined : { x, y }}
    >
      <motion.div
        animate={still ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5.5, delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-[11px] font-semibold leading-none">{title}</span>
        </div>
        <p className="mt-1 text-[10px] leading-none text-muted">{meta}</p>
      </motion.div>
    </motion.div>
  );
}

function hexPath(cx: number, cy: number, r: number) {
  return (
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return `${i === 0 ? "M" : "L"}${(cx + Math.cos(a) * r).toFixed(2)},${(cy + Math.sin(a) * r).toFixed(2)}`;
    }).join(" ") + " Z"
  );
}
