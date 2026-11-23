import React, { useRef, useState } from 'react';
import Layout from '../components/layout';
import reading from '../data/reading.json';

// Entries are stored newest first; older backfilled books stay later in the collection.
const books = reading.filter((entry) => entry.type === 'Book');
const audiobooks = reading.filter((entry) => entry.type === 'Audiobook');
// Articles and resources stay in data/reading.json but are not shown for now.
const categories = ['Book', 'Audiobook'];
const metadata = (entry) =>
  [entry.publication, entry.publishedYear && `Published ${entry.publishedYear}`].filter(Boolean).join(' · ');
const px = (n) => `${n}px`;
const coverStyle = (entry) => entry.coverCrop ? {
  aspectRatio: `${entry.coverCrop.width} / ${entry.coverCrop.height}`,
  '--cover-width': `${entry.coverCrop.sourceWidth / entry.coverCrop.width * 100}%`,
  '--cover-left': `${-entry.coverCrop.x / entry.coverCrop.width * 100}%`,
  '--cover-top': `${-entry.coverCrop.y / entry.coverCrop.height * 100}%`,
} : undefined;

const SERIF = "'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif";
const MONO = "'SF Mono', Menlo, Consolas, monospace";

// Presentation only: how each edition sits on the shelf. Colours come from
// data/reading.json (color / ink); anything here is spine typography and size.
// h / w are the spine height and thickness in px at desktop scale.
const SPINES = {
  'tell-me-im-wrong': {
    h: 172, w: 20, bind: 'paper',
    lines: [{ t: 'TELL ME I’M WRONG', fs: 9, weight: 800 }],
    author: { t: 'NICOLAI TANGEN', fs: 7, weight: 700, color: '#171716' },
  },
  'porsche-911': {
    h: 186, w: 24, bind: 'hard',
    lines: [{ t: 'Porsche 911', fs: 12, weight: 600 }],
    author: { t: 'Ulf Poschardt', fs: 8 },
  },
  'soft-electronics': {
    h: 186, w: 22, bind: 'paper',
    lines: [{ t: 'Soft Electronics', fs: 12, weight: 400 }],
    author: { t: 'Jaro Gielens', fs: 8 },
    bands: [{ at: 'bottom', size: 10, color: '#fa7c28' }],
  },
  'less-but-better': {
    h: 196, w: 14, bind: 'paper',
    lines: [{ t: 'Less but Better', fs: 9, weight: 600 }],
    author: { t: 'Dieter Rams', fs: 8 },
  },
  'zero-to-one': {
    h: 152, w: 17, bind: 'hard', font: SERIF,
    lines: [{ parts: [['ZERO TO ', '#15171a'], ['ONE', '#eef2f6']], fs: 10, track: '0.08em' }],
    author: { t: 'Peter Thiel', fs: 8, color: '#15171a' },
  },
  'high-output-management': {
    h: 160, w: 19, bind: 'paper', creased: true,
    lines: [{ t: 'High Output Management', fs: 10, weight: 600, color: '#f59a45' }],
    author: { t: 'GROVE', fs: 7.5, track: '0.1em', color: '#ffffff' },
    bands: [{ at: 'bottom', size: 9, color: '#ee8f34' }],
  },
  'the-innovators-dilemma': {
    h: 188, w: 21, bind: 'paper', flip: true,
    lines: [{ t: 'THE INNOVATOR’S DILEMMA', fs: 6.5, weight: 700, track: '0.02em' }],
    label: { bg: '#ffe33b', color: '#1c1d2b' },
    author: { t: 'CHRISTENSEN', fs: 5.8, weight: 700, track: '0.03em', color: '#1c1d2b', bg: '#ffe33b' },
  },
  'the-first-90-days': {
    h: 176, w: 24, bind: 'hard',
    lines: [{ parts: [['THE FIRST ', '#121414'], ['90 DAYS', '#ffffff']], fs: 9.5, weight: 800 }],
    author: { t: 'WATKINS', fs: 7.5, weight: 700, track: '0.04em', color: '#121414' },
  },
  'flash-boys': {
    h: 164, w: 21, bind: 'paper', font: SERIF, flip: true, creased: true,
    lines: [{ t: 'FLASH BOYS', fs: 11, track: '0.12em' }],
    author: { t: 'LEWIS', fs: 8, track: '0.14em' },
  },
  'the-power-of-habit': {
    h: 160, w: 26, bind: 'paper',
    lines: [
      { t: 'THE POWER OF', fs: 7, weight: 700, track: '0.08em' },
      { t: 'HABIT', fs: 13, weight: 800, track: '0.06em', color: '#e3262e' },
    ],
    author: { t: 'Duhigg', fs: 8, weight: 700 },
    bands: [{ at: 'top', size: 12, color: '#e3262e' }],
  },
  'why-we-buy': {
    h: 166, w: 20, bind: 'paper', creased: true,
    lines: [{ t: 'WHY WE BUY', fs: 11, weight: 800, track: '0.02em', color: '#ffffff' }],
    author: { t: 'Underhill', fs: 8, font: SERIF, style: 'italic', color: '#ffffff' },
    bands: [{ at: 'top', size: 14, color: '#f6f3ec' }],
  },
  'open-secrets': {
    h: 172, w: 30, bind: 'paper',
    lines: [
      { t: 'OPEN', fs: 12, weight: 800, color: '#ffe53a' },
      { t: 'SECRETS', fs: 12, weight: 800, color: '#ffe53a' },
    ],
    author: { t: 'The New York Times', fs: 8, font: SERIF },
  },
  'dieter-rams-as-little-design-as-possible': {
    h: 196, w: 34, bind: 'hard',
    lines: [
      { t: 'Dieter Rams:', fs: 9, weight: 500, color: '#1f5a3d' },
      { t: 'As Little Design', fs: 9, weight: 500, color: '#1f5a3d' },
      { t: 'as Possible', fs: 9, weight: 500, color: '#1f5a3d' },
    ],
    author: { t: 'Sophie Lovell', fs: 8, color: '#1f5a3d' },
  },
  'less-and-more': {
    h: 188, w: 38, bind: 'cloth',
    lines: [{ t: 'Less and More', fs: 13, weight: 500 }],
    author: { t: 'Klemp & Ueki-Polet', fs: 8 },
  },
  'universal-principles-of-design': {
    h: 192, w: 28, bind: 'hard',
    lines: [
      { t: 'Universal Principles', fs: 10, weight: 300, color: '#ffffff' },
      { t: 'of Design', fs: 10, weight: 300, color: '#ffffff' },
    ],
    author: { t: 'Lidwell et al.', fs: 8, color: '#ffffff' },
    bands: [{ at: 'bottom', size: 8, color: '#17191c' }],
  },
  'the-design-of-everyday-things': {
    h: 160, w: 24, bind: 'paper', creased: true,
    lines: [
      { t: 'The Design of', fs: 9, weight: 600 },
      { t: 'Everyday Things', fs: 9, weight: 600 },
    ],
    author: { t: 'Don Norman', fs: 8 },
    bands: [{ at: 'bottom', size: 10, color: '#d42a20' }],
  },
  'the-inmates-are-running-the-asylum': {
    h: 172, w: 25, bind: 'paper', flip: true,
    lines: [
      { t: 'The Inmates Are', fs: 9, weight: 600, color: '#5c8df0' },
      { t: 'Running the Asylum', fs: 9, weight: 600, color: '#5c8df0' },
    ],
    author: { t: 'alan cooper', fs: 7.5, font: MONO, track: '0.05em' },
  },
  'the-paradox-of-choice': {
    h: 166, w: 21, bind: 'paper',
    lines: [{ t: 'THE PARADOX OF CHOICE', fs: 7, weight: 600, track: '0.02em', color: '#d2381d' }],
    author: { t: 'SCHWARTZ', fs: 6.5, weight: 600, track: '0.03em', color: '#1a1a18' },
    bands: [{ at: 'bottom', size: 11, color: '#e9652b' }],
  },
  'the-culture-map': {
    h: 168, w: 23, bind: 'hard',
    lines: [{ t: 'THE CULTURE MAP', fs: 10, weight: 800, track: '0.05em' }],
    author: { t: 'MEYER', fs: 7.5, weight: 700, track: '0.1em' },
  },
};

// Two bays of one 606 run. Books are grouped as they would be at home:
// business on the left, design on the right, both packed towards the shared
// upright. The first book of the left bay leans; the right bay has a bookend.
const BAY_ORDER = [
  [
    'zero-to-one',
    'high-output-management',
    'the-innovators-dilemma',
    'the-first-90-days',
    'flash-boys',
    'the-power-of-habit',
    'why-we-buy',
    'open-secrets',
    'tell-me-im-wrong',
    'the-culture-map',
  ],
  [
    'dieter-rams-as-little-design-as-possible',
    'less-and-more',
    'universal-principles-of-design',
    'the-design-of-everyday-things',
    'the-inmates-are-running-the-asylum',
    'the-paradox-of-choice',
    'porsche-911',
    'soft-electronics',
    'less-but-better',
  ],
];

const fallbackSpine = (entry) => ({
  h: Math.round((entry.height || 340) * 0.5),
  w: Math.max(18, Math.round((entry.depth || 44) * 0.48)),
  bind: 'paper',
  lines: [{ t: entry.spineTitle || entry.title, fs: 9, weight: 600 }],
  author: { t: (entry.spineAuthor || entry.author || '').split(' ').slice(-1)[0], fs: 8 },
});

// Audiobooks have no physical spine, so one is typeset from the title. Size, case and
// binding vary per book but are derived from its id, so a book always looks the same.
const hash = (text) => [...text].reduce((n, char) => (n * 31 + char.charCodeAt(0)) >>> 0, 7);
const audioSpine = (entry) => {
  const n = hash(entry.id);
  const upper = (n >> 8) % 3 !== 0;
  const h = 150 + (n % 9) * 5;
  let w = 17 + ((n >> 4) % 6) * 2;
  const text = upper ? entry.title.toUpperCase() : entry.title;
  const surname = (entry.author.split(/,| and /)[0] || '').trim().split(' ').slice(-1)[0];
  const author = upper ? surname.toUpperCase() : surname;
  const glyph = upper ? 0.72 : 0.58;
  const room = h - 18 - 12 - author.length * 6 * glyph;
  let lines = [text];
  let fs = room / (text.length * glyph);
  if (fs < 5.6) {
    // Long titles run over two lines, split at the word nearest the middle
    const words = text.split(' ');
    let best = 1;
    for (let i = 1; i < words.length; i += 1) {
      const at = words.slice(0, i).join(' ').length;
      if (Math.abs(at - text.length / 2) < Math.abs(words.slice(0, best).join(' ').length - text.length / 2)) best = i;
    }
    lines = [words.slice(0, best).join(' '), words.slice(best).join(' ')];
    w = Math.max(w, 23);
    fs = Math.min(room / (Math.max(...lines.map((line) => line.length)) * glyph), (w - 7) / 2.3);
  }
  fs = Math.round(Math.max(4.4, Math.min(8.5, w * 0.42, fs)) * 10) / 10;
  return {
    h, w,
    bind: (n >> 12) % 4 === 0 ? 'hard' : 'paper',
    creased: (n >> 14) % 3 === 0,
    flip: (n >> 16) % 5 === 0,
    font: (n >> 10) % 4 === 0 ? SERIF : undefined,
    lines: lines.map((t) => ({ t, fs, weight: 600, track: upper ? '0.03em' : undefined })),
    author: { t: author, fs: 6, weight: 500, track: upper ? '0.03em' : undefined },
  };
};
const spineFor = (entry) => SPINES[entry.id]
  || (entry.type === 'Audiobook' ? audioSpine(entry) : fallbackSpine(entry));

// Audiobooks fill further shelves below the two curated bays. A tray holds about 264px of
// spines at full scale; the count is kept even so shelves pair up side by side.
const SHELF_RUN = 264;
const audioBays = (() => {
  const widths = audiobooks.map((entry) => audioSpine(entry).w + 1);
  const total = widths.reduce((sum, width) => sum + width, 0);
  let count = Math.ceil(total / SHELF_RUN);
  if (count % 2) count += 1;
  const out = Array.from({ length: count }, () => []);
  let run = 0;
  audiobooks.forEach((entry, index) => {
    out[Math.min(count - 1, Math.floor((run + widths[index] / 2) / (total / count)))].push(entry);
    run += widths[index];
  });
  return out.filter((bay) => bay.length);
})();

const byId = Object.fromEntries(books.map((entry) => [entry.id, entry]));
const placed = new Set(BAY_ORDER.flat());
const bays = BAY_ORDER.map((ids, index) => {
  const entries = ids.map((id) => byId[id]).filter(Boolean);
  // Any book added to the data later still gets a place on the last shelf.
  if (index === BAY_ORDER.length - 1) entries.push(...books.filter((entry) => !placed.has(entry.id)));
  return entries;
}).concat(audioBays);
const shelfOrder = bays.flat();

const textStyle = (part = {}) => ({
  '--fs': px(part.fs || 9),
  color: part.color,
  fontWeight: part.weight,
  letterSpacing: part.track,
  fontFamily: part.font,
  fontStyle: part.style,
  // Optional printed label behind the text, like the yellow blocks on some spines
  background: part.bg,
  padding: part.bg ? '3px 1.5px' : undefined,
});

// 606 hardware as explicit geometry, drawn as a true front elevation: no skew, no depth
// vectors, no top or side faces. Depth is only suggested by light and shadow.
// Proportions follow Vitsoe's own SketchUp models and planning guide (20mm E-Track, 110mm
// shelf ends); the look follows photos of installed systems.

// Rail: the E-Track seen end-on, 13px wide: three aluminium ribs with two dark tracks between
// them, so a shelf can hang from either side. Screws sit on the centre rib every 70px.
// The svg box is the front face, so every 100% height below is the rail length.
function Rail({ id }) {
  return (
      <svg aria-hidden="true" focusable="false" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', overflow: 'visible', display: 'block' }}>
        <defs>
          <linearGradient id={`${id}-channel`} gradientUnits="userSpaceOnUse" x1="2" y1="0" x2="5.5" y2="0">
            <stop offset="0" stopColor="#2f3335" />
            <stop offset="0.35" stopColor="#4d5254" />
            <stop offset="1" stopColor="#6e7375" />
          </linearGradient>
          <linearGradient id={`${id}-channel1`} gradientUnits="userSpaceOnUse" x1="7.5" y1="0" x2="11" y2="0">
            <stop offset="0" stopColor="#2f3335" />
            <stop offset="0.35" stopColor="#4d5254" />
            <stop offset="1" stopColor="#6e7375" />
          </linearGradient>
          <linearGradient id={`${id}-leg`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="2" y2="0" spreadMethod="repeat">
            <stop offset="0" stopColor="#f4f5f5" />
            <stop offset="0.3" stopColor="#d7d9da" />
            <stop offset="1" stopColor="#b3b7b8" />
          </linearGradient>
          <pattern id={`${id}-screws`} patternUnits="userSpaceOnUse" x="0" y="34" width="13" height="70">
            <circle cx="6.5" cy="3" r="2.3" fill="#3a3e40" />
            <circle cx="6.5" cy="3" r="1.8" fill="#c4c7c9" stroke="#8a8f91" strokeWidth="0.3" />
            <circle cx="6.1" cy="2.6" r="0.8" fill="#eceeee" opacity="0.8" />
            <path d="M5.4 3.7 L7.6 2.3" stroke="#4c5052" strokeWidth="0.5" strokeLinecap="round" />
          </pattern>
        </defs>
        <rect x="2" y="0" width="3.5" height="100%" fill={`url(#${id}-channel)`} />
        <rect x="7.5" y="0" width="3.5" height="100%" fill={`url(#${id}-channel1)`} />
        <svg x="0" y="0" width="2" height="100%" overflow="visible">
          <rect x="0" y="0" width="2" height="100%" fill={`url(#${id}-leg)`} />
        </svg>
        <svg x="5.5" y="0" width="2" height="100%" overflow="visible">
          <rect x="0" y="0" width="2" height="100%" fill={`url(#${id}-leg)`} />
        </svg>
        <svg x="11" y="0" width="2" height="100%" overflow="visible">
          <rect x="0" y="0" width="2" height="100%" fill={`url(#${id}-leg)`} />
        </svg>
        <rect x="0" y="0" width="13" height="100%" fill={`url(#${id}-screws)`} />
        <g className="rail-cap">
          <rect x="0" y="0" width="2" height="0.8" fill="#ffffff" />
          <rect x="5.5" y="0" width="2.0" height="0.8" fill="#ffffff" />
          <rect x="11" y="0" width="2" height="0.8" fill="#ffffff" />
          <rect x="2" y="0" width="3.5" height="1.2" fill="#1d2022" />
          <rect x="7.5" y="0" width="3.5" height="1.2" fill="#1d2022" />
        </g>
      </svg>
  );
}

// Shelf: one folded sheet, straight on. y = 0 is the line the books stand on. The upturned
// ends are seen edge-on and hang inside the near track of each rail, held by a pin that shows
// across both tracks. The front flap hangs 8px down and stops short of the shelf ends.
function Shelf({ id }) {
  return (
      <svg aria-hidden="true" focusable="false" width="100%" height="10" style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id={`${id}-lip`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="8">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.3" stopColor="#f5f4ee" />
            <stop offset="0.75" stopColor="#e6e5dc" />
            <stop offset="0.9" stopColor="#cfcec3" />
            <stop offset="1" stopColor="#aeada2" />
          </linearGradient>
          <linearGradient id={`${id}-deck`} gradientUnits="userSpaceOnUse" x1="0" y1="-4" x2="0" y2="0">
            <stop offset="0" stopColor="#dddcd1" />
            <stop offset="1" stopColor="#ebeae1" />
          </linearGradient>
          <linearGradient id={`${id}-edge`} gradientUnits="userSpaceOnUse" x1="0" y1="-68" x2="0" y2="5">
            <stop offset="0" stopColor="#f7f6f0" />
            <stop offset="1" stopColor="#e3e2d8" />
          </linearGradient>
          <linearGradient id={`${id}-pin`} gradientUnits="userSpaceOnUse" x1="0" y1="-58.9" x2="0" y2="-57.1">
            <stop offset="0" stopColor="#f2f3f3" />
            <stop offset="0.45" stopColor="#c2c5c7" />
            <stop offset="1" stopColor="#7f8486" />
          </linearGradient>
        </defs>
        <rect x="0" y="-4" width="100%" height="4.5" fill={`url(#${id}-deck)`} />
        <rect x="0" y="-4.4" width="100%" height="0.8" fill="#cfcec2" />
        <rect x="-7.5" y="-58.9" width="3.5" height="1.8" fill={`url(#${id}-pin)`} />
        <rect x="-13" y="-58.9" width="3.5" height="1.8" fill={`url(#${id}-pin)`} />
        <rect x="-6.4" y="-68" width="1.4" height="70" rx="0.7" fill={`url(#${id}-edge)`} />
        <rect x="-6.4" y="-67" width="0.45" height="68" fill="#ffffff" opacity="0.85" />
        <rect x="-5.350" y="-67" width="0.35" height="68" fill="#c6c5b9" opacity="0.8" />
        <svg x="100%" overflow="visible" style={{ overflow: 'visible' }}>
          <rect x="4" y="-58.9" width="3.5" height="1.8" fill={`url(#${id}-pin)`} />
          <rect x="9.5" y="-58.9" width="3.5" height="1.8" fill={`url(#${id}-pin)`} />
          <rect x="5.0" y="-68" width="1.4" height="70" rx="0.7" fill={`url(#${id}-edge)`} />
          <rect x="5.0" y="-67" width="0.45" height="68" fill="#ffffff" opacity="0.85" />
          <rect x="6.05" y="-67" width="0.35" height="68" fill="#c6c5b9" opacity="0.8" />
          <path d="M6.4 0 H-0.5 V4.5 Q0 2 2.6 2 H5.6 Q6.4 2 6.4 1.2 Z" fill={`url(#${id}-lip)`} />
          <path d="M5.6 2 H2.6 Q0 2 -0.3 4.2" fill="none" stroke="#b9b8ac" strokeWidth="0.35" opacity="0.55" />
        </svg>
        <path d="M-6.4 0 H0.5 V4.5 Q0 2 -2.6 2 H-5.6 Q-6.4 2 -6.4 1.2 Z" fill={`url(#${id}-lip)`} />
        <path d="M-5.6 2 H-2.6 Q0 2 0.3 4.2" fill="none" stroke="#b9b8ac" strokeWidth="0.35" opacity="0.55" />
        <rect x="0" y="0" width="100%" height="8" rx="3" fill={`url(#${id}-lip)`} />
        <rect x="0" y="0" width="100%" height="4" fill={`url(#${id}-lip)`} />
        <rect x="-4.7" y="0" width="100%" height="0.6" fill="#ffffff" opacity="0.9" />
      </svg>
  );
}

export default function ReadingPage() {
  const [view, setView] = useState('shelf');
  // Nothing is selected to begin with; pressing a book opens its details, pressing it again closes them.
  const [selectedId, setSelectedId] = useState(null);
  const selected = shelfOrder.find((entry) => entry.id === selectedId) || null;
  const bookRefs = useRef({});

  const onBookKeyDown = (event, id) => {
    const index = shelfOrder.findIndex((entry) => entry.id === id);
    let next = null;
    if (event.key === 'Escape' && selectedId) { event.preventDefault(); setSelectedId(null); return; }
    if (event.key === 'ArrowRight') next = shelfOrder[index + 1];
    if (event.key === 'ArrowLeft') next = shelfOrder[index - 1];
    if (event.key === 'Home') next = shelfOrder[0];
    if (event.key === 'End') next = shelfOrder[shelfOrder.length - 1];
    if (!next) return;
    event.preventDefault();
    // Arrow keys move along the shelf; the details follow only while they are open
    if (selectedId) setSelectedId(next.id);
    const node = bookRefs.current[next.id];
    if (node) node.focus();
  };

  return (
    <Layout title="Reading" description="Books and important articles I've read over the years." canonicalPath="/reading" center>
      <main className="reading">
        <header>
          <h1>Reading</h1>
          <p className="intro">Books and important articles I’ve read over the years.</p>
          <div className="view-switch" role="group" aria-label="Reading view">
            <button type="button" aria-pressed={view === 'shelf'} onClick={() => setView('shelf')}>Shelf</button>
            <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')}>List</button>
          </div>
        </header>

        {view === 'shelf' ? (
          <>
            <section aria-label="Books bookshelf">
              <h2>Books</h2>

              <div className="wall">
                <div className="system">
                  {bays.map((bayBooks, bayIndex) => (
                    <div
                      className={[
                        'bay',
                        bayIndex % 2 ? 'bay-b' : 'bay-a',
                        bayIndex === 0 && 'm-first',
                        bayIndex === bays.length - 1 && 'm-last',
                        bayIndex < 2 && 'd-first',
                        bayIndex >= bays.length - 2 && 'd-last',
                      ].filter(Boolean).join(' ')}
                      key={bayIndex}
                    >
                      <span className="upright upright-l" aria-hidden="true"><Rail id={`rail-${bayIndex}-l`} /></span>
                      <span className="upright upright-r" aria-hidden="true"><Rail id={`rail-${bayIndex}-r`} /></span>
                      <div className="tray">
                        <div className="row">
                          {bayBooks.map((entry, bookIndex) => {
                            const spine = spineFor(entry);
                            const bands = spine.bands || [];
                            const topBand = bands.find((band) => band.at === 'top');
                            const bottomBand = bands.find((band) => band.at === 'bottom');
                            const leaning = bayIndex === 0 && bookIndex === 0 && bayBooks.length > 1;
                            const title = (
                              <span
                                className={`spine-title ${spine.label ? 'has-label' : ''}`}
                                style={spine.label ? { background: spine.label.bg, color: spine.label.color } : undefined}
                              >
                                {spine.lines.map((line, lineIndex) => (
                                  <span className="line" key={lineIndex} style={textStyle(line)}>
                                    {line.parts
                                      ? line.parts.map(([text, color], partIndex) => (
                                          <span key={partIndex} style={{ color }}>{text}</span>
                                        ))
                                      : line.t}
                                  </span>
                                ))}
                              </span>
                            );
                            const author = spine.author && spine.author.t ? (
                              <span className="spine-author line" style={textStyle(spine.author)}>{spine.author.t}</span>
                            ) : null;

                            return (
                              <button
                                type="button"
                                key={entry.id}
                                ref={(node) => { bookRefs.current[entry.id] = node; }}
                                className={`book book-${spine.bind || 'paper'} ${leaning ? 'book-lean' : ''}`}
                                style={{
                                  '--bg': entry.color,
                                  '--ink': entry.ink,
                                  '--h': px(spine.h),
                                  '--w': px(spine.w),
                                  '--pt': px(9 + (topBand ? topBand.size : 0)),
                                  '--pb': px(9 + (bottomBand ? bottomBand.size : 0)),
                                  fontFamily: spine.font,
                                }}
                                aria-label={`${entry.title} by ${entry.author}`}
                                aria-pressed={entry.id === selectedId}
                                onClick={() => setSelectedId(entry.id === selectedId ? null : entry.id)}
                                onKeyDown={(event) => onBookKeyDown(event, entry.id)}
                              >
                                <span className={`spine ${spine.creased ? 'spine-creased' : ''}`} aria-hidden="true">
                                  {bands.map((band) => (
                                    <span
                                      key={band.at}
                                      className={`band band-${band.at}`}
                                      style={{ '--band': px(band.size), background: band.color }}
                                    />
                                  ))}
                                  <span className="spine-text">
                                    {spine.flip ? author : title}
                                    {spine.flip ? title : author}
                                  </span>
                                  <span className="spine-light" />
                                </span>
                              </button>
                            );
                          })}
                          {bayIndex % 2 === 1 && <span className="bookend" aria-hidden="true" />}
                        </div>
                        
                        
                        <div className="shelf" aria-hidden="true">
                          <span className="shelf-shadow" />
                          <Shelf id={`shelf-${bayIndex}`} />
                          
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selected && (
              <div className="entry-details" aria-label="Selected book" aria-live="polite">
                <button type="button" className="close" aria-label="Close details" onClick={() => setSelectedId(null)}>
                  <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
                    <path d="M2 2 L10 10 M10 2 L2 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
                <span className={`cover ${selected.coverCrop ? 'cover-cropped' : ''}`} style={coverStyle(selected)}>
                  <img src={selected.cover} alt={`${selected.title} cover`} />
                </span>
                <div>
                  <p className="eyebrow">{selected.author}</p>
                  <h3>{selected.title}</h3>
                  <p className="meta">{metadata(selected)}</p>
                  <p className="description">{selected.description}</p>
                  {selected.url && (
                    <a className="more" href={selected.url} target="_blank" rel="noopener noreferrer">View book ↗</a>
                  )}
                </div>
              </div>
              )}
            </section>

            {categories.filter((type) => type !== 'Book' && type !== 'Audiobook').map((type) => (
              <section key={type}>
                <h2>{type}s</h2>
                {reading.filter((entry) => entry.type === type).map((entry) => (
                  <article className="link-entry" key={entry.id}>
                    <p className="eyebrow">{[entry.author, entry.publication].filter(Boolean).join(' · ')}</p>
                    <h3><a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.title} ↗</a></h3>
                    <p className="description">{entry.description}</p>
                  </article>
                ))}
              </section>
            ))}
          </>
        ) : (
          <div aria-label="Reading list">
            {categories.map((type) => (
              <section key={type}>
                <h2>{type}s</h2>
                {reading.filter((entry) => entry.type === type).map((entry) => (
                  <article key={entry.id} className={`list-entry ${entry.cover ? 'with-cover' : ''}`}>
                    {entry.cover && <span className={`cover ${entry.coverCrop ? 'cover-cropped' : ''}`} style={coverStyle(entry)}><img src={entry.cover} alt={`${entry.title} cover`} loading="lazy" /></span>}
                    <div>
                      <p className="eyebrow">{entry.author}</p>
                      <h3>
                        {entry.url
                          ? <a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.title}</a>
                          : entry.title}
                      </h3>
                      <p className="meta">{metadata(entry)}</p>
                      <p className="description">{entry.description}</p>
                    </div>
                  </article>
                ))}
              </section>
            ))}
          </div>
        )}
      </main>

      <style jsx>{`
        /* ---------- Page chrome: same language as /objects ---------- */
        header { margin-bottom: 40px; }
        h1 { margin: 0 0 12px; }
        .intro { color: #666; margin: 0; font-size: 16px; line-height: 1.6; }
        section { margin-bottom: 48px; }
        h2 { font-size: 20px; margin: 0 0 20px; padding-bottom: 10px; border-bottom: 1px solid #eaeaea; }
        h3 { font-size: 18px; font-weight: 600; color: #000; margin: 0 0 6px; line-height: 1.4; letter-spacing: -0.01em; }
        h3 a { color: inherit; text-decoration: none; }
        h3 a:hover { text-decoration: underline; }
        .eyebrow { font-size: 13px; color: #666; font-weight: 500; letter-spacing: 0.01em; margin: 0 0 4px; }
        .meta { font-size: 13px; color: #666; margin: 0 0 10px; }
        .description { font-size: 14px; line-height: 1.6; margin: 0 0 10px; }
        .more { font-size: 13px; }

        .view-switch { display: flex; gap: 20px; margin-top: 24px; }
        .view-switch button { font: inherit; background: none; border: 0; border-bottom: 2px solid transparent; padding: 0 0 8px; color: #666; cursor: pointer; }
        .view-switch button[aria-pressed='true'] { color: #202020; border-bottom-color: #202020; }
        .view-switch button:focus-visible, a:focus-visible { outline: 2px solid #333; outline-offset: 4px; border-radius: 2px; }

        /* ---------- Wall: a cropped view of a 606 run ---------- */
        .wall {
          --s: 1;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          padding: 0 16px;
          background: linear-gradient(100deg, #f7f6f3 0%, #f3f2ee 55%, #eeede8 100%);
        }
        .system { display: flex; flex-direction: column; max-width: 300px; margin: 0 auto; }
        .bay { position: relative; min-width: 0; padding-left: 15px; padding-right: 15px; }
        .bay { padding-top: 18px; padding-bottom: 26px; }
        .bay.m-first { padding-top: 40px; }
        .bay.m-last { padding-bottom: 46px; }

        /* Aluminium E-track, drawn as explicit SVG faces by Rail above, straight on: two 4px flanges
           either side of an open 5px channel, 13px in all. Each tray stops 2px short of the rail and
           its pins bridge that gap, so trays sit 17px apart across a shared rail.
           Stacked bays share continuous rails; side by side they share the middle one. */
        .upright {
          position: absolute; top: 0; bottom: -1px; width: 13px;
          background:
            none;
            
            
          filter: drop-shadow(0 1px 1.5px rgba(40, 38, 30, 0.16));
        }
        .upright-l { left: 0; }
        .upright-r { right: 0; }
        /* Stacked: the rails run unbroken from the upper bay into the lower one */
        .m-first .upright { top: 16px; }
        .m-last .upright { bottom: 14px; }
        .bay:not(.m-first) .upright :global(.rail-cap) { display: none; }

        /* ---------- Shelf: thin folded tray, seen straight on ---------- */
        .tray { position: relative; }
        .row {
          position: relative; z-index: 2;
          display: flex; align-items: flex-end; gap: 1px;
          height: calc(204px * var(--s));
          /* Books sit right against the upturned shelf ends, which hang in the rail tracks */
          padding: 0; margin: 0 -4.6px;
        }
        .bay-a .row { justify-content: flex-end; }
        .bay-b .row { justify-content: flex-start; }

        .shelf { position: relative; z-index: 1; height: 10px; }
        /* Soft shadow the shelf casts on the wall, straight down */
        .shelf-shadow {
          position: absolute; left: -6px; right: -6px; top: 6px; height: 40px;
          filter: blur(2.5px);
          background: linear-gradient(rgba(64, 62, 55, 0.58), rgba(64, 62, 55, 0.36) 22%, rgba(64, 62, 55, 0.12) 60%, rgba(64, 62, 55, 0));
        }


        /* ---------- Books ---------- */
        .book {
          appearance: none; -webkit-appearance: none;
          position: relative; flex: 0 0 auto;
          width: calc(var(--w) * var(--s));
          height: calc(var(--h) * var(--s));
          margin: 0; padding: 0; border: 0; background: none;
          font: inherit; color: var(--ink);
          cursor: pointer;
          border-radius: 1px;
          box-shadow: 5px 1px 7px rgba(30, 28, 20, 0.17);
          transition: translate 180ms ease;
          -webkit-tap-highlight-color: transparent;
          user-select: none; -webkit-user-select: none;
        }
        /* Top of the page block, just visible from above */
        .book::before {
          content: ''; position: absolute; left: 0; right: 0; bottom: calc(100% - 1px);
          height: calc(4px * var(--s));
          border-radius: 1px 1px 0 0;
          background: linear-gradient(90deg, var(--bg) 0 1px, #cbc5b6 1px 1.75px, #ebe6d9 1.75px calc(100% - 1.75px), #cbc5b6 calc(100% - 1.75px) calc(100% - 1px), var(--bg) calc(100% - 1px));
          filter: brightness(0.93);
        }
        .book-hard::before, .book-cloth::before {
          background: linear-gradient(90deg, var(--bg) 0 2px, #bdb7a8 2px 3px, #ebe6d9 3px calc(100% - 3px), #bdb7a8 calc(100% - 3px) calc(100% - 2px), var(--bg) calc(100% - 2px));
        }
        /* Contact shadow on the tray */
        .book::after {
          content: ''; position: absolute; left: 0; right: 0; top: 100%; height: 2px;
          background: linear-gradient(rgba(30, 28, 20, 0.26), rgba(30, 28, 20, 0));
          pointer-events: none;
        }
        .book-lean { rotate: 5deg; transform-origin: 100% 100%; margin-right: calc(var(--h) * var(--s) * 0.087); }
        .book-lean::after { display: none; }

        .book:hover { translate: 0 -2px; }
        .book[aria-pressed='true'] { translate: 0 -6px; }
        .book[aria-pressed='true']::after, .book:hover::after { opacity: 0; }
        .book:focus-visible { outline: 2px solid #333; outline-offset: 3px; z-index: 3; }

        .spine {
          position: absolute; inset: 0; overflow: hidden; display: block;
          background-color: var(--bg);
          border-radius: 1px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 0 rgba(0, 0, 0, 0.16);
        }
        .book-hard .spine, .book-cloth .spine { border-radius: 2.5px 2.5px 1px 1px / 2px 2px 1px 1px; }

        /* Light from upper left: flat card for paperbacks, rounded back for hardcovers */
        .spine-light {
          position: absolute; inset: 0; pointer-events: none;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 16%, rgba(0, 0, 0, 0) 78%, rgba(0, 0, 0, 0.1)),
            linear-gradient(90deg, rgba(0, 0, 0, 0.16) 0, rgba(255, 255, 255, 0.12) 9%, rgba(255, 255, 255, 0) 38%, rgba(0, 0, 0, 0.03) 84%, rgba(0, 0, 0, 0.22) 100%);
        }
        .book-hard .spine-light {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 14%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.1)),
            linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0, rgba(0, 0, 0, 0.05) 10%, rgba(255, 255, 255, 0.2) 30%, rgba(255, 255, 255, 0.03) 54%, rgba(0, 0, 0, 0.1) 86%, rgba(0, 0, 0, 0.34) 100%);
        }
        .book-cloth .spine-light {
          background:
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0 1px, rgba(0, 0, 0, 0.03) 1px 2px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.26) 0, rgba(0, 0, 0, 0.04) 10%, rgba(255, 255, 255, 0.12) 30%, rgba(255, 255, 255, 0.02) 54%, rgba(0, 0, 0, 0.08) 86%, rgba(0, 0, 0, 0.3) 100%);
        }
        /* A read paperback: fine reading creases down the spine */
        .spine-creased .spine-light {
          background:
            linear-gradient(90deg, rgba(255, 255, 255, 0) 24%, rgba(255, 255, 255, 0.26) 25%, rgba(255, 255, 255, 0) 28%, rgba(255, 255, 255, 0) 69%, rgba(255, 255, 255, 0.18) 70%, rgba(255, 255, 255, 0) 73%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 16%, rgba(0, 0, 0, 0) 78%, rgba(0, 0, 0, 0.1)),
            linear-gradient(90deg, rgba(0, 0, 0, 0.16) 0, rgba(255, 255, 255, 0.12) 9%, rgba(255, 255, 255, 0) 38%, rgba(0, 0, 0, 0.03) 84%, rgba(0, 0, 0, 0.22) 100%);
        }

        .band { position: absolute; left: 0; right: 0; height: calc(var(--band) * var(--s)); }
        .band-top { top: 0; }
        .band-bottom { bottom: 0; }

        .spine-text {
          position: absolute; left: 0; right: 0;
          top: calc(var(--pt) * var(--s)); bottom: calc(var(--pb) * var(--s));
          display: flex; justify-content: space-between; align-items: center;
          writing-mode: vertical-rl;
        }
        .spine-title, .spine-author { flex: 0 0 auto; }
        .spine-title { display: block; }
        .spine-title.has-label { padding: 4px 1.5px; border-radius: 0.5px; }
        .line { display: block; white-space: nowrap; font-size: calc(var(--fs) * var(--s)); line-height: 1.15; }
        .spine-author { opacity: 0.92; }

        /* Plain bent-steel bookend, edge-on */
        .bookend {
          position: relative; flex: 0 0 3px; width: 3px; margin-left: 2px;
          height: calc(78px * var(--s));
          border-radius: 2px 2px 0 0;
          background: linear-gradient(90deg, #f4f3ec, #dddcd0 55%, #c4c3b6);
          box-shadow: 4px 1px 5px rgba(30, 28, 20, 0.16);
        }
        .bookend::after {
          content: ''; position: absolute; left: 100%; bottom: 0; width: 13px; height: 2px;
          border-radius: 0 1px 0 0;
          background: linear-gradient(#fbfaf8, #dddcd5);
          box-shadow: 0 1px 1px rgba(30, 28, 20, 0.18);
        }

        /* ---------- Selected book / list ---------- */
        /* Stays in view at the bottom of the window while the shelves scroll past */
        .entry-details {
          display: grid; grid-template-columns: 76px 1fr; gap: 22px; align-items: start;
          position: sticky; bottom: 0; z-index: 5;
          margin-top: 12px; padding: 16px 32px 16px 0; min-height: 150px;
          background: #fff;
        }
        .close {
          appearance: none; -webkit-appearance: none;
          position: absolute; top: 10px; right: -6px;
          display: grid; place-items: center; width: 28px; height: 28px;
          margin: 0; padding: 0; border: 0; border-radius: 50%; background: none;
          color: #888; cursor: pointer;
        }
        .close:hover { color: #222; background: #f2f2f0; }
        .close:focus-visible { outline: 2px solid #333; outline-offset: 1px; }
        .cover { display: block; width: 100%; height: auto; border-radius: 1px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.14), 2px 4px 10px rgba(0, 0, 0, 0.1); }
        .cover img { display: block; width: 100%; height: auto; }
        .cover-cropped { position: relative; overflow: hidden; }
        .cover-cropped img { position: absolute; width: var(--cover-width); max-width: none; left: var(--cover-left); top: var(--cover-top); }
        .link-entry { margin-bottom: 24px; }
        .link-entry:last-child { margin-bottom: 0; }
        .list-entry { padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid #eaeaea; }
        .list-entry:last-child { border-bottom: 0; margin-bottom: 0; padding-bottom: 0; }
        .with-cover { display: grid; grid-template-columns: 76px 1fr; gap: 22px; align-items: start; }

        /* ---------- Small phones ---------- */
        @media (max-width: 359px) {
          .wall { --s: 0.85; padding: 0 8px; }
        }
        @media (max-width: 450px) {
          .entry-details, .with-cover { grid-template-columns: 60px 1fr; gap: 16px; }
        }
        /* Phones: the details are a sheet across the bottom of the screen, not part of the column */
        @media (max-width: 600px) {
          .entry-details {
            position: fixed; left: 0; right: 0; bottom: 0;
            margin: 0; min-height: 0;
            padding: 14px 44px calc(14px + env(safe-area-inset-bottom)) 16px;
            border-top: 1px solid #e6e5e0;
            box-shadow: 0 -6px 18px rgba(30, 28, 20, 0.08);
          }
          .entry-details .description {
            display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
          }
          .close { top: 8px; right: 8px; }
        }

        /* ---------- Two bays side by side: one continuous shelf line ---------- */
        @media (min-width: 601px) {
          .wall { --s: 0.85; padding: 0 28px; }
          .system { flex-direction: row; flex-wrap: wrap; max-width: none; }
          .bay { flex: 0 0 calc(50% + 6.5px); }
          .bay-b { margin-left: -13px; }
          .bay-b .upright-l { display: none; }
          /* Shelves stack in pairs; the rails run unbroken from the top pair to the bottom one */
          .bay, .bay.m-first, .bay.m-last { padding-top: 22px; padding-bottom: 28px; }
          .bay.d-first { padding-top: 56px; }
          .bay.d-last { padding-bottom: 52px; }
          .bay .upright { top: 0; bottom: -1px; }
          .bay.d-first .upright { top: 18px; }
          .bay.d-last .upright { bottom: 16px; }
          .bay .upright :global(.rail-cap) { display: none; }
          .bay.d-first .upright :global(.rail-cap) { display: inline; }
          /* Both trays hang at the same height on the shared E-track; bays overlap 13px so the 17px joint holds one rail with a 2px gap either side, its top and bottom ends inside the wall. */
        }

        @media (prefers-reduced-motion: reduce) {
          .book { transition: none; }
        }
      `}</style>
    </Layout>
  );
}
