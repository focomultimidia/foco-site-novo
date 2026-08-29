"use client";

import { useParams } from "react-router-dom";
import { useSeo } from "@/features/shared/lib/use-seo";
import { NotFoundPage } from "@/features/ui/not-found-page";
import { getPostsByTag } from "./lib/posts-index";
import { Breadcrumbs, BlogPostCard, tagLabel, BlogToolbar } from "./components";

function BlogTagPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const posts = getPostsByTag(slug);

  useSeo({
    title: `#${tagLabel(slug)} | Blog Foco`,
    description: `Posts marcados com ${tagLabel(slug)}.`,
    path: `/blog/tag/${slug}`,
  });

  if (posts.length === 0) return <NotFoundPage />;

  return (
    <div className="bg-[#f4f7fb]">
      <BlogToolbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-14 sm:pb-20">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: `#${tagLabel(slug)}` }]} />
        <h1 className="font-display text-4xl font-semibold text-[#1e3a5f] tracking-tight mb-10">#{tagLabel(slug)}</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { BlogTagPage };
