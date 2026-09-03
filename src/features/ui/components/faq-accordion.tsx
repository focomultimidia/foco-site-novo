"use client";

import { lazy, Suspense } from "react";
import type { FAQItem } from "./faq-accordion-impl";

// Code-split (não gated por IntersectionObserver, ao contrário do padrão de
// wall-of-love-section-lazy.tsx): o componente real inclui o JSON-LD de
// FAQPage (schema.org) que alimenta rich results do Google — como o site é
// uma SPA client-rendered sem SSR, esse schema só existe depois que o React
// monta o componente de qualquer forma, mas gatear o mount por proximidade
// de scroll arriscaria o Googlebot nunca rolar até aqui durante o
// crawl/render e nunca ver o schema. `lazy()` puro ainda tira o parse deste
// chunk do caminho síncrono de avaliação do módulo da página (mesmo
// benefício de LCP/TBT), só que ele monta assim que a página renderiza,
// sem esperar o usuário chegar perto.
const RealFAQAccordion = lazy(() =>
  import("./faq-accordion-impl").then((m) => ({ default: m.FAQAccordion })),
);

interface FAQAccordionProps {
  items: FAQItem[];
  title: string;
  subtitle?: string;
  badge?: string;
  showContactButton?: boolean;
}

function FAQAccordionPlaceholder() {
  return <div aria-hidden="true" className="py-16 lg:py-24 bg-[#f4f7fb]" />;
}

function FAQAccordion(props: FAQAccordionProps) {
  return (
    <Suspense fallback={<FAQAccordionPlaceholder />}>
      <RealFAQAccordion {...props} />
    </Suspense>
  );
}

export { FAQAccordion };
export type { FAQItem };
