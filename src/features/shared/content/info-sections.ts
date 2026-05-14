import type { GenericInfoSectionProps } from "@/features/shared/components/generic-info-section";

type SectionContent = Omit<GenericInfoSectionProps, "imageSide" | "background" | "className">;

export const INFO_SECTIONS: Record<string, SectionContent> = {

  channelManager: {
    title:          "O que é um gestor de canais para hotéis e pousadas",
    titleHighlight: "gestor de canais",
    description: [
      "O Gestor de Canais (ou Channel Manager) é um software de gestão hoteleira fundamental para a distribuição de inventário e otimização de vendas. Sua função principal é sincronizar a disponibilidade e as tarifas do seu hotel ou pousada em tempo real em todos os seus canais de vendas conectados. Isso inclui as principais OTAs (Online Travel Agencies), operadoras, GDS, canais corporativos e, crucialmente, o motor de reservas do seu site.",
      "Ao automatizar essa distribuição, o channel manager elimina o risco de overbooking, garante a precisão dos dados e maximiza a ocupação com eficiência.",
    ],
    imagePath: "/assets/imgs/channel-manager/channel-manager.png",
    imageAlt:  "Channel Manager — Gestor de Canais",
  },

  motorReservas: {
    title:          "O que é um motor de reservas para hotéis?",
    titleHighlight: "motor de reservas",
    description: [
      "O Motor de reservas (ou Booking Engine) é o software para hotéis essencial que transforma o site do seu empreendimento em um canal de vendas diretas de alta performance. Desenvolvido para aumentar a taxa de conversão de visitantes em hóspedes, este sistema de reservas permite que hotéis, pousadas, hostels e resorts garantam reservas livres de comissões.",
      "Ao centralizar a gestão hoteleira e oferecer disponibilidade 24/7, o motor de reservas eleva a lucratividade do seu negócio, promovendo a independência das OTAs e simplificando toda a jornada de compra do seu cliente com agilidade e segurança.",
    ],
    imagePath: "/assets/imgs/motor-de-reservas/motor-de-reservas.png",
    imageAlt:  "Motor de Reservas — Mockup",
  },

  gestaoHoteleira: {
    title:          "O que é um sistema de gestão hoteleira - PMS?",
    titleHighlight: "sistema de gestão hoteleira - PMS",
    description: [
      "Um Property Management System (PMS) é o software operacional responsável por centralizar e automatizar as principais rotinas do hotel: check-in/check-out, gestão de quartos, reservas, tarifação e relatórios financeiros.",
      "Com o PMS integrado ao Channel Manager e ao Motor de Reservas, todas as informações fluem em tempo real, eliminando retrabalho manual e garantindo dados sempre precisos.",
    ],
    imagePath: "/assets/imgs/channel-manager/channel-manager.png",
    imageAlt:  "Gestão Hoteleira PMS — Mockup",
  },

  crmHoteleiro: {
    title:          "O que é um CRM hoteleiro?",
    titleHighlight: "CRM hoteleiro",
    description: [
      "O CRM (Customer Relationship Management) hoteleiro é a plataforma que centraliza o histórico de relacionamento com cada hóspede — preferências, estadias anteriores, comunicações — permitindo campanhas segmentadas e experiências hiperpersonalizadas.",
      "Integrado ao PMS, o CRM transforma dados operacionais em estratégia de fidelização, aumentando o RevPAR e reduzindo o custo de aquisição de clientes.",
    ],
    imagePath: "/assets/imgs/channel-manager/channel-manager.png",
    imageAlt:  "CRM Hoteleiro — Mockup",
  },

  softwarePagamentos: {
    title:          "O que é um software de pagamentos para hotéis?",
    titleHighlight: "software de pagamentos",
    description: [
      "O software de pagamentos hoteleiro processa transações com Pix, cartão de crédito/débito e boleto diretamente dentro do fluxo de reserva, eliminando gateways externos e reduzindo fricção na conversão.",
      "Com conciliação automática e antecipação de recebíveis, o hotel mantém o fluxo de caixa saudável sem depender de planilhas manuais.",
    ],
    imagePath: "/assets/imgs/channel-manager/channel-manager.png",
    imageAlt:  "Software de Pagamentos — Mockup",
  },

  experienciaHospede: {
    title:          "Conheça o Foco Pass, o melhor app de hospedagem de todo trade turístico",
    titleHighlight: "Foco Pass",
    description: [
      "O Foco Pass é a solução definitiva para a automação completa da jornada do seu hóspede, desde o check-in até o check-out. Para o hoteleiro, isso significa máxima eficiência operacional, redução de custos com tarefas manuais e a garantia de um serviço impecável.",
      "Para o hóspede, o Foco Pass é sinônimo de comodidade incomparável. Através do nosso aplicativo de hospedagem, ele tem acesso a uma jornada fluida e, o melhor de tudo, a descontos exclusivos e curados em bares, restaurantes, receptivos e ingressos no destino.",
      "Transforme a estadia em uma experiência completa, fidelize seu cliente e veja a satisfação refletida nas suas avaliações.",
    ],
    imagePath: "/assets/imgs/channel-manager/channel-manager.png",
    imageAlt:  "Experiência do hóspede - Foco Pass — Mockup",
  },

};
