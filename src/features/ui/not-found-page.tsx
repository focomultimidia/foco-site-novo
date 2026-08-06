"use client";

import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";

const LINKS_UTEIS = [
  { label: "Motor de Reservas", href: "/motor-de-reservas" },
  { label: "Channel Manager", href: "/channel-manager" },
  { label: "Gestão Hoteleira (PMS)", href: "/gestao-hoteleira" },
  { label: "Site Hoteleiro", href: "/site-hoteleiro" },
];

function NotFoundPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#f4f7fb] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-xl">
        <SectionEyebrow className="justify-center">Erro 404</SectionEyebrow>

        <h1 className="font-display text-5xl sm:text-6xl font-bold text-[#132840] tracking-tighter leading-none mb-5">
          Essa página não existe
        </h1>
        <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-10">
          O endereço pode ter mudado ou nunca existiu. Volte para o início ou
          escolha um dos produtos abaixo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 h-12 rounded-full text-white text-sm font-semibold
                       bg-gradient-to-br from-[#1e3a5f] via-[#285992] to-[#244248]
                       shadow-[0_4px_22px_rgba(40,89,146,0.30)]
                       transition-transform duration-200 hover:scale-[1.03]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285992]/50"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o início
          </Link>
          <a
            href="mailto:contato@focotec.com.br"
            className="inline-flex items-center gap-2 px-7 h-12 rounded-full text-sm font-semibold text-[#1e3a5f]
                       border border-[#1e3a5f]/20 transition-colors duration-200 hover:bg-[#1e3a5f]/5
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285992]/40"
          >
            <Search className="w-4 h-4" />
            Falar com a gente
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {LINKS_UTEIS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-slate-500 hover:text-[#285992] transition-colors underline underline-offset-4 decoration-slate-300 hover:decoration-[#285992]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export { NotFoundPage };
