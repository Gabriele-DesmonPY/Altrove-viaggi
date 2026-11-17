'use client';

import { useRef, useState, useEffect, Fragment } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, type MotionValue } from 'framer-motion';
import { ChevronRight, MapPin } from 'lucide-react';
import { viaggi, type Viaggio } from '@/data/viaggi';

// --- Types & Data ---
interface Chapter {
  id: string;
  title: string;
  /** *parola* = corsivo */
  subtitle: string;
  viaggio: Viaggio;
}

const titoli = ['Ci sono luoghi che *ti aspettano.*', 'Dove l\'autunno *si accende.*', 'Sabbia, spezie e *silenzio.*'];

const chapters: Chapter[] = viaggi.map((v, i) => ({
  id: String(i + 1).padStart(2, '0'),
  title: v.luogo,
  subtitle: titoli[i] ?? v.titolo,
  viaggio: v,
}));

const Rich = ({ text }: { text: string }) => (
  <>
    {text.split('*').map((part, i) => (
      <Fragment key={i}>{i % 2 ? <em className="italic font-normal">{part}</em> : part}</Fragment>
    ))}
  </>
);

// --- Animation Variants ---
const EASE = [0.16, 1, 0.3, 1] as const;
const textContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const textReveal = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { duration: 0.7, ease: EASE } },
};
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: EASE } },
};

// --- Sub-Components ---
const FilmGrain = () => (
  <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.06] mix-blend-overlay">
    <div
      className="absolute inset-0 h-full w-full"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />
  </div>
);

const Background = ({ currentChapterIndex }: { currentChapterIndex: number }) => (
  <div className="absolute inset-0 h-full w-full overflow-hidden bg-forest">
    {chapters.map((chapter, index) => {
      const v = chapter.viaggio;
      const active = index === currentChapterIndex;
      return (
        <motion.div
          key={chapter.id}
          initial={false}
          animate={{ opacity: active ? 1 : 0, zIndex: active ? 10 : 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full"
        >
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ scale: active ? 1 : 1.05 }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            {v.img ? (
              <img
                src={v.img.full}
                srcSet={`${v.img.small} 800w, ${v.img.full} 1600w`}
                sizes="100vw"
                alt={v.img.alt}
                fetchPriority={index === 0 ? 'high' : 'low'}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full" style={{ background: v.segnaposto }} role="img" aria-label={`${v.luogo}: foto in arrivo`} />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />
        </motion.div>
      );
    })}
    <FilmGrain />
  </div>
);

const DynamicNav = ({ activeIndex, progress }: { activeIndex: number; progress: MotionValue<number> }) => {
  const smoothProgress = useSpring(progress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 rounded-full bg-cream/90 backdrop-blur-xl border border-forest/10 p-2 pl-6 pr-2 shadow-2xl text-forest"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0, transition: { duration: 0.25 } }}
      transition={{ delay: 0.5, ease: EASE }}
    >
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest text-forest/60">Capitolo {chapters[activeIndex].id} / {chapters.length.toString().padStart(2, '0')}</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="font-display text-base font-semibold min-w-[100px]"
          >
            {chapters[activeIndex].title}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="relative h-12 w-12 flex items-center justify-center">
        <svg className="h-full w-full -rotate-90 transform" aria-hidden>
          <circle cx="24" cy="24" r="18" className="stroke-forest/15" strokeWidth="2" fill="none" />
          <motion.circle cx="24" cy="24" r="18" className="stroke-forest" strokeWidth="2" fill="none" strokeLinecap="round" style={{ pathLength: smoothProgress }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-cherry" />
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function CinematicScrol() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inHero, setInHero] = useState(true);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setActiveIndex(Math.min(Math.floor(latest * chapters.length), chapters.length - 1));
      setInHero(latest < 0.97);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section id="hero" ref={containerRef} aria-label="In evidenza" className="on-dark relative w-full" style={{ height: `${chapters.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Background currentChapterIndex={activeIndex} />
      </div>

      <AnimatePresence>{inHero && <DynamicNav activeIndex={activeIndex} progress={scrollYProgress} />}</AnimatePresence>

      <div className="absolute inset-0 top-0 z-30 pointer-events-none">
        {chapters.map((chapter, i) => {
          const v = chapter.viaggio;
          const Heading = i === 0 ? 'h1' : 'h2';
          return (
            <div key={chapter.id} className="flex h-screen w-full items-center justify-start px-6 md:px-24">
              <motion.div
                variants={textContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: '-20%' }}
                className="max-w-4xl pointer-events-auto text-cream"
              >
                <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="rounded-full bg-cream text-forest px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em]">
                    {chapter.id} · {v.luogo}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs tracking-wider text-cream/80">
                    <MapPin size={13} aria-hidden /> {v.coord} · {v.stagione}
                  </span>
                </motion.div>

                <div className="overflow-hidden mb-6 py-2">
                  <motion.div variants={textReveal}>
                    <Heading className="font-display text-5xl md:text-8xl font-medium tracking-tight leading-[0.95] text-balance">
                      <Rich text={chapter.subtitle} />
                    </Heading>
                  </motion.div>
                </div>

                <motion.div variants={fadeIn} className="max-w-md p-6 rounded-2xl border border-cream/20 bg-forest/30 backdrop-blur-md">
                  <p className="text-lg text-cream/90 leading-relaxed">{v.descrizione}</p>
                </motion.div>

                <motion.a
                  href={`#viaggio-${v.slug}`}
                  variants={fadeIn}
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-10 group inline-flex items-center gap-4 font-semibold"
                >
                  <span className="relative h-12 w-12 rounded-full border border-cream/40 flex items-center justify-center overflow-hidden">
                    <span className="absolute inset-0 bg-cream translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out-soft" />
                    <ChevronRight size={20} className="relative z-10 group-hover:text-forest transition-colors duration-300" />
                  </span>
                  <span className="tracking-widest uppercase text-xs">{v.giorni} giorni · scopri il viaggio</span>
                </motion.a>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
