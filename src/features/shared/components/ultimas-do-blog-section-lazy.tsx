"use client";

import { lazy, Suspense } from "react";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";
import type { UltimasDoBlogSectionProps } from "./ultimas-do-blog-section";

// Mesmo padrão de wall-of-love-section-lazy.tsx — usada em toda página de
// produto + Home (11 páginas via este barrel); adiar o mount até o usuário
// estar prestes a rolar até a seção tira seu chunk do caminho crítico do
// LCP/TBT inicial em todas elas de uma vez.
const RealUltimasDoBlogSection = lazy(() =>
  import("./ultimas-do-blog-section").then((m) => ({ default: m.UltimasDoBlogSection })),
);

function UltimasDoBlogSectionPlaceholder() {
  return <div aria-hidden="true" className="py-16 lg:py-20 bg-[#f4f7fb]" />;
}

function UltimasDoBlogSection(props: UltimasDoBlogSectionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<UltimasDoBlogSectionPlaceholder />}>
          <RealUltimasDoBlogSection {...props} />
        </Suspense>
      ) : (
        <UltimasDoBlogSectionPlaceholder />
      )}
    </div>
  );
}

export { UltimasDoBlogSection };
export type { UltimasDoBlogSectionProps };
