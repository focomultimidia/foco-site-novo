"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Números derivados do próprio exemplo (31/42 = 73,8%), não uma métrica
// inventada — por isso o rótulo "exemplo ilustrativo" abaixo do cartão.
const ETAPAS = [
  { label: "UHs totais", valor: "42" },
  { label: "UHs ocupadas", valor: "31" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.35, delayChildren: 0.3 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * OcupacaoSection — a peça assinatura da página, e o primeiro dos 3
 * "assuntos importantes" pedidos: gestão de ocupação. Em vez de listar "IA
 * generativa" como um bullet point, dramatiza o próprio exemplo do material
 * fonte: a pergunta não está numa lista fixa de respostas, então o Otheo
 * busca os dados que faltam e calcula. Dourado aqui carrega significado,
 * não é só cor de destaque: é a cor do "momento de entendimento" (halo da
 * hero, pontinho pulsante aqui).
 */
function OcupacaoSection() {
  return (
    <section className="py-24 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#285992]/70 mb-4">
              Gestão de ocupação
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1e3a5f] leading-[1.05] tracking-tighter antialiased mb-5">
              Pare de calcular.{" "}
              <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
                Pergunte.
              </span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              Otheo não decora respostas prontas: quando você pergunta pela sua ocupação, ele
              soma as UHs totais, cruza com as ocupadas e chega ao número, na hora.
            </p>
            <p className="text-slate-500 leading-relaxed">
              É a mesma lógica por trás de qualquer pergunta sobre a sua operação: o Otheo
              entende o que falta pra responder e vai atrás, em vez de consultar uma lista fixa
              de perguntas e respostas.
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
              "Qual é minha ocupação hoje?"
            </motion.p>

            <motion.div variants={stepVariants} className="flex items-center gap-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#fccc30] opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#fccc30]" />
              </span>
              <span className="font-mono text-xs text-[#fccc30]">Otheo está analisando os dados...</span>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {ETAPAS.map((etapa) => (
                <motion.div
                  key={etapa.label}
                  variants={stepVariants}
                  className="rounded-2xl bg-white/[0.06] border border-white/10 px-4 py-3.5"
                >
                  <p className="font-mono text-2xl text-white font-semibold tabular-nums">{etapa.valor}</p>
                  <p className="text-white/50 text-xs mt-1">{etapa.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={stepVariants} className="flex items-start gap-3 rounded-2xl bg-[#fccc30]/10 border border-[#fccc30]/25 px-5 py-4">
              <Sparkles className="w-4 h-4 text-[#fccc30] flex-shrink-0 mt-0.5" strokeWidth={2} />
              <p className="text-white text-[15px] leading-relaxed">
                Você está com <span className="font-semibold text-[#fccc30]">73,8%</span> de ocupação: 31 de 42 UHs.
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

export { OcupacaoSection };
