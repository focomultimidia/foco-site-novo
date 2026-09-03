"use client";

import { lazy, Suspense } from "react";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";
import type { DorSolucao } from "../types";

// Mesmo padrão de wall-of-love-section-lazy.tsx — adia o download+parse
// deste chunk até o usuário estar prestes a rolar até a seção, tirando-o do
// caminho crítico do LCP/TBT inicial da Home (única página que a usa).
// Placeholder no mesmo fundo escuro da seção real (`#0b1a2e`) pra não haver
// flash branco→escuro quando o chunk troca de lugar com o placeholder.
const RealDoresDiagnosticoSection = lazy(() =>
  import("./dores-diagnostico-section").then((m) => ({ default: m.DoresDiagnosticoSection })),
);

interface DoresDiagnosticoSectionProps {
  dores: DorSolucao[];
}

function DoresDiagnosticoSectionPlaceholder() {
  return <div aria-hidden="true" className="py-24 md:py-32 bg-[#0b1a2e]" />;
}

function DoresDiagnosticoSection(props: DoresDiagnosticoSectionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<DoresDiagnosticoSectionPlaceholder />}>
          <RealDoresDiagnosticoSection {...props} />
        </Suspense>
      ) : (
        <DoresDiagnosticoSectionPlaceholder />
      )}
    </div>
  );
}

export { DoresDiagnosticoSection };
