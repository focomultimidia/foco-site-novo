import type { DorSolucao } from "@/features/home/types";

// Conteúdo dos "3 cenários" — fonte única, compartilhada entre a
// DoresDiagnosticoSection (home) e a DorParallaxSection (páginas internas de
// produto). Antes vivia só dentro de home-api.ts; virou dado compartilhado
// porque agora é consumido por features fora da home também.
const DORES_DATA: DorSolucao[] = [
  {
    id: "baixa-ocupacao",
    titulo: "Seu hotel está com baixa ocupação e poucas reservas?",
    descricao:
      "Descubra como atrair mais hóspedes, aumentar a taxa de ocupação e impulsionar sua lucratividade de forma eficiente.",
    solucoes: [
      {
        titulo: "Mais canais, mais reservas",
        descricao:
          "Conecte-se a +850 canais de vendas com o nosso Channel manager, garantindo mais visibilidade e menos overbooking.",
        link: "/channel-manager",
      },
      {
        titulo: "Site que vende para você",
        descricao:
          "Tenha um Site hoteleiro otimizado para transformar acessos em hóspedes, reduzindo custos com comissões.",
        link: "/site-hoteleiro",
      },
      {
        titulo: "Atrair visitantes qualificados",
        descricao:
          "Tenha uma estratégia de Marketing digital eficiente com anúncios no Google Hotel e Meta ADS.",
        link: "#",
      },
      {
        titulo: "Gatilhos para mais reservas",
        descricao:
          "Nosso Motor de reservas utiliza gatilhos estratégicos e promoções personalizadas para aumentar a conversão.",
        link: "/motor-de-reservas",
      },
    ],
  },
  {
    id: "prejuizos",
    titulo: "Cansado de prejuízos na gestão do seu hotel?",
    descricao:
      "Overbookings, falhas nos pagamentos e sistemas desconectados? Elimine erros e torne sua operação mais ágil.",
    solucoes: [
      {
        titulo: "Sem controle e organização?",
        descricao:
          "Gerencie a sua propriedade com um PMS em nuvem e 100% mobile: mapa de apartamentos, governança, PDV, financeiro.",
        link: "/gestao-hoteleira",
      },
      {
        titulo: "Problemas com pagamentos?",
        descricao:
          "O Foco Pay garante transações seguras, rápidas e em conformidade com a LGPD, melhorando seu fluxo de caixa.",
        link: "/software-de-pagamentos",
      },
      {
        titulo: "Ineficiência no atendimento?",
        descricao:
          "Com a Central de Reservas você gerencia pedidos e reservas para múltiplos hotéis, integrando telefone e WhatsApp.",
      },
      {
        titulo: "Seus sistemas não conversam?",
        descricao:
          "Integramos com diversos PMSs, RMSs, chatbot e adquirentes, para garantir uma gestão mais eficiente.",
      },
    ],
  },
  {
    id: "experiencia-ruim",
    titulo: "Experiência do hóspede ruim, gerando menos reservas?",
    descricao:
      "Check-in burocrático e atendimento falho? Melhore a experiência, fidelize hóspedes e aumente sua reputação online!",
    solucoes: [
      {
        titulo: "Reputação ruim?",
        descricao:
          "Gerencie e responda todos os reviews em um só lugar, garantindo atendimento ágil e melhor posicionamento online.",
      },
      {
        titulo: "Check-in demorado?",
        descricao:
          "O Aplicativo de Hotel permite check-in antecipado e mantém o hóspede informado sobre atrações e serviços.",
      },
      {
        titulo: "Pouco contato com o hóspede?",
        descricao:
          "O CRM Hoteleiro automatiza WhatsApp, e-mails e ofertas, mantendo o contato antes, durante e depois da estadia.",
      },
      {
        titulo: "Sem estratégias de benefícios?",
        descricao:
          "Cupons de desconto e tarifas exclusivas garantem mais fidelização e aumento na ocupação.",
      },
    ],
  },
];

export { DORES_DATA };
