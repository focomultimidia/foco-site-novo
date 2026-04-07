"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Zap, Gift, Percent } from "lucide-react";

const recursos = [
  {
    icon: ShoppingCart,
    titulo: "RECUPERAÇÃO DE COMPRAS",
    descricao:
      "Ative descontos para recuperar reservas não concluídas e aumente sua taxa de conversão em até 15%.",
  },
  {
    icon: Zap,
    titulo: "DESCONTOS ESPECIAIS ATIVOS",
    descricao:
      "Crie ofertas como last minute, noite grátis, ou antecipação mínima, além de cupons de desconto.",
  },
  {
    icon: Gift,
    titulo: "PACOTES COM BENEFÍCIOS",
    descricao:
      "Configure pacotes promocionais personalizados com valor agregado para diferentes perfis de hóspedes.",
  },
  {
    icon: Percent,
    titulo: "PÁGINA DE OFERTAS",
    descricao:
      "Crie páginas exclusivas para divulgar seus descontos, melhorar o desempenho do seu site e impulsionar as reservas diretas.",
  },
];

function AumenteReservasSection() {
  return (
    <section className="py-24 bg-[#1e3a5f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-white mb-4 leading-tight">
            Aumente as <span className="text-blue-300">reservas diretas</span> do
            seu hotel criando vantagens para o visitante
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Alcance, atraia e converta mais hóspedes no seu site com decisões
            inteligentes e lucrativas.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {recursos.map((recurso, index) => {
              const Icon = recurso.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-xl p-5"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1e3a5f] mb-1 text-sm uppercase tracking-wide">
                      {recurso.titulo}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {recurso.descricao}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src="/section3.png"
                alt="Recuperação de compras e descontos"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { AumenteReservasSection };
