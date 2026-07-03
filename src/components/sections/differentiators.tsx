"use client";

import { motion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  HeartHandshake,
  Smartphone,
  Scale,
  Lock,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Differentiator = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const DIFFERENTIATORS: Differentiator[] = [
  {
    icon: ShieldCheck,
    title: "Transparência total",
    description:
      "Prestação de contas clara e acessível a qualquer momento. Você acompanha cada receita, despesa e decisão do seu condomínio com total visibilidade.",
  },
  {
    icon: Zap,
    title: "Agilidade no atendimento",
    description:
      "Respostas rápidas para síndicos e condôminos. Resolvemos demandas do dia a dia com eficiência, sem burocracia e sem espera.",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento personalizado",
    description:
      "Cada condomínio é único. Estruturamos a gestão sob medida para a sua realidade, com um time próximo e dedicado a você.",
  },
  {
    icon: Smartphone,
    title: "Tecnologia e aplicativo",
    description:
      "App completo para comunicação, reservas, boletos e ocorrências. Toda a gestão do condomínio na palma da mão, quando você precisar.",
  },
  {
    icon: Scale,
    title: "Suporte jurídico",
    description:
      "Especialistas para representar o condomínio, mediar conflitos e garantir o cumprimento de todas as obrigações legais.",
  },
  {
    icon: Lock,
    title: "Segurança e LGPD",
    description:
      "Seus dados e os do condomínio protegidos, com processos em conformidade com a Lei Geral de Proteção de Dados.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Differentiators() {
  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-heading"
      className="relative overflow-hidden bg-brand-navy py-20 sm:py-24 lg:py-32"
    >
      {/* Fundo premium: spotlight radial + textura sutil */}
      <div
        aria-hidden="true"
        className="bg-brand-radial pointer-events-none absolute inset-0 opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-royal/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.header
            variants={headerVariants}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center rounded-full border border-brand-silver/25 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-silver-light backdrop-blur">
              Nossos diferenciais
            </span>
            <h2
              id="diferenciais-heading"
              className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            >
              Por que escolher a{" "}
              <span className="text-silver-gradient">D&amp;V?</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-silver-light/90 sm:text-lg">
              Unimos gestão especializada, tecnologia e atendimento humano para
              transformar a rotina do seu condomínio em tranquilidade.
            </p>
          </motion.header>

          <ul
            role="list"
            className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3"
          >
            {DIFFERENTIATORS.map(({ icon: Icon, title, description }) => (
              <motion.li key={title} variants={cardVariants} className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7",
                    "transition-all duration-300 ease-out",
                    "hover:-translate-y-1 hover:border-brand-royal-bright/40 hover:bg-white/[0.07] hover:shadow-brand-lg",
                  )}
                >
                  {/* Brilho superior no hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-royal-bright/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <span
                    aria-hidden="true"
                    className="bg-brand-gradient-cta inline-flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-brand ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105"
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>

                  <h3 className="mt-5 text-lg font-semibold text-white sm:text-xl">
                    {title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-brand-silver-light/85 sm:text-[0.95rem]">
                    {description}
                  </p>
                </article>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
