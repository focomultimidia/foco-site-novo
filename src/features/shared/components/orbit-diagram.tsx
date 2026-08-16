"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, animate } from "framer-motion";

// ── OrbitDiagram ──────────────────────────────────────────────────────────────
// Extraído do OrbitSection (/sobre) pra ser reaproveitado onde só a animação
// (sem a metade de texto/copy daquela seção) faz sentido — hoje também no
// DiferenciaisSection da home, no lugar de um vídeo.

// ── Data ──────────────────────────────────────────────────────────────────────

// As duas órbitas mostram o mesmo tipo de coisa agora (logos de canais de
// distribuição), só em anéis diferentes — por isso um único formato de
// dado serve pras duas (a órbita externa usava texto+cor por marca antes;
// virou logo igual à interna, sem precisar de cor própria por item).
//
// `innerPartners`/`outerPartners` são props (default = canais de
// distribuição, uso original em /sobre e no DiferenciaisSection da home)
// pra o mesmo diagrama poder mostrar outro conjunto de parceiros noutro
// contexto — ex.: ImportanciaSection em /integracoes-hoteleiras, que usa
// os parceiros da própria página (marketing, canal de vendas, chatbot,
// adquirentes) em vez das OTAs. Qualquer contagem funciona: os ângulos vêm
// de cada item, não são fixos por posição.
interface OrbitPartner { id: string; label: string; logo: string; angle: number; }

const DEFAULT_INNER_PARTNERS: OrbitPartner[] = [
  { id: "booking", label: "Booking", logo: "/assets/imgs/channel-manager/icones-canais/booking.svg", angle: 0   },
  { id: "expedia", label: "Expedia", logo: "/assets/imgs/channel-manager/icones-canais/expedia.svg", angle: 90  },
  { id: "decolar", label: "Decolar", logo: "/assets/imgs/channel-manager/icones-canais/decolar.svg", angle: 180 },
  { id: "airbnb",  label: "Airbnb",  logo: "/assets/imgs/channel-manager/icones-canais/airbnb.svg",  angle: 270 },
];

const DEFAULT_OUTER_PARTNERS: OrbitPartner[] = [
  { id: "agoda",        label: "Agoda",        logo: "/assets/imgs/channel-manager/icones-canais/agoda.svg",       angle: 0   },
  { id: "google",       label: "Google",       logo: "/assets/imgs/channel-manager/icones-canais/google.svg",      angle: 72  },
  { id: "tripadvisor",  label: "TripAdvisor",  logo: "/assets/imgs/channel-manager/icones-canais/tripadvisor.svg", angle: 144 },
  { id: "trivago",      label: "Trivago",      logo: "/assets/imgs/channel-manager/icones-canais/trivago.svg",     angle: 216 },
  { id: "b2breservas",  label: "B2B Reservas", logo: "/assets/imgs/channel-manager/icones-canais/b2breservas.svg", angle: 288 },
];

// ── OrbitItem ─────────────────────────────────────────────────────────────────
// Cada item é dono do próprio ângulo (gira contínuo, independente dos
// outros) E do próprio hover — passar o mouse EM CIMA de um badge (não só
// no diagrama todo) pausa só aquele, escala e traz pra frente, e acende um
// raio que segue o ângulo REAL dele (não uma linha-guia fixa). Ao tirar o
// mouse, ele retoma de onde parou, na velocidade vigente do anel.
function OrbitItem({
  radiusPx, startAngle, durationSec, entranceDelay, children,
}: {
  radiusPx:      number;
  startAngle:    number;
  durationSec:   number;
  entranceDelay: number;
  children:      React.ReactNode;
}) {
  const angle = useMotionValue(startAngle);
  const x = useTransform(angle, a => Math.cos((a * Math.PI) / 180) * radiusPx);
  const y = useTransform(angle, a => Math.sin((a * Math.PI) / 180) * radiusPx);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const [itemHovered, setItemHovered] = useState(false);
  const itemHoveredRef = useRef(false);

  useEffect(() => { itemHoveredRef.current = itemHovered; }, [itemHovered]);

  useEffect(() => {
    const from = angle.get();
    const ctrl = animate(angle, from + 360, { duration: durationSec, repeat: Infinity, ease: "linear" });
    // Se a duração mudou (o anel acelerou/desacelerou no hover geral)
    // ENQUANTO este item específico estava pausado, a troca recria a
    // animação — sem isso ela nasceria tocando de novo e o item "escaparia"
    // do pause por baixo do cursor.
    if (itemHoveredRef.current) ctrl.pause();
    controlsRef.current = ctrl;
    return () => ctrl.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationSec]);

  useEffect(() => {
    if (itemHovered) controlsRef.current?.pause();
    else controlsRef.current?.play();
  }, [itemHovered]);

  return (
    <>
      {/* Raio "vivo" — só aparece enquanto ESTE badge está em hover, e
          acompanha o ângulo real dele (mesmo motion value do x/y), então
          sempre aponta exatamente pro badge, parado ou girando. */}
      <motion.div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 h-px origin-left pointer-events-none"
        style={{ width: radiusPx, rotate: angle, background: "linear-gradient(to right, rgba(40,89,146,0.75), rgba(40,89,146,0))" }}
        animate={{ opacity: itemHovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2"
        style={{ x, y, translateX: "-50%", translateY: "-50%", zIndex: itemHovered ? 40 : 15 }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: itemHovered ? 1.16 : 1 }}
        transition={{
          opacity: { duration: 0.5, delay: entranceDelay, ease: "easeOut" },
          scale: itemHovered
            ? { type: "spring", stiffness: 340, damping: 18 }
            : { type: "spring", stiffness: 220, damping: 16, delay: entranceDelay },
        }}
        onMouseEnter={() => setItemHovered(true)}
        onMouseLeave={() => setItemHovered(false)}
      >
        {children}
      </motion.div>
    </>
  );
}

// ── OrbitComet ────────────────────────────────────────────────────────────────
// Um ponto de luz que percorre o anel sozinho, mais rápido que os badges —
// reforça a leitura de "rede viva", não só objetos parados girando.
function OrbitComet({ radiusPx, durationSec, color }: { radiusPx: number; durationSec: number; color: string }) {
  const angle = useMotionValue(0);
  const x = useTransform(angle, a => Math.cos((a * Math.PI) / 180) * radiusPx);
  const y = useTransform(angle, a => Math.sin((a * Math.PI) / 180) * radiusPx);

  useEffect(() => {
    const ctrl = animate(angle, angle.get() + 360, { duration: durationSec, repeat: Infinity, ease: "linear" });
    return ctrl.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationSec]);

  return (
    <motion.div
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
      style={{
        x, y, translateX: "-50%", translateY: "-50%",
        width: 7, height: 7,
        background: color,
        boxShadow: `0 0 10px 2px ${color}, 0 0 3px 1px ${color}`,
      }}
    />
  );
}

// ── OrbitRing ─────────────────────────────────────────────────────────────────
// A trilha por trás dos badges — trocada do `border-dashed` estático (uma
// circunferência tracejada parada, só mudando de cor no hover: o "óbvio"
// de qualquer diagrama de órbita feito rápido) por uma pista de energia:
// um traço fraco e contínuo (o "trilho" sempre visível) por baixo, e por
// cima dele um traço tracejado que ESCOA sem parar (stroke-dashoffset
// animado até -circunferência, um laço perfeito) com um halo de
// drop-shadow — a mesma cor do cometa daquele anel, então cometa e trilho
// lêem como a mesma "energia" percorrendo o caminho.
function OrbitRing({
  radius, color, flowDuration, hovered,
}: {
  radius:       number;
  color:        string;
  flowDuration: number;
  hovered:      boolean;
}) {
  const size = radius * 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-visible"
      width={size}
      height={size}
      style={{ filter: `drop-shadow(0 0 ${hovered ? 7 : 4}px ${color}55)`, transition: "filter 0.4s ease" }}
    >
      {/* Trilho — sempre lá, marca o caminho mesmo quando o traço tracejado
          está numa fase "vazia" ali. */}
      <circle
        cx={radius} cy={radius} r={radius}
        fill="none" stroke={color} strokeWidth={1}
        opacity={hovered ? 0.22 : 0.12}
        style={{ transition: "opacity 0.4s ease" }}
      />
      {/* Energia escoando */}
      <motion.circle
        cx={radius} cy={radius} r={radius}
        fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round"
        strokeDasharray="2 15"
        opacity={hovered ? 0.95 : 0.62}
        animate={{ strokeDashoffset: [0, -circumference] }}
        transition={{ duration: flowDuration, repeat: Infinity, ease: "linear" }}
        style={{ transition: "opacity 0.4s ease" }}
      />
    </svg>
  );
}

// ── Spoke ─────────────────────────────────────────────────────────────────────
// Linhas-guia estáticas — acendem juntas quando o mouse entra no diagrama
// (não num badge específico; essa é a órbita toda "acordando").

function Spoke({ angle, length, visible }: { angle: number; length: number; visible: boolean }) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 h-px origin-left pointer-events-none"
      style={{ width: length, rotate: angle, background: "linear-gradient(to right, rgba(40,89,146,0.5), rgba(66,122,185,0.0))" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.38 }}
    />
  );
}

// ── OrbitDiagram ──────────────────────────────────────────────────────────────

interface OrbitDiagramProps {
  innerPartners?: OrbitPartner[];
  outerPartners?: OrbitPartner[];
}

function OrbitDiagram({
  innerPartners = DEFAULT_INNER_PARTNERS,
  outerPartners = DEFAULT_OUTER_PARTNERS,
}: OrbitDiagramProps) {
  const [hovered, setHovered] = useState(false);
  const innerDur   = hovered ? 10 : 24;
  const outerDur   = hovered ? 14 : 36;
  const cometInnerDur = innerDur * 0.4;
  const cometOuterDur = outerDur * 0.4;
  // Fluxo do traço tracejado — mais rápido que os cometas (que já são mais
  // rápidos que os badges), pra ficar nítido que são 3 camadas de
  // velocidade diferentes, não tudo girando junto no mesmo ritmo.
  const flowInnerDur = hovered ? 2.2 : 6;
  const flowOuterDur = hovered ? 4   : 11;
  const glowOpacity = useSpring(0, { stiffness: 180, damping: 22 });

  useEffect(() => { glowOpacity.set(hovered ? 1 : 0); }, [hovered, glowOpacity]);

  return (
    <div
      className="relative w-[420px] h-[420px] lg:w-[480px] lg:h-[480px] shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Anel externo com raio 190 (o mesmo da órbita externa). Ver
          comentário do OrbitRing acima — trocado do `border-dashed`
          estático por uma pista de energia escoando, cor por anel (marinho
          dentro, dourado fora) igual aos cometas. Com 80px de vão entre os
          raios (110 interno / 190 externo) contra os 56px de badge-a-badge
          (raio 28 cada, já que os badges viraram círculos com rounded-full)
          sobra ~24px de margem — nenhuma combinação de ângulo encosta. */}
      <OrbitRing radius={110} color="#285992" flowDuration={flowInnerDur} hovered={hovered} />
      <OrbitRing radius={190} color="#fccc30" flowDuration={flowOuterDur} hovered={hovered} />

      {innerPartners.map(p => <Spoke key={p.id}         angle={p.angle} length={110} visible={hovered} />)}
      {outerPartners.map(p => <Spoke key={`o${p.id}`}   angle={p.angle} length={190} visible={hovered} />)}

      {/* Cometas — um por anel, sempre visíveis, mais rápidos que os badges
          (0.4× a duração da volta). Azul-marinho no interno, dourado da
          marca no externo — a mesma dupla de cor do resto do site. */}
      <OrbitComet radiusPx={110} durationSec={cometInnerDur} color="#285992" />
      <OrbitComet radiusPx={190} durationSec={cometOuterDur} color="#fccc30" />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: 420, height: 420, background: "radial-gradient(circle, rgba(40,89,146,0.10) 0%, transparent 62%)", opacity: glowOpacity }}
      />

      {/* Centre: logo Foco — fundo claro (era o gradiente marinho com "F" em
          texto) porque o SVG da marca já tem o azul-marinho na própria
          forma; sobre um fundo marinho essa parte do desenho sumia. Sem
          nenhum brilho/anel atrás agora — só o badge, maior, respirando
          sozinho via o próprio scale. */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center p-3"
          style={{ boxShadow: "0 12px 40px rgba(40,89,146,0.22)", border: "1px solid rgba(40,89,146,0.12)" }}
          animate={{ scale: hovered ? 1.1 : [1, 1.05, 1] }}
          transition={hovered ? { type: "spring", stiffness: 300, damping: 20 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src="/assets/imgs/channel-manager/icones-canais/foco.svg"
            alt="Foco Tecnologia"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>

      {/* Inner orbit */}
      {innerPartners.map((p, i) => (
        <OrbitItem key={p.id} radiusPx={110} startAngle={p.angle} durationSec={innerDur} entranceDelay={0.1 + i * 0.08}>
          <motion.div className="w-14 h-14 rounded-full flex items-center justify-center p-2"
            style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(30,58,95,0.07)" }}
            animate={hovered ? { boxShadow: "0 12px 40px rgba(40,89,146,0.14), 0 0 0 1.5px rgba(40,89,146,0.22)" } : {}}
            transition={{ duration: 0.35 }}>
            <img src={p.logo} alt={p.label} width={281} height={70} loading="lazy" decoding="async" className="w-full h-full object-contain" />
          </motion.div>
        </OrbitItem>
      ))}

      {/* Outer orbit — raio 190: ver comentário nos anéis tracejados acima
          sobre o vão contra o anel interno. Mesmo tratamento visual da
          órbita interna (badge branco + logo), já que agora as duas mostram
          o mesmo tipo de coisa. */}
      {outerPartners.map((p, i) => (
        <OrbitItem key={p.id} radiusPx={190} startAngle={p.angle} durationSec={outerDur} entranceDelay={0.45 + i * 0.07}>
          <motion.div className="w-14 h-14 rounded-full flex items-center justify-center p-2"
            style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(30,58,95,0.07)" }}
            animate={hovered ? { boxShadow: "0 12px 40px rgba(40,89,146,0.14), 0 0 0 1.5px rgba(40,89,146,0.22)" } : {}}
            transition={{ duration: 0.35 }}>
            <img src={p.logo} alt={p.label} width={281} height={70} loading="lazy" decoding="async" className="w-full h-full object-contain" />
          </motion.div>
        </OrbitItem>
      ))}
    </div>
  );
}

export { OrbitDiagram };
export type { OrbitPartner };
