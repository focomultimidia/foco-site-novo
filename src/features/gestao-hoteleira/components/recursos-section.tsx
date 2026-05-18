"use client";

import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useAnimation,
  type Variants,
} from "framer-motion";
import {
  Calendar,
  DollarSign,
  ShoppingCart,
  Sparkles,
  Package,
  FileText,
  BarChart3,
  Lock,
  Utensils,
  Users,
  Search,
  CheckSquare,
  LayoutDashboard,
  Boxes,
  CreditCard,
  Briefcase,
  FileCheck,
  Ticket,
  UserCircle,
  History,
} from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────
const RECURSOS = [
  {
    icon: Calendar,
    titulo: "Mapa de reservas",
    descricao:
      "Visão gráfica e intuitiva da ocupação do hotel em tempo real. Alocação de quartos e gestão visual de overbookings e gaps.",
  },
  {
    icon: DollarSign,
    titulo: "Disponibilidade e tarifário",
    descricao:
      "Centraliza a gestão de preços e inventário. Permite ajustar tarifas, abrir/fechar vendas e aplicar restrições de forma ágil.",
  },
  {
    icon: ShoppingCart,
    titulo: "PDV hoteleiro",
    descricao:
      "Módulo de Ponto de Venda integrado para registrar o consumo de hóspedes diretamente na conta da reserva.",
  },
  {
    icon: Sparkles,
    titulo: "Governança",
    descricao:
      "Módulo de gestão da equipe de limpeza. Envia listas de tarefas, atualiza o status dos quartos em tempo real.",
  },
  {
    icon: Package,
    titulo: "Empréstimo de equipamentos",
    descricao:
      "Controle de inventário para itens emprestados. Registra saída e devolução, evitando perdas.",
  },
  {
    icon: FileText,
    titulo: "Gestão de orçamentos",
    descricao:
      "Gerencie orçamentos recebidos via telefone, e-mail, redes sociais e WhatsApp com CRM integrado.",
  },
  {
    icon: BarChart3,
    titulo: "Relatórios e dashboards",
    descricao:
      "Relatórios detalhados (financeiros, operacionais, de ocupação) que transformam dados brutos em insights estratégicos.",
  },
  {
    icon: Lock,
    titulo: "Bloqueio pré e pós reserva",
    descricao:
      "Bloqueie quartos antes ou depois de uma reserva para manutenção ou limpeza profunda.",
  },
  {
    icon: Utensils,
    titulo: "Controle de pensões",
    descricao:
      "Gestão automatizada dos planos de refeição. Garante que o hóspede receba o serviço contratado.",
  },
  {
    icon: Users,
    titulo: "Orçamentos individuais e grupos",
    descricao:
      "Criação rápida de orçamentos para hóspedes individuais ou grandes grupos, com link de pagamento seguro.",
  },
  {
    icon: Search,
    titulo: "Achados e perdidos",
    descricao:
      "Sistema para registrar itens encontrados na propriedade, facilitando a localização e devolução ao hóspede.",
  },
  {
    icon: CheckSquare,
    titulo: "Check-in online",
    descricao:
      "Evite filas na recepção e aumente a satisfação do hóspede com check-in 100% online.",
  },
  {
    icon: LayoutDashboard,
    titulo: "Dashboard por usuário",
    descricao:
      "Painel de controle personalizado que exibe métricas e tarefas relevantes para cada colaborador.",
  },
  {
    icon: Boxes,
    titulo: "Controle de estoque",
    descricao:
      "Gerenciamento de insumos (alimentos, bebidas, produtos de limpeza) com rastreamento de consumo.",
  },
  {
    icon: CreditCard,
    titulo: "Integração via PIX e máquina Stone",
    descricao:
      "Integração direta com PIX e máquinas de cartão, agilizando o processo de cobrança no check-out.",
  },
  {
    icon: Briefcase,
    titulo: "Gestão B2B",
    descricao:
      "Gerencie empresas e operadoras dentro do PMS, com reservas, formas de pagamento e comissões.",
  },
  {
    icon: FileCheck,
    titulo: "Ficha FNRH",
    descricao:
      "Geração automática da Ficha Nacional de Registro de Hóspedes com base nos dados do check-in.",
  },
  {
    icon: Ticket,
    titulo: "Voucher",
    descricao:
      "Emissão e gestão de vouchers de reserva personalizados que confirmam detalhes da estadia.",
  },
  {
    icon: UserCircle,
    titulo: "Gestão do hóspede",
    descricao:
      "Cadastro completo e centralizado de todos os hóspedes com histórico, preferências e CRM integrado.",
  },
  {
    icon: History,
    titulo: "Histórico de reservas",
    descricao:
      "Arquivo digital de todas as reservas passadas. Essencial para auditorias e análise de tendências.",
  },
] as const;

// ── Animation variants ────────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  rest: {
    boxShadow:
      "0 1px 3px rgba(0,0,0,0.06), " +
      "0 4px 12px rgba(0,0,0,0.05), " +
      "0 8px 24px rgba(0,0,0,0.04), " +
      "0 20px 40px rgba(0,0,0,0.02)",
  },
  hover: {
    boxShadow:
      "0 4px 8px rgba(0,0,0,0.08), " +
      "0 12px 28px rgba(0,0,0,0.07), " +
      "0 24px 52px rgba(0,0,0,0.05), " +
      "0 40px 80px rgba(0,0,0,0.03)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const iconVariants: Variants = {
  rest: { y: 0, scale: 1, rotate: 0, transition: { rotate: { duration: 0 } } },
  hover: {
    y: -2,
    scale: 1.1,
    rotate: 360,
    transition: {
      type: "spring",
      stiffness: 460,
      damping: 14,
      rotate: { duration: 0.55, ease: [0.4, 0, 0.2, 1], type: "tween" },
    },
  },
};

// ── Card ──────────────────────────────────────────────────────────────────────
interface CardProps {
  icon: React.ElementType;
  titulo: string;
  descricao: string;
}

function Card({ icon: Icon, titulo, descricao }: CardProps) {
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const innerSpotlight = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgba(40,89,146,0.05), transparent 70%)`;
  const borderSpotlight = useMotionTemplate`radial-gradient(180px circle at ${mx}px ${my}px, rgba(40,89,146,0.24), transparent 65%)`;

  const rotateX = useSpring(0, { stiffness: 280, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 280, damping: 30 });
  const glare = useAnimation();

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mx.set(x);
    my.set(y);
    rotateY.set(((x - r.width / 2) / (r.width / 2)) * 4);
    rotateX.set(((r.height / 2 - y) / (r.height / 2)) * 4);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    mx.set(-999);
    my.set(-999);
  };

  const onHoverStart = () => {
    glare.set({ x: "-130%" });
    glare.start({
      x: "130%",
      transition: { duration: 0.46, ease: [0.4, 0, 0.2, 1] },
    });
  };

  return (
    <motion.div variants={cardReveal} className="h-full">
      <motion.div
        className="relative h-full rounded-2xl transform-gpu"
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        animate="rest"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onHoverStart={onHoverStart}
      >
        <div
          className="relative h-full rounded-2xl p-[1px]"
          style={{ background: "rgba(0,0,0,0.05)" }}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ background: borderSpotlight }}
            aria-hidden="true"
          />

          <div className="relative h-full rounded-[15px] bg-white overflow-hidden p-5">
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ background: innerSpotlight }}
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[15px]"
              aria-hidden="true"
            >
              <motion.div
                animate={glare}
                initial={{ x: "-130%" }}
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(45deg, transparent 20%, rgba(255,255,255,0.65) 50%, transparent 80%)",
                  willChange: "transform",
                }}
              />
            </div>

            <div className="pointer-events-none absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />

            <div className="relative z-10 h-full flex flex-col">
              <motion.div
                variants={iconVariants}
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#285992] to-[#427ab9] flex items-center justify-center mb-4 flex-shrink-0"
                style={{ boxShadow: "0 4px 12px rgba(40,89,146,0.28)" }}
              >
                <Icon className="w-5 h-5 text-white" strokeWidth={1.7} />
              </motion.div>

              <h3 className="font-display font-bold text-[#0f172a] text-[0.875rem] mb-2 leading-snug tracking-tight">
                {titulo}
              </h3>
              <p className="font-sans font-normal text-[#64748b] text-xs leading-relaxed">
                {descricao}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function RecursosSection() {
  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0f172a] leading-none tracking-tighter antialiased mb-3">
            Confira os principais recursos do{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              sistema PMS
            </span>{" "}
            para hotelaria
          </h2>
          <p className="font-sans font-normal text-[#64748b] text-lg leading-relaxed">
            As ferramentas que centralizam a gestão de reservas, a rotina da
            recepção e o controle financeiro em uma única plataforma.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {RECURSOS.map((r, i) => (
            <Card key={i} {...r} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { RecursosSection };
