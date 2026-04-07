"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Palette,
  Network,
  PenTool,
  Search,
  TrendingUp,
  UserCircle,
  Briefcase,
} from "lucide-react";

const vantagens = [
  {
    icon: Smartphone,
    descricao:
      "Layout 100% mobile, compatível com celulares, tablets ou computadores.",
  },
  {
    icon: Palette,
    descricao:
      "Layouts personalizados para deixar o site com a cara do seu hotel.",
  },
  {
    icon: Network,
    descricao: "Sites e portais para redes de hotéis e associações.",
  },
  {
    icon: PenTool,
    descricao:
      "Blog integrado para você produzir conteúdos sobre o seu destino e inspirar seus hóspedes.",
  },
  {
    icon: Search,
    descricao:
      "Otimizado para o Google, facilitando assim a indexação orgânica e visibilidade do seu hotel.",
  },
  {
    icon: TrendingUp,
    descricao:
      "Crie páginas de vendas focadas em conversão de reservas e leve o seu cliente direto até o seu pacote ou promoção.",
  },
  {
    icon: UserCircle,
    descricao:
      "Área do cliente com acesso ao histórico de compras e pontuação do sistema de fidelidade do motor de reservas.",
  },
  {
    icon: Briefcase,
    descricao:
      "Área corporativa para agências, operadoras e empresas reservarem a qualquer momento. Tudo isso integrado com o motor de reservas.",
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
            <span className="text-blue-500">Mais</span> vantagens em ter um{" "}
            <span className="text-blue-500">site exclusivo</span> para hotéis e
            pousadas
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            O guia completo para transformar seu site em sua principal máquina
            de vendas diretas, garantindo a melhor margem de lucro.
          </p>
        </motion.div>

        {/* Grid - 4 columns x 2 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vantagens.map((vantagem, index) => {
            const Icon = vantagem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-[#1e3a5f] rounded-xl p-6 hover:bg-[#152a45] transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#1e3a5f]" />
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  {vantagem.descricao}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { VantagensSection };
