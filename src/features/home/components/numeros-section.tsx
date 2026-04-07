"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users, Calendar, CheckCircle, Link2, Clock } from "lucide-react";
import type { Numero } from "../types";

interface NumerosSectionProps {
  numeros: Numero[];
}

const iconMap: Record<number, React.ComponentType<{ className?: string }>> = {
  0: TrendingUp,
  1: Users,
  2: Calendar,
  3: CheckCircle,
  4: Link2,
  5: Clock,
};

function AnimatedNumber({
  value,
  suffix,
}: {
  value: string;
  suffix: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseFloat(value);
  const hasDecimal = value.includes(".");

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(numericValue);
          clearInterval(timer);
        } else {
          setDisplayValue(current);
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {hasDecimal ? displayValue.toFixed(1) : Math.floor(displayValue)}
      {suffix}
    </span>
  );
}

function NumerosSection({ numeros }: NumerosSectionProps) {
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
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Nossos <span className="text-blue-600">números</span> comprovam
            nossa
            <br />
            <span className="text-blue-600">excelência</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Estamos conectados com as principais tecnologias do ramo hoteleiro
            para maximizar sua operação e receita
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {numeros.map((numero, index) => {
            const Icon = iconMap[index] || TrendingUp;
            return (
              <motion.div
                key={numero.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  +<AnimatedNumber value={numero.valor} suffix={numero.sufixo} />
                </div>
                <div className="text-gray-500 text-xs">{numero.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { NumerosSection };
