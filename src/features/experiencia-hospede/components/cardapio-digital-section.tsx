"use client";

import { motion } from "framer-motion";
import { Boxes, LayoutGrid, ClipboardList, Calculator, Package, Monitor, CreditCard } from "lucide-react";

const recursos = [
  {
    icon: Boxes,
    titulo: "CONTROLE DE ESTOQUE",
    descricao:
      "Gerenciamento preciso de insumos e produtos acabados. Evita desperdícios, otimiza o momento da compra e garante que o cardápio reflita apenas o que está disponível.",
  },
  {
    icon: LayoutGrid,
    titulo: "CONTROLE DE MESAS",
    descricao:
      "Visão em tempo real da ocupação do salão e do status de cada mesa. Agiliza o atendimento, a alocação de clientes e o fechamento de contas.",
  },
  {
    icon: ClipboardList,
    titulo: "GESTÃO DE PEDIDOS",
    descricao:
      "Recebimento e roteamento automático de pedidos (cozinha, bar, serviço de quarto). Reduz o tempo de espera do cliente e elimina erros de comunicação entre salão e cozinha.",
  },
  {
    icon: Calculator,
    titulo: "CONTROLE DE CAIXA",
    descricao:
      "Registro e conciliação de todas as transações financeiras. Garante a precisão do fechamento diário, reduzindo fraudes e facilitando a auditoria.",
  },
  {
    icon: Package,
    titulo: "GERENCIAMENTO DE PRODUTOS",
    descricao:
      "Cadastro detalhado de todos os itens do menu, incluindo custos, margens de lucro e variações (tamanhos, adicionais), para um controle financeiro completo.",
  },
  {
    icon: Monitor,
    titulo: "CARDÁPIO ONLINE",
    descricao:
      "Interface digital moderna e visualmente atraente. Permite atualizações instantâneas de preços e disponibilidade, além de fotos de alta qualidade para incentivar a compra.",
  },
  {
    icon: CreditCard,
    titulo: "INTEGRAÇÕES COM GATEWAYS DE PAGAMENTO ONLINE",
    descricao:
      "Recebimento de pagamentos via cartão de crédito, débito ou PIX diretamente pelo sistema. Garante segurança na transação e agilidade no checkout do cliente.",
  },
];

function CardapioDigitalSection() {
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
            <span className="text-blue-300">Cardápio Digital</span> para hotéis, pousadas e resorts
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            A gestão completa que <span className="text-blue-300 font-medium">multiplica a receita</span>{" "}
            do seu hotel e restaurante.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Features List */}
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
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-4 bg-white rounded-xl p-4"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1e3a5f] mb-1 text-sm uppercase tracking-wide">
                      {recurso.titulo}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{recurso.descricao}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Column - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-[400px]">
              <img
                src="/section5-experiencia.png"
                alt="Cardápio Digital"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { CardapioDigitalSection };
