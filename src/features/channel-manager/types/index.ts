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

export interface CanalIntegracao {
  id: string;
  nome: string;
  logoUrl: string;
  categoria: "ota" | "meta" | "direto";
}

export interface ChannelManagerData {
  hero: HeroData;
  recursos: Recurso[];
  beneficios: Beneficio[];
  canais: CanalIntegracao[];
}
