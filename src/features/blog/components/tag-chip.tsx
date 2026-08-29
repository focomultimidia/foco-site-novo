"use client";

import { Link } from "react-router-dom";

// Rótulo legível a partir do slug — "reserva-direta-hotel" → "reserva direta hotel".
// Sem um mapa nome↔slug separado pra manter em sincronia: a tag É o slug.
function tagLabel(tag: string): string {
  return tag.replace(/-/g, " ");
}

function TagChip({ tag }: { tag: string }) {
  return (
    <Link
      to={`/blog/tag/${tag}`}
      className="inline-flex items-center rounded-full bg-[#285992]/[0.06] text-[#285992] px-3 py-1.5 text-[12.5px] font-medium hover:bg-[#285992]/[0.12] transition-colors"
    >
      #{tagLabel(tag)}
    </Link>
  );
}

export { TagChip, tagLabel };
