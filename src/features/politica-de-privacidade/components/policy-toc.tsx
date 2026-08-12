"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, List } from "lucide-react";
import { tocSections } from "../data/toc-sections";

const HEADER_OFFSET = 96; // altura aproximada do header fixo + respiro

// Rola até a seção via JS (não `<a href="#id">` puro) — evita depender de
// `scroll-behavior: smooth` global (não existe no `index.css`, e mudar isso
// afetaria o site inteiro só por causa desta página) e permite compensar a
// altura do header fixo, que senão cobriria o topo de cada seção.
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

// ── PolicyToc ─────────────────────────────────────────────────────────────
// Sumário navegável — barra lateral fixa (`lg:sticky`) em desktop, painel
// recolhível em mobile/tablet. O item ativo é decidido por
// IntersectionObserver: cada <section> do conteúdo entra/sai de uma faixa
// fina perto do topo da viewport (`rootMargin` negativo dos dois lados),
// então o link correspondente acende conforme o usuário rola — sem
// depender de cálculo manual de posição a cada scroll.
function PolicyToc() {
  const [activeId, setActiveId] = useState(tocSections[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = tocSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
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

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const handleSelect = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      {/* ── Mobile/tablet — painel recolhível, some a partir de lg. ────────
          Sem isso, os 14 itens empilhados antes do conteúdo forçariam uma
          rolagem longa só pra chegar no texto — o painel fechado por
          padrão resolve isso sem esconder a navegação de vez. */}
      <div className="lg:hidden mb-8">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="w-full flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm"
        >
          <span className="flex items-center gap-2.5 font-display font-semibold text-[#1e3a5f]">
            <List className="w-4 h-4 text-[#285992]" strokeWidth={2} />
            Sumário
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#285992] transition-transform duration-300 ${mobileOpen ? "rotate-180" : ""}`}
          />
        </button>

        {mobileOpen && (
          <nav className="mt-2 bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
            <ul>
              {tocSections.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(s.id)}
                    className={`w-full flex items-center gap-3 text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
                      activeId === s.id
                        ? "bg-[#285992]/8 text-[#1e3a5f] font-semibold"
                        : "text-slate-500 hover:bg-slate-50"
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
        aria-label="Sumário da política de privacidade"
        className="hidden lg:block lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2"
      >
        <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#285992]/60 mb-4 px-3.5">
          Sumário
        </span>
        <ul className="space-y-0.5 border-l border-slate-200">
          {tocSections.map((s) => {
            const isActive = activeId === s.id;
            return (
              <li key={s.id} className="relative">
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#fccc30] rounded-full"
                  />
                )}
                <button
                  type="button"
                  onClick={() => handleSelect(s.id)}
                  className={`w-full flex items-start gap-2.5 text-left pl-4 pr-3 py-2 text-[13px] leading-snug transition-colors ${
                    isActive
                      ? "text-[#1e3a5f] font-semibold"
                      : "text-slate-500 hover:text-[#285992]"
                  }`}
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

export { PolicyToc, scrollToSection };
