"use client";

import { lazy, Suspense } from "react";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";
import type { ArtigoMidia } from "../types";

// Mesmo padrão de wall-of-love-section-lazy.tsx — implementação real em
// na-midia-section-impl.tsx. Nome público e caminho de import continuam os
// mesmos pra todo call site (home, gestão hoteleira, motor de reservas
// etc.), que importam por caminho direto, não pelo barrel.
const RealNaMidiaSection = lazy(() =>
  import("./na-midia-section-impl").then((m) => ({ default: m.NaMidiaSection })),
);

interface NaMidiaSectionProps {
  artigos: ArtigoMidia[];
}

function NaMidiaSectionPlaceholder() {
  return <div aria-hidden="true" className="py-20 bg-[#f4f7fb]" />;
}

function NaMidiaSection(props: NaMidiaSectionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<NaMidiaSectionPlaceholder />}>
          <RealNaMidiaSection {...props} />
        </Suspense>
      ) : (
        <NaMidiaSectionPlaceholder />
      )}
    </div>
  );
}

export { NaMidiaSection };
