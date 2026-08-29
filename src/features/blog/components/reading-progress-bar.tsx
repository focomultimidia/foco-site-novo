"use client";

import { useEffect, useState } from "react";

// Barra fina fixa no topo, preenchendo conforme o artigo é lido — mede o
// scroll relativo ao ELEMENTO do artigo (`targetRef`), não a página
// inteira, senão o header/hero antes do texto e os posts relacionados
// depois distorceriam o progresso.
function ReadingProgressBar({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
      setProgress(pct);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetRef]);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-40 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#285992] to-[#fccc30] transition-[width] duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export { ReadingProgressBar };
