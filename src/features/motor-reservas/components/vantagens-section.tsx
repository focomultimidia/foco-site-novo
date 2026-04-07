"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, DollarSign, Lock, CreditCard, Target } from "lucide-react";

const vantagens = [
  {
    icon: TrendingUp,
    titulo: "Aumenta as suas reservas diretas",
    descricao:
      "Com o motor de reservas, o seu site será um dos principais vendedores do seu hotel, gerando reservas 24 horas por dia, tudo isso 100% online!",
  },
  {
    icon: Clock,
    titulo: "Mais agilidade nas reservas",
    descricao:
      "As reservas feitas pelo motor são as mais ágeis entre todos os canais de vendas, os hóspedes escolhem a data da hospedagem e a acomodação para finalizar a reserva.",
  },
  {
    icon: DollarSign,
    titulo: "Tarifas exclusivas e dinâmicas",
    descricao:
      "Gerencie tarifas e restrições exclusivas no seu site garantindo o melhor preço para os seus clientes diretos.",
  },
  {
    icon: Lock,
    titulo: "Ambiente de vendas corporativo",
    descricao:
      "Disponibilize um ambiente b2b para que empresas e agências de viagens possam fazer reservas, a qualquer momento, com tarifas e comissões exclusivas, sem custo por reserva.",
  },
  {
    icon: CreditCard,
    titulo: "Pagamento online",
    descricao:
      "Receba pagamentos online das reservas com o PIX e cartão de crédito sem custos adicionais por transação.",
  },
  {
    icon: Target,
    titulo: "Gatilhos de conversão",
    descricao:
      "Acelere a compra do visitante exibindo gatilhos de conversão como comparador de preços, gatilhos de urgência e de escassez.",
  },
];

function VantagensSection() {
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
            Vantagens do <span className="text-blue-500">motor de reservas</span>{" "}
            para hotéis e pousadas
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Nossos sistemas inovam a gestão hoteleira e marcam presença nas
            principais feiras do setor, unindo tecnologia e hospitalidade.
          </p>
        </motion.div>

        {/* Grid - 2 columns x 3 rows */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vantagens.map((vantagem, index) => {
            const Icon = vantagem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-2">{vantagem.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {vantagem.descricao}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { VantagensSection };
