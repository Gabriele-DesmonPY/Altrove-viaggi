import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Mail, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Divider, Label, PhotoReveal, Reveal, Stamp } from './ui';

/* D · Racconto editoriale ------------------------------------------------ */
export function Racconto() {
  return (
    <section id="racconto" className="bg-cream px-6 md:px-24 py-28">
      <Divider n="05" left="Journal entry" right="Viaggio N° 0142" />

      <div className="mt-14 grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16 items-start">
        <figure className="relative">
          <PhotoReveal className="overflow-hidden rounded-[28px] aspect-[4/5] lg:aspect-[6/7]">
            <img src="./img/dune-1200.webp" alt="Cresta di una duna chiara all'alba, con montagne violacee sullo sfondo" loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: '55% 50%' }} />
          </PhotoReveal>
          <figcaption className="mt-3 flex justify-between text-xs text-forest/60">
            <span>Deserto, ore 6:40. Il momento prima che arrivi il caldo.</span>
            <span className="hidden sm:inline">Foto 01 / 01</span>
          </figcaption>
          <Stamp text="MOMENTI · NON DESTINAZIONI · ALTROVE · " center="0142" className="absolute -right-4 -top-6 w-28 md:w-32 rotate-[8deg] text-autumn bg-cream rounded-full" />
        </figure>

        <div className="lg:sticky lg:top-28">
          <Reveal>
            <h2 className="font-display font-medium tracking-tight leading-[0.95] text-[clamp(2.8rem,5.5vw,5.2rem)]">
              Non collezioniamo destinazioni. <em className="italic font-normal">Collezioniamo momenti.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-forest/80 first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8]">
              Il caffè bevuto in piedi al mercato. Il silenzio sulla duna prima dell'alba. Il nome del pescatore che vi ha portati sull'atollo.
              Costruiamo ogni programma intorno a questi momenti, e lasciamo che siano loro a restare.
            </p>
          </Reveal>

          {/* linea d'itinerario con le tre partenze */}
          <Reveal delay={0.15}>
            <svg viewBox="0 0 420 125" className="mt-10 w-full text-forest" role="img" aria-label="Itinerario: Kyoto, Merzouga, Malé">
              <path d="M14 70 C 90 10, 150 110, 210 55 S 340 20, 406 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 6" />
              {[
                { x: 14, y: 70, t: 'Kyoto', c: '35.01°N', f: '#EBAFC1' },
                { x: 210, y: 55, t: 'Merzouga', c: '31.10°N', f: '#D88B58' },
                { x: 406, y: 64, t: 'Malé', c: '4.17°N', f: '#A9D8E8' },
              ].map((s, i) => (
                <g key={s.t}>
                  <circle cx={s.x} cy={s.y} r="8" fill={s.f} stroke="currentColor" strokeWidth="1.5" />
                  <text x={s.x} y={s.y + 28} textAnchor={i === 0 ? 'start' : i === 2 ? 'end' : 'middle'} fontSize="12" fontWeight="700" fill="currentColor" fontFamily="Manrope Variable">{s.t}</text>
                  <text x={s.x} y={s.y + 42} textAnchor={i === 0 ? 'start' : i === 2 ? 'end' : 'middle'} fontSize="10" fill="currentColor" opacity="0.6" fontFamily="Manrope Variable">{s.c}</text>
                </g>
              ))}
            </svg>
          </Reveal>

          <Reveal delay={0.2}>
            <blockquote className="mt-10 border-l-2 border-cherry pl-6">
              <p className="font-display text-2xl italic leading-snug">“Avevamo una data e un'idea vaga di Giappone. Siamo tornati con un quaderno pieno di nomi.”</p>
              <footer className="mt-4 text-sm text-forest/70">
                Giulia e Marco · Kyoto d'autunno · testimonianza dimostrativa
              </footer>
            </blockquote>
            <a href="#viaggio-giappone" className="group mt-8 inline-flex items-center gap-3 font-semibold">
              <span className="underline decoration-cherry decoration-2 underline-offset-4 group-hover:decoration-forest">Leggi il loro viaggio</span>
              <ArrowRight size={18} aria-hidden className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Journal ---------------------------------------------------------------- */
export function Journal() {
  return (
    <section id="journal" className="bg-white/45 px-6 md:px-24 py-28 border-y border-forest/10 scroll-mt-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <Reveal>
          <Label className="text-forest/60">Journal · articoli dimostrativi</Label>
          <h2 className="mt-4 font-display text-5xl md:text-6xl font-medium leading-none tracking-tight">Prima di partire, <em className="italic font-normal">leggi qui.</em></h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <article className="group relative lg:col-span-7">
          <PhotoReveal className="overflow-hidden rounded-[28px] aspect-[16/10]">
            <img src="./img/atene-1000.webp" alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]" />
          </PhotoReveal>
          <Label className="mt-6 text-forest/55">Journal entry N° 01 · Città · 6 min</Label>
          <h3 className="mt-2 max-w-xl font-display text-3xl md:text-4xl font-medium leading-tight">
            <a href="#journal" className="after:absolute after:inset-0 decoration-cherry decoration-2 underline-offset-4 group-hover:underline">Atene in un weekend, lontano dalla folla dell'Acropoli</a>
          </h3>
          <p className="mt-3 max-w-xl text-forest/75">La Plaka al tramonto, i mercati di Monastiraki la mattina presto e dove mangiare quando chiudono le cucine dei turisti.</p>
        </article>

        <div className="grid gap-8 lg:col-span-5 content-start">
          <article className="group relative grid grid-cols-[40%_1fr] gap-5 items-center">
            <div className="overflow-hidden rounded-[20px] aspect-[3/4]">
              <img src="./img/oia-1000.webp" alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.05]" />
            </div>
            <div>
              <Label className="text-forest/55">N° 02 · Isole · 4 min</Label>
              <h3 className="mt-2 font-display text-2xl font-medium leading-snug">
                <a href="#journal" className="after:absolute after:inset-0 decoration-cherry decoration-2 underline-offset-4 group-hover:underline">Le Cicladi fuori stagione: perché andarci a ottobre</a>
              </h3>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-[28px] bg-cherry p-7">
            <div className="flex items-start justify-between gap-4">
              <Label className="text-forest/70">N° 03 · Metodo · 5 min</Label>
              <span className="rounded-full ring-2 ring-forest px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] -rotate-6">Giorno 1 → 12</span>
            </div>
            <h3 className="mt-6 font-display text-3xl font-medium leading-tight">
              <a href="#journal" className="after:absolute after:inset-0 decoration-forest decoration-2 underline-offset-4 group-hover:underline">Come leggere un programma di viaggio prima di prenotare</a>
            </h3>
            <svg viewBox="0 0 300 60" className="mt-6 w-full text-forest" aria-hidden>
              <path d="M8 40 C 60 0, 110 60, 160 28 S 250 10, 292 34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 6" />
              {[[8, 40], [84, 30], [160, 28], [292, 34]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="5" fill="currentColor" />)}
            </svg>
          </article>
        </div>
      </div>
    </section>
  );
}

/* E · Su misura ---------------------------------------------------------- */
const passi = [
  { n: '01', t: 'Ci racconti', d: 'Venti minuti: chi parte, quanti giorni avete, cosa non volete fare.' },
  { n: '02', t: 'Ti proponiamo una rotta', d: 'Entro cinque giorni, un programma giorno per giorno con prezzi chiari.' },
  { n: '03', t: 'Partite', d: 'Voli, notti e trasferimenti sono nostri. E un numero da chiamare, sempre.' },
];

export function SuMisura() {
  return (
    <section id="su-misura" className="relative overflow-hidden bg-sky px-6 md:px-24 py-28 scroll-mt-16">
      <Divider n="06" left="Su misura" right="Disegnato con te" />
      <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div>
          <Reveal>
            <h2 className="font-display font-medium tracking-tight leading-[0.92] text-[clamp(3rem,6.5vw,6.2rem)]">
              Il viaggio che immagini, <em className="italic font-normal">ancora prima di conoscerlo.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-xl text-forest/85">Raccontaci cosa desideri vivere. Al resto pensiamo insieme.</p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a href="#contatti" className="group inline-flex items-center gap-3 rounded-full bg-forest py-2.5 pl-7 pr-2.5 text-lg font-semibold text-cream transition-colors duration-200 hover:bg-forest/85 active:scale-[0.98]">
                Disegna il tuo viaggio
                <span className="grid h-11 w-11 place-items-center rounded-full bg-cherry text-forest transition-transform duration-300 ease-out-soft group-hover:rotate-45">
                  <ArrowUpRight size={20} aria-hidden />
                </span>
              </a>
              <span className="text-sm text-forest/75">oppure chiama lo 051 000 0000</span>
            </div>
          </Reveal>

          <ol className="mt-16 grid gap-6 sm:grid-cols-3 border-t border-forest/20 pt-8">
            {passi.map((p, i) => (
              <Reveal key={p.n} delay={0.1 + i * 0.08}>
                <li className="list-none">
                  <span className="font-display italic text-4xl">{p.n}</span>
                  <h3 className="mt-2 font-semibold text-lg">{p.t}</h3>
                  <p className="mt-1 text-sm text-forest/75 leading-relaxed">{p.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <figure className="relative">
          <PhotoReveal className="overflow-hidden rounded-[28px] aspect-[4/5]">
            <img src="./img/norvegia-1200.webp" alt="Fiordo norvegese tra montagne innevate e pini" loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: '42% 50%' }} />
          </PhotoReveal>
          <span className="absolute left-5 top-5 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em]">Fiordi · su misura</span>
          <Stamp text="SU MISURA · ALTROVE · DAL 2008 · " center="tuo" className="absolute -bottom-8 -left-6 w-32 md:w-36 rotate-[-12deg] text-forest bg-cherry rounded-full" />
        </figure>
      </div>
    </section>
  );
}

/* F · Footer con newsletter e contatti ----------------------------------- */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [ok, setOk] = useState(false);
  const [errori, setErrori] = useState<{ email?: string; consenso?: string }>({});
  const [inviato, setInviato] = useState(false);

  const invia = (e: React.FormEvent) => {
    e.preventDefault();
    const err: typeof errori = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.email = 'Controlla l\'email: manca qualcosa.';
    if (!ok) err.consenso = 'Serve il consenso per iscriverti.';
    setErrori(err);
    setInviato(Object.keys(err).length === 0);
  };

  return (
    <div className="rounded-[28px] ring-1 ring-cream/15 bg-cream/[0.04] p-7 md:p-9">
      <Label className="text-cream/60">Newsletter · una volta al mese</Label>
      <p className="mt-3 font-display text-2xl md:text-3xl">Nuove partenze, posti rimasti e un racconto. Niente altro.</p>
      <AnimatePresence mode="wait" initial={false}>
        {inviato ? (
          <motion.p key="ok" role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="mt-6 flex items-start gap-3 rounded-2xl bg-lime p-5 font-medium text-forest">
            <Check size={20} className="mt-0.5 shrink-0" aria-hidden /> Iscrizione registrata. È una demo: non partirà nessuna email.
          </motion.p>
        ) : (
          <motion.form key="f" onSubmit={invia} noValidate className="mt-6 space-y-3" exit={{ opacity: 0, transition: { duration: 0.15 } }}>
            <label htmlFor="email" className="sr-only">La tua email</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input id="email" type="email" autoComplete="email" inputMode="email" value={email}
                onChange={(e) => { setEmail(e.target.value); setErrori((x) => ({ ...x, email: undefined })); }}
                aria-invalid={!!errori.email} aria-describedby="email-err" placeholder="La tua email"
                className="flex-1 rounded-full bg-cream text-forest px-5 py-3 text-base outline-none ring-2 ring-transparent focus:ring-sky aria-[invalid=true]:ring-autumn transition placeholder:text-forest/50" />
              <button type="submit" className="rounded-full bg-cherry text-forest px-6 py-3 font-semibold hover:bg-cream active:scale-[0.97] transition">Iscrivimi</button>
            </div>
            <p id="email-err" className="min-h-5 text-sm font-medium text-[#F3B98F]">{errori.email}</p>
            <label className="flex items-start gap-3 text-sm text-cream/80 cursor-pointer">
              <input type="checkbox" checked={ok} onChange={(e) => { setOk(e.target.checked); setErrori((x) => ({ ...x, consenso: undefined })); }}
                aria-invalid={!!errori.consenso} aria-describedby="consenso-err" className="mt-0.5 h-5 w-5 accent-cherry" />
              <span>Accetto di ricevere la newsletter e ho letto l'informativa privacy (dimostrativa).</span>
            </label>
            <p id="consenso-err" className="min-h-5 text-sm font-medium text-[#F3B98F]">{errori.consenso}</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const colonne: { t: string; l: [string, string][] }[] = [
  { t: 'Esplora', l: [['Partenze', '#partenze'], ['Parti con un\'idea', '#idea'], ['Destinazioni', '#esplora'], ['Su misura', '#su-misura'], ['Journal', '#journal']] },
  { t: 'Destinazioni', l: [['Giappone', '#viaggio-giappone'], ['Maldive', '#viaggio-maldive'], ['Marocco', '#viaggio-marocco'], ['Grecia', '#esplora'], ['Toscana e Norvegia', '#idea']] },
];

export function Footer() {
  return (
    <footer id="contatti" className="on-dark relative overflow-hidden bg-forest text-cream px-6 md:px-24 pt-24 pb-10 scroll-mt-16">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-end">
        <Reveal>
          <Label className="text-cream/60">N° 07 · Fine del viaggio, per ora</Label>
          <p className="mt-5 font-display font-medium leading-[0.92] tracking-tight text-[clamp(3rem,6.5vw,6rem)]">
            Il prossimo altrove <em className="italic font-normal text-cherry">ti aspetta.</em>
          </p>
        </Reveal>
        <Newsletter />
      </div>

      <div className="mt-20 grid gap-12 border-t border-cream/15 pt-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <p className="font-display text-3xl font-semibold">Altrove<span className="text-cherry">.</span> <span className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-cream/60 align-middle">Viaggi</span></p>
          <p className="mt-4 max-w-xs text-cream/70">Partenze di gruppo e viaggi su misura, organizzati da persone che ci sono state.</p>
          <ul className="mt-6 flex gap-2">
            {['Instagram', 'Facebook', 'WhatsApp'].map((s) => (
              <li key={s}><a href="#contatti" className="inline-flex rounded-full ring-1 ring-cream/25 px-3.5 py-1.5 text-sm hover:bg-cream hover:text-forest transition-colors">{s}</a></li>
            ))}
          </ul>
        </div>
        {colonne.map((c) => (
          <nav key={c.t} aria-label={c.t}>
            <Label className="text-cream/50">{c.t}</Label>
            <ul className="mt-5 space-y-2.5">
              {c.l.map(([label, href]) => (
                <li key={label}><a href={href} className="group inline-flex items-center gap-1 text-cream/85 hover:text-cherry transition-colors">{label}</a></li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <Label className="text-cream/50">Contatti</Label>
          <ul className="mt-5 space-y-3 text-cream/85">
            <li className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-cherry" aria-hidden /> Via dei Viaggiatori 12, Bologna</li>
            <li className="flex gap-3"><Phone size={18} className="mt-0.5 shrink-0 text-cherry" aria-hidden /> 051 000 0000 · lun-sab 9:30-19</li>
            <li className="flex gap-3"><Mail size={18} className="mt-0.5 shrink-0 text-cherry" aria-hidden /> ciao@altrove.example</li>
          </ul>
          <p className="mt-3 text-xs text-cream/45">Recapiti dimostrativi.</p>
        </div>
      </div>

      <div className="relative mt-16">
        <p aria-hidden className="font-display italic leading-[0.8] text-cream/[0.07] select-none text-[24vw] md:text-[19vw] -ml-2">altrove</p>
        <Stamp text="ALTROVE VIAGGI · OFFGRID × FLOWCRAFT · " center="2026" className="absolute right-0 top-1/2 -translate-y-1/2 w-24 md:w-32 rotate-[10deg] text-cherry" />
      </div>

      <div className={cn('mt-6 grid gap-2 border-t border-cream/15 pt-6 text-xs text-cream/55 md:grid-cols-2')}>
        <p>© 2026 Altrove Viaggi · nome provvisorio, sito demo. Prezzi, date e testimonianze sono dimostrativi. P.IVA 00000000000.</p>
        <p className="md:text-right">
          <a href="#contatti" className="hover:text-cream">Privacy</a> · <a href="#contatti" className="hover:text-cream">Cookie</a> · <a href="#contatti" className="hover:text-cream">Condizioni</a> ·{' '}
          <span id="crediti">Foto fornite da OFFGRID per la demo · Playfair Display e Manrope (SIL OFL) · art direction OFFGRID, codice Flowcraft</span>
        </p>
      </div>
    </footer>
  );
}
