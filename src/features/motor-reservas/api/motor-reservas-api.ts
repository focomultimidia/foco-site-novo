import type { MotorReservasData } from "../types";

const motorReservasData: MotorReservasData = {
  hero: {
    titulo: "Motor de Reservas que Converte",
    subtitulo: "Booking Engine Profissional",
    descricao: "Transforme visitantes em hóspedes com nosso motor de reservas otimizado para conversão. Processo de reserva simplificado, pagamento integrado e confirmação instantânea.",
    ctaPrimario: "Testar Grátis",
    ctaSecundario: "Ver Demonstração",
    imagemUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
  },
  recursos: [
    {
      id: "1",
      titulo: "Processo de Reserva Simplificado",
      descricao: "Fluxo otimizado em poucos passos para maximizar conversões",
      icone: "MousePointer",
    },
    {
      id: "2",
      titulo: "Pagamento Integrado",
      descricao: "Aceite cartões, PIX, boleto e outras formas de pagamento",
      icone: "CreditCard",
    },
    {
      id: "3",
      titulo: "Confirmação Instantânea",
      descricao: "Hóspedes recebem confirmação imediata por email e SMS",
      icone: "Mail",
    },
    {
      id: "4",
      titulo: "Upsell e Cross-sell",
      descricao: "Ofereça upgrades, serviços adicionais e pacotes especiais",
      icone: "TrendingUp",
    },
    {
      id: "5",
      titulo: "Códigos Promocionais",
      descricao: "Crie cupons de desconto e ofertas especiais facilmente",
      icone: "Tag",
    },
    {
      id: "6",
      titulo: "Relatórios Detalhados",
      descricao: "Acompanhe conversão, receita e comportamento dos usuários",
      icone: "BarChart",
    },
  ],
  beneficios: [
    {
      id: "1",
      titulo: "Aumente a Conversão",
      descricao: "Nosso motor de reservas é otimizado para converter mais visitantes em reservas confirmadas.",
    },
    {
      id: "2",
      titulo: "Reduza Abandonos",
      descricao: "Processo simplificado que reduz o abandono no carrinho de compras.",
    },
    {
      id: "3",
      titulo: "Aumente o Ticket Médio",
      descricao: "Ferramentas de upsell para vender mais serviços e experiências.",
    },
    {
      id: "4",
      titulo: "Pagamento Seguro",
      descricao: "Gateway certificado PCI DSS com criptografia de ponta a ponta.",
    },
  ],
  faq: [
    {
      id: "1",
      pergunta: "Quais formas de pagamento são aceitas?",
      resposta: "Aceitamos cartões de crédito (parcelamento em até 12x), PIX, boleto bancário e transferência.",
    },
    {
      id: "2",
      pergunta: "Posso configurar políticas de cancelamento?",
      resposta: "Sim, você pode configurar políticas flexíveis de acordo com as necessidades do seu hotel.",
    },
    {
      id: "3",
      pergunta: "Como funciona a confirmação de reservas?",
      resposta: "O hóspede recebe confirmação automática por email e SMS com todos os detalhes da reserva.",
    },
    {
      id: "4",
      pergunta: "É possível integrar com meu PMS?",
      resposta: "Sim, temos integração nativa com os principais PMSs do mercado.",
    },
  ],
};

async function fetchMotorReservasData(): Promise<MotorReservasData> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return motorReservasData;
}

export { fetchMotorReservasData, motorReservasData };
