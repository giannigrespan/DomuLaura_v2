import React from 'react';
import { useTranslation } from 'react-i18next';

const IDEAL_ICONS = ['💑', '👨‍👩‍👧‍👦', '🏖️', '💻'];

export const IdealFor: React.FC = () => {
  const { t } = useTranslation();
  const items = [
    'idealFor.couples',
    'idealFor.families',
    'idealFor.beachLovers',
    'idealFor.remoteWorkers',
  ];

  return (
    <section className="py-16 md:py-24 bg-sardinia-dark">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-12 reveal">
          <p className="text-sardinia-accent text-[11px] tracking-[0.25em] uppercase mb-3">Perfetta per</p>
          <h2 className="font-serif text-white font-light text-4xl md:text-5xl">
            {t('idealFor.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {items.map((item, i) => (
            <div
              key={item}
              className={`bg-sardinia-dark p-8 text-center group hover:bg-sardinia-sea/20 transition-colors duration-300 reveal reveal-d${i + 1}`}
            >
              <div className="text-4xl mb-4">{IDEAL_ICONS[i]}</div>
              <p className="text-white/75 text-sm font-light leading-relaxed group-hover:text-white transition-colors">
                {t(item)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
