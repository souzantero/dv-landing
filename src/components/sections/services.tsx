"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Calculator,
  Check,
  ClipboardList,
  FileText,
  Handshake,
  LifeBuoy,
  LineChart,
  MessageCircle,
  PiggyBank,
  Scale,
  ScrollText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Truck,
  Users,
  Vote,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ServiceFeature = {
  icon: LucideIcon;
  label: string;
};

type ServiceCard = {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  features: ServiceFeature[];
  featured?: boolean;
  badge?: string;
};

const services: ServiceCard[] = [
  {
    icon: ShieldCheck,
    title: "Síndico Profissional",
    tagline: "Liderança dedicada ao seu condomínio",
    description:
      "Um gestor experiente à frente das decisões, representando o condomínio com transparência, técnica e proximidade.",
    featured: true,
    badge: "Gestão completa",
    features: [
      { icon: Scale, label: "Representação legal do condomínio" },
      { icon: MessageCircle, label: "Atendimento personalizado" },
      { icon: Handshake, label: "Mediação de conflitos" },
      { icon: BadgeCheck, label: "Cumprimento das obrigações legais" },
      { icon: LineChart, label: "Supervisão da gestão orçamentária" },
      { icon: Truck, label: "Gestão de fornecedores" },
      { icon: Users, label: "Coordenação de colaboradores" },
    ],
  },
  {
    icon: Building2,
    title: "Administradora",
    tagline: "Estrutura e tecnologia para a rotina condominial",
    description:
      "Toda a operação financeira e administrativa organizada, com aplicativo próprio e prestação de contas clara.",
    badge: "Suporte contínuo",
    features: [
      { icon: ScrollText, label: "Implementação do regimento interno" },
      { icon: Smartphone, label: "App com múltiplas funcionalidades" },
      { icon: LifeBuoy, label: "Suporte completo ao síndico" },
      { icon: Vote, label: "Participação em assembleias" },
      { icon: Wallet, label: "Controle de receitas e despesas" },
      { icon: ClipboardList, label: "Planejamento orçamentário" },
      { icon: PiggyBank, label: "Gestão do fundo de reserva" },
      { icon: FileText, label: "Prestação de contas" },
      { icon: Calculator, label: "Orçamento de serviços" },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-heading"
      className="relative overflow-hidden bg-background py-20 sm:py-28"
    >
      {/* Spotlight sutil de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-brand-radial opacity-[0.04]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Cabeçalho da seção */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-silver/50 bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-navy uppercase">
            <Sparkles className="size-3.5 text-brand-royal-bright" aria-hidden="true" />
            Nossos serviços
          </span>

          <h2
            id="servicos-heading"
            className="mt-6 text-3xl font-bold text-balance sm:text-4xl lg:text-[2.75rem]"
          >
            <span className="text-brand-gradient">Duas frentes de gestão</span>{" "}
            para o seu condomínio
          </h2>

          <p className="mt-5 text-base text-muted-foreground text-pretty sm:text-lg">
            Escolha o modelo ideal: síndico profissional dedicado, administradora
            completa ou a combinação das duas. Especialistas em operações,
            finanças, manutenção e jurídico ao seu lado.
          </p>
        </motion.div>

        {/* Cards de serviço */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
        >
          {services.map((service) => (
            <ServiceCardItem key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCardItem({ service }: { service: ServiceCard }) {
  const { icon: Icon } = service;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border bg-card shadow-brand transition-shadow duration-300 hover:shadow-brand-lg",
        service.featured
          ? "border-brand-royal/30"
          : "border-brand-silver/40"
      )}
    >
      {/* Cabeçalho premium com gradiente da marca */}
      <div className="relative overflow-hidden bg-brand-gradient px-6 pt-8 pb-7 sm:px-8">
        {/* Reflexo metálico que atravessa no hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
        />

        <div className="relative flex items-start justify-between gap-4">
          <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-silver-gradient shadow-brand ring-1 ring-white/40">
            <Icon className="size-7 text-brand-navy" aria-hidden="true" />
          </span>

          {service.badge ? (
            <span className="glass-dark inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-white uppercase">
              {service.featured ? (
                <Sparkles className="size-3" aria-hidden="true" />
              ) : null}
              {service.badge}
            </span>
          ) : null}
        </div>

        <h3 className="relative mt-6 text-2xl font-bold text-silver-gradient sm:text-[1.65rem]">
          {service.title}
        </h3>
        <p className="relative mt-2 text-sm font-medium text-brand-silver-light/90">
          {service.tagline}
        </p>
      </div>

      {/* Corpo do card */}
      <div className="flex flex-1 flex-col px-6 pt-6 pb-7 sm:px-8">
        <p className="text-sm text-muted-foreground text-pretty sm:text-[0.95rem]">
          {service.description}
        </p>

        <ul className="mt-6 flex-1 space-y-3.5">
          {service.features.map((feature) => {
            const FeatureIcon = feature.icon;
            return (
              <li key={feature.label} className="flex items-center gap-3">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-brand-royal-bright transition-colors duration-300 group-hover:bg-brand-royal-bright group-hover:text-white">
                  <FeatureIcon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-brand-ink text-pretty">
                  {feature.label}
                </span>
                <Check
                  className="ml-auto size-4 shrink-0 text-brand-silver"
                  aria-hidden="true"
                />
              </li>
            );
          })}
          <li className="flex items-center gap-3 pt-1 text-sm font-medium text-muted-foreground italic">
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-brand-silver">
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
            e muito mais, sob medida para o seu condomínio.
          </li>
        </ul>

        <Button
          asChild
          size="lg"
          className="mt-8 h-12 w-full rounded-xl bg-brand-gradient-cta text-base font-semibold text-white shadow-brand transition-transform hover:brightness-110"
        >
          <a href="#contato">
            Solicitar proposta
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </Button>
      </div>
    </motion.article>
  );
}
