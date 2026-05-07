"use client";

import { motion } from "framer-motion";
import { Scale, TrendingUp, Layers, Timer, BadgePercent, MessageCircle } from "lucide-react";

const recursos = [
  {
    icon: Scale,
    titulo: "Comparador de preços entre canais",
    descricao:
      "Mostre ao visitante que reservar direto é a melhor opção. Com o comparador integrado, o sistema exibe os preços em OTAs como Booking e Expedia, destacando a vantagem de fechar pelo seu site.",
  },
  {
    icon: TrendingUp,
    titulo: "Urgência em tempo real",
    descricao:
      "Gatilhos como '10 pessoas visualizaram esta oferta hoje' ou '2 reservas nas últimas 2 horas' criam senso de urgência e impulsionam a conversão imediata.",
  },
  {
    icon: Layers,
    titulo: "Escassez automatizada",
    descricao:
      "Exiba quantos quartos restam ou destaque quando uma oferta está prestes a acabar. Ninguém quer perder uma oportunidade — a percepção de escassez acelera a decisão de compra.",
  },
  {
    icon: Timer,
    titulo: "Contagem regressiva de promoções",
    descricao:
      "Com um contador visual no motor, crie senso de tempo limitado para ofertas especiais, estimulando o fechamento imediato da reserva.",
  },
  {
    icon: BadgePercent,
    titulo: "Descontos por forma de pagamento",
    descricao:
      "Ofereça benefícios exclusivos para quem paga via Pix ou à vista, incentivando métodos de pagamento mais vantajosos para o hotel.",
  },
  {
    icon: MessageCircle,
    titulo: "Recuperação de carrinho via WhatsApp",
    descricao:
      "Recupere reservas não finalizadas com mensagens automáticas no WhatsApp. O hóspede recebe um lembrete com link direto para concluir a compra, elevando a conversão em até 20%.",
  },
];

function AumenteReservasSection() {
  return (
    <section className="py-24 bg-[#1e3a5f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-white mb-4 leading-tight">
            Ferramentas inteligentes para aumentar conversão e reduzir abandono
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Gatilhos de urgência, escassez e comparação de preços para acelerar a tomada de decisão e transformar visitantes em hóspedes pagantes.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {recursos.map((recurso, index) => {
              const Icon = recurso.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-xl p-5"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1e3a5f] mb-1 text-sm uppercase tracking-wide">
                      {recurso.titulo}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {recurso.descricao}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src="/section3.png"
                alt="Recuperação de compras e descontos"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { AumenteReservasSection };
