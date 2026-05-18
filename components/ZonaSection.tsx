import React from 'react';
import { useTranslation } from 'react-i18next';

interface Beach {
  key: string;
  image: string | null;
  distance: string;
  isolaMeaUrl: string;
}

const BEACHES: Beach[] = [
  { key: 'laCaletta',     image: '/spiaggia_la_caletta_siniscola.jpg',    distance: '3 km',  isolaMeaUrl: 'https://www.isolamea.it/spiaggia/la-caletta/' },
  { key: 'berchida',      image: '/berchida.jpg',                          distance: '12 km', isolaMeaUrl: 'https://www.isolamea.it/spiaggia/berchida/' },
  { key: 'capoComino',    image: '/capocomino.jpg',                          distance: '10 km', isolaMeaUrl: 'https://www.isolamea.it/spiaggia/capo-comino/' },
  { key: 'sanGiovanni',   image: '/slide1.jpg',                             distance: '6 km',  isolaMeaUrl: 'https://www.isolamea.it/spiaggia/san-giovanni-di-posada/' },
  { key: 'calaBrandinchi',image: '/spiaggia-cala-brandinchi-panoramica.webp', distance: '14 km', isolaMeaUrl: 'https://www.isolamea.it/spiaggia/cala-brandinchi/' },
  { key: 'laCinta',       image: '/lacinta1.jpg',                           distance: '10 km', isolaMeaUrl: 'https://www.isolamea.it/spiaggia/spiaggia-della-cinta-san-teodoro/' },
];

const WaveIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 48 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" d="M0 16 C8 6,16 6,24 16 C32 26,40 26,48 16" />
    <path strokeLinecap="round" strokeOpacity={0.5} d="M0 10 C8 0,16 0,24 10 C32 20,40 20,48 10" />
  </svg>
);

export const ZonaSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="zona" className="py-16 md:py-28 bg-sardinia-cream">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-16">
          <div className="reveal">
            <p className="text-sardinia-terra text-[11px] tracking-[0.25em] uppercase mb-4">
              {t('zona.label')}
            </p>
            <h2 className="font-serif text-sardinia-dark font-light leading-tight mb-6" style={{ fontSize: 'clamp(32px,4vw,50px)' }}>
              {t('zona.title')}<br />
              <em className="italic text-sardinia-sea">{t('zona.titleAccent')}</em>
            </h2>
            <p className="text-sardinia-muted text-sm leading-relaxed max-w-md">
              {t('zona.description')}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 border border-sardinia-sea/30 px-4 py-2">
              <svg className="w-4 h-4 text-sardinia-sea" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
              </svg>
              <span className="text-sardinia-sea text-[10px] tracking-[0.2em] uppercase font-medium">
                {t('zona.unescoLabel')}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-px bg-sardinia-muted/20 reveal reveal-d1">
            {[
              { value: '9', label: t('zona.statBeaches') },
              { value: '30', label: t('zona.statCoast') },
              { value: '★', label: t('zona.statUnescoShort') },
            ].map((s) => (
              <div key={s.label} className="bg-sardinia-cream px-4 py-6 text-center">
                <p className="font-serif text-sardinia-sea text-3xl font-light mb-1">{s.value}</p>
                <p className="text-sardinia-muted text-[10px] tracking-widest uppercase leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Beach grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-sardinia-muted/20 mb-10">
          {BEACHES.map((beach, i) => (
            <a
              key={beach.key}
              href={beach.isolaMeaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-sardinia-cream overflow-hidden block reveal reveal-d${(i % 3) + 1}`}
            >
              {/* Image or gradient placeholder */}
              <div className="aspect-[4/3] overflow-hidden relative">
                {beach.image ? (
                  <img
                    src={beach.image}
                    alt={t(`zona.beaches.${beach.key}.name`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-sardinia-sea via-sardinia-sea-mid to-sardinia-sea/60 flex items-center justify-center">
                    <WaveIcon className="w-20 h-10 text-white/30" />
                  </div>
                )}
                {/* Distance badge */}
                <div className="absolute top-3 left-3 bg-sardinia-dark/80 backdrop-blur-sm text-white text-[10px] font-medium tracking-wider px-2.5 py-1">
                  📍 {beach.distance}
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-sardinia-sea/0 group-hover:bg-sardinia-sea/20 transition-colors duration-300" />
              </div>

              {/* Card body */}
              <div className="p-5 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-sardinia-dark text-lg font-light mb-1 group-hover:text-sardinia-sea transition-colors">
                    {t(`zona.beaches.${beach.key}.name`)}
                  </h3>
                  <p className="text-sardinia-muted text-xs leading-relaxed">
                    {t(`zona.beaches.${beach.key}.description`)}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-sardinia-muted group-hover:text-sardinia-sea group-hover:translate-x-1 transition-all duration-200 shrink-0 mt-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-sardinia-muted/20 reveal">
          <p className="text-sardinia-muted text-xs">
            {t('zona.poweredBy')}{' '}
            <a
              href="https://www.isolamea.it/zona/posada-siniscola/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sardinia-sea hover:underline font-medium"
            >
              isolamea.it
            </a>
          </p>
          <a
            href="https://www.isolamea.it/zona/posada-siniscola/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-sardinia-sea text-sardinia-sea px-6 py-2.5 text-xs font-medium tracking-widest uppercase hover:bg-sardinia-sea hover:text-white transition-colors duration-300"
          >
            {t('zona.cta')}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};
