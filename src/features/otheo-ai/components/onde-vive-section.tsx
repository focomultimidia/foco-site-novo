"use client";

import { motion } from "framer-motion";
import {
  MousePointerClick,
  MessageCircle,
  Zap,
  Mic,
  Bell,
  BellRing,
  Smartphone,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// 5 capacidades do app viram uma grade de chips (ícone + rótulo curto), não
// uma lista com marcador — mais fácil de escanear e evita a régua de
// `border-b` em toda linha (ver seção 4.9 do guia de estilo).
const APP_CAPACIDADES = [
  { icon: Zap, label: "Ações rápidas" },
  { icon: MessageCircle, label: "Chat completo" },
  { icon: Mic, label: "Mensagens de áudio" },
  { icon: Bell, label: "Notificações push" },
  { icon: BellRing, label: "Alertas em segundo plano" },
];

/**
 * AcessoSection ("onde o Otheo vive") — Extranet e app viram duas colunas
 * de conteúdo, não duas capturas de tela falsas: não existe asset real de
 * desktop pra mostrar, então o card fica honesto com ícone + texto em vez
 * de simular uma UI com divs. Renomeado de "DisponibilidadeSection" pra
 * não colidir, no código, com a nova seção dedicada à dor de
 * disponibilidade de vendas (disponibilidade-vendas-section.tsx) — são
 * dois sentidos diferentes da mesma palavra.
 */
function AcessoSection() {
  return (
    <section className="py-24 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 lg:mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1e3a5f] leading-none tracking-tighter antialiased mb-4">
            Onde o Otheo{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              está disponível
            </span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Hoje na extranet, com um aplicativo próprio a caminho das lojas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="bg-[#f4f7fb] rounded-[28px] border border-slate-100 p-8 sm:p-10"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "linear-gradient(135deg,#285992,#427ab9)" }}>
              <MousePointerClick className="w-6 h-6 text-white" strokeWidth={1.8} />
            </div>
            <h3 className="font-display text-2xl font-semibold text-[#1e3a5f] tracking-tight mb-3">
              Na extranet
            </h3>
            <p className="text-slate-500 leading-relaxed">
              O Otheo fica sempre visível no canto da tela, com chamadas visuais para abrir o
              chat sempre que você precisar, sem sair do que está fazendo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="bg-[#f4f7fb] rounded-[28px] border border-slate-100 p-8 sm:p-10"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#fccc30]/15 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-[#b8860b]" strokeWidth={1.8} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wide text-[#285992] bg-[#285992]/8 border border-[#285992]/15 rounded-full px-3 py-1.5 whitespace-nowrap mt-1">
                Em breve nas lojas
              </span>
            </div>
            <h3 className="font-display text-2xl font-semibold text-[#1e3a5f] tracking-tight mb-4">
              No aplicativo
            </h3>
            <div className="flex flex-wrap gap-2">
              {APP_CAPACIDADES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-100 rounded-full pl-2.5 pr-3.5 py-1.5"
                >
                  <Icon className="w-3.5 h-3.5 text-[#285992]" strokeWidth={1.8} />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { AcessoSection };
