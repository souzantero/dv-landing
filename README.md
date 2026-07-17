# D&V Gestão Condominial — Landing Page

Landing page da **D&V Gestão Condominial**, administradora de condomínios em
Curitiba e região metropolitana (PR). Construída com **Next.js 16 (App Router)**,
**TypeScript**, **Tailwind CSS v4**, **shadcn/ui** e **framer-motion**.

Inclui: seções institucionais animadas, formulário de proposta multi-step
(wizard) com validação por passo, botão flutuante de WhatsApp, SEO/GEO completo
(metadata, Open Graph, Twitter, JSON-LD `Organization`/`LocalBusiness` +
`FAQPage`, `sitemap.xml`, `robots.txt`) e envio de e-mail via SMTP.

## Requisitos

- Node.js 20+ (recomendado)
- npm (ou pnpm/yarn/bun)

## Como rodar

```bash
# 1. Instale as dependências
npm install

# 2. Configure as variáveis de ambiente
cp .env.example .env.local
# edite .env.local (veja "Configuração de e-mail" abaixo)

# 3. Ambiente de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Build de produção

```bash
npm run build
npm run start
```

### Verificação de tipos

```bash
npx tsc --noEmit
```

## Configuração de e-mail (formulário de proposta)

O formulário envia um `POST` para `/api/proposal`. A rota valida os dados com
**zod** e envia um e-mail formatado (assunto `Nova solicitação de proposta -
{nome_condominio}`) via **nodemailer/SMTP**, usando variáveis de ambiente.

| Variável              | Obrigatória | Descrição                                                        |
| --------------------- | ----------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`| não         | URL canônica pública (SEO/OG/sitemap). Padrão: `https://www.dvcondominios.com.br`. |
| `SMTP_HOST`           | sim\*       | Host SMTP (ex.: `smtp.gmail.com`).                               |
| `SMTP_PORT`           | sim\*       | Porta (`465` SSL ou `587` STARTTLS).                             |
| `SMTP_USER`           | sim\*       | Usuário/login SMTP.                                              |
| `SMTP_PASS`           | sim\*       | Senha SMTP (no Gmail com 2FA, use uma **Senha de app**).         |
| `MAIL_TO`             | não         | Destinatário. Padrão: `devgestaocondominial@gmail.com`.         |
| `MAIL_FROM`           | não         | Remetente exibido. Padrão: `SMTP_USER`.                          |

\* **Modo simulado:** se `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` ou `SMTP_PASS`
não estiverem definidas, a rota **não quebra** — ela registra o e-mail no
console (`console.warn`/`console.info`) e retorna `{ ok: true, simulated: true }`.
Isso permite desenvolver sem configurar SMTP. **Em produção, defina as quatro
variáveis** para enviar de verdade.

### Exemplo com Gmail

1. Ative a verificação em duas etapas na conta Google.
2. Gere uma **Senha de app** em <https://myaccount.google.com/apppasswords>.
3. Preencha no `.env.local`:

   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=seuemail@gmail.com
   SMTP_PASS=senha-de-app-gerada
   MAIL_TO=devgestaocondominial@gmail.com
   MAIL_FROM="D&V Gestão Condominial <seuemail@gmail.com>"
   ```

## Estrutura

```
src/
├─ app/
│  ├─ layout.tsx            # Fontes, metadata SEO completa, JSON-LD, Toaster
│  ├─ page.tsx              # Composição das seções da landing
│  ├─ sitemap.ts            # sitemap.xml
│  ├─ robots.ts             # robots.txt
│  ├─ globals.css           # Tema/tokens da marca (Tailwind v4)
│  └─ api/proposal/route.ts # POST: valida (zod) e envia e-mail (nodemailer)
├─ components/
│  ├─ sections/             # Seções da página (header, hero, wizard, faq, ...)
│  └─ ui/                   # Componentes shadcn/ui
└─ lib/
   ├─ site.ts               # Configuração central (contato, redes, URL)
   ├─ faq-data.ts           # Perguntas do FAQ (fonte do FAQPage JSON-LD)
   └─ json-ld.ts            # Structured data (Organization/LocalBusiness + FAQ)
```

## SEO / GEO

- Metadata completa (`title`, `description`, `keywords`, canonical, `robots`).
- Open Graph e Twitter Card (imagem: `/logo.jpeg`).
- JSON-LD com `Organization`/`LocalBusiness`/`ProfessionalService` (área de
  atuação Curitiba e São José dos Pinhais, telefone/WhatsApp, e-mail e
  `sameAs` do Instagram e LinkedIn) e `FAQPage`.
- `sitemap.xml` e `robots.txt` gerados dinamicamente a partir de
  `NEXT_PUBLIC_SITE_URL`.

> Ao editar o conteúdo do FAQ em `src/components/sections/faq.tsx`, atualize
> também `src/lib/faq-data.ts` para manter o schema `FAQPage` em sincronia.

## Contato da D&V

- WhatsApp: (41) 9 9580-3372 — <https://wa.me/5541995803372>
- Instagram: <https://www.instagram.com/dvcondominios>
- LinkedIn: <https://www.linkedin.com/company/devgestaocondominial/>
- E-mail: devgestaocondominial@gmail.com
