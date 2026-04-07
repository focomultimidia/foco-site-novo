"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Smartphone,
  MapPin,
  Bed,
  LogOut,
  Heart,
} from "lucide-react";
import type { EtapaJornada } from "../types";

interface JornadaSectionProps {
  etapas: EtapaJornada[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  Smartphone,
  MapPin,
  Bed,
  LogOut,
  Heart,
};

function JornadaSection({ etapas }: JornadaSectionProps) {
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
            Jornada do Hóspede
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Acompanhe e encante seu hóspede em cada momento da experiência.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange-200 hidden lg:block" />

          <div className="space-y-12">
            {etapas.map((etapa, index) => {
              const Icon = iconMap[etapa.icone] || Calendar;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={etapa.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      isEven ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    <div
                      className={`bg-white rounded-xl p-6 shadow-sm inline-block ${
                        isEven ? "lg:ml-auto" : "lg:mr-auto"
                      }`}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {etapa.titulo}
                      </h3>
                      <p className="text-gray-600 max-w-sm">
                        {etapa.descricao}
                      </p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export { JornadaSection };
