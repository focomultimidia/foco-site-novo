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
 * ── Mockups à direita ────────────────────────────────────────────────────────
 * Onde antes ficavam dois cards de UI (reserva recebida + sincronização), o
 * facho fundido agora desemboca direto na borda esquerda de um mockup
 * desktop (moldura de vidro, mesma linguagem da Home) com um mockup mobile
 * flutuando por cima do canto superior direito — telas propositalmente
 * vazias, com espaço reservado para os prints reais entrarem depois. Um
 * brilho na borda esquerda do desktop marca o instante exato em que o facho
 * "toca a tela", fechando a história: canais → fusão → hub → produto.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Monitor, RefreshCw, Smartphone } from "lucide-react";
import { GradientHero } from "@/features/shared/components/gradient-hero";
import type { HeroData } from "../types";

// ── Palco ─────────────────────────────────────────────────────────────────────

const STAGE_W = 1520;
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
// Curva de fusão bem mais generosa (raio 28, era um cantinho de 12) — o
// "bracket" arredondado que os dois fachos percorrem até virarem um só.

const HUB_X = 760;
const HUB_LEFT = HUB_X - NODE / 2;   // 712

// ── Mockups à direita ────────────────────────────────────────────────────────
// Desktop centralizado no AXIS (o facho entra exatamente na sua borda
// esquerda, no meio da altura) — mobile flutua sobrepondo o canto superior
// direito, mesma relação espacial que os cards antigos tinham entre si.

const DESKTOP_MOCK = { x: 980,  y: AXIS - 121, w: 500, h: 342 }; // facho entra aqui
const MOBILE_MOCK   = { x: 1285, y: AXIS - 230, w: 168, h: 315 }; // flutua por cima

const BUS_X = 580; // x do "tronco" onde as duas curvas se encontram
const R = 28;       // raio de curvatura de cada bracket (cabe no vão vertical de 67px)
const TOP_Y = 168;
const BOT_Y = 302;

// Um único traçado por facho — da coluna de canais, pela curva de fusão, por
// baixo do hub (o quadrado do nó cobre visualmente esse trecho) e até a
// borda esquerda do mockup desktop. Não existe um 3º traçado de saída: ao se
// fundirem, os dois fachos já estão desenhando o resto do caminho juntos,
// então nunca há "outro facho".
const FULL_PATH_TOP =
  `M ${LOGOS_RIGHT} ${TOP_Y} H ${BUS_X - R} ` +
  `Q ${BUS_X} ${TOP_Y} ${BUS_X} ${TOP_Y + R} ` +
  `V ${AXIS - R} ` +
  `Q ${BUS_X} ${AXIS} ${BUS_X + R} ${AXIS} ` +
  `H ${DESKTOP_MOCK.x}`;

const FULL_PATH_BOT =
  `M ${LOGOS_RIGHT} ${BOT_Y} H ${BUS_X - R} ` +
  `Q ${BUS_X} ${BOT_Y} ${BUS_X} ${BOT_Y - R} ` +
  `V ${AXIS + R} ` +
  `Q ${BUS_X} ${AXIS} ${BUS_X + R} ${AXIS} ` +
  `H ${DESKTOP_MOCK.x}`;

// Fração do comprimento do traçado onde o facho fundido cruza o centro do
// hub (logo) — usada só para cronometrar o reflexo do Hub (glint) com a
// chegada real do facho, calculada a partir dos mesmos segmentos acima.
const SEG_STRAIGHT_IN = BUS_X - R - LOGOS_RIGHT;
const SEG_CURVE = (Math.PI / 2) * R;
const SEG_VERTICAL = (AXIS - R) - (TOP_Y + R);
const SEG_TO_CARD = DESKTOP_MOCK.x - (BUS_X + R);
const PATH_TOTAL = SEG_STRAIGHT_IN + SEG_CURVE + SEG_VERTICAL + SEG_CURVE + SEG_TO_CARD;
const MERGE_FRACTION = (SEG_STRAIGHT_IN + SEG_CURVE + SEG_VERTICAL + SEG_CURVE) / PATH_TOTAL;
const HUB_CENTER_FRACTION = MERGE_FRACTION + (HUB_X - (BUS_X + R)) / PATH_TOTAL;

// Duração do ciclo do facho e os MESMOS pontos tempo↔distância do
// @keyframes cm-flow-merge (em index.css — precisam ficar idênticos aos de
// lá) — usados aqui só para calcular em que INSTANTE (não fração de
// distância) o facho realmente cruza o hub, e disparar o glint nesse exato
// momento.
const FLOW_DURATION = 2.6;
const MERGE_KEYFRAME_STOPS: Array<[time: number, dist: number]> = [
  [0, 0], [0.10, 0.02], [0.30, 0.07], [0.45, 0.15], [0.52, 0.25],
  [0.58, 0.373], [0.68, 0.55], [0.80, 0.75], [0.92, 0.92], [1, 1],
];
function distanceFractionToTimeFraction(dist: number): number {
  for (let i = 0; i < MERGE_KEYFRAME_STOPS.length - 1; i++) {
    const [t0, d0] = MERGE_KEYFRAME_STOPS[i];
    const [t1, d1] = MERGE_KEYFRAME_STOPS[i + 1];
    if (dist <= d1) return t0 + ((dist - d0) / (d1 - d0)) * (t1 - t0);
  }
  return 1;
}
const HUB_GLINT_DELAY = FLOW_DURATION * distanceFractionToTimeFraction(HUB_CENTER_FRACTION);

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
// Hairline estática + um único traço nítido pulsando (sem bloom/glow).
// `pathLength={1}` normaliza o comprimento, então o dasharray trabalha em
// fração do caminho e o mesmo componente serve para traçados diferentes.
//
// Sincronismo: os 2 traçados (FULL_PATH_TOP/BOT, cada um já indo até o card)
// usam o MESMO `cm-flow-merge`, mesma duração, delay 0 — como os dois
// desenham exatamente o mesmo trecho final (a curva de fusão os leva ao
// mesmo ponto, e dali em diante o "H" é idêntico nos dois), eles não só
// chegam juntos: passam a se sobrepor pixel a pixel no resto do percurso,
// lendo como um único facho — nunca existe um terceiro traçado de saída.

function FlowLine({ d, animated }: { d: string; animated: boolean }) {
  return (
    <>
      <path d={d} fill="none" stroke="rgba(19,40,64,0.12)" strokeWidth={1} strokeLinecap="round" />

      {animated && (
        <path
          d={d} fill="none" pathLength={1}
          stroke="url(#cmFlow)" strokeWidth={2} strokeLinecap="round"
          strokeDasharray="0.1 0.9"
          style={{ animation: `cm-flow-merge ${FLOW_DURATION}s linear infinite` }}
        />
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
// Reflexo premium: um brilho branco translúcido varre o CARD INTEIRO (fundo
// escuro + logo), não só o círculo — o overflow-hidden fica no card externo,
// e o glint é o último irmão dentro dele, por cima de tudo. Sincronizado com
// HUB_GLINT_DELAY (calculado a partir do keyframe do próprio facho), então o
// "toque" acontece exatamente quando o facho fundido cruza o hub — não é um
// pulso ambiente independente.

function Hub({ animated }: { animated: boolean }) {
  return (
    <motion.div
      className="absolute z-20"
      style={{ left: HUB_LEFT, top: AXIS - NODE / 2, width: NODE, height: NODE }}
      initial={animated ? { opacity: 0, scale: 0.82 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative w-full h-full rounded-[24px] flex items-center justify-center overflow-hidden"
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

        {animated && (
          <span
            aria-hidden="true"
            className="absolute inset-y-[-40%] w-[55%] pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(105deg, transparent 10%, rgba(255,255,255,0) 35%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0) 65%, transparent 90%)",
              animation: `cm-hub-glint ${FLOW_DURATION}s linear ${HUB_GLINT_DELAY}s infinite`,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

// ── DeviceMockups ────────────────────────────────────────────────────────────
// Onde antes ficavam dois cards de UI: um mockup desktop (moldura de vidro,
// mesma linguagem da Home) recebendo o facho na borda esquerda, com um
// mockup mobile flutuando sobre o canto superior direito. Telas vazias de
// propósito — espaço reservado para os prints reais entrarem depois.

function DeviceMockups({ animated }: { animated: boolean }) {
  return (
    <>
      {/* ── Desktop ──────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute z-10"
        style={{ left: DESKTOP_MOCK.x, top: DESKTOP_MOCK.y, width: DESKTOP_MOCK.w, height: DESKTOP_MOCK.h }}
        initial={animated ? { opacity: 0, x: 24, scale: 0.96 } : false}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="relative w-full h-full rounded-[20px] overflow-hidden bg-white"
          style={{
            boxShadow: "0 1px 2px rgba(19,40,64,0.04), 0 30px 60px -24px rgba(19,40,64,0.28)",
            border: "1px solid rgba(19,40,64,0.06)",
          }}
        >
          {/* Barra de janela — três pontinhos, mesmo registro "browser" do resto do site */}
          <div className="h-7 flex items-center gap-1.5 px-3.5 bg-[#f5f5f7] border-b border-black/[0.04]">
            <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <span className="w-2 h-2 rounded-full bg-[#28c840]" />
          </div>

          <div
            className="absolute inset-x-0 bottom-0 top-7 flex flex-col items-center justify-center gap-2 border-2 border-dashed"
            style={{ borderColor: "rgba(40,89,146,0.2)", background: "rgba(40,89,146,0.04)" }}
          >
            <Monitor className="w-6 h-6" style={{ color: "rgba(40,89,146,0.35)" }} strokeWidth={1.5} />
            <span className="text-[10.5px] font-medium px-6 text-center leading-snug" style={{ color: "rgba(40,89,146,0.45)" }}>
              Print do painel aqui
            </span>
          </div>

          {/* Brilho de chegada — acende na borda esquerda no instante exato em
              que o facho fundido termina o percurso ali (delay 0: o traçado
              alcança essa borda em t=100%, que é o mesmo instante que t=0% do
              próximo ciclo). */}
          {animated && (
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[3px] pointer-events-none"
              style={{
                background: "linear-gradient(180deg, transparent, #3a7bd5, transparent)",
                animation: `cm-screen-arrive ${FLOW_DURATION}s linear infinite`,
              }}
            />
          )}
        </div>
      </motion.div>

      {/* ── Mobile — flutua sobre o canto superior direito do desktop ─────── */}
      <motion.div
        className="absolute z-20"
        style={{ left: MOBILE_MOCK.x, top: MOBILE_MOCK.y, width: MOBILE_MOCK.w, height: MOBILE_MOCK.h }}
        initial={animated ? { opacity: 0, y: -16, scale: 0.94 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="w-full h-full rounded-[24px] p-[3px]"
          style={{
            background: "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(255,255,255,0.45))",
            boxShadow: "0 20px 44px -16px rgba(19,40,64,0.38)",
          }}
        >
          <div className="relative w-full h-full rounded-[21px] overflow-hidden bg-white ring-1 ring-black/5">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-7 h-[6px] rounded-full bg-black/70 z-10" />
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 border-2 border-dashed"
              style={{ borderColor: "rgba(40,89,146,0.22)", background: "rgba(40,89,146,0.04)" }}
            >
              <Smartphone className="w-4 h-4" style={{ color: "rgba(40,89,146,0.35)" }} strokeWidth={1.5} />
              <span className="text-[8px] font-medium text-center px-1.5 leading-snug" style={{ color: "rgba(40,89,146,0.45)" }}>
                Print mobile
              </span>
            </div>
          </div>
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

          <FlowLine d={FULL_PATH_TOP} animated={animated} />
          <FlowLine d={FULL_PATH_BOT} animated={animated} />
        </svg>

        {CHANNELS.map((ch, i) => (
          <ChannelCard key={ch.alt} ch={ch} index={i} animated={animated} />
        ))}

        <Hub animated={animated} />
        <DeviceMockups animated={animated} />
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
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const scale = useStageScale(stageWrapRef);
  const reduced = useReducedMotion();
  const animated = !reduced;
  const isDesktop = useIsDesktop();

  return (
    // ── Tudo dentro da mesma faixa degradê — resumo + diagrama integrados,
    // igual à Home (texto e mockup compartilham a mesma faixa azul). O CTA
    // vem depois, cavalgando a borda inferior da faixa. ────────────────────
    <GradientHero
      eyebrow={data.subtitulo}
      title={buildTitle(data.titulo)}
      subtitle={data.descricao}
      ctaLabel={data.ctaPrimario}
      onCtaClick={onCtaClick}
    >
      <div>
        {isDesktop ? (
          <Stage animated={animated} scale={scale} wrapRef={stageWrapRef} />
        ) : (
          <MobileFlow animated={animated} />
        )}
      </div>
    </GradientHero>
  );
}

export { HeroSection };
