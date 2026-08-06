"use client";

import { useState } from "react";
import {
  Zap,
  ShieldCheck,
  Compass,
  Radar,
  Bed,
  Tag,
  LayoutTemplate,
  Star,
  Building,
  Award,
  Image,
  Calendar,
  Newspaper,
  MessageCircle,
  FormInput,
  Bot,
  Check,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";

// ── Data — 4 pilares por resultado de negócio, não 12 features soltas ────────
const PILARES = [
  {
    id: "conversao",
    tabLabel: "Vender mais rápido",
    nome: "Conversão Imediata",
    icon: Zap,
    descricaoPre: "Cada quarto e cada oferta aparecem como um convite à reserva — não como uma ficha técnica. O visitante decide ",
    keyword: "em segundos",
    descricaoPos: ", sem abrir uma aba pra comparar em outro site.",
    itens: [
      { icon: Bed, titulo: "Acomodações com detalhes", descricao: "Fotos, descrições, preços e diferenciais de cada tipo de quarto." },
      { icon: Tag, titulo: "Pacotes e promoções", descricao: "Ofertas sazonais ou personalizadas para aumentar suas vendas diretas." },
      { icon: LayoutTemplate, titulo: "Banners promocionais", descricao: "Ofertas e eventos em destaque com banners estratégicos no site." },
    ],
  },
  {
    id: "autoridade",
    tabLabel: "Ganhar confiança",
    nome: "Prova Social & Autoridade",
    icon: ShieldCheck,
    descricaoPre: "A confiança que normalmente nasce na recepção, aqui acontece ",
    keyword: "antes do check-in",
    descricaoPos: ". Avaliações reais, sua história e reconhecimentos do setor apagam a última dúvida do hóspede.",
    itens: [
      { icon: Star, titulo: "Depoimentos e avaliações", descricao: "A opinião de hóspedes reais, gerando mais confiança no seu hotel." },
      { icon: Building, titulo: "Página institucional", descricao: "A história do seu hotel, reforçando sua credibilidade com visitantes." },
      { icon: Award, titulo: "Prêmios e certificações", descricao: "Selos de qualidade que comprovam sua excelência no setor." },
    ],
  },
  {
    id: "navegacao",
    tabLabel: "Manter o visitante",
    nome: "Experiência de Navegação",
    icon: Compass,
    descricaoPre: "Mídia profissional, ocasiões especiais e novidades dão vontade de explorar — e ",
    keyword: "de voltar",
    descricaoPos: ". O visitante fica na página em vez de fechar a aba.",
    itens: [
      { icon: Image, titulo: "Galeria de fotos e vídeos", descricao: "Imagens e vídeos profissionais que encantam seus visitantes." },
      { icon: Calendar, titulo: "Eventos e datas especiais", descricao: "Páginas dedicadas para eventos, casamentos ou pacotes temáticos." },
      { icon: Newspaper, titulo: "Notícias e atualizações", descricao: "Eventos, ações especiais e novidades que atraem mais tráfego." },
    ],
  },
  {
    id: "captura",
    tabLabel: "Nunca perder um lead",
    nome: "Captura Inteligente",
    icon: Radar,
    descricaoPre: "WhatsApp, formulário e chatbot cobrem o momento exato em que a dúvida vira intenção de compra. Nenhum visitante sai ",
    keyword: "sem deixar rastro",
    descricaoPos: ".",
    itens: [
      { icon: MessageCircle, titulo: "Integração com WhatsApp", descricao: "O hóspede tira dúvidas e reserva direto pelo WhatsApp." },
      { icon: FormInput, titulo: "Formulários de contato rápido", descricao: "Captação de leads e reservas com formulários simples e intuitivos." },
      { icon: Bot, titulo: "Chatbot inteligente", descricao: "Atendimento automático que aumenta suas chances de conversão." },
    ],
  },
] as const;

// ── Gold underline — mesmo traço desenhado à mão da hero da Home ────────────
function GoldUnderline({ children, active }: { children: React.ReactNode; active: boolean }) {
  const reducedMotion = useReducedMotion();
  return (
    <span className="relative inline-block whitespace-nowrap text-[#1e3a5f]">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 320 14"
        preserveAspectRatio="none"
        className="absolute left-0 -bottom-1 w-full h-[0.8rem] pointer-events-none"
        fill="none"
      >
        <motion.path
          d="M 4 10 C 60 4, 150 3, 230 6 C 270 7.5, 300 9, 316 8"
          stroke="#fccc30"
          strokeWidth={4}
          strokeLinecap="round"
          initial={false}
          animate={
            reducedMotion
              ? { pathLength: 1, opacity: 0.9 }
              : active
              ? { pathLength: 1, opacity: 0.9 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </span>
  );
}

// ── Transição direcional — o painel chega de fora do palco e ganha foco
// conforme se aproxima do centro. x/scale rodam em spring — mesma física da
// pílula das abas. A opacidade entra rápido (pra não competir visualmente
// com o deslize) e o blur é discreto — o movimento lateral é o protagonista,
// não o fade. `variants` + `custom` no AnimatePresence (em vez de props
// diretas) é o que garante que o elemento que está saindo sempre saiba pra
// que lado ir mesmo depois que o pai já re-renderizou com a nova direção —
// testado: com props diretas + mode="popLayout" os painéis antigos ficavam
// presos no DOM (nunca desmontavam) neste ambiente.
const panelVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 160, scale: 0.93, filter: "blur(6px)" }),
  center: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({ opacity: 0, x: dir * -160, scale: 0.93, filter: "blur(6px)" }),
};

const panelTransition = {
  x:       { type: "spring" as const, stiffness: 240, damping: 26, mass: 1 },
  scale:   { type: "spring" as const, stiffness: 240, damping: 26, mass: 1 },
  opacity: { duration: 0.2, ease: "easeOut" as const },
  filter:  { duration: 0.3, ease: "easeOut" as const },
};

const listStagger = {
  center: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const listItemVariants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0 },
};

// ── Stage — o painel grande que troca de conteúdo por aba ────────────────────
function Stage({ activeIndex, direction }: { activeIndex: number; direction: number }) {
  const reducedMotion = useReducedMotion();
  const p = PILARES[activeIndex];
  const Icon = p.icon;

  return (
    <div className="relative rounded-[36px] p-[5px] bg-gradient-to-br from-white/75 via-white/25 to-white/[0.03]
                     shadow-[0_8px_20px_-14px_rgba(15,40,80,0.20),0_34px_70px_-34px_rgba(15,40,80,0.42)]">
      <div className="relative overflow-hidden rounded-[31px] bg-white/45 backdrop-blur-2xl ring-1 ring-inset ring-white/60 p-8 sm:p-10">

        {/* Receding grid floor — mesma assinatura do ProductCard */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 [perspective:420px] opacity-[0.5]">
          <div
            className="absolute inset-0 origin-bottom [transform:rotateX(74deg)]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(40,89,146,0.16) 1px, transparent 1px)," +
                "linear-gradient(to bottom, rgba(40,89,146,0.16) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              WebkitMaskImage: "linear-gradient(to top, #000 5%, transparent 65%)",
              maskImage: "linear-gradient(to top, #000 5%, transparent 65%)",
            }}
          />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

        {/* Só o painel ativo fica montado — troca real de conteúdo, não um
            crossfade de 4 nós empilhados. O overflow-hidden some com o
            excesso durante a entrada/saída, como se o conteúdo chegasse de
            trás da moldura em vez de simplesmente aparecer. */}
        <div className="relative z-10 min-h-[340px] overflow-hidden">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={p.id}
              custom={direction}
              variants={reducedMotion ? undefined : panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={panelTransition}
              className="grid sm:grid-cols-[1fr_auto] gap-8 items-center"
            >
              {/* Texto do pilar */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#285992]">
                  Pilar {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-3 mt-3 mb-4">
                  <motion.div
                    initial={reducedMotion ? false : { scale: 0.6, rotate: -30, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#285992] flex items-center justify-center flex-shrink-0"
                  >
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                  </motion.div>
                  <h3 className="font-display text-2xl sm:text-[1.75rem] font-semibold text-[#1e293b] tracking-tight">
                    {p.nome}
                  </h3>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-600 max-w-lg">
                  {p.descricaoPre}
                  <GoldUnderline active>{p.keyword}</GoldUnderline>
                  {p.descricaoPos}
                </p>
              </div>

              {/* Sub-itens — escalonam entrando atrás do texto */}
              <motion.ul
                variants={reducedMotion ? undefined : listStagger}
                className="flex flex-col gap-3 sm:min-w-[260px]"
              >
                {p.itens.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <motion.li
                      key={item.titulo}
                      variants={reducedMotion ? undefined : listItemVariants}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-2xl bg-white/90 border border-slate-200/80 px-4 py-3"
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#285992]/[0.08]">
                          <ItemIcon className="h-4 w-4 text-[#285992]" strokeWidth={1.8} />
                        </span>
                        <span className="text-[13px] font-semibold text-slate-800 flex-1">
                          {item.titulo}
                        </span>
                        <Check className="h-3.5 w-3.5 text-[#285992]/50 flex-shrink-0" strokeWidth={3} />
                      </div>
                      <p className="text-[12px] leading-relaxed text-slate-500 pl-11">
                        {item.descricao}
                      </p>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function RecursosGridSection() {
  const [[activeIndex, direction], setActive] = useState<[number, number]>([0, 0]);

  const goTo = (i: number) => {
    if (i === activeIndex) return;
    setActive([i, i > activeIndex ? 1 : -1]);
  };

  return (
    <section className="relative py-24 bg-[#f4f7fb] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-5xl">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <SectionEyebrow className="justify-center">Recursos que convertem</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0f172a] leading-none tracking-tighter antialiased mb-3">
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              Um site que vende por você,
            </span>{" "}
            quarto por quarto
          </h2>
          <p className="font-sans font-normal text-[#64748b] text-lg leading-relaxed">
            Não é uma lista de funcionalidades — é a arquitetura completa que transforma
            curiosidade em reserva confirmada, sem depender de comissão de terceiros.
          </p>
        </div>

        {/* Abas por objetivo */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          {PILARES.map((p, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                aria-pressed={isActive}
                className={`relative rounded-full px-5 py-2.5 text-[13px] font-semibold bg-white ring-1 transition-colors duration-300
                           ${isActive ? "ring-transparent" : "ring-slate-200 hover:ring-[#285992]/30"}`}
              >
                {/* Pílula que desliza entre as abas — layoutId faz o Framer
                    animar posição e largura sozinho quando o elemento "pula"
                    de um botão pro outro. */}
                {isActive && (
                  <motion.span
                    layoutId="recursos-tab-indicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1e3a5f] to-[#285992] shadow-md shadow-[#285992]/25"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-600 hover:text-[#285992]"}`}>
                  {p.tabLabel}
                </span>
              </button>
            );
          })}
        </div>

        <Stage activeIndex={activeIndex} direction={direction} />
      </div>
    </section>
  );
}

export { RecursosGridSection };
