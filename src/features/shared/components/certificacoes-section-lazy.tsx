"use client";

import { lazy, Suspense } from "react";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";
import type { CertificacoesSectionProps } from "./certificacoes-section";

// Mesmo padrão de wall-of-love-section-lazy.tsx — usada em toda página de
// produto (via este barrel); adiar o mount tira seu chunk do caminho
// crítico do LCP/TBT inicial em TODAS elas de uma vez.
const RealCertificacoesSection = lazy(() =>
  import("./certificacoes-section").then((m) => ({ default: m.CertificacoesSection })),
);

function CertificacoesSectionPlaceholder() {
  return <div aria-hidden="true" className="relative py-24 bg-[#f4f7fb]" />;
}

function CertificacoesSection(props: CertificacoesSectionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<CertificacoesSectionPlaceholder />}>
          <RealCertificacoesSection {...props} />
        </Suspense>
      ) : (
        <CertificacoesSectionPlaceholder />
      )}
    </div>
  );
}

export { CertificacoesSection };
export type { CertificacoesSectionProps };
