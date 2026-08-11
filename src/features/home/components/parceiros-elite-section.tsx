"use client";

import { motion } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────
// Logos em `public/assets/imgs/parceiros-elite/` — parceiros estratégicos do
// ecossistema Foco (pagamentos, distribuição, atendimento, consultoria...).
// Nome exibido no rótulo de cada tile vem do próprio arquivo, sem categorizar
// o parceiro (evita afirmar algo sobre a natureza da parceria que não foi
// confirmado).

interface Parceiro {
  id: string;
  nome: string;
  logo: string;
}

const parceiros: Parceiro[] = [
  { id: "asksuite",          nome: "Asksuite",          logo: "/assets/imgs/parceiros-elite/asksuite.webp" },
  { id: "b2breservas",       nome: "B2B Reservas",       logo: "/assets/imgs/parceiros-elite/b2breservas.webp" },
  { id: "decolar",           nome: "Decolar",            logo: "/assets/imgs/parceiros-elite/decolar.webp" },
  { id: "expedia",           nome: "Expedia",            logo: "/assets/imgs/parceiros-elite/expedia.webp" },
  { id: "hotei-rev",         nome: "Hotei Rev",          logo: "/assets/imgs/parceiros-elite/hotei-rev.webp" },
  { id: "registrou-marcas",  nome: "Registrou Marcas",   logo: "/assets/imgs/parceiros-elite/registrou-marcas.webp" },
  { id: "reprotel",          nome: "Reprotel",           logo: "/assets/imgs/parceiros-elite/reprotel.webp" },
  { id: "stone",             nome: "Stone",              logo: "/assets/imgs/parceiros-elite/stone.webp" },
  { id: "storm",             nome: "Storm",              logo: "/assets/imgs/parceiros-elite/storm.webp" },
  { id: "tribuzana",         nome: "Tribuzana",          logo: "/assets/imgs/parceiros-elite/tribuzana.webp" },
  { id: "viver-de-pousada",  nome: "Viver de Pousada",   logo: "/assets/imgs/parceiros-elite/viver-de-pousada.webp" },
];

// ── Variants ──────────────────────────────────────────────────────────────────

const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.055 } },
};

const tileVariants = {
  hidden:  { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// ── PartnerTile ───────────────────────────────────────────────────────────────
// Logo em silhueta branca por padrão (filtro monocromático) — unifica o
// "ruído" de 11 paletas de marca bem diferentes num mesmo painel escuro — e
// revela a cor real no hover, como um selo que "acende" ao ser tocado.

function PartnerTile({ parceiro }: { parceiro: Parceiro }) {
  return (
    <motion.div
      variants={tileVariants}
      className="group relative flex w-[152px] sm:w-[172px] flex-shrink-0 flex-col items-center justify-between gap-3 rounded-2xl border border-white/10 px-5 py-5 h-[136px] cursor-default transition-colors duration-300 hover:border-[#fccc30]/40"
      style={{
        background: "rgba(16,35,61,0.55)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Glow dourado sutil ao hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: "0 0 0 1px rgba(252,204,48,0.12), 0 16px 40px -18px rgba(252,204,48,0.35)" }}
      />

      <div className="flex flex-1 items-center justify-center">
        <img
          src={parceiro.logo}
          alt={parceiro.nome}
          width={220}
          height={80}
          loading="lazy"
          decoding="async"
          className="max-h-9 sm:max-h-10 max-w-[110px] sm:max-w-[124px] object-contain opacity-70 transition-all duration-300 group-hover:opacity-100"
          style={{ filter: "grayscale(1) brightness(0) invert(1)" }}
          onMouseEnter={(e) => { e.currentTarget.style.filter = "none"; }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(1) brightness(0) invert(1)"; }}
        />
      </div>

      <div className="h-px w-8 bg-white/15 transition-colors duration-300 group-hover:bg-[#fccc30]/40" />

      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40 transition-colors duration-300 group-hover:text-[#fccc30]/90">
        {parceiro.nome}
      </span>
    </motion.div>
  );
}

// ── ParceirosEliteSection ───────────────────────────────────────────────────

function ParceirosEliteSection() {
  return (
    <section className="relative py-24 sm:py-28 overflow-hidden bg-[#10233d]">
      {/* Aurora — mesmo vocabulário visual da hero, bem mais discreta aqui
          (opacidade baixa, só pra tirar a chapadura do azul sólido). */}
      <div aria-hidden="true" className="absolute -inset-[10%] -z-0 overflow-hidden" style={{ filter: "blur(60px)", opacity: 0.5 }}>
        <div
          className="absolute w-[420px] h-[420px] -left-24 top-1/3 rounded-full motion-safe:animate-aurora-a"
          style={{ background: "radial-gradient(circle, rgba(66,122,185,0.55), transparent 70%)" }}
        />
        <div
          className="absolute w-[380px] h-[380px] -right-20 -bottom-24 rounded-full motion-safe:animate-aurora-c"
          style={{ background: "radial-gradient(circle, rgba(252,204,48,0.14), transparent 70%)" }}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2.5 border border-white/15 bg-white/8 backdrop-blur-sm text-white px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] mb-6">
            <span className="w-1.5 h-1.5 bg-[#fccc30] rounded-full" />
            Parceiros elite
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-white leading-none tracking-tighter antialiased mb-4">
            Ao lado de quem é{" "}
            <span className="bg-gradient-to-r from-[#fccc30] via-[#ffe28a] to-[#fccc30] bg-clip-text text-transparent">
              referência no mercado
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Construímos nosso ecossistema ao lado de parceiros estratégicos,
            altamente engajados. Cada parceiro representa uma integração
            testada, aprovada e em uso todos os dias pelos nossos clientes.
          </p>
        </motion.div>

        {/* Painel de logos */}
        <motion.div
          className="flex flex-wrap items-stretch justify-center gap-4 sm:gap-5"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {parceiros.map((parceiro) => (
            <PartnerTile key={parceiro.id} parceiro={parceiro} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { ParceirosEliteSection };
