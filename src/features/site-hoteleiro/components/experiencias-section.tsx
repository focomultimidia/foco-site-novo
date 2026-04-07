"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const experiencias = [
  {
    texto:
      "Descubra como o design intuitivo e a velocidade de carregamento transformam visitantes em hóspedes.",
  },
  {
    texto:
      "Tenha um site otimizado para conversão, com gatilhos mentais e recursos que conduzem o hóspede à reserva.",
  },
  {
    texto:
      "Crie landing pages para pacotes, promoções ou eventos, levando o cliente direto ao motor de reservas.",
  },
  {
    texto:
      "Destaque promoções na capa do site para converter tráfego em vendas e aumentar sua taxa de ocupação.",
  },
];

function ExperienciasSection() {
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
            <span className="text-blue-500">Experiências incríveis</span> para
            que os visitantes não abandonem seu site
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Descubra como o design intuitivo e a velocidade de carregamento
            transformam visitantes em hóspedes pagantes.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - List with Check Icons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {experiencias.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-600 leading-relaxed">{item.texto}</p>
              </motion.div>
            ))}
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
                src="/secction3.png"
                alt="Experiência do hóspede com popup de desconto"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { ExperienciasSection };
