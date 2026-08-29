/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Token público da API de Conversões do RD Station Marketing — ver
  // .env.example e src/features/shared/api/lead-capture-api.ts.
  readonly VITE_RD_STATION_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Cada post é compilado pelo @mdx-js/rollup (ver vite.config.ts) pra um
// módulo com 3 exports: o componente (default), o frontmatter (injetado
// por remark-mdx-frontmatter) e o sumário (injetado por
// scripts/remark-heading-tree.mjs). `frontmatter`/`toc` ficam como `any`
// aqui de propósito — o shape real e validado mora em
// src/features/blog/lib/posts-index.ts, que faz o cast pro tipo `BlogPost`
// num único lugar em vez de espalhar `any` pelo app inteiro.
declare module "*.mdx" {
  import type { ComponentType } from "react";
  export const frontmatter: any;
  export const toc: any;
  export const readingTimeMin: number;
  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
}
