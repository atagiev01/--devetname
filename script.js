
/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {

  whatsappNumber: "994556519390",

  weddingDate:
    "2026-09-12T19:00:00"

};


/* =========================================================
   OPENING VIDEO
========================================================= */

const gate =
  document.getElementById("gate");

const invitation =
  document.getElementById("invitation");

const openingVideo =
  document.getElementById("opening-video");

let openingStarted = false;


invitation.addEventListener(
  "click",
  openVideo
);


function openVideo(){

  if(openingStarted){
    return;
  }

  openingStarted = true;


  invitation.style.display =
    "none";

  openingVideo.style.display =
    "block";


  openingVideo.currentTime = 0;

  openingVideo.playbackRate = 2;


  const playPromise =
    openingVideo.play();


  if(playPromise){

    playPromise.catch(()=>{
      console.log(
        "Video avtomatik başlaya bilmədi."
      );
    });

  }

}


/* VIDEO BITDI */

openingVideo.addEventListener(
  "ended",
  finishOpening
);


function finishOpening(){

  gate.classList.add(
    "gate-hidden"
  );


  setTimeout(()=>{

    gate.style.display =
      "none";

    document.body.classList.remove(
      "locked"
    );

  },1000);

}


/* VIDEO XƏTASI */

openingVideo.addEventListener(
  "error",
  ()=>{
    
    console.warn(
      "Açılış videosu yüklənmədi."
    );

    gate.classList.add(
      "gate-hidden"
    );

    setTimeout(()=>{

      gate.style.display =
        "none";

    },1000);

  }
);


/* =========================================================
   COUNTDOWN
========================================================= */

const targetDate =
  new Date(
    CONFIG.weddingDate
  ).getTime();


function updateCountdown(){

  const now =
    Date.now();

  const difference =
    Math.max(
      targetDate - now,
      0
    );


  const days =
    Math.floor(
      difference / 86400000
    );


  const hours =
    Math.floor(
      (difference % 86400000)
      / 3600000
    );


  const minutes =
    Math.floor(
      (difference % 3600000)
      / 60000
    );


  const seconds =
    Math.floor(
      (difference % 60000)
      / 1000
    );


  document.getElementById(
    "cd-days"
  ).textContent =
    String(days).padStart(2,"0");


  document.getElementById(
    "cd-hours"
  ).textContent =
    String(hours).padStart(2,"0");


  document.getElementById(
    "cd-min"
  ).textContent =
    String(minutes).padStart(2,"0");


  document.getElementById(
    "cd-sec"
  ).textContent =
    String(seconds).padStart(2,"0");

}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);


/* =========================================================
   RSVP → WHATSAPP
========================================================= */

function sendRSVP(answer){

  const phone =
    CONFIG.whatsappNumber;


  const message =
    "Salam! 💌\n\n" +

    "Asim və Sevincinin toy dəvətnaməsinə cavabım:\n\n" +

    answer +

    "\n\n" +

    "12 Sentyabr 2026";


  const whatsappURL =
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(message);


  window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
  );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver =
  new IntersectionObserver(
    (entries,observer)=>{

      entries.forEach(entry=>{

        if(entry.isIntersecting){

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold:.15
    }
  );


document
  .querySelectorAll(
    ".luxury-card, .program-card, .rsvp-card, .section-title"
  )
  .forEach(element=>{

    element.classList.add(
      "reveal"
    );

    revealObserver.observe(
      element
    );

  });


/* =========================================================
   MUSIC
========================================================= */

const musicButton =
  document.getElementById(
    "music-toggle"
  );

const audio =
  document.getElementById(
    "bg-music"
  );

const iconMuted =
  document.getElementById(
    "icon-muted"
  );

const iconPlaying =
  document.getElementById(
    "icon-playing"
  );


let isPlaying = false;


musicButton.addEventListener(
  "click",
  async()=>{

    try{

      if(!isPlaying){

        await audio.play();


      }else{

        audio.pause();

        isPlaying = false;

      }


      iconMuted.hidden =
        isPlaying;

      iconPlaying.hidden =
        !isPlaying;


      musicButton.setAttribute(
        "aria-pressed",
        String(isPlaying)
      );


    }catch(error){

      console.warn(
        "Musiqi oxudulmadı:",
        error
      );

    }

  }
);

    /* =========================================
   PREMIUM PARALLAX HERO
========================================= */

const hero = document.getElementById("hero");
const heroContent = document.querySelector(".hero-content");
const heroVideo = document.querySelector(".hero-video");

let ticking = false;

function updateParallax() {

  const scrollY = window.scrollY;
  const heroHeight = hero.offsetHeight;

  if (scrollY <= heroHeight) {

    /*
      Content:
      yuxarı scroll etdikcə daha yavaş hərəkət edir
    */
    const contentY = scrollY * 0.22;

    /*
      Video daha yavaş hərəkət edir
    */
    const videoY = scrollY * 0.08;

    /*
      Scroll zamanı content bir az kiçilir
    */
    const scale =
      Math.max(1 - scrollY * 0.00012, 0.94);

    /*
      Yuxarı qalxdıqca şəffaflaşır
    */
    const opacity =
      Math.max(1 - scrollY / (heroHeight * 0.5), 0);

    heroContent.style.transform =
      `translate3d(0, ${contentY}px, 0) scale(${scale})`;

    heroContent.style.opacity = opacity;

    heroVideo.style.transform =
      `scale(1.05) translate3d(0, ${videoY}px, 0)`;
  }

  ticking = false;
}

window.addEventListener("scroll", () => {

  if (!ticking) {

    window.requestAnimationFrame(updateParallax);

    ticking = true;
  }

}, { passive: true });

updateParallax();

    /* =========================================
   SCROLL DIRECTION ENGINE
========================================= */

let lastScrollY = window.scrollY;
let scrollDirection = "down";

const scrollElements =
  document.querySelectorAll(
    ".reveal, .luxury-card, .program-item, .rsvp-card, .hero-actions"
  );


const scrollObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (!entry.isIntersecting) return;

      const element = entry.target;

      /* Köhnə animasiyanı sil */
      element.classList.remove(
        "scroll-down",
        "scroll-up"
      );

      /* Browser-in animasiyanı yenidən başlatması üçün */
      void element.offsetWidth;

      /* İstiqamətə görə yeni animasiya */
      if (scrollDirection === "down") {

        element.classList.add("scroll-down");

      } else {

        element.classList.add("scroll-up");

      }

    });

  },
  {
    threshold: .15
  }
);


scrollElements.forEach((element) => {

  element.classList.add("scroll-element");

  scrollObserver.observe(element);

});


/* =========================================
   SCROLL İSTİQAMƏTİNİ TUT
========================================= */

window.addEventListener(
  "scroll",
  () => {

    const currentScrollY =
      window.scrollY;


    if (currentScrollY > lastScrollY) {

      scrollDirection = "down";

    } else if (currentScrollY < lastScrollY) {

      scrollDirection = "up";

    }


    lastScrollY = currentScrollY;

  },
  {
    passive: true
  }
);

 const hero = document.querySelector(".premium-hero");

let previousScroll = window.scrollY;

window.addEventListener("scroll", () => {

  const current = window.scrollY;
  const delta = current - previousScroll;

  previousScroll = current;

  if (!hero) return;


  /* AŞAĞI */
  if (delta > 0) {

    hero.style.transform =
      `translateY(${current * 0.12}px)
       rotateX(${Math.min(current * 0.015, 5)}deg)
       scale(${Math.max(1 - current * 0.00015, .94)})`;

  }


  /* YUXARI */
  else if (delta < 0) {

    hero.style.transform =
      `translateY(${current * 0.05}px)
       rotateX(${Math.max(current * -0.01, -4)}deg)
       scale(${Math.min(1 + Math.abs(delta) * .002, 1.04)})`;

  }

});
    document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("keydown", e => {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U")
    ) {
        e.preventDefault();
    }
});