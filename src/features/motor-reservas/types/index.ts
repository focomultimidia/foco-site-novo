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
}

export interface FAQItem {
  id: string;
  pergunta: string;
  resposta: string;
}

export interface MotorReservasData {
  hero: HeroData;
  recursos: Recurso[];
  beneficios: Beneficio[];
  faq: FAQItem[];
}
