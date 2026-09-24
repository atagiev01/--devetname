import React from 'react';
import { TemplateRenderProps } from './types';
import { CountdownTimer } from '../components/public/CountdownTimer';
import { RSVPForm } from '../components/public/RSVPForm';
import { MusicPlayer } from '../components/public/MusicPlayer';
import { CalendarExportButton } from '../components/public/CalendarExportButton';
import { MapPin, Phone, Navigation, Car, Sparkles } from 'lucide-react';
import { toLocaleDateAz } from '../utils/azDate';

// Строка с CSS-стилями для анимации
const scrollAnimationStyles = `
  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: scale(0.8); 
    }
    to { 
      opacity: 1; 
      transform: scale(1); 
    }
  }
  .elem {
    animation: fadeIn linear both;
    animation-timeline: view();
    animation-range: entry 10% cover 30%;
  }
`;

export const MinimalWeddingTemplate: React.FC<TemplateRenderProps> = ({
  invitation,
  template,
  isGuestMode = true,
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
      id="minimal-template-root"
      className="
        min-h-screen
        bg-[#f7f3ed]
        text-[#332a24]
        selection:bg-[#d8c5a5]
        selection:text-[#241d18]
        overflow-x-clip
        relative
        font-sans
      "
    >
      {/* Внедрение стилей анимации внутрь JSX */}
      <style>{scrollAnimationStyles}</style>

      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#e9dcc8]/30 blur-3xl" />
        <div className="absolute top-[45%] -right-40 w-96 h-96 rounded-full bg-[#e2d2bd]/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-[#d9c5a7]/10 blur-3xl" />
      </div>

      {/* Hidden Music Player */}
      {invitation.music && (
        <div className="fixed w-0 h-0 overflow-hidden opacity-0 pointer-events-none">
          <MusicPlayer
            musicUrl={invitation.music}
            musicTitle={
              invitation.musicTitle ||
              `${invitation.brideName} & ${invitation.groomName}`
            }
            theme="minimal"
          />
        </div>
      )}

      {/* Top Navbar */}
      <header
        className="
          sticky top-0 z-30 w-full
          bg-[#f7f3ed]/90
          backdrop-blur-xl
          border-b border-[#c9b79d]/30
          px-5 py-4
        "
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-7 h-px bg-[#ad9675]" />
            <span className="
              text-[10px]
              uppercase
              tracking-[0.32em]
              font-medium
              text-[#756556]
            ">
              {invitation.groomName} & {invitation.brideName}
            </span>
          </div>

          <a
            href="#rsvp-section-minimal"
            className="
              group
              px-5 py-2
              rounded-full
              border border-[#9d8564]
              bg-[#3b3028]
              text-[#f7f1e8]
              text-[10px]
              uppercase
              tracking-[0.2em]
              font-medium
              transition-all
              duration-300
              hover:bg-[#514238]
              hover:shadow-lg
              hover:shadow-[#8e7655]/20
            "
          >
            RSVP
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="
          relative
          min-h-[92vh]
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-6
          py-24
        "
      >
        {/* Small ornament */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-10 h-px bg-[#b59c7b]" />
          <Sparkles className="w-4 h-4 text-[#a98d68]" strokeWidth={1.2} />
          <span className="w-10 h-px bg-[#b59c7b]" />
        </div>

        <span className="
          text-[10px]
          uppercase
          tracking-[0.45em]
          text-[#9b8264]
          font-medium
          mb-7
          emel
        ">
          Evlilik Mərasimi
        </span>

        <h1
          className="
            text-5xl
            sm:text-7xl
            md:text-8xl
            font-serif
            font-normal
            text-[#30261f]
            leading-[0.95]
            tracking-[-0.03em]
            mb-8
          "
        >
          {invitation.groomName}
          <span className="
            block
            sm:inline
            mx-2
            sm:mx-5
            italic
            font-light
            text-[#aa9375]
          ">
            &
          </span>
          {invitation.brideName}
        </h1>

        <div className="flex items-center gap-4 mb-7">
          <span className="w-16 h-px bg-[#c8b79f]" />
          <span className="text-[#9c8465] text-sm">✦</span>
          <span className="w-16 h-px bg-[#c8b79f]" />
        </div>

        <p className="
          text-xs
          sm:text-sm
          uppercase
          tracking-[0.28em]
          text-[#66584c]
          mb-10
          font-medium
        ">
          {formatDate(invitation.weddingDate)}
          <span className="mx-2 text-[#b19b80]">•</span>
          Saat {invitation.weddingTime}
        </p>

        {/* Hero Photo */}
        {invitation.heroImage && (
          <div className="relative w-full max-w-2xl mx-auto my-7">
            {/* Outer frame */}
            <div className="
              absolute
              -inset-3
              border
              border-[#bda889]/50
              pointer-events-none
            " />

            <div className="
              absolute
              -inset-6
              border
              border-[#d5c6b1]/40
              pointer-events-none
            " />

            <div className="
              relative
              overflow-hidden
              bg-[#e8dfd4]
              shadow-[0_25px_70px_rgba(72,54,37,0.15)]
            ">
              <img
                src={invitation.heroImage}
                alt={`${invitation.groomName} & ${invitation.brideName}`}
                className="
                  w-full
                  aspect-[4/3]
                  object-cover
                  transition-transform
                  duration-1000
                  hover:scale-[1.025]
                "
              />

              <div className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#211912]/10
                via-transparent
                to-white/5
                pointer-events-none
              " />
            </div>
          </div>
        )}

        {/* Custom Text */}
        <div className="
        elem
          max-w-xl
          mx-auto
          mt-12
          mb-10
          text-[#66584c]
          text-base
          sm:text-lg
          leading-relaxed
          font-serif
          italic
        ">
          <span className="text-3xl text-[#b19a7a] align-top mr-1">“</span>
          {invitation.customText}
          <span className="text-3xl text-[#b19a7a] align-bottom ml-1">”</span>
        </div>

        {/* Countdown */}
        <div className="
        elem
          w-full
          max-w-xl
          p-5
          sm:p-7
          border
          border-[#cbb99f]/60
          bg-[#fbf8f3]/70
          backdrop-blur-sm
          shadow-[0_15px_50px_rgba(70,53,38,0.06)]
        ">
          <div className="
          elem
            text-[9px]
            uppercase
            tracking-[0.4em]
            text-[#a08869]
            mb-5
          ">
            Böyük günə qalan vaxt
          </div>

          <CountdownTimer
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            theme="minimal"
          />
        </div>

        {/* Calendar */}
        <div className="mt-7">
          <CalendarExportButton
            brideName={invitation.brideName}
            groomName={invitation.groomName}
            weddingDate={invitation.weddingDate}
            weddingTime={invitation.weddingTime}
            venue={invitation.venue}
            address={invitation.address}
            className="
              !bg-[#3b3028]
              !border-[#3b3028]
              !text-[#f8f2e9]
              hover:!bg-[#514238]
              !rounded-full
              px-6
              py-3
              text-[10px]
              uppercase
              tracking-[0.18em]
            "
          />
        </div>
      </section>

      {/* Schedule */}
      {invitation.schedule && invitation.schedule.length > 0 && (
        <section
          className="
            
            relative
            py-24
            px-6
            border-t
            border-[#cbbba5]/40
            bg-[#eee7dd]
          "
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-14">
              <div className=" elem flex justify-center items-center gap-3 mb-5">
                <span className="w-8 h-px bg-[#b49a79]" />
                <span className="text-[#a58a69] text-xs">✦</span>
                <span className="w-8 h-px bg-[#b49a79]" />
              </div>

              <h3 className="
                text-[10px]
                uppercase
                tracking-[0.4em]
                text-[#92785a]
                font-medium
                elem
              ">
                Toy Proqramı
              </h3>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="
              elem
                absolute
                left-[7px]
                top-2
                bottom-2
                w-px
                bg-[#c5b39a]
              " />

              <div className="space-y-9">
                {invitation.schedule.map((item, idx) => (
                  <div key={idx} className="relative elem flex gap-7">
                    {/* Dot */}
                    <div className="
                    elem
                      relative
                      z-10
                      mt-1
                      w-[15px]
                      h-[15px]
                      shrink-0
                      rounded-full
                      border
                      border-[#a88e6d]
                      bg-[#eee7dd]
                    ">
                      <div className="
                        absolute
                        inset-[4px]
                        rounded-full
                        bg-[#a88e6d]
                      " />
                    </div>

                    <div className="
                      flex-1
                      pb-7
                      border-b
                      border-[#d5c7b5]
                    ">
                      <div className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-2
                        mb-2
                      ">
                        <h4 className="
                          text-base
                          sm:text-lg
                          font-serif
                          text-[#3a2e25]
                        ">
                          {item.title}
                        </h4>

                        <span className="
                          text-[10px]
                          uppercase
                          tracking-[0.18em]
                          text-[#8f7659]
                          font-medium
                        ">
                          {item.time}
                        </span>
                      </div>

                      {item.description && (
                        <p className="
                          text-xs
                          sm:text-sm
                          text-[#76685c]
                          leading-relaxed
                        ">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Venue */}
      <section
        className="
          
          py-24
          px-6
          border-t
          border-[#cbbba5]/40
          bg-[#f7f3ed]
        "
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="
            elem
              w-12
              h-12
              mx-auto
              mb-5
              rounded-full
              border
              border-[#c3ae91]
              flex
              items-center
              justify-center
            ">
              <MapPin className="w-5 h-5 text-[#947957]" strokeWidth={1.3} />
            </div>

            <p className="
            elem
              text-[10px]
              uppercase
              tracking-[0.4em]
              text-[#9b8162]
              mb-3
            ">
              Mərasim məkanı
            </p>

            <h3 className="
              text-3xl
              sm:text-4xl
              font-serif
              text-[#342920]
              mb-3
            ">
              {invitation.venue}
            </h3>

            <p className="text-sm text-[#786a5d]">
              {invitation.address}
            </p>
          </div>

          {/* Map */}
          <div className="
            relative
            mb-8
            p-2
            border
            border-[#c6b49a]
            bg-[#eee7dc]
          ">
            <div className="
              overflow-hidden
              aspect-[4/3]
              sm:aspect-[16/8]
            ">
              <iframe
                title="Mərasim məkanının xəritəsi"
                src={`https://www.google.com/maps?q=${
                  invitation.mapCoordinates?.lat &&
                  invitation.mapCoordinates?.lng
                    ? `${invitation.mapCoordinates.lat},${invitation.mapCoordinates.lng}`
                    : encodeURIComponent(
                        `${invitation.venue}${invitation.address}`
                      )
                }&output=embed`}
                className="
                  w-full
                  h-full
                  grayscale
                  contrast-[1.05]
                  opacity-90
                "
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Navigation buttons */}
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
              className="
                inline-flex
                items-center
                gap-2
                px-6
                py-3
                rounded-full
                bg-[#3b3028]
                text-[#f8f2e9]
                text-[10px]
                uppercase
                tracking-[0.15em]
                font-medium
                transition-all
                hover:bg-[#514238]
              "
            >
              <Navigation className="w-3.5 h-3.5" />
              Xəritə
            </a>

            <a
              href={
                invitation.wazeUrl ||
                `https://waze.com/ul?q=${encodeURIComponent(
                  `${invitation.venue}${invitation.address}`
                )}&navigate=yes`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                gap-2
                px-6
                py-3
                rounded-full
                border
                border-[#bba78d]
                text-[#705d48]
                text-[10px]
                uppercase
                tracking-[0.15em]
                font-medium
                hover:bg-[#eee7dc]
                transition-colors
              "
            >
              <Car className="w-3.5 h-3.5" />
              Waze
            </a>

            {invitation.contactPhone && (
              <a
                href={`tel:${invitation.contactPhone}`}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  py-3
                  rounded-full
                  border
                  border-[#bba78d]
                  text-[#705d48]
                  text-[10px]
                  uppercase
                  tracking-[0.15em]
                  font-medium
                  hover:bg-[#eee7dc]
                  transition-colors
                "
              >
                <Phone className="w-3.5 h-3.5" />
                {invitation.contactPhone}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section
        id="rsvp-section-minimal"
        className="
          
          relative
          py-24
          px-6
          bg-[#eae1d6]
        "
      >
        <div className="
        elem
          max-w-2xl
          mx-auto
          px-5
          py-12
          sm:px-12
        ">
          <div className="text-center mb-8">
            <div className="
            elem
              flex
              justify-center
              items-center
              gap-3
              mb-5
            ">
              <span className="w-8 h-px bg-[#b49b7a]" />
              <span className="text-[#a58b6a]">✦</span>
              <span className="w-8 h-px bg-[#b49b7a]" />
            </div>

            <h2 className="
            elem
              text-3xl
              sm:text-4xl
              font-serif
              text-[#372b22]
              mb-3
            ">
              Sizinlə görüşməkdən
              <br />
              məmnun olarıq
            </h2>

            <p className="
            elem
              text-xs
              sm:text-sm
              text-[#76685c]
            ">
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
            theme="gold"
          />
        </div>
      </section>

      {/* Footer */}
      <footer
        className="
          elem
          py-12
          px-6
          text-center
          border-t
          border-[#cbbba5]/40
          bg-[#3b3028]
          text-[#d8cbb9]
        "
      >
        <div className="
          flex
          justify-center
          items-center
          gap-3
          mb-5
        ">
          <span className="w-10 h-px bg-[#9e876b]" />
          <span className="text-[#c3aa88]">✦</span>
          <span className="w-10 h-px bg-[#9e876b]" />
        </div>

        <p className="
          font-serif
          text-xl
          text-[#f1e9df]
          mb-3
        ">
          {invitation.groomName} & {invitation.brideName}
        </p>

        <p className="
          text-[9px]
          uppercase
          tracking-[0.35em]
          text-[#ad9b87]
        ">
          © {new Date().getFullYear()} · Toy Dəvətnaməsi
        </p>
      </footer>
    </div>
  );
};