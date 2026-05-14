"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { HeroButton } from "./hero-button";
import { useInternalHeroGsap } from "@/features/shared/hooks/use-internal-hero-gsap";

// ── Public interfaces ─────────────────────────────────────────────────────────

export interface HeroSlide {
  desktopImage: string;
  mobileImage: string;
  label?: string;
  alt: string;
}

export interface BaseInternalHeroProps {
  badgeText?: string;
  title: string | React.ReactNode;
  /** Tailwind classes injected into the <h1>. Falls back to the default dark-navy style. */
  titleClassName?: string;
  subtitle?: string;
  description?: string | React.ReactNode;
  /** Tailwind classes injected into the description <p>. Falls back to the default muted style. */
  descriptionClassName?: string;
  primaryCTA?: { label: string; href?: string; onClick?: () => void };
  secondaryCTA?: { label: string; href?: string; onClick?: () => void };
  /** Extra content rendered inside the CTA row (buttons, badges, etc.). */
  children?: React.ReactNode;
  /** Trust-badge labels rendered below the CTAs. Defaults to the standard three items. */
  trustItems?: string[];
  slides: HeroSlide[];
  /** Injected background layer (color + effects). Fills the hero absolutely behind all content. */
  background?: React.ReactNode;
}

// ── Internal constants ────────────────────────────────────────────────────────

const SLIDE_INTERVAL = 3500;
const TRUST_ITEMS    = ["Sem taxa de setup", "Cancele quando quiser", "Suporte incluso"];

// ── BorderBeam ────────────────────────────────────────────────────────────────
// Photorealistic "comet" effect: three layered SVG <path> copies (bloom, glow,
// sharp head) driven by a single MotionValue so they stay perfectly in sync.
// Spring-physics zip + random delay removes the mechanical loop feel.

function BorderBeam({
  children,
  className = "",
  radius    = 16,
  minDelay  = 0.8,
  maxDelay  = 2.5,
}: {
  children:  React.ReactNode;
  className?: string;
  radius?:   number;
  minDelay?: number;
  maxDelay?: number;
}) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ w: 0, h: 0 });

  // Absolute pixel position of the comet's leading edge along the path.
  const headPos  = useMotionValue(0);

  // perimRef lets the useTransform closures always read the latest perimeter
  // without becoming stale across resizes.
  const perimRef = useRef(0);

  // strokeDashoffset per layer: negative value = shift dash FORWARD along path.
  // All three layers share the same front (headPos); tails extend behind.
  const headSdo  = useTransform(headPos, v => -(v - perimRef.current * 0.05));
  const midSdo   = useTransform(headPos, v => -(v - perimRef.current * 0.15));
  const bloomSdo = useTransform(headPos, v => -(v - perimRef.current * 0.28));

  // ── Resize ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const sync = () => setDim({ w: el.offsetWidth, h: el.offsetHeight });
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Animation cycle ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!dim.w || !dim.h) return;

    const r = radius;
    const p = 2 * (dim.w - 2 * r) + 2 * (dim.h - 2 * r) + 2 * Math.PI * r;
    perimRef.current = p;

    let timer: ReturnType<typeof setTimeout>;
    let ctrl: ReturnType<typeof animate> | null = null;

    function scheduleNext() {
      const ms = (minDelay + Math.random() * (maxDelay - minDelay)) * 1000;
      timer = setTimeout(() => {
        // Place the comet head at the path start before each zip.
        headPos.set(p * 0.05);
        ctrl = animate(headPos, p * 0.80, {
          type:       "spring",
          stiffness:  280,
          damping:    22,
          onComplete: scheduleNext,
        });
      }, ms);
    }

    scheduleNext();
    return () => { clearTimeout(timer); ctrl?.stop(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dim.w, dim.h, radius, minDelay, maxDelay]);

  // ── SVG geometry ────────────────────────────────────────────────────────────
  const r = radius;
  const { w, h } = dim;
  const perim = w && h
    ? 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r
    : 0;

  // Clockwise rounded-rect path starting at the top-left → top edge.
  const d = perim
    ? `M ${r},0 L ${w - r},0 Q ${w},0 ${w},${r} L ${w},${h - r} Q ${w},${h} ${w - r},${h} L ${r},${h} Q 0,${h} 0,${h - r} L 0,${r} Q 0,0 ${r},0 Z`
    : "";

  // Layer lengths (fraction of perimeter).
  const headLen  = perim * 0.05;  // bright tip
  const midLen   = perim * 0.15;  // soft glow
  const bloomLen = perim * 0.28;  // hard bloom haze

  // Gap = perim ensures only one dash is ever visible on the path.
  const headArr  = `${headLen}  ${perim}`;
  const midArr   = `${midLen}   ${perim}`;
  const bloomArr = `${bloomLen} ${perim}`;

  const svgBase = "absolute inset-0 w-full h-full pointer-events-none overflow-visible";

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {children}

      {d && (
        <>
          {/* Layer 1 – Hard bloom (widest, blurriest) */}
          <svg aria-hidden="true" className={svgBase} style={{ zIndex: 30, filter: "blur(9px)" }}>
            <motion.path
              d={d} fill="none"
              stroke="rgba(200,225,255,0.20)" strokeWidth={14} strokeLinecap="round"
              strokeDasharray={bloomArr}
              style={{ strokeDashoffset: bloomSdo }}
            />
          </svg>

          {/* Layer 2 – Soft glow (medium blur) */}
          <svg aria-hidden="true" className={svgBase} style={{ zIndex: 31, filter: "blur(3.5px)" }}>
            <motion.path
              d={d} fill="none"
              stroke="rgba(220,240,255,0.55)" strokeWidth={5} strokeLinecap="round"
              strokeDasharray={midArr}
              style={{ strokeDashoffset: midSdo }}
            />
          </svg>

          {/* Layer 3 – Sharp head + static border ring (no blur) */}
          <svg aria-hidden="true" className={svgBase} style={{ zIndex: 32 }}>
            <path
              d={d} fill="none"
              stroke="rgba(255,255,255,0.12)" strokeWidth={1}
            />
            <motion.path
              d={d} fill="none"
              stroke="rgba(255,255,255,0.95)" strokeWidth={1.5} strokeLinecap="round"
              strokeDasharray={headArr}
              style={{ strokeDashoffset: headSdo }}
            />
          </svg>
        </>
      )}
    </div>
  );
}

// ── ScreenGlare ───────────────────────────────────────────────────────────────
// Diagonal highlight that sweeps once then waits. Lives inside an
// overflow-hidden container so it's clipped to the screen bounds.

function ScreenGlare({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 15 }}
    >
      <motion.div
        className="absolute inset-y-0 w-[55%]"
        style={{
          background:
            "linear-gradient(105deg, transparent 15%, rgba(255,255,255,0.07) 42%, rgba(255,255,255,0.10) 52%, transparent 85%)",
          skewX:        -12,
          mixBlendMode: "screen",
        }}
        animate={{ x: ["-110%", "320%", "320%"] }}
        transition={{
          duration: 8,
          times:    [0, 0.17, 1],
          ease:     ["easeOut", "linear"],
          repeat:   Infinity,
          delay,
        }}
      />
    </motion.div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

function BaseInternalHero({
  badgeText,
  title,
  titleClassName,
  subtitle,
  description,
  descriptionClassName,
  primaryCTA,
  secondaryCTA,
  children,
  trustItems = TRUST_ITEMS,
  slides,
  background,
}: BaseInternalHeroProps) {
  const [slide, setSlide] = useState(0);
  const sectionRef   = useRef<HTMLElement>(null);
  const isMultiSlide = slides.length > 1;

  useInternalHeroGsap(sectionRef);

  // ── Mouse parallax ──────────────────────────────────────────────────────────
  const rawX    = useMotionValue(0);
  const rawY    = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 50, damping: 18 });
  const smoothY = useSpring(rawY, { stiffness: 50, damping: 18 });

  const mobileTX  = useTransform(smoothX, [-1, 1], [ 14, -14]);
  const mobileTY  = useTransform(smoothY, [-1, 1], [ 10, -10]);

  function handleMouseMove(e: React.MouseEvent) {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set(((e.clientX - r.left) / r.width)  * 2 - 1);
    rawY.set(((e.clientY - r.top)  / r.height) * 2 - 1);
  }
  function handleMouseLeave() { rawX.set(0); rawY.set(0); }

  // ── Auto-advance ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isMultiSlide) return;
    const id = setInterval(() => setSlide(s => (s + 1) % slides.length), SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [isMultiSlide, slides.length]);

  return (
    <section
      ref={sectionRef}
      data-hero="section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* ── Background (injected by each page) ───────────────────────────── */}
      <div data-hero="bg" aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        {background}
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-36 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT ─────────────────────────────────────────────────────── */}
          <div data-hero="content">
            {badgeText && (
              <div
                data-hero="badge"
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-[#285992]/25 bg-white/60 backdrop-blur-sm shadow-sm"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#285992] opacity-70" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#285992]" />
                </span>
                <span className="text-[#244248] text-sm font-medium tracking-wide">{badgeText}</span>
              </div>
            )}

            <h1
              data-hero="title"
              className={titleClassName || "text-4xl sm:text-5xl lg:text-[3.15rem] font-bold text-[#244248] mb-4 leading-tight tracking-tight"}
            >
              {title}
            </h1>

            {subtitle && (
              <p className="text-base font-semibold text-[#285992]/80 mb-4 tracking-wide">
                {subtitle}
              </p>
            )}

            {description && (
              <p
                data-hero="description"
                className={descriptionClassName || "text-lg text-[#244248]/75 mb-8 leading-relaxed max-w-xl"}
              >
                {description}
              </p>
            )}

            <div data-hero="cta" className="flex flex-col sm:flex-row gap-4">
              {primaryCTA && (
                <HeroButton onClick={primaryCTA.onClick} href={primaryCTA.href}>
                  {primaryCTA.label}
                </HeroButton>
              )}
              {secondaryCTA && (
                <HeroButton variant="secondary" onClick={secondaryCTA.onClick} href={secondaryCTA.href}>
                  {secondaryCTA.label}
                </HeroButton>
              )}
            </div>

            {trustItems.length > 0 && (
              <div
                data-hero="trust"
                className="flex flex-wrap items-center gap-5 mt-8"
              >
                {trustItems.map(text => (
                  <div key={text} className="flex items-center gap-1.5 text-sm text-[#244248]/60">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            )}

            {children}
          </div>

          {/* ── RIGHT: Device showcase ──────────────────────────────────── */}
          <div
            data-hero="image"
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[640px]" style={{ paddingBottom: "11%" }}>

              {/* ── BROWSER ──────────────────────────────────────────────── */}
              <div className="relative z-10">
                <div>
                  {/* BorderBeam wraps the entire browser mockup */}
                  <BorderBeam radius={16} className="w-full">
                    <div
                      className="w-full bg-white rounded-2xl overflow-hidden"
                      style={{ boxShadow: "0 32px 72px rgba(36,66,72,0.18), 0 4px 16px rgba(0,0,0,0.07)" }}
                    >
                      {/* Safari-style chrome */}
                      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#f5f5f7] border-b border-gray-200/80">
                        <div className="flex gap-1.5 shrink-0">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="flex-1 flex items-center gap-1.5 bg-white rounded-md px-3 py-[5px] border border-gray-200/80 text-[11px] text-gray-500 min-w-0">
                          <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span className="truncate">focomultimidia.com</span>
                        </div>
                        {isMultiSlide && (
                          <div className="flex gap-1 shrink-0">
                            {slides.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setSlide(i)}
                                aria-label={`Slide ${i + 1}`}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  i === slide ? "w-4 bg-[#285992]" : "w-1.5 bg-gray-300 hover:bg-gray-400"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Screen area — ScreenGlare lives here */}
                      <div className="relative overflow-hidden bg-gray-50" style={{ height: "400px" }}>
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={`browser-${slide}`}
                            src={slides[slide].desktopImage}
                            alt={slides[slide].alt}
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                            className="absolute inset-0 w-full h-full object-cover object-top"
                          />
                        </AnimatePresence>

                        {isMultiSlide && slides[slide].label && (
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`chip-${slide}`}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.3 }}
                              className="absolute bottom-14 left-3 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-[#244248] shadow-sm border border-gray-100"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#285992] shrink-0" />
                              {slides[slide].label}
                            </motion.div>
                          </AnimatePresence>
                        )}

                        <ScreenGlare delay={1.5} />
                      </div>
                    </div>
                  </BorderBeam>
                </div>
              </div>

              {/* ── MOBILE ───────────────────────────────────────────────── */}
              <motion.div
                style={{ x: mobileTX, y: mobileTY }}
                className="absolute -bottom-[4%] -right-[7%] z-20 w-[240px]"
              >
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                >
                  {/* BorderBeam wraps the outer phone shell */}
                  <BorderBeam radius={26} minDelay={0.4} maxDelay={1.6}>
                    <div
                      className="bg-[#fbfbfb] rounded-[26px] p-[4px]"
                      style={{ boxShadow: "0 24px 56px rgba(0,0,0,0.38), 0 0 0 1px rgba(255,255,255,0.07)" }}
                    >
                      <div
                        className="relative bg-white rounded-[22px] overflow-hidden"
                        style={{ aspectRatio: "9/16.5" }}
                      >
                        {/* Dynamic Island */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-14 h-[13px] bg-[#1c1c1e] rounded-full" />

                        <AnimatePresence mode="wait">
                          <motion.img
                            key={`mobile-${slide}`}
                            src={slides[slide].mobileImage}
                            alt={slides[slide].alt}
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.45, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full object-cover object-top"
                          />
                        </AnimatePresence>

                        <ScreenGlare delay={3} />
                      </div>
                    </div>
                  </BorderBeam>
                </motion.div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export { BaseInternalHero };
