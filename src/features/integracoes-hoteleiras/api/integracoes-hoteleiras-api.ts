import type { IntegracoesHoteleirasData } from "../types";

const integracoesHoteleirasData: IntegracoesHoteleirasData = {
  hero: {
    titulo: "Integrações Hoteleiras",
    subtitulo: "Ecossistema Conectado",
    descricao:
      "Conecte seu hotel com as melhores ferramentas do mercado. Nossa plataforma se integra com OTAs, gateways de pagamento, sistemas contábeis e muito mais.",
    ctaPrimario: "Ver Integrações",
    ctaSecundario: "Solicitar Nova Integração",
    imagemUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop",
  },
  integracoes: [
    {
      id: "1",
      nome: "Booking.com",
      categoria: "otas",
      descricao: "Sincronização bidirecional de reservas e disponibilidade",
      icone: "Building",
    },
    {
      id: "2",
      nome: "Expedia",
      categoria: "otas",
      descricao: "Integração completa com a rede Expedia",
      icone: "Building",
    },
    {
      id: "3",
      nome: "Airbnb",
      categoria: "otas",
      descricao: "Conexão direta com a plataforma Airbnb",
      icone: "Home",
    },
    {
      id: "4",
      nome: "Stripe",
      categoria: "pagamentos",
      descricao: "Processamento de pagamentos internacional",
      icone: "CreditCard",
    },
    {
      id: "5",
      nome: "PagSeguro",
      categoria: "pagamentos",
      descricao: "Gateway de pagamentos brasileiro",
      icone: "CreditCard",
    },
    {
      id: "6",
      nome: "Mercado Pago",
      categoria: "pagamentos",
      descricao: "Solução completa de pagamentos",
      icone: "CreditCard",
    },
    {
      id: "7",
      nome: "QuickBooks",
      categoria: "contabilidade",
      descricao: "Integração contábil automatizada",
      icone: "Calculator",
    },
    {
      id: "8",
      nome: "Conta Azul",
      categoria: "contabilidade",
      descricao: "Gestão financeira integrada",
      icone: "Calculator",
    },
    {
      id: "9",
      nome: "Google Analytics",
      categoria: "marketing",
      descricao: "Rastreamento de conversões e comportamento",
      icone: "BarChart",
    },
    {
      id: "10",
      nome: "Facebook Pixel",
      categoria: "marketing",
      descricao: "Remarketing e conversões",
      icone: "Target",
    },
    {
      id: "11",
      nome: "Mailchimp",
      categoria: "marketing",
      descricao: "Email marketing integrado",
      icone: "Mail",
    },
    {
      id: "12",
      nome: "WhatsApp Business",
      categoria: "comunicacao",
      descricao: "Comunicação direta com hóspedes",
      icone: "MessageCircle",
    },
  ],
  beneficios: [
    {
      id: "1",
      titulo: "Operação Unificada",
      descricao:
        "Todos os seus sistemas trabalhando em sincronia, eliminando retrabalho e erros manuais.",
    },
    {
      id: "2",
      titulo: "Dados em Tempo Real",
      descricao:
        "Informações atualizadas instantaneamente em todas as plataformas conectadas.",
    },
    {
      id: "3",
      titulo: "Setup Simplificado",
      descricao:
        "Integrações configuradas em minutos, sem necessidade de conhecimento técnico.",
    },
    {
      id: "4",
      titulo: "Suporte Dedicado",
      descricao:
        "Equipe especializada para ajudar na configuração e manutenção das integrações.",
    },
  ],
  categorias: [
    {
      id: "otas",
      nome: "OTAs",
      icone: "Building",
    },
    {
      id: "pagamentos",
      nome: "Pagamentos",
      icone: "CreditCard",
    },
    {
      id: "contabilidade",
      nome: "Contabilidade",
      icone: "Calculator",
    },
    {
      id: "marketing",
      nome: "Marketing",
      icone: "Target",
    },
    {
      id: "comunicacao",
      nome: "Comunicação",
      icone: "MessageCircle",
    },
  ],
};

async function fetchIntegracoesHoteleirasData(): Promise<IntegracoesHoteleirasData> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return integracoesHoteleirasData;
}

export { fetchIntegracoesHoteleirasData };
