"use client";

import { motion } from "framer-motion";

function ImportanciaSection() {
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
            A importância estratégica da{" "}
            <span className="text-[#455A64]">integração de sistemas</span> para o
            hoteleiro
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Descubra como a sinergia entre as nossas integrações{" "}
            <span className="text-[#455A64] font-medium">elimina erros</span> e{" "}
            <span className="text-[#455A64] font-medium">maximiza a receita</span>{" "}
            do seu hotel.
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
              No cenário competitivo da hotelaria, a integração de sistemas não é
              mais um luxo, mas sim uma necessidade estratégica. Para o hoteleiro,
              possuir um ecossistema tecnológico onde o PMS (gestão operacional), o
              RMS (gestão de receita), e as ferramentas de Marketing se comunicam
              perfeitamente é o que define a eficiência e a lucratividade do negócio.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Em suma, um sistema integrado transforma a tecnologia de um custo
              operacional em um centro de inteligência e lucro, garantindo que o
              hotel opere com máxima eficiência e esteja sempre um passo à frente da
              concorrência.
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
                src="/section1-integracoes.png"
                alt="Integração de Sistemas"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { ImportanciaSection };
