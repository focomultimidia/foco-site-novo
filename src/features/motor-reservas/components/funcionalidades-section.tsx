"use client";

import { motion } from "framer-motion";
import { Monitor, Link, QrCode, Zap, BarChart3, Calendar, Search, CreditCard } from "lucide-react";

const funcionalidades = [
  {
    icon: Monitor,
    titulo: "Central de reservas (CRS)",
    descricao:
      "Consolide todas as reservas do site, OTAs, operadoras e canais diretos em uma única extranet. Menos retrabalho, mais controle e produtividade.",
  },
  {
    icon: Link,
    titulo: "Link de pagamento personalizado",
    descricao:
      "Envie links por WhatsApp ou e-mail para concluir reservas de forma ágil e segura. Ideal para contatos diretos e fechamentos rápidos.",
  },
  {
    icon: QrCode,
    titulo: "Pix com confirmação automática",
    descricao:
      "Receba pagamentos via Pix com confirmação em segundos, sem conferência manual. Mais agilidade no check-in e no fluxo de caixa.",
  },
  {
    icon: Zap,
    titulo: "Ações automáticas para hóspedes",
    descricao:
      "Automatize e-mails e mensagens no WhatsApp com confirmação de reserva, recuperação de carrinho, pré check-in, consumo, pagamento de conta e mais.",
  },
  {
    icon: BarChart3,
    titulo: "Relatórios e dashboards gerenciais",
    descricao:
      "Acompanhe reservas, receita, conversão e ocupação em tempo real com relatórios visuais, prontos para tomada de decisão.",
  },
  {
    icon: Calendar,
    titulo: "Calendário hoteleiro inteligente",
    descricao:
      "Visualize ocupação, bloqueios, tarifas e disponibilidade em um só lugar, com atualização automática integrada ao Channel Manager e PMS.",
  },
  {
    icon: Search,
    titulo: "Integração com Google Hotel e metabuscadores",
    descricao:
      "Apareça no Google Hotel, Trivago e outros metabuscadores sem custo adicional. Gere tráfego qualificado para seu site com reservas diretas.",
  },
  {
    icon: CreditCard,
    titulo: "Integração de cartões gratuita",
    descricao:
      "Venda online com cartão de crédito sem taxas extras de integração. Compatível com Cielo, Stone, Getnet, Sicredi, Rede e outros.",
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
            Funcionalidades que aumentam sua produtividade e geram mais reservas diretas
          </h2>
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
                className="bg-slate-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 text-center"
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
