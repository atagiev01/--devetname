import React from 'react';
import { TemplateRenderProps } from './types';
import { CountdownTimer } from '../components/public/CountdownTimer';
import { RSVPForm } from '../components/public/RSVPForm';
import { MusicPlayer } from '../components/public/MusicPlayer';
import { CalendarExportButton } from '../components/public/CalendarExportButton';
import { MapPin, Phone, Navigation, Car, Leaf } from 'lucide-react';
import { toLocaleDateAz } from '../utils/azDate';

const fadeStyles = `
  @keyframes sageFade {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .sage-elem {
    animation: sageFade 0.8s ease both;
    animation-timeline: view();
    animation-range: entry 5% cover 30%;
  }
`;

// Soft, airy botanical-minimal template: sage green + ivory palette,
// rounded soft shapes, generous whitespace, thin leaf motif — visually
// distinct from both MinimalWeddingTemplate (warm taupe) and MinimalMono
// (stark black & white).
export const MinimalSageTemplate: React.FC<TemplateRenderProps> = ({
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

  return (
    <div
      id="minimal-sage-template-root"
      className="min-h-screen bg-[#f7f8f4] text-[#3c4536] overflow-x-clip relative font-sans selection:bg-[#c9d4b8] selection:text-[#2c3325]"
    >
      <style>{fadeStyles}</style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#dbe5cb]/40 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-[#e7ecdd]/50 blur-3xl" />
      </div>

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
      <header className="sticky top-0 z-30 w-full bg-[#f7f8f4]/90 backdrop-blur-xl border-b border-[#c7d0b6]/50 px-5 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Leaf className="w-4 h-4 text-[#7e9463]" strokeWidth={1.4} />
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#5b6650]">
              {invitation.groomName} & {invitation.brideName}
            </span>
          </div>
          <a
            href="#rsvp-sage"
            className="px-5 py-2 rounded-full bg-[#7e9463] text-white text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#6c8153] transition-colors duration-300"
          >
            RSVP
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="sage-elem flex items-center gap-3 mb-7">
          <span className="w-8 h-px bg-[#a8b891]" />
          <Leaf className="w-4 h-4 text-[#7e9463]" strokeWidth={1.2} />
          <span className="w-8 h-px bg-[#a8b891]" />
        </div>

        <span className="sage-elem text-[10px] uppercase tracking-[0.4em] text-[#7e9463] font-medium mb-6">
          Bizim Toy Günümüz
        </span>

        <h1 className="sage-elem text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[#38402f] leading-[1.05] mb-6">
          {invitation.groomName}
          <span className="block sm:inline mx-2 sm:mx-4 italic font-light text-[#8a9c70]">&</span>
          {invitation.brideName}
        </h1>

        <p className="sage-elem text-xs sm:text-sm uppercase tracking-[0.25em] text-[#5e6952] mb-10">
          {formatDate(invitation.weddingDate)}
          <span className="mx-2 text-[#93a67a]">·</span>
          Saat {invitation.weddingTime}
        </p>

        {invitation.heroImage && (
          <div className="sage-elem relative w-full max-w-xl mx-auto my-4">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#e7ecdd] shadow-[0_25px_60px_rgba(72,89,54,0.12)]">
              <img
                src={invitation.heroImage}
                alt={`${invitation.groomName} & ${invitation.brideName}`}
                className="w-full aspect-[4/5] sm:aspect-[4/3] object-cover"
              />
            </div>
          </div>
        )}

        {invitation.customText && (
          <div className="sage-elem max-w-xl mx-auto mt-10 text-[#4f5943] text-base sm:text-lg leading-relaxed font-serif italic">
            {invitation.customText}
          </div>
        )}
      </section>

      {/* Countdown */}
      <section className="relative px-6 py-16">
        <div className="sage-elem max-w-xl mx-auto rounded-[2rem] p-7 sm:p-9 bg-white/60 backdrop-blur-sm border border-[#d7e0c5] shadow-[0_15px_40px_rgba(72,89,54,0.06)]">
          <p className="text-[9px] uppercase tracking-[0.35em] text-[#7e9463] mb-6 text-center font-medium">
            Böyük günə qalan vaxt
          </p>
          <CountdownTimer
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            theme="minimal"
          />
          <div className="mt-7 text-center">
            <CalendarExportButton
              brideName={invitation.brideName}
              groomName={invitation.groomName}
              weddingDate={invitation.weddingDate}
              weddingTime={invitation.weddingTime}
              venue={invitation.venue}
              address={invitation.address}
              className="!bg-[#7e9463] !border-[#7e9463] !text-white hover:!bg-[#6c8153] !rounded-full px-6 py-3 text-[10px] uppercase tracking-[0.18em]"
            />
          </div>
        </div>
      </section>

      {/* Schedule */}
      {invitation.schedule && invitation.schedule.length > 0 && (
        <section className="relative py-20 px-6 border-t border-[#d7e0c5]/60">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="sage-elem flex justify-center items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#a8b891]" />
                <Leaf className="w-4 h-4 text-[#7e9463]" strokeWidth={1.2} />
                <span className="w-8 h-px bg-[#a8b891]" />
              </div>
              <h3 className="sage-elem text-[10px] uppercase tracking-[0.4em] text-[#5e6952] font-medium">
                Toy Proqramı
              </h3>
            </div>

            <div className="space-y-4">
              {invitation.schedule.map((item, idx) => (
                <div
                  key={idx}
                  className="sage-elem flex items-center gap-5 rounded-2xl bg-white/60 border border-[#d7e0c5] px-5 py-4"
                >
                  <div className="shrink-0 w-14 h-14 rounded-full bg-[#eaf0dd] flex items-center justify-center text-[11px] font-semibold text-[#5e7148] uppercase tracking-tight text-center leading-tight">
                    {item.time}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-serif text-[#38402f]">{item.title}</h4>
                    {item.description && (
                      <p className="text-xs sm:text-sm text-[#6a7460]">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Venue */}
      <section className="py-20 px-6 border-t border-[#d7e0c5]/60">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="sage-elem w-12 h-12 mx-auto mb-5 rounded-full bg-[#eaf0dd] flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#5e7148]" strokeWidth={1.3} />
            </div>
            <p className="sage-elem text-[10px] uppercase tracking-[0.4em] text-[#7e9463] mb-3">
              Mərasim məkanı
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#38402f] mb-2">{invitation.venue}</h3>
            <p className="text-sm text-[#6a7460]">{invitation.address}</p>
          </div>

          <div className="rounded-[1.75rem] overflow-hidden mb-8 border border-[#d7e0c5]">
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7e9463] text-white text-[10px] uppercase tracking-[0.15em] hover:bg-[#6c8153] transition-colors"
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#a8b891] text-[#5e6952] text-[10px] uppercase tracking-[0.15em] hover:bg-[#eaf0dd] transition-colors"
            >
              <Car className="w-3.5 h-3.5" /> Waze
            </a>
            {invitation.contactPhone && (
              <a
                href={`tel:${invitation.contactPhone}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#a8b891] text-[#5e6952] text-[10px] uppercase tracking-[0.15em] hover:bg-[#eaf0dd] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> {invitation.contactPhone}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp-sage" className="relative py-20 px-6 bg-[#eef2e5]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="sage-elem flex justify-center items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#a8b891]" />
              <Leaf className="w-4 h-4 text-[#7e9463]" strokeWidth={1.2} />
              <span className="w-8 h-px bg-[#a8b891]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#38402f] mb-3">
              Sizinlə görüşməkdən
              <br />
              məmnun olarıq
            </h2>
            <p className="text-xs sm:text-sm text-[#6a7460]">
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
      <footer className="py-12 px-6 text-center bg-[#3c4536] text-[#d9e0cc]">
        <div className="flex justify-center items-center gap-3 mb-5">
          <span className="w-10 h-px bg-[#7e9463]" />
          <Leaf className="w-4 h-4 text-[#a8b891]" strokeWidth={1.2} />
          <span className="w-10 h-px bg-[#7e9463]" />
        </div>
        <p className="font-serif text-xl text-[#f2f5ea] mb-3">
          {invitation.groomName} & {invitation.brideName}
        </p>
        <p className="text-[9px] uppercase tracking-[0.35em] text-[#a8b891]">
          © {new Date().getFullYear()} · Toy Dəvətnaməsi
        </p>
      </footer>
    </div>
  );
};
