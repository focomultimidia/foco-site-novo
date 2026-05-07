"use client";

import { BaseInternalHero } from "@/features/shared/components/base-internal-hero";
import type { HeroData } from "../types";

interface HeroSectionProps {
  data: HeroData;
  onCtaClick?: () => void;
}

const SLIDES = [
  { desktopImage: "/assets/imgs/motor-de-reservas/1.png", mobileImage: "/assets/imgs/motor-de-reservas/1.png", label: "Busca de disponibilidade",  alt: "Busca de disponibilidade" },
  { desktopImage: "/assets/imgs/motor-de-reservas/2.png", mobileImage: "/assets/imgs/motor-de-reservas/2.png", label: "Seleção de quarto",         alt: "Seleção de quarto" },
  { desktopImage: "/assets/imgs/motor-de-reservas/3.png", mobileImage: "/assets/imgs/motor-de-reservas/3.png", label: "Checkout seguro",           alt: "Checkout seguro" },
  { desktopImage: "/assets/imgs/motor-de-reservas/4.png", mobileImage: "/assets/imgs/motor-de-reservas/4.png", label: "Confirmação instantânea",   alt: "Confirmação instantânea" },
  { desktopImage: "/assets/imgs/motor-de-reservas/5.png", mobileImage: "/assets/imgs/motor-de-reservas/5.png", label: "Painel do hoteleiro",       alt: "Painel do hoteleiro" },
];

function buildTitle(raw: string) {
  const kw = "alta conversão";
  const idx = raw.toLowerCase().indexOf(kw);
  if (idx === -1) return raw;
  return (
    <>
      {raw.slice(0, idx)}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#285992] to-[#3a7bd5]">
        {raw.slice(idx, idx + kw.length)}
      </span>
      {raw.slice(idx + kw.length)}
    </>
  );
}

function HeroSection({ data, onCtaClick }: HeroSectionProps) {
  return (
    <BaseInternalHero
      badgeText={data.subtitulo}
      title={buildTitle(data.titulo)}
      description={data.descricao}
      primaryCTA={{ label: data.ctaPrimario, onClick: onCtaClick }}
      secondaryCTA={{ label: data.ctaSecundario }}
      slides={SLIDES}
    />
  );
}

export { HeroSection };
