import SiteHeader from "@/components/sections/site-header";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
import Differentiators from "@/components/sections/differentiators";
import Process from "@/components/sections/process";
import ProposalWizard from "@/components/sections/proposal-wizard";
import FaqSection from "@/components/sections/faq";
import CtaContact from "@/components/sections/cta-contact";
import SiteFooter from "@/components/sections/site-footer";
import WhatsAppFloat from "@/components/sections/whatsapp-float";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="flex flex-col flex-1">
        <Hero />
        <About />
        <Services />
        <Differentiators />
        <Process />
        <ProposalWizard />
        <FaqSection />
        <CtaContact />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
