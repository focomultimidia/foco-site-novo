"use client";

import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { motion, type Variants } from "framer-motion";
import {
  Shield,
  Lock,
  Database,
  Cloud,
  CreditCard,
  ServerCrash,
  ShieldCheck,
  FileKey2,
} from "lucide-react";
import type { Certificacao } from "../types";

interface SegurancaSectionProps {
  certificacoes: Certificacao[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Lock,
  Database,
  Cloud,
  CreditCard,
  ServerCrash,
  ShieldCheck,
  FileKey2,
};

/**
 * Na versão escura, cor = decoração. Aqui ela ganha função:
 *   · `tint`  identifica o DOMÍNIO da certificação (dado, rede, infra, pagamento)
 *   · o selo "Ativo" é sempre esmeralda — status é sinal, não identidade.
 * Sem isso, quatro cores em cards brancos viraria confete.
 */
const iconColors: Record<number, { bg: string; text: string; border: string; rail: string }> = {
  0: { bg: "bg-[#285992]/8",  text: "text-[#285992]", border: "border-[#285992]/18", rail: "#285992" },
  1: { bg: "bg-cyan-500/8",   text: "text-cyan-700",  border: "border-cyan-600/18",  rail: "#0e7490" },
  2: { bg: "bg-violet-500/8", text: "text-violet-700", border: "border-violet-600/18", rail: "#6d28d9" },
  3: { bg: "bg-amber-500/10", text: "text-amber-700", border: "border-amber-600/20",  rail: "#b45309" },
};


const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function SegurancaSection({ certificacoes }: SegurancaSectionProps) {
  return (
    <section className="relative py-24 overflow-hidden bg-[#f4f7fb]">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column layout: header left · cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-[3.5fr_6.5fr] gap-10 lg:gap-12 items-center">

          {/* Left: badge, title, subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionEyebrow>Segurança &amp; Compliance</SectionEyebrow>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#132840] leading-none tracking-tighter antialiased mb-5">
              Sua operação protegida por
              <br />
              <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
                tecnologia de classe mundial
              </span>
            </h2>

            <p className="text-[#4c5c73] text-base sm:text-lg leading-relaxed">
              Seguimos os mais altos padrões globais de segurança para garantir que
              os dados da sua empresa e dos seus hóspedes estejam sempre protegidos.
            </p>
          </motion.div>

          {/* Right: 2 × 2 card grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {certificacoes.map((cert, index) => {
              const Icon = iconMap[cert.icone] || Shield;
              const color = iconColors[index % 4];

              return (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-3xl paper paper-hover p-6 flex flex-col gap-4 cursor-default"
                >
                  {/* Trilho de domínio — 2px de cor na borda esquerda.
                      Cresce no hover: a identidade do card se declara sem
                      precisar tingir a superfície inteira. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 bottom-0 w-[2px] opacity-45 group-hover:opacity-100 group-hover:w-[3px] transition-all duration-300"
                    style={{ backgroundColor: color.rail }}
                  />

                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 ${color.bg} ${color.border}`}>
                    <Icon className={`w-5 h-5 ${color.text}`} />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="font-semibold text-[#132840] text-base mb-1.5">
                      {cert.titulo}
                    </h3>
                    <p className="text-[#4c5c73] text-sm leading-relaxed">
                      {cert.descricao}
                    </p>
                  </div>

                  {/* Selo de status — esmeralda em todos, com ponto pulsante */}
                  <div className="mt-auto inline-flex w-fit items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-emerald-600/20 bg-emerald-500/8 text-emerald-700">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    </span>
                    Ativo
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[#4c5c73] text-sm"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#285992]/70" />
            <span>Criptografia SSL/TLS</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-[#132840]/12" />
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-[#285992]/70" />
            <span>Hospedagem AWS &amp; Google Cloud</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-[#132840]/12" />
          <div className="flex items-center gap-2">
            <FileKey2 className="w-4 h-4 text-[#285992]/70" />
            <span>Conformidade LGPD &amp; PCI DSS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { SegurancaSection };
