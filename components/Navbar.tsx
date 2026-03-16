import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavItem } from '../types';

const LANGUAGES = [
  { code: 'it', name: 'IT', flag: '🇮🇹' },
  { code: 'en', name: 'EN', flag: '🇬🇧' },
  { code: 'de', name: 'DE', flag: '🇩🇪' }
];

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NAV_ITEMS: NavItem[] = [
    { label: t('navbar.home'),         href: '#home' },
    { label: t('navbar.apartment'),    href: '#features' },
    { label: t('navbar.gallery'),      href: '#gallery' },
    { label: t('navbar.excursions'),   href: '#excursions' },
    { label: t('navbar.availability'), href: '#calendar' },
    { label: t('navbar.assistant'),    href: '#concierge' },
    { label: t('navbar.contact'),      href: '#contact' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-sardinia-cream/95 backdrop-blur-md shadow-sm border-b border-sardinia-sand'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <a href="#home" className="flex-shrink-0">
            <span className={`font-serif text-2xl font-light tracking-widest transition-colors duration-300 ${
              scrolled ? 'text-sardinia-dark' : 'text-white'
            }`}>
              Domu Laura
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:opacity-60 ${
                  scrolled ? 'text-sardinia-dark' : 'text-white'
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Language selector */}
            <div className="relative ml-2">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:opacity-60 ${
                  scrolled ? 'text-sardinia-dark' : 'text-white'
                }`}
              >
                <span className="flag-emoji text-lg leading-none">{currentLang.flag}</span>
                <span>{currentLang.name}</span>
                <svg className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-3 w-32 bg-sardinia-cream border border-sardinia-sand shadow-xl">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2.5 text-xs tracking-widest uppercase font-medium flex items-center gap-2 hover:bg-sardinia-sand transition-colors ${
                        i18n.language === lang.code ? 'text-sardinia-terra' : 'text-sardinia-dark'
                      }`}
                    >
                      <span className="flag-emoji text-base">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="p-1">
                <span className={`flag-emoji text-xl ${scrolled ? '' : 'text-white'}`}>{currentLang.flag}</span>
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-sardinia-cream border border-sardinia-sand shadow-xl">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="w-full text-left px-3 py-2 text-xs tracking-wider uppercase font-medium flex items-center gap-2 hover:bg-sardinia-sand"
                    >
                      <span className="flag-emoji text-base">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1 ${scrolled ? 'text-sardinia-dark' : 'text-white'}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-sardinia-cream border-t border-sardinia-sand">
          <div className="px-5 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2.5 text-xs font-medium tracking-widest uppercase text-sardinia-dark hover:text-sardinia-terra transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
