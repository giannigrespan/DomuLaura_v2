import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface GalleryImage { url: string; alt: string; category?: string; }

const CATEGORY_KEYS: Record<string, string> = {
  'Esterni': 'gallery.categories.exteriors',
  'Camere': 'gallery.categories.bedrooms',
  'Cucina e Soggiorno': 'gallery.categories.kitchenLiving',
  'Bagno': 'gallery.categories.bathroom',
};

const GALLERY_IMAGES: GalleryImage[] = [
  { url: '/esterno-cortile.webp',       alt: 'Ingresso esterno', category: 'Esterni' },
  { url: '/appfuori_web.jpg',            alt: 'Esterno con ulivo', category: 'Esterni' },
  { url: '/terrazzo1.jpg',               alt: 'Terrazzo panoramico', category: 'Esterni' },
  { url: '/1765898323307_web.jpg',       alt: 'Cucina attrezzata', category: 'Cucina e Soggiorno' },
  { url: '/1765897883897_web.jpg',       alt: 'Cucina dettaglio', category: 'Cucina e Soggiorno' },
  { url: '/1765897703169_web.jpg',       alt: 'Camera da letto', category: 'Camere' },
  { url: '/camera2.jpg',                 alt: 'Camera da letto', category: 'Camere' },
  { url: '/bagno-1.webp',                alt: 'Bagno', category: 'Bagno' },
];

export const Gallery: React.FC = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string>('Tutte');
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const translateCat = (cat: string) =>
    cat === 'Tutte' ? t('gallery.categories.all') : t(CATEGORY_KEYS[cat] || cat);

  const categories = ['Tutte', ...Array.from(new Set(GALLERY_IMAGES.map(i => i.category).filter(Boolean) as string[]))];
  const filtered = selected === 'Tutte' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(i => i.category === selected);

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
          {/* Category filters */}
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

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px">
          {filtered.map((img, i) => (
            <div
              key={i}
              className={`img-zoom cursor-pointer reveal reveal-d${(i % 4) + 1} ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
              style={{ aspectRatio: i === 0 ? 'auto' : '4/3' }}
              onClick={() => setLightbox(img)}
            >
              <div className="relative w-full h-full" style={{ minHeight: i === 0 ? '400px' : '180px' }}>
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3 bg-sardinia-dark/80 backdrop-blur-sm px-3 py-1 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-[10px] tracking-wider uppercase">{img.category && translateCat(img.category)}</span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-sardinia-terra/0 hover:bg-sardinia-terra/20 transition-colors duration-300 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
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
          <button className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light">✕</button>
          <img src={lightbox.url} alt={lightbox.alt} className="max-h-[90vh] max-w-[90vw] object-contain" />
        </div>
      )}
    </section>
  );
};
