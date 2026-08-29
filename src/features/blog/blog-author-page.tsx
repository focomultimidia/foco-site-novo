"use client";

import { useParams } from "react-router-dom";
import { useSeo } from "@/features/shared/lib/use-seo";
import { NotFoundPage } from "@/features/ui/not-found-page";
import { getAuthor } from "../../../content/authors";
import { getPostsByAuthor } from "./lib/posts-index";
import { Breadcrumbs, BlogPostCard, BlogToolbar } from "./components";
import { AuthorAvatar } from "./components/author-bio";

function BlogAuthorPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const author = getAuthor(slug);
  const posts = author ? getPostsByAuthor(author.id) : [];

  useSeo({
    title: author ? `${author.nome} | Blog Foco` : "Autor não encontrado",
    description: author?.bio ?? "",
    path: `/blog/autor/${slug}`,
  });

  if (!author) return <NotFoundPage />;

  return (
    <div className="bg-[#f4f7fb]">
      <BlogToolbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-14 sm:pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: author.nome }]} />

        <div className="flex items-center gap-4 mb-10">
          <AuthorAvatar author={author} size={64} />
          <div>
            <h1 className="font-display text-2xl font-semibold text-[#1e3a5f] tracking-tight">{author.nome}</h1>
            <p className="text-slate-600 text-[14px]">{author.cargo}</p>
          </div>
        </div>
        <p className="text-slate-600 text-[15px] leading-relaxed max-w-2xl mb-10">{author.bio}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { BlogAuthorPage };
