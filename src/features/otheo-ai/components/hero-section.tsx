"use client";

import { HomeStyleHero } from "@/features/shared/components/home-style-hero";
import { SpatialPhoneCarousel } from "@/features/shared/components/spatial-phone-carousel";
import { BetaBadge } from "@/features/shared/components/beta-badge";
import { PRODUTOS_DATA } from "@/features/shared/data/produtos-data";

// Mesma fonte de dados do trio de celulares do ProdutosSection (home) — não
// duplica os paths aqui: se alguém trocar um print lá, a hero acompanha
// sozinha. Ordem [esquerdo, central, direito] é a mesma dos 2 lugares —
// aqui cada um vira um "produto" de 1 tela só (sem slideshow) pro mesmo
// SpatialPhoneCarousel usado na hero de /experiencia-do-hospede.
const OTHEO_MOCKUPS = PRODUTOS_DATA.find((p) => p.link === "/otheo-ai")?.mockups ?? [];
const OTHEO_PHONES = OTHEO_MOCKUPS.map((mock, i) => ({
  id: i,
  interval: 4000,
  startSlide: 0,
  slides: [{ src: mock?.src ?? "", alt: mock?.alt ?? "" }],
}));

// ── Section ───────────────────────────────────────────────────────────────────
interface HeroSectionProps {
  onCtaClick?: () => void;
}

function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <HomeStyleHero
      eyebrow="Novidade · Inteligência Artificial"
      title="O hotel inteiro, a uma pergunta de distância."
      highlightKeyword="distância"
      subtitle="Otheo entende sua operação e age por você: ocupação, tarifas e disponibilidade, em português, de qualquer lugar."
      ctaLabel="Solicite uma demonstração"
      onCtaClick={onCtaClick}
    >
      <div className="relative">
        <SpatialPhoneCarousel produtos={OTHEO_PHONES} />

        {/* Selo Beta — mesmo selo compacto usado no menu/cards de produto
            (ver beta-badge.tsx); a versão maior/dedicada que existia aqui
            saiu junto com o palco antigo, ao adotar a mesma estrutura de
            hero de /experiencia-do-hospede. Só em desktop: no mobile o
            palco encolhido (ver useMobileStageScale) não sobra espaço de
            canto pra um selo fixo sem competir com os celulares. */}
        <div className="hidden lg:block absolute top-14 right-6 xl:top-16 xl:right-10 z-40">
          <BetaBadge className="text-[11px] px-2.5 py-1" />
        </div>
      </div>
    </HomeStyleHero>
  );
}

export { HeroSection };
