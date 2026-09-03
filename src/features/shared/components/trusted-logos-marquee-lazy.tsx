"use client";

import { lazy, Suspense } from "react";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";

// Mesmo padrão de wall-of-love-section-lazy.tsx — usada em toda página de
// produto (via este barrel), então adiar o mount até o usuário estar
// prestes a rolar até a seção tira seu chunk (e o custo de montar a esteira
// de 50 elementos, ver comentário de reflow em trusted-logos-marquee.tsx)
// do caminho crítico do LCP/TBT inicial em TODAS elas de uma vez.
const RealTrustedLogosMarquee = lazy(() =>
  import("./trusted-logos-marquee").then((m) => ({ default: m.TrustedLogosMarquee })),
);

function TrustedLogosMarqueePlaceholder() {
  return <div aria-hidden="true" className="py-20 bg-[#f4f7fb]" />;
}

function TrustedLogosMarquee() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<TrustedLogosMarqueePlaceholder />}>
          <RealTrustedLogosMarquee />
        </Suspense>
      ) : (
        <TrustedLogosMarqueePlaceholder />
      )}
    </div>
  );
}

export { TrustedLogosMarquee };
