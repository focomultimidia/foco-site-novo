import type { ArtigoMidia, Evento, Depoimento, Numero, VideoDepoimento } from "@/features/home/types";

const artigosMidia: ArtigoMidia[] = [
  {
    id: "1",
    publicacao: "Valor Econômico",
    data: "Setembro 2025",
    titulo: "Inovação digital movimenta a hotelaria na Equipotel 2025",
    descricao:
      "A Foco Tecnologia apresenta na Equipotel 2025 a plataforma ROOMS, com destaque para o Pacote de Experiência do Hóspede. As soluções integram ferramentas de operação, vendas e atendimento, incluindo o app Foco Pass, motor de reservas e sistema de pagamentos Foco Pay.",
    link: "https://valor.globo.com/patrocinado/dino/noticia/2025/09/15/inovacao-digital-movimenta-a-hotelaria-na-equipotel-2025-1.ghtml",
  },
  {
    id: "2",
    publicacao: "Terra",
    data: "Setembro 2025",
    titulo: "Integração com OTAs cresce entre meios de hospedagem em 2025",
    descricao:
      "A adoção de tecnologias integradas com plataformas de distribuição online (OTAs), como Booking.com e Expedia, segue em expansão entre meios de hospedagem brasileiros. A tendência reflete o movimento de digitalização e automação operacional no setor.",
    link: "https://www.terra.com.br/noticias/inovacao-digital-movimenta-a-hotelaria-na-equipotel-2025,a19480e5941b3cda21c2e7c409b7292701at25gs.html",
  },
  {
    id: "3",
    publicacao: "Revista Hotéis",
    data: "Julho 2024",
    titulo: "Encatho tem palestra sobre como aumentar as vendas dos hotéis",
    descricao:
      "A palestra ministrada pelos especialistas Leonardo Silveira, Vinicius Pavei e Alex-Sandro de Souza que apresentaram estratégias para automatizar tarefas visando melhorar o desempenho do negócio e proporcionar uma experiência mais personalizada aos hóspedes.",
    link: "https://revistahoteis.com.br/encatho-tem-palestra-sobre-como-aumentar-as-vendas-dos-hoteis/",
  },
];

const eventos: Evento[] = [
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
    titulo: "Foco conectando inovação e gestão no encontro da hotelaria do Sul",
    descricao:
      "Estivemos presentes com nossas soluções integradas para reservas, gestão operacional e melhoria da experiência do hóspede, em um dos eventos mais estratégicos do setor.",
    link: "#",
  },
  {
    id: "3",
    tag: "",
    data: "Novembro 2025",
    local: "São Paulo, SP",
    titulo: "CRM da Foco em destaque na principal feira da hotelaria nacional",
    descricao:
      "Na Expotel, lançamos nosso CRM hoteleiro com notificações via WhatsApp, otimizando o relacionamento com hóspedes e impulsionando vendas diretas.",
    link: "#",
  },
];

const depoimentos: Depoimento[] = [
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
];

const numeros: Numero[] = [
  { id: "1", valor: "20", sufixo: "", label: "anos de mercado" },
  { id: "2", valor: "2800", sufixo: "", label: "clientes ativos" },
  { id: "3", valor: "120", sufixo: "", label: "colaboradores" },
  { id: "4", valor: "5", sufixo: " bi", label: "transações/ano" },
  { id: "5", valor: "850", sufixo: "", label: "integrações disponíveis" },
  { id: "6", valor: "365", sufixo: " dias", label: "suporte disponível" },
];

const videosData: VideoDepoimento[] = [
  {
    id: "1",
    title: "Do controle manual à gestão organizada e eficiente",
    thumbnailUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
    youtubeId: "C7Sjudrjo7I",
    author: "Sítio do Galdino - Fernando Galdino",
    hotel: "São Paulo - SP",
  },
  {
    id: "2",
    title: " Uma gestão mais simples, ágil e funcional no dia a dia",
    thumbnailUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop",
    youtubeId: "iL1KaWNuic8",
    author: "Pousada Ville Solare - Pollyana Oliveira / João Luiz",
    hotel: "Santo Amaro do Maranhão - MA",
  },
  {
    id: "3",
    title: "Operação simplificada com controle total da gestão",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "pGOg3OQ2-Cg",
    author: "Pousada Kainoa - Pedro Andrés",
    hotel: "Arraial do Cabo - RJ",
  },
  {
    id: "4",
    title: "Mais organização e tranquilidade na rotina da gestão",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "5StVWHmoMl0",
    author: "Casa d'Aroeira Juquehy - Ariadne",
    hotel: "São Sebastião (Praia de Juquehy) - SP",
  },
  {
    id: "5",
    title: "Gestão eficiente como base para crescimento sustentável",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "P7ieSjO-3wg",
    author: "Hotel Giordano Mantiqueira - Fábio Giordano",
    hotel: "São João da Boa Vista - SP",
  },
  {
    id: "6",
    title: "Tecnologia integrada à operação, gerando mais produtividade",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "i0hhaqUeW50",
    author: "Pousada Bela Rainha - William Francisco",
    hotel: "Aparecida - SP",
  },
  {
    id: "7",
    title: "Mais controle operacional e menos falhas no dia a dia",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "wv-FDpwqjIY",
    author: "Pousada Concha de Paraty - Katia",
    hotel: " Paraty - RJ",
  },
  {
    id: "8",
    title: "Padronização da gestão em múltiplas unidades",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "SW7uleER7OQ",
    author: "Rede Hotéis Rota do Sol - Fernado",
    hotel: "Guaratuba - PR",
  },
  {
    id: "9",
    title: "Gestão estruturada com impacto direto na operação",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "umdPf_FLUXI",
    author: "Pousada Moça Bonita - Miguel",
    hotel: "Ubatuba - SP",
  },
  {
    id: "10",
    title: "Organização interna que eleva a qualidade do atendimento",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "T7xQZgWC9wg",
    author: "Hotéis Piratininga - Raniele",
    hotel: "Niterói - RJ",
  },
  {
    id: "11",
    title: "Operação mais leve, organizada e eficiente",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "31a7JYUAoAk",
    author: "Pousada Morada Dusanjos - Daniele",
    hotel: "Caraguatatuba - SP",
  },
  {
    id: "12",
    title: "Aumento de ocupação aliado ao controle da gestão",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "3A1o5YAwTkY",
    author: "Pousada do Nica - Nicanor & Micarla",
    hotel: "Fernando de Noronha - PE",
  },
  {
    id: "13",
    title: "Controle total da operação com gestão simplificada",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "nY_k0uthTo4",
    author: "Pousada Pé da Serra - Mário",
    hotel: "Lindóia - SP",
  },
];

export { artigosMidia, eventos, depoimentos, numeros, videosData };
