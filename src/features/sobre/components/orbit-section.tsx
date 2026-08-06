import { useEffect, useState } from "react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";
import { motion, useMotionValue, useTransform, useSpring, animate } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Section, StaggerSection, StaggerItem } from "./motion-primitives";

// ── Data ──────────────────────────────────────────────────────────────────────

interface InnerPartner { id: string; label: string; logo: string; angle: number; }
interface OuterPartner { id: string; label: string; angle: number; color: string; }

const INNER_PARTNERS: InnerPartner[] = [
  { id: "booking", label: "Booking", logo: "/assets/imgs/certificacoes/booking.webp", angle: 0   },
  { id: "expedia", label: "Expedia", logo: "/assets/imgs/certificacoes/expedia.webp", angle: 90  },
  { id: "stone",   label: "Stone",   logo: "/assets/imgs/certificacoes/stone.webp",   angle: 180 },
  { id: "pci",     label: "PCI SSC", logo: "/assets/imgs/certificacoes/pci.webp",     angle: 270 },
];

const OUTER_PARTNERS: OuterPartner[] = [
  { id: "channel",  label: "Channel\nManager",  angle: 0,   color: "#285992" },
  { id: "pms",      label: "PMS",               angle: 60,  color: "#0f766e" },
  { id: "payments", label: "Pagamentos",         angle: 120, color: "#7c3aed" },
  { id: "crm",      label: "CRM",               angle: 180, color: "#b45309" },
  { id: "motor",    label: "Motor\nReservas",    angle: 240, color: "#dc2626" },
  { id: "site",     label: "Site\nHoteleiro",   angle: 300, color: "#0369a1" },
];

// ── OrbitItem ─────────────────────────────────────────────────────────────────
// Each item owns its own angle MotionValue; position computed via cos/sin
// so the badge always faces the user (only XY changes, no rotation).

function OrbitItem({
  radiusPx, startAngle, durationSec, children,
}: {
  radiusPx:    number;
  startAngle:  number;
  durationSec: number;
  children:    React.ReactNode;
}) {
  const angle = useMotionValue(startAngle);
  const x = useTransform(angle, a => Math.cos((a * Math.PI) / 180) * radiusPx);
  const y = useTransform(angle, a => Math.sin((a * Math.PI) / 180) * radiusPx);

  useEffect(() => {
    const from = angle.get();
    const ctrl = animate(angle, from + 360, { duration: durationSec, repeat: Infinity, ease: "linear" });
    return ctrl.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationSec]);

  return (
    <motion.div className="absolute top-1/2 left-1/2" style={{ x, y, translateX: "-50%", translateY: "-50%" }}>
      {children}
    </motion.div>
  );
}

// ── Spoke ─────────────────────────────────────────────────────────────────────

function Spoke({ angle, length, visible }: { angle: number; length: number; visible: boolean }) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 h-px origin-left pointer-events-none"
      style={{ width: length, rotate: angle, background: "linear-gradient(to right, rgba(40,89,146,0.5), rgba(66,122,185,0.0))" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.38 }}
    />
  );
}

// ── OrbitDiagram ──────────────────────────────────────────────────────────────

function OrbitDiagram() {
  const [hovered, setHovered] = useState(false);
  const innerDur   = hovered ? 10 : 24;
  const outerDur   = hovered ? 14 : 36;
  const glowOpacity = useSpring(0, { stiffness: 180, damping: 22 });

  useEffect(() => { glowOpacity.set(hovered ? 1 : 0); }, [hovered, glowOpacity]);

  return (
    <div
      className="relative w-[360px] h-[360px] lg:w-[420px] lg:h-[420px] shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {[220, 350].map(sz => (
        <motion.div key={sz}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
          style={{ width: sz, height: sz }}
          animate={{ borderColor: hovered ? "rgba(40,89,146,0.28)" : "rgba(148,163,184,0.25)" }}
          transition={{ duration: 0.4 }}
        />
      ))}

      {[0, 90, 180, 270].map(a => <Spoke key={a}          angle={a} length={110} visible={hovered} />)}
      {[0, 60, 120, 180, 240, 300].map(a => <Spoke key={`o${a}`} angle={a} length={175} visible={hovered} />)}

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: 360, height: 360, background: "radial-gradient(circle, rgba(40,89,146,0.10) 0%, transparent 62%)", opacity: glowOpacity }}
      />

      {/* Centre: Foco logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div className="absolute rounded-full bg-[#285992]/10"
          style={{ width: 80, height: 80, top: -8, left: -8 }}
          animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }} />
        <motion.div
          className="relative w-16 h-16 rounded-3xl bg-gradient-to-br from-[#285992] to-[#1e3a5f] flex items-center justify-center"
          style={{ boxShadow: "0 12px 40px rgba(40,89,146,0.22)" }}
          animate={{ scale: hovered ? 1.1 : [1, 1.05, 1] }}
          transition={hovered ? { type: "spring", stiffness: 300, damping: 20 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-display text-2xl font-bold text-white tracking-tighter">F</span>
        </motion.div>
      </div>

      {/* Inner orbit */}
      {INNER_PARTNERS.map(p => (
        <OrbitItem key={p.id} radiusPx={110} startAngle={p.angle} durationSec={innerDur}>
          <motion.div className="w-14 h-14 rounded-3xl flex items-center justify-center p-2"
            style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(30,58,95,0.07)" }}
            animate={hovered ? { boxShadow: "0 12px 40px rgba(40,89,146,0.14), 0 0 0 1.5px rgba(40,89,146,0.22)" } : {}}
            transition={{ duration: 0.35 }}>
            <img src={p.logo} alt={p.label} width={281} height={70} loading="lazy" decoding="async" className="w-full h-full object-contain" />
          </motion.div>
        </OrbitItem>
      ))}

      {/* Outer orbit */}
      {OUTER_PARTNERS.map(p => (
        <OrbitItem key={p.id} radiusPx={175} startAngle={p.angle} durationSec={outerDur}>
          <motion.div className="px-2.5 py-2 rounded-xl text-center"
            style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(10px)", border: `1px solid ${p.color}20`, boxShadow: "0 4px 16px rgba(30,58,95,0.06)" }}
            animate={hovered ? { borderColor: `${p.color}40`, boxShadow: `0 8px 24px ${p.color}18` } : {}}
            transition={{ duration: 0.35 }}>
            {p.label.split("\n").map((line, i) => (
              <div key={i} className="text-[9px] font-bold leading-tight" style={{ color: p.color }}>{line}</div>
            ))}
          </motion.div>
        </OrbitItem>
      ))}
    </div>
  );
}

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
              Nossa plataforma não vive isolada. Ela se conecta ao Booking.com, Expedia, Stone, PCI e dezenas de outros sistemas — criando um único fluxo que elimina retrabalho e maximiza cada reserva.
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
