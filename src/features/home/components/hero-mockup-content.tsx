"use client";

/**
 * HeroMockupContent · Dashboard "vivo" + tela de check-in do hero da Home
 *
 * Substitui os prints reais (dashboard.webp / mapa-mobile.webp) por uma
 * composição desenhada em código — cards, gráfico de ocupação e lista de
 * chegadas no desktop; chave digital + timeline de check-in no mobile.
 * Nada de screenshot: é uma peça de design própria, animada, no tom da
 * marca (navy #10233d/#285992/#427ab9 + dourado #fccc30).
 *
 * ── Escala por canvas fixo ───────────────────────────────────────────────
 * Mesma técnica já usada no hero do Channel Manager (`useStageScale`):
 * desenha-se num "canvas" de pixels fixos (815×584 no desktop, 270×585 no
 * mobile — mesmo aspect-ratio que a moldura de vidro já reserva) e escala-se
 * o conjunto por `transform: scale()` conforme a largura real do contêiner
 * (ResizeObserver). Isso evita recalcular fonte/borda/gap em `rem` fluido —
 * o canvas todo escala junto, sempre pixel-perfeito em qualquer largura.
 *
 * Decorativo — cada composição é `aria-hidden`: o conteúdo textual real
 * (headline, subtítulo, CTA) já está fora dela; ler número a número um
 * dashboard fake não ajuda leitor de tela nenhum.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BedDouble,
  Wallet,
  TrendingUp,
  Bell,
  Search,
  ChevronRight,
  CheckCircle2,
  QrCode,
  MapPin,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── useCanvasScale ────────────────────────────────────────────────────────────
// `useLayoutEffect` (não `useEffect`) — mesma razão do stage do Channel
// Manager: medir antes do primeiro paint evita um frame com scale errado.

function useCanvasScale(ref: React.RefObject<HTMLDivElement | null>, designWidth: number) {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => {
      const w = el.offsetWidth;
      if (w > 0) setScale(w / designWidth);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, designWidth]);
  return scale;
}

// ── useCountUp ────────────────────────────────────────────────────────────────
// Sobe de 0 até `target` com easing próprio (sem depender de nenhuma lib
// extra) — dá a sensação de "painel carregando dados agora", não um número
// estático. Pula direto pro valor final com prefers-reduced-motion.

function useCountUp(target: number, opts: { duration?: number; delay?: number; decimals?: number } = {}) {
  const { duration = 1.3, delay = 0.5, decimals = 0 } = opts;
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    if (reducedMotion) { setValue(target); return; }
    let raf = 0;
    let start: number | null = null;
    const durMs = duration * 1000;
    const delayMs = delay * 1000;

    const tick = (t: number) => {
      if (start === null) start = t;
      const elapsed = t - start - delayMs;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const progress = Math.min(1, elapsed / durMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, delay, reducedMotion]);

  return decimals > 0 ? value.toFixed(decimals).replace(".", ",") : String(Math.round(value));
}

// ── Dados fake do "painel" ───────────────────────────────────────────────────

const OCCUPANCY_DAYS = [
  { day: "Seg", value: 68 },
  { day: "Ter", value: 74 },
  { day: "Qua", value: 81 },
  { day: "Qui", value: 77 },
  { day: "Sex", value: 89 },
  { day: "Sáb", value: 96 },
  { day: "Dom", value: 92 },
] as const;

const ARRIVALS = [
  { name: "Mariana Alves", room: "214", status: "confirmado" as const, initials: "MA" },
  { name: "Diego Fontoura", room: "308", status: "em-andamento" as const, initials: "DF" },
  { name: "Bianca Rocha", room: "112", status: "confirmado" as const, initials: "BR" },
] as const;

const STATUS_LABEL: Record<(typeof ARRIVALS)[number]["status"], string> = {
  confirmado: "Confirmado",
  "em-andamento": "Em andamento",
};

const CHECKIN_STEPS = [
  { label: "Reserva confirmada", done: true },
  { label: "Check-in liberado", done: true },
  { label: "Quarto pronto", done: true, live: true },
] as const;

// ── HeroDashboardMockup ───────────────────────────────────────────────────────

const DASH_W = 815;
const DASH_H = 584;

// Largura segura de conteúdo — o celular flutua sobre o canto superior
// direito do frame com folga de ~260px (ver comentário acima da barra
// superior). Medido no canvas real: manter tudo à esquerda de ~560px evita
// que texto fique ilegível atrás do vidro do celular.
const SAFE_W = 540;

function HeroDashboardMockup() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scale = useCanvasScale(wrapRef, DASH_W);
  const reducedMotion = useReducedMotion();

  const occupancy = useCountUp(92, { delay: 0.7 });
  const adr = useCountUp(480, { delay: 0.85 });
  const revenue = useCountUp(186.4, { delay: 1.0, decimals: 1 });

  const maxBar = Math.max(...OCCUPANCY_DAYS.map((d) => d.value));

  return (
    <div ref={wrapRef} aria-hidden="true" className="relative w-full h-full">
      <div
        className="absolute top-0 left-0 bg-[#f7f9fc]"
        style={{ width: DASH_W, height: DASH_H, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {/* Barra superior — conteúdo confinado a SAFE_W: o celular flutua sobre
            o canto superior direito do frame (ver HeroMobileMockup em
            hero-section.tsx), então nada de texto/ícone pode ocupar essa
            faixa, ou fica ilegível atrás dele. A barra em si (fundo branco)
            continua com largura cheia — só o conteúdo recua. */}
        <div className="h-16 flex items-center justify-between bg-white border-b border-[#e7ebf1]" style={{ paddingLeft: 28, width: SAFE_W }}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#285992,#427ab9)" }}
            >
              <BedDouble className="w-[18px] h-[18px] text-white" strokeWidth={2} />
            </div>
            <div className="leading-tight">
              <div className="text-[14px] font-semibold text-[#132840]">Painel Foco</div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#8a94a6]">
                <span className="relative flex h-[6px] w-[6px]">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 motion-safe:animate-ping opacity-60" />
                  <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-emerald-500" />
                </span>
                Recepção · tempo real
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#f1f4f8] flex items-center justify-center flex-shrink-0">
              <Search className="w-3.5 h-3.5 text-[#5b6577]" />
            </div>
            <div className="relative w-8 h-8 rounded-full bg-[#f1f4f8] flex items-center justify-center flex-shrink-0">
              <Bell className="w-4 h-4 text-[#5b6577]" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#e15b5b] ring-2 ring-white" />
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#fccc30,#e8b722)", color: "#132840" }}
            >
              RH
            </div>
          </div>
        </div>

        {/* Corpo — coluna única, confinada a SAFE_W (mesma faixa segura do
            cabeçalho acima). Antes havia uma 2ª coluna fixa à direita com a
            lista de chegadas — ela caía bem embaixo do celular flutuante e
            ficava ilegível atrás do vidro. Nesse arranjo, o gráfico (barras,
            decorativo) é o único elemento que pode encostar no limite
            direito; texto/números continuam sempre dentro da faixa segura. */}
        <div className="flex flex-col gap-3" style={{ height: DASH_H - 64, width: SAFE_W, paddingLeft: 28, paddingRight: 20, paddingTop: 22, paddingBottom: 22 }}>
          <div className="flex gap-3 flex-shrink-0">
            {[
              { label: "Ocupação hoje", value: occupancy, suffix: "%", delta: "+4,2%", icon: BedDouble, chip: "#eaf1fb", tint: "#285992" },
              { label: "Diária média (ADR)", value: adr, suffix: "", prefix: "R$ ", delta: "+R$ 32", icon: Wallet, chip: "#fff6e0", tint: "#b8860b" },
              { label: "Receita do mês", value: revenue, suffix: " mil", prefix: "R$ ", delta: "+18%", icon: TrendingUp, chip: "#e9f8ef", tint: "#1f8a4c" },
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 + i * 0.08, ease: EASE }}
                className="flex-1 bg-white rounded-2xl border border-[#e7ebf1] shadow-[0_1px_2px_rgba(19,40,64,0.04)] p-3.5 flex flex-col justify-between min-w-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-medium text-[#8a94a6] truncate">{kpi.label}</span>
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: kpi.chip }}
                  >
                    <kpi.icon className="w-3.5 h-3.5" style={{ color: kpi.tint }} strokeWidth={2} />
                  </div>
                </div>
                <span className="mt-1.5 text-[21px] font-bold text-[#132840] leading-none tabular-nums">
                  {kpi.prefix}{kpi.value}{kpi.suffix}
                </span>
                <span className="mt-1 inline-flex items-center gap-1 text-[10.5px] font-medium text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  {kpi.delta}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
            className="flex-1 min-h-0 bg-white rounded-2xl border border-[#e7ebf1] shadow-[0_1px_2px_rgba(19,40,64,0.04)] p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-2.5 flex-shrink-0">
              <span className="text-[12.5px] font-semibold text-[#132840]">Ocupação — últimos 7 dias</span>
              <span className="inline-flex items-center gap-1.5 text-[10.5px] text-[#8a94a6]">
                <span className="w-2 h-2 rounded-full bg-[#fccc30]" />
                Hoje
              </span>
            </div>
            <div className="flex-1 min-h-0 flex items-end justify-between gap-2.5 px-1">
              {OCCUPANCY_DAYS.map((d, i) => {
                const isToday = i === OCCUPANCY_DAYS.length - 1;
                const heightPct = (d.value / maxBar) * 100;
                return (
                  <div key={d.day} className="flex-1 h-full flex flex-col items-center justify-end gap-1.5">
                    <div className="relative w-full flex-1 flex items-end justify-center">
                      {isToday && (
                        <span className="absolute -top-6 text-[10px] font-semibold text-[#132840] bg-white border border-[#e7ebf1] rounded-full px-1.5 py-0.5 shadow-sm whitespace-nowrap">
                          {d.value}%
                        </span>
                      )}
                      <motion.div
                        initial={reducedMotion ? false : { height: 0 }}
                        animate={{ height: `${heightPct}%` }}
                        transition={{ duration: 0.9, delay: 1.0 + i * 0.07, ease: EASE }}
                        className="w-full max-w-[24px] rounded-t-lg"
                        style={{
                          background: isToday
                            ? "linear-gradient(180deg,#fccc30,#e8b722)"
                            : "linear-gradient(180deg,#427ab9,#285992)",
                          opacity: isToday ? 1 : 0.85,
                        }}
                      />
                    </div>
                    <span className="text-[9.5px] text-[#8a94a6]">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Chegadas de hoje — faixa horizontal compacta (era uma coluna
              fixa à direita, dentro da faixa do celular flutuante). */}
          <div className="flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12.5px] font-semibold text-[#132840]">Chegadas de hoje</span>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#285992]">
                Ver todas
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
            <div className="flex gap-3">
              {ARRIVALS.map((guest, i) => (
                <motion.div
                  key={guest.name}
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 + i * 0.1, ease: EASE }}
                  className="flex-1 min-w-0 bg-white rounded-xl border border-[#e7ebf1] shadow-[0_1px_2px_rgba(19,40,64,0.04)] p-2.5 flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#285992,#427ab9)" }}
                    >
                      {guest.initials}
                    </div>
                    <span
                      className="flex-shrink-0 text-[9px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap"
                      style={
                        guest.status === "confirmado"
                          ? { background: "#e9f8ef", color: "#1f8a4c" }
                          : { background: "#fff6e0", color: "#b8860b" }
                      }
                    >
                      {STATUS_LABEL[guest.status]}
                    </span>
                  </div>
                  <div className="min-w-0 leading-tight">
                    <div className="text-[11px] font-medium text-[#132840] truncate">{guest.name}</div>
                    <div className="text-[10px] text-[#8a94a6]">Quarto {guest.room}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── HeroMobileScreenMockup ────────────────────────────────────────────────────
// Tela de check-in digital — fundo escuro (contraste de propósito com o
// painel claro do desktop), chave digital com brilho em varredura e timeline
// de status. Canvas 270×585 — mesmo 9:19.5 que a silhueta do celular já
// reserva em HeroMobileMockup (hero-section.tsx).

const PHONE_W = 270;
const PHONE_H = 585;

function HeroMobileScreenMockup() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scale = useCanvasScale(wrapRef, PHONE_W);
  const reducedMotion = useReducedMotion();

  return (
    <div ref={wrapRef} aria-hidden="true" className="absolute inset-0">
      <div
        className="absolute top-0 left-0"
        style={{
          width: PHONE_W,
          height: PHONE_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          background: "linear-gradient(165deg,#16305a 0%,#0e2038 100%)",
        }}
      >
        <div className="flex flex-col h-full px-5 pt-14 pb-6">
          {/* Saudação */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
          >
            <div className="text-[11px] text-white/55">Bem-vindo,</div>
            <div className="text-[17px] font-semibold text-white leading-tight">Mariana Alves</div>
            <div className="mt-2 inline-flex items-center gap-1.5 bg-white/10 rounded-full px-2.5 py-1">
              <MapPin className="w-3 h-3 text-[#fccc30]" />
              <span className="text-[10px] text-white/70">Foco Suítes · Búzios</span>
            </div>
          </motion.div>

          {/* Chave digital */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 1.05, ease: EASE }}
            className="relative mt-6 rounded-2xl overflow-hidden p-4"
            style={{
              background: "linear-gradient(135deg,#285992,#132840)",
              boxShadow: "0 20px 40px -18px rgba(0,0,0,0.5)",
            }}
          >
            {!reducedMotion && (
              <span
                aria-hidden="true"
                className="absolute inset-y-[-40%] w-[45%] pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 10%, rgba(255,255,255,0) 35%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 65%, transparent 90%)",
                  animation: "hero-key-glint 3.2s linear 1.8s infinite",
                }}
              />
            )}

            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold tracking-[0.14em] text-white/50">CHAVE DIGITAL</span>
              <span className="flex h-[7px] w-[7px] rounded-full bg-emerald-400" />
            </div>

            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-[38px] font-bold text-white leading-none tabular-nums">214</div>
                <div className="text-[11px] text-white/60 mt-1">Suíte Vista Mar</div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-white/95 flex items-center justify-center flex-shrink-0">
                <QrCode className="w-8 h-8 text-[#132840]" strokeWidth={1.5} />
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 text-[10px] text-white/50">
              Toque para abrir a porta
            </div>
          </motion.div>

          {/* Timeline de status */}
          <div className="mt-6 flex flex-col gap-3.5">
            {CHECKIN_STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.35 + i * 0.12, ease: EASE }}
                className="flex items-center gap-2.5"
              >
                <CheckCircle2
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: step.live ? "#fccc30" : "#4ade80" }}
                  strokeWidth={2}
                />
                <span className="text-[12px] text-white/85">{step.label}</span>
                {step.live && (
                  <span className="ml-auto text-[9px] font-medium text-[#fccc30] bg-[#fccc30]/10 rounded-full px-2 py-0.5">
                    agora
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroDashboardMockup, HeroMobileScreenMockup };
