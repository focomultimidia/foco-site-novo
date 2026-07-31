"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Users, TrendingUp, Calendar } from "lucide-react";
import type { HeroData } from "../types";

// ── Entry easing ──────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Hero stats ────────────────────────────────────────────────────────────────

const STATS = [
  { icon: Users,      value: "+2.500", label: "Clientes ativos"     },
  { icon: TrendingUp, value: "+1B",    label: "Transações/ano"      },
  { icon: Calendar,   value: "+18",    label: "Anos de experiência" },
];

// ── HeroSection ───────────────────────────────────────────────────────────────

interface HeroSectionProps {
  data: HeroData;
  onCtaClick?: () => void;
}

function HeroSection({ data: _data, onCtaClick }: HeroSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    // Hero sem camadas de fundo: apenas a cor da superfície (#f4f7fb).
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-[#f4f7fb]">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16 items-center">

          {/* ── LEFT: text content ──────────────────────────────────────────── */}
          <div>
            {/* Eyebrow — mono uppercase: registro de "sistema", não de marketing */}
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="inline-flex items-center gap-2.5 border border-[#285992]/20 text-[#285992] px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] mb-8"
            >
              <span className="w-1.5 h-1.5 bg-[#285992] rounded-full animate-pulse" />
              Ecossistema completo para hotelaria
            </motion.div>

            {/* Headline — Space Grotesk (font-display), a mesma família
                geométrica do wordmark da logo. A frase-assinatura ganha um
                traço desenhado à mão por baixo no dourado da própria logo
                (#fccc30) — único lugar da página onde o amarelo aparece. */}
            <motion.h1
              initial={{ opacity: 0, y: 36, filter: "blur(16px)" }}
              animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
              transition={{ duration: 1.0, delay: 0.3, ease: EASE }}
              className="font-display font-semibold text-4xl sm:text-5xl lg:text-[3.5rem] text-[#132840] mb-5 leading-[1.08] tracking-tighter antialiased"
            >
              Tecnologia hoteleira integrada em uma{" "}
              <span className="relative inline-block text-[#1e3a5f] whitespace-nowrap">
                única plataforma.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 320 14"
                  preserveAspectRatio="none"
                  className="absolute left-0 -bottom-2 w-full h-[0.85rem] pointer-events-none"
                  fill="none"
                >
                  <motion.path
                    d="M 4 10 C 60 4, 150 3, 230 6 C 270 7.5, 300 9, 316 8"
                    stroke="#fccc30"
                    strokeWidth={4}
                    strokeLinecap="round"
                    initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.9 }}
                    transition={{ duration: 0.7, delay: 1.15, ease: [0.65, 0, 0.35, 1] }}
                  />
                </svg>
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

          {/* ── RIGHT: ecosystem illustration ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0,  scale: 1    }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="relative"
          >
            <div className="relative mx-4 mt-8 mb-6">

              <div className="relative rounded-3xl overflow-hidden border border-slate-100/80 shadow-2xl shadow-[#285992]/12 bg-white">
                <img
                  src="/assets/imgs/home/img-hero-home.webp"
                  alt="Ecossistema Foco Tecnologia conectando sistemas de gestão hoteleira em uma única plataforma"
                  width={900}
                  height={816}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto block"
                />
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export { HeroSection };
