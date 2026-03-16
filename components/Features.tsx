import React from 'react';
import { useTranslation } from 'react-i18next';
import { Feature } from '../types';

const FEATURE_KEYS = ['kitchen','airConditioning','wifi','parking','location','washingMachine','smartTV','terrace','heating','linens'];

const FEATURE_ICONS = [
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>,
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>,
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>,
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v16h16V4H4zm8 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" /></svg>,
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v18l7-3 7 3V3l-7 3-7-3z" /></svg>,
];

export const Features: React.FC = () => {
  const { t } = useTranslation();

  const FEATURES: Feature[] = FEATURE_KEYS.map((key, i) => ({
    title: t(`features.${key}.title`),
    description: t(`features.${key}.description`),
    icon: FEATURE_ICONS[i],
  }));

  const stats = [
    { value: t('features.apartmentDetails.surface'), label: t('features.apartmentDetails.surfaceLabel') },
    { value: t('features.apartmentDetails.bedrooms'), label: t('features.apartmentDetails.bedroomsLabel') },
    { value: t('features.apartmentDetails.bathrooms'), label: t('features.apartmentDetails.bathroomsLabel') },
    { value: t('features.apartmentDetails.guests'), label: t('features.apartmentDetails.guestsLabel') },
  ];

  return (
    <section id="features" className="py-16 md:py-28 bg-sardinia-cream">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <div className="reveal">
            <p className="text-sardinia-terra text-[11px] tracking-[0.25em] uppercase mb-4">L'Appartamento</p>
            <h2 className="font-serif font-light text-sardinia-dark leading-tight" style={{ fontSize: 'clamp(36px,4vw,52px)' }}>
              {t('features.title')}<br />
              <em className="italic text-sardinia-sea">{t('features.apartmentDetails.title')}</em>
            </h2>
          </div>
          <p className="text-sardinia-muted text-sm leading-relaxed reveal reveal-d1">{t('features.subtitle')}</p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-sardinia-sand mb-16 reveal">
          {stats.map((s) => (
            <div key={s.label} className="bg-sardinia-dark text-center py-10 px-4">
              <div className="font-serif text-sardinia-accent font-light mb-2" style={{ fontSize: 'clamp(36px,4vw,52px)' }}>{s.value}</div>
              <div className="text-white/50 text-[11px] tracking-[0.2em] uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-sardinia-sand">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`bg-sardinia-cream p-6 group hover:bg-white transition-colors duration-300 reveal reveal-d${(i % 4) + 1}`}
            >
              <div className="w-10 h-10 border border-sardinia-sand flex items-center justify-center text-sardinia-terra mb-4 group-hover:border-sardinia-terra transition-colors">
                {f.icon}
              </div>
              <h3 className="text-sardinia-dark font-medium text-sm mb-2">{f.title}</h3>
              <p className="text-sardinia-muted text-xs leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
