"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
