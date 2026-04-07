"use client";

import { motion } from "framer-motion";
import { Building, Utensils, MapPin } from "lucide-react";

const segmentos = [
  {
    icon: Building,
    titulo: "Meios de hospedagem",
    descricao:
      "Hotéis, pousadas, hostels e resorts que desejam garantir a satisfação do hóspede.",
    imagem: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
  },
  {
    icon: Utensils,
    titulo: "Setor de alimentação",
    descricao:
      "Bares e restaurantes que necessitam aumentar suas vendas, garantindo acesso direto aos turistas.",
    imagem: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
  },
  {
    icon: MapPin,
    titulo: "Passeios turísticos",
    descricao:
      "Agências de viagens, receptivos e atrativos turísticos que queiram promover suas atividades a milhares de viajantes.",
    imagem: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop",
  },
];

function ParaQuemSection() {
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
            Para quem é o <span className="text-blue-500">Foco Pass</span>?
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            A plataforma que conecta a eficiência da sua gestão à satisfação imediata
            do seu cliente.
          </p>
        </motion.div>

        {/* Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {segmentos.map((segmento, index) => {
            const Icon = segmento.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={segmento.imagem}
                    alt={segmento.titulo}
                    className="w-full h-full object-cover"
                  />
                  {/* Icon Overlay */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="font-bold text-[#1e3a5f] mb-2">{segmento.titulo}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{segmento.descricao}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { ParaQuemSection };
