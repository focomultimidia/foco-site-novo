"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import type { Beneficio } from "../types";

interface BeneficiosSectionProps {
  beneficios: Beneficio[];
}

function BeneficiosSection({ beneficios }: BeneficiosSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionEyebrow>Benefícios</SectionEyebrow>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold text-[#1E3A5F] mb-4"
          >
            Benefícios do Motor de Reservas
          </motion.h2>
        </div>

        {/* Benefícios Grid */}
        <div className="grid sm:grid-cols-2 gap-8">
          {beneficios.map((beneficio, index) => (
            <motion.div
              key={beneficio.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-[#00BCD4]/10 flex items-center justify-center shrink-0 mt-1">
                <Check className="w-4 h-4 text-[#0e7490]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1E3A5F] mb-1">{beneficio.titulo}</h3>
                <p className="text-sm text-slate-500">{beneficio.descricao}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { BeneficiosSection };
