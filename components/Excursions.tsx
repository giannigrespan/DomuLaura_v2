import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Excursion { translationKey: string; image: string; distance: string; category: 'beaches' | 'natureMountain' | 'cultureHistory' | 'activities'; duration?: string; }

const EXCURSIONS: Excursion[] = [
  { translationKey: 'excursions.places.laCaletta',       image: '/lacaletta.jpg',     distance: '3 km',  category: 'beaches',        duration: '5 min'    },
  { translationKey: 'excursions.places.calaGoloritze',  image: '/calagoloritze.jpg', distance: '50 km', category: 'beaches',        duration: '1 ora'    },
  { translationKey: 'excursions.places.berchida',        image: '/berchida.jpg',      distance: '12 km', category: 'beaches',        duration: '18 min'   },
  { translationKey: 'excursions.places.calaBrandinchi',  image: '/Cala-Brandinchi.webp', distance: '14 km', category: 'beaches',    duration: '20 min'   },
  { translationKey: 'excursions.places.laCinta',         image: '/lacinta1.jpg',      distance: '10 km', category: 'beaches',        duration: '15 min'   },
{ translationKey: 'excursions.places.gorropu',         image: '/gorroppu.jpg',      distance: '60 km', category: 'activities',     duration: '1h 15min' },
];

export const Excursions: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const uniqueCats = Array.from(new Set(EXCURSIONS.map(e => e.category)));
  const categories = ['all', ...uniqueCats];
  const filtered = selectedCat === 'all' ? EXCURSIONS : EXCURSIONS.filter(e => e.category === selectedCat);

  return (
    <section id="excursions" className="py-16 md:py-28 bg-sardinia-sand">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-14">
          <div className="reveal">
            <p className="text-sardinia-terra text-[11px] tracking-[0.25em] uppercase mb-4">Intorno a noi</p>
            <h2 className="font-serif text-sardinia-dark font-light leading-tight" style={{ fontSize: 'clamp(32px,4vw,50px)' }}>
              {t('excursions.title')}<br />
              <em className="italic text-sardinia-sea">{t('excursions.subtitle').split(',')[0]}</em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 reveal reveal-d1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-1.5 text-xs tracking-widest uppercase font-medium transition-colors duration-200 ${
                  selectedCat === cat
                    ? 'bg-sardinia-dark text-white'
                    : 'border border-sardinia-muted/40 text-sardinia-muted hover:border-sardinia-dark hover:text-sardinia-dark'
                }`}
              >
                {t(`excursions.categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-sardinia-muted/20">
          {filtered.map((exc, i) => (
            <div
              key={i}
              className={`bg-sardinia-sand group overflow-hidden reveal reveal-d${(i % 3) + 1}`}
            >
              <div className="img-zoom aspect-[4/3] bg-sardinia-muted/20">
                <img
                  src={exc.image}
                  alt={t(`${exc.translationKey}.name`)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sardinia-terra text-[10px] tracking-[0.2em] uppercase font-medium">
                    {t(`excursions.categories.${exc.category}`)}
                  </span>
                  <div className="flex items-center gap-3 text-sardinia-muted text-xs">
                    <span>📍 {exc.distance}</span>
                    {exc.duration && <span>⏱ {exc.duration}</span>}
                  </div>
                </div>
                <h3 className="font-serif text-sardinia-dark text-xl font-light mb-2">
                  {t(`${exc.translationKey}.name`)}
                </h3>
                <p className="text-sardinia-muted text-xs leading-relaxed">
                  {t(`${exc.translationKey}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips box */}
        <div className="mt-12 border-l-2 border-sardinia-terra pl-6 py-2 reveal">
          <h4 className="text-sardinia-dark font-medium text-sm mb-2">{t('excursions.excursionTips')}</h4>
          <p
            className="text-sardinia-muted text-xs leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('excursions.excursionTipsText') }}
          />
        </div>
      </div>
    </section>
  );
};
