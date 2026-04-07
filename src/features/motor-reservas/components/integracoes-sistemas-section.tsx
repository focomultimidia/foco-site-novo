"use client";

import { motion } from "framer-motion";
import { Network, Building2, CreditCard, Bot, MessageCircle } from "lucide-react";

const integracoes = [
  {
    icon: Network,
    titulo: "GESTOR DE CANAIS",
    descricao:
      "Aumente a distribuição do seu hotel conectando o motor de reservas a mais de 800 canais de vendas.",
  },
  {
    icon: Building2,
    titulo: "PMS",
    descricao:
      "Integração com os principais sistemas de gestão hoteleira do Brasil.",
  },
  {
    icon: CreditCard,
    titulo: "PAGAMENTO ONLINE",
    descricao:
      "API de pagamento online integrada com Ame, Cielo, Rede, Pagseguro, Stone, Getnet e outros.",
  },
  {
    icon: Bot,
    titulo: "CHATBOT ASKSUITE",
    descricao:
      "Integrado com a Asksuite, o maior chatbot de atendimento hoteleiro inteligente do mundo.",
  },
  {
    icon: MessageCircle,
    titulo: "INTEGRAÇÃO WHATSAPP",
    descricao:
      "Impacte visitantes recuperando reservas ou enviando o link do check-in direto pelo WhatsApp.",
  },
];

function IntegracoesSistemasSection() {
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
            Integrações com os principais{" "}
            <span className="text-blue-500">sistemas para hotéis</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            O nosso motor de reservas é integrado com as principais soluções de
            tecnologia hoteleira para melhorar a sua experiência e automatizar os
            seus processos. Tenha mais tempo para impulsionar a hospitalidade e
            cuidar do seu hotel!
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src="/section5.png"
                alt="Integrações com sistemas"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Right Column - List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
                  transition={{ duration: 0.4, delay: index * 0.1 }}
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
        </div>
      </div>
    </section>
  );
}

export { IntegracoesSistemasSection };
