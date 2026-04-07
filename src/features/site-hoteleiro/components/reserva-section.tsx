"use client";

import { motion } from "framer-motion";

const passos = [
  {
    numero: "01",
    titulo: "Recuperação automática de reservas não concluídas",
    descricao:
      "Envie lembretes por e-mail e WhatsApp para retomar o contato com hóspedes que iniciaram a reserva, mas não finalizaram.",
  },
  {
    numero: "02",
    titulo: "Reserva finalizada em menos de 1 minuto",
    descricao:
      "Com a integração total entre site e motor, seu hóspede conclui a reserva de forma simples e imediata.",
  },
  {
    numero: "03",
    titulo: "Gatilhos e alertas de urgência",
    descricao:
      'Ative recursos como "pouca disponibilidade", contadores, descontos, comparador de preços e outros estímulos à decisão.',
  },
  {
    numero: "04",
    titulo: "Pagamento facilitado e completo",
    descricao:
      "Aceite Pix e todas as bandeiras de cartão de crédito, incentivando a compra online com um processo rápido e confiável.",
  },
];

function ReservaSection() {
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
            Seu hóspede sem trabalho para{" "}
            <span className="text-blue-500">finalizar a reserva</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            A integração com o motor de reservas da Foco garante um fluxo de
            navegação fluido e conversão otimizada.
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
            <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden p-6 flex items-center justify-center">
              <img
                src="/section-5.png"
                alt="Motor de reservas integrado"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Right Column - Numbered List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {passos.map((passo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {passo.numero}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-[#1e3a5f] mb-1">
                    {passo.titulo}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {passo.descricao}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { ReservaSection };
