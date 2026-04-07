"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const clientes = [
  {
    nome: "Maria Silva",
    hotel: "Pousada do Sol",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    depoimento: "O site ficou incrível! Aumentamos nossas reservas em 50%.",
  },
  {
    nome: "João Santos",
    hotel: "Hotel Central",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    depoimento: "Design moderno e fácil de usar. Nossos hóspedes adoram.",
  },
  {
    nome: "Ana Costa",
    hotel: "Resort Mar",
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    depoimento: "Integração perfeita com o motor de reservas. Recomendo!",
  },
];

function AprovacaoSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-yellow-500" />
            <span>97% de aprovação</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-[#1e3a5f] mb-4">
            Clientes que{" "}
            <span className="text-blue-500">confiam e aprovam</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Histórias reais de hoteleiros que transformaram seus negócios
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.map((cliente, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100"
            >
              {/* Client Photo */}
              <div className="relative w-20 h-20 mx-auto mb-4 bg-slate-100 rounded-full overflow-hidden p-1">
                <img
                  src={cliente.foto}
                  alt={cliente.nome}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              {/* Depoimento */}
              <p className="text-gray-700 text-center mb-4 text-sm italic">
                &ldquo;{cliente.depoimento}&rdquo;
              </p>

              {/* Client Info */}
              <div className="text-center">
                <p className="font-bold text-[#1e3a5f]">{cliente.nome}</p>
                <p className="text-gray-500 text-sm">{cliente.hotel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { AprovacaoSection };
