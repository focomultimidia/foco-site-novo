"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ChevronDown,
  Users,
  TrendingUp,
  Calendar,
  Smile,
} from "lucide-react";
import type { HeroData } from "../types";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURAÇÃO — ajuste TOTAL_FRAMES para o número real de frames na pasta
// Frames esperados em: /public/assets/home-hero-frames/0001.webp … NNNN.webp
// ─────────────────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 150;

// Frame exato onde o texto começa a sair.
// Deve ser < TOTAL_FRAMES. Ajuste conforme o ponto visual desejado na sua sequência.
const TRIGGER_FRAME = 50; // ← altere aqui se necessário

// Em Next.js, arquivos em /public são servidos pela raiz —
// /public/assets/home-hero-frames/0001.webp → URL: /assets/home-hero-frames/0001.webp
const FRAME_URL = (n: number) =>
  `/assets/home-hero-frames/${String(n).padStart(4, "0")}.webp`;

// ── Utilitário: canvas object-fit cover ──────────────────────────────────────
function drawToCanvas(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, dw, dh);
}

// ── Props ────────────────────────────────────────────────────────────────────
interface HeroSectionProps {
  data: HeroData;
  onCtaClick?: () => void;
}

const STATS = [
  { icon: Users,      value: "+2.500", label: "Clientes ativos",     iconBg: "bg-blue-500/20",    iconColor: "text-blue-300"    },
  { icon: TrendingUp, value: "+1B",    label: "Transações/ano",      iconBg: "bg-emerald-500/20", iconColor: "text-emerald-300" },
  { icon: Calendar,   value: "+18",    label: "Anos de experiência", iconBg: "bg-orange-500/20",  iconColor: "text-orange-300"  },
  { icon: Smile,      value: "+2.4k",  label: "Clientes satisfeitos",iconBg: "bg-rose-500/20",    iconColor: "text-rose-300"    },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Componente ────────────────────────────────────────────────────────────────
function HeroSection({ data: _data, onCtaClick }: HeroSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  // Refs internos — atualizados sem re-render durante o scrubbing
  const ctxRef          = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef       = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady]           = useState(false);

  // ── 1. Canvas: init das dimensões + resize handler ──────────────────────────
  // useLayoutEffect roda ANTES do primeiro paint — garante que o canvas
  // já tem as dimensões corretas quando useEffect começar a desenhar.
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // getContext pode retornar null se o canvas já usa outro contexto (ex: WebGL)
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("[Hero] ❌ canvas.getContext('2d') retornou null.");
      return;
    }
    ctxRef.current = ctx;

    const syncSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width  = w;
      canvas.height = h;

      console.log(`[Hero] 📐 Canvas: ${w}×${h}px`);

      // Redesenha o frame atual após resize (evita canvas em branco)
      const img = imagesRef.current[currentFrameRef.current];
      if (img?.complete && img.naturalWidth) {
        drawToCanvas(ctx, img, w, h);
      }
    };

    syncSize();
    window.addEventListener("resize", syncSize, { passive: true });
    return () => window.removeEventListener("resize", syncSize);
  }, []);

  // ── 2. Preload + GSAP ───────────────────────────────────────────────────────
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas  = canvasRef.current;
    if (!wrapper || !canvas) return;

    let gsapCtx: gsap.Context | null = null;
    let settled = 0;

    // Array pré-alocado — mantém a ordem mesmo com downloads fora de ordem
    const images = new Array<HTMLImageElement>(TOTAL_FRAMES);

    // Tenta desenhar o frame idx no canvas
    const drawFrame = (idx: number) => {
      const ctx = ctxRef.current;
      const img = images[idx];

      if (!ctx) {
        console.warn(`[Hero] ⚠️ drawFrame(${idx}): ctx ainda é null.`);
        return;
      }
      if (!img?.complete || !img.naturalWidth) {
        console.warn(`[Hero] ⚠️ drawFrame(${idx}): imagem não pronta (complete=${img?.complete}, naturalWidth=${img?.naturalWidth}).`);
        return;
      }

      drawToCanvas(ctx, img, canvas.width, canvas.height);
      currentFrameRef.current = idx;
    };

    // Inicia as animações GSAP — chamado apenas após TODOS os frames carregados
    const setupAnimation = () => {
      const frameState = { current: 0 };

      // Garante que o texto começa no estado visível antes de qualquer animação.
      // Sem isso, o GSAP pode capturar um estado incorreto como FROM ao criar a timeline.
      if (textRef.current) {
        gsap.set(textRef.current, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          force3D: true,
        });
      }

      gsapCtx = gsap.context(() => {
        // ── TIMELINE UNIFICADA ────────────────────────────────────────────────
        //
        // Uma única timeline com um único ScrollTrigger garante sincronia
        // perfeita entre os dois tracks: frames do canvas e saída do texto.
        //
        // Convenção de tempo adotada: 1 unidade de tempo = 1 frame.
        //   • Duração total da timeline = TOTAL_FRAMES
        //   • No tempo t, frameState.current ≈ t
        //   • Label "startContentOut" posicionada em t = TRIGGER_FRAME
        //   → O texto começa a sair exatamente quando o frame TRIGGER_FRAME é desenhado.
        //
        // scrub: 0.5 → animação "persegue" o scroll com 500ms de suavização.
        // ─────────────────────────────────────────────────────────────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });

        // ── Track 1: Canvas flipbook ──────────────────────────────────────────
        // Anima frameState.current de 0 → TOTAL_FRAMES-1 ao longo de TOTAL_FRAMES
        // unidades de tempo. ease:"none" = mapeamento linear scroll → frame.
        // onUpdate() lê o valor atual e chama drawFrame() a cada tick do GSAP.
        tl.to(
          frameState,
          {
            current: TOTAL_FRAMES - 1,
            duration: TOTAL_FRAMES,
            ease: "none",
            onUpdate() {
              const idx = Math.min(
                TOTAL_FRAMES - 1,
                Math.max(0, Math.round(frameState.current))
              );
              drawFrame(idx);
            },
          },
          0 // começa no início da timeline
        );

        // ── Label: ponto de sincronização ─────────────────────────────────────
        // Posicionada em t = TRIGGER_FRAME, que é exatamente quando
        // frameState.current alcança TRIGGER_FRAME no Track 1.
        tl.addLabel("startContentOut", TRIGGER_FRAME);

        // ── Track 2: Saída do texto ───────────────────────────────────────────
        // Começa na label "startContentOut" e dura (TOTAL_FRAMES - TRIGGER_FRAME)
        // unidades de tempo — cobrindo exatamente os frames restantes.
        //
        // Resultado: o texto permanece estático e nítido do frame 0 ao TRIGGER_FRAME.
        // A partir daí sobe, some e desfoca gradualmente enquanto os últimos
        // frames do canvas são desenhados — tudo no mesmo scrub.
        //
        // immediateRender: false evita que o GSAP capture os valores atuais
        // do texto como FROM no momento da criação da timeline.
        if (textRef.current) {
          tl.to(
            textRef.current,
            {
              y: -100,
              opacity: 0,
              filter: "blur(20px)",
              ease: "power2.in",
              duration: TOTAL_FRAMES - TRIGGER_FRAME,
              immediateRender: false,
            },
            "startContentOut"
          );
        }

        console.log(
          `[Hero] ✅ Timeline unificada:\n` +
          `  • Flipbook:        frames 0 → ${TOTAL_FRAMES - 1}  (t=0 → ${TOTAL_FRAMES})\n` +
          `  • startContentOut: frame ${TRIGGER_FRAME}            (t=${TRIGGER_FRAME})\n` +
          `  • Texto exit:      frames ${TRIGGER_FRAME} → ${TOTAL_FRAMES - 1}  (${TOTAL_FRAMES - TRIGGER_FRAME} unidades)`
        );

      }, wrapper);

      ScrollTrigger.refresh();
    };

    // ── Preload de todos os frames em paralelo ─────────────────────────────
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src   = FRAME_URL(i + 1);
      images[i] = img;

      // ── onload: sucesso ────────────────────────────────────────────────
      img.onload = () => {
        // LOG CRÍTICO: confirma que o path está correto e o arquivo existe
        if (i === 0) {
          console.log(
            `[Hero] ✅ Frame 1 OK → ${img.src}`,
            `(${img.naturalWidth}×${img.naturalHeight}px)`
          );
          // Desenha o frame 0 IMEDIATAMENTE — sem esperar os outros 149
          // Isso é a correção principal: o canvas fica visível assim que
          // a primeira imagem carrega, não só após todos carregarem.
          drawFrame(0);
        }

        settled++;
        setLoadProgress(Math.round((settled / TOTAL_FRAMES) * 100));

        if (settled === TOTAL_FRAMES) {
          imagesRef.current = images;
          // Redesenha frame 0 para garantir que não ficou em branco
          drawFrame(0);
          setIsReady(true);
          setupAnimation();
          console.log(`[Hero] 🎬 Todos os ${TOTAL_FRAMES} frames prontos.`);
        }
      };

      // ── onerror: falha (arquivo não existe ou path errado) ─────────────
      img.onerror = () => {
        // LOG CRÍTICO: mostra exatamente qual URL falhou
        // Se aparecer aqui, verifique se o arquivo existe em:
        // /public/assets/home-hero-frames/<número>.webp
        if (i === 0) {
          console.error(
            `[Hero] ❌ Frame 1 FALHOU → ${img.src}`,
            "\n→ Verifique se o arquivo existe em: public/assets/home-hero-frames/0001.webp"
          );
        } else if (i < 5) {
          console.error(`[Hero] ❌ Frame ${i + 1} FALHOU → ${img.src}`);
        }

        settled++;
        setLoadProgress(Math.round((settled / TOTAL_FRAMES) * 100));

        if (settled === TOTAL_FRAMES) {
          imagesRef.current = images;
          setIsReady(true);
          setupAnimation();
          console.warn("[Hero] ⚠️ Todos frames processados (com erros). GSAP iniciado sem garantia de imagens.");
        }
      };
    }

    return () => {
      gsapCtx?.revert();
    };
  }, []);

  // ── JSX ──────────────────────────────────────────────────────────────────────
  return (
    // Wrapper 500vh: "pista" de scroll para o sticky funcionar
    <div ref={wrapperRef} style={{ height: "500vh" }}>

      {/* Sticky: fica fixo no topo enquanto o wrapper percorre a viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#07091a]">

        {/* ── z-index explícito em todas as camadas ─────────────────────────
            z-[1]  → canvas (fundo, mais baixo)
            z-[2]  → gradientes de overlay
            z-[10] → conteúdo de texto
            z-[20] → loading overlay (por cima de tudo enquanto carrega)
        ─────────────────────────────────────────────────────────────────── */}

        {/* Canvas — base da composição */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-[1]"
          aria-hidden="true"
        />

        {/* Gradiente horizontal: escurece a esquerda para o texto respirar */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/80 via-black/45 to-black/10 pointer-events-none" />
        {/* Gradiente inferior: transição suave para a seção seguinte */}
        <div className="absolute bottom-0 left-0 right-0 h-48 z-[2]  pointer-events-none" />

        {/* Conteúdo à esquerda — z-[10] garante que fica sobre os gradientes */}
        {/*
          Container idêntico ao do Header (container mx-auto + px-4 sm:px-6 lg:px-8).
          No breakpoint lg+: lg:px-8 = 32px = rowVariants.initial.paddingLeft do Header.
          pt-[96px] afasta o conteúdo do header fixo (~90px) sem quebrar o items-center.
        */}
        <div className="absolute inset-0 z-[10] flex items-center pt-[96px]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div ref={textRef} className="max-w-2xl">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 px-5 py-2.5 rounded-full text-sm font-medium mb-7"
            >
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              Sistema completo para hotelaria
            </motion.div>

            {/* Título — Space Grotesk via font-display */}
            <motion.h1
              initial={{ opacity: 0, y: 36, filter: "blur(16px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.0, delay: 0.3, ease: EASE }}
              className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] font-medium text-white leading-none tracking-tighter antialiased mb-6"
            >
              10 sistemas
              <br />
              hoteleiros em um{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-500 to-cyan-200 bg-clip-text text-transparent">
                único software
              </span>
            </motion.h1>

            {/* Subtítulo — Inter via font-sans */}
            <motion.p
              initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 0.46, ease: EASE }}
              className="font-sans text-white text-base sm:text-lg font-light leading-relaxed mb-10"
            >
              Para hotéis e pousadas que querem vender mais,
              <br className="hidden sm:block" />
              gastar menos e ter controle total da operação.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-12"
            >
              <button
                onClick={onCtaClick}
                className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base shadow-lg shadow-blue-600/40 hover:shadow-blue-500/50 hover:-translate-y-0.5"
              >
                Demonstração grátis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
              className="flex flex-wrap gap-3"
            >
              {STATS.map(({ icon: Icon, value, label, iconBg, iconColor }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-4 py-2.5"
                >
                  <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${iconColor}`} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-base leading-none">{value}</div>
                    <div className="text-white/80 text-[14px] mt-0.5 font-sans">{label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-2 text-white/60 pointer-events-none"
          aria-hidden="true"
        >
          <span className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase">
            Role para descobrir
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>

        {/* Loading overlay — z-[20] fica sobre tudo enquanto carrega */}
        <div
          className="absolute inset-0 z-[20] bg-[#07091a] flex flex-col items-center justify-center gap-6 transition-opacity duration-700"
          style={{
            opacity: isReady ? 0 : 1,
            pointerEvents: isReady ? "none" : "auto",
          }}
        >
          <div className="flex flex-col items-center gap-3 w-52">
            {/* Barra de progresso */}
            <div className="relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all duration-150"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="font-sans text-white/30 text-xs font-medium tracking-widest uppercase">
              {loadProgress < 100 ? `Carregando ${loadProgress}%` : "Preparando..."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export { HeroSection };
