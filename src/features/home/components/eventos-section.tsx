"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import type { Evento } from "../types";
import { useEventosScroll } from "../hooks/use-eventos-scroll";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Asset maps — um por evento real (ids "4"/"5"/"6" eram só as duplicatas
//    removidas de social-proof-data.ts, não existem mais). ─────────────────
const EVENTO_IMAGES: Record<string, string> = {
  "1": "/assets/imgs/feiras-eventos/equipotel-2025.webp",
  "2": "/assets/imgs/feiras-eventos/expohotel-2025.webp",
  "3": "/assets/imgs/feiras-eventos/expohotel-2024.webp",
  "4": "/assets/imgs/feiras-eventos/encatho2026.jpg",
};

// Logo do evento/feira — antes vivia no EventoInfoCard (card separado com
// logo/data/local). Esse card foi eliminado a pedido: logo + data agora só
// existem na linha do tempo (TimelineRail no desktop, trilho vertical no
// mobile) — nunca mais duplicados dentro do card de conteúdo.
const EVENTO_LOGOS: Record<string, string> = {
  "1": "/assets/imgs/feiras-eventos/equipotel.png",
  "2": "/assets/imgs/feiras-eventos/encatho-exprotel.webp",
  "3": "/assets/imgs/feiras-eventos/expotel.webp",
  "4": "/assets/imgs/feiras-eventos/encatho-exprotel.webp",
};

const MOBILE_MAX = 4;

// ── Ordenação cronológica — sempre do mais atual pro mais antigo,
//    independente da ordem em que os eventos chegam de social-proof-data.ts
//    (assim uma nova entrada nunca precisa ser reordenada manualmente no
//    array de dados; basta ter o campo `data` no formato "Mês Ano"). ─────
const MESES: Record<string, number> = {
  janeiro: 0, fevereiro: 1, março: 2, abril: 3, maio: 4, junho: 5,
  julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11,
};

function parseEventoData(data: string): number {
  const [mes, ano] = data.trim().toLowerCase().split(/\s+/);
  return new Date(parseInt(ano, 10) || 0, MESES[mes] ?? 0, 1).getTime();
}

function sortEventosDesc(eventos: Evento[]): Evento[] {
  return [...eventos].sort((a, b) => parseEventoData(b.data) - parseEventoData(a.data));
}

// ── EventStatusDot — pulsa só nos eventos marcados como "Destaque". ───────
function EventStatusDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
  );
}

// ── EventoCard — reformulado na HORIZONTAL: imagem como uma faixa lateral
//    (não mais topo/rodapé), conteúdo ao lado. Logo/data saíram daqui de
//    vez — só resta `local`, como uma linha de contexto discreta acima do
//    título (informação do próprio card, não pertence à timeline). ───────
function EventoCard({ evento, compact = false }: { evento: Evento; compact?: boolean }) {
  const featured = evento.tag === "Destaque";
  return (
    <div
      className={[
        "group relative flex overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-lg transition-shadow duration-300 hover:shadow-2xl",
        // `min-h` (não `h` fixo) — o resumo agora é exibido por completo, sem
        // `line-clamp`, então a altura precisa poder crescer conforme o
        // tamanho real de cada descrição (ver <p> mais abaixo).
        compact
          ? "w-full h-full min-h-[168px] sm:min-h-[184px]"
          : "h-full flex-shrink-0 w-[420px] sm:w-[460px] xl:w-[520px] min-h-[196px] xl:min-h-[212px]",
      ].join(" ")}
    >
      {/*
        SEM `h-full` aqui de propósito — desde que o card virou `min-h`
        (pro resumo caber por completo, ver comentário acima), `height:100%`
        deixou de ter uma altura definida no pai pra resolver contra:
        `min-height` não conta como altura "definida" pra fins de
        porcentagem em CSS, então `h-full` colapsava pra 0 em algumas
        larguras (confirmado em 1920px — a imagem carregava, mas o
        contêiner ficava com height:0, logo invisível). O `flex` do card
        (align-items:stretch, padrão) já estica esta coluna pra bater com a
        altura da coluna de texto ao lado, sem precisar de nenhuma altura
        explícita — por isso ela some daqui e nunca mais volta.
      */}
      <div className="relative w-[38%] sm:w-[36%] flex-shrink-0 overflow-hidden">
        {/*
          `loading="lazy"` nunca disparava aqui: no desktop este card vive
          dentro do trilho movido por `transform: translateX()` (GSAP, ver
          use-eventos-scroll.ts) — mesmo bug já corrigido no TriplePhoneStage
          de product-showcase.tsx. O heurístico de lazy-load do browser calcula
          visibilidade pela caixa de layout ANTES da transform, então a
          imagem nunca era considerada "visível" e ficava em branco pra
          sempre (confirmado forçando `eager` no DOM). São só 3 eventos, cada
          imagem pequena — `eager` é o fix seguro.
        */}
        <img
          src={EVENTO_IMAGES[evento.id] ?? EVENTO_IMAGES["1"]}
          alt={evento.titulo}
          width={280}
          height={280}
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10" />

        {featured && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full pl-2 pr-2.5 py-1">
            <EventStatusDot />
            <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-wide text-[#0f172a]">Destaque</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center p-4 sm:p-5 xl:p-6">
        {/* Logo do evento/feira — movida da timeline pra dentro do próprio
            card (pedido explícito), acima da linha da cidade. */}
        {EVENTO_LOGOS[evento.id] && (
          <img
            src={EVENTO_LOGOS[evento.id]}
            alt={`Logo do evento: ${evento.titulo}`}
            width={130}
            height={44}
            loading="lazy"
            decoding="async"
            // `self-start` — sem isso o `w-auto` não bloqueia o
            // `align-items:stretch` herdado do pai (flex-col): a caixa da
            // imagem esticava pra largura cheia da coluna e o
            // `object-contain` centralizava a logo dentro dela, parecendo
            // "centralizada" apesar do container começar na esquerda.
            className="self-start h-7 sm:h-9 w-auto max-w-[130px] object-contain object-left mb-2"
          />
        )}
        <span className="flex items-center gap-1 text-[11px] font-medium text-slate-600 mb-1.5">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          {evento.local}
        </span>
        <h3 className="font-display font-semibold text-[#0f172a] text-sm sm:text-base leading-snug tracking-tight mb-1.5 line-clamp-2">
          {evento.titulo}
        </h3>
        {/* Resumo completo — sem `line-clamp`, pedido explícito. O card
            cresce (`min-h`, ver acima) pra caber o texto inteiro. */}
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
          {evento.descricao}
        </p>
      </div>
    </div>
  );
}

// ── TimelineRail — régua fixa na parte inferior da seção pinada (não se
//    move com o trilho de cards), com uma estação por evento. `activeIndex`
//    vem de useEventosScroll, que divide o scrub em `total` fatias IGUAIS —
//    cada evento recebe exatamente 1/(N) do scroll pinado, garantindo que
//    todos sejam sempre alcançados (não depende de medir a posição exata
//    dos cards, ver comentário no hook).
//
//    A DATA de cada evento fica sempre visível, presa sob o próprio
//    marcador — nenhuma informação depende só da animação. A logo saiu
//    daqui (antes vivia numa cápsula flutuante sobre a estação ativa) e
//    foi pro card correspondente, acima da cidade — pedido explícito.
//    Transições em tween curto (0.3–0.35s) em vez de spring solto — o
//    spring anterior (stiffness 120–140) não tinha tempo de assentar num
//    scroll rápido. ──
function TimelineRail({
  eventos,
  activeIndex,
  positions,
}: {
  eventos: Evento[];
  activeIndex: number;
  /** Posição (0–1) de cada estação, medida a partir do centro real do
      respectivo card — ver computeCardPositions em use-eventos-scroll.ts.
      Cai para fatias iguais só antes da 1ª medição (fallback inicial). */
  positions: number[];
}) {
  const total = eventos.length;
  const fallback = (i: number) => (total > 0 ? (i + 0.5) / total : 0);
  const posFor = (i: number) => (positions[i] ?? fallback(i)) * 100;
  const activePct = posFor(activeIndex);

  return (
    // `top: calc(<centro do trilho de cards> + <metade da altura do card> + <espaço fixo>)`
    // em vez de `bottom-X%`: com duas âncoras percentuais independentes (cards em
    // `top-%`, régua em `bottom-%`), a distância entre elas cresce junto com a altura
    // da viewport (a altura do card é fixa em px, mas o `bottom-%` não sabe disso) —
    // em telas mais altas a régua ficava bem longe dos cards. Ancorando a régua a uma
    // distância FIXA (em px) do centro do trilho de cards, o espaço entre o card e a
    // cápsula fica constante em qualquer altura de tela.
    <div className="absolute inset-x-0 top-[calc(38%+214px)] xl:top-[calc(40%+228px)] z-20 px-[10vw] xl:px-[12vw] pointer-events-none">
      <div className="relative h-px w-full bg-[#285992]/15">
        {/* Trecho já "percorrido" da linha — cresce até a estação ativa */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "linear-gradient(90deg,#285992,#427ab9)" }}
          animate={{ width: `${activePct}%` }}
          transition={{ duration: 0.35, ease: EASE }}
        />

        {/* Estações — dot + data SEMPRE visível abaixo, número acima pra
            contagem clara ("01", "02", "03") independente do idioma. */}
        {eventos.map((evento, i) => {
          const isActive = i === activeIndex;
          const leftPct = posFor(i);
          return (
            <div
              key={evento.id}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${leftPct}%` }}
            >
              <span
                className="font-mono text-[10px] mb-2 transition-colors duration-300"
                style={{ color: isActive ? "#1e3a5f" : "#285992" }}
              >
                0{i + 1}
              </span>

              <span className="relative flex items-center justify-center">
                {isActive && (
                  <span className="absolute inset-0 -m-2 rounded-full bg-[#fccc30]/40 motion-safe:animate-ping" />
                )}
                <motion.span
                  animate={{
                    scale: isActive ? 1.7 : 1,
                    backgroundColor: isActive ? "#fccc30" : "#285992",
                  }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="relative block w-2.5 h-2.5 rounded-full ring-4 ring-[#f4f7fb]"
                />
              </span>

              <span
                className="mt-2.5 font-mono text-[10px] uppercase tracking-wide whitespace-nowrap transition-colors duration-300"
                style={{ color: isActive ? "#1e3a5f" : "#285992" }}
              >
                {evento.data}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Marcador vertical (mobile) — data + conector estático, empilhado ao
//    lado de cada card na lista. A logo saiu daqui (foi pro card, ver
//    EventoCard) pra não duplicar a mesma informação duas vezes lado a
//    lado. ──────────────────────────────────────────────────────────────
function EventoMarcador({ evento, isLast }: { evento: Evento; isLast: boolean }) {
  return (
    <div className="relative z-10 flex-shrink-0 w-[64px] sm:w-[72px] flex flex-col items-center pt-1">
      <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wide text-[#285992] text-center leading-tight mb-2">
        {evento.data}
      </span>
      <span className="w-2.5 h-2.5 rounded-full bg-[#285992] ring-4 ring-[#f4f7fb] flex-shrink-0" />
      {!isLast && <span className="w-px flex-1 min-h-[24px] bg-gradient-to-b from-[#285992]/25 to-transparent mt-1" />}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
interface EventosSectionProps {
  eventos: Evento[];
}

function EventosSection({ eventos }: EventosSectionProps) {
  // ── Pin + scroll horizontal só em desktop largo + sem reduced-motion —
  //    mesmo critério de `canScrollytell` na hero. Aqui a seção pinada nem
  //    monta fora dessa condição (ver comentário em use-eventos-scroll.ts
  //    sobre por que não dá pra só escondê-la via CSS). ────────────────────
  const [useHorizontalScroll, setUseHorizontalScroll] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const widthMq = window.matchMedia("(min-width: 1024px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setUseHorizontalScroll(widthMq.matches && !motionMq.matches);
    update();
    widthMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);
    return () => {
      widthMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  const sortedEventos = useMemo(() => sortEventosDesc(eventos), [eventos]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [positions, setPositions] = useState<number[]>([]);
  const total = sortedEventos.length;

  useEventosScroll(
    useHorizontalScroll,
    sectionRef,
    trackRef,
    textRef,
    total,
    setActiveIndex,
    setPositions,
  );

  const [showAll, setShowAll] = useState(false);

  return (
    <>
      {/* ── Desktop — pin + trilho horizontal + régua de linha do tempo ──── */}
      {useHorizontalScroll && (
        <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#f4f7fb]">
          {/* Texto fixo — some (fade + slide-up) nos primeiros 20% do scroll
              pinado, ver use-eventos-scroll.ts. `justify-start` + `pt-28` —
              alinhado ao topo da seção (mesma folga do header usada no
              StagePanel do ProductShowcase), não mais centralizado
              verticalmente. */}
          <div
            ref={textRef}
            className="absolute inset-y-0 left-0 z-20 w-[42%] xl:w-[38%] flex flex-col justify-start pt-28 xl:pt-32 px-4 lg:pl-16 xl:pl-24 pr-8"
          >
            <SectionEyebrow>Eventos</SectionEyebrow>
            <h2 className="font-display text-4xl xl:text-5xl font-semibold text-[#1e3a5f] leading-[1.05] tracking-tighter antialiased mb-4">
              Presente nas principais{" "}
              <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
                feiras e eventos de hotelaria
              </span>
            </h2>
          </div>

          {/* Trilho — `pl-[44%]` empurra o 1º card pra começar logo depois da
              coluna de texto; a partir daí o GSAP assume o `x` inteiro (ver
              use-eventos-scroll.ts). Largura soma sozinha pelo conteúdo
              (flex + flex-shrink-0 nos cards). */}
          <div
            ref={trackRef}
            className="absolute top-[38%] xl:top-[40%] -translate-y-1/2 left-0 flex items-stretch gap-8 xl:gap-12 pl-[44%] xl:pl-[40%] pr-[10vw] will-change-transform"
          >
            {sortedEventos.map((evento) => (
              <div key={evento.id} className="flex-shrink-0">
                <EventoCard evento={evento} />
              </div>
            ))}
          </div>

          <TimelineRail eventos={sortedEventos} activeIndex={activeIndex} positions={positions} />
        </section>
      )}

      {/* ── Mobile / tablet / reduced-motion — cards horizontais empilhados,
          com trilho vertical estático (logo+data+conector) no lugar do
          antigo card de identificação. ─────────────────────────────────── */}
      {!useHorizontalScroll && (
        <section className="relative py-20 overflow-hidden bg-[#f4f7fb]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <SectionEyebrow>Eventos</SectionEyebrow>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
                Presente nas principais{" "}
                <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
                  feiras de hotelaria
                </span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {sortedEventos.slice(0, showAll ? undefined : MOBILE_MAX).map((evento, i, arr) => (
                <motion.div
                  key={evento.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: (i % MOBILE_MAX) * 0.08,
                    ease: EASE,
                  }}
                  className="flex gap-2 sm:gap-3"
                >
                  <EventoMarcador evento={evento} isLast={i === arr.length - 1} />
                  <EventoCard evento={evento} compact />
                </motion.div>
              ))}

              {!showAll && total > MOBILE_MAX && (
                <motion.button
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  onClick={() => setShowAll(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-[#285992] bg-white border border-gray-200 rounded-xl hover:bg-blue-50 transition-colors shadow-sm cursor-pointer"
                >
                  Ver mais eventos ({total - MOBILE_MAX} restantes)
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export { EventosSection };
