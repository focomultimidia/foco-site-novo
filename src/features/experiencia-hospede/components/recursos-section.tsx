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
} from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────
const RECURSOS = [
  {
    icon: Star,
    titulo: "Avaliações",
    descricao:
      "Sua opinião é valiosa! Compartilhe sua experiência de forma rápida e ajude-nos a tornar sua próxima estadia ainda melhor.",
  },
  {
    icon: CheckCircle,
    titulo: "Check-in online",
    descricao:
      "Agilidade total! Faça seu check-in antes mesmo de chegar ao hotel e vá direto para o seu quarto, sem filas na recepção.",
  },
  {
    icon: QrCode,
    titulo: "Pagamento de contas (PIX)",
    descricao:
      "Pague sua conta de forma instantânea e segura. Encerre seu consumo e faça o check-out com a rapidez do PIX.",
  },
  {
    icon: Utensils,
    titulo: "Cardápio digital",
    descricao:
      "Acesse o menu completo do restaurante e serviço de quarto diretamente do seu celular. Faça seu pedido com facilidade.",
  },
  {
    icon: Sparkles,
    titulo: "Comodidades do hotel",
    descricao:
      "Conheça todos os serviços e facilidades que o hotel oferece. Saiba horários de funcionamento e regras de uso em um só lugar.",
  },
  {
    icon: Building,
    titulo: "Sobre o hotel",
    descricao:
      "Nossa história e missão. Conheça a filosofia do hotel e o compromisso que temos em tornar sua estadia inesquecível.",
  },
  {
    icon: Calendar,
    titulo: "Programação do hotel",
    descricao:
      "Não perca nada! Fique por dentro de todos os eventos, atividades e horários de lazer que o hotel preparou.",
  },
  {
    icon: Wifi,
    titulo: "Wifi",
    descricao:
      "Conecte-se em segundos. Obtenha a senha e as instruções de acesso à nossa rede Wi-Fi de alta velocidade.",
  },
  {
    icon: Bell,
    titulo: "Push interativo",
    descricao:
      "Aplicativo com alerta de toda a programação de entretenimento do seu hotel e destino.",
  },
  {
    icon: Receipt,
    titulo: "Acompanhamento de consumo",
    descricao:
      "Transparência total! Visualize em tempo real todos os seus gastos no hotel, evitando surpresas no check-out.",
  },
  {
    icon: MessageCircle,
    titulo: "Integração via WhatsApp",
    descricao:
      "Fale diretamente com a recepção ou serviço de quarto para tirar dúvidas ou fazer pedidos de forma rápida.",
  },
  {
    icon: MapPin,
    titulo: "Como chegar",
    descricao:
      "Rota fácil e sem erro. Acesse o mapa e as direções detalhadas para chegar ao hotel de forma rápida.",
  },
] as const;

// ── Animation variants ────────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
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
        <div
          className="relative h-full rounded-3xl p-[1px]"
          style={{ background: "rgba(0,0,0,0.05)" }}
        >
          <motion.div
            className="absolute inset-0 rounded-3xl"
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
    <section className="relative py-24 bg-[#f4f7fb] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0f172a] leading-none tracking-tighter antialiased mb-3">
            Confira alguns recursos do mais inovador{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              aplicativo de hospedagem
            </span>
          </h2>
          <p className="font-sans font-normal text-[#64748b] text-lg leading-relaxed">
            Do check-in online ao pagamento via PIX: a tecnologia que coloca o controle
            da estadia na palma da mão do seu hóspede.
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
