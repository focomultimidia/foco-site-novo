"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  DollarSign,
  ShoppingCart,
  Sparkles,
  Package,
  FileText,
  BarChart3,
  Lock,
  Utensils,
  Users,
  Search,
  CheckSquare,
  LayoutDashboard,
  Boxes,
  CreditCard,
  Briefcase,
  FileCheck,
  Ticket,
  UserCircle,
  History,
} from "lucide-react";

const recursos = [
  {
    icon: Calendar,
    titulo: "Mapa de reservas",
    descricao:
      "Visão gráfica e intuitiva da ocupação do hotel em tempo real. Alocação de quartos e a gestão visual de overbookings e gaps. Realize o check-in, check-out e muitas outras funcionalidades.",
  },
  {
    icon: DollarSign,
    titulo: "Disponibilidade e tarifário",
    descricao:
      "Centraliza a gestão de preços e inventário. Permite ajustar tarifas, abrir/fechar vendas e aplicar regras de permanência mínima (restrições) de forma ágil e em um único lugar.",
  },
  {
    icon: ShoppingCart,
    titulo: "PDV hoteleiro",
    descricao:
      "Módulo de Ponto de Venda (PDV) integrado para registrar o consumo de hóspedes (frigobar, restaurante, bar) diretamente na conta da reserva, garantindo o fechamento de conta preciso.",
  },
  {
    icon: Sparkles,
    titulo: "Governança",
    descricao:
      "Módulo de gestão da equipe de limpeza (camareiras). Envia listas de tarefas, atualiza o status dos quartos em tempo real e agiliza a liberação para a recepção.",
  },
  {
    icon: Package,
    titulo: "Empréstimo de equipamentos",
    descricao:
      "Controle de inventário para itens emprestados (secadores, adaptadores, guarda-chuvas). Registra a saída e a devolução, evitando perdas e garantindo a disponibilidade para o próximo hóspede.",
  },
  {
    icon: FileText,
    titulo: "Gestão de orçamentos",
    descricao:
      "Gerencie orçamentos recebidos via telefone, e-mail, redes sociais e WhatsApp com a ajuda de um software de CRM para hotéis. Seu cliente o pagamento 100% online, 24 horas por dia.",
  },
  {
    icon: BarChart3,
    titulo: "Relatórios e dashboards",
    descricao:
      "Geração de relatórios detalhados (financeiros, operacionais, de ocupação) que transformam dados brutos em insights estratégicos para a tomada de decisão do gestor.",
  },
  {
    icon: Lock,
    titulo: "Bloqueio pré e pós reserva",
    descricao:
      "Ferramenta para bloquear quartos antes ou depois de uma reserva (ex: para manutenção, limpeza profunda ou inspeção), garantindo que o quarto só seja vendido quando estiver em perfeitas condições.",
  },
  {
    icon: Utensils,
    titulo: "Controle de pensões",
    descricao:
      "Gestão automatizada dos planos de refeição (café da manhã, meia pensão, pensão completa). Garante que o hóspede receba o serviço contratado e que a cobrança seja feita corretamente.",
  },
  {
    icon: Users,
    titulo: "Orçamento individuais e grupos",
    descricao:
      "Criação rápida de orçamentos personalizados para hóspedes individuais ou grandes grupos, com a opção de gerar um link de pagamento seguro para confirmação imediata da reserva.",
  },
  {
    icon: Search,
    titulo: "Achados e perdidos",
    descricao:
      "Sistema para registrar itens encontrados na propriedade, detalhando local e data. Facilita a localização e devolução ao hóspede, elevando a qualidade do serviço.",
  },
  {
    icon: CheckSquare,
    titulo: "Check-in online",
    descricao:
      "Evite filas na recepção e aumente o nível de satisfação do seu hóspede com uma ferramenta de check-in ou pré check-in 100% online.",
  },
  {
    icon: LayoutDashboard,
    titulo: "Dashboard por usuário",
    descricao:
      "Painel de controle personalizado que exibe métricas e tarefas relevantes para a função de cada colaborador (ex: recepção vê check-ins pendentes; gerente vê KPIs financeiros).",
  },
  {
    icon: Boxes,
    titulo: "Controle de estoque",
    descricao:
      "Gerenciamento de insumos (alimentos, bebidas, produtos de limpeza). Permite rastrear o consumo do frigobar e do restaurante, otimizando compras e evitando desperdícios.",
  },
  {
    icon: CreditCard,
    titulo: "Integração via PIX e máquina Stone",
    descricao:
      "Integração direta com meios de pagamento modernos (PIX e máquinas de cartão), agilizando o processo de cobrança no check-out e reduzindo a inadimplência.",
  },
  {
    icon: Briefcase,
    titulo: "Gestão B2B",
    descricao:
      "Gerencie empresas e operadoras dentro do seu PMS, identificando as reservas, formas de pagamento, markup e comissões para cada parceiro comercial.",
  },
  {
    icon: FileCheck,
    titulo: "Ficha FNRH",
    descricao:
      "Geração automática da Ficha Nacional de Registro de Hóspedes (FNRH) com base nos dados do check-in, garantindo o cumprimento das obrigações legais de forma rápida e sem erros.",
  },
  {
    icon: Ticket,
    titulo: "Voucher",
    descricao:
      "Emissão e gestão de vouchers de reserva personalizados. Documento formal que confirma os detalhes da estadia, tarifas e serviços inclusos, transmitindo profissionalismo ao hóspede.",
  },
  {
    icon: UserCircle,
    titulo: "Gestão do hóspede",
    descricao:
      "Cadastro completo e centralizado de todos os hóspedes. Cria um banco de dados (CRM) para identificar preferências, histórico de estadia e auxiliar em ações de marketing e fidelização.",
  },
  {
    icon: History,
    titulo: "Histórico de reservas",
    descricao:
      "Arquivo digital e seguro de todas as reservas passadas. Essencial para auditorias, análise de tendências de mercado e para resolver disputas de cobrança.",
  },
];

function RecursosSection() {
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
            Confira os principais recursos do{" "}
            <span className="text-blue-500">sistema PMS</span> para hotelaria
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            As ferramentas que centralizam a gestão de reservas, a rotina da
            recepção e o controle financeiro em uma única plataforma.
          </p>
        </motion.div>

        {/* Grid - 4 columns x 5 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recursos.map((recurso, index) => {
            const Icon = recurso.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 text-center"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="font-bold text-[#1e3a5f] mb-2">{recurso.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{recurso.descricao}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { RecursosSection };
