"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, List } from "lucide-react";

// ── FloatingToc ───────────────────────────────────────────────────────────────
// Generalizado a partir de politica-de-privacidade/components/policy-toc.tsx
// (mesmo comportamento exato: item ativo por IntersectionObserver, barra
// lateral sticky em desktop, painel recolhível em mobile) — só que recebendo
// `sections` por prop em vez de importar `tocSections` fixo, pra servir
// tanto a política de privacidade (sumário fixo, sem níveis) quanto o blog
// (sumário derivado dos headings do MDX, com h2/h3).
export interface FloatingTocSection {
  id: string;
  numero: string;
  titulo: string;
  /** h3 vira sub-item recuado; omitido (ou 2) renderiza no nível normal. */
  nivel?: 2 | 3;
}

interface FloatingTocProps {
  sections: FloatingTocSection[];
  label?: string;
  ariaLabel: string;
  /** Altura aproximada do header fixo + respiro — compensa o `scrollTo` pra não cobrir o topo da seção. */
  headerOffset?: number;
}

export function scrollToTocSection(id: string, headerOffset = 96) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: "smooth" });
}

function FloatingToc({ sections, label = "Sumário", ariaLabel, headerOffset = 96 }: FloatingTocProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemRefs = useRef(new Map<string, HTMLLIElement>());

  // Acompanha o item ativo dentro do PRÓPRIO painel do sumário (que tem
  // scroll interno em artigos longos, `lg:overflow-y-auto` abaixo) — sem
  // isso, em posts com muitos h2/h3, a seção ativa passa a rolar pra fora
  // da área visível do painel conforme o artigo avança, e quem está lendo
  // perde de vista onde está. `block: "nearest"` só move o necessário (não
  // força pro topo/centro toda vez), e não mexe no scroll da PÁGINA — só
  // no do painel, que é o contêiner rolável mais próximo do item.
  useEffect(() => {
    itemRefs.current.get(activeId)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeId]);

  useEffect(() => {
    let intersectionObserver: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    function trySetup(): boolean {
      const elements = sections
        .map((s) => document.getElementById(s.id))
        .filter((el): el is HTMLElement => el !== null);
      if (elements.length === 0) return false;

      intersectionObserver = new IntersectionObserver(
        (entries) => {
          // Entre todas as seções cruzando a faixa de observação agora, a
          // mais alta na tela (menor `top`) é a "ativa" — evita que duas
          // seções pequenas próximas uma da outra fiquem alternando.
          const visible = entries.filter((e) => e.isIntersecting);
          if (visible.length === 0) return;
          const topMost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          );
          setActiveId(topMost.target.id);
        },
        { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
      );
      elements.forEach((el) => intersectionObserver?.observe(el));
      return true;
    }

    if (!trySetup()) {
      // Os headings ainda não existem no DOM — no blog, o corpo do post
      // carrega via `React.lazy()` (ver posts-index.ts), então no
      // primeiro render deste efeito o `<Post />` pode ainda nem ter
      // baixado o chunk. Sem isso, o sumário fica com a lista certa mas
      // NUNCA destaca a seção ativa (o efeito já rodou e não roda de novo
      // só porque `sections` — dado estático vindo do JSON gerado — não
      // muda). Observa o DOM até os headings aparecerem, então troca pro
      // IntersectionObserver de verdade.
      mutationObserver = new MutationObserver(() => {
        if (trySetup()) {
          mutationObserver?.disconnect();
          mutationObserver = null;
        }
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      intersectionObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [sections]);

  if (sections.length === 0) return null;

  const handleSelect = (id: string) => {
    setMobileOpen(false);
    scrollToTocSection(id, headerOffset);
  };

  return (
    <>
      {/* ── Mobile/tablet — painel recolhível, some a partir de lg. ──────── */}
      <div className="lg:hidden mb-8">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="w-full flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm"
        >
          <span className="flex items-center gap-2.5 font-display font-semibold text-[#1e3a5f]">
            <List className="w-4 h-4 text-[#285992]" strokeWidth={2} />
            {label}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#285992] transition-transform duration-300 ${mobileOpen ? "rotate-180" : ""}`}
          />
        </button>

        {mobileOpen && (
          <nav className="mt-2 bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
            <ul>
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(s.id)}
                    className={`w-full flex items-center gap-3 text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
                      s.nivel === 3 ? "pl-8" : ""
                    } ${
                      activeId === s.id
                        ? "bg-[#285992]/8 text-[#1e3a5f] font-semibold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-[#285992]/60 flex-shrink-0">{s.numero}</span>
                    {s.titulo}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* ── Desktop — barra lateral fixa, acompanha o scroll do conteúdo. ── */}
      <nav
        aria-label={ariaLabel}
        className="toc-scrollbar hidden lg:block lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2"
      >
        <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#285992]/60 mb-4 px-3.5">
          {label}
        </span>
        <ul className="space-y-0.5 border-l border-slate-200">
          {sections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <li
                key={s.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(s.id, el);
                  else itemRefs.current.delete(s.id);
                }}
                className="relative"
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#fccc30] rounded-full"
                  />
                )}
                <button
                  type="button"
                  onClick={() => handleSelect(s.id)}
                  className={`w-full flex items-start gap-2.5 text-left pr-3 py-2 text-[13px] leading-snug transition-colors ${
                    s.nivel === 3 ? "pl-8" : "pl-4"
                  } ${isActive ? "text-[#1e3a5f] font-semibold" : "text-slate-600 hover:text-[#285992]"}`}
                >
                  <span className="font-mono text-[10px] text-[#285992]/50 flex-shrink-0 mt-[1px]">{s.numero}</span>
                  {s.titulo}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export { FloatingToc };
