"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { HeroButton } from "./hero-button";

// ── Public interfaces ─────────────────────────────────────────────────────────

export interface HeroSlide {
  desktopImage: string;
  mobileImage: string;
  label?: string;
  alt: string;
}

export interface BaseInternalHeroProps {
  /** Short pill badge shown above the title (with animated ping dot) */
  badgeText?: string;
  /** Main H1. Accept string or ReactNode for inline gradient highlights */
  title: string | React.ReactNode;
  /** Optional secondary tagline rendered between title and description */
  subtitle?: string;
  description: string;
  primaryCTA: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCTA?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  /** One slide = static image, multiple slides = auto-advance slideshow */
  slides: HeroSlide[];
}

// ── Internal constants ────────────────────────────────────────────────────────

const SLIDE_INTERVAL = 3500;

const TRUST_ITEMS = ["Sem taxa de setup", "Cancele quando quiser", "Suporte incluso"];

// ── Component ─────────────────────────────────────────────────────────────────

function BaseInternalHero({
  badgeText,
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  slides,
}: BaseInternalHeroProps) {
  const [slide, setSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isMultiSlide = slides.length > 1;

  // ── Mouse parallax ──────────────────────────────────────────────────────────
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 50, damping: 18 });
  const smoothY = useSpring(rawY, { stiffness: 50, damping: 18 });

  const browserTX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const browserTY = useTransform(smoothY, [-1, 1], [-7, 7]);
  const mobileTX  = useTransform(smoothX, [-1, 1], [14, -14]);
  const mobileTY  = useTransform(smoothY, [-1, 1], [10, -10]);

  function handleMouseMove(e: React.MouseEvent) {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set(((e.clientX - r.left) / r.width)  * 2 - 1);
    rawY.set(((e.clientY - r.top)  / r.height) * 2 - 1);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  // ── Auto-advance (multi-slide only) ─────────────────────────────────────────
  useEffect(() => {
    if (!isMultiSlide) return;
    const id = setInterval(() => setSlide(s => (s + 1) % slides.length), SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [isMultiSlide, slides.length]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#e7ecef]"
    >
      {/* ── Background ─────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[url('/assets/imgs/hero/bkg.png')] bg-cover bg-center" />

      <div className="absolute top-1/3   left-[8%]   w-[500px] h-[500px] bg-blue-400/10  rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[4%]  w-[380px] h-[380px] bg-[#244248]/8  rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[58%]  left-[42%]  w-[280px] h-[280px] bg-indigo-300/8 rounded-full blur-2xl  pointer-events-none" />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(36,66,72,0.14) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black, transparent)",
          opacity: 0.45,
        }}
      />

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-36 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT ─────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {badgeText && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-[#285992]/25 bg-white/60 backdrop-blur-sm shadow-sm"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#285992] opacity-70" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#285992]" />
                </span>
                <span className="text-[#244248] text-sm font-medium tracking-wide">{badgeText}</span>
              </motion.div>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-[3.15rem] font-bold text-[#244248] mb-4 leading-tight tracking-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="text-base font-semibold text-[#285992]/80 mb-4 tracking-wide">
                {subtitle}
              </p>
            )}

            <p className="text-lg text-[#244248]/75 mb-8 leading-relaxed max-w-xl">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <HeroButton onClick={primaryCTA.onClick} href={primaryCTA.href}>
                {primaryCTA.label}
              </HeroButton>
              {secondaryCTA && (
                <HeroButton variant="secondary" onClick={secondaryCTA.onClick} href={secondaryCTA.href}>
                  {secondaryCTA.label}
                </HeroButton>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="flex flex-wrap items-center gap-5 mt-8"
            >
              {TRUST_ITEMS.map(text => (
                <div key={text} className="flex items-center gap-1.5 text-sm text-[#244248]/60">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Device showcase ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[640px]" style={{ paddingBottom: "11%" }}>


              {/* ── BROWSER ─────────────────────────────────────────────── */}
              {/* outer = mouse parallax | inner = float oscillation */}
              <motion.div style={{ x: browserTX, y: browserTY }} className="relative z-10">
                <motion.div
                  animate={{ y: [0, -9, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div
                    className="w-full bg-white rounded-2xl overflow-hidden border border-gray-200/70"
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
                        <span className="truncate">app.focosistemas.com.br</span>
                      </div>
                      {isMultiSlide && (
                        <div className="flex gap-1 shrink-0">
                          {slides.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setSlide(i)}
                              aria-label={`Slide ${i + 1}`}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                i === slide
                                  ? "w-4 bg-[#285992]"
                                  : "w-1.5 bg-gray-300 hover:bg-gray-400"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Slideshow area */}
                    <div className="relative overflow-hidden bg-gray-50" style={{ height: "420px" }}>
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
                            className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-[#244248] shadow-sm border border-gray-100"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#285992] shrink-0" />
                            {slides[slide].label}
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* ── MOBILE ──────────────────────────────────────────────── */}
              {/* outer = mouse parallax | inner = float oscillation (offset phase) */}
              <motion.div
                style={{ x: mobileTX, y: mobileTY }}
                className="absolute -bottom-[4%] -right-[7%] z-20 w-[180px]"
              >
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                >
                  <div
                    className="bg-[#fbfbfb] rounded-[26px] p-[4px]"
                    style={{ boxShadow: "0 24px 56px rgba(0,0,0,0.38), 0 0 0 1px rgba(255,255,255,0.07)" }}
                  >
                    <div
                      className="relative bg-white rounded-[22px] overflow-hidden"
                      style={{ aspectRatio: "9/19.5" }}
                    >
                      {/* Dynamic Island */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-14 h-[13px] bg-[#1c1c1e] rounded-full" />

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
                    </div>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export { BaseInternalHero };
