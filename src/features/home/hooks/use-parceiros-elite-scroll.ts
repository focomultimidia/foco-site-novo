"use client";

/**
 * useParceirosEliteScroll — efeito "steno.ai" de duas fases pro
 * ParceirosEliteSection: o card principal (selo "Foco Elite Partner") entra
 * em cena ainda durante o final da seção anterior (CertificacoesSection),
 * sai do CANTO DIREITO do palco e desliza até encaixar na borda esquerda
 * conforme a seção atravessa a viewport. A esteira de logos parceiras fica
 * atrás de uma MÁSCARA (`clip-path`) que só abre conforme o card vai
 * "trilhando o caminho" pra esquerda — nunca opacidade, é revelação por
 * corte mesmo. Por baixo dessa máscara, a esteira flui continuamente — a
 * direção e a velocidade desse fluxo dependem do que o card principal está
 * fazendo AGORA (ver "VELOCIDADE E DIREÇÃO" abaixo). Depois de aberta
 * 100%, a esteira continua fluindo sozinha em loop infinito (sem depender
 * mais do scroll).
 *
 * SEM PIN — decisão deliberada. A versão anterior PINAVA a seção
 * (`h-screen` + `pin: true` + `end: "+=170%"`): a página congelava por
 * ~1,7 viewport de scroll (uns 1300px numa tela de 768px) enquanto o card
 * encaixava. Isso trouxe uma família inteira de defeitos difíceis de
 * reproduzir — o GSAP precisa criar um `pin-spacer`, alternar a seção
 * entre `position: fixed` e `relative` em tempo real, e recalcular tudo
 * isso a cada refresh; qualquer dessincronia entre a thread do compositor
 * (onde o scroll acontece) e a principal (onde o ScrollTrigger roda)
 * aparece como a seção "pulando", "repetindo" ou saindo do lugar. Relatado
 * pelo usuário de forma consistente e reproduzível na máquina dele.
 * Sem pin nada disso existe: a seção é um bloco de fluxo normal como
 * qualquer outra, e o efeito é só uma timeline scrubada pelo progresso
 * natural dela atravessando a viewport. O resultado visual é praticamente
 * o mesmo (o card encaixa e a esteira se revela conforme você rola), com a
 * diferença de que a página nunca trava.
 *
 * FASE A — pré-revelação (`start: "top bottom"` → `"top 82%"` na seção).
 * O card materializa (fade + scale + sobe) enquanto o topo desta seção
 * ainda está atravessando a metade de baixo da viewport — os últimos
 * instantes de scroll dentro da CertificacoesSection já mostram o selo
 * aparecendo. A esteira NÃO participa desta fase — a máscara começa 100%
 * fechada, nada dela é visível ainda.
 *
 * FASE B — encaixe + revelação, scrubada no PALCO (`trigger: stage`,
 * `start: "top 85%"` → `end: "top 35%"`): o efeito acontece ao longo de
 * meia viewport de scroll, exatamente enquanto o palco sobe pela tela.
 * Duas coisas partem da MESMA curva de progresso (mesma duração/easing
 * dentro da timeline), garantindo que fiquem sincronizadas o tempo todo:
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
 * VELOCIDADE E DIREÇÃO da esteira — amostragem em relógio fixo, não reação
 * por evento. A primeira versão deste hook decidia a velocidade da esteira
 * DENTRO do `onUpdate` do ScrollTrigger, usando a flag `self.direction` do
 * GSAP (1 = rolando pra baixo, -1 = pra cima) mais dois timers (`setTimeout`)
 * pra filtrar ruído. Esse desenho tinha um problema estrutural: `onUpdate`
 * dispara a uma frequência IRREGULAR (várias vezes por frame durante o
 * "alcançar" do `scrub`, às vezes só uma vez), e `self.direction` é
 * calculado a partir de leituras cruas e consecutivas de posição — com um
 * `scrub:0.9` (bastante inércia, de propósito, ver mais abaixo) e scroll
 * real (notch de mouse wheel, momentum de trackpad — nenhum dos dois é
 * perfeitamente monotônico pixel a pixel), bastava UM único frame reportar
 * `direction:-1` no meio de um gesto que no geral era pra baixo pra esse
 * desenho antigo confirmar "reverse" e a esteira visivelmente voltar e
 * repetir um trecho antes de corrigir — exatamente o sintoma relatado.
 *
 * A versão atual não olha `self.direction` nem reage a cada `onUpdate`.
 * Em vez disso, guarda só o progresso mais recente (`latestProgress`,
 * atualizado no `onUpdate`) e um `setInterval` PRÓPRIO, em relógio fixo
 * (`SAMPLE_MS`), compara esse progresso contra o da última amostra. Como a
 * amostragem é desacoplada da frequência do `onUpdate`, ruído de um único
 * frame nunca chega a virar uma amostra por si só — ele se dilui dentro da
 * janela de `SAMPLE_MS`. Um estado só muda quando a variação de progresso
 * na janela ultrapassa um threshold com sinal claro (`FORWARD_THRESHOLD`/
 * `REVERSE_THRESHOLD`); variação pequena/ambígua simplesmente mantém o
 * estado atual (sem "flicker" por não ter pra onde decidir). Só existe um
 * timer agora (parado por `STOP_MS` sem variação mensurável → ritmo
 * ambiente), não dois.
 *
 * Os quatro estados possíveis (`MarqueeState`):
 *   · progresso < `DOCKED_AT` e progresso avançando de verdade na
 *     janela → "fast": esteira flui pra DIREITA, rápida.
 *   · progresso < `DOCKED_AT` e progresso RECUANDO de verdade na
 *     janela (usuário rolou pra cima, card devolvendo) → "reverse": esteira
 *     flui pra ESQUERDA (contrário ao padrão), mesma velocidade — só
 *     inverte o sinal do `timeScale`, GSAP toca o tween de trás pra frente.
 *   · progresso ≥ `DOCKED_AT` (card encaixado) → "slow": ritmo lento de
 *     sempre, pra DIREITA — dali em diante o loop segue sozinho, por tempo.
 *   · `onLeaveBack` (usuário voltou pra cima do início do efeito) →
 *     "stopped": esteira parada, máscara fechada de novo.
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
 * vida deles. Esta página ainda tem outras seções pinadas (Otheo teaser,
 * Eventos) — sem isso, um refresh automático disparado por QUALQUER uma
 * delas pode pintar este card já no estado final antes do primeiro frame.
 */

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Progresso a partir do qual o card já está praticamente encaixado e a
// esteira passa a fluir sozinha no ritmo ambiente. Sem pin, o encaixe ocupa
// a timeline INTEIRA (não sobra "tempo morto" no fim como na versão pinada,
// que tinha 1,7 viewport de scroll pra preencher), então o limiar fica perto
// de 1 — não em 0,65.
const DOCKED_AT = 0.98;
// Ritmo "atual" (card parado) vs. muito mais rápido (card em trânsito) —
// multiplicadores do `timeScale` do tween de 32s da esteira. "reverse" usa
// o mesmo módulo de FAST_TIME_SCALE, só com o sinal invertido.
const SLOW_TIME_SCALE = 1;
const FAST_TIME_SCALE = 6;
// Relógio fixo de amostragem do progresso — desacoplado da frequência
// (irregular) do `onUpdate` do ScrollTrigger. Ver comentário no topo do
// arquivo sobre por que reagir direto a cada `onUpdate`/`self.direction`
// causava o bug de "repetir".
const SAMPLE_MS = 90;
// Sem variação mensurável de progresso por esse tempo → considera que o
// scroll parou de verdade (não só entre duas amostras).
const STOP_MS = 200;
// Variação de progresso por JANELA de amostragem (não por frame) acima
// desse módulo já conta como movimento real e com sinal claro. Abaixo
// disso, ambíguo — mantém o estado atual em vez de decidir por ruído.
const FORWARD_THRESHOLD = 0.0025;
const REVERSE_THRESHOLD = -0.0025;

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

    let sampleTimer: ReturnType<typeof setInterval> | undefined;
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

      // ── Fase B — encaixe + revelação, SEM pin. Card e máscara avançam
      // juntos na mesma timeline — reverter o scroll reverte os dois em
      // uníssono. A velocidade/direção da esteira é decidida à parte, pelo
      // relógio de amostragem abaixo (ver explicação no comentário do
      // topo), nunca dentro do próprio `onUpdate`.
      //
      // O trigger é o PALCO (`stage`), não a section: é ele que precisa
      // estar visível pro efeito fazer sentido. `top 85%` → `top 35%` faz o
      // encaixe acontecer ao longo de meia viewport de scroll, exatamente
      // enquanto o palco sobe pela tela — sem congelar a página em momento
      // nenhum. ────────────────────────────────────────────────────────
      let latestProgress = 0;
      // Guarda de atividade — sem ela, o relógio de amostragem (que segue
      // rodando o tempo todo, ver `setInterval` mais abaixo) reagiria ao
      // progresso "parado em 0" depois que o usuário volta pra cima do
      // início do efeito (`onLeaveBack`) como se fosse um scroll
      // genuinamente parado, e reescreveria `marqueeState` de volta pra
      // "slow" — brigando com o "stopped" que o `onLeaveBack` acabou de
      // forçar.
      let revealActive = false;

      const dockTl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top 85%",
          end: "top 35%",
          scrub: 0.9,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            latestProgress = self.progress;
          },
          onEnter: () => {
            revealActive = true;
          },
          onEnterBack: () => {
            revealActive = true;
          },
          onLeaveBack: () => {
            revealActive = false;
            marqueeState = "stopped";
            gsap.set(marqueeTl, { timeScale: 0 });
          },
        },
      });

      dockTl
        .to(mainCard,  { x: 0, ease: "power3.out", duration: 1 }, 0)
        .to(logosWrap, { clipPath: "inset(0px 0px 0px 0px)", ease: "power3.out", duration: 1 }, 0);

      let lastSampledProgress = 0;
      let lastChangeAt = performance.now();

      function sample() {
        if (!revealActive) return;

        const delta = latestProgress - lastSampledProgress;
        lastSampledProgress = latestProgress;

        const now = performance.now();
        if (Math.abs(delta) > FORWARD_THRESHOLD / 2) lastChangeAt = now;
        const stalled = now - lastChangeAt > STOP_MS;

        let next: MarqueeState;
        if (latestProgress >= DOCKED_AT) {
          next = "slow";
        } else if (stalled) {
          next = "slow";
        } else if (delta > FORWARD_THRESHOLD) {
          next = "fast";
        } else if (delta < REVERSE_THRESHOLD) {
          next = "reverse";
        } else {
          // Variação ambígua dentro da janela — não decide nada, mantém o
          // estado atual (é isso que impede o "flicker" por ruído).
          next = marqueeState;
        }

        if (next !== marqueeState) {
          marqueeState = next;
          render(next === "slow" ? 0.5 : 0.3);
        }
      }

      // Começa a amostrar assim que a Fase B existe — o pin pode não ter
      // engatado ainda (`onEnter` cobre isso), mas ter o relógio rodando
      // de saída é inofensivo: progresso fica em 0 até o pin engatar.
      sampleTimer = setInterval(sample, SAMPLE_MS);
    }, sectionRef);

    return () => {
      clearInterval(sampleTimer);
      if (handleMouseEnter) logosWrap.removeEventListener("mouseenter", handleMouseEnter);
      if (handleMouseLeave) logosWrap.removeEventListener("mouseleave", handleMouseLeave);
      ctx.revert();
    };
  }, [enabled]);
}
