"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Beneficio } from "../types";

interface BeneficiosSectionProps {
  beneficios: Beneficio[];
}

function BeneficiosSection({ beneficios }: BeneficiosSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-[#00BCD4]/10 text-[#00BCD4] hover:bg-[#00BCD4]/20 mb-4">
              Benefícios
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold text-[#1E3A5F] mb-4"
          >
            Benefícios de ter um Site Hoteleiro Profissional
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Benefícios List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              {beneficios.map((beneficio) => (
                <div key={beneficio.id} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#00BCD4]/10 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4 text-[#00BCD4]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1E3A5F] mb-1">{beneficio.titulo}</h3>
                    <p className="text-sm text-gray-600">{beneficio.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Estatísticas Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-6"
          >
            {beneficios.map((beneficio, index) => (
              <motion.div
                key={beneficio.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <p className="text-4xl font-bold text-[#00BCD4] mb-1">{beneficio.estatistica}</p>
                <p className="text-sm text-gray-600">{beneficio.estatisticaLabel}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { BeneficiosSection };
