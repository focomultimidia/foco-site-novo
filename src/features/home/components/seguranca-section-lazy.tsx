"use client";

import { lazy, Suspense } from "react";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";
import type { Certificacao } from "../types";

// Mesmo padrão de wall-of-love-section-lazy.tsx — adia o download+parse
// deste chunk até o usuário estar prestes a rolar até a seção, tirando-o do
// caminho crítico do LCP/TBT inicial da Home (única página que a usa).
const RealSegurancaSection = lazy(() =>
  import("./seguranca-section").then((m) => ({ default: m.SegurancaSection })),
);

interface SegurancaSectionProps {
  certificacoes: Certificacao[];
}

function SegurancaSectionPlaceholder() {
  return <div aria-hidden="true" className="relative py-24 overflow-hidden bg-[#f4f7fb]" />;
}

function SegurancaSection(props: SegurancaSectionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<SegurancaSectionPlaceholder />}>
          <RealSegurancaSection {...props} />
        </Suspense>
      ) : (
        <SegurancaSectionPlaceholder />
      )}
    </div>
  );
}

export { SegurancaSection };
