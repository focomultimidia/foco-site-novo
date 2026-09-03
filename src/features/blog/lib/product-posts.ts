import { getAllPosts } from "./posts-index";
import type { BlogPost } from "../types";

// ── getPostsForProduct ───────────────────────────────────────────────────────
// "Últimas do Blog" nas páginas de produto. Sem banco/CMS por trás (mesma
// arquitetura de related-posts.ts) — filtra o índice já carregado em
// memória por `ctaProduct`, o único campo do frontmatter pensado
// especificamente pra ligar um post a UMA página de produto (ver
// content/blog/*.mdx e o comentário em posts-index.ts).
//
// `category` (taxonomia editorial, 8 valores) e `tags` (livres, quase
// metade dos posts com `tags: []`, o resto sem padrão consistente — muita
// palavra genérica tipo "hotel"/"hotelaria" repetida) foram descartados
// como sinal: só uma categoria bate 1:1 com uma página de produto
// ("motor-de-reservas"), então pontuar por elas nas outras 9 páginas
// produziria matches tão arbitrários quanto não ter sinal nenhum.
//
// Hoje só 3 dos 10 produtos têm posts com `ctaProduct` correspondente
// (motor-de-reservas, sistema-de-gestao-hoteleira-pms,
// inteligencia-artificial-para-hoteis-e-pousadas) — nas outras páginas o
// preenchimento cai inteiro no fallback abaixo. Não é um bug: à medida que
// novos posts forem publicados com o `ctaProduct` certo, essas páginas
// passam a puxar conteúdo dedicado sem precisar tocar em código nenhum.
export function getPostsForProduct(productSlug: string, limit = 4): BlogPost[] {
  const all = getAllPosts(); // já vem ordenado do mais recente pro mais antigo

  const matched = all.filter((p) => p.ctaProduct === productSlug);
  if (matched.length >= limit) return matched.slice(0, limit);

  // Completa com os posts mais recentes que sobrarem — mesmo princípio de
  // "completar até 4" descrito ao usuário, só que sem pontuação por
  // categoria/tag (ver comentário acima).
  const matchedSlugs = new Set(matched.map((p) => p.slug));
  const fillers = all.filter((p) => !matchedSlugs.has(p.slug)).slice(0, limit - matched.length);

  return [...matched, ...fillers];
}

// ── getLatestPosts ────────────────────────────────────────────────────────────
// Home — sem produto específico, sempre os mais recentes de qualquer
// categoria (pedido explícito).
export function getLatestPosts(limit = 4): BlogPost[] {
  return getAllPosts().slice(0, limit);
}
