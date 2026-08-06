"use client";

/**
 * useFuncionalidadesScroll — mesmo mecanismo de pin + scroll horizontal da
 * EventosSection (ver use-eventos-scroll.ts): uma timeline scrubada com o
 * `x` do trilho mapeado 1:1 à distância de scroll (getDistance = largura do
 * trilho menos a largura da viewport) — rolar 500px move o trilho exatamente
 * 500px, sem sensação de mais rápido/devagar que o gesto do usuário.
 *
 * Sem bloco de texto pra desaparecer aqui: o título fica acima do trilho,
 * não sobreposto a ele, então não compete por espaço como o texto lateral
 * da EventosSection — só o trilho de cards precisa animar.
 */

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useFuncionalidadesScroll(
  enabled: boolean,
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
) {
  useLayoutEffect(() => {
    if (!enabled) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getDistance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [enabled]);
}
