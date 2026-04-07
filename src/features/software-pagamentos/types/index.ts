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
  icone: string;
  titulo: string;
  descricao: string;
}

export interface Beneficio {
  id: string;
  titulo: string;
  descricao: string;
}

export interface FormaPagamento {
  id: string;
  nome: string;
  icone: string;
  descricao: string;
}

export interface SoftwarePagamentosData {
  hero: HeroData;
  recursos: Recurso[];
  beneficios: Beneficio[];
  formasPagamento: FormaPagamento[];
}
