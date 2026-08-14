"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  TrendingDown,
  AlertTriangle,
  Frown,
  ArrowRight,
  ScanLine,
  Radar,
  Globe,
  Layout,
  Target,
  Zap,
  Cloud,
  CreditCard,
  Headset,
  Plug,
  Star,
  Smartphone,
  MessageCircle,
  Percent,
  Plus,
} from "lucide-react";
import type { DorSolucao } from "../types";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

type IconType = React.ComponentType<{ className?: string; style?: React.CSSProperties; strokeWidth?: number }>;

// ── Configuração de apresentação por dor ───────────────────────────────────────
// Conteúdo (título/subtítulo/soluções) continua vindo 100% de `home-api.ts` —
// aqui só vive o que é exclusivo deste módulo visual: ícone, imagem, badge
// flutuante e ícones dos 4 cards de solução (na mesma ordem do array
// `solucoes` de cada dor).
interface DorConfig {
  Icon: IconType;
  kicker: string;
  imagem: string;
  imagemAlt: string;
  stat: { Icon: IconType; value: string; label: string };
  solucaoIcons: IconType[];
  ctaTexto: string;
  ctaBotao: string;
  ctaLink: string;
}

const DOR_CONFIG: Record<string, DorConfig> = {
  "baixa-ocupacao": {
    Icon: TrendingDown,
    kicker: "Ocupação & Reservas",
    imagem: "/assets/imgs/home/dores/hotel-vazio.jpg",
    imagemAlt: "Hotel com piscina buscando aumentar sua taxa de ocupação",
    stat: { Icon: Globe, value: "+800", label: "canais conectados" },
    solucaoIcons: [Globe, Layout, Target, Zap],
    ctaTexto: "Quer atrair mais hóspedes e aumentar as suas reservas?",
    ctaBotao: "Quero atrair mais hóspedes",
    ctaLink: "/motor-de-reservas",
  },
  prejuizos: {
    Icon: AlertTriangle,
    kicker: "Gestão & Prejuízos",
    imagem: "/assets/imgs/home/dores/prejuizo.jpg",
    imagemAlt: "Painel de gestão hoteleira Foco centralizando reservas e financeiro",
    stat: { Icon: Cloud, value: "100%", label: "PMS em nuvem" },
    solucaoIcons: [Cloud, CreditCard, Headset, Plug],
    ctaTexto: "Quer parar de ter prejuízos e começar a obter lucros com seu estabelecimento?",
    ctaBotao: "Quero obter lucros",
    ctaLink: "/gestao-hoteleira",
  },
  "experiencia-ruim": {
    Icon: Frown,
    kicker: "Experiência do Hóspede",
    imagem: "/assets/imgs/home/dores/hospedes-insatisfeitos.jpg",
    imagemAlt: "Aplicativo de hotel Foco Pass para check-in antecipado do hóspede",
    stat: { Icon: Smartphone, value: "100%", label: "check-in digital" },
    solucaoIcons: [Star, Smartphone, MessageCircle, Percent],
    ctaTexto: "Quer melhorar a experiência do seu hóspede e aumentar sua reputação online?",
    ctaBotao: "Quero aumentar a reputação do meu hotel",
    ctaLink: "/experiencia-do-hospede",
  },
};

// ── Cantos de mira (HUD de "diagnóstico") — dois cantos opostos em dourado,
//    os outros dois em branco translúcido, pra sugerir um scanner mirando a
//    imagem sem virar um quadrado decorativo qualquer. ─────────────────────
function ScanCorners() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-4 sm:inset-5 z-20">
      <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#fccc30]/70 rounded-tl-md" />
      <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/25 rounded-tr-md" />
      <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white/25 rounded-bl-md" />
      <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#fccc30]/70 rounded-br-md" />
    </div>
  );
}

// ── Painel visual (imagem) ──────────────────────────────────────────────────
function DiagnosticoVisual({ dor, index }: { dor: DorSolucao; index: number }) {
  const cfg = DOR_CONFIG[dor.id];
  const reducedMotion = useReducedMotion();
  const StatIcon = cfg.stat.Icon;

  // Tilt 3D sutil ao mouse — mesma técnica do mockup da hero da home.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 100, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 100, damping: 20, mass: 0.6 });
  const rotateY = useTransform(sx, [-1, 1], [5, -5]);
  const rotateX = useTransform(sy, [-1, 1], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const handleMouseLeave = () => { px.set(0); py.set(0); };

  return (
    <div className="lg:order-1 relative mx-auto w-full max-w-md lg:max-w-none [perspective:1600px]">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-[28px] p-3 sm:p-4"
        style={{
          background: "rgba(16,35,61,0.55)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.16)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), 0 30px 70px -24px rgba(0,0,0,0.6)",
        }}
      >
        <motion.div
          style={reducedMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative rounded-[20px] overflow-hidden aspect-[5/4] lg:aspect-[4/5] ring-1 ring-white/10"
        >
          <img
            src={cfg.imagem}
            alt={cfg.imagemAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Duotone de marca — legibilidade dos elementos flutuantes + clima "surreal" */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(11,26,46,0.15) 0%, rgba(11,26,46,0.35) 55%, rgba(11,26,46,0.92) 100%)" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-color"
            style={{ background: "linear-gradient(135deg, rgba(40,89,146,0.55), rgba(16,35,61,0.55))" }}
          />

          {/* Grade técnica sutil, sempre em deriva lenta */}
          <div
            aria-hidden="true"
            className="dores-diag-grid absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />

          {/* Feixe de varredura */}
          <div
            aria-hidden="true"
            className="dores-diag-scanline absolute inset-x-0 h-1/3 pointer-events-none"
            style={{ background: "linear-gradient(180deg, transparent, rgba(252,204,48,0.32), transparent)" }}
          />

          <ScanCorners />

          {/* Status bar */}
          <div className="absolute top-4 sm:top-5 left-4 sm:left-5 right-4 sm:right-5 z-20 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/85 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fccc30] animate-pulse" />
              Diagnóstico ativo
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-white/45">0{index + 1}/03</span>
          </div>

          {/* Badge flutuante — métrica real do card correspondente */}
          <div className="absolute -bottom-1 left-4 sm:left-5 z-20 motion-safe:animate-badge-float">
            <div
              className="flex items-center gap-2.5 rounded-2xl border border-white/15 px-3.5 py-2.5"
              style={{
                background: "rgba(11,26,46,0.65)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 16px 32px -16px rgba(0,0,0,0.6)",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#285992,#427ab9)" }}
              >
                <StatIcon className="w-4 h-4 text-white" strokeWidth={1.8} />
              </div>
              <div className="text-left whitespace-nowrap">
                <div className="text-white font-bold text-sm leading-none">{cfg.stat.value}</div>
                <div className="text-white/55 text-[10px] mt-0.5">{cfg.stat.label}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Painel de conteúdo (título, subtítulo, cards, CTA) ──────────────────────
function DiagnosticoConteudo({
  dor,
  index,
}: {
  dor: DorSolucao;
  index: number;
}) {
  const cfg = DOR_CONFIG[dor.id];

  return (
    <div className="lg:order-2">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#fccc30]/85 mb-4 flex items-center gap-2">
        <ScanLine className="w-3.5 h-3.5" strokeWidth={2} />
        Diagnóstico 0{index + 1} de 03
      </div>

      <h3 className="font-display font-semibold text-2xl sm:text-3xl lg:text-[2.15rem] text-white leading-[1.15] tracking-tight antialiased mb-4">
        {dor.titulo}
      </h3>

      <p className="text-white/60 text-base leading-relaxed mb-8 max-w-xl">
        {dor.descricao}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {dor.solucoes.map((solucao, si) => {
          const SolIcon = cfg.solucaoIcons[si] ?? Zap;
          return (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + si * 0.07, ease: EASE }}
              className="group relative rounded-2xl p-5 border transition-colors duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.10)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 border transition-all duration-300 group-hover:scale-105"
                style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.10)" }}
              >
                <SolIcon className="w-5 h-5 text-[#fccc30] transition-colors duration-300" strokeWidth={1.8} />
              </div>
              <h4 className="text-white font-semibold text-sm mb-1.5 leading-snug">
                {solucao.titulo}
              </h4>
              <p className="text-white/55 text-sm leading-relaxed">
                {solucao.descricao}
              </p>

              {/* Realce dourado ao hover, sem depender de :hover em classes utilitárias
                  pra poder controlar o brilho junto com a borda no mesmo elemento. */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: "inset 0 0 0 1px rgba(252,204,48,0.35), 0 12px 28px -14px rgba(252,204,48,0.25)" }}
              />
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.4, ease: EASE }}
        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-2xl border p-5"
        style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.10)" }}
      >
        <p className="text-white/75 text-sm sm:text-base font-medium flex-1 text-center sm:text-left">
          {cfg.ctaTexto}
        </p>
        <Link
          to={cfg.ctaLink}
          className="group shrink-0 inline-flex items-center gap-2 bg-[#fccc30] text-[#132840] font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-[#fccc30]/20 hover:shadow-[#fccc30]/40 hover:-translate-y-0.5"
        >
          {cfg.ctaBotao}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </motion.div>
    </div>
  );
}

// ── Acordeão mobile ──────────────────────────────────────────────────────────
// No tablet-row + painel único (a versão desktop, abaixo), o conteúdo mora
// LONGE das abas — o usuário precisa subir a tela toda vez que quer trocar
// de cenário. Aqui embaixo de `lg`, cada cenário é sua própria aba E seu
// próprio painel: o conteúdo abre imprensado logo abaixo do cabeçalho que
// foi tocado (mesmo mecanismo do antigo `DoresSection`), empurrando as
// próximas abas pra baixo — trocar de cenário nunca exige rolar mais que a
// altura de um cabeçalho fechado.
function MobileDiagnosticoAccordionItem({
  dor,
  index,
  isOpen,
  onToggle,
}: {
  dor: DorSolucao;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const cfg = DOR_CONFIG[dor.id];
  if (!cfg) return null;
  const Icon = cfg.Icon;

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-colors duration-300"
      style={{
        borderColor: isOpen ? "rgba(252,204,48,0.5)" : "rgba(255,255,255,0.10)",
        background: isOpen ? "rgba(252,204,48,0.06)" : "rgba(255,255,255,0.03)",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-3 p-4"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
          style={{ background: isOpen ? "rgba(252,204,48,0.15)" : "rgba(255,255,255,0.06)" }}
        >
          <Icon
            className="w-5 h-5 transition-colors duration-300"
            style={{ color: isOpen ? "#fccc30" : "rgba(255,255,255,0.55)" }}
            strokeWidth={1.8}
          />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.16em] mb-0.5 transition-colors duration-300"
            style={{ color: isOpen ? "#fccc30" : "rgba(255,255,255,0.35)" }}
          >
            Cenário 0{index + 1}
          </div>
          <div
            className="font-display font-semibold text-sm leading-snug truncate transition-colors duration-300"
            style={{ color: isOpen ? "#ffffff" : "rgba(255,255,255,0.75)" }}
          >
            {cfg.kicker}
          </div>
        </div>
        {/* + gira 45° → vira × quando aberto, mesma técnica do DoresSection */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: isOpen ? "rgba(252,204,48,0.15)" : "rgba(255,255,255,0.06)" }}
        >
          <Plus
            className="w-4 h-4"
            style={{ color: isOpen ? "#fccc30" : "rgba(255,255,255,0.55)" }}
            strokeWidth={2.5}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height:  { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.22, ease: "easeOut" },
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pb-6 pt-1">
              <DiagnosticoVisual dor={dor} index={index} />
              <div className="mt-7">
                <DiagnosticoConteudo dor={dor} index={index} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
interface DoresDiagnosticoSectionProps {
  dores: DorSolucao[];
}

const panelVariants = {
  enter: () => ({ opacity: 0, y: 18, filter: "blur(8px)" }),
  center: () => ({ opacity: 1, y: 0, filter: "blur(0px)" }),
  exit: () => ({ opacity: 0, y: -14, filter: "blur(8px)" }),
};

function DoresDiagnosticoSection({ dores }: DoresDiagnosticoSectionProps) {
  const [activeId, setActiveId] = useState<string>(dores[0]?.id ?? "");
  const activeIndex = Math.max(0, dores.findIndex(d => d.id === activeId));
  const dor = dores[activeIndex] ?? dores[0];

  if (!dor) return null;

  return (
    <>
      {/*
        Animações puramente CSS (sem depender de rAF de biblioteca) — feixe de
        varredura sobe/desce dentro da imagem, e a grade técnica deriva
        lentamente na diagonal. Ambas rodam em loop infinito, independente de
        scroll ou interação (seção "sempre viva", mesma filosofia da aurora
        do hero e do ripple d'água do NumerosSection/DoresSection).
      */}
      <style>{`
        @keyframes dores-diag-scan {
          0%   { transform: translateY(-120%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(420%); opacity: 0; }
        }
        .dores-diag-scanline { animation: dores-diag-scan 4.5s ease-in-out infinite; }

        @keyframes dores-diag-grid-pan {
          0%   { background-position: 0 0; }
          100% { background-position: 26px 26px; }
        }
        .dores-diag-grid { animation: dores-diag-grid-pan 7s linear infinite; }
      `}</style>

      <section className="relative py-24 md:py-32 overflow-hidden bg-[#0b1a2e]">
        {/* Aurora azul em deriva lenta — mesmas keyframes do hero da home. */}
        <div aria-hidden="true" className="absolute -inset-[10%] -z-10 overflow-hidden" style={{ filter: "blur(60px)", opacity: 0.7 }}>
          <div
            className="absolute w-[460px] h-[460px] -left-24 top-0 rounded-full motion-safe:animate-aurora-a"
            style={{ background: "radial-gradient(circle, rgba(66,122,185,0.55), transparent 70%)" }}
          />
          <div
            className="absolute w-[520px] h-[520px] -right-32 bottom-0 rounded-full motion-safe:animate-aurora-b"
            style={{ background: "radial-gradient(circle, rgba(30,58,95,0.55), transparent 70%)" }}
          />
          <div
            className="absolute w-[360px] h-[360px] left-[35%] -bottom-24 rounded-full motion-safe:animate-aurora-c"
            style={{ background: "radial-gradient(circle, rgba(40,89,146,0.45), transparent 70%)" }}
          />
        </div>

        {/* Grão sutil */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="inline-flex items-center gap-2.5 border border-white/15 bg-white/8 backdrop-blur-sm text-white px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] mb-6">
              <Radar className="w-3.5 h-3.5 text-[#fccc30]" strokeWidth={2} />
              Diagnóstico Foco
            </span>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl text-white leading-none tracking-tighter antialiased mb-4">
              Qual dessas dores está travando{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#fccc30,#ffe08a,#fccc30)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                o seu hotel
              </span>
              ?
            </h2>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed">
              Selecione o cenário mais parecido com a sua realidade e veja, na hora, como a Foco resolve.
            </p>
          </motion.div>

          {/* ── Desktop (lg+) — seletor de 3 cartões + painel único ao lado.
              Abaixo de lg vira o acordeão logo mais abaixo (ver
              `MobileDiagnosticoAccordionItem`) — os dois nunca coexistem. ── */}
          <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto mb-12 sm:mb-16"
          >
            {dores.map((d, i) => {
              const cfg = DOR_CONFIG[d.id];
              if (!cfg) return null;
              const Icon = cfg.Icon;
              const isActive = d.id === activeId;

              return (
                <button
                  key={d.id}
                  onClick={() => setActiveId(d.id)}
                  aria-pressed={isActive}
                  className="group relative text-left rounded-2xl p-4 sm:p-5 border transition-colors duration-300 overflow-hidden"
                  style={{
                    borderColor: isActive ? "rgba(252,204,48,0.5)" : "rgba(255,255,255,0.10)",
                    background: isActive ? "rgba(252,204,48,0.06)" : "rgba(255,255,255,0.03)",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="dores-diag-glow"
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ boxShadow: "inset 0 0 0 1px rgba(252,204,48,0.4), 0 0 32px -6px rgba(252,204,48,0.35)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                      style={{ background: isActive ? "rgba(252,204,48,0.15)" : "rgba(255,255,255,0.06)" }}
                    >
                      <Icon
                        className="w-5 h-5 transition-colors duration-300"
                        style={{ color: isActive ? "#fccc30" : "rgba(255,255,255,0.55)" }}
                        strokeWidth={1.8}
                      />
                    </div>
                    <div className="min-w-0">
                      <div
                        className="font-mono text-[10px] uppercase tracking-[0.16em] mb-0.5 transition-colors duration-300"
                        style={{ color: isActive ? "#fccc30" : "rgba(255,255,255,0.35)" }}
                      >
                        Cenário 0{i + 1}
                      </div>
                      <div
                        className="font-display font-semibold text-sm sm:text-[15px] leading-snug truncate transition-colors duration-300"
                        style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.75)" }}
                      >
                        {cfg.kicker}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Painel de diagnóstico ativo */}
          <AnimatePresence mode="popLayout" custom={activeIndex}>
            <motion.div
              key={dor.id}
              custom={activeIndex}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: EASE }}
              className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center"
            >
              <DiagnosticoVisual dor={dor} index={activeIndex} />
              <DiagnosticoConteudo dor={dor} index={activeIndex} />
            </motion.div>
          </AnimatePresence>
          </div>

          {/* ── Mobile/tablet (abaixo de lg) — acordeão: cada cenário é sua
              própria aba, o conteúdo abre embutido logo abaixo dela. ────── */}
          <div className="lg:hidden space-y-3 max-w-2xl mx-auto">
            {dores.map((d, i) => (
              <MobileDiagnosticoAccordionItem
                key={d.id}
                dor={d}
                index={i}
                isOpen={activeId === d.id}
                onToggle={() => setActiveId(prev => (prev === d.id ? "" : d.id))}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export { DoresDiagnosticoSection };
