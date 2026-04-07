"use client";

import { motion } from "framer-motion";

const meiosPagamento = [
  { nome: "Sicredi", logo: "/sicredi-logo.png" },
  { nome: "PagSeguro", logo: "/pagseguro-logo.png" },
  { nome: "Sip2g", logo: "/sip2g-logo.png" },
  { nome: "Cielo", logo: "/cielo-logo.png" },
];

function MeiosPagamentoSection() {
  return (
    <section className="py-24 bg-gray-50">
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
            Confira alguns <span className="text-[#00838F]">meios de pagamentos</span>{" "}
            online integrados com o <span className="text-[#00838F]">Foco Pay</span>
          </h2>
        </motion.div>

        {/* Logos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center"
        >
          {meiosPagamento.map((meio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 w-full max-w-[200px] flex items-center justify-center h-24"
            >
              <span className="text-gray-400 font-medium text-lg">{meio.nome}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500">
            E muitos outros gateways de pagamento integrados para garantir a máxima
            flexibilidade nas transações do seu hotel.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export { MeiosPagamentoSection };
