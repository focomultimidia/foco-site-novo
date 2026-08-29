"use client";

import { useId, useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

// Diferente do formulário cru na sidebar do blog atual — vive DENTRO do
// artigo (não só numa sidebar que some no mobile), e submete pro RD
// Station, a mesma automação de marketing já ativa no resto do site (ver
// rd-js-integration/rdtracker nas outras páginas) em vez de um serviço de
// e-mail novo.
function NewsletterInline() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock — integração real com o formulário RD Station entra na fase 2
    // do plano técnico (junto com a migração completa).
    console.info("[blog] Newsletter (mock):", { email });
    setIsSuccess(true);
  }

  return (
    <div className="my-10 rounded-2xl bg-[#132840] px-6 py-7 sm:px-8 sm:py-8">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
          <Mail className="w-4 h-4 text-[#fccc30]" strokeWidth={2} />
        </span>
        <div>
          <h4 className="font-display font-semibold text-white text-[17px]">Receba nossa newsletter</h4>
          <p className="text-[13.5px] text-blue-100/70 mt-0.5">Fique por dentro das novidades do mercado hoteleiro.</p>
        </div>
      </div>

      {isSuccess ? (
        <div className="flex items-center gap-2 text-[13.5px] text-white">
          <CheckCircle2 className="w-4 h-4 text-[#fccc30]" strokeWidth={2} />
          Inscrição confirmada.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
          <label htmlFor={id} className="sr-only">E-mail</label>
          <input
            id={id}
            name="email"
            autoComplete="email"
            required
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="sm:flex-1 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-[13.5px] text-white placeholder:text-blue-100/40 outline-none focus:border-[#fccc30]/60 focus:ring-4 focus:ring-[#fccc30]/10"
          />
          <button
            type="submit"
            className="rounded-xl bg-[#fccc30] hover:brightness-105 text-[#132840] text-[13.5px] font-semibold px-5 py-2.5 transition-all whitespace-nowrap"
          >
            Quero assinar
          </button>
        </form>
      )}
    </div>
  );
}

export { NewsletterInline };
