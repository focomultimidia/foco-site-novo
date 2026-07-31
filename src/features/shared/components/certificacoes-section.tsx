"use client";

import { useState } from "react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const certificacoes = [
  {
    id:       "booking",
    logo:     "/assets/imgs/certificacoes/booking.webp",
    titulo:   "Booking Connectivity Partner Premier",
    descricao:
      "Oferecemos a você a conexão mais avançada e estável do mercado, garantindo que suas reservas fluam com segurança, agilidade e máxima eficiência.",
    accent:   "#08397e",
  },
  {
    id:       "expedia",
    logo:     "/assets/imgs/certificacoes/expedia.webp",
    titulo:   "Expedia Elite Partner 2025",
    descricao:
      "Estamos no seleto grupo dos 2% melhores fornecedores globais de tecnologia do Expedia Group. Para o seu hotel, isso significa integrações perfeitas e desempenho de reservas otimizado ao máximo.",
    accent:   "#000099",
  },
  {
    id:       "stone",
    logo:     "/assets/imgs/certificacoes/stone.webp",
    titulo:   "Stone Master Partner",
    descricao:
      "Integramos a mais robusta plataforma financeira diretamente ao nosso ecossistema. Facilitamos a gestão do seu negócio com pagamentos rápidos, seguros e sem dor de cabeça.",
    accent:   "#00a868",
  },
  {
    id:       "pci",
    logo:     "/assets/imgs/certificacoes/pci.webp",
    titulo:   "Certificação Global PCI SSC",
    descricao:
      "A segurança dos dados dos seus hóspedes é nossa prioridade absoluta. Todas as transações feitas através da Foco seguem os mais rigorosos padrões mundiais de proteção de dados.",
    accent:   "#006b74",
  },
];

// ── Variants ──────────────────────────────────────────────────────────────────

const gridVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.10 } },
};

const cardVariants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  {
    opacity: 1,
    y:       0,
    transition: { type: "spring" as const, damping: 20, stiffness: 100 },
  },
};

// ── CertCard ──────────────────────────────────────────────────────────────────

function CertCard({ cert }: { cert: typeof certificacoes[number] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y:               -6,
        backgroundColor: cert.accent,
        boxShadow:       "0 24px 56px rgba(30,58,95,0.18), 0 4px 16px rgba(30,58,95,0.10)",
        transition:      { duration: 0.25, ease: "easeOut" },
      }}
      style={{ backgroundColor: "#ffffff" }}
      className="relative overflow-hidden rounded-3xl border border-slate-100 shadow-sm p-5 flex flex-col gap-4 cursor-default"
    >
      {/* Shine sweep */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="shine"
            initial={{ x: "-150%" }}
            animate={{ x: "260%" }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="absolute left-0 w-1/2 pointer-events-none z-10"
            style={{ top: "-20%", height: "140%" }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                transform: "skewX(-15deg)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo / Seal */}
      <div className="flex items-center justify-center">
        <img
          src={cert.logo}
          alt={cert.titulo}
          width={281}
          height={70}
          loading="lazy"
          decoding="async"
          className="max-w-full h-auto object-contain"
          style={{
            filter:     isHovered ? "brightness(0) invert(1)" : "none",
            transition: "filter 0.25s ease",
          }}
        />
      </div>

      <div
        className="h-px"
        style={{ backgroundColor: isHovered ? "rgba(255,255,255,0.22)" : "#e2e8f0" }}
      />

      {/* Copy */}
      <div>
        <h3
          className="font-bold text-sm leading-snug tracking-tight mb-2"
          style={{ color: isHovered ? "#ffffff" : "#1e293b" }}
        >
          {cert.titulo}
        </h3>
        <p
          className="text-xs leading-relaxed"
          style={{ color: isHovered ? "rgba(255,255,255,0.78)" : "#64748b" }}
        >
          {cert.descricao}
        </p>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export interface CertificacoesSectionProps {
  subtitle?: string;
}

function CertificacoesSection({
  subtitle = "Parceiros e certificações de classe mundial que atestam a qualidade e segurança da nossa plataforma.",
}: CertificacoesSectionProps) {
  return (
    <section className="relative py-24 bg-[#f4f7fb] overflow-hidden">

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionEyebrow>Certificações e parcerias</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            Certificações que garantem{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              excelência e confiança
            </span>
          </h2>
          {subtitle && (
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* 4-column card grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {certificacoes.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { CertificacoesSection };
