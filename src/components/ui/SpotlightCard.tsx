"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(240, 24, 108, 0.18)",
  enableTilt = false,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Mouse coordinate relative to card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D tilt springs
  const rotateX = useSpring(0, { stiffness: 120, damping: 14 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 14 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX.set(x);
      mouseY.set(y);

      if (enableTilt && !shouldReduceMotion) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = ((y - centerY) / centerY) * -7;
        const tiltY = ((x - centerX) / centerX) * 7;
        rotateX.set(tiltX);
        rotateY.set(tiltY);
      }
    },
    [enableTilt, mouseX, mouseY, rotateX, rotateY, shouldReduceMotion]
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: enableTilt ? 1000 : undefined,
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: enableTilt ? "preserve-3d" : undefined,
      }}
      className={`group relative overflow-hidden rounded-3xl border border-border/80 bg-surface/90 transition-all duration-300 ${className}`}
      {...(props as any)}
    >
      {/* Interactive Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, ${spotlightColor}, transparent 60%)`
            : "none",
        }}
        aria-hidden="true"
      />

      {/* Dynamic Specular Border Highlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl border border-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(280px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(240, 24, 108, 0.45), transparent 70%) border-box`
            : "none",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
