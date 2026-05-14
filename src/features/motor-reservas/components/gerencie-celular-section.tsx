"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import {
  Activity,
  ListChecks,
  MessageSquare,
  SlidersHorizontal,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

// Mobile screenshots cycling on the central phone
const SLIDES = [
  "/assets/imgs/motor-de-reservas/site1.png",
  "/assets/imgs/motor-de-reservas/site2.png",
  "/assets/imgs/motor-de-reservas/site3.png",
  "/assets/imgs/motor-de-reservas/site4.png",
];

// Original text list preserved exactly, icons mapped per meaning
const recursos = [
  { icon: Activity,          text: "Visualização de chegadas, saídas e cancelamentos em tempo real" },
  { icon: ListChecks,        text: "Listagem de reservas diretas e dos canais conectados" },
  { icon: MessageSquare,     text: "CRM integrado para envio rápido de orçamentos personalizados" },
  { icon: SlidersHorizontal, text: "Atualização de tarifas, disponibilidade e restrições instantaneamente" },
  { icon: BarChart3,         text: "Acesso rápido a relatórios e status de ocupação" },
  { icon: ShieldCheck,       text: "Interface responsiva e segura, adaptada ao dia a dia do gestor" },
];

// ── Bento grid animation variants ────────────────────────────────────────────

const GRID_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const CARD_VARIANTS = {
  hidden:   { opacity: 0, x: 20, filter: "blur(4px)" },
  visible:  {
    opacity: 1,
    x:       0,
    filter:  "blur(0px)",
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// ── Phone dimensions ──────────────────────────────────────────────────────────

const DIMS = {
  lg: { w: 250, h: 452, r: 32, ri: 29, diW: 56, diH: 14 }, // central
  sm: { w: 200, h: 350, r: 27, ri: 24, diW: 46, diH: 12 }, // sides
};

// Shared chassis style to avoid repetition
function chassisStyle(size: "lg" | "sm") {
  return {
    width:        DIMS[size].w,
    height:       DIMS[size].h,
    borderRadius: DIMS[size].r,
    padding:      3,
    background:   "linear-gradient(150deg, #3a3a3e, #1c1c1e)",
    boxShadow:
      "0 28px 72px rgba(0,0,0,0.42), 0 4px 14px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.08)",
    flexShrink: 0 as const,
  };
}

// ── PhoneShell ────────────────────────────────────────────────────────────────
// Static iPhone-style mockup for the two side phones.

function PhoneShell({ image, size = "lg" }: { image: string; size?: "lg" | "sm" }) {
  const d = DIMS[size];
  return (
    <div style={chassisStyle(size)}>
      <div style={{ position: "relative", height: "100%", borderRadius: d.ri, overflow: "hidden", background: "#f5f5f7" }}>
        {/* Dynamic Island */}
        <div style={{ position: "absolute", top: 9, left: "50%", transform: "translateX(-50%)", width: d.diW, height: d.diH, borderRadius: 100, background: "#1c1c1e", zIndex: 10 }} />
        <img src={image} alt="App screen" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
      </div>
    </div>
  );
}

// ── PhoneAnimated ─────────────────────────────────────────────────────────────
// Central phone: cycles through SLIDES with a smooth crossfade.

function PhoneAnimated() {
  const [slide, setSlide] = useState(0);
  const d = DIMS.lg;

  useEffect(() => {
    const id = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={chassisStyle("lg")}>
      <div style={{ position: "relative", height: "100%", borderRadius: d.ri, overflow: "hidden", background: "#f5f5f7" }}>
        {/* Dynamic Island */}
        <div style={{ position: "absolute", top: 9, left: "50%", transform: "translateX(-50%)", width: d.diW, height: d.diH, borderRadius: 100, background: "#1c1c1e", zIndex: 10 }} />
        <AnimatePresence mode="wait">
          <motion.img
            key={slide}
            src={SLIDES[slide]}
            alt="App screen"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── PhoneTrio ─────────────────────────────────────────────────────────────────
// Three iPhone mockups: left and right are absolutely positioned behind the
// central phone. On mobile (< sm) only the animated central phone is shown.
//
// Entry: all three expand from scale: 0 (the "expansion from centre" effect).
//   Left/Right also translate from x: ±70 so they appear to fan out.
// Float: each phone has a slightly different vertical bob period and delay,
//   creating the multi-plane 3-D depth illusion.

function PhoneTrio() {
  return (
    <div className="relative h-[390px] flex items-center justify-center">

      {/* Ambient light blobs behind the phones */}
      <div className="absolute w-72 h-72 bg-blue-200/22 rounded-full blur-3xl top-1/4 -left-10 pointer-events-none" />
      <div className="absolute w-52 h-52 bg-indigo-200/18 rounded-full blur-3xl bottom-1/4 right-2 pointer-events-none" />

      {/* ── Left phone ────────────────────────────── */}
      <motion.div
        className="absolute hidden sm:block"
        style={{ zIndex: 10, right: "calc(50% + 18px)" }}
        initial={{ opacity: 0, scale: 0.3, x: 72 }}
        whileInView={{ opacity: 0.78, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
      >
        {/* Permanent tilt + independent float */}
        <motion.div
          animate={{ y: [0, -11, 0] }}
          transition={{ duration: 5.9, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          style={{ rotate: -11 }}
        >
          <PhoneShell image="/assets/imgs/motor-de-reservas/site2.png" size="sm" />
        </motion.div>
      </motion.div>

      {/* ── Central phone ─────────────────────────── */}
      <motion.div
        style={{ zIndex: 20 }}
        initial={{ opacity: 0, scale: 0.25 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Floats highest and slowest — feels "heavier" */}
        <motion.div
          animate={{ y: [0, -17, 0] }}
          transition={{ duration: 4.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <PhoneAnimated />
        </motion.div>
      </motion.div>

      {/* ── Right phone ───────────────────────────── */}
      <motion.div
        className="absolute hidden sm:block"
        style={{ zIndex: 10, left: "calc(50% + 18px)" }}
        initial={{ opacity: 0, scale: 0.3, x: -72 }}
        whileInView={{ opacity: 0.78, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
      >
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.7 }}
          style={{ rotate: 11 }}
        >
          <PhoneShell image="/assets/imgs/motor-de-reservas/site3.png" size="sm" />
        </motion.div>
      </motion.div>

    </div>
  );
}

// ── BentoCard ─────────────────────────────────────────────────────────────────
// Glassmorphism feature card. On hover:
//   · card lifts (y: -2) via whileHover
//   · inner glow appears (box-shadow change via state)
//   · icon scales up and turns blue

function BentoCard({
  recurso,
  index,
}: {
  recurso: (typeof recursos)[number];
  index: number;
}) {
  const Icon = recurso.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={CARD_VARIANTS}
      whileHover={{ y: -2, transition: { duration: 0.18 } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-2xl p-5 cursor-default"
      style={{
        background:     "rgba(255,255,255,0.82)",
        backdropFilter: "blur(14px)",
        border:         "1px solid rgba(255,255,255,0.72)",
        boxShadow:      hovered
          ? "0 6px 28px rgba(59,130,246,0.11), inset 0 0 28px rgba(59,130,246,0.055), 0 1px 2px rgba(0,0,0,0.04)"
          : "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Top-right corner radial tint */}
      <div
        className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, rgba(59,130,246,0.055), transparent 70%)" }}
      />

      {/* Icon — scales + changes colour when card is hovered */}
      <motion.div
        animate={{
          scale: hovered ? 1.22 : 1,
          color: hovered ? "#3b82f6" : "#9ca3af",
        }}
        transition={{ duration: 0.2 }}
        className="mb-3"
        style={{ display: "inline-block" }}
      >
        <Icon className="w-5 h-5" strokeWidth={1.75} />
      </motion.div>

      {/* Feature text — Space Grotesk for the tight tracking */}
      <p className="font-display font-medium text-[#1e3a5f] text-lg leading-snug tracking-tight">
        {recurso.text}
      </p>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

function GerencieCelularSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Cursor-following spotlight
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(59,130,246,0.055), transparent 70%)`;

  function onMouseMove(e: React.MouseEvent) {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative py-24 bg-slate-50 overflow-hidden"
    >
      {/* Spotlight overlay — follows cursor, z-0 so it stays behind content */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: spotlight }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#1e3a5f] mb-4 leading-tight tracking-tight">
            Gerencie seu motor de reservas pelo{" "}
            <span className="text-blue-500">celular</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Acesse os principais recursos da extranet diretamente do seu smartphone.
            Administre o dia a dia do seu hotel com mobilidade, agilidade e total controle.
          </p>
        </motion.div>

        {/* ── Content ────────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Phone trio */}
          <PhoneTrio />

          {/* Right: Bento grid */}
          <div>
            {/* Accent label */}
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-blue-500">
                Mobilidade total
              </span>
            </motion.div>

            {/* Staggered bento cards
                Mobile: 1 column — cards are wide enough to be readable
                sm+:    2 columns — classic bento layout */}
            <motion.div
              variants={GRID_VARIANTS}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {recursos.map((r, i) => (
                <BentoCard key={i} recurso={r} index={i} />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export { GerencieCelularSection };
