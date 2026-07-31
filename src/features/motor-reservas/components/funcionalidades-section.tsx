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
  Monitor,
  Link,
  QrCode,
  Zap,
  BarChart3,
  Calendar,
  Search,
  CreditCard,
} from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────
const FUNCIONALIDADES = [
  {
    icon: Monitor,
    titulo: "Central de reservas (CRS)",
    descricao:
      "Consolide todas as reservas do site, OTAs, operadoras e canais diretos em uma única extranet. Menos retrabalho, mais controle e produtividade.",
  },
  {
    icon: Link,
    titulo: "Link de pagamento personalizado",
    descricao:
      "Envie links por WhatsApp ou e-mail para concluir reservas de forma ágil e segura. Ideal para contatos diretos e fechamentos rápidos.",
  },
  {
    icon: QrCode,
    titulo: "Pix com confirmação automática",
    descricao:
      "Receba pagamentos via Pix com confirmação em segundos, sem conferência manual. Mais agilidade no check-in e no fluxo de caixa.",
  },
  {
    icon: Zap,
    titulo: "Ações automáticas para hóspedes",
    descricao:
      "Automatize e-mails e mensagens no WhatsApp com confirmação de reserva, recuperação de carrinho, pré check-in e pagamento de conta.",
  },
  {
    icon: BarChart3,
    titulo: "Relatórios e dashboards gerenciais",
    descricao:
      "Acompanhe reservas, receita, conversão e ocupação em tempo real com relatórios visuais prontos para tomada de decisão.",
  },
  {
    icon: Calendar,
    titulo: "Calendário hoteleiro inteligente",
    descricao:
      "Visualize ocupação, bloqueios, tarifas e disponibilidade em um só lugar, com atualização automática integrada ao Channel Manager e PMS.",
  },
  {
    icon: Search,
    titulo: "Integração com Google Hotel",
    descricao:
      "Apareça no Google Hotel, Trivago e outros metabuscadores sem custo adicional. Gere tráfego qualificado para seu site com reservas diretas.",
  },
  {
    icon: CreditCard,
    titulo: "Integração de cartões gratuita",
    descricao:
      "Venda online com cartão de crédito sem taxas extras de integração. Compatível com Cielo, Stone, Getnet, Sicredi, Rede e outros.",
  },
] as const;

// ── Animation variants ────────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

// Scale 0.95 → 1 + fade + blur cascade
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

// Multi-layered shadow expands on hover — simulates increased elevation
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

// Icon: lift + 360° spin (per-property transition overrides the global spring for rotate)
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
  // Shared mouse position — drives both spotlight and border glow
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);

  // Inner spotlight: very subtle brand-tint follows cursor inside card
  const innerSpotlight = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgba(40,89,146,0.05), transparent 70%)`;

  // Border spotlight: brand glow that follows cursor at the card edge (shown through p-[1px] gap)
  const borderSpotlight = useMotionTemplate`radial-gradient(180px circle at ${mx}px ${my}px, rgba(40,89,146,0.24), transparent 65%)`;

  // Micro-3D tilt — max ±4° on each axis (matches vanilla-tilt `max: 4`)
  const rotateX = useSpring(0, { stiffness: 280, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 280, damping: 30 });

  // Glare sweep
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
      {/*
        Tilt + shadow wrapper.
        cardVariants animates boxShadow; rotateX/rotateY from style springs.
        whileHover="hover" propagates the label to icon child (iconVariants).
      */}
      <motion.div
        className="relative h-full rounded-3xl transform-gpu"
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        animate="rest"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onHoverStart={onHoverStart}
      >
        {/*
          Border architecture:
            · bg rgba(0,0,0,0.05) → subtle dark 1px border at rest
            · border spotlight overlays it with brand glow at cursor position
            · p-[1px] reveals exactly 1px of the outer background as border
        */}
        <div
          className="relative h-full rounded-3xl p-[1px]"
          style={{ background: "rgba(0,0,0,0.05)" }}
        >
          {/* Brand glow that follows the cursor along the card perimeter */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{ background: borderSpotlight }}
            aria-hidden="true"
          />

          {/* ── Card surface ───────────────────────────────────────────────── */}
          <div className="relative h-full rounded-[15px] bg-white overflow-hidden p-5">

            {/* Inner spotlight: subtle brand tint inside the card */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ background: innerSpotlight }}
              aria-hidden="true"
            />

            {/* Glare blade: 45° light sweep on hover entry */}
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

            {/* Specular top-edge line (simulates acrylate surface) */}
            <div className="pointer-events-none absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />

            {/* ── Content ───────────────────────────────────────────────── */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Icon — responds to propagated "hover" variant with spin */}
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
function FuncionalidadesSection() {
  return (
    <section className="relative py-24 bg-[#f4f7fb] overflow-hidden">
      {/* Hairline top separator */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0f172a] leading-none tracking-tighter antialiased">
            Funcionalidades que aumentam sua{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              produtividade
            </span>{" "}
            e geram mais reservas diretas
          </h2>
        </motion.div>

        {/* 4 × 2 Staggered Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {FUNCIONALIDADES.map((f, i) => (
            <Card key={i} {...f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { FuncionalidadesSection };
