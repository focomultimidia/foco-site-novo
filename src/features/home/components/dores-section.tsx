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
  "prejuizos": AlertTriangle,
  "experiencia-ruim": Frown,
};

const tabCta: Record<string, { texto: string; botao: string }> = {
  "baixa-ocupacao": {
    texto: "Quer atrair mais hóspedes e aumentar as suas reservas?",
    botao: "Quero atrair mais hóspedes",
  },
  "prejuizos": {
    texto: "Quer parar de ter prejuízos e começar a obter lucros com seu estabelecimento?",
    botao: "Quero obter lucros",
  },
  "experiencia-ruim": {
    texto: "Quer melhorar a experiência do seu hóspede e aumentar sua reputação online?",
    botao: "Quero aumentar a reputação do meu hotel",
  },
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
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-white leading-none tracking-tighter antialiased">

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
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              {tabCta[activeDor.id] && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <p className="text-white/80 text-base sm:text-lg font-medium text-center sm:text-left">
                    {tabCta[activeDor.id].texto}
                  </p>
                  <Button className="shrink-0 bg-white text-[#1e3a5f] hover:bg-blue-50 font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 group">
                    {tabCta[activeDor.id].botao}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export { DoresSection };
