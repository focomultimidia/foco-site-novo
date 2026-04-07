"use client";

import { motion } from "framer-motion";
import {
  Award,
  Star,
  Handshake,
  Shield,
  Users,
  Globe,
  Zap,
  Lock,
} from "lucide-react";
import type { Diferencial } from "../types";

interface DiferenciaisSectionProps {
  diferenciais: Diferencial[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Star,
  Handshake,
  Shield,
  Users,
  Globe,
  Zap,
  Lock,
};

function DiferenciaisSection({ diferenciais }: DiferenciaisSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a5f] mb-2">
            Por que contratar o channel manager da
            <br />
            <span className="text-blue-500">Foco Tecnologia</span>
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
        >
          {/* Left Column - Cards Grid (1 column x 8 rows) */}
          <div className="grid grid-cols-1 gap-4 order-2 lg:order-1">
            {diferenciais.map((diferencial, index) => {
              const Icon = iconMap[diferencial.icone] || Award;
              return (
                <motion.div
                  key={diferencial.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-4 bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">
                      {diferencial.titulo}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {diferencial.descricao}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column - Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[600px]">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop"
                alt="Tecnologia hoteleira Foco"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-100 rounded-2xl -z-10" />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-50 rounded-xl -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { DiferenciaisSection };
