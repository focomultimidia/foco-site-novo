"use client";

import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { OrbitDiagram } from "@/features/shared/components/orbit-diagram";
import { motion } from "framer-motion";
import {
  Award,
  Star,
  Handshake,
  Shield,
  Users,
  Globe,
  Zap,
  Lock,
} from "lucide-react";
import type { Diferencial } from "../types";

// ── Types ─────────────────────────────────────────────────────────────────────

interface DiferenciaisSectionProps {
  diferenciais: Diferencial[];
}

// ── Maps ──────────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Award, Star, Handshake, Shield, Users, Globe, Zap, Lock,
};

const ACCENT_CYCLE = [
  { badge: "bg-blue-500/15",    icon: "text-blue-600",    hover: "group-hover:shadow-blue-400/25"   },
  { badge: "bg-amber-500/15",   icon: "text-amber-600",   hover: "group-hover:shadow-amber-400/25"  },
  { badge: "bg-emerald-500/15", icon: "text-emerald-600", hover: "group-hover:shadow-emerald-400/25"},
  { badge: "bg-violet-500/15",  icon: "text-violet-600",  hover: "group-hover:shadow-violet-400/25" },
];

// ── GlassCard ─────────────────────────────────────────────────────────────────

interface GlassCardProps {
  diferencial: Diferencial;
  colorIdx:    number;
  delay:       number;
  alignRight?: boolean;
}

function GlassCard({ diferencial, colorIdx, delay, alignRight = false }: GlassCardProps) {
  const Icon   = ICON_MAP[diferencial.icone] ?? Award;
  const accent = ACCENT_CYCLE[colorIdx % ACCENT_CYCLE.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: alignRight ? 24 : -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`
        group flex items-start gap-3.5 p-4 rounded-3xl cursor-default
        bg-white/65 backdrop-blur-md
        border border-white/55
        shadow-lg shadow-slate-900/[0.07]
        hover:-translate-y-1
        hover:bg-white/80
        hover:border-blue-200/60
        hover:shadow-xl hover:shadow-blue-900/[0.10]
        transition-all duration-300
      `}
    >
      {/* Icon badge */}
      <div
        className={`
          w-10 h-10 rounded-xl flex items-center justify-center shrink-0
          ${accent.badge}
          transition-shadow duration-300
          group-hover:shadow-lg ${accent.hover}
        `}
      >
        <Icon className={`w-5 h-5 ${accent.icon}`} />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <h3 className="font-bold text-slate-800 text-sm leading-snug mb-1 tracking-tight">
          {diferencial.titulo}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed">
          {diferencial.descricao}
        </p>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

function DiferenciaisSection({ diferenciais }: DiferenciaisSectionProps) {
  const left  = diferenciais.slice(0, 4);
  const right = diferenciais.slice(4, 8);

  return (
    <section className="py-24 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionEyebrow>Contrate agora</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-2">
            Por que contratar o channel manager da{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              Foco Tecnologia
            </span>
          </h2>
        </motion.div>

        {/* ── Grid ────────────────────────────────────────────────────────────
             Desktop: [cards-left | video | cards-right]
             Mobile:  single column, all 8 cards stacked
        ─────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(260px,1.1fr)_1fr] gap-4 items-stretch">

          {/* Left column — cards 1–4 | mobile: order-2 */}
          <div className="flex flex-col gap-4 order-2 lg:order-none">
            {left.map((d, i) => (
              <GlassCard
                key={d.id}
                diferencial={d}
                colorIdx={i}
                delay={i * 0.09}
                alignRight={false}
              />
            ))}
          </div>

          {/* Center column — animação do orbit (mesma do OrbitSection em
              /sobre, só a peça visual, sem a metade de texto/copy daquela
              seção) no lugar do vídeo | mobile: order-1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-none flex items-center justify-center py-8 lg:py-0"
          >
            <OrbitDiagram showConnections innerDurationSec={12} outerDurationSec={50} />
          </motion.div>

          {/* Right column — cards 5–8 | mobile: order-3 */}
          <div className="flex flex-col gap-4 order-3 lg:order-none">
            {right.map((d, i) => (
              <GlassCard
                key={d.id}
                diferencial={d}
                colorIdx={i}
                delay={0.36 + i * 0.09}
                alignRight
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export { DiferenciaisSection };
