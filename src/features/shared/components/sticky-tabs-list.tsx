"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StickyTabsListProps {
  /** Render-prop: recebe `isStuck` pra o próprio <TabsList> do chamador
   *  trocar seu tratamento visual (vidro fosco + sombra) sem precisar de
   *  um wrapper extra com border-radius/padding próprios — evita duas
   *  "pílulas" aninhadas visualmente competindo. */
  children:     (isStuck: boolean) => ReactNode;
  className?:   string;
  /** Aba/categoria ativa (id ou índice) do chamador. Toda troca reconduz o
   *  scroll pro topo do conteúdo da nova aba — sem isso, trocar de aba lá
   *  embaixo de uma seção longa (18 cards do PMS, por exemplo) troca o
   *  conteúdo mas deixa o usuário olhando pro meio do grid antigo, fora de
   *  contexto. Só sobe (nunca desce) e só quando já rolado além do ponto
   *  de repouso — ver useEffect abaixo. */
  activeValue?: string | number;
}

const HEADER_GAP = 14;

// Mantém a barra de abas grudada logo abaixo do header fixo enquanto o
// usuário rola pela seção — sem isso, trocar de aba em seções longas (o
// grid de 18 PMS, por exemplo) obriga rolar de volta ao topo toda vez.
//
// `top` usa `var(--header-height)` (publicada pelo próprio Header via
// ResizeObserver, ver header.tsx) em vez de um número fixo: o header muda
// de altura ao rolar (pill flutuante encolhendo) e entre mobile/desktop, e
// um valor hardcoded aqui ficaria dessincronizado.
function StickyTabsList({ children, className = "", activeValue }: StickyTabsListProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Sentinela sem altura, sempre em fluxo normal (nunca sticky) — usada só
  // pra medir a posição "de verdade" no documento. `wrapperRef` não serve
  // pra isso: quando já está grudado, `getBoundingClientRect().top` some
  // e passa a devolver a posição PRESA (~topo da tela), não a posição real
  // no fluxo — o cálculo do alvo do scroll ficaria sempre "já estou aqui".
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const check = () => {
      const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 88;
      setIsStuck(el.getBoundingClientRect().top <= offset + HEADER_GAP + 0.5);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  // Reconduz o scroll pro início do conteúdo a cada troca de aba — ver
  // comentário do prop `activeValue`. `didMount` pula a primeíssima
  // renderização (senão "rolaria" no carregamento da página, sem nenhuma
  // troca ter acontecido). `behavior: "smooth"` é o mesmo usado no botão
  // "Voltar ao topo" da política de privacidade — convenção já
  // estabelecida no projeto pra esse tipo de scroll.
  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    const sentinel = sentinelRef.current;
    // offsetParent é null quando o elemento (ou um ancestral) está
    // `display:none` — caso de componentes com variantes desktop/mobile
    // sempre montadas mas alternadas por classe (`hidden lg:block` +
    // `lg:hidden`, ver DoresDiagnosticoSection): a variante escondida
    // compartilha o mesmo estado `activeValue` e dispararia este efeito
    // mesmo invisível, com `getBoundingClientRect()` zerado — sem essa
    // checagem, viraria um scroll fantasma competindo com o da variante
    // realmente visível.
    if (!sentinel || sentinel.offsetParent === null) return;

    const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 88;
    const target = sentinel.getBoundingClientRect().top + window.scrollY - offset - HEADER_GAP;

    // Só sobe: se o alvo já está acima de onde o usuário está (ele ainda
    // nem chegou lá), não empurra a página — só corrige quando rolar mais
    // pra baixo do que o início do conteúdo novo.
    if (window.scrollY - target < 40) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.max(target, 0), behavior: prefersReducedMotion ? "auto" : "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeValue]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px -mt-px" />
      <div
        ref={wrapperRef}
        className={cn("sticky z-40 top-[calc(var(--header-height,88px)+14px)]", className)}
      >
        {children(isStuck)}
      </div>
    </>
  );
}

export { StickyTabsList };
