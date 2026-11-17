import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import CinematicScrol from '@/components/ui/scroll-triggered-video-hero';
import Header from '@/components/site/Header';
import Partenze from '@/components/site/Partenze';
import Idea from '@/components/site/Idea';
import Esplora from '@/components/site/Esplora';
import { Footer, Journal, Racconto, SuMisura } from '@/components/site/Sezioni';
import { scrollTo, type Categoria } from '@/components/site/ui';

export default function App() {
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const scegli = (c: Categoria) => { setCategoria(c); scrollTo('esplora'); };

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" />
      <a href="#partenze" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[70] focus:rounded-full focus:bg-forest focus:text-cream focus:px-4 focus:py-2">
        Vai alla ricerca
      </a>
      <Header />
      <main>
        <CinematicScrol />
        <Partenze />
        <Idea attiva={categoria} onScegli={scegli} />
        <Esplora attiva={categoria} onScegli={setCategoria} />
        <Racconto />
        <Journal />
        <SuMisura />
      </main>
      <Footer />
    </MotionConfig>
  );
}
