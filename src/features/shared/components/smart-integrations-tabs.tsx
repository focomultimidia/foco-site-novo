"use client";

import { useState, useEffect, useRef } from "react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { Globe, Building2, CreditCard, TrendingUp } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion, useInView } from "framer-motion";

interface Logo {
  src: string;
  alt: string;
}

interface TabData {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  logos: Logo[];
}

const tabsData: TabData[] = [
  {
    id: "canais",
    label: "Canais",
    icon: Globe,
    description:
      "Conecte-se a Mais de 800 canais de vendas, garantindo mais visibilidade e menos overbooking.",
    logos: [
      { src: "/assets/imgs/integracoes/canais/booking.svg", alt: "Booking.com" },
      { src: "/assets/imgs/integracoes/canais/airbnb.svg", alt: "Airbnb" },
      { src: "/assets/imgs/logos/expedia.svg", alt: "Expedia" },
      { src: "/assets/imgs/logos/decolar.svg", alt: "Decolar" },
      { src: "/assets/imgs/integracoes/canais/agoda.svg", alt: "Agoda" },
      { src: "/assets/imgs/integracoes/canais/trivago.svg", alt: "Trivago" },
      { src: "/assets/imgs/integracoes/canais/tripadvisor.svg", alt: "Tripadvisor" },
      { src: "/assets/imgs/integracoes/canais/abracorp.svg", alt: "Abracorp" },
      { src: "/assets/imgs/integracoes/canais/almundo.svg", alt: "Almundo" },
      { src: "/assets/imgs/integracoes/canais/avipam.webp", alt: "Avipam" },
      { src: "/assets/imgs/logos/b2b-reservas.svg", alt: "B2B Reservas" },
      { src: "/assets/imgs/integracoes/canais/belvitur.svg", alt: "Belvitur" },
      { src: "/assets/imgs/integracoes/canais/bestday.svg", alt: "BestDay" },
      { src: "/assets/imgs/integracoes/canais/copastur.webp", alt: "Copastur" },
      { src: "/assets/imgs/integracoes/canais/costa-brava.webp", alt: "Costa Brava" },
      { src: "/assets/imgs/integracoes/canais/cwt.webp", alt: "CWT" },
      { src: "/assets/imgs/integracoes/canais/google-hotels.svg", alt: "Google Hotéis" },
      { src: "/assets/imgs/integracoes/canais/grupo-flytour.svg", alt: "Grupo Flytour" },
      { src: "/assets/imgs/integracoes/canais/hostway.svg", alt: "Hostway" },
      { src: "/assets/imgs/integracoes/canais/hotelbeds.svg", alt: "Hotelbeds" },
      { src: "/assets/imgs/integracoes/canais/jetstream.svg", alt: "Jet Stream" },
      { src: "/assets/imgs/integracoes/canais/kontik.webp", alt: "Kontik" },
      { src: "/assets/imgs/integracoes/canais/luck.svg", alt: "Luck Viagens" },
      { src: "/assets/imgs/integracoes/canais/maiorca.svg", alt: "Maiorca Turismo" },
      { src: "/assets/imgs/integracoes/canais/maringa.webp", alt: "Maringa Turismo" },
      { src: "/assets/imgs/integracoes/canais/pontestur.webp", alt: "PontesTur" },
      { src: "/assets/imgs/integracoes/canais/primus.webp", alt: "Primus Turismo Viagens" },
      { src: "/assets/imgs/integracoes/canais/sabre.svg", alt: "Sabre" },
      { src: "/assets/imgs/integracoes/canais/solid.webp", alt: "Solid Gestão de Despesas e Viagens" },
      { src: "/assets/imgs/integracoes/canais/tivolitur.webp", alt: "Tivolitur" },
      { src: "/assets/imgs/integracoes/canais/tour-house.webp", alt: "Tour House" },
      { src: "/assets/imgs/integracoes/canais/tourico.webp", alt: "Tourico Holidays" },
      { src: "/assets/imgs/integracoes/canais/tristar.webp", alt: "Tristar" },
      { src: "/assets/imgs/integracoes/canais/voetur.webp", alt: "Voetur" },
    ],
  },
  {
    id: "pms",
    label: "PMS's",
    icon: Building2,
    description:
      "Integramos com os principais sistemas de gestão hoteleira do mercado.",
    logos: [
      { src: "/assets/imgs/integracoes/pms/plus.webp", alt: "Plus" },
      { src: "/assets/imgs/integracoes/pms/totvs.svg", alt: "TOTVS" },
      { src: "/assets/imgs/integracoes/pms/hmax.svg", alt: "Hmax" },
      { src: "/assets/imgs/integracoes/pms/silbeck.svg", alt: "Silbeck" },
      { src: "/assets/imgs/integracoes/pms/bitz.svg", alt: "Bitz" },
      //{ src: "/assets/imgs/integracoes/pms/desbravador.webp", alt: "Desbravador" },
      { src: "/assets/imgs/integracoes/pms/hotelflow.svg", alt: "Hotelflow" },
      //{ src: "/assets/imgs/integracoes/pms/hits.webp", alt: "Hits" },
      { src: "/assets/imgs/integracoes/pms/adm-hoteleiro.svg", alt: "ADM Hoteleiro" },
      { src: "/assets/imgs/integracoes/pms/to-de-ferias.svg", alt: "Tô de Férias" },
      { src: "/assets/imgs/integracoes/pms/techside.svg", alt: "Techside" },
      { src: "/assets/imgs/integracoes/pms/carsoft.svg", alt: "Carsoft" },
      { src: "/assets/imgs/integracoes/pms/conia.webp", alt: "ConIA Hotéis" },
      { src: "/assets/imgs/integracoes/pms/control-hotel.svg", alt: "Control Hotel Softwares" },
      { src: "/assets/imgs/integracoes/pms/esolution.svg", alt: "eSolution" },
      { src: "/assets/imgs/integracoes/pms/isasoft.svg", alt: "IsaSoft" },
      { src: "/assets/imgs/integracoes/pms/mde.svg", alt: "MDE" },
      { src: "/assets/imgs/integracoes/pms/newhotel.svg", alt: "New Hotel" },
      { src: "/assets/imgs/integracoes/pms/queops.svg", alt: "Queops" },
      { src: "/assets/imgs/integracoes/pms/saghar.svg", alt: "Saghar" },
      { src: "/assets/imgs/integracoes/pms/simplehotel.svg", alt: "Simple Hotel Software" },
    ],
  },
  {
    id: "pagamentos",
    label: "Pagamentos",
    icon: CreditCard,
    description:
      "Múltiplas opções de pagamento integradas para maior conversão.",
    logos: [
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/stone.svg", alt: "Stone" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/cielo.svg", alt: "Cielo" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/pagarme.svg", alt: "Pagarme" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/pagseguro.svg", alt: "PagSeguro" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/rede.svg", alt: "Rede" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/getnet.svg", alt: "GetNet" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/payzen.svg", alt: "PayZen" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/sicredi.svg", alt: "Sicredi" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/sipag.svg", alt: "Sipag" },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: TrendingUp,
    description:
      "Ferramentas de marketing digital para aumentar sua presença online.",
    logos: [
      { src: "/assets/imgs/integracoes/marketing/google-ads.svg", alt: "Google Ads" },
      { src: "/assets/imgs/integracoes/marketing/facebook-ads.svg", alt: "Facebook Ads" },
      { src: "/assets/imgs/integracoes/marketing/rd-station.svg", alt: "RD Station" },
      { src: "/assets/imgs/integracoes/marketing/facebook-pixel.svg", alt: "Facebook Pixel" },
      { src: "/assets/imgs/logos/reprotel.svg", alt: "Reprotel" },
      { src: "/assets/imgs/logos/tribuzana.svg", alt: "Tribuzana" },
      { src: "/assets/imgs/integracoes/marketing/google-analytics.svg", alt: "Google Analytics" },
      { src: "/assets/imgs/integracoes/marketing/google-search-console.svg", alt: "Google Search Console" },
      { src: "/assets/imgs/integracoes/marketing/google-tag-manager.svg", alt: "Google Tag Manager" },
    ],
  },
];

function LogoCard({ src, alt }: Logo) {
  return (
    <div className="flex items-center justify-center p-4 h-24 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default select-none">
      <img src={src} alt={alt} width={228} height={80} loading="lazy" decoding="async" className="h-14 w-full object-contain" />
    </div>
  );
}

type AutoplayPlugin = { play: () => void; stop: () => void };

// Carousel that starts only after the parent section enters the viewport.
// playOnInit: false prevents the plugin from auto-starting on mount;
// the useEffect below drives play/stop based on the inView signal.
function LogoCarousel({ logos, inView }: { logos: Logo[]; inView: boolean }) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const autoplay = api.plugins()?.autoplay as AutoplayPlugin | undefined;
    if (!autoplay) return;
    if (inView) {
      autoplay.play();
    } else {
      autoplay.stop();
    }
  }, [api, inView]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      plugins={[
        Autoplay({
          delay: 1800,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
          playOnInit: false,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {logos.map((logo) => (
          <CarouselItem
            key={logo.alt}
            className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
          >
            <LogoCard src={logo.src} alt={logo.alt} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

function SmartIntegrationsTabs() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [activeTab, setActiveTab] = useState(tabsData[0].id);

  return (
    <section ref={sectionRef} className="py-20 bg-[#f4f7fb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <SectionEyebrow>Nossas integrações</SectionEyebrow>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">Integrações</span> que conectam todo o <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">ecossistema hoteleiro</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation — 2×2 grid on mobile, pill row on desktop. */}
          <div className="mb-8 md:flex md:justify-center">
            <TabsList className="grid grid-cols-2 w-full rounded-3xl md:inline-flex md:flex-nowrap md:w-auto md:rounded-full md:min-w-max h-auto gap-1 p-1.5 border bg-slate-100 border-slate-200">
              {tabsData.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.id === activeTab;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="relative flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl md:rounded-full md:px-5 md:py-2.5 md:whitespace-nowrap"
                  >
                    {/* Pílula que desliza entre as abas — mesma técnica (layoutId)
                        usada no RecursosGridSection: o Framer Motion anima
                        posição e largura sozinho quando o elemento "pula" de
                        um botão para o outro. */}
                    {isActive && (
                      <motion.span
                        layoutId="integracoes-tab-indicator"
                        className="absolute inset-0 rounded-xl md:rounded-full bg-gradient-to-r from-[#1e3a5f] to-[#285992] shadow-md shadow-[#285992]/25"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${isActive ? "text-white" : "text-slate-600 hover:text-[#285992]"}`}>
                      <Icon className="w-4 h-4 shrink-0" />
                      {tab.label}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Tab Contents */}
          {tabsData.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              {/* Description */}
              <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto text-base">
                {tab.description}
              </p>

              <LogoCarousel logos={tab.logos} inView={inView} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export { SmartIntegrationsTabs };
