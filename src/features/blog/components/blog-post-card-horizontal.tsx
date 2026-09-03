"use client";

import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
import type { BlogPost } from "../types";
import { formatDate } from "./blog-post-card";

// ── BlogPostCardHorizontal ───────────────────────────────────────────────────
// Usado só em "Continue lendo" (related-posts-section.tsx) — título
// completo, sem `line-clamp` (cabe tranquilo numa linha ou duas nesse
// layout mais largo). O resumo, não: alguns posts migrados do blog antigo
// têm resumos bem longos (o WP não limitava esse campo), e sem truncar
// esses casos esticavam o card muito além dos vizinhos na lista.
function BlogPostCardHorizontal({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col sm:flex-row gap-5 rounded-3xl bg-white ring-1 ring-slate-900/[0.06] p-4 sm:p-5 transition-shadow hover:shadow-lg hover:shadow-[#285992]/[0.08]"
    >
      <div className="self-start shrink-0 w-full sm:w-[220px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50">
        {post.coverImage ? (
          // Sem caixa de proporção fixa — mesma solução do BlogPostCard
          // (ver comentário lá): a altura acompanha a largura fixa do card
          // na proporção real da imagem, então nunca sobra fundo vazio
          // (object-contain) nem corta o conteúdo (object-cover).
          // `self-start` é obrigatório aqui: o card é `flex sm:flex-row` e
          // o `align-items: stretch` padrão esticaria essa caixa até a
          // altura da coluna de texto ao lado, recriando o mesmo espaço
          // vazio que a `aspect-ratio` fixa causava antes.
          <img
            src={post.coverImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="aspect-[16/10] flex items-center justify-center bg-gradient-to-br from-[#285992]/[0.06] to-[#1e3a5f]/[0.10]">
            <ImageOff className="w-7 h-7 text-[#285992]/25" strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div className="min-w-0 flex flex-col justify-center py-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#285992] mb-2">
          {post.category.nome}
        </span>
        <h3 className="font-display font-semibold text-[#1e3a5f] tracking-tight leading-snug text-[17px] sm:text-[18px] mb-2 group-hover:text-[#285992] transition-colors">
          {post.title}
        </h3>
        <p className="sm:hidden text-slate-600 text-[13.5px] leading-relaxed mb-3 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center gap-2.5 text-[12px] text-slate-600">
          <span>{post.author.nome}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{formatDate(post.date)}</span>
        </div>
      </div>
    </Link>
  );
}

export { BlogPostCardHorizontal };
