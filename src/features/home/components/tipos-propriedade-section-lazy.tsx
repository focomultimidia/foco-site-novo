"use client";

import { lazy, Suspense } from "react";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";
import type { TipoPropriedade } from "../types";

// Mesmo padrão de wall-of-love-section-lazy.tsx — adia o download+parse
// deste chunk até o usuário estar prestes a rolar até a seção, tirando-o do
// caminho crítico do LCP/TBT inicial da Home (única página que a usa).
const RealTiposPropriedadeSection = lazy(() =>
  import("./tipos-propriedade-section").then((m) => ({ default: m.TiposPropriedadeSection })),
);

interface TiposPropriedadeSectionProps {
  tipos: TipoPropriedade[];
}

function TiposPropriedadeSectionPlaceholder() {
  return <div aria-hidden="true" className="py-20 bg-[#f4f7fb]" />;
}

function TiposPropriedadeSection(props: TiposPropriedadeSectionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<TiposPropriedadeSectionPlaceholder />}>
          <RealTiposPropriedadeSection {...props} />
        </Suspense>
      ) : (
        <TiposPropriedadeSectionPlaceholder />
      )}
    </div>
  );
}

export { TiposPropriedadeSection };
