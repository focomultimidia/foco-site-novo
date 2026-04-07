"use client";

import { useMotorReservasPage } from "./hooks/use-motor-reservas-page";
import {
  HeroSection,
  OQueESection,
  VantagensSection,
  AumenteReservasSection,
  FuncionalidadesSection,
  IntegracoesSistemasSection,
  PareComissoesSection,
  IntegracoesMarketingSection,
  GerencieCelularSection,
  PorQueFocoSection,
} from "./components";

// Provas Sociais importadas da Home
import { EventosSection } from "@/features/home/components/eventos-section";
import { DepoimentosSection } from "@/features/home/components/depoimentos-section";
import { VideoTestimonialsCarousel } from "@/features/ui/components/video-testimonials-carousel";
import { NumerosSection } from "@/features/home/components/numeros-section";
import { SoftwareProductsCarousel, TrustedLogosMarquee } from "@/features/shared/components";
import { FAQAccordion } from "@/features/ui/components/faq-accordion";
import { NaMidiaSection } from "@/features/home/components/na-midia-section";
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
    texto: "O motor de reservas da Foco aumentou nossas reservas diretas em 60%. A integração é perfeita e o suporte é excelente.",
    autor: "Carlos Mendes",
    cargo: "Diretor, Hotel Plaza",
    avatar: "CM",
  },
  {
    id: "2",
    texto: "Finalmente conseguimos independência das OTAs. O sistema é intuitivo e nossos hóspedes adoram a facilidade.",
    autor: "Fernanda Lima",
    cargo: "Gerente, Pousada das Flores",
    avatar: "FL",
  },
  {
    id: "3",
    texto: "A recuperação de carrinho aumentou nossa conversão em 25%. Um investimento que se pagou em poucos meses.",
    autor: "Ricardo Souza",
    cargo: "Proprietário, Resort Paradise",
    avatar: "RS",
  },
];

const videosData: VideoDepoimento[] = [
  {
    id: "1",
    title: "Como dobramos nossas reservas diretas",
    thumbnailUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Hotel Fazenda São Paulo",
    hotel: "São Paulo",
  },
  {
    id: "2",
    title: "Independência das OTAs é possível",
    thumbnailUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Pousada Mar Azul",
    hotel: "Rio de Janeiro",
  },
  {
    id: "3",
    title: "Integração perfeita com todos os canais",
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

const artigosMidiaData: ArtigoMidia[] = [
  {
    id: "1",
    publicacao: "Hotel Management",
    data: "Mar 2024",
    titulo: "Foco Tecnologia lidera inovação em motores de reservas",
    descricao: "Empresa brasileira é destaque no cenário internacional de tecnologia hoteleira.",
    link: "#",
  },
  {
    id: "2",
    publicacao: "Turismo 360",
    data: "Fev 2024",
    titulo: "Como aumentar reservas diretas em 2024",
    descricao: "Especialistas compartilham estratégias para independência das OTAs.",
    link: "#",
  },
  {
    id: "3",
    publicacao: "Hospedagem News",
    data: "Jan 2024",
    titulo: "Tendências em tecnologia para hotéis",
    descricao: "Motor de reservas integrado é apontado como diferencial competitivo.",
    link: "#",
  },
];

function MotorReservasPage() {
  const { data, isLoading, isError, refetch } = useMotorReservasPage();

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

      {/* Section 2: O que é um motor de reservas */}
      <OQueESection />

      {/* Section 3: Vantagens do motor de reservas */}
      <VantagensSection />

      {/* Prova Social: Nossos Números */}
      <NumerosSection numeros={numerosData} />

      {/* Section 4: Aumente as reservas diretas */}
      <AumenteReservasSection />

      {/* Section 5: Funcionalidades */}
      <FuncionalidadesSection />

      {/* Prova Social: Aprovação 97% - Depoimentos */}
      <DepoimentosSection depoimentos={depoimentosData} />

      {/* Section 6: Integrações com sistemas */}
      <IntegracoesSistemasSection />

      {/* Prova Social: Vídeos */}
      <VideoTestimonialsCarousel
        items={videosData}
        title="Veja quem já transformou suas vendas"
        subtitle="Depoimentos em vídeo de clientes que aumentaram suas reservas diretas"
        badge="Depoimentos"
        slidesToShow={3}
      />

      {/* Section 7: Pare de pagar comissões */}
      <PareComissoesSection />

      {/* Section 8: Integrações de Marketing */}
      <IntegracoesMarketingSection />

      {/* Section 9: Gerencie pelo celular */}
      <GerencieCelularSection />

      {/* Prova Social: Feiras/Eventos */}
      <EventosSection eventos={eventosData} />

      {/* Section 10: Por que escolher a Foco */}
      <PorQueFocoSection />

      {/* Prova Social: Na Mídia */}
      <NaMidiaSection artigos={artigosMidiaData} />

      {/* Bloco de Autoridade e Confiança */}
      <NumerosSection numeros={numerosData} />
      <TrustedLogosMarquee />

      {/* Prova Social: Carrossel de Produtos */}
      <SoftwareProductsCarousel />

      {/* Prova Social: FAQ */}
      <FAQAccordion
        items={data.faq.map((f) => ({ id: f.id, question: f.pergunta, answer: f.resposta }))}
        title="Dúvidas Frequentes"
        subtitle="Tire suas dúvidas sobre o Motor de Reservas"
        badge="FAQ"
        showContactButton
      />

      {/* Lead Capture CTA */}
      <LeadCaptureCTA
        title="Pronto para aumentar suas reservas diretas?"
        subtitle="Solicite uma demonstração e descubra como o Motor de Reservas da Foco pode transformar seu negócio."
        badge="Comece agora"
      />
    </div>
  );
}

export { MotorReservasPage };
