"use client";

import { motion } from "framer-motion";

function PareComissoesSection() {
  return (
    <section className="py-24 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-2">
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">Pare de pagar</span> comissões
            altas, aumente sua lucratividade com{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">reservas diretas</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Conquiste a independência das OTAs e garanta que 100% da sua receita
            fique com o seu hotel, pousada ou resort.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-3xl overflow-hidden p-6 flex items-center justify-center">
              <img
                src="/assets/imgs/motor-de-reservas/section6.webp"
                alt="Comparador de preços"
                width={1920}
                height={598}
                loading="lazy"
                decoding="async"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Right Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-slate-500 text-lg leading-relaxed">
              Em um mercado hoteleiro cada vez mais competitivo, a verdadeira
              margem de lucro do seu hotel, pousada ou resort está na capacidade
              de <strong>gerar reservas diretas</strong>. Você está cansado de ver
              uma fatia significativa do seu faturamento ser destinada a{" "}
              <strong>comissões de terceiros</strong>? Chegou a hora de retomar o
              controle.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed">
              Ter um motor de reservas próprio não é apenas uma conveniência, é
              a estratégia mais inteligente para garantir a independência das
              OTAs, <strong>otimizar sua taxa de conversão</strong> e, o mais
              importante, elevar drasticamente a{" "}
              <strong>lucratividade do seu negócio</strong>. Descubra como
              transformar seu site no seu{" "}
              <strong>canal de vendas diretas mais poderoso</strong>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { PareComissoesSection };
