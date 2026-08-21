"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  LogIn,
  Compass,
  Wallet,
  Star,
  CheckCircle,
  QrCode,
  Utensils,
  Sparkles,
  Building,
  Calendar,
  Wifi,
  Bell,
  Receipt,
  MessageCircle,
  MapPin,
  ImagePlus,
} from "lucide-react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";

// ── Data — 12 recursos (textos originais, intactos) organizados pela
// jornada do hóspede: chegada → estadia → saída. ──────────────────────────
const FASES = [
  {
    id: "chegada",
    nome: "Chegada Express",
    icon: LogIn,
    tela: "/assets/imgs/experiencia-do-hospede/app-hospede.webp",
    descricaoPre: "Tudo que remove atrito ",
    keyword: "antes da mala chegar no quarto",
    descricaoPos: ".",
    itens: [
      { icon: MapPin, titulo: "Como chegar", descricao: "Rota fácil e sem erro. Acesse o mapa e as direções detalhadas para chegar ao hotel de forma rápida." },
      { icon: CheckCircle, titulo: "Check-in online", descricao: "Agilidade total! Faça seu check-in antes mesmo de chegar ao hotel e vá direto para o seu quarto, sem filas na recepção." },
      { icon: Wifi, titulo: "Wifi", descricao: "Conecte-se em segundos. Obtenha a senha e as instruções de acesso à nossa rede Wi-Fi de alta velocidade." },
      { icon: Building, titulo: "Sobre o hotel", descricao: "Nossa história e missão. Conheça a filosofia do hotel e o compromisso que temos em tornar sua estadia inesquecível." },
    ],
  },
  {
    id: "experiencia",
    nome: "Experiência & Lazer",
    icon: Compass,
    tela: "/assets/imgs/experiencia-do-hospede/app-hospede2.webp",
    descricaoPre: "O celular vira ",
    keyword: "concierge de bolso",
    descricaoPos: " durante toda a estadia.",
    itens: [
      { icon: Utensils, titulo: "Cardápio digital", descricao: "Acesse o menu completo do restaurante e serviço de quarto diretamente do seu celular. Faça seu pedido com facilidade." },
      { icon: Sparkles, titulo: "Comodidades do hotel", descricao: "Conheça todos os serviços e facilidades que o hotel oferece. Saiba horários de funcionamento e regras de uso em um só lugar." },
      { icon: Calendar, titulo: "Programação do hotel", descricao: "Não perca nada! Fique por dentro de todos os eventos, atividades e horários de lazer que o hotel preparou." },
      { icon: Bell, titulo: "Push interativo", descricao: "Aplicativo com alerta de toda a programação de entretenimento do seu hotel e destino." },
      { icon: MessageCircle, titulo: "Integração via WhatsApp", descricao: "Fale diretamente com a recepção ou serviço de quarto para tirar dúvidas ou fazer pedidos de forma rápida." },
    ],
  },
  {
    id: "saida",
    nome: "Controle & Saída",
    icon: Wallet,
    tela: null,
    descricaoPre: "Transparência que fecha o ciclo ",
    keyword: "sem surpresa",
    descricaoPos: " no check-out.",
    itens: [
      { icon: Receipt, titulo: "Acompanhamento de consumo", descricao: "Transparência total! Visualize em tempo real todos os seus gastos no hotel, evitando surpresas no check-out." },
      { icon: QrCode, titulo: "Pagamento de contas (PIX)", descricao: "Pague sua conta de forma instantânea e segura. Encerre seu consumo e faça o check-out com a rapidez do PIX." },
      { icon: Star, titulo: "Avaliações", descricao: "Sua opinião é valiosa! Compartilhe sua experiência de forma rápida e ajude-nos a tornar sua próxima estadia ainda melhor." },
    ],
  },
] as const;

// A tela (celular) fica fixa; só os cards de fase rolam por trás dela — mesmo
// mecanismo do ProdutosSection na Home (product-showcase.tsx: stage fixo +
// conteúdo em fluxo normal, sincronizado por scrollspy).
const PHONE_TOP = 140;

// ── Gold underline — mesmo traço desenhado à mão da hero da Home ────────────
function GoldUnderline({ children }: { children: React.ReactNode }) {
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
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </span>
  );
}

// ── Phone chrome — mesma moldura da hero desta página, reaproveitada ────────
function PhoneScreen({ fase, active }: { fase: (typeof FASES)[number]; active: boolean }) {
  return (
    <div
      aria-hidden={!active}
      className={`absolute inset-0 transition-opacity duration-500 ease-out ${active ? "opacity-100" : "opacity-0"}`}
    >
      {fase.tela ? (
        <img src={fase.tela} alt={`Tela do app do hóspede: ${fase.nome}`} className="absolute inset-0 w-full h-full object-cover object-top" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#f4f7fb] to-white">
          <ImagePlus className="w-6 h-6 text-slate-300" strokeWidth={1.6} />
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-300">Tela em breve</span>
        </div>
      )}
    </div>
  );
}

function PhoneStage({ activePhase }: { activePhase: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative bg-[#fbfbfb] rounded-[38px] p-[6px] w-[260px]"
      style={{ boxShadow: "0 30px 60px -20px rgba(15,40,80,0.45), 0 0 0 1px rgba(255,255,255,0.4)" }}
    >
      <div className="relative bg-white rounded-[32px] overflow-hidden" style={{ aspectRatio: "9/19.5" }}>
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 w-16 h-[16px] bg-[#1c1c1e] rounded-full" />
        {FASES.map((fase, i) => (
          <PhoneScreen key={fase.id} fase={fase} active={i === activePhase} />
        ))}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-[4px] bg-black/20 rounded-full z-10" />
      </div>
    </motion.div>
  );
}

// ── Card de fase — rola em fluxo normal atrás do celular fixo ────────────────
function PhaseCard({ fase, index }: { fase: (typeof FASES)[number]; index: number }) {
  const Icon = fase.icon;
  return (
    <div className="rounded-[28px] bg-white border border-slate-200/80 shadow-[0_18px_40px_-16px_rgba(15,40,80,0.16)] p-6 sm:p-7 w-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#285992] flex items-center justify-center flex-shrink-0">
          <Icon className="w-4.5 h-4.5 text-white" strokeWidth={1.8} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#285992]">
          Fase {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1e293b] tracking-tight mb-2">
        {fase.nome}
      </h3>
      <p className="text-[14px] leading-relaxed text-slate-600 mb-5">
        {fase.descricaoPre}
        <GoldUnderline>{fase.keyword}</GoldUnderline>
        {fase.descricaoPos}
      </p>

      <ul className="grid sm:grid-cols-2 gap-2.5">
        {fase.itens.map((item) => {
          const ItemIcon = item.icon;
          return (
            <li key={item.titulo} className="rounded-xl bg-[#f4f7fb] border border-slate-200/70 px-3.5 py-3.5">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#285992]/[0.08]">
                  <ItemIcon className="h-[18px] w-[18px] text-[#285992]" strokeWidth={1.8} />
                </span>
                <span className="text-[15px] font-semibold text-slate-800">
                  {item.titulo}
                </span>
              </div>
              <p className="text-[14px] leading-relaxed text-slate-500">
                {item.descricao}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function RecursosSection() {
  const [activePhase, setActivePhase] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Scrollspy: qual card está mais perto do centro vertical da tela vence.
    // Mesmo princípio do IntersectionObserver central usado no
    // ProdutosSection da Home, só que via listener de scroll direto — nesta
    // stack, esse cálculo se mostrou o único confiável e verificável.
    function handleScroll() {
      const viewportCenter = window.innerHeight / 2;
      let best = 0;
      let bestDistance = Infinity;
      blockRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setActivePhase(best);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sem overflow-hidden: qualquer ancestral com overflow != visible quebra
  // position:sticky no celular à direita.
  return (
    <section className="relative py-24 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-6xl">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <SectionEyebrow className="justify-center">A jornada do hóspede</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0f172a] leading-none tracking-tighter antialiased mb-3">
            Confira alguns recursos do mais inovador{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              aplicativo de hospedagem
            </span>
          </h2>
          <p className="font-sans font-normal text-[#64748b] text-lg leading-relaxed">
            Do check-in online ao pagamento via PIX: a tecnologia que coloca o controle
            da estadia na palma da mão do seu hóspede.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-16 items-start">
          {/* Fases — rolam normalmente, o celular ao lado é que fica parado */}
          <div className="flex flex-col">
            {FASES.map((fase, i) => (
              <div
                key={fase.id}
                ref={(el) => { blockRefs.current[i] = el; }}
                className="lg:min-h-[110vh] flex items-center py-10 lg:py-0"
              >
                <PhaseCard fase={fase} index={i} />
              </div>
            ))}
          </div>

          {/* Celular fixo — a tela troca conforme a fase mais próxima do centro */}
          <div className="hidden lg:flex sticky justify-center" style={{ top: PHONE_TOP }}>
            <PhoneStage activePhase={activePhase} />
          </div>
        </div>
      </div>
    </section>
  );
}

export { RecursosSection };
