import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface GalleryImage { url: string; alt: string; category?: string; }

const CATEGORY_KEYS: Record<string, string> = {
  'Esterni':            'gallery.categories.exteriors',
  'Camere':             'gallery.categories.bedrooms',
  'Cucina e Soggiorno': 'gallery.categories.kitchenLiving',
  'Bagno':              'gallery.categories.bathroom',
  'Dettagli':           'gallery.categories.details',
};

const GALLERY_IMAGES: GalleryImage[] = [
  // Esterni
  { url: '/esterno-cortile.webp',                     alt: 'Ingresso esterno',              category: 'Esterni' },
  { url: '/esterno-ingresso.webp',                    alt: 'Ingresso',                      category: 'Esterni' },
  { url: '/appfuori_web.jpg',                         alt: 'Esterno con ulivo',             category: 'Esterni' },
  { url: '/buone/vista da fuori.jpg',                 alt: 'Vista esterna',                 category: 'Esterni' },
  { url: '/buone/vista giardino.jpg',                 alt: 'Vista giardino',                category: 'Esterni' },
  { url: '/buone/vista alberi.jpg',                   alt: 'Vista degli alberi',            category: 'Esterni' },
  { url: '/buone/terrazzo 1 con tavola piena.png',    alt: 'Terrazzo coperto con tavolo',   category: 'Esterni' },
  { url: '/buone/terrazzo con tavolo.jpg',            alt: 'Terrazzo con tavolo',           category: 'Esterni' },
  // Cucina e Soggiorno
  { url: '/buone/cucina da divano.png',               alt: 'Cucina e soggiorno open space', category: 'Cucina e Soggiorno' },
  { url: '/buone/cucina da ingresso.png',             alt: "Cucina vista dall'ingresso",    category: 'Cucina e Soggiorno' },
  // Camere
  { url: '/buone/camera1 quadri.png',                 alt: 'Camera con quadri e trittico',  category: 'Camere' },
  { url: '/buone/camera2 con quadro.png',             alt: 'Camera con trittico marino',    category: 'Camere' },
  { url: '/buone/camera1 coralli.png',                alt: 'Camera con quadri corallo',     category: 'Camere' },
  // Bagno
  { url: '/buone/Bagno collage.png',                  alt: 'Bagno completo',                category: 'Bagno' },
  { url: '/buone/pianta bagno.jpg',                   alt: 'Dettaglio bagno',               category: 'Bagno' },
  // Dettagli
  { url: '/buone/7g.jpg',                             alt: 'Targa in ceramica sarda',       category: 'Dettagli' },
  { url: '/buone/oggetti.jpg',                        alt: 'Oggetti decorativi',            category: 'Dettagli' },
  { url: '/buone/plafoniera.jpg',                     alt: 'Plafoniera',                    category: 'Dettagli' },
  { url: '/buone/specchio e plafoniera.jpg',          alt: 'Specchio e plafoniera',         category: 'Dettagli' },
];

const INTERVAL_MS = 4500;
const FADE_MS     = 600;

export const Gallery: React.FC = () => {
  const { t } = useTranslation();
  const [selected, setSelected]   = useState('Tutte');
  const [idx, setIdx]             = useState(0);
  const [visible, setVisible]     = useState(true);

  // Refs so interval callbacks always see the latest values
  const idxRef          = useRef(0);
  const filteredLenRef  = useRef(GALLERY_IMAGES.length);
  const fadingRef       = useRef(false);
  const fadeTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  const translateCat = (cat: string) =>
    cat === 'Tutte' ? t('gallery.categories.all') : t(CATEGORY_KEYS[cat] || cat);

  const categories = ['Tutte', ...Array.from(new Set(GALLERY_IMAGES.map(i => i.category).filter(Boolean) as string[]))];
  const filtered   = selected === 'Tutte' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(i => i.category === selected);
  filteredLenRef.current = filtered.length;

  const fadeTo = useCallback((newIdx: number) => {
    if (fadingRef.current) return;
    fadingRef.current = true;
    setVisible(false);
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    fadeTimerRef.current = setTimeout(() => {
      idxRef.current = newIdx;
      setIdx(newIdx);
      setVisible(true);
      fadingRef.current = false;
    }, FADE_MS);
  }, []);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      fadeTo((idxRef.current + 1) % filteredLenRef.current);
    }, INTERVAL_MS + FADE_MS * 2);
  }, [fadeTo]);

  // Mount: start auto-advance
  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [startInterval]);

  // Category change: reset to first slide
  useEffect(() => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    fadingRef.current = false;
    idxRef.current = 0;
    setIdx(0);
    setVisible(true);
    startInterval();
  }, [selected, startInterval]);

  const handleNav = (dir: 1 | -1) => {
    fadeTo((idxRef.current + dir + filteredLenRef.current) % filteredLenRef.current);
    startInterval();
  };

  const img = filtered[idx] ?? filtered[0];

  return (
    <section id="gallery" className="py-16 md:py-28 bg-sardinia-dark">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal">
          <div>
            <p className="text-sardinia-accent text-[11px] tracking-[0.25em] uppercase mb-3">Galleria</p>
            <h2 className="font-serif text-white font-light" style={{ fontSize: 'clamp(32px,4vw,48px)' }}>
              {t('gallery.title')}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`px-4 py-1.5 text-xs tracking-widest uppercase font-medium transition-colors duration-200 ${
                  selected === cat
                    ? 'bg-sardinia-terra text-white'
                    : 'border border-white/20 text-white/50 hover:text-white hover:border-white/50'
                }`}
              >
                {translateCat(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Slideshow */}
        <div
          className="relative overflow-hidden bg-black"
          style={{ height: 'clamp(320px,65vh,760px)' }}
        >
          {img && (
            <img
              src={img.url}
              alt={img.alt}
              className="absolute inset-0 w-full h-full object-contain select-none"
              style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
              draggable={false}
            />
          )}

          {/* Counter */}
          <div className="absolute bottom-8 left-8">
            <p className="text-white/40 text-[11px] tracking-widest uppercase">{idx + 1} / {filtered.length}</p>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15">
            <div
              className="h-full bg-sardinia-accent"
              style={{
                width: `${((idx + 1) / filtered.length) * 100}%`,
                transition: `width ${FADE_MS}ms ease`,
              }}
            />
          </div>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/25 hover:bg-black/55 text-white transition-colors"
            onClick={() => handleNav(-1)}
            aria-label="Precedente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/25 hover:bg-black/55 text-white transition-colors"
            onClick={() => handleNav(1)}
            aria-label="Successiva"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};
