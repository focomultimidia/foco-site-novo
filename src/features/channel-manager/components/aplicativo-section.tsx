"use client";

import { motion } from "framer-motion";
import { Calendar, BedDouble, Send, Tag, BarChart3, LayoutDashboard } from "lucide-react";

const recursos = [
  {
    icon: Calendar,
    titulo: "Calendário de gerenciamento",
    descricao:
      "Altere tarifas, disponibilidade, restrições e diversos outros recursos de todas as suas acomodações pelo aplicativo.",
    lado: "esquerdo",
  },
  {
    icon: BedDouble,
    titulo: "Gestão de reservas",
    descricao:
      "Tenha acesso às reservas de todos os canais pelo seu celular, facilitando a gestão de entradas, saídas, alterações, cancelamentos e pagamentos.",
    lado: "esquerdo",
  },
  {
    icon: Send,
    titulo: "Múltiplos envios",
    descricao:
      "Realize lançamentos de tarifas, disponibilidade e restrições para longos períodos, de acordo com a política do seu hotel ou pousada.",
    lado: "esquerdo",
  },
  {
    icon: Tag,
    titulo: "Gestão de promoções",
    descricao:
      "Crie ofertas dinâmicas na extranet e sincronize-as instantaneamente com todas as suas OTAs conectadas. Maximize suas vendas com agilidade.",
    lado: "direito",
  },
  {
    icon: BarChart3,
    titulo: "Relatórios",
    descricao:
      "Relatórios detalhados por canal. Identifique tendências, ajuste tarifas e maximize a ocupação com inteligência de dados.",
    lado: "direito",
  },
  {
    icon: LayoutDashboard,
    titulo: "Dashboard",
    descricao:
      "Seu centro de comando. Visão 360° do seu negócio em tempo real. Acompanhe métricas chave, ocupação e performance de vendas em um só lugar.",
    lado: "direito",
  },
];

function AplicativoSection() {
  const recursosEsquerda = recursos.filter((r) => r.lado === "esquerdo");
  const recursosDireita = recursos.filter((r) => r.lado === "direito");

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
            O <span className="text-blue-300">aplicativo para hotel</span> que
            facilita a sua gestão de tarifas e reservas
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            A liberdade de gerenciar seu hotel ou pousada de forma simples, rápida
            e sem a necessidade de estar no escritório.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {recursosEsquerda.map((recurso, index) => {
              const Icon = recurso.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-5 text-right"
                >
                  <div className="flex items-start gap-4 flex-row-reverse">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1e3a5f] mb-1">{recurso.titulo}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{recurso.descricao}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Center Column - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-[280px]">
              <img
                src="/section3-channel.png"
                alt="Aplicativo mobile do Channel Manager"
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {recursosDireita.map((recurso, index) => {
              const Icon = recurso.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1e3a5f] mb-1">{recurso.titulo}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{recurso.descricao}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { AplicativoSection };
