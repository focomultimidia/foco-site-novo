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

export interface Modulo {
  id: string;
  icone: string;
  titulo: string;
  descricao: string;
  recursos: string[];
}

export interface GestaoHoteleiraData {
  hero: HeroData;
  recursos: Recurso[];
  beneficios: Beneficio[];
  modulos: Modulo[];
}
