import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { catColore, categorie, Divider, Label, PhotoReveal, Reveal, Stamp, type Categoria } from './ui';
import { destinazioni } from './Esplora';

const scorci: { cat: Categoria; luogo: string; coord: string; src: string; alt: string; cls: string; pos?: string }[] = [
  { cat: 'Città', luogo: 'Atene', coord: '37.97°N · 23.73°E', src: './img/atene-1000.webp', alt: 'Via della Plaka ad Atene al tramonto, con case gialle e l\'Acropoli sullo sfondo',
    cls: 'col-span-2 aspect-[4/3] lg:aspect-auto lg:col-[1/7] lg:row-[1/8]' },
  { cat: 'Mare', luogo: 'Santorini', coord: '36.42°N · 25.43°E', src: './img/santorini-1200.webp', alt: 'Caldera di Santorini con barche a vela e case bianche sulla scogliera',
    cls: 'aspect-[3/4] lg:aspect-auto lg:col-[7/13] lg:row-[1/4]', pos: '65% 60%' },
  { cat: 'Natura', luogo: 'Fiordi', coord: '60.40°N · 6.73°E', src: './img/norvegia-1200.webp', alt: 'Fiordo norvegese tra montagne innevate e pini',
    cls: 'aspect-[3/4] lg:aspect-auto lg:col-[7/10] lg:row-[4/8]', pos: '45% 50%' },
  { cat: 'Cultura', luogo: 'Val d\'Orcia', coord: '43.06°N · 11.61°E', src: './img/toscana-1200.webp', alt: 'Colline della Val d\'Orcia con file di cipressi',
    cls: 'col-span-2 aspect-[16/9] lg:aspect-auto lg:col-[10/13] lg:row-[4/8]' },
];

export default function Idea({ attiva, onScegli }: { attiva: Categoria | null; onScegli: (c: Categoria) => void }) {
  const conta = (c: Categoria) => destinazioni.filter((d) => d.cats.includes(c)).length;

  return (
    <section id="idea" className="relative bg-cream px-6 md:px-24 pt-24 pb-28 overflow-hidden">
      <Divider n="03" left="Next destination" right="Non serve una meta" />

      <div className="mt-14 grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div className="lg:pt-6">
          <Reveal>
            <h2 className="font-display font-medium tracking-tight leading-[0.9] text-[clamp(3.5rem,8vw,7.5rem)]">
              Parti con <em className="italic font-normal">un'idea.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-sm text-xl leading-relaxed text-forest/80">
              Non serve conoscere già la destinazione. Basta sapere che hai voglia di partire.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-12">
            <Label className="text-forest/60">Da dove vuoi cominciare?</Label>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Scegli un tipo di viaggio">
              {categorie.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={attiva === c}
                  onClick={() => onScegli(c)}
                  className={cn(
                    'group inline-flex items-center gap-2 rounded-full py-2.5 pl-2.5 pr-4 text-sm font-semibold ring-1 transition-[background-color,box-shadow,transform] duration-200 active:scale-[0.97]',
                    attiva === c ? 'bg-forest text-cream ring-forest' : 'ring-forest/20 hover:ring-forest/60 hover:bg-white/60',
                  )}
                >
                  <span className={cn('h-6 w-6 rounded-full grid place-items-center text-[10px] font-bold text-forest', catColore[c])}>{conta(c)}</span>
                  {c}
                  <ArrowUpRight size={14} aria-hidden className="opacity-50 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </button>
              ))}
            </div>
            <p className="mt-6 text-sm text-forest/65">
              Hai già delle date? <a href="#partenze" className="font-semibold underline decoration-cherry decoration-2 underline-offset-4 hover:decoration-forest">Cerca tra le partenze</a>
            </p>
          </Reveal>
        </div>

        {/* composizione asimmetrica: ogni scorcio porta alle destinazioni di quel tipo */}
        <div className="relative grid grid-cols-2 gap-3 lg:grid-cols-12 lg:auto-rows-[78px] lg:gap-4">
          {scorci.map((s, i) => (
            <PhotoReveal key={s.luogo} delay={i * 0.08} className={cn('relative', s.cls)}>
              <button
                type="button"
                onClick={() => onScegli(s.cat)}
                aria-label={`${s.luogo}: esplora le destinazioni ${s.cat}`}
                className="group absolute inset-0 overflow-hidden rounded-[28px] text-left"
              >
                <img src={s.src} alt={s.alt} loading="lazy" style={{ objectPosition: s.pos ?? 'center' }}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.05]" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className={cn('absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-forest', catColore[s.cat])}>
                  {s.cat}
                </span>
                <span className="absolute inset-x-4 bottom-4 text-cream">
                  <span className="block font-display text-2xl lg:text-3xl leading-none">{s.luogo}</span>
                  <span className="mt-1.5 flex items-center justify-between gap-2 text-[11px] tracking-wider text-cream/85">
                    {s.coord}
                    <span className="hidden sm:inline-flex items-center gap-1 font-bold uppercase tracking-[0.2em] opacity-0 translate-x-[-6px] transition duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100">
                      Explore more <ArrowUpRight size={12} aria-hidden />
                    </span>
                  </span>
                </span>
              </button>
            </PhotoReveal>
          ))}
          <Stamp text="ALTROVE · EXPLORE MORE · 2026 · " center="idea" className="pointer-events-none absolute hidden w-32 rotate-[-10deg] rounded-full bg-cream text-autumn lg:block lg:left-[44%] lg:-top-12" />
        </div>
      </div>
    </section>
  );
}
