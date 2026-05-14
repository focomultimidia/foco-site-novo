"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
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

// ─── Border Beam ─────────────────────────────────────────────────────────────
function BorderBeam({ duration }: { duration: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{
        inset: 0,
        borderRadius: 12,
        padding: "1px",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
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

// ─── Glass Card ───────────────────────────────────────────────────────────────
// Estático no layout — sem flutuação, sem tilt.
// Mantém: spotlight de cursor, border beam, glassmorphism.
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

  // Spotlight: brilho radial que segue o cursor dentro do card
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
        className={`relative overflow-hidden rounded-xl p-5 backdrop-blur-xl ${align === "left" ? "text-right" : ""}`}
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.30)",
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

        {/* Conteúdo */}
        <div className={`relative flex items-start gap-4 ${align === "left" ? "flex-row-reverse" : ""}`}>
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
            <h3 className="font-bold text-white mb-1">{recurso.titulo}</h3>
            <p className="text-white/55 text-sm leading-relaxed">{recurso.descricao}</p>
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
    <section className="py-24 bg-[#1e3a5f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-white mb-4 leading-tight">
            O <span className="text-blue-300">aplicativo para hotel</span> que
            facilita a sua gestão de tarifas e reservas
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-[280px]">
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
              <div
                className="relative overflow-hidden rounded-3xl border border-white/10"
                style={{
                  boxShadow:
                    "0 28px 72px rgba(0,0,0,0.60), 0 0 0 1px rgba(255,255,255,0.06) inset",
                  zIndex: 1,
                }}
              >
                <video
                  src="/assets/videos/channel-manager/app-foco.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto block"
                />
              </div>
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
