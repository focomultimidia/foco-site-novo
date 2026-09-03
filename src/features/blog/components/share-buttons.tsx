"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

// Ícones oficiais das 3 redes — SVG próprio (lucide-react não tem
// WhatsApp/LinkedIn/X), mesmo padrão de logo-como-SVG-inline já usado em
// outros pontos do site (ex.: ícones de canal no channel-manager).
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.44.79 3.06 1.2 4.71 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.13c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.15 8.15 0 0 1-1.26-4.36c0-4.51 3.67-8.18 8.18-8.18a8.13 8.13 0 0 1 5.79 2.4 8.13 8.13 0 0 1 2.39 5.79c0 4.51-3.67 8.21-8.11 8.21z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor" aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.83-5.97 6.83H1.65l7.73-8.84L1.24 2.25h6.83l4.72 6.24 5.45-6.24zm-1.16 17.52h1.83L7.02 4.13H5.06l12.02 15.64z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.35" cy="6.65" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ── ShareButtons ──────────────────────────────────────────────────────────────
// Gap real do blog atual — hoje só existe "seguir no Instagram", nenhum
// botão de compartilhar o post em si. Usa os links de intent oficiais de
// cada rede (sem SDK/pixel de terceiro pra isso, mais leve e sem tracking
// extra). Pra esses cards renderem bonitos quando o link é colado, o HTML
// da página precisa ter og:title/og:image corretos — isso é o que
// scripts/generate-blog-static.mjs garante (ver plano técnico).
function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copiedKey, setCopiedKey] = useState<"link" | "instagram" | null>(null);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink(key: "link" | "instagram") {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // Clipboard indisponível (ex.: contexto não-seguro) — sem fallback
      // silencioso enganoso, só não marca "copiado".
    }
  }

  const links = [
    { label: "WhatsApp", Icon: WhatsAppIcon, href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    { label: "Facebook", Icon: FacebookIcon, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "LinkedIn", Icon: LinkedInIcon, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "X", Icon: XIcon, href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
  ] as const;

  return (
    <div className="flex items-center gap-2">
      <span className="text-[12px] font-medium text-slate-600 mr-1">Compartilhar</span>
      {links.map(({ label, Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Compartilhar no ${label}`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#285992]/10 hover:text-[#285992] transition-colors"
        >
          <Icon />
        </a>
      ))}
      {/* Instagram não tem intent de compartilhamento por URL na web (só
          Stories via app nativo) — o botão copia o link pro usuário colar
          onde quiser (Story, bio, DM), mesmo mecanismo do "copiar link"
          abaixo, só com feedback próprio. */}
      <button
        type="button"
        onClick={() => copyLink("instagram")}
        aria-label="Copiar link para compartilhar no Instagram"
        title="Instagram não permite compartilhar um link direto — copie e cole onde quiser"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#285992]/10 hover:text-[#285992] transition-colors"
      >
        {copiedKey === "instagram" ? <Check className="w-4 h-4 text-[#1a7e43]" strokeWidth={2.4} /> : <InstagramIcon />}
      </button>
      <button
        type="button"
        onClick={() => copyLink("link")}
        aria-label="Copiar link"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#285992]/10 hover:text-[#285992] transition-colors"
      >
        {copiedKey === "link" ? <Check className="w-4 h-4 text-[#1a7e43]" strokeWidth={2.4} /> : <Link2 className="w-4 h-4" strokeWidth={2} />}
      </button>
    </div>
  );
}

export { ShareButtons };
