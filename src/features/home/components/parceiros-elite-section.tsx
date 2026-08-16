"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Handshake, Award } from "lucide-react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { useParceirosEliteScroll } from "../hooks/use-parceiros-elite-scroll";

// ── Data ──────────────────────────────────────────────────────────────────────
// Logos em `public/assets/imgs/parceiros-elite/` — parceiros estratégicos do
// ecossistema Foco (pagamentos, distribuição, atendimento, consultoria...).
// Axé Benefícios fica sempre em primeiro (pedido explícito), o resto segue a
// ordem em que foi cadastrado.

interface Parceiro {
  id: string;
  nome: string;
  logo: string;
  resumo: string;
}

const parceiros: Parceiro[] = [
  {
    id: "axe-beneficios", nome: "Axé Benefícios",
    logo: "/assets/imgs/parceiros-elite/logo-axe-beneficios.svg",
    resumo: "Solução de saúde corporativa com telemedicina 24h, psicologia e TotalPass para colaboradores, com implementação rápida e sem burocracia.",
  },
  {
    id: "asksuite", nome: "Asksuite",
    logo: "/assets/imgs/parceiros-elite/asksuite.svg",
    resumo: "Chatbot e plataforma de atendimento multicanal (WhatsApp, redes sociais, site) focado em automatizar e aumentar as reservas diretas dos hotéis.",
  },
  {
    id: "b2breservas", nome: "B2B Reservas",
    logo: "/assets/imgs/parceiros-elite/b2breservas.svg",
    resumo: "A B2B Reservas conecta hotéis e pousadas a centenas de agências e operadoras, ampliando vendas e fortalecendo a distribuição hoteleira.",
  },
  {
    id: "decolar", nome: "Decolar",
    logo: "/assets/imgs/parceiros-elite/decolar.svg",
    resumo: "Cadastre seu hotel com suporte da Foco, ganhe comissão especial e destaque sua propriedade na Decolar.com com voucher exclusivo.",
  },
  {
    id: "expedia", nome: "Expedia",
    logo: "/assets/imgs/parceiros-elite/expedia.svg",
    resumo: "Cadastre seu hotel com o apoio da Foco, aproveite comissionamento reduzido por 180 dias e acesse a distribuição global e B2B do Expedia.",
  },
  {
    id: "hotei-rev", nome: "Hotel Rev",
    logo: "/assets/imgs/parceiros-elite/hotei-rev.svg",
    resumo: "Consultoria e administração de vendas com estratégias de RM, marketing e inovação que aumentam receita, ocupação e vendas diretas.",
  },
  {
    id: "registrou-marcas", nome: "Registrou Marcas",
    logo: "/assets/imgs/parceiros-elite/registroumarcas.svg",
    resumo: "Ter CNPJ, site, domínio ou conta na Booking.com não protege o nome do seu hotel. A única forma de garantir exclusividade legal sobre a sua marca é registrando no INPI.",
  },
  {
    id: "reprotel", nome: "Reprotel",
    logo: "/assets/imgs/parceiros-elite/reprotel.svg",
    resumo: "Reprotel oferece sistemas completos para hotéis e pousadas, integrando reservas, finanças e canais de venda para mais eficiência, economia e resultados.",
  },
  {
    id: "stone", nome: "Stone",
    logo: "/assets/imgs/parceiros-elite/stone.svg",
    resumo: "Transforme a experiência de pagamento do seu hóspede com Pix, cartão e maquininhas integrados ao sistema Foco, sem complicação.",
  },
  {
    id: "storm", nome: "Storm",
    logo: "/assets/imgs/parceiros-elite/storm.svg",
    resumo: "Na Storm, unimos branding estratégico e identidade visual para posicionar sua empresa com autoridade e atrair clientes certos.",
  },
  {
    id: "tribuzana", nome: "Tribuzana",
    logo: "/assets/imgs/parceiros-elite/tribuzana.svg",
    resumo: "Autoridade no segmento, há mais de 10 anos ao lado dos hoteleiros com soluções que unem estratégia e tecnologia para transformar meios de hospedagem.",
  },
  {
    id: "viver-de-pousada", nome: "Viver de Pousada",
    logo: "/assets/imgs/parceiros-elite/viver-de-pousada.webp",
    resumo: "O Viver de Pousada desenvolve consultorias, mentorias e treinamentos personalizados para seu hotel ou pousada lucrar o ano todo.",
  },
];

// Esteira do desktop precisa de uma lista DUPLICADA — mesma técnica do
// TrustedLogosMarquee (loop sem-costura: metade 1 e metade 2 são idênticas,
// então o salto do fim pro começo é imperceptível).
const parceirosLoop = [...parceiros, ...parceiros];

// Altura COMPARTILHADA entre o card principal e os cards de logo — pedido
// explícito ("mesma altura"). Um único ponto de ajuste pros dois.
const CARD_HEIGHT = "h-[300px] lg:h-[320px]";

// ── PartnerTile ───────────────────────────────────────────────────────────────
// Card branco sólido, SEM sombra (pedido explícito — plano, só a borda
// marca o contorno) — a logo fica sempre com suas cores originais (sem
// silhueta/hover), o card branco já basta pra unificar as 11 paletas de
// marca diferentes num mesmo painel. Mesma altura do EliteBadgeCard
// (CARD_HEIGHT) e mesma "família" visual (rounded-3xl, borda) — os dois
// conjuntos lado a lado devem ler como membros do mesmo grupo, só que um é
// o destaque (escuro) e os outros o coro (branco). Sem motion próprio: no
// desktop vive dentro da esteira controlada por GSAP (ver
// use-parceiros-elite-scroll.ts), no mobile vive dentro da esteira CSS/
// Framer em loop infinito (ver ParceirosEliteSection).
function PartnerTile({ parceiro }: { parceiro: Parceiro }) {
  return (
    <div
      className={`group relative flex w-[220px] lg:w-[240px] flex-shrink-0 flex-col rounded-3xl border border-slate-100 bg-white px-6 py-6 cursor-default transition-colors duration-300 hover:border-[#fccc30]/50 ${CARD_HEIGHT}`}
    >
      {/* Glow dourado sutil ao hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: "0 0 0 1px rgba(252,204,48,0.25), 0 16px 40px -18px rgba(252,204,48,0.35)" }}
      />

      <div className="flex items-center justify-center h-12 mb-5">
        <img
          src={parceiro.logo}
          alt={parceiro.nome}
          width={220}
          height={80}
          loading="lazy"
          decoding="async"
          className="max-h-10 max-w-[150px] object-contain"
        />
      </div>

      <div className="h-px w-8 bg-slate-200 transition-colors duration-300 group-hover:bg-[#fccc30]/60 mb-4" />

      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#285992] mb-2.5">
        {parceiro.nome}
      </span>

      <p className="text-slate-500 text-[12.5px] leading-relaxed line-clamp-6">
        {parceiro.resumo}
      </p>
    </div>
  );
}

// ── EliteBadgeCard ────────────────────────────────────────────────────────────
// O selo "Foco Elite Partner" — card principal do efeito. No desktop, o
// `ref` é o alvo direto do GSAP (use-parceiros-elite-scroll.ts: `x`, opacity,
// scale, y são todos manipulados nele); no fallback mobile, entra sozinho
// via `whileInView` (ver bloco `!usePinnedElite` abaixo). Por isso NENHUM
// estilo de posicionamento (absolute/left/top) vive aqui dentro — quem
// posiciona é sempre o chamador, via `className`. Conteúdo interno em
// `h-full flex-col justify-between` pra se espalhar bem na altura
// compartilhada com PartnerTile (ver CARD_HEIGHT), em vez de ficar
// encolhido no topo de um card mais alto que o necessário.
const EliteBadgeCard = forwardRef<HTMLDivElement, { className?: string }>(
  function EliteBadgeCard({ className = "" }, ref) {
    return (
      <div
        ref={ref}
        className={`relative rounded-[28px] will-change-transform ${className}`}
        style={{ boxShadow: "0 30px 70px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(252,204,48,0.14)" }}
      >
        {/* Camada de recorte separada da camada da sombra: o halo dourado
            precisa de `overflow-hidden` pra ser cortado pelos cantos
            arredondados, mas se esse corte vivesse no MESMO elemento do
            `boxShadow` do wrapper acima, ele cortaria a própria sombra
            externa do card junto (overflow:hidden recorta toda a pintura
            do elemento, sombra inclusa) — era a causa da sombra "cortada". */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/10"
          style={{ background: "linear-gradient(155deg, #1c3c5e 0%, #0d1d33 100%)" }}
        >
          {/* Halo dourado no canto — mesmo vocabulário da aurora do painel */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(252,204,48,0.28), transparent 70%)" }}
          />

          <div className="relative z-10 h-full flex flex-col justify-between gap-5 p-6 lg:p-7">
            {/* Logo real do selo — já contém o wordmark "Foco Elite Partner",
                por isso não repetimos o nome em texto aqui embaixo (era
                redundante com um <h3> antes desta logo existir). */}
            <img
              src="/assets/imgs/parceiros-elite/logo-foco-elite-partner.svg"
              alt="Foco Elite Partner"
              width={289}
              height={101}
              className="w-full h-auto object-contain"
            />

            <div>
              <p className="text-white/55 text-[13px] leading-relaxed">
                Programa de parceria estratégica do ecossistema Foco: o selo que
                reúne as integrações mais testadas e confiáveis da plataforma.
              </p>
            </div>

            <div>
              <div className="h-px bg-white/10 mb-4" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-[#fccc30]" strokeWidth={1.8} />
                  <span className="text-white/70 text-xs font-medium">
                    {parceiros.length} integrações parceiras
                  </span>
                </div>
                <Award className="w-5 h-5 text-[#fccc30]/70" strokeWidth={1.6} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

// ── ParceirosEliteSection ───────────────────────────────────────────────────

function ParceirosEliteSection() {
  // Pin + parallax só em desktop largo + sem reduced-motion — mesmo critério
  // de `canScrollytell`/`useHorizontalScroll` já usado na hero e em
  // EventosSection. Fora dessa condição, a seção nem monta a variante
  // pinada (ver comentário em use-eventos-scroll.ts sobre por que isso não
  // pode ser só `display:none`: o GSAP mede a largura real da esteira pra
  // calcular a distância do pin, e um elemento oculto mede 0).
  const [usePinnedElite, setUsePinnedElite] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const widthMq = window.matchMedia("(min-width: 1024px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setUsePinnedElite(widthMq.matches && !motionMq.matches);
    update();
    widthMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);
    return () => {
      widthMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  const sectionRef    = useRef<HTMLElement>(null);
  const mainCardRef   = useRef<HTMLDivElement>(null);
  const logosWrapRef  = useRef<HTMLDivElement>(null);
  const logosTrackRef = useRef<HTMLDivElement>(null);

  useParceirosEliteScroll(usePinnedElite, sectionRef, mainCardRef, logosWrapRef, logosTrackRef);

  return (
    <>
      {/* ── Desktop — pin + card deslizando + esteira em loop infinito ──── */}
      {usePinnedElite && (
        <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#f4f7fb]">
          <div className="relative z-10 h-full flex flex-col justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-4"
              >
                <SectionEyebrow>Parceiros elite</SectionEyebrow>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
                  Ao lado de quem é{" "}
                  <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
                    referência no mercado
                  </span>
                </h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                  Construímos nosso ecossistema ao lado de parceiros estratégicos,
                  altamente engajados: cada logo abaixo é uma integração testada,
                  aprovada e em uso todos os dias pelos nossos clientes.
                </p>
              </motion.div>

              {/* Palco do efeito — card principal + esteira, ambos centralizados
                  verticalmente e posicionados via `absolute` (o GSAP manipula
                  `x`/opacity/scale diretamente nos nós via ref). */}
              <div className={`relative mt-14 lg:mt-16 ${CARD_HEIGHT}`}>
                <div
                  ref={logosWrapRef}
                  className="absolute left-[188px] lg:left-[210px] right-0 top-0 bottom-0 z-10 overflow-hidden"
                >
                  <div ref={logosTrackRef} className={`flex items-stretch gap-4 lg:gap-5 w-max will-change-transform ${CARD_HEIGHT}`}>
                    {parceirosLoop.map((parceiro, i) => (
                      <PartnerTile key={`${parceiro.id}-${i}`} parceiro={parceiro} />
                    ))}
                  </div>

                  {/* Fade só na borda de saída (direita) — na borda de entrada
                      (onde as logos emergem de trás do card) NÃO existe fade
                      nenhum, pedido explícito: a revelação ali é só o
                      `overflow-hidden` cortando quem ainda não "chegou". */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f4f7fb] to-transparent" />
                </div>

                <EliteBadgeCard
                  ref={mainCardRef}
                  className={`absolute left-0 top-0 z-30 w-[300px] lg:w-[328px] ${CARD_HEIGHT}`}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Mobile / tablet / reduced-motion — selo estático + grid com
          stagger reveal (o mesmo efeito que a seção sempre teve). ────────── */}
      {!usePinnedElite && (
        <section className="relative py-24 sm:py-28 overflow-hidden bg-[#f4f7fb]">
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <SectionEyebrow>Parceiros elite</SectionEyebrow>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
                Ao lado de quem é{" "}
                <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
                  referência no mercado
                </span>
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                Construímos nosso ecossistema ao lado de parceiros estratégicos,
                altamente engajados. Cada parceiro representa uma integração
                testada, aprovada e em uso todos os dias pelos nossos clientes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center mb-10"
            >
              <EliteBadgeCard className="w-full max-w-[360px] h-[300px]" />
            </motion.div>

            {/* Esteira em loop infinito — mesma técnica do TrustedLogosMarquee
                (animate x: 0% → -50% em loop linear, sobre uma lista
                DUPLICADA, então o salto do fim pro começo é imperceptível).
                Substituiu o grid `flex-wrap` estático (pedido explícito):
                12 cards de 220px empilhados um por linha exigia rolar a
                seção inteira só pra ver os parceiros. */}
            <div className="relative -mx-4 sm:mx-0">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-16 bg-gradient-to-r from-[#f4f7fb] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-16 bg-gradient-to-l from-[#f4f7fb] to-transparent" />
              <div className="flex overflow-hidden px-4 sm:px-0">
                <motion.div
                  className={`flex items-stretch gap-4 sm:gap-5 ${CARD_HEIGHT}`}
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 32, ease: "linear" } }}
                >
                  {parceirosLoop.map((parceiro, i) => (
                    <PartnerTile key={`mobile-${parceiro.id}-${i}`} parceiro={parceiro} />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export { ParceirosEliteSection };
