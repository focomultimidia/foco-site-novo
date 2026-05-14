"use client";

import { BaseInternalHero } from "@/features/shared/components/base-internal-hero";
import { InternalHeroBackground } from "@/features/shared/components/internal-hero-background";
import type { HeroData } from "../types";

interface HeroSectionProps {
  data: HeroData;
  onCtaClick?: () => void;
}

const SLIDES = [
  { desktopImage: "/assets/imgs/motor-de-reservas/1.png", mobileImage: "/assets/imgs/channel-manager/site1.png", label: "Busca de disponibilidade",  alt: "Busca de disponibilidade" },
  { desktopImage: "/assets/imgs/motor-de-reservas/2.png", mobileImage: "/assets/imgs/channel-manager/site2.png", label: "Seleção de quarto",         alt: "Seleção de quarto" },
  { desktopImage: "/assets/imgs/motor-de-reservas/3.png", mobileImage: "/assets/imgs/channel-manager/site3.png", label: "Checkout seguro",           alt: "Checkout seguro" },
  { desktopImage: "/assets/imgs/motor-de-reservas/4.png", mobileImage: "/assets/imgs/channel-manager/site4.png", label: "Confirmação instantânea",   alt: "Confirmação instantânea" },
  { desktopImage: "/assets/imgs/motor-de-reservas/5.png", mobileImage: "/assets/imgs/channel-manager/site1.png", label: "Painel do hoteleiro",       alt: "Painel do hoteleiro" },
];

function buildTitle(raw: string) {
  const kw = "integrado";
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
      background={<InternalHeroBackground imageSrc="/assets/imgs/hero/bkg-modelos-sites3.png" />}
      badgeText={data.subtitulo}
      title={buildTitle(data.titulo)}
      titleClassName="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#1a3a45] mb-4 leading-tight tracking-tight"
      description={data.descricao}
      descriptionClassName="text-lg text-[#244248]/70 mb-8 leading-relaxed max-w-xl"
      primaryCTA={{ label: data.ctaPrimario, onClick: onCtaClick }}
      secondaryCTA={{ label: data.ctaSecundario }}
      slides={SLIDES}
    />
  );
}

export { HeroSection };
