import { StaggerSection, StaggerItem } from "./motion-primitives";

export function QuoteSection() {
  return (
    <section className="py-20 bg-[#1e3a5f] relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 -top-24 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(40,89,146,0.55) 0%, transparent 70%)" }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <StaggerSection className="max-w-4xl mx-auto text-center">
          <StaggerItem>
            <div className="font-display text-8xl text-[#427ab9]/30 leading-none select-none mb-4">"</div>
          </StaggerItem>
          <StaggerItem>
            <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-white leading-snug tracking-tight mb-8">
              Não vendemos software. Vendemos a tranquilidade de saber que, quando o seu hotel está cheio, a tecnologia não vai falhar com você.
            </blockquote>
          </StaggerItem>
          <StaggerItem>
            <div className="inline-flex items-center gap-4">
              <div className="h-px w-12 bg-[#427ab9]/35" />
              <span className="text-[#93b8d8] text-sm font-medium tracking-wide">Time Foco Tecnologia</span>
              <div className="h-px w-12 bg-[#427ab9]/35" />
            </div>
          </StaggerItem>
        </StaggerSection>
      </div>
    </section>
  );
}
