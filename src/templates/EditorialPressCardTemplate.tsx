import React, { useEffect, useRef, useState } from 'react';
import { TemplateRenderProps } from './types';
import { CountdownTimer } from '../components/public/CountdownTimer';
import confetti from 'canvas-confetti';
import {
  Phone,
  Navigation,
  Car,
  CalendarPlus,
  Check,
  X,
  MapPin,
  Send,
  VolumeX,
} from 'lucide-react';
import {
  buildHeadingStack,
  buildBodyStack,
  firstFamily,
} from '../data/fontOptions';
import { toLocaleDateAz, weekdayAz } from '../utils/azDate';

// ---------------------------------------------------------------------------
// Editorial Press — Card
// ---------------------------------------------------------------------------

export const CARD_DEFAULTS = {
  wedding: {
    intro: 'Sizi toyumuza dəvət edirik',
    title: 'TOYUMUZA\nDƏVƏT',
    receptionNote: 'Ziyafət davam edəcək',
    familiesLabel: 'Ailələrimizlə birlikdə',
  },

  birthday: {
    intro: 'Sizi ad günümə dəvət edirik',
    title: 'AD\nGÜNÜ',
    receptionNote: 'Tort və əyləncə',
    familiesLabel: 'Bu xüsusi gündə',
  },
};

export const EDITORIAL_CARD_DEFAULTS = CARD_DEFAULTS.wedding;

type Variant = 'wedding' | 'birthday';

const CSS = `
/* =========================================================
   SCROLL REVEAL
   ========================================================= */

@media (max-width: 600px) {

  .epc-root .elem {
    transform: translate3d(0, 30px, 0) scale(.96);
  }

  .epc-root .elem.epc-visible {
    transform: translate3d(0, 0, 0) scale(1);
  }

}




.epc-root .elem {
  opacity: 0;
  transform: translate3d(0, 45px, 0) scale(.94);

  transition:
    opacity .75s cubic-bezier(.22, .61, .36, 1),
    transform .75s cubic-bezier(.22, .61, .36, 1);

  will-change: opacity, transform;
}

.epc-root .elem.epc-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}



/* =========================================================
   ROOT
   ========================================================= */

.epc-root {
  min-height: 100vh;
  background: #eeeeec;
  color: #292929;
  font-family: var(--epc-heading);
  overflow-x: hidden;
  scroll-behavior: smooth;
  font-variant-numeric: lining-nums;
}

.epc-ui {
  font-family: var(--epc-body);
}

.epc-root *,
.epc-root *::before,
.epc-root *::after {
  box-sizing: border-box;
}

/* =========================================================
   COVER PAGE
   ========================================================= */

.epc-page {
  padding: 70px 20px 60px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  background:
    radial-gradient(
      circle at center,
      #ffffff 0%,
      #eeeeec 60%,
      #e7e7e5 100%
    );
}

.epc-card {
  position: relative;

  width: min(490px, 92vw);
  min-height: 690px;

  background: #fbfaf7;

  box-shadow:
    0 25px 60px rgba(0, 0, 0, .16),
    0 5px 15px rgba(0, 0, 0, .06);

  overflow: hidden;

  padding: 46px 42px 38px;
}

.epc-card::before {
  content: "";
  position: absolute;
  inset: 0;

  pointer-events: none;

  opacity: .15;

  background-image:
    radial-gradient(
      rgba(0, 0, 0, .15) .5px,
      transparent .5px
    );

  background-size: 5px 5px;
}

/* =========================================================
   TOP
   ========================================================= */

.epc-top {
  position: relative;
  z-index: 2;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 12px;
  margin-bottom: 4px;
}

.epc-kindly {
  font-size: 15px;
  font-style: italic;
  letter-spacing: .4px;
  color: #353535;
}

.epc-venue-top {
  font-family: var(--epc-body);

  font-size: 9px;
  letter-spacing: 3px;

  text-transform: uppercase;

  padding-top: 8px;

  color: #343434;

  text-align: right;
}

/* =========================================================
   TITLE
   ========================================================= */

.epc-title-area {
  position: relative;
  z-index: 3;

  margin-top: -5px;

  width: 72%;
}

.epc-title {
  font-family: var(--epc-heading);

  font-size: var(--epc-ts, 80px);

  font-weight: 300;

  line-height: .72;

  letter-spacing: -4px;

  color: #292929;

  text-transform: uppercase;

  margin: 0;
}

.epc-title span {
  display: block;
}

/* =========================================================
   VERTICAL INFORMATION
   ========================================================= */

.epc-vertical {
  position: absolute;

  z-index: 5;

  top: 92px;
  bottom: 140px;
  right: 25px;

  display: flex;

  align-items: center;
  justify-content: center;
}

.epc-vertical-inner {
  writing-mode: vertical-rl;
  text-orientation: mixed;

  font-size: 11px;

  letter-spacing: 1.4px;

  color: #3e3e3e;

  white-space: nowrap;

  max-height: 100%;

  overflow: hidden;

  text-overflow: ellipsis;
}

.epc-vertical-inner strong {
  font-weight: 500;
}

/* =========================================================
   PHOTO
   ========================================================= */

.epc-photo {
  position: relative;

  z-index: 2;

  margin-top: -5px;
  margin-left: 16px;

  width: calc(100% - 28px);

  height: 280px;

  overflow: hidden;

  background: #ddd;
}

.epc-photo img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;

  filter:
    saturate(.78)
    contrast(.96)
    brightness(1.02);

  transition:
    transform 1.2s ease,
    filter .8s ease;
}

.epc-card:hover .epc-photo img {
  transform: scale(1.025);

  filter:
    saturate(.9)
    contrast(1)
    brightness(1.02);
}

/* =========================================================
   NAMES
   ========================================================= */

.epc-names {
  position: relative;

  z-index: 4;

  display: flex;

  justify-content: center;
  align-items: center;

  margin-top: 15px;

  white-space: nowrap;
}

.epc-name {
  font-size: var(--epc-ns, 52px);

  line-height: 1;

  font-weight: 300;

  letter-spacing: -2.5px;

  color: #292929;

  text-transform: uppercase;
}

.epc-amp {
  font-size: calc(var(--epc-ns, 52px) * 1.1);

  font-style: italic;

  font-weight: 300;

  margin: 0 6px;

  color: #383838;

  line-height: 1;
}

/* =========================================================
   DATE
   ========================================================= */

.epc-date {
  position: relative;

  z-index: 3;

  margin-top: 16px;

  text-align: center;

  font-family: var(--epc-body);

  font-size: 9px;

  letter-spacing: 3px;

  text-transform: uppercase;

  color: #343434;
}

/* =========================================================
   DETAILS
   ========================================================= */

.epc-details {
  background: #f7f5f0;

  padding: 100px 25px;

  animation: epcFadeIn 1s ease both;
}

@keyframes epcFadeIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.epc-details-inner {
  width: min(850px, 100%);

  margin: auto;

  text-align: center;
}

.epc-mono {
  font-family: var(--epc-body);

  font-size: 9px;

  letter-spacing: 4px;

  text-transform: uppercase;
}

.epc-h2 {
  font-size: clamp(50px, 9vw, 90px);

  font-weight: 300;

  line-height: .9;

  margin-bottom: 25px;

  text-transform: uppercase;
}

.epc-lead {
  max-width: 600px;

  margin: 0 auto 45px;

  font-size: 18px;

  line-height: 1.8;

  color: #555;
}

.epc-age {
  font-size: clamp(90px, 22vw, 150px);

  font-weight: 300;

  font-style: italic;

  line-height: .85;

  margin-bottom: 8px;
}

.epc-val {
  font-family: var(--epc-heading);

  font-size: 22px;

  line-height: 1.2;

  text-align: right;
}

.epc-section-label {
  font-family: var(--epc-body);

  font-size: 9px;

  letter-spacing: 4px;

  text-transform: uppercase;

  color: rgba(41, 41, 41, .55);
}

/* =========================================================
   BOTTOM NAVIGATION
   ========================================================= */

.epc-root {
  padding-bottom:
    calc(
      64px +
      env(safe-area-inset-bottom, 0px)
    );
}

.epc-nav {
  position: fixed;

  left: 0;
  right: 0;
  bottom: 0;

  z-index: 40;

  background: #292929;

  color: #faf9f6;

  border-top:
    1px solid rgba(250, 249, 246, .12);

  padding-bottom:
    env(safe-area-inset-bottom, 0px);
}

.epc-nav-inner {
  display: grid;

  grid-auto-flow: column;

  grid-auto-columns: 1fr;

  max-width: 520px;

  margin: 0 auto;

  height: 64px;
}

.epc-nav-btn {
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 5px;

  font-family: var(--epc-body);

  font-size: 9px;

  letter-spacing: 2px;

  text-transform: uppercase;

  color: rgba(250, 249, 246, .85);

  background: transparent;

  border: 0;

  cursor: pointer;

  text-decoration: none;

  transition:
    background .2s ease,
    color .2s ease;

  -webkit-tap-highlight-color: transparent;
}

.epc-nav-btn + .epc-nav-btn {
  border-left:
    1px solid rgba(250, 249, 246, .1);
}

.epc-nav-btn:hover,
.epc-nav-btn:active {
  background: rgba(250, 249, 246, .08);

  color: #fff;
}

/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 600px) {

  .epc-page {
    padding: 25px 12px 32px;
  }

  .epc-card {
    width: 100%;

    min-height: 620px;

    padding: 32px 27px 30px;
  }

  .epc-kindly {
    font-size: 13px;
  }

  .epc-venue-top {
    font-size: 8px;

    letter-spacing: 2px;
  }

  .epc-title {
    font-size:
      calc(var(--epc-ts, 80px) * .72);

    letter-spacing: -3px;
  }

  .epc-title-area {
    width: 75%;
  }

  .epc-vertical {
    right: 15px;

    top: 76px;

    bottom: 122px;
  }

  .epc-vertical-inner {
    font-size: 9px;

    letter-spacing: 1px;
  }

  .epc-photo {
    height: 240px;

    margin-left: 8px;

    width: calc(100% - 15px);
  }

  .epc-name {
    font-size:
      calc(var(--epc-ns, 52px) * .75);

    letter-spacing: -2px;
  }

  .epc-date {
    font-size: 8px;

    letter-spacing: 2.5px;
  }

  .epc-details {
    padding: 80px 20px;
  }
}
`;

/* =========================================================
   DATE
   ========================================================= */

const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null;

  const d = new Date(`${dateStr}T12:00:00`);

  return isNaN(d.getTime()) ? null : d;
};

/* =========================================================
   COMPONENT
   ========================================================= */

const EditorialCard: React.FC<
  TemplateRenderProps & {
    variant: Variant;
  }
> = ({
  invitation,
  template,
  variant,
}) => {

  const isBirthday = variant === 'birthday';

  const D = CARD_DEFAULTS[variant];

  const celebrant = invitation.groomName;

  const age =
    (invitation.celebrantAge || '').trim();

  const namesLabel = isBirthday
    ? celebrant
    : `${invitation.groomName} & ${invitation.brideName}`;

  /* =======================================================
     MUSIC
     ======================================================= */

  const musicSrc =
    invitation.musicEnabled !== false &&
    invitation.music &&
    invitation.music.trim() &&
    invitation.music !== 'none'
      ? invitation.music.trim()
      : '';

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const manualRef =
    useRef(false);

  const [playing, setPlaying] =
    useState(false);

  const rootRef =
    useRef<HTMLDivElement | null>(null);

  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

useEffect(() => {
  const root = rootRef.current;
  if (!root) return;

  const elements = Array.from(
    root.querySelectorAll<HTMLElement>('.elem')
  );

  if (!elements.length) return;

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (reduceMotion) {
    elements.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'translate3d(0, 0, 0) scale(1)';
    });

    return;
  }

  let raf = 0;

  const update = () => {
    raf = 0;

    const viewportHeight = window.innerHeight;

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();

      /*
       * Animasiya:
       *
       * viewport-un aşağısından daxil olur
       *        ↓
       * kiçik + şəffaf
       *        ↓
       * normal ölçü + görünən
       *        ↓
       * viewport-un yuxarısından çıxır
       *        ↓
       * yenidən kiçik + şəffaf
       */

      const start = viewportHeight * 0.75;
      const end = viewportHeight * .30;

      let progress = (start - rect.top) / (start - end);

      progress = Math.max(0, Math.min(1, progress));

      /*
       * Daha yumşaq hərəkət
       */
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-1 * progress + 1, 1) / 1;

      /*
       * Kiçik → böyük
       */
      const minScale = 0.9;
      const scale = minScale + (1 - minScale) * eased;

      /*
       * Aşağı → yuxarı
       */
      const translateY = 10 * (1 - eased);

      /*
       * Şəffaf → görünən
       */
      const opacity = eased;

      el.style.opacity = String(opacity);
      el.style.transform =
        `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    });
  };

  const onScroll = () => {
    if (!raf) {
      raf = requestAnimationFrame(update);
    }
  };

  update();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);

    if (raf) {
      cancelAnimationFrame(raf);
    }
  };
}, []);

  /* =======================================================
     MUSIC AUTOPLAY / FALLBACK
     ======================================================= */

  useEffect(() => {

    if (!musicSrc) return;

    const audio =
      audioRef.current;

    if (!audio) return;

    let started = false;

    const events:
      (keyof WindowEventMap)[] = [
        'pointerup',
        'click',
        'touchend',
        'keydown',
      ];

    const removeListeners = () => {

      events.forEach((event) => {
        window.removeEventListener(
          event,
          tryPlay
        );
      });
    };

    function tryPlay() {

      if (
        started ||
        manualRef.current ||
        !audio
      ) {
        return;
      }

      audio
        .play()
        .then(() => {

          started = true;

          setPlaying(true);

          removeListeners();
        })
        .catch(() => {
          // Browser autoplay bloklaya bilər.
        });
    }

    tryPlay();

    events.forEach((event) => {

      window.addEventListener(
        event,
        tryPlay
      );

    });

    return () => {

      removeListeners();

      audio.pause();
    };

  }, [musicSrc]);

  const toggleMusic = (
    e: React.MouseEvent
  ) => {

    e.stopPropagation();

    const audio =
      audioRef.current;

    if (!audio) return;

    manualRef.current = true;

    if (playing) {

      audio.pause();

      setPlaying(false);

      return;
    }

    audio
      .play()
      .then(() => {
        setPlaying(true);
      })
      .catch(() => {
        setPlaying(false);
      });
  };

  /* =======================================================
     NAVIGATION
     ======================================================= */

  const scrollToId = (id: string) => {

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  };

  /* =======================================================
     FONTS
     ======================================================= */

  const headingFamily =
    firstFamily(
      template?.themeConfig
        ?.fontFamilyHeading
    ) || 'Cormorant Garamond';

  const bodyFamily =
    firstFamily(
      template?.themeConfig
        ?.fontFamilyBody
    ) || 'Inter';

  const headingStack =
    buildHeadingStack(
      headingFamily
    );

  const bodyStack =
    buildBodyStack(
      bodyFamily
    );

  /* =======================================================
     CARD CONTENT
     ======================================================= */

  const intro =
    invitation.cardIntro?.trim() ||
    D.intro;

  const titleRaw =
    invitation.cardTitle?.trim() ||
    D.title;

  const receptionNote =
    invitation.cardReceptionNote?.trim() ||
    D.receptionNote;

  const titleLines =
    titleRaw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 4);

  const longestTitle =
    Math.max(
      1,
      ...titleLines.map(
        (line) => line.length
      )
    );

  const titleSize =
    Math.max(
      44,
      Math.min(
        92,
        Math.round(
          330 /
            (longestTitle * .58)
        )
      )
    );

  const namesLength =
    isBirthday
      ? celebrant.length +
        age.length +
        2
      : invitation.groomName.length +
        invitation.brideName.length;

  const nameSize =
    Math.max(
      28,
      Math.min(
        58,
        Math.round(
          400 /
            (namesLength * .6 + 3)
        )
      )
    );

  /* =======================================================
     DATE
     ======================================================= */

  const d =
    parseDate(
      invitation.weddingDate
    );

  const dateCardLine = d
    ? [
        weekdayAz(d),

        toLocaleDateAz(d, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),

        invitation.weddingTime,
      ]
        .join(' · ')
        .toLocaleUpperCase('az-AZ')
    : `${invitation.weddingDate} · ${invitation.weddingTime}`;

  const dateShort = d
    ? toLocaleDateAz(d, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : invitation.weddingDate;

  /* =======================================================
     ADDRESS / VENUE
     ======================================================= */

  const addressLine =
    [
      invitation.address,
      invitation.city,
    ]
      .filter(Boolean)
      .join(', ');

  const verticalParts =
    [
      invitation.weddingTime,
      addressLine,
      receptionNote,
    ].filter(Boolean);

  const venueQuery =
    encodeURIComponent(
      `${invitation.venue || ''} ${
        invitation.address || ''
      }`.trim()
    );

  /* =======================================================
     PHONE
     ======================================================= */

  const getCleanPhone = (
    phone?: string
  ): string => {

    const digits =
      (phone || '').replace(
        /\D/g,
        ''
      );

    if (!digits) {
      return '994501234567';
    }

    if (digits.startsWith('994')) {
      return digits;
    }

    if (digits.startsWith('0')) {
      return '994' + digits.slice(1);
    }

    if (digits.length === 9) {
      return '994' + digits;
    }

    return digits;
  };

  /* =======================================================
     WHATSAPP
     ======================================================= */

  const sendWhatsApp = (
    attending: boolean
  ) => {

    if (attending) {

      confetti({
        particleCount: 70,

        spread: 60,

        origin: {
          y: .8,
        },

        colors: [
          '#faf9f6',
          '#292929',
          '#bdbab2',
        ],
      });
    }

    const msg =
      isBirthday
        ? attending
          ? `Salam! ${celebrant}-in ad günü mərasimində böyük məmnuniyyətlə iştirak edəcəyəm. Ad günün mübarək! 🎂`
          : `Salam! Təəssüf ki, ${celebrant}-in ad günü mərasimində iştirak edə bilməyəcəyəm. Ad günün mübarək, bir ömür xoşbəxtlik arzulayıram! 🎈`
        : attending
          ? `Salam! ${invitation.groomName} və ${invitation.brideName}-in toy mərasimində böyük məmnuniyyətlə iştirak edəcəyəm. Təbriklər və xoşbəxtliklər arzulayıram! 🎉`
          : `Salam! Təəssüf ki, ${invitation.groomName} və ${invitation.brideName}-in toy mərasimində iştirak edə bilməyəcəyəm. Bəy və gəlinə bir ömür boyu səadət və xoşbəxtlik arzulayıram! 💐`;

    const phone =
      getCleanPhone(
        invitation.contactPhone
      );

    const url =
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

    window.open(
      url,
      '_blank'
    );
  };

  /* =======================================================
     PARENTS
     ======================================================= */

  const parents =
    (
      isBirthday
        ? []
        : [
            invitation.groomParents,
            invitation.brideParents,
          ]
    ).filter(
      (
        parent
      ): parent is string =>
        !!parent &&
        parent.trim().length > 0
    );

  /* =======================================================
     MAP / WAZE
     ======================================================= */

  const mapHref =
    invitation.mapCoordinates?.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${venueQuery}`;

  const wazeHref =
    invitation.wazeUrl ||
    `https://waze.com/ul?q=${venueQuery}&navigate=yes`;

  /* =======================================================
     GOOGLE CALENDAR
     ======================================================= */

  const calendarHref =
    (() => {

      const ymd =
        (
          invitation.weddingDate ||
          ''
        ).replace(
          /-/g,
          ''
        );

      const time =
        invitation.weddingTime ||
        '18:00';

      const hm =
        time.replace(
          ':',
          ''
        );

      const startHour =
        parseInt(
          time.split(':')[0],
          10
        );

      const endHour =
        String(
          (startHour + 5) % 24
        ).padStart(
          2,
          '0'
        );

      const title =
        encodeURIComponent(
          isBirthday
            ? `${celebrant} — Ad günü`
            : `${invitation.groomName} & ${invitation.brideName} Toy Mərasimi`
        );

      const where =
        encodeURIComponent(
          `${invitation.venue || ''}, ${
            invitation.address || ''
          }`
        );

      return (
        `https://calendar.google.com/calendar/render` +
        `?action=TEMPLATE` +
        `&text=${title}` +
        `&dates=${ymd}T${hm}00/${ymd}T${endHour}${hm.slice(2)}00` +
        `&location=${where}`
      );

    })();

  /* =======================================================
     ACTION TILES
     ======================================================= */

  const tiles: {
    label: string;
    href: string;
    icon: React.ReactNode;
    external?: boolean;
  }[] = [

    {
      label: 'Xəritə',

      href: mapHref,

      icon: (
        <Navigation
          className="w-5 h-5"
          strokeWidth={1.3}
        />
      ),

      external: true,
    },

    {
      label: 'Waze',

      href: wazeHref,

      icon: (
        <Car
          className="w-5 h-5"
          strokeWidth={1.3}
        />
      ),

      external: true,
    },
  ];

  if (invitation.contactPhone) {

    tiles.push({
      label: 'Zəng et',

      href:
        `tel:${invitation.contactPhone.replace(
          /\s+/g,
          ''
        )}`,

      icon: (
        <Phone
          className="w-5 h-5"
          strokeWidth={1.3}
        />
      ),
    });
  }

  tiles.push({
    label: 'Təqvim',

    href: calendarHref,

    icon: (
      <CalendarPlus
        className="w-5 h-5"
        strokeWidth={1.3}
      />
    ),

    external: true,
  });

  /* =======================================================
     INFO ROWS
     ======================================================= */

  const infoRows: {
    label: string;
    value: string;
    sub?: string;
    href?: string;
  }[] = [

    {
      label: 'Tarix',
      value: dateShort,
    },

    {
      label: 'Saat',
      value: invitation.weddingTime,
    },

    {
      label: 'Məkan',
      value: invitation.venue,
      sub: addressLine,
      href: mapHref,
    },
  ];

  if (invitation.dressCode) {

    infoRows.push({
      label: 'Geyim',
      value: invitation.dressCode,
    });
  }

  /* =======================================================
     SCHEDULE
     ======================================================= */

  const schedule =
    Array.isArray(
      invitation.schedule
    )
      ? invitation.schedule
      : [];

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div
      ref={rootRef}
      id="editorial-press-card-root"
      lang="az"
      className="epc-root"
      style={
        {
          '--epc-heading': headingStack,
          '--epc-body': bodyStack,
          '--epc-ts': `${titleSize}px`,
          '--epc-ns': `${nameSize}px`,
        } as React.CSSProperties
      }
    >

      <style>
        {CSS}
      </style>

      {/* ===================================================
          MUSIC
          =================================================== */}

      {musicSrc && (
        <audio
          ref={audioRef}
          src={musicSrc}
          loop
          preload="auto"
          playsInline
        />
      )}

      {/* ===================================================
          COVER CARD
          =================================================== */}

      <div className="epc-page">

        <div className="epc-card">

          <div className="epc-top">

            <div className="epc-kindly">
              {intro}
            </div>

            <div className="epc-venue-top">
              {invitation.venue}
            </div>

          </div>

          {/* TITLE */}

          <div className="epc-title-area">

            <h1 className="epc-title">

              {titleLines.map(
                (line, index) => (
                  <span key={index}>
                    {line}
                  </span>
                )
              )}

            </h1>

          </div>

          {/* VERTICAL */}

          <div className="epc-vertical">

            <div className="epc-vertical-inner">

              {verticalParts.length > 0 && (
                <>
                  <strong>
                    {verticalParts[0]}
                  </strong>

                  {verticalParts
                    .slice(1)
                    .map(
                      (part, index) => (
                        <React.Fragment
                          key={index}
                        >
                          &nbsp; | &nbsp;
                          {part}
                        </React.Fragment>
                      )
                    )}
                </>
              )}

            </div>

          </div>

          {/* PHOTO */}

          <div className="epc-photo">

            {invitation.heroImage ? (
              <img
                src={invitation.heroImage}
                alt={namesLabel}
              />
            ) : null}

          </div>

          {/* NAMES */}

          <div className="epc-names">

            <div className="epc-name">
              {invitation.groomName}
            </div>

            {isBirthday ? (

              age && (
                <div className="epc-amp">
                  {age}
                </div>
              )

            ) : (

              <>
                <div className="epc-amp">
                  &amp;
                </div>

                <div className="epc-name">
                  {invitation.brideName}
                </div>
              </>

            )}

          </div>

          {/* DATE */}

          <div className="epc-date">
            {dateCardLine}
          </div>

        </div>

      </div>

      {/* ===================================================
          DETAILS
          =================================================== */}

      <section
        id="epc-info"
        className="epc-details"
        style={{
          paddingTop: 72,
          paddingBottom: 56,
        }}
      >

        <div className="epc-details-inner">

          {/* FAMILY */}

          <div
            className="epc-mono elem"
            style={{
              marginBottom: 14,
            }}
          >
            {D.familiesLabel}
          </div>

          {/* PARENTS */}

          {parents.length > 0 && (

            <p
              className="epc-ui elem"
              style={{
                marginBottom: 22,
                fontSize: 12,
                letterSpacing: 1,
                color: '#555',
              }}
            >
              {parents.join('  ·  ')}
            </p>

          )}

          {/* BIRTHDAY AGE */}

          {isBirthday && age && (

            <div className="epc-age elem">
              {age}
            </div>

          )}

          {/* NAMES */}

          <h2
            className="epc-h2 elem"
            style={{
              fontSize:
                'clamp(40px, 8vw, 68px)',

              marginBottom: 18,
            }}
          >

            {isBirthday ? (

              celebrant

            ) : (

              <>
                {invitation.groomName}

                {' '}

                <span
                  style={{
                    fontStyle: 'italic',
                  }}
                >
                  &amp;
                </span>

                {' '}

                {invitation.brideName}
              </>

            )}

          </h2>

          {/* CUSTOM TEXT */}

          {invitation.customText && (

            <p
              className="epc-lead elem"
              style={{
                fontSize: 17,
                lineHeight: 1.6,
                marginBottom: 36,
                maxWidth: 480,
              }}
            >
              {invitation.customText}
            </p>

          )}

          {/* =================================================
              INFO
              ================================================= */}

          <dl
            className="
              epc-ui
              max-w-md
              mx-auto
              text-left
              mb-8
            "
          >

            {infoRows.map(
              (row) => (

                <div
                  key={row.label}
                  className="
                    elem
                    flex
                    items-baseline
                    justify-between
                    gap-6
                    py-4
                    border-t
                    border-[#292929]/15
                    last:border-b
                  "
                >

                  <dt
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.3em]
                      text-[#292929]/50
                      shrink-0
                    "
                  >
                    {row.label}
                  </dt>

                  <dd className="min-w-0">

                    {row.href ? (

                      <a
                        href={row.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          block
                          hover:opacity-70
                          transition-opacity
                        "
                      >

                        <span className="epc-val block">
                          {row.value}
                        </span>

                        {row.sub && (

                          <span
                            className="
                              block
                              text-right
                              text-xs
                              text-[#292929]/55
                              mt-1
                            "
                          >
                            {row.sub}
                          </span>

                        )}

                      </a>

                    ) : (

                      <span className="epc-val block">
                        {row.value}
                      </span>

                    )}

                  </dd>

                </div>

              )
            )}

          </dl>

          {/* =================================================
              ACTION BUTTONS
              ================================================= */}

          <div
            className={`
              elem
              grid
              gap-3
              max-w-md
              mx-auto
              ${
                tiles.length === 4
                  ? 'grid-cols-2 sm:grid-cols-4'
                  : 'grid-cols-3'
              }
            `}
          >

            {tiles.map(
              (tile) => (

                <a
                  key={tile.label}
                  href={tile.href}
                  {...(
                    tile.external
                      ? {
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        }
                      : {}
                  )}
                  className="
                    epc-ui
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-2
                    min-h-[76px]
                    px-2
                    py-4
                    border
                    border-[#292929]/20
                    bg-[#faf9f6]
                    text-[#292929]
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    hover:bg-[#292929]
                    hover:text-[#faf9f6]
                    active:scale-[0.97]
                    transition-all
                  "
                >

                  {tile.icon}

                  <span>
                    {tile.label}
                  </span>

                </a>

              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          COUNTDOWN
          ===================================================== */}

      <section
        className="
          elem
          px-6
          py-12
          bg-[#faf9f6]
          border-t
          border-[#292929]/10
        "
      >

        <div className="max-w-xl mx-auto text-center">

          <p
            className="
              epc-section-label
              epc-ui
              mb-6
            "
          >
            Böyük günə qalan vaxt
          </p>

          <CountdownTimer
            weddingDate={
              invitation.weddingDate
            }
            weddingTime={
              invitation.weddingTime
            }
            theme="minimal"
          />

        </div>

      </section>

      {/* =====================================================
          WEDDING PROGRAM
          ===================================================== */}

      {schedule.length > 0 && (

        <section
          className="
            elem
            px-6
            py-12
            bg-[#f7f5f0]
            border-t
            border-[#292929]/10
          "
        >

          <div className="max-w-md mx-auto">

            <p
              className="
                epc-section-label
                epc-ui
                mb-6
                text-center
              "
            >
              Toy proqramı
            </p>

            <div>

              {schedule.map(
                (
                  item: any,
                  index: number
                ) => (

                  <div
                    key={
                      item.id ??
                      `${item.time}-${index}`
                    }
                    className="
                      elem
                      grid
                      grid-cols-[64px_1fr]
                      gap-4
                      py-4
                      border-t
                      border-[#292929]/15
                      last:border-b
                    "
                  >

                    <span
                      className="
                        epc-ui
                        text-sm
                        tracking-[0.08em]
                        pt-1
                      "
                    >
                      {item.time}
                    </span>

                    <div>

                      <h4
                        className="
                          text-xl
                          leading-tight
                        "
                      >
                        {item.title}
                      </h4>

                      {item.description && (

                        <p
                          className="
                            epc-ui
                            text-xs
                            text-[#292929]/55
                            mt-1
                          "
                        >
                          {item.description}
                        </p>

                      )}

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

      )}

      {/* =====================================================
          RSVP
          ===================================================== */}

      <section
        id="rsvp-press-card"
        className="
          px-6
          py-16
          bg-[#292929]
          text-[#faf9f6]
        "
      >

        <div
          className="
            elem
            max-w-2xl
            mx-auto
            text-center
          "
        >

          <p
            className="epc-section-label epc-ui"
            style={{
              color:
                'rgba(250,249,246,.5)',
            }}
          >
            İştirakınızı təsdiqləyin
          </p>

          <h2
            className="
              text-4xl
              sm:text-5xl
              leading-[1.05]
              mt-6
              mb-6
              font-light
            "
          >
            Sizinlə görüşməkdən
            <br />
            məmnun olarıq
          </h2>

          <p
            className="
              epc-ui
              text-sm
              text-[#faf9f6]/55
              max-w-sm
              mx-auto
              mb-12
              leading-relaxed
            "
          >
            Zəhmət olmasa iştirak
            edib-etməyəcəyinizi
            WhatsApp vasitəsilə
            bildirin.
          </p>

          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-stretch
              justify-center
              gap-3
            "
          >

            <button
              type="button"
              onClick={() =>
                sendWhatsApp(true)
              }
              className="
                epc-ui
                inline-flex
                items-center
                justify-center
                gap-3
                px-10
                py-4
                bg-[#faf9f6]
                text-[#292929]
                text-[10px]
                uppercase
                tracking-[0.28em]
                font-medium
                hover:bg-white
                transition-colors
                cursor-pointer
              "
            >

              <Check
                className="w-3.5 h-3.5"
                strokeWidth={1.5}
              />

              Gələcəyəm

            </button>

            <button
              type="button"
              onClick={() =>
                sendWhatsApp(false)
              }
              className="
                epc-ui
                inline-flex
                items-center
                justify-center
                gap-3
                px-10
                py-4
                border
                border-[#faf9f6]/35
                text-[#faf9f6]
                text-[10px]
                uppercase
                tracking-[0.28em]
                font-medium
                hover:bg-[#faf9f6]/10
                transition-colors
                cursor-pointer
              "
            >

              <X
                className="w-3.5 h-3.5"
                strokeWidth={1.5}
              />

              Gələ bilmirəm

            </button>

          </div>

          <p
            className="
              epc-ui
              text-[11px]
              text-[#faf9f6]/35
              mt-8
            "
          >
            Düyməyə toxunduqda
            WhatsApp tətbiqi açılacaq.
          </p>

        </div>

      </section>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer
        className="
          px-6
          py-10
          text-center
          bg-[#faf9f6]
        "
      >

        <p className="text-2xl mb-2 uppercase">
          {namesLabel}
        </p>

        <p
          className="epc-section-label"
          style={{
            fontSize: 8,
          }}
        >
          © {new Date().getFullYear()} ·{' '}
          {isBirthday
            ? 'Ad günü dəvətnaməsi'
            : 'Toy Dəvətnaməsi'}
        </p>

      </footer>

      {/* =====================================================
          BOTTOM NAVIGATION
          ===================================================== */}

      <nav
        className="epc-nav"
        aria-label="Sürətli naviqasiya"
      >

        <div className="epc-nav-inner">

          {/* MAP */}

          <button
            type="button"
            className="epc-nav-btn"
            onClick={() =>
              scrollToId('epc-info')
            }
          >

            <MapPin
              className="w-[18px] h-[18px]"
              strokeWidth={1.4}
            />

            <span>
              Məkan
            </span>

          </button>

          {/* CALENDAR */}

          <a
            className="epc-nav-btn"
            href={calendarHref}
            target="_blank"
            rel="noopener noreferrer"
          >

            <CalendarPlus
              className="w-[18px] h-[18px]"
              strokeWidth={1.4}
            />

            <span>
              Təqvim
            </span>

          </a>

          {/* RSVP */}

          <button
            type="button"
            className="epc-nav-btn"
            onClick={() =>
              scrollToId(
                'rsvp-press-card'
              )
            }
          >

            <Send
              className="w-[18px] h-[18px]"
              strokeWidth={1.4}
            />

            <span className="whitespace-nowrap">
              İştirak et
            </span>

          </button>

          {/* MUSIC */}

          {musicSrc && (

            <button
              type="button"
              className="epc-nav-btn"
              onClick={toggleMusic}
              aria-label={
                playing
                  ? 'Musiqini dayandır'
                  : 'Musiqini səsləndir'
              }
            >

              {playing ? (

                <span
                  className="
                    flex
                    items-end
                    justify-center
                    gap-[3px]
                    h-[18px]
                  "
                >

                  <span
                    className="
                      w-[2px]
                      h-2
                      bg-[#faf9f6]
                      rounded-full
                      animate-bounce
                    "
                    style={{
                      animationDuration:
                        '.6s',
                    }}
                  />

                  <span
                    className="
                      w-[2px]
                      h-[15px]
                      bg-[#faf9f6]
                      rounded-full
                      animate-bounce
                    "
                    style={{
                      animationDuration:
                        '.4s',
                    }}
                  />

                  <span
                    className="
                      w-[2px]
                      h-[10px]
                      bg-[#faf9f6]
                      rounded-full
                      animate-bounce
                    "
                    style={{
                      animationDuration:
                        '.8s',
                    }}
                  />

                </span>

              ) : (

                <VolumeX
                  className="w-[18px] h-[18px]"
                  strokeWidth={1.4}
                />

              )}

              <span>
                {playing
                  ? 'Musiqi'
                  : 'Səs'}
              </span>

            </button>

          )}

        </div>

      </nav>

    </div>
  );
};

/* =========================================================
   WEDDING TEMPLATE
   ========================================================= */

export const EditorialPressCardTemplate:
  React.FC<TemplateRenderProps> = (
    props
  ) => (
    <EditorialCard
      {...props}
      variant="wedding"
    />
  );

/* =========================================================
   BIRTHDAY TEMPLATE
   ========================================================= */

export const BirthdayCardTemplate:
  React.FC<TemplateRenderProps> = (
    props
  ) => (
    <EditorialCard
      {...props}
      variant="birthday"
    />
  );
