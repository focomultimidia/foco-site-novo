import { useRef, useEffect, useState, useCallback } from "react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { motion, useInView } from "framer-motion";
import { StaggerSection, StaggerItem } from "./motion-primitives";
import type { JourneyPillar } from "../types";

// ── Data ──────────────────────────────────────────────────────────────────────

const JOURNEY_PILLARS: JourneyPillar[] = [
  {
    id:       "humano",
    eyebrow:  "Pilar I",
    tag:      "O Fator Humano",
    headline: ["Tecnologia fria", "não hospeda pessoas."],
    body:     "Todo produto que sai da Foco nasce de um ambiente onde respeito e colaboração não são palavras de parede, são o critério de cada decisão. Uma equipe que se cuida entrega, com naturalidade, o mesmo nível de cuidado para quem usa o sistema. O hoteleiro sente isso em cada conversa de suporte, em cada atualização que chega sem atrito, em cada problema resolvido antes de virar crise.",
    quote:    "Segurança, responsabilidade e respeito incondicional pelo seu negócio.",
    accent:   "#285992",
  },
  {
    id:       "democratizacao",
    eyebrow:  "Pilar II",
    tag:      "Democratização do Topo",
    headline: ["O que grandes redes", "tinham de exclusivo,", "nós tornamos universal."],
    body:     "Por décadas, automação inteligente e distribuição multicanal ficaram reservadas a quem pagava por infraestrutura de conglomerado. A Foco existe para desfazer esse privilégio. Do menor hostel a um complexo de resorts, qualquer tamanho merece tecnologia que trabalha enquanto o proprietário dorme.",
    quote:    "Rentabilidade e automação para hotéis de qualquer porte.",
    accent:   "#0f766e",
  },
  {
    id:       "conversao",
    eyebrow:  "Pilar III",
    tag:      "A Engenharia da Conversão",
    headline: ["Um motor invisível", "no coração", "do seu hotel."],
    body:     "Enquanto você recebe hóspedes, nossa plataforma redistribui tarifas, captura reservas em tempo real e sincroniza todos os canais. PMS, Channel Manager, Motor de Reservas, CRM e Software de Pagamentos não são produtos separados, são uma arquitetura única que converte visitantes em hóspedes e hóspedes em receita recorrente.",
    quote:    "Mais reservas, mais produtividade, menos fricção operacional.",
    accent:   "#9a7318",
  },
];

// ── Canvas visual states ──────────────────────────────────────────────────────

interface CanvasShapeState { w: number; h: number; br: string; bg: string; shadow: string; rot: number; }
interface CanvasRingState  { r: number; op: number; dash: string; }
interface CanvasState      { outer: CanvasShapeState; inner: CanvasShapeState; ring: CanvasRingState; accent: string; }

const CANVAS_STATES: CanvasState[] = [
  {
    outer: { w: 200, h: 200, br: "42% 58% 68% 32% / 44% 56% 44% 56%", bg: "rgba(40,89,146,0.09)",  shadow: "0 0 0 1.5px rgba(40,89,146,0.18)", rot: 0   },
    inner: { w: 92,  h: 92,  br: "64% 36% 33% 67% / 37% 67% 33% 63%", bg: "rgba(40,89,146,0.05)",  shadow: "0 0 0 1px rgba(40,89,146,0.10)",   rot: -22 },
    ring:  { r: 136, op: 0.08, dash: "4 8" },
    accent: "#285992",
  },
  {
    outer: { w: 228, h: 228, br: "50%",  bg: "transparent",           shadow: "0 0 0 1.5px rgba(15,118,110,0.22)", rot: 0 },
    inner: { w: 162, h: 162, br: "50%",  bg: "rgba(15,118,110,0.07)", shadow: "0 0 0 1px rgba(15,118,110,0.12)",   rot: 0 },
    ring:  { r: 150, op: 0.05, dash: "0" },
    accent: "#0f766e",
  },
  {
    outer: { w: 168, h: 168, br: "12px", bg: "transparent",           shadow: "0 0 0 1.5px rgba(201,151,42,0.35)", rot: 45 },
    inner: { w: 104, h: 104, br: "6px",  bg: "rgba(201,151,42,0.07)", shadow: "0 0 0 1px rgba(201,151,42,0.18)",   rot: 45 },
    ring:  { r: 0, op: 0, dash: "0" },
    accent: "#9a7318",
  },
];

const SPRING: { type: "spring"; stiffness: number; damping: number } = { type: "spring", stiffness: 95, damping: 22 };

// ── MorphingCanvas ────────────────────────────────────────────────────────────

function MorphingCanvas({ activePillar }: { activePillar: number }) {
  const s  = CANVAS_STATES[activePillar];
  const d2 = { ...SPRING, delay: 0.09 };

  return (
    <div className="relative w-72 h-72 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden viewBox="0 0 288 288">
        <motion.circle cx="144" cy="144"
          animate={{ r: s.ring.r, opacity: s.ring.op, strokeDasharray: s.ring.dash }}
          transition={SPRING} fill="none" stroke={s.accent} strokeWidth="1" />
        <motion.circle cx="144" cy="144" r="118" fill="none" stroke="#0f766e" strokeWidth="0.5"
          animate={{ opacity: activePillar === 1 ? 0.10 : 0 }} transition={SPRING} />
        <motion.circle cx="144" cy="144" r="165" fill="none" stroke="#0f766e" strokeWidth="0.5"
          animate={{ opacity: activePillar === 1 ? 0.05 : 0 }} transition={SPRING} />
        <motion.line x1="144" y1="48" x2="144" y2="240"
          stroke="#c9972a" strokeWidth="0.5" strokeDasharray="4 6"
          animate={{ opacity: activePillar === 2 ? 0.20 : 0 }} transition={SPRING} />
        <motion.line x1="48" y1="144" x2="240" y2="144"
          stroke="#c9972a" strokeWidth="0.5" strokeDasharray="4 6"
          animate={{ opacity: activePillar === 2 ? 0.20 : 0 }} transition={SPRING} />
      </svg>
      <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ width: s.outer.w, height: s.outer.h, borderRadius: s.outer.br, background: s.outer.bg, boxShadow: s.outer.shadow, rotate: s.outer.rot }}
        transition={SPRING} />
      <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ width: s.inner.w, height: s.inner.h, borderRadius: s.inner.br, background: s.inner.bg, boxShadow: s.inner.shadow, rotate: s.inner.rot }}
        transition={d2} />
      <motion.div
        key={`pulse-${activePillar}`}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: s.outer.w + 72, height: s.outer.h + 72, boxShadow: `0 0 0 1px ${s.accent}12` }}
        animate={{ scale: [0.96, 1.06, 0.96], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ── PillarIndicators ──────────────────────────────────────────────────────────

function PillarIndicators({ activePillar }: { activePillar: number }) {
  return (
    <div className="flex items-center gap-2">
      {JOURNEY_PILLARS.map((p, i) => (
        <motion.div key={p.id} className="h-1.5 rounded-full"
          animate={{ width: activePillar === i ? 28 : 8, backgroundColor: activePillar === i ? p.accent : "#cbd5e1" }}
          transition={{ duration: 0.4, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

// ── PillarBlock ───────────────────────────────────────────────────────────────

function PillarBlock({
  pillar, index, isActive, onActivate,
}: {
  pillar:     JourneyPillar;
  index:      number;
  isActive:   boolean;
  onActivate: (i: number) => void;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });

  useEffect(() => {
    if (inView) onActivate(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, index]);

  return (
    <div ref={ref} className="py-32 lg:py-36 lg:pl-12">
      <motion.div animate={{ opacity: isActive ? 1 : 0.20 }} transition={{ duration: 0.5, ease: "easeOut" }}>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-bold tracking-[0.20em] uppercase text-slate-500">{pillar.eyebrow}</span>
          <div className="h-px w-8 rounded-full" style={{ backgroundColor: `${pillar.accent}55` }} />
          <span className="text-[10px] font-bold tracking-[0.10em] uppercase" style={{ color: pillar.accent }}>{pillar.tag}</span>
        </div>
        <h3 className="font-display text-4xl sm:text-5xl font-semibold text-[#1e293b] tracking-tighter leading-[1.05] mb-7">
          {pillar.headline.map((line, i) => <span key={i} className="block">{line}</span>)}
        </h3>
        <p className="text-slate-500 text-base lg:text-lg leading-relaxed max-w-lg mb-8">{pillar.body}</p>
        <div className="relative pl-4">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full" style={{ backgroundColor: `${pillar.accent}50` }} />
          <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{pillar.quote}"</p>
        </div>
      </motion.div>
    </div>
  );
}

// ── ManifestoSection ──────────────────────────────────────────────────────────

export function ManifestoSection() {
  const [activePillar, setActivePillar] = useState(0);
  const onActivate = useCallback((i: number) => setActivePillar(i), []);

  return (
    <section className="bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-12 text-center">
        <StaggerSection>
          <StaggerItem>
            <SectionEyebrow>Manifesto Foco</SectionEyebrow>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1e293b] tracking-tighter leading-none max-w-2xl mx-auto">
              Três convicções que definem{" "}
              <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
                como operamos.
              </span>
            </h2>
          </StaggerItem>
        </StaggerSection>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT: sticky visual */}
          <div className="hidden lg:block">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-10">
              <MorphingCanvas activePillar={activePillar} />
              <PillarIndicators activePillar={activePillar} />
            </div>
          </div>
          {/* RIGHT: scrollable pillars */}
          <div>
            <div className="flex justify-center py-12 lg:hidden">
              <MorphingCanvas activePillar={activePillar} />
            </div>
            {JOURNEY_PILLARS.map((pillar, i) => (
              <PillarBlock
                key={pillar.id}
                pillar={pillar}
                index={i}
                isActive={activePillar === i}
                onActivate={onActivate}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="h-24 lg:h-32" />
    </section>
  );
}
