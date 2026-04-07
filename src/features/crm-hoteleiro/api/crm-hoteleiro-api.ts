import type { CrmHoteleiroData } from "../types";

const crmHoteleiroData: CrmHoteleiroData = {
  hero: {
    titulo: "CRM Hoteleiro Inteligente",
    subtitulo: "Relacionamento que Gera Resultados",
    descricao:
      "Conheça seus hóspedes, segmente sua base, automatize campanhas e aumente a recorrência. Um CRM completo desenvolvido especificamente para o mercado hoteleiro.",
    ctaPrimario: "Começar Grátis",
    ctaSecundario: "Ver Demonstração",
    imagemUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop",
  },
  recursos: [
    {
      id: "1",
      icone: "Users",
      titulo: "360º do Hóspede",
      descricao:
        "Visualize todo o histórico do hóspede: estadias, preferências, gastos e interações em um único lugar.",
    },
    {
      id: "2",
      icone: "PieChart",
      titulo: "Segmentação Inteligente",
      descricao:
        "Segmente sua base por comportamento, valor, frequência e preferências para campanhas mais efetivas.",
    },
    {
      id: "3",
      icone: "Mail",
      titulo: "Email Marketing",
      descricao:
        "Crie e envie campanhas de email com templates prontos e automação de jornadas.",
    },
    {
      id: "4",
      icone: "MessageSquare",
      titulo: "WhatsApp Automation",
      descricao:
        "Envie mensagens automatizadas pelo WhatsApp para confirmações, lembretes e ofertas.",
    },
    {
      id: "5",
      icone: "Target",
      titulo: "Campanhas Personalizadas",
      descricao:
        "Crie campanhas direcionadas com ofertas relevantes baseadas no perfil de cada hóspede.",
    },
    {
      id: "6",
      icone: "TrendingUp",
      titulo: "Análise de Resultados",
      descricao:
        "Acompanhe métricas de engajamento, conversão e ROI das suas campanhas em tempo real.",
    },
  ],
  beneficios: [
    {
      id: "1",
      titulo: "Aumento da Recorrência",
      descricao:
        "Transforme hóspedes ocasionais em clientes fiéis com comunicação personalizada e relevante.",
    },
    {
      id: "2",
      titulo: "Maior Ticket Médio",
      descricao:
        "Aumente o valor gasto por hóspede com upsells e cross-sells direcionados.",
    },
    {
      id: "3",
      titulo: "Redução de Cancelamentos",
      descricao:
        "Mantenha hóspedes engajados com comunicação pró-ativa e lembretes estratégicos.",
    },
    {
      id: "4",
      titulo: "Decisões Baseadas em Dados",
      descricao:
        "Entenda o comportamento dos seus hóspedes e tome decisões estratégicas com base em dados.",
    },
  ],
  segmentos: [
    {
      id: "1",
      nome: "VIP",
      icone: "Crown",
      descricao: "Hóspedes de alto valor que merecem atenção especial",
    },
    {
      id: "2",
      nome: "Frequentes",
      icone: "Repeat",
      descricao: "Hóspedes que retornam regularmente ao hotel",
    },
    {
      id: "3",
      nome: "Inativos",
      icone: "Moon",
      descricao: "Hóspedes que não retornam há mais de 6 meses",
    },
    {
      id: "4",
      nome: "Novos",
      icone: "Sparkles",
      descricao: "Primeira estadia - oportunidade de fidelização",
    },
    {
      id: "5",
      nome: "Aniversariantes",
      icone: "Cake",
      descricao: "Hóspedes com aniversário no mês - oferta especial",
    },
    {
      id: "6",
      nome: "Famílias",
      icone: "Users",
      descricao: "Hóspedes que viajam com crianças",
    },
  ],
};

async function fetchCrmHoteleiroData(): Promise<CrmHoteleiroData> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return crmHoteleiroData;
}

export { fetchCrmHoteleiroData };
