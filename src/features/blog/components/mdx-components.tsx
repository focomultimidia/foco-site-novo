"use client";

import type { ComponentPropsWithoutRef } from "react";
import { Callout } from "@/features/shared/components/callout";
import { Info } from "lucide-react";
import type { TocItem } from "../types";
import { ProductCtaInline } from "./product-cta-inline";
import { NewsletterInline } from "./newsletter-inline";

// ── getMdxComponents ──────────────────────────────────────────────────────────
// Fábrica (não um objeto fixo) porque o h2/h3 precisa saber o `numero` de
// CADA post pra exibir o numeral em mono — mesma linguagem visual de
// PolicySection em politica-de-privacidade/components/policy-content.tsx —
// e esse numero só existe depois que scripts/remark-heading-tree.mjs já
// processou aquele post específico. `BlogPostPage` chama isso uma vez por
// post, passando o `toc` já resolvido.
//
// `<ProductCta />` e `<Newsletter />` ficam disponíveis pra quem ESCREVE o
// post usar como uma tag comum, direto no `.mdx`, em qualquer ponto do
// texto — é assim que o CTA contextual reproduz o comportamento do blog
// atual (aparecia no meio do artigo, não sempre no mesmo lugar fixo):
// quem escreve decide onde, não um cálculo automático de posição.
export function getMdxComponents(toc: TocItem[], ctaProduct: string) {
  function numeroFor(id?: string) {
    return toc.find((item) => item.id === id)?.numero;
  }

  return {
    h2(props: ComponentPropsWithoutRef<"h2">) {
      const { id, children, ...rest } = props;
      return (
        <h2 id={id} className="scroll-mt-24 mt-12 mb-4 flex items-baseline gap-3" {...rest}>
          <span className="font-mono text-sm text-[#285992] font-semibold flex-shrink-0">{numeroFor(id)}</span>
          <span className="font-display text-2xl sm:text-[26px] font-semibold text-[#1e3a5f] tracking-tight leading-tight">
            {children}
          </span>
        </h2>
      );
    },
    h3(props: ComponentPropsWithoutRef<"h3">) {
      const { id, children, ...rest } = props;
      return (
        <h3 id={id} className="scroll-mt-24 mt-8 mb-3 flex items-baseline gap-2.5 pl-[calc(theme(fontSize.sm)+0.75rem)]" {...rest}>
          <span className="font-mono text-[11px] text-[#285992] font-semibold flex-shrink-0">{numeroFor(id)}</span>
          <span className="font-display text-lg font-semibold text-[#1e3a5f] tracking-tight">{children}</span>
        </h3>
      );
    },
    p(props: ComponentPropsWithoutRef<"p">) {
      return <p className="text-slate-600 text-[15.5px] leading-relaxed mb-5" {...props} />;
    },
    ul(props: ComponentPropsWithoutRef<"ul">) {
      return <ul className="list-disc pl-5 text-slate-600 text-[15.5px] leading-relaxed mb-5 space-y-1.5" {...props} />;
    },
    ol(props: ComponentPropsWithoutRef<"ol">) {
      return <ol className="list-decimal pl-5 text-slate-600 text-[15.5px] leading-relaxed mb-5 space-y-1.5" {...props} />;
    },
    strong(props: ComponentPropsWithoutRef<"strong">) {
      return <strong className="text-[#1e3a5f] font-semibold" {...props} />;
    },
    a(props: ComponentPropsWithoutRef<"a">) {
      const isInternal = props.href?.startsWith("/");
      return (
        <a
          className="text-[#285992] font-medium underline decoration-[#285992]/30 hover:decoration-[#285992] underline-offset-2"
          target={isInternal ? undefined : "_blank"}
          rel={isInternal ? undefined : "noopener noreferrer"}
          {...props}
        />
      );
    },
    // Bloco `> texto` do Markdown — mesmo Callout usado na política de
    // privacidade, com o ícone fixo em "informativo" (é o uso mais comum
    // dentro de um post: ressalva, aviso, contexto adicional).
    blockquote(props: ComponentPropsWithoutRef<"blockquote">) {
      return (
        <div className="my-6">
          <Callout icon={Info}>
            <div className="[&>p]:mb-0 [&>p]:text-slate-600 [&>p]:text-[14px]">{props.children}</div>
          </Callout>
        </div>
      );
    },
    table(props: ComponentPropsWithoutRef<"table">) {
      return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm border-collapse" {...props} />
        </div>
      );
    },
    thead(props: ComponentPropsWithoutRef<"thead">) {
      return <thead className="bg-[#285992]/[0.05]" {...props} />;
    },
    th(props: ComponentPropsWithoutRef<"th">) {
      return <th className="text-left font-semibold text-[#1e3a5f] px-4 py-3 border-b border-slate-200" {...props} />;
    },
    td(props: ComponentPropsWithoutRef<"td">) {
      return <td className="text-slate-600 px-4 py-3 border-b border-slate-100 align-top" {...props} />;
    },
    code(props: ComponentPropsWithoutRef<"code">) {
      return <code className="bg-[#285992]/[0.06] text-[#1e3a5f] rounded px-1.5 py-0.5 text-[13.5px]" {...props} />;
    },
    img(props: ComponentPropsWithoutRef<"img">) {
      return (
        <img
          className="w-full rounded-2xl my-6"
          loading="lazy"
          decoding="async"
          {...props}
        />
      );
    },
    ProductCta: () => <ProductCtaInline ctaProduct={ctaProduct} />,
    Newsletter: () => <NewsletterInline />,
  };
}
