import React from 'react';
import { TemplateRenderProps } from './types';
import { CountdownTimer } from '../components/public/CountdownTimer';
import { RSVPForm } from '../components/public/RSVPForm';
import { MusicPlayer } from '../components/public/MusicPlayer';
import { CalendarExportButton } from '../components/public/CalendarExportButton';
import { MapPin, Phone, Navigation, Car } from 'lucide-react';
import { toLocaleDateAz } from '../utils/azDate';

const fadeStyles = `
  @keyframes monoFade {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .mono-elem {
    animation: monoFade 0.7s ease both;
    animation-timeline: view();
    animation-range: entry 5% cover 25%;
  }
`;

// Ultra high-contrast, stark black & white editorial minimal template.
// Distinct from MinimalWeddingTemplate: no warm tones, no soft blobs, no
// rounded corners — hairline rules, large negative space, uppercase
// grid-driven typography.
export const MinimalMonoTemplate: React.FC<TemplateRenderProps> = ({
  invitation,
}) => {
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return toLocaleDateAz(d, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const dayNumber = (() => {
    try {
      return new Date(invitation.weddingDate).getDate().toString().padStart(2, '0');
    } catch {
      return '';
    }
  })();

  const monthName = (() => {
    try {
      return toLocaleDateAz(new Date(`${invitation.weddingDate}T12:00:00`), { month: 'long' }).toLocaleUpperCase('az-AZ');
    } catch {
      return '';
    }
  })();

  return (
    <div
      id="minimal-mono-template-root"
      className="min-h-screen bg-white text-black overflow-x-clip relative font-sans selection:bg-black selection:text-white"
    >
      <style>{fadeStyles}</style>

      {invitation.music && (
        <div className="fixed w-0 h-0 overflow-hidden opacity-0 pointer-events-none">
          <MusicPlayer
            musicUrl={invitation.music}
            musicTitle={invitation.musicTitle || `${invitation.brideName} & ${invitation.groomName}`}
            theme="minimal"
          />
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-sm border-b border-black px-5 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.3em] font-semibold">
            {invitation.groomName} / {invitation.brideName}
          </span>
          <a
            href="#rsvp-mono"
            className="px-5 py-2 border border-black text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-black hover:text-white transition-colors duration-200"
          >
            RSVP
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 py-20 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-[auto_1fr] gap-8 sm:gap-16 items-center">
          {/* Big date block */}
          <div className="mono-elem flex sm:flex-col items-baseline sm:items-start gap-3 sm:gap-0 border-b sm:border-b-0 sm:border-r border-black pb-4 sm:pb-0 sm:pr-12">
            <span className="text-6xl sm:text-8xl font-light leading-none tracking-tight">
              {dayNumber}
            </span>
            <span className="text-sm uppercase tracking-[0.3em] font-medium sm:mt-2">
              {monthName}
            </span>
          </div>

          <div className="mono-elem">
            <p className="text-[10px] uppercase tracking-[0.4em] text-black/50 mb-5">
              Toy Mərasimi
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light leading-[1.02] tracking-tight mb-6">
              {invitation.groomName}
              <span className="block text-2xl sm:text-3xl italic font-light my-1">&</span>
              {invitation.brideName}
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-black/70">
              {formatDate(invitation.weddingDate)} — Saat {invitation.weddingTime}
            </p>
          </div>
        </div>

        {invitation.heroImage && (
          <div className="mono-elem relative w-full mt-16">
            <img
              src={invitation.heroImage}
              alt={`${invitation.groomName} & ${invitation.brideName}`}
              className="w-full aspect-[16/9] sm:aspect-[21/9] object-cover grayscale contrast-125"
            />
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-black -z-10 hidden sm:block" />
          </div>
        )}

        {invitation.customText && (
          <div className="mono-elem max-w-2xl mt-16 border-l-2 border-black pl-6 sm:pl-8">
            <p className="text-base sm:text-lg leading-relaxed font-light italic">
              {invitation.customText}
            </p>
          </div>
        )}
      </section>

      {/* Countdown */}
      <section className="border-t border-black px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="mono-elem text-[10px] uppercase tracking-[0.4em] text-black/50 mb-8">
            Böyük günə qalan vaxt
          </p>
          <div className="mono-elem">
            <CountdownTimer
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              theme="minimal"
            />
          </div>
          <div className="mono-elem mt-8">
            <CalendarExportButton
              brideName={invitation.brideName}
              groomName={invitation.groomName}
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              venue={invitation.venue}
              address={invitation.address}
              className="!bg-black !border-black !text-white hover:!bg-white hover:!text-black !border !rounded-none px-6 py-3 text-[10px] uppercase tracking-[0.2em] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Schedule */}
      {invitation.schedule && invitation.schedule.length > 0 && (
        <section className="border-t border-black px-6 py-20">
          <div className="max-w-2xl mx-auto">
            <p className="mono-elem text-[10px] uppercase tracking-[0.4em] text-black/50 mb-12 text-center">
              Toy Proqramı
            </p>
            <div className="space-y-0">
              {invitation.schedule.map((item, idx) => (
                <div
                  key={idx}
                  className="mono-elem grid grid-cols-[80px_1fr] sm:grid-cols-[110px_1fr] gap-4 sm:gap-8 py-6 border-b border-black/20 last:border-b-0"
                >
                  <span className="text-xs sm:text-sm uppercase tracking-[0.15em] font-semibold pt-1">
                    {item.time}
                  </span>
                  <div>
                    <h4 className="text-lg sm:text-xl font-light mb-1">{item.title}</h4>
                    {item.description && (
                      <p className="text-sm text-black/60 font-light">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Venue */}
      <section className="border-t border-black px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="mono-elem text-center mb-10">
            <MapPin className="w-5 h-5 mx-auto mb-4" strokeWidth={1.2} />
            <p className="text-[10px] uppercase tracking-[0.4em] text-black/50 mb-3">Mərasim məkanı</p>
            <h3 className="text-2xl sm:text-3xl font-light mb-2">{invitation.venue}</h3>
            <p className="text-sm text-black/60">{invitation.address}</p>
          </div>

          <div className="mono-elem border border-black mb-8">
            <div className="overflow-hidden aspect-[4/3] sm:aspect-[16/8]">
              <iframe
                title="Mərasim məkanının xəritəsi"
                src={`https://www.google.com/maps?q=${
                  invitation.mapCoordinates?.lat && invitation.mapCoordinates?.lng
                    ? `${invitation.mapCoordinates.lat},${invitation.mapCoordinates.lng}`
                    : encodeURIComponent(`${invitation.venue}${invitation.address}`)
                }&output=embed`}
                className="w-full h-full grayscale contrast-125"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="mono-elem flex flex-wrap justify-center gap-3">
            <a
              href={
                invitation.mapCoordinates?.mapUrl ||
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${invitation.venue}${invitation.address}`
                )}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-[10px] uppercase tracking-[0.15em] hover:bg-white hover:text-black border border-black transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" /> Xəritə
            </a>
            <a
              href={
                invitation.wazeUrl ||
                `https://waze.com/ul?q=${encodeURIComponent(`${invitation.venue}${invitation.address}`)}&navigate=yes`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-black text-[10px] uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-colors"
            >
              <Car className="w-3.5 h-3.5" /> Waze
            </a>
            {invitation.contactPhone && (
              <a
                href={`tel:${invitation.contactPhone}`}
                className="inline-flex items-center gap-2 px-6 py-3 border border-black text-[10px] uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> {invitation.contactPhone}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp-mono" className="border-t border-black px-6 py-20 bg-black text-white">
        <div className="max-w-2xl mx-auto">
          <div className="mono-elem text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-light mb-3">
              Sizinlə görüşməkdən məmnun olarıq
            </h2>
            <p className="text-xs sm:text-sm text-white/60 uppercase tracking-[0.2em]">
              İştirakınızı təsdiqləyin
            </p>
          </div>
          <div className="[&_input]:!bg-white [&_input]:!text-black [&_textarea]:!bg-white [&_textarea]:!text-black [&_select]:!bg-white [&_select]:!text-black">
            <RSVPForm
              invitationId={invitation.id}
              invitationSlug={invitation.slug}
              brideName={invitation.brideName}
              groomName={invitation.groomName}
              contactPhone={invitation.contactPhone}
              weddingDate={invitation.weddingDate}
              theme="minimal"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black px-6 py-10 text-center bg-white">
        <p className="text-sm uppercase tracking-[0.25em] font-semibold mb-2">
          {invitation.groomName} & {invitation.brideName}
        </p>
        <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
          © {new Date().getFullYear()} · Toy Dəvətnaməsi
        </p>
      </footer>
    </div>
  );
};
