"use client";

/**
 * useParceirosEliteScroll — efeito "steno.ai" de duas fases pro
 * ParceirosEliteSection: o card principal (selo "Foco Elite Partner") entra
 * em cena ainda durante o final da seção anterior (CertificacoesSection),
 * sai do CANTO DIREITO do palco e desliza até encaixar na borda esquerda
 * enquanto a seção pina. A esteira de logos parceiras fica atrás de uma
 * MÁSCARA (`clip-path`) que só abre conforme o card vai "trilhando o
 * caminho" pra esquerda — nunca opacidade, é revelação por corte mesmo.
 * Por baixo dessa máscara, a esteira flui continuamente — a direção e a
 * velocidade desse fluxo dependem do que o card principal está fazendo
 * AGORA (ver "VELOCIDADE E DIREÇÃO" abaixo). Depois de aberta 100%, a
 * esteira continua fluindo sozinha em loop infinito (sem depender mais do
 * scroll).
 *
 * FASE A — pré-revelação, SEM pin (`start: "top bottom"` → `"top 82%"`).
 * O card materializa (fade + scale + sobe) enquanto o topo desta seção
 * ainda está atravessando a metade de baixo da viewport — os últimos
 * instantes de scroll dentro da CertificacoesSection já mostram o selo
 * aparecendo. Termina bem antes do pin engatar. A esteira NÃO participa
 * desta fase — a máscara começa 100% fechada, nada dela é visível ainda.
 *
 * FASE B — pin + scrub (`start: "top top"`, `end: "+=170%"`). Duas coisas
 * partem da MESMA curva de progresso (mesma duração/easing dentro da
 * timeline), garantindo que fiquem sincronizadas o tempo todo:
 *   1. O card desliza de `x: stageWidth-cardWidth` (canto direito medido,
 *      não chutado) até `x:0` (encaixado à esquerda).
 *   2. A máscara da esteira (`clip-path: inset(0 0 0 X)`) fecha a partir
 *      de `X: stageWidth-wrapLeft` (tudo escondido) até `X:0` (tudo
 *      revelado). Como as DUAS magnitudes de partida vêm da MESMA medida
 *      real do palco, a borda revelada nunca ultrapassa a borda direita
 *      atual do card em nenhum instante intermediário — prova: com `f(p)`
 *      a mesma curva 1→0 nos dois, `revelado(p) - card.right(p) =
 *      (wrapLeft - cardWidth)·(1-f(p))`, sempre ≤ 0 porque `wrapLeft <
 *      cardWidth`. As logos literalmente NÃO PODEM aparecer antes do card
 *      abrir caminho — nunca "nascem" soltas no meio do container.
 *
 * VELOCIDADE E DIREÇÃO da esteira — quatro estados possíveis
 * (`MarqueeState`), decididos no `onUpdate` do próprio ScrollTrigger (que
 * expõe `self.direction`: 1 = rolando pra baixo/card indo pra ESQUERDA,
 * -1 = rolando pra cima/card indo pra DIREITA):
 *   · progresso < `DOCK_DURATION` E `direction === 1` (card em trânsito
 *     rumo ao encaixe) → "fast": esteira flui pra DIREITA, rápida
 *     (`FAST_TIME_SCALE`). Com um timer curto: se nenhum novo `onUpdate`
 *     chegar dentro desse prazo (usuário parou de rolar NO MEIO do
 *     trajeto, card também parou), cai pro ritmo lento ("slow").
 *   · progresso < `DOCK_DURATION` E `direction === -1` (card voltando pra
 *     direita, desencaixando) → "reverse": esteira flui pra ESQUERDA
 *     (CONTRÁRIO ao fluxo padrão), na MESMA velocidade rápida — pedido
 *     explícito, é só inverter o sinal do `timeScale` (GSAP toca o tween
 *     de trás pra frente com `timeScale` negativo, então a esteira
 *     "desenrola" pro lado oposto sem precisar de um segundo tween).
 *   · progresso ≥ `DOCK_DURATION` (card encaixado, sem mais tween tocando
 *     sua posição) → "slow": ritmo lento de sempre, pra DIREITA — dali em
 *     diante o loop segue sozinho, por tempo (não depende mais de
 *     scroll).
 *   · `onLeaveBack` (usuário saiu do pin por cima) → "stopped": esteira
 *     parada — nada está visível ali mesmo (máscara fechada de novo).
 * PAUSA NO HOVER — sobrepõe TODOS os estados acima: enquanto o mouse está
 * sobre a esteira (`mouseenter`/`mouseleave` em `logosWrapRef`),
 * `isHovered` força `timeScale:0` incondicionalmente; ao sair do hover,
 * volta a refletir o estado lógico atual (`marqueeState`) — por isso a
 * velocidade/direção "de verdade" e o hover são dois eixos independentes,
 * combinados só na hora de renderizar (`render()`), nunca competindo por
 * quem escreve no `timeScale` por último.
 *
 * Ease `power3.out` + scrub alto (0.9) no card/máscara — mais inércia,
 * sensação de desaceleração real em vez de mapeamento mecânico 1:1 com o
 * scroll.
 *
 * Igual ao useScrollPinScale/useEventosScroll: `gsap.set()` do estado
 * inicial roda ANTES de qualquer timeline/ScrollTrigger, fora do ciclo de
 * vida deles. Nesta página convivem 3 seções pinadas (Otheo teaser,
 * Eventos e esta) — sem isso, um refresh automático disparado por
 * QUALQUER uma delas pode pintar este card já no estado final antes do
 * primeiro frame.
 */

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DOCK_DURATION = 0.65;
// Ritmo "atual" (card parado) vs. muito mais rápido (card em trânsito) —
// multiplicadores do `timeScale` do tween de 32s da esteira. "reverse" usa
// o mesmo módulo de FAST_TIME_SCALE, só com o sinal invertido.
const SLOW_TIME_SCALE = 1;
const FAST_TIME_SCALE = 6;
// Quanto tempo sem um novo `onUpdate` até considerar que o scroll parou de
// verdade (card parou no meio do trajeto, não só entre dois frames).
const SCROLL_STOP_MS = 150;

type MarqueeState = "fast" | "slow" | "reverse" | "stopped";

const TIME_SCALE_BY_STATE: Record<MarqueeState, number> = {
  fast: FAST_TIME_SCALE,
  slow: SLOW_TIME_SCALE,
  reverse: -FAST_TIME_SCALE,
  stopped: 0,
};

export function useParceirosEliteScroll(
  enabled: boolean,
  sectionRef: RefObject<HTMLElement | null>,
  mainCardRef: RefObject<HTMLDivElement | null>,
  logosWrapRef: RefObject<HTMLDivElement | null>,
  logosTrackRef: RefObject<HTMLDivElement | null>,
) {
  useLayoutEffect(() => {
    if (!enabled) return;

    const section = sectionRef.current;
    const mainCard = mainCardRef.current;
    const logosWrap = logosWrapRef.current;
    const logosTrack = logosTrackRef.current;
    if (!section || !mainCard || !logosWrap || !logosTrack) return;

    let stopTimer: ReturnType<typeof setTimeout> | undefined;
    // Declarados fora do `gsap.context` de propósito — o `context.revert()`
    // só desfaz animações/ScrollTriggers criados durante o callback, não
    // trata o retorno do callback como cleanup (diferente do `useEffect`).
    // Guardando as referências aqui, o cleanup de baixo consegue remover os
    // listeners de verdade, em vez de vazá-los a cada toggle de `enabled`.
    let handleMouseEnter: (() => void) | undefined;
    let handleMouseLeave: (() => void) | undefined;

    const ctx = gsap.context(() => {
      // Canto direito real do palco (pai direto do card) — medido, não
      // estimado, pra "sai do canto direito" ficar exato em qualquer
      // largura de tela.
      const stage = mainCard.parentElement as HTMLElement;
      const stageWidth = stage.getBoundingClientRect().width;
      const cardWidth = mainCard.getBoundingClientRect().width;
      const startX = Math.max(0, stageWidth - cardWidth);

      // `logosWrap` fica parado (posição CSS estática, `left` perto da
      // borda direita do card já encaixado) — quem se move é só a MÁSCARA
      // (clip-path), nunca o elemento em si. Isso evita o elemento
      // "arrastar" as logos junto com ele: a única coisa que desloca as
      // logos na tela é o próprio fluxo da esteira, a máscara só decide
      // quanto dele já pode ser visto.
      const wrapNaturalLeft = logosWrap.offsetLeft;
      const clipStartPx = Math.max(0, stageWidth - wrapNaturalLeft);

      gsap.set(mainCard, { opacity: 0, scale: 0.86, y: 32, x: startX });
      gsap.set(logosWrap, { clipPath: `inset(0px 0px 0px ${clipStartPx}px)` });
      gsap.set(logosTrack, { xPercent: -50 });

      // ── Fase A — pré-revelação sem pin ──────────────────────────────
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 82%",
          scrub: 0.5,
        },
      }).to(mainCard, { opacity: 1, scale: 1, y: 0, ease: "power2.out" });

      // Loop infinito da esteira — sempre "tocando" (repeat:-1), mas
      // `timeScale` começa em 0 (parado sem estar pausado, pra poder
      // rampar suavemente depois em vez de ligar/desligar seco). Quem
      // decide o `timeScale` real a cada momento são os dois eixos
      // independentes abaixo (`marqueeState` + `isHovered`), combinados
      // em `render()`.
      const marqueeTl = gsap.to(logosTrack, { xPercent: 0, ease: "none", duration: 32, repeat: -1 });
      marqueeTl.timeScale(0);

      let marqueeState: MarqueeState = "stopped";
      let isHovered = false;

      function render(duration: number) {
        const target = isHovered ? 0 : TIME_SCALE_BY_STATE[marqueeState];
        gsap.to(marqueeTl, { timeScale: target, duration, ease: "power2.out", overwrite: true });
      }

      handleMouseEnter = () => {
        isHovered = true;
        render(0.2);
      };
      handleMouseLeave = () => {
        isHovered = false;
        render(0.4);
      };
      logosWrap.addEventListener("mouseenter", handleMouseEnter);
      logosWrap.addEventListener("mouseleave", handleMouseLeave);

      // ── Fase B — pin + scrub. Card e máscara avançam juntos na mesma
      // timeline — reverter o scroll reverte os dois em uníssono. A
      // velocidade/direção da esteira é controlada à parte, no
      // `onUpdate` abaixo (ver explicação no comentário do topo). ──────
      const dockTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=170%",
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress < DOCK_DURATION) {
              if (self.direction === 1) {
                clearTimeout(stopTimer);
                if (marqueeState !== "fast") {
                  marqueeState = "fast";
                  render(0.25);
                }
                stopTimer = setTimeout(() => {
                  marqueeState = "slow";
                  render(0.6);
                }, SCROLL_STOP_MS);
              } else {
                clearTimeout(stopTimer);
                if (marqueeState !== "reverse") {
                  marqueeState = "reverse";
                  render(0.25);
                }
              }
            } else {
              clearTimeout(stopTimer);
              if (marqueeState !== "slow") {
                marqueeState = "slow";
                render(0.4);
              }
            }
          },
          onLeaveBack: () => {
            clearTimeout(stopTimer);
            marqueeState = "stopped";
            gsap.set(marqueeTl, { timeScale: 0 });
          },
        },
      });

      dockTl
        .to(mainCard,  { x: 0, ease: "power3.out", duration: DOCK_DURATION }, 0)
        .to(logosWrap, { clipPath: "inset(0px 0px 0px 0px)", ease: "power3.out", duration: DOCK_DURATION }, 0)
        .to({}, { duration: 1 - DOCK_DURATION });
    }, sectionRef);

    return () => {
      clearTimeout(stopTimer);
      if (handleMouseEnter) logosWrap.removeEventListener("mouseenter", handleMouseEnter);
      if (handleMouseLeave) logosWrap.removeEventListener("mouseleave", handleMouseLeave);
      ctx.revert();
    };
  }, [enabled]);
}
