"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Beneficio } from "../types";

interface BeneficiosSectionProps {
  beneficios: Beneficio[];
}

function BeneficiosSection({ beneficios }: BeneficiosSectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Benefícios para seu Negócio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Resultados concretos que impulsionam suas vendas e simplificam sua
            operação financeira.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {beneficios.map((beneficio, index) => (
            <motion.div
              key={beneficio.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {beneficio.titulo}
                </h3>
                <p className="text-gray-600">{beneficio.descricao}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { BeneficiosSection };
