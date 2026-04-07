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
            O que é um <span className="text-blue-500">sistema para hotéis</span>{" "}
            com foco em gestão hoteleira?
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Descubra como o PMS (Property Management System) centraliza as operações
            e otimiza a produtividade de sua equipe.
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
              O <strong>PMS (Property Management System)</strong> é o coração da
              gestão hoteleira moderna. Este sistema de gerenciamento e controle
              de hotéis e pousadas foi desenvolvido para ser a ferramenta central
              que unifica e otimiza todas as operações.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Com o PMS, cada setor da sua propriedade ganha em eficiência: o
              gerente do hotel obtém relatórios estratégicos; o setor de reservas
              gerencia a ocupação com precisão; a recepção agiliza o check-in e o
              check-out; e a camareira recebe as ordens de serviço em tempo real.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ao automatizar atividades cruciais como fechamento de contas,
              controle de estoque e gestão de tarifas, o Property Management System
              garante mais produtividade para toda a equipe e, consequentemente,
              proporciona uma melhor experiência para o hóspede, elevando o padrão
              de serviço da sua hospedagem.
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
                src="/section1-pms.png"
                alt="Sistema PMS - Gestão Hoteleira"
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
