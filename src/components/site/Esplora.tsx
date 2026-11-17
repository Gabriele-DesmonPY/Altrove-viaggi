import { ArrowUpRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { data, viaggi } from '@/data/viaggi';
import { catColore, categorie, Divider, PhotoReveal, Reveal, type Categoria } from './ui';

type Dest = {
  n: string; luogo: string; paese: string; cats: Categoria[]; coord: string; info: string;
  href: string; src: string; alt: string; cls: string; pos?: string;
};

const prossime = (slug: string) => {
  const v = viaggi.find((x) => x.slug === slug)!;
  const libere = v.partenze.filter((p) => p.posti > 0);
  return `${libere.length} ${libere.length === 1 ? 'partenza' : 'partenze'} · dal ${data(libere[0].data)} · ${v.giorni} giorni`;
};

export const destinazioni: Dest[] = [
  { n: '01', luogo: 'Kyoto', paese: 'Giappone', cats: ['Città', 'Cultura'], coord: '35.01°N · 135.77°E', info: prossime('giappone'),
    href: '#viaggio-giappone', src: './img/kyoto-full.webp', alt: 'Strada di Kyoto al tramonto con aceri rossi, lanterne e la pagoda Yasaka',
    cls: 'aspect-[4/5] lg:aspect-auto lg:col-[1/6] lg:row-[1/6]', pos: '45% 50%' },
  { n: '02', luogo: 'Maldive', paese: 'Oceano Indiano', cats: ['Mare'], coord: '4.17°N · 73.51°E', info: prossime('maldive'),
    href: '#viaggio-maldive', src: './img/maldive-full.webp', alt: 'Isola delle Maldive vista dall\'alto con laguna turchese',
    cls: 'aspect-[16/10] lg:aspect-auto lg:col-[6/13] lg:row-[1/4]', pos: '60% 60%' },
  { n: '03', luogo: 'Merzouga', paese: 'Marocco', cats: ['Natura', 'Cultura'], coord: '31.10°N · 4.01°W', info: prossime('marocco'),
    href: '#viaggio-marocco', src: './img/marocco-800.webp', alt: 'Cresta di una duna al tramonto nel deserto',
    cls: 'aspect-[3/4] lg:aspect-auto lg:col-[6/9] lg:row-[4/9]', pos: '40% 50%' },
  { n: '04', luogo: 'Oia', paese: 'Grecia', cats: ['Mare', 'Città', 'Cultura'], coord: '36.46°N · 25.38°E', info: 'Su misura · da aprile a ottobre',
    href: '#su-misura', src: './img/oia-1000.webp', alt: 'Vicolo di Oia con buganvillee, vasi in terracotta e cupola blu',
    cls: 'aspect-[4/3] lg:aspect-auto lg:col-[9/13] lg:row-[4/7]' },
];

export default function Esplora({ attiva, onScegli }: { attiva: Categoria | null; onScegli: (c: Categoria | null) => void }) {
  const accese = destinazioni.filter((d) => !attiva || d.cats.includes(attiva)).length;

  return (
    <section id="esplora" className="on-dark relative bg-forest text-cream px-6 md:px-24 py-28 scroll-mt-16">
      <Divider n="04" left="Explore more" right={`${destinazioni.length} destinazioni`} light />

      <Reveal>
        <h2 className="mt-12 max-w-4xl font-display font-medium tracking-tight leading-[0.92] text-[clamp(3rem,7vw,6.5rem)]">
          Il mondo, <em className="italic font-normal text-cherry">fuori dagli schemi.</em>
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[92px]">
        {destinazioni.map((d, i) => {
          const spenta = !!attiva && !d.cats.includes(attiva);
          return (
            <PhotoReveal key={d.luogo} delay={i * 0.06}
              className={cn('relative transition-[opacity,filter] duration-300', d.cls, i === 0 && 'sm:col-span-2', spenta && 'opacity-30 grayscale')}>
              <a href={d.href} className="group absolute inset-0 overflow-hidden rounded-[28px] focus-visible:outline-offset-[-4px]" aria-describedby={`info-${d.n}`}>
                <img src={d.src} alt={d.alt} loading="lazy" style={{ objectPosition: d.pos ?? 'center' }}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.05]" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />
                <span className="absolute left-5 top-4 font-display italic text-5xl lg:text-6xl text-cream/90 leading-none">{d.n}</span>
                <span className="absolute right-4 top-4 flex gap-1.5">
                  {d.cats.map((c) => (
                    <span key={c} className={cn('rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-forest', catColore[c])}>{c}</span>
                  ))}
                </span>
                <span className="absolute inset-x-5 bottom-5">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.28em] text-cream/75">{d.paese} · {d.coord}</span>
                  <span className="mt-1 flex items-end justify-between gap-3">
                    <span className="font-display text-4xl lg:text-5xl font-medium leading-none">{d.luogo}</span>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream text-forest transition-transform duration-300 ease-out-soft group-hover:rotate-45">
                      <ArrowUpRight size={18} aria-hidden />
                    </span>
                  </span>
                  <span id={`info-${d.n}`} className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out-soft group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] max-lg:grid-rows-[1fr]">
                    <span className="overflow-hidden">
                      <span className="block pt-3 text-sm text-cream/90">{d.info}</span>
                    </span>
                  </span>
                </span>
              </a>
            </PhotoReveal>
          );
        })}

        {/* blocco filtri, sotto Kyoto */}
        <div className="flex flex-col justify-end gap-5 rounded-[28px] ring-1 ring-cream/15 p-7 sm:col-span-2 lg:col-[1/6] lg:row-[6/9]">
          <p className="font-display text-2xl leading-snug text-cream/90">
            {attiva ? <>{accese} {accese === 1 ? 'destinazione' : 'destinazioni'} per <em className="italic">{attiva.toLowerCase()}</em>.</> : <>Scegli un tema e guarda cosa si accende.</>}
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtra le destinazioni">
            {categorie.map((c) => (
              <button key={c} type="button" aria-pressed={attiva === c} onClick={() => onScegli(attiva === c ? null : c)}
                className={cn('rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-colors duration-150',
                  attiva === c ? 'bg-cream text-forest ring-cream' : 'ring-cream/30 hover:ring-cream/70')}>
                {c}
              </button>
            ))}
            {attiva && (
              <button type="button" onClick={() => onScegli(null)} className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-cream/75 hover:text-cream">
                <X size={14} aria-hidden /> Tutte
              </button>
            )}
          </div>
        </div>

        {/* invito al su misura */}
        <a href="#su-misura"
          className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-cherry p-7 text-forest sm:col-span-2 lg:col-[9/13] lg:row-[7/9] min-h-48">
          <span className="text-[11px] font-bold uppercase tracking-[0.28em]">N° 05 · Ovunque</span>
          <span className="flex items-end justify-between gap-4">
            <span className="font-display text-3xl leading-tight">Non la vedi qui? <em className="italic">La disegniamo.</em></span>
            <ArrowUpRight size={24} aria-hidden className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </span>
        </a>
      </div>
    </section>
  );
}
