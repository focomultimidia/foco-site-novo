"use client";

import { motion } from "framer-motion";
import { Building2, Search, ExternalLink } from "lucide-react";
import type { CanalIntegracao } from "../types";

interface CanaisSectionProps {
  canais: CanalIntegracao[];
}

const categoriaLabels: Record<string, string> = {
  ota: "Online Travel Agencies",
  meta: "Metasearch Engines",
  direto: "Canal Direto",
};

const categoriaIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  ota: Building2,
  meta: Search,
  direto: ExternalLink,
};

function CanaisSection({ canais }: CanaisSectionProps) {
  const canaisPorCategoria = canais.reduce((acc, canal) => {
    if (!acc[canal.categoria]) {
      acc[canal.categoria] = [];
    }
    acc[canal.categoria].push(canal);
    return acc;
  }, {} as Record<string, CanalIntegracao[]>);

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
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1e293b] mb-4">
            Canais Integrados
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Conecte-se aos principais canais de distribuição do mercado
            hoteleiro mundial.
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(canaisPorCategoria).map(
            ([categoria, canaisDaCategoria], catIndex) => {
              const Icon = categoriaIcons[categoria] || Building2;
              return (
                <motion.div
                  key={categoria}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a5f] to-[#285992] rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1e293b]">
                      {categoriaLabels[categoria]}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {canaisDaCategoria.map((canal, index) => (
                      <motion.div
                        key={canal.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: catIndex * 0.1 + index * 0.05,
                        }}
                        className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-center"
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                          <span className="text-lg font-bold text-gray-500">
                            {canal.nome.charAt(0)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-[#1e293b]">
                          {canal.nome}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}

export { CanaisSection };
