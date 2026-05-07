"use client";

import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";

interface HeroButtonProps {
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
}

const MAGNETIC = 0.28;
const SPRING = { stiffness: 320, damping: 20, mass: 0.5 };
const SNAP = { type: "spring", stiffness: 380, damping: 22 } as const;

const primaryVar = {
  idle: { scale: 1,    boxShadow: "0 4px 22px rgba(40,89,146,0.30)" },
  hover: { scale: 1.04, boxShadow: "0 8px 36px rgba(40,89,146,0.52)" },
  tap:   { scale: 0.96, boxShadow: "0 2px 10px rgba(40,89,146,0.18)" },
};

const secondaryVar = {
  idle:  { scale: 1,    background: "rgba(30,58,95,0.00)", boxShadow: "0 1px 10px rgba(30,58,95,0.06)" },
  hover: { scale: 1.04, background: "rgba(30,58,95,0.07)", boxShadow: "0 5px 22px rgba(30,58,95,0.14)" },
  tap:   { scale: 0.96, background: "rgba(30,58,95,0.12)", boxShadow: "0 1px 8px rgba(30,58,95,0.10)" },
};

// Shimmer: instant-reset on idle, single sweep on hover
const shimmerVar: Variants = {
  idle: { x: "-150%", transition: { duration: 0 } },
  hover: { x: "250%", transition: { duration: 0.55, ease: "easeOut" } },
};

const arrowVar = {
  idle: { x: 0 },
  hover: { x: 4 },
  tap: { x: 1 },
};

// Animated border overlay for secondary — its opacity drives the "sharpen" effect
const borderVar = {
  idle: { opacity: 0.28 },
  hover: { opacity: 0.85 },
  tap:  { opacity: 1.0 },
};

function HeroButton({
  variant = "primary",
  onClick,
  href,
  children,
  icon = true,
  className = "",
}: HeroButtonProps) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  function handleMouseMove(e: React.MouseEvent) {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width / 2)) * MAGNETIC);
    rawY.set((e.clientY - (r.top + r.height / 2)) * MAGNETIC);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  if (variant === "primary") {
    const cls = `relative inline-flex items-center px-8 h-14 text-base font-semibold text-white rounded-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 ${className}`;
    const sty = {
      x, y,
      background: "linear-gradient(135deg, #1e3a5f 0%, #285992 55%, #244248 100%)",
    };
    const inner = (
      <>
        {/* Diagonal shimmer beam — sweeps left-to-right on hover */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 pointer-events-none"
          style={{
            width: "50%",
            left: 0,
            skewX: -15,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
          }}
          variants={shimmerVar}
        />
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon && (
            <motion.span variants={arrowVar} transition={SNAP} className="inline-flex">
              <ArrowRight className="w-5 h-5" strokeWidth={2} />
            </motion.span>
          )}
        </span>
      </>
    );
    if (href) {
      return (
        <motion.a
          href={href}
          onClick={onClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          transition={SNAP}
          variants={primaryVar}
          className={cls}
          style={sty}
        >
          {inner}
        </motion.a>
      );
    }
    return (
      <motion.button
        type="button"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        transition={SNAP}
        variants={primaryVar}
        className={cls}
        style={sty}
      >
        {inner}
      </motion.button>
    );
  }

  // Secondary variant
  const cls = `relative inline-flex items-center px-8 h-14 text-base font-semibold text-[#1e3a5f] rounded-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f]/30 ${className}`;
  const sty = { x, y };
  const inner = (
    <>
      {/* Static outer border */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ border: "1.5px solid rgba(30,58,95,0.28)" }}
      />
      {/* Animated border that sharpens on hover */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ border: "1.5px solid rgba(30,58,95,0.78)" }}
        variants={borderVar}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <motion.span variants={arrowVar} transition={SNAP} className="inline-flex">
            <ArrowRight className="w-5 h-5" strokeWidth={2} />
          </motion.span>
        )}
      </span>
    </>
  );
  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        transition={SNAP}
        variants={secondaryVar}
        className={cls}
        style={sty}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      transition={SNAP}
      variants={secondaryVar}
      className={cls}
      style={sty}
    >
      {inner}
    </motion.button>
  );
}

export { HeroButton };
