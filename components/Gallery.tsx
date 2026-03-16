import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface GalleryImage { url: string; alt: string; category?: string; }

const CATEGORY_KEYS: Record<string, string> = {
  'Esterni':          'gallery.categories.exteriors',
  'Camere':           'gallery.categories.bedrooms',
  'Cucina e Soggiorno': 'gallery.categories.kitchenLiving',
  'Bagno':            'gallery.categories.bathroom',
};

const GALLERY_IMAGES: GalleryImage[] = [
  { url: '/esterno-cortile.webp',     alt: 'Ingresso esterno',        category: 'Esterni' },
  { url: '/esterno-ingresso.webp',    alt: 'Ingresso',                category: 'Esterni' },
  { url: '/appfuori_web.jpg',         alt: 'Esterno con ulivo',       category: 'Esterni' },
  { url: '/terrazzo1.jpg',            alt: 'Terrazzo panoramico',     category: 'Esterni' },
  { url: '/terrazzino-1.webp',        alt: 'Terrazzino',              category: 'Esterni' },
  { url: '/cucina-1.webp',            alt: 'Cucina attrezzata',       category: 'Cucina e Soggiorno' },
  { url: '/cucina-2.webp',            alt: 'Cucina dettaglio',        category: 'Cucina e Soggiorno' },
  { url: '/1765898323307_web.jpg',    alt: 'Cucina e soggiorno',      category: 'Cucina e Soggiorno' },
  { url: '/1765897883897_web.jpg',    alt: 'Soggiorno',               category: 'Cucina e Soggiorno' },
  { url: '/camera-1.webp',            alt: 'Camera da letto',         category: 'Camere' },
  { url: '/1765897703169_web.jpg',    alt: 'Camera matrimoniale',     category: 'Camere' },
  { url: '/camera2.jpg',             alt: 'Seconda camera',          category: 'Camere' },
  { url: '/bagno-1.webp',            alt: 'Bagno',                   category: 'Bagno' },
];

export const Gallery: React.FC = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string>('Tutte');
  const [lightbox, setLightbox] = useState<{ img: GalleryImage; idx: number } | null>(null);

  const translateCat = (cat: string) =>
    cat === 'Tutte' ? t('gallery.categories.all') : t(CATEGORY_KEYS[cat] || cat);

  const categories = ['Tutte', ...Array.from(new Set(GALLERY_IMAGES.map(i => i.category).filter(Boolean) as string[]))];
  const filtered = selected === 'Tutte' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(i => i.category === selected);

  const navigate = (dir: 1 | -1) => {
    if (!lightbox) return;
    const next = (lightbox.idx + dir + filtered.length) % filtered.length;
    setLightbox({ img: filtered[next], idx: next });
  };

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

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-1">
          {filtered.map((img, i) => (
            <div
              key={img.url}
              className={`break-inside-avoid mb-1 img-zoom cursor-pointer group reveal reveal-d${(i % 4) + 1}`}
              onClick={() => setLightbox({ img, idx: i })}
            >
              <div className="relative">
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-auto block"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-6 text-white/60 hover:text-white text-3xl font-light z-10"
            onClick={() => setLightbox(null)}
          >✕</button>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/25 text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <img
            src={lightbox.img.url}
            alt={lightbox.img.alt}
            className="max-h-[90vh] max-w-[calc(100vw-120px)] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/25 text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest">
            {lightbox.idx + 1} / {filtered.length}
          </div>
        </div>
      )}
    </section>
  );
};
