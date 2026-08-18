"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { Play, Star, BadgeCheck, X, Sparkles } from "lucide-react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { CarouselControls } from "@/features/shared/components/carousel-controls";
import type { Depoimento, VideoDepoimento } from "@/features/home/types";

// ── Props ─────────────────────────────────────────────────────────────────────
interface WallOfLoveSectionProps {
  depoimentos: Depoimento[];
  videos: VideoDepoimento[];
  title?: string;
  subtitle?: string;
  badge?: string;
  /** Quantos cartões exibir no mural compacto (mistura texto + vídeo). */
  maxCards?: number;
}

type Card =
  | { kind: "text"; data: Depoimento }
  | { kind: "video"; data: VideoDepoimento };

// Padrão de intercalação — mais vídeo que a proporção real da base de dados,
// porque é o vídeo que dá o "movimento" ao mural (igual à referência).
const PATTERN: Array<"text" | "video"> = [
  "video", "text", "text", "video", "text", "video", "text", "video", "text",
];

// Intercala TODOS os depoimentos e vídeos disponíveis (sem corte) seguindo o
// padrão acima — o corte de quantos aparecem no mural compacto é feito depois.
function buildWall(depoimentos: Depoimento[], videos: VideoDepoimento[]): Card[] {
  const cards: Card[] = [];
  let ti = 0;
  let vi = 0;
  const total = depoimentos.length + videos.length;
  while (cards.length < total) {
    const want = PATTERN[cards.length % PATTERN.length];
    if (want === "video" && vi < videos.length) {
      cards.push({ kind: "video", data: videos[vi++] });
    } else if (want === "text" && ti < depoimentos.length) {
      cards.push({ kind: "text", data: depoimentos[ti++] });
    } else if (vi < videos.length) {
      cards.push({ kind: "video", data: videos[vi++] });
    } else if (ti < depoimentos.length) {
      cards.push({ kind: "text", data: depoimentos[ti++] });
    } else {
      break;
    }
  }
  return cards;
}

function cardKey(card: Card): string {
  return card.kind === "text" ? `t-${card.data.id}` : `v-${card.data.id}`;
}

// ── Colunas por breakpoint ────────────────────────────────────────────────────
// Detectado via matchMedia (só recalcula em resize/rotação, nunca ao
// adicionar cartões) — evita que o corte CSS `columns-*` reflua e embaralhe
// tudo sempre que o conteúdo muda.
function useColumnCount(): number {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqSm = window.matchMedia("(min-width: 640px)");
    const update = () => setCols(mqLg.matches ? 3 : mqSm.matches ? 2 : 1);
    update();
    mqLg.addEventListener("change", update);
    mqSm.addEventListener("change", update);
    return () => {
      mqLg.removeEventListener("change", update);
      mqSm.removeEventListener("change", update);
    };
  }, []);
  return cols;
}

// Distribui os cartões em colunas por round-robin (índice % nº de colunas).
// Diferente do CSS `columns-*`, um cartão NUNCA muda de coluna/posição quando
// a lista cresce — os novos só se acrescentam ao fim de cada coluna. É isso
// que garante que o usuário nunca veja o que já estava vendo "pular" de lugar.
function distributeColumns<T>(items: T[], columnCount: number): T[][] {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, i) => columns[i % columnCount].push(item));
  return columns;
}

// ── Cartão de texto — spotlight + tilt 3D (mesma técnica já usada no site) ───
function TextCard({
  dep,
  onHover,
  compact = false,
}: {
  dep:      Depoimento;
  onHover:  (h: boolean) => void;
  /** Trunca a citação (com fade, não corte seco) — usado só pelo
      TestimonialCarousel, cujos slots têm altura fixa (o texto completo
      continua na galeria "ver mais"). */
  compact?: boolean;
}) {
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, rgba(40,89,146,0.06), transparent 70%)`;
  const rotateX = useSpring(0, { stiffness: 260, damping: 28 });
  const rotateY = useSpring(0, { stiffness: 260, damping: 28 });

  // Detecta se o `line-clamp` está de fato cortando ALGUMA coisa (em vez de
  // assumir por contagem de caracteres, frágil e diferente por breakpoint) —
  // só aí o degradê de esmaecimento entra; um depoimento curto, que já cabe
  // inteiro, não ganha um fade artificial no fim de uma frase completa.
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  useLayoutEffect(() => {
    if (!compact) return;
    const el = quoteRef.current;
    if (!el) return;
    setIsTruncated(el.scrollHeight - el.clientHeight > 1);
  }, [compact, dep.texto]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mx.set(x);
    my.set(y);
    rotateY.set(((x - r.width / 2) / (r.width / 2)) * 4);
    rotateX.set(((r.height / 2 - y) / (r.height / 2)) * 3);
  };
  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    mx.set(-999);
    my.set(-999);
    onHover(false);
  };

  return (
    <motion.div
      className={`relative rounded-3xl bg-white p-7 transform-gpu overflow-hidden ${compact ? "h-full flex flex-col" : ""}`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        border: "1px solid rgba(15,23,42,0.06)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(15,23,42,0.06)",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => onHover(true)}
    >
      <motion.div className="pointer-events-none absolute inset-0 rounded-3xl" style={{ background: spotlight }} />

      {/* Aspas de fundo — marca d'água em duas camadas (eco tipográfico), não
          o ícone de "quote" óbvio: sangra pelo canto, quase invisível, só
          registra como textura ao olhar de novo. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute select-none font-display font-bold"
        style={{
          top: "-3.6rem",
          left: "-2.1rem",
          fontSize: "9.5rem",
          lineHeight: 1,
          color: "#1e3a5f",
          opacity: 0.045,
          transform: "rotate(-11deg) scale(1.15)",
          WebkitMaskImage: "radial-gradient(60% 60% at 32% 30%, black 35%, transparent 80%)",
          maskImage: "radial-gradient(60% 60% at 32% 30%, black 35%, transparent 80%)",
        }}
      >
        &rdquo;
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute select-none font-display font-bold"
        style={{
          top: "-2.1rem",
          left: "0.6rem",
          fontSize: "9.5rem",
          lineHeight: 1,
          color: "#1e3a5f",
          opacity: 0.028,
          transform: "rotate(6deg) scale(0.82)",
          WebkitMaskImage: "radial-gradient(60% 60% at 32% 30%, black 35%, transparent 80%)",
          maskImage: "radial-gradient(60% 60% at 32% 30%, black 35%, transparent 80%)",
        }}
      >
        &rdquo;
      </span>

      <div className={`relative z-10 ${compact ? "h-full flex flex-col" : ""}`}>
        <div className="flex gap-0.5 mb-5">
          {Array.from({ length: 5 }).map((_, si) => (
            <Star key={si} className="w-3.5 h-3.5 text-[#fccc30] fill-[#fccc30]" strokeWidth={0} />
          ))}
        </div>

        <div className={compact ? "relative flex-1 min-h-0" : undefined}>
          <p
            ref={quoteRef}
            className={`leading-relaxed text-slate-700 ${compact ? "text-[13px] line-clamp-[9] h-full" : "text-[15px]"}`}
          >
            {dep.texto}
          </p>
          {compact && isTruncated && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-9 bg-gradient-to-t from-white via-white/80 to-transparent"
            />
          )}
        </div>

        <div className="h-px bg-gradient-to-r from-[#285992]/10 via-[#285992]/5 to-transparent my-6" />

        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg,#285992,#427ab9)", boxShadow: "0 4px 12px rgba(40,89,146,0.28)" }}
            >
              {dep.avatar}
            </div>
            <BadgeCheck className="absolute -bottom-0.5 -right-0.5 w-4 h-4 text-[#285992] bg-white rounded-full" strokeWidth={2} />
          </div>
          <div>
            <p className="font-display font-bold text-[#0f172a] text-sm tracking-tight">{dep.autor}</p>
            <p className="text-slate-500 text-xs mt-0.5">{dep.cargo}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Cartão de vídeo — thumbnail + play + citação em destaque ─────────────────
function VideoCard({
  item,
  onHover,
  onOpen,
  fixedHeight,
}: {
  item: VideoDepoimento;
  onHover: (h: boolean) => void;
  onOpen: () => void;
  /** Substitui o `aspect-[4/5]` por uma altura fixa em px — usado só pelo
      TestimonialCarousel, onde o card de vídeo precisa bater com a mesma
      altura do card de texto ao lado (o "ver mais" mantém o aspect-ratio
      original). */
  fixedHeight?: number;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="group relative w-full text-left rounded-3xl overflow-hidden bg-black"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 12px 28px rgba(15,23,42,0.14)" }}
    >
      <div className={`relative ${fixedHeight ? "" : "aspect-[4/5]"}`} style={fixedHeight ? { height: fixedHeight } : undefined}>
        <img
          src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(150deg, rgba(40,89,146,0.35), rgba(15,23,42,0.15))", mixBlendMode: "multiply" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/20" />

        {/* Faíscas douradas — só no hover, assinatura própria do mural */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {[
            { left: "18%", top: "22%", delay: "0s" },
            { left: "78%", top: "16%", delay: "0.4s" },
            { left: "68%", top: "62%", delay: "0.8s" },
          ].map((s, i) => (
            <span
              key={i}
              className="absolute w-1.5 h-1.5 rotate-45"
              style={{
                left: s.left,
                top: s.top,
                background: "#fccc30",
                animation: `wall-sparkle-float 3.5s ease-in-out ${s.delay} infinite`,
              }}
            />
          ))}
        </div>

        {item.stat && (
          <span
            className="absolute top-3 left-3 text-[#fccc30] text-xs font-bold rounded-full px-2.5 py-1 border"
            style={{ background: "rgba(15,23,42,0.55)", borderColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
          >
            {item.stat}
          </span>
        )}

        {/* Play — anel pulsante contínuo, mais forte no hover */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="absolute w-14 h-14 rounded-full animate-ping"
            style={{ background: "rgba(255,255,255,0.35)", animationDuration: "2.2s" }}
          />
          <div
            className="relative w-14 h-14 rounded-full flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
            style={{ background: "rgba(255,255,255,0.14)", borderColor: "rgba(255,255,255,0.4)", backdropFilter: "blur(6px)" }}
          >
            <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 p-4">
          <p className="text-white text-sm font-semibold leading-snug line-clamp-1">{item.author}</p>
          <p className="text-white/60 text-xs mb-3">{item.hotel}</p>
          <div
            className="rounded-xl px-3 py-2.5"
            style={{ background: "linear-gradient(135deg,#285992,#1e3a5f)" }}
          >
            <p className="text-white text-[13px] font-medium leading-snug line-clamp-2">
              &ldquo;{item.title}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

// ── Mural em colunas — estável: cartões existentes nunca mudam de posição ────
function MasonryWall({
  cards,
  columnCount,
  onOpenVideo,
  staggerCards = true,
}: {
  cards: Card[];
  columnCount: number;
  onOpenVideo: (v: VideoDepoimento) => void;
  staggerCards?: boolean;
}) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const columns = distributeColumns(cards, columnCount);

  return (
    <div className="flex gap-5 items-start">
      {columns.map((col, ci) => (
        <div key={ci} className="flex-1 min-w-0 flex flex-col gap-5">
          {col.map((card) => {
            const key = cardKey(card);
            const isHovered = hoveredKey === key;
            const isDimmed = hoveredKey !== null && !isHovered;
            return (
              <motion.div
                key={key}
                layout="position"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  staggerCards
                    ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }
                style={{
                  opacity: isDimmed ? 0.55 : 1,
                  transform: isHovered ? "scale(1.02)" : "scale(1)",
                  transition: "opacity 300ms ease, transform 300ms ease",
                }}
              >
                {card.kind === "text" ? (
                  <TextCard dep={card.data} onHover={h => setHoveredKey(h ? key : null)} />
                ) : (
                  <VideoCard
                    item={card.data}
                    onHover={h => setHoveredKey(h ? key : null)}
                    onOpen={() => onOpenVideo(card.data)}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ── TestimonialCarousel — roda giratória, sempre em movimento visível ───────
// Todos os cards ficam SEMPRE montados (nunca entram/saem do DOM — evita
// qualquer travamento de entrada/saída) e só a posição (`x`), escala e
// opacidade de CADA UM mudam a cada passo, animadas por `transform`
// (translateX + scale), não por `width`/layout — largura via CSS força
// reflow a cada frame, é isso que fazia o passo anterior parecer brusco.
// Central fica maior — mais largo E mais alto, via `scale` — e os vizinhos
// ficam visivelmente menores/mais transparentes conforme a distância do
// centro, com uma pista bem tênue dos que estão duas posições longe (mesma
// sensação de "roda" contínua da referência). `spring` (não tween linear)
// dá o assentamento com uma pontinha de inércia real — movimento discreto
// (troca de `activeIndex`), mas com peso físico. Autoplay (pausa no hover)
// + navegação manual (setas e pontos) sempre disponível.
interface CarouselMetrics {
  cardWidth:     number;
  cardHeight:    number;
  /** Espaço fixo entre a BORDA de um card e a borda do vizinho — não entre
      centros. Como cada papel (central/lateral/pista) tem uma largura
      diferente, um espaçamento de centro-a-centro fixo (o `step` antigo)
      deixa o vão maior conforme os cards encolhem; este é o que garante
      vão igual em toda a fileira, do centro até a pista mais distante. */
  gap:           number;
  centerScale:   number;
  /** Escala vertical do central, separada da horizontal — pedido explícito
      pra abaixar só a altura sem mexer na largura já calibrada. */
  centerScaleY:  number;
  sideScale:     number;
  stageHeight:   number;
  showSides:     boolean;
}

// Altura dos cards aumentada (360→420 no lg, e proporcional nos outros
// breakpoints) — dá mais linhas de respiro pro depoimento antes do
// `line-clamp` entrar, junto com o corte em 9 linhas (era 5) no TextCard.
const METRICS_LG   = { cardWidth: 280, cardHeight: 420, gap: 24, centerScale: 1.15, centerScaleY: 1.07, sideScale: 0.8, stageHeight: 490, showSides: true };
const METRICS_SM   = { cardWidth: 380, cardHeight: 390, gap: 24, centerScale: 1,    centerScaleY: 1,    sideScale: 1,   stageHeight: 410, showSides: false };
const METRICS_BASE = { cardWidth: 270, cardHeight: 390, gap: 24, centerScale: 1,    centerScaleY: 1,    sideScale: 1,   stageHeight: 410, showSides: false };

function metricsForViewport(): CarouselMetrics {
  if (typeof window === "undefined") return METRICS_LG;
  if (window.matchMedia("(min-width: 1024px)").matches) return METRICS_LG;
  if (window.matchMedia("(min-width: 640px)").matches) return METRICS_SM;
  return METRICS_BASE;
}

function useCarouselMetrics(): CarouselMetrics {
  // Inicializa o `useState` já lendo o breakpoint real (função lazy, roda só
  // na primeira renderização) em vez de assumir desktop e corrigir depois —
  // essa correção tardia mexeria na prop `animate` dos cards (largura/escala
  // são valores animados, não CSS estático), disparando uma transição
  // inteira só pra chegar no tamanho que já devia estar certo de cara.
  const [metrics, setMetrics] = useState<CarouselMetrics>(metricsForViewport);
  useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqSm = window.matchMedia("(min-width: 640px)");
    const update = () => setMetrics(metricsForViewport());
    mqLg.addEventListener("change", update);
    mqSm.addEventListener("change", update);
    return () => {
      mqLg.removeEventListener("change", update);
      mqSm.removeEventListener("change", update);
    };
  }, []);
  return metrics;
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

// Distância assinada mais curta de `index` até `active`, considerando o
// array circular — garante que cada card sempre pega o caminho mais curto
// pra virar central, nunca dá a volta inteira por engano.
function wrapDistance(index: number, active: number, total: number): number {
  const half = total / 2;
  let d = (index - active) % total;
  if (d > half) d -= total;
  if (d < -half) d += total;
  return d;
}

const CARD_SPRING = { type: "spring" as const, stiffness: 260, damping: 26, mass: 0.9 };

// Largura (em px) do card num papel — mesma fórmula de escala usada pro
// `scale` visual, só que aplicada à largura real, pra poder somar bordas.
function widthForAbsOffset(absOffset: number, metrics: CarouselMetrics): number {
  if (!metrics.showSides) return metrics.cardWidth;
  if (absOffset === 0) return metrics.cardWidth * metrics.centerScale;
  const scale = Math.max(0.5, metrics.sideScale - (absOffset - 1) * 0.18);
  return metrics.cardWidth * scale;
}

// Posição X somando borda-a-borda (metade da largura de cada vizinho + o
// `gap` fixo) em vez de `offset * step` — é isso que mantém o mesmo vão
// visual do centro até a pista mais distante, independente de quanto cada
// papel encolhe.
function xForOffset(offset: number, metrics: CarouselMetrics): number {
  const absOffset = Math.abs(offset);
  if (absOffset === 0) return 0;
  let x = 0;
  for (let i = 1; i <= absOffset; i++) {
    x += widthForAbsOffset(i - 1, metrics) / 2 + metrics.gap + widthForAbsOffset(i, metrics) / 2;
  }
  return offset < 0 ? -x : x;
}

function CarouselCard({
  card,
  offset,
  metrics,
  onOpenVideo,
}: {
  card:         Card;
  offset:       number;
  metrics:      CarouselMetrics;
  onOpenVideo:  (v: VideoDepoimento) => void;
}) {
  const abs = Math.abs(offset);
  const isCenter = offset === 0;
  const scaleX = !metrics.showSides
    ? (isCenter ? 1 : 0.92)
    : isCenter
    ? metrics.centerScale
    : Math.max(0.5, metrics.sideScale - (abs - 1) * 0.18);
  // Só o central desacopla scaleY de scaleX (altura menor que a largura
  // sugeriria); os demais papéis continuam com escala uniforme.
  const scaleY = isCenter && metrics.showSides ? metrics.centerScaleY : scaleX;
  const opacity = !metrics.showSides
    ? (isCenter ? 1 : 0)
    : abs === 0 || abs === 1
    ? 1
    : abs === 2
    ? 0.3
    : 0;
  const noop = () => {};
  const target = { x: xForOffset(offset, metrics), scaleX, scaleY, opacity, zIndex: 100 - abs * 10 };

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        width: metrics.cardWidth,
        height: metrics.cardHeight,
        marginLeft: -metrics.cardWidth / 2,
        marginTop: -metrics.cardHeight / 2,
        willChange: "transform, opacity",
      }}
      initial={target}
      animate={target}
      transition={{ x: CARD_SPRING, scaleX: CARD_SPRING, scaleY: CARD_SPRING, opacity: { duration: 0.35, ease: "easeOut" }, zIndex: { duration: 0 } }}
    >
      {card.kind === "text" ? (
        <TextCard dep={card.data} compact onHover={noop} />
      ) : (
        <VideoCard item={card.data} onHover={noop} onOpen={() => onOpenVideo(card.data)} fixedHeight={metrics.cardHeight} />
      )}
    </motion.div>
  );
}

// Card vira central a cada ~4s — devagar o bastante pra dar tempo de ler,
// rápido o bastante pra nunca parecer parado.
const AUTOPLAY_DELAY = 4000;

// Mesmo par de limiares (offset OU velocidade) usado nos outros carrosséis de
// arrastar do site — cobre tanto o gesto lento e longo quanto o "flick"
// rápido e curto.
const SWIPE_OFFSET_THRESHOLD = 60;
const SWIPE_VELOCITY_THRESHOLD = 400;

function TestimonialCarousel({
  cards,
  onOpenVideo,
}: {
  cards:        Card[];
  onOpenVideo:  (v: VideoDepoimento) => void;
}) {
  const metrics = useCarouselMetrics();
  const reduceMotion = useReducedMotion();
  const total = cards.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (next: number) => setActiveIndex(mod(next, total));

  // Autoplay em loop infinito — nunca pausa (nem no hover: "os depoimentos
  // devem sempre ficar passando", pedido explícito), só o `mod` faz o
  // índice dar a volta sem fim. Índice puro, não usa o Carousel/Embla do
  // resto do site porque o card central precisa ficar maior que os das
  // pontas em largura E altura, um layout que o `basis-*` do Embla não
  // expressa.
  //
  // Exceção única: enquanto o usuário está com o dedo no palco (arrastando),
  // o autoplay pausa — sem isso, o avanço automático brigaria com o próprio
  // gesto de swipe (o card trocaria sozinho no meio do arrasto).
  const isDraggingRef = useRef(false);
  useEffect(() => {
    if (reduceMotion || total <= 1) return;
    const id = setInterval(() => {
      if (isDraggingRef.current) return;
      setActiveIndex((i) => mod(i + 1, total));
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [reduceMotion, total]);

  // Swipe (mobile/tablet — abaixo de lg, onde `metrics.showSides` é false e só
  // o card central aparece). Mesmo par de limiares (offset OU velocidade) dos
  // outros carrosséis de arrastar do site.
  function handleDragStart() {
    isDraggingRef.current = true;
  }
  function handleDragEnd(_event: unknown, info: PanInfo) {
    isDraggingRef.current = false;
    if (info.offset.x < -SWIPE_OFFSET_THRESHOLD || info.velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
      goTo(activeIndex + 1);
    } else if (info.offset.x > SWIPE_OFFSET_THRESHOLD || info.velocity.x > SWIPE_VELOCITY_THRESHOLD) {
      goTo(activeIndex - 1);
    }
  }

  if (total === 0) return null;

  return (
    <div>
      {/* `isolate` — cria um contexto de empilhamento próprio pro palco. Sem
          isso, o z-index alto dos cards (até 100, pra dar profundidade entre
          eles) "vazava" pra fora e competia com elementos fixos da página
          (o header usa z-50) — ao rolar a seção pra perto do topo, o card
          central ficava por cima do menu. Isolado, esses z-index só valem
          ENTRE os cards; o palco em si empilha normal (z automático) com o
          resto da página. */}
      <motion.div
        className="relative isolate w-full overflow-hidden touch-pan-y"
        style={{
          height: metrics.stageHeight,
          ...(metrics.showSides
            ? {
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
                maskImage: "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
              }
            : {}),
        }}
        // Swipe só abaixo de lg (`!metrics.showSides`) — em desktop os cards
        // laterais já são clicáveis, arrastar ali competiria com esse gesto.
        drag={!metrics.showSides ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {cards.map((card, i) => (
          <CarouselCard
            key={cardKey(card)}
            card={card}
            offset={reduceMotion ? (i === activeIndex ? 0 : 1) : wrapDistance(i, activeIndex, total)}
            metrics={metrics}
            onOpenVideo={onOpenVideo}
          />
        ))}
      </motion.div>

      <div className="flex justify-center mt-9">
        <CarouselControls
          count={total}
          current={activeIndex}
          onPrev={() => goTo(activeIndex - 1)}
          onNext={() => goTo(activeIndex + 1)}
          onSelect={goTo}
          labelPrev="Depoimento anterior"
          labelNext="Próximo depoimento"
          labelItem={(i) => `Ir para depoimento ${i + 1}`}
        />
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function WallOfLoveSection({
  depoimentos,
  videos,
  title = "Um mural de resultados reais",
  subtitle = "Cada card aqui é um hoteleiro de verdade, contando como a Foco mudou a forma de vender e gerir sua propriedade.",
  badge = "Depoimentos",
  maxCards = 9,
}: WallOfLoveSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoDepoimento | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const columnCount = useColumnCount();

  const allCards = buildWall(depoimentos, videos);
  const hasMore = allCards.length > maxCards;
  const compactCards = allCards.slice(0, maxCards);

  // ESC fecha o que estiver "por cima": primeiro o vídeo, depois a galeria.
  // Trava o scroll do body sempre que qualquer uma das duas camadas está aberta.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (selectedVideo) setSelectedVideo(null);
      else if (galleryOpen) setGalleryOpen(false);
    };
    if (selectedVideo || galleryOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedVideo, galleryOpen]);

  return (
    <>
      <style>{`
        @keyframes wall-sparkle-float {
          0%, 100% { opacity: 0; transform: translateY(0) rotate(45deg) scale(0.6); }
          50%      { opacity: 1; transform: translateY(-14px) rotate(45deg) scale(1); }
        }
      `}</style>

      <section className="relative py-24 bg-[#f4f7fb] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <SectionEyebrow className="justify-center">{badge}</SectionEyebrow>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
              {title}
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">{subtitle}</p>
          </motion.div>

          {/* Mural compacto — coverflow contínuo (o card em evidência no centro,
              os vizinhos espiando pelas pontas), sempre em movimento. */}
          <TestimonialCarousel cards={compactCards} onOpenVideo={setSelectedVideo} />

          {/* Este botão É a galeria — mesmo layoutId nos dois, o Framer Motion
              "morfa" o pequeno pill até virar o painel de tela cheia, em vez de
              simplesmente empurrar mais conteúdo para baixo. A origem visual
              nunca deixa dúvida de como voltar. */}
          {hasMore && !galleryOpen && (
            <div className="flex justify-center mt-10">
              <motion.button
                layoutId="wall-of-love-gallery-surface"
                type="button"
                onClick={() => setGalleryOpen(true)}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border bg-white"
                style={{ borderColor: "rgba(40,89,146,0.25)", color: "#1e3a5f" }}
              >
                <Sparkles className="w-4 h-4" style={{ color: "#fccc30" }} strokeWidth={2} />
                Ver mais depoimentos
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Galeria completa — superfície própria, nunca mistura com o mural
          compacto acima (o usuário está sempre ou num lugar, ou no outro,
          nunca num meio-termo confuso de conteúdo crescendo). */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            layoutId="wall-of-love-gallery-surface"
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="fixed inset-0 z-50 bg-[#f4f7fb] overflow-y-auto"
          >
            <div
              className="sticky top-0 z-10 flex items-center justify-between px-5 sm:px-8 py-4 border-b"
              style={{ background: "rgba(244,247,251,0.92)", backdropFilter: "blur(12px)", borderColor: "rgba(30,58,95,0.08)" }}
            >
              <div>
                <p className="font-display font-bold text-[#1e3a5f] text-lg leading-tight">
                  Todos os depoimentos
                </p>
                <p className="text-slate-500 text-xs">{allCards.length} hoteleiros reais</p>
              </div>
              <button
                type="button"
                onClick={() => setGalleryOpen(false)}
                aria-label="Fechar galeria"
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold border bg-white text-[#1e3a5f]"
                style={{ borderColor: "rgba(40,89,146,0.2)" }}
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
                Fechar
              </button>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <MasonryWall
                cards={allCards}
                columnCount={columnCount}
                onOpenVideo={setSelectedVideo}
                staggerCards={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de vídeo — sempre acima da galeria (z maior), mesmo padrão leve já usado no site */}
      <AnimatePresence mode="popLayout">
        {selectedVideo && (
          <motion.div
            key="backdrop"
            custom={null}
            variants={{
              initial: () => ({ opacity: 0 }),
              animate: () => ({ opacity: 1 }),
              exit: () => ({ opacity: 0 }),
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 bg-black/75 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              custom={null}
              variants={{
                initial: () => ({ opacity: 0, scale: 0.9 }),
                animate: () => ({ opacity: 1, scale: 1 }),
                exit: () => ({ opacity: 0, scale: 0.9 }),
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                aria-label="Fechar vídeo"
                className="absolute -top-11 right-0 flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm"
              >
                <X className="w-5 h-5" strokeWidth={2} />
                <span className="tracking-wide">ESC</span>
              </button>

              <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="mt-4 text-center">
                <p className="text-white font-medium text-sm">{selectedVideo.title}</p>
                <p className="text-white/50 text-xs mt-0.5">
                  {selectedVideo.author}, {selectedVideo.hotel}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { WallOfLoveSection };
