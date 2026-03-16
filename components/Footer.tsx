import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-sardinia-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Brand */}
          <div>
            <span className="font-serif text-white font-light text-2xl tracking-widest">Domu Laura</span>
            <p className="text-white/35 text-xs tracking-wider mt-2">Casa Vacanze · Torpè · Sardegna</p>
            <p className="text-white/20 text-xs mt-6">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-2">Navigazione</p>
            {[
              ['L\'Appartamento', '#features'],
              ['Galleria', '#gallery'],
              ['Escursioni', '#excursions'],
              ['Disponibilità', '#calendar'],
              ['Contatti', '#contact'],
            ].map(([label, href]) => (
              <a key={label} href={href} className="text-white/45 text-xs tracking-wider hover:text-white transition-colors">
                {label}
              </a>
            ))}
          </div>

          {/* Stagione + links */}
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-4">Stagione</p>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-sardinia-accent rounded-full animate-pulse" />
              <span className="text-white/60 text-xs">Maggio — Settembre</span>
            </div>
            <div className="flex gap-5 pt-6 border-t border-white/8">
              <a href="#" className="text-white/25 text-xs tracking-wider hover:text-white/60 transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-white/25 text-xs tracking-wider hover:text-white/60 transition-colors">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-14 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-sardinia-terra rounded-full" />
            <span className="text-white/20 text-[10px] tracking-widest uppercase">Torpè · Nuoro · Sardegna</span>
          </div>
          <span className="text-white/15 text-[10px]">Made with ♥ in Sardinia</span>
        </div>
      </div>
    </footer>
  );
};
