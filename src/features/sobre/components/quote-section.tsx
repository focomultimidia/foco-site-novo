import { StaggerSection, StaggerItem } from "./motion-primitives";

export function QuoteSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#f4f7fb] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <StaggerSection className="max-w-4xl mx-auto text-center">
          <StaggerItem>
            {/*
              Aspas GRAVADAS na superfície em vez de impressas sobre ela:
              a cor do glifo é a própria cor do fundo e o relevo vem de duas
              sombras — luz por cima (branco) e sombra por baixo (azul-tinta).
              É o efeito letterpress; num fundo chapado ele é o que dá
              profundidade sem introduzir mais um bloco de cor.
            */}
            <div
              aria-hidden
              className="font-display text-[9rem] sm:text-[11rem] leading-[0.62] select-none mb-2"
              style={{
                color: "#f4f7fb",
                textShadow:
                  "0 2px 1px rgba(255,255,255,0.95), 0 -1px 1px rgba(19,40,64,0.16), 0 -3px 6px rgba(19,40,64,0.10)",
              }}
            >
              &ldquo;
            </div>
          </StaggerItem>

          <StaggerItem>
            <blockquote className="font-display text-2xl sm:text-3xl lg:text-[2.6rem] font-medium text-[#132840] leading-snug tracking-tight mb-10">
              Não vendemos software. Vendemos a{" "}
              <span className="relative inline-block">
                {/* Grifo baixo — marca a promessa central sem gritar */}
                <span className="relative z-10">tranquilidade</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-[0.1em] h-[0.30em] -z-0 rounded-sm"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(40,89,146,0.16), rgba(66,122,185,0.22), rgba(40,89,146,0.10))",
                  }}
                />
              </span>{" "}
              de saber que, quando o seu hotel está cheio, a tecnologia não vai
              falhar com você.
            </blockquote>
          </StaggerItem>

          <StaggerItem>
            <div className="inline-flex items-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#285992]/45" />
              <span className="text-[#285992] text-xs font-semibold uppercase tracking-[0.22em]">
                Time Foco Tecnologia
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#285992]/45" />
            </div>
          </StaggerItem>
        </StaggerSection>
      </div>
    </section>
  );
}
