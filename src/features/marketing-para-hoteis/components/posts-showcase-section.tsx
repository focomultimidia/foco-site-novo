"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Send, Sparkles } from "lucide-react";
import { SectionEyebrow } from "@/features/shared/components/section-eyebrow";

// ── Data ──────────────────────────────────────────────────────────────────────
// 8 posts reais produzidos pela equipe pra contas de clientes — substituem o
// grid estático 4×2 da página antiga. Tag é o rótulo de categoria exibido no
// card, escolhida a partir do conteúdo real de cada foto.
interface Post {
  id:  string;
  src: string;
  tag: string;
}

const POSTS: Post[] = [
  { id: "1", src: "/assets/imgs/marketing-para-hoteis/posts/bem-estar.webp", tag: "Bem-estar" },
  { id: "2", src: "/assets/imgs/marketing-para-hoteis/posts/destino.webp", tag: "Destino" },
  { id: "3", src: "/assets/imgs/marketing-para-hoteis/posts/familia.webp", tag: "Família" },
  { id: "4", src: "/assets/imgs/marketing-para-hoteis/posts/gastronomia.webp", tag: "Gastronomia" },
  { id: "5", src: "/assets/imgs/marketing-para-hoteis/posts/gastronomia2.webp", tag: "Experiência" },
  { id: "6", src: "/assets/imgs/marketing-para-hoteis/posts/hospedagem.webp", tag: "Hospedagem" },
  { id: "7", src: "/assets/imgs/marketing-para-hoteis/posts/romatico.webp", tag: "Romance" },
  { id: "8", src: "/assets/imgs/marketing-para-hoteis/posts/vista.webp", tag: "Vista" },
];

// Duas fileiras alternadas (ímpar/par), não "primeira metade / segunda
// metade" — dá mais variedade de categoria visível em cada fileira, em vez
// de uma fileira parecer temática e a outra não.
const ROW_A = POSTS.filter((_, i) => i % 2 === 0);
const ROW_B = POSTS.filter((_, i) => i % 2 === 1);

// ── PostCard ──────────────────────────────────────────────────────────────────
function PostCard({ post }: { post: Post }) {
  return (
    <div className="group relative h-[260px] w-[260px] shrink-0 overflow-hidden rounded-2xl bg-slate-200 shadow-lg shadow-black/10 ring-1 ring-black/5">
      <img
        src={post.src}
        alt=""
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
        loading="lazy"
        decoding="async"
      />

      {/* Scrim — mais forte no hover, pra engajamento/marca ficarem legíveis */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/10 opacity-70 transition-opacity duration-300 group-hover:opacity-95"
      />

      {/* Tag de categoria */}
      <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
        {post.tag}
      </span>

      {/* Selo "produção Foco" — some em repouso, aparece no hover, reforça
          autoria sem poluir o card o tempo todo. */}
      <span className="absolute right-3 top-3 flex translate-y-1 items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-[#132840] opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <Sparkles className="h-3 w-3 text-[#fccc30]" fill="#fccc30" strokeWidth={0} />
        Foco
      </span>

      {/* Engajamento — só decorativo, reforça o contexto "post real de rede
          social", aparece junto com o scrim no hover. */}
      <div className="absolute inset-x-3 bottom-3 flex translate-y-1 items-center gap-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <Heart className="h-[18px] w-[18px] text-white" strokeWidth={1.8} />
        <MessageCircle className="h-[18px] w-[18px] text-white" strokeWidth={1.8} />
        <Send className="h-[18px] w-[18px] text-white" strokeWidth={1.8} />
      </div>
    </div>
  );
}

// ── MarqueeRow ────────────────────────────────────────────────────────────────
function MarqueeRow({ posts, direction, duration }: { posts: Post[]; direction: "left" | "right"; duration: number }) {
  const [isPaused, setIsPaused] = useState(false);
  const doubled = [...posts, ...posts];

  return (
    <div className="overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div
        className="flex w-max gap-5"
        style={{
          animation: `mkt-posts-scroll-${direction} ${duration}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {doubled.map((post, i) => (
          <PostCard key={`${post.id}-${i}`} post={post} />
        ))}
      </div>
    </div>
  );
}

// ── PostsShowcaseSection ──────────────────────────────────────────────────────
function PostsShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7fb] py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-xl text-center"
        >
          <SectionEyebrow className="justify-center">Produção própria</SectionEyebrow>
          <h2 className="font-display mb-4 text-4xl font-semibold leading-none tracking-tighter text-[#1e3a5f] antialiased sm:text-5xl">
            Conteúdo que faz o hóspede{" "}
            <span className="bg-gradient-to-r from-[#285992] via-[#427ab9] to-[#285992] bg-clip-text text-transparent">
              querer reservar
            </span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Fotografia, copy e direção de arte — tudo produzido pela nossa equipe. Alguns posts reais que já rodaram
            nas contas dos nossos clientes.
          </p>
        </motion.div>
      </div>

      {/* Fileiras em sentidos opostos — full-bleed, fora do container, com
          fade nas bordas pra sinalizar continuidade infinita. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col gap-5"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f4f7fb] to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f4f7fb] to-transparent sm:w-40" />

        <MarqueeRow posts={ROW_A} direction="left" duration={38} />
        <MarqueeRow posts={ROW_B} direction="right" duration={34} />
      </motion.div>

      <div className="container mx-auto mt-14 px-4 text-center sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => document.getElementById("diagnostico-gratuito")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-t from-[#285992] to-[#427ab9] px-8 text-sm font-semibold text-white shadow-lg shadow-[#285992]/25 transition-all hover:brightness-110"
        >
          Quero conteúdo assim pro meu hotel
        </button>
      </div>
    </section>
  );
}

export { PostsShowcaseSection };
