import {
  Globe,
  Calendar,
  LayoutGrid,
  Monitor,
  CreditCard,
  Smartphone,
  Bot,
} from "lucide-react";
import type React from "react";

// ── Type ──────────────────────────────────────────────────────────────────────

export interface ProdutoItem {
  id:          string;
  numero:      string;
  titulo:      string;
  descricao:   string;
  beneficios:  string[];
  link:        string;
  ctaLabel:    string;
  Icone:       React.ComponentType<{ className?: string }>;
  imagem:      string;
  /**
   * Product UI screenshot shown in the home showcase.
   * Currently placeholder mockups in /assets/imgs/produtos — swap each path
   * for a real screen capture (same 16:10 framing) when available.
   */
  screenshot:  string;
  /**
   * Dimensões reais do arquivo de `screenshot` — usadas como atributos
   * `width`/`height` do `<img>` no fallback mobile (product-showcase.tsx /
   * software-products-carousel.tsx), que renderiza em `w-full` sem altura
   * fixa. Sem isso o navegador não reserva a altura correta antes da
   * imagem carregar (CLS), e é exatamente o que o PageSpeed Insights
   * reportou em "elementos de imagem não têm width/height explícitas".
   * Opcional porque produtos com `mockups` (Experiência do Hóspede, Otheo
   * AI) não passam por esse fallback.
   */
  screenshotWidth?:  number;
  screenshotHeight?: number;
  /**
   * Print mobile exibido no mockup de celular que flutua sobre o screenshot
   * desktop no StagePanel (ProdutosSection, viewMode="stack"). Opcional —
   * enquanto ausente, o mockup mostra um placeholder tracejado. Ignorado
   * quando `mockups` está presente (ver abaixo).
   */
  mobileScreenshot?: string;
  /**
   * Quando presente, substitui TODO o palco (desktop e mobile) pelo
   * tratamento de celulares empilhados/sobrepostos (moldura branca, escala e
   * opacidade menores nos de trás) em vez de screenshot + mockup mobile
   * único. 3 itens = trio (TriplePhoneStage/central em destaque, laterais
   * atrás — ex.: Experiência do Hóspede, Otheo AI). 2 itens = dupla
   * (DuoPhoneStage). `src` é opcional por item — sem ele, o celular mostra
   * o mesmo placeholder tracejado de `mobileScreenshot` (reserva o espaço
   * até a imagem real ser adicionada).
   */
  mockups?: readonly { src?: string; alt: string }[];
  bkgImagem?:  string; // optional hero/lifestyle image used as accordion background
  accent:      string;
  overlay:     string;
  /** Produto em fase Beta — mostra o selo "Beta" nas chamadas (cards, menu). */
  beta?:       boolean;
}

// ── Data — single source of truth ─────────────────────────────────────────────

export const PRODUTOS_DATA: ProdutoItem[] = [
  {
    id: "1", numero: "01",
    titulo: "Channel Manager: Venda mais, em mais lugares, sem esforço",
    descricao: "Coloque o seu hotel na vitrine do turismo mundial. Alcance milhões de viajantes conectando-se simultaneamente a mais de 800 canais de vendas (Booking, Airbnb, Expedia e muito mais), com sincronização automática em tempo real de tarifas e disponibilidade.",
    beneficios: ["Otas, operadoras e agências de viagens", "Disponibilidade real em todos os canais", "Proteção contra overbooking"],
    link: "/channel-manager",
    ctaLabel: "Quero vender em +800 canais",
    Icone: Globe,
    imagem: "/assets/imgs/produtos/channel-manager.webp",
    screenshot: "/assets/imgs/produtos/channel-manager.webp",
    screenshotWidth: 800, screenshotHeight: 600,
    mobileScreenshot: "/assets/imgs/home/produtos/mobile-channel-manager.webp",
    bkgImagem: "/assets/imgs/channel-manager/bkg-accordion.webp",
    accent: "#60a5fa",
    overlay: "from-blue-950/85 to-blue-900/25",
  },
  {
    id: "2", numero: "02",
    titulo: "Motor de Reservas: Retenha 100% do lucro das suas diárias",
    descricao: "Chega de dividir seu faturamento com as OTAs. Nosso motor de reservas entrega uma jornada de compra fluida e sem atritos, projetada para maximizar a conversão de visitantes em hóspedes e garantir a independência financeira do seu hotel. É o sistema de reservas online que garante venda direta 24 horas por dia, sem taxa por reserva.",
    beneficios: ["Aumenta reservas diretas", "Independência das OTAs", "Tarifas dinâmicas"],
    link: "/motor-de-reservas",
    ctaLabel: "Quero reservas 100% sem comissão",
    Icone: Calendar,
    imagem: "/assets/imgs/produtos/motor-de-reservas.webp",
    screenshot: "/assets/imgs/produtos/motor-de-reservas.webp",
    screenshotWidth: 815, screenshotHeight: 584,
    mobileScreenshot: "/assets/imgs/produtos/motor-mobile.webp",
    bkgImagem: "/assets/imgs/motor-de-reservas/bkg-accordion.webp",
    accent: "#34d399",
    overlay: "from-emerald-950/85 to-emerald-900/25",
  },
  {
    id: "3", numero: "03",
    titulo: "PMS - Gestão hoteleira: Centralize sua operação em um único sistema",
    descricao: "Diga adeus ao retrabalho e às falhas operacionais. Conheça o nosso PMS completo: o sistema de gestão hoteleira definitivo, com motor de reservas e gestor de canais 100% nativos e integrados. Controle seu hotel, pousada ou rede em um único painel na nuvem, sem planilhas, sem sistemas paralelos e sem complicações.",
    beneficios: ["Sistema anti-overbooking", "Gestão completa do hotel", "Gestão leve, rápida e 100% online"],
    link: "/gestao-hoteleira",
    ctaLabel: "Automatizar minha operação agora",
    Icone: LayoutGrid,
    imagem: "/assets/imgs/produtos/mapa.webp",
    screenshot: "/assets/imgs/produtos/mapa.webp",
    screenshotWidth: 815, screenshotHeight: 584,
    mobileScreenshot: "/assets/imgs/produtos/mobile-mapa-uh.webp",
    bkgImagem: "/assets/imgs/gestao-hoteleira-pms/bkg-accordion.webp",
    accent: "#a78bfa",
    overlay: "from-violet-950/85 to-violet-900/25",
  },
  {
    id: "4", numero: "04",
    titulo: "Site Hoteleiro: Seu melhor canal de vendas começa no seu site",
    descricao: "Não tenha apenas um cartão de visitas na internet, tenha uma plataforma de alta conversão. Nossos sites são desenhados para capturar viajantes, transmitir autoridade e guiá-los direto para a reserva direta, eliminando taxas de terceiros. Um site de reservas completo para hotel, pousada ou temporada, com motor de reservas nativo.",
    beneficios: ["Motor de reservas integrado", "Personalização completa", "Otimizado para Google e IA"],
    link: "/site-hoteleiro",
    ctaLabel: "Quero um site que vende de verdade",
    Icone: Monitor,
    imagem: "/assets/imgs/produtos/site-hoteleiro.webp",
    screenshot: "/assets/imgs/produtos/site-hoteleiro.webp",
    screenshotWidth: 815, screenshotHeight: 584,
    mobileScreenshot: "/assets/imgs/produtos/site-mobile.webp",
    bkgImagem: "/assets/imgs/site-hoteleiro/bkg-accordion.webp",
    accent: "#fbbf24",
    overlay: "from-amber-950/85 to-amber-900/25",
  },
  {
    id: "5", numero: "05",
    titulo: "Software de Pagamentos: Segurança e automatização do seu fluxo de caixa",
    descricao: "Ganhe tempo e proteja suas receitas automatizando a cobrança das suas reservas. Ofereça múltiplos meios de pagamento com certificação PCI e conformidade com a LGPD, reduzindo falhas manuais e garantindo um processo de recebimento mais ágil e seguro.",
    beneficios: ["Pagamento seguro", "Conexão com multi adquirentes", "Sem custo por reserva"],
    link: "/software-de-pagamentos",
    ctaLabel: "Automatizar cobranças com segurança",
    Icone: CreditCard,
    imagem: "/assets/imgs/produtos/focopay.webp",
    screenshot: "/assets/imgs/produtos/focopay.webp",
    screenshotWidth: 815, screenshotHeight: 584,
    mobileScreenshot: "/assets/imgs/produtos/mobile-focopay.png",
    bkgImagem: "/assets/imgs/software-de-pagamento/bkg-accordion.webp",
    accent: "#22d3ee",
    overlay: "from-cyan-950/85 to-cyan-900/25",
  },
  {
    id: "6", numero: "06",
    titulo: "Experiência do Hóspede: FocoPass - Aplicativo do hóspede",
    descricao: "Leve a estada do seu hóspede para a era digital. Dê total autonomia ao cliente através de um app intuitivo enquanto economiza o tempo da sua equipe de recepção e acumula avaliações 5 estrelas na internet. Da comunicação por WhatsApp ao check-in digital, cada etapa da jornada acontece sem fricção.",
    beneficios: ["Gestão de avaliações", "Check-in online integrado ao Ministério do Turismo", "Notificações via Whastapp"],
    link: "/experiencia-do-hospede",
    ctaLabel: "Garantir a experiência do hóspede",
    Icone: Smartphone,
    imagem: "/assets/imgs/produtos/foco-pass.webp",
    // `screenshot` só é usado como thumbnail no fallback mobile (abaixo de
    // lg, ver ScrollContentBlock) — no desktop o palco inteiro vira os 3
    // mockups abaixo (`mockups`), review pedida pelo usuário: nada de
    // screenshot único + 1 celular flutuando, igual à hero de
    // /experiencia-do-hospede (3 celulares, o do meio nítido). Não reaproveita
    // a estrutura de dados daquela hero, só os arquivos de imagem — e não
    // inclui a categoria "Motor de Reservas" da hero original porque os
    // arquivos dela (hero/reservas-*.webp) não existem no repo (confirmado);
    // troquei pela 3ª tela de cardápio digital, real e já usada em produção.
    screenshot: "/assets/imgs/experiencia-do-hospede/app-hospede1.webp",
    mockups: [
      { src: "/assets/imgs/experiencia-do-hospede/cardapio-digital.webp", alt: "Cardápio digital do hotel" },
      { src: "/assets/imgs/experiencia-do-hospede/app-hospede1.webp", alt: "App do hóspede: atrações do hotel" },
      { src: "/assets/imgs/experiencia-do-hospede/cardapio-digital1.webp", alt: "Cardápio digital: detalhe do item" },
    ],
    bkgImagem: "/assets/imgs/experiencia-do-hospede/bkg-accordion.webp",
    accent: "#fb7185",
    overlay: "from-rose-950/85 to-rose-900/25",
  },
  {
    id: "7", numero: "07",
    titulo: "Otheo AI: A inteligência que opera o seu hotel",
    descricao: "Abra vendas, altere tarifas, confira check-ins, consulte reservas, gerencie bloqueios e muito mais, com um comando de voz ou texto. O Otheo AI entende sua operação e executa por você.",
    beneficios: ["Aplicativo para facilitar sua operação", "Execução de tarefas em tempo real", "Gerencie sem acessar a extranet"],
    link: "/otheo-ai",
    ctaLabel: "Gerenciar minha operação com IA",
    Icone: Bot,
    imagem: "/assets/imgs/home/otheoai/chat-ia.webp",
    // Mesmo print real usado no mockup da hero de /otheo-ai e no
    // OtheoAiTeaserSection — não existe (ainda) um dashboard desktop do
    // Otheo AI, só a tela de chat (retrato). Os 3 componentes que
    // realmente renderizam isso hoje (StagePanel, ScrollContentBlock
    // mobile, SoftwareProductsCarousel) já lidam bem com uma imagem em pé
    // (contain/crop pelo topo), sem quebrar layout.
    screenshot: "/assets/imgs/home/otheoai/chat-ia.webp",
    // Mesma estrutura de mockups empilhados/sobrepostos da Experiência do
    // Hóspede (TriplePhoneStage: celular central em destaque, os 2 laterais
    // um pouco menores atrás). Ordem importa: primeiro item = celular
    // esquerdo (menor, atrás), segundo = central (grande, destaque),
    // terceiro = direito (menor, atrás) — ver TriplePhoneStage em
    // product-showcase.tsx.
    mockups: [
      { src: "/assets/imgs/home/otheoai/mockup1-otheoai.png", alt: "Histórico de conversas do Otheo AI, com perguntas e comandos anteriores" },
      { src: "/assets/imgs/home/otheoai/mockup2-otheoai.png", alt: "Tela inicial do Otheo AI, pronto para ajudar por voz ou texto" },
      { src: "/assets/imgs/home/otheoai/mockup3-otheoai.png", alt: "Otheo AI respondendo com os detalhes da reserva e voucher para reenvio" },
    ],
    // Sem `bkg-accordion.webp` próprio ainda — reaproveita uma foto
    // atmosférica já em uso no /otheo-ai (hero-uber, o hoteleiro
    // resolvendo por voz no carro) em vez de cair no fallback pro
    // screenshot de chat (que ficaria ruim esticado como plano de fundo).
    bkgImagem: "/assets/imgs/otheo-ai/hoteleiro-uber.webp",
    accent: "#fccc30",
    overlay: "from-yellow-950/85 to-yellow-900/25",
    beta: true,
  },
];
