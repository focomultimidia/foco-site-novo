import type { GestaoHoteleiraData } from "../types";

const gestaoHoteleiraData: GestaoHoteleiraData = {
  hero: {
    titulo: "Gestão Hoteleira Completa",
    subtitulo: "PMS - Property Management System",
    descricao:
      "Controle total da sua operação hoteleira em uma única plataforma. Do check-in ao check-out, financeiro, housekeeping e muito mais.",
    ctaPrimario: "Começar Agora",
    ctaSecundario: "Agendar Demonstração",
    imagemUrl:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=800&fit=crop",
  },
  recursos: [
    {
      id: "1",
      icone: "Calendar",
      titulo: "Gestão de Reservas",
      descricao:
        "Controle completo de reservas com calendário visual intuitivo e drag-and-drop.",
    },
    {
      id: "2",
      icone: "Users",
      titulo: "Cadastro de Hóspedes",
      descricao:
        "Base de dados completa de hóspedes com histórico de estadias e preferências.",
    },
    {
      id: "3",
      icone: "BedDouble",
      titulo: "Controle de Quartos",
      descricao:
        "Gerenciamento de tipos de quartos, manutenção, limpeza e disponibilidade.",
    },
    {
      id: "4",
      icone: "DollarSign",
      titulo: "Financeiro Integrado",
      descricao:
        "Controle de receitas, despesas, fluxo de caixa e relatórios financeiros detalhados.",
    },
    {
      id: "5",
      icone: "FileText",
      titulo: "Nota Fiscal",
      descricao:
        "Emissão de NF-e integrada com controle automático de série e numeração.",
    },
    {
      id: "6",
      icone: "BarChart2",
      titulo: "Relatórios e BI",
      descricao:
        "Dashboards e relatórios personalizados para tomada de decisão estratégica.",
    },
  ],
  beneficios: [
    {
      id: "1",
      titulo: "Operação Simplificada",
      descricao:
        "Reduza a complexidade da operação diária com processos automatizados e integrados.",
    },
    {
      id: "2",
      titulo: "Decisões Baseadas em Dados",
      descricao:
        "Acesse relatórios e indicadores em tempo real para decisões mais assertivas.",
    },
    {
      id: "3",
      titulo: "Economia de Tempo",
      descricao:
        "Automatize tarefas repetitivas e libere sua equipe para atender melhor os hóspedes.",
    },
    {
      id: "4",
      titulo: "Controle Total",
      descricao:
        "Tenha visibilidade completa de toda a operação do hotel em um único lugar.",
    },
  ],
  modulos: [
    {
      id: "1",
      icone: "CalendarCheck",
      titulo: "Front Desk",
      descricao:
        "Módulo completo para recepção com check-in/check-out, reservas walk-in e gestão de hóspedes.",
      recursos: [
        "Check-in/check-out express",
        "Pré-check-in online",
        "Gestão de reservas",
        "Controle de hóspedes",
      ],
    },
    {
      id: "2",
      icone: "Sparkles",
      titulo: "Housekeeping",
      descricao:
        "Controle de limpeza e manutenção dos quartos com app mobile para equipe.",
      recursos: [
        "Controle de limpeza",
        "Manutenção preventiva",
        "App para camareiras",
        "Relatórios de produtividade",
      ],
    },
    {
      id: "3",
      icone: "UtensilsCrossed",
      titulo: "F&B - Restaurante",
      descricao:
        "Gestão de restaurante, room service, cardápio e controle de estoque.",
      recursos: [
        "Controle de mesas",
        "Room service",
        "Gestão de cardápio",
        "Controle de estoque",
      ],
    },
    {
      id: "4",
      icone: "Calculator",
      titulo: "Financeiro",
      descricao:
        "Módulo financeiro completo com contas a pagar/receber, fluxo de caixa e DRE.",
      recursos: [
        "Contas a pagar/receber",
        "Fluxo de caixa",
        "DRE automatizado",
        "Conciliação bancária",
      ],
    },
    {
      id: "5",
      icone: "Package",
      titulo: "Estoque",
      descricao:
        "Controle completo de estoque com alertas de reposição e gestão de fornecedores.",
      recursos: [
        "Controle de entradas/saídas",
        "Alertas de reposição",
        "Gestão de fornecedores",
        "Inventário físico",
      ],
    },
    {
      id: "6",
      icone: "Users2",
      titulo: "RH e Escalas",
      descricao:
        "Gestão de colaboradores, escalas de trabalho, folha de ponto e produtividade.",
      recursos: [
        "Cadastro de funcionários",
        "Escalas de trabalho",
        "Controle de ponto",
        "Relatórios de produtividade",
      ],
    },
  ],
};

async function fetchGestaoHoteleiraData(): Promise<GestaoHoteleiraData> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return gestaoHoteleiraData;
}

export { fetchGestaoHoteleiraData };
