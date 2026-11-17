import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Minus, Plus, Search, X } from 'lucide-react';
import { aree, data, euro, mesi, tipi, viaggi, type Area, type Partenza, type Tipo, type Viaggio } from '@/data/viaggi';
import { cn } from '@/lib/utils';

import { EASE } from './ui';

const accentoBg = { cherry: 'bg-cherry', sky: 'bg-sky', lime: 'bg-lime', autumn: 'bg-autumn' } as const;

function Stato({ p, persone }: { p: Partenza; persone: number }) {
  if (p.posti === 0) return <span className="rounded-full ring-1 ring-forest/20 px-2.5 py-0.5 text-xs text-forest/55 line-through">Esaurito</span>;
  if (p.posti < persone) return <span className="rounded-full ring-1 ring-forest/20 px-2.5 py-0.5 text-xs text-forest/65">Solo {p.posti} posti</span>;
  if (p.posti <= 3) return <span className="rounded-full bg-autumn/30 px-2.5 py-0.5 text-xs font-bold text-forest">Ultimi {p.posti} posti</span>;
  return <span className="rounded-full bg-lime/45 px-2.5 py-0.5 text-xs font-semibold text-forest">{p.posti} posti liberi</span>;
}

const proporzioni = ['aspect-[4/5]', 'aspect-[1/1]', 'aspect-[4/5]'];

function Card({ v, i, persone, mese }: { v: Viaggio; i: number; persone: number; mese: number | null }) {
  const [aperta, setAperta] = useState(false);
  const date = v.partenze.filter((p) => mese === null || new Date(p.data).getMonth() === mese);
  const prossima = date.find((p) => p.posti >= persone) ?? date[0];
  const prezzoDa = Math.min(...date.filter((p) => p.posti > 0).map((p) => p.prezzo), prossima.prezzo);
  const idDettagli = `dettagli-${v.slug}`;

  return (
    <motion.article
      layout
      id={`viaggio-${v.slug}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
      transition={{ duration: 0.4, ease: EASE }}
      className={cn('group relative flex flex-col scroll-mt-24', i % 3 === 1 && 'lg:mt-20')}
    >
      <div className={cn('relative overflow-hidden rounded-[28px] bg-forest/10', proporzioni[i % 3])}>
        {v.img ? (
          <img src={v.img.small} alt={v.img.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.05]" />
        ) : (
          <div className="h-full w-full" style={{ background: v.segnaposto }} />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
        <span className="absolute left-5 top-4 font-display italic text-4xl text-cream leading-none">N° {String(i + 1).padStart(2, '0')}</span>
        <span className={cn('absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-forest', accentoBg[v.accento])}>
          {v.giorni} giorni
        </span>
        <span className="absolute inset-x-5 bottom-4 flex items-center justify-between text-cream">
          <span className="text-[11px] font-bold uppercase tracking-[0.28em]">{v.luogo}</span>
          <span className="inline-flex items-center gap-1 text-[11px] tracking-wider text-cream/85"><MapPin size={12} aria-hidden /> {v.coord}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-forest/55">{v.tipi.join(' · ')} · {v.stagione}</p>
        <h3 className="mt-2 font-display text-3xl lg:text-[2.1rem] font-medium leading-[1.05] text-forest text-balance">{v.titolo}</h3>

        <dl className="mt-6 grid grid-cols-2 border-y border-forest/15">
          <div className="py-4 pr-4">
            <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest/55">Prossima partenza</dt>
            <dd className="mt-1 font-semibold">{data(prossima.data)}</dd>
            <dd className="mt-2"><Stato p={prossima} persone={persone} /></dd>
          </div>
          <div className="border-l border-forest/15 py-4 pl-4">
            <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest/55">Prezzo da</dt>
            <dd className="mt-1 font-display text-3xl font-medium leading-none">{euro(prezzoDa)}</dd>
            <dd className="mt-1 text-xs text-forest/60">a persona · {date.length} {date.length === 1 ? 'data' : 'date'}</dd>
          </div>
        </dl>

        <AnimatePresence initial={false}>
          {aperta && (
            <motion.div
              id={idDettagli}
              key="d"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="pt-5 text-forest/80 leading-relaxed">{v.descrizione}</p>
              <ul className="mt-4 divide-y divide-forest/10 border-y border-forest/10 text-sm">
                {date.map((p) => (
                  <li key={p.data} className="flex items-center gap-3 py-2.5">
                    <span className="font-semibold">{data(p.data)}</span>
                    <span className="ml-auto text-forest/70">{euro(p.prezzo)}</span>
                    <Stato p={p} persone={persone} />
                  </li>
                ))}
              </ul>
              <a href="#contatti" className="mt-4 inline-flex text-sm font-semibold underline decoration-cherry decoration-2 underline-offset-4 hover:decoration-forest">
                Chiedi disponibilità per {persone} {persone === 1 ? 'persona' : 'persone'}
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          aria-expanded={aperta}
          aria-controls={idDettagli}
          onClick={() => setAperta((a) => !a)}
          className="group/cta mt-6 inline-flex items-center justify-between gap-3 self-start rounded-full bg-forest py-2 pl-6 pr-2 font-semibold text-cream transition-colors duration-200 hover:bg-forest/85 active:scale-[0.98]"
        >
          {aperta ? 'Chiudi il viaggio' : 'Scopri il viaggio'}
          <span className="grid h-9 w-9 place-items-center rounded-full bg-cream text-forest transition-transform duration-300 ease-out-soft group-hover/cta:translate-x-0.5">
            <ArrowUpRight size={16} aria-hidden className={cn('transition-transform duration-300', aperta && 'rotate-90')} />
          </span>
        </button>
      </div>
    </motion.article>
  );
}

const field = 'w-full appearance-none bg-transparent text-forest text-base font-semibold outline-none cursor-pointer';
const cell = 'rounded-2xl md:rounded-full px-6 py-3 hover:bg-forest/5 focus-within:bg-forest/5 transition-colors';

export default function Partenze() {
  const [area, setArea] = useState<Area | ''>('');
  const [mese, setMese] = useState<number | null>(null);
  const [persone, setPersone] = useState(2);
  const [tipo, setTipo] = useState<Tipo | null>(null);

  const risultati = useMemo(
    () =>
      viaggi.filter((v) => {
        if (area && v.area !== area) return false;
        if (tipo && !v.tipi.includes(tipo)) return false;
        return v.partenze.some((p) => p.posti >= persone && (mese === null || new Date(p.data).getMonth() === mese));
      }),
    [area, mese, persone, tipo],
  );

  const attivi = [
    area && { k: 'area', l: area, off: () => setArea('') },
    mese !== null && { k: 'mese', l: mesi[mese], off: () => setMese(null) },
    tipo && { k: 'tipo', l: tipo, off: () => setTipo(null) },
  ].filter(Boolean) as { k: string; l: string; off: () => void }[];

  const azzera = () => { setArea(''); setMese(null); setPersone(2); setTipo(null); };

  return (
    <section id="partenze" className="relative z-40 bg-cream px-6 md:px-24 pb-28 scroll-mt-16">
      {/* Ricerca: agganciata al fondo della hero */}
      <form
        onSubmit={(e) => { e.preventDefault(); document.getElementById('risultati')?.scrollIntoView({ behavior: 'smooth' }); }}
        className="relative -top-14 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_auto] gap-1 rounded-3xl md:rounded-full bg-cream p-2 shadow-[0_24px_60px_-20px_rgba(52,60,53,0.45)] ring-1 ring-forest/10"
        aria-label="Cerca un viaggio"
      >
        <label className={cell}>
          <span className="block text-[11px] font-bold uppercase tracking-widest text-forest/60">Dove</span>
          <select className={field} value={area} onChange={(e) => setArea(e.target.value as Area | '')}>
            <option value="">Ovunque</option>
            {aree.map((a) => <option key={a}>{a}</option>)}
          </select>
        </label>
        <label className={cell}>
          <span className="block text-[11px] font-bold uppercase tracking-widest text-forest/60">Quando</span>
          <select className={field} value={mese ?? ''} onChange={(e) => setMese(e.target.value === '' ? null : Number(e.target.value))}>
            <option value="">Qualsiasi mese</option>
            {mesi.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
        </label>
        <div className="rounded-2xl md:rounded-full px-6 py-3 flex items-center justify-between gap-4">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-widest text-forest/60">Persone</span>
            <output className="text-base font-semibold" aria-live="polite">{persone} {persone === 1 ? 'persona' : 'persone'}</output>
          </div>
          <div className="flex gap-1">
            {[{ d: -1, I: Minus, l: 'Una persona in meno', dis: persone <= 1 }, { d: 1, I: Plus, l: 'Una persona in più', dis: persone >= 8 }].map(({ d, I, l, dis }) => (
              <button key={d} type="button" aria-label={l} disabled={dis} onClick={() => setPersone((p) => p + d)}
                className="h-10 w-10 grid place-items-center rounded-full ring-1 ring-forest/20 hover:bg-forest/5 active:scale-90 disabled:opacity-30 transition">
                <I size={15} />
              </button>
            ))}
          </div>
        </div>
        <button type="submit" className="flex items-center justify-center gap-2 rounded-2xl md:rounded-full bg-forest text-cream hover:bg-forest/85 active:scale-[0.97] px-8 py-4 font-semibold transition">
          <Search size={18} aria-hidden /> Cerca
        </button>
      </form>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pt-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-forest/60">N° 02 · Prossime partenze · demo</p>
          <h2 className="mt-4 font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight">
            Viaggi che <em className="italic font-normal">lasciano il segno.</em>
          </h2>
          <p id="risultati" className="scroll-mt-28 mt-4 text-lg text-forest/75" aria-live="polite">
            {risultati.length === 0
              ? 'Con questi filtri non ci sono partenze.'
              : `${risultati.length} ${risultati.length === 1 ? 'viaggio' : 'viaggi'} con posti liberi per ${persone} ${persone === 1 ? 'persona' : 'persone'}.`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end" role="group" aria-label="Viaggia a modo tuo">
          {tipi.map((t) => (
            <button key={t} type="button" aria-pressed={tipo === t} onClick={() => setTipo(tipo === t ? null : t)}
              className={cn('rounded-full px-4 py-2 text-sm font-medium ring-1 transition-colors duration-150',
                tipo === t ? 'bg-forest text-cream ring-forest' : 'ring-forest/20 hover:ring-forest/50')}>
              {tipo === t && <span aria-hidden>✓ </span>}{t}
            </button>
          ))}
        </div>
      </div>

      {attivi.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-forest/60">Filtri attivi:</span>
          {attivi.map((f) => (
            <button key={f.k} type="button" onClick={f.off} className="inline-flex items-center gap-1 rounded-full bg-sky/60 px-3 py-1 font-medium hover:bg-sky transition-colors" aria-label={`Rimuovi filtro ${f.l}`}>
              {f.l} <X size={14} aria-hidden />
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {risultati.map((v, i) => <Card key={v.slug} v={v} i={i} persone={persone} mese={mese} />)}
        </AnimatePresence>
      </motion.div>

      {risultati.length === 0 && (
        <div className="mt-4 rounded-[28px] border border-dashed border-forest/25 p-10 text-center">
          <p className="font-display text-2xl">Con questi filtri non abbiamo date.</p>
          <p className="mt-2 text-forest/70">Prova un altro mese, oppure costruiamo il viaggio intorno alle tue date.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={azzera} className="rounded-full ring-1 ring-forest/30 px-5 py-2.5 text-sm font-semibold hover:bg-forest/5 transition">Azzera filtri</button>
            <a href="#su-misura" className="rounded-full bg-forest text-cream px-5 py-2.5 text-sm font-semibold hover:bg-forest/85 transition">Viaggio su misura</a>
          </div>
        </div>
      )}
    </section>
  );
}
