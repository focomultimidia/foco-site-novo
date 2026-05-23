"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, TrendingDown, AlertTriangle, Frown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DorSolucao } from "../types";

// ── Static maps (unchanged) ───────────────────────────────────────────────────
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "baixa-ocupacao":   TrendingDown,
  "prejuizos":        AlertTriangle,
  "experiencia-ruim": Frown,
};

const tabCta: Record<string, { texto: string; botao: string }> = {
  "baixa-ocupacao": {
    texto: "Quer atrair mais hóspedes e aumentar as suas reservas?",
    botao: "Quero atrair mais hóspedes",
  },
  "prejuizos": {
    texto: "Quer parar de ter prejuízos e começar a obter lucros com seu estabelecimento?",
    botao: "Quero obter lucros",
  },
  "experiencia-ruim": {
    texto: "Quer melhorar a experiência do seu hóspede e aumentar sua reputação online?",
    botao: "Quero aumentar a reputação do meu hotel",
  },
};

// ── Water ripple overlay (identical technique to NumerosSection) ──────────────
// SVG feTurbulence produces a noise texture rendered as white pixels with
// variable alpha. mix-blend-mode:overlay blends caustic highlights into the
// dark blue panel without obscuring the text or sub-cards above it (z-10).
function DoresWaterRipple({ index }: { index: number }) {
  const id    = `dores-water-${index}`;
  const seed1 = index * 17 + 5;
  const seed2 = index * 11 + 13;

  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="dores-water-overlay pointer-events-none absolute inset-0 w-full h-full"
      style={{
        zIndex: 20,
        mixBlendMode: "overlay",
        animationDelay: `${index * -2.4}s`,
      }}
    >
      <defs>
        <filter
          id={id}
          x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="turbulence"   baseFrequency="0.015 0.026" numOctaves="2" seed={seed1} result="bigWaves"    />
          <feColorMatrix in="bigWaves"    type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.65 0 0 0 0" result="bigLayer"   />
          <feTurbulence type="fractalNoise" baseFrequency="0.085 0.13"  numOctaves="3" seed={seed2} result="smallRipples" />
          <feColorMatrix in="smallRipples" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.30 0 0 0 0" result="smallLayer" />
          <feMerge>
            <feMergeNode in="bigLayer"   />
            <feMergeNode in="smallLayer" />
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}

// ── Accordion item ─────────────────────────────────────────────────────────────
interface AccordionItemProps {
  dor:      DorSolucao;
  index:    number;
  isOpen:   boolean;
  onToggle: () => void;
}

function AccordionItem({ dor, index, isOpen, onToggle }: AccordionItemProps) {
  const Icon = iconMap[dor.id] || AlertTriangle;
  const cta  = tabCta[dor.id];

  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-shadow duration-300"
      style={{
        boxShadow: isOpen
          ? "0 8px 32px rgba(40,89,146,0.14), 0 0 0 1px rgba(40,89,146,0.18)"
          : "0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.06)",
      }}
    >
      {/*
        Ripple lives at the outer-container level so it spans header + content
        as one continuous surface.  Conditionally rendered — disappears entirely
        when the accordion is closed, restoring the clean white header.
        z-index:20 sits above background but pointer-events:none lets the
        button and CTA remain fully interactive.
      */}
      {isOpen && <DoresWaterRipple index={index} />}

      {/* ── Trigger ────────────────────────────────────────────────────── */}
      {/*
        backgroundColor is driven exclusively via Framer Motion `animate` so
        the open→closed transition is smooth and there is no conflict with
        CSS background shorthand or Tailwind transition utilities.
        whileHover adds a tinted hover only when closed (non-conflicting since
        both use the same `backgroundColor` property).
      */}
      <motion.button
        onClick={onToggle}
        className="relative z-10 w-full flex items-center gap-4 px-6 py-6 text-left"
        animate={{ backgroundColor: isOpen ? "#285992" : "#ffffff" }}
        whileHover={!isOpen ? { backgroundColor: "#eff6ff" } : {}}
        whileTap={{ scale: 0.998 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
      >
        {/* Icon badge */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{
            background: isOpen ? "rgba(255,255,255,0.13)" : "rgba(30,58,95,0.07)",
            transition: "background 0.28s ease",
          }}
        >
          <Icon
            className="w-6 h-6"
            style={{
              color: isOpen ? "#93c5fd" : "#285992",
              transition: "color 0.28s ease",
            }}
          />
        </div>

        {/*
          Title — matches site section h2 typography:
          font-display / font-bold / tracking-tighter / antialiased
        */}
        <span
          className="flex-1 min-w-0 font-display font-bold text-2xl sm:text-3xl leading-none tracking-tighter antialiased"
          style={{
            color: isOpen ? "#ffffff" : "#285992",
            transition: "color 0.28s ease",
          }}
        >
          {dor.titulo}
        </span>

        {/* + rotates 45° → becomes × when open */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: isOpen ? "rgba(255,255,255,0.13)" : "rgba(30,58,95,0.07)",
            transition: "background 0.28s ease",
          }}
        >
          <Plus
            className="w-4 h-4"
            style={{
              color: isOpen ? "#ffffff" : "#285992",
              transition: "color 0.28s ease",
            }}
            strokeWidth={2.5}
          />
        </motion.div>
      </motion.button>

      {/* ── Expandable content ──────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height:  { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.22, ease: "easeOut" },
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="bg-[#285992] px-6 pb-8 md:px-12 md:pb-12">

              {/* All readable content — z-10 keeps it above the ripple layer */}
              <div className="relative z-10">

                {/* Description */}
                <div className="text-center mb-10 pt-1">
                  <p className="text-white/70 max-w-2xl mx-auto">
                    {dor.descricao}
                  </p>
                </div>

                {/* Solutions grid — content unchanged */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {dor.solucoes.map((solucao, si) => (
                    <motion.div
                      key={si}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.08 + si * 0.065 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors"
                    >
                      <h4 className="font-bold text-white mb-2 text-sm">
                        {solucao.titulo}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {solucao.descricao}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* CTA — content unchanged */}
                {cta && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.28 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                  >
                    <p className="text-white/80 text-base sm:text-lg font-medium text-center sm:text-left">
                      {cta.texto}
                    </p>
                    <Button className="shrink-0 bg-white text-[#285992] hover:bg-blue-50 font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 group">
                      {cta.botao}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                )}

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
interface DoresSectionProps {
  dores: DorSolucao[];
}

function DoresSection({ dores }: DoresSectionProps) {
  // Single-open accordion: empty string means all closed.
  const [openId, setOpenId] = useState<string>(dores[0]?.id ?? "");

  const handleToggle = (id: string) =>
    setOpenId(prev => (prev === id ? "" : id));

  return (
    <>
      {/*
        dores-water-breathe — opacity pulse for the ripple overlay inside each
        open accordion panel. animation-delay is staggered per item (set via
        inline style in DoresWaterRipple) so multiple open/close cycles look organic.
      */}
      <style>{`
        @keyframes dores-water-breathe {
          0%, 100% { opacity: 0.11; }
          50%       { opacity: 0.20; }
        }
        .dores-water-overlay {
          animation: dores-water-breathe 7.5s ease-in-out infinite;
        }
      `}</style>

    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          {dores.map((dor, i) => (
            <AccordionItem
              key={dor.id}
              dor={dor}
              index={i}
              isOpen={openId === dor.id}
              onToggle={() => handleToggle(dor.id)}
            />
          ))}
        </motion.div>

      </div>
    </section>
    </>
  );
}

export { DoresSection };
