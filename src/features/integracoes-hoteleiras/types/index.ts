export interface HeroData {
  titulo: string;
  subtitulo: string;
  descricao: string;
  ctaPrimario: string;
  ctaSecundario: string;
  imagemUrl: string;
}

export interface Integracao {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  icone: string;
}

export interface Beneficio {
  id: string;
  titulo: string;
  descricao: string;
}

export interface Categoria {
  id: string;
  nome: string;
  icone: string;
}

export interface IntegracoesHoteleirasData {
  hero: HeroData;
  integracoes: Integracao[];
  beneficios: Beneficio[];
  categorias: Categoria[];
}
