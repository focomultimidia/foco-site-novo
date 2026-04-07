"use client";

import { motion } from "framer-motion";
import { CheckCircle, MapPin, Tag, Smartphone } from "lucide-react";

const beneficios = [
  {
    numero: "01",
    icon: CheckCircle,
    titulo: "Fim das filas",
    descricao:
      "Integrado ao seu sistema de gestão hoteleira, o Foco Pass permite realizar o pré-check-in e check-in online para seus hóspedes.",
  },
  {
    numero: "02",
    icon: MapPin,
    titulo: "Comodidade para o hóspede",
    descricao:
      "O seu hóspede terá acesso à localização dos principais pontos turísticos, senha do Wi-Fi, ao cardápio digital* e diversos recursos integrados.",
  },
  {
    numero: "03",
    icon: Tag,
    titulo: "Descontos em seu destino",
    descricao:
      "Garanta benefícios exclusivos para o seu hóspede nos principais restaurantes, receptivos e espetáculos dos parceiros do Foco Pass no seu destino.",
  },
  {
    numero: "04",
    icon: Smartphone,
    titulo: "Versão PWA disponível",
    descricao:
      "Não perca tempo, solicite agora a versão do aplicativo (PWA) para hotéis e pousadas e garanta a satisfação do seu hóspede.",
  },
];

function PorQueContratarSection() {
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
            Por que contratar o <span className="text-blue-500">Foco Pass</span> para o seu hóspede
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Autonomia, praticidade e satisfação garantidas para o seu hóspede vivenciar
            experiências únicas em sua viagem.
          </p>
        </motion.div>

        {/* Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {beneficios.map((beneficio, index) => {
            const Icon = beneficio.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 text-center"
              >
                {/* Number Badge */}
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{beneficio.numero}</span>
                </div>

                {/* Icon */}
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>

                <h3 className="font-bold text-[#1e3a5f] mb-2">{beneficio.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{beneficio.descricao}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { PorQueContratarSection };
