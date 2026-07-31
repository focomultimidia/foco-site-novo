"use client";

import { motion } from "framer-motion";
import { HeroButton } from "@/features/shared/components/hero-button";
import type { HeroData } from "../types";

// ── Título ────────────────────────────────────────────────────────────────────

function buildTitle(raw: string) {
  const kw = "Hoteleiras";
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

interface HeroSectionProps {
  data: HeroData;
  onCtaClick?: () => void;
}

function HeroSection({ data, onCtaClick }: HeroSectionProps) {
  return (
    // Era o único hero com PNG próprio. Passa a usar a mesma composição
    // dos demais heros internos, já na superfície #f4f7fb.
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#f4f7fb]">

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-36 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center border border-[#285992]/20 text-[#285992] px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] mb-6">
              {data.subtitulo}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#244248] mb-6 leading-tight">
              {buildTitle(data.titulo)}
            </h1>
            <p className="text-lg text-[#244248]/80 mb-8 leading-relaxed max-w-xl">
              {data.descricao}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <HeroButton onClick={onCtaClick}>
                {data.ctaPrimario}
              </HeroButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <img
              src={data.imagemUrl}
              alt="Integrações Hoteleiras"
              width={1075}
              height={976}
              fetchPriority="high"
              decoding="async"
              className="rounded-3xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { HeroSection };
