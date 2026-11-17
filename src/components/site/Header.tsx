import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '#partenze', label: 'Partenze' },
  { href: '#esplora', label: 'Destinazioni' },
  { href: '#su-misura', label: 'Su misura' },
  { href: '#journal', label: 'Journal' },
  { href: '#contatti', label: 'Contatti' },
];

export default function Header() {
  const [overHero, setOverHero] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => {
      const hero = document.getElementById('hero');
      setOverHero(hero ? hero.getBoundingClientRect().bottom > 64 : false);
      setScrolled(window.scrollY > 24);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  const dark = overHero && !open;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-[60] transition-[background-color,color,border-color] duration-300',
          dark ? 'on-dark text-cream' : 'text-forest',
          dark && scrolled && 'bg-black/20 backdrop-blur-md',
          !overHero && !open && 'bg-cream/90 backdrop-blur-xl border-b border-forest/10',
          !(!overHero && !open) && 'border-b border-transparent',
        )}
      >
        <div className="flex items-center justify-between gap-6 px-6 md:px-24 h-16">
          <a href="#top" className="font-display text-2xl font-semibold tracking-tight" onClick={() => setOpen(false)}>
            Altrove<span className="text-cherry">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium" aria-label="Principale">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="opacity-80 hover:opacity-100 transition-opacity duration-150">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#su-misura"
              className={cn(
                'hidden sm:inline-flex rounded-full text-sm font-semibold px-5 py-2.5 transition-colors duration-200',
                dark ? 'bg-cream text-forest hover:bg-cherry' : 'bg-forest text-cream hover:bg-forest/85',
              )}
            >
              Chiedi un preventivo
            </a>
            <button
              type="button"
              className="md:hidden h-11 w-11 grid place-items-center rounded-full"
              aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-[55] bg-cream text-forest px-6 pt-28 pb-10 flex flex-col md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-2" aria-label="Menu">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-5xl font-medium py-2 border-b border-forest/10"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <a href="#su-misura" onClick={() => setOpen(false)} className="mt-auto rounded-full bg-forest text-cream text-center font-semibold py-4">
              Chiedi un preventivo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
