"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  MessageCircle,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WHATSAPP_URL = "https://wa.me/5541995803372";
const PROPOSAL_ANCHOR = "#proposta";

const trustBadges = [
  {
    icon: MapPin,
    label: "Curitiba e região metropolitana",
  },
  {
    icon: Sparkles,
    label: "Especialistas em operações e finanças",
  },
  {
    icon: Scale,
    label: "Suporte jurídico completo",
  },
] as const;

const floatingChips = [
  {
    icon: ShieldCheck,
    label: "Prestação de contas transparente",
    className: "left-2 top-6 sm:-left-6 sm:top-10",
    delay: 0.2,
  },
  {
    icon: Sparkles,
    label: "App do condomínio",
    className: "right-2 bottom-8 sm:-right-6 sm:bottom-12",
    delay: 0.5,
  },
] as const;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const visualVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 32, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const floatTransition = shouldReduceMotion
    ? undefined
    : {
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut" as const,
      };

  return (
    <section
      id="topo"
      aria-labelledby="hero-heading"
      className="bg-brand-gradient relative isolate overflow-hidden text-brand-white"
    >
      {/* Camadas decorativas de fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Spotlight royal no topo */}
        <div className="bg-brand-radial absolute -top-1/3 left-1/2 h-[70vh] w-[120vw] -translate-x-1/2 rounded-[100%] opacity-40 blur-3xl" />
        {/* Orbe cromado */}
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-brand-royal-bright/25 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-brand-silver/10 blur-3xl" />
        {/* Grade sutil metálica */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(120% 80% at 50% 0%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(120% 80% at 50% 0%, #000 40%, transparent 100%)",
          }}
        />
        {/* Fio de luz prata no rodapé */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-silver/40 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-28 lg:px-10 lg:pb-32 lg:pt-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10"
        >
          {/* Coluna de conteúdo */}
          <div className="flex flex-col items-start text-left">
            <motion.span
              variants={itemVariants}
              className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-brand-silver-light sm:text-sm"
            >
              <MapPin className="size-4 text-brand-royal-bright" aria-hidden />
              Administradora de condomínios em Curitiba
            </motion.span>

            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="mt-6 max-w-2xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl"
            >
              Seu condomínio administrado com{" "}
              <span className="text-silver-gradient">excelência</span>,
              agilidade e transparência.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-base leading-relaxed text-brand-silver-light/90 sm:text-lg"
            >
              Síndico profissional e administração completa para condomínios em
              Curitiba e região. Nossa equipe cuida de operações, finanças,
              manutenção e jurídico — você tem a tranquilidade de uma gestão
              premium, humana e sem dor de cabeça.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-brand-gradient-cta h-12 w-full rounded-xl px-7 text-base font-semibold text-brand-white shadow-brand-lg transition-transform hover:brightness-110 sm:h-14 sm:w-auto"
              >
                <a href={PROPOSAL_ANCHOR}>
                  Solicitar proposta
                  <ArrowRight className="size-5" aria-hidden />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-xl border-white/25 bg-white/5 px-7 text-base font-semibold text-brand-white backdrop-blur transition-colors hover:bg-white/15 hover:text-brand-white sm:h-14 sm:w-auto dark:border-white/25 dark:bg-white/5 dark:hover:bg-white/15"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Falar com a D&V pelo WhatsApp"
                >
                  <MessageCircle className="size-5" aria-hidden />
                  WhatsApp
                </a>
              </Button>
            </motion.div>

            {/* Badges de confiança */}
            <motion.ul
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-2.5"
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="glass-dark inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-brand-silver-light sm:text-sm"
                >
                  <Icon
                    className="size-4 text-brand-royal-bright"
                    aria-hidden
                  />
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Coluna visual: logo em vitrine de vidro */}
          <motion.div
            variants={visualVariants}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <motion.div
              animate={
                shouldReduceMotion ? undefined : { y: [0, -12, 0] }
              }
              transition={floatTransition}
              className="glass-dark relative overflow-hidden rounded-3xl p-6 shadow-brand-lg ring-1 ring-white/15 sm:p-8"
            >
              {/* Brilho cromado superior */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/15 to-transparent"
              />
              {/* Moldura interna prateada */}
              <div className="relative overflow-hidden rounded-2xl bg-brand-navy-deep/60 ring-1 ring-white/10">
                <Image
                  src="/logo.jpeg"
                  alt="D&V Gestão Condominial"
                  width={720}
                  height={720}
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="h-auto w-full object-contain"
                />
                {/* Reflexo diagonal de vidro */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15"
                />
              </div>

              {/* Linha inferior com selo premium */}
              <div className="mt-5 flex items-center gap-3 text-brand-silver-light">
                <ShieldCheck
                  className="size-5 shrink-0 text-brand-royal-bright"
                  aria-hidden
                />
                <p className="text-sm leading-snug">
                  Gestão premium para síndicos, condôminos e construtoras.
                </p>
              </div>
            </motion.div>

            {/* Chips flutuantes de vidro */}
            {floatingChips.map(({ icon: Icon, label, className, delay }) => (
              <motion.div
                key={label}
                animate={
                  shouldReduceMotion ? undefined : { y: [0, -10, 0] }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { ...floatTransition, delay }
                }
                className={cn(
                  "glass-dark absolute z-10 hidden items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-brand-white shadow-brand ring-1 ring-white/15 sm:inline-flex sm:text-sm",
                  className
                )}
              >
                <Icon
                  className="size-4 text-brand-royal-bright"
                  aria-hidden
                />
                {label}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
