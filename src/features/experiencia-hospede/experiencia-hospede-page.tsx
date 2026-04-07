"use client";

import { useExperienciaHospedePage } from "./hooks/use-experiencia-hospede-page";
import {
  HeroSection,
  FocoPassSection,
  RecursosSection,
  VantagensSection,
  ParaQuemSection,
  CardapioDigitalSection,
  PorQueContratarSection,
} from "./components";

// Provas Sociais importadas da Home e UI
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

import type { Depoimento, Numero, ArtigoMidia } from "@/features/home/types";
import type { VideoDepoimento } from "@/features/ui/components/video-testimonials-carousel";

// Dados mockados para as seções de prova social
const depoimentosData: Depoimento[] = [
  {
    id: "1",
    texto: "O Foco Pass revolucionou a experiência dos nossos hóspedes. O check-in online eliminou as filas na recepção e aumentou a satisfação.",
    autor: "Mariana Costa",
    cargo: "Gerente, Hotel Boutique",
    avatar: "MC",
  },
  {
    id: "2",
    texto: "Nossos hóspedes adoram os descontos exclusivos nos parceiros do Foco Pass. É um diferencial que nos destaca da concorrência.",
    autor: "Pedro Almeida",
    cargo: "Diretor, Resort Paradise",
    avatar: "PA",
  },
  {
    id: "3",
    texto: "O cardápio digital aumentou nossas vendas de room service em 40%. A facilidade de pedir pelo celular faz toda a diferença.",
    autor: "Carla Mendes",
    cargo: "Proprietária, Pousada do Sol",
    avatar: "CM",
  },
];

const videosData: VideoDepoimento[] = [
  {
    id: "1",
    title: "Como o Foco Pass transformou nossa experiência do hóspede",
    thumbnailUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Hotel Fazenda São Paulo",
    hotel: "São Paulo",
  },
  {
    id: "2",
    title: "Check-in online: praticidade e agilidade",
    thumbnailUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Pousada Mar Azul",
    hotel: "Rio de Janeiro",
  },
  {
    id: "3",
    title: "Descontos exclusivos que encantam os hóspedes",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Resort Paradise",
    hotel: "Bahia",
  },
];

const numerosData: Numero[] = [
  { id: "1", valor: "11", sufixo: "", label: "recursos integrados" },
  { id: "2", valor: "2500", sufixo: "+", label: "clientes ativos" },
  { id: "3", valor: "18", sufixo: "", label: "anos de mercado" },
  { id: "4", valor: "99.9", sufixo: "%", label: "uptime garantido" },
  { id: "5", valor: "50", sufixo: "+", label: "parceiros de desconto" },
  { id: "6", valor: "24", sufixo: "h", label: "suporte disponível" },
];

const artigosMidiaData: ArtigoMidia[] = [
  {
    id: "1",
    publicacao: "Hotel Management",
    data: "Mar 2024",
    titulo: "Foco Pass: a revolução na experiência do hóspede",
    descricao: "Como a automação da jornada do hóspede está transformando a hotelaria brasileira.",
    link: "#",
  },
  {
    id: "2",
    publicacao: "Turismo 360",
    data: "Fev 2024",
    titulo: "Check-in online: tendência que veio para ficar",
    descricao: "Especialistas explicam os benefícios da digitalização da experiência do hóspede.",
    link: "#",
  },
  {
    id: "3",
    publicacao: "Hospedagem News",
    data: "Jan 2024",
    titulo: "Cardápio digital aumenta vendas de room service",
    descricao: "Estudo mostra crescimento de 40% nas vendas com implementação de cardápio digital.",
    link: "#",
  },
];

function ExperienciaHospedePage() {
  const { data, isLoading, isError, refetch } = useExperienciaHospedePage();

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

      {/* Section 2: Foco Pass */}
      <FocoPassSection />

      {/* Section 3: Recursos */}
      <RecursosSection />

      {/* Section 4: Outras Vantagens */}
      <VantagensSection />

      {/* Section 5: Para quem é */}
      <ParaQuemSection />

      {/* Prova Social: Depoimentos (Aprovação 97%) */}
      <DepoimentosSection depoimentos={depoimentosData} />

      {/* Section 6: Cardápio Digital */}
      <CardapioDigitalSection />

      {/* Section 7: Por que contratar */}
      <PorQueContratarSection />

      {/* Prova Social: Vídeos */}
      <VideoTestimonialsCarousel
        items={videosData}
        title="Veja quem já transformou a experiência dos hóspedes"
        subtitle="Depoimentos em vídeo de clientes que elevaram o padrão de serviço com o Foco Pass"
        badge="Depoimentos"
        slidesToShow={3}
      />

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
          { id: "1", question: "O que é o Foco Pass?", answer: "O Foco Pass é um aplicativo de hospedagem que automatiza a jornada do hóspede, desde o check-in online até o pagamento via PIX, oferecendo também descontos exclusivos em parceiros do destino." },
          { id: "2", question: "Como funciona o check-in online?", answer: "O hóspede pode fazer o check-in antes mesmo de chegar ao hotel, diretamente pelo aplicativo. Isso elimina filas na recepção e permite que ele vá direto para o quarto." },
          { id: "3", question: "Quais são os descontos disponíveis?", answer: "O Foco Pass oferece descontos exclusivos em restaurantes, passeios turísticos, transfers, ingressos para atrações e espetáculos nos principais destinos do Brasil." },
          { id: "4", question: "O cardápio digital funciona para room service?", answer: "Sim! O hóspede pode acessar o cardápio completo do restaurante e do room service pelo aplicativo, fazer pedidos e receber no conforto do quarto." },
          { id: "5", question: "O Foco Pass é seguro?", answer: "Sim, o sistema possui total segurança para garantir que apenas o hóspede registrado tenha acesso ao aplicativo durante sua estadia." },
        ]}
        title="Dúvidas Frequentes"
        subtitle="Tire suas dúvidas sobre o Foco Pass"
        badge="FAQ"
        showContactButton
      />

      {/* Lead Capture CTA */}
      <LeadCaptureCTA
        title="Pronto para transformar a experiência dos seus hóspedes?"
        subtitle="Solicite uma demonstração e descubra como o Foco Pass pode elevar o padrão de serviço do seu hotel."
        badge="Comece agora"
      />
    </div>
  );
}

export { ExperienciaHospedePage };
