"use client";

import { motion } from "framer-motion";
import { MousePointer, CreditCard, Mail, TrendingUp, Tag, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Recurso } from "../types";

interface RecursosSectionProps {
  recursos: Recurso[];
}

const iconMap: Record<string, React.ElementType> = {
  MousePointer,
  CreditCard,
  Mail,
  TrendingUp,
  Tag,
  BarChart,
};

function RecursosSection({ recursos }: RecursosSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
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
              Recursos
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold text-[#1E3A5F] mb-4"
          >
            Tudo para maximizar suas conversões
          </motion.h2>
        </div>

        {/* Recursos Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recursos.map((recurso, index) => {
            const Icon = iconMap[recurso.icone] || MousePointer;
            return (
              <motion.div
                key={recurso.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-[#00BCD4]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#00BCD4]" />
                </div>
                <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">{recurso.titulo}</h3>
                <p className="text-sm text-gray-600">{recurso.descricao}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { RecursosSection };
