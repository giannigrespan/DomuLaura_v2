import React from 'react';
import { useTranslation } from 'react-i18next';

interface Partner {
  name: string;
  taglineKey: string;
  descriptionKey: string;
  servicesKey: string;
  locationKey: string;
  image: string;
  website: string;
  phone: string;
}

const PARTNERS: Partner[] = [
  {
    name: 'Kitesurf La Caletta',
    taglineKey: 'partners.kitesurf.tagline',
    descriptionKey: 'partners.kitesurf.description',
    servicesKey: 'partners.kitesurf.services',
    locationKey: 'partners.kitesurf.location',
    image: '/spiaggia-cala-brandinchi-panoramica.webp',
    website: 'https://www.kitesurflacaletta.it/',
    phone: '+39 329 068 2045',
  },
];

export const Partners: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="partners" className="py-16 md:py-28 bg-sardinia-cream">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="mb-14 reveal">
          <p className="text-sardinia-terra text-[11px] tracking-[0.25em] uppercase mb-3">
            {t('partners.label')}
          </p>
          <h2
            className="font-serif text-sardinia-dark font-light"
            style={{ fontSize: 'clamp(32px,4vw,48px)' }}
          >
            {t('partners.title')}
          </h2>
          <p className="mt-4 text-sardinia-muted text-sm leading-relaxed max-w-xl">
            {t('partners.subtitle')}
          </p>
        </div>

        {/* Partner cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-sardinia-muted/20">
          {PARTNERS.map((partner, i) => (
            <div
              key={partner.name}
              className={`bg-sardinia-cream group overflow-hidden reveal reveal-d${(i % 3) + 1}`}
            >
              {/* Image */}
              <div className="img-zoom aspect-[16/7] bg-sardinia-muted/20 relative">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Partner badge */}
                <div className="absolute top-4 left-4 bg-sardinia-terra text-white text-[10px] tracking-[0.2em] uppercase font-medium px-3 py-1">
                  {t('partners.badge')}
                </div>
              </div>

              {/* Content */}
              <div className="p-7 border border-t-0 border-sardinia-muted/20">
                <p className="text-sardinia-terra text-[10px] tracking-[0.2em] uppercase font-medium mb-2">
                  {t(partner.taglineKey)}
                </p>
                <h3 className="font-serif text-sardinia-dark text-2xl font-light mb-3">
                  {partner.name}
                </h3>
                <p className="text-sardinia-muted text-xs leading-relaxed mb-5">
                  {t(partner.descriptionKey)}
                </p>

                {/* Services */}
                <p className="text-sardinia-dark text-[11px] tracking-widest uppercase font-medium mb-4">
                  {t(partner.servicesKey)}
                </p>

                {/* Location + contacts */}
                <div className="flex flex-wrap items-center gap-4 text-sardinia-muted text-xs mb-6">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t(partner.locationKey)}
                  </span>
                  <a
                    href={`tel:${partner.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-1.5 hover:text-sardinia-dark transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {partner.phone}
                  </a>
                </div>

                {/* CTA */}
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sardinia-dark text-white text-xs tracking-widest uppercase font-medium px-6 py-3 hover:bg-sardinia-terra transition-colors duration-200"
                >
                  {t('partners.kitesurf.cta')}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
