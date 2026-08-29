"use client";

import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  BadgeCheck,
  MoreHorizontal,
  Search,
  ChevronDown,
  Star,
  MapPin,
  Building2,
} from "lucide-react";

// ── Ad mockups ────────────────────────────────────────────────────────────────
// As 3 peças de anúncio que a Foco realmente gerencia (Meta Ads, Google Ads,
// Google Hotel Ads), recriadas em código — sem geração de imagem disponível
// nesta sessão. As fotos de hotel (Meta Ads e Google Hotel Ads) são as duas
// fornecidas em /assets/imgs/marketing-para-hoteis/ (hotel1.webp, hotel2.webp
// — convertidas de .jpg, mesmo padrão de otimização do resto do site), não
// mais o placeholder genérico reaproveitado de outra página. O que ainda não
// existe como asset real (mapa, chrome de UI) continua construído em código
// (SVG/gradiente), mesmo padrão de placeholder já usado em
// generic-info-section.tsx/product-showcase.tsx. Reaproveitado pelo
// HeroSection (em leque, escala reduzida) e pelo CanaisSection (tamanho
// cheio, uma por aba).

const HOTEL_PHOTO_META_ADS = "/assets/imgs/marketing-para-hoteis/hotel2.webp";
const HOTEL_PHOTO_HOTEL_ADS = "/assets/imgs/marketing-para-hoteis/hotel1.webp";

const cardShadow = "0 8px 20px -14px rgba(15,40,80,0.20), 0 34px 70px -34px rgba(15,40,80,0.42)";

// Mesmo quarto, preço mais alto em cada OTA — o contraste com o preço do
// site oficial é o próprio argumento de venda da página. Logo real de cada
// canal, já usado no diagrama de integrações do channel-manager (mesma
// pasta), em vez do bolinha-de-cor genérica que existia aqui antes.
const OTAS_COMPARACAO = [
  { nome: "Booking.com", preco: "780", logo: "/assets/imgs/channel-manager/icones-canais/booking.svg" },
  { nome: "Decolar", preco: "795", logo: "/assets/imgs/channel-manager/icones-canais/decolar.svg" },
  { nome: "Expedia", preco: "810", logo: "/assets/imgs/channel-manager/icones-canais/expedia.svg" },
  { nome: "Airbnb", preco: "760", logo: "/assets/imgs/channel-manager/icones-canais/airbnb.svg" },
] as const;

// ── InstagramAdMockup ─────────────────────────────────────────────────────────
// `eager` — este componente é reaproveitado em dois contextos bem diferentes:
// no leque da hero (acima da dobra, precisa carregar imediatamente) e numa
// aba do CanaisSection (abaixo da dobra, pode continuar lazy). Sem essa
// prop, a foto sempre nascia com loading="lazy" — inofensivo na aba, mas
// atrasava o carregamento de um elemento visível de cara na hero (achado
// numa varredura com Playwright em todas as rotas do site).
function InstagramAdMockup({ className = "", eager = false }: { className?: string; eager?: boolean }) {
  return (
    <div
      className={`w-[300px] shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-900/10 ${className}`}
      style={{ boxShadow: cardShadow }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-3.5 py-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full p-[2px]"
          style={{ background: "linear-gradient(135deg,#fccc30,#285992,#427ab9)" }}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
            <Building2 className="h-3.5 w-3.5 text-[#285992]" strokeWidth={2} />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate text-[13px] font-semibold text-slate-900">seuhotel.oficial</span>
            <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-[#3897f0]" fill="#3897f0" strokeWidth={0} />
          </div>
          <span className="text-[11px] text-slate-600">Publi · Patrocinado</span>
        </div>
        <MoreHorizontal className="h-4 w-4 shrink-0 text-slate-400" />
      </div>

      {/* "Foto" — foto real de hotel, com um scrim escuro embaixo pra
          headline continuar legível por cima. */}
      <div className="relative flex aspect-square items-end overflow-hidden p-5">
        <img
          src={HOTEL_PHOTO_META_ADS}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,20,35,0.85) 0%, rgba(10,20,35,0.15) 60%, transparent 100%)" }}
        />
        <p className="relative font-display text-xl font-semibold leading-tight text-white">
          Experiência 5 estrelas.
          <br />
          Reserva direta.
        </p>
      </div>

      {/* Engajamento */}
      <div className="px-3.5 pt-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <Heart className="h-[22px] w-[22px] text-slate-800" strokeWidth={1.8} />
            <MessageCircle className="h-[22px] w-[22px] text-slate-800" strokeWidth={1.8} />
            <Send className="h-[22px] w-[22px] text-slate-800" strokeWidth={1.8} />
          </div>
          <Bookmark className="h-[22px] w-[22px] text-slate-800" strokeWidth={1.8} />
        </div>
        <p className="mt-2 text-[12.5px] font-semibold text-slate-900">1.204 curtidas</p>
        <p className="mt-0.5 text-[12.5px] leading-snug text-slate-600">
          <span className="font-semibold text-slate-900">seuhotel.oficial</span> Pacote com café da manhã incluso — reserve direto e economize a comissão da OTA.
        </p>
      </div>

      {/* Rodapé — CTA do anúncio */}
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 px-3.5 py-2.5">
        <span className="text-[11px] text-slate-600">seuhotel.com.br</span>
        <span className="text-[12px] font-semibold text-[#285992]">Reservar →</span>
      </div>
    </div>
  );
}

// ── GoogleSearchAdMockup ──────────────────────────────────────────────────────
// `eager` aceito só por consistência de props com os outros dois mockups
// (não tem `<img>` própria — é composto, sem foto real).
function GoogleSearchAdMockup({ className = "" }: { className?: string; eager?: boolean }) {
  return (
    <div
      className={`w-[320px] shrink-0 rounded-2xl bg-white p-5 ring-1 ring-slate-900/10 ${className}`}
      style={{ boxShadow: cardShadow }}
    >
      {/* Barra de busca — só pra dar o contexto "isto é um resultado de busca" */}
      <div className="mb-4 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2">
        <Search className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        <span className="truncate text-[12.5px] text-slate-600">hotel em porto de galinhas</span>
      </div>

      {/* Bloco do anúncio */}
      <div className="flex items-center gap-2">
        <span className="rounded px-1.5 py-0.5 text-[11px] font-bold text-white" style={{ background: "#1a7e43" }}>
          Ad
        </span>
        <span className="truncate text-[12.5px] text-slate-700">www.seuhotel.com.br</span>
        <ChevronDown className="h-3 w-3 shrink-0 text-slate-400" />
      </div>
      <p className="mt-1 text-[17px] font-medium leading-snug" style={{ color: "#1a0dab" }}>
        Reserve Direto e Economize | Site Oficial do Hotel
      </p>
      <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
        Tarifa exclusiva do site, sem comissão de OTA. Café da manhã incluso, cancelamento flexível e confirmação imediata.
      </p>

      {/* Sitelinks */}
      <div className="mt-3.5 grid grid-cols-2 gap-x-5 gap-y-1.5 border-t border-slate-100 pt-3.5">
        {["Ver quartos", "Promoções", "Café da manhã incluso", "Fale conosco"].map((label) => (
          <span key={label} className="text-[12.5px] hover:underline" style={{ color: "#1a0dab" }}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── MiniMap ───────────────────────────────────────────────────────────────────
// Mapa estilizado (sem API de mapa real disponível nesta sessão) — fundo cor
// de "papel de mapa", ruas em traço claro e um pino marcando o hotel, com o
// círculo de raio translúcido que o Google Maps usa pra indicar "é aqui".
function MiniMap() {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "#e4e9ee" }}>
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 150 112" preserveAspectRatio="none">
        <path d="M0,32 L150,46" stroke="#ffffff" strokeWidth="3.5" />
        <path d="M0,82 L150,68" stroke="#ffffff" strokeWidth="3.5" />
        <path d="M38,0 L58,112" stroke="#ffffff" strokeWidth="3" />
        <path d="M112,0 L96,112" stroke="#ffffff" strokeWidth="2.5" />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "rgba(40,89,146,0.20)" }}
        />
        <MapPin className="relative h-5 w-5 -translate-y-1.5" fill="#e11d2e" stroke="#ffffff" strokeWidth={1.25} />
      </div>
    </div>
  );
}

// ── GoogleHotelAdsMockup ──────────────────────────────────────────────────────
// `eager` — mesmo motivo do InstagramAdMockup acima (reaproveitado na hero e
// numa aba do CanaisSection).
function GoogleHotelAdsMockup({ className = "", eager = false }: { className?: string; eager?: boolean }) {
  return (
    <div
      className={`w-[300px] shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-900/10 ${className}`}
      style={{ boxShadow: cardShadow }}
    >
      {/* Foto do hotel + mapa de localização lado a lado — o par que o
          módulo real do Google Hotel Ads sempre mostra. */}
      <div className="grid h-28 grid-cols-2 gap-[2px]">
        <div className="relative overflow-hidden">
          <img
            src={HOTEL_PHOTO_HOTEL_ADS}
            alt=""
            className="h-full w-full object-cover"
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            decoding="async"
          />
          <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/40 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
            +12 fotos
          </span>
        </div>
        <MiniMap />
      </div>

      <div className="p-4">
        <p className="font-display text-[15px] font-semibold leading-snug text-slate-900">
          Seu Hotel — Site Oficial
        </p>

        <div className="mt-1 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3" fill="#fbbc04" stroke="#fbbc04" />
          ))}
          <span className="ml-1 text-[11.5px] text-slate-500">4,8 (612)</span>
        </div>

        <div className="mt-1.5 flex items-center gap-1 text-[11.5px] text-slate-500">
          <MapPin className="h-3 w-3 shrink-0" />
          <span>1,2 km do centro</span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-[12px] text-slate-500 line-through">R$ 780</span>
          <span className="text-[19px] font-bold text-slate-900">R$ 620</span>
          <span className="text-[11px] text-slate-500">/ noite</span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1">
            <BadgeCheck className="h-3.5 w-3.5 text-[#1a7e43]" />
            <span className="text-[11px] font-medium text-[#1a7e43]">Site Oficial</span>
          </div>
          <span className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-white" style={{ background: "#285992" }}>
            Reservar
          </span>
        </div>

        {/* Comparação — o mesmo quarto custando mais em cada OTA é o próprio
            argumento pra reserva direta, não precisa de texto extra explicando. */}
        <div className="mt-3 border-t border-slate-100 pt-3">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-slate-500">
            Mesmo quarto, em outros canais
          </p>
          <ul className="flex flex-col gap-1.5">
            {OTAS_COMPARACAO.map((ota) => (
              <li key={ota.nome} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[11.5px] text-slate-500">
                  <img src={ota.logo} alt="" className="h-4 w-4 shrink-0 rounded-full" loading="lazy" decoding="async" />
                  {ota.nome}
                </span>
                <span className="text-[11.5px] font-medium text-slate-500">R$ {ota.preco}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export { InstagramAdMockup, GoogleSearchAdMockup, GoogleHotelAdsMockup };
