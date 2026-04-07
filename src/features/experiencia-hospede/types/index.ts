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

export interface EtapaJornada {
  id: string;
  icone: string;
  titulo: string;
  descricao: string;
}

export interface ExperienciaHospedeData {
  hero: HeroData;
  recursos: Recurso[];
  beneficios: Beneficio[];
  jornada: EtapaJornada[];
}
