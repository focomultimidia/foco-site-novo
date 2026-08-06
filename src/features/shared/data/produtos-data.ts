import {
  Globe,
  Calendar,
  LayoutGrid,
  Monitor,
  CreditCard,
  Smartphone,
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
   * Print mobile exibido no mockup de celular que flutua sobre o screenshot
   * desktop no StagePanel (ProdutosSection, viewMode="stack"). Opcional —
   * enquanto ausente, o mockup mostra um placeholder tracejado. Ignorado
   * quando `mockups` está presente (ver abaixo).
   */
  mobileScreenshot?: string;
  /**
   * Quando presente (3 itens), substitui TODO o palco desktop do StagePanel
   * (screenshot + mockup mobile único) por 3 mockups de celular lado a lado
   * — o mesmo tratamento visual da hero de /experiencia-do-hospede (central
   * nítido, laterais menores/desfocados). Usado quando o produto não tem
   * uma "tela desktop" de verdade (ex.: Experiência do Hóspede, 100% app).
   */
  mockups?: readonly { src: string; alt: string }[];
  bkgImagem?:  string; // optional hero/lifestyle image used as accordion background
  accent:      string;
  overlay:     string;
}

// ── Data — single source of truth ─────────────────────────────────────────────

export const PRODUTOS_DATA: ProdutoItem[] = [
  {
    id: "1", numero: "01",
    titulo: "Channel Manager: Venda mais, em mais lugares, sem esforço",
    descricao: "Coloque o seu hotel na vitrine do turismo mundial. Alcance milhões de viajantes conectando-se instantaneamente a mais de 850 canais de vendas (Booking, Airbnb, Expedia e muito mais), com sincronização automática em tempo real de tarifas e disponibilidade.",
    beneficios: ["+800 canais conectados", "Reduz overbooking", "Certificação Premier Booking"],
    link: "/channel-manager",
    ctaLabel: "Quero vender em +800 canais",
    Icone: Globe,
    imagem: "/assets/imgs/produtos/channel-manager.png",
    screenshot: "/assets/imgs/produtos/channel-manager.png",
    bkgImagem: "/assets/imgs/channel-manager/bkg-accordion.webp",
    accent: "#60a5fa",
    overlay: "from-blue-950/85 to-blue-900/25",
  },
  {
    id: "2", numero: "02",
    titulo: "Motor de Reservas: Retenha 100% do lucro das suas diárias",
    descricao: "Chega de dividir seu faturamento com as OTAs. Nosso motor de reservas entrega uma jornada de compra fluida e sem atritos, projetada para maximizar a conversão de visitantes em hóspedes e garantir a independência financeira do seu hotel.",
    beneficios: ["Aumenta reservas diretas", "Independência das OTAs", "Tarifas dinâmicas"],
    link: "/motor-de-reservas",
    ctaLabel: "Quero reservas 100% sem comissão",
    Icone: Calendar,
    imagem: "/assets/imgs/produtos/motor-de-reservas.jpg",
    screenshot: "/assets/imgs/produtos/motor-de-reservas.jpg",
    bkgImagem: "/assets/imgs/motor-de-reservas/bkg-accordion.webp",
    accent: "#34d399",
    overlay: "from-emerald-950/85 to-emerald-900/25",
  },
  {
    id: "3", numero: "03",
    titulo: "PMS e Integrações: Centralize sua operação com integração nativa",
    descricao: "Diga adeus ao retrabalho e às falhas operacionais. Os principais sistemas de gestão hoteleira do mercado integrados ao melhor motor de reservas e gestor de canais do Brasil.",
    beneficios: ["Gestão completa do hotel", "Otimização da governança", "Eliminação de Overbooking"],
    link: "/gestao-hoteleira",
    ctaLabel: "Automatizar minha operação agora",
    Icone: LayoutGrid,
    imagem: "/assets/imgs/produtos/mapa.png",
    screenshot: "/assets/imgs/produtos/mapa.png",
    bkgImagem: "/assets/imgs/gestao-hoteleira-pms/bkg-accordion.webp",
    accent: "#a78bfa",
    overlay: "from-violet-950/85 to-violet-900/25",
  },
  {
    id: "4", numero: "04",
    titulo: "Site Hoteleiro: Seu melhor canal de vendas começa no seu site",
    descricao: "Não tenha apenas um cartão de visitas na internet, tenha uma plataforma de alta conversão. Nossos sites são desenhados para capturar viajantes, transmitir autoridade e guiá-los direto para a reserva direta, eliminando taxas de terceiros.",
    beneficios: ["Motor de reservas integrado", "Personalização completa", "SEO 100%"],
    link: "/site-hoteleiro",
    ctaLabel: "Quero um site que vende de verdade",
    Icone: Monitor,
    imagem: "/assets/imgs/produtos/site-hoteleiro.jpg",
    screenshot: "/assets/imgs/produtos/site-hoteleiro.jpg",
    bkgImagem: "/assets/imgs/site-hoteleiro/bkg-accordion.webp",
    accent: "#fbbf24",
    overlay: "from-amber-950/85 to-amber-900/25",
  },
  {
    id: "5", numero: "05",
    titulo: "Software de Pagamentos: Segurança e automatização do seu fluxo de caixa",
    descricao: "Elimine calotes e perdas financeiras automatizando os débitos das suas reservas. Ofereça múltiplos meios de pagamento com certificação PCI e conformidade com a LGPD, garantindo recebimentos pontuais e zero dor de cabeça.",
    beneficios: ["Pagamento seguro", "Conexão com multi adquirentes", "Sem custo por reserva"],
    link: "/software-de-pagamentos",
    ctaLabel: "Automatizar cobranças e zerar calotes",
    Icone: CreditCard,
    imagem: "/assets/imgs/produtos/focopay.png",
    screenshot: "/assets/imgs/produtos/focopay.png",
    bkgImagem: "/assets/imgs/software-de-pagamento/bkg-accordion.webp",
    accent: "#22d3ee",
    overlay: "from-cyan-950/85 to-cyan-900/25",
  },
  {
    id: "6", numero: "06",
    titulo: "Experiência do Hóspede: FocoPass - O concierge digital que fideliza e gera receita",
    descricao: "Leve a estada do seu hóspede para a era digital. Dê total autonomia ao cliente através de um app intuitivo enquanto economiza o tempo da sua equipe de recepção e acumula avaliações 5 estrelas na internet.",
    beneficios: ["Gestão de avaliações", "Check-in online", "Cardápio digital do hotel"],
    link: "/experiencia-do-hospede",
    ctaLabel: "Oferecer o concierge digital",
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
      { src: "/assets/imgs/experiencia-do-hospede/app-hospede1.webp", alt: "App do hóspede — atrações do hotel" },
      { src: "/assets/imgs/experiencia-do-hospede/cardapio-digital1.webp", alt: "Cardápio digital — detalhe do item" },
    ],
    bkgImagem: "/assets/imgs/experiencia-do-hospede/bkg-accordion.webp",
    accent: "#fb7185",
    overlay: "from-rose-950/85 to-rose-900/25",
  },
];
