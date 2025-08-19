// Typewriter effect for hero section
const line = "Designing reliable systems with clean UX & secure foundations.";
const target = document.getElementById('typewriter');
let i = 0;
let typingTimeout;

function type() {
  if (!target) return;
  if (i <= line.length) {
    target.textContent = line.slice(0, i++);
    typingTimeout = setTimeout(type, 40);
  }
}

function resetTypewriter() {
  clearTimeout(typingTimeout);
  i = 0;
  if (target) target.textContent = '';
  type();
}

const heroSection = document.getElementById('hero');
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      resetTypewriter();
    }
  });
}, { threshold: 0.5 });

if (heroSection) {
  heroObserver.observe(heroSection);
}

// Reveal effect for .reveal elements toggling visibility on scroll
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => revealObserver.observe(el));

// Parallax backgrounds for sections
const sections = Array.from(document.querySelectorAll('.parallax'));
const speedMap = new Map();
sections.forEach(sec => speedMap.set(sec, sec.id === 'hero' ? 0.25 : 0.45));

function parallax() {
  const viewportTop = window.scrollY;
  const viewportH = window.innerHeight;
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    const secTop = rect.top + viewportTop;
    const progress = (viewportTop - secTop + viewportH) / (rect.height + viewportH);
    const speed = speedMap.get(sec) || 0.4;
    const translate = Math.max(-60, Math.min(60, (progress * 120) * speed));
    const bg = sec.querySelector('.bg');
    if (bg) { bg.style.transform = `translateY(${translate}px)`; }
  });
}

let ticking = false;
document.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      parallax();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
window.addEventListener('resize', parallax);
window.addEventListener('load', parallax);

// Contact form toast and reset
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    toast('Thank you for reaching out! Mohammed will get back to you soon.');
    form.reset();
  });
}

// Toast function (accent colors)
function toast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `
    position: fixed;
    left: 50%;
    top: 28px;
    transform: translateX(-50%);
    z-index: 9999;
    padding: 12px 16px;
    color: #fff;
    border-radius: 12px;
    box-shadow: ${getComputedStyle(document.documentElement).getPropertyValue('--shadow')};
    backdrop-filter: blur(8px);
  `;
  t.style.background = 'linear-gradient(135deg,var(--accent),var(--accent-2))';
  t.style.border = 'none';
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.transition = 'opacity .5s ease, transform .5s ease';
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(-8px)';
  }, 2000);
  setTimeout(() => t.remove(), 2600);
}

// Scrollspy for nav links
const navLinks = document.querySelectorAll('.nav a');
window.addEventListener('scroll', () => {
  let fromTop = window.scrollY + 80;
  navLinks.forEach(link => {
    let section = document.querySelector(link.getAttribute('href'));
    if (
      section &&
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Proficiency bar animation in skills section
document.querySelectorAll('.skill-card').forEach(card => {
  const bar = card.querySelector('.proficiency-bar');
  const fill = card.querySelector('.proficiency-fill');
  const targetWidth = fill.getAttribute('data-width') || "70%";
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bar.classList.add('animated');
        setTimeout(() => { fill.style.width = targetWidth; }, 100);
      } else {
        bar.classList.remove('animated');
        fill.style.width = '0';
      }
    });
  }, { threshold: 0.3 });
  observer.observe(card);
});


// Typewriter effect for About section quote
const aboutLine = "Engineering tomorrow’s solutions—one bug at a time.";
const aboutTarget = document.getElementById('about-typewriter');
let aboutIndex = 0;
let aboutTimeout;

function aboutType() {
  if (!aboutTarget) return;
  if (aboutIndex <= aboutLine.length) {
    aboutTarget.textContent = aboutLine.slice(0, aboutIndex++);
    aboutTimeout = setTimeout(aboutType, 60);
  }
}
function resetAboutTypewriter() {
  clearTimeout(aboutTimeout);
  aboutIndex = 0;
  if (aboutTarget) aboutTarget.textContent = '';
  aboutType();
}
const aboutSection = document.getElementById('about');
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      resetAboutTypewriter();
    }
  });
}, { threshold: 0.5 });
if (aboutSection) {
  aboutObserver.observe(aboutSection);
}

// tsParticles for About section background
window.addEventListener('DOMContentLoaded', () => {
  tsParticles.load("about-particles", {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    particles: {
      number: { value: 60 },
      color: { value: ["#7c5cff", "#00e3a1", "#ff3d71"] },
      shape: { type: "circle" },
      opacity: { value: 0.4 },
      size: { value: { min: 2, max: 4 } },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        outModes: { default: "bounce" },
        straight: false,
        random: true
      }
    },
    detectRetina: true
  });
});


let lastScrollY = window.scrollY;
const header = document.querySelector('.site-header');
let tickingNavbar = false;

function updateNavbarVisibility() {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    // Scrolling down
    header.classList.add('hide-navbar');
    header.classList.remove('show-navbar');
  } else {
    // Scrolling up
    header.classList.remove('hide-navbar');
    header.classList.add('show-navbar');
  }
  lastScrollY = currentScrollY;
}

window.addEventListener('scroll', () => {
  if (!tickingNavbar) {
    requestAnimationFrame(() => {
      updateNavbarVisibility();
      tickingNavbar = false;
    });
    tickingNavbar = true;
  }
});

// On page load, ensure navbar is visible
window.addEventListener('DOMContentLoaded', () => {
  header.classList.add('show-navbar');
});

//mobile nav view

const navToggle = document.getElementById('mobileNavToggle');
const mobileNav = document.getElementById('mobileNav');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

// Optionally close nav when link clicked
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});
