"use client";

import { Link } from "react-router-dom";
import type { Author } from "../../../../content/authors";

// Avatar de iniciais (mesmo padrão de wall-of-love-section.tsx pros
// depoimentos sem foto real) — sempre usado hoje, já que nenhum autor tem
// `foto` ainda; se um dia existir, é só popular o campo no frontmatter de
// content/authors.ts que este componente troca sozinho.
function AuthorAvatar({ author, size = 48 }: { author: Author; size?: number }) {
  if (author.foto) {
    return (
      <img
        src={author.foto}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ width: size, height: size }}
        className="rounded-full object-cover flex-shrink-0 bg-slate-100"
      />
    );
  }
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0"
      aria-hidden="true"
    >
      <span
        className="flex h-full w-full items-center justify-center rounded-full"
        style={{ background: "linear-gradient(135deg,#285992,#427ab9)" }}
      >
        {author.iniciais}
      </span>
    </span>
  );
}

function AuthorBio({ author }: { author: Author }) {
  return (
    <Link
      to={`/blog/autor/${author.id}`}
      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 hover:border-[#285992]/30 transition-colors"
    >
      <AuthorAvatar author={author} />
      <div className="min-w-0">
        <p className="text-[14px] font-semibold text-[#1e3a5f] group-hover:text-[#285992] transition-colors">{author.nome}</p>
        <p className="text-[12.5px] text-slate-600">{author.cargo}</p>
      </div>
    </Link>
  );
}

export { AuthorBio, AuthorAvatar };
