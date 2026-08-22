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
 *
 * TRILHA-RÉGUA
 *   Cada estação da régua (TimelineRail em eventos-section.tsx) precisa
 *   ficar na posição — e acender no momento — em que o respectivo card
 *   está de fato em foco na tela, não numa fatia igual arbitrária do
 *   scroll. Uma 1ª versão dividia o progresso (0→1) em `total` fatias
 *   IGUAIS (`Math.floor(progress * total)`): simples, mas os cards têm
 *   larguras diferentes (420/460/520px conforme breakpoint), então um
 *   card mais largo consumia a mesma fração de scroll que um mais
 *   estreito — a estação "acendia" fora de sincronia com o card
 *   correspondente cruzando o centro da tela.
 *
 *   2ª versão: calculava, pra cada card, EM QUE PROGRESSO (0→1) seu
 *   centro cruza o centro da viewport (`p = (centerLocal - viewport/2) /
 *   distance`) e usava esse valor tanto pra posicionar quanto pra achar
 *   o card ativo. Quebrado: o trilho tem um `pr-[10vw]` de respiro DEPOIS
 *   do último card, então a distância de scroll disponível (`distance`)
 *   é maior do que o necessário pra centralizar o card final — o `p`
 *   calculado pra ele passava de 1 (nunca alcançável dentro do scroll
 *   real) e ficava colado ao penúltimo após o clamp, apertando as duas
 *   últimas estações uma em cima da outra.
 *
 *   3ª versão: trocou o `p` pré-calculado por uma busca em tempo real, a
 *   cada `onUpdate`, pelo card cujo centro de TELA (`centerLocal +
 *   trackX atual`) está mais próximo do centro da viewport NAQUELE
 *   frame. Também quebrado, de um jeito mais sutil: o mesmo respiro
 *   `pr-[10vw]` faz o card final nunca chegar tão perto do centro quanto
 *   o penúltimo — em NENHUM momento do scroll ele "vence" a comparação
 *   de distância, então o índice ativo travava no penúltimo card até o
 *   fim, mesmo com o último 100% visível e a seção já despinando.
 *
 *   Versão atual: dois cálculos independentes a partir do mesmo
 *   `computeCardCenters` (só mede `offsetLeft + width/2` de cada card,
 *   posição local no trilho, sem viewport):
 *   - `normalizedDotPositions` converte os centros pra 0→1 NORMALIZANDO
 *     pelo alcance real (`p_i` bruto reescalado por `(bruto - min) /
 *     (max - min)`) — garante que o primeiro card caia em 0, o último em
 *     1, e os do meio se espalhem proporcionalmente ao espaço real entre
 *     eles. Só afeta a posição VISUAL das estações na régua.
 *   - `activationThresholds` calcula o mesmo `p_i` de antes, mas
 *     CLAMPADO em [0,1] por card (não normalizado entre si) — o
 *     progresso em que o card i tentaria centralizar, capado em 1 se for
 *     inalcançável. O índice ativo é o maior `i` cujo threshold já foi
 *     ultrapassado pelo progresso atual (`self.progress >= p_i`), não
 *     mais "quem está mais perto agora". Isso é estritamente monótono e
 *     crescente com o progresso — cada card ativa exatamente uma vez, em
 *     ordem, e o ÚLTIMO card sempre tem threshold ≤ 1, garantindo que
 *     ele ative no mais tardar quando o scroll pinado termina (mesmo
 *     nunca chegando fisicamente perto do centro da viewport).
 *
 *   Ambos recalculados em todo `onRefresh` do ScrollTrigger (resize,
 *   fonte carregando, etc. — `invalidateOnRefresh: true`).
 *
 *   `onActiveChange` só dispara quando o índice realmente muda (dedupe
 *   via closure), pra não gerar um re-render do React a cada frame do
 *   scrub.
 */

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function computeCardCenters(track: HTMLDivElement): number[] {
  return (Array.from(track.children) as HTMLElement[]).map(
    (card) => card.offsetLeft + card.offsetWidth / 2,
  );
}

function normalizedDotPositions(centers: number[], viewportCenter: number, distance: number): number[] {
  const total = centers.length;
  if (total === 0) return [];
  if (distance <= 0) return centers.map((_, i) => (i + 0.5) / total);

  const raw = centers.map((c) => (c - viewportCenter) / distance);
  const lo = Math.min(...raw);
  const hi = Math.max(...raw);
  const span = hi - lo;
  if (span <= 0) return centers.map((_, i) => (i + 0.5) / total);
  return raw.map((p) => (p - lo) / span);
}

function activationThresholds(centers: number[], viewportCenter: number, distance: number): number[] {
  if (distance <= 0) return centers.map(() => 0);
  return centers.map((c) => Math.min(1, Math.max(0, (c - viewportCenter) / distance)));
}

function indexForProgress(progress: number, thresholds: number[]): number {
  let idx = 0;
  thresholds.forEach((p, i) => {
    if (progress >= p) idx = i;
  });
  return idx;
}

export function useEventosScroll(
  enabled: boolean,
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
  textRef: RefObject<HTMLDivElement | null>,
  total: number,
  onActiveChange: (index: number) => void,
  onPositionsChange?: (positions: number[]) => void,
) {
  useLayoutEffect(() => {
    if (!enabled || total <= 0) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const text = textRef.current;
    if (!section || !track || !text) return;

    let lastActive = -1;
    let thresholds: number[] = [];

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
          onRefresh: () => {
            const centers = computeCardCenters(track);
            const distance = getDistance();
            const viewportCenter = window.innerWidth / 2;
            thresholds = activationThresholds(centers, viewportCenter, distance);
            onPositionsChange?.(normalizedDotPositions(centers, viewportCenter, distance));
          },
          onUpdate: (self) => {
            if (thresholds.length === 0) return;
            const idx = indexForProgress(self.progress, thresholds);
            if (idx !== lastActive) {
              lastActive = idx;
              onActiveChange(idx);
            }
          },
        },
      });

      tl.to(text,  { opacity: 0, y: -32, duration: 0.2, ease: "power1.out" }, 0)
        .to(track, { x: () => -getDistance(), duration: 1, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, [enabled, total]);
}
