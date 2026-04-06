import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IdealFor } from './components/IdealFor';
import { Features } from './components/Features';
import { Gallery } from './components/Gallery';
import { Excursions } from './components/Excursions';
import { Partners } from './components/Partners';
import { CalendarSection } from './components/CalendarSection';
import { Concierge } from './components/Concierge';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingContactButtons } from './components/FloatingContactButtons';

const App: React.FC = () => {
  useEffect(() => {
    // Scroll to top on load
    const hash = window.location.hash;
    if (!hash) {
      window.scrollTo(0, 0);
      setTimeout(() => window.scrollTo(0, 0), 0);
    }

    // Global scroll reveal observer
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <IdealFor />
        <Features />
        <Gallery />
        <Excursions />
        <Partners />
        <CalendarSection />
        <Concierge />
        <ContactSection />
      </main>
      <Footer />
      <FloatingContactButtons />
    </div>
  );
};

export default App;
