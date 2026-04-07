export interface HeroData {
  titulo: string;
  subtitulo: string;
  cta: string;
  stats: {
    clientes: string;
    transacoes: string;
    experiencia: string;
    aprovacao: string;
    hoteleiros: string;
  };
}

export interface Produto {
  id: string;
  numero: string;
  titulo: string;
  descricao: string;
  beneficios: string[];
  link: string;
}

export interface ArtigoMidia {
  id: string;
  publicacao: string;
  data: string;
  titulo: string;
  descricao: string;
  link: string;
}

export interface DorSolucao {
  id: string;
  titulo: string;
  descricao: string;
  solucoes: {
    titulo: string;
    descricao: string;
    link?: string;
  }[];
}

export interface Evento {
  id: string;
  tag: string;
  data: string;
  local: string;
  titulo: string;
  descricao: string;
  link: string;
}

export interface CategoriaIntegracao {
  id: string;
  nome: string;
  descricao: string;
}

export interface Depoimento {
  id: string;
  texto: string;
  autor: string;
  cargo: string;
  avatar: string;
}

export interface Diferencial {
  id: string;
  icone: string;
  titulo: string;
  descricao: string;
}

export interface Case {
  id: string;
  tipo: string;
  titulo: string;
  imagem: string;
}

export interface Certificacao {
  id: string;
  icone: string;
  titulo: string;
  descricao: string;
}

export interface TipoPropriedade {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
}

export interface Numero {
  id: string;
  valor: string;
  sufixo: string;
  label: string;
}

export interface FAQItem {
  id: string;
  pergunta: string;
  resposta: string;
}

export interface HomeData {
  hero: HeroData;
  produtos: Produto[];
  artigosMidia: ArtigoMidia[];
  dores: DorSolucao[];
  eventos: Evento[];
  categoriasIntegracao: CategoriaIntegracao[];
  depoimentos: Depoimento[];
  diferenciais: Diferencial[];
  cases: Case[];
  certificacoes: Certificacao[];
  tiposPropriedade: TipoPropriedade[];
  numeros: Numero[];
  faq: FAQItem[];
}
