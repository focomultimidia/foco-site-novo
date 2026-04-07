"use client";

import { motion } from "framer-motion";
import { Smartphone, Search, Calendar, Edit, Image, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Recurso } from "../types";

interface RecursosSectionProps {
  recursos: Recurso[];
}

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Search,
  Calendar,
  Edit,
  Image,
  FileText,
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
            Tudo que você precisa para ter um site profissional
          </motion.h2>
        </div>

        {/* Recursos Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recursos.map((recurso, index) => {
            const Icon = iconMap[recurso.icone] || Smartphone;
            return (
              <motion.div
                key={recurso.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-[#00BCD4]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#00BCD4]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">{recurso.titulo}</h3>
                  <p className="text-sm text-gray-600">{recurso.descricao}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { RecursosSection };
