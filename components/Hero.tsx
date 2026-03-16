import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div id="home" className="relative h-screen min-h-[600px] flex items-end pb-16 md:pb-24 overflow-hidden">

      {/* Background image with pan */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center hero-pan"
          style={{ backgroundImage: `url(/Cala-Brandinchi.webp)` }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-sardinia-dark via-sardinia-dark/30 to-sardinia-sea/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-sardinia-dark/60 via-transparent to-transparent" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3">
        <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
        <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase" style={{ writingMode: 'vertical-rl' }}>Scopri</span>
      </div>

      {/* Floating info badges */}
      <div className="absolute top-1/3 right-10 z-20 hidden lg:flex flex-col gap-3 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        {[
          { icon: '☀️', title: 'Mag — Set', sub: 'Stagione aperta' },
          { icon: '📍', title: 'Torpè, Nuoro', sub: 'Sardegna Orientale' },
          { icon: '⭐', title: '5.0 / 5', sub: 'Ospiti soddisfatti' },
        ].map((b) => (
          <div key={b.title} className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3">
            <span className="text-lg">{b.icon}</span>
            <div>
              <div className="text-white text-xs font-medium">{b.title}</div>
              <div className="text-white/55 text-[11px]">{b.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 max-w-5xl animate-fade-in-up">
        <p className="text-sardinia-accent text-[11px] font-medium tracking-[0.25em] uppercase mb-5">
          Casa Vacanze · Torpè · Sardegna
        </p>
        <h1 className="font-serif text-white font-light leading-none mb-6"
            style={{ fontSize: 'clamp(56px, 9vw, 110px)' }}>
          Domu<br />
          <em className="italic text-sardinia-accent">Laura</em>
        </h1>
        <p className="text-white/65 text-base md:text-lg font-light leading-relaxed max-w-lg mb-10">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="#calendar"
            className="inline-flex items-center gap-3 bg-sardinia-terra text-white px-7 py-3.5 text-xs font-medium tracking-widest uppercase hover:bg-sardinia-accent transition-colors duration-300"
          >
            <span>{t('hero.checkAvailability')}</span>
            <span>→</span>
          </a>
          <a
            href="#concierge"
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/25 text-white px-7 py-3.5 text-xs font-medium tracking-widest uppercase hover:bg-white/20 transition-colors duration-300"
          >
            {t('hero.askAssistant')}
          </a>
        </div>
      </div>

      {/* Bottom scroll arrow */}
      <a
        href="#features"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce"
        aria-label={t('hero.scrollDown')}
      >
        <svg className="w-8 h-8 text-white/50 hover:text-white/80 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7" />
        </svg>
      </a>
    </div>
  );
};
