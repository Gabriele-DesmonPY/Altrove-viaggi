export type Area = 'Italia' | 'Europa' | 'Asia' | 'Africa' | 'America';
export type Tipo = 'Mare' | 'Città' | 'Natura' | 'Cammini' | 'Avventura' | 'Tour lunghi';

export interface Partenza { data: string; posti: number; prezzo: number }

export interface Viaggio {
  slug: string;
  luogo: string;
  titolo: string;
  area: Area;
  tipi: Tipo[];
  giorni: number;
  prezzo: number;
  coord: string;
  stagione: string;
  descrizione: string;
  img?: { full: string; small: string; alt: string };
  /** sfondo usato finché la foto non arriva */
  segnaposto: string;
  accento: 'cherry' | 'sky' | 'lime' | 'autumn';
  partenze: Partenza[];
}

export const viaggi: Viaggio[] = [
  {
    slug: 'maldive', luogo: 'Maldive', titolo: 'Atolli, barriera e nessuna fretta', area: 'Asia', tipi: ['Mare'],
    giorni: 9, prezzo: 3450, coord: '4.17°N · 73.51°E', stagione: 'Inverno',
    descrizione: 'Nove giorni tra due atolli: snorkeling sulla barriera, un\'isola di pescatori e una notte su una barca tradizionale.',
    img: { full: './img/maldive-full.webp', small: './img/maldive-800.webp', alt: 'Isola delle Maldive vista dall\'alto, con spiaggia bianca, palme e laguna turchese' },
    segnaposto: 'linear-gradient(160deg,#a9d8e8,#1d8aa8)', accento: 'sky',
    partenze: [
      { data: '2027-02-06', posti: 4, prezzo: 3450 },
      { data: '2027-03-13', posti: 0, prezzo: 3590 },
      { data: '2027-04-10', posti: 10, prezzo: 3290 },
    ],
  },
  {
    slug: 'giappone', luogo: 'Giappone', titolo: 'Kyoto d\'autunno e la via dei templi', area: 'Asia', tipi: ['Città', 'Tour lunghi'],
    giorni: 12, prezzo: 2890, coord: '35.01°N · 135.77°E', stagione: 'Autunno',
    descrizione: 'Da Tokyo a Kyoto in treno, con due notti in ryokan e le colline di Higashiyama quando gli aceri diventano rossi.',
    img: { full: './img/kyoto-full.webp', small: './img/kyoto-800.webp', alt: 'Strada lastricata di Kyoto al tramonto con aceri rossi, lanterne accese e la pagoda Yasaka sullo sfondo' },
    segnaposto: 'linear-gradient(160deg,#ebafc1,#7a3b4e)', accento: 'cherry',
    partenze: [
      { data: '2027-04-02', posti: 3, prezzo: 3190 },
      { data: '2027-11-12', posti: 9, prezzo: 2890 },
    ],
  },
  {
    slug: 'marocco', luogo: 'Marocco', titolo: 'Dal deserto all\'Atlante', area: 'Africa', tipi: ['Natura', 'Avventura'],
    giorni: 10, prezzo: 1490, coord: '31.63°N · 7.99°W', stagione: 'Primavera',
    descrizione: 'Marrakech, la valle del Dadès e una notte in tenda tra le dune di Merzouga. Rientro dall\'Alto Atlante.',
    img: { full: './img/marocco-full.webp', small: './img/marocco-800.webp', alt: 'Cresta di una duna nel deserto al tramonto, con nuvole scure e luce arancione all\'orizzonte' },
    segnaposto: 'radial-gradient(120% 90% at 75% 15%,#f3c79a 0%,transparent 55%),linear-gradient(165deg,#d88b58,#7a3a1c)', accento: 'autumn',
    partenze: [
      { data: '2027-03-14', posti: 2, prezzo: 1490 },
      { data: '2027-10-09', posti: 12, prezzo: 1550 },
    ],
  },
];

export const aree: Area[] = ['Italia', 'Europa', 'Asia', 'Africa', 'America'];
export const tipi: Tipo[] = ['Mare', 'Città', 'Natura', 'Cammini', 'Avventura', 'Tour lunghi'];
export const mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

const fmtData = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });
export const data = (iso: string) => fmtData.format(new Date(iso + 'T12:00:00'));
export const euro = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} €`;
