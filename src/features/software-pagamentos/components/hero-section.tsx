"use client";

import { CheckCircle2 } from "lucide-react";
import { HomeStyleHero } from "@/features/shared/components/home-style-hero";
import type { HeroData } from "../types";

interface HeroSectionProps {
  data: HeroData;
  onCtaClick?: () => void;
}

const DESKTOP_IMAGE = { src: "/assets/imgs/produtos/focopay.png", alt: "Software de Pagamentos" };
const MOBILE_IMAGE = { src: "/assets/imgs/produtos/mobile-focopay.png", alt: "Software de Pagamentos no mobile" };

const TRUST_BADGES = [
  { icon: CheckCircle2, label: "Sem taxa de setup" },
  { icon: CheckCircle2, label: "Cancele quando quiser" },
  { icon: CheckCircle2, label: "Suporte incluso" },
];

function HeroSection({ data, onCtaClick }: HeroSectionProps) {
  return (
    <HomeStyleHero
      eyebrow={data.subtitulo}
      title={data.titulo}
      subtitle={data.descricao}
      ctaLabel={data.ctaPrimario}
      onCtaClick={onCtaClick}
      desktopImage={DESKTOP_IMAGE}
      mobileImage={MOBILE_IMAGE}
      desktopAspectRatio="815 / 584"
      badges={TRUST_BADGES}
    />
  );
}

export { HeroSection };
