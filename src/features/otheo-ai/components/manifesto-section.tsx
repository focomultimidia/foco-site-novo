"use client";

import { motion } from "framer-motion";

/**
 * ManifestoSection — faixa editorial cheia de largura, quebrando o ritmo
 * de cards antes do FAQ, sem trocar de tema (o resto do corpo da página é
 * claro; abrir uma segunda faixa escura aqui criaria um "flip" no meio da
 * página — ver regra de Page Theme Lock). Peso e cor fazem o destaque em
 * vez de trocar o fundo. Texto adaptado do fechamento do material fonte:
 * o Otheo não é só um chat, é uma camada sobre todo o ecossistema Foco.
 */
function ManifestoSection() {
  return (
    <section className="py-24 lg:py-28 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto border-t-4 border-[#fccc30] pt-8 text-center"
        >
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-[#1e3a5f] leading-[1.35] tracking-tight">
            No fim, o Otheo não é só um chat.{" "}
            <span className="text-slate-400">
              É uma camada inteligente sobre todo o ecossistema Foco: entende o contexto do seu
              hotel, consulta informações, executa ações e ensina você a tirar mais proveito das
              nossas soluções.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export { ManifestoSection };
