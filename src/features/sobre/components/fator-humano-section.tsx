import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { Users, Clock, TrendingUp, GraduationCap, Globe } from "lucide-react";
import { Section, SectionHeader, StaggerSection, StaggerItem } from "./motion-primitives";
import type { CulturePillarData } from "../types";

// ── Live Command Center data ──────────────────────────────────────────────────

interface Channel { label: string; dot: string; }

const CMD_CHANNELS: Channel[] = [
  { label: "Chat ao vivo", dot: "#285992" },
  { label: "WhatsApp",     dot: "#25d366" },
  { label: "E-mail",       dot: "#7c3aed" },
  { label: "Telefone",     dot: "#0f766e" },
];

// ── Culture pillars data ──────────────────────────────────────────────────────

const CULTURE_PILLARS: CulturePillarData[] = [
  {
    id: "collab", icon: Users, title: "Ambiente Colaborativo",
    desc: "Horizontalidade onde a melhor ideia vence, independente do cargo ou tempo de casa.",
    color: "#285992", iconHover: { scale: 1.15 }, floatY: [-4, 5], floatDur: 4.2, gridClass: "",
  },
  {
    id: "growth", icon: TrendingUp, title: "Crescimento Real",
    desc: "Plano de carreira concreto para cada colaborador — não apenas para seniores.",
    color: "#0f766e", iconHover: { y: -3, scale: 1.1 }, floatY: [-3, 6], floatDur: 4.9, gridClass: "lg:mt-7",
  },
  {
    id: "learn", icon: GraduationCap, title: "Aprendizado Contínuo",
    desc: "Cultura que celebra a curiosidade, os experimentos e o erro calculado como motor.",
    color: "#7c3aed", iconHover: { rotate: 8 }, floatY: [-5, 3], floatDur: 3.8, gridClass: "lg:mt-3",
  },
  {
    id: "global", icon: Globe, title: "DNA Global",
    desc: "Empresa 100% brasileira com mentalidade e padrões de produto de classe mundial.",
    color: "#b45309", iconHover: { rotate: 22 }, floatY: [-3, 7], floatDur: 5.1, gridClass: "lg:mt-11",
  },
];

// ── RadarRings ────────────────────────────────────────────────────────────────

function RadarRings({ active }: { active: boolean }) {
  return (
    <div aria-hidden className="absolute top-1/2 left-1/2 pointer-events-none z-0">
      {[0, 0.62, 1.24].map(delay => (
        <motion.span key={delay} className="absolute rounded-full border border-[#285992]"
          style={{ width: 28, height: 28, top: -14, left: -14 }}
          animate={active ? { scale: [1, 6.5], opacity: [0.30, 0] } : { scale: 1, opacity: 0 }}
          transition={{ duration: 2.1, delay, repeat: Infinity, ease: "easeOut" }} />
      ))}
    </div>
  );
}

// ── SmallMetricCard ───────────────────────────────────────────────────────────

function SmallMetricCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotX   = useMotionValue(50);
  const spotY   = useMotionValue(50);
  const glowOp  = useSpring(0, { stiffness: 220, damping: 28 });
  const glow    = useMotionTemplate`radial-gradient(110px circle at ${spotX}% ${spotY}%, rgba(40,89,146,0.10), transparent 75%)`;

  function onMouseMove(e: React.MouseEvent) {
    const el = cardRef.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    spotX.set(((e.clientX - left) / width) * 100);
    spotY.set(((e.clientY - top) / height) * 100);
  }

  return (
    <motion.div ref={cardRef}
      initial={{ opacity: 0, scale: 0.88, y: 8 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }} transition={{ type: "spring", stiffness: 280, damping: 24, delay }}
      className="relative flex-1 rounded-2xl overflow-hidden p-5 cursor-default"
      style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(14px)", border: "1px solid rgba(226,232,240,0.92)", boxShadow: "0 4px 20px rgba(30,58,95,0.05)" }}
      onMouseMove={onMouseMove} onMouseEnter={() => glowOp.set(1)} onMouseLeave={() => glowOp.set(0)}>
      <motion.div aria-hidden className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: glow, opacity: glowOp }} />
      <div className="relative z-10">
        <div className="font-display text-3xl font-bold text-[#1e3a5f] leading-none mb-1">{value}</div>
        <div className="text-[10px] font-medium text-slate-500 leading-snug">{label}</div>
      </div>
    </motion.div>
  );
}

// ── LiveCommandCenter ─────────────────────────────────────────────────────────

function LiveCommandCenter() {
  const [heroHovered, setHeroHovered] = useState(false);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex gap-3 items-stretch">
        {/* Hero card: < 2 min */}
        <motion.div
          initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 26, delay: 0.05 }}
          className="relative flex-1 rounded-2xl overflow-hidden p-6 flex flex-col justify-between min-h-[200px] cursor-default"
          style={{ background: "linear-gradient(145deg, rgba(238,244,253,0.98) 0%, rgba(248,250,252,0.95) 100%)", border: "1px solid rgba(40,89,146,0.14)", boxShadow: "0 8px 32px rgba(40,89,146,0.08), inset 0 1px 0 rgba(255,255,255,0.85)" }}
          whileHover={{ scale: 1.018, boxShadow: "0 14px 48px rgba(40,89,146,0.13), inset 0 1px 0 rgba(255,255,255,0.9)" }}
          onMouseEnter={() => setHeroHovered(true)} onMouseLeave={() => setHeroHovered(false)}>
          <RadarRings active={heroHovered} />
          <motion.div aria-hidden className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ background: "radial-gradient(ellipse 75% 55% at 25% 75%, rgba(40,89,146,0.07), transparent)" }}
            animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 self-start relative z-10">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">Equipe Online</span>
          </div>
          {/* Metric */}
          <div className="relative z-10">
            <div className="font-display text-5xl sm:text-6xl font-bold text-[#1e3a5f] leading-none mb-2 tracking-tighter">{"< 2 min"}</div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span>Tempo médio de resposta</span>
              <motion.span className="inline-block w-1.5 h-1.5 rounded-full bg-[#285992] shrink-0"
                animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            </div>
          </div>
        </motion.div>

        {/* Secondary stack */}
        <div className="flex flex-col gap-3 w-[128px] shrink-0">
          <SmallMetricCard value="97%" label="Satisfação no suporte" delay={0.18} />
          <SmallMetricCard value="365"  label="Dias de atendimento"  delay={0.26} />
        </div>
      </div>

      {/* Channel footer */}
      <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.34, duration: 0.45, ease: "easeOut" }}
        className="rounded-2xl px-5 py-3.5 flex items-center gap-3 flex-wrap"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)", border: "1px solid rgba(226,232,240,0.92)", boxShadow: "0 2px 12px rgba(30,58,95,0.04)" }}>
        <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 shrink-0">4 canais</span>
        <div className="h-3 w-px bg-slate-200 shrink-0" />
        {CMD_CHANNELS.map(c => (
          <div key={c.label} className="flex items-center gap-1.5 shrink-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-45" style={{ backgroundColor: c.dot }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: c.dot }} />
            </span>
            <span className="text-xs font-medium text-slate-600">{c.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── CultureCard ───────────────────────────────────────────────────────────────

function CultureCard({
  pillar, index, hoveredIdx, setHoveredIdx,
}: {
  pillar:        CulturePillarData;
  index:         number;
  hoveredIdx:    number | null;
  setHoveredIdx: (i: number | null) => void;
}) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const Icon      = pillar.icon;
  const isHovered = hoveredIdx === index;
  const isDimmed  = hoveredIdx !== null && !isHovered;

  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 20, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 200, damping: 20, mass: 0.5 });
  const spotX    = useMotionValue(50), spotY = useMotionValue(50);
  const glowOp   = useSpring(0, { stiffness: 220, damping: 28 });
  const spotGlow = useMotionTemplate`radial-gradient(150px circle at ${spotX}% ${spotY}%, ${pillar.color}28, transparent 72%)`;

  function onMouseMove(e: React.MouseEvent) {
    const el = cardRef.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width, y = (e.clientY - top) / height;
    mx.set((x - 0.5) * 16); my.set((y - 0.5) * 10);
    spotX.set(x * 100); spotY.set(y * 100);
  }
  function onMouseEnter() { setHoveredIdx(index); glowOp.set(1); }
  function onMouseLeave() { setHoveredIdx(null); glowOp.set(0); mx.set(0); my.set(0); }

  return (
    <motion.div
      animate={{ y: isHovered ? 0 : pillar.floatY }}
      transition={{ y: isHovered ? { type: "spring", stiffness: 320, damping: 28 } : { duration: pillar.floatDur, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } }}
    >
      <motion.div ref={cardRef}
        style={{ x: sx, y: sy, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.92)", boxShadow: "0 20px 40px -15px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.95)" }}
        className="relative rounded-2xl overflow-hidden cursor-default p-5"
        whileHover={{ scale: 1.022 }} transition={{ scale: { type: "spring", stiffness: 300, damping: 22 } }}
        onMouseMove={onMouseMove} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <motion.div aria-hidden className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: spotGlow, opacity: glowOp }} />
        <motion.div aria-hidden className="absolute inset-0 rounded-2xl pointer-events-none bg-white z-30"
          animate={{ opacity: isDimmed ? 0.52 : 0 }} transition={{ duration: 0.22 }} />
        <div className="relative z-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${pillar.color}10` }}>
            <motion.div
              animate={isHovered ? { ...pillar.iconHover } : { scale: 1, rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              style={{ color: isHovered ? pillar.color : "#94a3b8" }}>
              <Icon className="w-5 h-5" strokeWidth={1.5} />
            </motion.div>
          </div>
          <h4 className="font-display text-sm font-bold text-[#1e293b] mb-2 leading-tight">{pillar.title}</h4>
          <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── CultureSection ────────────────────────────────────────────────────────────

function CultureSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      {/* LEFT: editorial manifesto */}
      <StaggerSection className="lg:sticky lg:top-32 self-start">
        <StaggerItem>
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl mb-6 bg-[#0f766e]/10 text-[#0f766e]">
            <Users className="w-5 h-5" strokeWidth={1.5} />
          </div>
        </StaggerItem>
        <StaggerItem>
          <span className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[#0f766e]/60 mb-4">Cultura e Time</span>
        </StaggerItem>
        <StaggerItem>
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#1e293b] tracking-tight leading-tight mb-5">
            Construído por quem<br className="hidden sm:block" /> ama o que faz.
          </h3>
        </StaggerItem>
        <StaggerItem>
          <p className="text-slate-500 leading-relaxed text-base mb-8">
            Nossa cultura é simples: autonomia, colaboração e a convicção de que o crescimento de cada colaborador se reflete diretamente na qualidade do produto que o hoteleiro recebe.
          </p>
        </StaggerItem>
        <StaggerItem>
          <div className="relative pl-5">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-[#285992]/50 to-[#c9972a]/50" />
            <p className="text-base text-slate-700 leading-relaxed">
              Investimos em pessoas porque acreditamos que{" "}
              <span className="font-bold bg-gradient-to-r from-[#285992] to-[#c9972a] bg-clip-text text-transparent">
                tecnologia excepcional é feita por humanos excepcionais.
              </span>
            </p>
          </div>
        </StaggerItem>
      </StaggerSection>

      {/* RIGHT: floating glass cards */}
      <div className="relative">
        <div aria-hidden className="absolute -inset-8 pointer-events-none overflow-hidden">
          <div className="absolute -top-8 -right-8 w-64 h-64 rounded-full blur-3xl opacity-55" style={{ background: "radial-gradient(circle, rgba(186,218,245,0.55) 0%, transparent 68%)" }} />
          <div className="absolute -bottom-8 -left-8 w-56 h-56 rounded-full blur-3xl opacity-45" style={{ background: "radial-gradient(circle, rgba(196,166,235,0.42) 0%, transparent 68%)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(186,218,245,0.35) 0%, transparent 68%)" }} />
        </div>
        <div className="grid grid-cols-2 gap-4 items-start relative">
          {CULTURE_PILLARS.map((pillar, i) => (
            <motion.div key={pillar.id} className={pillar.gridClass}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.1 * i, ease: "easeOut" }}>
              <CultureCard pillar={pillar} index={i} hoveredIdx={hoveredIdx} setHoveredIdx={setHoveredIdx} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── FeatureRow ────────────────────────────────────────────────────────────────

function FeatureRow({ eyebrow, title, body, icon: Icon, accentColor, visual }: {
  eyebrow:     string;
  title:       React.ReactNode;
  body:        string;
  icon:        React.ComponentType<{ className?: string }>;
  accentColor: string;
  visual:      React.ReactNode;
}) {
  return (
    <StaggerSection>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <StaggerItem>
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl mb-6" style={{ backgroundColor: `${accentColor}14`, color: accentColor }}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="block text-[10px] font-bold tracking-[0.15em] uppercase mb-4" style={{ color: `${accentColor}80` }}>{eyebrow}</span>
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#1e293b] tracking-tight leading-tight mb-5">{title}</h3>
          <p className="text-slate-500 leading-relaxed text-base">{body}</p>
        </StaggerItem>
        <StaggerItem>{visual}</StaggerItem>
      </div>
    </StaggerSection>
  );
}

// ── HumanFactorSection ────────────────────────────────────────────────────────

export function HumanFactorSection() {
  return (
    <Section className="bg-white">
      <SectionHeader
        badge="O Fator Humano"
        title="Alta tecnologia,"
        titleHighlight="pessoas reais"
        subtitle="Por trás de cada sistema existe um time apaixonado por resolver os problemas reais de quem vive o dia a dia hoteleiro."
      />
      <div className="space-y-24 lg:space-y-32">
        <FeatureRow
          eyebrow="Suporte Ininterrupto"
          title={
            <>365 dias.{" "}
              <span className="bg-gradient-to-r from-[#285992] to-[#c9972a] bg-clip-text text-transparent">Sempre</span>
              {" "}que você precisar.</>
          }
          body="O check-in não para no feriado. Sua operação não para no fim de semana. E o nosso suporte, também não. Temos uma equipe dedicada que respira hotelaria e entende que um problema no sistema num sábado à noite não pode esperar até segunda-feira de manhã."
          icon={Clock}
          accentColor="#285992"
          visual={<LiveCommandCenter />}
        />
        <CultureSection />
      </div>
    </Section>
  );
}
