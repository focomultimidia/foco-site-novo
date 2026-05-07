"use client";

import { Globe, Building2, CreditCard, TrendingUp } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

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
      "Conecte-se a mais de 800 canais de vendas, garantindo mais visibilidade e menos overbooking.",
    logos: [
      { src: "/assets/imgs/integracoes/canais/booking.png", alt: "Booking.com" },
      { src: "/assets/imgs/integracoes/canais/airbnb.png", alt: "Airbnb" },
      { src: "/assets/imgs/integracoes/canais/expedia.png", alt: "Expedia" },
      { src: "/assets/imgs/integracoes/canais/decolar.png", alt: "Decolar" },
      { src: "/assets/imgs/integracoes/canais/agoda.png", alt: "Agoda" },
      { src: "/assets/imgs/integracoes/canais/cvc.png", alt: "CVC" },
      { src: "/assets/imgs/integracoes/canais/abracorp.png", alt: "Abracorp" },
      { src: "/assets/imgs/integracoes/canais/almundo.png", alt: "Almundo" },
      { src: "/assets/imgs/integracoes/canais/avipam.png", alt: "Avipam" },
      { src: "/assets/imgs/integracoes/canais/b2b-reservas.png", alt: "B2B Reservas" },
      { src: "/assets/imgs/integracoes/canais/belvitur.png", alt: "Belvitur" },
      { src: "/assets/imgs/integracoes/canais/best-day.png", alt: "BestDay" },
      { src: "/assets/imgs/integracoes/canais/copastur.png", alt: "Copastur" },
      { src: "/assets/imgs/integracoes/canais/costa-brava.png", alt: "Costa Brava" },
      { src: "/assets/imgs/integracoes/canais/cwt.png", alt: "CWT" },
      { src: "/assets/imgs/integracoes/canais/google-hoteis.png", alt: "Google Hotéis" },
      { src: "/assets/imgs/integracoes/canais/grupo-flytour.png", alt: "Grupo Flytour" },
      { src: "/assets/imgs/integracoes/canais/hostway.png", alt: "Hostway" },
      { src: "/assets/imgs/integracoes/canais/hotelbeds.png", alt: "Hotelbeds" },
      { src: "/assets/imgs/integracoes/canais/jetstream.png", alt: "Jet Stream" },
      { src: "/assets/imgs/integracoes/canais/kontik.png", alt: "Kontik" },
      { src: "/assets/imgs/integracoes/canais/luck.png", alt: "Luck Viagens" },
      { src: "/assets/imgs/integracoes/canais/maiorca.png", alt: "Maiorca Turismo" },
      { src: "/assets/imgs/integracoes/canais/maringa.png", alt: "Maringa Turismo" },
      { src: "/assets/imgs/integracoes/canais/pontestur.png", alt: "PontesTur" },
      { src: "/assets/imgs/integracoes/canais/primus.png", alt: "Primus Turismo Viagens" },
      { src: "/assets/imgs/integracoes/canais/sabre.png", alt: "Sabre" },
      { src: "/assets/imgs/integracoes/canais/solid.png", alt: "Solid Gestão de Despesas e Viagens" },
      { src: "/assets/imgs/integracoes/canais/tivolitur.png", alt: "Tivolitur" },
      { src: "/assets/imgs/integracoes/canais/tour-house.png", alt: "Tour House" },
      { src: "/assets/imgs/integracoes/canais/tourico.png", alt: "Tourico Holidays" },
      { src: "/assets/imgs/integracoes/canais/tristar.png", alt: "Tristar" },
      { src: "/assets/imgs/integracoes/canais/voetur.png", alt: "Voetur" },
    ],
  },
  {
    id: "pms",
    label: "PMS's",
    icon: Building2,
    description:
      "Integramos com os principais sistemas de gestão hoteleira do mercado.",
    logos: [
      { src: "/assets/imgs/integracoes/pms/plus.png", alt: "Plus" },
      { src: "/assets/imgs/integracoes/pms/totvs.png", alt: "TOTVS" },
      { src: "/assets/imgs/integracoes/pms/hmax.png", alt: "Hmax" },
      { src: "/assets/imgs/integracoes/pms/silbeck.png", alt: "Silbeck" },
      { src: "/assets/imgs/integracoes/pms/bitz.png", alt: "Bitz" },
      { src: "/assets/imgs/integracoes/pms/desbravador.png", alt: "Desbravador" },
      { src: "/assets/imgs/integracoes/pms/hotelflow.png", alt: "Hotelflow" },
      { src: "/assets/imgs/integracoes/pms/hits.png", alt: "Hits" },
      { src: "/assets/imgs/integracoes/pms/adm-hoteleiro.png", alt: "ADM Hoteleiro" },
      { src: "/assets/imgs/integracoes/pms/to-de-ferias.png", alt: "Tô de Férias" },
      { src: "/assets/imgs/integracoes/pms/techside.png", alt: "Techside" },
      { src: "/assets/imgs/integracoes/pms/appsistemas.png", alt: "App Sistemas" },
      { src: "/assets/imgs/integracoes/pms/carsoft.png", alt: "Carsoft" },
      { src: "/assets/imgs/integracoes/pms/esolution.png", alt: "eSolution" },
      { src: "/assets/imgs/integracoes/pms/isasoft.png", alt: "IsaSoft" },
      { src: "/assets/imgs/integracoes/pms/mde.png", alt: "MDE" },
      { src: "/assets/imgs/integracoes/pms/newhotel.png", alt: "New Hotel" },
      { src: "/assets/imgs/integracoes/pms/queops.png", alt: "Queops" },
      { src: "/assets/imgs/integracoes/pms/saghar.png", alt: "Saghar" },
      { src: "/assets/imgs/integracoes/pms/simpleshotel.png", alt: "Simples Hotel" },
    ],
  },
  {
    id: "pagamentos",
    label: "Pagamentos",
    icon: CreditCard,
    description:
      "Múltiplas opções de pagamento integradas para maior conversão.",
    logos: [
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/stone.png", alt: "Stone" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/cielo.png", alt: "Cielo" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/pagarme.png", alt: "Pagarme" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/pagseguro.png", alt: "PagSeguro" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/rede.png", alt: "Rede" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/getnet.png", alt: "GetNet" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/payzen.png", alt: "PayZen" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/sicred.png", alt: "Sicred" },
      { src: "/assets/imgs/integracoes/gateway-de-pagamento/sipag.png", alt: "Sipag" },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: TrendingUp,
    description:
      "Ferramentas de marketing digital para aumentar sua presença online.",
    logos: [
      { src: "/assets/imgs/integracoes/marketing/google-ads.png", alt: "Google Ads" },
      { src: "/assets/imgs/integracoes/marketing/facebook-ads.png", alt: "Facebook Ads" },
      { src: "/assets/imgs/integracoes/marketing/rd-station.png", alt: "RD Station" },
      { src: "/assets/imgs/integracoes/marketing/facebook-pixel.png", alt: "Facebook Pixel" },
      { src: "/assets/imgs/integracoes/marketing/reprotel.png", alt: "Reprotel" },
      { src: "/assets/imgs/integracoes/marketing/tribuzana.png", alt: "Tribuzana" },
      { src: "/assets/imgs/integracoes/marketing/google-analytics.png", alt: "Google Analytics" },
      { src: "/assets/imgs/integracoes/marketing/google-search-console.png", alt: "Google Search Console" },
      { src: "/assets/imgs/integracoes/marketing/google-tag-manager.png", alt: "Google Tag Manager" },
    ],
  },
];

function LogoCard({ src, alt }: Logo) {
  return (
    <div className="flex items-center justify-center p-4 h-24 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default select-none">
      <img src={src} alt={alt} className="h-10 w-full object-contain" />
    </div>
  );
}

function SmartIntegrationsTabs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a5f] mb-4">
            Integrações que conectam todo o ecossistema hoteleiro
          </h2>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="canais" className="w-full">
          {/* Tab Navigation — scrollable on mobile */}
          <div className="flex justify-center mb-8 overflow-x-auto pb-1">
            <TabsList className="inline-flex flex-nowrap h-auto gap-1 p-1.5 bg-slate-100 border rounded-full border-slate-200 min-w-max">
              {tabsData.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium whitespace-nowrap rounded-full data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-white data-[state=active]:shadow-sm flex-shrink-0"
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Tab Contents */}
          {tabsData.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              {/* Description */}
              <p className="text-center text-gray-500 mb-8 max-w-xl mx-auto text-base">
                {tab.description}
              </p>

              {/* Logo Carousel with infinite autoplay */}
              <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[
                  Autoplay({
                    delay: 1800,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {tab.logos.map((logo) => (
                    <CarouselItem
                      key={logo.alt}
                      className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                    >
                      <LogoCard src={logo.src} alt={logo.alt} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export { SmartIntegrationsTabs };
