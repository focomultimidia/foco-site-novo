"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Image as ImageIcon, Smartphone } from "lucide-react";

// ── Visual language shared with the Home hero ──────────────────────────────────
// Full-bleed gradient band, glass mockup with crossfade slides, phone mockup,
// floating badges, CTA straddling the band's bottom edge. Unlike Home's own
// hero (hand-tuned with fixed px offsets for its exact copy), this version
// keeps the text in normal document flow and crops the mockup via a negative
// bottom margin relative to ITS OWN height — so the crop/phone/badges stay
// safe regardless of how long a given page's title/subtitle is. Don't port
// this back onto the Home hero; it's already verified with its own approach.
//
// Only consumer today is /channel-manager — recolored to match Home's exact
// palette (navy base, blue aurora undertone, gold accent, white text/CTA)
// instead of the earlier light sky-blue theme. Background is now the EXACT
// same treatment as every other hero on the site (bg-[#10233d] + 3 animated
// aurora blobs + grain), not its own gradient recipe — see the `aria-hidden`
// blocks rendered at the top of the section below, copied verbatim from
// home-style-hero.tsx/home's hero-section.tsx so every hero background is
// pixel-identical.

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export interface GradientHeroSlide {
  /** Omit to render a dashed "leave space" placeholder instead. */
  desktopSrc?: string;
  /** Shown in the floating phone mockup while this slide is active. */
  mobileSrc?: string;
  label?: string;
  alt: string;
}

export interface GradientHeroBadge {
  icon: ComponentType<{ className?: string }>;
  label: string;
  /** Two-line "value / label" stat style when present, single-line pill otherwise. */
  value?: string;
}

export interface GradientHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  ctaHref?: string;
  slides?: GradientHeroSlide[];
  badges?: GradientHeroBadge[];
  /**
   * Custom visual to show inside the gradient band in place of the slides
   * mockup (e.g. a bespoke diagram/carousel that isn't a product screenshot).
   * Rendered in normal flow, uncropped — ignored when `slides` is set.
   */
  children?: React.ReactNode;
}

const slideVariants = {
  enter: (_custom: number) => ({ opacity: 0, filter: "blur(10px)" }),
  center: (_custom: number) => ({ opacity: 1, filter: "blur(0px)" }),
  exit: (_custom: number) => ({ opacity: 0, filter: "blur(10px)" }),
};

const BADGE_POSITIONS = [
  "-top-4 -left-3 sm:-top-6 sm:-left-6 lg:-top-8 lg:-left-10",
  "top-[22%] -right-3 sm:-right-6 lg:-right-10",
  "top-[44%] -left-3 sm:-left-6 lg:-left-10",
];

function GradientHero({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
  ctaHref,
  slides = [],
  badges = [],
  children,
}: GradientHeroProps) {
  const reducedMotion = useReducedMotion();
  const hasSlides = slides.length > 0;
  const isMultiSlide = slides.length > 1;

  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    if (reducedMotion || !isMultiSlide) return;
    const id = setTimeout(() => setActiveSlide(i => (i + 1) % slides.length), 4500);
    return () => clearTimeout(id);
  }, [activeSlide, reducedMotion, isMultiSlide, slides.length]);
  const currentSlide = slides[activeSlide] ?? slides[0];

  // Tilt 3D sutil ao mouse — mesma técnica da Home.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 100, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 100, damping: 20, mass: 0.6 });
  const rotateY = useTransform(sx, [-1, 1], [4, -4]);
  const rotateX = useTransform(sy, [-1, 1], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const handleMouseLeave = () => { px.set(0); py.set(0); };

  return (
    <section className="relative bg-[#10233d] pb-10 sm:pb-14 lg:pb-16">
      {/* Fundo — aurora azul em deriva lenta, mesmas 3 manchas de todas as
          outras heroes do site (Home, HomeStyleHero). */}
      <div aria-hidden="true" className="absolute -inset-[10%] -z-10 overflow-hidden" style={{ filter: "blur(50px)", opacity: 0.85 }}>
        <div
          className="absolute w-[480px] h-[480px] -left-20 -top-16 rounded-full motion-safe:animate-aurora-a"
          style={{ background: "radial-gradient(circle, rgba(66,122,185,0.65), transparent 70%)" }}
        />
        <div
          className="absolute w-[520px] h-[520px] -right-32 -bottom-36 rounded-full motion-safe:animate-aurora-b"
          style={{ background: "radial-gradient(circle, rgba(30,58,95,0.55), transparent 70%)" }}
        />
        <div
          className="absolute w-[380px] h-[380px] right-[10%] -top-20 rounded-full motion-safe:animate-aurora-c"
          style={{ background: "radial-gradient(circle, rgba(40,89,146,0.55), transparent 70%)" }}
        />
      </div>
      {/* Grão sutil — quebra a chapadura do gradiente, mesmo tratamento das
          outras heroes. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative overflow-hidden w-full">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 lg:pb-14">
          <div className="text-center max-w-3xl mx-auto">
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                className="inline-flex items-center gap-2.5 border border-white/15 bg-white/8 backdrop-blur-sm text-white px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] mb-6"
              >
                <span className="w-1.5 h-1.5 bg-[#fccc30] rounded-full animate-pulse" />
                {eyebrow}
              </motion.div>
            )}

            <motion.h1
              // É o LCP da página (channel-manager) — não pode nascer com
              // opacity:0, senão o paint fica refém da animação. Mesmo ajuste
              // do hero-section.tsx da home / home-style-hero.tsx.
              initial={false}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.0, delay: 0.3, ease: EASE }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.4rem] text-white mb-4 leading-[1.08] tracking-tighter antialiased"
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.85, delay: 0.44, ease: EASE }}
                className="text-white/70 text-base sm:text-lg font-light leading-relaxed max-w-lg mx-auto"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>

        {/* ── Mockup — em fluxo normal (não posicionado por px fixo), cropado por
            margin-bottom negativa relativa à SUA PRÓPRIA altura. Isso garante
            que o corte nunca dependa do tamanho do texto acima (que varia por
            página) — diferente da Home, onde os offsets são fixos e calibrados
            para aquele texto específico. ─────────────────────────────────── */}
        {hasSlides && currentSlide && (
          <div className="relative mx-auto w-[92%] sm:w-[80%] max-w-[860px] mt-2 -mb-8 sm:-mb-32 lg:-mb-48">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            >
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-t-[24px] sm:rounded-t-[32px] p-2 sm:p-2.5 [perspective:1600px]"
                style={{
                  background: "rgba(255,255,255,0.32)",
                  backdropFilter: "blur(22px)",
                  WebkitBackdropFilter: "blur(22px)",
                  border: "1px solid rgba(255,255,255,0.55)",
                  borderBottom: "none",
                  boxShadow: "0 30px 70px -20px rgba(15,40,80,0.35)",
                }}
              >
                <motion.div
                  style={reducedMotion ? undefined : { rotateX, rotateY }}
                  className="relative rounded-t-[18px] sm:rounded-t-[24px] overflow-hidden bg-white ring-1 ring-white/40 [transform-style:preserve-3d]"
                >
                  <div className="relative w-full" style={{ aspectRatio: "900 / 816" }}>
                    <AnimatePresence mode="popLayout" custom={activeSlide}>
                      <motion.div
                        key={activeSlide}
                        custom={activeSlide}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.7, ease: EASE }}
                        className="absolute inset-0"
                      >
                        {currentSlide.desktopSrc ? (
                          <img
                            src={currentSlide.desktopSrc}
                            alt={currentSlide.alt}
                            fetchPriority={activeSlide === 0 ? "high" : "low"}
                            loading={activeSlide === 0 ? "eager" : "lazy"}
                            decoding="async"
                            className="w-full h-full object-cover object-top block"
                          />
                        ) : (
                          <div
                            className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed"
                            style={{ borderColor: "rgba(40,89,146,0.2)", background: "rgba(40,89,146,0.04)" }}
                          >
                            <ImageIcon className="w-7 h-7" style={{ color: "rgba(40,89,146,0.35)" }} strokeWidth={1.5} />
                            <span className="text-xs font-medium px-6 text-center" style={{ color: "rgba(40,89,146,0.45)" }}>
                              {currentSlide.alt}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {currentSlide.label && (
                      <AnimatePresence mode="popLayout" custom={activeSlide}>
                        <motion.div
                          key={`label-${activeSlide}`}
                          custom={activeSlide}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.3 }}
                          className="absolute bottom-4 left-3 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-[#1e3a5f] shadow-sm border border-white/60"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#285992] shrink-0" />
                          {currentSlide.label}
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>

                  {isMultiSlide && (
                    <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveSlide(i)}
                          aria-label={`Ver imagem ${i + 1} de ${slides.length}`}
                          aria-current={i === activeSlide}
                          className="h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: i === activeSlide ? "18px" : "6px",
                            background: i === activeSlide ? "#132840" : "rgba(19,40,64,0.28)",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>

                <GradientHeroMobileMockup src={currentSlide.mobileSrc} />

                {badges.slice(0, 3).map((badge, i) => (
                  <GradientHeroBadgeChip
                    key={badge.label}
                    icon={badge.icon}
                    label={badge.label}
                    value={badge.value}
                    delay={0.85 + i * 0.1}
                    className={BADGE_POSITIONS[i]}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* ── Conteúdo customizado (diagrama, carrossel próprio, etc.) — mesma
            faixa degradê do resumo, sem o corte/moldura de vidro do mockup de
            screenshot: aqui o conteúdo já é dono da própria composição. ──── */}
        {!hasSlides && children && (
          <div className="relative mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-8 lg:-mt-10 pb-10 sm:pb-14 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            >
              {children}
            </motion.div>
          </div>
        )}
      </div>

      {ctaLabel && (
        <div className="relative z-20 flex justify-center -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58, ease: EASE }}
          >
            {ctaHref ? (
              <a
                href={ctaHref}
                onClick={onCtaClick}
                className="group inline-flex items-center gap-2 bg-[#fccc30] text-[#132840] font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base shadow-lg shadow-[#fccc30]/30 hover:shadow-[#fccc30]/45 hover:-translate-y-0.5"
              >
                {ctaLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            ) : (
              <button
                type="button"
                onClick={onCtaClick}
                className="group inline-flex items-center gap-2 bg-[#fccc30] text-[#132840] font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base shadow-lg shadow-[#fccc30]/30 hover:shadow-[#fccc30]/45 hover:-translate-y-0.5"
              >
                {ctaLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}

// ── GradientHeroBadgeChip ───────────────────────────────────────────────────────

function GradientHeroBadgeChip({
  icon: Icon, label, value, delay, className,
}: GradientHeroBadge & { delay: number; className: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={`absolute z-20 flex items-center gap-2 sm:gap-2.5 bg-white/85 backdrop-blur-md border border-white/70 rounded-2xl pl-2 pr-3.5 py-2 sm:pl-2.5 sm:pr-4 sm:py-2.5 shadow-[0_16px_32px_-16px_rgba(15,40,80,0.4)] ${className}`}
    >
      <div
        className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "linear-gradient(135deg,#285992,#427ab9)" }}
      >
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
      </div>
      {value ? (
        <div className="text-left whitespace-nowrap">
          <div className="text-[#1e3a5f] font-bold text-xs sm:text-base leading-none">{value}</div>
          <div className="text-slate-500 text-[10px] sm:text-[12px] mt-0.5">{label}</div>
        </div>
      ) : (
        <span className="text-[#1e3a5f] text-xs sm:text-sm font-semibold whitespace-nowrap">{label}</span>
      )}
    </motion.div>
  );
}

// ── GradientHeroMobileMockup ─────────────────────────────────────────────────────
// Largura via clamp() contínuo (não breakpoints fixos): cresce suavemente com o
// viewport sem nunca superar a altura segura do mockup, mesmo nos extremos de
// cada faixa (320px e 639px "ainda mobile", 1024px "já lg", etc.).

function GradientHeroMobileMockup({ src }: { src?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
      className="absolute -top-12 -right-3 sm:-right-6 lg:-right-10 z-20"
      style={{
        width: "clamp(120px, 18vw, 220px)",
        filter: "drop-shadow(0 22px 34px rgba(15,40,80,0.32))",
      }}
    >
      <div
        className="rounded-[28px] p-1"
        style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(255,255,255,0.35))" }}
      >
        <div
          className="relative overflow-hidden rounded-[24px] bg-white ring-1 ring-slate-900/10"
          style={{ aspectRatio: "9 / 19.5" }}
        >
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-7 h-[6px] rounded-full bg-slate-900/70 z-10" />

          {src ? (
            <img src={src} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-1 border-2 border-dashed"
              style={{ borderColor: "rgba(40,89,146,0.22)", background: "rgba(40,89,146,0.04)" }}
            >
              <Smartphone className="w-5 h-5" style={{ color: "rgba(40,89,146,0.35)" }} strokeWidth={1.5} />
              <span className="text-[9px] font-medium text-center px-1" style={{ color: "rgba(40,89,146,0.45)" }}>
                Print mobile
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export { GradientHero };
