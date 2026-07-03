"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NavLink = {
  label: string;
  href: string;
};

const NAV_LINKS: NavLink[] = [
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

const CTA_HREF = "#proposta";
const HEADER_OFFSET = 84;

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloqueia o scroll do corpo enquanto o menu mobile está aberto.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Fecha o menu com a tecla Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const scrollToTarget = useCallback((href: string) => {
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (!target) {
      window.location.hash = href;
      return;
    }
    const top =
      target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [prefersReducedMotion]);

  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      event.preventDefault();
      setMenuOpen(false);
      scrollToTarget(href);
    },
    [scrollToTarget],
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-brand-silver/40 shadow-brand"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* Logo / marca */}
        <a
          href="#topo"
          onClick={(event) => handleNavClick(event, "#topo")}
          className="group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand-royal-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="D&V Gestão Condominial — ir para o topo"
        >
          <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-brand ring-1 ring-brand-silver/40 transition-transform duration-300 group-hover:scale-105 sm:size-11">
            <Image
              src="/logo.jpeg"
              alt="Logo D&V Gestão Condominial"
              fill
              sizes="44px"
              priority
              className="object-contain p-0.5"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span
              className={cn(
                "font-heading text-lg font-extrabold tracking-tight transition-colors sm:text-xl",
                scrolled ? "text-brand-navy" : "text-white",
              )}
            >
              D&amp;V
            </span>
            <span
              className={cn(
                "text-[0.62rem] font-semibold uppercase tracking-[0.18em] transition-colors",
                scrolled ? "text-brand-royal" : "text-brand-silver-light/90",
              )}
            >
              Gestão Condominial
            </span>
          </span>
        </a>

        {/* Links desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors hover:text-brand-royal-bright focus-visible:ring-2 focus-visible:ring-brand-royal-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  scrolled ? "text-brand-ink/80" : "text-white/85 hover:text-white",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <div className="hidden lg:flex">
          <Button
            asChild
            className="h-10 rounded-full bg-brand-gradient-cta px-5 text-sm font-semibold text-white shadow-brand transition-transform hover:scale-[1.03] hover:bg-brand-gradient-cta"
          >
            <a href={CTA_HREF} onClick={(event) => handleNavClick(event, CTA_HREF)}>
              Solicitar proposta
            </a>
          </Button>
        </div>

        {/* Botão hamburger (mobile) */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-lg outline-none transition-colors hover:bg-brand-silver/20 focus-visible:ring-2 focus-visible:ring-brand-royal-bright lg:hidden",
            scrolled || menuOpen ? "text-brand-navy" : "text-white",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex"
              >
                <X className="size-6" aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex"
              >
                <Menu className="size-6" aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 top-16 z-40 bg-brand-navy-deep/40 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              key="panel"
              id="mobile-menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-16 z-40 border-b border-brand-silver/40 bg-white/98 shadow-brand-lg backdrop-blur-xl lg:hidden"
            >
              <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index + 0.05, duration: 0.2 }}
                  >
                    <a
                      href={link.href}
                      onClick={(event) => handleNavClick(event, link.href)}
                      className="block rounded-lg px-3 py-3 text-base font-medium text-brand-ink outline-none transition-colors hover:bg-brand-royal/10 hover:text-brand-royal-bright focus-visible:ring-2 focus-visible:ring-brand-royal-bright"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * NAV_LINKS.length + 0.05, duration: 0.2 }}
                  className="mt-2"
                >
                  <Button
                    asChild
                    className="h-12 w-full rounded-full bg-brand-gradient-cta text-base font-semibold text-white shadow-brand hover:bg-brand-gradient-cta"
                  >
                    <a
                      href={CTA_HREF}
                      onClick={(event) => handleNavClick(event, CTA_HREF)}
                    >
                      Solicitar proposta
                    </a>
                  </Button>
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
