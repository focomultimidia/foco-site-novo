"use client";

import { motion } from "framer-motion";
import { Monitor, Link, QrCode, Zap, BarChart3, Calendar, Search, CreditCard } from "lucide-react";

const funcionalidades = [
  {
    icon: Monitor,
    titulo: "Central de reservas (CRS)",
    descricao:
      "Centralize as reservas na mesma extranet e aumente a produtividade da sua equipe. Todas as vendas do motor de reservas, otas, operadoras e outros canais em um único sistema hoteleiro.",
  },
  {
    icon: Link,
    titulo: "Link de pagamento",
    descricao:
      "Envie links de pagamento diretamente pelo WhatsApp ou e-mail e feche reservas com rapidez e segurança. Agilidade no atendimento e mais reservas para o seu hotel.",
  },
  {
    icon: QrCode,
    titulo: "Pix Automático",
    descricao:
      "Receba pagamentos em segundos, com confirmação imediata através da integração PIX. Não perca mais tempo realizando conferência manual de pagamentos.",
  },
  {
    icon: Zap,
    titulo: "Ações automáticas",
    descricao:
      "Comunique-se com o hóspede ativando ações automáticas enviadas por e-mail, a exemplo de lembretes de aniversário, pré check-in, pós check-out e muito mais.",
  },
  {
    icon: BarChart3,
    titulo: "Dashboards e relatórios",
    descricao:
      "Centralize as reservas na mesma extranet e aumente a produtividade da sua equipe. Todas as vendas do motor de reservas, otas, operadoras e outros canais em um único sistema hoteleiro.",
  },
  {
    icon: Calendar,
    titulo: "Calendário hoteleiro",
    descricao:
      "Centralize as reservas na mesma extranet e aumente a produtividade da sua equipe. Todas as vendas do motor de reservas, otas, operadoras e outros canais em um único sistema hoteleiro.",
  },
  {
    icon: Search,
    titulo: "Google Hotel e Metabuscadores",
    descricao:
      "Integre seu motor de reservas sem custos adicionais ao Google Hotel, Trivago e outros metabuscadores. Coloque seu hotel na vitrine digital que mais gera reservas.",
  },
  {
    icon: CreditCard,
    titulo: "Integração de cartões gratuita",
    descricao:
      "Venda online com cartão de crédito sem pagar taxas extras. Integração direta com Cielo, Rede, Stone, Getnet, Sicredi e outros adquirentes garante flexibilidade, segurança e agilidade.",
  },
];

function FuncionalidadesSection() {
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
            Confira funcionalidades do{" "}
            <span className="text-blue-500">motor de reservas</span> para hotéis
            e pousadas
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Da gestão ao pagamento: tudo conectado para mais produtividade e
            lucro.
          </p>
        </motion.div>

        {/* Grid - 4 columns x 2 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {funcionalidades.map((func, index) => {
            const Icon = func.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-2">{func.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {func.descricao}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { FuncionalidadesSection };
