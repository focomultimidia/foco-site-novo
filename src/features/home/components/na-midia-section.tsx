"use client";

import { useState } from "react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { CarouselControls } from "@/features/shared/components/carousel-controls";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ArtigoMidia } from "../types";

// ── 3D position system ────────────────────────────────────────────────────────
type Role = "center" | "left" | "right";

// Fixed card dimensions — the perspective container uses these to size itself.
// Card virou coluna única (logo/título/resumo em cima, imagem como faixa
// horizontal embaixo — pedido explícito pra substituir o antigo layout
// lado a lado). CARD_H passou a ser a soma do conteúdo empilhado nesse
// formato mais compacto — não deriva mais da proporção da imagem (que
// agora é só uma faixa `aspect-[3/1]`, não o card inteiro).
const CARD_W = 700;
const CARD_H = 524;

interface PosConfig {
  x: number;
  rotateY: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

// Spring handles position / rotation / scale.
// Opacity & filter get a quick tween so they don't overshoot.
const POS: Record<Role, PosConfig> = {
  center: { x: 0,    rotateY: 0,   scale: 1,    opacity: 1,    zIndex: 30 },
  left:   { x: -410, rotateY: 30,  scale: 0.82, opacity: 0.8, zIndex: 10 },
  right:  { x: 410,  rotateY: -30, scale: 0.82, opacity: 0.8, zIndex: 10 },
};

const SPRING = { type: "spring", stiffness: 280, damping: 32 } as const;
const FADE   = { duration: 0.38, ease: "easeOut" }              as const;

function getRole(i: number, center: number, total: number): Role {
  if (i === center) return "center";
  return i === (center - 1 + total) % total ? "left" : "right";
}

// ── Image mapping ─────────────────────────────────────────────────────────────
const IMAGES: Record<string, string> = {
  "1": "/assets/imgs/na-midia/materia-1.webp",
  "2": "/assets/imgs/na-midia/materia-2.webp",
  "3": "/assets/imgs/na-midia/materia-3.webp",
  "4": "/assets/imgs/na-midia/materia-4.jpg",
};

// Logo real de cada veículo — substitui o ícone genérico de jornal (era o
// mesmo ícone pra todas as publicações, não dizia nada sobre qual veículo é).
// Chave é `artigo.publicacao` (ver social-proof-data.ts).
const PUBLICACAO_LOGOS: Record<string, string> = {
  "Valor Econômico": "/assets/imgs/na-midia/logos/valor-economico.svg",
  "Terra": "/assets/imgs/na-midia/logos/terra.svg",
  "Revista Hotéis": "/assets/imgs/na-midia/logos/revista-hoteis.png",
  "O Globo": "/assets/imgs/na-midia/logos/oglobo.svg",
};

// ── Article card ──────────────────────────────────────────────────────────────
interface ArticleCardProps {
  artigo: ArtigoMidia;
  isCenter: boolean;
}

// Card em coluna única (logo/título/resumo em cima, imagem como faixa
// horizontal embaixo — substitui o antigo layout lado a lado, imagem numa
// metade e texto na outra). O card continua no formato paisagem (CARD_W
// bem maior que CARD_H): quem garante isso agora não é mais a proporção da
// imagem (que dominava metade do card antes), e sim a imagem ter sido
// reduzida a uma faixa curta (`aspect-[3/1]`) e o texto ter clamps mais
// justos — o conteúdo é que se adequa ao formato horizontal, não o
// contrário.
function ArticleCard({ artigo, isCenter }: ArticleCardProps) {
  return (
    <div
      className="h-full rounded-3xl overflow-hidden flex flex-col p-6 lg:p-7"
      style={{
        background: "#ffffff",
        border: `1px solid ${isCenter ? "rgba(40,89,146,0.14)" : "rgba(0,0,0,0.06)"}`,
        boxShadow: isCenter
          ? "0 4px 16px rgba(40,89,146,0.07), 0 20px 56px rgba(40,89,146,0.10), 0 48px 96px rgba(40,89,146,0.06)"
          : "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* Publication row */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <img
          src={PUBLICACAO_LOGOS[artigo.publicacao]}
          alt={artigo.publicacao}
          className="h-7 w-auto max-w-[64px] object-contain flex-shrink-0"
          loading="lazy"
          decoding="async"
        />
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-400 leading-tight">
            {artigo.publicacao}
          </p>
          <p className="text-xs text-gray-700 mt-0.5">{artigo.data}</p>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-lg lg:text-xl font-semibold text-gray-900 leading-snug tracking-tight mb-2 line-clamp-2">
        {artigo.titulo}
      </h3>

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-[#285992]/15 via-[#285992]/8 to-transparent mb-3" />

      {/* Excerpt */}
      <p className="text-gray-700 text-sm leading-relaxed line-clamp-2 mb-4">
        {artigo.descricao}
      </p>

      {/* Imagem — faixa horizontal abaixo do resumo (pedido explícito), não
          mais a captura de tela inteira em retrato: `object-position`
          puxado pra baixo porque nas 3 capturas (materia-1/2/3.webp) a foto
          da matéria fica na parte inferior da página, e é ela que precisa
          aparecer nessa faixa curta — não o cabeçalho/texto do topo. */}
      <div className="relative w-full aspect-[2/0.85] rounded-xl overflow-hidden">
        <img
          src={IMAGES[artigo.id] ?? IMAGES["1"]}
          alt={artigo.titulo}
          width={1081}
          height={1350}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center 82%",
            transform: isCenter ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s ease",
          }}
        />
      </div>

      {/* CTA */}
      <a
        href={artigo.link}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={isCenter ? undefined : -1}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-800 hover:text-blue-900 group w-fit mt-4"
        onClick={e => e.stopPropagation()}
      >
        Ler artigo completo
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    </div>
  );
}

// ── Swipe (mobile) ───────────────────────────────────────────────────────────
// Mesmo par de limiares (offset OU velocidade) usado nos outros carrosséis de
// arrastar do site — cobre tanto o gesto lento e longo quanto o "flick" rápido
// e curto.
const SWIPE_OFFSET_THRESHOLD = 60;
const SWIPE_VELOCITY_THRESHOLD = 400;

// ── Section ───────────────────────────────────────────────────────────────────
interface NaMidiaSectionProps {
  artigos: ArtigoMidia[];
}

function NaMidiaSection({ artigos }: NaMidiaSectionProps) {
  const [center, setCenter] = useState(0);
  const total = artigos.length;

  const prev = () => setCenter(c => (c - 1 + total) % total);
  const next = () => setCenter(c => (c + 1) % total);

  // Arrasta o dedo, não o card em si (dragConstraints trava em 0, dragElastic
  // só dá uma "borrachinha" — mesma técnica já usada nos carrosséis de swipe
  // do site): o gesto só decide a direção, quem anima a troca continua sendo
  // o AnimatePresence de sempre.
  function handleDragEnd(_event: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_OFFSET_THRESHOLD || info.velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
      next();
    } else if (info.offset.x > SWIPE_OFFSET_THRESHOLD || info.velocity.x > SWIPE_VELOCITY_THRESHOLD) {
      prev();
    }
  }

  return (
    <section className="py-20 bg-[#f4f7fb] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SectionEyebrow>Na mídia</SectionEyebrow>

          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            Reconhecidos pela{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              mídia
            </span>
            , escolhidos pelos{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              hoteleiros
            </span>
          </h2>

          <p className="text-gray-500 text-lg font-light leading-relaxed max-w-3xl mx-auto">
            As principais publicações do setor destacam nossos sistemas como
            referência em tecnologia e eficiência para hotéis e pousadas.
          </p>
        </motion.div>

      </div>

      {/*
        ── 3D Carousel — desktop (md+) ──────────────────────────────────────
        perspective on the container gives all cards a shared vanishing point.
        Each card is absolutely centred (left:50% marginLeft:-CARD_W/2) so the
        x-animation moves them cleanly left/right from that common origin.
        rotateY + x together create the "cards fanning out behind" look.
      */}
      <div
        className="relative hidden md:block"
        style={{ height: CARD_H, perspective: "1200px" }}
      >
        {artigos.map((artigo, i) => {
          const role = getRole(i, center, total);
          const pos  = POS[role];

          return (
            <motion.div
              key={artigo.id}
              className="absolute top-0 left-1/2"
              aria-hidden={role !== "center"}
              style={{
                width: CARD_W,
                height: CARD_H,
                marginLeft: -CARD_W / 2,
                transformOrigin: "center center",
                cursor: role !== "center" ? "pointer" : "default",
              }}
              animate={{
                x:       pos.x,
                rotateY: pos.rotateY,
                scale:   pos.scale,
                opacity: pos.opacity,
                zIndex:  pos.zIndex,
                filter:  role === "center" ? "blur(0px)" : "blur(1.5px)",
              }}
              transition={{
                x:       SPRING,
                rotateY: SPRING,
                scale:   SPRING,
                opacity: FADE,
                zIndex:  { duration: 0 },
                filter:  FADE,
              }}
              onClick={() => role !== "center" && setCenter(i)}
            >
              <ArticleCard artigo={artigo} isCenter={role === "center"} />
            </motion.div>
          );
        })}
      </div>

      {/*
        ── Mobile — single card with slide transition ────────────────────────
        AnimatePresence mode="wait" ensures exit completes before enter starts,
        preventing two cards from being simultaneously visible on small screens.
      */}
      <div className="md:hidden px-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={center}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
          >
            <ArticleCard artigo={artigos[center]} isCenter />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation ───────────────────────────────────────────────── */}
      <div className="flex justify-center mt-10">
        <CarouselControls
          count={total}
          current={center}
          onPrev={prev}
          onNext={next}
          onSelect={setCenter}
          labelItem={(i) => `Slide ${i + 1}`}
        />
      </div>
    </section>
  );
}

export { NaMidiaSection };
