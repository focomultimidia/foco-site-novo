import type { ComponentType } from "react";
import type { Author } from "../../../content/authors";
import type { Category } from "../../../content/categories";

// ── TocItem ───────────────────────────────────────────────────────────────────
// Mesmo shape de `tocSections` em
// politica-de-privacidade/data/toc-sections.ts — gerado automaticamente por
// scripts/remark-heading-tree.mjs a partir dos headings do MDX, não escrito
// à mão.
export interface TocItem {
  id: string;
  numero: string;
  titulo: string;
  nivel: 2 | 3;
}

// ── Frontmatter cru ───────────────────────────────────────────────────────────
// Exatamente o que cada .mdx declara no bloco YAML — sem nenhum campo
// resolvido (autor/categoria ainda são só o `id`/`slug` em string).
export interface PostFrontmatter {
  title: string;
  seoTitle: string;
  excerpt: string;
  date: string;
  updatedAt: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  ctaProduct: string;
}

// ── BlogPost ──────────────────────────────────────────────────────────────────
// Frontmatter + campos resolvidos (autor e categoria como objeto completo,
// não só o id) + o que vem do módulo MDX compilado. `posts-index.ts` é o
// ÚNICO lugar que monta esse tipo — todo o resto do feature consome
// `BlogPost` já pronto, nunca o .mdx bruto.
export interface BlogPost extends Omit<PostFrontmatter, "author" | "category"> {
  slug: string;
  author: Author;
  category: Category;
  toc: TocItem[];
  readingTimeMin: number;
  Component: ComponentType<Record<string, unknown>>;
}
