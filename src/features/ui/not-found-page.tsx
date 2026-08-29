"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Calendar,
  CreditCard,
  Globe,
  LayoutGrid,
  Link2,
  Mail,
  Monitor,
  Smartphone,
} from "lucide-react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { BetaBadge } from "@/features/shared/components/beta-badge";

// ── Data ──────────────────────────────────────────────────────────────────────

interface ProdutoLink {
  label:       string;
  description: string;
  href:        string;
  icon:        React.ComponentType<{ className?: string }>;
  iconClass:   string;
  beta?:       boolean;
}

// Mesmo catálogo e cores do menu "Softwares Hoteleiro" do header — a 404
// vira uma segunda porta de entrada pro site inteiro em vez de um beco sem
// saída (antes só 4 dos 8 produtos apareciam aqui).
const PRODUTOS: ProdutoLink[] = [
  {
    label: "Site Hoteleiro",
    description: "Presença digital profissional para o seu hotel",
    href: "/sites-para-hoteis-e-pousadas",
    icon: Globe,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    label: "Motor de Reservas",
    description: "Venda direta sem comissões de OTAs",
    href: "/motor-de-reservas",
    icon: Calendar,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Channel Manager",
    description: "Sincronize +800 canais em tempo real",
    href: "/gestor-de-canais-channel-manager",
    icon: LayoutGrid,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    label: "Gestão Hoteleira (PMS)",
    description: "Controle total da operação do seu hotel",
    href: "/sistema-de-gestao-hoteleira-pms",
    icon: Monitor,
    iconClass: "bg-sky-50 text-sky-600",
  },
  {
    label: "Experiência do Hóspede",
    description: "Encante e fidelize quem se hospeda com você",
    href: "/aplicativo-de-hospedagem",
    icon: Smartphone,
    iconClass: "bg-orange-50 text-orange-600",
  },
  {
    label: "Software de Pagamentos",
    description: "Receba com segurança e PCI Compliance",
    href: "/software-de-pagamentos",
    icon: CreditCard,
    iconClass: "bg-pink-50 text-pink-600",
  },
  {
    label: "Otheo AI",
    description: "Inteligência Artificial no comando da sua operação",
    href: "/inteligencia-artificial-para-hoteis-e-pousadas",
    icon: Bot,
    iconClass: "bg-amber-50 text-amber-600",
    beta: true,
  },
  {
    label: "Integrações Hoteleiras",
    description: "Conecte seu hotel ao ecossistema digital",
    href: "/integracoes-hoteleiras",
    icon: Link2,
    iconClass: "bg-teal-50 text-teal-600",
  },
];

// ── ProdutoCard ───────────────────────────────────────────────────────────────

function ProdutoCard({ produto, delay }: { produto: ProdutoLink; delay: number }) {
  const Icon = produto.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        to={produto.href}
        className="group relative flex h-full flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5
                   shadow-[0_2px_10px_rgba(19,40,64,0.04)]
                   transition-all duration-300
                   hover:-translate-y-1 hover:border-[#285992]/25 hover:shadow-[0_16px_36px_rgba(19,40,64,0.10)]
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285992]/40"
      >
        <div className="flex items-start justify-between">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${produto.iconClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#285992]" />
        </div>

        <div className="text-left">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="font-display text-sm font-semibold tracking-tight text-[#132840]">
              {produto.label}
            </h3>
            {produto.beta && <BetaBadge />}
          </div>
          <p className="text-xs leading-relaxed text-slate-600">{produto.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

// ── NotFoundPage ──────────────────────────────────────────────────────────────

function NotFoundPage() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7fb] py-24 sm:py-28">
      {/* Numeral gigante em marca d'água — mesma linguagem mono/tracking largo
          do SectionEyebrow, só que em escala editorial, pra dar peso visual
          à página sem competir com o texto. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-14 -translate-x-1/2 select-none
                   font-mono text-[13rem] font-bold leading-none tracking-tighter text-[#132840]/[0.04]
                   sm:text-[17rem] lg:text-[20rem]"
      >
        404
      </span>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-xl text-center">
          <SectionEyebrow className="justify-center">Erro 404</SectionEyebrow>

          <h1 className="mb-5 font-display text-5xl font-bold leading-none tracking-tighter text-[#132840] sm:text-6xl">
            Essa página não existe
          </h1>
          <p className="mb-10 text-base leading-relaxed text-slate-600 sm:text-lg">
            O endereço pode ter mudado ou nunca existiu. Volte para o início ou
            explore o catálogo completo de soluções da Foco abaixo.
          </p>

          <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-br from-[#1e3a5f] via-[#285992] to-[#244248]
                         px-7 text-sm font-semibold text-white
                         shadow-[0_4px_22px_rgba(40,89,146,0.30)]
                         transition-transform duration-200 hover:scale-[1.03]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285992]/50"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para o início
            </Link>
            <a
              href="mailto:contato@focotec.com.br"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-[#1e3a5f]/20
                         px-7 text-sm font-semibold text-[#1e3a5f]
                         transition-colors duration-200 hover:bg-[#1e3a5f]/5
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285992]/40"
            >
              <Mail className="h-4 w-4" />
              Falar com a gente
            </a>
          </div>
        </div>

        {/* Catálogo de produtos */}
        <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
          <SectionEyebrow className="justify-center">Ou explore nossas soluções</SectionEyebrow>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUTOS.map((produto, i) => (
              <ProdutoCard key={produto.href} produto={produto} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { NotFoundPage };
