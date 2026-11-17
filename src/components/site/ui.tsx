import { useId, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const EASE = [0.16, 1, 0.3, 1] as const;
export type Categoria = 'Città' | 'Natura' | 'Mare' | 'Cultura';
export const categorie: Categoria[] = ['Città', 'Natura', 'Mare', 'Cultura'];
export const catColore: Record<Categoria, string> = {
  Città: 'bg-cherry', Natura: 'bg-lime', Mare: 'bg-sky', Cultura: 'bg-autumn',
};

/** Titoli e blocchi: entrata una sola volta, breve. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Foto che si apre dal centro con una maschera. Niente movimento con riduci movimento. */
export function PhotoReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: 'inset(10% 10% 10% 10% round 28px)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Timbro tondo da passaporto. */
export function Stamp({ text, center, className }: { text: string; center: string; className?: string }) {
  const id = 'st' + useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <path id={id} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
      </defs>
      <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
      <text fontSize="9" letterSpacing="2.2" fontWeight="700" fill="currentColor" fontFamily="Manrope Variable, sans-serif">
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
      <text x="60" y="67" textAnchor="middle" fontSize="20" fontStyle="italic" fill="currentColor" fontFamily="Playfair Display Variable, serif">
        {center}
      </text>
    </svg>
  );
}

/** Etichetta editoriale piccola. */
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-[11px] font-bold uppercase tracking-[0.28em]', className)}>{children}</p>;
}

/** Divisore con numerazione: — N° 04 ————— testo */
export function Divider({ n, left, right, light = false }: { n: string; left: string; right?: string; light?: boolean }) {
  return (
    <div className={cn('flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.28em]', light ? 'text-cream/70' : 'text-forest/60')}>
      <span>N° {n}</span>
      <span className={cn('h-px flex-1', light ? 'bg-cream/20' : 'bg-forest/15')} />
      <span>{left}</span>
      {right && (
        <>
          <span className={cn('hidden md:block h-px w-16', light ? 'bg-cream/20' : 'bg-forest/15')} />
          <span className="hidden md:block">{right}</span>
        </>
      )}
    </div>
  );
}

export const scrollTo = (id: string) => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
};
