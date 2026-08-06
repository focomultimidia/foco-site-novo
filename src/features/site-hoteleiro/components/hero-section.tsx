"use client";

import { BaseInternalHero } from "@/features/shared/components/base-internal-hero";
import type { HeroData } from "../types";

interface HeroSectionProps {
  data: HeroData;
  onCtaClick?: () => void;
}

const SLIDES = [
  { desktopImage: "/assets/imgs/shared/1.webp", mobileImage: "/assets/imgs/shared/site1.webp", label: "Busca de disponibilidade",  alt: "Busca de disponibilidade" },
  { desktopImage: "/assets/imgs/shared/2.webp", mobileImage: "/assets/imgs/shared/site2.webp", label: "Seleção de quarto",         alt: "Seleção de quarto" },
  { desktopImage: "/assets/imgs/shared/3.webp", mobileImage: "/assets/imgs/shared/site3.webp", label: "Checkout seguro",           alt: "Checkout seguro" },
  { desktopImage: "/assets/imgs/shared/4.webp", mobileImage: "/assets/imgs/shared/site4.webp", label: "Confirmação instantânea",   alt: "Confirmação instantânea" },
  { desktopImage: "/assets/imgs/shared/5.webp", mobileImage: "/assets/imgs/shared/site1.webp", label: "Painel do hoteleiro",       alt: "Painel do hoteleiro" },
];

function buildTitle(raw: string) {
  const kw = "converte visitantes em hóspedes";
  const idx = raw.toLowerCase().indexOf(kw);
  if (idx === -1) return raw;
  return (
    <>
      {raw.slice(0, idx)}
      <span
        className="text-transparent bg-clip-text bg-gradient-to-r from-[#285992] to-[#3a7bd5]"
      >
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
      slides={SLIDES}
    />
  );
}

export { HeroSection };
