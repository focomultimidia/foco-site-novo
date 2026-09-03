"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ImageOff } from "lucide-react";
import { SectionEyebrow } from "./section-eyebrow";
import { formatDate } from "@/features/blog/components/blog-post-card";
import { getPostsForProduct, getLatestPosts } from "@/features/blog/lib/product-posts";
import type { BlogPost } from "@/features/blog/types";

interface UltimasDoBlogSectionProps {
  /** Slug da rota da página de produto (ex.: "motor-de-reservas") — usado
      pra puxar getPostsForProduct(productSlug). Omitido na Home, que usa
      getLatestPosts (mais recentes de qualquer categoria).
      A busca acontece AQUI DENTRO, não na página que renderiza esta seção
      — de propósito: posts-index.ts carrega o índice inteiro do blog
      (~450KB, os 148 posts migrados) via um JSON estático. Se a página
      chamasse getPostsForProduct/getLatestPosts no próprio corpo, esse
      import entraria no caminho síncrono do chunk da página (todas as 11
      que usam esta seção), mesmo com o componente visual sendo lazy —
      porque a CHAMADA da função, não o componente, é o que decide quando
      o import de posts-index.ts é resolvido. Fazendo a busca dentro do
      componente, ela só roda quando o chunk lazy é montado (useInViewOnce
      em ultimas-do-blog-section-lazy.tsx), preservando o mesmo adiamento
      já usado pelas páginas do blog em si. */
  productSlug?: string;
}

// ── Cover — SEM caixa de proporção fixa nem object-fit ───────────────────────
// `h-auto`: a altura da imagem é a dela mesma, não uma caixa arbitrária —
// medido nos 148 posts migrados, ~90% das capas são 1200×627 (a mesma
// proporção do Open Graph do WordPress), então isso já sai visualmente
// consistente na prática sem precisar forçar nada. Os poucos outliers de
// proporção só encolhem/esticam um pouco a própria linha, nunca cortam ou
// sobram espaço vazio ao redor. `width`/`height` (na proporção mais comum)
// ficam só como dica de aspect-ratio pro navegador reservar o espaço antes
// de a imagem carregar — evita CLS sem travar a altura real.
function Cover({
  post,
  width,
  height,
  className,
  iconClassName,
}: {
  post: BlogPost;
  width: number;
  height: number;
  className: string;
  iconClassName: string;
}) {
  if (!post.coverImage) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-[#285992]/[0.06] to-[#1e3a5f]/[0.10] ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
        <ImageOff className={`text-[#285992]/25 ${iconClassName}`} strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <img
      src={post.coverImage}
      alt=""
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={`h-auto rounded-xl transition-transform duration-500 group-hover:scale-[1.02] ${className}`}
    />
  );
}

// ── FeaturedPost — matéria em destaque, coluna esquerda ──────────────────────
function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-xl mb-5">
        <Cover post={post} width={1200} height={627} className="w-full" iconClassName="w-10 h-10" />
      </div>

      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#285992]">
        {post.category.nome}
      </span>
      <h3 className="font-display font-semibold text-[#1e3a5f] tracking-tight leading-snug text-xl lg:text-2xl mt-2 mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-[#285992]">
        {post.title}
      </h3>
      <p className="text-slate-600 leading-relaxed text-sm mb-4 line-clamp-2">
        {post.excerpt}
      </p>
      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 transition-colors duration-300 group-hover:text-[#285992]">
        {formatDate(post.date)}
        <span aria-hidden="true" className="text-slate-300">&middot;</span>
        Ler artigo
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

// ── SecondaryRow — as 4 restantes, lista compacta na coluna direita ─────────
// Thumbnail em ~35% da largura da linha (não um quadrado pequeno) — grande
// o bastante pra a coluna inteira aproximar a altura da matéria em
// destaque ao lado, sem esticar artificialmente nem sobrar vazio embaixo.
function SecondaryRow({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex items-center gap-4 py-4 border-t border-slate-900/10 first:border-t-0 first:pt-0"
    >
      <div className="w-[34%] shrink-0 overflow-hidden rounded-lg">
        <Cover post={post} width={1200} height={627} className="w-full" iconClassName="w-6 h-6" />
      </div>

      <div className="min-w-0 flex-1">
        <span className="block font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#285992] mb-1.5">
          {post.category.nome}
        </span>
        <h4 className="font-display font-semibold text-[#1e3a5f] tracking-tight leading-snug text-[14.5px] mb-1.5 line-clamp-2 transition-colors duration-300 group-hover:text-[#285992]">
          {post.title}
        </h4>
        <span className="text-[11.5px] text-slate-500">{formatDate(post.date)}</span>
      </div>
    </Link>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function UltimasDoBlogSection({ productSlug }: UltimasDoBlogSectionProps) {
  // 1 destaque + 4 secundárias — a 4ª a mais (antes eram 3) preenche melhor
  // a coluna da lista ao lado da matéria grande, sem depender só do
  // justify-between pra esticar o espaço entre poucas linhas.
  const posts = productSlug ? getPostsForProduct(productSlug, 5) : getLatestPosts(5);

  // Sem posts (índice vazio) — nunca deveria acontecer com o blog populado,
  // mas evita renderizar uma seção vazia se algum dia acontecer.
  if (posts.length === 0) return null;

  const [destaque, ...secundarias] = posts;

  return (
    <section className="py-16 lg:py-20 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-end justify-between gap-4 mb-8 lg:mb-10"
        >
          <div>
            <SectionEyebrow className="mb-2">Blog</SectionEyebrow>
            <h2 className="font-display text-2xl sm:text-[1.75rem] font-semibold text-[#1e3a5f] leading-none tracking-tight antialiased">
              Últimas do blog
            </h2>
          </div>
          <Link
            to="/blog"
            className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#285992] hover:text-[#1e3a5f] transition-colors"
          >
            Ver todos os artigos
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="grid grid-cols-1 lg:grid-cols-[1.35fr_1px_1fr] gap-8 lg:gap-10 items-stretch"
        >
          <FeaturedPost post={destaque} />

          <div aria-hidden="true" className="hidden lg:block w-px bg-slate-900/10" />

          {/* self-stretch + justify-between: a coluna secundária ocupa a
              MESMA altura da coluna do destaque (grid items-stretch) e
              distribui as 3 linhas por igual nesse espaço — em vez de
              empilhar tudo no topo e sobrar vazio embaixo quando a lista é
              naturalmente mais curta que a imagem grande ao lado. */}
          <div className="flex flex-col justify-between">
            {secundarias.map((post) => (
              <SecondaryRow key={post.slug} post={post} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { UltimasDoBlogSection };
export type { UltimasDoBlogSectionProps };
