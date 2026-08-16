import { motion } from "framer-motion";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { OrbitDiagram } from "@/features/shared/components/orbit-diagram";
import { CheckCircle2 } from "lucide-react";
import { Section, StaggerSection, StaggerItem } from "./motion-primitives";

// ── OrbitSection ──────────────────────────────────────────────────────────────

export function OrbitSection() {
  return (
    <Section className="bg-[#f4f7fb] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <StaggerSection>
          <StaggerItem>
            <SectionEyebrow>Ecossistema Integrado</SectionEyebrow>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1e293b] tracking-tighter leading-tight mb-5">
              Conectado com tudo que o seu hotel{" "}
              <span className="bg-gradient-to-r from-[#285992] to-[#427ab9] bg-clip-text text-transparent">já utiliza.</span>
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-lg">
              Nossa plataforma não vive isolada. Ela se conecta ao Booking.com, Expedia, Stone, PCI e dezenas de outros sistemas, criando um único fluxo que elimina retrabalho e maximiza cada reserva.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-col gap-3">
              {[
                "Sincronização em tempo real com as maiores OTAs do mundo",
                "Pagamentos integrados com certificação PCI DSS nível 1",
                "API aberta para conectar qualquer sistema do mercado",
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#285992]/10 text-[#285992] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </StaggerItem>
        </StaggerSection>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <OrbitDiagram />
        </motion.div>
      </div>
    </Section>
  );
}
