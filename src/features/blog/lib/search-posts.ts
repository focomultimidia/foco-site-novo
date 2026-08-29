import type { BlogPost } from "../types";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, ""); // remove acento — "política" casa com "politica"
}

// Busca client-side, sem lib nova: o volume de posts de um blog B2B de
// nicho não justifica um índice de busca full-text à parte — um filtro por
// substring em título/resumo/tags já resolve, e roda inteiramente sobre o
// índice que já está carregado em memória (posts-index.ts). Extraído pra
// cá porque agora tem 2 chamadores: a página /blog/busca e o dropdown de
// busca ao vivo da barra fixa do blog (blog-search-bar.tsx) — mesma lógica,
// uma fonte só.
function searchPosts(query: string, posts: BlogPost[]): BlogPost[] {
  const q = normalize(query.trim());
  if (!q) return [];
  return posts.filter((p) => {
    const haystack = normalize(`${p.title} ${p.excerpt} ${p.tags.join(" ")}`);
    return haystack.includes(q);
  });
}

export { searchPosts, normalize };
