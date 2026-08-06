"use client";

/**
 * useHeroScrollytelling — Pin + troca de 3 telas ("Iris Reveal") para a
 * Hero da Home, só em desktop (>=1024px) e com movimento permitido.
 *
 * Por que só desktop: pin de scroll em touch tende a "brigar" com o gesto
 * de rolagem do usuário (sem o mesmo feedback do mouse-wheel). Abaixo de
 * 1024px ou com prefers-reduced-motion, o hook não faz nada — o componente
 * usa o carrossel simples (crossfade + auto-troca) que já existia antes
 * desta feature, sem pin nem scroll sequestrado.
 *
 * MECÂNICA "IRIS REVEAL"
 *   Para cada troca de etapa (0→1, 1→2), dois elementos empilhados na mesma
 *   moldura (a tela do mockup, com overflow:hidden):
 *   · inEl  (a próxima tela) → entra por CIMA (z-index maior), recortada por
 *     `clip-path: circle(0% at 50% 50%)` (invisível, um ponto no centro) e
 *     o raio do círculo cresce até cobrir o frame inteiro
 *     (`circle(150% at 50% 50%)` — 150%, não 100%, porque a % do círculo
 *     resolve contra a diagonal da caixa, não a largura/altura; 150% garante
 *     cobertura total mesmo em cantos). Lê como uma íris abrindo, revelando
 *     a tela nova por dentro da atual — não como duas imagens se revezando.
 *   · outEl (a tela atual) → recebe um `scale(1.045)` + blur leve enquanto é
 *     coberta, reforçando profundidade (ela "recua" um pouco conforme some).
 *   Mobile (o mockup de celular) roda a mesma troca com 0.12s de atraso em
 *   relação ao desktop — reforça a hierarquia (desktop lidera, celular
 *   segue), evita que as duas trocas leiam como eventos desconectados.
 *
 *   Trocado a partir do conceito anterior ("Data Elevator", y%+scanline) —
 *   ver histórico do arquivo se precisar recuperar aquela mecânica.
 *
 * BADGES
 *   Só flutuação idle contínua (tempo real, não depende do scroll/etapa) —
 *   sem associação com as imagens do mockup (removida a pedido; badges são
 *   prova social genérica, não devem parecer "pertencer" a uma tela específica).
 *
 * TIMELINE — construída com posições absolutas (t em segundos-de-timeline,
 * não tempo real: o scrub é quem converte isso em distância de scroll), pra
 * cada label ("hold0", "hold1"...) ter um tempo conhecido de antemão, usado
 * tanto pelo snap (só assenta nos "holds", nunca no meio de uma troca)
 * quanto pelo report de etapa ativa pro React (indicador de pontinhos).
 *
 * Data attributes necessários no JSX (todos dentro de `sectionRef`):
 *   data-mockup="desktop-step"   → as 3 telas do mockup desktop, em ordem
 *   data-mockup="mobile-step"    → as 3 telas do mockup celular, em ordem
 *   data-badge="clientes" | "transacoes" | "anos" → wrapper interno do
 *     badge (separado do wrapper externo que o Framer Motion já anima na
 *     entrada — GSAP e Framer não podem disputar a mesma propriedade no
 *     mesmo nó, então cada um tem o seu).
 */

import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HOLD_DURATION = 0.7;    // "tempo de leitura" entre trocas, em unidades de timeline
const SWAP_DURATION = 0.85;   // duração de cada braço da troca (outEl / inEl)
const MOBILE_LAG    = 0.12;   // atraso do celular em relação ao desktop
const IRIS_OPEN     = "circle(150% at 50% 50%)"; // 150%, não 100% — cobre os cantos
const IRIS_CLOSED   = "circle(0% at 50% 50%)";

interface Options {
  steps: number;
  onStepChange?: (index: number) => void;
  /**
   * Mesma curva de `--hero-scale` (lib/hero-scale.ts), como número — escala a
   * AMPLITUDE de movimentos que o GSAP anima aqui dentro (hoje só a
   * flutuação idle dos badges) pra respirar na mesma proporção do resto do
   * hero fluido. Lida uma vez no mount (não entra na dependência do efeito
   * de propósito — não precisa recriar o pin/timeline inteiro a cada pixel
   * de resize por causa disso). Default 1 = sem escala.
   */
  heroScale?: number;
}

export function useHeroScrollytelling(
  sectionRef: RefObject<HTMLElement | null>,
  { steps, onStepChange, heroScale = 1 }: Options,
) {
  // Ref pro callback: evita que uma função nova a cada render do componente-pai
  // force o efeito a recriar (e reverter) todo o contexto GSAP/ScrollTrigger.
  const onStepChangeRef = useRef(onStepChange);
  onStepChangeRef.current = onStepChange;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const canRun =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canRun) return;

    const ctx = gsap.context(() => {
      const desktopSteps = gsap.utils.toArray<HTMLElement>("[data-mockup='desktop-step']");
      const mobileSteps  = gsap.utils.toArray<HTMLElement>("[data-mockup='mobile-step']");

      if (desktopSteps.length < steps || mobileSteps.length < steps) return;

      // ── Estado inicial: step 0 com a íris totalmente aberta (visível), os
      //    demais fechados (invisíveis) por baixo ──────────────────────────
      gsap.set(desktopSteps, { clipPath: IRIS_CLOSED, zIndex: 1, opacity: 1, scale: 1, filter: "blur(0px)" });
      gsap.set(mobileSteps,  { clipPath: IRIS_CLOSED, zIndex: 1, opacity: 1, scale: 1, filter: "blur(0px)" });
      gsap.set([desktopSteps[0], mobileSteps[0]], { clipPath: IRIS_OPEN, zIndex: 2 });

      // ── "Iris Reveal": inEl entra por cima, um círculo cresce revelando-a;
      //    outEl recua com leve scale+blur enquanto é coberta ───────────────
      function irisSwap(outEl: HTMLElement, inEl: HTMLElement) {
        const tl = gsap.timeline();
        tl.set(inEl,  { clipPath: IRIS_CLOSED, zIndex: 3 })
          .set(outEl, { zIndex: 2 })
          .to(inEl,  { clipPath: IRIS_OPEN, duration: SWAP_DURATION, ease: "power2.inOut" }, 0)
          .to(outEl, { scale: 1.045, filter: "blur(3px)", duration: SWAP_DURATION, ease: "power2.out" }, 0)
          .set(outEl, { zIndex: 0, scale: 1, filter: "blur(0px)" })
          .set(inEl,  { zIndex: 2 });
        return tl;
      }

      // ── Timeline mestre com o ScrollTrigger já embutido na criação (padrão
      //    canônico do GSAP) — criar a timeline separada e só depois conectar
      //    via `ScrollTrigger.create({ animation: master })` NÃO sincronizava
      //    corretamente aqui: o pin funcionava, mas o progresso do scroll
      //    nunca chegava a mexer a timeline (`master.time()` ficava travado
      //    em ~0 mesmo rolando a seção inteira). Com `scrollTrigger` embutido
      //    desde a criação, o GSAP cuida de pausar/dirigir a timeline certo.
      //
      //    `end` em px explícito (2x a altura da viewport), não "+=200%" —
      //    sem eixo/elemento de referência anexado, "%" não resolve como "%
      //    da viewport" e o pin acabava nunca soltando (testado: mesmo no
      //    fim absoluto da página a seção continuava pinada). Função (não
      //    valor estático) pra recalcular certo num resize.
      //
      //    `snap: "labels"` (atalho nativo do GSAP) em vez de uma função
      //    customizada — como só criamos labels "hold0/1/2", ele já assenta
      //    exatamente nos pontos certos sem precisar pré-calcular posições.
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + window.innerHeight * 2,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: { snapTo: "labels", duration: { min: 0.2, max: 0.5 }, ease: "power1.inOut" },
          onUpdate: (self) => {
            // `self.animation.labels` (não uma variável fechada por closure)
            // pra nunca correr risco de ler algo ainda não inicializado caso
            // o GSAP dispare essa callback durante a própria montagem.
            const labels = (self.animation as gsap.core.Timeline | undefined)?.labels ?? {};
            const times = Object.keys(labels)
              .filter((k) => k.startsWith("hold"))
              .map((k) => labels[k])
              .sort((a, b) => a - b);
            const currentTime = self.animation?.time() ?? 0;
            let idx = 0;
            for (let i = times.length - 1; i >= 0; i--) {
              if (currentTime >= times[i] - 0.001) { idx = i; break; }
            }
            if (idx !== lastReportedIndex) {
              lastReportedIndex = idx;
              onStepChangeRef.current?.(idx);
            }
          },
        },
      });
      let lastReportedIndex = -1;

      // ── Monta a timeline com posições absolutas (t) ──────────────────────────
      let t = 0;
      master.addLabel("hold0", t);
      t += HOLD_DURATION;

      for (let i = 0; i < steps - 1; i++) {
        const swapStart = t;
        master.add(irisSwap(desktopSteps[i], desktopSteps[i + 1]), swapStart);
        master.add(irisSwap(mobileSteps[i],  mobileSteps[i + 1]),  swapStart + MOBILE_LAG);

        t = swapStart + MOBILE_LAG + SWAP_DURATION;
        master.addLabel(`hold${i + 1}`, t);
        t += HOLD_DURATION;
      }

      // ── Flutuação idle dos badges — tempo real, independente do scroll.
      //    Amplitude (8px de referência em 1920px) escalada por `heroScale`
      //    pra respirar na mesma proporção do resto do hero fluido — um
      //    badge ~19% menor (0.81 no piso da escala) com o mesmo deslocamento
      //    de 8px pareceria proporcionalmente mais agitado que em 1920px. ───
      gsap.to("[data-badge]", {
        y: `+=${8 * heroScale}`,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.6, from: "random" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [steps]);
}
