"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useSeo } from "@/features/shared/lib/use-seo";
import { getAllPosts } from "./lib/posts-index";
import { searchPosts } from "./lib/search-posts";
import { Breadcrumbs, BlogPostCard, BlogToolbar } from "./components";

function BlogSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // Lê `?q=` da URL (o dropdown de busca da BlogToolbar chega aqui com a
  // query pronta via "ver todos os resultados") mas mantém digitação local
  // sem re-navegar a cada tecla — só sincroniza de volta pra URL ao digitar,
  // pra manter o link compartilhável.
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  useSeo({ title: "Buscar | Blog Foco", description: "Busque artigos sobre gestão, marketing e tecnologia hoteleira.", path: "/blog/busca" });

  const results = useMemo(() => searchPosts(query, getAllPosts()), [query]);

  function handleChange(value: string) {
    setQuery(value);
    const next = new URLSearchParams(searchParams);
    if (value.trim()) next.set("q", value);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  }

  return (
    <div className="bg-[#f4f7fb] min-h-[60vh]">
      <BlogToolbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-14 sm:pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Busca" }]} />

        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#1e3a5f] tracking-tight mb-6">Buscar no blog</h1>

        <div className="relative max-w-xl mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
          <label htmlFor="blog-search-input" className="sr-only">Buscar no blog</label>
          <input
            id="blog-search-input"
            name="q"
            autoFocus
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Buscar por assunto — ex.: cancelamento, no-show, PMS..."
            className="w-full rounded-full border border-slate-200 bg-white pl-11 pr-5 py-3.5 text-[14.5px] text-[#132840] placeholder:text-slate-400 outline-none focus:border-[#285992] focus:ring-4 focus:ring-[#285992]/10"
          />
        </div>

        {query.trim() && (
          <p className="text-[13.5px] text-slate-600 mb-6">
            {results.length} resultado{results.length === 1 ? "" : "s"} para &ldquo;{query}&rdquo;
          </p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { BlogSearchPage };
