"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { Passo } from "../types";

interface ComoFuncionaSectionProps {
  passos: Passo[];
}

function ComoFuncionaSection({ passos }: ComoFuncionaSectionProps) {
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
              Como Funciona
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold text-[#1E3A5F] mb-4"
          >
            Em 4 passos simples, seu site estará no ar
          </motion.h2>
        </div>

        {/* Passos Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {passos.map((passo, index) => (
            <motion.div
              key={passo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#00BCD4] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{passo.numero}</span>
              </div>
              <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">{passo.titulo}</h3>
              <p className="text-sm text-gray-600">{passo.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { ComoFuncionaSection };
