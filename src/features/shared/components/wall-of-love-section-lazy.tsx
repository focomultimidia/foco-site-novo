"use client";

import { lazy, Suspense } from "react";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";
import type { WallOfLoveSectionProps } from "./wall-of-love-section";

// ── WallOfLoveSection (lazy) ─────────────────────────────────────────────────
// wall-of-love-section.tsx sozinho é o maior chunk de feature do site
// (~160KB / 58KB gzip — medido via `npm run build`): carrossel físico
// (spring por card) + galeria em tela cheia com shared-element transition +
// modal de vídeo, tudo código genuíno, sem dependência pesada supérflua (só
// framer-motion/lucide-react, já compartilhados com o resto do app). Como a
// seção fica sempre abaixo da dobra em toda página que a usa, mas era
// importada de forma estática (mesmo já sendo seu próprio chunk via Vite, o
// import estático ainda baixa e faz parse dele junto com a página, competindo
// pela thread principal bem na janela crítica do LCP/TBT inicial).
//
// Mesma técnica já estabelecida em `useInViewOnce` pra mídia pesada (ver
// autoplay de vídeo) — aqui aplicada ao componente inteiro via `lazy()`, não
// só a uma imagem: o download+parse do chunk só começa quando o usuário está
// prestes a rolar até a seção (`rootMargin` padrão de 300px), não na carga
// inicial da página.
//
// Reexporta com o MESMO nome público (`WallOfLoveSection`) pelo barrel
// (index.ts) — todo call site (home, crm-hoteleiro, marketing-para-hoteis
// etc.) continua igual, sem precisar saber que virou lazy.
const RealWallOfLoveSection = lazy(() =>
  import("./wall-of-love-section").then((m) => ({ default: m.WallOfLoveSection })),
);

// Placeholder sem conteúdo, mesmo respiro vertical (`py-24`) da section real
// — evita CLS enquanto o usuário ainda não chegou perto (antes do
// IntersectionObserver disparar) ou enquanto o chunk ainda está baixando.
function WallOfLoveSectionPlaceholder() {
  return <div aria-hidden="true" className="py-24" />;
}

function WallOfLoveSection(props: WallOfLoveSectionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<WallOfLoveSectionPlaceholder />}>
          <RealWallOfLoveSection {...props} />
        </Suspense>
      ) : (
        <WallOfLoveSectionPlaceholder />
      )}
    </div>
  );
}

export { WallOfLoveSection };
export type { WallOfLoveSectionProps };
