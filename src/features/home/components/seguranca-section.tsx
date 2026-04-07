"use client";

import { motion } from "framer-motion";
import { CreditCard, Shield, Lock, Database, Check } from "lucide-react";
import type { Certificacao } from "../types";

interface SegurancaSectionProps {
  certificacoes: Certificacao[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CreditCard,
  Shield,
  Lock,
  Database,
};

function SegurancaSection({ certificacoes }: SegurancaSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Shield Icon */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                <Shield className="w-24 h-24 text-white" />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Nossa plataforma segue os mais altos
              <br />
              <span className="text-blue-600">padrões de proteção</span>
            </h2>
            <p className="text-gray-500 mb-8">
              Compliance PCI para dados de cartão, Certificação de segurança e
              total conformidade com a LGPD. Tecnologia de ponta para a gestão do
              seu hotel com máxima segurança e confiança!
            </p>

            {/* Certifications Grid */}
            <div className="grid grid-cols-2 gap-4">
              {certificacoes.map((cert, index) => {
                const Icon = iconMap[cert.icone] || Shield;
                return (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">
                        {cert.titulo}
                      </h4>
                      <p className="text-gray-500 text-xs">{cert.descricao}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { SegurancaSection };
