import React from 'react';
import { TemplateRenderProps } from './types';
import { CountdownTimer } from '../components/public/CountdownTimer';
import { RSVPForm } from '../components/public/RSVPForm';
import { MusicPlayer } from '../components/public/MusicPlayer';
import { CalendarExportButton } from '../components/public/CalendarExportButton';
import { MapPin, Phone, Navigation, Car } from 'lucide-react';
import { toLocaleDateAz } from '../utils/azDate';

const fadeStyles = `
  @keyframes editFade {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .edit-elem {
    animation: editFade 0.75s ease both;
    animation-timeline: view();
    animation-range: entry 5% cover 28%;
  }
`;

// Editorial / magazine-style minimalist template: blush-ivory palette,
// oversized numerals, asymmetric two-column layout, hairline rules.
// Distinct from MinimalWeddingTemplate (warm taupe, centered), MinimalMono
// (black & white) and MinimalSage (rounded botanical).
export const MinimalEditorialTemplate: React.FC<TemplateRenderProps> = ({
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

  return (
    <div
      id="minimal-editorial-template-root"
      className="min-h-screen bg-[#fbf5f2] text-[#2b2422] overflow-x-clip relative font-sans selection:bg-[#e8c9be] selection:text-[#2b2422]"
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
      <header className="sticky top-0 z-30 w-full bg-[#fbf5f2]/92 backdrop-blur-xl border-b border-[#2b2422]/10 px-5 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.3em] font-semibold">
            {invitation.groomName} <span className="text-[#c98f7c]">×</span> {invitation.brideName}
          </span>
          <a
            href="#rsvp-editorial"
            className="px-5 py-2 rounded-full bg-[#c98f7c] text-white text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#b87c69] transition-colors duration-300"
          >
            RSVP
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 py-16 sm:py-24 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div className="edit-elem order-2 lg:order-1">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#c98f7c] font-semibold mb-6">
              Toy Dəvətnaməsi
            </p>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-normal leading-[0.95] tracking-tight mb-8">
              {invitation.groomName}
              <br />
              <span className="italic font-light text-[#c98f7c]">&</span>{' '}
              {invitation.brideName}
            </h1>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-6xl sm:text-7xl font-light leading-none text-[#c98f7c]">
                {dayNumber}
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] leading-tight">
                {formatDate(invitation.weddingDate)}
                <br />
                Saat {invitation.weddingTime}
              </span>
            </div>
            {invitation.customText && (
              <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#2b2422]/70 font-light border-t border-[#2b2422]/10 pt-6">
                {invitation.customText}
              </p>
            )}
          </div>

          {invitation.heroImage && (
            <div className="edit-elem order-1 lg:order-2 relative">
              <div className="relative overflow-hidden rounded-tl-[4rem] rounded-br-[4rem] bg-[#efe2db] shadow-[0_25px_60px_rgba(43,36,34,0.12)]">
                <img
                  src={invitation.heroImage}
                  alt={`${invitation.groomName} & ${invitation.brideName}`}
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 w-24 h-24 rounded-full bg-[#e8c9be] -z-10" />
            </div>
          )}
        </div>
      </section>

      {/* Countdown */}
      <section className="px-6 py-16 border-t border-[#2b2422]/10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="edit-elem text-[10px] uppercase tracking-[0.4em] text-[#c98f7c] font-semibold mb-8">
            Böyük günə qalan vaxt
          </p>
          <div className="edit-elem">
            <CountdownTimer
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              theme="minimal"
            />
          </div>
          <div className="edit-elem mt-8">
            <CalendarExportButton
              brideName={invitation.brideName}
              groomName={invitation.groomName}
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              venue={invitation.venue}
              address={invitation.address}
              className="!bg-[#2b2422] !border-[#2b2422] !text-white hover:!bg-[#463b37] !rounded-full px-6 py-3 text-[10px] uppercase tracking-[0.18em]"
            />
          </div>
        </div>
      </section>

      {/* Schedule */}
      {invitation.schedule && invitation.schedule.length > 0 && (
        <section className="px-6 py-20 border-t border-[#2b2422]/10">
          <div className="max-w-3xl mx-auto">
            <p className="edit-elem text-[10px] uppercase tracking-[0.4em] text-[#c98f7c] font-semibold mb-12 text-center">
              Toy Proqramı
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {invitation.schedule.map((item, idx) => (
                <div key={idx} className="edit-elem flex gap-4 p-5 rounded-2xl bg-white/60 border border-[#2b2422]/10">
                  <span className="text-3xl font-light text-[#c98f7c] leading-none shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <h4 className="text-base font-serif">{item.title}</h4>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#c98f7c] font-medium mb-1">
                      {item.time}
                    </p>
                    {item.description && (
                      <p className="text-xs text-[#2b2422]/60">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Venue */}
      <section className="px-6 py-20 border-t border-[#2b2422]/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="edit-elem w-12 h-12 mx-auto mb-5 rounded-full bg-[#efe2db] flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#c98f7c]" strokeWidth={1.3} />
            </div>
            <p className="edit-elem text-[10px] uppercase tracking-[0.4em] text-[#c98f7c] font-semibold mb-3">
              Mərasim məkanı
            </p>
            <h3 className="text-2xl sm:text-4xl font-serif mb-2">{invitation.venue}</h3>
            <p className="text-sm text-[#2b2422]/60">{invitation.address}</p>
          </div>

          <div className="rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden mb-8 border border-[#2b2422]/10">
            <div className="overflow-hidden aspect-[4/3] sm:aspect-[16/8]">
              <iframe
                title="Mərasim məkanının xəritəsi"
                src={`https://www.google.com/maps?q=${
                  invitation.mapCoordinates?.lat && invitation.mapCoordinates?.lng
                    ? `${invitation.mapCoordinates.lat},${invitation.mapCoordinates.lng}`
                    : encodeURIComponent(`${invitation.venue}${invitation.address}`)
                }&output=embed`}
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={
                invitation.mapCoordinates?.mapUrl ||
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${invitation.venue}${invitation.address}`
                )}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c98f7c] text-white text-[10px] uppercase tracking-[0.15em] hover:bg-[#b87c69] transition-colors"
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#2b2422]/20 text-[#2b2422]/70 text-[10px] uppercase tracking-[0.15em] hover:bg-[#efe2db] transition-colors"
            >
              <Car className="w-3.5 h-3.5" /> Waze
            </a>
            {invitation.contactPhone && (
              <a
                href={`tel:${invitation.contactPhone}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#2b2422]/20 text-[#2b2422]/70 text-[10px] uppercase tracking-[0.15em] hover:bg-[#efe2db] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> {invitation.contactPhone}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp-editorial" className="px-6 py-20 border-t border-[#2b2422]/10 bg-[#f3e6df]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="edit-elem text-2xl sm:text-4xl font-serif mb-3">
              Sizinlə görüşməkdən
              <br />
              məmnun olarıq
            </h2>
            <p className="edit-elem text-xs sm:text-sm text-[#2b2422]/60">
              İştirakınızı təsdiqləməyi unutmayın.
            </p>
          </div>

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
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center bg-[#2b2422] text-[#e8c9be]">
        <p className="font-serif text-xl text-[#fbf5f2] mb-3">
          {invitation.groomName} & {invitation.brideName}
        </p>
        <p className="text-[9px] uppercase tracking-[0.35em] text-[#c98f7c]">
          © {new Date().getFullYear()} · Toy Dəvətnaməsi
        </p>
      </footer>
    </div>
  );
};
