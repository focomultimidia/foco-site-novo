"use client";

import { motion } from "framer-motion";

function OQueESection() {
  return (
    <section className="py-24 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-2">
            O que é o <span className="text-[#00838F]">Foco Pay</span>?
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            A ferramenta essencial para dar ao hoteleiro a{" "}
            <span className="text-[#00838F] font-medium">segurança financeira</span>{" "}
            e <span className="text-[#00838F] font-medium">precisão na gestão de reservas</span>.
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
            <p className="text-slate-500 text-lg leading-relaxed">
              Nosso <strong>software hoteleiro</strong> é a ferramenta essencial para{" "}
              <strong>blindar a gestão financeira</strong> do seu hotel ou pousada.
              Desenvolvido para automatizar o agendamento de débitos de entradas e
              saldos de todas as reservas, ele garante a{" "}
              <strong>máxima segurança e rapidez</strong> em cada transação.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed">
              Com uma configuração intuitiva, você{" "}
              <strong>elimina imediatamente os erros manuais</strong> da sua equipe,
              economiza tempo operacional e assegura que o fluxo de caixa das suas
              reservas seja <strong>preciso e confiável</strong>.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed">
              Concentre-se na hospitalidade, e deixe a segurança financeira com a gente.
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
            <div className="relative w-full aspect-[4/3] bg-white rounded-3xl overflow-hidden flex items-center justify-center">
              <img
                src="/assets/imgs/software-de-pagamento/software-de-pagamento.webp"
                alt="Foco Pay - Software de Pagamentos"
                width={1000}
                height={654}
                loading="lazy"
                decoding="async"
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
