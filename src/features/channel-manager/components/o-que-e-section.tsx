"use client";

import { motion } from "framer-motion";

function OQueESection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-[#1e3a5f] mb-4 leading-tight">
            O que é um <span className="text-blue-500">gestor de canais</span>{" "}
            para hotéis e pousadas
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            A ferramenta essencial para{" "}
            <span className="text-blue-500 font-medium">
              sincronizar suas reservas em tempo real
            </span>{" "}
            e eliminar de vez o{" "}
            <span className="text-blue-500 font-medium">risco de overbooking</span>{" "}
            nas OTAs.
          </p>
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
            <p className="text-gray-600 text-lg leading-relaxed">
              O <strong>Gestor de Canais</strong> (ou Channel Manager) é um{" "}
              <strong>software de gestão hoteleira</strong> fundamental para a{" "}
              <strong>distribuição de inventário</strong> e{" "}
              <strong>otimização de vendas</strong>. Sua função principal é{" "}
              <strong>sincronizar a disponibilidade e as tarifas</strong> do seu
              hotel ou pousada em tempo real em todos os seus{" "}
              <strong>canais de vendas</strong> conectados. Isso inclui as
              principais OTAs (Online Travel Agencies), operadoras, GDS, canais
              corporativos e, crucialmente, o motor de reservas do seu site.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ao automatizar essa distribuição, o channel manager{" "}
              <strong>elimina o risco de overbooking</strong>, garante a
              precisão dos dados e maximiza a ocupação com eficiência.
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
            <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden p-6 flex items-center justify-center">
              <img
                src="/section1-channel.png"
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
