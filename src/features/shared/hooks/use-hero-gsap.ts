"use client";

/**
 * useHeroGsap — Sistema de animação de Hero em duas fases via GSAP 3 + ScrollTrigger
 *
 * FASE 1 · ENTRADA (on-load)
 *   badge → title → cta → stats entram com blur(20px→0) + fade + slide-up staggerado.
 *   image entra lateralmente em paralelo (delay 0.2 s). Easing expo.out.
 *
 * FASE 2 · SAÍDA NO SCROLL (timeline scrubbed)
 *   Uma única gsap.timeline() conectada ao ScrollTrigger orquestra:
 *   · Movimento Y em cascata (stagger D=0.18 s entre elementos):
 *       badge → title → cta → stats sobem sequencialmente enquanto o user rola.
 *   · Fade + blur lentos: duration 1.1, cobre todo o range, começa junto com
 *     o badge — dá a sensação de dissolução gradual mais do que de "sumir".
 *   · Imagem: animação paralela (y + scale + fade + blur).
 *   · Background: parallax independente ao longo de toda a seção (sem fade).
 *
 *   scrub: 1.5 → animação "persegue" o scroll com lag suave; mesmo rolando
 *   rápido, o fade/blur completa com fluidez.
 *   end: "bottom 40%" → range amplo para a cascata ser perceptível.
 *
 * Data attributes necessários no JSX:
 *   data-hero="section"  → <section> raiz (trigger)
 *   data-hero="bg"       → camada de fundo (parallax)
 *   data-hero="badge"    → pill / tag de categoria
 *   data-hero="title"    → <h1>
 *   data-hero="cta"      → área do botão CTA
 *   data-hero="stats"    → linha de cards de estatísticas
 *   data-hero="image"    → coluna direita / imagem
 */

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHeroGsap(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ── FASE 1: ENTRADA ──────────────────────────────────────────────────────

      const leftEls    = ["[data-hero='badge']", "[data-hero='title']", "[data-hero='cta']", "[data-hero='stats']"];
      const imageEl    = "[data-hero='image']";
      const ENTRY_EASE = "expo.out";

      gsap.set([...leftEls, imageEl], { opacity: 0, willChange: "transform, opacity, filter" });
      gsap.set(leftEls,  { y: 44, filter: "blur(20px)" });
      gsap.set(imageEl,  { x: 52, filter: "blur(20px)" });

      const entryTl = gsap.timeline({ defaults: { ease: ENTRY_EASE } });
      entryTl
        .to(leftEls, {
          opacity:    1,
          y:          0,
          filter:     "blur(0px)",
          duration:   0.9,
          stagger:    0.18,
          onComplete: () => gsap.set(leftEls, { clearProps: "filter,willChange" }),
        })
        .to(imageEl, {
          opacity:    1,
          x:          0,
          filter:     "blur(0px)",
          duration:   1.1,
          onComplete: () => gsap.set(imageEl, { clearProps: "filter,willChange" }),
        }, 0.2);

      // ── FASE 2: SAÍDA NO SCROLL ──────────────────────────────────────────────
      //
      // fromTo() com immediateRender: false em cada tween evita o bug clássico
      // onde o GSAP capturaria opacity:0 do estado de entrada como FROM.
      //
      // A timeline não recebe defaults de duration — cada tween define o seu
      // próprio para criar a diferença intencional de ritmo entre movimento e fade.

      const D = 0.18; // stagger delay entre elementos (unidades da timeline)

      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   "top top",
          end:     "bottom 40%",  // range amplo para a cascata ser visível
          scrub:   1.5,           // lag suave: fade/blur acompanha scroll com fluidez
        },
      });

      // ── Deslocamento Y em cascata ─────────────────────────────────────────
      // Cada elemento começa a subir D unidades de timeline depois do anterior.
      // ease power2.in: acelera no final do movimento (sensação de atração para cima).
      exitTl
        .fromTo("[data-hero='badge']",
          { y: 0 },
          { y: -50, ease: "power2.in", duration: 0.5, immediateRender: false },
          0           // badge é o primeiro
        )
        .fromTo("[data-hero='title']",
          { y: 0 },
          { y: -70, ease: "power2.in", duration: 0.5, immediateRender: false },
          D           // 0.18
        )
        .fromTo("[data-hero='cta']",
          { y: 0 },
          { y: -50, ease: "power2.in", duration: 0.5, immediateRender: false },
          D * 2       // 0.36
        )
        .fromTo("[data-hero='stats']",
          { y: 0 },
          { y: -50, ease: "power2.in", duration: 0.5, immediateRender: false },
          D * 3       // 0.54
        )

        // ── Fade + blur — lentos, cobrem todo o range da timeline ───────────
        // duration 1.1 > duração do último movimento (0.54 + 0.5 = 1.04).
        // Começa junto com o badge (position 0) para que a dissolução seja gradual
        // e não "estoure" de uma vez quando os elementos chegam à posição final.
        .fromTo(
          ["[data-hero='badge']", "[data-hero='title']", "[data-hero='cta']", "[data-hero='stats']"],
          { opacity: 1, filter: "blur(0px)" },
          { opacity: 0, filter: "blur(14px)", ease: "power1.out", duration: 1.1, immediateRender: false },
          0
        )

        // ── Imagem — animação completa em paralelo ───────────────────────────
        // Começa junto com o badge; duration 1.0 (ligeiramente menor que o fade
        // do texto para dar a sensação de que ela desaparece um pouco antes).
        .fromTo("[data-hero='image']",
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
          { opacity: 0, y: -28, scale: 1.04, filter: "blur(8px)", ease: "power2.out", duration: 1.0, immediateRender: false },
          0
        );

      // ── Background — parallax independente ──────────────────────────────────
      // Range não comprimido: deve continuar movendo enquanto a seção está visível.
      // Sem fade: preserva o fundo (InternalHeroBackground/dot-grid) intacto.
      gsap.fromTo(
        "[data-hero='bg']",
        { yPercent: 0 },
        {
          yPercent:        28,
          ease:            "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start:   "top top",
            end:     "bottom top",
            scrub:   true,
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);
}
