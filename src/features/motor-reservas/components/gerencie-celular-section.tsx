"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const recursos = [
  "Chegadas, saídas e cancelamentos de reservas",
  "Listagem de reservas diretas e dos canais conectados",
  "CRM para gerenciar orçamentos",
  "Reserva manual para você vender de onde estiver",
  "Atualização de tarifas, restrições e disponibilidade",
  "E muitos outros recursos",
];

function GerencieCelularSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-[#1e3a5f] mb-4 leading-tight">
            Gerencie seu motor de reservas pelo{" "}
            <span className="text-blue-500">celular</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Navegue pelos principais recursos da nossa extranet do seu celular e
            administre o seu hotel de onde estiver.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src="/section8.png"
                alt="App mobile do motor de reservas"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Right Column - List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {recursos.map((recurso, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700">{recurso}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { GerencieCelularSection };
