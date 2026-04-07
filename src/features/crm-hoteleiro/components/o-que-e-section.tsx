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
            O que é um <span className="text-[#5E35B1]">CRM para hotéis</span> e pousadas?
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Descubra como a gestão de relacionamento com o cliente{" "}
            <span className="text-[#5E35B1] font-medium">transforma dados em personalização</span>{" "}
            e garante a <span className="text-[#5E35B1] font-medium">fidelização do hóspede</span>.
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
              O <strong>CRM (Customer Relationship Management) Hoteleiro</strong> é um
              sistema estratégico focado em gerenciar e analisar as interações e os
              dados de todos os hóspedes e potenciais clientes. Ele vai além de um
              simples cadastro, atuando como um banco de dados centralizado que
              armazena o histórico completo de cada cliente: desde a primeira cotação,
              passando pelas preferências de quarto, consumo no frigobar, reclamações
              e até mesmo datas especiais.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Seu principal objetivo é permitir que o hotel ofereça um atendimento
              altamente personalizado e crie relacionamentos duradouros. Ao conhecer
              profundamente o hóspede, o CRM possibilita a criação de campanhas de
              marketing segmentadas, ofertas de upsell no momento certo e, o mais
              importante, a antecipação de necessidades. Em resumo, o CRM Hoteleiro
              transforma dados em fidelização, garantindo que o hóspede retorne e se
              torne um promotor da sua marca.
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
                src="/section1-crm.png"
                alt="CRM Hoteleiro"
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
