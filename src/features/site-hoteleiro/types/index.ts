export interface HeroData {
  titulo: string;
  subtitulo: string;
  descricao: string;
  ctaPrimario: string;
  ctaSecundario: string;
  imagemUrl: string;
}

export interface Recurso {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
}

export interface Beneficio {
  id: string;
  titulo: string;
  descricao: string;
  estatistica: string;
  estatisticaLabel: string;
}

export interface Passo {
  id: string;
  numero: number;
  titulo: string;
  descricao: string;
}

export interface Depoimento {
  id: string;
  rating: number;
  content: string;
  author: string;
  hotel: string;
  imageUrl?: string;
}

export interface FAQItem {
  id: string;
  pergunta: string;
  resposta: string;
}

export interface SiteHoteleiroData {
  hero: HeroData;
  recursos: Recurso[];
  beneficios: Beneficio[];
  passos: Passo[];
  depoimentos: Depoimento[];
  faq: FAQItem[];
}
