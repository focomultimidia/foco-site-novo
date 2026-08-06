"use client";

import { CheckCircle2 } from "lucide-react";
import { GradientHero } from "./gradient-hero";

// ── Public interfaces ─────────────────────────────────────────────────────────
// Kept stable so the 5 per-page hero-section.tsx wrappers (CRM, Gestão
// Hoteleira, Motor de Reservas, Site Hoteleiro, Software de Pagamentos) don't
// need structural changes — this file now just adapts their props onto the
// shared GradientHero, which owns the actual visual (same pattern as Home).

export interface HeroSlide {
  desktopImage: string;
  mobileImage: string;
  label?: string;
  alt: string;
}

export interface BaseInternalHeroProps {
  badgeText?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  description?: string | React.ReactNode;
  primaryCTA?: { label: string; href?: string; onClick?: () => void };
  /** Trust-badge labels — rendered as floating pills around the mockup, like Home's stat badges. */
  trustItems?: string[];
  slides: HeroSlide[];
}

const TRUST_ITEMS = ["Sem taxa de setup", "Cancele quando quiser", "Suporte incluso"];

function BaseInternalHero({
  badgeText,
  title,
  subtitle,
  description,
  primaryCTA,
  trustItems = TRUST_ITEMS,
  slides,
}: BaseInternalHeroProps) {
  return (
    <GradientHero
      eyebrow={badgeText}
      title={title}
      subtitle={(description as string | undefined) ?? subtitle}
      ctaLabel={primaryCTA?.label}
      onCtaClick={primaryCTA?.onClick}
      ctaHref={primaryCTA?.href}
      slides={slides.map(s => ({
        desktopSrc: s.desktopImage,
        mobileSrc: s.mobileImage,
        label: s.label,
        alt: s.alt,
      }))}
      badges={trustItems.slice(0, 3).map(label => ({ icon: CheckCircle2, label }))}
    />
  );
}

export { BaseInternalHero };
