"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ClipboardList,
  Building2,
  FileCheck2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Step = {
  index: string;
  title: string;
  description: string;
  Icon: typeof ClipboardList;
};

const STEPS: Step[] = [
  {
    index: "01",
    title: "Solicite sua proposta",
    description:
      "Preencha um formulário rápido, em poucos minutos. Sem compromisso e sem burocracia.",
    Icon: ClipboardList,
  },
  {
    index: "02",
    title: "Analisamos seu condomínio",
    description:
      "Nossos especialistas estudam a estrutura, a rotina e as necessidades reais do seu condomínio.",
    Icon: Building2,
  },
  {
    index: "03",
    title: "Proposta sob medida",
    description:
      "Você recebe um plano de gestão personalizado, com escopo e valores totalmente transparentes.",
    Icon: FileCheck2,
  },
  {
    index: "04",
    title: "Gestão profissional",
    description:
      "Assumimos operações, finanças, manutenção e jurídico com atendimento próximo, humano e ágil.",
    Icon: ShieldCheck,
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.1 },
  },
};

const headBlock: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemVar: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const nodeVar: Variants = {
  hidden: { scale: 0.4, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.05 },
  },
};

const lineVertical: Variants = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.15 },
  },
};

const lineHorizontal: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.15 },
  },
};

export default function Process() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="relative overflow-hidden bg-background py-20 sm:py-28"
    >
      {/* Ambient brand backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-brand-royal/10 blur-3xl" />
        <div className="absolute bottom-0 right-[-6rem] h-80 w-80 rounded-full bg-brand-silver/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={headBlock}
            className="inline-flex items-center gap-2 rounded-full border border-brand-silver/50 bg-secondary/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-royal"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-royal-bright" />
            Como funciona
          </motion.span>

          <motion.h2
            id="como-funciona-title"
            variants={headBlock}
            className="mt-5 text-3xl font-bold text-brand-navy sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
          >
            Da primeira conversa à{" "}
            <span className="text-brand-gradient">gestão completa</span>
          </motion.h2>

          <motion.p
            variants={headBlock}
            className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Um processo simples, transparente e sem burocracia. Em quatro passos,
            seu condomínio passa a contar com uma gestão profissional de verdade.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mt-14 grid grid-cols-1 gap-y-2 sm:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0"
        >
          {STEPS.map((step, i) => {
            const isLast = i === STEPS.length - 1;
            return (
              <motion.li
                key={step.index}
                variants={itemVar}
                className={cn(
                  "relative flex gap-5 pb-10 last:pb-0",
                  "lg:flex-col lg:items-center lg:gap-6 lg:pb-0 lg:text-center",
                )}
              >
                {/* Connector: vertical (mobile) */}
                {!isLast && (
                  <motion.span
                    aria-hidden
                    variants={lineVertical}
                    style={{ transformOrigin: "top" }}
                    className="absolute left-7 top-16 bottom-0 w-px bg-gradient-to-b from-brand-royal/70 via-brand-royal/30 to-transparent lg:hidden"
                  />
                )}
                {/* Connector: horizontal (desktop) */}
                {!isLast && (
                  <motion.span
                    aria-hidden
                    variants={lineHorizontal}
                    style={{ transformOrigin: "left" }}
                    className="absolute left-1/2 top-9 hidden h-px w-full bg-gradient-to-r from-brand-royal/70 via-brand-royal/40 to-brand-silver/40 lg:block"
                  />
                )}

                {/* Node */}
                <motion.div
                  variants={nodeVar}
                  className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-brand-white shadow-brand lg:h-[4.5rem] lg:w-[4.5rem]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-2xl border border-white/15"
                  />
                  <step.Icon
                    className="h-6 w-6 lg:h-7 lg:w-7"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-white text-[0.65rem] font-bold tabular-nums text-brand-royal shadow-brand ring-1 ring-brand-silver/40 lg:-right-2 lg:-top-2 lg:h-7 lg:w-7 lg:text-xs">
                    {step.index}
                  </span>
                </motion.div>

                {/* Content */}
                <div className="pt-1 lg:pt-2">
                  <h3 className="text-lg font-semibold text-brand-navy lg:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground lg:text-[0.95rem]">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>

        {/* Closing trust / CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 overflow-hidden rounded-3xl bg-brand-gradient px-6 py-8 shadow-brand-lg sm:mt-20 sm:px-10 sm:py-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-royal-bright/30 blur-3xl"
          />
          <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div className="flex items-center gap-4">
              <div className="hidden h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/95 p-1.5 shadow-brand ring-1 ring-white/20 sm:flex">
                <Image
                  src="/logo.jpeg"
                  alt="D&V Gestão Condominial"
                  width={64}
                  height={64}
                  className="h-full w-full rounded-xl object-contain"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-brand-white sm:text-xl">
                  Pronto para simplificar a gestão do seu condomínio?
                </p>
                <p className="mt-1 text-sm text-brand-silver-light">
                  Receba sua proposta sob medida sem compromisso.
                </p>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="group w-full shrink-0 bg-brand-white text-brand-navy shadow-brand hover:bg-brand-silver-light sm:w-auto"
            >
              <a href="#proposta">
                Solicitar proposta
                <ArrowRight
                  className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
