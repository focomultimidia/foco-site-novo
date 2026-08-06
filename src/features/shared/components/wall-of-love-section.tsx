"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import { Play, Star, BadgeCheck, X, Sparkles } from "lucide-react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
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

// Destaca a abertura do depoimento (até a 1ª pontuação, num intervalo
// razoável) — mesmo efeito editorial da referência ("I LOVE Testimonial...").
function splitHighlight(texto: string): { lead: string; rest: string } {
  const match = texto.match(/^.{15,70}?[.!?]/);
  const lead = match ? match[0] : texto.slice(0, Math.min(48, texto.length));
  return { lead, rest: texto.slice(lead.length) };
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
function TextCard({ dep, onHover }: { dep: Depoimento; onHover: (h: boolean) => void }) {
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, rgba(40,89,146,0.06), transparent 70%)`;
  const rotateX = useSpring(0, { stiffness: 260, damping: 28 });
  const rotateY = useSpring(0, { stiffness: 260, damping: 28 });
  const { lead, rest } = splitHighlight(dep.texto);

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
      className="relative rounded-3xl bg-white p-7 transform-gpu"
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

      <div className="relative z-10">
        <div className="flex gap-0.5 mb-5">
          {Array.from({ length: 5 }).map((_, si) => (
            <Star key={si} className="w-3.5 h-3.5 text-[#fccc30] fill-[#fccc30]" strokeWidth={0} />
          ))}
        </div>

        <p className="text-[15px] leading-relaxed text-slate-700">
          <span
            className="font-semibold rounded px-1 py-0.5 -mx-1"
            style={{ background: "rgba(252,204,48,0.22)", color: "#1e3a5f" }}
          >
            {lead}
          </span>
          {rest}
        </p>

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
}: {
  item: VideoDepoimento;
  onHover: (h: boolean) => void;
  onOpen: () => void;
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
      <div className="relative aspect-[4/5]">
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

// ── Section ───────────────────────────────────────────────────────────────────
function WallOfLoveSection({
  depoimentos,
  videos,
  title = "Um mural de resultados reais",
  subtitle = "Cada card aqui é um hoteleiro de verdade — em texto ou em vídeo — contando como a Foco mudou a forma de vender e gerir sua propriedade.",
  badge = "Depoimentos",
  maxCards = 9,
}: WallOfLoveSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoDepoimento | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const columnCount = useColumnCount();

  const allCards = buildWall(depoimentos, videos);
  const hasMore = allCards.length > maxCards;
  const compactCards = allCards.slice(0, maxCards);
  const hiddenCount = allCards.length - maxCards;

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

          {/* Mural compacto — colunas estáveis (nunca reflui quando a galeria abre/fecha) */}
          <MasonryWall cards={compactCards} columnCount={columnCount} onOpenVideo={setSelectedVideo} />

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
                Ver todos os {allCards.length} depoimentos
                <span
                  className="text-xs font-bold rounded-full px-2 py-0.5"
                  style={{ background: "rgba(40,89,146,0.08)" }}
                >
                  +{hiddenCount}
                </span>
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
                  {selectedVideo.author} — {selectedVideo.hotel}
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
