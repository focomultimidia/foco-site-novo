"use client";

/**
 * useReservaScroll — mesmo mecanismo de pin + scroll horizontal da
 * EventosSection/FuncionalidadesSection (ver use-eventos-scroll.ts e
 * use-funcionalidades-scroll.ts): uma timeline scrubada com o `x` do
 * trilho mapeado 1:1 à distância de scroll (getDistance = largura do
 * trilho menos a largura da viewport) — rolar 500px move o trilho
 * exatamente 500px.
 *
 * Acrescenta o rastreamento de `activeIndex` da EventosSection (progresso
 * 0→1 dividido em `total` fatias iguais) — usado pela régua de progresso
 * no rodapé da seção pinada, pra dar uma referência de "passo atual"
 * enquanto o trilho desliza, no espírito do rodapé de data/régua do site
 * de referência (echofi-bp.webflow.io/#how-it-works).
 *
 * `scrub: 0.6` (não 1, como Funcionalidades/Eventos) — mais inércia entre
 * o gesto do usuário e o trilho, mesmo valor "sensação premium" usado em
 * useScrollPinScale. Com só 4 cards (trilho bem mais curto que o de
 * Funcionalidades/Eventos), scrub 1 fazia o movimento parecer abrupto
 * demais pro tamanho da seção.
 */

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useReservaScroll(
  enabled: boolean,
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
  total: number,
  onActiveChange: (index: number) => void,
) {
  useLayoutEffect(() => {
    if (!enabled || total <= 0) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let lastActive = -1;

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
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(total - 1, Math.floor(self.progress * total));
            if (idx !== lastActive) {
              lastActive = idx;
              onActiveChange(idx);
            }
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [enabled, total]);
}
