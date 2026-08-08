"use client";

import { HomeStyleHero } from "@/features/shared/components/home-style-hero";
import type { HeroData } from "../types";

interface HeroSectionProps {
  data: HeroData;
  onCtaClick?: () => void;
}

function HeroSection({ data, onCtaClick }: HeroSectionProps) {
  return (
    <HomeStyleHero
      eyebrow={data.subtitulo}
      title={data.titulo}
      subtitle={data.descricao}
      ctaLabel={data.ctaPrimario}
      onCtaClick={onCtaClick}
      desktopImage={{ src: data.imagemUrl, alt: "Integrações Hoteleiras" }}
    />
  );
}

export { HeroSection };
