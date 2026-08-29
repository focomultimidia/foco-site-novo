import { lazy } from "react";
import { AUTHORS, getAuthor } from "../../../../content/authors";
import { CATEGORIES, getCategory } from "../../../../content/categories";
import generatedIndex from "./_generated-index.json";
import type { BlogPost, PostFrontmatter, TocItem } from "../types";

// ── Índice de posts em build-time ────────────────────────────────────────────
// O metadado (frontmatter/toc/readingTimeMin) vem de um JSON estático —
// scripts/generate-blog-index.mjs já gerou isso ANTES do Vite/tsc rodar
// (ver "predev"/"prebuild" em package.json). Um `import.meta.glob({eager:
// true, import: "frontmatter"})` direto no .mdx PARECE equivalente, mas não
// é: pra resolver esse binding o Rollup ainda precisa carregar o módulo
// .mdx inteiro, o que compila o corpo do post junto — com os 146 posts
// reais migrados do blog antigo, isso juntava tudo (corpo incluso) num
// chunk só de 2.6MB, baixado em QUALQUER página do blog, até a listagem,
// que nunca renderiza corpo nenhum. Um JSON puro não tem esse problema:
// zero componente React grudado no metadado.
//
// O `.mdx` em si só entra no bundle via `componentLoaders` abaixo — sem
// `eager`, cada entrada vira `() => import(...)`, o shape exato que
// `React.lazy()` espera — um chunk por post, baixado só quando alguém abre
// aquele post específico, igual as 13 páginas do site já são
// lazy-carregadas em App.tsx.
const POSTS_METADATA = generatedIndex as {
  slug: string;
  frontmatter: PostFrontmatter;
  toc: TocItem[];
  readingTimeMin: number;
}[];

const componentLoaders = import.meta.glob("/content/blog/*.mdx") as Record<
  string,
  () => Promise<{ default: BlogPost["Component"] }>
>;

function componentLoaderFor(slug: string) {
  const entry = Object.entries(componentLoaders).find(([path]) => path.endsWith(`/${slug}.mdx`));
  if (!entry) throw new Error(`Post "${slug}": arquivo content/blog/${slug}.mdx não encontrado`);
  return entry[1];
}

const ALL_POSTS: BlogPost[] = POSTS_METADATA.map(({ slug, frontmatter, toc, readingTimeMin }) => {
  const author = getAuthor(frontmatter.author);
  const category = getCategory(frontmatter.category);

  if (!author) {
    throw new Error(`Post "${slug}": autor "${frontmatter.author}" não existe em content/authors.ts`);
  }
  if (!category) {
    throw new Error(`Post "${slug}": categoria "${frontmatter.category}" não existe em content/categories.ts`);
  }

  return {
    ...frontmatter,
    slug,
    author,
    category,
    toc,
    readingTimeMin,
    Component: lazy(componentLoaderFor(slug)),
  };
})
  // Mais recente primeiro — mesma ordenação que toda listagem do blog usa
  // por padrão, decidida uma vez aqui em vez de repetida em cada página.
  .sort((a, b) => b.date.localeCompare(a.date));

export function getAllPosts(): BlogPost[] {
  return ALL_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return ALL_POSTS.filter((p) => p.category.slug === categorySlug);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return ALL_POSTS.filter((p) => p.tags.includes(tag));
}

export function getPostsByAuthor(authorId: string): BlogPost[] {
  return ALL_POSTS.filter((p) => p.author.id === authorId);
}

// Só as tags que pelo menos um post usa — evita listar, num filtro ou numa
// nuvem de tags, uma tag "morta" que ninguém tem mais.
export function getAllTags(): string[] {
  const set = new Set<string>();
  ALL_POSTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return [...set].sort();
}

export { AUTHORS, CATEGORIES };
