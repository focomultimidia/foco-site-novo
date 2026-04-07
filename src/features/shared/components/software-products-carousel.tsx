"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Check, Globe, Calendar, LayoutGrid, Monitor, CreditCard, Users, Smartphone, Link2 } from "lucide-react";
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

interface Produto {
  id: string;
  numero: string;
  titulo: string;
  descricao: string;
  beneficios: string[];
  link: string;
}

const produtosData: Produto[] = [
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

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "01": Globe,
  "02": Calendar,
  "03": LayoutGrid,
  "04": Monitor,
  "05": CreditCard,
  "06": Users,
  "07": Smartphone,
  "08": Link2,
};

const imageMap: Record<string, string> = {
  "01": "/site-hoteleiro.png",
  "02": "/motor-de-reservas.png",
  "03": "/channel-manager.png",
  "04": "/pms-integracoes.png",
  "05": "/software-de-pagamentos.png",
  "06": "/crm-hoteleiro.png",
  "07": "/foco-pass.png",
  "08": "/integracoes-hoteleiras.png",
};

function SoftwareProductsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1e3a5f] mb-4 leading-tight">
            Sistema para hotéis e pousadas{" "}
            <span className="text-blue-500">aprovado por 97%</span>
            <br />
            dos nossos clientes
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl mx-auto">
            Da reserva à gestão financeira, nossa plataforma reúne produtos
            inovadores para otimizar cada detalhe do seu hotel ou pousada
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {produtosData.map((produto) => {
              const Icon = iconMap[produto.numero] || Globe;
              const imageUrl = imageMap[produto.numero];

              return (
                <CarouselItem
                  key={produto.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
                >
                  <div className="group relative bg-white rounded-2xl p-5 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 overflow-hidden h-full">
                    {/* Background Number - very subtle */}
                    <div className="absolute -top-4 -right-4 text-[8rem] font-bold text-gray-100/80 leading-none select-none pointer-events-none z-0">
                      {produto.numero}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header with Title and Icon */}
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold text-[#1e3a5f] pr-10">
                          {produto.titulo}
                        </h3>
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Image */}
                      <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-xl overflow-hidden mb-4 p-4 flex items-center justify-center">
                        <img
                          src={imageUrl}
                          alt={produto.titulo}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      {/* Description */}
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                        {produto.descricao}
                      </p>

                      {/* Benefits List */}
                      <ul className="space-y-2 mb-4">
                        {produto.beneficios.map((beneficio, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-xs text-gray-600"
                          >
                            <Check className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                            <span className="line-clamp-1">{beneficio}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button - appears on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                        <Button
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2.5 text-sm font-medium"
                          asChild
                        >
                          <a
                            href={produto.link}
                            className="flex items-center justify-center gap-2"
                          >
                            Clique para mais detalhes
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Navigation Arrows - Desktop only */}
          <div className="hidden lg:block">
            <CarouselPrevious className="-left-12 top-1/2 -translate-y-1/2 bg-white border-gray-200 hover:bg-gray-50 hover:border-blue-300" />
            <CarouselNext className="-right-12 top-1/2 -translate-y-1/2 bg-white border-gray-200 hover:bg-gray-50 hover:border-blue-300" />
          </div>
        </Carousel>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-blue-500 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { SoftwareProductsCarousel };
