"use client";

/**
 * useScrollPinScale — Pin + scrub (GSAP ScrollTrigger) que trava a seção no
 * topo da viewport e usa essa janela de scroll pra fazer um card
 * materializar: cresce (scale), aparece (opacity), desce ao lugar (y) e
 * ganha nitidez (blur), com um respiro "parado" no final antes de
 * destravar. Nasceu no OtheoAiTeaserSection (home) e foi generalizado pra
 * `shared` porque o mesmo efeito passou a ser usado em mais de uma
 * página — qualquer ajuste na mecânica do efeito deve ser feito aqui, uma
 * vez só, pros três consumidores herdarem.
 *
 * MECÂNICA
 *   `end: "+=140%"` — a janela de scroll dedicada ao efeito é 1.4x a
 *   altura da viewport; os primeiros 70% dessa janela tocam o `fromTo`
 *   (materialização), os últimos 30% são um tween vazio (só "segura a
 *   tela parada" no resultado final antes de destravar).
 *
 *   `scrub: 0.6` — pequeno atraso entre o scroll do usuário e o valor
 *   animado, pra não ficar mecanicamente 1:1 (sensação mais premium, com
 *   leve inércia "puxando atrás").
 *
 * Só deve rodar em desktop largo + sem `prefers-reduced-motion` — pin em
 * touch tende a brigar com barra de endereço retrátil/teclado virtual, e
 * quem pediu menos movimento não deveria ganhar mais. O chamador decide
 * isso via `enabled` (mesmo padrão do `canScrollytell`/`canPinScroll` já
 * usado em use-eventos-scroll.ts e nas seções que consomem este hook) e é
 * responsável por dar um fallback sem pin (ex.: `whileInView` simples do
 * Framer Motion) quando `enabled` for `false`.
 */

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollPinScale(
  enabled: boolean,
  sectionRef: RefObject<HTMLElement | null>,
  cardRef: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    if (!enabled) return;

    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      // `gsap.set` explícito, ANTES do timeline/ScrollTrigger — em páginas
      // com mais de um trigger pinado (ex.: /site-hoteleiro, que também
      // pina uma seção h-screen mais abaixo), o primeiro `refresh()`
      // automático do ScrollTrigger — disparado pelo OUTRO trigger se
      // registrando, ou por imagens carregando e mudando a altura da
      // página — podia recalcular o progresso antes do "from" do
      // `fromTo` ter sido de fato pintado, fazendo o card nascer já no
      // estado final (sem o efeito). Fixar o estado inicial aqui, fora do
      // ciclo de vida do ScrollTrigger, garante a primeira pintura certa
      // não importa quantos outros pins existam na mesma página.
      gsap.set(card, { scale: 0.5, opacity: 0, y: 60, filter: "blur(10px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(card, { scale: 1, opacity: 1, y: 0, filter: "blur(0px)", ease: "none", duration: 0.7 })
        .to({}, { duration: 0.3 });
    }, sectionRef);

    return () => ctx.revert();
  }, [enabled]);
}
