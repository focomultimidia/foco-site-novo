"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  Wallet,
  CreditCard,
  ClipboardList,
  Users,
  Star,
  BadgeCheck,
  MapPinned,
  CheckCircle2,
} from "lucide-react";
import type { OtheoResponse } from "../lib/resolve-intent";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Dado fictício, só pra a demonstração ter algo concreto pra mostrar ────────
const RESERVA_DEMO = {
  codigo: "123",
  hospede: "Marina Ferreira",
  status: "Confirmada",
  statusPagamento: "Pago",
  saldo: "R$ 0,00",
  valorTotal: "R$ 1.240,00",
  valorSemConsumo: "R$ 980,00",
  valorComConsumo: "R$ 1.240,00",
  hospedes: 2,
  avaliacao: "4.8",
};

function EmptyStateSuggestions() {
  const sugestoes = [
    "3 check-ins pendentes de confirmação hoje",
    "1 reserva com saldo em aberto há mais de 5 dias",
    "2 bloqueios terminando amanhã",
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-white/50 text-xs font-mono uppercase tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#fccc30]" />
        Enquanto você não pergunta, o Theo já está de olho
      </div>
      {sugestoes.map((s, i) => (
        <motion.div
          key={s}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 + i * 0.08, ease: EASE }}
          className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70"
        >
          {s}
        </motion.div>
      ))}
    </div>
  );
}

function ReservationResultCard({ query }: { query: string }) {
  const rows = [
    { icon: BadgeCheck, label: "Status", value: RESERVA_DEMO.status },
    { icon: CreditCard, label: "Pagamento", value: RESERVA_DEMO.statusPagamento },
    { icon: Wallet, label: "Saldo", value: RESERVA_DEMO.saldo },
    { icon: ClipboardList, label: "Valor total", value: RESERVA_DEMO.valorTotal },
    { icon: ClipboardList, label: "Sem consumo", value: RESERVA_DEMO.valorSemConsumo },
    { icon: ClipboardList, label: "Com consumo", value: RESERVA_DEMO.valorComConsumo },
    { icon: Users, label: "Hóspedes", value: String(RESERVA_DEMO.hospedes) },
    { icon: Star, label: "Avaliação", value: `${RESERVA_DEMO.avaliacao} / 5` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.4, ease: EASE }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-white/10">
        <p className="font-mono text-[10px] uppercase tracking-wide text-[#fccc30]/80 mb-1">
          Reserva #{RESERVA_DEMO.codigo}
        </p>
        <h4 className="font-display font-semibold text-white text-lg">{RESERVA_DEMO.hospede}</h4>
        <p className="text-white/40 text-xs mt-1 truncate">"{query}"</p>
      </div>
      <div className="grid grid-cols-2 gap-px bg-white/5">
        {rows.map(row => (
          <div key={row.label} className="bg-[#0b1a2e] px-4 py-3 flex items-center gap-2.5">
            <row.icon className="w-3.5 h-3.5 text-white/35 shrink-0" strokeWidth={1.8} />
            <div className="min-w-0">
              <div className="text-white/40 text-[10px] uppercase tracking-wide">{row.label}</div>
              <div className="text-white text-sm font-medium truncate">{row.value}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AcaoConfirmadaCard({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.4, ease: EASE }}
      className="rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] px-5 py-4 flex items-start gap-3"
    >
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.8} />
      <div>
        <p className="text-white font-medium text-sm mb-1">Comando entendido</p>
        <p className="text-white/60 text-sm">"{query}"</p>
        <p className="text-white/35 text-xs mt-2">
          Numa extranet real, o Theo executaria essa ação agora e mostraria a confirmação aqui.
        </p>
      </div>
    </motion.div>
  );
}

function GenericoCard({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
    >
      <p className="text-white/70 text-sm">
        Ainda não conheço esse comando — mas anotei: <span className="text-white">"{query}"</span>
      </p>
    </motion.div>
  );
}

function MapaOperacionalPreview() {
  const quartos = Array.from({ length: 24 }, (_, i) => {
    const roll = i % 7;
    if (roll === 0) return "bloqueio";
    if (roll === 3) return "manutencao";
    if (roll === 5) return "livre";
    return "reservado";
  });
  const COLOR: Record<string, string> = {
    bloqueio: "#f43f5e",
    manutencao: "#f59e0b",
    livre: "rgba(255,255,255,0.08)",
    reservado: "#285992",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <MapPinned className="w-4 h-4 text-[#fccc30]" />
        <h4 className="font-display font-semibold text-white text-sm">Mapa operacional</h4>
      </div>
      <div className="grid grid-cols-6 gap-1.5 mb-4">
        {quartos.map((tipo, i) => (
          <div
            key={i}
            className="aspect-square rounded-md"
            style={{ background: COLOR[tipo], border: tipo === "livre" ? "1px dashed rgba(255,255,255,0.15)" : "none" }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-white/50">
        {Object.entries(COLOR).map(([tipo, cor]) => (
          <span key={tipo} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: cor }} />
            {tipo === "bloqueio" ? "Bloqueio" : tipo === "manutencao" ? "Manutenção" : tipo === "livre" ? "Livre" : "Reservado"}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ContextPanel({ response }: { response: OtheoResponse | null }) {
  return (
    <div className="sticky top-24">
      <p className="font-mono text-[10px] uppercase tracking-wide text-white/35 mb-3">
        Painel do Theo
      </p>
      <AnimatePresence mode="popLayout">
        {!response ? (
          <motion.div key="empty" exit={{ opacity: 0 }}>
            <EmptyStateSuggestions />
          </motion.div>
        ) : response.kind === "mapa" ? (
          <motion.div key="mapa" exit={{ opacity: 0 }}>
            <MapaOperacionalPreview />
          </motion.div>
        ) : response.kind === "reserva" ? (
          <motion.div key="reserva" exit={{ opacity: 0 }}>
            <ReservationResultCard query={response.query} />
          </motion.div>
        ) : response.kind === "acao" ? (
          <motion.div key="acao" exit={{ opacity: 0 }}>
            <AcaoConfirmadaCard query={response.query} />
          </motion.div>
        ) : (
          <motion.div key="generico" exit={{ opacity: 0 }}>
            <GenericoCard query={response.query} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { ContextPanel };
