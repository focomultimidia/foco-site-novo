"use client";

import { GradientHero } from "@/features/shared/components/gradient-hero";

/**
 * HeroSection · Marketing para Hotéis
 *
 * Scaffold — só texto + CTA na mesma faixa degradê das outras heroes
 * (GradientHero sem `slides`/`children`), sem mockup de produto: esta
 * página não é um módulo de software, então não há screenshot pra
 * encaixar aqui. Copy provisória, a ser substituída quando o conteúdo
 * da página for definido.
 */
interface HeroSectionProps {
  onCtaClick?: () => void;
}

function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <GradientHero
      eyebrow="Marketing Hoteleiro"
      title="Marketing para hotéis e pousadas que vende reservas diretas"
      subtitle="Estratégias de marketing digital pensadas para hotelaria: mais visibilidade, menos dependência de OTAs e um funil que gera hóspedes, não só cliques."
      ctaLabel="Falar com um consultor"
      onCtaClick={onCtaClick}
    />
  );
}

export { HeroSection };
