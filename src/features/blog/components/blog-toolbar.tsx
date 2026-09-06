"use client";

import { Link, useLocation } from "react-router-dom";
import { BlogSearchBar } from "./blog-search-bar";

// ── BlogToolbar ───────────────────────────────────────────────────────────────
// No mobile a barra é só o buscador ("Voltar pro blog" some abaixo de `sm`)
// e fica fixa (`sticky`) logo abaixo do header, sempre à mão pra buscar sem
// precisar rolar de volta ao topo — pedido explícito. A partir de `sm` volta
// a ser uma fileira normal (`sm:static`), rolando junto com o resto da
// página como antes. `top-[var(--header-height)]` gruda exatamente na borda
// inferior do header fixo; `mt-[var(--header-height)]` só compensa esse
// mesmo header na posição inicial (antes de rolar), nada a ver com "grudar".
function BlogToolbar() {
  const location = useLocation();
  const isBlogHome = location.pathname === "/blog";

  return (
    <div className="sticky sm:static top-[var(--header-height,88px)] z-40 sm:z-auto mt-[var(--header-height,88px)] container mx-auto flex items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
      {!isBlogHome && (
        <Link
          to="/blog"
          className="hidden sm:inline-flex flex-1 items-center text-[13px] font-medium text-slate-600 hover:text-[#285992] transition-colors"
        >
          ← Voltar pro blog
        </Link>
      )}

      <BlogSearchBar className="w-full max-w-none sm:max-w-[260px] shrink-0 ml-auto" />
    </div>
  );
}

export { BlogToolbar };
