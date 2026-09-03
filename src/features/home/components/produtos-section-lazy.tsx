"use client";

import { lazy, Suspense } from "react";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";

// Mesmo padrão de wall-of-love-section-lazy.tsx — adia o download+parse
// deste chunk até o usuário estar prestes a rolar até a seção, tirando-o do
// caminho crítico do LCP/TBT inicial da Home (única página que a usa).
const RealProdutosSection = lazy(() =>
  import("./produtos-section").then((m) => ({ default: m.ProdutosSection })),
);

function ProdutosSectionPlaceholder() {
  return <div aria-hidden="true" className="py-20 bg-[#f4f7fb]" />;
}

function ProdutosSection() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<ProdutosSectionPlaceholder />}>
          <RealProdutosSection />
        </Suspense>
      ) : (
        <ProdutosSectionPlaceholder />
      )}
    </div>
  );
}

export { ProdutosSection };
