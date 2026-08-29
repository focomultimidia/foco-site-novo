"use client";

import { Link, useLocation } from "react-router-dom";
import { BlogSearchBar } from "./blog-search-bar";

// ── BlogToolbar ───────────────────────────────────────────────────────────────
// Fileira normal (SEM sticky) logo abaixo do header, presente em toda
// página do blog — só o buscador; rola junto com o resto da página como
// qualquer outro elemento. `mt-[var(--header-height)]` só compensa o
// header fixo (a barra é o primeiro elemento da página), nada a ver com
// posição de "grudar".
function BlogToolbar() {
  const location = useLocation();
  const isBlogHome = location.pathname === "/blog";

  return (
    <div className="mt-[var(--header-height,88px)] container mx-auto flex items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
      {!isBlogHome && (
        <Link
          to="/blog"
          className="hidden sm:inline-flex flex-1 items-center text-[13px] font-medium text-slate-600 hover:text-[#285992] transition-colors"
        >
          ← Voltar pro blog
        </Link>
      )}

      <BlogSearchBar className="w-full max-w-[220px] sm:max-w-[260px] shrink-0 ml-auto" />
    </div>
  );
}

export { BlogToolbar };
