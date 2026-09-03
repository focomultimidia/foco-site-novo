"use client";

import { useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ImageOff, ChevronLeft, ChevronRight } from "lucide-react";
import { useSeo } from "@/features/shared/lib/use-seo";
import { getAllPosts, CATEGORIES } from "./lib/posts-index";
import { BlogPostCard, BlogToolbar } from "./components";
import { formatDate } from "./components/blog-post-card";

const POSTS_PER_PAGE = 9;

// Resume a lista de páginas em vez de cravar um botão pra cada uma —
// com 146 posts (17 páginas) a barra virava uma parede de números. Sempre
// mostra a 1ª, a última, e um "miolo" de 3 (a atual + 1 vizinha de cada
// lado) ao redor da página corrente, com "…" preenchendo o vão — nenhuma
// página fica inalcançável, só deixa de ter um botão dedicado: chegar nela
// é 1-2 cliques de Anterior/Próxima ou de outro número do miolo, que
// desliza junto conforme a navegação. Mesmo algoritmo usado por libs como
// MUI/shadcn (`usePagination`), sem precisar da dependência.
function buildPageList(current: number, total: number): (number | "…")[] {
  const siblingCount = 1;
  const windowSize = siblingCount * 2 + 5; // 1ª + última + miolo (atual + 2 vizinhas) + 2 buffers

  if (total <= windowSize) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;
  const edgeRangeSize = siblingCount * 2 + 3;

  if (!showLeftEllipsis && showRightEllipsis) {
    const left = Array.from({ length: edgeRangeSize }, (_, i) => i + 1);
    return [...left, "…", total];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const right = Array.from({ length: edgeRangeSize }, (_, i) => total - edgeRangeSize + i + 1);
    return [1, "…", ...right];
  }

  const middle = Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i);
  return [1, "…", ...middle, "…", total];
}
// Altura aproximada da BlogToolbar (py-3 + conteúdo ~36px) — soma à altura
// real do header (var(--header-height)) pra saber até onde rolar sem
// deixar o início da listagem escondido atrás da barra sticky.
const TOOLBAR_HEIGHT = 64;

function BlogHomePage() {
  useSeo({
    title: "Blog Foco | Gestão, marketing e tecnologia para hotelaria",
    description: "Artigos sobre gestão hoteleira, reserva direta, marketing e tecnologia — escritos para quem opera hotel ou pousada, não para quem só fala sobre isso.",
    path: "/blog",
  });

  const allPosts = getAllPosts();
  const [featured, ...rest] = allPosts;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("pagina")) || 1);

  const totalPages = Math.max(1, Math.ceil(rest.length / POSTS_PER_PAGE));
  const pageStart = (page - 1) * POSTS_PER_PAGE;
  const pagePosts = rest.slice(pageStart, pageStart + POSTS_PER_PAGE);
  const gridRef = useRef<HTMLDivElement>(null);

  // Rola pro INÍCIO DA LISTAGEM, não pro topo da página — subir até a hero
  // de novo a cada clique de paginação forçava rolar tudo de volta pra
  // baixo pra ver os novos posts. Desconta a altura do header + da
  // BlogToolbar sticky, senão o início da grade fica escondido atrás dela.
  function goToPage(n: number) {
    const next = new URLSearchParams(searchParams);
    if (n <= 1) next.delete("pagina");
    else next.set("pagina", String(n));
    setSearchParams(next);

    const el = gridRef.current;
    if (!el) return;
    const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 88;
    const target = el.getBoundingClientRect().top + window.scrollY - headerHeight - TOOLBAR_HEIGHT;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.max(target, 0), behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  return (
    <div className="bg-[#f4f7fb]">
      <BlogToolbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-14 sm:pb-20">
        {/* Só na página 1 — a partir da 2 quem chega aqui é via paginação,
            já sabe onde está, e repetir a mesma introdução a cada página só
            empurra a listagem pra baixo à toa. Na 2+, um <h1> só-leitor-de-
            tela substitui (não some — toda página precisa de exatamente
            um <h1> pra estrutura de acessibilidade ficar correta). */}
        {page === 1 ? (
          <div className="max-w-2xl mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#285992] mb-3 block">Blog</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#1e3a5f] tracking-tighter leading-none mb-4">
              Gestão, marketing e tecnologia pra quem opera hotel
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              Conteúdo escrito por quem entende de hotelaria, pra quem toca a operação todo dia — sem enrolação.
            </p>
          </div>
        ) : (
          <h1 className="sr-only">Gestão, marketing e tecnologia pra quem opera hotel — página {page}</h1>
        )}

        {/* Categorias — fileira normal, sem sticky (o pedido explícito foi
            "só o buscador fica fixo"). */}
        <div className="flex items-center gap-2 overflow-x-auto mb-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <Link
            to="/blog"
            className="inline-flex shrink-0 items-center rounded-full bg-[#285992] px-3.5 py-1.5 text-[12.5px] font-medium text-white whitespace-nowrap"
          >
            Todas
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/blog/categoria/${cat.slug}`}
              className="inline-flex shrink-0 items-center rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-slate-600 whitespace-nowrap transition-colors hover:border-[#285992]/40 hover:text-[#285992]"
            >
              {cat.nome}
            </Link>
          ))}
        </div>

        {featured && page === 1 && (
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid sm:grid-cols-2 overflow-hidden rounded-3xl bg-white ring-1 ring-slate-900/[0.06] mb-10 transition-shadow hover:shadow-lg hover:shadow-[#285992]/[0.08]"
          >
            <div className="relative overflow-hidden bg-slate-50">
              {/* Sem caixa de proporção fixa — mesma técnica do BlogPostCard:
                  a imagem dita a própria altura, sem cortar nem sobrar
                  fundo vazio, não importa a proporção original dela. */}
              {featured.coverImage ? (
                <img
                  src={featured.coverImage}
                  alt=""
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="aspect-[16/10] flex items-center justify-center bg-gradient-to-br from-[#285992]/[0.06] to-[#1e3a5f]/[0.10]">
                  <ImageOff className="w-9 h-9 text-[#285992]/25" strokeWidth={1.5} />
                </div>
              )}
              <span className="absolute left-4 top-4 rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1.5 text-[11px] font-semibold text-[#285992] shadow-sm">
                {featured.category.nome}
              </span>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-9">
              <h2 className="font-display text-2xl sm:text-[28px] font-semibold text-[#1e3a5f] tracking-tight leading-[1.15] mb-3 group-hover:text-[#285992] transition-colors">
                {featured.title}
              </h2>
              <p className="text-slate-600 text-[14.5px] leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-[12.5px] text-slate-600">
                <span>{featured.author.nome}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{formatDate(featured.date)}</span>
              </div>
            </div>
          </Link>
        )}

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pagePosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* `flex-wrap` + `shrink-0` nos botões — sem isso o flexbox
            espremia cada botão pra caber tudo numa linha só no mobile
            (chegavam a ~13px de largura em vez dos 36px pedidos, viravam
            praticamente impossíveis de tocar). Agora quebra linha em vez
            de espremer. Números resumidos via buildPageList — ver comentário
            lá — mais Anterior/Próxima pra navegar sem precisar do número
            exato. */}
        {totalPages > 1 && (
          <nav aria-label="Paginação" className="flex flex-wrap items-center justify-center gap-2 mt-14">
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              aria-label="Página anterior"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 transition-colors hover:border-[#285992]/40 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            </button>

            {buildPageList(page, totalPages).map((item, i) =>
              item === "…" ? (
                <span key={`ellipsis-${i}`} aria-hidden="true" className="w-9 shrink-0 text-center text-[13.5px] text-slate-400 select-none">
                  &hellip;
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => goToPage(item)}
                  aria-current={item === page ? "page" : undefined}
                  className={`h-9 w-9 shrink-0 rounded-full text-[13.5px] font-medium transition-colors ${
                    item === page ? "bg-[#285992] text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-[#285992]/40"
                  }`}
                >
                  {item}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              aria-label="Próxima página"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 transition-colors hover:border-[#285992]/40 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}

export { BlogHomePage };
