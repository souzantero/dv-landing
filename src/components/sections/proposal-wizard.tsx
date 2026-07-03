"use client"

import * as React from "react"
import Image from "next/image"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Loader2,
  MessageCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

/* -------------------------------------------------------------------------- */
/*  Schema (validação por passo · zod v4)                                     */
/* -------------------------------------------------------------------------- */

const inteiroPositivo = (msg: string) =>
  z
    .string()
    .trim()
    .min(1, { message: msg })
    .regex(/^\d+$/, { message: "Digite apenas números" })
    .refine((v) => Number(v) >= 1, { message: "Informe um valor válido" })

export const proposalSchema = z.object({
  // Passo 1 — Solicitante
  nome_completo: z
    .string()
    .trim()
    .min(3, { message: "Informe seu nome completo" }),

  // Passo 2 — Condomínio
  nome_condominio: z
    .string()
    .trim()
    .min(2, { message: "Informe o nome do condomínio" }),
  endereco_completo: z
    .string()
    .trim()
    .min(5, { message: "Informe o endereço completo" }),
  numero_apartamentos: inteiroPositivo("Informe o número de apartamentos"),
  numero_blocos: inteiroPositivo("Informe o número de blocos"),
  andares_por_predio: inteiroPositivo("Informe os andares por prédio"),

  // Passo 3 — Operacional
  possui_elevadores: z.enum(["sim", "nao"], {
    message: "Selecione uma opção",
  }),
  possui_salao_festas: z.enum(["sim", "nao"], {
    message: "Selecione uma opção",
  }),
  possui_academia: z.enum(["sim", "nao"], { message: "Selecione uma opção" }),
  possui_areas_lazer: z.enum(["sim", "nao"], {
    message: "Selecione uma opção",
  }),
  areas_lazer_detalhe: z.string().trim().max(240).optional().or(z.literal("")),

  // Passo 4 — Gestão atual
  possui_administradora: z.enum(["sim", "nao"], {
    message: "Selecione uma opção",
  }),
  tipo_sindico: z.enum(["nenhum", "morador", "profissional"], {
    message: "Selecione uma opção",
  }),
  limpeza: z.enum(["morador", "terceirizada"], {
    message: "Selecione uma opção",
  }),
  portaria: z.enum(["nao", "24h", "parcial"], {
    message: "Selecione uma opção",
  }),
  outros_prestadores: z.string().trim().max(240).optional().or(z.literal("")),

  // Passo 5 — Administração pretendida
  administracao_pretendida: z.enum(["completa", "parcial"], {
    message: "Selecione o modelo desejado",
  }),

  // Passo 6 — Contato
  email: z.email({ message: "Informe um e-mail válido" }),
  telefone: z
    .string()
    .trim()
    .min(10, { message: "Informe um telefone com DDD" })
    .regex(/^[0-9()\s+-]+$/, { message: "Telefone inválido" }),
})

export type ProposalFormValues = z.infer<typeof proposalSchema>

/* -------------------------------------------------------------------------- */
/*  Passos                                                                     */
/* -------------------------------------------------------------------------- */

type StepField = keyof ProposalFormValues

const STEPS: {
  id: string
  title: string
  subtitle: string
  fields: StepField[]
}[] = [
  {
    id: "solicitante",
    title: "Vamos começar",
    subtitle: "Como podemos te chamar?",
    fields: ["nome_completo"],
  },
  {
    id: "condominio",
    title: "Sobre o condomínio",
    subtitle: "Conte um pouco sobre a estrutura do empreendimento.",
    fields: [
      "nome_condominio",
      "endereco_completo",
      "numero_apartamentos",
      "numero_blocos",
      "andares_por_predio",
    ],
  },
  {
    id: "operacional",
    title: "Estrutura e lazer",
    subtitle: "O que o condomínio oferece aos moradores?",
    fields: [
      "possui_elevadores",
      "possui_salao_festas",
      "possui_academia",
      "possui_areas_lazer",
      "areas_lazer_detalhe",
    ],
  },
  {
    id: "gestao-atual",
    title: "Gestão atual",
    subtitle: "Como o condomínio é administrado hoje?",
    fields: [
      "possui_administradora",
      "tipo_sindico",
      "limpeza",
      "portaria",
      "outros_prestadores",
    ],
  },
  {
    id: "modelo",
    title: "Administração desejada",
    subtitle: "Qual modelo faz mais sentido para o seu condomínio?",
    fields: ["administracao_pretendida"],
  },
  {
    id: "contato",
    title: "Quase lá",
    subtitle: "Por onde retornamos o seu contato?",
    fields: ["email", "telefone"],
  },
]

const TOTAL = STEPS.length

/* -------------------------------------------------------------------------- */
/*  Sub-componentes de UI                                                      */
/* -------------------------------------------------------------------------- */

type Option = { value: string; label: string; hint?: string }

function ChoiceGroup({
  value,
  onValueChange,
  options,
  name,
  columns = 1,
  ariaLabel,
}: {
  value: string
  onValueChange: (v: string) => void
  options: Option[]
  name: string
  columns?: 1 | 2
  ariaLabel?: string
}) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      aria-label={ariaLabel}
      className={cn("grid gap-2.5", columns === 2 && "sm:grid-cols-2")}
    >
      {options.map((opt) => {
        const id = `${name}-${opt.value}`
        const selected = value === opt.value
        return (
          <label
            key={opt.value}
            htmlFor={id}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all duration-200 outline-none",
              "has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-brand-royal-bright/50",
              selected
                ? "border-brand-royal-bright bg-brand-royal-bright/15 text-white shadow-brand"
                : "border-white/15 bg-white/5 text-white hover:border-brand-silver/60 hover:bg-white/10"
            )}
          >
            <RadioGroupItem
              value={opt.value}
              id={id}
              className="mt-0.5 border-white/40 data-checked:border-brand-royal-bright data-checked:bg-brand-royal-bright"
            />
            <span className="flex-1 leading-tight">
              <span className="block text-sm font-medium text-white">
                {opt.label}
              </span>
              {opt.hint ? (
                <span className="mt-0.5 block text-xs text-brand-silver-light/70">
                  {opt.hint}
                </span>
              ) : null}
            </span>
          </label>
        )
      })}
    </RadioGroup>
  )
}

const SIM_NAO: Option[] = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
]

/**
 * Máscara de telefone brasileiro. Formata progressivamente conforme o usuário
 * digita: fixo (XX) XXXX-XXXX (10 dígitos) e celular (XX) X XXXX-XXXX (11).
 */
function formatBrPhone(input: string): string {
  const d = input.replace(/\D/g, "").slice(0, 11)
  const len = d.length
  if (len === 0) return ""
  if (len < 3) return `(${d}`
  if (len <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (len <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`
}

/* -------------------------------------------------------------------------- */
/*  Componente principal                                                       */
/* -------------------------------------------------------------------------- */

type SubmitStatus = "idle" | "loading" | "success" | "error"

const WHATSAPP_URL = "https://wa.me/5541995803372"

export default function ProposalWizard() {
  const reduceMotion = useReducedMotion()
  const [step, setStep] = React.useState(0)
  const [direction, setDirection] = React.useState<1 | -1>(1)
  const [status, setStatus] = React.useState<SubmitStatus>("idle")
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)
  const liveRef = React.useRef<HTMLParagraphElement>(null)
  const stepPanelRef = React.useRef<HTMLDivElement>(null)
  // Só focamos o primeiro campo após uma navegação do usuário (Avançar/Voltar),
  // nunca no carregamento inicial — assim a página não rola até o formulário ao
  // abrir. O foco acontece em onAnimationComplete, quando o novo passo já montou.
  const shouldFocusStepRef = React.useRef(false)

  const focusFirstField = React.useCallback(() => {
    if (!shouldFocusStepRef.current) return
    shouldFocusStepRef.current = false
    const first = stepPanelRef.current?.querySelector<HTMLElement>(
      'input:not([type="hidden"]), textarea, [role="radio"], select',
    )
    first?.focus({ preventScroll: true })
  }, [])

  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema),
    mode: "onTouched",
    defaultValues: {
      nome_completo: "",
      nome_condominio: "",
      endereco_completo: "",
      numero_apartamentos: "",
      numero_blocos: "",
      andares_por_predio: "",
      possui_elevadores: undefined,
      possui_salao_festas: undefined,
      possui_academia: undefined,
      possui_areas_lazer: undefined,
      areas_lazer_detalhe: "",
      possui_administradora: undefined,
      tipo_sindico: undefined,
      limpeza: undefined,
      portaria: undefined,
      outros_prestadores: "",
      administracao_pretendida: undefined,
      email: "",
      telefone: "",
    } as unknown as ProposalFormValues,
  })

  const progress = Math.round(((step + 1) / TOTAL) * 100)
  const isLast = step === TOTAL - 1

  const goNext = async () => {
    const valid = await form.trigger(STEPS[step].fields, { shouldFocus: true })
    if (!valid) return
    shouldFocusStepRef.current = true
    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL - 1))
  }

  const goBack = () => {
    shouldFocusStepRef.current = true
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
  }

  const onSubmit = async (values: ProposalFormValues) => {
    setStatus("loading")
    setErrorMsg(null)

    const payload = {
      ...values,
      numero_apartamentos: Number(values.numero_apartamentos),
      numero_blocos: Number(values.numero_blocos),
      andares_por_predio: Number(values.andares_por_predio),
    }

    try {
      const res = await fetch("/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("request-failed")
      setStatus("success")
    } catch {
      setStatus("error")
      setErrorMsg(
        "Não foi possível enviar sua solicitação agora. Tente novamente ou fale com a gente pelo WhatsApp."
      )
    }
  }

  // O botão de submit nativo só dispara no último passo; nos demais avançamos.
  const handlePrimary = () => {
    if (isLast) {
      void form.handleSubmit(onSubmit)()
    } else {
      void goNext()
    }
  }

  const variants: Variants = {
    enter: (dir: number) => ({
      x: reduceMotion ? 0 : dir > 0 ? 48 : -48,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: reduceMotion ? 0 : dir > 0 ? -48 : 48,
      opacity: 0,
    }),
  }

  const current = STEPS[step]

  return (
    <section
      id="proposta"
      aria-labelledby="proposta-titulo"
      className="relative w-full overflow-hidden bg-brand-radial px-4 py-16 sm:px-6 sm:py-24"
    >
      {/* Spotlight decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-64 max-w-3xl rounded-full bg-brand-royal-bright/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-xl">
        {/* Cabeçalho da seção */}
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-silver-light ring-1 ring-white/15 backdrop-blur">
            <Sparkles className="size-3.5" aria-hidden />
            Proposta sem compromisso
          </span>
          <h2
            id="proposta-titulo"
            className="mt-4 text-3xl font-bold text-silver-gradient sm:text-4xl"
          >
            Receba uma proposta sob medida
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-brand-silver-light/90 sm:text-base">
            Responda algumas perguntas rápidas sobre o seu condomínio. Levamos
            menos de 2 minutos e retornamos com um plano personalizado.
          </p>
        </div>

        {/* Card do wizard */}
        <div className="glass-dark rounded-3xl p-5 shadow-brand-lg sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <SuccessScreen
                key="success"
                reduceMotion={!!reduceMotion}
                nome={form.getValues("nome_completo")}
              />
            ) : (
              <motion.div
                key="wizard"
                initial={false}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Progresso */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between text-xs font-medium text-brand-silver-light">
                    <span>{current.title}</span>
                    <span aria-hidden>
                      Passo {step + 1} de {TOTAL}
                    </span>
                  </div>
                  <Progress
                    value={progress}
                    aria-label={`Progresso do formulário: passo ${
                      step + 1
                    } de ${TOTAL}`}
                    className="h-1.5 bg-white/15"
                  />
                </div>

                <Form {...form}>
                  <form
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault()
                      handlePrimary()
                    }}
                  >
                    <div className="min-h-[19rem]">
                      <AnimatePresence
                        mode="wait"
                        custom={direction}
                        initial={false}
                      >
                        <motion.div
                          key={step}
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          onAnimationComplete={(definition) => {
                            if (definition === "center") focusFirstField()
                          }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.32,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <fieldset
                            className="space-y-4"
                            aria-labelledby="proposta-titulo"
                          >
                            <legend className="mb-1">
                              <span className="block text-lg font-semibold text-white">
                                {current.title}
                              </span>
                              <span className="mt-1 block text-sm text-brand-silver-light/85">
                                {current.subtitle}
                              </span>
                            </legend>

                            <div ref={stepPanelRef}>
                              <StepFields step={step} form={form} />
                            </div>
                          </fieldset>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Erro de envio */}
                    <AnimatePresence>
                      {status === "error" && errorMsg ? (
                        <motion.p
                          ref={liveRef}
                          role="alert"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-4 rounded-lg bg-destructive/15 px-3 py-2 text-sm text-red-200 ring-1 ring-destructive/30"
                        >
                          {errorMsg}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>

                    {/* Navegação */}
                    <div className="mt-6 flex items-center gap-3">
                      {step > 0 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="lg"
                          onClick={goBack}
                          disabled={status === "loading"}
                          className="text-brand-silver-light hover:bg-white/10 hover:text-white"
                        >
                          <ArrowLeft aria-hidden />
                          Voltar
                        </Button>
                      ) : (
                        <span aria-hidden className="flex-1" />
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        disabled={status === "loading"}
                        className="ml-auto min-w-36 bg-brand-gradient-cta font-semibold text-white shadow-brand transition-transform hover:brightness-110 active:scale-[0.98]"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="animate-spin" aria-hidden />
                            Enviando...
                          </>
                        ) : isLast ? (
                          <>
                            Enviar solicitação
                            <CheckCircle2 aria-hidden />
                          </>
                        ) : (
                          <>
                            Avançar
                            <ArrowRight aria-hidden />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-4 text-center text-xs text-brand-silver-light/70">
          Seus dados são usados apenas para elaborar a proposta. Sem spam.
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Campos por passo                                                           */
/* -------------------------------------------------------------------------- */

function StepFields({
  step,
  form,
}: {
  step: number
  form: ReturnType<typeof useForm<ProposalFormValues>>
}) {
  const darkLabel = "text-brand-silver-light"
  const darkInput =
    "border-white/15 bg-white/5 text-white placeholder:text-brand-silver-light/50 focus-visible:border-brand-royal-bright focus-visible:ring-brand-royal-bright/40"

  switch (step) {
    case 0:
      return (
        <FormField
          control={form.control}
          name="nome_completo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={darkLabel}>Nome completo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="name"
                  placeholder="Ex.: Maria Oliveira"
                  className={cn("h-11", darkInput)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )

    case 1:
      return (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="nome_condominio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={darkLabel}>Nome do condomínio</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ex.: Residencial Alto da Colina"
                    className={cn("h-11", darkInput)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endereco_completo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={darkLabel}>Endereço completo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="street-address"
                    placeholder="Rua, número, bairro — Curitiba/PR"
                    className={cn("h-11", darkInput)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="numero_apartamentos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={darkLabel}>Apartamentos</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      inputMode="numeric"
                      placeholder="Ex.: 80"
                      className={cn("h-11", darkInput)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numero_blocos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={darkLabel}>Blocos</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      inputMode="numeric"
                      placeholder="Ex.: 2"
                      className={cn("h-11", darkInput)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="andares_por_predio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={darkLabel}>Andares/prédio</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      inputMode="numeric"
                      placeholder="Ex.: 10"
                      className={cn("h-11", darkInput)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      )

    case 2:
      return (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="possui_elevadores"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={darkLabel}>Possui elevadores?</FormLabel>
                <FormControl>
                  <ChoiceGroup
                    name="possui_elevadores"
                    ariaLabel="Possui elevadores?"
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    options={SIM_NAO}
                    columns={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="possui_salao_festas"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={darkLabel}>
                  Possui salão de festas?
                </FormLabel>
                <FormControl>
                  <ChoiceGroup
                    name="possui_salao_festas"
                    ariaLabel="Possui salão de festas?"
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    options={SIM_NAO}
                    columns={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="possui_academia"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={darkLabel}>Possui academia?</FormLabel>
                <FormControl>
                  <ChoiceGroup
                    name="possui_academia"
                    ariaLabel="Possui academia?"
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    options={SIM_NAO}
                    columns={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="possui_areas_lazer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={darkLabel}>
                  Possui outras áreas de lazer?
                </FormLabel>
                <FormControl>
                  <ChoiceGroup
                    name="possui_areas_lazer"
                    ariaLabel="Possui outras áreas de lazer?"
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    options={SIM_NAO}
                    columns={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AnimatePresence initial={false}>
            {form.watch("possui_areas_lazer") === "sim" ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <FormField
                  control={form.control}
                  name="areas_lazer_detalhe"
                  render={({ field }) => (
                    <FormItem className="pt-1">
                      <FormLabel className={darkLabel}>
                        Quais? (opcional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder="Ex.: piscina, quadra, playground, churrasqueira"
                          className={cn("h-11", darkInput)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      )

    case 3:
      return (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="possui_administradora"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={darkLabel}>
                  Já possui administradora?
                </FormLabel>
                <FormControl>
                  <ChoiceGroup
                    name="possui_administradora"
                    ariaLabel="Já possui administradora?"
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    options={SIM_NAO}
                    columns={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tipo_sindico"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={darkLabel}>Síndico atual</FormLabel>
                <FormControl>
                  <ChoiceGroup
                    name="tipo_sindico"
                    ariaLabel="Tipo de síndico atual"
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    options={[
                      { value: "nenhum", label: "Não possui síndico" },
                      { value: "morador", label: "Síndico morador" },
                      {
                        value: "profissional",
                        label: "Síndico profissional",
                      },
                    ]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="limpeza"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={darkLabel}>Limpeza</FormLabel>
                <FormControl>
                  <ChoiceGroup
                    name="limpeza"
                    ariaLabel="Como é feita a limpeza"
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    options={[
                      { value: "morador", label: "Feita por morador" },
                      { value: "terceirizada", label: "Terceirizada" },
                    ]}
                    columns={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portaria"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={darkLabel}>Portaria</FormLabel>
                <FormControl>
                  <ChoiceGroup
                    name="portaria"
                    ariaLabel="Tipo de portaria"
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    options={[
                      { value: "nao", label: "Sem portaria" },
                      { value: "24h", label: "Portaria 24h" },
                      { value: "parcial", label: "Portaria parcial" },
                    ]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="outros_prestadores"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={darkLabel}>
                  Outros prestadores (opcional)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder="Ex.: zelador, jardineiro, piscineiro"
                    className={cn("h-11", darkInput)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )

    case 4:
      return (
        <FormField
          control={form.control}
          name="administracao_pretendida"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={darkLabel}>
                Modelo de administração
              </FormLabel>
              <FormControl>
                <ChoiceGroup
                  name="administracao_pretendida"
                  ariaLabel="Modelo de administração desejado"
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                  options={[
                    {
                      value: "completa",
                      label: "Administração completa",
                      hint: "Inclui síndico profissional D&V cuidando de tudo por você.",
                    },
                    {
                      value: "parcial",
                      label: "Administração parcial",
                      hint: "Administradora D&V + síndico do próprio condomínio.",
                    },
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )

    case 5:
      return (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={darkLabel}>E-mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="voce@email.com"
                    className={cn("h-11", darkInput)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={darkLabel}>Telefone / WhatsApp</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={16}
                    placeholder="(41) 9 9999-9999"
                    onChange={(e) =>
                      field.onChange(formatBrPhone(e.target.value))
                    }
                    className={cn("h-11", darkInput)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )

    default:
      return null
  }
}

/* -------------------------------------------------------------------------- */
/*  Tela de sucesso                                                            */
/* -------------------------------------------------------------------------- */

function SuccessScreen({
  reduceMotion,
  nome,
}: {
  reduceMotion: boolean
  nome: string
}) {
  const primeiroNome = nome.trim().split(" ")[0] || ""

  const nextSteps = [
    {
      icon: CheckCircle2,
      title: "Recebemos seus dados",
      desc: "Nossa equipe já está analisando as informações do seu condomínio.",
    },
    {
      icon: CalendarCheck,
      title: "Retorno em até 1 dia útil",
      desc: "Entramos em contato pelo e-mail ou telefone informado.",
    },
    {
      icon: Building2,
      title: "Proposta personalizada",
      desc: "Você recebe um plano de gestão sob medida, sem compromisso.",
    },
  ]

  return (
    <motion.div
      key="success"
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.4 }}
      className="py-4 text-center"
    >
      <motion.div
        initial={reduceMotion ? false : { scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 16,
          delay: reduceMotion ? 0 : 0.1,
        }}
        className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-gradient-cta shadow-brand-lg"
      >
        <CheckCircle2 className="size-9 text-white" aria-hidden />
      </motion.div>

      <h3 className="mt-5 text-2xl font-bold text-white">
        {primeiroNome ? `Prontinho, ${primeiroNome}!` : "Solicitação enviada!"}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-brand-silver-light/90">
        Sua solicitação de proposta foi enviada com sucesso. Veja os próximos
        passos:
      </p>

      <ul className="mx-auto mt-6 max-w-sm space-y-3 text-left">
        {nextSteps.map((s, i) => (
          <motion.li
            key={s.title}
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.2 + i * 0.12 }}
            className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
          >
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-royal-bright/20 text-brand-royal-bright">
              <s.icon className="size-4" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-medium text-white">
                {s.title}
              </span>
              <span className="mt-0.5 block text-xs text-brand-silver-light/80">
                {s.desc}
              </span>
            </span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-7 flex flex-col items-center gap-3">
        <Button
          asChild
          size="lg"
          className="w-full bg-brand-gradient-cta font-semibold text-white shadow-brand transition-transform hover:brightness-110 active:scale-[0.98] sm:w-auto sm:px-8"
        >
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent(
              "Olá! Acabei de solicitar uma proposta pelo site da D&V Gestão Condominial."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle aria-hidden />
            Falar agora no WhatsApp
          </a>
        </Button>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-silver-light/80 transition-colors hover:text-white"
        >
          <RefreshCw className="size-3.5" aria-hidden />
          Enviar uma nova solicitação
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 opacity-80">
        <Image
          src="/logo.jpeg"
          alt="D&V Gestão Condominial"
          width={28}
          height={28}
          className="rounded-md"
        />
        <span className="text-xs font-medium text-brand-silver-light">
          D&V Gestão Condominial
        </span>
      </div>
    </motion.div>
  )
}
