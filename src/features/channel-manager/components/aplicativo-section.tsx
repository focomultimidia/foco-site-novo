"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { Calendar, BedDouble, Send, Tag, BarChart3, LayoutDashboard } from "lucide-react";

const recursos = [
  {
    icon: Calendar,
    titulo: "Calendário de gerenciamento",
    descricao:
      "Altere tarifas, disponibilidade, restrições e diversos outros recursos de todas as suas acomodações pelo aplicativo.",
    lado: "esquerdo",
  },
  {
    icon: BedDouble,
    titulo: "Gestão de reservas",
    descricao:
      "Tenha acesso às reservas de todos os canais pelo seu celular, facilitando a gestão de entradas, saídas, alterações, cancelamentos e pagamentos.",
    lado: "esquerdo",
  },
  {
    icon: Send,
    titulo: "Múltiplos envios",
    descricao:
      "Realize lançamentos de tarifas, disponibilidade e restrições para longos períodos, de acordo com a política do seu hotel ou pousada.",
    lado: "esquerdo",
  },
  {
    icon: Tag,
    titulo: "Gestão de promoções",
    descricao:
      "Crie ofertas dinâmicas na extranet e sincronize-as instantaneamente com todas as suas OTAs conectadas. Maximize suas vendas com agilidade.",
    lado: "direito",
  },
  {
    icon: BarChart3,
    titulo: "Relatórios",
    descricao:
      "Relatórios detalhados por canal. Identifique tendências, ajuste tarifas e maximize a ocupação com inteligência de dados.",
    lado: "direito",
  },
  {
    icon: LayoutDashboard,
    titulo: "Dashboard",
    descricao:
      "Seu centro de comando. Visão 360° do seu negócio em tempo real. Acompanhe métricas chave, ocupação e performance de vendas em um só lugar.",
    lado: "direito",
  },
];

type RecursoItem = typeof recursos[0];

// ── Phone slides ──────────────────────────────────────────────────────────────
// Channel-manager app screenshots cycling inside the phone frame.
const PHONE_SLIDES = [
  { src: "/assets/imgs/shared/site1.webp", alt: "Channel Manager – Calendário" },
  { src: "/assets/imgs/shared/site2.webp", alt: "Channel Manager – Reservas"  },
  { src: "/assets/imgs/shared/site3.webp", alt: "Channel Manager – Tarifas"   },
  { src: "/assets/imgs/shared/site4.webp", alt: "Channel Manager – Dashboard"  },
] as const;

const PHONE_INTERVAL = 3000;

// ── Phone Mockup ──────────────────────────────────────────────────────────────
// Same frame structure as hero-section.tsx (Dynamic Island + home indicator).
// Self-contained: manages its own slide state and setInterval independently.
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
          "0 30px 60px -24px rgba(19,40,64,0.42), " +
          "0 0 0 1px rgba(19,40,64,0.08)",
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
            width={600}
            height={1098}
            loading="lazy"
            decoding="async"
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

// ─── Glass Card ───────────────────────────────────────────────────────────────
function GlassCard({
  recurso,
  index,
  align,
}: {
  recurso: RecursoItem;
  index: number;
  align: "left" | "right";
}) {
  const Icon = recurso.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const spotX = useMotionValue(-200);
  const spotY = useMotionValue(-200);
  const spotlight = useMotionTemplate`radial-gradient(180px circle at ${spotX}px ${spotY}px, rgba(40,89,146,0.06), transparent 68%)`;

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
        className={`relative overflow-hidden rounded-xl p-5 backdrop-blur-xl ${align === "left" ? "text-right" : ""}`}
        style={{
          background: "#ffffff",
          border: "1px solid rgba(19,40,64,0.07)",
          boxShadow: "0 1px 2px rgba(19,40,64,0.04), 0 12px 32px -16px rgba(19,40,64,0.18)",
        }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{ background: spotlight }}
        />

        <div className={`relative flex items-start gap-4 ${align === "left" ? "flex-row-reverse" : ""}`}>
          <div
            className="w-10 h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center flex-shrink-0"
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-[#132840] mb-1">{recurso.titulo}</h3>
            <p className="text-[#4c5c73] text-sm leading-relaxed">{recurso.descricao}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
function AplicativoSection() {
  const recursosEsquerda = recursos.filter((r) => r.lado === "esquerdo");
  const recursosDireita  = recursos.filter((r) => r.lado === "direito");

  return (
    <section className="py-24 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#132840] mb-4 leading-none tracking-tighter antialiased">
            O <span className="text-[#285992]">aplicativo para hotel</span> que
            facilita a sua gestão de tarifas e reservas
          </h2>
          <p className="text-[#4c5c73] text-lg max-w-3xl mx-auto">
            A liberdade de gerenciar seu hotel ou pousada de forma simples, rápida
            e sem a necessidade de estar no escritório.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {recursosEsquerda.map((recurso, index) => (
              <GlassCard key={recurso.titulo} recurso={recurso} index={index} align="left" />
            ))}
          </motion.div>

          {/* ── Center: Phone Mockup ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-[260px]">

              {/*
                Float animation — y oscillates 0 → -10 → 0 every 5.2 s,
                matching the hero-section center-phone behavior.
                Delay 0.8 s lets the scroll entrance finish first.
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

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {recursosDireita.map((recurso, index) => (
              <GlassCard key={recurso.titulo} recurso={recurso} index={index} align="right" />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export { AplicativoSection };
