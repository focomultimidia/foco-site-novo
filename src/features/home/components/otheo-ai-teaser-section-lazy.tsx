"use client";

import { lazy, Suspense } from "react";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";

// Mesmo padrão de wall-of-love-section-lazy.tsx — adia o download+parse
// deste chunk até o usuário estar prestes a rolar até a seção, tirando-o do
// caminho crítico do LCP/TBT inicial da Home (única página que a usa).
const RealOtheoAiTeaserSection = lazy(() =>
  import("./otheo-ai-teaser-section").then((m) => ({ default: m.OtheoAiTeaserSection })),
);

function OtheoAiTeaserSectionPlaceholder() {
  return <div aria-hidden="true" className="py-24 md:py-32 bg-[#f4f7fb]" />;
}

function OtheoAiTeaserSection() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<OtheoAiTeaserSectionPlaceholder />}>
          <RealOtheoAiTeaserSection />
        </Suspense>
      ) : (
        <OtheoAiTeaserSectionPlaceholder />
      )}
    </div>
  );
}

export { OtheoAiTeaserSection };
