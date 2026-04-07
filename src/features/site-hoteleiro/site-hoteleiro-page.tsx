"use client";

import { useSiteHoteleiroPage } from "./hooks/use-site-hoteleiro-page";
import {
  HeroSection,
  IntroSection,
  RecursosGridSection,
  ExperienciasSection,
  VantagensSection,
  ReservaSection,
  PorQueEscolherSection,
  IntegracoesSolucoesSection,
} from "./components";
import { EventosSection } from "@/features/home/components/eventos-section";
import { DepoimentosSection } from "@/features/home/components/depoimentos-section";
import { VideoTestimonialsCarousel } from "@/features/ui/components/video-testimonials-carousel";
import { NumerosSection } from "@/features/home/components/numeros-section";
import { SoftwareProductsCarousel, TrustedLogosMarquee } from "@/features/shared/components";
import { FAQAccordion } from "@/features/ui/components/faq-accordion";
import { LeadCaptureCTA } from "@/features/ui/components/lead-capture-cta";
import { Spinner } from "@/components/ui/spinner";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import type { Evento, Depoimento } from "@/features/home/types";
import type { Numero } from "@/features/home/types";
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
    texto: "O site hoteleiro da Foco transformou nossa presença digital. Aumentamos as reservas diretas em 45% no primeiro trimestre.",
    autor: "Maria Silva",
    cargo: "Diretora, Pousada do Sol",
    avatar: "MS",
  },
  {
    id: "2",
    texto: "Design moderno, fácil de usar e integrado com todos os nossos sistemas. Nossos hóspedes adoram a experiência.",
    autor: "João Santos",
    cargo: "Gerente, Hotel Central",
    avatar: "JS",
  },
  {
    id: "3",
    texto: "A equipe da Foco foi incrível desde o início. O site ficou exatamente como imaginamos e o suporte é excelente.",
    autor: "Ana Costa",
    cargo: "Proprietária, Resort Mar",
    avatar: "AC",
  },
];

const videosData: VideoDepoimento[] = [
  {
    id: "1",
    title: "Como aumentamos nossas reservas em 40%",
    thumbnailUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Hotel Fazenda São Paulo",
    hotel: "São Paulo",
  },
  {
    id: "2",
    title: "Novo site, novos resultados",
    thumbnailUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Pousada Mar Azul",
    hotel: "Rio de Janeiro",
  },
  {
    id: "3",
    title: "Integração perfeita com a Foco",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Resort Paradise",
    hotel: "Bahia",
  },
];

const numerosData: Numero[] = [
  { id: "1", valor: "18", sufixo: "", label: "anos de mercado" },
  { id: "2", valor: "2500", sufixo: "+", label: "clientes ativos" },
  { id: "3", valor: "120", sufixo: "", label: "colaboradores" },
  { id: "4", valor: "98.6", sufixo: "%", label: "sucesso em integrações" },
  { id: "5", valor: "50", sufixo: "+", label: "integrações disponíveis" },
  { id: "6", valor: "24", sufixo: "h", label: "suporte disponível" },
];

function SiteHoteleiroPage() {
  const { data, isLoading, error, refetch } = useSiteHoteleiroPage();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }

  if (error || !data) {
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
      {/* Hero Section */}
      <HeroSection data={data.hero} />

      {/* Seção 1: Intro */}
      <IntroSection />

      {/* Prova Social 1: Feiras */}
      <EventosSection eventos={eventosData} />

      {/* Seção 2: Recursos */}
      <RecursosGridSection />

      {/* Prova Social 2: Vídeos */}
      <VideoTestimonialsCarousel
        items={videosData}
        title="Veja quem já transformou sua presença digital"
        subtitle="Depoimentos em vídeo de clientes que aumentaram suas reservas diretas"
        badge="Depoimentos"
        slidesToShow={3}
      />

      {/* Seção 3: Experiências */}
      <ExperienciasSection />

      {/* Prova Social 3: Aprovação 97% */}
      <DepoimentosSection depoimentos={depoimentosData} />

      {/* Seção 4: Vantagens */}
      <VantagensSection />

      {/* Seção 5: Reserva */}
      <ReservaSection />

      {/* Seção 6: Por que escolher a Foco */}
      <PorQueEscolherSection />

      {/* Seção 7: Integrações com soluções */}
      <IntegracoesSolucoesSection />

      {/* Bloco de Autoridade e Confiança */}
      <NumerosSection numeros={numerosData} />
      <TrustedLogosMarquee />

      {/* Prova Social: Carrossel de Produtos */}
      <SoftwareProductsCarousel />

      {/* Prova Social 4: FAQ */}
      <FAQAccordion
        items={data.faq.map((f) => ({ id: f.id, question: f.pergunta, answer: f.resposta }))}
        title="Dúvidas Frequentes"
        subtitle="Tire suas dúvidas sobre o Site Hoteleiro"
        badge="FAQ"
        showContactButton
      />

      {/* Lead Capture CTA */}
      <LeadCaptureCTA
        title="Pronto para ter um Site Hoteleiro Profissional?"
        subtitle="Solicite uma demonstração e veja como podemos ajudar seu hotel a vender mais diretamente."
        badge="Comece agora"
      />
    </div>
  );
}

export { SiteHoteleiroPage };
