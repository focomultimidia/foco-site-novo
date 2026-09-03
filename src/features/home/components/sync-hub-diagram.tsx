"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion, animate } from "framer-motion";

// ── SyncHubDiagram ──────────────────────────────────────────────────────────
// Peça central do DiferenciaisSection (home) — de propósito NÃO é o
// OrbitDiagram (anéis girando, usado em /sobre e /integracoes-hoteleiras).
// Aqui o hub Foco fica fixo e dispara, canal a canal, um pulso de luz que
// viaja por um fio curvo até o badge — que "ecoa" (anel + leve zoom) no
// instante exato em que o pulso chega. A metáfora é literal ao argumento de
// venda da seção: uma atualização no painel, sincronizada em tempo real em
// cada canal — não "vários logos girando ao redor de um centro" (que já é a
// linguagem visual usada noutras duas páginas).

// ── Dados ─────────────────────────────────────────────────────────────────────

interface ChannelNode {
  id: string;
  label: string;
  logo: string;
  /** 0 = direita, cresce em sentido horário (mesma convenção do OrbitDiagram). */
  angleDeg: number;
  /** Distância do centro do hub até o centro do badge. */
  radius: number;
  /** Cor do fio/pulso deste canal — alterna as duas cores da marca. */
  color: string;
}

// Canvas fixo (ver `orbitScale` abaixo pra como isso vira responsivo) —
// desenhado como um "asterisco" de 6 pontas com raio alternado (perto/longe)
// em vez do círculo perfeito do OrbitDiagram, pra não repetir a mesma forma.
const CANVAS = 500;
const CENTER = CANVAS / 2;
const HUB_RADIUS = 56;
const NODE_RADIUS = 28;
const WIRE_START = HUB_RADIUS + 6;

const NODES: ChannelNode[] = [
  { id: "booking", label: "Booking.com", logo: "/assets/imgs/channel-manager/icones-canais/booking.svg", angleDeg: -90,  radius: 148, color: "#285992" },
  { id: "expedia", label: "Expedia",     logo: "/assets/imgs/channel-manager/icones-canais/expedia.svg", angleDeg: -30,  radius: 190, color: "#c9992c" },
  { id: "decolar", label: "Decolar",     logo: "/assets/imgs/channel-manager/icones-canais/decolar.svg", angleDeg: 30,   radius: 148, color: "#285992" },
  { id: "airbnb",  label: "Airbnb",      logo: "/assets/imgs/channel-manager/icones-canais/airbnb.svg",  angleDeg: 90,   radius: 190, color: "#c9992c" },
  { id: "google",  label: "Google",      logo: "/assets/imgs/channel-manager/icones-canais/google.svg",  angleDeg: 150,  radius: 148, color: "#285992" },
  { id: "agoda",   label: "Agoda",       logo: "/assets/imgs/channel-manager/icones-canais/agoda.svg",   angleDeg: -150, radius: 190, color: "#c9992c" },
];

function pointAt(angleDeg: number, radius: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(a) * radius, y: Math.sin(a) * radius };
}

// Ponto de controle da curva quadrática — gira alguns graus a mais que os
// extremos, então o fio nasce quase reto perto do hub e vai curvando até o
// canal, como um traço desenhado à mão em vez de uma régua.
function controlPoint(angleDeg: number, r0: number, r2: number) {
  return pointAt(angleDeg + 15, (r0 + r2) / 2);
}

function quadBezier(t: number, p0: number, p1: number, p2: number) {
  const mt = 1 - t;
  return mt * mt * p0 + 2 * mt * t * p1 + t * t * p2;
}

// ── ChannelLink ───────────────────────────────────────────────────────────────
// Um canal = 1 fio estático (desenhado pelo pai, no <svg> compartilhado) + 1
// pulso de luz que percorre esse fio em loop + 1 badge que ecoa quando o
// pulso chega. As 4 animações (posição do pulso, zoom do badge, opacidade e
// escala do anel de chegada) compartilham o MESMO relógio (delay + duração
// do ciclo), calculado uma vez por nó — por isso vivem todas neste
// componente, não espalhadas em hooks separados que perderiam a sincronia.
function ChannelLink({ node, index, hovered, reduceMotion }: {
  node:         ChannelNode;
  index:        number;
  hovered:      boolean;
  reduceMotion: boolean;
}) {
  const pos = pointAt(node.angleDeg, node.radius);
  const p0  = pointAt(node.angleDeg, WIRE_START);
  const r2  = node.radius - NODE_RADIUS - 2;
  const p2  = pointAt(node.angleDeg, r2);
  const p1  = controlPoint(node.angleDeg, WIRE_START, r2);

  const t           = useMotionValue(0);
  const nodeScale    = useMotionValue(1);
  const ringScale    = useMotionValue(1);
  const ringOpacity  = useMotionValue(0);

  const px = useTransform(t, (v) => quadBezier(v, p0.x, p1.x, p2.x));
  const py = useTransform(t, (v) => quadBezier(v, p0.y, p1.y, p2.y));
  const packetOpacity = useTransform(t, [0, 0.08, 0.82, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (reduceMotion) return;

    // Cascata: cada canal dispara um pouco depois do anterior (efeito
    // "onda", não simultâneo) — no hover, tudo acelera e a onda fica mais
    // apertada, reforçando a ideia de "sob controle, em tempo real".
    const travel    = hovered ? 0.65 : 1.15;
    const rest       = hovered ? 0.55 : 1.35;
    const cycle      = travel + rest;
    const stepDelay  = hovered ? 0.14 : 0.28;
    const delay      = index * stepDelay;
    const arrive     = travel / cycle;

    const controls = [
      animate(t, [0, 1], {
        duration: travel, delay, repeat: Infinity, repeatDelay: rest, ease: [0.4, 0, 0.2, 1],
      }),
      animate(nodeScale, [1, 1, 1.2, 1.04, 1], {
        times: [0, Math.max(arrive - 0.05, 0), arrive, Math.min(arrive + 0.08, 1), 1],
        duration: cycle, delay, repeat: Infinity, ease: "easeOut",
      }),
      animate(ringOpacity, [0, 0, 0.85, 0, 0], {
        times: [0, Math.max(arrive - 0.03, 0), arrive, Math.min(arrive + 0.16, 1), 1],
        duration: cycle, delay, repeat: Infinity, ease: "easeOut",
      }),
      animate(ringScale, [1, 1, 1, 1.55, 1.55], {
        times: [0, Math.max(arrive - 0.03, 0), arrive, Math.min(arrive + 0.16, 1), 1],
        duration: cycle, delay, repeat: Infinity, ease: "easeOut",
      }),
    ];
    return () => controls.forEach((c) => c.stop());
  }, [hovered, reduceMotion, index, t, nodeScale, ringOpacity, ringScale]);

  return (
    <>
      {/* Pulso de luz viajando pelo fio até o canal */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
          style={{
            x: px, y: py, translateX: "-50%", translateY: "-50%",
            width: 7, height: 7,
            background: node.color,
            opacity: packetOpacity,
            boxShadow: `0 0 10px 2px ${node.color}, 0 0 3px 1px ${node.color}`,
          }}
        />
      )}

      {/* Badge do canal */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-14 h-14"
        style={{ x: pos.x, y: pos.y, translateX: "-50%", translateY: "-50%" }}
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.25 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ border: `1.5px solid ${node.color}`, scale: ringScale, opacity: ringOpacity }}
        />
        <motion.div
          className="relative w-14 h-14 rounded-full flex items-center justify-center p-2.5"
          style={{
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.95)",
            boxShadow: "0 8px 28px rgba(30,58,95,0.10)",
            scale: nodeScale,
          }}
          animate={hovered ? { boxShadow: "0 12px 36px rgba(40,89,146,0.14), 0 0 0 1.5px rgba(40,89,146,0.22)" } : {}}
          transition={{ duration: 0.35 }}
        >
          <img
            src={node.logo}
            alt={node.label}
            width={281}
            height={70}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </motion.div>
    </>
  );
}

// ── SyncHubDiagram ────────────────────────────────────────────────────────────

function SyncHubDiagram() {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  // Mesma técnica de escala fluida do OrbitDiagram: o conteúdo é desenhado
  // em coordenadas fixas (canvas 500×500) e escalado via `transform: scale()`
  // pra caber na largura real do wrapper — necessário pra não vazar em
  // colunas mais estreitas que 500px (a maioria dos breakpoints).
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const sync = () => {
      const w = el.offsetWidth;
      if (w > 0) setScale(Math.min(1, w / CANVAS));
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full max-w-[440px] lg:max-w-[500px] aspect-square shrink-0">
      <div
        className="absolute"
        style={{
          width: CANVAS, height: CANVAS, top: "50%", left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Fios — traço fixo, quase invisível; a "energia" mora no pulso que
            viaja por cima (ver ChannelLink), não no traço em si. */}
        <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none">
          <g transform={`translate(${CENTER} ${CENTER})`}>
            {NODES.map((n) => {
              const r2 = n.radius - NODE_RADIUS - 2;
              const p0 = pointAt(n.angleDeg, WIRE_START);
              const p2 = pointAt(n.angleDeg, r2);
              const p1 = controlPoint(n.angleDeg, WIRE_START, r2);
              return (
                <path
                  key={n.id}
                  d={`M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`}
                  fill="none"
                  stroke={n.color}
                  strokeWidth={1.25}
                  strokeLinecap="round"
                  opacity={hovered ? 0.3 : 0.16}
                  style={{ transition: "opacity 0.3s ease" }}
                />
              );
            })}
          </g>
        </svg>

        {/* Glow ambiente atrás do hub — some quase todo fora do hover, só
            pra dar profundidade ao badge central, não é decoração solta. */}
        <motion.div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: 220, height: 220, background: "radial-gradient(circle, rgba(40,89,146,0.12) 0%, transparent 65%)" }}
          animate={{ opacity: hovered ? 1 : 0.55 }}
          transition={{ duration: 0.4 }}
        />

        {/* Hub — sonar duplo (dois anéis expandindo em defasagem) reforça a
            leitura de "transmitindo", sem depender do cronômetro exato dos
            pulsos por canal. */}
        {!reduceMotion && (
          <>
            <motion.div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{ width: HUB_RADIUS * 2, height: HUB_RADIUS * 2, border: "1.5px solid #285992" }}
              animate={{ scale: [1, 1.9], opacity: [0.42, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{ width: HUB_RADIUS * 2, height: HUB_RADIUS * 2, border: "1.5px solid #285992" }}
              animate={{ scale: [1, 1.9], opacity: [0.42, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
            />
          </>
        )}

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full bg-white flex items-center justify-center p-4"
          style={{ width: HUB_RADIUS * 2, height: HUB_RADIUS * 2, boxShadow: "0 12px 40px rgba(40,89,146,0.22)", border: "1px solid rgba(40,89,146,0.12)" }}
          animate={{ scale: reduceMotion ? 1 : hovered ? 1.08 : [1, 1.045, 1] }}
          transition={hovered ? { type: "spring", stiffness: 300, damping: 20 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src="/assets/imgs/channel-manager/icones-canais/foco.svg"
            alt="Foco Tecnologia"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Selo "tempo real" — mesma linguagem textual do painel na hero
            (/home), reforça a mesma promessa em dois pontos da página. */}
        <motion.div
          className="absolute top-1/2 left-1/2 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 shadow-md border border-white/70 whitespace-nowrap"
          style={{ x: "-50%", y: HUB_RADIUS + 18 }}
          initial={{ opacity: 0, y: HUB_RADIUS + 10 }}
          whileInView={{ opacity: 1, y: HUB_RADIUS + 18 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="relative flex h-1.5 w-1.5">
            {!reduceMotion && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 motion-safe:animate-ping opacity-60" />
            )}
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="text-[10.5px] font-medium text-slate-700">Sincronizado em tempo real</span>
        </motion.div>

        {NODES.map((n, i) => (
          <ChannelLink key={n.id} node={n} index={i} hovered={hovered} reduceMotion={reduceMotion} />
        ))}
      </div>
    </div>
  );
}

export { SyncHubDiagram };
