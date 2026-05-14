"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { Scale, TrendingUp, Layers, Timer, BadgePercent, MessageCircle } from "lucide-react";

// ── Data (content unchanged) ──────────────────────────────────────────────────

const recursos = [
  {
    icon:     Scale,
    label:    "Comparação",
    titulo:   "Comparador de preços entre canais",
    descricao:
      "Com o comparador integrado, o sistema exibe os preços em OTAs como Booking e Expedia, destacando a vantagem de fechar pelo seu site.",
  },
  {
    icon:     TrendingUp,
    label:    "Urgência",
    titulo:   "Urgência em tempo real",
    descricao:
      "Gatilhos como '10 pessoas visualizaram esta oferta hoje' ou '2 reservas nas últimas 2 horas' criam senso de urgência e impulsionam a conversão imediata.",
  },
  {
    icon:     Layers,
    label:    "Escassez",
    titulo:   "Escassez automatizada",
    descricao:
      "Exiba quantos quartos restam ou destaque quando uma oferta está prestes a acabar. A percepção de escassez acelera a decisão de compra.",
  },
  {
    icon:     Timer,
    label:    "Promoções",
    titulo:   "Contagem regressiva de promoções",
    descricao:
      "Com um contador visual no motor, crie senso de tempo limitado para ofertas especiais, estimulando o fechamento imediato da reserva.",
  },
  {
    icon:     BadgePercent,
    label:    "Pagamento",
    titulo:   "Descontos por forma de pagamento",
    descricao:
      "Ofereça benefícios exclusivos para quem paga via Pix ou à vista, incentivando métodos de pagamento mais vantajosos para o hotel.",
  },
  {
    icon:     MessageCircle,
    label:    "Recuperação",
    titulo:   "Recuperação de carrinho via WhatsApp",
    descricao:
      "Envie lembretes automáticos via WhatsApp com link direto para hóspedes que não finalizaram a reserva e aumente sua conversão em até 20%.",
  },
];

// ── WordReveal ────────────────────────────────────────────────────────────────
// Classic "text-mask" reveal: each word slides up from behind an overflow-hidden
// wrapper, with a blur that dissolves as it reaches its resting position.
// When active flips to false the words dive back down — keeping focus on the
// card that is currently in the centre of the viewport.

function WordReveal({
  text,
  active,
  baseDelay = 0,
}: {
  text: string;
  active: boolean;
  baseDelay?: number;
}) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: "0.28em" }}
        >
          <motion.span
            className="inline-block"
            animate={
              active
                ? { y: "0%",    filter: "blur(0px)", opacity: 1 }
                : { y: "115%",  filter: "blur(8px)", opacity: 0 }
            }
            transition={{
              duration:  active ? 0.54 : 0.22,
              ease:      active ? [0.22, 1, 0.36, 1] : "easeIn",
              delay:     active ? baseDelay + i * 0.058 : 0,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}

// ── GlowNode ──────────────────────────────────────────────────────────────────
// Pulsating node on the luminous spine.
// Two concentric rings expand outward and fade; the core brightens.

function GlowNode({ active }: { active: boolean }) {
  return (
    <div className="relative z-10 flex items-center justify-center w-10 h-10 flex-shrink-0">
      {/* Wide ambient ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(95,127,200,0.45), transparent 70%)" }}
        animate={
          active
            ? { scale: [1, 2.7, 1], opacity: [0.38, 0, 0.38] }
            : { scale: 1, opacity: 0 }
        }
        transition={
          active
            ? { duration: 2.8, repeat: Infinity, ease: "easeOut" }
            : { duration: 0.3 }
        }
      />
      {/* Tight inner ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(123,163,224,0.55), transparent 70%)" }}
        animate={
          active
            ? { scale: [1, 1.72, 1], opacity: [0.58, 0, 0.58] }
            : { scale: 1, opacity: 0 }
        }
        transition={
          active
            ? { duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 0.46 }
            : { duration: 0.3 }
        }
      />
      {/* Core dot */}
      <motion.div
        className="relative z-10 w-[14px] h-[14px] rounded-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(200,220,255,1) 0%, rgba(95,127,200,1) 45%, rgba(36,65,130,1) 100%)",
        }}
        animate={{
          scale: active ? 1 : 0.75,
          // Three-shadow set so Framer Motion can interpolate correctly
          boxShadow: active
            ? "0 0 0 2px rgba(95,127,200,0.55), 0 0 18px 4px rgba(95,127,200,0.85), 0 0 36px 0px rgba(95,127,200,0.40)"
            : "0 0 0 1px rgba(255,255,255,0.12), 0 0  0px 0px rgba(95,127,200,0.00), 0 0  0px 0px rgba(95,127,200,0.00)",
        }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

// ── BeamBorder ────────────────────────────────────────────────────────────────
// Four photons sweep clockwise around the card border.
// Each photon is 55% of its edge length with a centre-bright glow gradient.
// Opacity wrapper fades the whole layer in/out on active state changes.

const BEAM_DURATION = 1.85; // seconds for one full perimeter pass

function BeamBorder({ active }: { active: boolean }) {
  const glowStyle = (axis: "h" | "v") =>
    axis === "h"
      ? "linear-gradient(90deg, transparent, rgba(95,127,200,0.8), rgba(210,230,255,1), rgba(95,127,200,0.8), transparent)"
      : "linear-gradient(180deg, transparent, rgba(95,127,200,0.8), rgba(210,230,255,1), rgba(95,127,200,0.8), transparent)";

  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-20">
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* Top → */}
        <motion.div
          className="absolute top-0 h-[1px]"
          style={{ width: "55%", background: glowStyle("h"), boxShadow: "0 0 5px 1px rgba(95,127,200,0.4)" }}
          animate={{ left: ["-55%", "100%"] }}
          transition={{ duration: BEAM_DURATION, repeat: Infinity, ease: "linear" }}
        />
        {/* Right ↓ */}
        <motion.div
          className="absolute right-0 w-[1px]"
          style={{ height: "55%", background: glowStyle("v"), boxShadow: "0 0 5px 1px rgba(95,127,200,0.4)" }}
          animate={{ top: ["-55%", "100%"] }}
          transition={{ duration: BEAM_DURATION, repeat: Infinity, ease: "linear", delay: BEAM_DURATION * 0.25 }}
        />
        {/* Bottom ← */}
        <motion.div
          className="absolute bottom-0 h-[1px]"
          style={{ width: "55%", background: glowStyle("h"), boxShadow: "0 0 5px 1px rgba(95,127,200,0.4)" }}
          animate={{ right: ["-55%", "100%"] }}
          transition={{ duration: BEAM_DURATION, repeat: Infinity, ease: "linear", delay: BEAM_DURATION * 0.5 }}
        />
        {/* Left ↑ */}
        <motion.div
          className="absolute left-0 w-[1px]"
          style={{ height: "55%", background: glowStyle("v"), boxShadow: "0 0 5px 1px rgba(95,127,200,0.4)" }}
          animate={{ bottom: ["-55%", "100%"] }}
          transition={{ duration: BEAM_DURATION, repeat: Infinity, ease: "linear", delay: BEAM_DURATION * 0.75 }}
        />
      </motion.div>
    </div>
  );
}

// ── TimelineCard ──────────────────────────────────────────────────────────────
// Glassmorphism card with:
//   · spotlight opacity/blur/slide driven by the parent's isActive prop
//   · 3-D tilt (rotateX/Y) via mouse tracking + spring physics
//   · inner content parallax counter-moves against the tilt
//   · BeamBorder activates on hover OR when the card is in the spotlight zone
//   · WordReveal title tied to isActive

interface CardProps {
  recurso: (typeof recursos)[number];
  direction: "left" | "right";
  isActive: boolean;
  index: number;
}

function TimelineCard({ recurso, direction, isActive, index }: CardProps) {
  const Icon = recurso.icon;
  const [isHovered, setIsHovered] = useState(false);

  // ── 3-D tilt ─────────────────────────────────────────────────────────────
  // Normalised mouse position [0, 1] → rotation range [−deg, +deg]
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]),  { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-9, 9]),  { stiffness: 220, damping: 22 });

  // Inner parallax: content counter-moves against the tilt for depth
  const px = useSpring(useTransform(mouseX, [0, 1], [5, -5]), { stiffness: 180, damping: 18 });
  const py = useSpring(useTransform(mouseY, [0, 1], [-4, 4]), { stiffness: 180, damping: 18 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top)  / r.height);
  }
  function onMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  }

  const beamActive = isActive || isHovered;
  const xOffset    = direction === "left" ? -28 : 28;

  return (
    // Perspective wrapper — must be a non-transformed div so perspective applies
    // to the child rotate transforms, not to itself.
    <div
      style={{ perspective: "900px" }}
      className="will-change-transform"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      {/* Spotlight layer: dims, blurs and slides the card in/out of focus */}
      <motion.div
        animate={{
          opacity: isActive ? 1    : 0.14,
          x:       isActive ? 0    : xOffset,
          scale:   isActive ? 1    : 0.97,
          filter:  isActive ? "blur(0px)" : "blur(4px)",
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          rotateX,
          rotateY,
          transformStyle:  "preserve-3d",
          willChange:       "transform, opacity, filter",
        }}
        className="relative rounded-2xl"
      >
        {/* Card shell */}
        <motion.div
          animate={{
            boxShadow: isActive
              ? "0 0 0 1px rgba(95,127,200,0.30), 0 24px 64px rgba(0,0,0,0.55), 0 0 48px rgba(95,127,200,0.08)"
              : "0 0 0 1px rgba(255,255,255,0.05), 0  8px 24px rgba(0,0,0,0.30), 0 0  0px rgba(0,0,0,0.00)",
          }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-2xl p-6 bg-white/[0.03] backdrop-blur-2xl"
        >
          {/* Grainy texture — SVG fractalNoise overlay for depth */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
            style={{ opacity: 0.028 }}
          >
            <filter id={`grain-${index}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#grain-${index})`} />
          </svg>

          {/* Top-edge specular line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.13] to-transparent z-[2]" />

          {/* Step-number watermark */}
          <span
            aria-hidden="true"
            className="absolute -bottom-3 -right-1 font-black select-none pointer-events-none z-[1] leading-none"
            style={{ fontSize: "clamp(72px,8.5vw,108px)", color: "rgba(255,255,255,0.025)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Clockwise border beam — active on hover or spotlight */}
          <BeamBorder active={beamActive} />

          {/* Inner content — parallax layer counter-moves against tilt */}
          <motion.div
            style={{ x: px, y: py, willChange: "transform" }}
            className="relative z-[3]"
          >
            {/* Category chip */}
            <div className="inline-flex items-center px-2.5 py-[5px] mb-4 rounded-full border border-white/[0.08] bg-white/[0.04]">
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#7ba3e0]/65">
                {recurso.label}
              </span>
            </div>

            {/* Icon — scales up slightly when spotlight is on */}
            <motion.div
              animate={{ scale: isActive ? 1.08 : 1 }}
              transition={{ duration: 0.35 }}
              className="w-8 h-8 mb-4">
              <Icon className="w-8 h-8 text-white" strokeWidth={1.55} />
            </motion.div>

            {/* Title — word-by-word blur-reveal */}
            <h3 className="font-display font-semibold tracking-tight text-[1.20rem] leading-snug text-white mb-3">
              <WordReveal text={recurso.titulo} active={isActive} baseDelay={0.05} />
            </h3>

            {/* Description — fades with spotlight */}
            <motion.p
              animate={{ opacity: isActive ? 0.58 : 0.2 }}
              transition={{ duration: 0.4, delay: isActive ? 0.12 : 0 }}
              className="text-base leading-relaxed font-light text-white"
            >
              {recurso.descricao}
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── TimelineItem ──────────────────────────────────────────────────────────────
// One row of the timeline. Owns its own isActive state via useInView so the
// GlowNode and TimelineCard both receive the same signal.
//
// Grid layout:
//   Mobile  → [40px marker | 1fr card]
//   Desktop → [1fr | 80px marker | 1fr]  (alternating left/right cards)
//
// The "hidden lg:block" left slot uses display:none on mobile, so it's removed
// from flow — leaving only the 2-column mobile grid visible.

interface ItemProps {
  recurso: (typeof recursos)[number];
  isLeft: boolean;
  index: number;
}

function TimelineItem({ recurso, isLeft, index }: ItemProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  // Active when the row centre is within the middle ~56% of the viewport.
  // once defaults to false → re-triggers on scroll up/down (spotlight effect).
  const isActive = useInView(rowRef, { margin: "-22% 0px -22% 0px" });

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-[40px_1fr] lg:grid-cols-[1fr_80px_1fr] gap-x-4 lg:gap-x-8 items-center"
    >
      {/* Desktop left-card slot */}
      <div className="hidden lg:block">
        {isLeft && (
          <TimelineCard recurso={recurso} direction="left" isActive={isActive} index={index} />
        )}
      </div>

      {/* Marker — col 1 on mobile, col 2 on desktop */}
      <div className="flex items-center justify-center">
        <GlowNode active={isActive} />
      </div>

      {/* Right slot:
            mobile  → always renders the card (all cards sit right of spine)
            desktop → only renders for right-side items (odd index) */}
      <div>
        <div className="block lg:hidden">
          <TimelineCard recurso={recurso} direction="right" isActive={isActive} index={index} />
        </div>
        {!isLeft && (
          <div className="hidden lg:block">
            <TimelineCard recurso={recurso} direction="right" isActive={isActive} index={index} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

function AumenteReservasSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Spine fill: draws from top to bottom as the section traverses the viewport
  const spineScaleY    = useTransform(scrollYProgress, [0.04, 0.88], [0, 1]);
  // Halo opacity: peaks at mid-scroll so the glow "breathes" as you read
  const spineHaloOpacity = useTransform(scrollYProgress, [0.04, 0.46, 0.88], [0, 0.55, 0]);

  return (
    <section ref={sectionRef} className="relative py-28 bg-[#1e3a5f] overflow-hidden">

      {/* Ambient depth radial — adds 3-D depth to flat background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 55% at 50% 0%, rgba(36,65,130,0.42), transparent)",
        }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold text-white mb-5 leading-tight tracking-tight">
            Ferramentas inteligentes para{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7ba3e0] to-[#5f7fc8]">
              aumentar conversão
            </span>{" "}
            e reduzir abandono
          </h2>
          <p className="text-white/50 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Gatilhos de urgência, escassez e comparação de preços para acelerar a tomada
            de decisão e transformar visitantes em hóspedes pagantes.
          </p>
        </motion.div>

        {/* ── Timeline ───────────────────────────────────────────────────── */}
        <div className="relative">

          {/* Dim rail — always visible, marks the full height of the timeline */}
          <div
            className="absolute left-5 lg:left-1/2 lg:-translate-x-px top-0 bottom-0"
            style={{ width: "1.5px", background: "rgba(255,255,255,0.06)" }}
          />

          {/* Luminous fill — scroll-driven, draws top-to-bottom */}
          <motion.div
            className="absolute left-5 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 origin-top"
            style={{
              width:      "1.5px",
              scaleY:     spineScaleY,
              background: "linear-gradient(to bottom, #9ec3f5, #5f7fc8 45%, #3a6bc4 72%, #244182)",
              boxShadow:  "0 0 8px 1px rgba(95,127,200,0.55)",
            }}
          />

          {/* Glow halo — blurred wide overlay that pulses across the fill */}
          <motion.div
            className="absolute left-5 lg:left-1/2 top-0 bottom-0 origin-top pointer-events-none"
            style={{
              width:      "14px",
              x:          "-50%",           // centres 14px halo on the 1.5px spine
              scaleY:     spineScaleY,
              opacity:    spineHaloOpacity,
              filter:     "blur(6px)",
              background: "linear-gradient(to bottom, rgba(158,195,245,0.45), rgba(95,127,200,0.32) 50%, rgba(36,65,130,0.18))",
            }}
          />

          {/* Items */}
          <div className="flex flex-col gap-14 lg:gap-2">
            {recursos.map((r, i) => (
              <TimelineItem
                key={r.titulo}
                recurso={r}
                isLeft={i % 2 === 0}
                index={i}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export { AumenteReservasSection };
