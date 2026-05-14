"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Globe,
  Calendar,
  LayoutGrid,
  Monitor,
  CreditCard,
  Users,
  Smartphone,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProdutoData {
  id: string;
  numero: string;
  titulo: string;
  descricao: string;
  beneficios: string[];
  link: string;
}

// ── Canonical data — single source of truth for both view modes ───────────────

const PRODUTOS: ProdutoData[] = [
  {
    id: "1",
    numero: "01",
    titulo: "Site Hoteleiro",
    descricao: "Site profissional com motor de reservas integrado para converter visitantes em hóspedes.",
    beneficios: ["Design responsivo", "SEO otimizado", "Conversão alta"],
    link: "/site-hoteleiro",
  },
  {
    id: "2",
    numero: "02",
    titulo: "Motor de Reservas",
    descricao: "Sistema de reservas diretas que elimina comissões de OTAs e aumenta seu lucro.",
    beneficios: ["Zero comissão", "Confirmação instantânea", "Pagamento integrado"],
    link: "/motor-reservas",
  },
  {
    id: "3",
    numero: "03",
    titulo: "Channel Manager",
    descricao: "Sincronização automática de disponibilidade e tarifas em todos os canais.",
    beneficios: ["Sincronização em tempo real", "Mais de 100 canais", "Prevenção de overbooking"],
    link: "/channel-manager",
  },
  {
    id: "4",
    numero: "04",
    titulo: "Gestão Hoteleira",
    descricao: "PMS completo para gerenciar todas as operações do seu hotel em um só lugar.",
    beneficios: ["Controle de quartos", "Gestão de hóspedes", "Relatórios completos"],
    link: "/gestao-hoteleira",
  },
  {
    id: "5",
    numero: "05",
    titulo: "Software de Pagamentos",
    descricao: "Processamento seguro de pagamentos com múltiplas formas de pagamento.",
    beneficios: ["Pix, cartão e boleto", "Antecipação de recebíveis", "Segurança PCI"],
    link: "/software-pagamentos",
  },
  {
    id: "6",
    numero: "06",
    titulo: "CRM Hoteleiro",
    descricao: "Relacionamento com hóspedes para fidelização e campanhas personalizadas.",
    beneficios: ["Segmentação inteligente", "Automação de marketing", "Histórico completo"],
    link: "/crm-hoteleiro",
  },
  {
    id: "7",
    numero: "07",
    titulo: "Foco Pass",
    descricao: "Programa de fidelidade para aumentar o retorno dos seus hóspedes.",
    beneficios: ["Pontos e recompensas", "Benefícios exclusivos", "Retenção de clientes"],
    link: "/foco-pass",
  },
  {
    id: "8",
    numero: "08",
    titulo: "Integrações Hoteleiras",
    descricao: "Conecte seu hotel com as principais ferramentas do mercado hoteleiro.",
    beneficios: ["API aberta", "100+ integrações", "Sincronização automática"],
    link: "/integracoes",
  },
];

// ── Icon / image maps ─────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "01": Globe,
  "02": Calendar,
  "03": LayoutGrid,
  "04": Monitor,
  "05": CreditCard,
  "06": Users,
  "07": Smartphone,
  "08": Link2,
};

const IMAGE_MAP: Record<string, string> = {
  "01": "/site-hoteleiro.png",
  "02": "/motor-de-reservas.png",
  "03": "/channel-manager.png",
  "04": "/pms-integracoes.png",
  "05": "/software-de-pagamentos.png",
  "06": "/crm-hoteleiro.png",
  "07": "/foco-pass.png",
  "08": "/integracoes-hoteleiras.png",
};

// ── Section header ────────────────────────────────────────────────────────────

function ShowcaseHeader({ animate }: { animate: boolean }) {
  const content = (
    <div className="text-center mb-12">
      <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
        Sistema para hotéis e pousadas{" "}
        <span className="text-blue-500">aprovado por 97%</span>{" "}
        dos nossos clientes
      </h2>
      <p className="text-gray-500 mt-4 max-w-3xl mx-auto leading-relaxed">
        Da reserva à gestão financeira, nossa plataforma reúne produtos inovadores
        para otimizar cada detalhe do seu hotel ou pousada
      </p>
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {content}
    </motion.div>
  );
}

// ── ProductCard ───────────────────────────────────────────────────────────────

interface ProductCardProps {
  produto: ProdutoData;
  index: number;
  fullHeight?: boolean;
  withEntryAnimation?: boolean;
}

function ProductCard({
  produto,
  index,
  fullHeight = false,
  withEntryAnimation = false,
}: ProductCardProps) {
  const Icon  = ICON_MAP[produto.numero] ?? Globe;
  const image = IMAGE_MAP[produto.numero];

  const card = (
    <div
      className={`
        group relative
        bg-white rounded-2xl p-5
        border border-gray-100 hover:border-blue-100
        shadow-sm hover:shadow-xl
        transition-all duration-300 overflow-hidden
        ${fullHeight ? "flex flex-col h-full" : ""}
      `}
    >
      <div className={`relative z-10 ${fullHeight ? "flex flex-col h-full" : ""}`}>

        {/* Title + icon */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display font-bold text-[#1e3a5f] tracking-tight leading-snug text-lg pr-10">
            {produto.titulo}
          </h3>
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200 shadow-md shadow-blue-500/25">
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Product image */}
        <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-xl overflow-hidden mb-4 p-4 flex items-center justify-center">
          <img
            src={image}
            alt={produto.titulo}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Description */}
        <p className={`text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 ${fullHeight ? "flex-grow" : ""}`}>
          {produto.descricao}
        </p>

        {/* Benefits list */}
        <ul className="space-y-2 mb-4">
          {produto.beneficios.map((b) => (
            <li key={b} className="flex items-center gap-2 text-xs text-gray-600">
              <Check className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              <span className="line-clamp-1">{b}</span>
            </li>
          ))}
        </ul>

        {/* CTA — reveals on hover */}
        <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${fullHeight ? "mt-auto" : ""}`}>
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2.5 text-sm font-medium"
            asChild
          >
            <a href={produto.link} className="flex items-center justify-center gap-2">
              Clique para mais detalhes
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>

      </div>
    </div>
  );

  if (!withEntryAnimation) return card;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {card}
    </motion.div>
  );
}

// ── GridView ──────────────────────────────────────────────────────────────────

function GridView({ produtos }: { produtos: ProdutoData[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {produtos.map((p, i) => (
        <ProductCard key={p.id} produto={p} index={i} withEntryAnimation />
      ))}
    </div>
  );
}

// ── CarouselView ──────────────────────────────────────────────────────────────

function CarouselView({ produtos }: { produtos: ProdutoData[] }) {
  const [api, setApi]         = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount]     = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const scrollTo = useCallback((i: number) => api?.scrollTo(i), [api]);

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {produtos.map((p, i) => (
            <CarouselItem key={p.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
              <ProductCard produto={p} index={i} fullHeight />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="hidden lg:block">
          <CarouselPrevious className="-left-12 top-1/2 -translate-y-1/2 bg-white border-gray-200 hover:bg-gray-50 hover:border-blue-300" />
          <CarouselNext    className="-right-12 top-1/2 -translate-y-1/2 bg-white border-gray-200 hover:bg-gray-50 hover:border-blue-300" />
        </div>
      </Carousel>

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-blue-500" : "w-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </>
  );
}

// ── ProductShowcase ───────────────────────────────────────────────────────────

export interface ProductShowcaseProps {
  viewMode?: "grid" | "carousel";
  produtos?: ProdutoData[];
}

function ProductShowcase({ viewMode = "carousel", produtos }: ProductShowcaseProps) {
  const items = produtos ?? PRODUTOS;

  return (
    <section className={`py-20 ${viewMode === "grid" ? "bg-white" : "bg-slate-50"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ShowcaseHeader animate={viewMode === "grid"} />
        {viewMode === "grid"
          ? <GridView     produtos={items} />
          : <CarouselView produtos={items} />
        }
      </div>
    </section>
  );
}

export { ProductShowcase };
