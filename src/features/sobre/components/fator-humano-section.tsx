import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { Users, Clock, TrendingUp, GraduationCap, Globe, MessageCircle, MessageSquare, Phone, Mail } from "lucide-react";
import { Section, SectionHeader, StaggerSection, StaggerItem } from "./motion-primitives";
import type { CulturePillarData } from "../types";

// ── Live support feed data ──────────────────────────────────────────────────
// Registro de atendimento, não card de estatística — os números (365/<2min/97%)
// já vivem na BentoNetworkSection logo acima nesta mesma página; repeti-los
// aqui como mais um card seria redundante. Este bloco prova a mesma promessa
// ("suporte 365 dias") de outro jeito: mostrando horários reais de plantão,
// inclusive fim de semana e madrugada, em vez de mais um número.

interface FeedEntry {
  day:     string;
  time:    string;
  channel: string;
  color:   string;
  icon:    React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  text:    string;
}

const SUPPORT_FEED: FeedEntry[] = [
  { day: "Sábado",  time: "23:47", channel: "WhatsApp",     color: "#25d366", icon: MessageCircle, text: "Sincronização de reserva confirmada minutos após o pedido do hóspede." },
  { day: "Domingo", time: "04:12", channel: "Chat ao vivo", color: "#285992", icon: MessageSquare, text: "Instabilidade identificada e corrigida antes do horário de check-in." },
  { day: "Terça",   time: "14:30", channel: "Telefone",     color: "#0f766e", icon: Phone,         text: "Onboarding de um novo hotel concluído com suporte dedicado, do início ao fim." },
  { day: "Sexta",   time: "19:05", channel: "E-mail",       color: "#7c3aed", icon: Mail,          text: "Dúvida sobre tarifas de alta temporada esclarecida no mesmo dia." },
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
    desc: "Plano de carreira concreto para cada colaborador, não apenas para seniores.",
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

// ── LiveSupportFeed ───────────────────────────────────────────────────────────
// Um único painel — não uma pilha de cards — narrando plantões reais em vez
// de repetir números. A linha do tempo à esquerda é o dispositivo estrutural:
// cada ponto é um atendimento real, a proximidade entre horários prova a
// cobertura contínua sem precisar dizer "365" de novo.

function LiveSupportFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 26, delay: 0.05 }}
      className="relative rounded-3xl overflow-hidden p-6 sm:p-7"
      style={{
        background: "linear-gradient(145deg, rgba(238,244,253,0.98) 0%, rgba(248,250,252,0.95) 100%)",
        border: "1px solid rgba(40,89,146,0.14)",
        boxShadow: "0 8px 32px rgba(40,89,146,0.08), inset 0 1px 0 rgba(255,255,255,0.85)",
      }}
    >
      <motion.div aria-hidden className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{ background: "radial-gradient(ellipse 75% 55% at 25% 75%, rgba(40,89,146,0.07), transparent)" }}
        animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />

      <div className="relative z-10 flex items-center justify-between mb-7 flex-wrap gap-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70">
          <motion.span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
            animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">Equipe online agora</span>
        </div>
        <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Plantão real, sem horário fixo</span>
      </div>

      <div className="relative z-10 pl-8">
        <div className="absolute left-[13px] top-1 bottom-1 w-px bg-gradient-to-b from-[#285992]/30 via-slate-300/60 to-transparent" />
        <div className="flex flex-col gap-6">
          {SUPPORT_FEED.map((entry, i) => {
            const Icon = entry.icon;
            return (
              <motion.div key={entry.channel} className="relative"
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.12 + i * 0.1, duration: 0.5, ease: "easeOut" }}>
                <div className="absolute -left-8 top-0.5 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: `${entry.color}14`, boxShadow: "0 0 0 3px rgba(248,250,252,0.95)" }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: entry.color }} />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: entry.color }}>{entry.channel}</span>
                  <span className="text-[10px] text-slate-400">· {entry.day}, {entry.time}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{entry.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
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
        className="relative rounded-3xl overflow-hidden cursor-default p-5"
        whileHover={{ scale: 1.022 }} transition={{ scale: { type: "spring", stiffness: 300, damping: 22 } }}
        onMouseMove={onMouseMove} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <motion.div aria-hidden className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: spotGlow, opacity: glowOp }} />
        <motion.div aria-hidden className="absolute inset-0 rounded-3xl pointer-events-none bg-white z-30"
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
          <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
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
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-3xl mb-6 bg-[#0f766e]/10 text-[#0f766e]">
            <Users className="w-5 h-5" strokeWidth={1.5} />
          </div>
        </StaggerItem>
        <StaggerItem>
          <span className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[#0f766e] mb-4">Cultura e Time</span>
        </StaggerItem>
        <StaggerItem>
          <h3 className="font-display text-3xl sm:text-4xl font-semibold text-[#1e293b] tracking-tight leading-tight mb-5">
            Construído por quem<br className="hidden sm:block" /> ama o que faz.
          </h3>
        </StaggerItem>
        <StaggerItem>
          <p className="text-slate-600 leading-relaxed text-base mb-8">
            Nossa cultura é simples: autonomia, colaboração e a convicção de que o crescimento de cada colaborador se reflete diretamente na qualidade do produto que o hoteleiro recebe.
          </p>
        </StaggerItem>
        <StaggerItem>
          <div className="relative pl-5">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-[#285992]/50 to-[#c9972a]/50" />
            <p className="text-base text-slate-700 leading-relaxed">
              Investimos em pessoas porque acreditamos que{" "}
              <span className="font-bold bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
                tecnologia excepcional é feita por humanos excepcionais.
              </span>
            </p>
          </div>
        </StaggerItem>
      </StaggerSection>

      {/* RIGHT: floating glass cards */}
      <div className="relative">        <div className="grid grid-cols-2 gap-4 items-start relative">
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
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-3xl mb-6" style={{ backgroundColor: `${accentColor}14`, color: accentColor }}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="block text-[10px] font-bold tracking-[0.15em] uppercase mb-4" style={{ color: accentColor }}>{eyebrow}</span>
          <h3 className="font-display text-3xl sm:text-4xl font-semibold text-[#1e293b] tracking-tight leading-tight mb-5">{title}</h3>
          <p className="text-slate-600 leading-relaxed text-base">{body}</p>
        </StaggerItem>
        <StaggerItem>{visual}</StaggerItem>
      </div>
    </StaggerSection>
  );
}

// ── HumanFactorSection ────────────────────────────────────────────────────────

export function HumanFactorSection() {
  return (
    <Section className="bg-[#f4f7fb]">
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
              <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">Sempre</span>
              {" "}que você precisar.</>
          }
          body="O check-in não para no feriado. Sua operação não para no fim de semana. E o nosso suporte, também não. Temos uma equipe dedicada que respira hotelaria e entende que um problema no sistema num sábado à noite não pode esperar até segunda-feira de manhã."
          icon={Clock}
          accentColor="#285992"
          visual={<LiveSupportFeed />}
        />
        <CultureSection />
      </div>
    </Section>
  );
}
