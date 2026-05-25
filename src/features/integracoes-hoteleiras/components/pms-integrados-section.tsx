"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const pmsIntegrados = [
  {
    nome: "Plus",
    logo: "/assets/imgs/integracoes/pms/plus.png",
    descricao:
      "Sistema de gestão hoteleira em nuvem desenvolvido pela Foco Tecnologia, para pequenos hoteleiros. Integrado ao motor de reservas e ao gestor de canais, os clientes terão a tranquilidade de disponibilizar 100% das suas ocupações para vendas em mais de 800 canais integrados, sem overbookings.",
  },
  {
    nome: "ADM",
    logo: "/assets/imgs/integracoes/pms/adm-hoteleiro.png",
    descricao:
      "A ADM Desenvolvimento de Sistemas é uma empresa de tecnologia, sediada em Ilhéus-BA, criada em 2008, que desenvolve e comercializa o ADM Hotel e o ADM Restaurante, ferramentas para gestão de hotéis, pousadas, bares, restaurantes e similares com mais de 1200 licenças em todo o Brasil.",
  },
  {
    nome: "Bitz",
    logo: "/assets/imgs/integracoes/pms/bitz.png",
    descricao:
      "A Bitz Softwares está há mais de 9 anos no mercado, uma empresa de tecnologia especializada no setor hoteleiro. Nosso propósito é gerar ótimas experiências para as pessoas. Facilitando suas vidas, economizando seu tempo e aumentando seu rendimento no dia-a-dia.",
  },
  {
    nome: "Carsoft",
    logo: "/assets/imgs/integracoes/pms/carsoft.png",
    descricao:
      "Xenios – Sistema de gestão de hotéis, pousadas e hostels de fácil utilização. Possui integração com outros módulos como estoque, restaurante, financeiro, eventos, controle de serviços e reserva online direto pelo site do hotel/pousada. Conta com suporte 24 horas.",
  },
  {
    nome: "Desbravador",
    logo: "/assets/imgs/integracoes/pms/desbravador.png",
    descricao:
      "Atuamos no desenvolvimento de software para a gestão de hotéis desde 1988. Somos Desbravadores! Atendemos hotéis de pequeno, médio e grande porte, fornecendo soluções que otimizam suas operações e aprimoram a experiência do hóspede. Hoje são mais de 3.500 clientes espalhados em dez países.",
  },
  {
    nome: "eSolution",
    logo: "/assets/imgs/integracoes/pms/esolution.png",
    descricao:
      "A eSolution é uma empresa de software que está no mercado desde 2007. Sua atuação está focada em softwares de gestão em hotelaria e parques temáticos. Com um ideal de excelência, ela vem ganhando destaque nesses setores.",
  },
  {
    nome: "HMAX",
    logo: "/assets/imgs/integracoes/pms/hmax.png",
    descricao:
      "A HMAX é uma empresa pioneira no mercado de automação hoteleira. O nosso sistema de gestão oferece 30 anos de conhecimento organizados em módulos, que você pode contratar segundo a sua necessidade. O PMS HMAX está integrado com a Foco Multimídia.",
  },
  {
    nome: "Hotelflow",
    logo: "/assets/imgs/integracoes/pms/hotelflow.png",
    descricao:
      "Com o Hotelflow, você tem em mãos um gerenciamento moderno, prático e intuitivo para aumentar a produtividade do seu empreendimento hoteleiro. O sistema é web, não requer instalação, basta acessar pelo seu navegador e usar de qualquer lugar, até mesmo do seu dispositivo móvel!",
  },
  {
    nome: "Isasoft",
    logo: "/assets/imgs/integracoes/pms/isasoft.png",
    descricao:
      "Empresa voltada para o desenvolvimento de sistemas para gerenciamento de micros e pequenas empresas do comércio para todo o território nacional. O Isasoft Inn, foi desenvolvido para administrar pousadas, hotéis e resorts de forma rápida e profissional.",
  },
  {
    nome: "MDE",
    logo: "/assets/imgs/integracoes/pms/mde.png",
    descricao:
      "Há mais de 27 anos a MDE Informática projeta e desenvolve Sistemas de Gestão para os segmentos Hoteleiro e Motelero. Nosso diferencial está em oferecer soluções personalizadas para a necessidade específica de cada cliente.",
  },
  {
    nome: "Newhotel",
    logo: "/assets/imgs/integracoes/pms/newhotel.png",
    descricao:
      "Uma empresa de software especializada em desenvolver sistemas para gestão hoteleira. Pioneiros internacionais em soluções Cloud para o setor hoteleiro, estamos no mercado há 37 anos e possuímos um portfólio com mais de 6 mil hotéis, em 64 países.",
  },
  {
    nome: "Queops",
    logo: "/assets/imgs/integracoes/pms/queops.png",
    descricao:
      "A Quéops possui integração com a Foco, permitindo uma comunicação direta entre os sistemas para troca de informações como disponibilidade, tarifas e reservas. Essa conexão otimiza rotinas, evita inconsistências de dados e facilita o controle da operação hoteleira.",
  },
  {
    nome: "Sachar",
    logo: "/assets/imgs/integracoes/pms/saghar.png",
    descricao:
      "A Sachar (SGH) possui integração com a Foco, permitindo uma comunicação direta entre os sistemas para troca de informações como disponibilidade, tarifas e reservas. Essa conexão otimiza rotinas, evita inconsistências de dados e facilita o controle da operação hoteleira.",
  },
  {
    nome: "Silbeck",
    logo: "/assets/imgs/integracoes/pms/silbeck.png",
    descricao:
      "Somos uma empresa de software para gestão hoteleira. Atuamos há 25 anos no mercado com foco na busca da excelência em nosso atendimento e no desenvolvimento de nossos produtos. O nosso objetivo nunca foi oferecer apenas um sistema de gestão.",
  },
  {
    nome: "Simpleshotel",
    logo: "/assets/imgs/integracoes/pms/simpleshotel.png",
    descricao:
      "A Simple Hotel possui integração com a Foco, permitindo uma comunicação direta entre os sistemas para troca de informações como disponibilidade, tarifas e reservas. Essa conexão otimiza rotinas, evita inconsistências de dados e facilita o controle da operação hoteleira.",
  },
  {
    nome: "Techside",
    logo: "/assets/imgs/integracoes/pms/techside.png",
    descricao:
      "A TechSide (TechHotel) possui integração com a Foco, permitindo uma comunicação direta entre os sistemas para troca de informações como disponibilidade, tarifas e reservas. Essa conexão otimiza rotinas, evita inconsistências de dados e facilita o controle da operação hoteleira.",
  },
  {
    nome: "Tô de Férias",
    logo: "/assets/imgs/integracoes/pms/to-de-ferias.png",
    descricao:
      "O TDF Hotel é um PMS completo, integrando as rotinas de recepção, reservas, governança, financeiro e estoque, que possui integrações comerciais e administrativas, além de configurações personalizadas e foco no relacionamento entre hoteleiro e hóspede.",
  },
  {
    nome: "TOTVS",
    logo: "/assets/imgs/integracoes/pms/totvs.png",
    descricao:
      "A TOTVS cresce junto com a sua empresa. Aumente sua eficiência operacional e produtividade com um software completo para gestão e automação de processos. Não perca tempo e automatize a sua gestão de reservas, unificando toda a sua disponibilidade em um só sistema.",
  },
];

// ── MagneticButton ────────────────────────────────────────────────────────────

const MAGNETIC_RADIUS   = 68;
const MAGNETIC_STRENGTH = 0.30;

function MagneticButton() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const magX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const magY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = outerRef.current;
      if (!el) return;
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < MAGNETIC_RADIUS) {
        const f = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH;
        magX.set(dx * f);
        magY.set(dy * f);
      } else {
        magX.set(0);
        magY.set(0);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [magX, magY]);

  return (
    <div ref={outerRef} className="w-full">
      <motion.button
        type="button"
        style={{ x: magX, y: magY }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          magX.set(0);
          magY.set(0);
        }}
        whileTap={{ scale: 0.96 }}
        className="relative w-full flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full overflow-hidden border border-slate-200 text-slate-600 transition-colors duration-300 shadow-sm hover:shadow-md hover:shadow-blue-500/20 hover:text-white hover:border-transparent"
      >
        <span
          className={`absolute inset-0 bg-gradient-to-r from-[#1e3a5f] to-[#285992] transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <span className="relative z-10">Solicite orçamento</span>
        <motion.span
          className="relative z-10 flex-shrink-0"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </motion.button>
    </div>
  );
}

// ── PmsCard ───────────────────────────────────────────────────────────────────

interface PmsItem {
  nome:      string;
  logo:      string;
  descricao: string;
}

interface PmsCardProps {
  pms:       PmsItem;
  index:     number;
  isHovered: boolean;
  isBlurred: boolean;
  onEnter:   () => void;
}

function PmsCard({ pms, index, isHovered, isBlurred, onEnter }: PmsCardProps) {
  return (
    // Outer div: scroll entrance animation
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type:      "spring",
        damping:   20,
        stiffness: 100,
        delay:     (index % 4) * 0.06,
      }}
    >
      {/* Inner div: sibling focus/blur state */}
      <motion.div
        onMouseEnter={onEnter}
        animate={{
          opacity:   isBlurred ? 0.42 : 1,
          filter:    isBlurred ? "blur(2px)" : "blur(0px)",
          scale:     isHovered ? 1.02  : 1,
          boxShadow: isHovered
            ? "0 16px 48px rgba(30,58,95,0.13), 0 4px 12px rgba(30,58,95,0.06)"
            : "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col h-full"
      >
        <div className="p-5 flex flex-col h-full">

          {/* Logo */}
          <div className="h-14 flex items-center justify-center mb-4">
            <img
              src={pms.logo}
              alt={pms.nome}
              className="max-h-full max-w-[140px] w-auto object-contain transition-all duration-500"
              style={{
                filter:    isHovered ? "grayscale(0%) opacity(1)"   : "grayscale(100%) opacity(0.5)",
                transform: isHovered ? "scale(1.06)" : "scale(1)",
              }}
            />
          </div>

          <p className="text-slate-500 text-sm leading-relaxed flex-grow mb-4">
            {pms.descricao}
          </p>

          <MagneticButton />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

function PmsIntegradosSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(100,116,139,0.13) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Radial mask — fades dots at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 50% 50%, transparent 30%, #f8fafc 100%)",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            Conheça os{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              PMS's integrados
            </span>{" "}
            com a Foco Tecnologia
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Nosso sistema se conecta aos principais PMS do mercado brasileiro,
            garantindo sincronização em tempo real e eliminando retrabalho.
          </p>
        </motion.div>

        {/* Grid — 1 col mobile · 2 cols tablet · 4 cols desktop */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {pmsIntegrados.map((pms, index) => (
            <PmsCard
              key={pms.nome}
              pms={pms}
              index={index}
              isHovered={hoveredIndex === index}
              isBlurred={hoveredIndex !== null && hoveredIndex !== index}
              onEnter={() => setHoveredIndex(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export { PmsIntegradosSection };
