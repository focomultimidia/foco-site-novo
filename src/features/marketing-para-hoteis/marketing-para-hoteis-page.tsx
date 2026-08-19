"use client";

import { useState } from "react";
import { HeroSection } from "./components";
import { LeadCaptureCTA } from "@/features/ui/components/lead-capture-cta";
import { LeadCaptureModal } from "@/components/shared/lead-capture-modal";
import { useSeo } from "@/features/shared/lib/use-seo";

// ── MarketingParaHoteisPage ──────────────────────────────────────────────
// Scaffold no padrão do site: header/footer vêm de MainLayout (App.tsx),
// aqui só hero + CTA final. Sem API/loading state — igual ao precedente de
// "sobre" e "otheo-ai", que também não buscam dados remotos. Recebe o
// redirect 301 de marketing-para-hoteis.html (ver public/.htaccess) e
// substitui o destino provisório /site-hoteleiro que estava lá. Seções de
// conteúdo (recursos, prova social, FAQ etc.) entram depois, quando o
// conteúdo da página for definido.
function MarketingParaHoteisPage() {
  useSeo({
    title: "Marketing para Hotéis e Pousadas | Foco Tecnologia",
    description:
      "Estratégias de marketing digital para hotéis e pousadas: mais reservas diretas, menos dependência de OTAs e um funil pensado para a hotelaria.",
    path: "/marketing-para-hoteis",
  });

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <div className="space-y-0">
      <HeroSection onCtaClick={() => setIsLeadModalOpen(true)} />

      <LeadCaptureCTA
        badge="Comece agora"
        title="Pronto para vender mais reservas diretas?"
        subtitle="Fale com um consultor e descubra como a Foco pode estruturar o marketing digital do seu hotel."
      />

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        title="Solicite uma Demonstração Grátis"
        description="Preencha seus dados e nossa equipe entrará em contato para falar sobre marketing digital para o seu hotel."
        source="marketing-para-hoteis"
      />
    </div>
  );
}

export { MarketingParaHoteisPage };
