"use client";

import { motion } from "framer-motion";

function OQueESection() {
  return (
    <section className="pb-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
          <h2 className="text-3xl sm:text-5xl lg:text-[3.0rem] font-bold text-[#1e3a5f] mb-8 leading-tight">
            O que é um <span className="text-blue-500">gestor de canais</span>{" "}
            para hotéis e pousadas
          </h2>
          <p className="text-gray-500 font-semibold text-lg max-w-3xl mx-auto">
            A ferramenta essencial para sincronizar suas reservas em tempo real e eliminar de vez o risco de overbookingnas OTAs.
          </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              O Gestor de Canais (ou Channel Manager) é um software de gestão hoteleira fundamental para a distribuição de inventário e otimização de vendas. Sua função principal é sincronizar a disponibilidade e as tarifas do seu hotel ou pousada em tempo real em todos os seus canais de vendas conectados. Isso inclui as principais OTAs (Online Travel Agencies), operadoras, GDS, canais corporativos e, crucialmente, o motor de reservas do seu site.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ao automatizar essa distribuição, o channel manager elimina o risco de overbooking, garante a precisão dos dados e maximiza a ocupação com eficiência.
            </p>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] bg-white rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src="/assets/imgs/channel-manager/channel-manager.png"
                alt="Channel Manager - Gestor de Canais"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { OQueESection };
