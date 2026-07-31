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
  TrendingUp,
  Clock,
  DollarSign,
  Lock,
  CreditCard,
  Target,
} from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────
const VANTAGENS = [
  {
    icon: TrendingUp,
    titulo: "Aumenta suas reservas diretas",
    descricao:
      "Com o motor de reservas, o seu site será um dos principais vendedores do hotel, gerando reservas 24 horas por dia — 100% online e sem comissões de OTA.",
  },
  {
    icon: Clock,
    titulo: "Mais agilidade nas reservas",
    descricao:
      "Hóspedes escolhem data e acomodação e finalizam em segundos — o processo mais ágil entre todos os canais de venda.",
  },
  {
    icon: DollarSign,
    titulo: "Tarifas exclusivas e dinâmicas",
    descricao:
      "Gerencie tarifas e restrições diretamente no seu site, garantindo o melhor preço para os clientes diretos.",
  },
  {
    icon: Lock,
    titulo: "Ambiente corporativo B2B",
    descricao:
      "Portal dedicado para empresas e agências de viagens com tarifas e comissões exclusivas — sem custo por reserva.",
  },
  {
    icon: CreditCard,
    titulo: "Pagamento online",
    descricao:
      "PIX e cartão de crédito integrados com segurança PCI DSS, sem custo adicional por transação.",
  },
  {
    icon: Target,
    titulo: "Gatilhos de conversão",
    descricao:
      "Comparador de preços, urgência e escassez que aceleram a decisão de compra e reduzem o abandono de reservas.",
  },
] as const;

// ── Animation variants ────────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
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

const iconVariants: Variants = {
  rest: { y: 0, scale: 1, rotate: 0, transition: { rotate: { duration: 0 } } },
  hover: {
    y: -3,
    scale: 1.09,
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
  // Spotlight: radial white light follows the cursor inside the card
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const spotlight = useMotionTemplate`radial-gradient(350px circle at ${mx}px ${my}px, rgba(255,255,255,0.40), transparent 70%)`;

  // Micro-3D tilt (spring physics)
  const rotateX = useSpring(0, { stiffness: 260, damping: 28 });
  const rotateY = useSpring(0, { stiffness: 260, damping: 28 });

  // Glare sweep
  const glare = useAnimation();

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mx.set(x);
    my.set(y);
    rotateY.set(((x - r.width / 2) / (r.width / 2)) * 8);
    rotateX.set(((r.height / 2 - y) / (r.height / 2)) * 5);
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
        className="relative h-full rounded-3xl transform-gpu"
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        initial="rest"
        whileHover="hover"
        animate="rest"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onHoverStart={onHoverStart}
      >
        {/* Solid white 1px border via p-[1px] gap */}
        <div
          className="relative h-full rounded-3xl p-[1px] border-white"
          style={{
            background: "rgba(255,255,255,0.00)",
            boxShadow:
              "0 1px 2px rgba(0,0,0,0.04), " +
              "0 4px 8px rgba(0,0,0,0.04), " +
              "0 8px 20px rgba(0,0,0,0.03), " +
              "0 16px 40px rgba(0,0,0,0.02)",
          }}
        >
          {/* Glass surface */}
          <div
            className="relative h-full rounded-[15px] overflow-hidden border border-white"
            style={{
              background: "rgba(255,255,255,0.00)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            {/* Interactive spotlight */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ background: spotlight }}
              aria-hidden="true"
            />

            {/* Glare blade: 45° light sweep on hover */}
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
                    "linear-gradient(45deg, transparent 20%, rgba(255,255,255,0.78) 50%, transparent 80%)",
                  willChange: "transform",
                }}
              />
            </div>

            {/* Specular top-edge highlight */}
            <div className="pointer-events-none absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

            {/* Content */}
            <div className="relative z-10 h-full p-6 flex flex-col">
              <motion.div
                variants={iconVariants}
                className={"flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#285992] to-[#427ab9] flex items-center justify-center mb-5"}
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
              >
                <Icon className="w-6 h-6 text-white" strokeWidth={1.7} />
              </motion.div>

              <h3 className="font-display font-bold text-[#1e293b] text-[1rem] mb-2 leading-snug tracking-tight">
                {titulo}
              </h3>
              <p className="font-sans font-normal text-[#475569] text-sm leading-relaxed">
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
function VantagensSection() {
  return (
    <section
      className="relative py-28 overflow-hidden bg-[#f4f7fb]"
    >      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1e293b] leading-none tracking-tighter antialiased mb-4">
            Vantagens do{" "}
            <span className="bg-gradient-to-r from-[#285992] to-[#427ab9] bg-clip-text text-transparent">
              motor de reservas
            </span>{" "}
            para hotéis e pousadas
          </h2>
          <p className="font-sans font-normal text-[#475569] text-lg leading-relaxed">
            Tudo o que o seu hotel precisa para vender mais,
            sem depender de intermediários.
          </p>
        </motion.div>

        {/* 3 × 2 Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {VANTAGENS.map((v, i) => (
            <Card key={i} {...v} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { VantagensSection };
