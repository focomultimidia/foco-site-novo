import { AmbientLight }        from "./components/ambient-light";
import { HeroSection }          from "./components/hero-section";
import { BentoNetworkSection }  from "./components/autoridade-bento";
import { ManifestoSection }     from "./components/manifesto-section";
import { OrbitSection }         from "./components/orbit-section";
import { HumanFactorSection }   from "./components/fator-humano-section";
import { QuoteSection }         from "./components/quote-section";
import { CTASection }           from "./components/cta-section";
import { CertificacoesSection } from "@/features/shared/components";

export function SobrePage() {
  return (
    <>
      <AmbientLight />
      <main className="min-h-screen bg-white relative z-10">
        <HeroSection />
        <BentoNetworkSection />
        <ManifestoSection />
        <OrbitSection />
        <HumanFactorSection />
        <QuoteSection />
        <CertificacoesSection subtitle="Parcerias e certificações de classe mundial que atestam a segurança e a excelência da plataforma Foco." />
        <CTASection />
      </main>
    </>
  );
}
