"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building, Utensils, MapPin } from "lucide-react";
import type { ElementType } from "react";

// ── Data (original — unchanged) ───────────────────────────────────────────────
const segmentos = [
  {
    icon: Building,
    titulo: "Meios de hospedagem",
    descricao:
      "Hotéis, pousadas, hostels e resorts que desejam garantir a satisfação do hóspede.",
    imagem:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
  },
  {
    icon: Utensils,
    titulo: "Setor de alimentação",
    descricao:
      "Bares e restaurantes que necessitam aumentar suas vendas, garantindo acesso direto aos turistas.",
    imagem:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
  },
  {
    icon: MapPin,
    titulo: "Passeios turísticos",
    descricao:
      "Agências de viagens, receptivos e atrativos turísticos que queiram promover suas atividades a milhares de viajantes.",
    imagem:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop",
  },
];

type SegmentoItem = (typeof segmentos)[number];

// ── Comet Icon ────────────────────────────────────────────────────────────────
/*
  Architecture:
  · Outer div — overflow-hidden rounded-full clips everything to a circle.
  · Spinner div — inset-0, conic-gradient, rotates via CSS animation.
    The conic-gradient describes the comet: 72% transparent, small bright tail.
  · Cutout div — absolute inset-[2.5px] with brand gradient, covers the center,
    leaving only the ~2.5px ring visible where the comet travels.
  · Icon sits inside the cutout, always readable.
*/
function CometIcon({
  icon: Icon,
  accelerated,
}: {
  icon: ElementType;
  accelerated: boolean;
}) {
  return (
    <div
      style={{
        transform: accelerated ? "translateY(-8px)" : "translateY(0)",
        transition: "transform 300ms cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {/* Circular container: clips spinner to circle */}
      <div
        className="relative rounded-full overflow-hidden"
        style={{ width: 52, height: 52 }}
      >
        {/* Rotating conic-gradient — the comet beam */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: "center",
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 68%, rgba(147,197,253,0.55) 80%, rgba(224,242,254,0.95) 90%, rgba(255,255,255,1) 95%, transparent 100%)",
            animationName: "para-quem-comet",
            animationDuration: accelerated ? "0.9s" : "2.4s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            transition: "animation-duration 400ms ease",
          }}
        />

        {/* Inner cutout — hides the center, exposes only the border ring */}
        <div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            inset: "2.5px",
            background: "linear-gradient(135deg, #1e4d85 0%, #285992 50%, #427ab9 100%)",
            zIndex: 1,
          }}
        >
          <Icon
            className="w-5 h-5 text-white"
            strokeWidth={1.8}
            style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.5))" }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Segmento Card ─────────────────────────────────────────────────────────────
function SegmentoCard({
  segmento,
  index,
}: {
  segmento: SegmentoItem;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl overflow-hidden bg-white cursor-default"
      style={{
        boxShadow: hovered
          ? "0 30px 60px -15px rgba(0,0,0,0.10), 0 10px 24px -8px rgba(40,89,146,0.10)"
          : "0 2px 10px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 600ms cubic-bezier(0.25,1,0.5,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image container ─────────────────────────────────────────────── */}
      <div className="relative h-52 overflow-hidden">

        {/* Photo — slow cinematic zoom on hover */}
        <img
          src={segmento.imagem}
          alt={segmento.titulo}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.10)" : "scale(1.00)",
            transition: "transform 1000ms cubic-bezier(0.25,1,0.5,1)",
          }}
        />

        {/* Vignette: bottom-to-top dark fade for contrast */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.10) 40%, transparent 70%)",
          }}
        />

        {/* Top-edge glint */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* Comet icon — top-left overlay */}
        <div className="absolute top-4 left-4 z-10">
          <CometIcon icon={segmento.icon} accelerated={hovered} />
        </div>
      </div>

      {/* ── Text content ─────────────────────────────────────────────────── */}
      <div className="px-6 py-5">

        {/* Top-edge separator inside card body */}
        <div className="h-px mb-4 bg-gradient-to-r from-[#285992]/12 via-[#285992]/6 to-transparent" />

        <h3
          className="font-display font-bold text-[#1e3a5f] text-[1.05rem] tracking-tight leading-snug mb-2"
          style={{
            letterSpacing: "-0.02em",
          }}
        >
          {segmento.titulo}
        </h3>

        <p
          className="text-gray-500 text-sm leading-relaxed"
          style={{
            opacity: hovered ? 1 : 0.65,
            transform: hovered ? "translateY(0)" : "translateY(2px)",
            transition: "opacity 350ms ease, transform 350ms ease",
          }}
        >
          {segmento.descricao}
        </p>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function ParaQuemSection() {
  return (
    <section className="py-24 bg-white">
      <style>{`
        @keyframes para-quem-comet {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — unchanged content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-2">
            Para quem é o{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              Foco Pass
            </span>
            ?
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            A plataforma que conecta a eficiência da sua gestão à satisfação
            imediata do seu cliente.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {segmentos.map((segmento, index) => (
            <SegmentoCard key={index} segmento={segmento} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

export { ParaQuemSection };
