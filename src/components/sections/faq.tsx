"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { HelpCircle } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type FaqItem = {
  question: string
  answer: React.ReactNode
}

const FAQS: FaqItem[] = [
  {
    question: "Quais serviços a D&V Gestão Condominial oferece?",
    answer: (
      <>
        <p>
          A D&V atua em duas frentes complementares. Como{" "}
          <strong>administradora</strong>, cuidamos do controle de receitas e
          despesas, planejamento orçamentário, gestão do fundo de reserva,
          prestação de contas, orçamento de serviços, implementação do regimento
          interno, participação em assembleias e suporte completo ao síndico —
          tudo com aplicativo próprio para condôminos e síndico.
        </p>
        <p>
          Como <strong>síndico profissional</strong>, assumimos a representação
          legal do condomínio, o atendimento personalizado, a mediação de
          conflitos, a supervisão da gestão orçamentária, a gestão de
          fornecedores e a coordenação de colaboradores, garantindo o
          cumprimento de todas as obrigações legais.
        </p>
      </>
    ),
  },
  {
    question: "A D&V atende quais regiões?",
    answer: (
      <p>
        Atendemos Curitiba e toda a região metropolitana do Paraná. Se o seu
        condomínio está na capital ou nas cidades vizinhas, fale conosco pelo
        WhatsApp ou solicite uma proposta: avaliamos cada caso e apresentamos a
        melhor solução de gestão para o seu condomínio.
      </p>
    ),
  },
  {
    question:
      "Qual a diferença entre administração completa e administração parcial?",
    answer: (
      <>
        <p>
          Na <strong>administração completa</strong>, a D&V assume a gestão do
          condomínio de ponta a ponta, incluindo o síndico profissional — ideal
          para quem quer se livrar totalmente da rotina de gestão e das
          responsabilidades legais.
        </p>
        <p>
          Na <strong>administração parcial</strong>, atuamos como administradora
          dando todo o suporte técnico, financeiro e legal, enquanto o síndico
          do condomínio (morador) permanece na função. Você escolhe o modelo que
          faz mais sentido para a realidade do seu condomínio.
        </p>
      </>
    ),
  },
  {
    question: "O que faz um síndico profissional?",
    answer: (
      <p>
        O síndico profissional é um especialista contratado para representar
        legalmente o condomínio e conduzir a gestão com técnica e imparcialidade.
        Ele cuida do atendimento personalizado aos condôminos, da mediação de
        conflitos, do cumprimento das obrigações legais, da supervisão do
        orçamento, da gestão de fornecedores e da coordenação dos colaboradores —
        liberando os moradores da sobrecarga e do desgaste de administrar o
        condomínio.
      </p>
    ),
  },
  {
    question: "Como funciona a troca da administradora atual pela D&V?",
    answer: (
      <p>
        A transição é conduzida por nós, de forma segura e sem burocracia para o
        condomínio. Fazemos o levantamento das informações, organizamos a
        documentação, alinhamos o processo com a assembleia e assumimos a gestão
        com continuidade total dos serviços. Nossa prioridade é agilidade no
        atendimento para que a mudança seja tranquila e transparente para
        síndico e condôminos.
      </p>
    ),
  },
  {
    question: "A D&V oferece aplicativo para o síndico e os condôminos?",
    answer: (
      <p>
        Sim. Nossa administração inclui um aplicativo com múltiplas
        funcionalidades, que aproxima síndico, condôminos e a administradora.
        Por ele é possível acompanhar a gestão, acessar comunicados, consultar
        informações financeiras e agilizar o dia a dia do condomínio com mais
        transparência e praticidade.
      </p>
    ),
  },
  {
    question: "Como é feita a prestação de contas e o controle financeiro?",
    answer: (
      <p>
        A transparência é um dos pilares da D&V. Realizamos o controle rigoroso
        de receitas e despesas, o planejamento orçamentário anual, a gestão do
        fundo de reserva e a prestação de contas periódica e detalhada. Todo o
        histórico financeiro fica acessível, para que o condomínio saiba
        exatamente como cada centavo é aplicado.
      </p>
    ),
  },
  {
    question: "Como solicitar uma proposta e quanto tempo leva o retorno?",
    answer: (
      <p>
        Basta preencher o formulário de solicitação de proposta aqui no site,
        com os dados do seu condomínio, ou chamar a nossa equipe diretamente pelo
        WhatsApp. Analisamos as informações e retornamos com uma proposta
        personalizada no menor tempo possível — agilidade no atendimento é o que
        nos diferencia.
      </p>
    ),
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-background py-20 sm:py-28"
    >
      {/* Spotlight sutil de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-brand-royal/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-3xl px-5 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mb-10 flex flex-col items-center text-center sm:mb-14"
        >
          <motion.span
            variants={itemVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-silver/60 bg-secondary px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-royal uppercase"
          >
            <HelpCircle className="size-3.5" aria-hidden="true" />
            Perguntas frequentes
          </motion.span>

          <motion.h2
            id="faq-heading"
            variants={itemVariants}
            className="text-3xl font-bold text-balance sm:text-4xl"
          >
            Tudo o que você precisa saber sobre a{" "}
            <span className="text-brand-gradient">gestão do seu condomínio</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-xl text-base text-muted-foreground text-pretty"
          >
            Reunimos as dúvidas mais comuns de síndicos, condôminos e
            construtoras. Se a sua pergunta não estiver aqui, fale com a nossa
            equipe pelo WhatsApp.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-0"
            className="w-full gap-3"
          >
            {FAQS.map((item, index) => (
              <motion.div key={item.question} variants={itemVariants}>
                <AccordionItem
                  value={`faq-${index}`}
                  className="rounded-2xl border border-border bg-card px-5 shadow-brand transition-colors not-last:border-b hover:border-brand-royal/40 sm:px-6"
                >
                  <AccordionTrigger className="py-5 text-base font-semibold text-foreground no-underline hover:no-underline sm:text-lg [&>svg]:text-brand-royal">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
