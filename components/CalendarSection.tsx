import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

interface CalendarDay { date: Date; isOccupied: boolean; isCheckout: boolean; isCurrentMonth: boolean; }

export const CalendarSection: React.FC = () => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { fetchCalendarData(); }, [currentDate]);

  const formatLocalDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const fetchCalendarData = async () => {
    if (!GOOGLE_CALENDAR_ID || !GOOGLE_API_KEY) { setLoading(false); return; }
    try {
      setLoading(true); setError(null);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDate = new Date(firstDay);
      const fdow = firstDay.getDay();
      startDate.setDate(firstDay.getDate() - (fdow === 0 ? 6 : fdow - 1));
      const endDate = new Date(lastDay);
      const ldow = lastDay.getDay();
      endDate.setDate(lastDay.getDate() + (ldow === 0 ? 0 : 7 - ldow));

      const resp = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GOOGLE_CALENDAR_ID)}/events?` +
        `key=${GOOGLE_API_KEY}&timeMin=${startDate.toISOString()}&timeMax=${endDate.toISOString()}&singleEvents=true&orderBy=startTime`
      );
      if (!resp.ok) {
        if (resp.status === 403) setError(t('calendar.errors.notAccessible'));
        else if (resp.status === 404) setError(t('calendar.errors.notFound'));
        else setError(t('calendar.errors.generic'));
        setCalendarDays([]); return;
      }
      const data = await resp.json();
      const events = data.items || [];

      // Collect checkout dates (last occupied day of each event)
      const checkoutDates = new Set<string>();
      events.forEach((ev: any) => {
        if (ev.start.date) {
          // All-day events: end.date is exclusive, so checkout = end - 1 day
          const d = new Date(ev.end.date);
          d.setDate(d.getDate() - 1);
          checkoutDates.add(formatLocalDate(d));
        } else {
          const e = ev.end.dateTime?.split('T')[0];
          if (e) checkoutDates.add(e);
        }
      });

      const days: CalendarDay[] = [];
      const iter = new Date(startDate); iter.setHours(0,0,0,0);
      while (iter <= endDate) {
        const ds = formatLocalDate(iter);
        const occ = events.some((ev: any) => {
          const allDay = !!ev.start.date;
          const s = ev.start.date || ev.start.dateTime?.split('T')[0];
          const e = ev.end.date || ev.end.dateTime?.split('T')[0];
          return allDay ? ds >= s && ds < e : ds >= s && ds <= e;
        });
        days.push({ date: new Date(iter), isOccupied: occ, isCheckout: checkoutDates.has(ds), isCurrentMonth: iter.getMonth() === month });
        iter.setDate(iter.getDate() + 1);
      }
      setCalendarDays(days);
    } catch {
      setError(t('calendar.errors.connection'));
    } finally {
      setLoading(false);
    }
  };

  const changeMonth = (offset: number) => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  const monthNames = [0,1,2,3,4,5,6,7,8,9,10,11].map(m => t(`calendar.months.${m}`));
  const dayNames = ['mon','tue','wed','thu','fri','sat','sun'].map(d => t(`calendar.days.${d}`));

  return (
    <section id="calendar" className="py-16 md:py-28 bg-sardinia-cream">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: title + legend */}
          <div className="reveal">
            <p className="text-sardinia-terra text-[11px] tracking-[0.25em] uppercase mb-4">Disponibilità</p>
            <h2 className="font-serif text-sardinia-dark font-light leading-tight mb-6" style={{ fontSize: 'clamp(32px,4vw,48px)' }}>
              {t('calendar.title')}<br />
              <em className="italic text-sardinia-sea">{currentDate.getFullYear()}</em>
            </h2>
            <p className="text-sardinia-muted text-sm leading-relaxed mb-10">{t('calendar.subtitle')}</p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-sardinia-sea/15 border border-sardinia-sea/30" />
                <span className="text-sardinia-dark text-xs tracking-wider uppercase">{t('calendar.available')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-sardinia-terra/15 border border-sardinia-terra/30" />
                <span className="text-sardinia-dark text-xs tracking-wider uppercase">{t('calendar.occupied')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border border-sardinia-sand/60" style={{ background: 'linear-gradient(to bottom right, rgba(196,98,45,0.18) 50%, rgba(26,74,92,0.12) 50%)' }} />
                <span className="text-sardinia-dark text-xs tracking-wider uppercase">{t('calendar.checkout')}</span>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-sardinia-terra text-white px-6 py-3 text-xs tracking-widest uppercase font-medium hover:bg-sardinia-accent transition-colors"
            >
              <span>Richiedi Prenotazione</span>
              <span>→</span>
            </a>
          </div>

          {/* Right: calendar */}
          <div className="reveal reveal-d1">
            {!GOOGLE_CALENDAR_ID || !GOOGLE_API_KEY ? (
              <div className="border border-sardinia-sand p-8 text-center text-sardinia-muted text-sm">
                {t('calendar.notConfigured')}
              </div>
            ) : (
              <div className="border border-sardinia-sand bg-white">
                {/* Month nav */}
                <div className="flex items-center justify-between p-5 border-b border-sardinia-sand">
                  <button
                    onClick={() => changeMonth(-1)}
                    className="w-8 h-8 flex items-center justify-center text-sardinia-muted hover:text-sardinia-dark transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="font-serif text-sardinia-dark font-light text-lg tracking-wide">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </span>
                  <button
                    onClick={() => changeMonth(1)}
                    className="w-8 h-8 flex items-center justify-center text-sardinia-muted hover:text-sardinia-dark transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 border-b border-sardinia-sand">
                  {dayNames.map((d) => (
                    <div key={d} className="text-center text-[10px] font-medium tracking-widest uppercase text-sardinia-muted py-3">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days */}
                {loading ? (
                  <div className="p-10 text-center text-sardinia-muted text-sm">{t('calendar.loading')}</div>
                ) : error ? (
                  <div className="p-6 text-center">
                    <p className="text-sardinia-terra text-sm font-medium mb-1">⚠️ {error}</p>
                    <p className="text-sardinia-muted text-xs">{t('calendar.errors.instructions')}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-7">
                    {calendarDays.map((day, idx) => (
                      <div
                        key={idx}
                        className={`
                          flex items-center justify-center text-sm font-light py-3 border-b border-r border-sardinia-sand/50
                          ${!day.isCurrentMonth ? 'opacity-30' : ''}
                          ${day.isCheckout
                            ? 'text-sardinia-muted'
                            : day.isOccupied
                              ? 'bg-sardinia-terra/10 text-sardinia-terra'
                              : 'bg-sardinia-sea/8 text-sardinia-sea'
                          }
                        `}
                        style={day.isCheckout ? {
                          background: 'linear-gradient(to bottom right, rgba(196,98,45,0.18) 50%, rgba(26,74,92,0.12) 50%)'
                        } : undefined}
                      >
                        {day.date.getDate()}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <p className="mt-4 text-sardinia-muted text-xs italic">{t('calendar.disclaimer')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
