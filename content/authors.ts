// ── Autores do blog ──────────────────────────────────────────────────────────
// Mesmo padrão de dado local tipado já usado em
// src/features/shared/data/dores-data.ts — um arquivo, um array, sem
// depender de nenhum serviço externo. Cada post referencia um autor pelo
// `id` no frontmatter (`author: "nayara-rosa"`); `posts-index.ts` resolve
// esse id pro objeto completo.
export interface Author {
  id: string;
  nome: string;
  /** 2 letras pro avatar — mesmo padrão de iniciais-em-círculo já usado
      pelos depoimentos em wall-of-love-section.tsx quando não há foto real. */
  iniciais: string;
  cargo: string;
  /** Opcional — enquanto não existe uma foto real, `AuthorBio` cai pro
      avatar de iniciais em vez de um <img> quebrado. */
  foto?: string;
  bio: string;
}

export const AUTHORS: Author[] = [
  {
    id: "nayara-rosa",
    nome: "Nayara Rosa",
    iniciais: "NR",
    cargo: "Conteúdo · Foco Tecnologia",
    bio: "Escreve sobre gestão, marketing e tecnologia para hotelaria, com foco em conteúdo que o hoteleiro consegue aplicar na operação no mesmo dia.",
  },
  {
    id: "anny-louise-santana-almeida",
    nome: "Anny Louise",
    iniciais: "AL",
    cargo: "Conteúdo · Foco Tecnologia",
    bio: "Escreve conteúdo sobre gestão e tecnologia para o mercado hoteleiro.",
  },
  {
    id: "fabiana-guia",
    nome: "Fabiana Guia",
    iniciais: "FG",
    cargo: "Conteúdo · Foco Tecnologia",
    bio: "Escreve conteúdo sobre gestão e tecnologia para o mercado hoteleiro.",
  },
  {
    id: "fernanda-mattos",
    nome: "Fernanda Mattos",
    iniciais: "FM",
    cargo: "Marketing · Foco Tecnologia",
    bio: "Jornalista, marketeira e mãe. Especialista em transformar hotéis em marcas memoráveis através da comunicação.",
  },
  // Duas contas WP diferentes ("focomult_user" e "foco") com o mesmo nome de
  // exibição "Foco Multimídia" — consolidadas num autor só na migração
  // (scripts/migrate-wp-posts.mjs) pra não duplicar a página de autor.
  {
    id: "foco-multimidia",
    nome: "Foco Multimídia",
    iniciais: "FT",
    cargo: "Equipe · Foco Tecnologia",
    bio: "Conteúdo produzido pela equipe editorial da Foco Tecnologia e Marketing.",
  },
  {
    id: "leandro",
    nome: "Leandro Rodrigues",
    iniciais: "LR",
    cargo: "Conteúdo · Foco Tecnologia",
    bio: "Jornalista e produtor de conteúdo especializado em tecnologia hoteleira.",
  },
  {
    id: "leonardo",
    nome: "Leonardo Silveira",
    iniciais: "LS",
    cargo: "CEO · Foco Multimídia",
    bio: "CEO da Foco Multimídia.",
  },
  // Nome de exibição vem literalmente assim da conta de WordPress
  // ("Marketing", não um nome próprio) — mantido fiel à fonte original.
  {
    id: "thayna",
    nome: "Marketing",
    iniciais: "MK",
    cargo: "Conteúdo · Foco Tecnologia",
    bio: "Jornalista e produtora de conteúdo há 14 anos.",
  },
  {
    id: "thayse-malheiros",
    nome: "Thayse Malheiros",
    iniciais: "TM",
    cargo: "Conteúdo · Foco Tecnologia",
    bio: "Advogada e apaixonada pelo poder transformador da leitura e da escrita.",
  },
];

export function getAuthor(id: string): Author | undefined {
  return AUTHORS.find((a) => a.id === id);
}
