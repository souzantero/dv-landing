"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Settings2,
  Wallet,
  Wrench,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Specialty = {
  icon: typeof Settings2;
  title: string;
  description: string;
};

type Stat = {
  value: string;
  label: string;
};

const specialties: Specialty[] = [
  {
    icon: Settings2,
    title: "Operações",
    description:
      "Coordenação de colaboradores, fornecedores e rotinas do dia a dia com eficiência.",
  },
  {
    icon: Wallet,
    title: "Finanças",
    description:
      "Controle de receitas e despesas, planejamento orçamentário e prestação de contas transparente.",
  },
  {
    icon: Wrench,
    title: "Manutenção",
    description:
      "Preservação do patrimônio com manutenção preventiva e orçamentos de serviços bem avaliados.",
  },
  {
    icon: Scale,
    title: "Jurídico",
    description:
      "Representação legal, cumprimento das obrigações e mediação de conflitos com segurança.",
  },
];

const stats: Stat[] = [
  { value: "4", label: "áreas de especialização" },
  { value: "100%", label: "prestação de contas transparente" },
  { value: "24/7", label: "acompanhamento da operação" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="relative overflow-hidden bg-background py-20 sm:py-28"
    >
      {/* Spotlight sutil de marca */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] h-80 w-80 rounded-full bg-brand-royal/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-72 w-72 rounded-full bg-brand-silver/20 blur-3xl"
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Coluna de texto */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-brand-silver/60 bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-royal"
            >
              <Sparkles className="size-3.5" aria-hidden="true" />
              Saiba mais sobre a D&amp;V
            </motion.span>

            <motion.h2
              id="sobre-heading"
              variants={itemVariants}
              className="mt-6 text-3xl font-bold leading-tight text-brand-navy sm:text-4xl md:text-[2.75rem]"
            >
              Surgimos para solucionar{" "}
              <span className="text-brand-gradient">
                os problemas do seu condomínio
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              A D&amp;V Gestão Condominial surgiu de uma inquietação: bons
              condomínios merecem uma gestão à altura. Vimos de perto síndicos
              sobrecarregados, contas sem transparência e moradores sem resposta
              — e decidimos mudar essa realidade em Curitiba e São José dos
              Pinhais.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Nossa missão é simples e ambiciosa: transformar a administração do
              seu condomínio com qualidade, agilidade e atendimento humano.
              Reunimos especialistas em{" "}
              <strong className="font-semibold text-brand-ink">
                operações, finanças, manutenção e jurídico
              </strong>{" "}
              para que cada decisão seja tomada por quem realmente entende do
              assunto.
            </motion.p>

            {/* Selo de confiança com logo */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center gap-4 rounded-2xl border border-brand-silver/50 bg-secondary/60 p-4"
            >
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-brand-navy shadow-brand">
                <Image
                  src="/logo.jpeg"
                  alt="Logotipo da D&V Gestão Condominial"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck
                  className="mt-0.5 size-5 shrink-0 text-brand-royal"
                  aria-hidden="true"
                />
                <p className="text-sm leading-snug text-brand-ink">
                  Gestão especializada e transparente, feita para síndicos e
                  condôminos que exigem excelência.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Coluna de card: especialidades + estatísticas */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative rounded-3xl bg-brand-gradient p-6 shadow-brand-lg sm:p-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-white sm:text-xl">
                Especialistas em cada frente da sua gestão
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-silver-light">
                Uma equipe multidisciplinar cuidando de tudo o que o seu
                condomínio precisa.
              </p>
            </motion.div>

            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {specialties.map(({ icon: Icon, title, description }) => (
                <motion.li
                  key={title}
                  variants={itemVariants}
                  className="glass-dark rounded-2xl p-4 transition-colors duration-300 hover:bg-white/10"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-gradient-cta text-white shadow-brand">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h4 className="mt-3 text-base font-semibold text-white">
                    {title}
                  </h4>
                  <p className="mt-1 text-sm leading-snug text-brand-silver-light">
                    {description}
                  </p>
                </motion.li>
              ))}
            </ul>

            <motion.dl
              variants={itemVariants}
              className="mt-6 grid grid-cols-3 gap-4 border-t border-white/15 pt-6"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    "text-center",
                    index !== stats.length - 1 &&
                      "border-r border-white/10 pr-2 sm:pr-4"
                  )}
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </dd>
                  <p
                    aria-hidden="true"
                    className="mt-1 text-[0.7rem] font-medium uppercase leading-tight tracking-wide text-brand-silver-light"
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
