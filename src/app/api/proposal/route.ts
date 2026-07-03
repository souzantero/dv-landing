import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

import { siteConfig } from "@/lib/site";

// Nodemailer exige o runtime Node.js (não roda no Edge).
export const runtime = "nodejs";
// Nunca cachear: cada POST é uma nova solicitação.
export const dynamic = "force-dynamic";

/* -------------------------------------------------------------------------- */
/*  Validação (zod v4) — espelha o contrato do wizard                          */
/* -------------------------------------------------------------------------- */

const simNao = z.enum(["sim", "nao"]);
const inteiroPositivo = z.coerce
  .number({ message: "Valor numérico inválido" })
  .int()
  .min(1);
const opcional = z.string().trim().max(240).optional().default("");

const proposalSchema = z.object({
  // Passo 1 — Solicitante
  nome_completo: z.string().trim().min(3),

  // Passo 2 — Condomínio
  nome_condominio: z.string().trim().min(2),
  endereco_completo: z.string().trim().min(5),
  numero_apartamentos: inteiroPositivo,
  numero_blocos: inteiroPositivo,
  andares_por_predio: inteiroPositivo,

  // Passo 3 — Operacional
  possui_elevadores: simNao,
  possui_salao_festas: simNao,
  possui_academia: simNao,
  possui_areas_lazer: simNao,
  areas_lazer_detalhe: opcional,

  // Passo 4 — Gestão atual
  possui_administradora: simNao,
  tipo_sindico: z.enum(["nenhum", "morador", "profissional"]),
  limpeza: z.enum(["morador", "terceirizada"]),
  portaria: z.enum(["nao", "24h", "parcial"]),
  outros_prestadores: opcional,

  // Passo 5 — Administração pretendida
  administracao_pretendida: z.enum(["completa", "parcial"]),

  // Passo 6 — Contato
  email: z.email(),
  telefone: z.string().trim().min(10),
});

type ProposalData = z.infer<typeof proposalSchema>;

/* -------------------------------------------------------------------------- */
/*  Formatação legível do e-mail                                               */
/* -------------------------------------------------------------------------- */

const SIM_NAO_LABEL: Record<string, string> = { sim: "Sim", nao: "Não" };
const TIPO_SINDICO_LABEL: Record<string, string> = {
  nenhum: "Nenhum",
  morador: "Síndico morador",
  profissional: "Síndico profissional",
};
const LIMPEZA_LABEL: Record<string, string> = {
  morador: "Feita por morador",
  terceirizada: "Terceirizada",
};
const PORTARIA_LABEL: Record<string, string> = {
  nao: "Não possui",
  "24h": "24 horas",
  parcial: "Parcial",
};
const ADMIN_LABEL: Record<string, string> = {
  completa: "Administração completa (inclui síndico profissional)",
  parcial: "Administração parcial (administradora + síndico do condomínio)",
};

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildContent(d: ProposalData) {
  const rows: [string, string][] = [
    ["Nome do solicitante", d.nome_completo],
    ["Condomínio", d.nome_condominio],
    ["Endereço", d.endereco_completo],
    ["Nº de apartamentos", String(d.numero_apartamentos)],
    ["Nº de blocos", String(d.numero_blocos)],
    ["Andares por prédio", String(d.andares_por_predio)],
    ["Possui elevadores", SIM_NAO_LABEL[d.possui_elevadores]],
    ["Possui salão de festas", SIM_NAO_LABEL[d.possui_salao_festas]],
    ["Possui academia", SIM_NAO_LABEL[d.possui_academia]],
    ["Possui áreas de lazer", SIM_NAO_LABEL[d.possui_areas_lazer]],
    ["Detalhe das áreas de lazer", d.areas_lazer_detalhe || "—"],
    ["Possui administradora atual", SIM_NAO_LABEL[d.possui_administradora]],
    ["Tipo de síndico", TIPO_SINDICO_LABEL[d.tipo_sindico]],
    ["Limpeza", LIMPEZA_LABEL[d.limpeza]],
    ["Portaria", PORTARIA_LABEL[d.portaria]],
    ["Outros prestadores", d.outros_prestadores || "—"],
    ["Administração pretendida", ADMIN_LABEL[d.administracao_pretendida]],
    ["E-mail para retorno", d.email],
    ["Telefone para retorno", d.telefone],
  ];

  const text =
    `Nova solicitação de proposta — ${d.nome_condominio}\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nEnviado pelo site ${siteConfig.url}`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1f2a37;max-width:640px;margin:0 auto">
      <div style="background:#0a2540;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
        <h1 style="margin:0;font-size:18px">Nova solicitação de proposta</h1>
        <p style="margin:6px 0 0;font-size:14px;color:#9aa7b8">${esc(d.nome_condominio)}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e5e9f0;border-top:0;border-radius:0 0 12px 12px;overflow:hidden">
        <tbody>
          ${rows
            .map(
              ([k, v], i) => `
            <tr style="background:${i % 2 === 0 ? "#f7f9fc" : "#ffffff"}">
              <td style="padding:10px 16px;font-size:13px;color:#64748b;width:42%;vertical-align:top">${esc(k)}</td>
              <td style="padding:10px 16px;font-size:14px;font-weight:600;color:#1f2a37">${esc(v)}</td>
            </tr>`,
            )
            .join("")}
        </tbody>
      </table>
      <p style="margin:16px 0 0;font-size:12px;color:#9aa7b8;text-align:center">
        Enviado automaticamente pelo site ${esc(siteConfig.url)}
      </p>
    </div>`;

  return { text, html };
}

/* -------------------------------------------------------------------------- */
/*  Envio (nodemailer via SMTP por variáveis de ambiente)                      */
/* -------------------------------------------------------------------------- */

function readSmtpEnv() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    MAIL_TO,
    MAIL_FROM,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;

  const port = Number(SMTP_PORT);
  return {
    host: SMTP_HOST,
    port,
    // 465 = SSL implícito; demais portas usam STARTTLS.
    secure: port === 465,
    user: SMTP_USER,
    pass: SMTP_PASS,
    // Destino padrão: e-mail oficial da D&V.
    to: MAIL_TO || siteConfig.contact.email,
    from: MAIL_FROM || `"${siteConfig.name}" <${SMTP_USER}>`,
  };
}

/* -------------------------------------------------------------------------- */
/*  Handler                                                                    */
/* -------------------------------------------------------------------------- */

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON inválido." },
      { status: 400 },
    );
  }

  const parsed = proposalSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Dados inválidos.",
        issues: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const { text, html } = buildContent(data);
  const subject = `Nova solicitação de proposta - ${data.nome_condominio}`;
  const smtp = readSmtpEnv();

  // SEM configuração de SMTP: modo simulado (não quebra em desenvolvimento).
  // Em produção, defina as variáveis SMTP_* / MAIL_* (ver .env.example).
  if (!smtp) {
    console.warn(
      "[api/proposal] SMTP não configurado — envio SIMULADO. " +
        "Configure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (e MAIL_TO/MAIL_FROM) para enviar de verdade.",
    );
    console.info(`[api/proposal] (simulado) Assunto: ${subject}`);
    console.info(`[api/proposal] (simulado) Conteúdo:\n${text}`);
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: { user: smtp.user, pass: smtp.pass },
    });

    await transporter.sendMail({
      from: smtp.from,
      to: smtp.to,
      replyTo: data.email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/proposal] Falha ao enviar e-mail:", err);
    return NextResponse.json(
      { ok: false, error: "Não foi possível enviar a solicitação." },
      { status: 502 },
    );
  }
}
