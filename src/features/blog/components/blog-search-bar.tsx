"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { getAllPosts } from "../lib/posts-index";
import { searchPosts } from "../lib/search-posts";

const MAX_RESULTS = 6;

// ── BlogSearchBar ────────────────────────────────────────────────────────────
// Substitui o antigo link estilizado de input pra `/blog/busca` — este é um
// input de verdade, buscando ao vivo (dropdown com os primeiros resultados
// a cada tecla), sem precisar sair da página pra ver alguma coisa
// acontecer. Enter (ou "ver todos os resultados") leva pra /blog/busca com
// a query já preenchida, pra quem quer a lista completa.
function BlogSearchBar({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const id = useId();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchPosts(query, getAllPosts()).slice(0, MAX_RESULTS);
  }, [query]);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setIsOpen(false);
    navigate(`/blog/busca?q=${encodeURIComponent(q)}`);
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} role="search">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
        <label htmlFor={id} className="sr-only">Buscar no blog</label>
        <input
          id={id}
          name="q"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder="Buscar no blog..."
          className="w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-[13.5px] text-[#132840] placeholder:text-slate-400 outline-none transition-colors focus:border-[#285992] focus:ring-4 focus:ring-[#285992]/10"
        />
      </form>

      {isOpen && query.trim() && (
        <div className="absolute right-0 z-50 mt-2 w-[340px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-900/10">
          {results.length > 0 ? (
            <>
              <ul>
                {results.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to={`/blog/${post.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <span className="min-w-0">
                        <span className="block text-[13px] font-medium text-[#1e3a5f] line-clamp-1">{post.title}</span>
                        <span className="block text-[11.5px] text-slate-600 mt-0.5">{post.category.nome}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to={`/blog/busca?q=${encodeURIComponent(query.trim())}`}
                onClick={() => setIsOpen(false)}
                className="block border-t border-slate-100 py-3 text-center text-[12.5px] font-semibold text-[#285992] hover:bg-slate-50 transition-colors"
              >
                Ver todos os resultados
              </Link>
            </>
          ) : (
            <p className="px-4 py-5 text-center text-[13px] text-slate-600">Nenhum resultado para &ldquo;{query}&rdquo;</p>
          )}
        </div>
      )}
    </div>
  );
}

export { BlogSearchBar };
