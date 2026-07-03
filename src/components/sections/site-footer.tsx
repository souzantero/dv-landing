"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import type { SVGProps } from "react";

import { Separator } from "@/components/ui/separator";

/* Ícones de marca (Instagram/LinkedIn não fazem parte do set do lucide) */
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const WHATSAPP_URL = "https://wa.me/5541995803372";
const WHATSAPP_LABEL = "(41) 9 9580-3372";
const EMAIL = "devgestaocondominial@gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/dvcondominios";
const LINKEDIN_URL = "https://www.linkedin.com/company/devgestaocondominial/";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Perguntas frequentes", href: "#faq" },
  { label: "Solicitar proposta", href: "#proposta" },
];

const serviceLinks = [
  { label: "Síndico Profissional", href: "#servicos" },
  { label: "Administradora", href: "#servicos" },
  { label: "Mediação de conflitos", href: "#servicos" },
  { label: "Gestão financeira e prestação de contas", href: "#servicos" },
];

const socialLinks = [
  { label: "Instagram", href: INSTAGRAM_URL, icon: InstagramIcon },
  { label: "LinkedIn", href: LINKEDIN_URL, icon: LinkedinIcon },
  { label: "WhatsApp", href: WHATSAPP_URL, icon: MessageCircle },
];

export default function SiteFooter() {
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden bg-brand-navy-deep text-brand-silver-light"
    >
      {/* Fio superior em gradiente da marca */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-brand-royal-bright/70 to-transparent"
      />

      {/* Brilho decorativo (spotlight) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[42rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-brand-royal/25 blur-[120px]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20"
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Marca + descrição + redes */}
          <motion.div variants={item} className="lg:col-span-4">
            <Link
              href="#inicio"
              className="inline-flex items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal-bright focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep"
              aria-label="D&V Gestão Condominial — ir para o início"
            >
              <span className="relative block h-14 w-14 overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-brand">
                <Image
                  src="/logo.jpeg"
                  alt="Logo D&V Gestão Condominial"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-heading text-lg font-bold text-white">
                  D&amp;V
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-silver">
                  Gestão Condominial
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-brand-silver">
              Administradora de condomínios em Curitiba e região metropolitana.
              Unimos síndico profissional, gestão financeira transparente e
              tecnologia para condomínios bem cuidados e valorizados.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-silver-light transition-colors duration-300 hover:border-brand-royal-bright/60 hover:bg-brand-royal/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal-bright focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep"
                >
                  <Icon
                    className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navegação */}
          <motion.nav
            variants={item}
            aria-label="Navegação do rodapé"
            className="lg:col-span-2"
          >
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Navegação
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="inline-flex text-sm text-brand-silver transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal-bright focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Serviços */}
          <motion.nav
            variants={item}
            aria-label="Serviços"
            className="lg:col-span-3"
          >
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Serviços
            </h2>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="inline-flex text-sm text-brand-silver transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal-bright focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contato */}
          <motion.div variants={item} className="lg:col-span-3">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Contato
            </h2>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-sm text-brand-silver transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal-bright focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep rounded-sm"
                >
                  <MessageCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-royal-bright"
                    aria-hidden="true"
                  />
                  <span className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-brand-silver/70">
                      WhatsApp
                    </span>
                    <span className="font-medium text-brand-silver-light group-hover:text-white">
                      {WHATSAPP_LABEL}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-start gap-3 text-sm text-brand-silver transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal-bright focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep rounded-sm"
                >
                  <Mail
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-royal-bright"
                    aria-hidden="true"
                  />
                  <span className="flex min-w-0 flex-col">
                    <span className="text-xs uppercase tracking-wide text-brand-silver/70">
                      E-mail
                    </span>
                    <span className="break-all font-medium text-brand-silver-light group-hover:text-white">
                      {EMAIL}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-brand-silver">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-royal-bright"
                  aria-hidden="true"
                />
                <span className="flex flex-col">
                  <span className="text-xs uppercase tracking-wide text-brand-silver/70">
                    Atendimento
                  </span>
                  <span className="font-medium text-brand-silver-light">
                    Curitiba e região metropolitana — PR
                  </span>
                </span>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-brand-silver transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal-bright focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep rounded-sm"
              >
                <InstagramIcon className="h-4 w-4" />
                @dvcondominios
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>

        <Separator className="my-10 bg-white/10" />

        {/* Barra inferior */}
        <motion.div
          variants={item}
          className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"
        >
          <p className="text-xs text-brand-silver">
            &copy; {currentYear}
            {" "}
            D&amp;V Gestão Condominial. Todos os direitos reservados.
          </p>
          <p className="inline-flex items-center gap-2 text-xs text-brand-silver/80">
            <ShieldCheck
              className="h-4 w-4 text-brand-royal-bright"
              aria-hidden="true"
            />
            Gestão condominial com transparência e agilidade
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
