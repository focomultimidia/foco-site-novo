"use client";

import { useChannelManagerPage } from "./hooks/use-channel-manager-page";
import {
  HeroSection,
  OQueESection,
  VantagensSection,
  AplicativoSection,
  RecursosSection,
} from "./components";

// Provas Sociais importadas da Home e UI
import { EventosSection } from "@/features/home/components/eventos-section";
import { DepoimentosSection } from "@/features/home/components/depoimentos-section";
import { VideoTestimonialsCarousel } from "@/features/ui/components/video-testimonials-carousel";
import { NumerosSection } from "@/features/home/components/numeros-section";
import { NaMidiaSection } from "@/features/home/components/na-midia-section";
import { SoftwareProductsCarousel, TrustedLogosMarquee } from "@/features/shared/components";
import { FAQAccordion } from "@/features/ui/components/faq-accordion";
import { LeadCaptureCTA } from "@/features/ui/components/lead-capture-cta";

import { Spinner } from "@/components/ui/spinner";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

import type { Evento, Depoimento, Numero, ArtigoMidia } from "@/features/home/types";
import type { VideoDepoimento } from "@/features/ui/components/video-testimonials-carousel";

// Dados mockados para as seções de prova social
const eventosData: Evento[] = [
  {
    id: "1",
    tag: "Feira",
    data: "Outubro 2024",
    local: "São Paulo, SP",
    titulo: "Abav Expo",
    descricao: "O maior evento de turismo da América Latina. Venha conhecer nossas soluções para hotelaria.",
    link: "#",
  },
  {
    id: "2",
    tag: "Feira",
    data: "Novembro 2024",
    local: "Gramado, RS",
    titulo: "Festuris",
    descricao: "A principal feira de turismo do Sul do Brasil. Demonstrações ao vivo dos nossos sistemas.",
    link: "#",
  },
  {
    id: "3",
    tag: "Feira",
    data: "Setembro 2024",
    local: "São Paulo, SP",
    titulo: "Equipotel",
    descricao: "A maior feira de equipamentos e serviços para hotelaria do Brasil.",
    link: "#",
  },
];

const depoimentosData: Depoimento[] = [
  {
    id: "1",
    texto: "O Channel Manager da Foco eliminou completamente o overbooking do nosso hotel. A sincronização em tempo real é impressionante.",
    autor: "Patricia Lima",
    cargo: "Gerente, Hotel Central",
    avatar: "PL",
  },
  {
    id: "2",
    texto: "Conseguimos aumentar nossa ocupação em 30% após conectar todos os canais. A gestão centralizada facilitou muito nosso dia a dia.",
    autor: "Roberto Silva",
    cargo: "Diretor, Pousada do Sol",
    avatar: "RS",
  },
  {
    id: "3",
    texto: "O aplicativo mobile é um diferencial enorme. Consigo gerenciar as reservas de qualquer lugar, a qualquer hora.",
    autor: "Carolina Mendes",
    cargo: "Proprietária, Resort Paradise",
    avatar: "CM",
  },
];

const videosData: VideoDepoimento[] = [
  {
    id: "1",
    title: "Como eliminamos o overbooking em 100%",
    thumbnailUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Hotel Plaza",
    hotel: "São Paulo",
  },
  {
    id: "2",
    title: "Aumentamos a ocupação com gestão inteligente",
    thumbnailUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Pousada Mar Azul",
    hotel: "Rio de Janeiro",
  },
  {
    id: "3",
    title: "Integração perfeita com +450 canais",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Resort Paradise",
    hotel: "Bahia",
  },
];

const numerosData: Numero[] = [
  { id: "1", valor: "450", sufixo: "+", label: "canais conectados" },
  { id: "2", valor: "2500", sufixo: "+", label: "clientes ativos" },
  { id: "3", valor: "18", sufixo: "", label: "anos de mercado" },
  { id: "4", valor: "99.9", sufixo: "%", label: "uptime garantido" },
  { id: "5", valor: "50", sufixo: "+", label: "integrações PMS" },
  { id: "6", valor: "24", sufixo: "h", label: "suporte disponível" },
];

const artigosMidiaData: ArtigoMidia[] = [
  {
    id: "1",
    publicacao: "Hotel Management",
    data: "Mar 2024",
    titulo: "Channel Manager: a ferramenta essencial para hotéis modernos",
    descricao: "Especialistas explicam como a gestão de canais pode aumentar a ocupação e eliminar overbooking.",
    link: "#",
  },
  {
    id: "2",
    publicacao: "Turismo 360",
    data: "Fev 2024",
    titulo: "Foco Tecnologia lidera o mercado de Channel Managers no Brasil",
    descricao: "Empresa brasileira conecta hotéis a mais de 450 canais de vendas globais.",
    link: "#",
  },
  {
    id: "3",
    publicacao: "Hospedagem News",
    data: "Jan 2024",
    titulo: "Como escolher o melhor Channel Manager para seu hotel",
    descricao: "Guia completo com os principais critérios para selecionar a ferramenta ideal.",
    link: "#",
  },
];

function ChannelManagerPage() {
  const { data, isLoading, isError, refetch } = useChannelManagerPage();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Empty className="text-center">
          <EmptyHeader>
            <EmptyTitle>Erro ao carregar dados</EmptyTitle>
            <EmptyDescription>
              Não foi possível carregar o conteúdo da página. Tente novamente.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => refetch()} variant="outline" className="rounded-full px-6">
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Section 1: Hero */}
      <HeroSection data={data.hero} />

      {/* Section 2: O que é um gestor de canais */}
      <OQueESection />

      {/* Section 3: Vantagens do gestor de canais */}
      <VantagensSection />

      {/* Prova Social: Depoimentos (Aprovação 97%) */}
      <DepoimentosSection depoimentos={depoimentosData} />

      {/* Section 4: Aplicativo mobile */}
      <AplicativoSection />

      {/* Section 5: Recursos */}
      <RecursosSection />

      {/* Prova Social: Vídeos */}
      <VideoTestimonialsCarousel
        items={videosData}
        title="Veja quem já transformou sua gestão de canais"
        subtitle="Depoimentos em vídeo de clientes que eliminaram o overbooking e aumentaram a ocupação"
        badge="Depoimentos"
        slidesToShow={3}
      />

      {/* Prova Social: Feiras/Eventos */}
      <EventosSection eventos={eventosData} />

      {/* Prova Social: Na Mídia */}
      <NaMidiaSection artigos={artigosMidiaData} />

      {/* Bloco de Autoridade e Confiança */}
      <NumerosSection numeros={numerosData} />
      <TrustedLogosMarquee />

      {/* Prova Social: Carrossel de Produtos */}
      <SoftwareProductsCarousel />

      {/* Prova Social: FAQ */}
      <FAQAccordion
        items={[
          { id: "1", question: "O que é um Channel Manager?", answer: "Um Channel Manager (ou Gestor de Canais) é um software que sincroniza automaticamente as reservas, disponibilidade e tarifas do seu hotel em todos os canais de vendas conectados, eliminando o risco de overbooking." },
          { id: "2", question: "Com quantos canais o Channel Manager da Foco integra?", answer: "Nosso Channel Manager integra com mais de 450 canais de vendas, incluindo as principais OTAs globais e regionais, GDS, canais corporativos e o motor de reservas do seu site." },
          { id: "3", question: "A sincronização é em tempo real?", answer: "Sim! Todas as alterações de disponibilidade, tarifas e reservas são sincronizadas instantaneamente em todos os canais conectados, garantindo precisão e eliminando overbooking." },
          { id: "4", question: "O Channel Manager integra com meu PMS?", answer: "Sim, oferecemos integração two-way com os principais PMS do mercado brasileiro, garantindo sincronização completa de reservas, cancelamentos e alterações." },
          { id: "5", question: "Posso gerenciar pelo celular?", answer: "Sim! Nosso aplicativo mobile permite que você gerencie tarifas, disponibilidade, reservas e visualize relatórios de qualquer lugar, a qualquer momento." },
        ]}
        title="Dúvidas Frequentes"
        subtitle="Tire suas dúvidas sobre o Channel Manager"
        badge="FAQ"
        showContactButton
      />

      {/* Lead Capture CTA */}
      <LeadCaptureCTA
        title="Pronto para eliminar o overbooking e aumentar sua ocupação?"
        subtitle="Solicite uma demonstração e descubra como o Channel Manager da Foco pode transformar a gestão do seu hotel."
        badge="Comece agora"
      />
    </div>
  );
}

export { ChannelManagerPage };
