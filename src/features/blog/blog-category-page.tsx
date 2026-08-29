"use client";

import { useParams } from "react-router-dom";
import { useSeo } from "@/features/shared/lib/use-seo";
import { NotFoundPage } from "@/features/ui/not-found-page";
import { getCategory } from "../../../content/categories";
import { getPostsByCategory } from "./lib/posts-index";
import { Breadcrumbs, BlogPostCard, BlogToolbar } from "./components";

function BlogCategoryPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const category = getCategory(slug);
  const posts = category ? getPostsByCategory(category.slug) : [];

  useSeo({
    title: category ? `${category.nome} | Blog Foco` : "Categoria não encontrada",
    description: category?.descricao ?? "",
    path: `/blog/categoria/${slug}`,
  });

  if (!category) return <NotFoundPage />;

  return (
    <div className="bg-[#f4f7fb]">
      <BlogToolbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-14 sm:pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: category.nome }]} />
        <div className="max-w-2xl mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#285992] mb-3 block">Categoria</span>
          <h1 className="font-display text-4xl font-semibold text-[#1e3a5f] tracking-tight mb-3">{category.nome}</h1>
          <p className="text-slate-600 text-[15px] leading-relaxed">{category.descricao}</p>
        </div>

        {posts.length === 0 ? (
          <p className="text-slate-600">Nenhum post nesta categoria ainda.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { BlogCategoryPage };
