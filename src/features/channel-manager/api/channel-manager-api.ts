import type { ChannelManagerData } from "../types";

const channelManagerData: ChannelManagerData = {
  hero: {
    titulo: "Channel Manager Integrado",
    subtitulo: "Sincronização em Tempo Real",
    descricao:
      "Conecte seu hotel aos principais OTAs e metasearch engines do mundo. Sincronização automática de tarifas, disponibilidade e reservas em tempo real.",
    ctaPrimario: "Conectar Canais",
    ctaSecundario: "Ver Demonstração",
    imagemUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
  },
  recursos: [
    {
      id: "1",
      icone: "RefreshCw",
      titulo: "Sincronização em Tempo Real",
      descricao:
        "Atualização instantânea de disponibilidade e tarifas em todos os canais conectados.",
    },
    {
      id: "2",
      icone: "Shield",
      titulo: "Prevenção de Overbooking",
      descricao:
        "Sistema inteligente que bloqueia automaticamente quartos vendidos em todos os canais.",
    },
    {
      id: "3",
      icone: "BarChart3",
      titulo: "Gestão de Tarifas",
      descricao:
        "Controle centralizado de preços com ajustes automáticos por canal e temporada.",
    },
    {
      id: "4",
      icone: "Clock",
      titulo: "Atualização 24/7",
      descricao:
        "Sincronização contínua sem interrupções, garantindo disponibilidade sempre atualizada.",
    },
    {
      id: "5",
      icone: "Zap",
      titulo: "Conexão Rápida",
      descricao:
        "Integração com novos canais em poucos minutos, sem necessidade de configuração técnica.",
    },
    {
      id: "6",
      icone: "Globe",
      titulo: "Alcance Global",
      descricao:
        "Presença nos principais mercados internacionais com suporte a múltiplas moedas.",
    },
  ],
  beneficios: [
    {
      id: "1",
      titulo: "+40% de Ocupação",
      descricao:
        "Aumente significativamente a taxa de ocupação distribuindo seu inventário em múltiplos canais.",
    },
    {
      id: "2",
      titulo: "Zero Overbooking",
      descricao:
        "Elimine definitivamente o problema de overbooking com sincronização em tempo real.",
    },
    {
      id: "3",
      titulo: "Economia de Tempo",
      descricao:
        "Reduza em 90% o tempo gasto gerenciando múltiplos extranet de canais de venda.",
    },
    {
      id: "4",
      titulo: "Maior Receita",
      descricao:
        "Maximize sua receita com estratégias de tarifação dinâmica por canal.",
    },
  ],
  canais: [
    { id: "1", nome: "Booking.com", logoUrl: "", categoria: "ota" },
    { id: "2", nome: "Expedia", logoUrl: "", categoria: "ota" },
    { id: "3", nome: "Hotels.com", logoUrl: "", categoria: "ota" },
    { id: "4", nome: "TripAdvisor", logoUrl: "", categoria: "meta" },
    { id: "5", nome: "Trivago", logoUrl: "", categoria: "meta" },
    { id: "6", nome: "Google Hotel Ads", logoUrl: "", categoria: "meta" },
    { id: "7", nome: "Airbnb", logoUrl: "", categoria: "ota" },
    { id: "8", nome: "Decolar", logoUrl: "", categoria: "ota" },
    { id: "9", nome: "Hurb", logoUrl: "", categoria: "ota" },
    { id: "10", nome: "Site Oficial", logoUrl: "", categoria: "direto" },
  ],
};

async function fetchChannelManagerData(): Promise<ChannelManagerData> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return channelManagerData;
}

export { fetchChannelManagerData };
