// ── Categorias do blog ───────────────────────────────────────────────────────
// Mantidas como no blog atual (blog.focomultimidia.com) por decisão do
// plano técnico — trocar depois é só editar este array, nenhum componente
// depende do valor exato dos slugs além de fazer o lookup por eles.
export interface Category {
  slug: string;
  nome: string;
  descricao: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "artigos",
    nome: "Artigos",
    descricao: "Conteúdo geral sobre o mercado hoteleiro — tendências, operação e boas práticas.",
  },
  {
    slug: "motor-de-reservas",
    nome: "Motor de Reservas",
    descricao: "Reserva direta, políticas de cancelamento, tarifas e distribuição sem depender de OTA.",
  },
  {
    slug: "tecnologia",
    nome: "Tecnologia",
    descricao: "Ferramentas e automações que mudam a forma de operar um hotel ou pousada.",
  },
  {
    slug: "solucoes",
    nome: "Soluções",
    descricao: "Como resolver, na prática, os problemas mais comuns da gestão hoteleira.",
  },
  {
    slug: "marketing",
    nome: "Marketing",
    descricao: "Estratégias comerciais e de posicionamento para atrair e fidelizar hóspedes.",
  },
  {
    slug: "descomplica",
    nome: "Descomplica",
    descricao: "Guias práticos que simplificam temas jurídicos, financeiros e de gestão da hotelaria.",
  },
  {
    slug: "life-style",
    nome: "Life Style",
    descricao: "Experiência do hóspede, amenidades e tendências de comportamento na hotelaria.",
  },
  {
    slug: "videos",
    nome: "Vídeos",
    descricao: "Vídeos e bastidores da Foco Tecnologia e do mercado hoteleiro.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
