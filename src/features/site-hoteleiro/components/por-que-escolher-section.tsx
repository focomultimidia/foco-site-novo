"use client";

import { motion } from "framer-motion";
import { Link2, Search, Palette, TrendingUp, Shield, Building } from "lucide-react";

const beneficios = [
  {
    icon: Link2,
    titulo: "Site 100% integrado com o motor de reservas",
    descricao:
      "Eliminamos distrações como links externos e abas múltiplas. O hóspede navega com foco e reserva com rapidez.",
  },
  {
    icon: Search,
    titulo: "SEO e indexação orgânica no Google",
    descricao:
      "Seu site aparece nas buscas certas, com performance técnica e conteúdo otimizado para ranquear.",
  },
  {
    icon: Palette,
    titulo: "Layouts personalizados com a cara do seu hotel",
    descricao:
      "Escolha um layout exclusivo que valorize sua marca e reflita a experiência que você oferece.",
  },
  {
    icon: TrendingUp,
    titulo: "Páginas de vendas com foco em conversão",
    descricao:
      "Criamos fluxos de navegação que conduzem o hóspede direto às promoções e pacotes ideais.",
  },
  {
    icon: Shield,
    titulo: "Performance, velocidade e segurança",
    descricao:
      "Seu site carrega em segundos e oferece uma jornada confiável, com os padrões mais avançados da web.",
  },
  {
    icon: Building,
    titulo: "Tecnologia feita para o setor hoteleiro",
    descricao:
      "Mais que uma agência, somos especialistas em soluções digitais para hotéis, pousadas e resorts.",
  },
];

function PorQueEscolherSection() {
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
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-[#1e3a5f] mb-4">
            Por que escolher a Foco para criar o site do seu hotel
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Tenha um site completo, integrado ao motor de reservas e conte com os
            melhores padrões de desenvolvimento web. Indexado organicamente ao
            Google para que seus hóspedes te encontrem.
          </p>
        </motion.div>

        {/* Grid - 2 columns */}
        <div className="grid md:grid-cols-2 gap-8">
          {beneficios.map((beneficio, index) => {
            const Icon = beneficio.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1e3a5f] mb-2 text-lg">
                    {beneficio.titulo}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {beneficio.descricao}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { PorQueEscolherSection };
