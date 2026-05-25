"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Building,
  Mountain,
  TreePine,
  Users,
  Sun,
  Key,
  ArrowRight,
} from "lucide-react";
import type { TipoPropriedade } from "../types";

// ── Icon registry ─────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, Building, Mountain, TreePine, Users, Sun, Key,
};

// ── Background images — cycling through 4 hero shots ─────────────────────────
const IMAGE_MAP: Record<string, string> = {
  "1": "/assets/imgs/home/pousada.jpg",
  "2": "/assets/imgs/home/hotel.jpg",
  "3": "/assets/imgs/home/chale.jpg",
  "4": "/assets/imgs/home/hotel-fazenda.jpg",
  "5": "/assets/imgs/home/hostel.jpg",
  "6": "/assets/imgs/home/resort.jpg",
  "7": "/assets/imgs/home/aluguel-temporada.jpg",
};

// ── Per-type color identity (overlay gradient + CTA accent) ───────────────────
interface TypeStyle { overlay: string; accent: string }
const TYPE_STYLES: Record<string, TypeStyle> = {
  "1": { overlay: "from-amber-950/85  to-amber-900/25",   accent: "#f59e0b" },
  "2": { overlay: "from-blue-950/85   to-blue-900/25",    accent: "#60a5fa" },
  "3": { overlay: "from-emerald-950/85 to-emerald-900/25", accent: "#34d399" },
  "4": { overlay: "from-stone-950/85  to-stone-900/25",   accent: "#fbbf24" },
  "5": { overlay: "from-violet-950/85 to-violet-900/25",  accent: "#a78bfa" },
  "6": { overlay: "from-cyan-950/85   to-cyan-900/25",    accent: "#22d3ee" },
  "7": { overlay: "from-rose-950/85   to-rose-900/25",    accent: "#fb7185" },
};

// ── Refined copy (short, elegant) ────────────────────────────────────────────
const SHORT_DESC: Record<string, string> = {
  "1": "Gestão simplificada do check-in ao checkout, para pousadas de qualquer porte.",
  "2": "Tecnologia completa para hotéis urbanos, resorts e redes hoteleiras.",
  "3": "Controle total em cada chalé ou cabana com sistema 100% mobile.",
  "4": "Sistema adaptado ao ritmo e às particularidades da hospitalidade rural.",
  "5": "Gerenciamento eficiente de leitos, reservas e experiência em albergues.",
  "6": "Plataforma de ponta para resorts all-inclusive e propriedades de luxo.",
  "7": "Ferramentas inteligentes para proprietários de imóveis por temporada.",
};

const SPRING = { type: "spring" as const, stiffness: 280, damping: 28 };

// ── Desktop accordion panel ───────────────────────────────────────────────────
interface DesktopCardProps {
  tipo:       TipoPropriedade;
  isActive:   boolean;
  isCollapsed: boolean;
  onEnter:    () => void;
  onLeave:    () => void;
}

function DesktopCard({ tipo, isActive, isCollapsed, onEnter, onLeave }: DesktopCardProps) {
  const Icon = ICON_MAP[tipo.icone] ?? Home;
  const ts   = TYPE_STYLES[tipo.id] ?? TYPE_STYLES["1"];
  const img  = IMAGE_MAP[tipo.id]   ?? IMAGE_MAP["1"];
  const desc = SHORT_DESC[tipo.id]  ?? tipo.descricao;

  return (
    <motion.div
      className="relative h-full overflow-hidden cursor-default"
      style={{ flexShrink: 1, flexBasis: 0, minWidth: "52px" }}
      animate={{ flexGrow: isActive ? 4 : 1 }}
      transition={SPRING}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Background image — slow zoom on active */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isActive ? 1.07 : 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={img} alt={tipo.nome} className="w-full h-full object-cover" />
      </motion.div>

      {/* Color-coded identity overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${ts.overlay}`} />

      {/* Adaptive darkness veil */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{ opacity: isActive ? 0.18 : 0.48 }}
        transition={{ duration: 0.4 }}
      />

      {/* ── State: collapsed (another card is hovered) ── */}
      <AnimatePresence>
        {isCollapsed && (
          <motion.div
            key="collapsed"
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.p
              className="text-[20px] font-extrabold uppercase whitespace-nowrap text-white drop-shadow-lg"
              style={{ rotate: -90 }}
              initial={{ letterSpacing: "0.04em", scale: 0.8 }}
              animate={{ letterSpacing: "0.28em", scale: 1 }}
              exit={{ letterSpacing: "0.04em", scale: 0.8 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              {tipo.nome}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── State: default (nothing hovered) ── */}
      <AnimatePresence>
        {!isActive && !isCollapsed && (
          <motion.div
            key="default"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ts.accent}28` }}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-white text-[16px] font-semibold text-center tracking-tight leading-snug">
              {tipo.nome}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── State: active (expanded) ── */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="active"
            className="absolute inset-0 flex flex-col justify-end p-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, delay: 0.08 }}
          >
            {/* Icon badge */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{
                backgroundColor: `${ts.accent}28`,
                border: `1.5px solid ${ts.accent}55`,
                boxShadow: `0 0 24px ${ts.accent}22`,
              }}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-white text-2xl font-bold tracking-tight leading-none mb-2.5">
              {tipo.nome}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              {desc}
            </p>

            <button
              className="self-start flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full text-[#0f172a] transition-opacity hover:opacity-90 active:opacity-75"
              style={{ backgroundColor: ts.accent }}
            >
              Quero saber mais
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Mobile vertical accordion card ────────────────────────────────────────────
interface MobileCardProps {
  tipo:     TipoPropriedade;
  isActive: boolean;
  onToggle: () => void;
}

function MobileCard({ tipo, isActive, onToggle }: MobileCardProps) {
  const Icon = ICON_MAP[tipo.icone] ?? Home;
  const ts   = TYPE_STYLES[tipo.id] ?? TYPE_STYLES["1"];
  const img  = IMAGE_MAP[tipo.id]   ?? IMAGE_MAP["1"];
  const desc = SHORT_DESC[tipo.id]  ?? tipo.descricao;

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Persistent background — shared by header AND expanded content */}
      <div className="absolute inset-0 pointer-events-none">
        <img src={img} alt={tipo.nome} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-b ${ts.overlay}`} />
        <div className="absolute inset-0 bg-black/52" />
      </div>

      {/* Clickable header */}
      <button
        type="button"
        className="relative z-10 w-full h-20 block text-left"
        onClick={onToggle}
      >
        <div className="absolute inset-0 flex items-center px-5 gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${ts.accent}30` }}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-base tracking-tight flex-1">
            {tipo.nome}
          </span>
          <motion.span
            animate={{ rotate: isActive ? 90 : 0 }}
            transition={SPRING}
            className="shrink-0"
          >
            <ArrowRight className="w-4 h-4 text-white/55" />
          </motion.span>
        </div>
      </button>

      {/* Expandable content — same background continues */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={SPRING}
            className="relative z-10 overflow-hidden"
          >
            <div className="px-5 pb-6 pt-1">
              <p className="text-white/75 text-sm leading-relaxed mb-4">{desc}</p>
              <button
                type="button"
                className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full text-[#0f172a]"
                style={{ backgroundColor: ts.accent }}
              >
                Quero saber mais
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
interface TiposPropriedadeSectionProps {
  tipos: TipoPropriedade[];
}

function TiposPropriedadeSection({ tipos }: TiposPropriedadeSectionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header — unchanged from original ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-2">
            Não importa o{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              tamanho da sua propriedade
            </span>
            ,<br />
            temos a solução completa para você!
          </h2>
        </motion.div>

        {/* ── Desktop: Horizontal Accordion ───────────────────────────── */}
        <motion.div
          className="hidden md:flex flex-row gap-1.5 rounded-3xl overflow-hidden"
          style={{ height: "520px" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          {tipos.map(tipo => (
            <DesktopCard
              key={tipo.id}
              tipo={tipo}
              isActive={activeId === tipo.id}
              isCollapsed={activeId !== null && activeId !== tipo.id}
              onEnter={() => setActiveId(tipo.id)}
              onLeave={() => setActiveId(null)}
            />
          ))}
        </motion.div>

        {/* ── Mobile: Vertical Accordion ──────────────────────────────── */}
        <div className="md:hidden space-y-2">
          {tipos.map((tipo, i) => (
            <motion.div
              key={tipo.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: i * 0.06 }}
            >
              <MobileCard
                tipo={tipo}
                isActive={activeId === tipo.id}
                onToggle={() =>
                  setActiveId(prev => (prev === tipo.id ? null : tipo.id))
                }
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export { TiposPropriedadeSection };
