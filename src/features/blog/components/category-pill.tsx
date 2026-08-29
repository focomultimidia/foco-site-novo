"use client";

import { Link } from "react-router-dom";
import type { Category } from "../../../../content/categories";

function CategoryPill({ category, active = false }: { category: Category; active?: boolean }) {
  return (
    <Link
      to={`/blog/categoria/${category.slug}`}
      className={`inline-flex items-center rounded-full px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors ${
        active
          ? "bg-[#285992] text-white"
          : "bg-white text-slate-600 border border-slate-200 hover:border-[#285992]/40 hover:text-[#285992]"
      }`}
    >
      {category.nome}
    </Link>
  );
}

export { CategoryPill };
