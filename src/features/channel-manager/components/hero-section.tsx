"use client";

/**
 * HeroSection · Channel Manager — "Power grid" de canais
 *
 * Réplica adaptada do módulo hero da contiant.com: título gigante centralizado
 * no topo, e abaixo um diagrama fan-in / fan-out — canais (OTAs) à esquerda
 * convergindo por um barramento até o nó Foco no centro, que por sua vez
 * alimenta duas telas empilhadas à direita (reserva recebida → sincronização
 * confirmada). Mesma linguagem de traçados com pulso de luz já usada no resto
 * do site (FlowLine / cm-flow-pulse), só que agora com o texto centralizado
 * em vez de ancorado à coluna dos canais.
 *
 * ── Palco de coordenadas fixas ──────────────────────────────────────────────
 * Canais + nó + cards + traçados são desenhados num espaço de 1180 × 470 px e
 * escalados por transform conforme a largura do contêiner (useStageScale) —
 * mesma técnica do resto do site: mantém a geometria dos cards e dos SVGs
 * perfeitamente alinhada em qualquer viewport.
 *
 * ── Cards à direita ──────────────────────────────────────────────────────────
 * O card de "sincronização concluída" fica ancorado por cima do card de
 * "reserva recebida", com uma sobreposição de ~20px no canto — não há um
 * traçado separado entre os dois porque a sobreposição já lê como conexão
 * direta; o selo com o ícone de refresh faz esse papel visualmente, sentado
 * bem na costura dos dois cards.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, RefreshCw } from "lucide-react";
import { HeroButton } from "@/features/shared/components/hero-button";
import { useInternalHeroGsap } from "@/features/shared/hooks/use-internal-hero-gsap";
import type { HeroData } from "../types";

// ── Palco ─────────────────────────────────────────────────────────────────────

const STAGE_W = 1180;
const STAGE_H = 470;

const CARD_W = 128;
const CARD_H = 106;
const NODE = 96;
const AXIS = 235; // eixo horizontal do barramento + centro vertical do nó

const CARD_SHADOW =
  "0 1px 2px rgba(19,40,64,0.04), 0 8px 28px -12px rgba(19,40,64,0.16)";

// ── Canais ────────────────────────────────────────────────────────────────────
// Três colunas escalonadas — só a coluna mais à direita (`wired`) recebe
// conectores visíveis até o barramento, igual ao restante do site.

interface Channel {
  src: string;
  alt: string;
  x: number;
  cy: number;
  wired?: boolean;
}

const CHANNELS: Channel[] = [
  { src: "/assets/imgs/integracoes/canais/booking.webp",       alt: "Booking.com",   x: 0,   cy: 140 },
  { src: "/assets/imgs/integracoes/canais/airbnb.webp",        alt: "Airbnb",        x: 0,   cy: 330 },
  { src: "/assets/imgs/integracoes/canais/expedia.webp",       alt: "Expedia",       x: 150, cy: 62  },
  { src: "/assets/imgs/integracoes/canais/decolar.webp",       alt: "Decolar",       x: 150, cy: 235 },
  { src: "/assets/imgs/integracoes/canais/agoda.webp",         alt: "Agoda",         x: 150, cy: 408 },
  { src: "/assets/imgs/integracoes/canais/google-hoteis.webp", alt: "Google Hotéis", x: 300, cy: 168, wired: true },
  { src: "/assets/imgs/integracoes/canais/cvc.webp",           alt: "CVC",           x: 300, cy: 302, wired: true },
];

const LOGOS_RIGHT = 300 + CARD_W; // 428 — borda direita real da coluna wired

// ── Traçados ──────────────────────────────────────────────────────────────────
// Barramento vertical em x = 452→464, cantos arredondados, desembocando no
// eixo e seguindo até o nó (x = 512).

const HUB_X = 560;
const HUB_LEFT = HUB_X - NODE / 2;   // 512
const HUB_RIGHT = HUB_X + NODE / 2;  // 608

const WIRE_IN_TOP = `M ${LOGOS_RIGHT} 168 H 452 Q 464 168 464 180 V ${AXIS} H ${HUB_LEFT}`;
const WIRE_IN_BOT = `M ${LOGOS_RIGHT} 302 H 452 Q 464 302 464 290 V ${AXIS} H ${HUB_LEFT}`;

// ── Cards à direita ───────────────────────────────────────────────────────────

const CARD_A = { x: 700, y: 140, w: 260, h: 190 }; // "reserva recebida"
const CARD_B = { x: 862, y: 25,  w: 224, h: 132 }; // "sincronização concluída" (sobrepõe o canto de A)

const WIRE_OUT = `M ${HUB_RIGHT} ${AXIS} H ${CARD_A.x}`;

// ── useStageScale / useIsDesktop ─────────────────────────────────────────────
// Mede o contêiner e devolve o fator de escala (nunca amplia além de 1:1).
// Uma só variante é montada por vez — no mobile o navegador não baixa as
// imagens da variante desktop escondida por CSS.

const DESKTOP_QUERY = "(min-width: 1024px)"; // = breakpoint lg do Tailwind

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return isDesktop;
}

function useStageScale(ref: React.RefObject<HTMLDivElement | null>) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sync = () => {
      const w = el.offsetWidth;
      if (w > 0) setScale(Math.min(1, w / STAGE_W));
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return scale;
}

// ── FlowLine ──────────────────────────────────────────────────────────────────
// Hairline estática + pulso em duas camadas (bloom desfocado + cabeça nítida).
// `pathLength={1}` normaliza o comprimento, então o dasharray trabalha em
// fração do caminho e o mesmo componente serve para traçados diferentes.

function FlowLine({
  d,
  delay,
  duration = 2.6,
  animated,
}: {
  d: string;
  delay: number;
  duration?: number;
  animated: boolean;
}) {
  const pulseStyle = (blur?: number): React.CSSProperties => ({
    animation: `cm-flow-pulse ${duration}s linear ${delay}s infinite`,
    ...(blur ? { filter: `blur(${blur}px)`, opacity: 0.55 } : null),
  });

  return (
    <>
      <path d={d} fill="none" stroke="rgba(19,40,64,0.12)" strokeWidth={1} strokeLinecap="round" />

      {animated && (
        <>
          <path
            d={d} fill="none" pathLength={1}
            stroke="url(#cmFlow)" strokeWidth={7} strokeLinecap="round"
            strokeDasharray="0.14 0.86"
            style={pulseStyle(6)}
          />
          <path
            d={d} fill="none" pathLength={1}
            stroke="url(#cmFlow)" strokeWidth={1.75} strokeLinecap="round"
            strokeDasharray="0.085 0.915"
            style={pulseStyle()}
          />
        </>
      )}
    </>
  );
}

// ── ChannelCard ───────────────────────────────────────────────────────────────

function ChannelCard({ ch, index, animated }: { ch: Channel; index: number; animated: boolean }) {
  return (
    <motion.div
      className="absolute z-10 rounded-3xl bg-white flex flex-col items-center justify-center gap-2 px-3 group"
      style={{
        left: ch.x,
        top: ch.cy - CARD_H / 2,
        width: CARD_W,
        height: CARD_H,
        boxShadow: CARD_SHADOW,
        border: "1px solid rgba(19,40,64,0.05)",
      }}
      initial={animated ? { opacity: 0, y: 14, scale: 0.96 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={animated ? { y: -4, transition: { type: "spring", stiffness: 320, damping: 22 } } : undefined}
    >
      <img
        src={ch.src}
        alt={ch.alt}
        width={228}
        height={80}
        decoding="async"
        className="max-w-[72px] max-h-[26px] w-auto h-auto object-contain transition-opacity duration-300 opacity-90 group-hover:opacity-100"
      />
      <span className="text-[12px] font-medium text-[#244248]/55 leading-none">{ch.alt}</span>
    </motion.div>
  );
}

// ── Hub ───────────────────────────────────────────────────────────────────────

function Hub({ animated }: { animated: boolean }) {
  return (
    <motion.div
      className="absolute z-20"
      style={{ left: HUB_LEFT, top: AXIS - NODE / 2, width: NODE, height: NODE }}
      initial={animated ? { opacity: 0, scale: 0.82 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
    >
      {animated && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-[26px] bg-[#285992]"
          animate={{ scale: [1, 1.5], opacity: [0.16, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <div
        className="relative w-full h-full rounded-[24px] flex items-center justify-center"
        style={{
          background: "linear-gradient(150deg, #1e3a5f 0%, #132840 100%)",
          boxShadow: "0 18px 44px -14px rgba(19,40,64,0.55), inset 0 1px 0 rgba(255,255,255,0.10)",
        }}
      >
        <div
          className="w-[58px] h-[58px] rounded-full bg-white flex items-center justify-center"
          style={{ boxShadow: "inset 0 0 0 1px rgba(19,40,64,0.06)" }}
        >
          <img
            src="/assets/imgs/logo/foco.webp"
            alt="Foco Tecnologia"
            width={500}
            height={500}
            decoding="async"
            className="w-[36px] h-[36px] object-contain"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ── RightCards ────────────────────────────────────────────────────────────────
// Card A: reserva recebida de um canal. Card B: confirmação de sincronização,
// ancorado por cima do canto superior direito de A.

function RightCards({ animated }: { animated: boolean }) {
  return (
    <>
      <motion.div
        className="absolute z-10 rounded-3xl bg-white overflow-hidden"
        style={{
          left: CARD_A.x, top: CARD_A.y, width: CARD_A.w, height: CARD_A.h,
          boxShadow: "0 1px 2px rgba(19,40,64,0.04), 0 30px 60px -24px rgba(19,40,64,0.28)",
          border: "1px solid rgba(19,40,64,0.05)",
        }}
        initial={animated ? { opacity: 0, x: 24, scale: 0.96 } : false}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/assets/imgs/home/hotel.webp"
          alt="Quarto Superior"
          width={900}
          height={900}
          decoding="async"
          className="w-full h-[92px] object-cover"
        />
        <div className="px-4 pt-2.5 pb-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#244248]/55">Quarto Superior</span>
            <span className="text-[11px] font-medium text-[#244248]/40">Booking.com</span>
          </div>
          <div className="mt-0.5 text-[1.35rem] font-bold text-[#1a3a45] tracking-tight">
            € 320<span className="text-[#244248]/40 text-base font-medium">,00</span>
          </div>
          <div
            className="mt-2.5 h-8 rounded-full flex items-center justify-center gap-1.5 text-[11px] font-semibold text-white tracking-wide"
            style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #285992 100%)" }}
          >
            SINCRONIZAR AGORA
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute z-20 rounded-3xl bg-white flex flex-col items-center text-center px-4 py-4"
        style={{
          left: CARD_B.x, top: CARD_B.y, width: CARD_B.w, height: CARD_B.h,
          boxShadow: "0 1px 2px rgba(19,40,64,0.04), 0 20px 44px -16px rgba(19,40,64,0.30)",
          border: "1px solid rgba(19,40,64,0.05)",
        }}
        initial={animated ? { opacity: 0, y: -16, scale: 0.94 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "rgba(58,123,213,0.10)", boxShadow: "inset 0 0 0 1px rgba(58,123,213,0.18)" }}
        >
          <Check className="w-5 h-5 text-[#285992]" strokeWidth={2.5} />
        </div>
        <p className="mt-2 text-[13px] font-semibold text-[#1a3a45] leading-snug">
          Sincronização<br />concluída
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f4f7fb] text-[10.5px] text-[#244248]/60">
          <RefreshCw className="w-3 h-3 text-[#3a7bd5]" strokeWidth={2.25} />
          Ativo em +450 canais
        </div>
      </motion.div>
    </>
  );
}

// ── Stage (desktop) ───────────────────────────────────────────────────────────

function Stage({
  animated,
  scale,
  wrapRef,
}: {
  animated: boolean;
  scale: number;
  wrapRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: STAGE_H * scale }}>
      <div
        className="absolute top-0"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          left: "50%",
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        <svg
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          width={STAGE_W}
          height={STAGE_H}
          viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
          fill="none"
        >
          <defs>
            <linearGradient id="cmFlow" x1="0" y1="0" x2={STAGE_W} y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#285992" />
              <stop offset="1" stopColor="#3a7bd5" />
            </linearGradient>
          </defs>

          <FlowLine d={WIRE_IN_TOP} delay={0}    animated={animated} />
          <FlowLine d={WIRE_IN_BOT} delay={0.85} animated={animated} />
          <FlowLine d={WIRE_OUT}    delay={1.7}  duration={1.1} animated={animated} />
        </svg>

        {CHANNELS.map((ch, i) => (
          <ChannelCard key={ch.alt} ch={ch} index={i} animated={animated} />
        ))}

        <Hub animated={animated} />
        <RightCards animated={animated} />
      </div>
    </div>
  );
}

// ── MobileFlow ────────────────────────────────────────────────────────────────
// Abaixo de lg o palco fixo ficaria ilegível. Mesma topologia, na vertical:
// grade 2×3 de canais → nó → os dois cards empilhados (sem sobreposição, que
// só funciona no espaço largo do palco desktop).

function MobileFlow({ animated }: { animated: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 gap-2.5 w-full max-w-[300px]">
        {CHANNELS.map((ch, i) => (
          <motion.div
            key={ch.alt}
            className="rounded-xl bg-white flex flex-col items-center justify-center gap-1.5 py-3.5"
            style={{ boxShadow: CARD_SHADOW, border: "1px solid rgba(19,40,64,0.05)" }}
            initial={animated ? { opacity: 0, y: 10 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <img
              src={ch.src}
              alt={ch.alt}
              width={228}
              height={80}
              decoding="async"
              className="max-w-[62px] max-h-[24px] w-auto h-auto object-contain opacity-90"
            />
            <span className="text-[11px] font-medium text-[#244248]/55">{ch.alt}</span>
          </motion.div>
        ))}
      </div>

      <svg aria-hidden="true" width="2" height="40" viewBox="0 0 2 40" className="my-1">
        <line x1="1" y1="0" x2="1" y2="40" stroke="rgba(19,40,64,0.12)" strokeWidth={1} />
        {animated && (
          <line
            x1="1" y1="0" x2="1" y2="40"
            stroke="#3a7bd5" strokeWidth={2} strokeLinecap="round"
            pathLength={1} strokeDasharray="0.3 0.7"
            style={{ animation: "cm-flow-pulse 1.6s linear infinite" }}
          />
        )}
      </svg>

      <div
        className="relative w-[76px] h-[76px] rounded-[20px] flex items-center justify-center"
        style={{
          background: "linear-gradient(150deg, #1e3a5f 0%, #132840 100%)",
          boxShadow: "0 14px 34px -12px rgba(19,40,64,0.5)",
        }}
      >
        <div className="w-[46px] h-[46px] rounded-full bg-white flex items-center justify-center">
          <img
            src="/assets/imgs/logo/foco.webp"
            alt="Foco Tecnologia"
            width={500}
            height={500}
            decoding="async"
            className="w-[28px] h-[28px] object-contain"
          />
        </div>
      </div>

      <svg aria-hidden="true" width="2" height="40" viewBox="0 0 2 40" className="my-1">
        <line x1="1" y1="0" x2="1" y2="40" stroke="rgba(19,40,64,0.12)" strokeWidth={1} />
        {animated && (
          <line
            x1="1" y1="0" x2="1" y2="40"
            stroke="#3a7bd5" strokeWidth={2} strokeLinecap="round"
            pathLength={1} strokeDasharray="0.3 0.7"
            style={{ animation: "cm-flow-pulse 1.6s linear 0.8s infinite" }}
          />
        )}
      </svg>

      <div className="w-full max-w-[300px] flex flex-col gap-3">
        <motion.div
          className="rounded-3xl bg-white overflow-hidden"
          style={{
            boxShadow: "0 1px 2px rgba(19,40,64,0.04), 0 24px 50px -22px rgba(19,40,64,0.26)",
            border: "1px solid rgba(19,40,64,0.05)",
          }}
          initial={animated ? { opacity: 0, y: 12 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/assets/imgs/home/hotel.webp"
            alt="Quarto Superior"
            width={900}
            height={900}
            loading="lazy"
            decoding="async"
            className="w-full h-[90px] object-cover"
          />
          <div className="px-4 pt-2.5 pb-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#244248]/55">Quarto Superior</span>
              <span className="text-[11px] font-medium text-[#244248]/40">Booking.com</span>
            </div>
            <div className="mt-0.5 text-[1.3rem] font-bold text-[#1a3a45] tracking-tight">
              € 320<span className="text-[#244248]/40 text-base font-medium">,00</span>
            </div>
            <div
              className="mt-2.5 h-8 rounded-full flex items-center justify-center gap-1.5 text-[11px] font-semibold text-white tracking-wide"
              style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #285992 100%)" }}
            >
              SINCRONIZAR AGORA
            </div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-3xl bg-white flex items-center gap-3 px-4 py-3.5"
          style={{
            boxShadow: "0 1px 2px rgba(19,40,64,0.04), 0 20px 44px -16px rgba(19,40,64,0.30)",
            border: "1px solid rgba(19,40,64,0.05)",
          }}
          initial={animated ? { opacity: 0, y: 12 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(58,123,213,0.10)", boxShadow: "inset 0 0 0 1px rgba(58,123,213,0.18)" }}
          >
            <Check className="w-5 h-5 text-[#285992]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#1a3a45] leading-snug">Sincronização concluída</p>
            <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-[#244248]/55">
              <RefreshCw className="w-3 h-3 text-[#3a7bd5]" strokeWidth={2.25} />
              Ativo em +450 canais
            </div>
          </div>
        </motion.div>
      </div>
      <div className="h-2" />
    </div>
  );
}

// ── Título ────────────────────────────────────────────────────────────────────

function buildTitle(raw: string) {
  const kw = "Integrado";
  const idx = raw.indexOf(kw);
  if (idx === -1) return raw;
  return (
    <>
      {raw.slice(0, idx)}
      <span
        className="text-transparent bg-clip-text bg-gradient-to-r from-[#285992] to-[#3a7bd5]"
        style={{ textDecorationLine: "underline", textDecorationColor: "#fccc30", textDecorationThickness: "3px", textUnderlineOffset: "6px" }}
      >
        {kw}
      </span>
      {raw.slice(idx + kw.length)}
    </>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

interface HeroSectionProps {
  data: HeroData;
  onCtaClick?: () => void;
}

function HeroSection({ data, onCtaClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const scale = useStageScale(stageWrapRef);
  const reduced = useReducedMotion();
  const animated = !reduced;
  const isDesktop = useIsDesktop();

  useInternalHeroGsap(sectionRef);

  return (
    <section
      ref={sectionRef}
      data-hero="section"
      className="relative overflow-hidden bg-[#f4f7fb] pt-28 pb-14 lg:pt-32 lg:pb-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-[1180px] mx-auto">

          {/* ── Título + resumo + CTA — centralizados ─────────────────────────── */}
          <div className="max-w-2xl mx-auto text-center">
            <h1
              data-hero="title"
              className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-[#1a3a45] leading-[1.06] tracking-tight"
            >
              {buildTitle(data.titulo)}
            </h1>
            <p
              data-hero="description"
              className="mt-5 text-base lg:text-lg text-[#244248]/70 leading-relaxed max-w-xl mx-auto"
            >
              {data.descricao}
            </p>
            <div data-hero="cta" className="mt-8 flex justify-center">
              <HeroButton onClick={onCtaClick}>{data.ctaPrimario}</HeroButton>
            </div>
          </div>

          {/* ── Diagrama ──────────────────────────────────────────────────────── */}
          <div className="relative mt-16 lg:mt-20">
            {isDesktop ? (
              <Stage animated={animated} scale={scale} wrapRef={stageWrapRef} />
            ) : (
              <MobileFlow animated={animated} />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export { HeroSection };
