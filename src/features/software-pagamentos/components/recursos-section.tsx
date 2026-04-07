"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  QrCode,
  Split,
  ShieldCheck,
  RefreshCcw,
  FileCheck,
} from "lucide-react";
import type { Recurso } from "../types";

interface RecursosSectionProps {
  recursos: Recurso[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CreditCard,
  QrCode,
  Split,
  ShieldCheck,
  RefreshCcw,
  FileCheck,
};

function RecursosSection({ recursos }: RecursosSectionProps) {
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
            Recursos de Pagamento
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Uma solução completa para processar pagamentos de forma segura e
            eficiente.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recursos.map((recurso, index) => {
            const Icon = iconMap[recurso.icone] || CreditCard;
            return (
              <motion.div
                key={recurso.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {recurso.titulo}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {recurso.descricao}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { RecursosSection };
