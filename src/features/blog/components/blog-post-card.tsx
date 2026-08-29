"use client";

import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
import type { BlogPost } from "../types";

function formatDate(iso: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

// ── BlogPostCard ──────────────────────────────────────────────────────────────
function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-3xl bg-white ring-1 ring-slate-900/[0.06] transition-shadow hover:shadow-lg hover:shadow-[#285992]/[0.08]"
    >
      <div className="relative overflow-hidden bg-slate-50">
        {post.coverImage ? (
          // Sem caixa de proporção fixa — a altura da imagem é a dela
          // mesma (`h-auto`). As imagens migradas do blog antigo têm
          // proporções bem diferentes entre si (banner largo, screenshot
          // quadrado, foto vertical...): forçar uma caixa 16:10 ou
          // recortava conteúdo importante nas bordas (`object-cover`) ou
          // sobrava fundo vazio nas laterais (`object-contain`). Deixar a
          // imagem ditar a própria altura elimina os dois problemas ao
          // mesmo tempo — o card cresce ou encolhe pra caber ela inteira,
          // sem cortar nem sobrar nada.
          <img
            src={post.coverImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          // Alguns posts migrados do blog antigo nunca tiveram imagem de
          // capa no WordPress — sem imagem real pra ditar a altura, cai
          // numa caixa de proporção fixa com um placeholder neutro (mesmo
          // princípio do avatar de iniciais em author-bio.tsx pra autor
          // sem foto).
          <div className="aspect-[16/10] flex items-center justify-center bg-gradient-to-br from-[#285992]/[0.06] to-[#1e3a5f]/[0.10]">
            <ImageOff className="w-8 h-8 text-[#285992]/25" strokeWidth={1.5} />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold text-[#285992] shadow-sm">
          {post.category.nome}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {/* h2, não h3 — este card é usado em /blog, /blog/categoria/*,
            /blog/tag/*, /blog/autor/* e na busca, e na maioria dessas
            páginas ele é o primeiro nível de heading abaixo do <h1> da
            própria página (sem h2 nenhum entre os dois) — h3 pulava um
            nível e quebrava a ordem sequencial de headings. */}
        <h2 className="font-display font-semibold text-[#1e3a5f] tracking-tight leading-snug group-hover:text-[#285992] transition-colors text-lg mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-slate-600 leading-relaxed text-[13.5px] mb-3 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2.5 text-[12px] text-slate-600">
          <span>{post.author.nome}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{formatDate(post.date)}</span>
        </div>
      </div>
    </Link>
  );
}

export { BlogPostCard, formatDate };
