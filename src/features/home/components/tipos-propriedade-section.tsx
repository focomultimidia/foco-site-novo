"use client";

import { motion } from "framer-motion";
import {
  Home,
  Building,
  Mountain,
  TreePine,
  Users,
  Umbrella,
  Key,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TipoPropriedade } from "../types";

interface TiposPropriedadeSectionProps {
  tipos: TipoPropriedade[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Building,
  Mountain,
  TreePine,
  Users,
  Umbrella,
  Key,
};

function TiposPropriedadeSection({ tipos }: TiposPropriedadeSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-2">
            Não importa o{" "}
            <span className="text-blue-600">tamanho da sua propriedade</span>,
            <br />
            temos a solução completa para você!
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {tipos.map((tipo, index) => {
            const Icon = iconMap[tipo.icone] || Home;
            return (
              <motion.div
                key={tipo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 text-center group border border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 transition-colors">
                  <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{tipo.nome}</h3>
                <p className="text-gray-500 text-xs">{tipo.descricao}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-gray-500 mb-4">
            Não encontrou seu tipo de propriedade?
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 text-sm">
            Fale com um consultor
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export { TiposPropriedadeSection };
