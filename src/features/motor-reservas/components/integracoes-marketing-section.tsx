"use client";

import { motion } from "framer-motion";
import { Infinity, BarChart3, Megaphone, Layers, MessageSquare, Bot } from "lucide-react";

const integracoes = [
  {
    icon: Infinity,
    titulo: "Meta Ads",
    descricao:
      "Integre campanhas do Facebook e Instagram ao seu motor de reservas e acompanhe resultados reais das suas ações de marketing.",
  },
  {
    icon: Megaphone,
    titulo: "Google ADS",
    descricao:
      "Calcule o retorno sobre o investimento (ROI) das suas campanhas de marketing utilizando a integração com o TAG Manager e Google ADS.",
  },
  {
    icon: MessageSquare,
    titulo: "AskFlow",
    descricao:
      "Envie dados de recuperação de carrinho e reservas ao AskFlow e garanta mensagens personalizadas via WhatsAPP para cada etapa da jornada do hóspede.",
  },
  {
    icon: BarChart3,
    titulo: "GA4 Analytics",
    descricao:
      "Monitore toda a jornada do hóspede. Meça o desempenho do seu site e motor de reservas com dados completos sobre comportamento, origem do tráfego e taxa de conversão.",
  },
  {
    icon: Layers,
    titulo: "RD Station",
    descricao:
      "Envie dados de recuperação de carrinho e reservas ao RD Station e automatize ações de marketing por e-mail ou WhatsApp.",
  },
  {
    icon: Bot,
    titulo: "Chatbot",
    descricao:
      "Atenda seus visitantes 24 horas por dia com um chatbots inteligentes e integrados, aumentando o engajamento e a conversão em reservas.",
  },
];

function IntegracoesMarketingSection() {
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
            <span className="text-blue-500">Integrações</span> de Marketing para{" "}
            <span className="text-blue-500">impulsionar e mensurar</span> suas
            vendas
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Alcance, atraia e converta mais hóspedes com decisões inteligentes e
            lucrativas.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {integracoes.map((integracao, index) => {
              const Icon = integracao.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1e3a5f] mb-1">
                      {integracao.titulo}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {integracao.descricao}
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
                src="/section7.png"
                alt="Integrações de Marketing"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { IntegracoesMarketingSection };
