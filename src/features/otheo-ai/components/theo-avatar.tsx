"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

/**
 * TheoAvatar — placeholder do mascote enquanto os arquivos reais (logo +
 * robô-foguete) não chegam. Segue o MESMO padrão de placeholder já usado
 * em todo o site (`SlideVisual`, `PhoneMockup`, etc.): borda tracejada,
 * ícone genérico, legenda — nunca finge ser o asset final. Quando o arquivo
 * real existir, basta passar `src` — o resto (moldura, tamanho, animação
 * de flutuação) continua funcionando sem mudar nada no chamador.
 */
interface TheoAvatarProps {
  src?: string;
  size?: number;
  floating?: boolean;
  className?: string;
}

function TheoAvatar({ src, size = 56, floating = false, className = "" }: TheoAvatarProps) {
  return (
    <div
      className={[floating ? "motion-safe:animate-badge-float" : "", className].filter(Boolean).join(" ")}
      style={{ width: size, height: size }}
    >
      <div
        className="relative w-full h-full rounded-2xl flex items-center justify-center overflow-hidden"
        style={
          src
            ? undefined
            : {
                border: "1.5px dashed rgba(252,204,48,0.45)",
                background: "rgba(252,204,48,0.06)",
              }
        }
      >
        {src ? (
          <img src={src} alt="Theo, o assistente de IA da Foco" className="w-full h-full object-contain" />
        ) : (
          <Rocket
            className="text-[#fccc30]"
            style={{ width: size * 0.5, height: size * 0.5 }}
            strokeWidth={1.8}
          />
        )}
      </div>
    </div>
  );
}

/**
 * TheoEntrance — a coreografia de entrada (Sessão 2 do briefing): o robô
 * "voa" de fora da tela até o centro, com um leve arco e um pouso elástico,
 * depois assenta na flutuação idle contínua. Roda uma vez, na montagem da
 * hero — não é scroll-linked (por isso é seguro de verificar/depurar neste
 * projeto; ver memória sobre limitações de scroll-driven animation).
 */
function TheoEntrance({ onDocked }: { onDocked?: () => void }) {
  return (
    <motion.div
      initial={{ x: -220, y: 90, rotate: -16, scale: 0.7, opacity: 0 }}
      animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
      transition={{
        duration: 1.1,
        ease: [0.34, 1.4, 0.64, 1], // aproxima um "back.out" — pouso com leve quique
        delay: 0.5,
      }}
      onAnimationComplete={onDocked}
      className="relative"
    >
      {/* Rastro de propulsão — nasce atrás do robô durante o voo e some no pouso */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scaleY: 0.3 }}
        animate={{ opacity: [0, 0.7, 0], scaleY: [0.3, 1, 0.6] }}
        transition={{ duration: 1.1, delay: 0.5, times: [0, 0.5, 1] }}
        className="absolute -left-16 top-1/2 -translate-y-1/2 w-24 h-3 rounded-full blur-md"
        style={{ background: "linear-gradient(90deg, transparent, #fccc30)" }}
      />
      <TheoAvatar size={120} />
    </motion.div>
  );
}

export { TheoAvatar, TheoEntrance };
