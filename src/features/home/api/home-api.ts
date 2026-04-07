import type { HomeData } from "../types";

const homeData: HomeData = {
  hero: {
    titulo: "Sistema completo para hotelaria",
    subtitulo:
      "10 sistemas hoteleiros integrados em um único software para hotéis e pousadas!",
    cta: "Demonstração grátis",
    stats: {
      clientes: "2,000",
      transacoes: "1",
      experiencia: "18",
      aprovacao: "97%",
      hoteleiros: "2.5k",
    },
  },
  produtos: [
    {
      id: "1",
      numero: "01",
      titulo: "Channel Manager",
      descricao:
        "Amplie a distribuição do seu hotel ou pousada para mais de 800 canais de reservas online.",
      beneficios: [
        "800+ canais conectados",
        "Reduz overbooking",
        "Certificação Premier Booking",
      ],
      link: "/channel-manager",
    },
    {
      id: "2",
      numero: "02",
      titulo: "Motor de reservas",
      descricao:
        "Simplifique a reserva do seu cliente com um motor de reservas rápido, simples, seguro e fique livre de comissões.",
      beneficios: [
        "Aumenta reservas diretas",
        "Independência das OTAs",
        "Tarifas dinâmicas",
      ],
      link: "/motor-de-reservas",
    },
    {
      id: "3",
      numero: "03",
      titulo: "PMS e integrações",
      descricao:
        "Os principais sistemas de gestão hoteleira do mercado integrados ao melhor motor de reservas e gestor de canais do Brasil.",
      beneficios: [
        "Gestão completa do hotel",
        "Otimização da governança",
        "Eliminação de Overbooking",
      ],
      link: "/gestao-hoteleira",
    },
    {
      id: "4",
      numero: "04",
      titulo: "Site Hoteleiro",
      descricao:
        "Aumente suas reservas diretas e elimine comissões, transformando seu site no seu canal de vendas mais rentável.",
      beneficios: [
        "Integrado com motor de reservas",
        "Personalização completa",
        "SEO 100%",
      ],
      link: "/site-hoteleiro",
    },
    {
      id: "5",
      numero: "05",
      titulo: "Software de pagamentos",
      descricao:
        "A ferramenta essencial para dar ao hoteleiro a segurança financeira e precisão na gestão de reservas.",
      beneficios: [
        "Pagamento seguro",
        "Conexão com multi adquirentes",
        "Sem custo por reserva",
      ],
      link: "/software-de-pagamentos",
    },
    {
      id: "6",
      numero: "06",
      titulo: "CRM hoteleiro",
      descricao:
        "Centralize dados e interações dos hóspedes para personalizar o atendimento, fidelizar clientes e otimizar marketing e vendas.",
      beneficios: [
        "Comunicação por e-mail e WhatsApp",
        "Gerador de leads no site",
        "Disparo de campanhas automáticas",
      ],
      link: "/crm-hoteleiro",
    },
    {
      id: "7",
      numero: "07",
      titulo: "Experiência do hóspede",
      descricao:
        "Surpreenda seu hóspede com um aplicativo de hotel repleto de recursos e descontos em atrações no seu destino!",
      beneficios: [
        "Gestão de avaliações",
        "Check-in online dos hóspedes",
        "Cardápio digital do hotel",
      ],
      link: "/experiencia-do-hospede",
    },
    {
      id: "8",
      numero: "08",
      titulo: "Integrações Hoteleiras",
      descricao:
        "Promova seu hotel ou pousada na internet e garanta mais reservas com as melhores estratégias de marketing digital hoteleiro.",
      beneficios: [
        "Aumente a presença digital",
        "Inspire hóspedes com conteúdos",
        "Transforme seguidores em hóspedes",
      ],
      link: "/integracoes-hoteleiras",
    },
  ],
  artigosMidia: [
    {
      id: "1",
      publicacao: "Revista Hotelaria",
      data: "Março 2025",
      titulo: "Inovação digital movimenta a hotelaria na Equipotel 2025",
      descricao:
        "A Foco Tecnologia apresenta na Equipotel 2025 a plataforma ROOMS, com destaque para o Pacote de Experiência do Hóspede. As soluções integram ferramentas de operação, vendas e atendimento, incluindo o app Foco Pass, motor de reservas e sistema de pagamentos Foco Pay.",
      link: "#",
    },
    {
      id: "2",
      publicacao: "Tech Hotel",
      data: "Fevereiro 2025",
      titulo:
        "Integração com OTAs cresce entre meios de hospedagem em 2025",
      descricao:
        "A adoção de tecnologias integradas com plataformas de distribuição online (OTAs), como Booking.com e Expedia, segue em expansão entre meios de hospedagem brasileiros. A tendência reflete o movimento de digitalização e automação operacional no setor.",
      link: "#",
    },
    {
      id: "3",
      publicacao: "Hospitality News",
      data: "Janeiro 2025",
      titulo: "Foco Tecnologia conquista certificação Premier da Booking.com",
      descricao:
        "Pelo segundo ano consecutivo, a Foco Tecnologia é reconhecida com a certificação de excelência Premier da Booking.com, consolidando sua posição como referência em tecnologia hoteleira no Brasil.",
      link: "#",
    },
  ],
  dores: [
    {
      id: "baixa-ocupacao",
      titulo: "Seu hotel está com baixa ocupação e poucas reservas?",
      descricao:
        "Descubra como atrair mais hóspedes, aumentar a taxa de ocupação e impulsionar sua lucratividade de forma eficiente.",
      solucoes: [
        {
          titulo: "Mais canais, mais reservas",
          descricao:
            "Conecte-se a +800 canais de vendas com o nosso Channel Manager, garantindo mais visibilidade e menos overbooking.",
          link: "/channel-manager",
        },
        {
          titulo: "Site que vende para você",
          descricao:
            "Com um Site Hoteleiro otimizado para transformar acessos em hóspedes, reduzindo custos com comissões.",
          link: "/site-hoteleiro",
        },
        {
          titulo: "Atrair visitantes qualificados",
          descricao:
            "Tenha uma estratégia de Marketing Digital eficiente com anúncios no Google Hotel e Meta ADS.",
          link: "#",
        },
        {
          titulo: "Gatilhos para mais reservas",
          descricao:
            "Nosso Motor de Reservas utiliza gatilhos estratégicos e promoções personalizadas para aumentar a conversão.",
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
        },
        {
          titulo: "Problemas com pagamentos?",
          descricao:
            "O Foco Pay garante transações seguras, rápidas e em conformidade com a LGPD, melhorando seu fluxo de caixa.",
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
      titulo: "Experiência do hóspede ruim? Isso significa menos reservas!",
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
  ],
  eventos: [
    {
      id: "1",
      tag: "Destaque",
      data: "Setembro 2025",
      local: "São Paulo, SP",
      titulo: "Ecossistema completo da Foco em destaque na Equipotel 2025",
      descricao:
        "Apresentamos nossa plataforma integrada com site, motor de reservas, PMS, channel e CRM — unindo gestão e vendas em um só lugar.",
      link: "#",
    },
    {
      id: "2",
      tag: "",
      data: "Outubro 2025",
      local: "Gramado, RS",
      titulo:
        "Foco conectando inovação e gestão no encontro da hotelaria do Sul",
      descricao:
        "Estivemos presentes com nossas soluções integradas para reservas, gestão operacional e melhoria da experiência do hóspede, em um dos eventos mais estratégicos do setor.",
      link: "#",
    },
    {
      id: "3",
      tag: "",
      data: "Novembro 2025",
      local: "São Paulo, SP",
      titulo:
        "CRM da Foco em destaque na principal feira da hotelaria nacional",
      descricao:
        "Na Expotel, lançamos nosso CRM hoteleiro com notificações via WhatsApp, otimizando o relacionamento com hóspedes e impulsionando vendas diretas.",
      link: "#",
    },
  ],
  categoriasIntegracao: [
    {
      id: "canais",
      nome: "Canais",
      descricao:
        "Conecte-se a +800 canais de vendas com o nosso Channel Manager, garantindo mais visibilidade e menos overbooking.",
    },
    {
      id: "pms",
      nome: "PMS's",
      descricao:
        "Integramos com os principais sistemas de gestão hoteleira do mercado.",
    },
    {
      id: "pagamentos",
      nome: "Meios de pagamento",
      descricao:
        "Múltiplas opções de pagamento integradas para maior conversão.",
    },
    {
      id: "marketing",
      nome: "Marketing",
      descricao:
        "Ferramentas de marketing digital para aumentar sua presença online.",
    },
  ],
  depoimentos: [
    {
      id: "1",
      texto:
        "Estou feliz e muito satisfeita com a Foco Multimídia. Somos uma pousada pequena e familiar e o Channel Manager simplificou muito o nosso trabalho. A empresa está disponível para atender às nossas dúvidas e problemas a qualquer dia e horário e, por esse motivo, além de ser muito grata por trabalhar com vocês, eu indico a Foco de olhos fechados.",
      autor: "Gabriela",
      cargo: "Pousada Michele",
      avatar: "G",
    },
    {
      id: "2",
      texto:
        "O Sistema Hoteleiro da Foco veio e solucionou vários problemas de gerenciamento que nós tínhamos em nossa pousada. O Channel Manager, gerenciamento dos canais das OTAs é fantástico! Outro ponto que eu destaco é o atendimento de todos os setores da empresa que estão sempre disponíveis para nos atender.",
      autor: "Stephan",
      cargo: "Rede KS Beach",
      avatar: "S",
    },
    {
      id: "3",
      texto:
        "Somos 9 unidades e desde que eu comecei a trabalhar com o sistema gerenciamento do Channel da Foco, eu tenho mais tempo para lidar com outras atividades, enquanto responsável pela parte comercial. Essa ferramenta é essencial para que eu consiga resolver qualquer demanda com agilidade e segurança.",
      autor: "Franklin",
      cargo: "Mariano Hotel",
      avatar: "F",
    },
    {
      id: "4",
      texto:
        "A Foco Tecnologia transformou completamente nossa operação hoteleira. A integração entre todos os sistemas nos economiza horas de trabalho todos os dias. O suporte é excepcional e sempre resolve nossos problemas rapidamente.",
      autor: "Vitor Vasconcelos",
      cargo: "Escarpas Eco Village",
      avatar: "V",
    },
  ],
  diferenciais: [
    {
      id: "1",
      icone: "Award",
      titulo: "Certificação Premier Booking",
      descricao:
        "Somos uma empresa 100% brasileira, com certificação de excelência Premier da Booking, pelo segundo ano consecutivo (2020 e 2021).",
    },
    {
      id: "2",
      icone: "Star",
      titulo: "Elite Partner 2025",
      descricao:
        "Fomos reconhecidos pelo Expedia Group como Elite Partner 2025 por atender a padrões excepcionais de desempenho, integração e suporte.",
    },
    {
      id: "3",
      icone: "Handshake",
      titulo: "Starter Partner Stone",
      descricao:
        "Nosso sistema está totalmente integrado à plataforma financeira da Stone. Possuímos o selo Starter Partner 2025.",
    },
    {
      id: "4",
      icone: "Shield",
      titulo: "Redundância e Backup",
      descricao:
        "Software hoteleiro com recursos de redundância, backup e segurança de todo o seu histórico de reservas e informações.",
    },
    {
      id: "5",
      icone: "Users",
      titulo: "2.500+ Hoteleiros Satisfeitos",
      descricao:
        "Mais de 2.500 hoteleiros satisfeitos com as nossas soluções no Brasil.",
    },
    {
      id: "6",
      icone: "Globe",
      titulo: "800+ Canais Conectados",
      descricao:
        "Mais de 800 canais de vendas conectados (Booking, Decolar, Expedia, Airbnb, E-HTL e muitos outros).",
    },
    {
      id: "7",
      icone: "Zap",
      titulo: "Menor Tempo de Interação",
      descricao:
        "Tecnologia com menor tempo de interação entre canais, motor de reservas e PMS. Reduzimos os riscos de overbooking.",
    },
    {
      id: "8",
      icone: "Lock",
      titulo: "PCI e SSL Certified",
      descricao:
        "Utilizamos os principais padrões de segurança e tecnologia para assegurar os dados dos seus hóspedes.",
    },
  ],
  cases: [
    {
      id: "1",
      tipo: "Case de Sucesso",
      titulo: "Transformação digital do Hotel Fazenda",
      imagem:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    },
    {
      id: "2",
      tipo: "Depoimento Real",
      titulo: "Como aumentamos as reservas diretas",
      imagem:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop",
    },
    {
      id: "3",
      tipo: "Case de Sucesso",
      titulo: "Integração completa com nosso PMS",
      imagem:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    },
    {
      id: "4",
      tipo: "Depoimento Real",
      titulo: "Redução de overbooking em 100%",
      imagem:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    },
    {
      id: "5",
      tipo: "Depoimento Real",
      titulo: "Suporte técnico diferenciado",
      imagem:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    },
    {
      id: "6",
      tipo: "Case de Sucesso",
      titulo: "Resultados em 30 dias de uso",
      imagem:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop",
    },
  ],
  certificacoes: [
    {
      id: "1",
      icone: "CreditCard",
      titulo: "PCI Compliance",
      descricao:
        "Certificação internacional para segurança de dados de cartão de crédito.",
    },
    {
      id: "2",
      icone: "Shield",
      titulo: "LGPD Compliance",
      descricao: "Total conformidade com a Lei Geral de Proteção de Dados.",
    },
    {
      id: "3",
      icone: "Lock",
      titulo: "SSL Security",
      descricao:
        "Criptografia de ponta a ponta para todas as transações.",
    },
    {
      id: "4",
      icone: "Database",
      titulo: "Data Encryption",
      descricao:
        "Seus dados protegidos com criptografia avançada 256-bit.",
    },
  ],
  tiposPropriedade: [
    {
      id: "1",
      nome: "Pousadas",
      descricao: "Gestão simplificada para pousadas de todos os tamanhos",
      icone: "Home",
    },
    {
      id: "2",
      nome: "Hotéis",
      descricao: "Soluções completas para hotéis urbanos e resorts",
      icone: "Building",
    },
    {
      id: "3",
      nome: "Chalés",
      descricao: "Controle total para chalés e cabanas",
      icone: "Mountain",
    },
    {
      id: "4",
      nome: "Hotéis Fazenda",
      descricao: "Sistema adaptado para hospedagem rural",
      icone: "TreePine",
    },
    {
      id: "5",
      nome: "Hostels",
      descricao: "Gerenciamento eficiente para albergues",
      icone: "Users",
    },
    {
      id: "6",
      nome: "Resorts",
      descricao: "Tecnologia de ponta para resorts all-inclusive",
      icone: "Umbrella",
    },
    {
      id: "7",
      nome: "Aluguel por temporada",
      descricao: "Ferramentas para proprietários de imóveis",
      icone: "Key",
    },
  ],
  numeros: [
    { id: "1", valor: "2.0", sufixo: "Bi", label: "Transações / ano" },
    { id: "2", valor: "2.5", sufixo: "Mi", label: "Clientes ativos" },
    { id: "3", valor: "20", sufixo: "Mi", label: "Reservas concluídas" },
    { id: "4", valor: "97", sufixo: "%", label: "Clientes satisfeitos" },
    { id: "5", valor: "800", sufixo: "+", label: "Integrações" },
    { id: "6", valor: "19", sufixo: "", label: "Anos de experiência" },
  ],
  faq: [
    {
      id: "1",
      pergunta:
        "Por que a Foco Tecnologia é indicada para pequenos e médios hoteleiros e aluguéis de temporada?",
      resposta:
        "A Foco Tecnologia é indicada para pequenos e médios hoteleiros e aluguéis de temporada porque oferecemos soluções específicas para este segmento, com ferramentas intuitivas e acessíveis que otimizam a gestão, aumentam a visibilidade online e melhoram a experiência dos hóspedes. Nosso sistema é escalável e se adapta ao crescimento do seu negócio.",
    },
    {
      id: "2",
      pergunta: "Quanto custa o combo de tecnologia hoteleira da Foco?",
      resposta:
        "O custo do combo de tecnologia hoteleira da Foco varia de acordo com o tamanho do seu estabelecimento e as funcionalidades necessárias. Oferecemos planos flexíveis que se adaptam ao seu orçamento, com opções a partir de planos mensais acessíveis. Entre em contato conosco para receber uma proposta personalizada.",
    },
    {
      id: "3",
      pergunta:
        "Posso personalizar o combo de tecnologia de acordo com as minhas necessidades?",
      resposta:
        "Sim, todos os nossos combos de tecnologia são personalizáveis. Entendemos que cada estabelecimento tem necessidades únicas, por isso permitimos que você escolha as funcionalidades que melhor atendem ao seu negócio. Você pode começar com o básico e adicionar módulos conforme sua necessidade.",
    },
    {
      id: "4",
      pergunta: "Como funciona a implantação das soluções da Foco Tecnologia?",
      resposta:
        "A implantação das nossas soluções segue um processo estruturado em etapas: análise inicial das necessidades, configuração personalizada do sistema, migração de dados (se necessário), treinamento da equipe e acompanhamento pós-implantação. Nossa equipe de suporte está sempre disponível para garantir uma transição suave.",
    },
    {
      id: "5",
      pergunta: "Os contratos dos sistemas hoteleiros possuem fidelidade?",
      resposta:
        "Nossos contratos são flexíveis e transparentes. Oferecemos opções com e sem período de fidelidade, permitindo que você escolha o modelo que melhor se adapta às suas necessidades. Acreditamos na qualidade do nosso serviço e não precisamos prender clientes com contratos longos.",
    },
  ],
};

async function fetchHomeData(): Promise<HomeData> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return homeData;
}

export { fetchHomeData };
