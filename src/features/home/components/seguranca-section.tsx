"use client";

import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { motion, type Variants } from "framer-motion";
import { Lock, Cloud, FileKey2 } from "lucide-react";
import type { Certificacao } from "../types";

interface SegurancaSectionProps {
  certificacoes: Certificacao[];
}

// Logo real de cada certificação — substitui o ícone genérico do lucide.
// Chave é `cert.id` (ver home-api.ts: 1=PCI, 2=LGPD, 3=SSL, 4=Data Encryption,
// na mesma ordem dos arquivos em public/assets/imgs/seguranca/).
const LOGO_MAP: Record<string, string> = {
  "1": "/assets/imgs/seguranca/pci-dss.svg",
  "2": "/assets/imgs/seguranca/lgpd.svg",
  "3": "/assets/imgs/seguranca/ssl.svg",
  "4": "/assets/imgs/seguranca/data-encryption.svg",
};

/**
 * O trilho de cor na borda esquerda continua identificando o DOMÍNIO da
 * certificação (dado, rede, infra, pagamento) — a logo real já faz esse
 * papel também, mas o trilho reforça a leitura em varredura rápida.
 */
const railColors: Record<number, string> = {
  0: "#285992",
  1: "#0e7490",
  2: "#6d28d9",
  3: "#b45309",
};


const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function SegurancaSection({ certificacoes }: SegurancaSectionProps) {
  return (
    <section className="relative py-24 overflow-hidden bg-[#f4f7fb]">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column layout: header left · cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-[3.5fr_6.5fr] gap-10 lg:gap-12 items-center">

          {/* Left: badge, title, subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionEyebrow>Segurança &amp; Compliance</SectionEyebrow>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-semibold text-[#132840] leading-none tracking-tighter antialiased mb-5">
              Sua operação protegida por{" "}
              {/* Quebra forçada só a partir de `lg`, onde a coluna vira
                  estreita (3.5/10 do grid) e a composição em 2 linhas foi
                  desenhada pra ali. Abaixo disso o texto já ocupa a largura
                  cheia e quebra sozinho — o `<br/>` fixo isolava um "por"
                  solto numa linha própria no mobile (pedido explícito pra
                  remover). */}
              <br className="hidden lg:block" />
              <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
                tecnologia de classe mundial
              </span>
            </h2>

            <p className="text-[#4c5c73] text-base sm:text-lg leading-relaxed">
              Seguimos os mais altos padrões globais de segurança para garantir que
              os dados da sua empresa e dos seus hóspedes estejam sempre protegidos.
            </p>
          </motion.div>

          {/* Right: 2 × 2 card grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {certificacoes.map((cert, index) => {
              const rail = railColors[index % 4];

              return (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-3xl paper paper-hover p-6 flex flex-col gap-4 cursor-default"
                >
                  {/* Trilho de domínio — 2px de cor na borda esquerda.
                      Cresce no hover: a identidade do card se declara sem
                      precisar tingir a superfície inteira. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 bottom-0 w-[2px] opacity-45 group-hover:opacity-100 group-hover:w-[3px] transition-all duration-300"
                    style={{ backgroundColor: rail }}
                  />

                  {/* Logo — solta, sem caixa/fundo por baixo. `max-w-[130px]`
                      (não 64px) porque duas das quatro logos são wordmarks
                      bem mais largos que altos (LGPD ~2.6:1, SSL ~3:1) — um
                      teto mais apertado cortava a largura antes da altura
                      e essas duas ficavam visivelmente menores que as
                      logos quadradas (PCI-DSS, Data Encryption) na mesma
                      grade. Altura fixa consistente pra todas; a largura
                      de cada uma varia com sua proporção real. */}
                  <img
                    src={LOGO_MAP[cert.id]}
                    alt={cert.titulo}
                    className="h-10 w-auto max-w-[130px] self-start object-contain object-left flex-shrink-0"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Text */}
                  <div>
                    <h3 className="font-semibold text-[#132840] text-base mb-1.5">
                      {cert.titulo}
                    </h3>
                    <p className="text-[#4c5c73] text-sm leading-relaxed">
                      {cert.descricao}
                    </p>
                  </div>

                  {/* Selo de status — esmeralda em todos, com ponto pulsante */}
                  <div className="mt-auto inline-flex w-fit items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-emerald-600/20 bg-emerald-500/8 text-emerald-700">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    </span>
                    Ativo
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[#4c5c73] text-sm"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#285992]/70" />
            <span>Criptografia SSL/TLS</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-[#132840]/12" />
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-[#285992]/70" />
            <span>Hospedagem AWS &amp; Google Cloud</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-[#132840]/12" />
          <div className="flex items-center gap-2">
            <FileKey2 className="w-4 h-4 text-[#285992]/70" />
            <span>Conformidade LGPD &amp; PCI DSS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { SegurancaSection };
