"use client";

import { lazy, Suspense } from "react";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";

// Mesmo padrão de wall-of-love-section-lazy.tsx — usada em toda página de
// produto (via este barrel); adiar o mount tira seu chunk do caminho
// crítico do LCP/TBT inicial em TODAS elas de uma vez.
const RealSmartIntegrationsTabs = lazy(() =>
  import("./smart-integrations-tabs").then((m) => ({ default: m.SmartIntegrationsTabs })),
);

function SmartIntegrationsTabsPlaceholder() {
  return <div aria-hidden="true" className="py-20 bg-[#f4f7fb]" />;
}

function SmartIntegrationsTabs() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<SmartIntegrationsTabsPlaceholder />}>
          <RealSmartIntegrationsTabs />
        </Suspense>
      ) : (
        <SmartIntegrationsTabsPlaceholder />
      )}
    </div>
  );
}

export { SmartIntegrationsTabs };
