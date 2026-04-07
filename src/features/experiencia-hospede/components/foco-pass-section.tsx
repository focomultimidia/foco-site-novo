"use client";

import { motion } from "framer-motion";

function FocoPassSection() {
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
            Conheça o <span className="text-blue-500">Foco Pass</span>, o melhor app de
            hospedagem de todo trade turístico
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Eleve o padrão de sua hospedagem com o Foco Pass. A automação que transforma
            a experiência do hóspede.
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
              O <strong>Foco Pass</strong> é a solução definitiva para a{" "}
              <strong>automação completa da jornada do seu hóspede</strong>, desde o
              check-in até o check-out. Para o hoteleiro, isso significa{" "}
              <strong>máxima eficiência operacional</strong>, redução de custos com
              tarefas manuais e a garantia de um serviço impecável.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Para o hóspede, o Foco Pass é sinônimo de{" "}
              <strong>comodidade incomparável</strong>. Através do nosso aplicativo de
              hospedagem, ele tem acesso a uma jornada fluida e, o melhor de tudo, a
              descontos exclusivos e curados em bares, restaurantes, receptivos e
              ingressos no destino.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Transforme a estadia em uma experiência completa,{" "}
              <strong>fidelize seu cliente</strong> e veja a satisfação refletida nas
              suas avaliações.
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
                src="/section1-experiencia.png"
                alt="Foco Pass - App de Hospedagem"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { FocoPassSection };
