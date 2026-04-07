"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  QrCode,
  FileText,
  Link,
  Wallet,
} from "lucide-react";
import type { FormaPagamento } from "../types";

interface FormasPagamentoSectionProps {
  formas: FormaPagamento[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CreditCard,
  QrCode,
  FileText,
  Link,
  Wallet,
};

function FormasPagamentoSection({ formas }: FormasPagamentoSectionProps) {
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
            Formas de Pagamento Aceitas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ofereça aos seus hóspedes todas as opções de pagamento que eles
            esperam.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {formas.map((forma, index) => {
            const Icon = iconMap[forma.icone] || CreditCard;
            return (
              <motion.div
                key={forma.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {forma.nome}
                </h3>
                <p className="text-sm text-gray-500">{forma.descricao}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { FormasPagamentoSection };
