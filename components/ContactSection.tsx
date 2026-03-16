import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!FORMSPREE_ENDPOINT) { alert(t('contact.configMissingFormspree')); return; }
    setFormStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
      if (response.ok) {
        setFormStatus('submitted');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="py-16 md:py-28 bg-sardinia-cream">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Section header */}
        <div className="mb-14 reveal">
          <p className="text-sardinia-terra text-[11px] tracking-[0.25em] uppercase mb-4">Contatti</p>
          <h2 className="font-serif text-sardinia-dark font-light leading-tight" style={{ fontSize: 'clamp(32px,4vw,50px)' }}>
            {t('contact.title')}<br />
            <em className="italic text-sardinia-sea">{t('contact.subtitle').split('.')[0]}</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-sardinia-sand">

          {/* Left: info + map */}
          <div className="bg-sardinia-cream p-8 md:p-12 reveal">
            <div className="space-y-8 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-sardinia-sand flex items-center justify-center text-sardinia-terra flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sardinia-dark font-medium text-sm mb-1">{t('contact.address')}</h4>
                  <p className="text-sardinia-muted text-sm">{t('contact.addressValue')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-sardinia-sand flex items-center justify-center text-sardinia-terra flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sardinia-dark font-medium text-sm mb-1">{t('contact.email')}</h4>
                  <p className="text-sardinia-muted text-sm">{t('contact.emailValue')}</p>
                </div>
              </div>

              {/* Distance info */}
              <div className="border-t border-sardinia-sand pt-8">
                <h4 className="text-sardinia-dark text-xs tracking-widest uppercase font-medium mb-5">Distanze chiave</h4>
                <div className="space-y-3">
                  {[
                    ['🏖', 'Cala Liberotto', '8 km'],
                    ['✈️', 'Aeroporto Olbia', '65 km'],
                    ['🏔', 'Gole di Gorropu', '40 km'],
                    ['⛵', 'Porto di Arbatax', '25 km'],
                  ].map(([icon, place, dist]) => (
                    <div key={place} className="flex justify-between items-center text-sm">
                      <span className="text-sardinia-muted">{icon} {place}</span>
                      <span className="font-serif text-sardinia-dark text-lg font-light">{dist}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h3 className="text-sardinia-dark text-xs tracking-widest uppercase font-medium mb-4">{t('contact.whereWeAre')}</h3>
              <div className="overflow-hidden border border-sardinia-sand">
                <iframe
                  src="https://maps.google.com/maps?q=Via+Lombardia+7a,+08020+Torpè+NU&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%" height="280"
                  style={{ border: 0 }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mappa di Via Lombardia 7a, Torpè"
                />
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-sardinia-dark p-8 md:p-12 reveal reveal-d1">
            <h3 className="font-serif text-white font-light text-2xl mb-8">{t('contact.formTitle')}</h3>

            {formStatus === 'submitted' ? (
              <div className="border border-sardinia-accent/30 bg-sardinia-accent/10 p-8 text-center">
                <div className="text-3xl mb-3">✓</div>
                <p className="text-white font-medium mb-1">{t('contact.formSuccessTitle')}</p>
                <p className="text-white/50 text-sm">{t('contact.formSuccessMessage')}</p>
              </div>
            ) : formStatus === 'error' ? (
              <div className="border border-sardinia-terra/30 bg-sardinia-terra/10 p-5 mb-6">
                <p className="text-sardinia-terra text-sm font-medium">{t('contact.formErrorTitle')}</p>
                <p className="text-sardinia-terra/70 text-xs mt-1">{t('contact.formErrorMessage')}</p>
                <button onClick={() => setFormStatus('idle')} className="text-sardinia-accent text-xs underline mt-2">{t('contact.retry')}</button>
              </div>
            ) : null}

            {formStatus !== 'submitted' && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" name="_gotcha" style={{ display: 'none' }} />
                <input type="hidden" name="_subject" value="Nuova richiesta prenotazione" />
                <input type="hidden" name="_language" value="it" />

                <div>
                  <label className="block text-white/50 text-[11px] tracking-widest uppercase mb-2">{t('contact.fullName')}</label>
                  <input
                    required name="nome_completo" type="text"
                    placeholder={t('contact.fullNamePlaceholder')}
                    className="w-full bg-white/5 border border-white/15 text-white placeholder-white/25 px-4 py-3 text-sm outline-none focus:border-sardinia-accent/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/50 text-[11px] tracking-widest uppercase mb-2">{t('contact.email')}</label>
                  <input
                    required name="email" type="email"
                    placeholder={t('contact.emailPlaceholder')}
                    className="w-full bg-white/5 border border-white/15 text-white placeholder-white/25 px-4 py-3 text-sm outline-none focus:border-sardinia-accent/50 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-[11px] tracking-widest uppercase mb-2">{t('contact.checkin')}</label>
                    <input
                      name="data_checkin" type="date" required
                      className="w-full bg-white/5 border border-white/15 text-white/80 px-4 py-3 text-sm outline-none focus:border-sardinia-accent/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-[11px] tracking-widest uppercase mb-2">{t('contact.checkout')}</label>
                    <input
                      name="data_checkout" type="date" required
                      className="w-full bg-white/5 border border-white/15 text-white/80 px-4 py-3 text-sm outline-none focus:border-sardinia-accent/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-[11px] tracking-widest uppercase mb-2">{t('contact.message')}</label>
                  <textarea
                    required name="messaggio" rows={4}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full bg-white/5 border border-white/15 text-white placeholder-white/25 px-4 py-3 text-sm outline-none focus:border-sardinia-accent/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-sardinia-terra text-white py-3.5 text-xs font-medium tracking-widest uppercase hover:bg-sardinia-accent transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      {t('contact.submitting')}
                    </>
                  ) : t('contact.submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
