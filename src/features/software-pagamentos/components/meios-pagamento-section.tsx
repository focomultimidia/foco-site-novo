"use client";

import { motion } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────
// Add/remove payment gateways here. Paths resolve from /public.
const MEIOS_PAGAMENTO = [
  { nome: "Sicredi",     logo: "/assets/imgs/integracoes/gateway-de-pagamento/sicred.webp"     },
  { nome: "PagSeguro",   logo: "/assets/imgs/integracoes/gateway-de-pagamento/pagseguro.webp"   },
  { nome: "Cielo",       logo: "/assets/imgs/integracoes/gateway-de-pagamento/cielo.webp"       },
  { nome: "Rede",        logo: "/assets/imgs/integracoes/gateway-de-pagamento/rede.webp"        },
  { nome: "Stone",       logo: "/assets/imgs/integracoes/gateway-de-pagamento/stone.webp"       },
  { nome: "Sipag",       logo: "/assets/imgs/integracoes/gateway-de-pagamento/sipag.webp"       },
  { nome: "GetNet",      logo: "/assets/imgs/integracoes/gateway-de-pagamento/getnet.webp"      },
  { nome: "PayZen",    logo: "/assets/imgs/integracoes/gateway-de-pagamento/payzen.webp"    },
  { nome: "Pagarme",logo: "/assets/imgs/integracoes/gateway-de-pagamento/pagarme.webp" },
];

// ── Section ───────────────────────────────────────────────────────────────────
function MeiosPagamentoSection() {
  // Duplicate the list so the marquee loops seamlessly (second half slides in
  // exactly when the first half exits — the same technique as TrustedLogosMarquee).
  const logosDuplicados = [...MEIOS_PAGAMENTO, ...MEIOS_PAGAMENTO];

  return (
    <section className="py-20 bg-[#f4f7fb] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header (original text — unchanged) ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-2">
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              Meios de pagamentos
            </span>{" "}
            online integrados com o{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              Foco Pay
            </span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-3xl mx-auto">
            Garanta o máxima flexibilidade nas transações do seu hotel.
          </p>
        </motion.div>

      </div>

      {/* ── Marquee container (edge-to-edge, outside the container) ──────── */}
      <div className="relative mt-4">

        {/* Gradient fade — left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        {/* Gradient fade — right edge */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling strip */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-14 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 28,
                ease: "linear",
              },
            }}
          >
            {logosDuplicados.map((meio, index) => (
              <div
                key={`${meio.nome}-${index}`}
                className="flex-shrink-0 group"
              >
                {/*
                  Logo card:
                  · Default: grayscale + 50% opacity (premium, non-distracting)
                  · Hover:   full colour + full opacity (brand reveal on demand)
                */}
                <div className="h-16 w-40 flex items-center justify-center px-3">
                  <img
                    src={meio.logo}
                    alt={meio.nome}
                    width={228}
                    height={80}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain grayscale opacity-50 transition-all duration-400 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export { MeiosPagamentoSection };
