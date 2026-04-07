"use client";

import { motion } from "framer-motion";

function IntroSection() {
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
            Como um site hoteleiro bem construído{" "}
            <span className="text-blue-500">aumenta suas reservas</span> e{" "}
            <span className="text-blue-500">reduz custos com OTAs</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Descubra como aumentar suas reservas diretas e eliminar comissões,
            transformando seu site no seu canal de vendas mais rentável.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-gray-600 text-lg leading-relaxed">
              Um site hoteleiro profissional vai muito além do visual. Ele
              funciona como um canal direto de vendas, permitindo que seu hotel
              ou pousada atraia visitantes no Google, converta mais reservas sem
              intermediários e reduza os custos com comissões.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Com SEO, integração ao motor de reservas e recursos como WhatsApp
              e chat online, seu site trabalha para você 24 horas por dia, todos
              os dias.
            </p>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden p-6 flex items-center justify-center">
              <img
                src="/section-1.png"
                alt="Mockup do Site Hoteleiro"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { IntroSection };
