document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-links a");
  const topNav = document.querySelector(".top-nav");
  const homeLink = document.querySelector(".home-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        if (window.innerWidth <= 768) {
          document.querySelector('.top-nav').classList.add('collapsed');
        }
      }
    });
  });

  const sections = document.querySelectorAll(".section");
  const navLinkMap = {
    home: document.getElementById("link-home"),
    about: document.getElementById("link-about"),
    skills: document.getElementById("link-skills"),
    "cv-portfolio": document.getElementById("link-cv-portfolio"),
    contact: document.getElementById("link-contact"),
  };

  const observerOptions = {
    root: null,
    rootMargin: "-100px 0px -100px 0px",
    threshold: 0.8,
  };

  const observerCallback = (entries) => {
    let activeSection = null;

    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = navLinkMap[id];

      if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
        activeSection = { id, ratio: entry.intersectionRatio };
      }
    });

    if (activeSection) {
      Object.values(navLinkMap).forEach((link) => link.classList.remove("active"));
      if (navLinkMap[activeSection.id]) {
        navLinkMap[activeSection.id].classList.add("active");
      }
      updateArrows(activeSection.id);
    }
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach((section) => observer.observe(section));

  // Scroll animation observer
  const animationObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const animationObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      } else {
        entry.target.classList.remove("animate");
      }
    });
  };

  const animationObserver = new IntersectionObserver(animationObserverCallback, animationObserverOptions);
  sections.forEach((section) => animationObserver.observe(section));
});

// Theme toggle functionality
const themeToggleContainer = document.getElementById("theme-toggle-container");
themeToggleContainer.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggleContainer.classList.toggle("dark");
  const topNav = document.querySelector(".top-nav");
  topNav.style.background = document.body.classList.contains("dark-mode")
    ? "linear-gradient(to bottom, #6b6b6b, #222222)"
    : "transparent";
});

// Navbar collapse functionality
function toggleNav() {
  const topNav = document.querySelector(".top-nav");
  if (topNav.classList.contains("collapsed")) {
    topNav.classList.remove("collapsed");
    topNav.classList.add("collapsing");
    setTimeout(() => {
      topNav.classList.remove("collapsing");
    }, 500);
  } else {
    topNav.classList.add("collapsing");
    setTimeout(() => {
      topNav.classList.add("collapsed");
      topNav.classList.remove("collapsing");
    }, 500);
  }
}

function updateArrows(activeSectionId) {
  const arrowUp = document.querySelector(".arrow-up");
  const arrowDown = document.querySelector(".arrow-down");

  if (arrowUp && arrowDown) {
    arrowUp.classList.toggle("hidden", activeSectionId === "home");
    arrowDown.classList.toggle("hidden", activeSectionId === "contact");
  }
}

let modalSliderId = null;
let modalImageIndex = 0;

function openModal(element) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modalSliderId = element.getAttribute("data-slider");
  modalImageIndex = parseInt(element.getAttribute("data-index"));
  modalImg.src = element.src;
  modal.style.display = "flex";
}

function closeModal(event) {
  event.stopPropagation();
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

function modalSlideLeft(event) {
  event.stopPropagation();
  const images = document.querySelectorAll(`.slider[data-slider="${modalSliderId}"] .slider-img`);
  modalImageIndex = (modalImageIndex - 1 + images.length) % images.length;
  document.getElementById("modal-img").src = images[modalImageIndex].src;
}

function modalSlideRight(event) {
  event.stopPropagation();
  const images = document.querySelectorAll(`.slider[data-slider="${modalSliderId}"] .slider-img`);
  modalImageIndex = (modalImageIndex + 1) % images.length;
  document.getElementById("modal-img").src = images[modalImageIndex].src;
}

function scrollToAbout() {
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: "smooth" });
  }
}

// Carousel functionality
let currentCarouselIndex = 0;
let carouselInterval = null;

function updateCarousel() {
  const items = document.querySelectorAll(".carousel-item");
  items.forEach((item, index) => {
    item.classList.toggle("active", index === currentCarouselIndex);
  });
  const indicator = document.querySelector(".carousel-indicator-text");
  indicator.textContent = `${currentCarouselIndex + 1} / ${items.length}`;
}

function carouselNext() {
  const items = document.querySelectorAll(".carousel-item");
  currentCarouselIndex = (currentCarouselIndex + 1) % items.length;
  updateCarousel();
  resetCarouselInterval();
}

function carouselPrev() {
  const items = document.querySelectorAll(".carousel-item");
  currentCarouselIndex = (currentCarouselIndex - 1 + items.length) % items.length;
  updateCarousel();
  resetCarouselInterval();
}

function startCarouselInterval() {
  carouselInterval = setInterval(carouselNext, 5000);
}

function resetCarouselInterval() {
  clearInterval(carouselInterval);
  startCarouselInterval();
}

document.querySelector(".carousel-container").addEventListener("mouseenter", () => {
  clearInterval(carouselInterval);
});

document.querySelector(".carousel-container").addEventListener("mouseleave", () => {
  startCarouselInterval();
});

// Initialize carousel
updateCarousel();
startCarouselInterval();

const translations = {
  eng: {
    navHome: "Home",
    navAbout: "About me",
    navSkills: "Skills",
    navCvPortfolio: "CV/Portfolio",
    navContact: "Contact",
    homeParagraph: "my name is Luka Hrastnik<br>and i'm a young IT student.",
    aboutEducationTitle: "- Education & Background -",
    aboutEducation: "Hi, I’m Luka Hrastnik. I’m currently studying Computer Science at SOFIZO d.o.o. Maribor. Before that, I completed high school at Srednja šola za trženje in dizajn Maribor, where I focused on Interior Decorating. At first glance, it might seem like a big shift from design to tech but both paths come from the same place: creativity, curiosity, and a love for building things, whether digital or physical. I’ve lived my whole life in Zgornja Polskava, a small place that has shaped me in big ways. It’s where I’ve grown up, discovered my passions, and taken on challenges that taught me a lot about responsibility and perseverance.",
    aboutFarmingTitle: "-Farming & Daily Life-",
    aboutFarming: "In 2017, after my father passed away, I inherited our 12-hectare family farm. I was only 16 at the time. Taking on such a big responsibility at a young age wasn’t easy, but it taught me how to stay strong, stay grounded, and work hard for what matters. I’m proud to be the fourth generation caring for the land. Our farm is home to laying hens, and we sell fresh, free-range eggs. We also manage a 15-hectare forest and recently added a sawmill so we can process timber ourselves. We even have a Highland cow named Daisy who helps keep the pastures neat. Farming is physically demanding, but it gives me purpose and keeps me connected to nature.",
    aboutPassionsTitle: "- Passions & Hobbies -",
    aboutPassions: "When I’m not studying or working on the farm, I’m usually doing something creative. Music is a huge part of my life—guitar, bass guitar, and accordion. It’s how I relax, express myself, and reset after a long day. I also collect vintage vinyl records, with a special love for jazz, rock, and classical. One of my proudest collections is every Slovenian Avsenik record ever released. I’m also really into old Tomos mopeds. Restoring and selling them started as a side project, and now I have five in my personal collection. There’s something incredibly satisfying about fixing them up and bringing them back to life. I also enjoy botanical gardening, which gives me a peaceful way to spend time outdoors. In winter, you’ll often find me on the slopes. It’s the perfect mix of adrenaline, focus, and being out in nature. Just like music and riding my Honda CBF125 motorcycle through Slovenia, skiing gives me a sense of freedom and clears my mind.",
    aboutPersonalTitle: "- Personal Life -",
    aboutPersonal: "The two biggest sources of support in my life are Ana and Lola. Ana is my partner, and we’ve been together since 2017. She’s a passionate and caring kindergarten teacher, and we recently celebrated seven years together. We’ve grown a lot as a couple, and she continues to inspire me every day. Lola is our black-and-tan dachshund, small in size but big in personality. She’s stubborn, sassy, and has a “Who do you think you are?” attitude that cracks me up and makes me love her even more. My life is a mix of tradition, creativity, and exploration. Whether I’m working with code, soil, strings, skis, or engines, I enjoy learning, building, and doing things with heart.",
    digitalSkillsHeading: "- Digital Skills -",
    skillsHeading: "Download my Cv and Portfolio",
    skillsDescription1: "Below is my Europass CV and Graphic Design Portfolio.",
    cvDownload: "Download Europass CV",
    cvDescription: "My Europass CV includes my basic and professional information, such as skills, references, work experience, and education.",
    portfolioDownload: "Download Graphic Design Portfolio",
    portfolioDescription: "My Graphic Design Portfolio showcases work I’ve created for myself as well as for others.",
    downloadHereCv: "Download CV here",
    downloadHerePortfolio: "Download Portfolio here",
  },
  slo: {
    navHome: "Domov",
    navAbout: "Kdo sem",
    navSkills: "Veščine",
    navCvPortfolio: "CV/Portfolio",
    navContact: "Kontakt",
    homeParagraph: "ime mi je Luka Hrastnik<br>in sem mlad IT študent.",
    aboutEducationTitle: "- Izobrazba in ozadje -",
    aboutEducation: "Sem Luka Hrastnik. Trenutno študiram računalništvo na SOFIZO d.o.o. Maribor. Pred tem sem opravil srednjo šolo na Srednji šoli za trženje in dizajn Maribor, kjer sem se osredotočal na notranje oblikovanje. Na prvi pogled se morda zdi prehod iz dizajna v tehnologijo velik, vendar oba poti izvirata iz istega vira: ustvarjalnosti, radovednosti in ljubezni do ustvarjanja – bodisi digitalno ali fizično. Celotno življenje sem preživel v Zgornji Polskavi, majhnem kraju, ki me je oblikoval na velike načine. Tu sem odraščal, odkrival svoje strasti in se spopadal z izzivi, ki so me naučili veliko o odgovornosti in vztrajnosti.",
    aboutFarmingTitle: "- Kmetovanje in vsakdanje življenje -",
    aboutFarming: "Leta 2017, ko je umrl moj oče, sem podedoval našo 12-hektarsko kmetijo. Takrat sem bil star le 16 let. Prevzemanje tako velike odgovornosti v mladi dobi ni bilo lahko, vendar me je naučilo, kako ostati močan, prizemljen in trdo delati za tisto, kar je pomembno. Ponosno sem četrta generacija, ki skrbi za zemljo. Na naši kmetiji imamo nosnice, prodajamo sveža jajca iz proste reje. Upravljamo tudi 15-hektarski gozd in pred kratkim smo dodali žagarnico, da lahko sami predelamo les. Imamo celo visokogovorečo kravo Daisy, ki skrbi, da so pašniki urejeni. Kmetovanje je fizično zahtevno, vendar mi daje smisel in me povezuje z naravo.",
    aboutPassionsTitle: "- Strasti in hobiji -",
    aboutPassions: "Ko ne študiram ali ne delam na kmetiji, se običajno posvetim nečemu ustvarjalnemu. Glasba je pomemben del mojega življenja igram kitaro, bas kitaro in harmoniko. Tako se sprostim, izrazim in osvežim po dolgem dnevu. Zbiram tudi vintage vinil plošče, pri čemer imam posebno ljubezen do jazza, rocka in klasične glasbe. Ena izmed mojih največjih zbirk so vsi izdani Avsenikovi posnetki. Res me navdušujejo tudi stari Tomosi mopedi. Obnavljanje in prodaja jih se je začela kot stranski projekt, zdaj pa jih imam pet v svoji osebni zbirki. Nekaj izjemno zadovoljivega je, ko jih popravim in jim dam novo življenje. Uživam tudi v botaničnem vrtnarjenju, ki mi ponuja miren način preživljanja časa na prostem. Pozimi me pogosto najdete na smučišču. Popoln je miks adrenalina, osredotočenosti in bivanja na prostem. Tako kot glasba in vožnja z mojim motorjem Honda CBF125 po Sloveniji, mi smučanje daje občutek svobode in razbistri misli.",
    aboutPersonalTitle: "- Osebno življenje -",
    aboutPersonal: "Dva največja stebra podpore v mojem življenju sta Ana in Lola. Ana je moja partnerka in skupaj sva že od leta 2017. Je strastna in skrbna vzgojiteljica, pred kratkim smo praznovali sedem let skupaj. Skupaj sva se zelo razvijala in ona me še naprej navdihuje vsak dan. Lola je naša majhna, a osebnostno velika jazba, ki me vedno nasmeji in jo imam še bolj rada. Moje življenje je mešanica tradicije, ustvarjalnosti in raziskovanja. Ne glede na to, ali delam s kodo, zemljo, strunami, smuči ali motorji, uživam v učenju, ustvarjanju in delu s srcem.",
    digitalSkillsHeading: "Digitalne veščine",
    skillsHeading: "Prenosi za Cv in portfolio",
    skillsDescription1: "Spodaj je moj Europass CV in Portfolio grafičnega oblikovanja.",
    cvDownload: "Prenesi Europass CV",
    cvDescription: "Moj Europass CV vključuje moje osnovne in strokovne informacije, kot so veščine, reference, delovne izkušnje in izobrazba.",
    portfolioDownload: "Prenesi Portfolio grafičnega oblikovanja",
    portfolioDescription: "Moj Portfolio grafičnega oblikovanja prikazuje dela, ki sem jih ustvaril zase in za druge.",
    downloadHereCv: "Prenesi CV tukaj",
    downloadHerePortfolio: "Prenesi Portfolio tukaj",
  },
};

let currentLanguage = "eng";

function setLanguage(lang) {
  currentLanguage = lang;
  document.querySelectorAll("#translation .lang").forEach((el) => {
    el.classList.toggle("active", el.id === "lang-" + lang);
  });

  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.getAttribute("data-translate");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  const contactImage = document.querySelector("#contact .Card");
  if (contactImage) {
    contactImage.src = lang === "slo" ? "Photos/card-slo.png" : "Photos/Luka' card.png";
  }
}

setLanguage('eng');

document.querySelectorAll('.download-container').forEach(container => {
  container.addEventListener('click', function() {
    this.classList.toggle('active');
  });
});

document.querySelectorAll('.small-download-btn').forEach(btn => {
  btn.addEventListener('click', function(event) {
    event.stopPropagation();
  });
});

// Function to check screen size and adjust nav
function checkScreenSize() {
  const topNav = document.querySelector('.top-nav');
  if (window.innerWidth <= 768) {
    topNav.classList.add('collapsed');
  } else {
    topNav.classList.remove('collapsed');
  }
}

// Call on load and resize
window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);