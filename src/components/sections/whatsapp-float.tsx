"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/5541995803372";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function WhatsAppFloat() {
  const reduceMotion = useReducedMotion();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Revela o tooltip espontaneamente uma vez, alguns segundos após a carga,
  // como um convite discreto ao contato.
  useEffect(() => {
    const show = setTimeout(() => setTooltipOpen(true), 3500);
    const hide = setTimeout(() => setTooltipOpen(false), 8000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  return (
    <div
      className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 sm:bottom-7 sm:right-7"
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
    >
      {/* Tooltip "Fale conosco" */}
      <motion.span
        role="status"
        initial={false}
        animate={
          tooltipOpen
            ? { opacity: 1, x: 0, scale: 1, pointerEvents: "auto" }
            : { opacity: 0, x: 8, scale: 0.96, pointerEvents: "none" }
        }
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="glass-dark hidden select-none rounded-full px-4 py-2 text-sm font-medium text-brand-white shadow-brand sm:inline-block"
      >
        Fale conosco
        <span
          aria-hidden="true"
          className="absolute right-[-5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 rounded-[2px] bg-brand-navy/90"
        />
      </motion.span>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        onFocus={() => setTooltipOpen(true)}
        onBlur={() => setTooltipOpen(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full outline-none focus-visible:ring-4 focus-visible:ring-brand-royal-bright/60 sm:h-[3.75rem] sm:w-[3.75rem]"
      >
        {/* Anel de pulso sutil */}
        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#25D366]"
            initial={{ opacity: 0.55, scale: 1 }}
            animate={{ opacity: 0, scale: 1.7 }}
            transition={{
              duration: 2.2,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 0.6,
            }}
          />
        )}

        {/* Botão */}
        <motion.span
          className="relative flex h-full w-full items-center justify-center rounded-full bg-[#25D366] text-white shadow-brand-lg ring-1 ring-white/25"
          whileHover={reduceMotion ? undefined : { scale: 1.08 }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <WhatsAppIcon className="h-7 w-7" />
        </motion.span>
      </a>
    </div>
  );
}
