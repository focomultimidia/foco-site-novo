"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  Sparkles,
  UtensilsCrossed,
  Calculator,
  Package,
  Users2,
  Check,
} from "lucide-react";
import type { Modulo } from "../types";

interface ModulosSectionProps {
  modulos: Modulo[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CalendarCheck,
  Sparkles,
  UtensilsCrossed,
  Calculator,
  Package,
  Users2,
};

function ModulosSection({ modulos }: ModulosSectionProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Módulos do Sistema
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Um ecossistema completo de módulos integrados para todos os
            departamentos do seu hotel.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modulos.map((modulo, index) => {
            const Icon = iconMap[modulo.icone] || CalendarCheck;
            return (
              <motion.div
                key={modulo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {modulo.titulo}
                </h3>
                <p className="text-gray-600 mb-6">{modulo.descricao}</p>
                <ul className="space-y-2">
                  {modulo.recursos.map((recurso, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{recurso}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { ModulosSection };
