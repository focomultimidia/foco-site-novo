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
  Icone:       React.ComponentType<{ className?: string }>;
  imagem:      string;
  /**
   * Product UI screenshot shown in the home showcase.
   * Currently placeholder mockups in /assets/imgs/produtos — swap each path
   * for a real screen capture (same 16:10 framing) when available.
   */
  screenshot:  string;
  bkgImagem?:  string; // optional hero/lifestyle image used as accordion background
  accent:      string;
  overlay:     string;
}

// ── Data — single source of truth ─────────────────────────────────────────────

export const PRODUTOS_DATA: ProdutoItem[] = [
  {
    id: "1", numero: "01",
    titulo: "Channel Manager",
    descricao: "Amplie a distribuição do seu hotel ou pousada para mais de 800 canais de reservas online e garanta sincronização em tempo real.",
    beneficios: ["800+ canais conectados", "Reduz overbooking", "Certificação Premier Booking"],
    link: "/channel-manager",
    Icone: Globe,
    imagem: "/assets/imgs/produtos/channel-manager.png",
    screenshot: "/assets/imgs/produtos/channel-manager.png",
    bkgImagem: "/assets/imgs/channel-manager/bkg-accordion.webp",
    accent: "#60a5fa",
    overlay: "from-blue-950/85 to-blue-900/25",
  },
  {
    id: "2", numero: "02",
    titulo: "Motor de Reservas",
    descricao: "Simplifique a reserva do seu cliente com um motor rápido, simples e seguro — fique livre de comissões de OTAs.",
    beneficios: ["Aumenta reservas diretas", "Independência das OTAs", "Tarifas dinâmicas"],
    link: "/motor-de-reservas",
    Icone: Calendar,
    imagem: "/assets/imgs/produtos/motor-de-reservas.webp",
    screenshot: "/assets/imgs/produtos/mock-motor-reservas.svg",
    bkgImagem: "/assets/imgs/motor-de-reservas/bkg-accordion.webp",
    accent: "#34d399",
    overlay: "from-emerald-950/85 to-emerald-900/25",
  },
  {
    id: "3", numero: "03",
    titulo: "PMS e Integrações",
    descricao: "Os principais sistemas de gestão hoteleira do mercado integrados ao melhor motor de reservas e gestor de canais do Brasil.",
    beneficios: ["Gestão completa do hotel", "Otimização da governança", "Eliminação de Overbooking"],
    link: "/gestao-hoteleira",
    Icone: LayoutGrid,
    imagem: "/assets/imgs/produtos/pms-integracoes.webp",
    screenshot: "/assets/imgs/produtos/mock-pms.svg",
    bkgImagem: "/assets/imgs/gestao-hoteleira-pms/bkg-accordion.webp",
    accent: "#a78bfa",
    overlay: "from-violet-950/85 to-violet-900/25",
  },
  {
    id: "4", numero: "04",
    titulo: "Site Hoteleiro",
    descricao: "Aumente suas reservas diretas e elimine comissões, transformando seu site no canal de vendas mais rentável do seu negócio.",
    beneficios: ["Motor de reservas integrado", "Personalização completa", "SEO 100%"],
    link: "/site-hoteleiro",
    Icone: Monitor,
    imagem: "/assets/imgs/produtos/site-hoteleiro.jpg",
    screenshot: "/assets/imgs/produtos/site-hoteleiro.jpg",
    bkgImagem: "/assets/imgs/site-hoteleiro/bkg-accordion.webp",
    accent: "#fbbf24",
    overlay: "from-amber-950/85 to-amber-900/25",
  },
  {
    id: "5", numero: "05",
    titulo: "Software de Pagamentos",
    descricao: "A ferramenta essencial para dar ao hoteleiro segurança financeira e precisão na gestão de reservas e recebimentos.",
    beneficios: ["Pagamento seguro", "Conexão com multi adquirentes", "Sem custo por reserva"],
    link: "/software-de-pagamentos",
    Icone: CreditCard,
    imagem: "/assets/imgs/produtos/software-de-pagamentos.webp",
    screenshot: "/assets/imgs/produtos/mock-pagamentos.svg",
    bkgImagem: "/assets/imgs/software-de-pagamento/bkg-accordion.webp",
    accent: "#22d3ee",
    overlay: "from-cyan-950/85 to-cyan-900/25",
  },
  {
    id: "6", numero: "06",
    titulo: "Experiência do Hóspede",
    descricao: "Surpreenda seu hóspede com um aplicativo de hotel repleto de recursos e descontos em atrações no destino.",
    beneficios: ["Gestão de avaliações", "Check-in online", "Cardápio digital do hotel"],
    link: "/experiencia-do-hospede",
    Icone: Smartphone,
    imagem: "/assets/imgs/produtos/foco-pass.webp",
    screenshot: "/assets/imgs/produtos/mock-experiencia-hospede.svg",
    bkgImagem: "/assets/imgs/experiencia-do-hospede/bkg-accordion.webp",
    accent: "#fb7185",
    overlay: "from-rose-950/85 to-rose-900/25",
  },
];
