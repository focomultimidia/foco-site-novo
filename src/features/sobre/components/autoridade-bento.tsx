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
// Shine (cursor-tracking gradient) + ±3° tilt + optional magnetic lift.

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
  const shineBg = useMotionTemplate`radial-gradient(ellipse 75% 45% at ${shineX}% ${shineY}%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.12) 50%, transparent 68%)`;

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
      className={`relative rounded-[1.75rem] overflow-hidden bg-white cursor-default group ${className}`}
      style={{
        rotateX: rotX, rotateY: rotY, y: liftY,
        transformPerspective: 900,
        border:    "1px solid rgba(226,232,240,0.70)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.03), 0 8px 30px rgba(0,0,0,0.04)",
      }}
      whileHover={{ boxShadow: "0 4px 8px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.07), 0 48px 80px -20px rgba(30,58,95,0.10)" }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
      <motion.div aria-hidden className="absolute inset-0 pointer-events-none rounded-[1.75rem]"
        style={{ background: shineBg, opacity: shineOp }} />
    </motion.div>
  );
}

// ── BrazilDotMap ──────────────────────────────────────────────────────────────
// Dot-matrix SVG clipped to Brazil's polygon, driven by parallax MotionValues.

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
            <circle cx="3.5" cy="3.5" r="1.2" fill="rgb(148,163,184)" fillOpacity="0.40" />
          </pattern>
          <clipPath id="bento-brazil-clip">
            <polygon points="35,6 42,8 55,10 67,15 78,22 87,31 93,40 91,48 87,56 83,64 78,74 71,82 63,90 55,95 46,97 37,94 28,88 21,81 16,72 14,63 13,54 14,46 16,38 20,30 25,22 30,15" />
          </clipPath>
        </defs>
        <rect width="100" height="120" fill="url(#bento-brazil-dots)" clipPath="url(#bento-brazil-clip)" />
      </svg>
    </motion.div>
  );
}

// ── GrowthLine ────────────────────────────────────────────────────────────────
// SVG path drawn left-to-right (pathLength 0→1) on whileInView.

function GrowthLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "-60px" });
  const PATH   = "M 4,48 C 15,44 28,40 42,33 S 68,22 88,14 S 115,6 138,3";

  return (
    <svg ref={svgRef} viewBox="0 0 140 52" fill="none" aria-hidden className="w-full mt-4">
      <defs>
        <linearGradient id="bento-line-grad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#285992" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#427ab9" />
        </linearGradient>
        <linearGradient id="bento-area-grad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#285992" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#285992" stopOpacity="0"    />
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
        <circle cx="138" cy="3" r="5" fill="#427ab9" fillOpacity="0.18" />
        <circle cx="138" cy="3" r="3" fill="#427ab9" />
      </motion.g>
    </svg>
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
          subtitle="16 anos de mercado, +2.800 estabelecimentos ativos e suporte que nunca dorme. Esses não são marcos, são compromissos."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto"
          variants={bentoContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* +2.800 — anchor card */}
          <BentoCard
            className="md:col-span-2 min-h-[300px] p-8 lg:p-10 flex flex-col justify-between"
            onMouseNorm={(nx, ny) => { dotX.set((nx - 0.5) * 18); dotY.set((ny - 0.5) * 10); }}
          >
            <BrazilDotMap parallaxX={dotX} parallaxY={dotY} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-3xl bg-[#285992]/8 flex items-center justify-center text-[#285992]/55 group-hover:text-[#285992] group-hover:bg-[#285992]/12 transition-colors duration-300">
                  <MapPin className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#285992] bg-[#285992]/8 rounded-full px-2.5 py-1">
                  Presença Nacional
                </span>
              </div>
              <div className="font-display text-[5.5rem] sm:text-[6.5rem] font-bold text-slate-900 leading-none tracking-tighter">
                <AnimatedCounter value={1300} prefix="+" />
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-base font-semibold text-slate-800 mb-0.5">Hotéis, pousadas e aluguéis</p>
              <p className="text-sm text-slate-500">estabelecimentos ativos em todo o Brasil</p>
            </div>
          </BentoCard>

          {/* 16 Anos */}
          <BentoCard className="min-h-[300px] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-3xl bg-[#0f766e]/8 flex items-center justify-center text-[#0f766e]/55 group-hover:text-[#0f766e] group-hover:bg-[#0f766e]/12 transition-colors duration-300">
                  <Award className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#0f766e] bg-[#0f766e]/8 rounded-full px-2.5 py-1">
                  Trajetória
                </span>
              </div>
              <div className="font-display text-[5.5rem] font-bold text-slate-900 leading-none tracking-tighter">
                <AnimatedCounter value={16} />
              </div>
              <p className="text-base font-semibold text-slate-800 mt-2 mb-0.5">Anos de inovação</p>
              <p className="text-sm text-slate-500">ininterrupta em hotelaria</p>
            </div>
            <GrowthLine />
          </BentoCard>

          {/* 365 Dias */}
          <BentoCard magnetic className="p-7 flex flex-col gap-6 min-h-[190px]">
            <div className="w-14 h-14 rounded-3xl bg-[#285992]/8 flex items-center justify-center text-[#285992]/55 group-hover:text-[#285992] group-hover:bg-[#285992]/12 transition-colors duration-300">
              <Clock className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-display text-5xl lg:text-6xl font-bold text-slate-900 leading-none tracking-tighter mb-1.5">
                <AnimatedCounter value={365} />
              </div>
              <p className="text-sm font-semibold text-slate-800 mb-0.5">Dias de suporte</p>
              <p className="text-xs text-slate-500">Sem pausas, sem exceções</p>
            </div>
          </BentoCard>

          {/* < 2 min */}
          <BentoCard magnetic className="p-7 flex flex-col gap-6 min-h-[190px]">
            <div className="w-14 h-14 rounded-3xl bg-emerald-500/8 flex items-center justify-center text-emerald-600/55 group-hover:text-emerald-600 group-hover:bg-emerald-500/12 transition-colors duration-300">
              <TrendingUp className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-display text-5xl lg:text-6xl font-bold text-slate-900 leading-none tracking-tighter mb-1.5">
                {"< 2 min"}
              </div>
              <p className="text-sm font-semibold text-slate-800 mb-0.5">Resposta média</p>
              <p className="text-xs text-slate-500">Suporte humano e ágil</p>
            </div>
          </BentoCard>

          {/* 97% */}
          <BentoCard magnetic className="p-7 flex flex-col gap-6 min-h-[190px]">
            <div className="w-14 h-14 rounded-3xl bg-[#c9972a]/8 flex items-center justify-center text-[#c9972a]/80 group-hover:text-[#9a7318] group-hover:bg-[#c9972a]/12 transition-colors duration-300">
              <Sparkles className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-display text-5xl lg:text-6xl font-bold text-slate-900 leading-none tracking-tighter mb-1.5">
                <AnimatedCounter value={97} suffix="%" />
              </div>
              <p className="text-sm font-semibold text-slate-800 mb-0.5">Satisfação</p>
              <p className="text-xs text-slate-500">Em avaliações de suporte</p>
            </div>
          </BentoCard>
        </motion.div>
      </div>
    </section>
  );
}
