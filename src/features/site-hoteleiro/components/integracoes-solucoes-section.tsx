"use client";

import { motion } from "framer-motion";

const integracoes = [
  {
    logo: "/motor-de-reservas.png",
    titulo: "Motor de Reservas",
    descricao:
      "Converta mais clientes com um motor de reservas eficiente, simples e seguro!",
  },
  {
    logo: "/google-analytics.png",
    titulo: "Google Analytics",
    descricao:
      "Descubra o perfil do seu hóspede, quais ações de marketing geram mais reservas e muito mais!",
  },
  {
    logo: "/facebook-ads.png",
    titulo: "Facebook ADS",
    descricao:
      "Crie campanhas e alcance hóspedes em potencial nas principais redes sociais do mundo.",
  },
  {
    logo: "/asksuite.png",
    titulo: "Asksuite",
    descricao:
      "Inteligência artificial hoteleira número 1 do mundo, focada em aumentar reservas diretas e otimizar a gestão do atendimento.",
  },
  {
    logo: "/google-ads.png",
    titulo: "Google ADS",
    descricao:
      "Coloque seu hotel no topo da maior rede de pesquisa de hospedagens do mundo!",
  },
  {
    logo: "/whatsapp.png",
    titulo: "WhatsApp",
    descricao:
      "Aumente suas reservas com o aplicativo de mensagens mais usado no Brasil.",
  },
];

function IntegracoesSolucoesSection() {
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
            Integração com soluções que{" "}
            <span className="text-blue-500">potencializam vendas e reservas</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Integração nativa com sistemas essenciais para otimizar o marketing e
            acelerar reservas.
          </p>
        </motion.div>

        {/* Grid - 3 columns x 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integracoes.map((integracao, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 text-center"
            >
              {/* Logo */}
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-50 rounded-full p-3 flex items-center justify-center">
                <img
                  src={integracao.logo}
                  alt={integracao.titulo}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="font-bold text-[#1e3a5f] mb-2">{integracao.titulo}</h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {integracao.descricao}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { IntegracoesSolucoesSection };
