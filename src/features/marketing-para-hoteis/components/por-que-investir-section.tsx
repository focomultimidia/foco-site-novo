"use client";

import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useAnimation,
  type Variants,
} from "framer-motion";
import { Target, UserCheck, Share2, Sparkles, Gift } from "lucide-react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";

// ── Data ──────────────────────────────────────────────────────────────────────
// Grid assimétrico 2+3 num total de 6 colunas (lg:grid-cols-6): os 2
// primeiros motivos ganham mais respiro (col-span-3), os 3 seguintes dividem
// o resto (col-span-2 cada) — evita o "grid uniforme" que toda seção
// anterior/seguinte já usa em algum grau.
const MOTIVOS = [
  {
    icon: Target,
    titulo: "Apareça no momento certo",
    descricao:
      "Quando o viajante já está pesquisando o seu destino no Google, o seu hotel precisa estar lá — não um dia depois, quando ele já reservou em outro lugar.",
    span: "lg:col-span-3",
    trend: [2, 8, 5, 14, 10, 20],
  },
  {
    icon: UserCheck,
    titulo: "Tráfego que já quer reservar",
    descricao:
      "Atraia visitantes com intenção real de reserva, não curiosos que inflam o número de acessos e não convertem nada.",
    span: "lg:col-span-3",
    trend: [4, 6, 12, 9, 16, 22],
  },
  {
    icon: Share2,
    titulo: "Alcance nos públicos certos",
    descricao:
      "Amplie o alcance das suas publicações pros perfis que efetivamente convertem em hóspede, não pra qualquer um.",
    span: "lg:col-span-2",
    trend: [6, 5, 9, 8, 13, 17],
  },
  {
    icon: Sparkles,
    titulo: "Conteúdo que gera desejo",
    descricao:
      "Desperte o interesse pelo seu destino com conteúdo pensado pra hotelaria — não posts genéricos de agência.",
    span: "lg:col-span-2",
    trend: [3, 7, 6, 11, 9, 15],
  },
  {
    icon: Gift,
    titulo: "Oferta certa, hora certa",
    descricao:
      "Aumente a conversão exibindo pacotes e promoções pro hóspede certo, no momento exato da jornada dele.",
    span: "lg:col-span-2",
    trend: [5, 9, 8, 15, 12, 21],
  },
] as const;

// ── Animation variants ────────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
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

// ── Sparkline — reforça "isso é evidenciado", não só ícone decorativo ────────
function Sparkline({ points }: { points: readonly number[] }) {
  const max = Math.max(...points);
  const w = 64;
  const h = 22;
  const step = w / (points.length - 1);
  const d = points
    .map((v, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${(h - (v / max) * h).toFixed(1)}`)
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible" aria-hidden="true">
      <motion.path
        d={d}
        fill="none"
        stroke="#285992"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.55 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
      />
    </svg>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
interface CardProps {
  icon: React.ElementType;
  titulo: string;
  descricao: string;
  span: string;
  trend: readonly number[];
}

function Card({ icon: Icon, titulo, descricao, span, trend }: CardProps) {
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
    rotateY.set(((x - r.width / 2) / (r.width / 2)) * 6);
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
    glare.start({ x: "130%", transition: { duration: 0.46, ease: [0.4, 0, 0.2, 1] } });
  };

  return (
    <motion.div variants={cardReveal} className={`h-full ${span}`}>
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
            boxShadow:
              "0 1px 2px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.04), 0 8px 20px rgba(0,0,0,0.03), 0 16px 40px rgba(0,0,0,0.02)",
          }}
        >
          <div
            className="relative h-full rounded-[15px] overflow-hidden border border-white"
            style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
          >
            <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} aria-hidden="true" />

            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[15px]" aria-hidden="true">
              <motion.div
                animate={glare}
                initial={{ x: "-130%" }}
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(45deg, transparent 20%, rgba(255,255,255,0.78) 50%, transparent 80%)",
                  willChange: "transform",
                }}
              />
            </div>

            <div className="pointer-events-none absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

            <div className="relative z-10 flex h-full flex-col p-6">
              <div className="mb-5 flex items-center justify-between">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#285992] to-[#427ab9]"
                  style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
                >
                  <Icon className="h-6 w-6 text-white" strokeWidth={1.7} />
                </div>
                <Sparkline points={trend} />
              </div>

              <h3 className="font-display mb-2 text-[1.05rem] font-semibold leading-snug tracking-tight text-[#1e293b]">
                {titulo}
              </h3>
              <p className="font-sans text-sm font-normal leading-relaxed text-[#475569]">{descricao}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function PorQueInvestirSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7fb] py-24 lg:py-28">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <SectionEyebrow className="justify-center">Por que agora</SectionEyebrow>
          <h2 className="font-display mb-4 text-4xl font-semibold leading-none tracking-tighter text-[#1e293b] antialiased sm:text-5xl">
            O hóspede já decidiu viajar.
            <br />
            Falta decidir <span className="bg-gradient-to-r from-[#285992] to-[#427ab9] bg-clip-text text-transparent">com quem reservar</span>.
          </h2>
          <p className="font-sans text-lg font-normal leading-relaxed text-[#475569]">
            Cinco motivos pelos quais hotéis que investem em marketing de performance reservam mais direto — e pagam menos comissão.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {MOTIVOS.map((m, i) => (
            <Card key={i} {...m} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { PorQueInvestirSection };
