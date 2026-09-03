"use client";

import { lazy, Suspense } from "react";
import { useInViewOnce } from "@/features/shared/hooks/use-in-view-once";
import type { Evento } from "../types";

// Mesmo padrão de wall-of-love-section-lazy.tsx — implementação real em
// eventos-section-impl.tsx (GSAP + pin de scroll horizontal, um dos chunks
// mais pesados do site). Nome público e caminho de import continuam os
// mesmos pra todo call site (home, site-hoteleiro), que importam por
// caminho direto, não pelo barrel.
const RealEventosSection = lazy(() =>
  import("./eventos-section-impl").then((m) => ({ default: m.EventosSection })),
);

interface EventosSectionProps {
  eventos: Evento[];
}

function EventosSectionPlaceholder() {
  return <div aria-hidden="true" className="py-20 bg-[#f4f7fb]" />;
}

function EventosSection(props: EventosSectionProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<EventosSectionPlaceholder />}>
          <RealEventosSection {...props} />
        </Suspense>
      ) : (
        <EventosSectionPlaceholder />
      )}
    </div>
  );
}

export { EventosSection };
