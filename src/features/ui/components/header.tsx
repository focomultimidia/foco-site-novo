"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Calendar,
  LayoutGrid,
  Monitor,
  CreditCard,
  Users,
  Smartphone,
  Link2,
} from "lucide-react";
import { PremiumCTAButton } from "./premium-cta-button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const softwaresSubmenu = [
  {
    label: "Site Hoteleiro",
    description: "Presença digital profissional para o seu hotel",
    href: "/site-hoteleiro",
    icon: Globe,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    label: "Motor de Reservas",
    description: "Venda direta sem comissões de OTAs",
    href: "/motor-de-reservas",
    icon: Calendar,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Channel Manager",
    description: "Sincronize +850 canais em tempo real",
    href: "/channel-manager",
    icon: LayoutGrid,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    label: "Gestão Hoteleira (PMS)",
    description: "Controle total da operação do seu hotel",
    href: "/gestao-hoteleira",
    icon: Monitor,
    iconClass: "bg-sky-50 text-sky-600",
  },
  {
    label: "Experiência do Hóspede",
    description: "Encante e fidelize quem se hospeda com você",
    href: "/experiencia-do-hospede",
    icon: Smartphone,
    iconClass: "bg-orange-50 text-orange-600",
  },
  {
    label: "Software de Pagamentos",
    description: "Receba com segurança e PCI Compliance",
    href: "/software-de-pagamentos",
    icon: CreditCard,
    iconClass: "bg-pink-50 text-pink-600",
  },
  {
    label: "CRM Hoteleiro",
    description: "Relacionamento e fidelização de hóspedes",
    href: "/crm-hoteleiro",
    icon: Users,
    iconClass: "bg-amber-50 text-amber-600",
  },
  {
    label: "Integrações Hoteleiras",
    description: "Conecte seu hotel ao ecossistema digital",
    href: "/integracoes-hoteleiras",
    icon: Link2,
    iconClass: "bg-teal-50 text-teal-600",
  },
];

const navLinksBefore = [
  { label: "Home",       href: "/"          },
  { label: "Quem somos", href: "/sobre"},
];

// Páginas com a hero no mesmo fundo navy escuro (aurora) da Home — ver
// HomeStyleHero (e, para /channel-manager, GradientHero recolorida no mesmo
// padrão). O header, que por padrão assume fundo claro por baixo (texto/
// logo escuros, transparente até rolar), precisa da variante clara nelas
// enquanto ainda não rolou, senão logo/texto ficam ilegíveis sobre o navy.
// Fora dessa lista (hero clara, ex.: sobre), ou já rolado (pill branca
// flutuante), continua exatamente como sempre foi.
const DARK_HERO_ROUTES = new Set([
  "/",
  "/site-hoteleiro",
  "/motor-de-reservas",
  "/gestao-hoteleira",
  "/software-de-pagamentos",
  "/integracoes-hoteleiras",
  "/crm-hoteleiro",
  "/experiencia-do-hospede",
  "/channel-manager",
]);

const navLinksAfter = [
  { label: "Marketing",        href: "/marketing" },
  { label: "Blog",             href: "/blog"      },
  { label: "Seja um parceiro", href: "https://promocoes.focomultimidia.com/foco-partner-program" },
];

const itemVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
};

const CARD_TRANSITION = { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } as const;

const rowVariants = {
  initial:  { paddingTop: 20, paddingBottom: 20, paddingLeft: 32, paddingRight: 32 },
  floating: { paddingTop: 15, paddingBottom: 15, paddingLeft: 25, paddingRight: 15 },
};

const cardVariants = {
  initial: {
    borderRadius:         0,
    backgroundColor:      "rgba(255,255,255,0)",
    backdropFilter:       "blur(0px)",
    WebkitBackdropFilter: "blur(0px)",
    boxShadow: "0 0px 0px rgba(0,0,0,0), 0 0px 0px rgba(0,0,0,0), inset 0 0 0 1px rgba(255,255,255,0)",
  },
  floating: {
    borderRadius:         100,
    backgroundColor:      "rgba(255,255,255,0.50)",
    backdropFilter:       "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.28)",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isActiveRoute(path: string, href: string): boolean {
  if (href === "/") return path === "/";
  return path.startsWith(href);
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [isScrolled,            setIsScrolled]            = useState(false);
  const [isMobileOpen,          setIsMobileOpen]          = useState(false);
  const [isMobileSoftwaresOpen, setIsMobileSoftwaresOpen] = useState(false);
  const [isMegamenuOpen,        setIsMegamenuOpen]        = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location   = useLocation();
  const megamenuButtonRef  = useRef<HTMLButtonElement | null>(null);
  const mobileOverlayRef   = useRef<HTMLDivElement | null>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsMegamenuOpen(false);
  }, [location.pathname]);

  // Block body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const openMegamenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsMegamenuOpen(true);
  };

  const scheduleMegamenuClose = () => {
    closeTimer.current = setTimeout(() => setIsMegamenuOpen(false), 120);
  };

  const closeMegamenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsMegamenuOpen(false);
  };

  const handleMegamenuBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      closeMegamenu();
    }
  };

  const handleMegamenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      closeMegamenu();
      megamenuButtonRef.current?.focus();
    }
  };

  const softwaresActive = softwaresSubmenu.some((s) =>
    isActiveRoute(location.pathname, s.href)
  );

  const isTransparentDark = DARK_HERO_ROUTES.has(location.pathname) && !isScrolled;

  // Cor do texto/sublinhado do nav — única fonte pros 3 pontos que repetem
  // esse padrão (navLinksBefore, botão Softwares, navLinksAfter).
  const navTextClass = (active: boolean) =>
    active
      ? isTransparentDark ? "text-[#fccc30]" : "text-blue-600"
      : isTransparentDark ? "text-white/90 hover:text-white" : "text-[#244248] hover:text-blue-600";
  const navUnderlineClass = isTransparentDark ? "bg-[#fccc30]" : "bg-blue-600";

  const closeMobile = () => {
    setIsMobileOpen(false);
    setIsMobileSoftwaresOpen(false);
  };

  // Focus trap + Escape-to-close for the full-screen mobile nav overlay
  useEffect(() => {
    if (!isMobileOpen) return;

    mobileCloseButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobile();
        return;
      }
      if (e.key !== "Tab" || !mobileOverlayRef.current) return;

      const focusable = mobileOverlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`container mx-auto transition-[padding] duration-[450ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          isScrolled ? "px-4 sm:px-6 lg:px-8 pt-[14px]" : ""
        }`}
      >
        <motion.div
          animate={isScrolled ? "floating" : "initial"}
          variants={cardVariants}
          transition={CARD_TRANSITION}
        >
          {/* ── Inner row: Logo · Nav · CTA · Mobile toggle ──────────────── */}
          <motion.div
            className="flex items-center justify-between"
            animate={isScrolled ? "floating" : "initial"}
            variants={rowVariants}
            transition={CARD_TRANSITION}
          >
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <motion.img
                src="/assets/imgs/logo/logo-foco.webp"
                alt="Foco Tecnologia e Marketing"
                width={147}
                height={55}
                decoding="async"
                className={`w-auto transition-[filter] duration-300 ${isTransparentDark ? "brightness-0 invert" : ""}`}
                animate={{ height: isScrolled ? 40 : 50 }}
                transition={CARD_TRANSITION}
              />
            </Link>

            {/* ── Desktop nav ─────────────────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinksBefore.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative px-1 py-1 font-normal text-xs uppercase tracking-widest antialiased transition-colors duration-300 group ${navTextClass(isActiveRoute(location.pathname, item.href))}`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 ${navUnderlineClass} ${
                      isActiveRoute(location.pathname, item.href)
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}

              {/* Softwares — flyout megamenu */}
              <div
                className="relative"
                onMouseEnter={openMegamenu}
                onMouseLeave={scheduleMegamenuClose}
                onFocus={openMegamenu}
                onBlur={handleMegamenuBlur}
                onKeyDown={handleMegamenuKeyDown}
              >
                <button
                  ref={megamenuButtonRef}
                  type="button"
                  aria-expanded={isMegamenuOpen}
                  aria-haspopup="true"
                  onClick={() => setIsMegamenuOpen((v) => !v)}
                  className={`relative flex items-center gap-1 px-1 py-1 font-normal text-xs uppercase tracking-widest antialiased transition-colors duration-300 group ${navTextClass(softwaresActive)}`}
                >
                  Softwares hoteleiro
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isMegamenuOpen ? "rotate-180" : ""
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 ${navUnderlineClass} ${
                      softwaresActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isMegamenuOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onMouseEnter={openMegamenu}
                      onMouseLeave={scheduleMegamenuClose}
                      style={{ transformOrigin: "top center" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-[620px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-900/20 border border-slate-100/80 overflow-hidden z-50"
                    >
                      <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-l border-t border-slate-100 rotate-45" />
                      <div className="p-6 grid grid-cols-2 gap-3.5 bg-white">
                        {softwaresSubmenu.map((item) => {
                          const Icon = item.icon;
                          return (
                            <motion.div key={item.href} variants={itemVariants}>
                              <Link
                                to={item.href}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group/card"
                              >
                                <div
                                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/card:-translate-y-0.5 ${item.iconClass}`}
                                >
                                  <Icon className="w-[18px] h-[18px]" />
                                </div>
                                <div className="min-w-0 pt-0.5">
                                  <p className="font-display font-medium text-sm tracking-tight text-slate-800 group-hover/card:text-blue-600 transition-colors leading-snug">
                                    {item.label}
                                  </p>
                                  <p className="text-sm text-slate-500 mt-0.5 leading-snug">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinksAfter.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative px-1 py-1 font-normal text-xs uppercase tracking-widest antialiased transition-colors duration-300 group ${navTextClass(isActiveRoute(location.pathname, item.href))}`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 ${navUnderlineClass} ${
                      isActiveRoute(location.pathname, item.href)
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <PremiumCTAButton label="Agendar uma demonstração" />
            </div>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden p-2 rounded-md transition-colors duration-300 ${isTransparentDark ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100/60"}`}
              onClick={() => setIsMobileOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Mobile full-screen overlay ────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-overlay"
            ref={mobileOverlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-white flex flex-col lg:hidden"
          >
            {/* Top bar: logo + close */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
              <Link to="/" onClick={closeMobile}>
                <img
                  src="/assets/imgs/logo/logo-foco.webp"
                  alt="Foco Tecnologia e Marketing"
                  width={147}
                  height={55}
                  decoding="async"
                  className="h-10 w-auto"
                />
              </Link>
              <button
                ref={mobileCloseButtonRef}
                onClick={closeMobile}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* Nav links — scrollable */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-0.5">

              {navLinksBefore.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeMobile}
                  className={`flex items-center px-4 py-4 rounded-3xl text-base font-medium tracking-tight transition-colors ${
                    isActiveRoute(location.pathname, item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Softwares accordion */}
              <div>
                <button
                  onClick={() => setIsMobileSoftwaresOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-4 rounded-3xl text-base font-medium tracking-tight text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  Softwares hoteleiro
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isMobileSoftwaresOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isMobileSoftwaresOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-2 pt-1 pb-2 space-y-0.5">
                        {softwaresSubmenu.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              to={item.href}
                              onClick={closeMobile}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                            >
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.iconClass}`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinksAfter.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeMobile}
                  className={`flex items-center px-4 py-4 rounded-3xl text-base font-medium tracking-tight transition-colors ${
                    isActiveRoute(location.pathname, item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Bottom CTA — identical premium button from desktop */}
            <div className="shrink-0 flex flex-col items-center gap-3 px-5 pt-4 pb-8 border-t border-slate-100">
              <PremiumCTAButton label="Agendar uma demonstração" />
              <p className="text-xs text-slate-500 tracking-wide">Demonstração gratuita · Sem compromisso</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export { Header };
