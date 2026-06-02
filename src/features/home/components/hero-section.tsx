"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Users,
  TrendingUp,
  Calendar,
  // Product icons — same as PRODUTOS_DATA
  Globe,
  Monitor,
  LayoutGrid,
  CreditCard,
  Smartphone,
} from "lucide-react";
import type { HeroData } from "../types";

// ── Entry easing ──────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Hero stats ────────────────────────────────────────────────────────────────

const STATS = [
  { icon: Users,      value: "+2.500", label: "Clientes ativos"     },
  { icon: TrendingUp, value: "+1B",    label: "Transações/ano"      },
  { icon: Calendar,   value: "+18",    label: "Anos de experiência" },
];

// ── Product catalogue ─────────────────────────────────────────────────────────

interface Product {
  id:     string;
  label:  string;
  icon:   React.ComponentType<{ className?: string; strokeWidth?: number }>;
  accent: string;
}

const PRODUCTS: Product[] = [
  { id: "site",    label: "Site Hoteleiro",          icon: Monitor,    accent: "#fbbf24" },
  { id: "motor",   label: "Motor de Reservas",       icon: Calendar,   accent: "#34d399" },
  { id: "pay",     label: "Software de Pagamentos",  icon: CreditCard, accent: "#22d3ee" },
  { id: "channel", label: "Channel Manager",         icon: Globe,      accent: "#60a5fa" },
  { id: "pass",    label: "Experiência do Hóspede",  icon: Smartphone, accent: "#fb7185" },
  { id: "pms",     label: "PMS e Integrações",       icon: LayoutGrid, accent: "#a78bfa" },
];

// ── Orbit configuration ───────────────────────────────────────────────────────
//
// Each badge sits in absolute coordinates relative to the orbit-stage div
// (the video's bounding box). Negative values extend beyond the video borders,
// creating the "surrounding" orbital feel.
//
// Float: each badge oscillates asynchronously on Y with a different period
// and initial delay — keeping the composition alive without sync'd pulsing.

interface OrbitCfg {
  pos:    CSSProperties;        // absolute position props
  size:   "sm" | "md" | "lg";  // controls padding + font-size
  floatY: [number, number];     // [up, down] oscillation range in px
  dur:    number;               // oscillation period in seconds
  delay:  number;               // float start delay in seconds
}

const ORBIT: OrbitCfg[] = [
  // 0 — Site Hoteleiro   upper-left zone
  { pos: { top: "89%",   left: "82%"  }, size: "md", floatY: [-7,  5], dur: 4.2, delay: 0.0 },
  // 1 — Motor de Reservas   upper-right, prominent
  { pos: { top: "60%",   right: "90%" }, size: "lg", floatY: [-6,  9], dur: 3.8, delay: 0.9 },
  // 2 — FocoPay   left flank, mid (small = depth illusion)
  { pos: { top: "20%",   left: "1%"   }, size: "sm", floatY: [-9,  5], dur: 5.0, delay: 1.6 },
  // 3 — Channel Manager   right flank, upper-mid
  { pos: { top: "5%",   right: "9%"  }, size: "md", floatY: [-5,  8], dur: 4.6, delay: 0.4 },
  // 4 — FocoPass   lower-left (large)
  { pos: { bottom: "2%", left: "20%" }, size: "lg", floatY: [-8,  6], dur: 3.5, delay: 1.2 },
  // 5 — PMS Hoteleiro   lower-right (small = depth layer)
  { pos: { bottom: "50%", right: "1%"}, size: "sm", floatY: [-7,  5], dur: 4.9, delay: 0.6 },
];

// ── "Hyperspace Drop" variants ────────────────────────────────────────────────
//
// Science of the effect:
//   scale: 0.04  →  1.0     badge materialises from a near-invisible speck,
//                            as if shooting in from extreme distance
//   filter: blur(20px) → 0  mimics motion-blur smear at hyperspeed
//   opacity: 0 → 1          fades up as it decelerates
//
//   Spring physics:
//     stiffness 440 → violently fast initial acceleration (rocket launch)
//     damping   28  → heavy, physical deceleration; effectively zero overshoot
//     stagger   60ms → machine-gun sequence between the six arrivals

const hyperspaceDrop: Variants = {
  hidden:  { scale: 0.04, opacity: 0, filter: "blur(20px)" },
  visible: { scale: 1,    opacity: 1, filter: "blur(0px)"  },
};

// ── Size tokens ───────────────────────────────────────────────────────────────

const PAD  = { sm: "gap-1.5 px-3 py-2",   md: "gap-2 px-4 py-2.5",  lg: "gap-2 px-4 py-3"   };
const FSIZ = { sm: "text-[11px]",          md: "text-xs",             lg: "text-[13px]"        };

// ── ProductBadge ──────────────────────────────────────────────────────────────

function ProductBadge({
  product, orbit, index, visible,
}: {
  product: Product;
  orbit:   OrbitCfg;
  index:   number;
  visible: boolean;
}) {
  const Icon = product.icon;
  const staggerDelay = visible ? index * 0.06 : 0;

  return (
    // ── Outer div: position + hyperspace entry ──────────────────────────────
    <motion.div
      className="absolute z-20 cursor-default select-none"
      style={orbit.pos}
      variants={hyperspaceDrop}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      transition={{
        // Scale: the explosive spring — this IS the "hyperspace" feeling
        scale: {
          type:      "spring",
          stiffness: 440,
          damping:   28,
          delay:     staggerDelay,
        },
        // Opacity fades in on a smooth tween alongside the spring
        opacity: {
          duration: 0.40,
          ease:     "easeOut",
          delay:    staggerDelay,
        },
        // Blur resolves slightly after opacity so the "travel smear" dissipates last
        filter: {
          duration: 0.48,
          ease:     "easeOut",
          delay:    staggerDelay + 0.04,
        },
      }}
    >
      {/* ── Inner div: infinite float oscillation ─────────────────────────── */}
      {/* Separate from the outer so float never interferes with entry spring  */}
      <motion.div
        animate={{ y: orbit.floatY }}
        transition={{
          duration:   orbit.dur,
          repeat:     Infinity,
          repeatType: "mirror",
          ease:       "easeInOut",
          delay:      orbit.delay,
        }}
      >
        {/* Glassmorphism badge surface */}
        <div
          className={`inline-flex items-center ${PAD[orbit.size]} rounded-[14px] whitespace-nowrap`}
          style={{
            background:           "rgba(255,255,255,0.90)",
            backdropFilter:       "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border:               "1px solid rgba(226,232,240,0.60)",
            boxShadow:            "0 8px 28px rgba(30,58,95,0.09), 0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          {/* Icon with accent-tinted background */}
          <div
            className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-[7px]"
            style={{ backgroundColor: `${product.accent}16`, color: product.accent }}
          >
            <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
          </div>

          {/* Product name */}
          <span className={`${FSIZ[orbit.size]} font-medium text-slate-700 leading-none`}>
            {product.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── HeroSection ───────────────────────────────────────────────────────────────

interface HeroSectionProps {
  data: HeroData;
  onCtaClick?: () => void;
}

function HeroSection({ data: _data, onCtaClick }: HeroSectionProps) {
  // When the video ends, the six product badges invade from hyperspace
  const [isVideoFinished, setIsVideoFinished] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden" style={{ background: "radial-gradient(ellipse at center, #fff 15%, #acacac 90%)" }}>

      {/* Ambient glow — breathes in from above */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 55% at 50% -10%, rgba(40,89,146,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16 items-center">

          {/* ── LEFT: text content ──────────────────────────────────────────── */}
          <div>
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="inline-flex items-center gap-2.5 bg-[#285992]/8 border border-[#285992]/15 text-[#285992] px-5 py-2.5 rounded-full text-sm font-medium mb-7"
            >
              <span className="w-2 h-2 bg-[#285992] rounded-full animate-pulse" />
              Ecossistema completo para hotelaria
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 36, filter: "blur(16px)" }}
              animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
              transition={{ duration: 1.0, delay: 0.3, ease: EASE }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#1a3a45] mb-4 leading-tight tracking-tight"
            >
              Tecnologia hoteleira integrada em uma{" "}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#285992] to-[#3a7bd5]">
                única plataforma.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
              transition={{ duration: 0.85, delay: 0.46, ease: EASE }}
              className="text-slate-500 text-base sm:text-lg font-light leading-relaxed mb-10"
            >
              Para hotéis e pousadas que querem vender mais,
              <br className="hidden sm:block" />
              gastar menos e ter controle total da operação.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
              className="mb-12"
            >
              <button
                onClick={onCtaClick}
                className="group flex items-center gap-2 bg-gradient-to-t from-[#285992] to-[#427ab9] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base shadow-lg shadow-[#285992]/25 hover:shadow-[#285992]/40 hover:-translate-y-0.5"
              >
                Demonstração grátis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </motion.div>

            {/* Stats pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
              className="flex flex-wrap gap-3"
            >
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-gradient-to-l from-[#285992] to-[#427ab9] rounded-xl px-4 py-2.5"
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border-2 border-white/30 flex-shrink-0">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-base leading-none">{value}</div>
                    <div className="text-white/70 text-[14px] mt-0.5">{label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: video + orbital product badges ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0,  scale: 1    }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="relative"
          >
            <div className="relative mx-4 mt-8 mb-6">

              {/* Ambient halo — blurred glow behind the video */}
              <div
                aria-hidden
                className="absolute -inset-10 rounded-3xl blur-3xl pointer-events-none opacity-35"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(40,89,146,0.30) 0%, transparent 68%)",
                }}
              />

              {/* Video — plays once, onEnded triggers badge reveal */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-100/80 shadow-2xl shadow-[#285992]/12">
                <video
                  src="/assets/videos/home/video-hero.mp4"
                  autoPlay
                  muted
                  playsInline
                  onEnded={() => setIsVideoFinished(true)}
                  className="w-full block"
                />
              </div>

              {/* Orbital badges — desktop only */}
              <div className="hidden lg:block">
                {PRODUCTS.map((product, i) => (
                  <ProductBadge
                    key={product.id}
                    product={product}
                    orbit={ORBIT[i]}
                    index={i}
                    visible={isVideoFinished}
                  />
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
          Role para descobrir
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

    </section>
  );
}

export { HeroSection };
