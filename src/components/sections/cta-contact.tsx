"use client"

import Image from "next/image"
import type { ComponentType, SVGProps } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { ArrowRight, Mail, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

type IconProps = SVGProps<SVGSVGElement>

function InstagramIcon(props: IconProps) {
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
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.46c.98 0 1.77-.78 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  )
}

const WHATSAPP_URL = "https://wa.me/5541995803372"
const WHATSAPP_DISPLAY = "(41) 9 9580-3372"
const EMAIL = "devgestaocondominial@gmail.com"
const INSTAGRAM_URL = "https://www.instagram.com/dvcondominios"
const LINKEDIN_URL = "https://www.linkedin.com/company/devgestaocondominial/"

type Channel = {
  label: string
  value: string
  href: string
  icon: ComponentType<IconProps>
  external?: boolean
}

const channels: Channel[] = [
  {
    label: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    href: WHATSAPP_URL,
    icon: MessageCircle,
    external: true,
  },
  {
    label: "E-mail",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
  },
  {
    label: "Instagram",
    value: "@dvcondominios",
    href: INSTAGRAM_URL,
    icon: InstagramIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "D&V Gestão Condominial",
    href: LINKEDIN_URL,
    icon: LinkedinIcon,
    external: true,
  },
]

export default function CtaContact() {
  const prefersReducedMotion = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  }

  const item: Variants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section
      id="contato"
      aria-labelledby="cta-contact-heading"
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:py-32"
    >
      {/* Fundo premium: gradiente da marca + spotlight radial */}
      <div className="bg-brand-gradient absolute inset-0 -z-20" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(120%_120%_at_50%_0%,black,transparent_70%)]"
        aria-hidden="true"
      >
        <div className="bg-brand-radial absolute inset-0" />
      </div>
      {/* Brilho decorativo cromado */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-royal-bright/30 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.div variants={item} className="mb-8">
          <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-silver-light uppercase">
            <span className="size-1.5 rounded-full bg-brand-royal-bright" aria-hidden="true" />
            Atendimento em Curitiba e São José dos Pinhais
          </span>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <span className="inline-flex items-center justify-center rounded-2xl bg-white p-2 shadow-brand-lg ring-1 ring-white/20">
            <Image
              src="/logo.jpeg"
              alt="D&V Gestão Condominial"
              width={132}
              height={132}
              className="h-16 w-auto rounded-xl sm:h-20"
              priority={false}
            />
          </span>
        </motion.div>

        <motion.h2
          id="cta-contact-heading"
          variants={item}
          className="text-3xl font-bold text-balance text-white sm:text-4xl lg:text-5xl"
        >
          Pronto para uma gestão{" "}
          <span className="text-silver-gradient">à altura do seu condomínio?</span>
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base text-pretty text-brand-silver-light/90 sm:text-lg"
        >
          Solicite uma proposta sem compromisso. Nossa equipe analisa a realidade
          do seu condomínio e apresenta um plano de gestão transparente, ágil e
          feito sob medida.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center"
        >
          <Button
            asChild
            className="bg-brand-gradient-cta h-14 rounded-xl px-8 text-base font-semibold text-white shadow-brand-lg transition-transform hover:brightness-110 focus-visible:ring-white/60 sm:h-14"
          >
            <a href="#proposta">
              Solicitar proposta
              <ArrowRight className="ml-1 size-5 transition-transform group-hover/button:translate-x-0.5" />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-14 rounded-xl border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 hover:text-white focus-visible:ring-white/60 sm:h-14"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-1 size-5" />
              Falar no WhatsApp
            </a>
          </Button>
        </motion.div>

        {/* Canais de contato */}
        <motion.ul
          variants={item}
          className="mt-14 grid w-full grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {channels.map(({ label, value, href, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="glass-dark group/channel flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <span className="bg-brand-gradient-cta flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow-brand transition-transform group-hover/channel:scale-105">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium tracking-wide text-brand-silver uppercase">
                    {label}
                  </span>
                  <span className="block truncate text-sm font-semibold text-white sm:text-base">
                    {value}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}
