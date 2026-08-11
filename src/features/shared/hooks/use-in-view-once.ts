"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Dispara `true` uma única vez quando o elemento observado entra na
 * viewport (ou chega perto — `rootMargin`) e nunca mais volta a `false`.
 * Usado pra adiar o MOUNT de mídia pesada (vídeo autoplay) até o usuário
 * estar prestes a rolar até ela, em vez de baixar tudo já na carga inicial
 * da página — sem mudar o efeito final (autoplay/loop) uma vez montado.
 *
 * Aceita um `externalRef` opcional pra observar um nó que já existe por
 * outro motivo (ex.: o mesmo ref que o GSAP já usa pra pin/scroll) — sem
 * isso, precisaria de um segundo ref só pra esse hook, forçando a mesclar
 * dois refs no mesmo elemento.
 */
function useInViewOnce<T extends HTMLElement>(externalRef?: RefObject<T | null>, rootMargin = "300px") {
  const ownRef = useRef<T>(null);
  const ref = externalRef ?? ownRef;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}

export { useInViewOnce };
