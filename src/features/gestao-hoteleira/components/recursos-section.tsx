"use client";

import { useState } from "react";
import {
  ClipboardCheck,
  UserCheck,
  Handshake,
  LineChart,
  Calendar,
  Sparkles,
  Package,
  Lock,
  Boxes,
  CheckSquare,
  ShoppingCart,
  FileCheck,
  Utensils,
  Search,
  UserCircle,
  DollarSign,
  FileText,
  Users,
  Briefcase,
  Ticket,
  BarChart3,
  CreditCard,
  History,
  LayoutDashboard,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";

// ── Data — 20 recursos consolidados em 4 frentes de comando operacional ─────
const PILARES = [
  {
    id: "operacao",
    tabLabel: "Operação & Governança",
    nome: "Operação & Governança",
    icon: ClipboardCheck,
    descricaoPre: "Cada quarto, cada equipamento, cada tarefa da equipe sob controle total, ",
    keyword: "sem depender de planilha",
    descricaoPos: " ou grupo de WhatsApp.",
    itens: [
      { icon: Calendar, titulo: "Mapa de reservas", descricao: "Visão gráfica da ocupação em tempo real, com alocação de quartos e gestão visual de overbookings e gaps." },
      { icon: Sparkles, titulo: "Governança", descricao: "Gestão da equipe de limpeza: envia listas de tarefas e atualiza o status dos quartos em tempo real." },
      { icon: Package, titulo: "Empréstimo de equipamentos", descricao: "Controle de inventário para itens emprestados. Registra saída e devolução, evitando perdas." },
      { icon: Lock, titulo: "Bloqueio pré e pós-reserva", descricao: "Bloqueie quartos antes ou depois de uma reserva para manutenção ou limpeza profunda." },
      { icon: Boxes, titulo: "Controle de estoque", descricao: "Gerenciamento de insumos (alimentos, bebidas, produtos de limpeza) com rastreamento de consumo." },
    ],
  },
  {
    id: "recepcao",
    tabLabel: "Recepção & Experiência",
    nome: "Recepção & Experiência",
    icon: UserCheck,
    descricaoPre: "Elimine fila, retrabalho manual e falha de comunicação: o hóspede ",
    keyword: "sente a diferença",
    descricaoPos: " do check-in ao check-out.",
    itens: [
      { icon: CheckSquare, titulo: "Check-in online", descricao: "Evite filas na recepção e aumente a satisfação do hóspede com check-in 100% online." },
      { icon: ShoppingCart, titulo: "PDV hoteleiro", descricao: "Ponto de Venda integrado para registrar o consumo de hóspedes direto na conta da reserva." },
      { icon: FileCheck, titulo: "Ficha FNRH", descricao: "Geração automática da Ficha Nacional de Registro de Hóspedes com base nos dados do check-in." },
      { icon: Utensils, titulo: "Controle de pensões", descricao: "Gestão automatizada dos planos de refeição, garantindo que o hóspede receba o serviço contratado." },
      { icon: Search, titulo: "Achados e perdidos", descricao: "Registro de itens encontrados na propriedade, facilitando a localização e devolução ao hóspede." },
      { icon: UserCircle, titulo: "Gestão do hóspede", descricao: "Cadastro completo e centralizado de todos os hóspedes, com histórico, preferências e CRM integrado." },
    ],
  },
  {
    id: "vendas",
    tabLabel: "Vendas & Distribuição",
    nome: "Vendas & Distribuição",
    icon: Handshake,
    descricaoPre: "Do primeiro orçamento ao contrato B2B fechado, cada oportunidade formalizada ",
    keyword: "em minutos, não em dias",
    descricaoPos: ".",
    itens: [
      { icon: DollarSign, titulo: "Disponibilidade e tarifário", descricao: "Preço e inventário centralizados: ajuste tarifas, abra/feche vendas e aplique restrições de forma ágil." },
      { icon: FileText, titulo: "Gestão de orçamentos", descricao: "Orçamentos recebidos via telefone, e-mail, redes sociais e WhatsApp, com CRM integrado." },
      { icon: Users, titulo: "Orçamentos individuais e grupos", descricao: "Criação rápida de orçamentos para hóspedes individuais ou grandes grupos, com link de pagamento seguro." },
      { icon: Briefcase, titulo: "Gestão B2B", descricao: "Gerencie empresas e operadoras dentro do PMS, com reservas, formas de pagamento e comissões." },
      { icon: Ticket, titulo: "Voucher", descricao: "Emissão e gestão de vouchers de reserva personalizados que confirmam os detalhes da estadia." },
    ],
  },
  {
    id: "financeiro",
    tabLabel: "Financeiro & Estratégia",
    nome: "Financeiro & Estratégia",
    icon: LineChart,
    descricaoPre: "Decisão baseada em dado, não em intuição: cada tendência visível ",
    keyword: "antes de virar problema",
    descricaoPos: ".",
    itens: [
      { icon: BarChart3, titulo: "Relatórios e dashboards", descricao: "Relatórios financeiros, operacionais e de ocupação que transformam dado bruto em insight estratégico." },
      { icon: CreditCard, titulo: "Integração via PIX e máquina Stone", descricao: "Integração direta com PIX e máquinas de cartão, agilizando a cobrança no check-out." },
      { icon: History, titulo: "Histórico de reservas", descricao: "Arquivo digital de todas as reservas passadas, essencial para auditorias e análise de tendências." },
      { icon: LayoutDashboard, titulo: "Dashboard por usuário", descricao: "Painel de controle personalizado com métricas e tarefas relevantes para cada colaborador." },
    ],
  },
] as const;

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

// ── Transição direcional do painel — mesma receita comprovada do
// RecursosGridSection: variants + custom no AnimatePresence (não props
// diretas) e mode="popLayout" (não "wait") são o que garante, neste
// projeto, que o painel anterior sempre desmonte e o novo sempre monte —
// testado com cliques em sequência rápida, forward e backward.
const panelVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 60, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -60, scale: 0.97 }),
};

const panelTransition = {
  x:       { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 },
  scale:   { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 },
  opacity: { duration: 0.18, ease: "easeOut" as const },
};

const listStagger = {
  center: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
};

const listItemVariants = {
  enter: { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0 },
};

// ── ItemCard — cartão de recurso (ícone + título + descrição). Compartilhado
// entre o painel do console (desktop) e a pilha simples (mobile) — mesmo
// visual nos dois, só o tamanho muda um pouco entre os dois contextos. ─────
function ItemCard({
  item,
  variants,
  big,
}: {
  item: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; titulo: string; descricao: string };
  variants?: typeof listItemVariants;
  big?: boolean;
}) {
  const ItemIcon = item.icon;
  return (
    <motion.li
      variants={variants}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-xl bg-[#f4f7fb] ring-1 ring-slate-900/[0.04] ${big ? "px-6 py-6" : "px-6 py-6"}`}
    >
      <div className={`flex items-center gap-2.5 ${big ? "mb-2" : "mb-1.5"}`}>
        <span className={`flex flex-shrink-0 items-center justify-center rounded-full bg-[#285992]/[0.08] ${big ? "h-11 w-11" : "h-9 w-9"}`}>
          <ItemIcon className={big ? "h-6 w-6 text-[#285992]" : "h-3.5 w-3.5 text-[#285992]"} strokeWidth={1.8} />
        </span>
        <span className={`font-semibold text-slate-800 ${big ? "text-[15.5px]" : "text-[14.5px]"}`}>
          {item.titulo}
        </span>
      </div>
      <p className={`leading-relaxed text-slate-500 ${big ? "text-[14.5px]" : "text-[14.5px]"}`}>
        {item.descricao}
      </p>
    </motion.li>
  );
}

// ── Sidebar — os 4 pilares como itens de menu de um app real. Só usada a
// partir de lg agora (ver Section) — sem mais a versão "barra horizontal
// rolável" pro mobile, que era o que não ficava legal (ver MobilePillares). ─
function Sidebar({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2 p-5">
      {PILARES.map((p, i) => {
        const Icon = p.icon;
        const isActive = i === activeIndex;
        return (
          <button
            key={p.id}
            onClick={() => onSelect(i)}
            aria-pressed={isActive}
            className="relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-colors duration-300 min-w-0"
          >
            {isActive && (
              <motion.span
                layoutId="pms-sidebar-indicator"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1e3a5f] to-[#285992] shadow-md shadow-[#285992]/25"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <Icon className={`relative z-10 h-[18px] w-[18px] flex-shrink-0 transition-colors duration-300 ${isActive ? "text-white" : "text-[#285992]"}`} strokeWidth={1.8} />
            <span className={`relative z-10 text-[14px] font-semibold leading-snug transition-colors duration-300 ${isActive ? "text-white" : "text-slate-600"}`}>
              {p.tabLabel}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function RecursosSection() {
  const [[activeIndex, direction], setActive] = useState<[number, number]>([0, 0]);

  const goTo = (i: number) => {
    if (i === activeIndex) return;
    setActive([i, i > activeIndex ? 1 : -1]);
  };

  return (
    <section className="relative py-24 bg-[#f4f7fb] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-6xl">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <SectionEyebrow className="justify-center">Painel de recursos</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#0f172a] leading-none tracking-tighter antialiased mb-3">
            O centro de comando da{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              sua operação hoteleira
            </span>
          </h2>
          <p className="font-sans font-normal text-[#64748b] text-lg leading-relaxed">
            Da governança ao financeiro, um único sistema substitui planilha, papel e
            retrabalho, para você operar com a precisão de uma rede internacional.
          </p>
        </div>

        {/* Console (app-janela com abas) só a partir de lg — abaixo disso a
            sidebar de 4 abas virava uma barra horizontal apertada e o painel
            de conteúdo ficava espremido; trocado pela pilha simples abaixo,
            que mostra os 4 pilares inteiros de uma vez, sem interação. ───── */}
        <div className="hidden lg:block">
          <Console activeIndex={activeIndex} direction={direction} goTo={goTo} />
        </div>
        <div className="lg:hidden">
          <MobilePillares />
        </div>
      </div>
    </section>
  );
}

// ── MobilePillares — os 4 pilares empilhados, cada um com título, descrição
// e todos os seus cards visíveis de uma vez (sem abas, sem esconder nada por
// trás de um clique). É a estrutura pedida: título → descrição → cards, 4x. ─
function MobilePillares() {
  return (
    <div className="flex flex-col gap-5">
      {PILARES.map((p, i) => {
        const Icon = p.icon;
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[28px] bg-white ring-1 ring-slate-200 shadow-[0_8px_24px_-16px_rgba(15,40,80,0.18)] p-6 sm:p-7"
          >
            <div className="flex items-center gap-3 mb-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#285992] flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
              </div>
              <h3 className="font-display text-xl font-semibold text-[#1e293b] tracking-tight">
                {p.nome}
              </h3>
            </div>
            <p className="text-[14px] leading-relaxed text-slate-600 mb-5">
              {p.descricaoPre}
              <GoldUnderline>{p.keyword}</GoldUnderline>
              {p.descricaoPos}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {p.itens.map((item) => (
                <ItemCard key={item.titulo} item={item} />
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Console — a janela de app que hospeda o painel ativo (só lg+ agora —
// ver Section). Aumentado de propósito: mais respiro, sidebar mais larga,
// cards maiores (`big` no ItemCard) — pedido explícito de mais destaque
// pro componente em telas grandes. ──────────────────────────────────────────
function Console({
  activeIndex,
  direction,
  goTo,
}: {
  activeIndex: number;
  direction: number;
  goTo: (i: number) => void;
}) {
  const reducedMotion = useReducedMotion();
  const p = PILARES[activeIndex];
  const Icon = p.icon;

  return (
    <div className="rounded-[32px] overflow-hidden bg-white ring-1 ring-slate-200
                     shadow-[0_10px_28px_-14px_rgba(15,40,80,0.20),0_40px_80px_-28px_rgba(15,40,80,0.38)]">
      <div className="flex items-center gap-2 px-6 py-4 bg-slate-50 border-b border-slate-100">
        <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f57]" />
        <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-3.5 h-3.5 rounded-full bg-[#28c840]" />
        <span className="flex-1 text-center font-mono text-[12px] text-slate-400">
          Foco PMS: Painel de Recursos
        </span>
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] text-emerald-600 uppercase tracking-wide">
            Sistema ativo
          </span>
        </span>
      </div>

      <div className="grid grid-cols-[290px_1fr]">
        <Sidebar activeIndex={activeIndex} onSelect={goTo} />

        <div className="relative min-h-[500px] overflow-hidden border-l border-slate-100 p-11">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 [perspective:420px] opacity-[0.35]">
            <div
              className="absolute inset-0 origin-bottom [transform:rotateX(74deg)]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(40,89,146,0.14) 1px, transparent 1px)," +
                  "linear-gradient(to bottom, rgba(40,89,146,0.14) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
                WebkitMaskImage: "linear-gradient(to top, #000 5%, transparent 65%)",
                maskImage: "linear-gradient(to top, #000 5%, transparent 65%)",
              }}
            />
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={p.id}
                custom={direction}
                variants={reducedMotion ? undefined : panelVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={panelTransition}
              >
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#285992] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-2xl sm:text-[1.75rem] font-semibold text-[#1e293b] tracking-tight">
                    {p.nome}
                  </h3>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-600 max-w-xl mb-7">
                  {p.descricaoPre}
                  <GoldUnderline>{p.keyword}</GoldUnderline>
                  {p.descricaoPos}
                </p>

                <motion.ul
                  variants={reducedMotion ? undefined : listStagger}
                  className="grid grid-cols-2 gap-3"
                >
                  {p.itens.map((item) => (
                    <ItemCard key={item.titulo} item={item} variants={reducedMotion ? undefined : listItemVariants} big />
                  ))}
                </motion.ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export { RecursosSection };
