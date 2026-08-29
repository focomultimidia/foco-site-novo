"use client";

import { useId, useState } from "react";
import { Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { PRODUTOS_DATA } from "@/features/shared/data/produtos-data";

// Mesmo princípio do CTA "Quero conhecer o Motor de Reservas" já existente
// no blog atual — o produto sugerido muda pelo `ctaProduct` do frontmatter
// (ex.: um post sobre cancelamento aponta pro Motor de Reservas, um post
// sobre concierge aponta pra Experiência do Hóspede), em vez de um mesmo
// CTA genérico em todo post. Casa `ctaProduct` (o slug da rota, sem barra —
// "motor-de-reservas") contra `link` de PRODUTOS (já existe, usado no
// showcase da home) em vez de duplicar nome/link do produto aqui.
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-[13.5px] text-[#132840] placeholder:text-slate-400 outline-none transition-colors focus:border-[#285992] focus:ring-4 focus:ring-[#285992]/10";

function ProductCtaInline({ ctaProduct }: { ctaProduct: string }) {
  const produto = PRODUTOS_DATA.find((p) => p.link === `/${ctaProduct}`);
  const id = useId();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!produto) return null;

  // Arrow function (não `function` nomeada) — assim o TS carrega a
  // checagem `if (!produto)` acima pro fechamento; uma declaração aninhada
  // não herda essa análise de fluxo da mesma forma.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock — mesmo padrão de submitMarketingLead em
    // marketing-para-hoteis/api/lead-api.ts (todo o backend do site ainda é
    // simulado). Troca por uma chamada real ao CRM/RD Station quando existir.
    await new Promise((r) => setTimeout(r, 900));
    console.info("[blog] Lead do CTA inline (mock):", { produto: produto.id, nome, email });
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="my-8 rounded-2xl border border-[#285992]/15 bg-[#285992]/[0.03] p-6">
      {isSuccess ? (
        <div className="flex items-center gap-3 py-2">
          <CheckCircle2 className="w-6 h-6 text-[#1a7e43] flex-shrink-0" strokeWidth={1.8} />
          <p className="text-[14px] text-[#1e3a5f]">Recebemos seu contato — nossa equipe retorna em breve.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#fccc30]" strokeWidth={2} />
            <span className="font-display font-semibold text-[#1e3a5f] text-[15px]">
              Quero conhecer o {produto.titulo.split(":")[0]}
            </span>
          </div>
          <p className="text-[13px] text-slate-600 mb-4">Preencha e ganhe uma consultoria gratuita com um dos nossos especialistas.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <label htmlFor={`${id}-nome`} className="sr-only">Nome</label>
            <input
              id={`${id}-nome`}
              name="nome"
              autoComplete="name"
              required
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={`${inputClass} sm:flex-1`}
            />
            <label htmlFor={`${id}-email`} className="sr-only">E-mail</label>
            <input
              id={`${id}-email`}
              name="email"
              autoComplete="email"
              required
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputClass} sm:flex-1`}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#285992] hover:bg-[#1e4d85] text-white text-[13.5px] font-semibold px-5 py-2.5 transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isSubmitting ? "Enviando..." : "Quero saber mais"}
            </button>
          </form>
          <p className="text-[11px] text-slate-600 mt-2.5">
            Não iremos fornecer, e nem utilizaremos essas informações para enviar mensagens indesejadas (SPAM).
          </p>
        </>
      )}
    </div>
  );
}

export { ProductCtaInline };
