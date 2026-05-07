import type { MotorReservasData } from "../types";

const motorReservasData: MotorReservasData = {
  hero: {
    titulo: "Motor de reservas para hotéis com alta conversão e integração total",
    subtitulo: "Venda direta sem comissão",
    descricao: "Checkout simples, PIX e cartões integrados, comparador de preços e funcionalidades avançadas para maximizar conversões.",
    ctaPrimario: "Garantir meu 1º mês grátis",
    ctaSecundario: "Ver Demonstração",
    imagemUrl: "/assets/imgs/motor-de-reservas/motor-de-reservas1.png",
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
      pergunta: "O que é um motor de reservas para hotéis?",
      resposta: "É uma ferramenta que permite que o hóspede faça reservas direto no site do hotel, com pagamento online e confirmação imediata.",
    },
    {
      id: "2",
      pergunta: "Como o motor de reservas da Foco aumenta minhas vendas diretas?",
      resposta: "Com recursos como comparador de preços, urgência, escassez, Pix e recuperação de carrinho, ele transforma visitantes em hóspedes.",
    },
    {
      id: "3",
      pergunta: "O motor de reservas funciona integrado com meu PMS?",
      resposta: "Sim. Ele se conecta aos principais sistemas de gestão hoteleira do Brasil e também ao PMS próprio da Foco.",
    },
    {
      id: "4",
      pergunta: "É possível usar o motor junto com o Channel Manager?",
      resposta: "Sim. Com a integração Foco, você pode distribuir tarifas para mais de 800 canais com sincronização automática.",
    },
    {
      id: "5",
      pergunta: "O motor aceita quais formas de pagamento?",
      resposta: "Pix com confirmação automática, cartões de crédito e links de pagamento via WhatsApp ou e-mail — tudo seguro e integrado.",
    },
    {
      id: "6",
      pergunta: "O sistema envia mensagens automáticas para os hóspedes?",
      resposta: "Sim. E-mails e mensagens no WhatsApp podem ser enviados com confirmação de reserva, pré check-in, lembretes e muito mais.",
    },
    {
      id: "7",
      pergunta: "É possível oferecer promoções, pacotes e cupons?",
      resposta: "Sim. Você pode criar tarifas promocionais, pacotes temáticos, landing pages e ofertas com descontos por pagamento.",
    },
    {
      id: "8",
      pergunta: "O motor de reservas é responsivo e funciona no celular?",
      resposta: "Sim. Tanto para o hóspede quanto para o hoteleiro, ele funciona perfeitamente em qualquer dispositivo, com design otimizado.",
    },
    {
      id: "9",
      pergunta: "É possível mensurar os resultados das minhas campanhas de marketing?",
      resposta: "Sim. O motor é integrado com GA4, Google Ads, Meta Ads, Tag Manager, RD Station e AskFlow para medir ROI e conversões.",
    },
    {
      id: "10",
      pergunta: "Consigo gerenciar reservas manualmente pela extranet?",
      resposta: "Sim. Pelo celular ou desktop, é possível cadastrar reservas manuais, atualizar tarifas e acompanhar todas as vendas.",
    },
  ],
};

async function fetchMotorReservasData(): Promise<MotorReservasData> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return motorReservasData;
}

export { fetchMotorReservasData, motorReservasData };
