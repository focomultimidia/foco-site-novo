import { HeroSection }          from "./components/hero-section";
import { BentoNetworkSection }  from "./components/autoridade-bento";
import { ManifestoSection }     from "./components/manifesto-section";
import { OrbitSection }         from "./components/orbit-section";
import { HumanFactorSection }   from "./components/fator-humano-section";
import { QuoteSection }         from "./components/quote-section";
import { CTASection }           from "./components/cta-section";
import { CertificacoesSection } from "@/features/shared/components";
import { useSeo } from "@/features/shared/lib/use-seo";

export function SobrePage() {
  useSeo({
    title: "Sobre a Foco Tecnologia | +20 Anos de Hotelaria",
    description:
      "Empresa brasileira que já atende mais de 2.700 hotéis, pousadas e temporadas com tecnologia feita para o dia a dia da hotelaria.",
    path: "/sobre",
  });

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <HeroSection />
      <BentoNetworkSection />
      <ManifestoSection />
      <OrbitSection />
      <HumanFactorSection />
      <QuoteSection />
      <CertificacoesSection subtitle="Parcerias e certificações de classe mundial que atestam a segurança e a excelência da plataforma Foco." />
      <CTASection />
    </div>
  );
}
