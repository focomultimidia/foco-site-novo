"use client";

/**
 * useInternalHeroGsap — Animação em duas fases para todas as Hero Sections internas.
 *
 * FASE 1 · ENTRADA (on-load)
 *   badge → title → description → cta → trust (stagger 0.2 s, expo.out)
 *   image: entra lateralmente em paralelo (delay 0.2 s)
 *
 * FASE 2 · SAÍDA NO SCROLL (timeline scrubbed, bidirecional)
 *   Uma única gsap.timeline() conectada ao ScrollTrigger:
 *   · Movimento Y em cascata (stagger D=0.15 s entre os 5 elementos de texto).
 *   · Fade + blur lentos (duration 1.1): dissolução gradual sobre todo o range.
 *   · Imagem: animação paralela (y + scale + fade + blur, duration 1.0).
 *
 *   scrub: 1.5 → lag suave, ideal para fade/blur cinematográficos.
 *   start: "bottom 90%" / end: "bottom 35%" → ver nota abaixo sobre por que o
 *   start é relativo à BASE da seção, não ao topo.
 *
 * ── prefers-reduced-motion ──────────────────────────────────────────────────
 * Usuários que pedem movimento reduzido não recebem nem a entrada nem a saída
 * no scroll: os elementos já nascem no estado final visível. Isso também
 * blinda contra qualquer cenário em que a animação de entrada não rode (o
 * conteúdo nunca fica preso em opacity:0 esperando um rAF que não vem).
 *
 * Data attributes necessários no JSX:
 *   data-hero="section"      → <section> raiz (trigger)
 *   data-hero="badge"        → pill / categoria (opcional)
 *   data-hero="title"        → <h1>
 *   data-hero="description"  → <p> de apoio
 *   data-hero="cta"          → área dos botões
 *   data-hero="trust"        → trust items (opcional)
 *   data-hero="image"        → coluna do Device Showcase (z-10)
 */

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useInternalHeroGsap(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {

      // ── FASE 1: ENTRADA ────────────────────────────────────────────────────────

      const staggerEls = gsap.utils.toArray<Element>([
        "[data-hero='badge']",
        "[data-hero='title']",
        "[data-hero='description']",
        "[data-hero='cta']",
        "[data-hero='trust']",
      ]);
      const imageEl = "[data-hero='image']";

      if (prefersReduced) {
        // Nenhuma fase roda: garante o estado final visível de imediato, sem
        // depender de nenhuma animação (nem registra o ScrollTrigger de saída,
        // que também é movimento).
        gsap.set([...staggerEls, imageEl], {
          clearProps: "opacity,transform,filter,willChange",
        });
        return;
      }

      gsap.set([...staggerEls, imageEl], { opacity: 0, willChange: "transform, opacity, filter" });
      gsap.set(staggerEls, { y: 60,  filter: "blur(20px)" });
      gsap.set(imageEl,    { x: 50,  filter: "blur(20px)" });

      const entryTl = gsap.timeline({ defaults: { ease: "expo.out" } });
      entryTl
        .to(staggerEls, {
          opacity:    1,
          y:          0,
          filter:     "blur(0px)",
          duration:   1.5,
          stagger:    0.2,
          onComplete: () => gsap.set(staggerEls, { clearProps: "filter,willChange" }),
        })
        .to(imageEl, {
          opacity:    1,
          x:          0,
          filter:     "blur(0px)",
          duration:   1.2,
          onComplete: () => gsap.set(imageEl, { clearProps: "filter,willChange" }),
        }, 0.2);

      // ── FASE 2: SAÍDA NO SCROLL ────────────────────────────────────────────────
      //
      // fromTo() + immediateRender: false: evita o bug de captura prematura do
      // FROM (que leria opacity:0 do gsap.set() da entrada).
      //
      // Elementos opcionais (badge, trust) são simplesmente ignorados pelo GSAP
      // se não existirem no DOM — sem erros.

      const D = 0.15; // stagger delay entre os 5 elementos (unidades da timeline)

      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          // "top top" (posição anterior) marca o início da saída no instante em
          // que o TOPO da seção toca o topo do viewport — o que, para a home
          // page e as heros internas, coincide com o carregamento da página
          // (scroll=0), já que a seção começa no topo do documento. Isso só
          // funciona bem quando a seção inteira cabe em ~90vh: o usuário já viu
          // tudo antes de precisar rolar, então começar a esmaecer assim que ele
          // rola é o comportamento certo.
          //
          // Heros mais altas que um viewport (como a do Channel Manager, com um
          // diagrama largo) quebram essa suposição: o usuário ainda precisa
          // rolar só para revelar description/cta/trust, que ficam abaixo da
          // dobra — mas o MESMO gesto de scroll já estava progredindo a saída
          // desde o primeiro pixel, esmaecendo esse conteúdo antes de ele
          // sequer entrar em vista.
          //
          // "bottom 90%" corrige isso sem quebrar o caso antigo: para uma hero
          // de ~90vh (viewport ~100vh), a base da seção já está a ~90% do
          // viewport na carga — ou seja, o mesmo ponto de partida de antes,
          // scroll=0. Para heros mais altas, esse ponto só é atingido depois
          // que a base da seção (o último elemento, "trust") já foi vista.
          start: "bottom 90%",
          end:   "bottom 35%",
          scrub: 1.5,
        },
      });

      // ── Deslocamento Y em cascata (5 elementos) ──────────────────────────────
      exitTl
        .fromTo("[data-hero='badge']",
          { y: 0 },
          { y: -45, ease: "power2.in", duration: 0.4, immediateRender: false },
          0           // 0.00
        )
        .fromTo("[data-hero='title']",
          { y: 0 },
          { y: -65, ease: "power2.in", duration: 0.4, immediateRender: false },
          D           // 0.15
        )
        .fromTo("[data-hero='description']",
          { y: 0 },
          { y: -45, ease: "power2.in", duration: 0.4, immediateRender: false },
          D * 2       // 0.30
        )
        .fromTo("[data-hero='cta']",
          { y: 0 },
          { y: -45, ease: "power2.in", duration: 0.4, immediateRender: false },
          D * 3       // 0.45
        )
        .fromTo("[data-hero='trust']",
          { y: 0 },
          { y: -35, ease: "power2.in", duration: 0.4, immediateRender: false },
          D * 4       // 0.60
        )

        // ── Fade + blur — lentos, cobrem todo o range ────────────────────────
        // duration 1.1 > último movimento (D*4 + 0.4 = 1.0) para que a
        // dissolução seja suave e não "corte" quando o último elemento termina.
        .fromTo(
          [
            "[data-hero='badge']",
            "[data-hero='title']",
            "[data-hero='description']",
            "[data-hero='cta']",
            "[data-hero='trust']",
          ],
          { opacity: 1, filter: "blur(0px)" },
          { opacity: 0, filter: "blur(14px)", ease: "power1.out", duration: 1.1, immediateRender: false },
          0
        )

        // ── Imagem — animação paralela ───────────────────────────────────────
        .fromTo("[data-hero='image']",
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
          { opacity: 0, y: -24, scale: 1.03, filter: "blur(6px)", ease: "power2.out", duration: 1.0, immediateRender: false },
          0
        );

      // Não há mais parallax de background: as heros usam apenas a cor
      // da superfície (#f4f7fb), sem camadas atrás do conteúdo.

    }, sectionRef);

    return () => ctx.revert();
  }, []);
}
