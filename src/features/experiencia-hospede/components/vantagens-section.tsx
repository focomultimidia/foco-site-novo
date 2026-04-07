"use client";

import { motion } from "framer-motion";
import { Utensils, MapPin, Ticket, Heart, Shield, Bell } from "lucide-react";

const vantagensEsquerda = [
  {
    icon: Utensils,
    titulo: "Restaurantes",
    descricao:
      "Economia e praticidade para que o hóspede tenha acesso a descontos nos principais restaurantes do seu destino.",
  },
  {
    icon: MapPin,
    titulo: "Passeios e Transfers",
    descricao:
      "Descontos exclusivos para que seus hóspedes vivenciem experiências incríveis no seu destino.",
  },
  {
    icon: Ticket,
    titulo: "Ingressos",
    descricao:
      "Acesso a descontos em atrações e espetáculos negociados pela equipe da Foco.",
  },
];

const vantagensDireita = [
  {
    icon: Heart,
    titulo: "Fidelização do hóspede",
    descricao:
      "Vantagens e benefícios para conquistar seu hóspede, garantindo o retorno de clientes satisfeitos.",
  },
  {
    icon: Shield,
    titulo: "Segurança e confiabilidade",
    descricao:
      "Sistema com total segurança para garantir que apenas seu hóspede acesse o aplicativo.",
  },
  {
    icon: Bell,
    titulo: "Push Interativo",
    descricao:
      "Aplicativo com alerta de toda a programação de entretenimento do seu hotel e destino.",
  },
];

function VantagensSection() {
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
            <span className="text-blue-500">Outras vantagens</span> em utilizar o
            aplicativo do hóspede
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Agilidade, conveniência e descontos exclusivos: os diferenciais que elevam
            o padrão de serviço do seu hotel.
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
            className="space-y-6"
          >
            {vantagensEsquerda.map((vantagem, index) => {
              const Icon = vantagem.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-right"
                >
                  <div className="flex items-start gap-4 flex-row-reverse">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1e3a5f] mb-1">{vantagem.titulo}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{vantagem.descricao}</p>
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
                src="/section3-experiencia.png"
                alt="Foco Pass App"
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
            className="space-y-6"
          >
            {vantagensDireita.map((vantagem, index) => {
              const Icon = vantagem.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1e3a5f] mb-1">{vantagem.titulo}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{vantagem.descricao}</p>
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

export { VantagensSection };
