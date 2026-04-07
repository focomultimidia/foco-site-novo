"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Globe, Calendar, LayoutGrid, Monitor, CreditCard, Users, Smartphone, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Produto } from "../types";

interface ProdutosSectionProps {
  produtos: Produto[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "01": Globe,
  "02": Calendar,
  "03": LayoutGrid,
  "04": Monitor,
  "05": CreditCard,
  "06": Users,
  "07": Smartphone,
  "08": Link2,
};

const imageMap: Record<string, string> = {
  "01": "/site-hoteleiro.png",
  "02": "/motor-de-reservas.png",
  "03": "/channel-manager.png",
  "04": "/pms-integracoes.png",
  "05": "/software-de-pagamentos.png",
  "06": "/crm-hoteleiro.png",
  "07": "/foco-pass.png",
  "08": "/integracoes-hoteleiras.png",
};

function ProdutosSection({ produtos }: ProdutosSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1e3a5f] mb-4 leading-tight">
            Sistema para hotéis e pousadas{" "}
            <span className="text-blue-500">aprovado por 97%</span>
            <br />
            dos nossos clientes
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl mx-auto">
            Da reserva à gestão financeira, nossa plataforma reúne produtos
            inovadores para otimizar cada detalhe do seu hotel ou pousada
          </p>
        </motion.div>

        {/* Products Grid - 4 columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {produtos.map((produto, index) => {
            const Icon = iconMap[produto.numero] || Globe;
            const imageUrl = imageMap[produto.numero];
            
            return (
              <motion.div
                key={produto.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative bg-white rounded-2xl p-5 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 overflow-hidden"
              >
                {/* Background Number - very subtle */}
                <div className="absolute -top-4 -right-4 text-[8rem] font-bold text-gray-100/80 leading-none select-none pointer-events-none z-0">
                  {produto.numero}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Header with Title and Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1e3a5f] pr-10">
                      {produto.titulo}
                    </h3>
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-xl overflow-hidden mb-4 p-4 flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt={produto.titulo}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {produto.descricao}
                  </p>

                  {/* Benefits List */}
                  <ul className="space-y-2 mb-4">
                    {produto.beneficios.map((beneficio, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs text-gray-600"
                      >
                        <Check className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                        <span className="line-clamp-1">{beneficio}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button - appears on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2.5 text-sm font-medium"
                      asChild
                    >
                      <a href={produto.link} className="flex items-center justify-center gap-2">
                        Clique para mais detalhes
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { ProdutosSection };
