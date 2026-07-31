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
  Bed,
  Tag,
  Image,
  Star,
  Building,
  Newspaper,
  Award,
  LayoutTemplate,
  Calendar,
  MessageCircle,
  FormInput,
  Bot,
} from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────
const RECURSOS = [
  {
    icon: Bed,
    titulo: "Acomodações com Detalhes",
    descricao:
      "Exiba fotos, descrições, preços e diferenciais de cada tipo de quarto.",
  },
  {
    icon: Tag,
    titulo: "Pacotes e Promoções",
    descricao:
      "Crie ofertas sazonais ou personalizadas e aumente suas vendas diretas.",
  },
  {
    icon: Image,
    titulo: "Galeria de Fotos e Vídeos",
    descricao:
      "Encante seus visitantes com imagens e vídeos profissionais do hotel.",
  },
  {
    icon: Star,
    titulo: "Depoimentos e Avaliações",
    descricao:
      "Mostre a opinião de hóspedes reais e gere mais confiança no seu hotel.",
  },
  {
    icon: Building,
    titulo: "Página Institucional",
    descricao:
      "Conte a história do seu hotel e reforce sua credibilidade com visitantes.",
  },
  {
    icon: Newspaper,
    titulo: "Notícias e Atualizações",
    descricao:
      "Divulgue eventos, ações especiais e novidades para atrair mais tráfego.",
  },
  {
    icon: Award,
    titulo: "Prêmios e Certificações",
    descricao:
      "Destaque selos de qualidade que comprovam sua excelência no setor.",
  },
  {
    icon: LayoutTemplate,
    titulo: "Banners Promocionais",
    descricao:
      "Promova ofertas e eventos com banners estratégicos no seu site.",
  },
  {
    icon: Calendar,
    titulo: "Eventos e Datas Especiais",
    descricao:
      "Crie páginas dedicadas para eventos, casamentos ou pacotes temáticos.",
  },
  {
    icon: MessageCircle,
    titulo: "Integração com WhatsApp",
    descricao:
      "Permita que o hóspede tire dúvidas e reserve direto pelo WhatsApp.",
  },
  {
    icon: FormInput,
    titulo: "Formulários de Contato Rápido",
    descricao:
      "Capte leads e reservas com formulários simples e intuitivos.",
  },
  {
    icon: Bot,
    titulo: "Chatbot Inteligente Integrado",
    descricao:
      "Atenda visitantes automaticamente e aumente suas chances de conversão.",
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
function RecursosGridSection() {
  return (
    <section className="relative py-24 bg-[#f4f7fb] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 max-w-4xl mx-auto"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0f172a] leading-none tracking-tighter antialiased mb-3">
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              Recursos essenciais
            </span>{" "}
            de um site hoteleiro que converte visitantes em hóspedes
          </h2>
          <p className="font-sans font-normal text-[#64748b] text-lg leading-relaxed max-w-3xl mx-auto">
            A Foco oferece recursos práticos, integrados e pensados para destacar
            sua estrutura, engajar visitantes e gerar reservas diretas, sem comissões.
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

export { RecursosGridSection };
