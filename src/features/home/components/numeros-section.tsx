"use client";

import { lazy, Suspense } from "react";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";
import type { Numero } from "../types";

// Mesmo padrão de wall-of-love-section-lazy.tsx: adia o download+parse deste
// chunk (que ainda carrega o script externo do VanillaTilt via CDN) até o
// usuário estar prestes a rolar até a seção, tirando-o do caminho crítico do
// LCP/TBT inicial — a implementação real vive em numeros-section-impl.tsx,
// sem nenhuma outra mudança. Nome público (`NumerosSection`) e caminho de
// import (`.../numeros-section`) continuam os mesmos pra todo call site
// (home, gestão hoteleira, motor de reservas etc.), que importam por
// caminho direto, não pelo barrel.
const RealNumerosSection = lazy(() =>
  import("./numeros-section-impl").then((m) => ({ default: m.NumerosSection })),
);

interface NumerosSectionProps {
  numeros: Numero[];
}

function NumerosSectionPlaceholder() {
  return <div aria-hidden="true" className="py-20 bg-[#f4f7fb]" />;
}

function NumerosSection(props: NumerosSectionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<NumerosSectionPlaceholder />}>
          <RealNumerosSection {...props} />
        </Suspense>
      ) : (
        <NumerosSectionPlaceholder />
      )}
    </div>
  );
}

export { NumerosSection };
