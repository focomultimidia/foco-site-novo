"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.35, delayChildren: 0.3 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * TarifasSection — terceiro "assunto importante": mudar a diária via chat,
 * de qualquer lugar. Terceira e última aparição do mesmo cartão de
 * demonstração (ver OcupacaoSection e DisponibilidadeVendasSection) — as
 * três dores compartilham o mesmo dispositivo visual de propósito, cada
 * uma com seu próprio conteúdo.
 */
function TarifasSection() {
  return (
    <section className="py-24 lg:py-28 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#285992]/70 mb-4">
              Tarifas
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1e3a5f] leading-[1.05] tracking-tighter antialiased mb-5">
              A diária muda.{" "}
              <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
                Você não precisa estar no computador.
              </span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Uma reserva de última hora, um evento na cidade, o preço muda. Ajuste a tarifa
              direto do chat, de onde você estiver.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-[28px] p-7 sm:p-9"
            style={{
              background: "linear-gradient(155deg, #1c3c5e 0%, #0d1d33 100%)",
              boxShadow: "0 30px 70px -20px rgba(15,40,80,0.35)",
            }}
          >
            <motion.p variants={stepVariants} className="text-white/50 font-mono text-[11px] uppercase tracking-[0.14em] mb-4">
              Pergunta do hoteleiro
            </motion.p>
            <motion.p variants={stepVariants} className="text-white text-lg sm:text-xl font-medium leading-snug mb-7">
              "Muda a tarifa da Master pra R$ 450 hoje."
            </motion.p>

            <motion.div variants={stepVariants} className="flex items-center gap-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#fccc30] opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#fccc30]" />
              </span>
              <span className="font-mono text-xs text-[#fccc30]">Otheo está atualizando a tarifa...</span>
            </motion.div>

            <motion.div variants={stepVariants} className="flex items-center gap-4 rounded-2xl bg-white/[0.06] border border-white/10 px-5 py-4 mb-6">
              <div>
                <p className="text-white/40 text-xs mb-1">Categoria Master</p>
                <p className="text-white/40 text-sm line-through">R$ 380</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 flex-shrink-0" strokeWidth={2} />
              <p className="font-mono text-2xl text-[#fccc30] font-semibold tabular-nums">R$ 450</p>
            </motion.div>

            <motion.div variants={stepVariants} className="flex items-start gap-3 rounded-2xl bg-[#fccc30]/10 border border-[#fccc30]/25 px-5 py-4">
              <Sparkles className="w-4 h-4 text-[#fccc30] flex-shrink-0 mt-0.5" strokeWidth={2} />
              <p className="text-white text-[15px] leading-relaxed">
                Tarifa da Master atualizada para R$ 450, válida só para hoje. Quer aplicar pro fim de semana também?
              </p>
            </motion.div>

            <motion.p variants={stepVariants} className="text-white/35 font-mono text-[10px] uppercase tracking-[0.14em] text-center mt-5">
              Exemplo ilustrativo
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { TarifasSection };
