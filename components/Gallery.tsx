import React, { useState, useEffect, useCallback } from 'react';
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
  { url: '/esterno-cortile.webp',                      alt: 'Ingresso esterno',              category: 'Esterni' },
  { url: '/esterno-ingresso.webp',                     alt: 'Ingresso',                      category: 'Esterni' },
  { url: '/buone/vista da fuori.jpg',                  alt: 'Vista esterna',                 category: 'Esterni' },
  { url: '/buone/terrazzo 1 con tavola piena.webp',    alt: 'Terrazzo coperto con tavolo',   category: 'Esterni' },
  // Cucina e Soggiorno
  { url: '/buone/cucina da divano.webp',               alt: 'Cucina e soggiorno open space', category: 'Cucina e Soggiorno' },
  { url: '/buone/cucina da ingresso.webp',             alt: "Cucina vista dall'ingresso",    category: 'Cucina e Soggiorno' },
  // Camere
  { url: '/buone/camera1 quadri.webp',                 alt: 'Camera con quadri e trittico',  category: 'Camere' },
  { url: '/buone/camera2 con quadro.webp',             alt: 'Camera con trittico marino',    category: 'Camere' },
  { url: '/buone/camera1 coralli.webp',                alt: 'Camera con quadri corallo',     category: 'Camere' },
  // Bagno
  { url: '/buone/Bagno collage.webp',                  alt: 'Bagno completo',                category: 'Bagno' },
  { url: '/buone/pianta bagno.jpg',                    alt: 'Dettaglio bagno',               category: 'Bagno' },
  // Dettagli
  { url: '/buone/7g.jpg',                              alt: 'Targa in ceramica sarda',       category: 'Dettagli' },
  { url: '/buone/oggetti.jpg',                         alt: 'Oggetti decorativi',            category: 'Dettagli' },
  { url: '/buone/plafoniera.jpg',                      alt: 'Plafoniera',                    category: 'Dettagli' },
  { url: '/buone/specchio e plafoniera.jpg',           alt: 'Specchio e plafoniera',         category: 'Dettagli' },
];

export const Gallery: React.FC = () => {
  const { t } = useTranslation();
  const [selected, setSelected]       = useState('Tutte');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const translateCat = (cat: string) =>
    cat === 'Tutte' ? t('gallery.categories.all') : t(CATEGORY_KEYS[cat] || cat);

  const categories = ['Tutte', ...Array.from(new Set(GALLERY_IMAGES.map(i => i.category).filter(Boolean) as string[]))];
  const filtered   = selected === 'Tutte' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(i => i.category === selected);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const goTo = useCallback((dir: 1 | -1) => {
    setLightboxIdx(prev => {
      if (prev === null) return null;
      return (prev + dir + filtered.length) % filtered.length;
    });
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(1);
      else if (e.key === 'ArrowLeft') goTo(-1);
      else if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, goTo, closeLightbox]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIdx]);

  const currentImg = lightboxIdx !== null ? filtered[lightboxIdx] : null;

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

        {/* Image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setLightboxIdx(i)}
              className="img-zoom relative block aspect-[4/3] bg-sardinia-muted/20 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sardinia-accent"
              aria-label={img.alt}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* hover overlay */}
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {currentImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={currentImg.alt}
        >
          {/* Blurred background */}
          <img
            src={currentImg.url}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-25 pointer-events-none select-none"
          />

          {/* Main image */}
          <img
            src={currentImg.url}
            alt={currentImg.alt}
            className="relative z-10 max-h-[88vh] max-w-[88vw] object-contain select-none shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />

          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white transition-colors"
            onClick={closeLightbox}
            aria-label="Chiudi"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); goTo(-1); }}
            aria-label="Precedente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); goTo(1); }}
            aria-label="Successiva"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter + caption */}
          <div className="absolute bottom-5 left-0 right-0 z-20 flex flex-col items-center gap-1 pointer-events-none">
            {currentImg.alt && (
              <p className="text-white/80 text-sm font-light tracking-wide">{currentImg.alt}</p>
            )}
            <p className="text-white/40 text-[11px] tracking-widest uppercase">
              {lightboxIdx! + 1} / {filtered.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
