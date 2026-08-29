"use client";

import type { BlogPost } from "../types";
import { BlogPostCardHorizontal } from "./blog-post-card-horizontal";

function RelatedPostsSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-14 pt-10 border-t border-slate-200">
      <h2 className="font-display text-xl font-semibold text-[#1e3a5f] tracking-tight mb-5">Continue lendo</h2>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <BlogPostCardHorizontal key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

export { RelatedPostsSection };
