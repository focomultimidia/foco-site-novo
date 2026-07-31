"use client";

import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useAnimation,
  type Variants,
} from "framer-motion";
import { BarChart3, Calendar, Building2, Percent, Smartphone, Link2 } from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────
const RECURSOS = [
  {
    icon: BarChart3,
    titulo: "Relatórios de canais",
    descricao:
      "Compare de forma simplificada a produtividade de reservas de cada canal conectado.",
  },
  {
    icon: Calendar,
    titulo: "Único calendário",
    descricao:
      "Em um único calendário, é possível alimentar tarifas, disponibilidade e restrições em mais de 450 canais.",
  },
  {
    icon: Building2,
    titulo: "Integração com PMS",
    descricao:
      "Vários PMS's conectados para que as reservas, cancelamentos, alterações e disponibilidade sejam gerenciados pelo seu sistema de gestão hoteleira.",
  },
  {
    icon: Percent,
    titulo: "Markup do tarifário por canal",
    descricao:
      "Um único lançamento de tarifário e preços diferentes nos diversos canais de vendas.",
  },
  {
    icon: Smartphone,
    titulo: "Aplicativo mobile",
    descricao:
      "Gerencie, a qualquer momento, as tarifas, restrições e disponibilidade do seu hotel pelo nosso aplicativo.",
  },
  {
    icon: Link2,
    titulo: "Dependências",
    descricao:
      "Configure as dependências de tarifas, por acomodação e pax, em percentual, facilitando o lançamento do seu tarifário.",
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
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const spotlight = useMotionTemplate`radial-gradient(350px circle at ${mx}px ${my}px, rgba(255,255,255,0.40), transparent 70%)`;

  const rotateX = useSpring(0, { stiffness: 260, damping: 28 });
  const rotateY = useSpring(0, { stiffness: 260, damping: 28 });

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
        <div
          className="relative h-full rounded-3xl p-[1px]"
          style={{
            background: "rgba(255,255,255,0.00)",
            boxShadow:
              "0 1px 2px rgba(0,0,0,0.04), " +
              "0 4px 8px rgba(0,0,0,0.04), " +
              "0 8px 20px rgba(0,0,0,0.03), " +
              "0 16px 40px rgba(0,0,0,0.02)",
          }}
        >
          <div
            className="relative h-full rounded-[15px] overflow-hidden border border-white"
            style={{
              background: "rgba(255,255,255,0.00)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ background: spotlight }}
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
                    "linear-gradient(45deg, transparent 20%, rgba(255,255,255,0.78) 50%, transparent 80%)",
                  willChange: "transform",
                }}
              />
            </div>

            <div className="pointer-events-none absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

            <div className="relative z-10 h-full p-6 flex flex-col">
              <motion.div
                variants={iconVariants}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#285992] to-[#427ab9] flex items-center justify-center mb-5"
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
function RecursosSection() {
  return (
    <section
      className="relative py-28 overflow-hidden bg-[#f4f7fb]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1e293b] leading-none tracking-tighter antialiased mb-4">
            Confira alguns recursos do{" "}
            <span className="bg-gradient-to-r from-[#285992] to-[#427ab9] bg-clip-text text-transparent">
              melhor gestor de canais
            </span>{" "}
            do Brasil
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {RECURSOS.map((v, i) => (
            <Card key={i} {...v} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { RecursosSection };
