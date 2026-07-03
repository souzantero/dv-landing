/**
 * Configuração central do site — usada em metadata (SEO), JSON-LD,
 * sitemap, robots e componentes de contato.
 *
 * A URL canônica pode ser sobrescrita por ambiente com NEXT_PUBLIC_SITE_URL
 * (ex.: em produção defina https://www.seudominio.com.br). O fallback abaixo
 * é um placeholder — ajuste-o quando o domínio definitivo estiver contratado.
 */
export const siteConfig = {
  name: "D&V Gestão Condominial",
  shortName: "D&V",
  legalName: "D&V Gestão Condominial",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dvgestaocondominial.com.br"
  ).replace(/\/$/, ""),
  description:
    "Administradora de condomínios em Curitiba e região metropolitana. Síndico profissional e administração completa com qualidade, agilidade e transparência.",
  locale: "pt-BR",
  logo: "/logo.jpeg",
  ogImage: "/logo.jpeg",

  contact: {
    email: "devgestaocondominial@gmail.com",
    // Número em formato internacional (E.164) para tel/wa.me e formato de exibição
    phoneDisplay: "(41) 9 9580-3372",
    phoneE164: "+5541995803372",
    whatsapp: "https://wa.me/5541995803372",
  },

  areaServed: ["Curitiba", "Região Metropolitana de Curitiba", "Paraná"],

  social: {
    instagram: "https://www.instagram.com/dvcondominios",
    linkedin: "https://www.linkedin.com/company/devgestaocondominial/",
  },
} as const;

export type SiteConfig = typeof siteConfig;
