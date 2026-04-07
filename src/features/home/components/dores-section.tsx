"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, TrendingDown, AlertTriangle, Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DorSolucao } from "../types";

interface DoresSectionProps {
  dores: DorSolucao[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "baixa-ocupacao": TrendingDown,
  prejuizos: AlertTriangle,
  "experiencia-ruim": Frown,
};

function DoresSection({ dores }: DoresSectionProps) {
  const [activeTab, setActiveTab] = useState(dores[0]?.id || "");
  const activeDor = dores.find((d) => d.id === activeTab);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {dores.map((dor) => {
            const Icon = iconMap[dor.id] || AlertTriangle;
            return (
              <button
                key={dor.id}
                onClick={() => setActiveTab(dor.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === dor.id
                    ? "bg-[#1e3a5f] text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{dor.titulo}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeDor && (
            <motion.div
              key={activeDor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1e3a5f] rounded-3xl p-8 md:p-12"
            >
              {/* Header */}
              <div className="text-center mb-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {activeDor.titulo}
                </h3>
                <p className="text-white/70 max-w-2xl mx-auto">
                  {activeDor.descricao}
                </p>
              </div>

              {/* Solutions Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeDor.solucoes.map((solucao, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors"
                  >
                    <h4 className="font-bold text-white mb-2 text-sm">
                      {solucao.titulo}
                    </h4>
                    <p className="text-white/70 text-sm mb-4">
                      {solucao.descricao}
                    </p>
                    {solucao.link && (
                      <Button
                        variant="ghost"
                        className="text-blue-300 hover:text-white hover:bg-white/10 p-0 h-auto text-xs font-medium group rounded-full"
                        asChild
                      >
                        <a href={solucao.link}>
                          Saiba mais
                          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export { DoresSection };
