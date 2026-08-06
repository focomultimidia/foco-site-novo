"use client";

/**
 * useEventosScroll — Pin + scroll horizontal (efeito "steno.ai") pra seção
 * de Eventos. Só roda quando `enabled` (decidido pelo componente: desktop
 * largo + sem prefers-reduced-motion — mesmo critério do `canScrollytell`
 * em use-hero-scrollytelling.ts).
 *
 * Por que o componente decide `enabled` em vez do hook checar matchMedia
 * sozinho: o componente já precisa desse mesmo booleano pra decidir SE
 * MONTA a seção pinada ou o fallback empilhado (ver eventos-section.tsx) —
 * uma seção com `display:none` não pode ser pinada corretamente (o GSAP
 * mede a largura real do track pra calcular a distância do pin; um
 * elemento oculto mede 0). Então aqui, diferente da hero, a alternativa
 * mobile/reduced-motion não fica escondida via CSS — ela nem monta.
 *
 * MECÂNICA
 *   Uma única timeline scrubada, com o `x` do trilho de cards mapeado 1:1
 *   à distância de scroll (`end` = largura do trilho menos a largura da
 *   viewport — o mesmo valor da distância percorrida por `x`). Rolar 500px
 *   move o trilho exatamente 500px: a sensação "gruda no dedo/mouse" sem
 *   parecer nem mais rápido nem mais devagar que o gesto do usuário.
 *
 *   O bloco de texto da esquerda desaparece (opacity+y) só nos primeiros
 *   20% da timeline (`duration: 0.2` contra os `duration: 1` do trilho,
 *   ambos começando em 0) — sai de cena cedo pra não competir com os
 *   cards que vêm depois, mas sem travar o resto do scroll esperando ele
 *   terminar.
 *
 *   `invalidateOnRefresh: true` + `end`/`x` como FUNÇÃO (não valor
 *   estático): recalcula a largura real do trilho a cada resize — sem
 *   isso, se o usuário redimensionar a janela com a página já rolada, a
 *   distância do pin ficaria presa na medida antiga.
 */

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useEventosScroll(
  enabled: boolean,
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
  textRef: RefObject<HTMLDivElement | null>,
) {
  useLayoutEffect(() => {
    if (!enabled) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const text = textRef.current;
    if (!section || !track || !text) return;

    const ctx = gsap.context(() => {
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tl = gsap.timeline({
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

      tl.to(text,  { opacity: 0, y: -32, duration: 0.2, ease: "power1.out" }, 0)
        .to(track, { x: () => -getDistance(), duration: 1, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, [enabled]);
}
