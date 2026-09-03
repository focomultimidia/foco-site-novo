"use client";

import { lazy, Suspense } from "react";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";
import type { Diferencial } from "../types";

// Mesmo padrão de wall-of-love-section-lazy.tsx — adia o download+parse
// deste chunk até o usuário estar prestes a rolar até a seção, tirando-o do
// caminho crítico do LCP/TBT inicial da Home (única página que a usa).
const RealDiferenciaisSection = lazy(() =>
  import("./diferenciais-section").then((m) => ({ default: m.DiferenciaisSection })),
);

interface DiferenciaisSectionProps {
  diferenciais: Diferencial[];
}

function DiferenciaisSectionPlaceholder() {
  return <div aria-hidden="true" className="overflow-x-hidden py-24" />;
}

function DiferenciaisSection(props: DiferenciaisSectionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<DiferenciaisSectionPlaceholder />}>
          <RealDiferenciaisSection {...props} />
        </Suspense>
      ) : (
        <DiferenciaisSectionPlaceholder />
      )}
    </div>
  );
}

export { DiferenciaisSection };
