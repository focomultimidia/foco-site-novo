import { useEffect } from "react";

// SPA sem SSR/prerender por rota (mesmo index.html serve as 12 rotas) — por
// isso título, description e canonical são aplicados no cliente, por página,
// via useEffect. Cobre o que o Googlebot lê (ele executa JS antes de
// indexar); não cobre unfurling de link em apps que não rodam JS
// (WhatsApp/Slack preview), que continuam vendo o og:title/og:description
// estático do index.html — isso exigiria SSR/prerender, fora do escopo aqui.
const SITE_URL = "https://focomultimidia.com";

interface SeoOptions {
  /** 50–60 caracteres, sem sufixo de marca repetido em todas as páginas. */
  title: string;
  /** 140–160 caracteres, específica da página — nunca a description genérica do index.html. */
  description: string;
  /** Caminho da rota, ex.: "/gestao-hoteleira". Usado para a canonical e og:url. */
  path: string;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Define título, meta description e canonical únicos para a rota atual. */
export function useSeo({ title, description, path }: SeoOptions) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertCanonical(url);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);

    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
  }, [title, description, path]);
}
