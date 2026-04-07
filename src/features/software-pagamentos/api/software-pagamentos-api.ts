import type { SoftwarePagamentosData } from "../types";

const softwarePagamentosData: SoftwarePagamentosData = {
  hero: {
    titulo: "Software de Pagamentos Integrado",
    subtitulo: "Pagamentos Simplificados",
    descricao:
      "Processe pagamentos de forma segura e integrada. Múltiplas formas de pagamento, split de pagamentos, conciliação automática e total conformidade com regulamentações.",
    ctaPrimario: "Ativar Pagamentos",
    ctaSecundario: "Ver Taxas",
    imagemUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
  },
  recursos: [
    {
      id: "1",
      icone: "CreditCard",
      titulo: "Múltiplas Bandeiras",
      descricao:
        "Aceite Visa, Mastercard, Elo, American Express, Hipercard e outras principais bandeiras.",
    },
    {
      id: "2",
      icone: "QrCode",
      titulo: "Pix Integrado",
      descricao:
        "Receba pagamentos via Pix com geração automática de QR Code e conciliação em tempo real.",
    },
    {
      id: "3",
      icone: "Split",
      titulo: "Split de Pagamentos",
      descricao:
        "Divisão automática de receitas entre hotel, OTAs e outros parceiros.",
    },
    {
      id: "4",
      icone: "ShieldCheck",
      titulo: "Antifraude",
      descricao:
        "Proteção contra fraudes com análise de risco em tempo real e 3D Secure.",
    },
    {
      id: "5",
      icone: "RefreshCcw",
      titulo: "Recorrência",
      descricao:
        "Cobranças automáticas para planos de fidelidade, mensalidades e reservas garantidas.",
    },
    {
      id: "6",
      icone: "FileCheck",
      titulo: "Conciliação Automática",
      descricao:
        "Conciliação automática de recebíveis com seu PMS e contabilidade.",
    },
  ],
  beneficios: [
    {
      id: "1",
      titulo: "Conversão Maior",
      descricao:
        "Aumente a taxa de conversão oferecendo múltiplas opções de pagamento aos hóspedes.",
    },
    {
      id: "2",
      titulo: "Cash Flow Otimizado",
      descricao:
        "Receba seus pagamentos mais rápido com liquidação em D+1 ou D+2.",
    },
    {
      id: "3",
      titulo: "Sem Burocracia",
      descricao:
        "Elimine a necessidade de contratos separados com adquirentes e gateways.",
    },
    {
      id: "4",
      titulo: "Segurança Total",
      descricao:
        "PCI DSS compliant com criptografia de ponta a ponta e tokenização de cartões.",
    },
  ],
  formasPagamento: [
    {
      id: "1",
      nome: "Cartão de Crédito",
      icone: "CreditCard",
      descricao: "Até 12x sem juros",
    },
    {
      id: "2",
      nome: "Cartão de Débito",
      icone: "CreditCard",
      descricao: "À vista",
    },
    {
      id: "3",
      nome: "Pix",
      icone: "QrCode",
      descricao: "Pagamento instantâneo",
    },
    {
      id: "4",
      nome: "Boleto Bancário",
      icone: "FileText",
      descricao: "Vencimento em 3 dias",
    },
    {
      id: "5",
      nome: "Link de Pagamento",
      icone: "Link",
      descricao: "Envie por WhatsApp/Email",
    },
    {
      id: "6",
      nome: "Wallet Digital",
      icone: "Wallet",
      descricao: "Apple Pay, Google Pay",
    },
  ],
};

async function fetchSoftwarePagamentosData(): Promise<SoftwarePagamentosData> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return softwarePagamentosData;
}

export { fetchSoftwarePagamentosData };
