"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Clock } from "lucide-react";
import { useSeo } from "@/features/shared/lib/use-seo";
import { FloatingToc } from "@/features/shared/components/floating-toc";
import { LeadCaptureModal } from "@/components/shared/lead-capture-modal";
import { NotFoundPage } from "@/features/ui/not-found-page";
import { Spinner } from "@/components/ui/spinner";
import { getAllPosts, getPostBySlug } from "./lib/posts-index";
import { getRelatedPosts } from "./lib/related-posts";
import { formatReadingTime } from "./lib/reading-time";
import { formatDate } from "./components/blog-post-card";
import {
  Breadcrumbs,
  CategoryPill,
  TagChip,
  ShareButtons,
  AuthorBio,
  ReadingProgressBar,
  ConsultantCta,
  RelatedPostsSection,
  getMdxComponents,
  BlogToolbar,
} from "./components";

const SITE_URL = "https://focomultimidia.com";

function BlogPostPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug);
  const articleRef = useRef<HTMLDivElement>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // Hooks não podem ser condicionais — useMemo roda sempre, mesmo quando
  // `post` ainda não existe (guarda com `post?.` por dentro, ver abaixo).
  const mdxComponents = useMemo(
    () => (post ? getMdxComponents(post.toc, post.ctaProduct) : {}),
    [post],
  );
  const related = useMemo(
    () => (post ? getRelatedPosts(post, getAllPosts()) : []),
    [post],
  );

  useSeo({
    title: post ? `${post.seoTitle} | Blog Foco` : "Post não encontrado | Blog Foco",
    description: post?.excerpt ?? "",
    path: post ? `/blog/${post.slug}` : "/blog",
  });

  if (!post) return <NotFoundPage />;

  const Post = post.Component;

  return (
    <article>
      <ReadingProgressBar targetRef={articleRef} />
      <BlogToolbar />

      {/* Respiro abaixo da BlogToolbar (que já cuida de compensar o header
          fixo) — não mais um pt- calculado à mão pro header, que ficava
          apertado demais por não bater com a altura real dele. */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.category.nome, href: `/blog/categoria/${post.category.slug}` },
            { label: post.title },
          ]}
        />

        <div className="max-w-3xl">
          <CategoryPill category={post.category} active />
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1e3a5f] tracking-tight leading-[1.12] mt-4 mb-4">
            {post.title}
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed mb-5">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-slate-600 pb-6 border-b border-slate-200">
            <span>{post.author.nome}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true">&middot;</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" strokeWidth={2} />
              {formatReadingTime(post.readingTimeMin)}
            </span>
          </div>
        </div>

        <div ref={articleRef} className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-10 mt-10">
          <FloatingToc sections={post.toc} ariaLabel={`Sumário: ${post.title}`} />

          <div className="min-w-0 max-w-3xl">
            {/* `Post` (post.Component) agora é `React.lazy()` — ver
                posts-index.ts — então precisa de um Suspense em volta. Local,
                não o da rota em App.tsx: assim só o CORPO do artigo mostra o
                spinner enquanto o chunk daquele post baixa, sem sumir com o
                cabeçalho/breadcrumb/TOC que já estão na tela. */}
            <Suspense fallback={<div className="flex justify-center py-20"><Spinner className="w-8 h-8" /></div>}>
              <Post components={mdxComponents} />
            </Suspense>

            <div className="flex flex-wrap gap-2 mt-8">
              {post.tags.map((tag) => (
                <TagChip key={tag} tag={tag} />
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap mt-8">
              <AuthorBio author={post.author} />
              <ShareButtons url={`${SITE_URL}/blog/${post.slug}`} title={post.seoTitle} />
            </div>

            <ConsultantCta onOpen={() => setIsLeadModalOpen(true)} />

            <RelatedPostsSection posts={related} />
          </div>
        </div>
      </div>

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        title="Fale com um consultor"
        description={`Tem uma dúvida sobre "${post.title}"? Preencha seus dados e nossa equipe entra em contato.`}
        source={`blog:${post.slug}`}
      />
    </article>
  );
}

export { BlogPostPage };
