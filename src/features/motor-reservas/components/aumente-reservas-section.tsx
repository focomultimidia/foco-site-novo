"use client";

import { useRef } from "react";
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
// Node on the luminous spine. Replaces the old blurred pulsing-ring pair
// (read as a "blink") with two crisper, continuous signals:
//   · a thin conic-gradient halo that rotates slowly around the node — no
//     gaussian blur, just a masked ring (same technique as the BorderBeam
//     comets elsewhere on the site), so it stays sharp at any zoom
//   · the core dot breathes gently (scale, not opacity) instead of blinking

function GlowNode({ active }: { active: boolean }) {
  return (
    <div className="relative z-10 flex items-center justify-center w-10 h-10 flex-shrink-0">
      {/* Rotating halo ring — masked to a 1.5px ring, no blur */}
      <motion.div
        className="absolute inset-[-4px] rounded-full pointer-events-none"
        style={{
          padding: "1.5px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="w-full h-full rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 62%, rgba(95,127,200,0.55) 78%, #cfe0ff 92%, transparent 100%)",
          }}
          animate={active ? { rotate: 360 } : { rotate: 0 }}
          transition={active ? { duration: 3.4, repeat: Infinity, ease: "linear" } : { duration: 0 }}
        />
      </motion.div>

      {/* Static hairline ring — gives the node structure even when idle */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ boxShadow: "0 0 0 1px rgba(19,40,64,0.10)" }}
      />

      {/* Core dot — breathes (scale) instead of blinking (opacity) */}
      <motion.div
        className="relative z-10 w-[14px] h-[14px] rounded-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(200,220,255,1) 0%, rgba(95,127,200,1) 45%, rgba(36,65,130,1) 100%)",
        }}
        animate={{
          scale: active ? [1, 1.14, 1] : 0.75,
          boxShadow: active
            ? "0 0 0 2px rgba(95,127,200,0.55), 0 0 14px 2px rgba(95,127,200,0.65)"
            : "0 0 0 1px rgba(19,40,64,0.16), 0 0 0px 0px rgba(40,89,146,0.00)",
        }}
        transition={{
          scale:     active ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 },
          boxShadow: { duration: 0.4 },
        }}
      />
    </div>
  );
}

// ── RowBadge ──────────────────────────────────────────────────────────────────
// Editorial section marker — icon and label share ONE rounded-full card
// (no separate accent bar), rendered in the column OPPOSITE its card (same
// row as the GlowNode, so it lines up with the node horizontally; same
// column as the next card down, so it lines up with it vertically — it
// reads as the label announcing what's coming).
//
// Mirrored by side: on the right column icon→label read left→right and hug
// the column's left edge (already next to the spine). On the left column
// that same edge-hugging needs the OPPOSITE edge — `ml-auto` pushes the
// badge flush against the spine, and `flex-row-reverse` flips icon/label so
// the icon (not the label) ends up as the piece touching the node,
// mirroring the right-column badge instead of just relocating it.

function RowBadge({
  recurso,
  isActive,
  side,
}: {
  recurso: (typeof recursos)[number];
  isActive: boolean;
  side: "left" | "right";
}) {
  const Icon = recurso.icon;
  const mirrored = side === "left";
  return (
    <motion.div
      // Padding stays asymmetric (tight on the icon side, roomier on the
      // label side) — but it MIRRORS with the side, so the edge touching the
      // spine always gets the same 6px on both left- and right-column
      // badges, and the outer edge always gets the same 16px on both.
      className={`flex items-center gap-2.5 py-1.5 rounded-full w-fit ${
        mirrored ? "pl-4 pr-1.5 ml-auto flex-row-reverse" : "pl-1.5 pr-4"
      }`}
      animate={{
        opacity:    isActive ? 1 : 0.34,
        background: isActive ? "rgba(40,89,146,0.10)" : "rgba(40,89,146,0.04)",
      }}
      transition={{ duration: 0.45 }}
    >
      <motion.div
        className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #285992 100%)" }}
        animate={{ scale: isActive ? 1 : 0.88 }}
        transition={{ duration: 0.45 }}
      >
        <Icon className="w-4 h-4 text-white" strokeWidth={1.9} />
      </motion.div>
      <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#132840] whitespace-nowrap">
        {recurso.label}
      </span>
    </motion.div>
  );
}

// ── TimelineCard ──────────────────────────────────────────────────────────────
// Glassmorphism card with:
//   · spotlight opacity/blur/slide driven by the parent's isActive prop
//   · 3-D tilt (rotateX/Y) via mouse tracking + spring physics
//   · inner content parallax counter-moves against the tilt
//   · WordReveal title tied to isActive

interface CardProps {
  recurso: (typeof recursos)[number];
  direction: "left" | "right";
  isActive: boolean;
  index: number;
}

function TimelineCard({ recurso, direction, isActive, index }: CardProps) {
  const Icon = recurso.icon;

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
  }

  const xOffset = direction === "left" ? -28 : 28;

  return (
    // Perspective wrapper — must be a non-transformed div so perspective applies
    // to the child rotate transforms, not to itself.
    <div
      style={{ perspective: "900px" }}
      className="will-change-transform"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Spotlight layer: dims, blurs and slides the card in/out of focus */}
      <motion.div
        animate={{
          // Em fundo escuro 0.14 já sumia o card; sobre #f4f7fb um branco a
          // 14% desaparece por completo — 0.34 mantém o fantasma legível.
          opacity: isActive ? 1    : 0.34,
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
        className="relative rounded-3xl"
      >
        {/* Card shell — stroke: white @ 50% opacity, 3px (the elevation/glow
            shadow layers still soften in when the card leaves the spotlight,
            only the stroke itself no longer varies). */}
        <motion.div
          animate={{
            boxShadow: isActive
              ? "0 0 0 3px rgba(255,255,255,0.5), 0 28px 60px -28px rgba(19,40,64,0.40), 0 0 48px rgba(40,89,146,0.07)"
              : "0 0 0 3px rgba(255,255,255,0.5), 0 12px 28px -18px rgba(19,40,64,0.22), 0 0  0px rgba(19,40,64,0.00)",
          }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl p-6 bg-white"
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
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#132840]/10 to-transparent z-[2]" />

          {/* Step-number watermark */}
          <span
            aria-hidden="true"
            className="absolute -bottom-3 -right-1 font-black select-none pointer-events-none z-[1] leading-none"
            style={{ fontSize: "clamp(72px,8.5vw,108px)", color: "rgba(19,40,64,0.055)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Inner content — parallax layer counter-moves against tilt */}
          <motion.div
            style={{ x: px, y: py, willChange: "transform" }}
            className="relative z-[3]"
          >
            {/* Icon — scales up slightly when spotlight is on */}
            <motion.div
              animate={{ scale: isActive ? 1.08 : 1 }}
              transition={{ duration: 0.35 }}
              className="w-8 h-8 mb-4">
              <Icon className="w-8 h-8 text-[#285992]" strokeWidth={1.55} />
            </motion.div>

            {/* Title — word-by-word blur-reveal */}
            <h3 className="font-display font-semibold tracking-tight text-[1.20rem] leading-snug text-[#132840] mb-3">
              <WordReveal text={recurso.titulo} active={isActive} baseDelay={0.05} />
            </h3>

            {/* Description — fades with spotlight */}
            <motion.p
              animate={{ opacity: isActive ? 1 : 0.42 }}
              transition={{ duration: 0.4, delay: isActive ? 0.12 : 0 }}
              className="text-base leading-relaxed font-light text-[#4c5c73]"
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
// GlowNode, TimelineCard and RowBadge all receive the same signal.
//
// Grid layout:
//   Mobile  → [40px marker | 1fr card]     — RowBadge stacked above the card
//   Desktop → [1fr | 80px marker | 1fr]    — RowBadge occupies whichever
//                                             column the card is NOT in, so
//                                             it sits over the card that
//                                             lands in that same column on
//                                             the row below.
//
// The "hidden lg:block" slots use display:none on mobile, so they're removed
// from flow — leaving only the 2-column mobile stack visible.

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
      {/* Desktop left slot — card when isLeft, otherwise this row's badge */}
      <div className="hidden lg:block">
        {isLeft
          ? <TimelineCard recurso={recurso} direction="left" isActive={isActive} index={index} />
          : <RowBadge recurso={recurso} isActive={isActive} side="left" />}
      </div>

      {/* Marker — col 1 on mobile, col 2 on desktop */}
      <div className="flex items-center justify-center">
        <GlowNode active={isActive} />
      </div>

      {/* Right column */}
      <div>
        {/* Mobile — single column, badge stacked above its card */}
        <div className="flex flex-col gap-3 lg:hidden">
          <RowBadge recurso={recurso} isActive={isActive} side="right" />
          <TimelineCard recurso={recurso} direction="right" isActive={isActive} index={index} />
        </div>

        {/* Desktop right slot — card when !isLeft, otherwise this row's badge */}
        <div className="hidden lg:block">
          {!isLeft
            ? <TimelineCard recurso={recurso} direction="right" isActive={isActive} index={index} />
            : <RowBadge recurso={recurso} isActive={isActive} side="right" />}
        </div>
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
  const spineScaleY = useTransform(scrollYProgress, [0.04, 0.88], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-28 bg-[#f4f7fb] overflow-hidden">

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold text-[#132840] mb-5 leading-tight tracking-tight">
            Ferramentas inteligentes para{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#285992] to-[#427ab9]">
              aumentar conversão
            </span>{" "}
            e reduzir abandono
          </h2>
          <p className="text-[#4c5c73] text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Gatilhos de urgência, escassez e comparação de preços para acelerar a tomada
            de decisão e transformar visitantes em hóspedes pagantes.
          </p>
        </motion.div>

        {/* ── Timeline ───────────────────────────────────────────────────── */}
        <div className="relative">

          {/* Dim rail — always visible, marks the full height of the timeline */}
          <div
            className="absolute left-5 lg:left-1/2 lg:-translate-x-[1.25px] top-0 bottom-0"
            style={{ width: "2.5px", background: "rgba(19,40,64,0.10)" }}
          />

          {/* Luminous fill — scroll-driven, draws top-to-bottom. Cor sólida da
              marca Foco (#305490), sem halo desfocado. */}
          <motion.div
            className="absolute left-5 lg:left-1/2 lg:-translate-x-[1.25px] top-0 bottom-0 origin-top"
            style={{
              width:      "2.5px",
              scaleY:     spineScaleY,
              background: "#305490",
              boxShadow:  "0 0 8px 1px rgba(48,84,144,0.35)",
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
