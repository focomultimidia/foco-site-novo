"use client";

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

const iconColors: Record<number, { bg: string; text: string; border: string }> = {
  0: { bg: "bg-blue-950/60", text: "text-blue-400", border: "border-blue-800/50" },
  1: { bg: "bg-cyan-950/60", text: "text-cyan-400", border: "border-cyan-800/50" },
  2: { bg: "bg-violet-950/60", text: "text-violet-400", border: "border-violet-800/50" },
  3: { bg: "bg-emerald-950/60", text: "text-emerald-400", border: "border-emerald-800/50" },
};

const bentoSizes = [
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
];

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
    <section className="relative py-24 overflow-hidden bg-slate-950">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-800/50 bg-blue-950/50 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            Segurança & Compliance
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-white leading-none tracking-tighter antialiased mb-5">
            Sua operação protegida por
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              tecnologia de classe mundial
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Seguimos os mais altos padrões globais de segurança para garantir que
            os dados da sua empresa e dos seus hóspedes estejam sempre protegidos.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {certificacoes.map((cert, index) => {
            const Icon = iconMap[cert.icone] || Shield;
            const color = iconColors[index % 4];
            const bento = bentoSizes[index % 4];

            return (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className={`group relative rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm p-6 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:shadow-slate-900/60 hover:-translate-y-1 transition-all duration-300 cursor-default ${bento}`}
              >
                {/* Subtle inner glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-white/[0.03] to-transparent" />

                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 ${color.bg} ${color.border}`}
                >
                  <Icon className={`w-5 h-5 ${color.text}`} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-semibold text-white text-base mb-1.5">
                    {cert.titulo}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {cert.descricao}
                  </p>
                </div>

                {/* Bottom badge */}
                <div className={`mt-auto inline-flex w-fit items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${color.bg} ${color.border} ${color.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full bg-current`} />
                  Ativo
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-slate-500 text-sm"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-slate-600" />
            <span>Criptografia SSL/TLS</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-slate-800" />
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-slate-600" />
            <span>Hospedagem AWS & Google Cloud</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-slate-800" />
          <div className="flex items-center gap-2">
            <FileKey2 className="w-4 h-4 text-slate-600" />
            <span>Conformidade LGPD & PCI DSS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { SegurancaSection };
