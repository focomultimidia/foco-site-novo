"use client";

import { HomeStyleHero } from "@/features/shared/components/home-style-hero";
import { SpatialPhoneCarousel } from "@/features/shared/components/spatial-phone-carousel";
import type { HeroData } from "../types";

// ── Products ──────────────────────────────────────────────────────────────────
// Each produto owns its image pool, autoplay interval and initial slide.
// Phones are strictly bound to their produto: when a phone slides to the center
// it carries its own slideshow state — images never jump between devices.
const PRODUTOS_HERO = [
  {
    id: 0,
    interval: 3000,
    startSlide: 0,
    slides: [
      { src: "/assets/imgs/experiencia-do-hospede/cardapio-digital.webp", alt: "Cardápio Digital - Menu principal" },
      { src: "/assets/imgs/experiencia-do-hospede/cardapio-digital1.webp",  alt: "Cardápio Digital - Escolhendo item" },
      { src: "/assets/imgs/experiencia-do-hospede/cardapio-digital2.webp",  alt: "Cardápio Digital - Acompanhamento de pedido" },
    ],
  },
  {
    id: 1,
    interval: 3500,
    startSlide: 0,
    slides: [
      { src: "/assets/imgs/experiencia-do-hospede/app-hospede.webp",    alt: "Foco Pass - App do Hóspede" },
      { src: "/assets/imgs/experiencia-do-hospede/app-hospede1.webp",      alt: "Foco Pass - Atrações do hotel" },
      { src: "/assets/imgs/experiencia-do-hospede/app-hospede2.webp",      alt: "Foco Pass - Programação do hotel" },

    ],
  },
  {
    id: 2,
    interval: 4000,
    startSlide: 0,
    slides: [
      { src: "/assets/imgs/experiencia-do-hospede/hero/reservas-1.webp", alt: "Motor de Reservas: Busca" },
      { src: "/assets/imgs/experiencia-do-hospede/hero/reservas-2.webp", alt: "Motor de Reservas: Quarto" },
      { src: "/assets/imgs/experiencia-do-hospede/hero/reservas-3.webp", alt: "Motor de Reservas: Confirmação" },
    ],
  },
] as const;

// ── Section ───────────────────────────────────────────────────────────────────
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
    >
      <SpatialPhoneCarousel produtos={PRODUTOS_HERO} />
    </HomeStyleHero>
  );
}

export { HeroSection };
