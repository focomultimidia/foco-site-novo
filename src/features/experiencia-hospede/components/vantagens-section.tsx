"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { Utensils, MapPin, Ticket, Heart, Shield, Bell } from "lucide-react";

// ── Data (original — unchanged) ───────────────────────────────────────────────
const vantagensEsquerda = [
  {
    icon: Utensils,
    titulo: "Restaurantes",
    descricao:
      "Economia e praticidade para que o hóspede tenha acesso a descontos nos principais restaurantes do seu destino.",
  },
  {
    icon: MapPin,
    titulo: "Passeios e Transfers",
    descricao:
      "Descontos exclusivos para que seus hóspedes vivenciem experiências incríveis no seu destino.",
  },
  {
    icon: Ticket,
    titulo: "Ingressos",
    descricao:
      "Acesso a descontos em atrações e espetáculos negociados pela equipe da Foco.",
  },
];

const vantagensDireita = [
  {
    icon: Heart,
    titulo: "Fidelização do hóspede",
    descricao:
      "Vantagens e benefícios para conquistar seu hóspede, garantindo o retorno de clientes satisfeitos.",
  },
  {
    icon: Shield,
    titulo: "Segurança e confiabilidade",
    descricao:
      "Sistema com total segurança para garantir que apenas seu hóspede acesse o aplicativo.",
  },
  {
    icon: Bell,
    titulo: "Push Interativo",
    descricao:
      "Aplicativo com alerta de toda a programação de entretenimento do seu hotel e destino.",
  },
];

type VantagemItem = {
  icon: React.ElementType;
  titulo: string;
  descricao: string;
};

// ── Phone slides ──────────────────────────────────────────────────────────────
// App do Hóspede screens — matches the section's theme.
const PHONE_SLIDES = [
  { src: "/assets/imgs/experiencia-do-hospede/app-hospede.jpg",  alt: "Foco Pass – Home" },
  { src: "/assets/imgs/experiencia-do-hospede/app-hospede1.jpg", alt: "Foco Pass – Atrações" },
  { src: "/assets/imgs/experiencia-do-hospede/app-hospede2.png", alt: "Foco Pass – Programação" },
] as const;

const PHONE_INTERVAL = 3200; // ms between slides

// ── Phone Mockup ──────────────────────────────────────────────────────────────
// Mirrors the hero-section PhoneMockup exactly:
// · rounded frame with Dynamic Island notch + home indicator
// · internal AnimatePresence fade between slides driven by setInterval
function PhoneMockup() {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setSlideIdx(prev => (prev + 1) % PHONE_SLIDES.length),
      PHONE_INTERVAL
    );
    return () => clearInterval(id);
  }, []);

  const slide = PHONE_SLIDES[slideIdx];

  return (
    <div
      className="bg-[#fbfbfb] rounded-[26px] p-[4px] w-full"
      style={{
        boxShadow:
          "0 24px 56px rgba(0,0,0,0.42), " +
          "0 0 0 1px rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="relative bg-white rounded-[22px] overflow-hidden"
        style={{ aspectRatio: "9/19.5" }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-12 h-[12px] bg-[#1c1c1e] rounded-full" />

        {/* Screen — crossfade between slides */}
        <AnimatePresence mode="wait">
          <motion.img
            key={slideIdx}
            src={slide.src}
            alt={slide.alt}
            className="absolute inset-0 w-full h-full object-cover object-top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-[4px] bg-black/20 rounded-full z-10" />
      </div>
    </div>
  );
}

// ── Border Beam ───────────────────────────────────────────────────────────────
function BorderBeam({ duration }: { duration: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{
        inset: 0,
        borderRadius: 12,
        padding: "1px",
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "200%",
          height: "200%",
          x: "-50%",
          y: "-50%",
          transformOrigin: "center",
          background:
            "conic-gradient(from 0deg, transparent 0%, transparent 76%, rgba(255,255,255,0.80) 87%, transparent 100%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// ── Glass Card ────────────────────────────────────────────────────────────────
function GlassCard({
  vantagem,
  index,
  align,
}: {
  vantagem: VantagemItem;
  index: number;
  align: "left" | "right";
}) {
  const Icon = vantagem.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const spotX = useMotionValue(-200);
  const spotY = useMotionValue(-200);
  const spotlight = useMotionTemplate`radial-gradient(180px circle at ${spotX}px ${spotY}px, rgba(255,255,255,0.07), transparent 68%)`;

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const { left, top } = cardRef.current.getBoundingClientRect();
      spotX.set(e.clientX - left);
      spotY.set(e.clientY - top);
    },
    [spotX, spotY]
  );

  const onMouseLeave = useCallback(() => {
    spotX.set(-200);
    spotY.set(-200);
  }, [spotX, spotY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`relative overflow-hidden rounded-xl p-5 backdrop-blur-xl ${
          align === "left" ? "text-right" : ""
        }`}
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.30)",
        }}
      >
        {/* Border beam */}
        <BorderBeam duration={4.5 + index * 0.45} />

        {/* Spotlight overlay */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{ background: spotlight }}
        />

        {/* Content */}
        <div
          className={`relative flex items-start gap-4 ${
            align === "left" ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className="w-10 h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              boxShadow:
                "0 0 10px rgba(59,130,246,0.65), 0 0 22px rgba(59,130,246,0.30), 0 0 40px rgba(59,130,246,0.12)",
            }}
          >
            <Icon
              className="w-5 h-5 text-white"
              style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.75))" }}
            />
          </div>
          <div>
            <h3 className="font-bold text-white mb-1">{vantagem.titulo}</h3>
            <p className="text-white/55 text-sm leading-relaxed">
              {vantagem.descricao}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function VantagensSection() {
  return (
    <section className="py-24 bg-[#1e3a5f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-white leading-none tracking-tighter antialiased mb-2">
            <span className="text-blue-300">Outras vantagens</span> em utilizar
            o aplicativo do hóspede
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Agilidade, conveniência e descontos exclusivos: os diferenciais que
            elevam o padrão de serviço do seu hotel.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-center">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {vantagensEsquerda.map((vantagem, index) => (
              <GlassCard
                key={vantagem.titulo}
                vantagem={vantagem}
                index={index}
                align="left"
              />
            ))}
          </motion.div>

          {/* Center — Animated Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-[260px]">
              {/* Ambient glow */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: "-32px",
                  background:
                    "radial-gradient(ellipse at center, rgba(59,130,246,0.38) 0%, rgba(14,165,233,0.18) 42%, transparent 68%)",
                  filter: "blur(32px)",
                  zIndex: 0,
                }}
              />

              {/*
                Float wrapper — mirrors the center-phone float from hero-section:
                y oscillates 0 → -10 → 0 every 5.2 s.
                The whileInView on the parent already handled the scroll entrance;
                once visible this inner motion.div runs its infinite float loop.
              */}
              <motion.div
                className="relative"
                style={{ zIndex: 1 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              >
                <PhoneMockup />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {vantagensDireita.map((vantagem, index) => (
              <GlassCard
                key={vantagem.titulo}
                vantagem={vantagem}
                index={index}
                align="right"
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export { VantagensSection };
