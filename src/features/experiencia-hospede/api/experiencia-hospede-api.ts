import type { ExperienciaHospedeData } from "../types";

const experienciaHospedeData: ExperienciaHospedeData = {
  hero: {
    titulo: "Experiência do Hóspede Excepcional",
    subtitulo: "Do Pré-Check-in ao Pós-Estadia",
    descricao:
      "Crie experiências memoráveis em cada etapa da jornada do hóspede. Comunicação personalizada, check-in digital, concierge virtual e muito mais.",
    ctaPrimario: "Implementar Agora",
    ctaSecundario: "Ver Demonstração",
    imagemUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
  },
  recursos: [
    {
      id: "1",
      icone: "Smartphone",
      titulo: "Check-in Digital",
      descricao:
        "Hóspedes fazem check-in pelo celular antes da chegada, reduzindo filas na recepção.",
    },
    {
      id: "2",
      icone: "Key",
      titulo: "Chave Digital",
      descricao:
        "Acesso ao quarto via smartphone, eliminando a necessidade de cartões magnéticos.",
    },
    {
      id: "3",
      icone: "MessageCircle",
      titulo: "Comunicação via WhatsApp",
      descricao:
        "Converse com hóspedes pelo WhatsApp de forma automatizada e personalizada.",
    },
    {
      id: "4",
      icone: "Concierge",
      titulo: "Concierge Virtual",
      descricao:
        "Recomendações personalizadas de restaurantes, passeios e serviços locais.",
    },
    {
      id: "5",
      icone: "Star",
      titulo: "Avaliações e Feedback",
      descricao:
        "Coleta automática de feedback durante e após a estadia para melhoria contínua.",
    },
    {
      id: "6",
      icone: "Gift",
      titulo: "Upsell e Experiências",
      descricao:
        "Ofereça upgrades de quarto, late check-out e experiências especiais.",
    },
  ],
  beneficios: [
    {
      id: "1",
      titulo: "Satisfação do Hóspede",
      descricao:
        "Aumente a satisfação com uma experiência moderna, conveniente e personalizada.",
    },
    {
      id: "2",
      titulo: "Avaliações Positivas",
      descricao:
        "Melhore suas avaliações online com hóspedes mais satisfeitos e engajados.",
    },
    {
      id: "3",
      titulo: "Receita Adicional",
      descricao:
        "Gere receita extra com upsells, experiências e serviços adicionais.",
    },
    {
      id: "4",
      titulo: "Operação Eficiente",
      descricao:
        "Reduza a carga da recepção com processos automatizados e self-service.",
    },
  ],
  jornada: [
    {
      id: "1",
      icone: "Calendar",
      titulo: "Reserva Confirmada",
      descricao:
        "Email de boas-vindas personalizado com informações úteis sobre a estadia.",
    },
    {
      id: "2",
      icone: "Smartphone",
      titulo: "Pré-Check-in",
      descricao:
        "Hóspede completa cadastro e faz check-in online 24h antes da chegada.",
    },
    {
      id: "3",
      icone: "MapPin",
      titulo: "Dia da Chegada",
      descricao:
        "Notificação automática quando o quarto está pronto e instruções de acesso.",
    },
    {
      id: "4",
      icone: "Bed",
      titulo: "Durante a Estadia",
      descricao:
        "Comunicação contínua via WhatsApp para solicitações e recomendações.",
    },
    {
      id: "5",
      icone: "LogOut",
      titulo: "Check-out",
      descricao:
        "Check-out expresso com fatura digital e opção de late check-out.",
    },
    {
      id: "6",
      icone: "Heart",
      titulo: "Pós-Estadia",
      descricao:
        "Solicitação de avaliação e campanhas de fidelização para retorno.",
    },
  ],
};

async function fetchExperienciaHospedeData(): Promise<ExperienciaHospedeData> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return experienciaHospedeData;
}

export { fetchExperienciaHospedeData };
