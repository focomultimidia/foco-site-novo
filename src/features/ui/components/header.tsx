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
import { Button } from "@/components/ui/button";

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
    description: "Sincronize +450 canais em tempo real",
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

// Links before the Softwares megamenu
const navLinksBefore = [
  { label: "Home",       href: "/"          },
  { label: "Quem somos", href: "/quem-somos"},
];

// Links after the Softwares megamenu
const navLinksAfter = [
  { label: "Marketing",        href: "/marketing" },
  { label: "Blog",             href: "/blog"      },
  { label: "Seja um parceiro", href: "/parceiro"  },
];

const itemVariants = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
};

// Framer Motion variants for the floating card
const CARD_TRANSITION = { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } as const;

// Uniform padding inside the nav row.
// Floating: all four sides identical → logo-left = logo-top, CTA-right = CTA-top.
// Initial:  generous horizontal padding for the full-width transparent state.
const rowVariants = {
  initial:  { paddingTop: 20, paddingBottom: 20, paddingLeft: 32, paddingRight: 32 },
  floating: { paddingTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15 },
};

// cardVariants only handles visual properties.
// Width alignment and top-gap are handled by the CSS container wrapper below,
// which uses the same "container mx-auto px-* pt-*" classes as page sections.
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

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll(); // evaluate on mount (handles reload-while-scrolled)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsMegamenuOpen(false);
  }, [location.pathname]);

  const openMegamenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsMegamenuOpen(true);
  };

  const scheduleMegamenuClose = () => {
    closeTimer.current = setTimeout(() => setIsMegamenuOpen(false), 120);
  };

  const softwaresActive = softwaresSubmenu.some((s) =>
    isActiveRoute(location.pathname, s.href)
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/*
        Outer shell replicates the site's own container grid.
        • top (static)   → no padding, full container width, transparent.
        • floating (scroll) → same px-4/sm:px-6/lg:px-8 + pt-[14px] as page
          sections, so the card edges align with section content edges at every
          breakpoint. CSS transition-[padding] syncs with Framer Motion timing.
      */}
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
          {/* Logo — shrinks slightly on scroll */}
          <Link to="/" className="shrink-0">
            <motion.img
              src="/logo-foco.png"
              alt="Foco Tecnologia e Marketing"
              className="w-auto"
              animate={{ height: isScrolled ? 28 : 36 }}
              transition={CARD_TRANSITION}
            />
          </Link>

          {/* ── Desktop nav ─────────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-6">

            {/* Home · Quem somos */}
            {navLinksBefore.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-1 py-1 text-md font-regular transition-colors duration-300 group ${
                  isActiveRoute(location.pathname, item.href)
                    ? "text-blue-600"
                    : "text-[#244248] hover:text-blue-600"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 bg-blue-600 ${
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
            >
              <button
                className={`relative flex items-center gap-1 px-1 py-1 text-md font-regular transition-colors duration-300 group ${
                  softwaresActive ? "text-blue-600" : "text-[#244248] hover:text-blue-600"
                }`}
              >
                Softwares hoteleiro
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMegamenuOpen ? "rotate-180" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 bg-blue-600 ${
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
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-[620px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-900/20 border border-slate-100/80 overflow-hidden z-50"
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
                                <p className="text-md font-semibold text-slate-800 group-hover/card:text-blue-600 transition-colors leading-snug">
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

            {/* Marketing · Blog · Seja um parceiro */}
            {navLinksAfter.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-1 py-1 text-md font-regular transition-colors duration-300 group ${
                  isActiveRoute(location.pathname, item.href)
                    ? "text-blue-600"
                    : "text-[#244248] hover:text-blue-600"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 bg-blue-600 ${
                    isActiveRoute(location.pathname, item.href)
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Button
              size="sm"
              className={`bg-[#285992] hover:bg-[#154781] text-white font-semibold rounded-full text-sm shadow-md shadow-blue-900/20 hover:shadow-lg hover:shadow-blue-900/30 hover:-translate-y-px transition-all duration-300 ${
                isScrolled ? "px-4 py-[7px]" : "px-5 py-5"
              }`}
            >
              Agendar uma demonstração
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md transition-colors duration-300 text-gray-700 hover:bg-gray-100/60"
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate:  90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        {/* ── Mobile menu ──────────────────────────────────────────────── */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{    opacity: 0, height: 0      }}
              transition={{ duration: 0.25 }}
              className={`lg:hidden overflow-hidden border-t ${
                isScrolled
                  ? "border-white/20"
                  : "border-slate-100 bg-white/95 backdrop-blur-xl"
              }`}
            >
              <div className="container mx-auto px-4 py-4 space-y-1">
                {/* Home · Quem somos */}
                {navLinksBefore.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`block px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActiveRoute(location.pathname, item.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Softwares accordion */}
                <div>
                  <button
                    onClick={() => setIsMobileSoftwaresOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
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
                        exit={{    opacity: 0, height: 0      }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-2 pt-1 pb-2 space-y-0.5">
                          {softwaresSubmenu.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => setIsMobileOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                              >
                                <div
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${item.iconClass}`}
                                >
                                  <Icon className="w-3.5 h-3.5" />
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
                    onClick={() => setIsMobileOpen(false)}
                    className={`block px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActiveRoute(location.pathname, item.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="pt-3 pb-1 border-t border-slate-100">
                  <Button className="w-full bg-[#1e3a5f] hover:bg-[#16304f] text-white font-semibold rounded-full">
                    Fale com um consultor
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      </div>
    </header>
  );
}

export { Header };
