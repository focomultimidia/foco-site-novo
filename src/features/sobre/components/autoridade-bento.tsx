"use client";

/**
 * BentoNetworkSection — mesma superfície clara de sempre (`#f4f7fb`, ver
 * `Section`/`SectionHeader` em motion-primitives.tsx, intocados aqui); só
 * os CARDS mudam de material. Em vez do branco padrão de dashboard, viram
 * placas de ônix — o mesmo gradiente navy + halo dourado do EliteBadgeCard
 * (ver parceiros-elite-section.tsx: "linear-gradient(155deg, #1c3c5e 0%,
 * #0d1d33 100%)" + halo `rgba(252,204,48,...)"), as duas únicas cores reais
 * da logo da Foco (azul #2d5189, dourado #f1c930). Cinco placas escuras
 * flutuando sobre o papel claro — contraste, não mistura.
 */

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useInView,
  type Variants,
  type MotionValue,
} from "framer-motion";
import { Clock, TrendingUp, Sparkles, MapPin, Award } from "lucide-react";
import { SectionHeader, AnimatedCounter } from "./motion-primitives";

// ── Stagger variants ──────────────────────────────────────────────────────────

const bentoContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const bentoItem: Variants = {
  hidden:  { opacity: 0, y: 24, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, damping: 20, stiffness: 100 } },
};

// ── BentoCard ─────────────────────────────────────────────────────────────────
// Placa de ônix — mesmo gradiente + halo do EliteBadgeCard (home), não um
// tratamento novo inventado pra esta seção. Shine (gradiente que segue o
// cursor) + tilt ±3° seguem idênticos ao card branco original, só o
// acabamento vira vidro escuro em vez de superfície clara.

function BentoCard({
  children, className = "", magnetic = false, onMouseNorm,
}: {
  children:     React.ReactNode;
  className?:   string;
  magnetic?:    boolean;
  onMouseNorm?: (nx: number, ny: number) => void;
}) {
  const ref     = useRef<HTMLDivElement>(null);
  const rotX    = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });
  const rotY    = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });
  const shineX  = useMotionValue(50);
  const shineY  = useMotionValue(50);
  const shineOp = useSpring(0, { stiffness: 200, damping: 24 });
  const liftY   = useSpring(0, { stiffness: 420, damping: 22 });
  const shineBg = useMotionTemplate`radial-gradient(ellipse 75% 45% at ${shineX}% ${shineY}%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 50%, transparent 68%)`;

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const nx = (e.clientX - left) / width;
    const ny = (e.clientY - top)  / height;
    rotY.set((nx - 0.5) *  6);
    rotX.set((ny - 0.5) * -6);
    shineX.set(20 + nx * 60);
    shineY.set(20 + ny * 60);
    onMouseNorm?.(nx, ny);
  }
  function onMouseEnter() { shineOp.set(1); if (magnetic) liftY.set(-5); }
  function onMouseLeave() { shineOp.set(0); rotX.set(0); rotY.set(0); if (magnetic) liftY.set(0); }

  return (
    <motion.div
      ref={ref}
      variants={bentoItem}
      className={`relative rounded-[1.75rem] will-change-transform cursor-default group ${className}`}
      style={{
        rotateX: rotX, rotateY: rotY, y: liftY,
        transformPerspective: 900,
        boxShadow: "0 24px 50px -22px rgba(13,29,51,0.42), 0 0 0 1px rgba(252,204,48,0.12)",
      }}
      whileHover={{ boxShadow: "0 34px 64px -22px rgba(13,29,51,0.5), 0 0 0 1px rgba(252,204,48,0.22)" }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Camada de recorte separada da sombra (mesmo motivo do
          EliteBadgeCard): o halo e o shine precisam de overflow-hidden pra
          serem cortados pelos cantos arredondados, mas se isso vivesse no
          MESMO nó do boxShadow acima, cortaria a própria sombra externa. */}
      <div
        className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/10"
        style={{ background: "linear-gradient(155deg, #1c3c5e 0%, #0d1d33 100%)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(252,204,48,0.22), transparent 70%)" }}
        />
        {children}
        <motion.div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: shineBg, opacity: shineOp }} />
      </div>
    </motion.div>
  );
}

// ── BrazilDotMap ──────────────────────────────────────────────────────────────
// Matriz de pontos dourados clipada no contorno do Brasil — os 4 nós
// pulsantes marcam concentrações reais de operação, literalizando "A Rede
// Foco": não é só um mapa estático, é a rede respirando.

const NETWORK_HUBS = [
  { x: 58, y: 68 },
  { x: 68, y: 40 },
  { x: 45, y: 42 },
  { x: 52, y: 84 },
];

function BrazilDotMap({
  parallaxX, parallaxY,
}: {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}) {
  const sx = useSpring(parallaxX, { stiffness: 55, damping: 18 });
  const sy = useSpring(parallaxY, { stiffness: 55, damping: 18 });

  return (
    <motion.div
      aria-hidden
      className="absolute -right-4 bottom-0 w-[52%] h-[82%] pointer-events-none select-none"
      style={{ x: sx, y: sy }}
    >
      <svg viewBox="0 0 100 120" className="w-full h-full">
        <defs>
          <pattern id="bento-brazil-dots" x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="3.5" cy="3.5" r="1.2" fill="#fccc30" fillOpacity="0.34" />
          </pattern>
          <clipPath id="bento-brazil-clip">
            <polygon points="35,6 42,8 55,10 67,15 78,22 87,31 93,40 91,48 87,56 83,64 78,74 71,82 63,90 55,95 46,97 37,94 28,88 21,81 16,72 14,63 13,54 14,46 16,38 20,30 25,22 30,15" />
          </clipPath>
        </defs>
        <rect width="100" height="120" fill="url(#bento-brazil-dots)" clipPath="url(#bento-brazil-clip)" />
        <g clipPath="url(#bento-brazil-clip)">
          {NETWORK_HUBS.map((hub, i) => (
            <g key={i}>
              <circle cx={hub.x} cy={hub.y} r={1.3} fill="#fccc30" />
              <motion.circle
                cx={hub.x} cy={hub.y} fill="none" stroke="#fccc30" strokeWidth={0.5}
                initial={{ r: 1.3, opacity: 0.7 }}
                animate={{ r: [1.3, 7], opacity: [0.7, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: i * 0.55 }}
              />
            </g>
          ))}
        </g>
      </svg>
    </motion.div>
  );
}

// ── GrowthLine ────────────────────────────────────────────────────────────────

function GrowthLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "-60px" });
  const PATH   = "M 4,48 C 15,44 28,40 42,33 S 68,22 88,14 S 115,6 138,3";

  return (
    <svg ref={svgRef} viewBox="0 0 140 52" fill="none" aria-hidden className="w-full mt-4">
      <defs>
        <linearGradient id="bento-line-grad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#6ea8e6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#a9cdf5" />
        </linearGradient>
        <linearGradient id="bento-area-grad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#6ea8e6" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#6ea8e6" stopOpacity="0"    />
        </linearGradient>
      </defs>
      <motion.path d={`${PATH} L 138,52 L 4,52 Z`} fill="url(#bento-area-grad)"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 1.5 }} />
      <motion.path d={PATH} stroke="url(#bento-line-grad)" strokeWidth="2.2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }} />
      <motion.g initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 320, damping: 18, delay: 2.1 }}
        style={{ transformOrigin: "138px 3px" }}>
        <circle cx="138" cy="3" r="5" fill="#a9cdf5" fillOpacity="0.3" />
        <circle cx="138" cy="3" r="3" fill="#a9cdf5" />
      </motion.g>
    </svg>
  );
}

// ── StatTag / StatIcon — só as duas cores da marca (dourado #fccc30,
//    azul #6ea8e6 — o mesmo azul claro do EliteBadgeCard), alternadas por
//    card. Nada de paleta arco-íris: é "as cores da logo", não "uma cor
//    por card". ──────────────────────────────────────────────────────────

const GOLD = "#fccc30";
const BLUE = "#6ea8e6";

function StatTag({
  icon: Icon, color, label,
}: {
  icon:  React.ComponentType<{ className?: string; strokeWidth?: number }>;
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-14 h-14 rounded-3xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ background: `${color}1f`, color, boxShadow: `0 0 0 1px ${color}33` }}
      >
        <Icon className="w-7 h-7" strokeWidth={1.6} />
      </div>
      <span
        className="text-[10px] font-bold tracking-widest uppercase rounded-full px-2.5 py-1"
        style={{ color, background: `${color}1a` }}
      >
        {label}
      </span>
    </div>
  );
}

function StatIcon({ icon: Icon, color }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; color: string }) {
  return (
    <div
      className="w-14 h-14 rounded-3xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
      style={{ background: `${color}1f`, color, boxShadow: `0 0 0 1px ${color}33` }}
    >
      <Icon className="w-7 h-7" strokeWidth={1.6} />
    </div>
  );
}

// ── BentoNetworkSection ───────────────────────────────────────────────────────

export function BentoNetworkSection() {
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  return (
    <section className="py-24 lg:py-32 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="A Rede Foco"
          title="Os números que definem"
          titleHighlight="nossa autoridade."
          subtitle="+20 anos de mercado, +2.700 estabelecimentos ativos e suporte que nunca dorme. Esses não são marcos, são compromissos."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto"
          variants={bentoContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* +2.700 — anchor card */}
          <BentoCard
            className="md:col-span-2 min-h-[300px]"
            onMouseNorm={(nx, ny) => { dotX.set((nx - 0.5) * 18); dotY.set((ny - 0.5) * 10); }}
          >
            <div className="relative z-10 h-full p-8 lg:p-10 flex flex-col justify-between">
              <BrazilDotMap parallaxX={dotX} parallaxY={dotY} />
              <div className="relative z-10">
                <StatTag icon={MapPin} color={GOLD} label="Presença Nacional" />
                <div className="font-display text-[5.5rem] sm:text-[6.5rem] font-bold leading-none tracking-tighter bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
                  <AnimatedCounter value={2700} prefix="+" />
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-base font-semibold text-white mb-0.5">Hotéis, pousadas e aluguéis</p>
                <p className="text-sm text-white/55">estabelecimentos ativos em todo o Brasil</p>
              </div>
            </div>
          </BentoCard>

          {/* +20 Anos */}
          <BentoCard className="min-h-[300px]">
            <div className="relative z-10 h-full p-8 flex flex-col justify-between">
              <div>
                <StatTag icon={Award} color={BLUE} label="Trajetória" />
                <div className="font-display text-[5.5rem] font-bold text-white leading-none tracking-tighter">
                  <AnimatedCounter value={20} prefix="+" />
                </div>
                <p className="text-base font-semibold text-white mt-2 mb-0.5">Anos de inovação</p>
                <p className="text-sm text-white/55">ininterrupta em hotelaria</p>
              </div>
              <GrowthLine />
            </div>
          </BentoCard>

          {/* 365 Dias */}
          <BentoCard magnetic className="min-h-[190px]">
            <div className="relative z-10 h-full p-7 flex flex-col gap-6">
              <StatIcon icon={Clock} color={BLUE} />
              <div>
                <div className="font-display text-5xl lg:text-6xl font-bold text-white leading-none tracking-tighter mb-1.5">
                  <AnimatedCounter value={365} />
                </div>
                <p className="text-sm font-semibold text-white mb-0.5">Dias de suporte</p>
                <p className="text-xs text-white/55">Sem pausas, sem exceções</p>
              </div>
            </div>
          </BentoCard>

          {/* < 2 min */}
          <BentoCard magnetic className="min-h-[190px]">
            <div className="relative z-10 h-full p-7 flex flex-col gap-6">
              <StatIcon icon={TrendingUp} color={GOLD} />
              <div>
                <div className="font-display text-5xl lg:text-6xl font-bold text-white leading-none tracking-tighter mb-1.5">
                  {"< 2 min"}
                </div>
                <p className="text-sm font-semibold text-white mb-0.5">Resposta média</p>
                <p className="text-xs text-white/55">Suporte humano e ágil</p>
              </div>
            </div>
          </BentoCard>

          {/* 97% */}
          <BentoCard magnetic className="min-h-[190px]">
            <div className="relative z-10 h-full p-7 flex flex-col gap-6">
              <StatIcon icon={Sparkles} color={BLUE} />
              <div>
                <div className="font-display text-5xl lg:text-6xl font-bold text-white leading-none tracking-tighter mb-1.5">
                  <AnimatedCounter value={97} suffix="%" />
                </div>
                <p className="text-sm font-semibold text-white mb-0.5">Satisfação</p>
                <p className="text-xs text-white/55">Em avaliações de suporte</p>
              </div>
            </div>
          </BentoCard>
        </motion.div>
      </div>
    </section>
  );
}
