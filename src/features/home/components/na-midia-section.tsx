"use client";

import { useState } from "react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import type { ArtigoMidia } from "../types";

// ── 3D position system ────────────────────────────────────────────────────────
type Role = "center" | "left" | "right";

// Fixed card dimensions — the perspective container uses these to size itself.
const CARD_W = 700;
const CARD_H = 440;

interface PosConfig {
  x: number;
  rotateY: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

// Spring handles position / rotation / scale.
// Opacity & filter get a quick tween so they don't overshoot.
const POS: Record<Role, PosConfig> = {
  center: { x: 0,    rotateY: 0,   scale: 1,    opacity: 1,    zIndex: 30 },
  left:   { x: -410, rotateY: 30,  scale: 0.82, opacity: 0.55, zIndex: 10 },
  right:  { x: 410,  rotateY: -30, scale: 0.82, opacity: 0.55, zIndex: 10 },
};

const SPRING = { type: "spring", stiffness: 280, damping: 32 } as const;
const FADE   = { duration: 0.38, ease: "easeOut" }              as const;

function getRole(i: number, center: number, total: number): Role {
  if (i === center) return "center";
  return i === (center - 1 + total) % total ? "left" : "right";
}

// ── Image mapping ─────────────────────────────────────────────────────────────
const IMAGES: Record<string, string> = {
  "1": "/assets/imgs/na-midia/materia-1.webp",
  "2": "/assets/imgs/na-midia/materia-2.webp",
  "3": "/assets/imgs/na-midia/materia-3.webp",
};

// ── Article card ──────────────────────────────────────────────────────────────
interface ArticleCardProps {
  artigo: ArtigoMidia;
  isCenter: boolean;
}

function ArticleCard({ artigo, isCenter }: ArticleCardProps) {
  return (
    <div
      className="h-full rounded-3xl overflow-hidden grid md:grid-cols-2"
      style={{
        background: "#ffffff",
        border: `1px solid ${isCenter ? "rgba(40,89,146,0.14)" : "rgba(0,0,0,0.06)"}`,
        boxShadow: isCenter
          ? "0 4px 16px rgba(40,89,146,0.07), 0 20px 56px rgba(40,89,146,0.10), 0 48px 96px rgba(40,89,146,0.06)"
          : "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* ── Image panel ───────────────────────────────────────────────── */}
      <div className="relative h-48 md:h-full overflow-hidden">
        <img
          src={IMAGES[artigo.id] ?? IMAGES["1"]}
          alt={artigo.titulo}
          width={600}
          height={400}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: isCenter ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s ease",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3d]/65 via-[#0f1f3d]/15 to-transparent" />

        {/* Mobile publication pill */}
        <div className="absolute bottom-4 left-4 md:hidden">
          <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            <Newspaper className="w-3 h-3" />
            {artigo.publicacao}
          </span>
        </div>
      </div>

      {/* ── Content panel ─────────────────────────────────────────────── */}
      <div className="p-7 flex flex-col">

        {/* Publication row — desktop only */}
        <div className="hidden md:flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-3xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#e8f0fb,#d1e2f8)" }}
          >
            <Newspaper className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-tight">
              {artigo.publicacao}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{artigo.data}</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-gray-900 leading-snug tracking-tight mb-3 line-clamp-2">
          {artigo.titulo}
        </h3>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-[#285992]/15 via-[#285992]/8 to-transparent mb-4" />

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-4 flex-1 mb-6">
          {artigo.descricao}
        </p>

        {/* CTA */}
        <a
          href={artigo.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 group w-fit"
          onClick={e => e.stopPropagation()}
        >
          Ler artigo completo
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
interface NaMidiaSectionProps {
  artigos: ArtigoMidia[];
}

function NaMidiaSection({ artigos }: NaMidiaSectionProps) {
  const [center, setCenter] = useState(0);
  const total = artigos.length;

  const prev = () => setCenter(c => (c - 1 + total) % total);
  const next = () => setCenter(c => (c + 1) % total);

  return (
    <section className="py-20 bg-[#f4f7fb] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SectionEyebrow>Na mídia</SectionEyebrow>

          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            Reconhecidos pela{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              mídia
            </span>
            , escolhidos pelos{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              hoteleiros
            </span>
          </h2>

          <p className="text-gray-500 text-lg font-light leading-relaxed max-w-3xl mx-auto">
            As principais publicações do setor destacam nossos sistemas como
            referência em tecnologia e eficiência para hotéis e pousadas.
          </p>
        </motion.div>

      </div>

      {/*
        ── 3D Carousel — desktop (md+) ──────────────────────────────────────
        perspective on the container gives all cards a shared vanishing point.
        Each card is absolutely centred (left:50% marginLeft:-CARD_W/2) so the
        x-animation moves them cleanly left/right from that common origin.
        rotateY + x together create the "cards fanning out behind" look.
      */}
      <div
        className="relative hidden md:block"
        style={{ height: CARD_H, perspective: "1200px" }}
      >
        {artigos.map((artigo, i) => {
          const role = getRole(i, center, total);
          const pos  = POS[role];

          return (
            <motion.div
              key={artigo.id}
              className="absolute top-0 left-1/2"
              style={{
                width: CARD_W,
                height: CARD_H,
                marginLeft: -CARD_W / 2,
                transformOrigin: "center center",
                cursor: role !== "center" ? "pointer" : "default",
              }}
              animate={{
                x:       pos.x,
                rotateY: pos.rotateY,
                scale:   pos.scale,
                opacity: pos.opacity,
                zIndex:  pos.zIndex,
                filter:  role === "center" ? "blur(0px)" : "blur(1.5px)",
              }}
              transition={{
                x:       SPRING,
                rotateY: SPRING,
                scale:   SPRING,
                opacity: FADE,
                zIndex:  { duration: 0 },
                filter:  FADE,
              }}
              onClick={() => role !== "center" && setCenter(i)}
            >
              <ArticleCard artigo={artigo} isCenter={role === "center"} />
            </motion.div>
          );
        })}
      </div>

      {/*
        ── Mobile — single card with slide transition ────────────────────────
        AnimatePresence mode="wait" ensures exit completes before enter starts,
        preventing two cards from being simultaneously visible on small screens.
      */}
      <div className="md:hidden px-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={center}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArticleCard artigo={artigos[center]} isCenter />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-5 mt-10">
        <button
          onClick={prev}
          aria-label="Anterior"
          className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {artigos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCenter(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={[
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                idx === center
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
    </section>
  );
}

export { NaMidiaSection };
