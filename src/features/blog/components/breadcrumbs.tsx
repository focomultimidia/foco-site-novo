"use client";

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

// ── Breadcrumbs ───────────────────────────────────────────────────────────────
// Home › Blog › Categoria › Título — o último item nunca é link (é a
// própria página). Schema BreadcrumbList correspondente é injetado no HTML
// estático por scripts/generate-blog-static.mjs (fase 2), não aqui — este
// componente só cuida do que aparece na tela.
//
// `hideLastOnMobile` — usado no detalhe da matéria, onde o último item é o
// TÍTULO do post (às vezes longo): no mobile ele já aparece logo abaixo, em
// destaque, como h1 — repeti-lo truncado no breadcrumb só ocupava espaço à
// toa. Continua no DOM (e no Schema, que não depende disto), só escondido
// visualmente abaixo do breakpoint `sm`.
function Breadcrumbs({ items, hideLastOnMobile = false }: { items: Crumb[]; hideLastOnMobile?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-slate-600">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className={`items-center gap-1.5 ${hideLastOnMobile && isLast ? "hidden sm:flex" : "flex"}`}>
              {i > 0 && <ChevronRight className="w-3 h-3 text-slate-300" strokeWidth={2} />}
              {item.href ? (
                <Link to={item.href} className="hover:text-[#285992] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#1e3a5f] font-medium truncate max-w-[220px] sm:max-w-none">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export { Breadcrumbs };
export type { Crumb };
