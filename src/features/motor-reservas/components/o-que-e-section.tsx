"use client";

import { motion } from "framer-motion";

function OQueESection() {
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
            O que é um <span className="text-blue-500">motor de reservas</span>{" "}
            para hotéis
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            A ferramenta essencial para aumentar suas{" "}
            <span className="text-blue-500 font-medium">reservas diretas</span>{" "}
            e garantir{" "}
            <span className="text-blue-500 font-medium">
              lucratividade livre de comissões
            </span>
            .
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
              O <strong>Motor de Reservas</strong> (ou{" "}
              <strong>Booking Engine</strong>) é o{" "}
              <strong>software para hotéis</strong> essencial que transforma o
              site do seu empreendimento em um{" "}
              <strong>canal de vendas diretas</strong> de alta performance.
              Desenvolvido para{" "}
              <strong>aumentar a taxa de conversão</strong> de visitantes em
              hóspedes, este <strong>sistema de reservas</strong> permite que{" "}
              <strong>hotéis, pousadas, hostels e resorts</strong> garantam{" "}
              <strong>reservas livres de comissões</strong>.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ao centralizar a <strong>gestão hoteleira</strong> e oferecer{" "}
              <strong>disponibilidade 24/7</strong>, o motor de reservas eleva a
              lucratividade do seu negócio, promovendo a{" "}
              <strong>independência das OTAs</strong> e simplificando toda a{" "}
              <strong>jornada de compra</strong> do seu cliente com agilidade e
              segurança.
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
                src="/section1.png"
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
