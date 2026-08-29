import type { BlogPost } from "../types";

// ── getRelatedPosts ───────────────────────────────────────────────────────────
// Sem banco/busca por trás (Opção B não tem backend) — pontuação simples
// sobre o índice já carregado em memória: mesma categoria pesa mais que uma
// tag em comum (categoria é uma escolha editorial deliberada; tag é mais
// solta), cada tag adicional soma um pouco mais, e o empate é resolvido por
// data — mais recente primeiro. Zero pontos = não relacionado, fica de fora.
const CATEGORY_WEIGHT = 3;
const TAG_WEIGHT = 1;

export function getRelatedPosts(post: BlogPost, allPosts: BlogPost[], limit = 3): BlogPost[] {
  return allPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      const sameCategory = p.category.slug === post.category.slug ? CATEGORY_WEIGHT : 0;
      const sharedTags = p.tags.filter((t) => post.tags.includes(t)).length * TAG_WEIGHT;
      return { post: p, score: sameCategory + sharedTags };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map((entry) => entry.post);
}
