"use client";

import { useGestaoHoteleiraPage } from "./hooks/use-gestao-hoteleira-page";
import {
  HeroSection,
  OQueESection,
  RecursosSection,
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
    texto: "O PMS da Foco transformou completamente a gestão do nosso hotel. Agora temos controle total de todas as operações em uma única plataforma.",
    autor: "Ana Paula Silva",
    cargo: "Gerente Geral, Hotel Central",
    avatar: "AS",
  },
  {
    id: "2",
    texto: "Eliminamos os overbookings e otimizamos o trabalho da equipe. O sistema é intuitivo e o suporte é excelente.",
    autor: "Marcos Oliveira",
    cargo: "Diretor, Pousada do Sol",
    avatar: "MO",
  },
  {
    id: "3",
    texto: "Os relatórios e dashboards nos deram insights valiosos para tomar decisões estratégicas. Aumentamos nossa lucratividade em 30%.",
    autor: "Carla Mendes",
    cargo: "Proprietária, Resort Paradise",
    avatar: "CM",
  },
];

const videosData: VideoDepoimento[] = [
  {
    id: "1",
    title: "Como o PMS revolucionou nossa gestão hoteleira",
    thumbnailUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Hotel Plaza",
    hotel: "São Paulo",
  },
  {
    id: "2",
    title: "Gestão completa em uma única plataforma",
    thumbnailUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Pousada Mar Azul",
    hotel: "Rio de Janeiro",
  },
  {
    id: "3",
    title: "Aumento de produtividade com o PMS da Foco",
    thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    author: "Resort Paradise",
    hotel: "Bahia",
  },
];

const numerosData: Numero[] = [
  { id: "1", valor: "20", sufixo: "+", label: "recursos integrados" },
  { id: "2", valor: "2500", sufixo: "+", label: "clientes ativos" },
  { id: "3", valor: "18", sufixo: "", label: "anos de mercado" },
  { id: "4", valor: "99.9", sufixo: "%", label: "uptime garantido" },
  { id: "5", valor: "50", sufixo: "+", label: "integrações disponíveis" },
  { id: "6", valor: "24", sufixo: "h", label: "suporte disponível" },
];

const artigosMidiaData: ArtigoMidia[] = [
  {
    id: "1",
    publicacao: "Hotel Management",
    data: "Mar 2024",
    titulo: "PMS: A ferramenta essencial para gestão hoteleira moderna",
    descricao: "Especialistas explicam como um bom sistema de gestão pode transformar as operações de um hotel.",
    link: "#",
  },
  {
    id: "2",
    publicacao: "Turismo 360",
    data: "Fev 2024",
    titulo: "Foco Tecnologia lidera o mercado de PMS no Brasil",
    descricao: "Empresa brasileira oferece solução completa com mais de 20 recursos integrados.",
    link: "#",
  },
  {
    id: "3",
    publicacao: "Hospedagem News",
    data: "Jan 2024",
    titulo: "Como escolher o melhor PMS para seu hotel",
    descricao: "Guia completo com os principais critérios para selecionar o sistema ideal.",
    link: "#",
  },
];

function GestaoHoteleiraPage() {
  const { data, isLoading, isError, refetch } = useGestaoHoteleiraPage();

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

      {/* Section 2: O que é um sistema PMS */}
      <OQueESection />

      {/* Section 3: Recursos do PMS */}
      <RecursosSection />

      {/* Prova Social: Depoimentos (Aprovação 97%) */}
      <DepoimentosSection depoimentos={depoimentosData} />

      {/* Section 4: Por que contratar */}
      <PorQueContratarSection />

      {/* Prova Social: Vídeos */}
      <VideoTestimonialsCarousel
        items={videosData}
        title="Veja quem já transformou sua gestão hoteleira"
        subtitle="Depoimentos em vídeo de clientes que otimizaram suas operações com o PMS da Foco"
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
          { id: "1", question: "O que é um PMS (Property Management System)?", answer: "Um PMS é um sistema de gestão hoteleira que centraliza todas as operações do hotel, incluindo reservas, check-in/check-out, controle financeiro, governança e muito mais em uma única plataforma." },
          { id: "2", question: "O PMS da Foco é adequado para qual tipo de propriedade?", answer: "Nosso PMS é ideal para hotéis, pousadas, resorts, hostels e qualquer tipo de propriedade hoteleira que precise de uma gestão integrada e eficiente." },
          { id: "3", question: "O sistema funciona na nuvem?", answer: "Sim! O PMS da Foco é 100% baseado em nuvem, permitindo acesso de qualquer lugar e a qualquer momento, com total segurança dos seus dados." },
          { id: "4", question: "O PMS integra com outros sistemas?", answer: "Sim, oferecemos integração com Channel Manager, Motor de Reservas, sistemas de pagamento, contabilidade e muitos outros parceiros do ecossistema hoteleiro." },
          { id: "5", question: "Como funciona o suporte técnico?", answer: "Oferecemos suporte técnico 24/7 via chat, e-mail e telefone, além de uma base de conhecimento completa e treinamentos para sua equipe." },
        ]}
        title="Dúvidas Frequentes"
        subtitle="Tire suas dúvidas sobre o Sistema PMS"
        badge="FAQ"
        showContactButton
      />

      {/* Lead Capture CTA */}
      <LeadCaptureCTA
        title="Pronto para transformar a gestão do seu hotel?"
        subtitle="Solicite uma demonstração e descubra como o PMS da Foco pode otimizar todas as operações do seu negócio."
        badge="Comece agora"
      />
    </div>
  );
}

export { GestaoHoteleiraPage };
