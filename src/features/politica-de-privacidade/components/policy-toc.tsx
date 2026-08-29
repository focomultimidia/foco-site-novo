"use client";

import { FloatingToc, scrollToTocSection } from "@/features/shared/components/floating-toc";
import { tocSections } from "../data/toc-sections";

const HEADER_OFFSET = 96; // altura aproximada do header fixo + respiro

/** @deprecated use `scrollToTocSection` de `@/features/shared/components/floating-toc` */
function scrollToSection(id: string) {
  scrollToTocSection(id, HEADER_OFFSET);
}

// ── PolicyToc ─────────────────────────────────────────────────────────────
// Fininho de propósito — o sumário navegável em si (IntersectionObserver,
// painel sticky, colapsável em mobile) virou `FloatingToc`, compartilhado
// com o blog. Este wrapper só injeta os 14 `tocSections` fixos da política
// de privacidade, preservando o comportamento e a assinatura originais
// (`<PolicyToc />`, sem props) pro resto da página continuar igual.
function PolicyToc() {
  return <FloatingToc sections={tocSections} ariaLabel="Sumário da política de privacidade" headerOffset={HEADER_OFFSET} />;
}

export { PolicyToc, scrollToSection };
