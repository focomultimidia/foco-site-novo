import { StaggerSection, StaggerItem } from "./motion-primitives";

// Grão sutil — mesmo data-uri usado nas outras seções da página (ver
// hero-section.tsx) — quebra a chapadura do papel sem introduzir cor nova.
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function QuoteSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#f4f7fb] relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_BG }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/*
          Pull-quote editorial: a marca gravada foge do centro pro canto,
          como numa revista, em vez de empilhada acima do texto centralizado
          — o resto da página já tem SectionHeaders centralizados de sobra,
          esta seção final ganha ritmo por ser a única assimétrica.
        */}
        <StaggerSection className="max-w-3xl mx-auto lg:max-w-4xl lg:grid lg:grid-cols-[auto_1fr] lg:gap-x-8 lg:items-start">
          <StaggerItem>
            {/*
              Aspas GRAVADAS na superfície em vez de impressas sobre ela:
              a cor do glifo é a própria cor do fundo e o relevo vem de duas
              sombras — luz por cima (branco) e sombra por baixo (azul-tinta).
              É o efeito letterpress; num fundo chapado ele é o que dá
              profundidade sem introduzir mais um bloco de cor.

              O glifo é servido numa serifada (Georgia, já instalada em todo
              SO — sem custo de rede) só aqui: a curva cheia de uma aspa
              serifada é o que dá corpo ao símbolo nesse tamanho gigante — o
              traço geométrico da General Sans (usada no resto do site)
              nasce fino demais pra sustentar esse peso decorativo.
            */}
            <div
              aria-hidden
              className="text-[8.5rem] sm:text-[10rem] lg:text-[11.5rem] leading-[0.5] select-none -ml-2 lg:-mt-5"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontWeight: 700,
                color: "#f4f7fb",
                textShadow:
                  "0 3px 1px rgba(255,255,255,0.95), 0 -2px 2px rgba(19,40,64,0.18), 0 -4px 10px rgba(19,40,64,0.12)",
              }}
            >
              &ldquo;
            </div>
          </StaggerItem>

          <div>
            <StaggerItem>
              <blockquote className="font-display text-2xl sm:text-3xl lg:text-[2.5rem] font-medium text-[#132840] leading-snug tracking-tight text-balance mb-8 lg:mb-10">
                Não vendemos software. Vendemos a{" "}
                <span className="text-[#285992]">tranquilidade</span> de saber
                que, quando o seu hotel está cheio, a tecnologia não vai
                falhar com você.
              </blockquote>
            </StaggerItem>

            <StaggerItem>
              <div className="inline-flex items-center gap-3">
                <div className="h-px w-10 bg-gradient-to-r from-[#285992]/45 to-transparent" />
                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[#fccc30]" />
                <span className="text-[#285992] text-xs font-semibold uppercase tracking-[0.22em]">
                  Time Foco Tecnologia
                </span>
              </div>
            </StaggerItem>
          </div>
        </StaggerSection>
      </div>
    </section>
  );
}
