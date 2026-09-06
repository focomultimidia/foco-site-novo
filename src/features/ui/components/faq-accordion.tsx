"use client";

import { lazy, Suspense } from "react";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";
import type { FAQItem } from "./faq-accordion-impl";

// Antes este wrapper era `lazy()` puro, SEM gate de IntersectionObserver: o
// componente pesado montava assim que a página renderizava, mesmo estando no
// rodapé. O motivo era o JSON-LD de FAQPage (schema.org), que vive dentro da
// implementação — gatear o mount por scroll arriscaria o Googlebot nunca
// rolar até aqui durante o render e nunca ver o schema.
//
// O custo disso apareceu no trace (throttling 4x + Slow 4G): o chunk
// `faq-accordion-impl` (mais `section-eyebrow`, `message-circle` e o chunk
// do `Empty`) era baixado e AVALIADO em ~1,6 s — antes do LCP em 1,78 s —
// e montar o acordeão gerava 97 ms de forced reflow (dos 98 ms totais da
// página) bem na janela crítica, competindo com a pintura do hero.
//
// A saída é separar as duas coisas: o JSON-LD sobe daqui, do wrapper leve,
// que já recebe `items` por prop e não custa chunk nenhum — o schema passa a
// existir no DOM AINDA MAIS CEDO do que antes, sem depender de rede. Só a UI
// do acordeão fica atrás do `useInViewOnce`, igual às outras seções pesadas
// (ver wall-of-love-section-lazy.tsx).
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

// Mesma altura aproximada da seção real, pra reserva de espaço não gerar CLS
// quando o conteúdo entra.
function FAQAccordionPlaceholder() {
  return <div aria-hidden="true" className="py-16 lg:py-24 bg-[#f4f7fb]" />;
}

// Marca cada resposta como Q&A pro Google — sem isso, um acordeão de FAQ é só
// texto comum: nada garante que o snippet "o que é X" na SERP puxe a resposta
// certa em vez de uma página concorrente. `dangerouslySetInnerHTML` é seguro
// aqui porque `items` vem sempre de arrays estáticos escritos no código de
// cada página, nunca de input do usuário.
function FaqJsonLd({ items }: { items: FAQItem[] }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

function FAQAccordion(props: FAQAccordionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref}>
      <FaqJsonLd items={props.items} />
      {inView ? (
        <Suspense fallback={<FAQAccordionPlaceholder />}>
          <RealFAQAccordion {...props} />
        </Suspense>
      ) : (
        <FAQAccordionPlaceholder />
      )}
    </div>
  );
}

export { FAQAccordion };
export type { FAQItem };
