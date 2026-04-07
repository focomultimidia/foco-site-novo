"use client";

import { motion } from "framer-motion";

function PorQueContratarSection() {
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
            Por que contratar um <span className="text-[#455A64]">sistema para hotel</span>?
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Tecnologia hoteleira que aumenta sua produtividade, elimina erros e eleva
            a lucratividade do seu negócio.
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
              O <strong>PMS (Property Management System)</strong> é a ferramenta
              fundamental para a gestão hoteleira de sucesso. Com este sistema
              para hotel ou pousada, você centraliza todas as ferramentas
              necessárias para gerenciar seu empreendimento, garantindo um aumento
              significativo na produtividade da sua equipe e, consequentemente, na
              sua lucratividade.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Um PMS para hotel robusto é a sua defesa contra os erros mais
              custosos da hotelaria. Ele elimina de forma definitiva problemas como
              overbookings (reservas duplicadas), a perda do histórico de reservas
              e falhas na conferência de consumo. Além disso, otimiza o controle de
              estoque e a gestão de limpeza da camareira, assegurando que cada
              detalhe da operação contribua para a eficiência e o resultado final.
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
                src="/section3-integracoes.png"
                alt="Sistema PMS"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { PorQueContratarSection };
