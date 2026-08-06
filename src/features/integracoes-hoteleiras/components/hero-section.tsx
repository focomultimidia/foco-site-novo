"use client";

import { GradientHero } from "@/features/shared/components/gradient-hero";
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
    <GradientHero
      eyebrow={data.subtitulo}
      title={buildTitle(data.titulo)}
      subtitle={data.descricao}
      ctaLabel={data.ctaPrimario}
      onCtaClick={onCtaClick}
      slides={[{ desktopSrc: data.imagemUrl, alt: "Integrações Hoteleiras" }]}
    />
  );
}

export { HeroSection };
