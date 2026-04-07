import type { SiteHoteleiroData } from "../types";

const siteHoteleiroData: SiteHoteleiroData = {
  hero: {
    titulo: "Site Hoteleiro que Converte Visitantes em Hóspedes",
    subtitulo: "Website Profissional para Hotéis",
    descricao: "Tenha um site moderno, responsivo e otimizado para SEO que transforma visitantes em reservas diretas. Reduza sua dependência de OTAs e aumente sua margem de lucro.",
    ctaPrimario: "Solicitar Demonstração",
    ctaSecundario: "Ver Templates",
    imagemUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
  },
  recursos: [
    {
      id: "1",
      titulo: "Design Responsivo",
      descricao: "Site adaptável a todos os dispositivos: desktop, tablet e mobile",
      icone: "Smartphone",
    },
    {
      id: "2",
      titulo: "Otimizado para SEO",
      descricao: "Estrutura técnica otimizada para ranquear no Google",
      icone: "Search",
    },
    {
      id: "3",
      titulo: "Motor de Reservas Integrado",
      descricao: "Booking engine nativo com conversão otimizada",
      icone: "Calendar",
    },
    {
      id: "4",
      titulo: "Gerenciamento de Conteúdo",
      descricao: "CMS intuitivo para atualizar seu site sem conhecimento técnico",
      icone: "Edit",
    },
    {
      id: "5",
      titulo: "Galeria de Fotos",
      descricao: "Exiba seus ambientes com galerias profissionais e lightbox",
      icone: "Image",
    },
    {
      id: "6",
      titulo: "Blog Integrado",
      descricao: "Publique conteúdo para atrair mais visitantes orgânicos",
      icone: "FileText",
    },
  ],
  beneficios: [
    {
      id: "1",
      titulo: "Aumente suas Reservas Diretas",
      descricao: "Com um site otimizado para conversão, você reduz a dependência de OTAs e economiza comissões.",
      estatistica: "+45%",
      estatisticaLabel: "Aumento médio em reservas diretas",
    },
    {
      id: "2",
      titulo: "Melhore seu Posicionamento no Google",
      descricao: "Estrutura técnica SEO-friendly e conteúdo otimizado para ranquear nas primeiras posições.",
      estatistica: "Top 3",
      estatisticaLabel: "Posições alcançadas em 6 meses",
    },
    {
      id: "3",
      titulo: "Experiência do Usuário Superior",
      descricao: "Navegação intuitiva, carregamento rápido e processo de reserva simplificado.",
      estatistica: "2.5s",
      estatisticaLabel: "Tempo médio de carregamento",
    },
  ],
  passos: [
    {
      id: "1",
      numero: 1,
      titulo: "Escolha seu Template",
      descricao: "Selecione entre dezenas de templates profissionais exclusivos para hotéis",
    },
    {
      id: "2",
      numero: 2,
      titulo: "Personalize seu Conteúdo",
      descricao: "Adicione fotos, textos e informações do seu hotel de forma simples",
    },
    {
      id: "3",
      numero: 3,
      titulo: "Configure seu Motor de Reservas",
      descricao: "Integre quartos, tarifas e políticas de cancelamento",
    },
    {
      id: "4",
      numero: 4,
      titulo: "Lance seu Site",
      descricao: "Publique seu novo site e comece a receber reservas diretas",
    },
  ],
  depoimentos: [
    {
      id: "1",
      rating: 5,
      content: "Depois de lançar nosso novo site com a Foco, as reservas diretas aumentaram 60% em apenas 3 meses. O ROI foi impressionante.",
      author: "Ricardo Mendes",
      hotel: "Hotel Premium SP",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      id: "2",
      rating: 5,
      content: "O site ficou lindo e super fácil de gerenciar. Consigo atualizar fotos e pacotes sozinha, sem depender de desenvolvedor.",
      author: "Camila Santos",
      hotel: "Pousada do Lago",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      id: "3",
      rating: 5,
      content: "Finalmente temos um site que representa a qualidade do nosso hotel. A taxa de conversão melhorou muito.",
      author: "Bruno Costa",
      hotel: "Beach Hotel",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
  ],
  faq: [
    {
      id: "1",
      pergunta: "Preciso contratar hospedagem separada?",
      resposta: "Não, nosso plano já inclui hospedagem em servidores de alta performance com SSL gratuito e backups automáticos.",
    },
    {
      id: "2",
      pergunta: "Posso usar meu domínio próprio?",
      resposta: "Sim, você pode usar seu domínio existente ou adquirir um novo através da nossa plataforma.",
    },
    {
      id: "3",
      pergunta: "Os templates são responsivos?",
      resposta: "Sim, todos os nossos templates são 100% responsivos e se adaptam perfeitamente a qualquer dispositivo.",
    },
    {
      id: "4",
      pergunta: "Como funciona a integração com o motor de reservas?",
      resposta: "A integração é nativa e automática. Assim que você configura seus quartos e tarifas, o motor de reservas já aparece no site.",
    },
  ],
};

async function fetchSiteHoteleiroData(): Promise<SiteHoteleiroData> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return siteHoteleiroData;
}

export { fetchSiteHoteleiroData, siteHoteleiroData };
