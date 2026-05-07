"use client";

import { motion } from "framer-motion";

function OQueESection() {
  return (
    <section className="pb-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

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
          <h2 className="text-3xl sm:text-5xl lg:text-[3.0rem] font-bold text-[#1e3a5f] mb-8 leading-tight">
            O que é um <span className="text-blue-500">motor de reservas</span>{" "}
            para hotéis?
          </h2>
          <p className="text-gray-500 font-semibold text-xl max-w-6xl mx-auto">
            A ferramenta essencial para aumentar suas reservas diretas e garantir lucratividade livre de comissões.
          </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              O Motor de reservas (ou Booking Engine) é o software para hotéis essencial que transforma o site do seu empreendimento em um canal de vendas diretas de alta performance. Desenvolvido para aumentar a taxa de conversão de visitantes em hóspedes, este sistema de reservas permite que hotéis, pousadas, hostels e resorts garantam reservas livres de comissões.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ao centralizar a gestão hoteleira e oferecer disponibilidade 24/7, o motor de reservas eleva a lucratividade do seu negócio, promovendo a independência das OTAs e simplificando toda a jornada de compra do seu cliente com agilidade e segurança.
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
            <div className="relative w-full aspect-[4/3] bg-white rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src="/assets/imgs/motor-de-reservas/motor-de-reservas.png"
                alt="Motor de Reservas - Mockup"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { OQueESection };
