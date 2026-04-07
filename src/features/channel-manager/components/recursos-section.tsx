"use client";

import { motion } from "framer-motion";
import { BarChart3, Calendar, Building2, Percent, Smartphone, Link2 } from "lucide-react";

const recursos = [
  {
    icon: BarChart3,
    titulo: "Relatórios de canais",
    descricao:
      "Compare de forma simplificada a produtividade de reservas de cada canal conectado.",
  },
  {
    icon: Calendar,
    titulo: "Único calendário",
    descricao:
      "Em um único calendário, é possível alimentar tarifas, disponibilidade e restrições em mais de 450 canais.",
  },
  {
    icon: Building2,
    titulo: "Integração com PMS",
    descricao:
      "Vários PMS's conectados para que as reservas, cancelamentos, alterações e disponibilidade sejam gerenciados pelo seu sistema de gestão hoteleira.",
  },
  {
    icon: Percent,
    titulo: "Markup do tarifário por canal",
    descricao:
      "Um único lançamento de tarifário e preços diferentes nos diversos canais de vendas.",
  },
  {
    icon: Smartphone,
    titulo: "Aplicativo mobile",
    descricao:
      "Gerencie, a qualquer momento, as tarifas, restrições e disponibilidade do seu hotel pelo nosso aplicativo.",
  },
  {
    icon: Link2,
    titulo: "Dependências",
    descricao:
      "Configure as dependências de tarifas, por acomodação e pax, em percentual, facilitando o lançamento do seu tarifário.",
  },
];

function RecursosSection() {
  return (
    <section className="py-24 bg-gray-50">
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
            Confira alguns recursos do{" "}
            <span className="text-blue-500">melhor gestor de canais</span> do
            Brasil
          </h2>
        </motion.div>

        {/* Grid - 3 columns x 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recursos.map((recurso, index) => {
            const Icon = recurso.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 text-center"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="font-bold text-[#1e3a5f] mb-2">{recurso.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{recurso.descricao}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { RecursosSection };
