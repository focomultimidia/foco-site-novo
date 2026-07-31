"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { motion } from "framer-motion";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import type { Evento } from "../types";

// ── Asset maps ────────────────────────────────────────────────────────────────
const EVENTO_IMAGES: Record<string, string> = {
  "1": "/assets/imgs/feiras-eventos/equipotel-2025.webp",
  "2": "/assets/imgs/feiras-eventos/expohotel-2025.webp",
  "3": "/assets/imgs/feiras-eventos/expohotel-2024.webp",
  "4": "/assets/imgs/feiras-eventos/equipotel-2025.webp",
  "5": "/assets/imgs/feiras-eventos/expohotel-2025.webp",
  "6": "/assets/imgs/feiras-eventos/expohotel-2024.webp",
};

const EVENTO_LOGOS: Record<string, string> = {
  "1": "/assets/imgs/feiras-eventos/equipotel.webp",
  "2": "/assets/imgs/feiras-eventos/expotel.webp",
  "3": "/assets/imgs/feiras-eventos/encatho-exprotel.webp",
  "4": "/assets/imgs/feiras-eventos/equipotel.webp",
  "5": "/assets/imgs/feiras-eventos/expotel.webp",
  "6": "/assets/imgs/feiras-eventos/encatho-exprotel.webp",
};

// ── Constants ─────────────────────────────────────────────────────────────────
const VISIBLE    = 4;
const AUTOPLAY   = 4500;
const MOBILE_MAX = 4;

// ── Track math ────────────────────────────────────────────────────────────────
function tw(n: number)           { return `${(n / VISIBLE) * 100}%`; }
function tx(n: number, s: number) { return `${-(s / n) * 100}%`;    }

// ── Timeline node geometry ────────────────────────────────────────────────────
// Badge area: 48 px (centered text).
// Dot: 40 px (w-10 h-10).  Line centre = 48 + 20 = 68 px from node top.
// Logo area: 80 px (h-20) below the dot.
const LINE_TOP_PX = 68;


// ── Giant-card visual identity (copied from motor-reservas/vantagens-section) ──
// Matches the glass-card aesthetic exactly: rounded-3xl, border-white, blur(16px).
const GIANT_CARD_SHADOW =
  "0 1px 2px rgba(0,0,0,0.04), " +
  "0 4px 8px rgba(0,0,0,0.04), "  +
  "0 8px 20px rgba(0,0,0,0.03), " +
  "0 16px 40px rgba(0,0,0,0.02)";

// ── Timeline date/local label (bare typography, no card wrapper) ──────────────
function TimelineBadge({ evento, vis }: { evento: Evento; vis: boolean }) {
  return (
    <motion.div
      animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 4 }}
      transition={{ duration: 0.28 }}
      className="text-center"
    >
      <p className="text-[12px] font-bold uppercase tracking-widest text-[#285992] leading-none mb-2.5">
        {evento.data}
      </p>
      <span className="flex items-center justify-center gap-0.5 mb-3.5 text-[12px] text-slate-500 leading-none">
        <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
        {evento.local}
      </span>
    </motion.div>
  );
}

// ── Desktop event card ────────────────────────────────────────────────────────
function EventoCard({ evento }: { evento: Evento }) {
  return (
    <div className="group h-full rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl cursor-default">
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          <img
            src={EVENTO_IMAGES[evento.id] ?? EVENTO_IMAGES["1"]}
            alt={evento.titulo}
            width={555}
            height={304}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-[#0f172a] text-sm leading-snug tracking-tight mb-2">
          {evento.titulo}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          {evento.descricao}
        </p>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
interface EventosSectionProps { eventos: Evento[]; }

function EventosSection({ eventos }: EventosSectionProps) {
  const [start,   setStart]   = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [showAll, setShowAll] = useState(false);

  const total       = eventos.length;
  const maxIdx      = Math.max(0, total - VISIBLE);
  const hasCarousel = total > VISIBLE;

  // ── Navigation ───────────────────────────────────────────────────────────
  const prev = useCallback(() => setStart(s => Math.max(0, s - 1)), []);

  const snapping = useRef(false);
  const next = useCallback(() => {
    setStart(s => {
      if (s >= maxIdx) { snapping.current = true; return 0; }
      snapping.current = false;
      return s + 1;
    });
  }, [maxIdx]);

  useEffect(() => {
    if (!snapping.current) return;
    const t = setTimeout(() => { snapping.current = false; }, 60);
    return () => clearTimeout(t);
  }, [start]);

  // ── Autoplay ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (paused || !hasCarousel) return;
    const id = setInterval(next, AUTOPLAY);
    return () => clearInterval(id);
  }, [paused, hasCarousel, next]);

  const spring = snapping.current
    ? ({ duration: 0 } as const)
    : ({ type: "spring", stiffness: 280, damping: 32 } as const);

  const trackW = tw(total);
  const trackX = tx(total, start);

  const fillWidth = maxIdx > 0 ? (start / maxIdx) * 100 : 0;

  return (
    <section
      className="relative py-20 overflow-hidden bg-[#f4f7fb]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <SectionEyebrow>Eventos</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            Presente nas principais{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              feiras de hotelaria
            </span>
          </h2>
        </motion.div>

        {/*
          ── Desktop (lg+): entire carousel inside a single "giant card" ────────
          Visual identity transplanted from motor-reservas/vantagens-section:
          · rounded-3xl outer / rounded-[15px] inner  (same as vantagens cards)
          · border border-white/80                     (same)
          · backdrop-blur(16px) + bg-white/65          (same glassmorphism)
          · GIANT_CARD_SHADOW                          (same diffuse shadow)
          · specular top-edge highlight                (same rim light)

          p-10 (40 px) on the inner surface gives shadow breathing room so that
          shadow-lg / hover:shadow-2xl on the sub-cards never gets clipped.
          The shadow-fix trick is still used inside (margin:-36px → boundary
          sits at 40−36=4 px inside the glass surface, fully contained).
        */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="hidden lg:block"
        >
          {/* ── Giant card outer shell ────────────────────────────────── */}
          <div className="relative rounded-[40px]" style={{ boxShadow: GIANT_CARD_SHADOW }}>

            {/* ── Glass surface ────────────────────────────────────────── */}
            <div
              className="relative rounded-[40px] overflow-hidden border border-white border-2 p-10"
              style={{
                background:          "linear-gradient(to bottom, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.00) 100%)",
                backdropFilter:      "blur(10px)",
                WebkitBackdropFilter:"blur(10px)",
              }}
            >
              {/* Specular rim light (top edge highlight) */}
              <div className="pointer-events-none absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

              {/* ── Timeline row ─────────────────────────────────────── */}
              {hasCarousel && (
                <div className="relative mb-6">
                  <div
                    className="absolute left-0 right-0 h-[3px] bg-slate-200/70 rounded-full pointer-events-none"
                    style={{ top: `${LINE_TOP_PX}px`, zIndex: 0 }}
                  />
                  <motion.div
                    className="absolute left-0 h-[3px] rounded-full pointer-events-none"
                    style={{
                      top: `${LINE_TOP_PX}px`,
                      zIndex: 1,
                      background: "linear-gradient(to right, #2563eb, #22d3ee)",
                    }}
                    animate={{ width: `${fillWidth}%` }}
                    transition={spring}
                  />

                  <div className="overflow-hidden relative z-10">
                    <motion.div
                      className="flex"
                      animate={{ x: trackX }}
                      transition={spring}
                      style={{ width: trackW }}
                    >
                      {eventos.map((evento, i) => {
                        const vis = i >= start && i < start + VISIBLE;
                        return (
                          <div
                            key={evento.id}
                            style={{ width: `${100 / total}%`, padding: "0 8px" }}
                            className="group flex flex-col items-center"
                          >
                            {/* Badge area — 48 px tall, content centred */}
                            <div className="h-[48px] flex items-center justify-center w-full">
                              <TimelineBadge evento={evento} vis={vis} />
                            </div>

                            {/* Dot */}
                            <motion.div
                              animate={{ scale: vis ? 1.1 : 0.85, opacity: vis ? 1 : 0.5 }}
                              transition={{ type: "spring", stiffness: 350, damping: 28 }}
                              className="w-10 h-10 rounded-full relative z-10 flex items-center justify-center border-[3px] border-white shadow-md bg-gradient-to-br from-[#729fd4] to-[#285992]"
                            >
                              <span className="text-white text-xs font-bold leading-none select-none">
                                {i + 1}
                              </span>
                            </motion.div>

                            {/* Logo — grayscale by default, full color on hover */}
                            <div className="h-20 flex items-start justify-center pt-3">
                              {EVENTO_LOGOS[evento.id] && (
                                <img
                                  src={EVENTO_LOGOS[evento.id]}
                                  alt=""
                                  aria-hidden="true"
                                  width={250}
                                  height={70}
                                  loading="lazy"
                                  decoding="async"
                                  className="max-h-full max-w-[180px] object-contain transition-all duration-300 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  </div>
                </div>
              )}

              {/*
                ── Cards with shadow breathing room ──────────────────────
                The giant card's p-10 gives 40 px of clearance on all sides.
                The shadow-fix trick adds another 36 px vertical zone so
                shadow-lg / hover:shadow-2xl never gets clipped.
                (40 px padding − 36 px negative margin = 4 px safety margin.)
              */}
              <div
                className="overflow-hidden"
                style={{ padding: "36px 0", margin: "-36px 0" }}
              >
                {hasCarousel ? (
                  <motion.div
                    className="flex items-stretch"
                    animate={{ x: trackX }}
                    transition={spring}
                    style={{ width: trackW }}
                  >
                    {eventos.map(evento => (
                      <div
                        key={evento.id}
                        style={{ width: `${100 / total}%`, padding: "0 8px" }}
                      >
                        <EventoCard evento={evento} />
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}
                  >
                    {eventos.map(evento => (
                      <EventoCard key={evento.id} evento={evento} />
                    ))}
                  </div>
                )}
              </div>

              {/* ── Navigation — exact pattern of na-midia-section.tsx ── */}
              {hasCarousel && (
                <div className="flex items-center justify-center gap-5 mt-6">
                  <button
                    onClick={prev}
                    aria-label="Anterior"
                    className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* One dot per valid position (maxIdx+1 total) */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: maxIdx + 1 }, (_, idx) => (
                      <button
                        key={idx}
                        onClick={() => { snapping.current = false; setStart(idx); }}
                        aria-label={`Posição ${idx + 1}`}
                        className={[
                          "h-2 rounded-full transition-all duration-300 cursor-pointer",
                          idx === start
                            ? "w-6 bg-blue-600"
                            : "w-2 bg-gray-300 hover:bg-gray-400",
                        ].join(" ")}
                      />
                    ))}
                  </div>

                  <button
                    onClick={next}
                    aria-label="Próximo"
                    className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

            </div>{/* /glass surface */}
          </div>{/* /giant card */}
        </motion.div>

        {/*
          ── Mobile / tablet (< lg): vertical stack + "Ver mais" ────────────
          Timeline is hidden on mobile — each card re-exposes date + local.
          Descriptions are never truncated.
        */}
        <div className="lg:hidden space-y-4">
          {eventos.slice(0, showAll ? undefined : MOBILE_MAX).map((evento, i) => (
            <motion.div
              key={evento.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: (i % MOBILE_MAX) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm">
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={EVENTO_IMAGES[evento.id] ?? EVENTO_IMAGES["1"]}
                    alt={evento.titulo}
                    width={555}
                    height={304}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#285992] mb-0.5">
                    {evento.data}
                  </p>
                  <span className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    {evento.local}
                  </span>
                  <h3 className="font-display font-bold text-[#0f172a] text-sm leading-snug tracking-tight mb-1">
                    {evento.titulo}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {evento.descricao}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {!showAll && total > MOBILE_MAX && (
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onClick={() => setShowAll(true)}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-[#285992] bg-white border border-gray-200 rounded-xl hover:bg-blue-50 transition-colors shadow-sm cursor-pointer"
            >
              Ver mais eventos ({total - MOBILE_MAX} restantes)
              <ChevronDown className="w-4 h-4" />
            </motion.button>
          )}
        </div>

      </div>
    </section>
  );
}

export { EventosSection };
