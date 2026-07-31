"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroButton } from "@/features/shared/components/hero-button";
import type { HeroData } from "../types";

// ── Título ────────────────────────────────────────────────────────────────────

function buildTitle(raw: string) {
  const kw = "Excepcional";
  const idx = raw.indexOf(kw);
  if (idx === -1) return raw;
  return (
    <>
      {raw.slice(0, idx)}
      <span
        className="text-transparent bg-clip-text bg-gradient-to-r from-[#285992] to-[#3a7bd5]"
        style={{ textDecorationLine: "underline", textDecorationColor: "#fccc30", textDecorationThickness: "3px", textUnderlineOffset: "6px" }}
      >
        {kw}
      </span>
      {raw.slice(idx + kw.length)}
    </>
  );
}

// ── Products ──────────────────────────────────────────────────────────────────
// Each produto owns its image pool, autoplay interval and initial slide.
// Phones are strictly bound to their produto: when a phone slides to the center
// it carries its own slideshow state — images never jump between devices.
const PRODUTOS_HERO = [
  {
    id: 0,
    nome: "Cardápio Digital",
    interval: 3000,
    startSlide: 0,
    slides: [
      { src: "/assets/imgs/experiencia-do-hospede/cardapio-digital.webp", alt: "Cardápio Digital - Menu principal" },
      { src: "/assets/imgs/experiencia-do-hospede/cardapio-digital1.webp",  alt: "Cardápio Digital - Escolhendo item" },
      { src: "/assets/imgs/experiencia-do-hospede/cardapio-digital2.webp",  alt: "Cardápio Digital - Acompanhamento de pedido" },
    ],
  },
  {
    id: 1,
    nome: "App do Hóspede",
    interval: 3500,
    startSlide: 0,
    slides: [
      { src: "/assets/imgs/experiencia-do-hospede/app-hospede.webp",    alt: "Foco Pass - App do Hóspede" },
      { src: "/assets/imgs/experiencia-do-hospede/app-hospede1.webp",      alt: "Foco Pass - Atrações do hotel" },
      { src: "/assets/imgs/experiencia-do-hospede/app-hospede2.webp",      alt: "Foco Pass - Programação do hotel" },

    ],
  },
  {
    id: 2,
    nome: "Motor de Reservas",
    interval: 4000,
    startSlide: 0,
    slides: [
      { src: "/assets/imgs/experiencia-do-hospede/hero/reservas-1.webp", alt: "Motor de Reservas – Busca" },
      { src: "/assets/imgs/experiencia-do-hospede/hero/reservas-2.webp", alt: "Motor de Reservas – Quarto" },
      { src: "/assets/imgs/experiencia-do-hospede/hero/reservas-3.webp", alt: "Motor de Reservas – Confirmação" },
    ],
  },
] as const;

// ── Layout geometry ───────────────────────────────────────────────────────────
/*
  Container: 620 × 520 px
  Phone natural CSS width: 220 px  →  height ≈ 477 px  (aspect 9/19.5)
  Side phones use scale: 0.85 → apparent size ≈ 187 × 405 px

  Absolute positions (top-left of each motion.div, scale applied from element center):
    center: x=200, y=22  → element center at (310, 260.5) ← exact container center
    left:   x=5,   y=22  → element center at (115, 260.5), slight 8 px overlap with center
    right:  x=395, y=22  → element center at (505, 260.5), slight 8 px overlap with center
*/
const PHONE_W = 220;
const PHONE_H = Math.round(PHONE_W * 19.5 / 9); // 477

const ROLE_CFG = {
  center: {
    x: Math.round((620 - PHONE_W) / 2), // 200
    y: Math.round((520 - PHONE_H) / 2), // 22
    scale:   1,
    opacity: 1,
    filter:  "blur(0px)",
    zIndex:  30,
    cursor:  "default" as const,
  },
  left: {
    x: 5,
    y: Math.round((520 - PHONE_H) / 2),
    scale:   0.85,
    opacity: 0.6,
    filter:  "blur(2px)",
    zIndex:  10,
    cursor:  "pointer" as const,
  },
  right: {
    x: 620 - PHONE_W - 5, // 395
    y: Math.round((520 - PHONE_H) / 2),
    scale:   0.85,
    opacity: 0.6,
    filter:  "blur(2px)",
    zIndex:  10,
    cursor:  "pointer" as const,
  },
} as const;

type Role = keyof typeof ROLE_CFG;

// ── Phone Mockup ──────────────────────────────────────────────────────────────
// Self-contained: manages its own slide state and timer independently.
function PhoneMockup({
  slides,
  interval,
  startSlide,
  priority = false,
}: {
  slides: readonly { src: string; alt: string }[];
  interval: number;
  startSlide: number;
  priority?: boolean;
}) {
  const [slideIdx, setSlideIdx] = useState(startSlide % slides.length);

  useEffect(() => {
    const id = setInterval(
      () => setSlideIdx(prev => (prev + 1) % slides.length),
      interval
    );
    return () => clearInterval(id);
  }, [interval, slides.length]);

  const slide = slides[slideIdx];

  return (
    <div
      className="bg-[#fbfbfb] rounded-[26px] p-[4px] w-full"
      style={{ boxShadow: "0 24px 56px rgba(0,0,0,0.38), 0 0 0 1px rgba(255,255,255,0.07)" }}
    >
      <div
        className="relative bg-white rounded-[22px] overflow-hidden"
        style={{ aspectRatio: "9/19.5" }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-12 h-[12px] bg-[#1c1c1e] rounded-full" />

        {/* Screen — fade between slides */}
        <AnimatePresence mode="wait">
          <motion.img
            key={slideIdx}
            src={slide.src}
            alt={slide.alt}
            fetchPriority={priority && slideIdx === startSlide ? "high" : undefined}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-[4px] bg-black/20 rounded-full z-10" />
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
interface HeroSectionProps {
  data: HeroData;
  onCtaClick?: () => void;
}

function HeroSection({ data, onCtaClick }: HeroSectionProps) {
  // centerPhone tracks which phone (0|1|2) is currently in the center position.
  const [centerPhone, setCenterPhone] = useState(1);

  // Map phone ID → spatial role based on the current center.
  const getRole = (id: number): Role => {
    if (id === centerPhone) return "center";
    if (id === (centerPhone - 1 + 3) % 3) return "left";
    return "right";
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#f4f7fb]">

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-36 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: text (original content — unchanged) ───────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow — mono uppercase */}
            <div className="inline-flex items-center gap-2.5 border border-[#285992]/20 text-[#285992] px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] mb-6">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#285992] opacity-70" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#285992]" />
              </span>
              {data.subtitulo}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#244248] mb-4 leading-tight tracking-tight">
              {buildTitle(data.titulo)}
            </h1>

            <p className="text-lg text-[#244248]/75 mb-8 leading-relaxed max-w-xl">
              {data.descricao}
            </p>

            <HeroButton onClick={onCtaClick}>
              {data.ctaPrimario}
            </HeroButton>
          </motion.div>

          {/* ── Right: spatial carousel (desktop only) ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            {/*
              Fixed container — phones are absolutely positioned inside.
              All three motion.divs start at top:0 left:0 and are moved into
              position via Framer Motion's x/y/scale/opacity/filter animations.
            */}
            <div className="relative" style={{ width: 620, height: 520 }}>

              {PRODUTOS_HERO.map(phone => {
                const role   = getRole(phone.id);
                const cfg    = ROLE_CFG[role];
                const isCenter = role === "center";

                return (
                  <motion.div
                    key={phone.id}
                    /*
                      initial matches animate on first render → no entrance animation
                      for the phones themselves (parent already fades in the whole group).
                    */
                    initial={{
                      x: cfg.x, y: cfg.y, scale: cfg.scale,
                      opacity: cfg.opacity, filter: cfg.filter,
                    }}
                    animate={{
                      x: cfg.x, y: cfg.y, scale: cfg.scale,
                      opacity: cfg.opacity, filter: cfg.filter,
                    }}
                    transition={{
                      // Spring for position/scale — snappy but smooth
                      type:      "spring",
                      stiffness: 260,
                      damping:   28,
                      // Faster linear fade for opacity + filter
                      opacity: { type: "tween", duration: 0.28 },
                      filter:  { type: "tween", duration: 0.32 },
                    }}
                    onClick={() => !isCenter && setCenterPhone(phone.id)}
                    style={{
                      position:        "absolute",
                      width:           PHONE_W,
                      top:             0,
                      left:            0,
                      zIndex:          cfg.zIndex, // immediate — keeps new center on top
                      cursor:          cfg.cursor,
                      transformOrigin: "center center",
                    }}
                  >
                    {/*
                      Inner motion.div handles the vertical float for the center phone.
                      It resets to y:0 when the phone moves to a side position.
                    */}
                    <motion.div
                      animate={isCenter ? { y: [0, -10, 0] } : { y: 0 }}
                      transition={
                        isCenter
                          ? { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
                          : { type: "tween", duration: 0.4 }
                      }
                    >
                      <PhoneMockup
                        slides={phone.slides}
                        interval={phone.interval}
                        startSlide={phone.startSlide}
                        priority={phone.id === centerPhone}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export { HeroSection };
