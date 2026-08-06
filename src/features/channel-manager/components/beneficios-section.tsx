"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Beneficio } from "../types";

interface BeneficiosSectionProps {
  beneficios: Beneficio[];
}

function BeneficiosSection({ beneficios }: BeneficiosSectionProps) {
  return (
    <section className="py-24 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1e293b] mb-4">
            Benefícios Comprovados
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Resultados reais que nossos clientes experimentam ao usar nosso
            Channel Manager.
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
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#285992] rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1e293b] mb-2">
                  {beneficio.titulo}
                </h3>
                <p className="text-slate-500">{beneficio.descricao}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { BeneficiosSection };
