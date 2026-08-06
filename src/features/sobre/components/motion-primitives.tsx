import { useRef, useEffect, useState } from "react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

// ── Shared animation variants ─────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

export const fadeSlideUp: Variants = {
  hidden:  { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.62, ease: [0.25, 0.1, 0.25, 1] } },
};

// ── StaggerSection / StaggerItem ──────────────────────────────────────────────

export function StaggerSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-55px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} variants={fadeSlideUp}>{children}</motion.div>;
}

// ── LineReveal ────────────────────────────────────────────────────────────────
// Each line slides up from behind an overflow:hidden clip boundary.

export function LineReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "108%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.84, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// ── AnimatedCounter ───────────────────────────────────────────────────────────
// Writes imperatively to the DOM — zero React re-renders per frame.

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motVal = useMotionValue(0);
  const spring = useSpring(motVal, { stiffness: 58, damping: 14 });

  useEffect(() => {
    if (!inView) return;
    const c = animate(motVal, value, { duration: 2.3, ease: "easeOut" });
    return c.stop;
  }, [inView, value, motVal]);

  useEffect(() =>
    spring.on("change", v => {
      if (ref.current) ref.current.textContent = prefix + Math.round(v).toLocaleString("pt-BR") + suffix;
    }),
    [spring, prefix, suffix],
  );

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

// ── MagneticButton ────────────────────────────────────────────────────────────
// Padded capture field pulls the button 28 % toward cursor.
// Sweep gradient fires once on enter via Framer's imperative animate().

export function MagneticButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLSpanElement>(null);
  const bx = useMotionValue(0), by = useMotionValue(0);
  const sx = useSpring(bx, { stiffness: 200, damping: 18, mass: 0.6 });
  const sy = useSpring(by, { stiffness: 200, damping: 18, mass: 0.6 });
  const [hovered, setHovered] = useState(false);

  function onMove(e: React.MouseEvent) {
    const r = wrapRef.current?.getBoundingClientRect(); if (!r) return;
    bx.set((e.clientX - r.left - r.width  / 2) * 0.28);
    by.set((e.clientY - r.top  - r.height / 2) * 0.28);
  }
  function onLeave() { bx.set(0); by.set(0); setHovered(false); }
  async function onEnter() {
    setHovered(true);
    if (sweepRef.current) await animate(sweepRef.current, { x: ["-130%", "320%"] }, { duration: 0.65, ease: [0.4, 0, 0.2, 1] });
  }

  return (
    <div ref={wrapRef} className="relative inline-block p-10 -m-10" onMouseMove={onMove} onMouseLeave={onLeave} onMouseEnter={onEnter}>
      <motion.button
        style={{ x: sx, y: sy }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        // Era branco sobre fundo escuro; na superfície #f4f7fb o botão passa a
        // ser a tinta da marca para não sumir no papel.
        className="relative overflow-hidden inline-flex items-center gap-2.5 bg-gradient-to-t from-[#285992] to-[#427ab9] text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-[#285992]/25"
      >
        <span
          ref={sweepRef}
          aria-hidden
          className="absolute inset-y-0 w-[50%] pointer-events-none"
          style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)", transform: "translateX(-130%) skewX(-15deg)" }}
        />
        <motion.span animate={{ letterSpacing: hovered ? "0.04em" : "0em" }} transition={{ duration: 0.32 }}>
          {children}
        </motion.span>
        <motion.span animate={{ x: hovered ? 5 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </motion.button>
    </div>
  );
}

// ── Section / SectionHeader ───────────────────────────────────────────────────

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`py-24 lg:py-32 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  badge, title, titleHighlight, subtitle,
}: {
  badge:           string;
  title:           string;
  titleHighlight?: string;
  subtitle?:       string;
}) {
  return (
    <StaggerSection className="text-center mb-16 lg:mb-20">
      <StaggerItem>
        <SectionEyebrow>{badge}</SectionEyebrow>
      </StaggerItem>
      <StaggerItem>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1e293b] tracking-tighter leading-none max-w-3xl mx-auto mb-5">
          {title}{" "}
          {titleHighlight && (
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          )}
        </h2>
      </StaggerItem>
      {subtitle && (
        <StaggerItem>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        </StaggerItem>
      )}
    </StaggerSection>
  );
}
