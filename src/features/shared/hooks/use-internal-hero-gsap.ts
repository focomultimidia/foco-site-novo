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
 *   · Background: parallax independente ao longo de toda a seção (sem fade).
 *
 *   scrub: 1.5 → lag suave, ideal para fade/blur cinematográficos.
 *   end: "bottom 35%" → range proporcional para a hero de 90vh.
 *
 * Data attributes necessários no JSX:
 *   data-hero="section"      → <section> raiz (trigger)
 *   data-hero="bg"           → container do InternalHeroBackground (z-0)
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
          start:   "top top",
          end:     "bottom 35%",  // proporcional à hero de 90vh
          scrub:   1.5,
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

      // ── Background — parallax independente ────────────────────────────────────
      gsap.fromTo(
        "[data-hero='bg']",
        { yPercent: 0 },
        {
          yPercent:        20,
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
