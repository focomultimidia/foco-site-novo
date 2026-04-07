"use client";

import { motion } from "framer-motion";
import {
  Building,
  Home,
  CreditCard,
  Calculator,
  BarChart,
  Target,
  Mail,
  MessageCircle,
} from "lucide-react";
import type { Integracao, Categoria } from "../types";

interface IntegracoesSectionProps {
  integracoes: Integracao[];
  categorias: Categoria[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building,
  Home,
  CreditCard,
  Calculator,
  BarChart,
  Target,
  Mail,
  MessageCircle,
};

function IntegracoesSection({ integracoes, categorias }: IntegracoesSectionProps) {
  const integracoesPorCategoria = integracoes.reduce((acc, integracao) => {
    if (!acc[integracao.categoria]) {
      acc[integracao.categoria] = [];
    }
    acc[integracao.categoria].push(integracao);
    return acc;
  }, {} as Record<string, Integracao[]>);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nossas Integrações
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conecte-se com as principais ferramentas do mercado hoteleiro.
          </p>
        </motion.div>

        <div className="space-y-16">
          {categorias.map((categoria, catIndex) => {
            const integracoesDaCategoria =
              integracoesPorCategoria[categoria.id] || [];
            const Icon = iconMap[categoria.icone] || Building;

            return (
              <motion.div
                key={categoria.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-blue-gray-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-gray-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {categoria.nome}
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {integracoesDaCategoria.map((integracao, index) => {
                    const IntegracaoIcon = iconMap[integracao.icone] || Building;
                    return (
                      <motion.div
                        key={integracao.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: catIndex * 0.1 + index * 0.05,
                        }}
                        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                          <IntegracaoIcon className="w-6 h-6 text-gray-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {integracao.nome}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {integracao.descricao}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { IntegracoesSection };
